import React from 'React';
import Modal from 'react-bootstrap/lib/Modal';
import Button from 'react-bootstrap/lib/Button';

class TypeFastScheduleModal extends React.Component {
  render() {
    return <Modal show={this.props.showModal} onHide={this.props.close}>
     <Modal.Header closeButton>
       <Modal.Title>Script Scheulde</Modal.Title>
     </Modal.Header>
     <Modal.Body>
       <p>Setup your script to run periodically.</p>
     </Modal.Body>
     <Modal.Footer>
       <Button onClick={this.props.close}>Close</Button>
     </Modal.Footer>
   </Modal>;
  }
}

module.exports = TypeFastScheduleModal;
