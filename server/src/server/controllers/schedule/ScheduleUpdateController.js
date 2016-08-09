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

const AbstractDocumentUpdateController = require('../AbstractDocumentUpdateController');
const IntegerParam = require('../../params/IntegerParam');
const OrParam = require('../../params/OrParam');
const Schedule = require('../../../model/Schedule');
const BooleanParam = require('../../params/BooleanParam');
const {List} = require('immutable');

// implement ../ControllerInterface
class ScheduleUpdateController extends AbstractDocumentUpdateController {

  getBaseRoute(): string {
    return '/schedules';
  }

  getModel(): typeof Model {
    return Schedule;
  }

  getParams(): Map<string, AbstractParam<any>> {
    return super.getParams().merge({
      is_paused: new BooleanParam().optional(),
      recurrence: new OrParam(new List([
        new IntegerParam().setMin(3600000), // 1h min intval,
        new IntegerParam().setMin(0).setMax(0)
      ])).optional()
    });
  }

  genResponse(context: Context): void {
    const scheduler = this.getApplication().getScheduler();
    const schedule = context.getTarget();
    const params = context.getParams();
    const was_paused: bool = schedule.get('is_paused');

    const data = {
      is_paused: params.getBoolean('is_paused', schedule.get('is_paused')),
      recurrence: params.getOptionalNumber('recurrence', schedule.get('recurrence')),
    };

    context.execPromise(context.getTarget().set(data).save({ new: true }))
      .then((doc: Document) => {
        const is_paused: bool = schedule.get('is_paused');
        if (was_paused && !is_paused) {
          return scheduler.cleanSchedule(schedule).then(() => doc);
        } else if (!was_paused && is_paused) {
          return scheduler.enqueueScheduled(schedule).then(() => doc);
        }

        return doc;
      })
      .then((doc: Document) => context.sendDocument(doc));
  }
}

module.exports = ScheduleUpdateController;
