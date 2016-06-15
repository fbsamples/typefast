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

jest.unmock('../src/ApiOptimizer');

const ApiOptimizer = require('../src/ApiOptimizer');
const FieldSpec = require('../src/specs/FieldSpec');

describe('ApiOptimizer', () => {

  const node_type = 'NODE_TYPE';
  const field_name = 'FIELD_NAME';

  const makeOptimizer = () => {
    return new ApiOptimizer();
  };

  const makeFieldSpec = (name) => {
    const spec = new FieldSpec(/* mock */);
    spec.getName.mockReturnValue(name);
    return spec;
  };

  it('can store field predictions', () => {
    const optimizer = makeOptimizer();
    expect(optimizer.getFieldPredictions(node_type).size).toEqual(0);
    optimizer.setFieldPrediction(node_type, makeFieldSpec(field_name));
    expect(optimizer.getFieldPredictions(node_type).size).toEqual(1);
    expect(optimizer.getFieldPredictions(node_type).first().getName()).toBe(field_name);
  });
});
