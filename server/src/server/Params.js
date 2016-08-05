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

class Params {

  data: Map<string, any>;

  constructor(data: Map<string, any>): void {
    this.data = data;
  }

  toMap(): Map<string, any> {
    return this.data;
  }

  hasKey(key: string): bool {
    return this.toMap().has(key);
  }

  isNull(key: string): bool {
    return this.toMap().get(key, undefined) == null;
  }

  getString(key: string): string {
    return this.toMap().get(key).toString();
  }

  getOptionalString(key: string, def?: string): ?string {
    return !this.isNull(key) ? this.getString(key) : def !== undefined ? def : null;
  }

  getNumber(key: string): number {
    return parseInt(this.toMap().get(key), 10);
  }

  getOptionalNumber(key: string, def?: number): ?number {
    return !this.isNull(key) ? this.getNumber(key) : def !== undefined ? def : null;
  }

  getBoolean(key: string): bool {
    return !!this.toMap().get(key);
  }

  getOptionalBoolean(key: string, def?: bool): ?bool {
    return !this.isNull(key) ? this.getBoolean(key) : def !== undefined ? def : null;
  }

  getMap(key: string): Map<string, any> {
    return new Map(this.toMap().get(key));
  }

  getOptionalMap(key: string, def?: Map<string, any>): ?Map<string, any> {
    return !this.isNull(key) ? this.getMap(key) : def !== undefined ? def : null;
  }

  getList(key: string): List<any> {
    return new List(this.toMap().get(key));
  }

  getOptionalList(key: string, def?: List<any>): ?List<any> {
    return !this.isNull(key) ? this.getList(key) : def !== undefined ? def : null;
  }

  getDate(key: string): Date {
    return new Date(this.toMap().get(key));
  }

  getOptionalDate(key: string, def?: Date): ?Date {
    return !this.isNull(key) ? this.getDate(key) : def !== undefined ? def : null;
  }
}

module.exports = Params;
