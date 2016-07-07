const React = require('react');
const Button = require('react-bootstrap/lib/Button');

const TypeFastListing = React.createClass({
  render: function() {
    return (
      <div>
        <p>{this.props.index}.</p>
        <p>Script: {this.props.script._id}</p>
        <div> {this.props.script.code.split("\n").map(i => { return <div>{i}</div>})}</div>
        <Button onClick={this.props.onClick.bind(null, this.props.script._id)}>
          Load
        </Button>
      </div>
    )
  }
})

module.exports = TypeFastListing;
