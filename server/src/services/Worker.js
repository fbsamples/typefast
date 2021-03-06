/**
 * Copyright (c) 2016-present, Facebook, Inc. All rights reserved.
 *
 * You are hereby granted a non-exclusive, worldwide, royalty-free license to
 * use, copy, modify, and distribute this software in source code or binary
 * form for use in connection with the web services and APIs provided by
 * Facebook.
 *
 * As with any software that integrates with the Facebook platform, your use
 * of this software is subject to the Facebook Developer Principles and
 * Policies [http://developers.facebook.com/policy/]. This copyright notice
 * shall be included in all copies or substantial portions of the software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 * DEALINGS IN THE SOFTWARE.
 *
 * @flow
 */

import type Config from '../Config';
import type {AnonimizedRoutineMutator as Mutator} from '../scheduler/Scheduler';
import type {ChildProcess} from 'child_process';
import type {LogEntry} from '../model/schema/routine';
import type {Interface as ReadlineInterface} from 'readline';
import type {ReadStream} from 'fs';
import type {Routine} from '../model/Routine';
import type {Resolve, Reject} from '../utils/promises';

type StreamBindings = Map<string, ReadlineInterface>;

const AbstractService = require('./AbstractService');
const PollingPool = require('../scheduler/PollingPool');
const PollingThread = require('../scheduler/PollingThread');
const Queue = require('../scheduler/Queue');
const Readline = require('readline');
const {execFile} = require('child_process');
const {List, Map, Set} = require('immutable');

const log = function(message: string): void {
  const now = new Date().toString();
  console.log(`[${now}] ${message}`);
};

const bindStreams = function(proc: ChildProcess, callback: (entry: LogEntry) => void): StreamBindings {
  const bindings = new Map({ 'stdout': proc.stdout, 'stderr': proc.stderr }).map(
    (stream: ReadStream, id: string) => Readline.createInterface({ input: stream })
  );

  bindings.forEach(
    (io: ReadlineInterface, id: string) => {
      io.on('line', (line: string) => callback({ time: new Date(), stream: id, chunk: line }));
    }
  );

  return bindings;
};

const freeStreams = function(bindings: StreamBindings): void {
  bindings.forEach((io: ReadlineInterface) => io.removeAllListeners());
};

// implement ServiceInterface
class Worker extends AbstractService {

  serviceInlineConfig: string;
  children: Set<ChildProcess>;
  isShuttingDown: bool;

  constructor(config: Config): void {
    super(config);
    this.serviceInlineConfig = '{}';
    this.children = new Set();
    this.isShuttingDown = false;
  }

  setServiceInlineConfig(inline_config: string): this {
    this.serviceInlineConfig = inline_config;

    return this;
  }

  getServiceInlineConfig(): string {
    return this.serviceInlineConfig;
  }

  onRoutine(routine: Routine, unlock: Mutator, complete: Mutator): void {
    const id = routine.get('id');
    const interpreter = this.getConfig().getString('interpreter', 'node');
    const argv = [
      'index.js',
      '--mode', 'runner',
      '--routine-id', id,
      '--inline-config', this.getServiceInlineConfig(),
    ];

    const child = execFile(interpreter, argv);
    this.children = this.children.add(child);

    log(`Routine ${id} Started`);
    log(interpreter + ' ' + argv.join(' '));
    routine.set('runner_start_time', new Date());

    const bindings = bindStreams(
      child,
      (entry: LogEntry) => routine.get('runner_log').push(entry)
    );

    const sync = (): Promise<Routine> => {
      return routine.save()
        .catch((error: Error) => log(`Error syncing routine ${id}`))
        .then(() => routine);
    };

    const intval = this.getConfig().getInteger('sandbox.routine_sync_interval');
    let sync_interval = setInterval(() => sync(() => log(`Routine ${id} Syncd`)), intval);

    child.on('exit', (code: number, signal: string): void => {
      this.children = this.children.delete(child);
      freeStreams(bindings);
      clearInterval(sync_interval);
      routine.set('runner_end_time', new Date());
      routine.set('runner_exit_code', code);
      // Final sync -> complete schedule (free pool slot) -> *
      sync().then(() => {
        complete()
          .then((routine: Routine): void => {
            if (signal) {
              log(`Routine ${id} Killed with signal ${signal}`);
            } else {
              log(`Routine ${id} Completed`);
            }
          })
          .catch((error: Error) => log(`Error completing routine ${id}`));
      });
    });
  }

  killChildren(signal: string): void {
    this.children.forEach((child: ChildProcess): void => {
      process.kill(child.pid, signal);
    });
  }

  waitForChildrenOrExit(timeout: number): Promise<void> {
    return new Promise(
      (resolve: Resolve<void>, reject: Reject) => {
        setTimeout(
          (): void => {
            if (this.children.size > 0) {
              resolve();
            } else {
              log('Worker shutting down');
              this.emit(AbstractService.events.END);
              process.exit(1);
            }
          },
          timeout
        );
      });
  }

  gracefulShutdown(signal: string, pool: PollingPool): void {
    if (this.isShuttingDown) {
      return;
    }
    this.isShuttingDown = true;

    log(`Received ${signal}. Stopping polling for new routines\n`);
    pool.getThreads().forEach((thread: PollingThread): void => {
      thread.stop();
    });
    const shutdown_timeout = this.getConfig().getInteger('worker.shutdown_timeout');
    const kill_timeout = this.getConfig().getInteger('worker.kill_timeout');

    this.waitForChildrenOrExit(0)
      .then((): void => {
        log(`Waiting ${shutdown_timeout} ms`
          + ` for ${this.children.size} routine(s) to end`);
      })
      .then(this.waitForChildrenOrExit.bind(this, shutdown_timeout))
      .then((): void => {
        log(`Sending ${signal} to ${this.children.size} routine processes`);
        this.killChildren(signal);
      })
      .then(this.waitForChildrenOrExit.bind(this, kill_timeout))
      .then((): void => {
        log(`Killing remaining ${this.children.size} routine processes`);
        this.killChildren('SIGKILL');
      })
      .catch((error: Error): void => {
        process.nextTick((): void => {
          throw error;
        });
      })
      .then(() => this.emit(AbstractService.events.END));
  }

  init(): void {
    const config = this.getConfig().getMap('scheduler.queues');

    const pool = new PollingPool(config.size);
    config.map((tree: Map<string, any>, name: string) => {
      PollingThread.fromPool(pool, new Queue(name), tree.get('polling_interval'), tree.get('worker_threads'));
    });

    this.getScheduler().pollForRoutines(pool, this.onRoutine.bind(this));

    this.emit(Worker.events.INIT, pool);

    new List(['SIGINT', 'SIGBREAK', 'SIGTERM']).forEach((signal: string) => {
      process.on(signal, this.gracefulShutdown.bind(this, signal, pool));
    });
  }
}

module.exports = Worker;
