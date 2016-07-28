import React from 'react';
import Badge from 'react-bootstrap/lib/Badge';
import Button from 'react-bootstrap/lib/Button';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';
import Nav from 'react-bootstrap/lib/Nav';
import Navbar from 'react-bootstrap/lib/Navbar';
import NavDropdown from 'react-bootstrap/lib/NavDropdown';
import NavItem from 'react-bootstrap/lib/NavItem';
import MenuItem from 'react-bootstrap/lib/MenuItem';

class TypeFastNavigation extends React.Component {
  render() {
    const hideEditorButtons = this.props.currentPane !== 'editor' ? 'hidden' : '';
    return (
    <Navbar id="mainnav" fluid >
      <Nav>
        <NavItem eventKey={1}
          onClick={this.props.onNavClick.bind(null, 'editor')}
          active={this.props.currentPane === 'editor'} title="edit">
          <Glyphicon glyph="edit" /> Edit
        </NavItem>
        <NavItem eventKey={2} onClick={this.props.onNavClick.bind(null, 'listings')} active={ this.props.currentPane === 'listings' } title="Item">
          <Glyphicon glyph="align-justify" /> Library <Badge>{this.props.scriptCount}</Badge>
        </NavItem>
        <NavItem eventKey={3} disabled>
          <Glyphicon glyph="cog" /> Settings
        </NavItem>
        <NavDropdown eventKey={4} title={
          <span><Glyphicon glyph="user" /> Account</span>
        }  id="nav-dropdown">
          <MenuItem eventKey="4.1">Action</MenuItem>
          <MenuItem eventKey="4.2">Another action</MenuItem>
          <MenuItem eventKey="4.3">Something else here</MenuItem>
          <MenuItem divider />
          <MenuItem eventKey="4.4">Separated link</MenuItem>
        </NavDropdown>
      </Nav>
      <Nav pullRight>
      <button
        id='preview-button'
        onClick={this.props.onPreview}
        type="button"
        className={`btn btn-default btn-green navbar-btn ${hideEditorButtons}`}
      >
        <span><Glyphicon glyph="play" /> Preview</span>
      </button>
      <button
        id='save-button'
        onClick={this.props.onSave}
        type="button"
        className={`btn btn-default btn-green navbar-btn ${hideEditorButtons}`}
      >
        <span><Glyphicon glyph="floppy-disk" /> Save</span>
      </button>
      </Nav>
    </Navbar>
  )}
}

module.exports = TypeFastNavigation;
