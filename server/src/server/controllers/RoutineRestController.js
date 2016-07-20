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

import type Queue from '../../scheduler/Queue';
import type {Request, Response} from 'express';
import type {Document} from 'mongoose';

const AbstractRestController = require('./AbstractRestController');
const HttpStatus = require('http-status-codes');
const Script = require('../../model/script');

// implement ../ControllerInterface
class RoutineRestController extends AbstractRestController {

  getBaseRoute() : string {
    return '/routines';
  }

  genRead(request: Request, response: Response): void {
    // Need user level checking
    const id = request.params.id;
    this.getApplication().getScheduler().getRoutine(id, (routine: ?Document, queue: Queue) => {
      if (routine != null) {
        response.send(routine.toObject({versionKey: false})).end();
        return;
      }
      this.returnError(request, response, HttpStatus.NOT_FOUND);
    });
  }

  genCreate(request: Request, response: Response): void {
    const script_id = request.body.script_id; // FIXME validate
    Script.findById(script_id).exec((err: ?Error, script: ?Document) => {
      if (err != null) {
        this.returnError(request, response, HttpStatus.INTERNAL_SERVER_ERROR);
        return;
      }
      if (script == null) {
        this.returnError(request, response, HttpStatus.NOT_FOUND);
        return;
      }

      this.getApplication().getScheduler().exec(script_id, (routine_id: string) => {
        response.send({
          id: routine_id,
        }).end();
      });
    });
  }

  genDelete(request: Request, response: Response): void {
    this.returnError(request, response, HttpStatus.NOT_IMPLEMENTED);
  }
}

module.exports = RoutineRestController;
