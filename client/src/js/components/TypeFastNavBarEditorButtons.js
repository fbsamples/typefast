import React from 'React';
import FormControl from 'react-bootstrap/lib/FormControl';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';

class TypeFastNavBarEditorButtons extends React.Component {
  render() {
    return <div>
      <FormGroup id="script-title">
        <FormControl
          onChange={this.props.onTitleChange}
          type="text"
          placeholder="Search"
          value={this.props.scriptTitle}
          defaultValue="A Untitled Masterwork"/>
      </FormGroup>
      <button
        id='preview-button'
        onClick={this.props.onPreview}
        type="button"
        className="btn btn-default btn-green navbar-btn">
      <span><Glyphicon glyph="play" /> Preview</span>
      </button>
      <button
        id='save-button'
        onClick={this.props.onSave}
        type="button"
        className="btn btn-default btn-green navbar-btn">
        <span><Glyphicon glyph="floppy-disk" /> Save</span>
      </button>
    </div>
  }
}

module.exports = TypeFastNavBarEditorButtons;
