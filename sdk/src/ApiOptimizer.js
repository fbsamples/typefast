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

import type FieldSpec from './specs/FieldSpec';
import type {FieldName} from './specs/FieldSpec';
import type {NodeType} from './specs/NodeSpec';

const {Map} = require('immutable');

class ApiOptimizer {

  fieldPredictions: Map<NodeType, Map<FieldName, FieldSpec>>;

  constructor(): void {
    this.fieldPredictions = new Map();
  }

  getFieldPredictions(node: NodeType): Map<FieldName, FieldSpec> {
    return this.fieldPredictions.has(node)
      ? this.fieldPredictions.get(node)
      : new Map();
  }

  setFieldPrediction(node: NodeType, field_spec: FieldSpec): this {
    let predictions = this.getFieldPredictions(node);
    predictions = predictions.set(field_spec.getName(), field_spec);
    this.fieldPredictions = this.fieldPredictions.set(node, predictions);
    return this;
  }
}

module.exports = ApiOptimizer;
