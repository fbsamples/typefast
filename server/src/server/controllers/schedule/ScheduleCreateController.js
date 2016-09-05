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

import type AbstractParam from '../../params/AbstractParam';
import type Context from '../../RequestContext';
import type {Map} from 'immutable';
import type {Schedule} from '../../../model/Schedule';
import type {Script} from '../../../model/Script';

const AbstractDocumentCreateController = require('../AbstractDocumentCreateController');
const DateParam = require('../../params/DateParam');
const BooleanParam = require('../../params/BooleanParam');
const HttpStatus = require('http-status-codes');
const MongoIdParam = require('../../params/MongoIdParam');
const ScheduleRecurrenceParam = require('../../params/ScheduleRecurrenceParam');
const ScheduleModel = require('../../../model/Schedule');
const ScriptModel = require('../../../model/Script');
const StringParam = require('../../params/StringParam');
const QueueNameParam = require('../../params/QueueNameParam');

class ScheduleCreateController extends AbstractDocumentCreateController {

  getBaseRoute(): string {
    return '/schedules';
  }

  getModel(): typeof ScheduleModel {
    return ScheduleModel;
  }

  getParams(): Map<string, AbstractParam<any>> {
    const ctx_id = this.getApplication().getConfig().getString('graph.business_manager_id');
    return super.getParams().merge({
      context_id: new StringParam().setMinLength(1).setDefaultValue(ctx_id),
      start_time: new DateParam().setDefaultValue(new Date()),
      is_paused: new BooleanParam().setDefaultValue(false),
      recurrence: new ScheduleRecurrenceParam().optional(),
      script_id: new MongoIdParam(),
      queue_name: new QueueNameParam(this.getApplication().getScheduler()),
    });
  }

  genResponse(context: Context): void {
    const scheduler = this.getApplication().getScheduler();
    const script_id = context.getParams().getString('script_id');
    const recurrence = context.getParams().getOptionalMap('recurrence');
    const schedule = ScheduleModel({
      context_id: context.getParams().getString('context_id'),
      start_time: context.getParams().getDate('start_time'),
      is_paused: context.getParams().getBoolean('is_paused'),
      queue_name: context.getParams().getString('queue_name'),
      recurrence: recurrence == null ? null : recurrence.toJS(),
      script_id: script_id,
    });

    const chain = ScriptModel.findById(script_id).exec()
      .then((script: ?Script) => {
        return script || context.willDisposeWithError(HttpStatus.BAD_REQUEST, `Unknown script with id '${script_id}'`);
      })
      .then(() => {
        return schedule.save().then((schedule: Schedule) => {
          const is_paused: bool = schedule.get('is_paused');
          if (is_paused) {
            return schedule;
          }
          return scheduler.enqueueScheduled(schedule)
            .then(() => schedule)
            .catch((error: Error) => {
              // Rollback schedule creation
              return this.getModel().findById(schedule.get('id')).remove().exec()
                .then(() => Promise.reject(error));
            });
        });
      });

    context.execPromise(chain)
      .then((schedule: Schedule) => context.sendDocument(schedule));
  }
}

module.exports = ScheduleCreateController;
