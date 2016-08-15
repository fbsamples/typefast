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

const assert = require('assert');
const fs = require('fs');
const {fromJS, List, Map} = require('immutable');

export type Argv = Map<string, string | number | bool>;

const INLINE_CONFIG_KEY = 'inline-config';

const READ_FILE_OPTS = {
  encoding: 'UTF-8',
  flag: 'r'
};

const fileExists = function(filepath: string): bool {
  try {
    fs.accessSync(filepath, fs.R_OK);
    return true;
  } catch (e) {}
  return false;
};

const readJson = function(filepath: string): Object {
  return JSON.parse(fs.readFileSync(filepath, READ_FILE_OPTS));
};

class Config {

  data: Map<string, any>;

  static fromArgv(argv: Argv): Config {
    const data = new List([
      __dirname + '/../config/default.json',
      __dirname + '/../config/local.json',
    ]).filter(fileExists)
      .map((path: string) => readJson(path))
      .push(JSON.parse(argv.get(INLINE_CONFIG_KEY, '{}').toString()))
      .unshift(new Map()) // will be first element to deep-merge into
      .reduce((first: Map<string, any>, next: Object) => first.mergeDeep(next));

    return new Config(data);
  }

  constructor(data: Map<string, any>): void {
    this.data = data;
  }

  getData(): Map<string, any> {
    return this.data;
  }

  resolveSubtree(subtree: string): any {
    return this.data.getIn(subtree.split('.'), undefined);
  }

  getAny(subtree: string): any {
    return this.resolveSubtree(subtree);
  }

  getBoolean(subtree: string): bool {
    const leaf = this.resolveSubtree(subtree);
    assert(typeof leaf === 'boolean');
    return leaf;
  }

  getNumber(subtree: string): number {
    const leaf = this.resolveSubtree(subtree);
    assert(Number.isFinite(leaf));
    return leaf;
  }

  getInteger(subtree: string): number {
    const leaf = this.resolveSubtree(subtree);
    assert(Number.isInteger(leaf));
    return leaf;
  }

  getString(subtree: string): string {
    const leaf = this.resolveSubtree(subtree);
    assert(typeof leaf === 'string');
    return leaf;
  }

  getMap(subtree: string): Map<string, any> {
    const leaf = this.resolveSubtree(subtree);
    assert(leaf instanceof Object);
    return fromJS(leaf);
  }

  getList(subtree: string): List<any> {
    const leaf = this.resolveSubtree(subtree);
    assert(leaf instanceof Array);
    return fromJS(leaf);
  }
}

module.exports = Config;
