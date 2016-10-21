import { showUnsavedChangesDialog } from '../actions/actions.js'

const unsavedChanges = store => next => action => {
  let result;

  if ( action.meta && action.meta.checkUnsavedChanges && store.getState().needToSave ) {
    // unsaved data - show dialog before continuing
    const pendingAction = Object.assign({}, action, {
      meta : {
        checkUnsavedChanges: false
      }
    });
    result = store.dispatch(showUnsavedChangesDialog(pendingAction))
  } else {
    result = next(action)
  }

  return result
}

module.exports = unsavedChanges
