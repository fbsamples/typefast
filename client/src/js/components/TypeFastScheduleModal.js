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
import Modal from 'react-bootstrap/lib/Modal';
import Button from 'react-bootstrap/lib/Button';
import Switch from 'react-bootstrap-switch';
import FormControl from 'react-bootstrap/lib/FormControl';
import DateTimeField from 'react-bootstrap-datetimepicker';

class TypeFastScheduleModal extends React.Component {
  render() {
    return (
      <Modal show={this.props.showModal} onHide={this.props.close}>
       <Modal.Header closeButton>
         <Modal.Title>Script Scheulde</Modal.Title>
       </Modal.Header>
       <Modal.Body>
         <div className="row">
           <div className="col-sm-12">
             <p>Setup your script to run periodically.</p>
               <div className="row" style={{marginBottom: '10px'}}>
                 <div className="col-sm-3">
                   Scheduling:
                 </div>
                 <div className="col-sm-5">
                   Start Date and Time:
                 </div>
                 <div className="col-sm-4">
                   Run Every:
                 </div>
               </div>
             <div className="row">
               <div className="col-sm-3">
                 <Switch state={this.props.state} onChange={this.props.onStateChange}/>
               </div>
               <div className="col-sm-5">
                 <DateTimeField onChange={this.props.onStartTimeChange} />
               </div>
               <div className="col-sm-4">
                 <FormControl componentClass="select" onChange={this.props.onIntervalChange} >
                   <option value="hourly">Hour</option>
                   <option value="daily">Day</option>
                 </FormControl>
               </div>
             </div>
           </div>
         </div>
       </Modal.Body>
       <Modal.Footer>
         <button
           onClick={this.props.onSave}
           type="button"
           className={'btn btn-default btn-green'}>
           Save
         </button>
         <Button onClick={this.props.close}>Close</Button>
       </Modal.Footer>
     </Modal>
   );
  }
}

module.exports = TypeFastScheduleModal;
