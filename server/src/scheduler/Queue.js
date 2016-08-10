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

import type {Routine} from '../model/Routine';
import type {Schedule} from '../model/Schedule';

export type RoutineMutator = (routine: Routine) => Promise<Routine>;

const Mongoose = require('mongoose');
const RoutineModel = require('../model/Routine');
const ScheduleModel = require('../model/Schedule');
// Flow typeof won't work with import type
const {Model} = require('mongoose');

class Queue {

  name: string;

  constructor(name: string): void {
    this.name = name;
  }

  getModel(): typeof Model {
    return RoutineModel;
  }

  getName(): string {
    return this.name;
  }

  getLength(): Promise<number> {
    return this.getModel().count({ is_completed: false }).exec();
  }

  createRoutine(script_id: string, schedule_id: ?string, ctx_id: string, date: Date): Promise<Routine> {
    const document = this.getModel()({
      context_id: ctx_id,
      queue_name: this.getName(),
      schedule_id: schedule_id,
      script_id: script_id,
      visible_from: date,
    });

    return document.save();
  }

  getRoutineWithLock(): Promise<?Routine> {
    const conditions = {
      is_completed: false,
      lock_id: null,
      queue_name: this.getName(),
      visible_from: { $lte: new Date() },
    };
    const doc = {
      lock_creation_time: new Date(),
      lock_id: new Mongoose.Types.ObjectId(),
    };

    return this.getModel().findOneAndUpdate(conditions, doc).exec();
  }

  removeUnlockedRoutines(schedule: Schedule): Promise<void> {
    const schedule_id: string = schedule.get('id');
    const conditions = { is_completed: false, lock_id: null, schedule_id: schedule_id};

    return this.getModel().find(conditions).remove().exec()
      .then(() => {});
  }

  unlockRoutine(routine: Routine): Promise<Routine> {
    return routine.update({ lock_id: null, lock_creation_time: null }).exec();
  }

  completeRoutine(routine: Routine): Promise<Routine> {
    return routine.update({ is_completed: true }).exec();
  }

  renewRoutine(routine: Routine): Promise<?Routine> {
    const script_id: string = routine.get('script_id');
    const schedule_id: string = routine.get('schedule_id');
    const context_id: string = routine.get('context_id');

    return ScheduleModel.findById(schedule_id).exec()
      .then((schedule: ?Schedule) => {
        if (schedule == null) {
          return null;
        }

        const recurrence: ?number = schedule.get('recurrence');
        if (recurrence == null || recurrence == 0) {
          return null;
        }

        const date = new Date(routine.get('visible_from').getTime() + recurrence);
        return this.createRoutine(script_id, schedule_id, context_id, date);
      });
  }
}

module.exports = Queue;
