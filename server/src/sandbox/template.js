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
import type {Document} from 'mongoose';
import type {FieldName} from '../../../sdk/src/specs/FieldSpec';
import type {NodeType} from '../../../sdk/src/specs/NodeSpec';

const Adapter = require('../../../sdk/src/http/adapters/NodejsSynchronousAdapter');
const Api = require('../../../sdk/src/Api');
const ApiOptimizer = require('../../../sdk/src/ApiOptimizer');
const Node = require('../../../sdk/src/Node');
const NodeSpec = require('../../../sdk/src/specs/NodeSpec');
const Session = require('../../../sdk/src/Session');
const SpecRegistry = require('../../../sdk/src/SpecRegistry');
const {Map} = require('immutable');

const {getObject} = require('./GraphSchemaLoader');

module.exports = function(config: Config, script: Document): Object {
  // Load configs
  const app_id = config.getInteger('graph.application_id');
  const app_secret = config.getString('graph.application_secret');
  const access_token = config.getString('graph.access_token');
  const schema_bundle = config.getString('graph.schema.bundle');
  const graph_versions = [config.getInteger('graph.version.0'), config.getInteger('graph.version.1')];

  // Init dynamic structures
  const registry = new SpecRegistry(true);
  const optimizer = new ApiOptimizer();
  new Map(getObject(schema_bundle)).forEach(
    spec => registry.register(NodeSpec.fromJson(registry, JSON.stringify(spec)))
  );
  new Map(script.get('optimisations')).forEach(
    (fields: Array<FieldName>, node: NodeType) => fields.map(
      field => optimizer.setFieldPrediction(node, field)
    )
  );

  // Init api interface
  const session = new Session(app_id, app_secret, access_token);
  const api = new Api(new Adapter(), optimizer, session, graph_versions);

  // Init context
  const ctx = Node.fromSpec(api, registry.get('AdAccount'));
  // FLOW_UNSAFE
  ctx.id = config.getString('DEPRECATED__cxt_id');

  return {
    api: api, // FIXME should this be directly exposed ?
    adaccount: ctx// FIXME make ctx dynamically allocable
  };
};
