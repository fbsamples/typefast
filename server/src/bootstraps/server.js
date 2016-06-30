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

import type {Argv} from '../Config';
import type {ControllerInterface} from '../controllers/ControllerInterface';
import type {RequestMethod} from 'express';

const Application = require('../services/Application');
const Config = require('../Config');
const HttpStatus = require('http-status-codes');
const methods = require('methods');
const {List, Set} = require('immutable');

// controllers
const HttpErrorController = require('../controllers/HttpErrorController');
const ScriptRestController = require('../controllers/ScriptRestController');
const ScriptExecController = require('../controllers/ScriptExecController');

const getHttpMethods = function(): Set<RequestMethod> {
  return new Set(methods);
};

const getControllers = function(app: Application): List<ControllerInterface> {
  return new List([
    new ScriptRestController(app),
    new ScriptExecController(app),
    new HttpErrorController(app, app.getAllowedRequestMethods(), HttpStatus.NOT_FOUND),
    new HttpErrorController(app, getHttpMethods(), HttpStatus.METHOD_NOT_ALLOWED)
  ]);
};

const bootstrap = function(argv: Argv): Application {
  const app = new Application(Config.fromArgv(argv));
  getControllers(app).forEach(controller => app.getRouter().mountCountroller(controller));
  app.on(Application.events.INIT, () => {
    const addr = app.getConfig().getString('https.bind.addr');
    const port = app.getConfig().getInteger('https.bind.port');
    console.log(`Server listening on https://${addr}:${port}/`);
  });
  return app;
};

module.exports = bootstrap;
