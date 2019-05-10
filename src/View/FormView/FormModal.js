import React, { Component } from 'react';
import {Button, Col, Form, Modal, Row} from "react-bootstrap";
import {Formik,FieldArray,Field} from "formik";
import {inject, observer} from "mobx-react/index";
import * as yup from "yup";
import {updateForm,createForm,updateIndex} from "../../axios/FormAPI";
import _ from 'lodash';


@inject("FormStore","CurrentVariable")
@observer
class FormModal extends Component {
	_handleColse = ()=>{
			this.props.FormStore._changeFieldModalVisible(false);
	}
	_getModalTitle = ()=>{
		let forminit = this.props.FormStore._formModalInit;
			if(forminit && Object.keys(forminit).length > 0)
			{
				return `修改${forminit.form_name}`;
			}
			else
			{
				return `新建步骤`;
			}
	};
	getListIndex = ()=>{
		let formList = this.props.CurrentVariable._getFormList;
		if(formList && formList.length > 0)
		{
			let formindex = [];
			formList.map((formitem,index)=>{
				formitem.form_pos = index;
				formindex.push({form_id:formitem.form_id, form_pos:index});
			});
			//console.log(`999999999999999999999`  + JSON.stringify({formindexlist:formindex}));
			return JSON.stringify({formindexlist:formindex});
		}
		else
		{
			return null;
		}
	}
	_submit = (values) =>
	{
		let forminit = this.props.FormStore._formModalInit;
		console.log(values);
		if(!_.isEmpty(forminit))
		{
			//存在初始值
			if(values.form_pos === forminit.form_pos)
			{
				//没有更新位置, update数据就行了
				updateForm(forminit.form_id, values).then((data)=>{
					this.props.CurrentVariable.updateSpecifyformItem(data);
					this.props.FormStore._changeFieldModalVisible(false);
				})
			}
			else
			{
				//需要更新位置
				updateForm(forminit.form_id, values).then((data)=>{
					this.props.CurrentVariable.updateWithPosChange(forminit, data);
					let updateindex = this.getListIndex();
					if(updateindex)
					{
						updateIndex(updateindex).then(data=>{
							//console.log(data);
							this.props.FormStore._changeFieldModalVisible(false);
						})
					}
				});

			}
		}
		else
		{
			//不存在初始值，新建表单
			//console.log(values.form_pos === this.props.CurrentVariable._getFormList.length.toString())
			if(this.props.CurrentVariable._getFormList.length === 0 || values.form_pos === this.props.CurrentVariable._getFormList.length.toString())
			{
				//不需要更新位置
				createForm(Object.assign(values, {study_id:this.props.CurrentVariable.getCurrentStudyId})).then((data)=>{
					this.props.CurrentVariable.pushFormItem(data);
					this.props.FormStore._changeFieldModalVisible(false);
				})
			}
			else
			{
				//需要新建表单，且更新位置
				createForm(Object.assign(values, {study_id:this.props.CurrentVariable.getCurrentStudyId})).then((data)=>{
					this.props.CurrentVariable.createSpecifyformItem(data);
					let updateindex = this.getListIndex();
					if(updateindex)
					{
						updateIndex(updateindex).then(data=>{
							//console.log(data);
							this.props.FormStore._changeFieldModalVisible(false);
						})
					}
				})

			}

		}
		//console.log(JSON.stringify(values));
	}
	_getPosList = ()=>{
		let formlist = this.props.CurrentVariable._getFormList;
		if(!formlist || formlist.length === 0)
		{
			return [{label:'最上面',pos:0}]
		}
		let poslist = [];
		poslist.push({label:'最上面', pos:0});
		formlist.map((form,index) =>{
				poslist.push({label:`${form.form_name}之后`,pos:index + 1})
		})
		return poslist;
	}
	_getFormComponnet = ()=>{
		let forminit = this.props.FormStore._formModalInit;
		const schema = yup.object({
			form_name: yup.string().required(),
			form_pos: yup.string().required(),
		});
		let initvalue = forminit;
		let posList = this._getPosList();
		return (<Formik
			validationSchema={schema}
			onSubmit={this._submit}
			initialValues={{
				form_name: !_.isEmpty(initvalue)? initvalue.form_name:"",
				form_pos:  !_.isEmpty(initvalue) ? initvalue.form_pos:(posList? posList[0].pos:0),
				form_des: !_.isEmpty(initvalue) ? (initvalue.form_des):"",
			}}
		>
			{({
					handleSubmit,
					handleChange,
					values,
					touched,
					errors,
				}) => (
				<Form noValidate onSubmit={handleSubmit}>
					<Form.Group as={Row}  controlId="selectpos">
						<Form.Label column sm="4">表单位置</Form.Label>
						<Col sm="8">
							<Form.Control
								as="select"
								name="form_pos"
								value={values.form_pos}
								onChange={handleChange}
								isValid={touched.form_pos && !errors.form_pos}
								feedback={"选择位置"}
							>
								{
									posList && posList.length > 0?(posList.map(dic=>{return <option value={dic.pos}>{dic.label}</option>})):null
								}
							</Form.Control>
						</Col>
					</Form.Group>
					<Form.Group as={Row}  controlId="textname">
						<Form.Label column sm="4">表单名称</Form.Label>
						<Col sm="8">
							<Form.Control
								type="text"
								name="form_name"
								value={values.form_name}
								onChange={handleChange}
								isInvalid={!!errors.form_name}
								feedback={errors.form_name}
							>
							</Form.Control>
						</Col>
					</Form.Group>
					<Form.Group as={Row}  controlId="textdes">
						<Form.Label column sm="4">表单描述</Form.Label>
						<Col sm="8">
							<Form.Control
								type="text"
								name="form_des"
								value={values.form_des}
								onChange={handleChange}
								isValid={touched.form_des && !errors.form_des}
							/>
						</Col>
					</Form.Group>
					<Button variant="primary" type="submit" >保存</Button>
				</Form>
			)}
		</Formik>)
	}
  render() {
    return (
      <div>
				<Modal show={this.props.FormStore._getModalVisible} onHide={this._handleColse}>
					<Modal.Header closeButton>
						<Modal.Title>{this._getModalTitle()}</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						{this._getFormComponnet()}
					</Modal.Body>
				</Modal>
			</div>
    );
  }
}

export default FormModal;
