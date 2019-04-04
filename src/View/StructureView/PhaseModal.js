import React from  'react';
import {Modal,Button,Form,Row,Col, InputGroup} from 'react-bootstrap'
import {inject, observer} from "mobx-react/index";
import {Formik} from 'formik';
import * as yup from 'yup';
import LO from 'lodash'

@inject("StructStore")
@observer
class  PhaseModal  extends  React.Component{
	handleClose = ()=>{
		this.props.StructStore._phasestore._phaseModalVisible = false;
	}
	_getmodalTitle = ()=>
	{
		const initvalue = this.props.StructStore._phasestore._getPhaseInitValue;
		//console.log(`初始化值:${initvalue}`);
		if(initvalue && initvalue._name)
		{
			return `编辑组"${initvalue._name}"`;
		}
		else
		{
			return "添加组"
		}
	}
	_submit = (values)=>{
		let initvalue = LO.cloneDeep(this.props.StructStore._phasestore._getPhaseInitValue);
		if(initvalue && initvalue._name)
		{
			initvalue._position = values.position;
			initvalue._name = values.name;
			initvalue._duration = values.duration;
			this.props.StructStore._phasestore.updatePhase(initvalue)
		}
		else
		{
			this.props.StructStore._phasestore.addPhase(values);
			//console.log(values);
		}
	}
	_getFormComponnet = ()=>{
		const schema = yup.object({
			position: yup.string().required(),
			name: yup.string().required(),
		});
		let phasestore = this.props.StructStore._phasestore;
		let posList = phasestore.getPhasesSelect();
		const initvalue = phasestore._getPhaseInitValue;
			return (<Formik
				validationSchema={schema}
				onSubmit={this._submit}
				initialValues={{
					position: initvalue? initvalue._position:0,
					name: initvalue ? initvalue._name:"",
					duration:initvalue ? initvalue._duration:"",
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
									posList && posList.length > 0 ? posList.map(item=>{
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
								<Form.Label  column sm="4">持续时间</Form.Label>
								<Col>
								<Form.Control
									type="text"
									name="duration"
									value={values.duration}
									onChange={handleChange}
									isValid={touched.duration && !errors.duration}
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
			<Modal show={this.props.StructStore._phasestore._phaseModalVisible} onHide={this.handleClose}>
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

export  default  PhaseModal;