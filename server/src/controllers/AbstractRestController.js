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

import type {Request, RequestMethod, Response} from 'express';

const AbstractController = require('./AbstractController');
const HttpStatus = require('http-status-codes');
const {Set} = require('immutable');

class AbstractRestController extends AbstractController {

  // This method should be overriden
  getBaseRoute(): string {
    const class_name = this.constructor.name;
    throw new Error(`${class_name} must implement abstract method getBaseRoute`);
  }

  getRoute(): string {
    const base_route = this.getBaseRoute();
    const id_matcher = '[0-9a-fA-F]{24}';
    return `${base_route}/:id(${id_matcher})?`;
  }

  getRouteMethods(): Set<RequestMethod> {
    return new Set(['get', 'post', 'delete']);
  }

  getTargetId(request: Request): ?string {
    return request.params.id || null;
  }

  // This method should be overriden
  genCreate(request: Request, response: Response): void {
    this.returnError(request, response, HttpStatus.METHOD_NOT_ALLOWED);
  }

  // This method should be overriden
  genRead(request: Request, response: Response): void {
    this.returnError(request, response, HttpStatus.METHOD_NOT_ALLOWED);
  }

  // This method should be overriden
  genList(request: Request, response: Response): void {
    this.returnError(request, response, HttpStatus.METHOD_NOT_ALLOWED);
  }

  // This method should be overriden
  genUpdate(request: Request, response: Response): void {
    this.returnError(request, response, HttpStatus.METHOD_NOT_ALLOWED);
  }

  // This method should be overriden
  genDelete(request: Request, response: Response): void {
    this.returnError(request, response, HttpStatus.METHOD_NOT_ALLOWED);
  }

  genResponse(request: Request, response: Response): void {
    const method = request.method.toLowerCase();
    const target_id = this.getTargetId(request);
    switch (true) {
      case method === 'get' && target_id !== null:
        this.genRead(request, response);
        break;
      case method === 'get' && target_id === null:
        this.genList(request, response);
        break;
      case method === 'post' && target_id === null:
        this.genCreate(request, response);
        break;
      case method === 'post' && target_id !== null:
        this.genUpdate(request, response);
        break;
      case method === 'delete':
        this.genDelete(request, response);
        break;
      default:
        this.returnError(request, response, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}

module.exports = AbstractRestController;
