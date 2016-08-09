/**
 * Copyright (c) 2016-present, Facebook, Inc. All rights reserved.
 *
 * You are hereby granted a non-exclusive, worldwide, royalty-free license to
 * use, copy, modify, and distribute this software in source code or binary
 * form for use in connection with the web services and APIs provided by
 * Facebook.
 *
 * As with any software that integrates with the Facebook platform, your use
 * of this software is subject to the Facebook Developer Principles and
 * Policies [http://developers.facebook.com/policy/]. This copyright notice
 * shall be included in all copies or substantial portions of the software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 * DEALINGS IN THE SOFTWARE.
 *
 * @flow
 */

import React from 'react';
import Badge from 'react-bootstrap/lib/Badge';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';
import Nav from 'react-bootstrap/lib/Nav';
import Navbar from 'react-bootstrap/lib/Navbar';
import NavItem from 'react-bootstrap/lib/NavItem';
import TypeFastNavBarEditorButtonsContainer from '../containers/TypeFastNavBarEditorButtonsContainer';

class TypeFastNavigation extends React.Component {
  selectButtons() {
    return <TypeFastNavBarEditorButtonsContainer />;
  }

  render() {
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
