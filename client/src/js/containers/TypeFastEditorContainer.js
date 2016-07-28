import React from 'react';
import TypeFastLogWindow from '../components/TypeFastLogWindow';
import TypeFastEditor from '../components/TypeFastEditor';
import { codeChanged, optimisationComplete } from '../actions/actions';
import { connect } from 'react-redux';

class TypeFastEditorContainer extends React.Component {
  render() {
    const hidden = this.props.currentPane !== 'editor' ? 'hidden' : '';
    return (
      <div className={`container-fluid content ${hidden}`}>
        <div className="row">
          <TypeFastEditor
            script={this.props.script}
            onCodeChange={this.props.onCodeChange}
            onOptimisationComplete={this.props.onOptimisationComplete}
          />
          <TypeFastLogWindow log={this.props.log}/>
        </div>
      </div>
    )
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
  }
}

const mapStateToProps = (state) => {
  return {
    script: state.currentScript,
    isFetching: state.isFetching,
    log: state.log,
    currentPane: state.currentPane
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TypeFastEditorContainer)
