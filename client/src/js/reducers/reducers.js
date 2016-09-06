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
  SCRIPT_CODE_CHANGED,
  OPTIMISATIONS_COMPLETE,
  PREVIEW_SCRIPT_REQUEST, PREVIEW_SCRIPT_SUCCESS,
  LOAD_SCRIPT,
  FACEBOOK_AUTH_STARTED, FACEBOOK_AUTH_SUCCESS, FACEBOOK_AUTH_FAILURE,
  UNAUTHORISED,
  FETCH_SCHEDULE_SUCCESS,
  SAVE_SCHEDULE_SUCCESS,
  FETCHING_ROUTINES_SUCCESS,

  SHOW_OPEN_SCRIPT_DIALOG,
  HIDE_OPEN_SCRIPT_DIALOG,

  SHOW_RUN_HISTORY_MODAL,
  HIDE_RUN_HISTORY_MODAL,

  FETCH_SAMPLES,

  SHOW_HELP_MODAL,
  HIDE_HELP_MODAL,

  SHOW_NEW_SCRIPT_DIALOG,
  HIDE_NEW_SCRIPT_DIALOG,
  LOAD_SAMPLE,
  CHANGE_SCRIPT_TITLE,

  SHOW_SCHEDULE_DIALOG,
  HIDE_SCHEDULE_DIALOG,
  SET_NEW_SCHEDULE_DATE,
  SET_NEW_SCHEDULE_TIME,
  SET_NEW_SCHEDULE_INTERVAL,
  SET_NEW_SCHEDULE_DAY,
  SET_NEW_SCHEDULE_PAUSED,
  NEW_SCHEDULE_REQUEST
} from '../actions/actions.js';
import { ScheduleRecurence } from '../constants/constants';

function defaultScript() {
  return {
    title: 'Untitled',
    optimisations: [],
    code: '',
  };
}

function defaultSchedule() {
  return {
    is_paused: true,
    start_time: new Date(Date.now()).toISOString(),
    interval: 0,
    day: 1,
    recurrence: {},
    time: new Date(),
    date: new Date()
  };
}

function initialLog() {
  return [];
}

function typefastApp(state = {
  isLoading: true,
  isSaving: false,
  isFetching: false,
  isRunning: false,
  scripts: [],
  schedules: [],
  routines: [],
  log: initialLog(),
  runHistory: {},

  needToSave: true,
  currentScript: defaultScript(),
  currentScriptTitle: defaultScript().title,
  currentSchedule: defaultSchedule(),
  editorValue: defaultScript().code,
  accessToken: null,
  isAuthenticated: false,
  isAuthenticating: false,

  samples: [],
  showHelpModal: false,
  showRunHistoryModal: false,
  showOpenScriptDialog: false,
  showNewScriptDialog: false,
  showScheduleDialog: false,
  newSchedule: defaultSchedule(),

  showSaveScheduleSnack: false,
  showSaveScriptSnack: false
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
        currentScriptTitle: scriptToLoad.title,
        editorValue: scriptToLoad.code,
        optimisations: scriptToLoad.optimisations || state.optimisations || [],
        log: initialLog(),
      });

    case UNAUTHORISED:
      return Object.assign({}, state, {
        isAuthorised: false,
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
        scripts: updatedScripts,
        scriptCount: Object.keys(updatedScripts).length,
        needToSave: false,
        showSaveScriptSnack: true
      });

    case SAVE_SCHEDULE_SUCCESS:
      return Object.assign({}, state, {
        currentSchedule: state.newSchedule,
        showSaveScheduleSnack: true
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

    case FETCHING_ROUTINES_SUCCESS:
      const routines = action.payload.routines.data.reduce(
        (o, v, i) => {
          if (!o.hasOwnProperty(v.script_id)) {
            o[v.script_id] = [v];
          } else {
            o[v.script_id].push(v);
          }
          return o;
        },
        {}
      );
      return Object.assign({}, state, {
        routines: routines,
      });

    case FETCHING_SCRIPTS_SUCCESS:
      let scripts = action.payload.scripts.data;
      scripts = scripts.reduce(
        (o, v, i) => { o[v.id] = v; return o; },
        {}
      );
      return Object.assign({}, state, {
        isFetching: false,
        isLoading: false,
        scripts: scripts,
        currentScript: defaultScript(),
        currentScriptTitle: defaultScript().title,
        scriptCount: Object.keys(scripts).length
      });

    case FETCH_SCHEDULE_SUCCESS:
      let currentSchedule = defaultSchedule();
      if (action.payload.schedule.length > 0) {
        currentSchedule = Object.assign(currentSchedule, action.payload.schedule[0]);
        currentSchedule.date = new Date(currentSchedule.start_time);
        currentSchedule.time = new Date(currentSchedule.start_time);
        if (currentSchedule.recurrence) {
          if (currentSchedule.recurrence.minutes.length > 0) {
            currentSchedule.interval = ScheduleRecurence.HOURLY;
          }
          if (currentSchedule.recurrence.hours.length > 0) {
            currentSchedule.interval = ScheduleRecurence.DAILY;
          }
          if (currentSchedule.recurrence.week_days.length > 0) {
            currentSchedule.interval = ScheduleRecurence.WEEKLY;
            currentSchedule.day = currentSchedule.recurrence.week_days[0];
          }
        }
      }
      return Object.assign({}, state, {currentSchedule});

    case PREVIEW_SCRIPT_SUCCESS:
      return Object.assign({}, state, {
        log: action.payload.log,
        isRunning: !action.payload.is_completed
      });

    case PREVIEW_SCRIPT_REQUEST:
      return Object.assign({}, state, {
        log: [],
        isRunning: true
      });

    case SCRIPT_CODE_CHANGED:
      needToSave = !(state.currentScript.id
        && (state.currentScript.code == action.payload.code));
      return Object.assign({}, state, {
        editorValue: action.payload.code,
        needToSave: needToSave,
      });

    case OPTIMISATIONS_COMPLETE: {
      return Object.assign({}, state, {
        optimisations: action.payload.optimisations
      });
    }

    case SHOW_OPEN_SCRIPT_DIALOG: {
      return Object.assign({}, state, {
        showOpenScriptDialog: true,
      });
    }

    case HIDE_OPEN_SCRIPT_DIALOG: {
      return Object.assign({}, state, {
        showOpenScriptDialog: false,
      });
    }

    case SHOW_RUN_HISTORY_MODAL: {
      return Object.assign({}, state, {
        showRunHistoryModal: true,
      });
    }

    case HIDE_RUN_HISTORY_MODAL: {
      return Object.assign({}, state, {
        showRunHistoryModal: false,
      });
    }

    case FETCH_SAMPLES: {
      return Object.assign({}, state, {
        samples: [
          // TODO: add samples here
          // Format: {id, name, description, code}
          // id should be >0
        ],
      });
    }

    case SHOW_HELP_MODAL: {
      return Object.assign({}, state, {
        showHelpModal: true,
      });
    }

    case HIDE_HELP_MODAL: {
      return Object.assign({}, state, {
        showHelpModal: false,
      });
    }

    case SHOW_NEW_SCRIPT_DIALOG: {
      return Object.assign({}, state, {
        showNewScriptDialog: true
      });
    }

    case HIDE_NEW_SCRIPT_DIALOG: {
      return Object.assign({}, state, {
        showNewScriptDialog: false
      });
    }

    case SHOW_SCHEDULE_DIALOG: {
      return Object.assign({}, state, {
        showScheduleDialog: true,
        newSchedule: state.currentSchedule
      });
    }

    case HIDE_SCHEDULE_DIALOG: {
      return Object.assign({}, state, {
        showScheduleDialog: false,
      });
    }

    case LOAD_SAMPLE: {
      let currentScript = defaultScript();
      const sample = state.samples.filter(s => s.id === action.payload.sampleId);
      if (sample.length > 0) {
        currentScript.code = sample[0].code;
      }
      return Object.assign({}, state, {
        currentScript: currentScript,
        currentScriptTitle: currentScript.title,
        editorValue: currentScript.code,
        optimisations: currentScript.optimisations,
        currentSchedule: defaultSchedule()
      });
    }

    case SET_NEW_SCHEDULE_PAUSED: {
      return Object.assign({}, state, {
        newSchedule: Object.assign({}, state.newSchedule, {
          is_paused: action.payload.schedulePaused
        })
      });
    }

    case SET_NEW_SCHEDULE_INTERVAL: {
      return Object.assign({}, state, {
        newSchedule: Object.assign({}, state.newSchedule, {
          interval: action.payload.scheduleInterval
        })
      });
    }

    case SET_NEW_SCHEDULE_TIME: {
      const time = new Date(action.payload.scheduleTime);
      return Object.assign({}, state, {
        newSchedule: Object.assign({}, state.newSchedule, {time})
      });
    }

    case SET_NEW_SCHEDULE_DATE: {
      const date = new Date(action.payload.scheduleDate);
      return Object.assign({}, state, {
        newSchedule: Object.assign({}, state.newSchedule, {date})
      });
    }

    case SET_NEW_SCHEDULE_DAY: {
      return Object.assign({}, state, {
        newSchedule: Object.assign({}, state.newSchedule, {
          day: action.payload.scheduleDay
        })
      });
    }

    case NEW_SCHEDULE_REQUEST: {
      let startTime = new Date();
      startTime.setMinutes(state.newSchedule.time.getMinutes());
      startTime.setHours(state.newSchedule.time.getHours());
      startTime.setDate(state.newSchedule.date.getDate());
      startTime.setMonth(state.newSchedule.date.getMonth());
      startTime.setFullYear(state.newSchedule.date.getFullYear());

      let recurrence = {
        minutes: [],
        hours: [],
        week_days: [],
      };
      if (state.newSchedule.interval >= ScheduleRecurence.HOURLY) {
        recurrence.minutes.push(state.newSchedule.time.getMinutes());
      }
      if (state.newSchedule.interval >= ScheduleRecurence.DAILY) {
        recurrence.hours.push(state.newSchedule.time.getHours());
      }
      if (state.newSchedule.interval >= ScheduleRecurence.WEEKLY) {
        recurrence.week_days.push(state.newSchedule.day);
      }

      return Object.assign({}, state, {
        newSchedule: Object.assign({}, state.newSchedule, {
          recurrence: recurrence,
          start_time: startTime.toISOString()
        })
      });
    }

    case CHANGE_SCRIPT_TITLE: {
      needToSave = (
        !state.currentScript.id ||
        action.payload.title !== state.currentScript.title
      );
      return Object.assign({}, state, {
        needToSave: needToSave,
        currentScriptTitle: action.payload.title
      });
    }

    default:
      return state;
  }
}

module.exports = typefastApp;
