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
import type {Resolve, Reject} from
  './controllers/AbstractController';

const Context = require('./RequestContext');
const Graph = require('fbgraph');
const Promises = require('../utils/Promises');
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


  constructor(
    application: Application,
    user_access_token: string
  ): void {
    const appconfig = application.getConfig();

    this.application = application;
    this.user_access_token = user_access_token;
    this.system_access_token =
      appconfig.getString('graph.access_token');
    this.business_manager_id =
      appconfig.getString('graph.business_manager_id');
  }

  doAuth(context: Context) : Promise<Context> {
    const promiseList = Immutable.List.of(
      this.verifyUserToken(this.user_access_token),
      this.verifyBusinessManagerUser()
    );
    const promises = Promise.resolve(Promises.genList(promiseList));
    return promises.then(function(results: List<*>) {
      const resSeq = results.toSeq();
      const user_id: number = resSeq.get(0);
      const user_ids: Map<number, boolean> = resSeq.get(1);

      return new Promise(
          (resolve: Resolve<Context>, reject: Reject) => {
            if (user_ids.has(user_id)) {
              resolve(context);
            } else {
              reject(MESSAGE_USER_NOT_IN_BM);
            }
          });
    });
  }

  verifyUserToken(
    access_token: string
  ): Promise<number> {

    Graph.setAccessToken(access_token);
    return new Promise((resolve: Resolve<number>, reject: Reject) => {
      Graph.get(
        '/me',
        (err: Object, response: Object) => {
          if (err) {
            reject(MESSAGE_INVALID_ACCESS_TOKEN);
          } else {
            resolve(response.id);
          }
        });

    });
  }

  verifyBusinessManagerUser(): Promise<Map<number, boolean>> {

    Graph.setAccessToken(this.system_access_token);
    var ids = {};

    return new Promise((resolve: Resolve<Map<number, boolean>>, reject: Reject) => {
      function callApi(url) {
        Graph.get(
          url, {limit: 10000},
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
                reject(MESSAGE_INVALID_BM_ACCESS_TOKEN);
              } else {
                reject(MESSAGE_USER_NOT_IN_BM);
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
