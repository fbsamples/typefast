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

import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import Popover from 'material-ui/Popover';

class TypeFastAppBar extends React.Component {
  render() {
    return (
      <AppBar
        title="TypeFast"
        iconElementLeft={
          <IconMenu
            iconButtonElement={
              <IconButton><MoreVertIcon color="white" /></IconButton>
            }
            targetOrigin={{horizontal: 'left', vertical: 'top'}}
            anchorOrigin={{horizontal: 'left', vertical: 'top'}}
          >
            <MenuItem
              primaryText="New Script"
              onClick={this.props.onNewScriptClick}
            />
            <MenuItem
              primaryText="Open Script"
              onClick={this.props.onOpenScriptClick}
            />
            <MenuItem
              primaryText="Run History"
              onClick={this.props.onHistoryClick}
            />
            <MenuItem
              primaryText="Samples"
              onClick={this.props.onSamplesClick}
            />
            <MenuItem
              primaryText="Help"
              onClick={this.props.onHelpClick}
            />
          </IconMenu>
        }
        iconElementRight={
          <div>
            <Popover
              open={this.props.showPopover}
              anchorEl={this.props.popover}
              anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
              targetOrigin={{horizontal: 'left', vertical: 'top'}}
              onRequestClose={this.props.onPopoverHide}
            >
              <Menu>
                {this.props.adaccounts.map(adaccount =>
                  <MenuItem
                    key={adaccount.id}
                    primaryText={adaccount.name}
                    checked={this.props.currentAdaccount.id === adaccount.id}
                  />
                )}
              </Menu>
            </Popover>
            <FlatButton
              onTouchTap={this.props.onPopoverShow}
              label={this.props.currentAdaccount.name}
              labelPosition="before"
              labelStyle={{color: "white"}}
              icon={
                <FontIcon
                  className="material-icons"
                  color="white"
                >expand_more</FontIcon>
              }
            />
          </div>
        }
      />
    );
  }
}

module.exports = TypeFastAppBar;
