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

import type PollingThread from './PollingThread';

export type Unlock = () => void;
export type OnLock = (unlock: Unlock) => void;

// Data structure queue, not the Typefast scheduler queue
const {Queue} = require('phosphor-queue');
const {List, Repeat} = require('immutable');

class PollingPool {

  concurrency: number;
  locks: List<?number>;
  locksQueue: Queue<OnLock>;
  threads: List<PollingThread>;
  threadsCount: number;

  constructor(concurrency: number): void {
    this.threads = new List();
    this.locks = new List(Repeat(null, concurrency));
    this.locksQueue = new Queue();
  }

  getConcurrency(): number {
    return this.concurrency;
  }

  getThreads(): List<PollingThread> {
    return this.threads;
  }

  addThread(thread: PollingThread): this {
    this.threads = this.threads.push(thread);

    return this;
  }

  // Allocate a lock if a slot is available
  allocateLock(): this {
    const available_slot = this.locks.findEntry((lock: ?number, key: number) => !!lock);
    if (!available_slot) {
      return this;
    }
    const index = available_slot[0];
    const lock_request = this.locksQueue.pop();
    if (!lock_request) {
      return this;
    }

    const unlock = () => {
      this.locks.set(index, null);
      this.allocateLock();
    };

    process.nextTick(() => lock_request(unlock));

    return this;
  }

  obtainLock(onLock: OnLock): this {
    this.locksQueue.push(onLock);
    this.allocateLock();

    return this;
  }
}


module.exports = PollingPool;
