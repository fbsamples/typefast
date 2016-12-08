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

import type AbstractDriver from '../server/drivers/AbstractDriver';
import type Config from '../Config';
import type {Application as ExpressApplication, Request, RequestMethod, Response} from 'express';

const AbstractService = require('./AbstractService');
const assert = require('assert');
const Authentication = require('../server/authentication/Authentication');
const compression = require('compression');
const express = require('express');
const HttpDriver = require('../server/drivers/HttpDriver');
const HttpsDriver = require('../server/drivers/HttpsDriver');
const Multer = require('multer');
const Router = require('../server/Router');
const {Map, Set} = require('immutable');
const {genMap} = require('../utils/promises');

class Application extends AbstractService {

  authentication: Authentication;
  allowedRequestMethods: Set<RequestMethod>;
  router: Router;
  webApplication: ExpressApplication;

  constructor(config: Config): void {
    super(config);
    this.webApplication = express();
    this.allowedRequestMethods = new Set(['get', 'post', 'delete']);
    this.router = new Router(this);
    this.authentication = new Authentication(
      config.getString('graph.business_manager_id'),
      config.getString('graph.access_token'),
      config.getString('graph.application_secret'),
    );

    // Middleware
    this.webApplication.use((request: Request, response: Response, next: () => void) => {
      // Handle Multer inconsistency
      request.body = request.body || {};
      next();
    });
    this.webApplication.use(new Multer().array());
    this.webApplication.use(compression());
    this.webApplication.disable('etag');
    this.webApplication.disable('x-powered-by');
    if (this.getConfig().getBoolean('server.client.enable_delivery')) {
      this.webApplication.use('/', express.static(
        this.getConfig().getString('server.client.root')
      ));
    }

    // API Routing
    this.webApplication.use('/', this.getRouter().getWebRouter());
  }

  getAllowedRequestMethods(): Set<RequestMethod> {
    return this.allowedRequestMethods;
  }

  getAuthentication(): Authentication {
    return this.authentication;
  }

  getRouter(): Router {
    return this.router;
  }

  getWebApplication(): ExpressApplication {
    return this.webApplication;
  }

  init(): void {
    const binds: Map<string, Map<string, any>> = this.getConfig().getMap('server.bindings')
      .filter((config: Map<string, any>) => Boolean(config.get('is_enabled', false)));
    assert(binds.size > 0, 'No enabled binding by config');
    const handles = binds.map((config: Map<string, any>): Promise<AbstractDriver> => {
      const driver_type: string = config.get('driver');
      const will_bind = (driver: AbstractDriver): Promise<AbstractDriver> => {
        return driver.willBindWebApplication(this.getWebApplication())
          .then(() => driver);
      };

      switch (driver_type) {
        case 'http':
          return will_bind(new HttpDriver(config));
        case 'https':
          return will_bind(new HttpsDriver(config));
        default:
          return Promise.reject(new Error(`Unknown driver '${driver_type}'`));
      }
    });

    genMap(handles).then((drivers: Map<string, AbstractDriver>) => {
      this.emit(Application.events.INIT, drivers);
    }).catch((error: Error) => process.nextTick(() => {throw error; }));
  }
}

module.exports = Application;
