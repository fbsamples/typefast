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

import type AbstractParam from '../params/AbstractParam';
import type Context from '../RequestContext';
import type {CrudFunction} from './AbstractDocumentController';
import type {Document} from 'mongoose';
import type {RequestMethod} from 'express';

const AbstractDocumentController = require('./AbstractDocumentController');
const IntegerParam = require('../params/IntegerParam');
const MongoIdParam = require('../params/MongoIdParam');
const {List, Map, Set} = require('immutable');

class AbstractDocumentListController extends AbstractDocumentController {

  getCrudFunction(): CrudFunction {
    return 'READ';
  }

  getRouteMethods(): Set<RequestMethod> {
    return new Set(['get']);
  }

  getParamBindings(): List<string> {
    return new List();
  }

  getParams(): Map<string, AbstractParam<any>> {
    return super.getParams().merge({
      limit: new IntegerParam().setMin(1).setMax(100).optional().setDefaultValue(25),
      after: new MongoIdParam().optional(),
      before: new MongoIdParam().optional(),
    });
  }

  getCriteria(context: Context): Map<string, any> {
    return Map(this.getParamBindings().map((key: string) => [key, undefined]).toSeq())
      .map((value: void, key: string) => context.getParams().toMap().get(key, undefined))
      .filterNot((value: ?any) => value === undefined);
  }

  genResponse(context: Context): void {
    let criteria = this.getCriteria(context);
    const limit = context.getParams().getNumber('limit');
    const after = context.getParams().getOptionalString('after');
    if (after != null) {
      criteria = criteria.set('_id', { $lt: after });
    }

    const query = this.getModel().find(criteria.toObject()).sort({ _id: -1 }).limit(limit);

    context.execPromise(query.exec())
      .then((docs: Array<Document>) => {
        const data = new List(docs);
        let object = new Map({ data: data.map(context.exportDocument) });
        if (data.size === limit) {
          object = object.set('paging', new Map({ after: data.last().get('id') }));
        }
        context.sendObject(object);
      });
  }
}

module.exports = AbstractDocumentListController;
