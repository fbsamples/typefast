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

 // eslint-disable-next-line no-undef
export interface LogEntry {
  chunk: string;
  stream: string;
  time: Date;
}

const Mongoose = require('mongoose');
const schema = new Mongoose.Schema({
  creation_time: { type: Date },
  is_completed: { type: Boolean, default: false },
  lock_creation_time: { type: Date, default: null },
  lock_id: { type: Mongoose.Schema.ObjectId, default: null },
  queue_name: { type: String, required: true },
  runner_end_time: { type: Date, default: null },
  runner_exit_code: { type: Number, default: 0 },
  runner_log: { type: Array, value: { type: { time: Date, stream: String, chunk: String } } },
  runner_start_time: { type: Date, default: null },
  schedule_id: { type: Mongoose.Schema.ObjectId, required: true },
  visible_from: { type: Date, require: true },
});

schema.index({
  is_completed: 1,
  lock_id: 1,
  queue_name: 1,
  visible_from: 1,
});

schema.pre('save', function(next) {
  this.creation_time = this.creation_time || new Date();
  next();
});

module.exports = schema;
