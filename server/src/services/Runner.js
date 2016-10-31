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
import type {ContextualizedRoutine} from '../scheduler/Scheduler';
import type {Resolve, Reject} from '../utils/promises';
import type {Routine} from '../model/Routine';
import type {Schedule} from '../model/Schedule';
import type {Script} from '../model/Script';

const AbstractService = require('./AbstractService');
const Sandbox = require('../sandbox/Sandbox');
const ScheduleModel = require('../model/Schedule');
const ScriptModel = require('../model/Script');

const nullthrows = require('../utils/nullthrows');
const sandbox_template = require('../sandbox/template');

// implement ServiceInterface
class Runner extends AbstractService {

  routineId: string;
  sandbox: Sandbox;

  constructor(config: Config, routine_id: string): void {
    super(config);
    this.sandbox = new Sandbox();
    this.sandbox.setTimeout(config.getInteger('sandbox.timeout'));
    this.routineId = routine_id;
  }

  getSandbox(): Sandbox {
    return this.sandbox;
  }

  getRoutineId(): string {
    return this.routineId;
  }

  willGetRoutine(routine_id: string): Promise<Routine> {
    return this.getScheduler().getRoutine(routine_id)
      .then((pair: ?ContextualizedRoutine) => pair || Promise.reject(new Error(`Unknown routine '${routine_id}'`)))
      .then((pair: ContextualizedRoutine) => pair.routine );
  }

  willGetSchedule(schedule_id: string): Promise<Schedule> {
    return ScheduleModel.findById(schedule_id).exec()
      .then((schedule: ?Schedule) => schedule || Promise.reject(new Error(`Unknown scheudle '${schedule_id}'`)));
  }

  willGetScript(script_id: string): Promise<Script> {
    return ScriptModel.findById(script_id).exec()
      .then((script: ?Script) => script || Promise.reject(new Error(`Unknown script '${script_id}'`)));
  }

  willExecSandbox(script: Script, context_id: string): Promise<void> {
    return new Promise((resolve: Resolve<void>, reject: Reject) => {
      this.getSandbox().setSharedObject(sandbox_template(this.getConfig(), script, context_id));
      this.emit(Runner.events.INIT);
      // Prioritize service listeners as sanxbox execute syncronously
      process.nextTick(() => {
        this.getSandbox().run(script.get('code'), script.get('title'));
        resolve();
      });
    });
  }

  init(): void {
    const routine_id = this.getRoutineId();
    let context_id: ?string = null;
    this.willGetRoutine(routine_id)
      .then((routine: Routine) => this.willGetSchedule(routine.get('schedule_id')))
      .then((schedule: Schedule) => {
        context_id = schedule.get('context_id');
        return this.willGetScript(schedule.get('script_id'));
      })
      .then((script: Script) => this.willExecSandbox(script, nullthrows(context_id)))
      .then(() => { this.emit(Runner.events.END); })
      .catch((error: Error) => process.nextTick(() => { throw error; }));
  }
}

module.exports = Runner;
