import fetch from 'isomorphic-fetch'

function handleErrors(response) {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
}

export const LOAD_SCRIPT = 'LOAD_SCRIPT'
export function loadScript(id) {
    return {
      type: LOAD_SCRIPT,
      payload: {
        id: id
      }
    }
}

export const UI_CHANGE = 'UI_CHANGE';
export function changePane(pane) {
  return {
    type: UI_CHANGE,
    ui: {
      selectedPane: pane
    }
  }
}

export const OPTIMISATIONS_COMPLETE = 'OPTIMISATIONS_COMPLETE'
export function optimisationComplete(optimisations) {
  return {
    type: OPTIMISATIONS_COMPLETE,
    payload: {
      optimisations: optimisations
    }
  }
}

export const SCRIPT_TITLE_CHANGED = 'SCRIPT_TITLE_CHANGED';
export function scriptTitleChanged(title) {
  return {
    type: SCRIPT_TITLE_CHANGED,
    payload: {
      title: title
    }
  }
}

export const SCRIPT_CODE_CHANGED = 'SCRIPT_CODE_CHANGED';
export function codeChanged(code) {
  return {
    type: SCRIPT_CODE_CHANGED,
    payload: {
      code: code
    }
  }
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
      body: JSON.stringify({
        code: getState().editorValue,
        optimisations: getState().optimisations,
        title: currentScript.title
      })
    })
    .then(handleErrors)
    .then(function(response) {
      return response.json();
    })
    .then(function(response) {
      dispatch({
        type: SAVE_SCRIPT_SUCCESS,
        payload: {
          script: response
        }
      })
      console.log('save', response);
    })
  }
}

export const PREVIEW_SCRIPT_CLICKED = 'PREVIEW_SCRIPT';

export const PREVIEW_SCRIPT_REQUEST = 'PREVIEW_SCRIPT_REQUEST';
export const PREVIEW_SCRIPT_CREATED = 'PREVIEW_SCRIPT_SUCCESS';
export const PREVIEW_SCRIPT_SUCCESS = 'PREVIEW_SCRIPT_SUCCESS';
export const PREVIEW_SCRIPT_FAILURE = 'PREVIEW_SCRIPT_FAILURE';

function pollRoutine(routineId, dispatch) {
  fetch("/routines/" + routineId)
  .then(handleErrors)
  .then(function(response) {
    return response.json();
  })
  .then(function(response) {
    // this is hideous, fix it
    if (response.is_completed) {
      let message
        = response.runner_log.map(function(a) { return a.chunk }).join("\n");
      dispatch({
        type: PREVIEW_SCRIPT_SUCCESS,
          payload: {
            log: [{message: message}]
          }
       });
    } else {
      setTimeout(function() {
        pollRoutine(routineId, dispatch)
      },1000);
    }
  })
}

export function previewScript() {
  return function(dispatch, getState) {
    dispatch({type: PREVIEW_SCRIPT_REQUEST});

    return fetch("/routines/", {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        script_id: getState().currentScript.id,
      })
    })
    .then(handleErrors)
    .then(function(response) {
      return response.json();
    })
    .then(function(response) {
      pollRoutine(response.id, dispatch)
    })
  }
}

export const FETCHING_SCRIPTS_REQUEST = 'FETCHING_SCRIPTS_REQUEST';
export const FETCHING_SCRIPTS_SUCCESS = 'FETCHING_SCRIPTS_SUCCESS';
export const FETCHING_SCRIPTS_FAILURE = 'FETCHING_SCRIPTS_FAILURE';

export function fetchScripts() {
  return function(dispatch) {
    dispatch({type: FETCHING_SCRIPTS_REQUEST});
    return fetch('/scripts')
      .then(handleErrors)
      .then(function(response) {
        return response.json();
      })
      .then(function(json) {
        dispatch({
          type: FETCHING_SCRIPTS_SUCCESS,
          payload: {
            scripts: json
          }
        })
      })
  }
}
