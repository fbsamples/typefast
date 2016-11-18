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
  hideScheduleDialog,
  savingScheduleRequest,
  setNewScheduleInterval,
  setNewScheduleMinute,
  setNewScheduleHour,
  setNewScheduleDay,
  setNewSchedulePaused,
} from '../actions/actions.js';
import TypeFastScheduleDialog from '../components/TypeFastScheduleDialog';

const mapStateToProps = (state: State, ownProps: Object): Object => {
  return {
    isShowing: state.showScheduleDialog,
    schedule: state.newSchedule,
  };
};

const mapDispatchToProps = (dispatch: Dispatch, ownProps: Object): Object => {
  return {
    onHide: (): void => {
      dispatch(hideScheduleDialog());
    },
    onEnabledChange: (event: SyntheticEvent): void => {
      // FLOW_UNSAFE accessing DOM element
      dispatch(setNewSchedulePaused(!event.target.checked));
    },
    onIntervalChange: (event: SyntheticEvent, interval: number): void => {
      dispatch(setNewScheduleInterval(interval));
    },
    onMinuteChange: (proxy: SyntheticEvent, minute: number): void => {
      dispatch(setNewScheduleMinute(minute));
    },
    onHourChange: (proxy: SyntheticEvent, hour: number): void => {
      dispatch(setNewScheduleHour(hour));
    },
    onDayChange: (proxy: SyntheticEvent, day: number): void => {
      dispatch(setNewScheduleDay(day));
    },
    onApply: (): void => {
      dispatch(savingScheduleRequest());
    },
  };
};

const TypeFastScheduleContainer = connect(mapStateToProps, mapDispatchToProps)(TypeFastScheduleDialog);

export default TypeFastScheduleContainer;
