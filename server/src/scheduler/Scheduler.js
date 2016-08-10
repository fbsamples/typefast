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
import type {Routine} from '../model/Routine';
import type {RoutineMutator} from './Queue';
import type {Schedule} from '../model/Schedule';

export type AnonimizedRoutineMutator = () => Promise<Routine>;
export type ContextualizedRoutine = { routine: Routine, queue: Queue };
export type OnRoutine = (
  routine: Routine,
  unlock: AnonimizedRoutineMutator,
  complete: AnonimizedRoutineMutator,
) => void;

const nullthrows = require('../utils/nullthrows');
const PollingThread = require('./PollingThread');
const Queue = require('./Queue');
const {Map} = require('immutable');
const {genMap} = require('../utils/promises');

class Scheduler {

  queues: Map<string, Queue>;

  static fromConfig(config: Config): Scheduler {
    const queues = config.getMap('scheduler.queues')
      .map((tree: any, name: string) => new Queue(name));

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

  enqueue(queue: Queue, script_id: string, ctx_id: string): Promise<Routine> {
    return queue.createRoutine(script_id, null, ctx_id, new Date());
  }

  coerceScheduleQueue(schedule: Schedule): Queue {
    const queue_name: string = schedule.get('queue_name');

    return nullthrows(this.getQueue(queue_name));
  }

  getNextScheduleTime(schedule: Schedule): Date {
    const start_time: Date = schedule.get('start_time');
    const recurrence: ?number = schedule.get('recurrence');
    const t1 = start_time.getTime();
    const t2 = new Date().getTime();

    if (recurrence == null) {
      return new Date();
    }

    return t1 > t2 ? start_time : new Date(t2 + ((t2 - t1) % recurrence));
  }

  enqueueScheduled(schedule: Schedule, date?: Date): Promise<Routine> {
    const script_id: string = schedule.get('script_id');
    const schedule_id: string = schedule.get('id');
    const context_id: string = schedule.get('context_id');
    const next = date == null ? this.getNextScheduleTime(schedule) : date;

    return this.coerceScheduleQueue(schedule).createRoutine(script_id, schedule_id, context_id, next);
  }

  cleanSchedule(schedule: Schedule): Promise<void> {
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

      thread.on(PollingThread.events.ROUTINE, (routine: Routine) => {
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
