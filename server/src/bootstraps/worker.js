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

import type PollingPool from '../scheduler/PollingPool';
import type PollingThread from '../scheduler/PollingThread';
import type {Argv} from '../Config';

const Config = require('../Config');
const Worker = require('../services/Worker');

const print_pool_specs = function(pool: PollingPool): void {
  const thread_count = pool.getThreads().size;
  console.log('Worker initialized with:');
  console.log(` - pid: ${process.pid}`);
  console.log(` - threads: ${thread_count}`);
  pool.getThreads().forEach((thread: PollingThread, key: number) => {
    const queue_name = thread.getQueue().getName();
    const interval = thread.getInterval();
    console.log(`  [${key}] queue = ${queue_name}; interval = ${interval}ms`);
  });
  console.log('>> Awaiting for routines');
};

const bootstrap = function(argv: Argv): Worker {
  const inline_config = argv.get('inline-config', '{}').toString();
  const service = new Worker(Config.fromArgv(argv));
  service.once(Worker.events.INIT, (pool: PollingPool) => {
    service.setServiceInlineConfig(inline_config);
    print_pool_specs(pool);
  });

  return service;
};

module.exports = bootstrap;
