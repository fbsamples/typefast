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

jest.unmock('../../../src/http/adapters/NodejsSynchronousAdapter');

const NodejsSynchronousAdapter = require('../../../src/http/adapters/NodejsSynchronousAdapter');
const Request = require('../../../src/http/Request');
const Response = require('../../../src/http/Response');
const {Map} = require('immutable');

describe('NodejsSynchronousAdapter', () => {

  const makeAdapter = () => {
    return new NodejsSynchronousAdapter();
  };

  const makeRequest = (method) => {
    const request = new Request();
    request.getMethod.mockReturnValue(method);
    request.willSendBody.mockReturnValue(method !== 'GET');
    request.getUrl.mockReturnValue('https://doma.in/path');
    request.getParams.mockReturnValue(new Map({key: 'value'}));
    return request;
  };

  it('can execute GET requests', () => {
    expect(makeAdapter().executeRequest(makeRequest('GET'))).toEqual(jasmine.any(Response));
  });

  it('can execute POST requests', () => {
    expect(makeAdapter().executeRequest(makeRequest('POST'))).toEqual(jasmine.any(Response));
  });

  it('can execute DELETE requests', () => {
    expect(makeAdapter().executeRequest(makeRequest('DELETE'))).toEqual(jasmine.any(Response));
  });

  it('throws on HTTP error status codes', () => {
    const request = makeRequest();
    request.getMethod.mockReturnValue('TRIGGER_DRIVER_ERROR');
    expect(() => makeAdapter().executeRequest(request)).toThrow();
  });
});
