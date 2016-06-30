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

import type {Argv} from '../Config';

const Config = require('../Config');
const Runner = require('../services/Runner');
const Util = require('util');

const SCRIPT_ID_KEY = 'script-id';

const console_debug = function(stream_name: string, chunk: string): string {
  return Util.format('SANDBOX::%s: %s', stream_name, chunk);
};

const on_init = function(runner: Runner) {
  // FIXME should store to db instead of piping from server process
  // console.log(`Executing script ${script_id}`);
  runner.getSandbox().getConsole().getStdout()
    .on('data', (chunk: string) => process.stdout.write(console_debug('STDOUT', chunk)));
  runner.getSandbox().getConsole().getStderr()
    .on('data', (chunk: string) => process.stderr.write(console_debug('STDERR', chunk)));
};

const bootstrap = function(argv: Argv): Runner {
  console.assert(argv.has(SCRIPT_ID_KEY), `Missing reqired parameter --${SCRIPT_ID_KEY}`);

  const script_id = argv.get(SCRIPT_ID_KEY);
  const config = Config.fromArgv(argv);
  const runner = new Runner(config, script_id.toString());
  runner.on(Runner.events.INIT, () => on_init(runner));

  return runner;
};

module.exports = bootstrap;
