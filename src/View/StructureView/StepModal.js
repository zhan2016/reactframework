import React, { Component } from 'react';
import {Modal,Button,Form,Row,Col, InputGroup} from 'react-bootstrap'
import {inject, observer} from "mobx-react/index";
import {Formik} from 'formik';
import * as yup from 'yup';
import LO from 'lodash'


@inject("StructStore")
@observer
class StepModal extends Component {
	handleClose = ()=>{
		this.props.StructStore._stepstore._stepModalVisible = false;
	}
	_getmodalTitle = ()=>
	{
		const initvalue = this.props.StructStore._stepstore._stepInitValue;
		//console.log(`初始化值:${initvalue}`);
		if(initvalue && initvalue._name)
		{
			return `编辑步骤"${initvalue._name}"`;
		}
		else
		{
			return "添加步骤"
		}
	};
	_submit = (values)=>{
		let stepstore = this.props.StructStore._stepstore;
		let initvalue = LO.cloneDeep(stepstore._getStepInitValue);
		let phaseIndex = this._posList.findIndex(item => item.pos === values.position);
		if(phaseIndex !== -1)
		{
			let lable = this._posList[phaseIndex].label;
			let lables = lable.split('-');
			values.phaseownid = lables[0];
		}
		if(initvalue && initvalue._name)
		{
			//编辑状态
			initvalue._position = values.position;
			initvalue._name = values.name;
			initvalue._description = values.description;
			initvalue._phaseownid = values.phaseownid;
			stepstore.updateStep(initvalue)
		}
		else
		{
			//新建状态
			stepstore.addStep(values)
		}
	};
	_getStepSelect = ()=>{
		let stepstore = this.props.StructStore._stepstore;
		let initvalue = LO.cloneDeep(stepstore._getStepInitValue);
		if(initvalue && initvalue._name)
		{
			//当前为编辑步骤状态
		}
		else
		{
			//当前为新建步骤模式
			if(!this.props.StructStore._phasestore._currentSelectPhase)
			{
				return this.props.StructStore._getStepsSelectAll();
			}
			else
			{
				return this.props.StructStore._getStepsSelect4phase();
			}
		}
	}
	_getFormComponnet = ()=>{
		const schema = yup.object({
			position: yup.string().required(),
			name: yup.string().required(),
		});
		let stepstore = this.props.StructStore._stepstore;
		this._posList = this._getStepSelect();
		const initvalue = stepstore._getStepInitValue;
		return (<Formik
			validationSchema={schema}
			onSubmit={this._submit}
			initialValues={{
				position: initvalue? initvalue._position:0,
				name: initvalue ? initvalue._name:"",
				description:initvalue ? initvalue._description:"",
			}}
		>
			{({
					handleSubmit,
					handleChange,
					handleBlur,
					values,
					touched,
					isValid,
					errors,
				}) => (
				<Form noValidate onSubmit={handleSubmit}>
					<Form.Group as={Row} controlId="formGridState">
						<Form.Label column sm="4">位置</Form.Label>
						<Col sm="8">
							<Form.Control
								as="select"
								name="position"
								value={values.position}
								onChange={handleChange}
								isValid={touched.position && !errors.position}>
								{
									this._posList && this._posList.length > 0 ? this._posList.map(item=>{
										return <option value={item.pos}>{item.label}</option>
									}) :null
								}
							</Form.Control>
						</Col>
					</Form.Group>
					<Form.Group as={Row}  controlId="validationFormik01">
						<Form.Label column sm="4">名称</Form.Label>
						<Col sm="8">
							<Form.Control
								type="text"
								name="name"
								value={values.name}
								onChange={handleChange}
								isValid={touched.name && !errors.name}
							/>
							<Form.Control.Feedback>Looks good!</Form.Control.Feedback>
						</Col>
					</Form.Group>
					<Form.Group as={Row}  controlId="validationFormik02">
						<Form.Label  column sm="4">描述</Form.Label>
						<Col>
							<Form.Control
								type="text"
								name="description"
								value={values.description}
								onChange={handleChange}
								isValid={touched.description && !errors.description}
							/>
							<Form.Control.Feedback>Looks good!</Form.Control.Feedback>
						</Col>
					</Form.Group>
					<Button type="submit">保存</Button>
				</Form>
			)}
		</Formik>)
	}
	render()
	{
		return(
			<Modal show={this.props.StructStore._stepstore._stepModalVisible} onHide={this.handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>{this._getmodalTitle()}</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					{this._getFormComponnet()}
				</Modal.Body>
			</Modal>
		)
	}

}

export default StepModal;
