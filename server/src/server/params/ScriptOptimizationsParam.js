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

const ERROR_MSG = 'Expected JSON representation of Map<string, Array<string>>';

class ScriptOptimizationsParam extends AbstractJsonParam<Object> {

  willValidate(value: any): Promise<Object> {
    return super.willValidate(value).then((value: any) => {
      if (!value instanceof Object) {
        return Promise.reject(new Error(ERROR_MSG));
      }

      for (let i in value) {
        if (!(value[i] instanceof Array)) {
          return Promise.reject(new Error(ERROR_MSG));
        }

        for (let j = 0; j <= value[i].length; j++) {
          if (!typeof value[i][j] === 'string') {
            return Promise.reject(new Error(ERROR_MSG));
          }
        }
      }

      return value;
    });
  }
}

module.exports = ScriptOptimizationsParam;
