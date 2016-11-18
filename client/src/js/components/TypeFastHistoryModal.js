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

export type LogStream = | 'stdout' | 'stderr';
export type LogEntry = { chunk: string, stream: LogStream, time: string };

import React from 'react';
import dateFormat from 'dateformat';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import {List, ListItem} from 'material-ui/List';
import TypeFastCustomListItem from '../components/TypeFastCustomListItem';

class TypeFastHistoryModal extends React.Component {

  static propTypes = {
    isShowing: React.PropTypes.bool,
    onHide: React.PropTypes.func,
    routines: React.PropTypes.arrayOf(React.PropTypes.shape({
      runner_end_time: React.PropTypes.string,
      runner_log: React.PropTypes.arrayOf(React.PropTypes.shape({
        chunk: React.PropTypes.string,
        stream: React.PropTypes.oneOf(['stdout', 'stdout']),
        time: React.PropTypes.string,
      })),
      runner_start_time: React.PropTypes.string,
      visible_from: React.PropTypes.string,
    })),
  };

  timeTaken(start: string, end: string): number {
    const seconds = Math.floor((new Date(end) - new Date(start)) / 1000);
    return seconds;
  }

  formatOutputStreams(streamArray: Array<LogEntry>): Array<Element<any>> {
    return streamArray.reduce((prev: Array<Element<any>>, curr: LogEntry, index: number) => {
      prev.push(<p key={index}>{dateFormat(curr.time)} - {curr.chunk}</p>);
      return prev;
    }, []);
  }

  render(): Element<any> {
    const actions = [
      <FlatButton
        label="Cancel"
        secondary={true}
        onTouchTap={this.props.onHide}
      />,
    ];
    return (
      <Dialog
        autoScrollBodyContent={true}
        title="Run History"
        actions={actions}
        modal={false}
        open={this.props.isShowing}
        onRequestClose={this.props.onHide}
      >
        <List>
          {this.props.routines.map(curr =>
            <ListItem
              key={curr.id}
              primaryText={curr.visible_from}
              initiallyOpen={false}
              nestedItems={[
                <TypeFastCustomListItem key={0}>
                  <p>Time Taken: {this.timeTaken(curr.runner_start_time, curr.runner_end_time)} seconds</p>
                  <div>
                    {this.formatOutputStreams(curr.runner_log)}
                  </div>
                </TypeFastCustomListItem>,
              ]}
            />
          )}
        </List>
        <div style={{display: (this.props.routines.length == 0) ? '' : 'none'}}>
          No history available
        </div>
      </Dialog>
    );
  }
}

module.exports = TypeFastHistoryModal;
