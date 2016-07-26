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

import type {ChildProcess} from 'child_process';
import type {Document} from 'mongoose';
import type {LogEntry} from '../scheduler/RoutineSchema';
import type {Interface as ReadlineInterface} from 'readline';
import type {ReadStream} from 'fs';
import type {OnRoutineExecutionEnd} from '../scheduler/Scheduler';

type StreamBindings = Map<string, ReadlineInterface>;

const AbstractService = require('./AbstractService');
const PollingPool = require('../scheduler/PollingPool');
const PollingThread = require('../scheduler/PollingThread');
const Readline = require('readline');
const {execFile} = require('child_process');
const {Map} = require('immutable');

// implement ServiceInterface
class Worker extends AbstractService {

  log(message: string): void {
    const now = new Date().toString();
    console.log(`[${now}] ${message}`);
  }

  bindStreams(proc: ChildProcess, callback: (entry: LogEntry) => void): StreamBindings {
    const bindings = new Map({ 'stdout': proc.stdout, 'stderr': proc.stderr }).map(
      (stream: ReadStream, id: string) => Readline.createInterface({ input: stream })
    );

    bindings.forEach(
      (io: ReadlineInterface, id: string) => {
        io.on('line', (line: string) => callback({ time: new Date(), stream: id, chunk: line }));
      }
    );

    return bindings;
  }

  freeStreams(bindings: StreamBindings): void {
    bindings.forEach((io: ReadlineInterface) => io.removeAllListeners());
  }

  onRoutine(
    routine: Document,
    unlock: OnRoutineExecutionEnd,
    complete: OnRoutineExecutionEnd,
    renew: OnRoutineExecutionEnd
  ): void {
    const id = routine.get('id');
    const script_id = routine.get('script_id');
    const ctx_id = routine.get('context_id');

    // FIXME no transpile by default
    const argv = ['index.js', '--transpile', '--mode', 'runner', '--script-id', script_id, '--ctx-id', ctx_id];
    const child = execFile('node', argv);

    this.log(`Routine ${id} Started`);
    routine.set('runner_start_time', new Date());

    const bindings = this.bindStreams(
      child,
      (entry: LogEntry) => routine.get('runner_log').push(entry)
    );

    const sync = (callback: (err?: Error, res?: ?Document) => void) => {
      routine.save(callback);
    };

    const intval = this.getConfig().getInteger('sandbox.routine_sync_interval');
    let sync_interval = setInterval(() => sync(() => this.log(`Routine ${id} Syncd`)), intval);

    child.on('exit', (code) => {
      this.freeStreams(bindings);
      clearInterval(sync_interval);
      routine.set('runner_end_time', new Date());
      routine.set('runner_exit_code', code);
      // Final sync -> complete schedule (free pool slot) -> *
      sync((e, r) => complete(routine => this.log(`Routine ${id} Completed`)));
    });
  }

  init(): void {
    const polling_interval = this.getConfig().getInteger('scheduler.preview_queue.polling_interval');
    // FIXME this arbitrarly enables only 1 thread on the preview queue -> no main queue
    const pool = new PollingPool(1);
    PollingThread.fromPool(pool, this.getScheduler().getHighPriQueue(), polling_interval);

    this.getScheduler().pollForRoutines(pool, this.onRoutine.bind(this));

    // FIXME nicely handle signals
    // this.emit(AbstractService.events.END);
  }
}

module.exports = Worker;
