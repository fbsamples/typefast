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
import {List, ListItem} from 'material-ui/List';

import TypeFastCustomListItem from '../components/TypeFastCustomListItem';

class TypeFastSamplesModal extends React.Component {
  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        secondary={true}
        keyboardFocused={true}
        onTouchTap={this.props.onHide}
      />
    ];
    return(
      <Dialog
        autoScrollBodyContent={true}
        title="Samples"
        actions={actions}
        modal={false}
        open={this.props.isShowing}
        onRequestClose={this.props.onHide}
        bodyStyle={{paddingBottom: '0px'}}
      >
        <List>
          {this.props.samples.map(sample =>
            <ListItem
              key={sample.id}
              primaryText={sample.name}
              nestedItems={[
                <TypeFastCustomListItem key={0}>
                  {sample.code.split("\n").map((line, index) =>
                    <div key={index}>{line}</div>
                  )}
                </TypeFastCustomListItem>
              ]}
            />
          )}
        </List>
      </Dialog>
    );
  }
}

module.exports = TypeFastSamplesModal;
