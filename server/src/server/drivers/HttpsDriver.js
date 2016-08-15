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

import type {Application as ExpressApplication} from 'express';
import type {Resolve, Reject} from '../../utils/promises';

const Filesystem = require('fs');
const HttpDriver = require('./HttpDriver');
const Https = require('https');
const nullthrows = require('../../utils/nullthrows');
const {Map} = require('immutable');
const {genMap} = require('../../utils/promises');

const willReadFile = function(path: string): Promise<string> {
  return new Promise((resolve: Resolve<string>, reject: Reject) => {
    Filesystem.realpath(path, {}, (error: ?Error, resolved_path: string) => {
      error != null ? reject(error) : resolve(resolved_path);
    });
  }).then((path: string) => {
    return new Promise((resolve: Resolve<string>, reject: Reject) => {
      Filesystem.readFile(path, 'utf8', (error: ?Error, data: string) => {
        error != null ? reject(error) : resolve(data);
      });
    });
  });
};

class HttpsDriver extends HttpDriver {

  getSslKeyPath(): string {
    return nullthrows(nullthrows(this.getOptions().get('ssl')).get('key'));
  }

  getSslCertPath(): string {
    return nullthrows(nullthrows(this.getOptions().get('ssl')).get('cert'));
  }

  getListenerDescription(): string {
    const addr = this.getAddress();
    const port = this.getPort();
    return `https://${addr}:${port}/`;
  }

  willBindWebApplication(web_application: ExpressApplication): Promise<void> {
    const opts = new Map({
      key: this.getSslKeyPath(),
      cert: this.getSslCertPath(),
    }).map((path: string) => willReadFile(path));

    return genMap(opts)
      .then((opts: Map<string, string>) => {
        const server = Https.createServer(opts.toObject(), web_application);
        server.listen(this.getPort(), this.getAddress(), this.getMaxConnections(), () => Promise.resolve());
      });
  }
}

module.exports = HttpsDriver;
