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
 */

jest.unmock('../src/Node');

const Api = require('../src/Api');
const CrudSpec = require('../src/specs/CrudSpec');
const Cursor = require('../src/Cursor');
const EdgeSpec = require('../src/specs/EdgeSpec');
const FieldSpec = require('../src/specs/FieldSpec');
const Node = require('../src/Node');
const NodeSpec = require('../src/specs/NodeSpec');
const Response = require('../src/http/Response');
const {Map} = require('immutable');

describe('Node', () => {

  const type = 'NodeType';

  // Fields
  const field_name = 'id';
  let field = new FieldSpec(/* mock */);
  field.getName.mockReturnValue(field_name);
  const fields = new Map().set(field_name, field);

  // Edges
  let return_spec = new NodeSpec(/* mock */);
  return_spec.getType.mockReturnValue(type);

  let edge_function_name_count = 0;
  const makeEdgeSpec = (method) => {
    let edge = new EdgeSpec(/* mock */);
    // Must be unique
    edge.getFunctionName.mockReturnValue('edge_function_name_' + edge_function_name_count++);
    edge.getMethod.mockReturnValue(method);
    edge.getNodeSpec.mockReturnValue(return_spec);
    return edge;
  };

  const edge = makeEdgeSpec('GET');
  const edges = new Map().set('GET', edge);

  // Cruds
  let crud_read = new CrudSpec(/* mock */);
  crud_read.getFunctionName('READ');
  const cruds = new Map().set('GET', crud_read);

  // Node
  const makeNodeSpec = () => {
    let spec = new NodeSpec(/* mock */);
    spec.getType.mockReturnValue(type);
    spec.getFieldSpecs.mockReturnValue(fields);
    spec.getEdgeSpecs.mockReturnValue(edges);
    spec.getCrudSpecs.mockReturnValue(cruds);
    spec.getReadSpec.mockReturnValue(crud_read);
    return spec;
  };

  const makeApi = () => {
    let api = new Api(/* mock */);
    api.call.mockReturnValue(new Response(/* mock */));
    return api;
  };

  const makeNode = () => {
    return new Node(makeNodeSpec(), makeApi());
  }

  it('can return the provided arguments', () => {
    let spec = makeNodeSpec();
    let api = makeApi();
    let node = new Node(spec, api);
    expect(node.getSpec()).toBe(spec);
    expect(node.getType()).toBe(type);
    expect(node.getApi()).toBe(api);
    expect(node.getParentId()).toBeNull();
    let parent_id = 123;
    node.setParentId(parent_id);
    expect(node.getParentId()).toBe(parent_id);

    let node2 = Node.fromSpec(api, spec);
    expect(node.getSpec()).toBe(spec);
    expect(node2.getType()).toBe(type);
    expect(node2.getApi()).toBe(api);
  });

  it('can dynamically assign enumerable fields', () => {
    let value = 'field_value';
    let node = Node.fromSpec(makeApi(), makeNodeSpec());
    expect(node.propertyIsEnumerable(field_name)).toBeTruthy();
    expect(node[field_name]).toBeNull();
    node[field_name] = value;
    expect(node[field_name]).toBe(value);
  });

  it('can populate data from maps or dicts', () => {
    let node = Node.fromSpec(makeApi(), makeNodeSpec());
    let value = 'field_value';
    let data = {};
    data[field_name] = value;
    node.setData(new Map(data));
    expect(node[field_name]).toBe(value);
    let value2 = 'field_value_2';
    data[field_name] = value2;
    node.setData(data);
    expect(node[field_name]).toBe(value2);
  });

  it('will ignore unknown fields while populating', () => {
    let node = Node.fromSpec(makeApi(), makeNodeSpec());
    let value = 'field_value';
    let data = {};
    let unknown_field_name = 'unknown_field_name';
    data[unknown_field_name] = value;
    node.setData(new Map(data));
    expect(node.hasOwnProperty(unknown_field_name)).toBeFalsy();
  });

  it('can assert an id field exists and it\' populated', () => {
    let node = Node.fromSpec(makeApi(), makeNodeSpec());
    expect(node.getId()).toBeNull();
    expect(() => node.assertId()).toThrow();
  });

  it('can dynamically assign edge executor methods', () => {
    let spec = makeNodeSpec();
    let node = Node.fromData(makeApi(), spec, {id: 123});
    let executor = node[spec.getEdgeSpecs().get('GET').getFunctionName()];
    expect(executor).toEqual(jasmine.any(Function));
    expect(executor()).toEqual(jasmine.any(Cursor));
    expect(executor({})).toEqual(jasmine.any(Cursor));
    expect(executor(new Map())).toEqual(jasmine.any(Cursor));
  });

  it('can dynamically handle edge requests', () => {
    let edges = new Map()
      .set('GET', makeEdgeSpec('GET'))
      .set('POST', makeEdgeSpec('POST'))
      .set('DELETE', makeEdgeSpec('DELETE'))
      .map(spec => {
        // handle recursive behavior between NodesSpec and EdgeSpec
        spec.getNodeSpec.mockReturnValue(makeNodeSpec());
        return spec;
      });
    let spec = makeNodeSpec();
    spec.getEdgeSpecs.mockReturnValue(edges);
    let node = Node.fromData(makeApi(), spec, {id: 123});
    expect(node[edges.get('GET').getFunctionName()]()).toEqual(jasmine.any(Cursor));
    expect(node[edges.get('POST').getFunctionName()]()).toEqual(jasmine.any(Node));
    expect(node[edges.get('DELETE').getFunctionName()]()).toBeTruthy();
  });

  it('can dynamically assign CRUD executor methods', () => {
    let spec = makeNodeSpec();
    let node = Node.fromData(makeApi(), makeNodeSpec(), {id: 123});
    let executor = node[spec.getReadSpec().getFunctionName()];
    expect(executor).toEqual(jasmine.any(Function));
    expect(executor()).toBe(node);
    expect(executor({})).toEqual(node);
    expect(executor(new Map())).toEqual(node);
  });
});
