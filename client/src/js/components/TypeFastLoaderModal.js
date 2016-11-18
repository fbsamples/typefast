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

type FbjsResponse = { status: string, authResponse: { accessToken: string } };

import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RefreshIndicator from 'material-ui/RefreshIndicator';

class TypeFastLoaderModal extends React.Component {

  static propTypes = {
    appId: React.PropTypes.number,
    facebookAuthFailure: React.PropTypes.func,
    facebookAuthStarted: React.PropTypes.func,
    facebookAuthSuccess: React.PropTypes.func,
    isAuthenticated: React.PropTypes.bool,
    isAuthenticating: React.PropTypes.bool,
    isAuthorised: React.PropTypes.bool,
    isFetching: React.PropTypes.bool,
    isLoading: React.PropTypes.bool,
    isRunning: React.PropTypes.bool,
  };

  statusChangeCallback(response: FbjsResponse): void {
    if (response.status === 'connected') {
      this.props.facebookAuthSuccess(response.authResponse.accessToken);
    } else if (response.status === 'not_authorized') {
      this.props.facebookAuthFailure();
    } else {
      this.props.facebookAuthFailure();
    }
  }

  onLoginClicked(): void {
    this.props.facebookAuthStarted();
    window.FB.login(this.statusChangeCallback.bind(this), {scope: 'public_profile'});
  }

  componentDidMount() {
    window.fbAsyncInit = function() {
      window.FB.init({
        appId: this.props.appId,
        cookie: true,
        xfbml: true,
        version: 'v2.8',
      });

      this.props.facebookAuthStarted();
      window.FB.getLoginStatus(function(response) {
        this.statusChangeCallback(response);
      }.bind(this));
    }.bind(this);

    const sdk = document.createElement('script');
    sdk.id = 'facebook-jssdk';
    sdk.src = '//connect.facebook.net/en_US/sdk.js';
    document.body.appendChild(sdk);
  }

  statusMessage() {
    if (this.props.isFetching) {
      return <p>Fetching data...</p>;
    } else if (this.props.isAuthenticating) {
      return <p>Attempting to log you in...</p>;
    } else if (this.props.isAuthenticated) {
      if (this.props.isAuthorised === false) {
        return <p>You are not authorised in your companies Business Manager to use TypeFast.
          Please contact your manager for permission</p>;
      }
      return <p>Logged In!</p>;
    } else {
      return <p>To use TypeFast you will need to login to your Facebook Account
       and authorise the Facebook Application</p>;
    }
  }

  render(): Element<any> {
    const actions = [
      <FlatButton
        label="Login"
        primary={true}
        onTouchTap={this.onLoginClicked.bind(this)}
        disabled={this.props.isAuthenticating || this.props.isFetching}
      />,
    ];
    return (
      <div>
        <Dialog
          autoScrollBodyContent={true}
          actions={actions}
          title="Loading..."
          modal={true}
          open={this.props.isLoading}
        >
          <div>{this.statusMessage()}</div>
        </Dialog>
        <div style={{position: 'absolute', top: '50%', left: 'calc(75% - 20px)'}}>
          <RefreshIndicator
            size={40}
            top={0}
            left={0}
            status={(this.props.isRunning) ? 'loading' : 'hide'}
          />
        </div>
      </div>
    );
  }
}

module.exports = TypeFastLoaderModal;
