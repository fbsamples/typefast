import { connect } from 'react-redux';
import { previewScript, saveScript, scriptTitleChanged, showScheduleModal } from '../actions/actions.js';
import TypeFastNavBarEditorButtons from '../components/TypeFastNavBarEditorButtons';

const mapStateToProps = (state, ownProps) => {
  return {
    scriptTitle: state.currentTitle,
    needToSave: state.needToSave,
    isSaving: state.isSaving
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onTitleChange: (event) => {
      dispatch(scriptTitleChanged(event.target.value));
    }, onSave: () => {
      dispatch(saveScript());
    },
    onPreview: () => {
      dispatch(previewScript());
    },
    onSchedule: () => {
      dispatch(showScheduleModal());
    },
    onPreviousRuns: () => {

    }
  };
};

const TypeFastNavBarEditorButtonsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(TypeFastNavBarEditorButtons);

export default TypeFastNavBarEditorButtonsContainer;
