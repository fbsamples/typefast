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

import type {Request, Response} from 'express';

const AbstractRestController = require('./AbstractRestController');
const Script = require('../model/script');

// implement ../ControllerInterface
class ScriptRestController extends AbstractRestController {

  getBaseRoute() : string {
    return '/scripts';
  }

  genList(request: Request, response: Response): void {
    // Need user level checkin
    Script.find(function (err, scripts) {
      if (err) return returnError(request, response, HttpStatus.INTERNAL_SERVER_ERROR);
      response.send(scripts).end();
    });
  }

  genRead(request: Request, response: Response): void {
    // Need user level checking
    const id = request.params.id;
    Script.findById(id, function (err, script){
      if (err) return returnError(request, response, HttpStatus.INTERNAL_SERVER_ERROR);
      response.send(script).end();
    });
  }

  genCreate(request: Request, response: Response): void {
    const body = request.body;
    const title = body.title;
    const code = body.code;
    const optimisations = body.optimisations;
    const newScript = Script({
      title: title,
      optimisations: optimisations,
      code: code
    });

    // Need user level checking
    newScript.save(function(err, script) {
      if (err) return returnError(request, response, HttpStatus.INTERNAL_SERVER_ERROR);
      response.send({success: true, id: script.id}).end();
    });
  }

  genUpdate(request: Request, response: Response): void {
    const id = request.params.id;
    const body = request.body;
    const title = body.title;
    const code = body.code;
    const optimisations = body.optimisations;

    // Need user level checking
    Script.findByIdAndUpdate(
      id,
      {
        title: title,
        optimisations: optimisations,
        code: code
      },
      {},
      function(err, script) {
        if (err) return returnError(request, response, HttpStatus.INTERNAL_SERVER_ERROR);
        response.send({sucess: true}).end();
      }
    );
  }

  genDelete(request: Request, response: Response): void {
    const id = request.params.id;
    // Need user level checking
    Script.findByIdAndRemove(id, function(err) {
      if (err) return returnError(request, response, HttpStatus.INTERNAL_SERVER_ERROR);
      response.send({sucess: true}).end();
    })
  }
}

module.exports = ScriptRestController;
