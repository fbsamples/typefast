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

import TypeFastEditorContainer from '../containers/TypeFastEditorContainer';

import TypeFastAppBarContainer from '../containers/TypeFastAppBarContainer';
import TypeFastHelpContainer from '../containers/TypeFastHelpContainer';
import TypeFastHistoryContainer from '../containers/TypeFastHistoryContainer';
import TypeFastLoaderContainer from '../containers/TypeFastLoaderContainer';
import TypeFastUnsavedChangesContainer from '../containers/TypeFastUnsavedChangesContainer';
import TypeFastNewScriptContainer from '../containers/TypeFastNewScriptContainer';
import TypeFastOpenScriptContainer from '../containers/TypeFastOpenScriptContainer';
import TypeFastScheduleContainer from '../containers/TypeFastScheduleContainer';
import TypeFastSnackbarContainer from '../containers/TypeFastSnackbarContainer';
import TypeFastToolbarContainer from '../containers/TypeFastToolbarContainer';

class TypeFastApp extends React.Component {
  render() {
    return (
      <div>
        <div style={{position: 'fixed', width: '100%', zIndex: '5'}}>
          <TypeFastAppBarContainer />
          <TypeFastToolbarContainer />
        </div>

        <div style={{width: '100%', height: '120px'}}></div>

        <TypeFastEditorContainer />

        <TypeFastHelpContainer />
        <TypeFastHistoryContainer />
        <TypeFastUnsavedChangesContainer />
        <TypeFastNewScriptContainer />
        <TypeFastOpenScriptContainer />
        <TypeFastScheduleContainer />
        <TypeFastLoaderContainer />
        <TypeFastSnackbarContainer />
      </div>
    );
  }
}

export default connect()(TypeFastApp);
