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

import type AbstractParam from '../../params/AbstractParam';
import type Context from '../../RequestContext';
import type {Script} from '../../../model/script';

const AbstractDocumentUpdateController = require('../AbstractDocumentUpdateController');
const ScriptModel = require('../../../model/script');
const ScriptOptimizationsParam = require('../../params/ScriptOptimizationsParam');
const StringParam = require('../../params/StringParam');
const {Map} = require('immutable');

// implement ../ControllerInterface
class ScriptUpdateController extends AbstractDocumentUpdateController {

  getBaseRoute(): string {
    return '/scripts';
  }

  getModel(): typeof ScriptModel {
    return ScriptModel;
  }

  getParams(): Map<string, AbstractParam<any>> {
    return super.getParams().merge({
      title: new StringParam().setMinLength(3).optional(),
      optimisations: new ScriptOptimizationsParam().optional(),
      code: new StringParam().optional(),
    });
  }

  genResponse(context: Context): void {
    const script = context.getTarget();
    const params = context.getParams();
    const optimisations = params.isNull('optimisations')
      ? null
      : params.getMap('optimisations').toObject();

    const data = {
      title: params.getOptionalString('title') || script.get('title'),
      optimisations: optimisations || script.get('optimisations'),
      code: params.getOptionalString('code') || context.getTarget().get('code'),
    };

    context.execPromise(context.getTarget().set(data).save({ new: true }))
      .then((script: Script) => context.sendDocument(script));
  }
}

module.exports = ScriptUpdateController;
