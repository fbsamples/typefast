/**
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
 */

jest.unmock('../src/Session');

const Session = require('../src/Session');

describe('Session', () => {

  const application_id = 1234567890;
  const application_secret = '<APPLICATION_ID>';
  const access_token = '<ACCESS_TOKEN>';

  const makeSession = () => {
    return new Session(application_id, application_secret, access_token);
  };

  it('can return the provided arguments', () => {
    const session = new Session(application_id, application_secret, access_token);
    expect(session.getApplicationId()).toBe(application_id);
    expect(session.getApplicationSecret()).toBe(application_secret);
    expect(session.getAccessToken()).toBe(access_token);
  });

  it('can calculate an HMAC digest as Application Secret Proof with lazy-loading', () => {
    const session = makeSession();
    const proof = session.getApplicationSecretProof();
    expect(proof).toEqual('9a2ac1cee291d1de581976011134f95347861901592d31e1b32ec632980c7357');
    // Access cached proof
    expect(session.getApplicationSecretProof()).toBe(proof);
  });
});
