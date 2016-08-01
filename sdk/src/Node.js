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

import type {NodeType} from './specs/NodeSpec';
import type {RequestParams} from './http/Request';
import type Api from './Api';
import type CrudSpec from './specs/CrudSpec';
import type EdgeSpec from './specs/EdgeSpec';
import type FieldSpec from './specs/FieldSpec';
import type NodeSpec from './specs/NodeSpec';

export type EdgeExecutor = (params?: Map<string, any>) => Cursor | Node | bool;
export type CrudExecutor = (params?: Map<string, any>) => Node;
export type NodeId = number | string;
export type LooseParams = { [key: string | number]: string | number | bool | Array<LooseParams> | LooseParams };

const Cursor = require('./Cursor');
const {Map} = require('immutable');

const normalizeParams = function(params?: LooseParams): RequestParams {
  return new Map(params);
};

const getEdgeExecutor = function(node: Node, edge_spec: EdgeSpec): EdgeExecutor {
  return function(params?: LooseParams): Cursor | Node | bool {
    const id = node.assertId();
    const edge = edge_spec.getEdge();
    const path = `/${id}/${edge}`;
    const response = node.getApi().call(path, edge_spec.getMethod(), normalizeParams(params), edge_spec.getNodeSpec());
    switch (edge_spec.getMethod()) {
      case 'GET':
        return new Cursor(edge_spec.getNodeSpec(), response);
      case 'POST':
        return Node.fromData(node.getApi(), edge_spec.getNodeSpec(), response.getContent());
      default: // DELETE
        return true;
    }
  };
};

const getCrudExecutor = function(node: Node, crud_spec: CrudSpec): CrudExecutor {
  return function(params?: LooseParams): Node {
    const id = node.assertId();
    const path = `/${id}`;
    const response = node.getApi().call(path, crud_spec.getMethod(), normalizeParams(params), node.getSpec());
    node.setData(response.getContent());
    return node;
  };
};

const assignEdgeExecutor = function(node: Node, edge_spec: EdgeSpec): void {
  Object.defineProperty(node, edge_spec.getFunctionName(), {
    __proto__: null,
    configurable: false,
    enumerable: false,
    value: getEdgeExecutor(node, edge_spec),
    writable: false,
  });
};

const assignCrudExecutor = function(node: Node, crud_spec: CrudSpec): void {
  Object.defineProperty(node, crud_spec.getFunctionName(), {
    __proto__: null,
    configurable: false,
    enumerable: false,
    value: getCrudExecutor(node, crud_spec),
    writable: false,
  });
};

const assignField = function(node: Node, field_spec: FieldSpec): void {
  Object.defineProperty(node, field_spec.getName(), {
    __proto__: null,
    configurable: false,
    enumerable: true,
    value: null,
    writable: true,
  });
};

class Node {

  api: Api;
  parent_id: ?number;
  spec: NodeSpec;

  static fromSpec(api: Api, node_spec: NodeSpec): Node {
    const node = new Node(node_spec, api);
    node_spec.getFieldSpecs().map(field_spec => assignField(node, field_spec));
    node_spec.getEdgeSpecs().map(edge_spec => assignEdgeExecutor(node, edge_spec));
    node_spec.getCrudSpecs().map(crud_spec => assignCrudExecutor(node, crud_spec));
    return node;
  }

  static fromData(api: Api, node_spec: NodeSpec, data: Object): Node {
    return this.fromSpec(api, node_spec).setData(data);
  }

  constructor(spec: NodeSpec, api: Api): void {
    this.spec = spec;
    this.api = api;
    this.parent_id = null;
  }

  getId(): ?NodeId {
    // FLOW_UNSAFE
    return this['id'] != null ? this['id'] : null;
  }

  assertId(): NodeId {
    const id = this.getId();
    if (id == null) {
      throw new Error('Missing object ID');
    }
    return id;
  }

  getApi(): Api {
    return this.api;
  }

  getSpec(): NodeSpec {
    return this.spec;
  }

  getType(): NodeType {
    return this.getSpec().getType();
  }

  setParentId(node_id: number): Node {
    this.parent_id = node_id;
    return this;
  }

  getParentId(): ?number {
    return this.parent_id;
  }

  setData(data: Object): Node {
    if (!(data instanceof Map)) {
      data = new Map(data);
    }
    data.map((value, key) => {
      if (this.getSpec().getFieldSpecs().has(key)) {
        // FLOW_UNSAFE
        this[key] = value;
      }
    });
    return this;
  }
}

module.exports = Node;
