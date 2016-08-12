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

import {
  FETCHING_SCRIPTS_REQUEST, FETCHING_SCRIPTS_SUCCESS,
  SAVE_SCRIPT_REQUEST, SAVE_SCRIPT_SUCCESS,
  SCRIPT_CODE_CHANGED, SCRIPT_TITLE_CHANGED,
  OPTIMISATIONS_COMPLETE,
  PREVIEW_SCRIPT_REQUEST, PREVIEW_SCRIPT_SUCCESS,
  UI_CHANGE,
  LOAD_SCRIPT,
  SHOW_SCHEDULE_MODAL, HIDE_SCHEDULE_MODAL,
  SHOW_SCHEDULE_SELECTOR, HIDE_SCHEDULE_SELECTOR,
  SCRIPT_LIST_CLICKED,
  SCHEDULE_STATE_CHANGED, SCHEDULE_START_TIME_CHANGED,
  SCHEDULE_INTERVAL_CHANGED,
  FACEBOOK_AUTH_STARTED, FACEBOOK_AUTH_SUCCESS, FACEBOOK_AUTH_FAILURE,
  UNAUTHORISED,
  FETCHING_SCHEDULES_SUCCESS,
  LOAD_SCHEDULE, SAVE_SCHEDULE_SUCCESS
} from '../actions/actions.js';
import { ScheduleRecurence } from '../constants/constants';

function initalLog() {
  return [{
    message:   `Ctrl-N - Auto Complete word
    Ctrl-I - Show Type
    Ctrl-O - Show Docs
    Alt-.  - Jump To Definition,
    Alt-,  - Jump Back
    Ctrl-Q - Rename
    Ctrl-. - Select Name`
  }];
}

function defaultScript() {
  return {
    title: 'A Untitled Masterwork',
    optimisations: [],
    code:
`/*jshint esversion: 6 */
//
// Welcome to TypeFast!
//
// adaccount is the global varaiable for scripting with.
// See the following example of how this works

adaccount.getcustomaudiences().forEach(
    ca => console.log(ca.id + ': ' + ca.name)
);`,
  };
}
function defaultSchedule() {
  return {
    is_paused: false,
    recurrence: ScheduleRecurence.HOURLY,
    start_time: new Date(Date.now()).toISOString(),
  };
}

function typefastApp(state = {
  currentRoutineId: null,
  scriptListOpen: false,
  isSaving: false,
  isFetching: false,
  scripts: [],
  schedules: [],
  log: initalLog(),
  runHistory: {},
  currentPane: 'editor',
  showScheduleSelector: false,
  showScheduleModal: false,
  needToSave: true,
  currentScript: defaultScript(),
  currentTitle: defaultScript().title,
  currentSchedule: defaultSchedule(),
  scheduleState: defaultSchedule().is_paused,
  scheduleInterval: defaultSchedule().recurrence,
  scheduleStartTime: defaultSchedule().start_time,
  accessToken: null,
  isAuthenticated: false,
  isAuthenticating: false
}, action) {
  let needToSave;
  switch (action.type) {

    case LOAD_SCRIPT:
      let scriptToLoad = defaultScript();
      if (action.payload.id !== 'new') {
        scriptToLoad = state.scripts[action.payload.id];
      }
      return Object.assign({}, state, {
        currentScript: scriptToLoad,
        editorValue: scriptToLoad.code,
        optimisations: scriptToLoad.optimisations,
        currentTitle: scriptToLoad.title,
        log: initalLog(),
      });

    case LOAD_SCHEDULE:
      let scheduleToLoad = defaultSchedule();
      if (action.payload.scriptId !== 'new') {
        scheduleToLoad = state.schedules[action.payload.scriptId];
      }
      return Object.assign({}, state, {
        currentSchedule: scheduleToLoad,
        scheduleState: scheduleToLoad.is_paused,
        scheduleInterval: scheduleToLoad.recurrence,
        scheduleStartTime: scheduleToLoad.start_time,
      });

    case UNAUTHORISED:
      return Object.assign({}, state, {
        isAuthorised: false,
      });

    case UI_CHANGE:
      return Object.assign({}, state, {
        currentPane: action.ui.selectedPane,
      });

    case SAVE_SCRIPT_REQUEST:
      return Object.assign({}, state, {
        isSaving: true,
      });
    case SAVE_SCRIPT_SUCCESS:
      let script = {};

      script[action.payload.script.id] = action.payload.script;
      const updatedScripts = Object.assign({}, state.scripts, script);
      return Object.assign({}, state, {
        isSaving: false,
        currentScript: action.payload.script,
        scripts: updatedScripts,
        scriptCount: Object.keys(updatedScripts).length,
        needToSave: false,
      });

    case SAVE_SCHEDULE_SUCCESS:
      let schedule = {};

      schedule[action.payload.schedule.script_id] = action.payload.schedule;
      const updatedSchedules = Object.assign({}, state.schedules, schedule);
      return Object.assign({}, state, {
        currentSchedule: action.payload.schedule,
        schedules: updatedSchedules,
      });

    case SHOW_SCHEDULE_MODAL:
      return Object.assign({}, state, {
        showScheduleModal: true,
      });

    case HIDE_SCHEDULE_MODAL:
      return Object.assign({}, state, {
        showScheduleModal: false,
      });

    case SCHEDULE_STATE_CHANGED:
      return Object.assign({}, state, {
        scheduleState: action.payload.scheduleState
      });

    case SCHEDULE_INTERVAL_CHANGED:
      return Object.assign({}, state, {
        scheduleInterval: action.payload.scheduleInterval
      });

    case SCHEDULE_START_TIME_CHANGED:
      return Object.assign({}, state, {
        scheduleStartTime: action.payload.scheduleStartTime
      });

    case SHOW_SCHEDULE_SELECTOR:
      return Object.assign({}, state, {
        showScheduleSelector: true,
      });

    case HIDE_SCHEDULE_SELECTOR:
      return Object.assign({}, state, {
        showScheduleSelector: false,
      });

    case FACEBOOK_AUTH_SUCCESS:
      return Object.assign({}, state, {
        isAuthenticated: true,
        isAuthenticating: false,
        accessToken: action.payload.accessToken
      });

    case FACEBOOK_AUTH_FAILURE:
      return Object.assign({}, state, {
        isAuthenticated: false,
        isAuthenticating: false
      });

    case FACEBOOK_AUTH_STARTED:
      return Object.assign({}, state, {
        isAuthenticated: false,
        isAuthenticating: true
      });

    case FETCHING_SCRIPTS_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
      });

    case FETCHING_SCRIPTS_SUCCESS:
      let firstScript = defaultScript();
      let scripts = action.payload.scripts.data;
      if (!state.currentScript.id && scripts.length > 0) {
        firstScript = scripts[0];
      }

      scripts = scripts.reduce(
        (o, v, i) => { o[v.id] = v; return o; },
        {}
      );
      return Object.assign({}, state, {
        isFetching: false,
        scripts: scripts,
        currentScript: firstScript,
        currentTitle: firstScript.title,
        scriptCount: Object.keys(scripts).length
      });

    case FETCHING_SCHEDULES_SUCCESS:
      const schedules = action.payload.schedules.data.reduce(
        (o, v, i) => { o[v.script_id] = v; return o; },
        {}
      );

      let newState = {
        schedules: schedules
      };

      if (state.currentScript.id && schedules[state.currentScript.id]) {
        const schedule = schedules[state.currentScript.id];
        newState.currentSchedule = schedule;
        newState.scheduleStartTime = new Date(schedule.start_time).getTime();
        newState.scheduleInterval = schedule.recurrence;
        newState.scheduleState = schedule.is_paused;
      }
      return Object.assign({}, state, newState);

    case PREVIEW_SCRIPT_SUCCESS:
      return Object.assign({}, state, {
        log: action.payload.log
      });
    case PREVIEW_SCRIPT_REQUEST:
      return Object.assign({}, state, {
        log: [{
          message: 'Processing your script...',
        }]
      });

    case SCRIPT_TITLE_CHANGED:
      needToSave = !(state.currentScript.id
        && (state.currentScript.title == action.payload.title));

      return Object.assign({}, state, {
        currentTitle: action.payload.title,
        needToSave: needToSave
      });

    case SCRIPT_CODE_CHANGED:
      needToSave = !(state.currentScript.id
        && (state.currentScript.code == action.payload.code));

      return Object.assign({}, state, {
        editorValue: action.payload.code,
        needToSave: needToSave,
      });

    case SCRIPT_LIST_CLICKED:
      return Object.assign({}, state, {
        scriptListOpen: !state.scriptListOpen,
      });

    case OPTIMISATIONS_COMPLETE: {
      return Object.assign({}, state, {
        optimisations: action.payload.optimisations
      });
    }

    default:
      return state;
  }
}


module.exports = typefastApp;
