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
import type {ControllerInterface} from './controllers/ControllerInterface';
import type {HandleCallback, Request, Response, Router as ExpressRouter} from 'express';

const Context = require('./RequestContext');
const express = require('express');
const Layer = require('express/lib/router/layer');

class Router {

  application: Application;
  webRouter: ExpressRouter;

  constructor(application: Application): void {
    this.application = application;
    this.webRouter = express.Router();
  }

  getApplication(): Application {
    return this.application;
  }

  getWebRouter(): ExpressRouter {
    return this.webRouter;
  }

  buildContext(request: Request, response: Response): Context {
    return new Context(this.getApplication(), request, response);
  }

  getRequestCallback(controller: ControllerInterface): HandleCallback {
    // This handler will be called by express internals, with an undefined context
    const self = this;
    return function(request: Request, response: Response, next: Function): void {
      controller.dispatch.bind(controller)(self.buildContext(request, response));
    };
  }

  mountCountroller(controller: ControllerInterface): this {
    const route = this.getWebRouter().route(controller.getRoute());
    const handler = this.getRequestCallback(controller);
    controller.getRouteMethods().forEach(method => {
      route.methods[method] = true;
      const layer = new Layer(controller.getRoute(), {}, handler);
      layer.method = method;
      route.stack.push(layer);
    });

    return this;
  }
}

module.exports = Router;
