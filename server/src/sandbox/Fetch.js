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
const {isURL} = require('validator');

const encodeBody = require('form-urlencoded');
const SyncRequest = require('sync-request');

const MESSAGE_INVALID_URL_FORMAT = 'Invalid URL Format: Please enter a valid HTTP(S) URL';

const defaultOptions = function({
    qs = {},
    headers = {
      'user-agent': 'typefast'
    },
    body = '',
    json = '',
    followRedirects = true,
    maxRedirects = Infinity,
    gzip = true,
    timeout = false,
    socketTimeout = false,
    retry = false,
    retryDelay = 200,
    maxRetries = 5,
  } = {}): Object {

  if (typeof body === 'object') {
    body = encodeBody(body);
  }

  return {
    qs: qs,
    headers: headers,
    body: body,
    json: json,
    followRedirects: followRedirects,
    maxRedirects: maxRedirects,
    gzip: gzip,
    timeout: timeout,
    socketTimeout: socketTimeout,
    retry: retry,
    retryDelay: retryDelay,
    maxRetries: maxRetries,
  };
};

const validPath = function(path: string): boolean {
  return isURL(path, { protocols: ['http', 'https'] });
};

const validateUrl = function(path: string): void {
  if (!validPath(path)) {
    throw new Error(MESSAGE_INVALID_URL_FORMAT);
  }
};

const fetch = function(method: RequestMethod, path: string, options: ?Object): Object {
  options = defaultOptions(options);

  validateUrl(path);
  const out = SyncRequest(method, path, options);

  return {
    url: out.url,
    headers: out.headers,
    status: out.statusCode,
    body: out.body.toString(),
  };
};


module.exports = {
  fetch: fetch
};
