import React, {Component} from 'react';
import {Modal,Button} from 'react-bootstrap';
import {inject, observer} from "mobx-react";

@inject("FormStore")
@observer
class FieldModal extends Component {
    render() {
        return (
            <div>
                <Modal
                    size={'lg'}
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                    show={this.props.FormStore._getModalVisible}
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            添加字段
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        改变在这里发生
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.props.onHide} >Save</Button>
                        <Button onClick={this.props.onHide}>Save and another</Button>
                        <Button onClick={()=>{this.props.FormStore._changeFieldModalVisible(false)}} variant="secondary">Close</Button>
                    </Modal.Footer>
                </Modal>

            </div>
        );
    }
}

export default FieldModal;