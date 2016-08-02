import {
  FETCHING_SCRIPTS_REQUEST, FETCHING_SCRIPTS_SUCCESS, FETCHING_SCRIPTS_FAILURE,
  SAVE_SCRIPT_REQUEST, SAVE_SCRIPT_SUCCESS, SAVE_SCRIPT_FAILURE,
  SCRIPT_CODE_CHANGED, SCRIPT_TITLE_CHANGED,
  OPTIMISATIONS_COMPLETE,
  PREVIEW_SCRIPT_REQUEST, PREVIEW_SCRIPT_CREATED, PREVIEW_SCRIPT_SUCCESS,
  PREVIEW_SCRIPT_FAILURE,
  UI_CHANGE,
  LOAD_SCRIPT,
  SHOW_SAVE_MODAL,HIDE_SAVE_MODAL,
  SCRIPT_LIST_CLICKED
} from '../actions/actions.js'

function initalLog() {
  return [{
    message:   `Ctrl-N - Auto Complete word
    Ctrl-I - Show Type
    Ctrl-O - Show Docs
    Alt-.  - Jump To Definition,
    Alt-,  - Jump Back
    Ctrl-Q - Rename
    Ctrl-. - Select Name`
  }]
}


function typefastApp(state = {
  currentScriptId: null,
  currentRoutineId: null,
  scriptListOpen: false,
  isSaving: false,
  isFetching: false,
  scripts: [],
  log: initalLog(),
  currentPane: 'editor',
  showScheduleModal: false,
  showSaveModal: false
}, action) {
  switch (action.type) {

    case LOAD_SCRIPT:
      let scriptToLoad;
      if (action.payload.id === 'new') {
        scriptToLoad = null
      } else {
        scriptToLoad = state.scripts[action.payload.id]
      }
      return Object.assign({}, state, {
        currentScript: scriptToLoad,
        log: initalLog(),
      })

    case UI_CHANGE:
      return Object.assign({}, state, {
        currentPane: action.ui.selectedPane,
      })

    case SAVE_SCRIPT_REQUEST:
      return Object.assign({}, state, {
        isSaving: true,
      })
    case SAVE_SCRIPT_SUCCESS:
      let script = {};

      script[action.payload.script.id] = action.payload.script;
      const updatedScripts = Object.assign({}, state.scripts, script);
      return Object.assign({}, state, {
        isSaving: false,
        currentScript: action.payload.script,
        scripts: updatedScripts,
        scriptCount: Object.keys(updatedScripts).length,
      })

    case SHOW_SAVE_MODAL:
      return Object.assign({}, state, {
        showSaveModal: true,
      })

    case HIDE_SAVE_MODAL:
      return Object.assign({}, state, {
        showSaveModal: false,
      })

    case FETCHING_SCRIPTS_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
      })
    case FETCHING_SCRIPTS_SUCCESS:
      let firstScript;
      if (!state.currentScript) {
        firstScript = action.payload.scripts.data[0]
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
      })

    case PREVIEW_SCRIPT_SUCCESS:
      return Object.assign({}, state, {
        log: action.payload.log
      })
    case PREVIEW_SCRIPT_REQUEST:
      return Object.assign({}, state, {
        log: [{
          message: 'Processing your script...',
        }]
      })

    case SCRIPT_TITLE_CHANGED:
      let currentScript = state.currentScript
      currentScript.title = action.payload.title
      return Object.assign({}, state, {
        currentScript: currentScript
      })

    case SCRIPT_CODE_CHANGED:
      return Object.assign({}, state, {
        editorValue: action.payload.code
      })

    case SCRIPT_LIST_CLICKED:
      return Object.assign({}, state, {
        scriptListOpen: !state.scriptListOpen,
    })

    case OPTIMISATIONS_COMPLETE: {
      return Object.assign({}, state, {
        optimisations: action.payload.optimisations
      })
    }
    default:
      return state
  }
}


module.exports = typefastApp
