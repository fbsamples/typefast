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
import type {Routine, RoutineMutator} from './Queue';

export type AnonimizedRoutineMutator = () => Promise<Routine>;
export type ContextualizedRoutine = { routine: Routine, queue: Queue };
export type OnRoutine = (
  routine: Document,
  unlock: AnonimizedRoutineMutator,
  complete: AnonimizedRoutineMutator,
) => void;

const nullthrows = require('../utils/nullthrows');
const PollingThread = require('./PollingThread');
const Queue = require('./Queue');
const RoutineSchema = require('../model/schema/routine');
const {List, Map} = require('immutable');
const {genMap} = require('../utils/promises');

class Scheduler {

  queues: Map<string, Queue>;

  static fromConfig(config: Config): Scheduler {
    const queues = new Map(new List(['main_queue', 'preview_queue']).map((name: string) => [
      name,
      Queue.fromSchema(RoutineSchema, config.getString(`scheduler.${name}.collection_name`))
    ]).toSeq());

    return new Scheduler(queues);
  }

  constructor(queues: Map<string, Queue>): void {
    this.queues = queues;
  }

  getQueues(): Map<string, Queue> {
    return this.queues;
  }

  getQueue(name: string): ?Queue {
    return this.getQueues().get(name);
  }

  enqueue(queue: Queue, script_id: string, ctx_id: string): Promise<Document> {
    return queue.createRoutine(script_id, null, ctx_id, new Date());
  }

  coerceScheduleQueue(schedule: Document): Queue {
    const queue_name: string = schedule.get('queue_name');

    return nullthrows(this.getQueue(queue_name));
  }

  getNextScheduleTime(schedule: Document): Date {
    const start_time: Date = schedule.get('start_time');
    const recurrence: ?number = schedule.get('recurrence');
    const t1 = start_time.getTime();
    const t2 = new Date().getTime();

    if (recurrence == null) {
      return new Date();
    }

    return t1 > t2 ? start_time : new Date(t2 + ((t2 - t1) % recurrence));
  }

  enqueueScheduled(schedule: Document, date?: Date): Promise<Document> {
    const script_id: string = schedule.get('script_id');
    const schedule_id: string = schedule.get('id');
    const context_id: string = schedule.get('context_id');
    const next = date == null ? this.getNextScheduleTime(schedule) : date;

    return this.coerceScheduleQueue(schedule).createRoutine(script_id, schedule_id, context_id, next);
  }

  cleanSchedule(schedule: Document): Promise<void> {
    return this.coerceScheduleQueue(schedule).removeUnlockedRoutines(schedule);
  }

  getRoutine(id: string): Promise<?ContextualizedRoutine> {
    return genMap(this.getQueues().map((queue: Queue) => {
      return queue.getModel().findById(id).exec()
        .then((routine: ?Routine) => routine ? { routine: routine, queue: queue } : null);
    })).then((pairs: Map<string, ?ContextualizedRoutine>) => {
      return pairs.filter((pair: ?ContextualizedRoutine) => pair).first();
    });
  }

  pollForRoutines(pool: PollingPool, callback: OnRoutine): this {
    pool.getThreads().forEach((thread: PollingThread) => {
      const queue = thread.getQueue();
      const contextify = (mutator: RoutineMutator, routine: Routine): AnonimizedRoutineMutator => {
        return (): Promise<Routine> => {
          return mutator(routine).then((routine: Routine) => {
            thread.start();
            return routine;
          });
        };
      };

      thread.on(PollingThread.events.ROUTINE, (routine: Document) => {
        queue.renewRoutine(routine).then(() => {
          callback(
            routine,
            contextify(queue.unlockRoutine, routine),
            contextify(queue.completeRoutine, routine)
          );
        });
      });
      thread.start();
    });

    return this;
  }
}

module.exports = Scheduler;
