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

import type {Set} from 'immutable';

const AbstractParam = require('./AbstractParam');

class EnumParam<T> extends AbstractParam<T> {

  allowedValues: Set<T>;

  constructor(allowed_values: Set<T>): void {
    super();
    this.allowedValues = allowed_values;
  }

  getAllowedValues(): Set<T> {
    return this.allowedValues;
  }

  willValidate(value: any): Promise<T> {
    return super.willValidate(value).then((subject: any) => {
      if (!this.getAllowedValues().includes(subject)) {
        const plain = this.getAllowedValues().join(', ');
        return Promise.reject(new Error(`'${value}', not a valid value. Accepted values are: ${plain}`));
      }

      return subject;
    });
  }
}

module.exports = EnumParam;
