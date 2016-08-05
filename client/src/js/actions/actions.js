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
    form.append(i, object[i]);
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

export const UNAUTHORISED = 'UNAUTHORISED';
export function unauthorised() {
  return {
    type: UNAUTHORISED
  };
}

export const LOAD_SCRIPT = 'LOAD_SCRIPT';
export function loadScript(id) {
  return {
    type: LOAD_SCRIPT,
    payload: {
      id: id
    }
  };
}

export const UI_CHANGE = 'UI_CHANGE';
export function changePane(pane) {
  return {
    type: UI_CHANGE,
    ui: {
      selectedPane: pane
    }
  };
}

export const SCRIPT_LIST_CLICKED = 'SCRIPT_LIST_CLICKED';
export function toggleScriptList() {
  return {
    type: SCRIPT_LIST_CLICKED,
  };
}

export const OPTIMISATIONS_COMPLETE = 'OPTIMISATIONS_COMPLETE';
export function optimisationComplete(optimisations) {
  return {
    type: OPTIMISATIONS_COMPLETE,
    payload: {
      optimisations: optimisations
    }
  };
}

export const SCRIPT_TITLE_CHANGED = 'SCRIPT_TITLE_CHANGED';
export function scriptTitleChanged(title) {
  return {
    type: SCRIPT_TITLE_CHANGED,
    payload: {
      title: title
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

export const SCHEDULE_STATE_CHANGED = 'SCHEDULE_STATE_CHANGED';
export function scheduleStateChanged(state) {
  return {
    type: SCHEDULE_STATE_CHANGED,
    payload: {
      scheduleState: state
    }
  };
}

export const SCHEDULE_START_TIME_CHANGED = 'SCHEDULE_START_TIME_CHANGED';
export function scheduleStartTimeChanged(startTime) {
  return {
    type: SCHEDULE_START_TIME_CHANGED,
    payload: {
      scheduleStartTime: startTime
    }
  };
}

export const SCHEDULE_INTERVAL_CHANGED = 'SCHEDULE_INTERVAL_CHANGED';
export function scheduleIntervalChanged(interval) {
  return {
    type: SCHEDULE_INTERVAL_CHANGED,
    payload: {
      scheduleInterval: interval
    }
  };
}

export const SCHEDULE_SAVE = 'SCHEDULE_SAVE';
export function saveSchedule() {
  return function(dispatch, getState) {
    dispatch({type: SCHEDULE_SAVE});
    dispatch(saveScript());
    dispatch(hideScheduleModal());
  };
}

export const SAVE_SCRIPT_REQUEST = 'SAVE_SCRIPT_REQUEST';
export const SAVE_SCRIPT_SUCCESS = 'SAVE_SCRIPT_SUCCESS';
export const SAVE_SCRIPT_FAILURE = 'SAVE_SCRIPT_FAILURE';

export function saveScript() {
  return function(dispatch, getState) {
    dispatch({type: SAVE_SCRIPT_REQUEST});
    const currentScript = getState().currentScript;
    const id = currentScript ? currentScript.id : '';
    return fetch('/scripts/' + id, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: makeFormData({
        code: getState().editorValue,
        optimisations: getState().optimisations,
        title: getState().currentTitle,
        scheulde: {
          state: getState().scheduleState,
          startTime: getState().scheduleStartTime,
          interval: getState().scheduleInterval,
        }
      }, getState)
    })
    .then((response) => handleErrors(response, dispatch))
    .then(function(response) {
      return response.json();
    })
    .then(function(response) {
      dispatch({
        type: SAVE_SCRIPT_SUCCESS,
        payload: {
          script: response
        }
      });
    });
  };
}

export const PREVIEW_SCRIPT_CLICKED = 'PREVIEW_SCRIPT';

export const PREVIEW_SCRIPT_REQUEST = 'PREVIEW_SCRIPT_REQUEST';
export const PREVIEW_SCRIPT_CREATED = 'PREVIEW_SCRIPT_SUCCESS';
export const PREVIEW_SCRIPT_SUCCESS = 'PREVIEW_SCRIPT_SUCCESS';
export const PREVIEW_SCRIPT_FAILURE = 'PREVIEW_SCRIPT_FAILURE';

function pollRoutine(routineId, dispatch, getState) {
  fetch(makeUrl('/routines/' + routineId, getState))
  .then((response) => handleErrors(response, dispatch))
  .then(function(response) {
    return response.json();
  })
  .then(function(response) {
    // this is hideous, fix it
    if (response.is_completed) {
      let message
        = response.runner_log.map(function(a) { return a.chunk; }).join('\n');
      dispatch({
        type: PREVIEW_SCRIPT_SUCCESS,
        payload: {
          log: [{message: message}]
        }
      });
    } else {
      setTimeout(function() {
        pollRoutine(routineId, dispatch, getState);
      }, 1000);
    }
  });
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
        queue_name: 'preview_queue',
        script_id: getState().currentScript.id,
      }, getState)
    })
    .then((response) => handleErrors(response, dispatch))
    .then(response => response.json())
    .then(response => {
      const query = {
        queue_name: 'preview_queue',
        schedule_id: response.id,
      };
      return fetch(makeUrl('/routines', getState, query), {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
      })
      .then((response) => handleErrors(response, dispatch))
      .then(response => response.json())
      .then(response => pollRoutine(response.data[0].id, dispatch, getState));
    });
  };
}

export const FETCHING_SCRIPT_LOGS_REQUEST = 'FETCHING_SCRIPT_LOGS_REQUEST';
export const FETCHING_SCRIPT_LOGS_SUCCESS = 'FETCHING_SCRIPT_LOGS_SUCCESS';
export const FETCHING_SCRIPT_LOGS_FAILURE = 'FETCHING_SCRIPT_LOGS_FAILURE';

export function fetchScriptLogs(id) {
  return function(dispatch, getState) {
    dispatch({type: FETCHING_SCRIPT_LOGS_REQUEST});
    return fetch(makeUrl(`/scripts/${id}/logs`, getState))
      .then((response) => handleErrors(response, dispatch))
      .then(function(response) {
        return response.json();
      })
      .then(function(json) {
        dispatch({
          type: FETCHING_SCRIPT_LOGS_SUCCESS,
          payload: {
            scriptLogs: json
          }
        });
      });
  };
}

export const FETCHING_SCRIPTS_REQUEST = 'FETCHING_SCRIPTS_REQUEST';
export const FETCHING_SCRIPTS_SUCCESS = 'FETCHING_SCRIPTS_SUCCESS';
export const FETCHING_SCRIPTS_FAILURE = 'FETCHING_SCRIPTS_FAILURE';

export function fetchScripts() {
  return function(dispatch, getState) {
    dispatch({type: FETCHING_SCRIPTS_REQUEST});
    return fetch(makeUrl('/scripts', getState))
      .then((response) => handleErrors(response, dispatch))
      .then(function(response) {
        return response.json();
      })
      .then(function(json) {
        dispatch({
          type: FETCHING_SCRIPTS_SUCCESS,
          payload: {
            scripts: json
          }
        });
      });
  };
}

export const HIDE_SCHEDULE_MODAL = 'HIDE_SCHEDULE_MODAL';
export function hideScheduleModal() {
  return {
    type: HIDE_SCHEDULE_MODAL
  };
}

export const SHOW_SCHEDULE_MODAL = 'SHOW_SCHEDULE_MODAL';
export function showScheduleModal() {
  return {
    type: SHOW_SCHEDULE_MODAL
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
        accessToken: token,
      }
    });
    dispatch(fetchScripts());
  };
}

export const FACEBOOK_AUTH_FAILURE = 'FACEBOOK_AUTH_FAILURE';
export function facebookAuthFailure() {
  return {
    type: FACEBOOK_AUTH_FAILURE
  };
}
