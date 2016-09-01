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

const Vm = require('vm');
const Console = require('./Console');
const Fetch = require('./Fetch');
const {PassThrough} = require('stream');

class Sandbox {

  console: ?Console;
  context: ?Object;
  fetch: ?Fetch;
  sharedObject: Object;
  timeout: ?number;

  constructor(shared_object?: Object): void {
    this.setSharedObject(shared_object || {});
    this.timeout = null;
  }

  setSharedObject(shared_object: Object): this {
    this.sharedObject = shared_object;
    this.context = null;

    return this;
  }

  getConsole(): Console {
    if (this.console == null) {
      this.console = new Console(new PassThrough(), new PassThrough());
    }

    return this.console;
  }

  getContext(): Object {
    if (this.context == null) {
      const shared_object = this.sharedObject;
      shared_object.console = this.getConsole();
      shared_object.fetch = this.getFetch();
      this.context = Vm.createContext(shared_object);
    }
    return this.context;
  }

  getFetch(): Fetch {
    if (this.fetch == null) {
      this.fetch = new Fetch();
    }

    return this.fetch;
  }

  setTimeout(timout: number): this {
    this.timeout = timout;
    return this;
  }

  getTimeout(): ?number {
    return this.timeout;
  }

  run(code: string): void {
    const options = {};
    const timeout = this.getTimeout();
    if (timeout !== null) {
      options.timeout = timeout;
    }
    Vm.runInContext(code, this.getContext(), options);
  }
}

module.exports = Sandbox;
