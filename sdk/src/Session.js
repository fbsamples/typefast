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

const Crypto = require('crypto');

class Session {

  application_id: number;
  application_secret: string;
  access_token: string;
  application_secret_proof: ?string;

  constructor(application_id: number, application_secret: string ,access_token: string): void {
    this.application_id = application_id;
    this.application_secret = application_secret;
    this.access_token = access_token;
  }

  getApplicationId(): number {
    return this.application_id;
  }

  getApplicationSecret(): string {
    return this.application_secret;
  }

  getAccessToken(): string {
    return this.access_token;
  }

  getApplicationSecretProof(): string {
    if (this.application_secret_proof == null) {
      let hmac = Crypto.createHmac('sha256', this.getApplicationSecret());
      hmac.update(this.getAccessToken());
      this.application_secret_proof = String(hmac.digest('hex'));
    }

    return this.application_secret_proof;
  }
}

module.exports = Session;
