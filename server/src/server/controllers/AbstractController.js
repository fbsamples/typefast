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

import type Application from '../../services/Application';

export type Resolve<T> = (result: Promise<T> | T) => void;
export type Reject = (error: any) => void;

const HttpStatus = require('http-status-codes');
const Context = require('../RequestContext');

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
    return new Promise((resolve: Resolve<Context>, reject: Reject) => resolve(context));
  }

  willValidate(context: Context): Promise<Context> {
    return new Promise((resolve: Resolve<Context>, reject: Reject) => resolve(context));
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
