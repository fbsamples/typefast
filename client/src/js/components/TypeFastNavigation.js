import React from 'react';
import Badge from 'react-bootstrap/lib/Badge';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';
import Nav from 'react-bootstrap/lib/Nav';
import Navbar from 'react-bootstrap/lib/Navbar';
import NavDropdown from 'react-bootstrap/lib/NavDropdown';
import NavItem from 'react-bootstrap/lib/NavItem';
import MenuItem from 'react-bootstrap/lib/MenuItem';
import TypeFastNavBarEditorButtonsContainer from '../containers/TypeFastNavBarEditorButtonsContainer';

class TypeFastNavigation extends React.Component {
  selectButtons() {
    return <TypeFastNavBarEditorButtonsContainer />;
  }

  render() {
    let buttons;
    return (
    <Navbar id="mainnav" fluid >
      <Nav>
        <NavItem
          eventKey={2}
          onClick={this.props.onScriptListClicked}
          active={this.props.scriptListOpen}
          title="Item">
          <Glyphicon glyph="align-justify" /> Library <Badge>{this.props.scriptCount}</Badge>
        </NavItem>
      </Nav>
      <Navbar.Form pullRight className="nomargin">
        {this.selectButtons()}
      </Navbar.Form>
    </Navbar>
  );}
}

module.exports = TypeFastNavigation;
