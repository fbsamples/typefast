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

import type { Element } from 'React';

import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon';
import {List, ListItem} from 'material-ui/List';

class TypeFastOpenScriptDialog extends React.Component {

  static propTypes = {
    isShowing: React.PropTypes.bool,
    onHide: React.PropTypes.func,
    onScriptSelect: React.PropTypes.func,
    scripts: React.PropTypes.objectOf(React.PropTypes.shape({
      title: React.PropTypes.string,
      updated_time: React.PropTypes.string,
    })),
  };

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
        title="Your scripts"
        actions={actions}
        modal={false}
        open={this.props.isShowing}
        onRequestClose={this.props.onHide}
      >
        <List>
          {Object.keys(this.props.scripts).map(scriptId =>
            <ListItem
              key={scriptId}
              primaryText={this.props.scripts[scriptId].title}
              secondaryText={new Date(this.props.scripts[scriptId].updated_time).toString()}
              onClick={this.props.onScriptSelect.bind(null, scriptId)}
              leftIcon={<FontIcon className="material-icons">description</FontIcon>}
            />
          )}
        </List>
        <div style={{display: (this.props.scripts.length == 0) ? '' : 'none'}}>
          No scripts available
        </div>
      </Dialog>
    );
  }
}

module.exports = TypeFastOpenScriptDialog;
