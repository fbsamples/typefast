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

import type Session from './Session';
import type {HttpAdapterInterface} from './http/HttpAdapterInterface';
import type {GraphVersion, RequestMethod, RequestParams} from './http/Request';

const Request = require('./http/Request');
const Response = require('./http/Response');

class Api {

  graphVersion: GraphVersion;
  httpAdapter: HttpAdapterInterface;
  session: Session;

  constructor(http_adapter: HttpAdapterInterface, session: Session, graph_version: GraphVersion): void {
    this.httpAdapter = http_adapter;
    this.session = session;
    this.graphVersion = graph_version;
  }

  getHttpAdapter(): HttpAdapterInterface {
    return this.httpAdapter;
  }

  getSession(): Session {
    return this.session;
  }

  getGraphVersion(): GraphVersion {
    return this.graphVersion;
  }

  execRequest(request: Request): Response {
    request.setParams(
      request.getParams()
        .set('access_token', this.getSession().getAccessToken())
        .set('appsecret_proof', this.getSession().getApplicationSecretProof())
    );
    return this.getHttpAdapter().executeRequest(request);
  }

  call(path: string, method: RequestMethod, params: RequestParams): Response {
    return this.execRequest(new Request(this, path, method, params));
  }
}

module.exports = Api;
