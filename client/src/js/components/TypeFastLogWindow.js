
const Radium = require('radium');
const React = require('react');

const TypeFastLogWindow = React.createClass({
  logGenerator: function() {
    let elements = this.props.log.map((el) => {
      return el.message.split("\n").map(i => { return <div>{i}</div>})
    })
    return [].concat.apply([], elements);
  },
  render: function() {
    return (
      <div
        className="col-lg-6 full-height visible-md visible-lg"
        style={[styles.container]}>
        <code id="logbox" style="white-space:pre">
          {this.logGenerator()}
        </code>
      </div>
    )
  }
})

const styles = {
  container: {
    background: "#FCFCFC",
    borderLeft: "1px solid #ddd",
    paddingTop: "15px",
    overflow: "scroll"
  }
}

module.exports = Radium(TypeFastLogWindow);
