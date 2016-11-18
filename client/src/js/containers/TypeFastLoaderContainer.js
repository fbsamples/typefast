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

import type { Dispatch, State } from 'redux';

import { connect } from 'react-redux';
import {
  facebookAuthStarted,
  facebookAuthSuccess,
  facebookAuthFailure,
} from '../actions/actions.js';
import TypeFastLoaderModal from '../components/TypeFastLoaderModal';
import { serverConfig } from '../ServerConfig';

const mapStateToProps = (state: State, ownProps: Object): Object => {
  return {
    // FLOW_FIXME refactor ServerConfig
    appId:  serverConfig.getRawConfig().application_id,
    isAuthenticated: state.isAuthenticated,
    isAuthenticating: state.isAuthenticating,
    isAuthorised: state.isAuthorised,
    isFetching: state.isFetching,
    isLoading: state.isLoading,
    isRunning: state.isRunning,
  };
};

const mapDispatchToProps = (dispatch: Dispatch, ownProps: Object): Object => {
  return {
    facebookAuthStarted: (): void => {
      dispatch(facebookAuthStarted());
    },
    facebookAuthSuccess: (token: string): void => {
      dispatch(facebookAuthSuccess(token));
    },
    facebookAuthFailure: (): void => {
      dispatch(facebookAuthFailure());
    },
  };
};

const TypeFastLoaderContainer = connect(mapStateToProps, mapDispatchToProps)(TypeFastLoaderModal);

export default TypeFastLoaderContainer;
