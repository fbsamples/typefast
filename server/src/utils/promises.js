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

const {List, Map} = require('immutable');

type Promisable<T> = Promise<T> | T;

const genList = function<T>(promises: List<Promisable<T>>): Promise<List<T>> {
  return Promise.all(promises.toArray())
    .then((array: Array<T>) => new List(array));
};

const genMap = function<T>(promises: Map<string, Promisable<T>>): Promise<Map<string, T>> {
  const keys = promises.keySeq();

  return Promise.all(promises.toArray())
   .then((values: Array<T>) => Map(new List(values).map(
    (value: T, index: number) => [keys.get(index), value]).toSeq()
  ));
};

module.exports = {
  genList: genList,
  genMap: genMap,
  genArray: Promise.all,
};
