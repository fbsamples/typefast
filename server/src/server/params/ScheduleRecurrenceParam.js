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

const AbstractJsonParam = require('./AbstractJsonParam');
const IntegerParam = require('./IntegerParam');
const {List, Map, Set} = require('immutable');
const {genMap, genSet} = require('../../utils/promises');
const {get_next_schedule_date_from_expression} = require('../../scheduler/utils/recurrences');

const MIN_ALLOWED_INTERVAL_MS = 3600000; // 1 hour

class ScheduleRecurrenceParam extends AbstractJsonParam<Object> {

  getValidator(param: IntegerParam): (subject: any) => Promise<List<number>> {
    return (subject: any): Promise<List<number>> => {
      return subject instanceof Array
        ? genSet(new Set(subject).map((unit: any) => param.willValidate(unit)))
          .then((set: Set<number>) => set.sort().toList())
        : subject == null ? Promise.resolve(new List()) : Promise.reject(new Error('not an array'));
    };
  }

  willValidate(value: any): Promise<Map<string, List<number>>> {
    return super.willValidate(value).then((subject: Object) => {
      const input = new Map(subject);
      const subs = new Map({
        minutes: new IntegerParam().setMin(0).setMax(59),
        hours: new IntegerParam().setMin(0).setMax(23),
        days: new IntegerParam().setMin(1).setMax(31),
        week_days: new IntegerParam().setMin(0).setMax(6),
        months: new IntegerParam().setMin(0).setMax(11),
      });

      return genMap(subs.map((param: IntegerParam, frame: string) => {
        return this.getValidator(param)(input.get(frame, []))
          .catch((error: Error) => Promise.reject(new Error(`'${frame}' frame: ${error.message}`)));
      }))
        .then((recurrence: Map<string, List<number>>) => {
          const now = new Date();
          const next = get_next_schedule_date_from_expression(now, recurrence);
          const another = get_next_schedule_date_from_expression(next, recurrence);

          return another - next < MIN_ALLOWED_INTERVAL_MS
            ? Promise.reject(new Error(
              `Recurrence doens't meet expected minimum routine inteval of ${MIN_ALLOWED_INTERVAL_MS} ms`
            ))
            : recurrence;
        });
    });
  }
}

module.exports = ScheduleRecurrenceParam;
