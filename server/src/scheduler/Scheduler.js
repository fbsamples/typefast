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
import type PollingPool from './PollingPool';
import type {Document} from 'mongoose';
import type {OnRoutineCallback, OnScheduleCallback, RoutineEndingOperation} from './Queue';

export type OnRoutineContextualizedCallback = (routine: ?Document, queue: Queue) => void;
export type OnRoutineExecutionEnd = (callback: OnRoutineCallback) => void;
export type OnPollingRoutine = (
  routine: Document,
  unlock: OnRoutineExecutionEnd,
  complete: OnRoutineExecutionEnd,
  renew: OnRoutineExecutionEnd
) => void;

const PollingThread = require('./PollingThread');
const Queue = require('./Queue');
const RoutineSchema = require('./RoutineSchema');
const {List} = require('immutable');

class Scheduler {

  queue: Queue;
  highPriQueue: Queue;

  static fromConfig(config: Config): Scheduler {
    return new Scheduler(
      Queue.fromSchema(RoutineSchema, config.getString('scheduler.main_queue.collection_name')),
      Queue.fromSchema(RoutineSchema, config.getString('scheduler.preview_queue.collection_name'))
    );
  }

  constructor(queue: Queue, high_pri_queue: Queue): void {
    this.queue = queue;
    this.highPriQueue = high_pri_queue;
  }

  getQueue(): Queue {
    return this.queue;
  }

  getHighPriQueue(): Queue {
    return this.highPriQueue;
  }

  getQueues(): List<Queue> {
    return new List([this.getHighPriQueue(), this.getQueue()]);
  }

  enqueue(queue: Queue, script_id: string, date: Date, callback?: OnScheduleCallback): this {
    queue.createRoutine(script_id, date, callback);

    return this;
  }

  schedule(script_id: string, date: Date, callback?: OnScheduleCallback): this {
    return this.enqueue(this.getQueue(), script_id, date, callback);
  }

  // Will schedule on the hi-pri queue
  exec(script_id: string, callback?: OnScheduleCallback): this {
    return this.enqueue(this.getHighPriQueue(), script_id, new Date(), callback);
  }

  getRoutine(id: string, callback: OnRoutineContextualizedCallback): this {
    let routine = null;
    let results = 0;
    let queues = this.getQueues();

    queues.forEach(
      (queue: Queue) => queue.getModel().findById(
        id,
        (err: Error, doc: ?Document) => {
          ++results;
          if ((doc != null && routine === null) || (results === queues.size && routine === null)) {
            routine = doc;
            process.nextTick(() => callback(routine, queue));
          }
        }
      )
    );

    return this;
  }

  pollForRoutines(pool: PollingPool, callback: OnPollingRoutine): this {
    pool.getThreads().forEach((thread: PollingThread) => {
      const queue = thread.getQueue();
      const contextify = (operation: RoutineEndingOperation, routine: Document) => {
        return (callback: OnRoutineCallback) => {
          operation(routine, callback);
          thread.start();
        };
      };

      thread.on(PollingThread.events.ROUTINE, (routine: Document) => {
        callback(
          routine,
          contextify(queue.unlockRoutine, routine),
          contextify(queue.completeRoutine, routine),
          contextify(queue.renewRoutine, routine)
        );
      });
      thread.start();
    });

    return this;
  }
}

module.exports = Scheduler;
