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

import type {AuthHandle} from '../../model/AuthHandle';
import type {Resolve, Reject} from '../../utils/promises';

const AuthHandleModel = require('../../model/AuthHandle');
const Crypto = require('crypto');
const Graph = require('fbgraph');
const User = require('./User');
const {genList} = require('../../utils/promises');
const {List, Map} = require('immutable');

const HANDLE_KEY_HASH_ALGO = 'sha256';
const CODE_INVALID_BM_TOKEN = 190;
const MESSAGE_INVALID_ACCESS_TOKEN = 'Invalid Access Token';
const MESSAGE_INVALID_BM_ACCESS_TOKEN = 'Invalid System User Token';
const MESSAGE_USER_NOT_IN_BM = 'Unauthorized user. Please ensure they are added to your Business Manager';

class Authentication {

  business_manager_id: string;
  system_access_token: string;

  constructor(business_manager_id: string, system_access_token: string): void {
    this.system_access_token = system_access_token;
    this.business_manager_id = business_manager_id;
  }

  willFetchBusinessRoles(): Promise<Map<number, boolean>> {
    const access_token = this.system_access_token;
    const ids = {};

    return new Promise((resolve: Resolve<Map<number, boolean>>, reject: Reject) => {
      function callApi(url) {
        Graph.get(
          url, { access_token: access_token },
          (err: Object, response: Object) => {
            if (response && response.data) {
              Object.keys(response.data).forEach(function(key) {
                let obj = response.data[key];
                if (obj && obj.user && obj.user.id) {
                  ids[obj.user.id] = true;
                }
              });

              if (response.paging && response.paging.next) {
                callApi(response.paging.next);
              } else {
                resolve(new Map(ids));
              }
            } else {
              reject(new Error(
                (err && err.code) == CODE_INVALID_BM_TOKEN ? MESSAGE_INVALID_BM_ACCESS_TOKEN : undefined)
              );
            }
          }
        );
      }
      callApi('/' + this.business_manager_id + '/userpermissions');
    });
  }

  willFetchUserData(user_access_token: string): Promise<number> {
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

  willExecUserAuth(user_access_token: string): Promise<number> {
    const promiseList = new List([
      this.willFetchUserData(user_access_token),
      this.willFetchBusinessRoles(),
    ]);

    return genList(promiseList).then((results: List<any>) => {
      const user_id = results.get(0);
      const business_roles = results.get(1);
      return business_roles.has(user_id) ? Promise.resolve(user_id) : Promise.reject(new Error(MESSAGE_USER_NOT_IN_BM));
    });
  }

  getAuthHandleKey(user_access_token: string): string {
    const raw = `${this.system_access_token}|${user_access_token}`;

    return Crypto.createHash(HANDLE_KEY_HASH_ALGO).update(raw).digest('base64');
  }

  willGetAuthHandle(user_access_token: string): Promise<?AuthHandle> {
    return AuthHandleModel.findOne({ handle: this.getAuthHandleKey(user_access_token) }).exec();
  }

  willStoreAuthHandle(user_access_token: string, user_id: number): Promise<AuthHandle> {
    const handle = AuthHandleModel({
      handle: this.getAuthHandleKey(user_access_token),
      user_id: user_id,
    });

    return handle.save();
  }

  willAuthenticateUser(user_access_token: string): Promise<User> {
    return this.willGetAuthHandle(user_access_token)
      .then((handle: ?AuthHandle) => {
        if (handle) {
          return new User(handle.get('user_id'));
        }

        return this.willExecUserAuth(user_access_token)
          .then((user_id: number) => {
            // No need to wait for cache aknoledgement
            process.nextTick(() => this.willStoreAuthHandle(user_access_token, user_id));
            return new User(user_id);
          });
      });
  }
}

module.exports = Authentication;
