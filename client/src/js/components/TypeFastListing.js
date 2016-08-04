import Radium from 'radium';
import React from 'react';
import Button from 'react-bootstrap/lib/Button';
import Panel from 'react-bootstrap/lib/Panel';

class TypeFastListing extends React.Component {
  render() {
    return (
      <div>
        <a
          onClick={this.props.onClick.bind(null, this.props.script.id)}
          href="#" >
          {this.props.script.title}
        </a>
      </div>
    );
  }
}

module.exports = TypeFastListing;
