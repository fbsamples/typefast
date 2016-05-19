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

jest.unmock('../../src/specs/CrudSpec');

const CrudSpec = require('../../src/specs/CrudSpec');
const {List} = require('immutable');

describe('CrudSpec', () => {

  const crud_function = 'READ';
  const crud_schema_name = '#read';
  const http_method = 'GET';

  const makeCrudSpec = () => {
    return new CrudSpec(crud_function);
  };

  it('can return the provided arguments', () => {
    let spec = makeCrudSpec();
    expect(spec.getCrudFunction()).toBe(crud_function);
  });

  it('can be initiated as a schema deserialization', () => {
    let spec = CrudSpec.fromSchema({name: crud_schema_name});
    expect(spec).not.toBeNull();
    expect(spec.getCrudFunction()).toEqual(crud_function);
  });

  it('can compute HTTP methods', () => {
    let methods = new List(['GET', 'POST', 'DELETE']);
    let method = makeCrudSpec().getMethod();
    expect(methods.findKey(value => value === method)).not.toBeUndefined();
  });

  it('can compute SDK function names', () => {
    expect(makeCrudSpec().getFunctionName()).not.toBeNull();
  });
});
