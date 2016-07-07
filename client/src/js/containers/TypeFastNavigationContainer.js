import { connect } from 'react-redux'
import { previewScript, saveScript, changePane } from '../actions/actions.js'
import TypeFastNavigation from '../components/TypeFastNavigation'

const mapStateToProps = (state, ownProps) => {
  return {
    scriptCount: Object.keys(state.scripts).length,
    currentPane: state.currentPane,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onSave: () => {
      console.log('on save');
      dispatch(saveScript())
    },
    onPreview: () => {
      console.log('on preview')
      dispatch(previewScript())
    },
    onNavClick:(paneName) => {
      console.log('pane')
      dispatch(changePane(paneName))
    }
  }
}

const TypeFastNavigationContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(TypeFastNavigation)

export default TypeFastNavigationContainer
