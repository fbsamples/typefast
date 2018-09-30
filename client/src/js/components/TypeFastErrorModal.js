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
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

class TypeFastErrorModal extends React.Component {

  render(): Element<any> {
    const actions = [
      <FlatButton
        label="Refresh"
        secondary={true}
        keyboardFocused={true}
        onTouchTap={this.props.onRefresh}
      />,
    ];
    return (
      <Dialog
        autoScrollBodyContent={true}
        title={
          'An Error Occurred While Performing: ' + this.props.errorAction
        }
        actions={actions}
        modal={true}
        open={this.props.isShowing}
        onRequestClose={this.props.onHide}
        bodyStyle={{paddingBottom: '0px'}}
        titleStyle={{marginBottom: '0px'}}
        actionsContainerStyle={{marginTop: '0px'}}
        style={{zIndex: 1000}}
      >
        <p>{'Message: ' + this.props.errorMessage}</p>
        <div style={{display: (this.props.errorStack.length > 0) ? 'inline' : 'none'}}>
          Stack trace:<br /><code style={{fontSize: '9pt'}}>
            {
              this.props.errorStack.map((line, number) => {
                return (<span key={number}>{line}<br /></span>);
              })
            }
          </code>
        </div>
      </Dialog>
    );
  }
}

module.exports = TypeFastErrorModal;
