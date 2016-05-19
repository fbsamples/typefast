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

jest.unmock('../../src/http/Response');

const Request = require('../../src/http/Request');
const Response = require('../../src/http/Response');
const {Map} = require('immutable');

describe('Response', () => {

  const status = 200;
  const body = '{}';

  const makeRequest = () => {
    return new Request(/* mock */);
  };

  const makeResponse = () => {
    let request = makeRequest();
    return new Response(request, status, body);
  };

  it('can return the provided arguments', () => {
    let request = makeRequest();
    let response = new Response(request, status, body);
    expect(response.getRequest()).toBe(request);
    expect(response.getStatus()).toBe(status);
    expect(response.getBody()).toBe(body);
  });

  it('can deserialize bodies with lazy-loading', () => {
    let response = makeResponse();
    let content = response.getContent();
    expect(JSON.stringify(content)).toEqual(body);
    // Access cached content
    expect(response.getContent()).toBe(content);
  });
});
