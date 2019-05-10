import React, { Component } from 'react';
import {Modal} from 'react-bootstrap';
class ConfirmModal extends Component {
  render() {
  	const {title,body, cancelText, confirText, cancelClick,} = this.props;
    return (
      <div>
				<Modal.Dialog>
					<Modal.Header closeButton>
						<Modal.Title>Modal title</Modal.Title>
					</Modal.Header>

					<Modal.Body>
						<p>Modal body text goes here.</p>
					</Modal.Body>

					<Modal.Footer>
						<Button variant="secondary">Close</Button>
						<Button variant="primary">Save changes</Button>
					</Modal.Footer>
				</Modal.Dialog>
			</div>
    );
  }
}

export default ConfirmModal;
