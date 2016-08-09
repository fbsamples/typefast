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

// Flow typeof won't work with import type
const {Model} = require('mongoose');

const AbstractDocumentListController = require('../AbstractDocumentListController');
const MongoIdParam = require('../../params/MongoIdParam');
const Schedule = require('../../../model/Schedule');

// implement ../ControllerInterface
class ScheduleListController extends AbstractDocumentListController {

  getBaseRoute(): string {
    return '/schedules';
  }

  getModel(): typeof Model {
    return Schedule;
  }

  getParams(): Map<string, AbstractParam<any>> {
    return super.getParams().merge({
      script_id: new MongoIdParam().optional(),
    });
  }

  getCriteria(context: Context): Map<string, any> {
    let criteria = super.getCriteria(context);
    if (!context.getParams().isNull('script_id')) {
      criteria = criteria.set('script_id', context.getParams().getString('script_id'));
    }

    return criteria;
  }
}

module.exports = ScheduleListController;
