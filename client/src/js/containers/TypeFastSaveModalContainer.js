import { connect } from 'react-redux'
import { hideSaveModal } from '../actions/actions.js'
import TypeFastSaveModal from '../components/TypeFastSaveModal'

const mapStateToProps = (state, ownProps) => {
  return {
    showModal: state.showSaveModal,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    close:() => {
      console.log('hide modal')
      dispatch(hideSaveModal())
    }
  }
}

const TypeFastSaveModalContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(TypeFastSaveModal)

export default TypeFastSaveModalContainer
