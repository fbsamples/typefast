/**
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

jest.unmock('../../src/specs/NodeSpec');
jest.mock('../../src/specs/EdgeSpec', () => {
  let Map = require('immutable').Map;
  let Request = jest.genMockFromModule('../../src/specs/EdgeSpec');
  // Needs unique name
  let c = 0;
  Request.prototype.getName = jest.fn(() => 'edge_name_' + c++);
  return Request;
});

const CrudSpec = require('../../src/specs/CrudSpec');
const EdgeSpec = require('../../src/specs/EdgeSpec');
const FieldSpec = require('../../src/specs/FieldSpec');
const NodeSpec = require('../../src/specs/NodeSpec');
const SpecRegistry = require('../../src/SpecRegistry');
const {Map} = require('immutable');

describe('NodeSpec', () => {

  const type = 'NodeType';
  const endpoint = '/edge';
  const fields = new Map({field_name: new FieldSpec('field_name', 'int')});
  const edges = new Map({edge_name: new EdgeSpec()});
  const read = new CrudSpec();
  const update = new CrudSpec();
  const del = new CrudSpec();

  const serial = JSON.stringify({
    type: type,
    apis: [
      {
        name: `get${type}s`,
        method: 'GET',
        endpoint: endpoint,
        description: 'Return something',
        'return': `List<${type}>`
      },
      {
        name: `create${type}`,
        method: 'POST',
        endpoint: endpoint,
        description: 'Create something',
      },
      {
        name: '#read'
      },
      {
        name: '#update'
      },
    ],
    fields: [
      {
        name: 'field_name',
        description: 'Field Description',
        type: 'string'
      }
    ]
  });

  const makeSpec = () => {
    return new NodeSpec(type, fields, edges, read, update, del);
  };

  it('can return the provided arguments', () => {
    let spec = makeSpec();
    expect(spec.getType()).toBe(type);
    expect(spec.getFieldSpecs()).toBe(fields);
    expect(spec.getEdgeSpecs()).toBe(edges);
    expect(spec.getReadSpec()).toBe(read);
    expect(spec.getUpdateSpec()).toBe(update);
    expect(spec.getDeleteSpec()).toBe(del);
    expect(spec.getCrudSpecs().count()).toEqual(3);
  });

  it('can deserialize JSON specs', () => {
    let registry = new SpecRegistry();
    let spec = NodeSpec.fromJson(registry, serial);
    let fields = spec.getFieldSpecs();
    let edges = spec.getEdgeSpecs();
    expect(fields.count()).toBe(1);
    expect(edges.count()).toBe(2);
    expect(spec.getReadSpec()).not.toBeNull();
    expect(spec.getUpdateSpec()).not.toBeNull();
    expect(spec.getDeleteSpec()).toBeNull();
  });

  it('can deserialize JSON specs with missing APIs or fields', () => {
    let registry = new SpecRegistry();
    let spec = NodeSpec.fromJson(registry, JSON.stringify({type:type}));
    let fields = spec.getFieldSpecs();
    let edges = spec.getEdgeSpecs();
    expect(fields.count()).toBe(0);
    expect(edges.count()).toBe(0);
    expect(spec.getReadSpec()).toBeNull();
    expect(spec.getUpdateSpec()).toBeNull();
    expect(spec.getDeleteSpec()).toBeNull();
  });
});
