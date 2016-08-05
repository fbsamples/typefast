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
import type {RequestMethod} from 'express';
import type {Map} from 'immutable';

const AbstractController = require('../AbstractController');
const MongoIdParam = require('../../params/MongoIdParam');
const QueueNameParam = require('../../params/QueueNameParam');
const {List, Set} = require('immutable');

class RoutineListController extends AbstractController {

  getRoute(): string {
    return '/routines';
  }

  getRouteMethods(): Set<RequestMethod> {
    return new Set(['get']);
  }

  getParams(): Map<string, AbstractParam<any>> {
    return super.getParams().merge({
      queue_name: new QueueNameParam(this.getApplication().getScheduler()),
      schedule_id: new MongoIdParam().optional(),
    });
  }

  genResponse(context: Context): void {
    const queue_name = context.getParams().getString('queue_name');
    const queue = this.getApplication().getScheduler().getQueues().get(queue_name);
    const schedule_id = context.getParams().getOptionalString('schedule_id');
    const query = schedule_id == null ? {} : { schedule_id: schedule_id };

    context.execPromise(queue.getModel().find(query).sort({ creation_time: -1 }).exec())
      .then((docs: Array<Document>) => {
        context.getResponse().send({
          data: new List(docs).map(context.exportDocument)
        });
      });
  }
}

module.exports = RoutineListController;
