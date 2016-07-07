const React = require('react');
const Radium = require('radium');
import { connect } from 'react-redux'
import { fetchScripts } from '../actions/actions.js'
import TypeFastNavigationContainer from '../containers/TypeFastNavigationContainer';
import TypeFastEditorContainer from '../containers/TypeFastEditorContainer';
import TypeFastListingContainer from '../containers/TypeFastListingContainer';


const TypeFastApp = React.createClass({
  componentDidMount: function() {
    this.props.dispatch(fetchScripts());
  },

  render: function() {
    return (
      <div style={[styles.container]}>
        <TypeFastNavigationContainer />
        <TypeFastEditorContainer />
        <TypeFastListingContainer />
      </div>
    )
  }
})

const styles = {
  container: {
    height: "100%",
  }
}

export default connect()(Radium(TypeFastApp))
