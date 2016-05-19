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

jest.unmock('../src/Cursor');

const Api = require('../src/Api');
const Cursor = require('../src/Cursor');
const NodeSpec = require('../src/specs/NodeSpec');
const Request = require('../src/http/Request');
const Response = require('../src/http/Response');
const Session = require('../src/Session');
const SpecRegistry = require('../src/SpecRegistry');
const {Map} = require('immutable');

describe('Cursor', () => {

  const response_object_fields_name = 'field_name';
  const response_object_data = {
    field_name: 1234567890
  };

  const makeNodeSpec = () => {
    let registry = new SpecRegistry(/* mock */);
    return NodeSpec.fromJson(registry, JSON.stringify({}));
  };

  const makeRequest = () => {
    let request = new Request(/* mock */);
    request.getApi.mockReturnValue(new Api(/* mock */));
    return request;
  };

  const makeResponse = (response_data) => {
    let response = new Response(/* mock */);
    response.getRequest.mockReturnValue(makeRequest());
    response.getContent.mockReturnValue(response_data === undefined ? {} : response_data);
    return response;
  };

  const makeCursor = (response_data) => {
    return new Cursor(makeNodeSpec(), makeResponse(response_data));
  };

  it('can return the provided arguments', () => {
    let node_spec = makeNodeSpec();
    let response = makeResponse();
    let cursor = new Cursor(node_spec, response);
    expect(cursor.getNodeSpec()).toBe(node_spec);
    expect(cursor.getLastResponse()).toBe(response);
  });

  it('provides a counting method', () => {
    let content = {data:[response_object_data, response_object_data]};
    let cursor = makeCursor(content);
    expect(cursor.count()).toEqual(content.data.length);
  });

  it('can be converted to Array', () => {
    let content = {data:[response_object_data, response_object_data]};
    let cursor = makeCursor(content);
    expect(cursor.toArray().length).toEqual(content.data.length);
  });

  it('provides iteration through methods', () => {
    let content = {data:[response_object_data]};
    let cursor = makeCursor(content);
    expect(cursor.key()).toEqual(-1);
    expect(cursor.isValid()).toBeFalsy();
    expect(cursor.current()).toBeNull();
    expect(cursor.next()).not.toBeNull();
    expect(cursor.key()).toEqual(0);
    expect(cursor.isValid()).toBeTruthy();
    expect(cursor.current()).not.toBeNull();
    expect(cursor.next()).toBeNull();
    expect(cursor.isValid()).toBeFalsy();
    expect(cursor.current()).toBeNull();
    cursor.rewind();
    expect(cursor.key()).toEqual(-1);
  });

  it('provides iteration through mappers', () => {
    let content = {data:[response_object_data, response_object_data]};
    let cursor = makeCursor(content);
    let count = 0;
    let array = cursor.map(value => {++count; return count;});
    expect(count).toEqual(content.data.length);
    expect(array.length).toEqual(content.data.length);
    count = 0;
    cursor.forEach(value => ++count);
    expect(count).toEqual(content.data.length);
  });
});
