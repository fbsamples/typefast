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

import type Queue from './Queue';
import type PollingPool from './PollingPool';
import type {Document} from 'mongoose';
import type {Unlock} from './PollingPool';

const {EventEmitter} = require('events');

class PollingThread extends EventEmitter {

  static events: { [key: string]: string };

  active: bool;
  interval: number;
  pool: PollingPool;
  queue: Queue;
  timoutHandle: ?number;

  static fromPool(pool: PollingPool, queue: Queue, interval: number): PollingThread {
    const thread = new PollingThread(pool, queue, interval);
    pool.addThread(thread);

    return thread;
  }

  constructor(pool: PollingPool, queue: Queue, interval: number): void {
    super();
    this.pool = pool;
    this.queue = queue;
    this.interval = interval;
    this.active = false;
    this.timoutHandle = null;
  }

  getPool(): PollingPool {
    return this.pool;
  }

  getQueue(): Queue {
    return this.queue;
  }

  getInterval(): number {
    return this.interval;
  }

  isActive(): bool {
    return this.active;
  }

  onPoolLock(unlock: Unlock): void {
    // Dispatch ROUTINE event -> Instruct worker to spawn a new runner
    this.emit(PollingThread.events.LOCK);
    this.getQueue().getRoutineWithLock((routine: ?Document) => {
      if (routine !== null && routine !== undefined) {
        // Stop the thread -> Worker to restart once routine is over
        this.stop();
        this.emit(PollingThread.events.ROUTINE, routine);
      } else {
        // Reschedule interval
        this.scheduleInterval(this.getInterval());
      }
      // Free pool lock
      this.emit(PollingThread.events.UNLOCK);
      unlock();
    });
  }

  onInterval(): void {
    // Request pool slot allocation
    this.getPool().obtainLock(this.onPoolLock.bind(this));
    this.emit(PollingThread.events.INTERVAL);
  }

  scheduleInterval(interval: number): this {
    if (this.isActive()) {
      this.timoutHandle = setTimeout(this.onInterval.bind(this), interval);
    }

    return this;
  }

  start(): this {
    this.active = true;
    this.scheduleInterval(0);

    return this;
  }

  stop(): this {
    this.active = false;
    if (this.timoutHandle) {
      clearTimeout(this.timoutHandle);
    }

    return this;
  }
}

PollingThread.events = {
  INTERVAL: 'interval',
  LOCK: 'lock',
  ROUTINE: 'routine',
  UNLOCK: 'unlock',
};

module.exports = PollingThread;
