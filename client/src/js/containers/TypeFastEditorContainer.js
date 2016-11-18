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

import type { Dispatch, State } from 'redux';

import Radium from 'radium';
import React from 'react';
import TypeFastLogContainer from '../containers/TypeFastLogContainer';
import TypeFastEditor from '../components/TypeFastEditor';
import { codeChanged, optimisationComplete, saveScript } from '../actions/actions';
import { connect } from 'react-redux';

const styles = {
  container: {
    position: 'absolute',
    top: '120px',
    bottom: '0',
    width: '100%',
  },
};

class TypeFastEditorContainerComponent extends React.Component {
  render() {
    return (
      <div style={[styles.container]}>
        <TypeFastEditor
          script={this.props.script}
          onCodeChange={this.props.onCodeChange}
          onCodeSave={this.props.onCodeSave}
          onOptimisationComplete={this.props.onOptimisationComplete}
        />
        <TypeFastLogContainer />
      </div>
    );
  }
}

const mapStateToProps = (state: State, ownProps: Object): Object => {
  return {
    script: state.currentScript,
  };
};

const mapDispatchToProps = (dispatch: Dispatch, ownProps: Object): Object => {
  return {
    onCodeChange: (code: string): void => {
      dispatch(codeChanged(code));
    },
    onCodeSave: (): void => {
      dispatch(saveScript());
    },
    onOptimisationComplete: (optimisations: Object): void => {
      dispatch(optimisationComplete(optimisations));
    },
  };
};

const TypeFastEditorContainer = connect(mapStateToProps, mapDispatchToProps)(Radium(TypeFastEditorContainerComponent));

export default TypeFastEditorContainer;
