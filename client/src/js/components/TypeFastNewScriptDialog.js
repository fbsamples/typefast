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

import Dialog from 'material-ui/Dialog';
import DropDownMenu from 'material-ui/DropDownMenu';
import FlatButton from 'material-ui/FlatButton';
import {List, ListItem} from 'material-ui/List';
import MenuItem from 'material-ui/MenuItem';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import TextField from 'material-ui/TextField';

class TypeFastNewScriptDialog extends React.Component {
  nameLengthError() {
    if (this.props.newScript.script.title.length < 3) return "Minimum 3 chars";
  }

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        secondary={true}
        onTouchTap={this.props.onHide}
      />,
      <FlatButton
        disabled={this.props.newScript.script.title.length < 3}
        label="Save"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.props.onSave}
      />,
      <FlatButton
        disabled={this.props.newScript.script.title.length < 3}
        label="Save & Schedule"
        primary={true}
        onTouchTap={this.props.onSchedule}
      />,
    ];
    return (
      <Dialog
        title="Select type"
        actions={actions}
        modal={false}
        open={this.props.isShowing}
        onRequestClose={this.props.onHide}
      >
        <TextField
          onChange={this.props.onNameChange.bind(this)}
          hintText="Enter script name"
          errorText={this.nameLengthError()}
          defaultValue={this.props.newScript.script.title} />
        <RadioButtonGroup
          name="type"
          onChange={this.props.onTypeChange.bind(this)}
          value={this.props.newScript.type}
          defaultSelected="sample">
          <RadioButton
            value="blank"
            label="Create blank"
          />
          <RadioButton
            value="sample"
            label="Create from sample"
          />
        </RadioButtonGroup>
        Select sample: <DropDownMenu
          onChange={this.props.onSampleChange.bind(this)}
          disabled={this.props.newScript.type !== 'sample'}
          value={this.props.newScript.sampleId}>
          {this.props.samples.map((sample, index) =>
            <MenuItem key={sample.id} value={index} primaryText={sample.name} />
          )}
        </DropDownMenu>
      </Dialog>
    );
  }
}

module.exports = TypeFastNewScriptDialog;
