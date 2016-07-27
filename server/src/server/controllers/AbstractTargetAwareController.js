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

import type Context from '../RequestContext';
import type {Document} from 'mongoose';

const AbstractDocumentController = require('./AbstractDocumentController');
const HttpStatus = require('http-status-codes');

class AbstractTargetAwareController extends AbstractDocumentController {

  getRoute(): string {
    return this.getBaseRoute() + '/:id([0-9a-fA-F]{24})';
  }

  willLoadTarget(context: Context): Promise<Context> {
    const target_id = context.getRequest().params.id;
    debugger
    return context.execPromise(this.getModel().findById(target_id).exec())
      .then((doc: ?Document) => {
        if (doc) {
          return context.setTarget(doc);
        }

        return context.willDisposeWithError(
          HttpStatus.NOT_FOUND,
          `The entity backed by the id '${target_id}' can't be found`
        );
      });
  }

  willPrepareResponse(context: Context): Promise<Context> {
    return super.willPrepareResponse(context)
      .then((context: Context) => this.willLoadTarget(context));
  }
}

module.exports = AbstractTargetAwareController;
