const React = require('react');
import { loadScript, changePane } from '../actions/actions.js'
import { connect } from 'react-redux'
const Button = require('react-bootstrap/lib/Button');
//import { previewScript, saveScript, changePane } from '../actions/actions.js'
import TypeFastScriptListItem from '../components/TypeFastListing'

const TypeFastListingContainer = React.createClass({
  render: function() {
    const hidden = this.props.currentPane !== 'listings' ? 'hidden' : '';
    return (
      <div className={hidden}>
        <Button onClick={this.props.onClick.bind(null,'new')}>New Script</Button>
        {Object.keys(this.props.scripts).map((key, i) => {
          return <TypeFastScriptListItem
            index={i+1}
            script={this.props.scripts[key]}
            onClick={this.props.onClick}/>
        })}
      </div>
    )
  }
})


const mapStateToProps = (state, ownProps) => {
  return {
    scriptCount: state.scriptCount,
    scripts: state.scripts,
    currentPane: state.currentPane
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onClick: (id) => {
      dispatch(loadScript(id));
      dispatch(changePane('editor'))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TypeFastListingContainer)
