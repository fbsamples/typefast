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
import { loadScript, changePane, toggleScriptList } from '../actions/actions.js';
import { connect } from 'react-redux';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';
import TypeFastScriptListItem from '../components/TypeFastListing';

const styles = {
  container: {
    padding: '10px 15px 10px 25px'
  },
  close: {
    float: 'right',
  },
};

class TypeFastListingContainer extends React.Component {
  render() {
    const hidden = this.props.scriptListOpen ? 'col-lg-2' : 'hidden';
    return (
      <div className={`${hidden}`} style={[styles.container]}>
          <div>
            <button
              id="new-script"
              onClick={this.props.onClick.bind(null, 'new')}
              type="button"
              className="btn btn-default btn-green navbar-btn">
              <Glyphicon glyph="new-window" /> New Script
            </button>
            <button
              onClick={this.props.close}
              type="button"
              style={[styles.close]}
              className="btn btn-default navbar-btn">
              <Glyphicon glyph="remove" />
            </button>
          </div>
          {Object.keys(this.props.scripts).map((key, i) => {
            return <TypeFastScriptListItem
              index={i+1}
              script={this.props.scripts[key]}
              onClick={this.props.onClick}/>;
          })}
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    scriptCount: state.scriptCount,
    scripts: state.scripts,
    currentPane: state.currentPane,
    scriptListOpen: state.scriptListOpen
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onClick: (id) => {
      dispatch(loadScript(id));
      dispatch(changePane('editor'));
    },
    close: () => {
      dispatch(toggleScriptList());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Radium(TypeFastListingContainer));
