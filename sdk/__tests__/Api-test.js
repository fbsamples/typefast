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

jest.unmock('../src/Api');
jest.mock('../src/http/Request', () => {
  const Map = require('immutable').Map;
  const Request = jest.genMockFromModule('../src/http/Request');
  let params = new Map();
  Request.prototype.getParams = jest.fn(() => params);
  Request.prototype.setParams = jest.fn(_params => params = _params);
  return Request;
});
jest.mock('../src/http/Response', () => {
  const Request = require('../src/http/Request');
  const Response = jest.genMockFromModule('../src/http/Response');
  Response.prototype.getRequest = jest.fn(() => new Request(/* mock */));
  return Response;
});

const Api = require('../src/Api');
const ApiOptimizer = require('../src/ApiOptimizer');
const FieldSpec = require('../src/specs/FieldSpec');
const NodejsSynchronousAdapter = require('../src/http/adapters/NodejsSynchronousAdapter');
const Request = require('../src/http/Request');
const Response = require('../src/http/Response');
const Session = require('../src/Session');
const {Map} = require('immutable');

describe('Api', () => {

  const graph_version = [2, 6];
  const optimized_field = 'field_name';

  const makeHttpAdapter = () => {
    const adapter = new NodejsSynchronousAdapter(/* mock */);
    adapter.executeRequest.mockReturnValue(new Response(/* mock */));
    return adapter;
  };

  const makeOptimizer = () => {
    return new ApiOptimizer(/* mock */);
  };

  const makeSession = () => {
    return new Session(/* mock */);
  };

  const makeApi = () => {
    return new Api(makeHttpAdapter(), makeOptimizer(), makeSession(), graph_version);
  };

  const makeRequest = () => {
    return new Request(/* mock */);
  };

  it('can return the provided arguments', () => {
    const http_adapter = makeHttpAdapter();
    const session = makeSession();
    const optimizer = makeOptimizer();
    const api = new Api(http_adapter, optimizer, session, graph_version);
    expect(api.getHttpAdapter()).toBe(http_adapter);
    expect(api.getOptimizer()).toBe(optimizer);
    expect(api.getSession()).toBe(session);
    expect(api.getGraphVersion()).toBe(graph_version);
  });

  it('can execute requests', () => {
    const api = makeApi();
    expect(api.execRequest(makeRequest())).toEqual(jasmine.any(Response));
  });

  it('can construct and execute requests', () => {
    expect(makeApi().call('/node', 'GET', new Map())).toEqual(jasmine.any(Response));
  });

  it('can augment requests with field predictions', () => {
    const optimizer = makeOptimizer();
    const field_spec = new FieldSpec(/* mock */);
    field_spec.getName.mockReturnValue(optimized_field);
    optimizer.getFieldPredictions.mockReturnValue(new Map().set(optimized_field, field_spec.getName()));
    const api = new Api(makeHttpAdapter(), optimizer, makeSession(), graph_version);
    const response = api.call('/node', 'GET', new Map(), field_spec);
    const params = response.getRequest().getParams();

    expect(params.has('fields')).toBeTruthy();
    expect(params.get('fields')).toEqual(optimized_field);
  });
});
