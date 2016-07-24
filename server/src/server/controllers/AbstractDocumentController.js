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

import type {Set} from 'immutable';
import type {RequestMethod} from 'express';

export type CrudFunction = 'CREATE' | 'DELETE' | 'LIST' | 'READ' | 'UPDATE';

// Flow typeof won't work with import type
const {Model} = require('mongoose');

const AbstractController = require('./AbstractController');

class AbstractDocumentController extends AbstractController {

  // This method should be overriden
  getModel(): typeof Model {
    const class_name = this.constructor.name;
    throw new Error(`${class_name} must implement abstract method getModel`);
  }

  // This method should be overriden
  getBaseRoute(): string {
    const class_name = this.constructor.name;
    throw new Error(`${class_name} must implement abstract method getBaseRoute`);
  }

  getRoute(): string {
    return this.getBaseRoute();
  }

  // This method should be overriden
  getCrudFunction(): CrudFunction {
    const class_name = this.constructor.name;
    throw new Error(`${class_name} must implement abstract method getCrudFunction`);
  }

  // This method should be overriden
  getRouteMethods(): Set<RequestMethod> {
    const class_name = this.constructor.name;
    throw new Error(`${class_name} must implement abstract method getRouteMethods`);
  }
}

module.exports = AbstractDocumentController;
