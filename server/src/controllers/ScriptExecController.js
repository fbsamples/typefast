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

import type {Request, RequestMethod, Response} from 'express';
import type {Document} from 'mongoose';

const AbstractController = require('./AbstractController');
const ChildProcess = require('child_process');
const HttpStatus = require('http-status-codes');
const Script = require('../model/Script');
const {Set} = require('immutable');

// implement ../ControllerInterface
class ScriptExecController extends AbstractController {

  getRoute(): string {
    return '/exec/:id([0-9a-fA-F]{24})';
  }

  getRouteMethods(): Set<RequestMethod> {
    return new Set(['post']);
  }

  genResponse(request: Request, response: Response): void {
    const script_id = request.params.id;
    Script.findById(script_id).exec((err: Error, script: Document) => {
      if (err != null) {
        this.returnError(request, response, HttpStatus.INTERNAL_SERVER_ERROR);
        return;
      }
      if (script == null) {
        this.returnError(request, response, HttpStatus.NOT_FOUND);
        return;
      }

      // FIXME no transpile by default
      const argv = ['index.js', '--transpile', '--mode', 'runner', '--script-id', script_id];
      const child = ChildProcess.execFile('node', argv);
      const log = [];
      const start_time = new Date();
      child.stdout.on('data', (chunk: string) => log.push({stream: 'STDOUT', message: chunk.substring(17)}));
      child.stderr.on('data', (chunk: string) => log.push({stream: 'STDERR', message: chunk.substring(17)}));
      child.on('exit', (code) => {
        const end_time = new Date();
        return response.send({
          success: code === 0,
          time: {
            start: Math.floor(start_time.getTime() / 1000),
            end: Math.floor(end_time.getTime() / 1000)
          },
          log: log
        }).end();
      });
    });
  }
}

module.exports = ScriptExecController;
