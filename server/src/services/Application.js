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

import type Config from '../Config';
import type {Application as ExpressApplication, RequestMethod} from 'express';

const AbstractService = require('./AbstractService');
const express = require('express');
const Filesystem = require('fs');
const Https = require('https');
const bodyParser = require('body-parser');
const Router = require('../Router');
const {Map, Set} = require('immutable');

class Application extends AbstractService {

  allowedRequestMethods: Set<RequestMethod>;
  router: Router;
  webApplication: ExpressApplication;

  constructor(config: Config): void {
    super(config);
    this.webApplication = express();
    this.allowedRequestMethods = new Set(['get', 'post', 'delete']);
    this.router = new Router(this);

    // Middleware
    this.webApplication.use(bodyParser.urlencoded({extended: true}));
    this.webApplication.disable('etag');
    if (this.getConfig().getBoolean('https.client.enable_delivery')) {
      this.webApplication.use('/', express.static(
        this.getConfig().getString('https.client.root')
      ));
    }

    // API Routing
    this.webApplication.use('/', this.getRouter().getWebRouter());
  }

  getAllowedRequestMethods(): Set<RequestMethod> {
    return this.allowedRequestMethods;
  }

  getRouter(): Router {
    return this.router;
  }

  getWebApplication(): ExpressApplication {
    return this.webApplication;
  }

  init(): void {
    const options = new Map({key: 'https.ssl.key', cert: 'https.ssl.cert'}).map(
      (conf: string) => Filesystem.readFileSync(this.getConfig().getString(conf), 'utf8')
    ).toObject();

    Https.createServer(options, this.getWebApplication()).listen(
      this.getConfig().getInteger('https.bind.port'),
      this.getConfig().getString('https.bind.addr'),
      this.getConfig().getInteger('https.bind.max_connections'),
      () => this.emit(Application.events.INIT)
    );
  }
}

module.exports = Application;
