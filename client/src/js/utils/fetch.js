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
 * @flow
 */

import fetch from 'isomorphic-fetch';

const build_query = function(query: Object): string {
  const chunks = [];
  for (let i in query) {
    if (query.hasOwnProperty(i)) {
      const value = query[i] instanceof Object ? JSON.stringify(query[i]) : query[i];
      chunks.push(encodeURIComponent(i) + '=' + value);
    }
  }
  return chunks.join('&');
};

const get = function(state: Object, path: string, query: ?Object): Promise<Object> {
  query = query || {};
  if (state.accessToken) {
    query.access_token = state.accessToken;
  }
  const querystring = build_query(query);
  const opts = {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
    },
  };

  return fetch(path + (querystring.length > 0 ? `?${querystring}` : ''), opts);
};

const post = function(state: Object, path: string, body: ?Object): Promise<Object> {
  body = body || {};
  if (state.accessToken) {
    body.access_token = state.accessToken;
  }
  const opts = {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: build_query(body),
  };

  return fetch(path, opts);
};

module.exports = {
  get: get,
  post: post,
};
