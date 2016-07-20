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
import type {Request, Response} from 'express';

const HttpStatus = require('http-status-codes');

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

  getErrorBody(http_status: number, user_message?: string): Object {
    const http_message = HttpStatus.getStatusText(http_status);
    return {
      error: {
        code: http_status,
        message: http_message,
        user_message: user_message || http_message
      }
    };
  }

  returnError(
    request: Request,
    response: Response,
    http_status: number,
    user_message?: string
  ): void {
    response.status(http_status);
    response.send(this.getErrorBody(http_status, user_message)).end();
  }

  // This method should be overriden
  genResponse(request: Request, response: Response): void {
    this.returnError(request, response, HttpStatus.INTERNAL_SERVER_ERROR);
  }

  onDispatch(request: Request, response: Response): void {
    response.status(HttpStatus.OK);
    response.set('Content-Type', 'application/json');
    this.genResponse(request, response);
  }
}

module.exports = AbstractController;
