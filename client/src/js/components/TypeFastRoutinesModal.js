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

import dateFormat from 'dateformat';
import React from 'react';
import Modal from 'react-bootstrap/lib/Modal';
import Button from 'react-bootstrap/lib/Button';
import Panel from 'react-bootstrap/lib/Panel';
import Accordion from 'react-bootstrap/lib/Accordion';

class TypeFastRoutinesModal extends React.Component {
  timeTaken(start, end) {
    const seconds = Math.floor((new Date(end) - new Date(start))/1000);
    return seconds;
  }

  formatOutputStreams(streamArray) {
    return streamArray.reduce(function(prev, curr) {
      prev.push(<p>{dateFormat(curr.time)} - {curr.chunk}</p>);
      return prev;
    }, []);
  }

  getBody() {
    if (this.props.routines.length == 0) {
      return <p>No Logs</p>;
    } else {
      return this.props.routines.reduce(function(prev, curr, i) {
        if (Date.parse(curr.visible_from) > Date.now()) {
          prev.push(
            <Panel header="Future Schedule Runs" bsStyle="success">
              <span>Next execution on {dateFormat(curr.visible_from)}</span>
            </Panel>
          );
        } else {
          prev.push(
            <Panel
              header={dateFormat(curr.visible_from)}
              eventKey={i}>
                <p>Time Taken: {this.timeTaken(curr.runner_start_time, curr.runner_end_time)} seconds</p>
                <div>
                  {this.formatOutputStreams(curr.runner_log)}
                </div>
            </Panel>
          );
        }
        return prev;
      }.bind(this), []);
    }
  }

  render() {
    return (
      <Modal
        id="routine-modal"
        show={this.props.showModal}
        onHide={this.props.close}>
       <Modal.Header closeButton>
         <Modal.Title>Past Run Logs</Modal.Title>
       </Modal.Header>
       <Modal.Body>
         <Accordion>
           {this.getBody()}
         </Accordion>
       </Modal.Body>
       <Modal.Footer>
         <Button onClick={this.props.close}>Close</Button>
       </Modal.Footer>
     </Modal>
  );}
}

module.exports = TypeFastRoutinesModal;
