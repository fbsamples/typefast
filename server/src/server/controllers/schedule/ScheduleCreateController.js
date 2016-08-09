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
import type {Document} from 'mongoose';
import type {Map} from 'immutable';

// Flow typeof won't work with import type
const {Model} = require('mongoose');

const AbstractDocumentCreateController = require('../AbstractDocumentCreateController');
const DateParam = require('../../params/DateParam');
const BooleanParam = require('../../params/BooleanParam');
const HttpStatus = require('http-status-codes');
const IntegerParam = require('../../params/IntegerParam');
const OrParam = require('../../params/OrParam');
const MongoIdParam = require('../../params/MongoIdParam');
const Schedule = require('../../../model/Schedule');
const Script = require('../../../model/Script');
const StringParam = require('../../params/StringParam');
const QueueNameParam = require('../../params/QueueNameParam');
const {List} = require('immutable');

class ScheduleCreateController extends AbstractDocumentCreateController {

  getBaseRoute(): string {
    return '/schedules';
  }

  getModel(): typeof Model {
    return Schedule;
  }

  getParams(): Map<string, AbstractParam<any>> {
    const ctx_id = this.getApplication().getConfig().getString('DEPRECATED__cxt_id');
    return super.getParams().merge({
      context_id: new StringParam().setMinLength(1).setDefaultValue(ctx_id),
      start_time: new DateParam().setDefaultValue(new Date()),
      is_paused: new BooleanParam().setDefaultValue(false),
      recurrence: new OrParam(new List([
        new IntegerParam().setMin(3600000), // 1h min intval,
        new IntegerParam().setMin(0).setMax(0)
      ])).setDefaultValue(0).optional(),
      script_id: new MongoIdParam(),
      queue_name: new QueueNameParam(this.getApplication().getScheduler()),
    });
  }

  genResponse(context: Context): void {
    const scheduler = this.getApplication().getScheduler();
    const script_id = context.getParams().getString('script_id');
    const schedule = Schedule({
      context_id: context.getParams().getString('context_id'),
      start_time: context.getParams().getDate('start_time'),
      is_paused: context.getParams().getBoolean('is_paused'),
      queue_name: context.getParams().getString('queue_name'),
      recurrence: context.getParams().getOptionalNumber('recurrence'),
      script_id: script_id,
    });

    const chain = Script.findById(script_id).exec()
      .then((script: ?Document) => {
        return script || context.willDisposeWithError(HttpStatus.BAD_REQUEST, `Unknown script with id '${script_id}'`);
      })
      .then(() => {
        return schedule.save().then((schedule: Document) => {
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
      .then((schedule: Document) => context.sendDocument(schedule));
  }
}

module.exports = ScheduleCreateController;
