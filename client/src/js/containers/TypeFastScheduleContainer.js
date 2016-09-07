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

import { connect } from 'react-redux';
import {
  hideScheduleDialog,
  savingScheduleRequest,
  setNewScheduleInterval,
  setNewScheduleMinute,
  setNewScheduleHour,
  setNewScheduleDay,
  setNewSchedulePaused
} from '../actions/actions.js';
import TypeFastScheduleDialog from '../components/TypeFastScheduleDialog';

const mapStateToProps = (state, ownProps) => {
  return {
    isShowing: state.showScheduleDialog,
    schedule: state.newSchedule
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onHide: () => {
      dispatch(hideScheduleDialog());
    },
    onEnabledChange: (e) => {
      dispatch(setNewSchedulePaused(!e.target.checked));
    },
    onIntervalChange: (e, i, v) => {
      dispatch(setNewScheduleInterval(v));
    },
    onMinuteChange: (e, v) => {
      dispatch(setNewScheduleMinute(v));
    },
    onHourChange: (e, v) => {
      dispatch(setNewScheduleHour(v));
    },
    onDayChange: (e, v, t) => {
      dispatch(setNewScheduleDay(v));
    },
    onApply: () => {
      dispatch(savingScheduleRequest());
    }
  };
};

const TypeFastScheduleContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(TypeFastScheduleDialog);

export default TypeFastScheduleContainer;
