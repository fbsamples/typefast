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

import type {RequestMethod} from '../../../sdk/src/http/Request';

export type Response = {
  url: ?string,
  headers: {[key: string]: string},
  status: number,
  body: string,
};

const encodeBody = require('form-urlencoded');
const SyncRequest = require('sync-request');
const {isURL} = require('validator');
const {Map} = require('immutable');

const MESSAGE_INVALID_URL_FORMAT = 'Invalid URL Format: Please enter a valid HTTP(S) URL';

const statics: Map<string, any> = new Map({
  body: '',
  followRedirects: true,
  maxRedirects: Infinity,
  maxRetries: 5,
  gzip: true,
  headers: {
    'User-Agent': 'typefast',
  },
  json: '',
  qs: {},
  retry: false,
  retryDelay: 200,
  socketTimeout: false,
  timeout: false,
});

const normalize_options = function(options: Object): Map<string, any> {
  let dynamics = new Map(options);
  const body = dynamics.get('body', statics.get('body', {}));
  if ( typeof body === 'object') {
    dynamics = dynamics.set('body', encodeBody(body));
  }
  return statics.merge(dynamics);
};

const is_valid_path = function(path: string): boolean {
  return isURL(path, { protocols: ['http', 'https'] });
};

const enforce_valid_path = function(path: string): void {
  if (!is_valid_path(path)) {
    throw new Error(MESSAGE_INVALID_URL_FORMAT);
  }
};

const request = function(method: RequestMethod, path: string, options: ?Object): Response {
  enforce_valid_path(path);
  const out = SyncRequest(method, path, normalize_options(options || {}).toObject());

  return {
    url: out.url,
    headers: out.headers,
    status: out.statusCode,
    body: out.body.toString(),
  };
};

module.exports = {
  request: request,
};
