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

import Radium from 'radium';
import React from 'react';
import TypeFastLogWindow from '../components/TypeFastLogWindow';
import TypeFastEditor from '../components/TypeFastEditor';
import { codeChanged, optimisationComplete } from '../actions/actions';
import { connect } from 'react-redux';

const styles = {
  container: {
    position: 'absolute',
    top: '120px',
    bottom: '0',
    width: '100%'
  }
};

class TypeFastEditorContainer extends React.Component {
  render() {
    return (
      <div style={[styles.container]}>
        <TypeFastEditor
          script={this.props.script}
          onCodeChange={this.props.onCodeChange}
          onOptimisationComplete={this.props.onOptimisationComplete} />
        <TypeFastLogWindow log={this.props.log} />
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
