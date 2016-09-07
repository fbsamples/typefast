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

import fetch from 'isomorphic-fetch';
import { serverConfig } from '../ServerConfig';

/******************************** COMMON **********************************/

function makeUrl(path: string, getState: Function, query: ?Object): string {
  const chunks = [];
  query = query || {};
  query.access_token = getState().accessToken;
  for (let i in query) {
    if (query.hasOwnProperty(i)) {
      chunks.push(encodeURIComponent(i) + '=' + encodeURIComponent(query[i]));
    }
  }
  return path + (chunks.length > 0 ? '?' : '') + chunks.join('&');
}

function makeFormData(object: Object, getState: Function): FormData {
  const form = new FormData();
  form.append('access_token', getState().accessToken);
  for (let i in object) {
    const value = typeof object[i] === 'object'
      ? JSON.stringify(object[i]) : object[i];
    form.append(i, value);
  }
  return form;
}

function handleErrors(response, dispatch) {
  if (!response.ok) {
    if (response.status === 401) {
      dispatch(unauthorised());
    }
    throw Error(response.statusText);
  }
  return response;
}

function fetchData(dispatch) {
  dispatch(fetchScripts());
  dispatch(fetchRoutines());
  dispatch(fetchSamples());
}

/******************************** FETCH **********************************/

export const FETCH_SCHEDULE_REQUEST = 'FETCH_SCHEDULE_REQUEST';
export const FETCH_SCHEDULE_SUCCESS = 'FETCH_SCHEDULE_SUCCESS';
export function fetchSchedule(scriptId) {
  return function(dispatch, getState) {
    dispatch({type: FETCH_SCHEDULE_REQUEST});
    return fetch(
      makeUrl('/schedules', getState, { script_id: scriptId }), {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
      })
    .then(response => handleErrors(response, dispatch))
    .then(response => response.json())
    .then(response => dispatch({
      type: FETCH_SCHEDULE_SUCCESS,
      payload: {
        schedule: response.data
      }
    }));
  };
}

export const FETCHING_ROUTINES_REQUEST = 'FETCHING_ROUTINES_REQUEST';
export const FETCHING_ROUTINES_SUCCESS = 'FETCHING_ROUTINES_SUCCESS';
export function fetchRoutines() {
  return function(dispatch, getState) {
    dispatch({type: FETCHING_ROUTINES_REQUEST});
    return fetch(makeUrl('/routines', getState, {queue_name: 'main'}))
      .then((response) => handleErrors(response, dispatch))
      .then(function(response) {
        return response.json();
      })
      .then(function(json) {
        dispatch({
          type: FETCHING_ROUTINES_SUCCESS,
          payload: {
            routines: json
          }
        });
      });
  };
}

export const FETCHING_SCRIPTS_REQUEST = 'FETCHING_SCRIPTS_REQUEST';
export const FETCHING_SCRIPTS_SUCCESS = 'FETCHING_SCRIPTS_SUCCESS';
export function fetchScripts() {
  return function(dispatch, getState) {
    dispatch({type: FETCHING_SCRIPTS_REQUEST});
    return fetch(makeUrl('/scripts', getState))
      .then((response) => handleErrors(response, dispatch))
      .then(function(response) {
        return response.json();
      })
      .then(function(json) {
        return dispatch({
          type: FETCHING_SCRIPTS_SUCCESS,
          payload: {
            scripts: json
          }
        });
      })
      .then(function(json) {
        if (json.payload.scripts.data.length > 0) {
          dispatch(loadScript(json.payload.scripts.data[0].id));
        }
      });
  };
}

/******************************** AUTH **********************************/

export const UNAUTHORISED = 'UNAUTHORISED';
export function unauthorised() {
  return {
    type: UNAUTHORISED
  };
}

export const FACEBOOK_AUTH_STARTED = 'FACEBOOK_AUTH_STARTED';
export function facebookAuthStarted() {
  return {
    type: FACEBOOK_AUTH_STARTED
  };
}

export const FACEBOOK_AUTH_SUCCESS = 'FACEBOOK_AUTH_SUCCESS';
export function facebookAuthSuccess(token) {
  return function(dispatch) {
    dispatch({
      type: FACEBOOK_AUTH_SUCCESS,
      payload: {
        accessToken: token
      }
    });
    fetchData(dispatch);
  };
}

export const FACEBOOK_AUTH_FAILURE = 'FACEBOOK_AUTH_FAILURE';
export function facebookAuthFailure() {
  return {
    type: FACEBOOK_AUTH_FAILURE
  };
}

/******************************** OPEN SCRIPT *********************************/

export const SHOW_OPEN_SCRIPT_DIALOG = 'SHOW_OPEN_SCRIPT_DIALOG';
export function showOpenScriptDialog() {
  return {
    type: SHOW_OPEN_SCRIPT_DIALOG
  };
}

export const HIDE_OPEN_SCRIPT_DIALOG = 'HIDE_OPEN_SCRIPT_DIALOG';
export function hideOpenScriptDialog() {
  return {
    type: HIDE_OPEN_SCRIPT_DIALOG
  };
}

/******************************** HISTORY **********************************/

export const SHOW_RUN_HISTORY_MODAL = 'SHOW_RUN_HISTORY_MODAL';
export function showRunHistoryModal() {
  return {
    type: SHOW_RUN_HISTORY_MODAL
  };
}

export const HIDE_RUN_HISTORY_MODAL = 'HIDE_RUN_HISTORY_MODAL';
export function hideRunHistoryModal() {
  return {
    type: HIDE_RUN_HISTORY_MODAL
  };
}

/******************************** SAMPLES **********************************/

export const FETCH_SAMPLES = 'FETCH_SAMPLES';
export function fetchSamples() {
  return {
    type: FETCH_SAMPLES
  };
}

/******************************** HELP **********************************/

export const SHOW_HELP_MODAL = 'SHOW_HELP_MODAL';
export function showHelpModal() {
  return {
    type: SHOW_HELP_MODAL
  };
}

export const HIDE_HELP_MODAL = 'HIDE_HELP_MODAL';
export function hideHelpModal() {
  return {
    type: HIDE_HELP_MODAL
  };
}

/******************************** NEW SCRIPT **********************************/

export const SHOW_NEW_SCRIPT_DIALOG = 'SHOW_NEW_SCRIPT_DIALOG';
export function showNewScriptDialog() {
  return {
    type: SHOW_NEW_SCRIPT_DIALOG
  };
}

export const HIDE_NEW_SCRIPT_DIALOG = 'HIDE_NEW_SCRIPT_DIALOG';
export function hideNewScriptDialog() {
  return {
    type: HIDE_NEW_SCRIPT_DIALOG
  };
}

export const LOAD_SAMPLE = 'LOAD_SAMPLE';
export function loadSample(sampleId) {
  return {
    type: LOAD_SAMPLE,
    payload: {
      sampleId: sampleId
    }
  };
}

/******************************** SCRIPT **********************************/

export const CHANGE_SCRIPT_TITLE = 'CHANGE_SCRIPT_TITLE';
export function changeScriptTitle(title) {
  return {
    type: CHANGE_SCRIPT_TITLE,
    payload: {
      title: title
    }
  };
}

export const LOAD_SCRIPT = 'LOAD_SCRIPT';
export function loadScript(id, loadSchedule = true) {
  return function(dispatch) {
    dispatch({
      type: LOAD_SCRIPT,
      payload: {
        id: id,
      }
    });
    if (loadSchedule) {
      dispatch(fetchSchedule(id));
    }
  };
}

export function previewScript() {
  return function(dispatch, getState) {
    dispatch({type: PREVIEW_SCRIPT_REQUEST});
    return fetch(makeUrl('/schedules', getState), {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
      },
      body: makeFormData({
        queue_name: 'preview',
        script_id: getState().currentScript.id,
      }, getState)
    })
    .then((response) => handleErrors(response, dispatch))
    .then(response => response.json())
    .then(response => {
      const query = {
        queue_name: 'preview',
        schedule_id: response.id,
      };
      return fetch(makeUrl('/routines', getState, query), {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
      })
      .then(response => handleErrors(response, dispatch))
      .then(response => response.json())
      .then(response => pollRoutine(response.data[0].id, dispatch, getState));
    });
  };
}

export const PREVIEW_SCRIPT_REQUEST = 'PREVIEW_SCRIPT_REQUEST';
export const PREVIEW_SCRIPT_SUCCESS = 'PREVIEW_SCRIPT_SUCCESS';
function pollRoutine(routineId, dispatch, getState) {
  fetch(makeUrl('/routines/' + routineId, getState))
  .then((response) => handleErrors(response, dispatch))
  .then(function(response) {
    return response.json();
  })
  .then(function(response) {
    let message = response.runner_log.map(a => a.chunk).join('\n');
    dispatch({
      type: PREVIEW_SCRIPT_SUCCESS,
      payload: {
        log: [{message: message}],
        is_completed: response.is_completed
      }
    });
    if (!response.is_completed) {
      setTimeout(function() {
        pollRoutine(routineId, dispatch, getState);
      }, 1000);
    }
  });
}

export const SAVE_SCRIPT_REQUEST = 'SAVE_SCRIPT_REQUEST';
export const SAVE_SCRIPT_SUCCESS = 'SAVE_SCRIPT_SUCCESS';
export function saveScript(loadSchedule = true) {
  return function(dispatch, getState) {
    dispatch({type: SAVE_SCRIPT_REQUEST});
    const currentScript = getState().currentScript;
    const id = currentScript.id || '';
    return fetch('/scripts/' + id, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
      },
      body: makeFormData({
        code: getState().editorValue,
        optimisations: getState().optimisations,
        title: getState().currentScriptTitle,
      }, getState)
    })
    .then(response => handleErrors(response, dispatch))
    .then(response => response.json())
    .then(response => dispatch({
      type: SAVE_SCRIPT_SUCCESS,
      payload: {
        script: response
      }
    }))
    .then(response => dispatch(loadScript(response.payload.script.id, loadSchedule)));
  };
}

/******************************** SCHEDULE **********************************/

export const SHOW_SCHEDULE_DIALOG = 'SHOW_SCHEDULE_DIALOG';
export function showScheduleDialog() {
  return {
    type: SHOW_SCHEDULE_DIALOG
  };
}

export const HIDE_SCHEDULE_DIALOG = 'HIDE_SCHEDULE_DIALOG';
export function hideScheduleDialog() {
  return {
    type: HIDE_SCHEDULE_DIALOG
  };
}

export const SET_NEW_SCHEDULE_PAUSED = 'SET_NEW_SCHEDULE_PAUSED';
export function setNewSchedulePaused(schedulePaused) {
  return {
    type: SET_NEW_SCHEDULE_PAUSED,
    payload: {
      schedulePaused: schedulePaused
    }
  };
}

export const SET_NEW_SCHEDULE_DATE = 'SET_NEW_SCHEDULE_DATE';
export function setNewScheduleDate(scheduleDate) {
  return {
    type: SET_NEW_SCHEDULE_DATE,
    payload: {
      scheduleDate: scheduleDate
    }
  };
}

export const SET_NEW_SCHEDULE_TIME = 'SET_NEW_SCHEDULE_TIME';
export function setNewScheduleTime(scheduleTime) {
  return {
    type: SET_NEW_SCHEDULE_TIME,
    payload: {
      scheduleTime: scheduleTime
    }
  };
}

export const SET_NEW_SCHEDULE_INTERVAL = 'SET_NEW_SCHEDULE_INTERVAL';
export function setNewScheduleInterval(scheduleInterval) {
  return {
    type: SET_NEW_SCHEDULE_INTERVAL,
    payload: {
      scheduleInterval: scheduleInterval
    }
  };
}

export const SET_NEW_SCHEDULE_DAY = 'SET_NEW_SCHEDULE_DAY';
export function setNewScheduleDay(scheduleDay) {
  return {
    type: SET_NEW_SCHEDULE_DAY,
    payload: {
      scheduleDay: scheduleDay
    }
  };
}

export const NEW_SCHEDULE_REQUEST = 'NEW_SCHEDULE_REQUEST';
export function savingScheduleRequest() {
  return function(dispatch) {
    dispatch({type: NEW_SCHEDULE_REQUEST});
    dispatch(saveSchedule());
  };
}

export const SAVE_SCHEDULE_REQUEST = 'SAVE_SCHEDULE_REQUEST';
export const SAVE_SCHEDULE_SUCCESS = 'SAVE_SCHEDULE_SUCCESS';
export function saveSchedule() {
  return function(dispatch, getState) {
    // TODO: remove flag passed to save script and chain callbacks
    // so they do not conflict with each other and execute
    // in determined order
    dispatch(saveScript(false)).then(function() {
      dispatch({type: SAVE_SCHEDULE_REQUEST});
      const currentSchedule = getState().newSchedule;
      return fetch('/schedules/', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
        },
        body: makeFormData({
          is_paused: currentSchedule.is_paused,
          queue_name: 'main',
          recurrence: currentSchedule.recurrence,
          script_id: getState().currentScript.id,
          start_time: currentSchedule.start_time,
        }, getState)
      })
      .then((response) => handleErrors(response, dispatch))
      .then(response => response.json())
      .then(function(response) {
        dispatch({
          type: SAVE_SCHEDULE_SUCCESS,
          payload: {
            schedule: response
          }
        });
        dispatch(hideScheduleDialog());
      });
    });
  };
}

/******************************** EDITOR **********************************/

export const OPTIMISATIONS_COMPLETE = 'OPTIMISATIONS_COMPLETE';
export function optimisationComplete(optimisations) {
  return {
    type: OPTIMISATIONS_COMPLETE,
    payload: {
      optimisations: optimisations
    }
  };
}

export const SCRIPT_CODE_CHANGED = 'SCRIPT_CODE_CHANGED';
export function codeChanged(code) {
  return {
    type: SCRIPT_CODE_CHANGED,
    payload: {
      code: code
    }
  };
}
