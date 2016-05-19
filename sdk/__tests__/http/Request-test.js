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

jest.unmock('../../src/http/Request');

const Api = require('../../src/Api');
const {Map} = require('immutable');
const Request = require('../../src/http/Request');

describe('Request', () => {

  const graph_version = [2, 6];
  const path = '/node';
  const method = 'GET';
  const params = new Map();

  const makeApi = () => {
    let api = new Api(/* mock */);
    api.getGraphVersion.mockReturnValue(graph_version);
    return api;
  };

  const makeRequest = () => {
    return new Request(makeApi(), path, method, params);
  };

  it('can return the provided arguments', () => {
    const api = makeApi();
    let request = new Request(api, path, method, params);
    expect(request.getApi()).toBe(api);
    expect(request.getPath()).toBe(path);
    expect(request.getMethod()).toBe(method);
    expect(request.getParams()).toBe(params);
  });

  it('can allow domain override', () => {
    let request = makeRequest();
    const domain = 'whatever.internet.domain';
    request.setDomain(domain);
    expect(request.getDomain()).toBe(domain);
  });

  it('can default graph version', () => {
    let request = makeRequest();
    expect(request.getGraphVersion()).toBe(request.getApi().getGraphVersion());
  });

  it('can allow graph version override', () => {
    let request = makeRequest();
    const version = [1, 0];
    request.setGraphVersion(version);
    expect(request.getGraphVersion()).not.toBe(request.getApi().getGraphVersion());
    expect(request.getGraphVersion()).toBe(version);
  });

  it('won\'t build a body for GET requests', () => {
    let request = makeRequest();
    request.setParams(new Map({k: 1}));
    expect(request.getBody()).toBeNull();
    request.setMethod('POST');
    expect(request.getBody()).not.toBeNull();
  });

  it('can build a URL string', () => {
    let request = makeRequest();
    expect(request.getUrl()).toMatch(/^https:\/\/[^\/]+\/v\d+\.\d+\/[^\?]+$/);
    request.setPath('');
    expect(request.getUrl()).toMatch(/^https:\/\/[^\/]+\/v\d+\.\d+\/$/);
    request.setParams(new Map({k: 1}));
    expect(request.getUrl()).toMatch(/^https:\/\/[^\/]+\/v\d+\.\d+\/[^\?]*\?k=1$/);
  });

  it('can execute through the provided Api', () => {
    let request = makeRequest();
    let response = {success: true};
    request.getApi().execRequest.mockReturnValue(response);
    expect(request.execute()).toBe(response);
  })
});
