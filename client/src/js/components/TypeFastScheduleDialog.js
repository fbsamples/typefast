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
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import TimePicker from 'material-ui/TimePicker';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import Toggle from 'material-ui/Toggle';
import { ScheduleRecurence, SchedulePeriods } from '../constants/constants.js';

class TypeFastScheduleDialog extends React.Component {
  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        secondary={true}
        onTouchTap={this.props.onHide}
      />,
      <FlatButton
        label="Apply"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.props.onApply}
      />,
    ];

    return (
      <Dialog
        title="Schedule"
        actions={actions}
        modal={false}
        open={this.props.isShowing}
        onRequestClose={this.props.onHide}
      >
        <Toggle
          label="Enabled: "
          style={{maxWidth: "135px"}}
          onToggle={this.props.onEnabledChange.bind(this)}
          checked={this.props.schedule.enabled}
        />
        Run:
        <DropDownMenu
          value={this.props.schedule.recurrence}
          onChange={this.props.onIntervalChange.bind(this)}>
          {SchedulePeriods.map((runType) =>
            <MenuItem key={runType.name} value={runType.value} primaryText={runType.name} />)
          }
        </DropDownMenu><br /><br />
        Time:
        <TimePicker
          defaultTime={this.props.schedule.date}
          hintText="Click to select time"
          onChange={this.props.onTimeChange.bind(this)} />
        Date:
        <DatePicker
          defaultDate={this.props.schedule.time}
          hintText="Click to select date"
          onChange={this.props.onDateChange.bind(this)} />
      </Dialog>
    );
  }
}

module.exports = TypeFastScheduleDialog;
