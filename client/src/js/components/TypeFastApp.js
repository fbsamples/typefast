import  React  from 'react';
import  Radium from 'radium';
import { connect } from 'react-redux';
import { fetchScripts } from '../actions/actions.js';
import TypeFastNavigationContainer from '../containers/TypeFastNavigationContainer';
import TypeFastEditorContainer from '../containers/TypeFastEditorContainer';
import TypeFastListingContainer from '../containers/TypeFastListingContainer';


class TypeFastApp extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchScripts());
  }

  render() {
    return (
      <div style={[styles.container]}>
        <TypeFastNavigationContainer />
        <TypeFastEditorContainer />
        <TypeFastListingContainer />
      </div>
    )
  }
}

const styles = {
  container: {
    height: "100%",
  }
}

export default connect()(Radium(TypeFastApp))
