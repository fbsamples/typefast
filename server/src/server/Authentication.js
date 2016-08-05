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

import type Application from '../services/Application';
import type {Resolve, Reject} from './controllers/AbstractController';

const Context = require('./RequestContext');
const Graph = require('fbgraph');
const Promises = require('../utils/promises');
const Immutable = require('immutable');
const {List} = require('immutable');

const CODE_INVALID_BM_TOKEN = 190;
const MESSAGE_INVALID_ACCESS_TOKEN = 'Invalid Access Token';
const MESSAGE_INVALID_BM_ACCESS_TOKEN = 'Invalid System User Token';
const MESSAGE_USER_NOT_IN_BM = 'Unauthorized user. Please ensure they are added to your Business Manager';

class Authentication {

  application: Application;
  business_manager_id: string;
  system_access_token: string;
  user_access_token: string;
  graph_versions: Array<number>;


  constructor(application: Application, user_access_token: string): void {
    const appconfig = application.getConfig();
    this.application = application;
    this.user_access_token = user_access_token;
    this.system_access_token = appconfig.getString('graph.access_token');
    this.business_manager_id = appconfig.getString('graph.business_manager_id');
  }

  doAuth(context: Context) : Promise<Context> {
    const promiseList = new List([
      this.verifyUserToken(this.user_access_token),
      this.verifyBusinessManagerUser(this.system_access_token)
    ]);

    return Promises.genList(promiseList).then((results: List<any>) => {
      const user_id = results.get(0);
      const business_roles = results.get(1);
      return business_roles.has(user_id) ? Promise.resolve(context) : Promise.reject(new Error(MESSAGE_USER_NOT_IN_BM));
    });
  }

  verifyUserToken(user_access_token: string): Promise<number> {
    return new Promise((resolve: Resolve<number>, reject: Reject) => {
      Graph.get(
        '/me', {access_token: user_access_token},
        (err: Object, response: Object) => {
          if (err) {
            reject(new Error(MESSAGE_INVALID_ACCESS_TOKEN));
          } else {
            resolve(response.id);
          }
        });

    });
  }

  verifyBusinessManagerUser(system_access_token: string): Promise<Map<number, boolean>> {
    let ids = {};

    return new Promise((resolve: Resolve<Map<number, boolean>>, reject: Reject) => {
      function callApi(url) {
        Graph.get(
          url, {access_token: system_access_token},
          (err: Object, response: Object) => {
            if (response && response.data) {
              Object.keys(response.data).forEach(function(key) {
                let obj = response.data[key];
                ids[obj.user.id] = true;
              });
              if (response.paging && response.paging.next) {
                callApi(response.paging.next);
              } else {
                resolve(Immutable.fromJS(ids));
              }
            } else {
              if (err && err.code == CODE_INVALID_BM_TOKEN) {
                reject(new Error(MESSAGE_INVALID_BM_ACCESS_TOKEN));
              } else {
                reject(new Error(MESSAGE_USER_NOT_IN_BM));
              }
            }
          }
        );
      }
      callApi('/' + this.business_manager_id + '/userpermissions');
    });
  }

}

module.exports = Authentication;
