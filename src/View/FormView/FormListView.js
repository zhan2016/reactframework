import React, { Component } from 'react';
import {ListGroup, Button, ButtonToolbar, OverlayTrigger, Tooltip} from 'react-bootstrap';
import {inject, observer} from "mobx-react/index";
import _ from 'lodash';
import {getStudyFormList} from '../../axios/FormAPI'
import '../../css/FormListView.scss';
import Confirm from 'react-confirm-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus,faTrash,faPencilAlt,faEye } from '@fortawesome/free-solid-svg-icons';
import FormModal from './FormModal';
import HashHistory from "../BrowserHistory";

@inject("CurrentVariable","FormStore")
@observer
class FormListView extends Component {
	_onConfirm = (formid) =>{
				console.log(formid);
	}
	_addForm = ()=>{
		this.props.FormStore._ShowModalWithInit();
	}
	_editForm = (form)=>{
		this.props.FormStore._ShowModalWithInit(form);
	};
	_designForm = (form)=>{
		this.props.FormStore._setCurrentDesignForm(form.form_id);
		this.props.CurrentVariable._setActiveKey('form');
	}
  render() {
		let fromList = this.props.CurrentVariable._getFormList;
    return (
      <div>
				<div className={"formlistToolbar"}>
					<ButtonToolbar>
						<Button onClick={this._addForm}><FontAwesomeIcon icon={faPlus} /></Button>
					</ButtonToolbar>
				</div>
				<div>
					<ListGroup>
						{
							fromList && fromList.length > 0 ? fromList.map(form=>{
								return <ListGroup.Item>
									<div  className={"formlistContainer"}>
										<div className={"formcontent"}>
											<div className={"formInnerInfo"}>
											<span className={"formInnerInfopos"}>{form.form_pos}</span>
											<span className={"formInnerInfoname"}>{form.form_name}</span>
												<span className={"formInnerdesc"}>{form.form_des}</span>
											</div>
										</div>
									<div className={"formitemTool"}>
										<ButtonToolbar>
											<OverlayTrigger  placement="top" overlay={<Tooltip id={`tooltip-modifyinfo`}>
												修改信息
											</Tooltip>}>
											<Button onClick={()=>{this._editForm(form)}} variant="outline-dark"><FontAwesomeIcon icon={faPencilAlt}/></Button>
											</OverlayTrigger>
											<OverlayTrigger  placement="top" overlay={<Tooltip id={`tooltip-designinfo`}>
												设计表单
											</Tooltip>}>
											<Button onClick={()=>this._designForm(form)} variant="outline-dark"><FontAwesomeIcon icon={faEye}/></Button>
											</OverlayTrigger>
											<OverlayTrigger  placement="top" overlay={<Tooltip id={`tooltip-delinfo`}>
												删除
											</Tooltip>}>
											<Button variant="outline-dark"><FontAwesomeIcon icon={faTrash}/></Button>
											</OverlayTrigger>
										</ButtonToolbar>
									</div>
									</div>
								</ListGroup.Item>
							}):null
						}
					</ListGroup>
				</div>
				<FormModal />
			</div>
    );
  }
}

export default FormListView;
