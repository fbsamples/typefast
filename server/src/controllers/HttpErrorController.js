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
import type {Request, RequestMethod, Response} from 'express';
import type {Set} from 'immutable';

const AbstractController = require('./AbstractController');

// implement ../ControllerInterface
class HttpErrorController extends AbstractController {

  code: number;
  methods: Set<RequestMethod>;

  constructor(application: Application, methods: Set<RequestMethod>, code: number): void {
    super(application);
    this.methods = methods;
    this.code = code;
  }

  getName(): string {
    return super.getName() + '-' + this.getCode();
  }

  getRoute(): string {
    return '*';
  }

  getRouteMethods(): Set<RequestMethod> {
    return this.methods;
  }

  getCode(): number {
    return this.code;
  }

  genResponse(request: Request, response: Response): void {
    this.returnError(request, response, this.getCode());
  }
}

module.exports = HttpErrorController;
