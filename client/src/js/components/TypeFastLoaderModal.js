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

class TypeFastLoaderModal extends React.Component {

  statusChangeCallback(response) {
    if (response.status === 'connected') {
      this.props.facebookAuthSuccess(response.authResponse.accessToken);
    } else if (response.status === 'not_authorized') {
      this.props.facebookAuthFailure();
    } else {
      this.props.facebookAuthFailure();
    }
  }

  onLoginClicked() {
    this.props.facebookAuthStarted();
    window.FB.login(this.statusChangeCallback.bind(this));
  }

  componentDidMount() {
    let appId = this.props.appId;
    window.fbAsyncInit = function() {
      window.FB.init({
        appId      : appId,
        cookie     : true,  // enable cookies to allow the server to access
                            // the session
        xfbml      : true,  // parse social plugins on this page
        version    : 'v2.5' // use graph api version 2.5
      });

      this.props.facebookAuthStarted();
      window.FB.getLoginStatus(function(response) {
        this.statusChangeCallback(response);
      }.bind(this));
    }.bind(this);

    // Load the SDK asynchronously
    (function(d, s, id) {
      const element = d.getElementsByTagName(s)[0];
      const fjs = element;
      let js;
      if (d.getElementById(id)) {return;}
      js = d.createElement(s); js.id = id;
      js.src = '//connect.facebook.net/en_US/sdk.js';
      fjs.parentNode.insertBefore(js, fjs);
    }(window.document, 'script', 'facebook-jssdk'));
  }

  statusMessage() {
    if (this.props.isFetching) {
      return <p>Fetching data...</p>;
    } else if (this.props.isAuthenticating) {
      return <p>Attempting to log you in...</p>;
    } else if (this.props.isAuthenticated) {
      if (this.props.isAuthorised === false) {
        return
          <p>You are not authorised in your companies Business Manager to use TypeFast.
          Please contact your manager for permission</p>;
      }
      return <p>Logged In!!</p>;
    } else {
      return <p>To use TypeFast you will need to login to your Facebook Account
       and authorise the Facebook Application</p>;
    }
  }

  render() {
    const actions = [
      <FlatButton
        label="Login"
        primary={true}
        onTouchTap={this.onLoginClicked.bind(this)}
        disabled={this.props.isAuthenticating || this.props.isFetching}
      />
    ];
    return (
      <Dialog
        autoScrollBodyContent={true}
        actions={actions}
        title="Loading..."
        modal={true}
        open={this.props.isLoading}
      >
        <div>{this.statusMessage()}</div>
      </Dialog>
    );
  }
}

module.exports = TypeFastLoaderModal;
