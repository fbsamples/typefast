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

import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon';
import TextField from 'material-ui/TextField';
import { Toolbar, ToolbarGroup } from 'material-ui/Toolbar';

class TypeFastToolbar extends React.Component {

  static propTypes = {
    currentTitle: React.PropTypes.string,
    onScriptHistory: React.PropTypes.func,
    onScriptIconClick: React.PropTypes.func,
    onScriptPreview: React.PropTypes.func,
    onScriptSave: React.PropTypes.func,
    onScriptSchedule: React.PropTypes.func,
    onScriptTitleChange: React.PropTypes.func,
  };

  titleLengthError(): string {
    if (this.props.currentTitle.length < 3) {
      return 'Minimum 3 chars';
    }
    return '';
  }

  render(): Element<any> {
    return (
      <Toolbar>
        <ToolbarGroup>
          <span
            style={{
              fontFamily: 'Roboto, sans-serif',
              fontSize: '20px',
              color: 'rgba(0, 0, 0, 0.6)',
              marginTop: '14px',
              marginRight: '10px',
            }}
          >Title:</span>
          <TextField
            onChange={this.props.onScriptTitleChange}
            value={this.props.currentTitle}
            id={"script_name"}
            errorText={this.titleLengthError()}
            errorStyle={{bottom: '5px'}}
          />
          <FontIcon onClick={this.props.onScriptIconClick} className="material-icons">create</FontIcon>
        </ToolbarGroup>
        <ToolbarGroup>
          <FlatButton
            label="Save"
            primary={true}
            onClick={this.props.onScriptSave}
            icon={<FontIcon className="material-icons">save</FontIcon>}
            style={{margin: '10px 0'}}
          />
          <FlatButton
            label="Preview"
            primary={true}
            onClick={this.props.onScriptPreview}
            icon={<FontIcon className="material-icons">play_arrow</FontIcon>}
            style={{margin: '10px 0'}}
            disabled={this.props.needToSave || this.props.isRunning}
          />
          <FlatButton
            label="Schedule"
            onClick={this.props.onScriptSchedule}
            icon={<FontIcon className="material-icons">schedule</FontIcon>}
            style={{margin: '10px 0'}}
          />
          <FlatButton
            label="Run History"
            onClick={this.props.onScriptHistory}
            icon={<FontIcon className="material-icons">history</FontIcon>}
            style={{margin: '10px 0'}}
          />
        </ToolbarGroup>
      </Toolbar>
    );
  }
}

module.exports = TypeFastToolbar;
