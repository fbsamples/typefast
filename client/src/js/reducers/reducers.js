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
  SCHEDULE_INTERVAL_CHANGED
} from '../actions/actions.js';

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


function typefastApp(state = {
  currentRoutineId: null,
  scriptListOpen: false,
  isSaving: false,
  isFetching: false,
  scripts: [],
  log: initalLog(),
  currentPane: 'editor',
  showScheduleSelector: false,
  showScheduleModal: false,
  needToSave: true,
  currentTitle: 'A Untitled Masterwork',
  scheduleState: false,
  scheduleInterval: 'daily',
  scheduleStartTime: Date.now()
}, action) {
  let needToSave;
  switch (action.type) {
    case LOAD_SCRIPT:
      let scriptToLoad;
      if (action.payload.id === 'new') {
        scriptToLoad = null;
      } else {
        scriptToLoad = state.scripts[action.payload.id];
      }
      return Object.assign({}, state, {
        currentScript: scriptToLoad,
        currentTitle: scriptToLoad.title,
        editorValue: scriptToLoad.code,
        optimisations: scriptToLoad.optimisations,
        log: initalLog(),
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

    case FETCHING_SCRIPTS_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
      });
    case FETCHING_SCRIPTS_SUCCESS:
      let firstScript;
      if (!state.currentScript) {
        firstScript = action.payload.scripts.data[0];
      }

      const scripts = action.payload.scripts.data.reduce(
        (o, v, i) => { o[v.id] = v; return o; },
        {}
      );
      return Object.assign({}, state, {
        isFetching: false,
        scripts: scripts,
        currentScript: firstScript,
        scriptCount: Object.keys(scripts).length
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

    case SCRIPT_TITLE_CHANGED:
      needToSave = !(state.currentScript
      && (state.currentScript.title == action.payload.title));

      return Object.assign({}, state, {
        currentTitle: action.payload.title,
        needToSave: needToSave
      });

    case SCRIPT_CODE_CHANGED:
      needToSave = !(state.currentScript
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
