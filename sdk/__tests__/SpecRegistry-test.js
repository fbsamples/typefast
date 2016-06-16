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
 */

jest.unmock('../src/SpecRegistry');

const NodeSpec = require('../src/specs/NodeSpec');
const SpecRegistry = require('../src/SpecRegistry');

describe('SpecRegistry', () => {

  const type = 'NodeType';

  const makeSpecRegistry = () => {
    return new SpecRegistry(false);
  };

  const makeSpec = () => {
    const spec = new NodeSpec(/* mock */);
    spec.getType.mockReturnValue(type);
    return spec;
  };

  it('initializes as empty', () => {
    expect(makeSpecRegistry().has(type)).toBeFalsy();
  });

  it('return registred specs', () => {
    const registry = makeSpecRegistry();
    registry.register(makeSpec());
    expect(registry.has(type)).toBeTruthy();
    expect(registry.get(type)).not.toBeNull();
  });

  it('throws when trying to access missing keys', () => {
    expect(() => makeSpecRegistry().get(type)).toThrow();
  });

  it('can generate mock specs', () => {
    const unregistred_type = 'UnregisteredType';
    expect(new SpecRegistry(true).get(unregistred_type)).toEqual(jasmine.any(NodeSpec));
    expect(() => new SpecRegistry(false).get(unregistred_type)).toThrow();
    expect(() => new SpecRegistry().get(unregistred_type)).toThrow();
  });
});
