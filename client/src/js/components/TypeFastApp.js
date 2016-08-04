import  React  from 'react';
import { connect } from 'react-redux';
import { fetchScripts } from '../actions/actions.js';
import TypeFastNavigationContainer from '../containers/TypeFastNavigationContainer';
import TypeFastEditorContainer from '../containers/TypeFastEditorContainer';
import TypeFastListingContainer from '../containers/TypeFastListingContainer';


class TypeFastApp extends React.Component {
  componentDidMount() {
    // this causes lots of state sets while rendering so needs to be moved
    // out 
    this.props.dispatch(fetchScripts());
  }

  render() {
    return (
      <div className="full-height">
        <TypeFastNavigationContainer />
        <div className="row full-height">
          <TypeFastListingContainer />
          <TypeFastEditorContainer />
        </div>
      </div>
    );
  }
}

export default connect()(TypeFastApp);
