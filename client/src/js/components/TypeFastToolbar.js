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

import React from 'react';

import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon';
import {Toolbar, ToolbarGroup, ToolbarTitle} from 'material-ui/Toolbar';

class TypeFastToolbar extends React.Component {
  render() {
    return (
      <Toolbar>
        <ToolbarGroup firstChild={true}>
          <ToolbarTitle text={this.props.script.title} style={{marginLeft: '10px'}} />
        </ToolbarGroup>
        <ToolbarGroup>
          <FlatButton
            label="Save"
            primary={true}
            onClick={this.props.onScriptSave}
            icon={<FontIcon className="material-icons">save</FontIcon>}
            style={{margin: "10px 0"}}
          />
          <FlatButton
            label="Preview"
            primary={true}
            onClick={this.props.onScriptPreview}
            icon={<FontIcon className="material-icons">play_arrow</FontIcon>}
            style={{margin: "10px 0"}}
            disabled={this.props.needToSave}
          />
          <FlatButton
            label="Schedule"
            onClick={this.props.onScriptSchedule}
            icon={<FontIcon className="material-icons">schedule</FontIcon>}
            style={{margin: "10px 0"}}
          />
        </ToolbarGroup>
      </Toolbar>
    );
  }
}

module.exports = TypeFastToolbar;
