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

import type Api from './../Api';
import type Response from './Response';

export type GraphVersion = [number, number];
export type RequestMethod = | 'GET' | 'POST' | 'DELETE';
export type RequestBody = Map<string, string>;
export type RequestParams = Map<string, any>;

const {Map} = require('immutable');

class Request {

  api: Api;
  domain: string;
  graphVersion: ?GraphVersion;
  method: RequestMethod;
  params: RequestParams;
  path: string;

  constructor(api: Api, path: string, method: RequestMethod, params: RequestParams): void {
    this.setDomain('graph.facebook.com')
      .setApi(api)
      .setPath(path)
      .setMethod(method)
      .setParams(params);
  }

  setApi(api: Api): Request {
    this.api = api;
    return this;
  }

  getApi(): Api {
    return this.api;
  }

  setDomain(domain: string): Request {
    this.domain = domain;
    return this;
  }

  getDomain(): string {
    return this.domain;
  }

  setPath(path: string): Request {
    this.path = path;
    return this;
  }

  getPath(): string {
    return this.path;
  }

  setMethod(method: RequestMethod): Request {
    this.method = method;
    return this;
  }

  getMethod(): RequestMethod {
    return this.method;
  }

  setParams(params: RequestParams): Request {
    this.params = params;
    return this;
  }

  getParams(): RequestParams {
    return this.params;
  }

  setGraphVersion(version: GraphVersion): Request {
    this.graphVersion = version;
    return this;
  }

  getGraphVersion(): GraphVersion {
    return this.graphVersion == null
      ? this.getApi().getGraphVersion()
      : this.graphVersion;
  }

  willSendBody(): bool {
    return this.getMethod() !== 'GET';
  }

  getUrl(): string {
    let domain = this.getDomain();
    let path = this.getPath().length === 0 || this.getPath().charAt(0) !== '/'
      ? '/' + this.getPath()
      : this.getPath();
    let version = this.getGraphVersion().join('.');
    let query = this.willSendBody() || this.getParams().count() === 0
      ? ''
      : '?' + this.getParams().map((value, key) => key + '=' + String(value)).join('&');

    return `https://${domain}/v${version}${path}${query}`;
  }

  getBody(): ?RequestBody {
    return this.willSendBody()
      ? this.getParams().map(String)
      : null;
  }

  execute(): Response {
    return this.getApi().execRequest(this);
  }
}

module.exports = Request;
