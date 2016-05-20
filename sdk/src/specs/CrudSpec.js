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

import type {RequestMethod} from './../http/Request';

export type CrudFunction = | 'READ' | 'UPDATE' | 'DELETE';

const {Map} = require('immutable');

const crud_function_to_method: Map<CrudFunction, RequestMethod> = new Map({
  DELETE: 'DELETE',
  READ: 'GET',
  UPDATE: 'POST',
});

class CrudSpec {

  crudFunction: CrudFunction;

  static fromSchema(schema: Object): CrudSpec {
    return new CrudSpec(schema.name.substr(1).toUpperCase());
  }

  constructor(crud_function: CrudFunction): void {
    this.crudFunction = crud_function;
  }

  getCrudFunction(): CrudFunction {
    return this.crudFunction;
  }

  getMethod(): RequestMethod {
    return crud_function_to_method.get(this.getCrudFunction());
  }

  getFunctionName(): string {
    return this.getCrudFunction().toLowerCase();
  }
}

module.exports = CrudSpec;
