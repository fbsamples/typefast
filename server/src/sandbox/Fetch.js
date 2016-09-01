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
const {Map} = require('immutable');
const {isURL} = require('validator');

const encodeBody = require('form-urlencoded');
const SyncRequest = require('sync-request');

const MESSAGE_INVALID_URL = 'Invalid Resource/URL: Could not fetch contents';
const MESSAGE_INVALID_URL_FORMAT = 'Invalid URL Format: Please enter a valid URL';
const MESSAGE_INVALID_METHOD_FORMAT = 'Invalid Method: Please enter either "GET" or "POST"';

class SandboxFetch {

  constructor(): void {
  }

  validMethod(method: string) : boolean {
    return method === 'POST' || method === 'GET';
  }

  validPath(path: string) : boolean {
    return isURL(path);
  }

  validateUrl(path: string, method: string) : Map<string, string> {
    let errors = [];

    if (!this.validPath(path)) {
      errors.push(MESSAGE_INVALID_URL_FORMAT);
    }

    if (!this.validMethod(method)) {
      errors.push(MESSAGE_INVALID_METHOD_FORMAT);
    }

    return new Map({
      url: path,
      status: (errors.length > 0) ? -1 : 1,
      body: errors.join(' and ')
    });
  }

  getUrl(path: string, method: RequestMethod, params: ?Object, send_body: boolean): string {
    const urlParams = new Map(params);
    const query = send_body || urlParams.count() === 0
      ? ''
      : '?' + urlParams.map((value, key) => key + '=' + String(value)).join('&');

    return `${path}${query}`;
  }

  url(path: string, method: RequestMethod, params: ?Object, headers: ?Object) : Object {

    const validUrl = this.validateUrl(path, method);
    if (parseInt(validUrl.get('status'), 10) < 0) {
      return validUrl.toObject();
    }

    const send_body = method !== 'GET';
    const reqUrl = this.getUrl(path, method, params, send_body);

    const out = SyncRequest(method, reqUrl, {
      qs: !send_body
        ? params
        : {},
      body: send_body
        ? encodeBody(params)
        : '',
      headers: headers
    });

    return {
      url: reqUrl,
      status: out.statusCode,
      body: (out.statusCode === 200) ? out.body.toString() : MESSAGE_INVALID_URL
    };
  }


}

module.exports = SandboxFetch;
