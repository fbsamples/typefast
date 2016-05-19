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

jest.unmock('../../src/specs/EdgeSpec');

const EdgeSpec = require('../../src/specs/EdgeSpec');
const NodeSpec = require('../../src/specs/NodeSpec');
const SpecRegistry = require('../../src/SpecRegistry');

describe('EdgeSpec', () => {

  const name = 'edge_name';
  const endpoint = 'edge_endpoint';
  const method = 'GET';
  const return_type = 'NodeType';
  const description = 'field_description'

  const MakeNodeSpec = (registry: SpecRegistry) => {
    let spec = new NodeSpec(/* mock */);
    spec.getType.mockReturnValue(return_type);
    return spec;
  };

  const makeSpecRegistry = () => {
    let registry = new SpecRegistry(/* mock */);
    registry.get.mockReturnValue(MakeNodeSpec(registry));
    return registry;
  };

  const makeEdgeSpec = () => {
    return new EdgeSpec(makeSpecRegistry(), name, endpoint, method, return_type, description);
  };

  it('can return the provided arguments', () => {
    let spec = makeEdgeSpec();
    expect(spec.getName()).toBe(name);
    expect(spec.getEdge()).toBe(endpoint);
    expect(spec.getMethod()).toBe(method);
    expect(spec.getReturnType()).toBe(return_type);
    expect(spec.getDescription()).toBe(description);
  });

  it('can compute SDK function names with lazy-loading', () => {
    // FIXME need to improve the actual function
    let spec = makeEdgeSpec();
    let name = spec.getFunctionName();
    expect(name.length > 0).toBeTruthy();
    // Access cached name
    expect(spec.getFunctionName()).toBe(name);
  });
});
