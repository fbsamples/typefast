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

const fetch = require('node-fetch');
const parse = require('qs').parse;
const stringify = require('qs').stringify;

function handleQs(url, query) {
  url = url.split('?');
  const start = url[0];
  let qs = (url[1] || '').split('#')[0];
  const end = url[1] && url[1].split('#').length > 1 ? '#' + url[1].split('#')[1] : '';

  let baseQs = parse(qs);
  for (let i in query) {
    baseQs[i] = query[i];
  }
  qs = stringify(baseQs);
  if (qs !== '') {
    qs = '?' + qs;
  }
  return start + qs + end;
}

process.stdin.setEncoding('utf8');
process.stdin.on('data', function(stdin) {
  const req = JSON.parse(stdin.toString());
  if (req.options.qs) {
    req.url = handleQs(req.url, req.options.qs);
  }
  fetch(req.url, {method: req.method, body: req.options.body})
    .then(response => {
      response.text().then(body => {
        const data = {
          status: response.status,
          body: body,
          headers: response.headers,
          url: response.url
        };
        process.stdout.write(JSON.stringify({success: true, response: data}), function() {
          process.exit(0);
        });
      });
    });
});
