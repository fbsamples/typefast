const React = require('react');
const TypeFastEditorInit = require('../typefast-editor-init');

const TypeFastEditor = React.createClass({
  componentDidMount: function() {
    this.editor = TypeFastEditorInit(
      this.refs.sandbox,
      this.props.onCodeChange,
      this.props.onOptimisationComplete
    );
  },

  render: function() {
    if(this.props.isFetching) {
      this.editor.setLoadingText();
    } else if(this.props.script) {
      this.editor.setText(this.props.script.code);
    } else if (this.editor){
      this.editor.setWelcomeText();
    }

    return (
      <div
        ref="sandbox"
        id="sandbox"
        className="col-lg-6 full-height nopadding">
      </div>
    )
  }
})

module.exports = TypeFastEditor;
