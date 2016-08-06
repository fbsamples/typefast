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

import type Application from '../services/Application';
import type {Document} from 'mongoose';
import type {Request, Response} from 'express';
import type {Resolve, Reject} from '../utils/promises';

const HttpStatus = require('http-status-codes');
const Params = require('./Params');
const {EventEmitter} = require('events');
const {Map} = require('immutable');

class RequestContext extends EventEmitter {

  static events: { [key: string]: string };

  application: Application;
  params: Params;
  isResponseFinished: bool;
  target: ?Document;
  request: Request;
  response: Response;

  constructor(application: Application, request: Request, response: Response): void {
    super();
    this.params = new Params(new Map());
    this.application = application;
    this.request = request;
    this.response = response;
    this.isResponseFinished = false;
    this.response.once('finish', () => {
      this.isResponseFinished = true;
      this.emit(RequestContext.events.DISPOSE);
    });
  }

  getApplication(): Application {
    return this.application;
  }

  getRequest(): Request {
    return this.request;
  }

  getResponse(): Response {
    return this.response;
  }

  setParamsData(data: Map<string, any>): this {
    this.params = new Params(data);

    return this;
  }

  getParams(): Params {
    return this.params;
  }

  isDisposed(): bool {
    return this.isResponseFinished;
  }

  hasTarget(): bool {
    return this.target != null;
  }

  setTarget(doc: Document): this {
    this.target = doc;

    return this;
  }

  getTarget(): Document {
    return this.nullThrows(this.target);
  }

  getTargetId(): string {
    return this.getTarget().get('id');
  }

  getErrorBody(http_status: number, user_message?: string, data?: Object): Object {
    const http_message = HttpStatus.getStatusText(http_status);
    const body = {
      error: {
        code: http_status,
        message: http_message,
        user_message: user_message || http_message
      }
    };

    for (let i in data) {
      body.error[i] = data[i];
    }

    return body;
  }

  dispose(): this {
    if (!this.isDisposed()) {
      this.getResponse().end();
    }

    return this;
  }

  disposeWithError(status: number, user_message?: string, data?: Object): this {
    if (!this.isDisposed()) {
      this.getResponse()
        .status(status)
        .send(this.getErrorBody(status, user_message, data));

      return this.dispose();
    }

    return this;
  }

  disposeWithInternalError(error: Error): void {
    const debug = this.getApplication().getConfig().getBoolean('debug');
    const err_message = error.message;
    const data = !debug ? undefined : {
      debug_message: `${err_message}`,
      stack: error.stack.split('\n'),
    };
    this.disposeWithError(HttpStatus.INTERNAL_SERVER_ERROR, undefined, data);
  }

  willDisposeWithError(status: number, user_message?: string): Promise<RequestContext> {
    return new Promise((resolve: Resolve<RequestContext>, reject: Reject) => {
      if (!this.isDisposed()) {
        this.once(RequestContext.events.DISPOSE, () => reject());
        this.disposeWithError(status, user_message);
      } else {
        reject();
      }
    });
  }

  willDisposeWithInternalError(error: Error): Promise<RequestContext> {
    return new Promise((resolve: Resolve<RequestContext>, reject: Reject) => {
      if (!this.isDisposed()) {
        this.once(RequestContext.events.DISPOSE, () => reject());
        this.disposeWithInternalError(error);
      } else {
        reject(error);
      }
    });
  }

  assert(condition: bool, user_message?: string): this {
    if (!condition) {
      throw new Error(user_message == null ? 'Unknown error' : user_message);
    }

    return this;
  }

  nullThrows<T>(subject: ?T, user_message?: string): T {
    if (subject == null) {
      throw new Error(user_message == null ? 'Unknown error' : user_message);
    }

    return subject;
  }

  execPromise<T>(promise: Promise<T>): Promise<T> {
    return promise
      .catch((err: Error) => this.disposeWithInternalError(err));
  }

  exportDocument(doc: Document): Object {
    const obj = doc.toObject({
      getters: true,
      versionKey: false,
      virtuals: true,
    });

    delete obj._id;

    return obj;
  }

  sendDocument(doc: Document): this {
    this.getResponse().send(this.exportDocument(doc));

    return this;
  }

  sendTarget(): this {
    return this.sendDocument(this.getTarget());
  }
}

RequestContext.events = {
  DISPOSE: 'dispose',
};

module.exports = RequestContext;
