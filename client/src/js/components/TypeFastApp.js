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

import  React  from 'react';
import { connect } from 'react-redux';
import { fetchScripts } from '../actions/actions.js';
import TypeFastNavigationContainer from '../containers/TypeFastNavigationContainer';
import TypeFastEditorContainer from '../containers/TypeFastEditorContainer';
import TypeFastListingContainer from '../containers/TypeFastListingContainer';


class TypeFastApp extends React.Component {
  componentDidMount() {
    // this causes lots of state sets while rendering so needs to be moved
    // out
    this.props.dispatch(fetchScripts());
  }

  render() {
    return (
      <div className="full-height">
        <TypeFastNavigationContainer />
        <div className="row full-height">
          <TypeFastListingContainer />
          <TypeFastEditorContainer />
        </div>
      </div>
    );
  }
}

export default connect()(TypeFastApp);
