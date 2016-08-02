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
    return <TypeFastNavBarEditorButtonsContainer />
  }

  render() {
    let buttons;
    return (
    <Navbar id="mainnav" fluid >
      <Nav>
        {/*<NavItem
          eventKey={1}
          onClick={this.props.onNavClick.bind(null, 'editor')}
          active={this.props.currentPane === 'editor'} title="edit">
          <Glyphicon glyph="edit" /> Edit
        </NavItem>*/}
        <NavItem
          eventKey={2}
          onClick={this.props.onScriptListClicked}
          active={this.props.scriptListOpen}
          title="Item">
          <Glyphicon glyph="align-justify" /> Library <Badge>{this.props.scriptCount}</Badge>
        </NavItem>
        <NavDropdown
          eventKey={3}
          title={
            <span><Glyphicon glyph="user" /> Account</span>
          }
          id="nav-dropdown">
          <MenuItem eventKey="4.1">Action</MenuItem>
          <MenuItem eventKey="4.2">Another action</MenuItem>
          <MenuItem eventKey="4.3">Something else here</MenuItem>
          <MenuItem divider />
          <MenuItem eventKey="4.4">Separated link</MenuItem>
        </NavDropdown>
      </Nav>
      <Navbar.Form pullRight className='nomargin'>
        {this.selectButtons()}
      </Navbar.Form>
    </Navbar>
  )}
}

module.exports = TypeFastNavigation;
