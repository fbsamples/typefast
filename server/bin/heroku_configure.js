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

const Config = require('../src/Config');
const {List, Map} = require('immutable');

const int_params = new List([
  'graph.application_id',
  'graph.version.0',
  'graph.version.1'
]);

let env = new Map(process.env);
env = env.set('server.bindings.http.port', parseInt(env.get('PORT'), 10));

const config = Config.fromArgv(new Map());
const data = config.getData().asMutable();

config.flatten().map((value, key) => {
  let override = env.get(key, undefined);
  if (override !== undefined) {
    if (override === 'true' || override === 'false') {
      override = (override === 'true');
    } else if (int_params.find(value => value === key)) {
      override = parseInt(override, 10);
    }
    data.setIn(key.split('.'), override);
  }
});

process.stdout.write(JSON.stringify(data.toJS(), null, 4));
