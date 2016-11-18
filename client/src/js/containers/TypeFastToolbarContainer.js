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
  changeScriptTitle,
  previewScript,
  saveScript,
  showRunHistoryModal,
  showScheduleDialog,
} from '../actions/actions.js';
import TypeFastToolbar from '../components/TypeFastToolbar';

const mapStateToProps = (state: State, ownProps: Object): Object => {
  return {
    isRunning: state.isRunning,
    isSaving: state.isSaving,
    currentTitle: state.currentScriptTitle,
    needToSave: state.needToSave,
  };
};

const mapDispatchToProps = (dispatch: Dispatch, ownProps: Object): Object => {
  return {
    onScriptSave: (): void => {
      dispatch(saveScript());
    },
    onScriptPreview: (): void => {
      dispatch(previewScript());
    },
    onScriptSchedule: (): void => {
      dispatch(showScheduleDialog());
    },
    onScriptHistory: (): void => {
      dispatch(showRunHistoryModal());
    },
    onScriptTitleChange: (event: SyntheticEvent) => {
      // FLOW_UNSAFE accessing DOM element
      dispatch(changeScriptTitle(event.target.value));
    },
    onScriptIconClick: () => {
      document.getElementById('script_name').focus();
    },
  };
};

const TypeFastToolbarContainer = connect(mapStateToProps, mapDispatchToProps)(TypeFastToolbar);

export default TypeFastToolbarContainer;
