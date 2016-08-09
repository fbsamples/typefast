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

const AbstractParam = require('./AbstractParam');
const {isNumeric} = require('validator');

class NumberParam extends AbstractParam<number> {

  min: number;
  max: number;

  constructor() {
    super();
    this.min = Number.MIN_VALUE;
    this.max = Number.MAX_VALUE;
  }

  setMin(min: number): this {
    this.min = min;

    return this;
  }

  getMin(): number {
    return this.min;
  }

  setMax(max: number): this {
    this.max = max;

    return this;
  }

  getMax(): number {
    return this.max;
  }

  willValidate(value: any): Promise<number> {
    return super.willValidate(value).then((subject: any) => {
      if (!isNumeric(subject.toString())) {
        return Promise.reject(new Error(`'${value}', not a valid number`));
      }

      const num = Number(subject);
      const min = this.getMin();
      const max = this.getMax();

      if (num < min) {
        return Promise.reject(new Error(`Can't be lower than ${min}`));
      }

      if (num > max) {
        return Promise.reject(new Error(`Can't be greater than ${max}`));
      }

      return num;
    });
  }
}

module.exports = NumberParam;
