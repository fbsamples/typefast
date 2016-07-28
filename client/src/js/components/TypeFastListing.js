import Radium from 'radium';
import React from 'react';
import Button from 'react-bootstrap/lib/Button';
import Panel from 'react-bootstrap/lib/Panel';

class TypeFastListing extends React.Component {
  render() {
    return (
      <Panel className='code-panel' header={this.props.script.title}>
        <div>
          <p>{this.props.index}.</p>
          <p>Script: {this.props.script.id}</p>
          <div> {this.props.script.code.split("\n").map(i => { return <div>{i}</div>})}</div>
          <Button onClick={this.props.onClick.bind(null, this.props.script.id)}>
            Load
          </Button>
        </div>
      </Panel>
    )
  }
}

module.exports = TypeFastListing;
