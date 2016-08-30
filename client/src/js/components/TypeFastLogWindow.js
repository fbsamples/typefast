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

import Radium from 'radium';
import React from 'react';

class TypeFastLogWindow extends React.Component {
  logGenerator() {
    let elements = this.props.log.map((el) => {
      return el.message.split('\n').map((i, j) => { return <div key={j}>{i}</div>;});
    });
    return [].concat.apply([], elements);
  }

  render() {
    return (
      <div
        style={[styles.container]}>
        <div style={{marginLeft: "15px"}}>
          <code id="logbox" style={{whiteSpace: "pre"}}>
            {this.logGenerator()}
          </code>
        </div>
      </div>
    );
  }
}

const styles = {
  container: {
    height: '100%',
    background: '#F6F6F6',
    paddingTop: '15px',
    overflow: 'scroll',
    float: 'left',
    width: '50%',
  }
};

module.exports = Radium(TypeFastLogWindow);
