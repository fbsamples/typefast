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

export type Expression = Map<string, List<number>>;
export type Extractor = () => number;
export type FrameHashMap = Map<number, number>;
export type Seeker = () => void;

const {List, Map} = require('immutable');

// To grant an expression repeating in time will need:
//
// 7: leap-years blocks
// 1461 = 365 * 4 + 1: days in a leap-year block
// 86400 = 24 * 60 * 60: seconds in a day
// 1000: bacause javascript...
const MAX_CALENDAR_UNIQUENESS_WINDOW_MS = 883612800000;

const get_hmaps = function(expression: Expression): Map<string, FrameHashMap> {
  return expression.map((frame: List<number>) => {
    return Map(frame.toSet().sort().toList().map((unit: number) => [unit, unit]).toSeq());
  });
};

const match_frame = function(hmap: FrameHashMap, extractor: Extractor): bool {
  return hmap.size === 0 || hmap.has(extractor());
};

const skip_frames = function(hmap: FrameHashMap, extractor: Extractor, seeker: Seeker): bool {
  if (!match_frame(hmap, extractor)) {
    seeker();
    return true;
  }
  return false;
};

const get_next_schedule_date_from_expression = function(since: Date, expression: Expression): Date {
  const hmaps = get_hmaps(expression);
  const next = new Date(since);
  next.setMinutes(next.getMinutes() + 1, 0, 0);

  const seekers = new List([
    () => skip_frames(hmaps.get('months', new Map()), () => next.getMonth(), () => {
      next.setMonth(next.getMonth() + 1, 1);
      next.setHours(0, 0);
    }),
    () => skip_frames(hmaps.get('days', new Map()), () => next.getDate(), () => {
      next.setDate(next.getDate() + 1);
      next.setHours(0, 0);
    }),
    () => skip_frames(hmaps.get('week_days', new Map()), () => next.getDay(), () => {
      next.setDate(next.getDate() + 1);
      next.setHours(0, 0);
    }),
    () => skip_frames(hmaps.get('hours', new Map()), () => next.getHours(), () => {
      next.setHours(next.getHours() + 1, 0);
    }),
    () => skip_frames(hmaps.get('minutes', new Map()), () => next.getMinutes(), () => {
      next.setMinutes(next.getMinutes() + 1, 0);
    }),
  ]);

  while (next - since <= MAX_CALENDAR_UNIQUENESS_WINDOW_MS) {
    if (seekers.findIndex((seeker: Seeker) => seeker()) === - 1) {
      return next;
    }
  }

  throw new Error('No occurrence will exists for the provided recurrence expression');
};

module.exports = {
  MAX_CALENDAR_UNIQUENESS_WINDOW_MS: MAX_CALENDAR_UNIQUENESS_WINDOW_MS,
  get_next_schedule_date_from_expression: get_next_schedule_date_from_expression,
};
