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

import DatePicker from 'material-ui/DatePicker';
import Dialog from 'material-ui/Dialog';
import DropDownMenu from 'material-ui/DropDownMenu';
import FlatButton from 'material-ui/FlatButton';
import MenuItem from 'material-ui/MenuItem';
import { SchedulePeriods, ScheduleRecurence, Weekdays } from '../constants/constants.js';
import TimePicker from 'material-ui/TimePicker';
import Toggle from 'material-ui/Toggle';

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
        disabled={this.props.schedule.interval < 0}
      />,
    ];

    return (
      <Dialog
        autoScrollBodyContent={true}
        title="Schedule"
        actions={actions}
        modal={false}
        open={this.props.isShowing}
        onRequestClose={this.props.onHide}
      >
        <Toggle
          label="Enabled: "
          style={{maxWidth: '135px', marginTop: '20px'}}
          onToggle={this.props.onEnabledChange.bind(this)}
          toggled={!this.props.schedule.is_paused}
        />
        Run:
        <DropDownMenu
          value={this.props.schedule.interval}
          onChange={this.props.onIntervalChange.bind(this)}
        >
          {SchedulePeriods.map(runType =>
            <MenuItem key={runType.name} value={runType.value} primaryText={runType.name} />)
          }
        </DropDownMenu>
        on
        <div style={{
          display: (this.props.schedule.interval >= ScheduleRecurence.HOURLY) ?
          'inline-block' : 'none'
        }}>
          <DropDownMenu
            value={this.props.schedule.minute}
            onChange={this.props.onMinuteChange}
          >
            {(new Array(60)).fill().map((_, i) =>
              <MenuItem key={i} value={i} primaryText={i.toString()} />)
            }
          </DropDownMenu> m
        </div>
        <div style={{
          display: (this.props.schedule.interval >= ScheduleRecurence.DAILY) ?
          'inline-block' : 'none'
        }}>
          <DropDownMenu
            value={this.props.schedule.hour}
            onChange={this.props.onHourChange}
          >
            {(new Array(24)).fill().map((_, i) =>
              <MenuItem key={i} value={i} primaryText={i.toString()} />)
            }
          </DropDownMenu> h
        </div>
        <div style={{
          display: (this.props.schedule.interval >= ScheduleRecurence.WEEKLY) ?
          'inline-block' : 'none'
        }}>
          <DropDownMenu
            value={this.props.schedule.day}
            onChange={this.props.onDayChange}
          >
            {Weekdays.map(day =>
              <MenuItem key={day.key} value={day.key} primaryText={day.name} />)
            }
          </DropDownMenu>
        </div>
      </Dialog>
    );
  }
}

module.exports = TypeFastScheduleDialog;
