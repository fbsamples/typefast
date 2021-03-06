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

import type AbstractParam from '../params/AbstractParam';
import type Application from '../../services/Application';
import type User from '../authentication/User';
import type {Resolve, Reject} from '../../utils/promises';

const HttpStatus = require('http-status-codes');
const Context = require('../RequestContext');
const {List, Map} = require('immutable');
const {genMap} = require('../../utils/promises');

const linearSearchDefined = function<T>(...test: Array<?T>): ?T {
  return new List(test).find((value: ?T) => value !== undefined, this, undefined);
};

class AbstractController {

  application: Application;

  constructor(application: Application): void {
    this.application = application;
  }

  getName(): string {
    return this.constructor.name;
  }

  getApplication(): Application {
    return this.application;
  }

  getParams(): Map<string, AbstractParam<any>> {
    return new Map();
  }

  // This method should be overriden
  genResponse(context: Context): void {
    const class_name = this.constructor.name;
    context.disposeWithInternalError(
      new Error(`${class_name} must implement abstract method genResponse`)
    );
  }

  willPrepareResponse(context: Context): Promise<Context> {
    return new Promise((resolve: Resolve<Context>, reject: Reject) => {
      context.getResponse().status(HttpStatus.OK);
      context.getResponse().set('Content-Type', 'application/json');
      resolve(context);
    });
  }

  willAuthorize(context: Context): Promise<Context> {
    const body = context.getRequest().body;
    const query = context.getRequest().query;
    const access_token = body['access_token'] || query['access_token'];

    if (access_token == null) {
      return context.willDisposeWithError(HttpStatus.UNAUTHORIZED, 'An active access token must be used');
    }

    return this.getApplication().getAuthentication().willAuthenticateUser(access_token)
      .then((user: User) => context.setUser(user))
      .catch((error: Error) => context.willDisposeWithError(HttpStatus.UNAUTHORIZED, error.message));
  }

  willValidate(context: Context): Promise<Context> {
    const body = context.getRequest().body;
    const query = context.getRequest().query;

    // Filter out optional params without a corresponding value
    // Will allow controllers to differenciate an optional empty value from a missing optional value
    const params = this.getParams().filterNot((param: AbstractParam<any>, field: string) => {
      const value = linearSearchDefined(body[field], query[field]);
      return value === undefined && param.isOptional() && !param.hasDefaultValue();
    });

    const do_validate = (param: AbstractParam<any>, field: string) => {
      const value = linearSearchDefined(body[field], query[field], param.getDefaultValue());
      if (!param.isOptional() && value == null) {
        return Promise.reject(new Error(`Missing required field '${field}'`));
      }

      return value === undefined
        ? undefined
        : param.willValidate(value).catch((error: Error) => {
          error.message = `Field '${field}': ${error.message}`;

          return Promise.reject(error);
        });
    };

    return new Promise((resolve: Resolve<Context>, reject: Reject) => {
      genMap(params.map(do_validate))
        .then((values: Map<string, any>) => resolve(context.setParamsData(values)))
        .catch((error: Error) => {
          return context.willDisposeWithError(HttpStatus.BAD_REQUEST, error.message);
        });
    });
  }

  willRespond(context: Context): Promise<Context> {
    return new Promise((resolve: Resolve<Context>, reject: Reject) => {
      context.once(Context.events.DISPOSE, () => resolve(context));
      this.genResponse(context);
    });
  }

  dispatch(context: Context): Promise<void> {
    return this.willPrepareResponse(context)
      .then((context: Context) => this.willAuthorize(context))
      .then((context: Context) => this.willValidate(context))
      .then((context: Context) => this.willRespond(context))
      .then((context: Context) => context.dispose())
      .catch((err: Error) => context.disposeWithInternalError(err));
  }
}

module.exports = AbstractController;
