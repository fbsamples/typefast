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

const Config = require('../Config');
const Mongoose = require('mongoose');
const Sandbox = require('../Sandbox');
const Script = require('../model/Script');
const Util = require('util');
const {Map} = require('immutable');

const sandbox_template = require('../sandbox/template');

const SCRIPT_ID_KEY = 'script-id';

const console_debug = function(stream_name: string, chunk: string): string {
  return Util.format('SANDBOX::%s: %s', stream_name, chunk);
};

const bootstrap = function(argv: Map): Sandbox {
  console.assert(argv.has(SCRIPT_ID_KEY), `Missing reqired parameter --${SCRIPT_ID_KEY}`);

  const script_id = argv.get(SCRIPT_ID_KEY);
  const config = Config.fromArgv(argv);
  const sandbox = new Sandbox(sandbox_template(config));
  sandbox.setTimeout(config.getInteger('sandbox.timeout'));
  const stdout = sandbox.getConsole().getStdout();
  const stderr = sandbox.getConsole().getStderr();

  // FIXME should store to db instead of piping from server process
  stdout.on('data', (chunk: string) => process.stdout.write(console_debug('STDOUT', chunk)));
  stderr.on('data', (chunk: string) => process.stderr.write(console_debug('STDERR', chunk)));

  // Will hang the process. process.exit or Mongoose.disconnect must be explicitly called
  Mongoose.connect(config.getString('db.url'));

  Script.findById(script_id).exec((err: Error, script: Script) => {
    console.assert(err == null, err);
    sandbox.run(script.code);
    Mongoose.disconnect();
  });

  return sandbox;
};

module.exports = bootstrap;
