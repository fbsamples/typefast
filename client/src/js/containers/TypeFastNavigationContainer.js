import { connect } from 'react-redux';
import { toggleScriptList, changePane } from '../actions/actions.js';
import TypeFastNavigation from '../components/TypeFastNavigation';

const mapStateToProps = (state, ownProps) => {
  return {
    scriptCount: Object.keys(state.scripts).length,
    currentPane: state.currentPane,
    scriptListOpen: state.scriptListOpen
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onNavClick: (paneName) => {
      dispatch(changePane(paneName));
    },
    onScriptListClicked: () => {
      dispatch(toggleScriptList());
    },
  };
};

const TypeFastNavigationContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(TypeFastNavigation);

export default TypeFastNavigationContainer;
