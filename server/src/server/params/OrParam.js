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

import type {Resolve, Reject} from '../../utils/promises';

const AbstractParam = require('./AbstractParam');
const {List} = require('immutable');

class OrParam<T> extends AbstractParam<T> {

  params: List<AbstractParam<T>>;

  constructor(params: List<AbstractParam<T>>) {
    super();
    this.params = params;
  }

  getParams(): List<AbstractParam<T>> {
    return this.params;
  }

  willValidate(value: any): Promise<T> {
    return super.willValidate(value).then((subject: T) => {
      return new Promise((resolve: Resolve<T>, reject: Reject) => {
        // FIXME this can potentially result in a random order of message joined together
        // Ideally should be a preallocated map where errors are set using the same imput key
        const errors = new List().asMutable();
        this.getParams().forEach((param: AbstractParam<T>) => {
          param.willValidate(subject).then((subject: T) => {
            resolve(subject);
          }).catch((error: Error) => {
            errors.push(error);
            if (errors.size === this.getParams().size) {
              reject(new Error('OR Condition: ' + errors.map(
                (error: Error, key: number) => `[${key}]: ${error.message}`
              ).join('. ')));
            }
          });
        });
      });
    });
  }
}

module.exports = OrParam;
