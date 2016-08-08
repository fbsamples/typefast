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

import type Queue from '../scheduler/Queue';
import type {ChildProcess} from 'child_process';
import type {Document} from 'mongoose';
import type {LogEntry} from '../model/schema/routine';
import type {Interface as ReadlineInterface} from 'readline';
import type {ReadStream} from 'fs';
import type {AnonimizedRoutineMutator as Mutator} from '../scheduler/Scheduler';

type StreamBindings = Map<string, ReadlineInterface>;

const AbstractService = require('./AbstractService');
const PollingPool = require('../scheduler/PollingPool');
const PollingThread = require('../scheduler/PollingThread');
const Readline = require('readline');
const {execFile} = require('child_process');
const {Map} = require('immutable');

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

  onRoutine(routine: Document, unlock: Mutator, complete: Mutator): void {
    const id = routine.get('id');

    // FIXME no transpile by default
    const argv = ['index.js', '--transpile', '--mode', 'runner', '--routine-id', id];
    const child = execFile('node', argv);

    log(`Routine ${id} Started`);
    routine.set('runner_start_time', new Date());

    const bindings = bindStreams(
      child,
      (entry: LogEntry) => routine.get('runner_log').push(entry)
    );

    const sync = (): Promise<Document> => {
      return routine.save()
        .catch((error: Error) => log(`Error syncing routine ${id}`))
        .then(() => routine);
    };

    const intval = this.getConfig().getInteger('sandbox.routine_sync_interval');
    let sync_interval = setInterval(() => sync(() => log(`Routine ${id} Syncd`)), intval);

    child.on('exit', (code) => {
      freeStreams(bindings);
      clearInterval(sync_interval);
      routine.set('runner_end_time', new Date());
      routine.set('runner_exit_code', code);
      // Final sync -> complete schedule (free pool slot) -> *
      sync().then(() => {
        complete()
          .then((routine: Document) => log(`Routine ${id} Completed`))
          .catch((error: Error) => log(`Error completing routine ${id}`));
      });
    });
  }

  init(): void {
    const polling_interval = this.getConfig().getInteger('scheduler.preview_queue.polling_interval');
    const preview_queue: Queue = this.getScheduler().getQueues().get('preview_queue');
    const main_queue: Queue = this.getScheduler().getQueues().get('main_queue');
    // FIXME this arbitrarly enables only 1 thread on the preview queue -> no main queue
    const pool = new PollingPool(1);
    PollingThread.fromPool(pool, preview_queue, polling_interval);
    PollingThread.fromPool(pool, main_queue, polling_interval);

    this.getScheduler().pollForRoutines(pool, this.onRoutine.bind(this));

    // FIXME nicely handle signals
    // this.emit(AbstractService.events.END);
  }
}

module.exports = Worker;
