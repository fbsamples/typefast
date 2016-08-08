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

const ROUTINE_ID_KEY = 'routine-id';

const on_init = function(runner: Runner) {
  runner.getSandbox().getConsole().getStdout().pipe(process.stdout);
  runner.getSandbox().getConsole().getStderr().pipe(process.stderr);
};

const bootstrap = function(argv: Argv): Runner {
  console.assert(argv.has(ROUTINE_ID_KEY), `Missing reqired parameter --${ROUTINE_ID_KEY}`);

  const routine_id: string = argv.get(ROUTINE_ID_KEY).toString();
  const config = Config.fromArgv(argv);
  const runner = new Runner(config, routine_id);
  runner.on(Runner.events.INIT, () => on_init(runner));

  return runner;
};

module.exports = bootstrap;
