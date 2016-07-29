import { connect } from 'react-redux'
import { previewScript, saveScript, scriptTitleChanged } from '../actions/actions.js'
import TypeFastNavBarEditorButtons from '../components/TypeFastNavBarEditorButtons'

const mapStateToProps = (state, ownProps) => {
  return {
    scriptTitle: state.currentScript ?
      state.currentScript.title : 'A Untitled Masterwork'
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onTitleChange: (event) => {
      dispatch(scriptTitleChanged(event.target.value))
    },
    onSave: () => {
      dispatch(saveScript())
    },
    onPreview: () => {
      dispatch(previewScript())
    }
  }
}

const TypeFastNavBarEditorButtonsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(TypeFastNavBarEditorButtons)

export default TypeFastNavBarEditorButtonsContainer
