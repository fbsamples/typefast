import React from 'React';
import Form from 'react-bootstrap/lib/Form';
import FormControl from 'react-bootstrap/lib/FormControl';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';
import NavDropdown from 'react-bootstrap/lib/NavDropdown';
import MenuItem from 'react-bootstrap/lib/MenuItem';
import Radio from 'react-bootstrap/lib/Radio';

class TypeFastNavBarEditorButtons extends React.Component {

  saveButtonGlyphicon() {
    if (this.props.isSaving) {
      return 'refresh';
    } else if (this.props.needToSave) {
      return 'floppy-disk';
    } else {
      return 'ok';
    }
  }

  saveButtonColour() {
    if (this.props.isSaving) {
      return 'btn-success';
    } else if (this.props.needToSave) {
      return 'btn-green';
    } else {
      return 'btn-success';
    }
  }

  render() {
    const buttonColour = this.saveButtonColour();
    const glyphIcon = this.saveButtonGlyphicon();
    return <div>
      <FormGroup id="script-title">
        <span>Script  </span>
        <FormControl
          onChange={this.props.onTitleChange}
          type="text"
          placeholder="Search"
          value={this.props.scriptTitle}
          defaultValue="A Untitled Masterwork"/>
      </FormGroup>
      <button
        id="log-button"
        onClick={this.props.onPreviousRuns}
        type="button"
        className="btn btn-default btn-green navbar-btn">
        <Glyphicon glyph="time" /> Logs
      </button>
      <button
        id="schedule-button"
        onClick={this.props.onSchedule}
        type="button"
        className="btn btn-default btn-green navbar-btn">
        <Glyphicon glyph="calendar" /> Schedule
      </button>
      <button
        id="preview-button"
        onClick={this.props.onPreview}
        type="button"
        className="btn btn-default btn-green navbar-btn"
        disabled={this.props.needToSave} >
        <Glyphicon glyph="play" /> Preview
      </button>
      <button
        id="save-button"
        onClick={this.props.onSave}
        type="button"
        className={`btn btn-default ${buttonColour} navbar-btn`}>
        <Glyphicon glyph={glyphIcon} /> Save
      </button>
    </div>;
  }
}

module.exports = TypeFastNavBarEditorButtons;
