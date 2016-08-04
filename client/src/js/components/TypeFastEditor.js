import React from 'react';
import TypeFastEditorInit from '../typefast-editor-init';

class TypeFastEditor extends React.Component {
  componentDidMount() {
    this.editor = TypeFastEditorInit(
      this.refs.sandbox,
      this.props.onCodeChange,
      this.props.onOptimisationComplete
    );
  }

  render() {
    if (this.editor) {
      if (this.props.isFetching) {
        this.editor.setLoadingText();
      } else if (this.props.script) {
        this.editor.setText(this.props.script.code);
      } else if (this.editor) {
        this.editor.setWelcomeText();
      }
    }

    return (
      <div
        ref="sandbox"
        id="sandbox"
        className="col-lg-6 full-height nopadding">
      </div>
    );
  }
}

module.exports = TypeFastEditor;
