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

import type Config from '../Config';
import type {Document} from 'mongoose';

const AbstractService = require('./AbstractService');
const Sandbox = require('../sandbox/Sandbox');
const Script = require('../model/Script');

const sandbox_template = require('../sandbox/template');

// implement ServiceInterface
class Runner extends AbstractService {

  sandbox: Sandbox;
  scriptId: string;

  constructor(config: Config, script_id: string): void {
    super(config);
    this.sandbox = new Sandbox();
    this.sandbox.setTimeout(config.getInteger('sandbox.timeout'));
    this.scriptId = script_id;
  }

  getSandbox(): Sandbox {
    return this.sandbox;
  }

  getScriptId(): string {
    return this.scriptId;
  }

  init(): void {
    const script_id = this.getScriptId();
    Script.findById(script_id).exec((err: ?Error, script: ?Document) => {
      if (err != null) {
        throw err;
      }
      if (script == null) {
        throw new Error(`Unknown script ${script_id}`);
      }
      this.getSandbox().setSharedObject(sandbox_template(this.getConfig(), script));
      this.emit(Runner.events.INIT);
      // Prioritize service listeners as sanxbox execute syncronously
      process.nextTick(() => {
        script && this.getSandbox().run(script.get('code'));
        this.emit(Runner.events.END);
      });
    });
  }
}

module.exports = Runner;
