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
  UI_CHANGE,
  LOAD_SCRIPT,
  FACEBOOK_AUTH_STARTED, FACEBOOK_AUTH_SUCCESS, FACEBOOK_AUTH_FAILURE,
  UNAUTHORISED,
  FETCH_SCHEDULE_SUCCESS,
  SAVE_SCHEDULE_SUCCESS,
  FETCHING_ROUTINES_SUCCESS,

  FETCH_ADACCOUNTS,
  SELECT_ADACCOUNT,

  SHOW_OPEN_SCRIPT_DIALOG,
  HIDE_OPEN_SCRIPT_DIALOG,

  SHOW_RUN_HISTORY_MODAL,
  HIDE_RUN_HISTORY_MODAL,

  SHOW_SAMPLES_MODAL,
  HIDE_SAMPLES_MODAL,
  FETCH_SAMPLES,
  SELECT_SAMPLE,

  SHOW_HELP_MODAL,
  HIDE_HELP_MODAL,

  SHOW_NEW_SCRIPT_DIALOG,
  HIDE_NEW_SCRIPT_DIALOG,
  SET_NEW_SCRIPT_TYPE,
  SET_NEW_SCRIPT_NAME,
  SET_NEW_SCRIPT_SAMPLE,
  NEW_SCRIPT_REQUEST,

  SHOW_SCHEDULE_DIALOG,
  HIDE_SCHEDULE_DIALOG,
  SET_NEW_SCHEDULE_DATE,
  SET_NEW_SCHEDULE_TIME,
  SET_NEW_SCHEDULE_RUN,
  SET_NEW_SCHEDULE_ENABLED,
  NEW_SCHEDULE_REQUEST,

  SHOW_POPOVER,
  HIDE_POPOVER
} from '../actions/actions.js';
import { ScheduleRecurence } from '../constants/constants';

function defaultScript() {
  return {
    title: 'Untitled',
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

function defaultAdaccount() {
  return {
    name: 'Select ad account'
  }
}

function initialLog() {
  return [];
}

function defaultNewScript() {
  return {
    script: defaultScript(),
    type: 'sample',
    sampleId: 0
  };
}

function typefastApp(state = {
  currentRoutineId: null,
  scriptListOpen: false,
  isSaving: false,
  isFetching: false,
  scripts: [],
  schedules: [],
  routines: [],
  log: initialLog(),
  runHistory: {},
  currentPane: 'editor',
  showScheduleSelector: false,

  needToSave: true,
  currentScript: defaultScript(),
  currentSchedule: defaultSchedule(),
  accessToken: null,
  isAuthenticated: false,
  isAuthenticating: false,

  adaccounts: [],
  currentAdaccount: defaultAdaccount(),
  samples: [],
  showHelpModal: false,
  showRunHistoryModal: false,
  showOpenScriptDialog: false,
  showSamplesModal: false,
  showNewScriptDialog: false,
  showScheduleDialog: false,
  newScript: defaultNewScript(),
  newSchedule: {},
  showPopover: false,
  popover: null
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
        log: initialLog(),
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
        scripts: scripts,
        currentScript: defaultScript(),
        scriptCount: Object.keys(scripts).length
      });

    case FETCH_SCHEDULE_SUCCESS:
      let newSchedule = defaultSchedule();
      if (action.payload.schedule.length > 0) {
        newSchedule = action.payload.schedule[0]
      }
      return Object.assign({}, state, {
        currentSchedule: newSchedule
      });

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

    case FETCH_ADACCOUNTS: {
      return Object.assign({}, state, {
        adaccounts: [
          {
            id: 'act_1',
            name: 'Account 1'
          },
          {
            id: 'act_2',
            name: 'Account 2'
          },
          {
            id: 'act_3',
            name: 'Account 3'
          },
        ]
      });
    }

    case SELECT_ADACCOUNT: {
      if (state.adaccounts[action.payload.adaccountId] === undefined) {
        console.log('Ad account id not found ' + action.payload.adaccountId);
        return state;
      }

      return Object.assign({}, state, {
        currentAdaccount: state.adaccounts[action.payload.adaccountId],
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

    case SHOW_SAMPLES_MODAL: {
      return Object.assign({}, state, {
        showSamplesModal: true,
      });
    }

    case HIDE_SAMPLES_MODAL: {
      return Object.assign({}, state, {
        showSamplesModal: false,
      });
    }

    case FETCH_SAMPLES: {
      return Object.assign({}, state, {
        samples: [
          {
            id: 1,
            name: 'Sample 1',
            code: `
console.log("1");
console.log("1");
`
          },
          {
            id: 2,
            name: 'Sample 2',
            code: 'console.log("2");'
          },
          {
            id: 3,
            name: 'Sample 3',
            code: 'console.log("3");'
          },
          {
            id: 4,
            name: 'Sample 4',
            code: 'console.log("4");'
          },
          {
            id: 5,
            name: 'Sample 5',
            code: 'console.log("5");'
          },
          {
            id: 6,
            name: 'Sample 6',
            code: 'console.log("6");'
          },
          {
            id: 7,
            name: 'Sample 7',
            code: 'console.log("7");'
          },
          {
            id: 8,
            name: 'Sample 8',
            code: 'console.log("8");'
          }
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
        showNewScriptDialog: true,
        newScript: defaultNewScript(),
      });
    }

    case HIDE_NEW_SCRIPT_DIALOG: {
      return Object.assign({}, state, {
        showNewScriptDialog: false,
      });
    }

    case SHOW_SCHEDULE_DIALOG: {
      let currentSchedule = state.currentSchedule;
      if (!currentSchedule.id) currentSchedule = defaultSchedule();
      return Object.assign({}, state, {
        showScheduleDialog: true,
        newSchedule: Object.assign({}, currentSchedule, {
          enabled: !currentSchedule.is_paused,
          date: new Date(currentSchedule.start_time),
          time: new Date(currentSchedule.start_time),
        })
      });
    }

    case HIDE_SCHEDULE_DIALOG: {
      return Object.assign({}, state, {
        showScheduleDialog: false,
      });
    }

    case SET_NEW_SCRIPT_TYPE: {
      return Object.assign({}, state, {
        newScript: Object.assign({}, state.newScript, {
          type: action.payload.scriptType,
        })}
      );
    }

    case SET_NEW_SCRIPT_NAME: {
      return Object.assign({}, state, {
        newScript: Object.assign({}, state.newScript, {
          script: Object.assign({}, state.newScript.script, {
            title: action.payload.scriptName
          })
        })
      });
    }

    case SET_NEW_SCRIPT_SAMPLE: {
      return Object.assign({}, state, {
        newScript: Object.assign({}, state.newScript, {
          sampleId: action.payload.scriptSample
        })}
      );
    }

    case NEW_SCRIPT_REQUEST: {
      let currentScript = state.newScript.script;
      if (state.newScript.type === 'sample') {
        currentScript.code = state.samples[state.newScript.sampleId].code;
      }
      return Object.assign({}, state, {
        currentScript: currentScript,
        editorValue: currentScript.code,
        optimisations: currentScript.optimisations,
      });
    }

    case SET_NEW_SCHEDULE_ENABLED: {
      return Object.assign({}, state, {
        newSchedule: Object.assign({}, state.newSchedule, {
          enabled: action.payload.scheduleEnabled
        })
      });
    }

    case SET_NEW_SCHEDULE_RUN: {
      return Object.assign({}, state, {
        newSchedule: Object.assign({}, state.newSchedule, {
          recurrence: action.payload.scheduleRun
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

    case NEW_SCHEDULE_REQUEST: {
      const startTime = new Date();
      startTime.setMinutes(state.newSchedule.time.getMinutes());
      startTime.setHours(state.newSchedule.time.getHours());
      startTime.setDate(state.newSchedule.date.getDate());
      startTime.setMonth(state.newSchedule.date.getMonth());
      startTime.setFullYear(state.newSchedule.date.getFullYear());
      return Object.assign({}, state, {
        currentSchedule: Object.assign({}, state.currentSchedule, {
          is_paused: !state.newSchedule.enabled,
          recurrence: state.newSchedule.recurrence,
          start_time: startTime.toISOString()
        })
      });
    }

    case SHOW_POPOVER: {
      return Object.assign({}, state, {
        showPopover: true,
        popover: action.payload.element
      });
    }

    case HIDE_POPOVER: {
      return Object.assign({}, state, {
        showPopover: false
      });
    }

    default:
      return state;
  }
}

module.exports = typefastApp;
