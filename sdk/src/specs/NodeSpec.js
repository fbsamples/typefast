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

import type SpecRegistry from './../SpecRegistry';

export type NodeType = string;

const CrudSpec = require('./CrudSpec');
const EdgeSpec = require('./EdgeSpec');
const FieldSpec = require('./FieldSpec');
const {Map, List} = require('immutable');

const idx = function(obj: Object, key: string, default_value: any): any {
  return obj.hasOwnProperty(key)
    ? obj[key]
    : default_value;
};

const listToMap = function<Tk, Tv>(list: List<Tv>, fn: (value: Tv) => Tk): Map<Tk, Tv> {
  let map = new Map().asMutable();
  list.map(value => map.set(fn(value), value));
  return map.asImmutable();
};

class NodeSpec {

  type: string;
  fieldSpecs: Map<string, FieldSpec>;
  edgeSpecs: Map<string, EdgeSpec>;
  readSpec: ?CrudSpec;
  updateSpec: ?CrudSpec;
  deleteSpec: ?CrudSpec;

  static fromJson(registry: SpecRegistry, json: string): NodeSpec {
    let obj = JSON.parse(json);
    let fields = new List(idx(obj, 'fields', []));
    let edges = new List(idx(obj, 'apis', []));
    let cruds = new Map({
      read: null,
      update: null,
      'delete': null,
    });

    fields = fields.map(schema => new FieldSpec(schema.name, schema.type, schema.description));
    edges = edges.filter(schema => {
      let name = schema.name.substr(1);
      if (cruds.has(name)) {
        cruds = cruds.set(name, CrudSpec.fromSchema(schema));
        return false;
      }
      return true;
    }).map(schema => new EdgeSpec(
      registry,
      schema.name,
      schema.endpoint,
      schema.method,
      schema.return,
      schema.description
    ));

    return new NodeSpec(
      obj.type,
      listToMap(fields, spec => spec.getName()),
      listToMap(edges, spec => spec.getName()),
      cruds.get('read'),
      cruds.get('update'),
      cruds.get('delete')
    );
  }

  constructor(
    type: string,
    field_specs: Map<string, FieldSpec>,
    edge_specs: Map<string, EdgeSpec>,
    read_spec: ?CrudSpec,
    update_spec: ?CrudSpec,
    delete_spec: ?CrudSpec
  ): void {
    this.type = type;
    this.fieldSpecs = field_specs;
    this.edgeSpecs = edge_specs;
    this.readSpec = read_spec;
    this.updateSpec = update_spec;
    this.deleteSpec = delete_spec;
  }

  getType(): NodeType {
    return this.type;
  }

  getFieldSpecs(): Map<string, FieldSpec> {
    return this.fieldSpecs;
  }

  getEdgeSpecs(): Map<string, EdgeSpec> {
    return this.edgeSpecs;
  }

  getReadSpec(): ?CrudSpec {
    return this.readSpec;
  }

  getUpdateSpec(): ?CrudSpec {
    return this.updateSpec;
  }

  getDeleteSpec(): ?CrudSpec {
    return this.deleteSpec;
  }

  getCrudSpecs(): List<CrudSpec> {
    return new List([this.getReadSpec(), this.getUpdateSpec(), this.getDeleteSpec()])
      .filter(spec => spec instanceof CrudSpec);
  }
}

module.exports = NodeSpec;
