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

jest.unmock('../src/Api');
jest.mock('../src/http/Request', () => {
  let Map = require('immutable').Map;
  let Request = jest.genMockFromModule('../src/http/Request');
  Request.prototype.getParams = jest.fn(() => new Map());
  return Request;
});

const Api = require('../src/Api');
const NodejsSynchronousAdapter = require('../src/http/adapters/NodejsSynchronousAdapter');
const Request = require('../src/http/Request');
const Response = require('../src/http/Response');
const Session = require('../src/Session')
const {Map} = require('immutable');

describe('Api', () => {

  const graph_version = [2, 6];

  const makeHttpAdapter = () => {
    let adapter = new NodejsSynchronousAdapter(/* mock */);
    adapter.executeRequest.mockReturnValue(new Response(/* mock */));
    return adapter;
  };

  const makeSession = () => {
    return new Session(/* mock */);
  };

  const makeApi = () => {
    return new Api(makeHttpAdapter(), makeSession(), graph_version);
  };

  const makeRequest = () => {
    return new Request(/* mock */);
  };

  it('can return the provided arguments', () => {
    let http_adapter = makeHttpAdapter();
    let session = makeSession();
    let api = new Api(http_adapter, session, graph_version);
    expect(api.getHttpAdapter()).toBe(http_adapter);
    expect(api.getSession()).toBe(session);
    expect(api.getGraphVersion()).toBe(graph_version);
  });

  it('can execute requests', () => {
    let api = makeApi();
    expect(api.execRequest(makeRequest())).toEqual(jasmine.any(Response));
  });

  it('can construct and execute requests', () => {
    expect(makeApi().call('/node', 'GET', new Map())).toEqual(jasmine.any(Response));
  });
});
