import React, {Component} from 'react';
import {Row,Col} from 'react-bootstrap';
import  ControlListView from './ControlListView';
import CtrlInstanceView from './CtrlInstanceView'
import FormStore from '../../state/FormStore'
import { Provider,observer} from "mobx-react";


let formStore = new FormStore();

@observer
class FormMainLayout extends Component {
    render() {
        return (
            <Provider FormStore = {formStore}>
            <div>
               <Row>
                   <Col sm={3}>
                       <ControlListView />
                   </Col>
                   <Col sm={9}>
                       <CtrlInstanceView />
                   </Col>

               </Row>
            </div>
            </Provider>
        );
    }
}

export default FormMainLayout;