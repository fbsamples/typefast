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
import FontIcon from 'material-ui/FontIcon';
import { List, ListItem } from 'material-ui/List';

class TypeFastNewScriptDialog extends React.Component {
  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        secondary={true}
        onTouchTap={this.props.onHide}
      />,
      <FlatButton
        label="Create blank script"
        primary={true}
        onTouchTap={this.props.onSampleClick}
      />
    ];
    return (
      <Dialog
        autoScrollBodyContent={true}
        title="Create script from template"
        actions={actions}
        modal={false}
        open={this.props.isShowing}
        onRequestClose={this.props.onHide}
      >
        <List>
          {this.props.samples.map(sample =>
            <ListItem
              onClick={this.props.onSampleClick.bind(null, sample.id)}
              key={sample.id}
              primaryText={sample.name}
              secondaryText={sample.description}
              leftIcon={<FontIcon className="material-icons">description</FontIcon>}
            />
          )}
        </List>
        <div style={{visibility: (this.props.samples.length == 0) ? 'visible' : 'hidden'}}>
          No samples available
        </div>
      </Dialog>
    );
  }
}

module.exports = TypeFastNewScriptDialog;
