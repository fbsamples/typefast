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

jest.unmock('../src/Cursor');
jest.mock('../src/Node', () => {
  const Node = jest.genMockFromModule('../src/Node');
  Node.fromData = () => new Node(/* mock */);
  return Node;
});

const Api = require('../src/Api');
const Cursor = require('../src/Cursor');
const NodeSpec = require('../src/specs/NodeSpec');
const Request = require('../src/http/Request');
const Response = require('../src/http/Response');
const {Map, Repeat} = require('immutable');

describe('Cursor', () => {

  const response_object_data = {
    field_name: 1234567890
  };

  const response_content = {
    data: [response_object_data, response_object_data],
  };

  const makeNodeSpec = () => {
    return new NodeSpec(/* mock */);
  };

  const makeRequest = () => {
    const request = new Request(/* mock */);
    request.getApi.mockReturnValue(new Api(/* mock */));
    request.getParams.mockReturnValue(new Map());
    return request;
  };

  const makeResponse = (response_data) => {
    const response = new Response(/* mock */);
    response.getRequest.mockReturnValue(makeRequest());
    response.getContent.mockReturnValue(response_data === undefined ? {} : response_data);
    return response;
  };

  const makeCursor = (response_data) => {
    return new Cursor(makeNodeSpec(), makeResponse(response_data));
  };

  const makeChainResponse = (response_data, pages, limit) => {
    response_data.paging = {
      cursors: {
        after: '==hash',
      },
    };

    if (limit != null) {
      response_data.data = Repeat(response_object_data, limit).toArray();
    }
    const response = makeResponse(pages > 0 ? response_data : { data: []});
    const request = response.getRequest();

    if (limit != null ) {
      request.getParams.mockReturnValue(request.getParams().set('limit', limit));
    }
    request.execute.mockReturnValue(response);
    request.getCopy.mockImplementation(() => makeChainResponse(response_data, --pages).getRequest());
    return response;
  };

  const makeChainCursor = (response_data, pages, limit) => {
    return new Cursor(makeNodeSpec(), makeChainResponse(response_data, pages, limit));
  };

  it('can return the provided arguments', () => {
    const node_spec = makeNodeSpec();
    const response = makeResponse();
    const cursor = new Cursor(node_spec, response);
    expect(cursor.getNodeSpec()).toBe(node_spec);
    expect(cursor.getLastResponse()).toBe(response);
  });

  it('provides a counting method', () => {
    const cursor = makeCursor(response_content);
    expect(cursor.count()).toEqual(response_content.data.length);
  });

  it('can be converted to Array', () => {
    const cursor = makeCursor(response_content);
    expect(cursor.toArray().length).toEqual(response_content.data.length);
  });

  it('provides iteration through methods', () => {
    const content = {data: [response_object_data]};
    const cursor = makeCursor(content);
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
    const cursor = makeCursor(response_content);
    let count = 0;
    const array = cursor.map(value => ++count);
    expect(count).toEqual(response_content.data.length);
    expect(array.length).toEqual(response_content.data.length);
    count = 0;
    cursor.forEach(value => ++count);
    expect(count).toEqual(response_content.data.length);
  });

  it('provides an implicit paginator', () => {
    const pages = 3;
    const cursor = makeChainCursor(response_content, pages);
    let count = 0;
    cursor.forEach(value => ++count);
    expect(count).toEqual(response_content.data.length * pages);
  });

  it('allows to limit the number of returned object', () => {
    const pages = 3;
    const limit = 1;
    const cursor = makeChainCursor(response_content, pages, limit);
    let count = 0;
    cursor.forEach(value => ++count);
    expect(count).toEqual(limit);
  });
});
