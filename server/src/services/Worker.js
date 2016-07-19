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

import type {Document} from 'mongoose';
import type {OnRoutineExecutionEnd} from '../scheduler/Scheduler';

const AbstractService = require('./AbstractService');
const PollingPool = require('../scheduler/PollingPool');
const PollingThread = require('../scheduler/PollingThread');

// implement ServiceInterface
class Worker extends AbstractService {

  onRoutine(
    routine: Document,
    unlock: OnRoutineExecutionEnd,
    complete: OnRoutineExecutionEnd,
    renew: OnRoutineExecutionEnd
  ): void {
    const id = routine.get('id');
    // FIXME actually execute a Runner
    console.log(` > Locked routine ${id}`);
    const time = Math.random() * (3000 - 1000) + 1000;
    console.log(` > Executing routine ${id} as dummy for ${time} ms`);
    setTimeout(
      () => unlock((routine: ?Document) => { routine && console.log(` > Unlocked routine ${id}`); }),
      time
    );
  }

  init(): void {
    const polling_interval = this.getConfig().getInteger('scheduler.preview_queue.polling_interval');
    // FIXME this arbitrarly enables only 1 thread on the preview queue -> no main queue
    const pool = new PollingPool(1);
    const thread = PollingThread.fromPool(pool, this.getScheduler().getHighPriQueue(), polling_interval);

    // FIXME remove debug logging
    thread.on(PollingThread.events.INTERVAL, () => console.log('thread.INTERVAL'));
    thread.on(PollingThread.events.LOCK, () => console.log('thread.pool.LOCK'));
    thread.on(PollingThread.events.ROUTINE, () => console.log('thread.ROUTINE'));
    thread.on(PollingThread.events.UNLOCK, () => console.log('thread.pool.UNLOCK'));

    this.getScheduler().pollForRoutines(pool, this.onRoutine.bind(this));

    // FIXME nicely handle signals
    // this.emit(AbstractService.events.END);
  }
}

module.exports = Worker;
