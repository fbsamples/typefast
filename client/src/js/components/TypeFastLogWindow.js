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

import type { Element } from 'react';
import type { LogEntry } from './TypeFastHistoryModal';

import Radium from 'radium';
import React from 'react';
import dateformat from 'dateformat';

class TypeFastLogWindow extends React.Component {

  static propTypes = {
    log: React.PropTypes.arrayOf(React.PropTypes.shape({
      chunk: React.PropTypes.string,
      stream: React.PropTypes.oneOf(['stdout', 'stdout']),
      time: React.PropTypes.string,
    })),
  };

  getTimebox(entry: LogEntry): Element<any> {
    const time = dateformat(new Date(entry.time), 'HH:MM:ss.l');
    return (
      <div style={[styles.time_box]}>{`[${time}]`}</div>
    );
  }

  logGenerator(): Array<Element<any>> {
    let elements = this.props.log.map((entry: LogEntry, key: number): Element<any> => {
      const chunk_style = [styles.chunk];
      if (entry.stream === 'stderr') {
        chunk_style.push(styles.error_chunk);
      }
      return (
        <div key={key}>
          {this.getTimebox(entry)}
          <div style={chunk_style}>{entry.chunk}</div>
        </div>
      );
    });
    return [].concat.apply([], elements);
  }

  render(): Element<any> {
    return (
      <div style={[styles.container]}>
        <div style={{marginLeft: '15px'}}>
          <code id="logbox" style={{whiteSpace: 'pre'}}>
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
  },
  chunk: {
    display: 'inline-block',
    width: '64px',
  },
  error_chunk: {
    color: '#C33C33',
  },
  time_box: {
    color: '#999999',
    display: 'inline-block',
    fontStyle: 'italic',
    minWidth: '96px',
    paddingRight: '5px',
  },
};

module.exports = Radium(TypeFastLogWindow);
