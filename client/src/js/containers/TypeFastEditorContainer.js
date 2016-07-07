const React = require('react');
const TypeFastLogWindow = require('../components/TypeFastLogWindow')
const TypeFastEditor = require('../components/TypeFastEditor')
import { codeChanged, optimisationComplete } from '../actions/actions'
import { connect } from 'react-redux';

const TypeFastEditorContainer = React.createClass({

  render: function() {
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
})

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
    currentPane: state.currentPane,
  //  editorValue: state.editorValue,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TypeFastEditorContainer)
