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

import React from 'react';
import Radium from 'radium';

import TypeFastEditorInit from '../typefast-editor-init';

const styles = {
  container: {
    width: '50%',
    float: 'left',
    height: '100%',
    overflow: 'scroll'
  }
};

class TypeFastEditor extends React.Component {
  componentDidMount() {
    this.editor = TypeFastEditorInit(
      this.refs.sandbox,
      this.props.onCodeChange,
      this.props.onOptimisationComplete
    );
  }

  componentDidUpdate() {
    if (this.editor) {
      if (this.props.isFetching) {
        this.editor.setLoadingText();
      } else if (this.props.script && this.props.script.code) {
        this.editor.setText(this.props.script.code);
      } else if (this.editor) {
        this.editor.setWelcomeText();
      }
    }
  }

  render() {
    return (
      <div style={[styles.container]}>
        <div ref="sandbox" id="sandbox"></div>
      </div>
    );
  }
}

module.exports = Radium(TypeFastEditor);
