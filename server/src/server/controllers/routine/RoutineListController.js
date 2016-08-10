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
import type {Map} from 'immutable';

const AbstractDocumentListController = require('../AbstractDocumentListController');
const MongoIdParam = require('../../params/MongoIdParam');
const QueueNameParam = require('../../params/QueueNameParam');
const RoutineModel = require('../../../model/Routine');
const {List} = require('immutable');

class RoutineListController extends AbstractDocumentListController {

  getRoute(): string {
    return '/routines';
  }

  getModel(): typeof RoutineModel {
    return RoutineModel;
  }

  getParams(): Map<string, AbstractParam<any>> {
    return super.getParams().merge({
      queue_name: new QueueNameParam(this.getApplication().getScheduler()).optional(),
      schedule_id: new MongoIdParam().optional(),
    });
  }

  getParamBindings(): List<string> {
    return new List([
      'queue_name',
      'schedule_id'
    ]);
  }
}

module.exports = RoutineListController;
