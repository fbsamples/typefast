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
