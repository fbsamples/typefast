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

import type {Document, Schema} from 'mongoose';

export type OnScheduleCallback = (routine_id: string) => void;
export type OnLengthCallback = (count: number) => void;
export type OnRoutineCallback = (routine: ?Document) => void;
export type RoutineEndingOperation = (routine: Document, callback?: OnRoutineCallback) => Queue;

export type Routine = Document;

const Mongoose = require('mongoose');
// Flow typeof won't work with import type
const {Model} = require('mongoose');

class Queue {

  model: typeof Model;

  // WARNING: instanciating 2 different schemas on the same collection
  // will set the world on fire!!!
  static fromSchema(schema: Schema, collection_name: string): Queue {
    const model = Mongoose.model(collection_name, schema, collection_name);
    return new Queue(model);
  }

  constructor(model: typeof Model): void {
    this.model = model;
  }

  getModel(): typeof Model {
    return this.model;
  }

  getLength(callback?: OnLengthCallback): this {
    const conditions = {
      is_completed: false,
    };
    this.getModel().count(conditions, (err: ?Error, count: number) => {
      callback && callback(count);
    });

    return this;
  }

  createRoutine(script_id: string, date: Date, callback?: OnScheduleCallback): this {
    const document = this.getModel()({
      script_id: script_id,
      visible_from: date,
    });
    document.save((err: ?Error, res: Document) => res && callback && callback(res.get('id')));

    return this;
  }

  getRoutineWithLock(callback?: OnRoutineCallback): this {
    const conditions = {
      is_completed: false,
      lock_id: null,
      visible_from: { $lte: new Date() },
    };
    const doc = {
      lock_creation_time: new Date(),
      lock_id: new Mongoose.Types.ObjectId(),
    };
    this.getModel().findOneAndUpdate(
      conditions,
      doc,
      {},
      (err: ?Error, routine: ?Document) => { callback && callback(routine); }
    );

    return this;
  }

  unlockRoutine(routine: Document, callback?: OnRoutineCallback): this {
    const doc = {
      lock_id: null,
      lock_creation_time: null,
    };
    routine.update(
      doc,
      {},
      (err: ?Error, routine: ?Document) => { callback && callback(routine); }
    );

    return this;
  }

  completeRoutine(routine: Routine, callback?: OnRoutineCallback): this {
    const doc = {
      is_completed: true,
    };
    routine.update(
      doc,
      {},
      (err: ?Error, routine: ?Document) => { callback && callback(routine); }
    );

    return this;
  }

  renewRoutine(routine: Document, callback?: OnRoutineCallback): this {
    // FIXME Update schedule if no locks
    throw new Error('Recurrent scheduling not yet supported');

    //return this;
  }
}

module.exports = Queue;
