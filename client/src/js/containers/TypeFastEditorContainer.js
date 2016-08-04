import Radium from 'radium';
import React from 'react';
import TypeFastLogWindow from '../components/TypeFastLogWindow';
import TypeFastEditor from '../components/TypeFastEditor';
import TypeFastScheduleModalContainer from './TypeFastScheduleModalContainer';
import { codeChanged, optimisationComplete } from '../actions/actions';
import { connect } from 'react-redux';

const styles = {
  container: {
    paddingLeft: 0
  }
};

class TypeFastEditorContainer extends React.Component {
  render() {
    const hidden = this.props.scriptListOpen ? 'col-lg-10' : 'col-lg-12';
    return (
      <div
        className={`container-fluid content ${hidden}`}
        style={[styles.container]}>
        <TypeFastEditor
          script={this.props.script}
          onCodeChange={this.props.onCodeChange}
          onOptimisationComplete={this.props.onOptimisationComplete}
        />
        <TypeFastLogWindow log={this.props.log}/>
        <TypeFastScheduleModalContainer />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onCodeChange: function(code) {
      dispatch(codeChanged(code));
    },
    onOptimisationComplete: function(optimisations) {
      dispatch(optimisationComplete(optimisations));
    }
  };
};

const mapStateToProps = (state) => {
  return {
    script: state.currentScript,
    isFetching: state.isFetching,
    log: state.log,
    currentPane: state.currentPane,
    scriptListOpen: state.scriptListOpen
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Radium(TypeFastEditorContainer));
