import Radium from 'radium';
import React from 'react';

class TypeFastLogWindow extends React.Component {
  logGenerator() {
    let elements = this.props.log.map((el) => {
      return el.message.split("\n").map(i => { return <div>{i}</div>})
    })
    return [].concat.apply([], elements);
  }

  render() {
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
}

const styles = {
  container: {
    background: "#FCFCFC",
    borderLeft: "1px solid #ddd",
    paddingTop: "15px",
    overflow: "scroll"
  }
}

module.exports = Radium(TypeFastLogWindow);
