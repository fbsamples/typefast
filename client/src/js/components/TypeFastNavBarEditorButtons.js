/**
 * Copyright (c) 2016-present, Facebook, Inc. All rights reserved.
 *
 * You are hereby granted a non-exclusive, worldwide, royalty-free license to
 * use, copy, modify, and distribute this software in source code or binary
 * form for use in connection with the web services and APIs provided by
 * Facebook.
 *
 * As with any software that integrates with the Facebook platform, your use
 * of this software is subject to the Facebook Developer Principles and
 * Policies [http://developers.facebook.com/policy/]. This copyright notice
 * shall be included in all copies or substantial portions of the software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 * DEALINGS IN THE SOFTWARE.
 *
 * @flow
 */

import React from 'React';
import FormControl from 'react-bootstrap/lib/FormControl';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';

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
        onClick={this.props.onLogs}
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
