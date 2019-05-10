import React, {Component} from 'react';
import {Form, FormGroup, FormControl, Button, Col,Row } from 'react-bootstrap';
import FormStore from '../../state/FormStore'
import { Provider,observer} from "mobx-react";
import { FormEdit,FormBuilder} from "react-formio";
import {createForm,updateForm} from '../../axios/FormAPI'
import {inject} from "mobx-react/index";
import '../../css/FormDesigner.scss';
import _ from 'lodash';

@inject("CurrentVariable","FormStore")
@observer
class FormDesigner extends Component {
	  _onSaveFormClick = ()=>{
	  	let currentDesignForm = this.props.FormStore._getCurrentDesignForm;
			if(this._formjson && currentDesignForm)
			{
				if(currentDesignForm.form_id === "placeholder")
				{
					console.log('请选择表单');
					return;
				}
				updateForm(currentDesignForm.form_id,{
					form_attrs:JSON.stringify(this._formjson),
				}).then((data)=>{

				})
			}
		};
	  _onListChange = (selectList)=>{
	  	console.log(selectList.target.value);
			this.props.FormStore._setCurrentDesignForm(selectList.target.value);
		};

    render() {
	  	  let formList = this.props.CurrentVariable._getFormList;
	  	  let fromStructure;
	  	  if(_.isEmpty(this.props.FormStore._getCurrentDesignForm.form_attrs))
				{
					fromStructure = {display:'form'}
				}
				else
				{
					fromStructure = JSON.parse(this.props.FormStore._getCurrentDesignForm.form_attrs);
				}
				console.log(this.props.FormStore._getCurrentDesignForm.form_id);
        return (
            <div>
							<div className={"formdesigntoolbarContainer"}>
								<div className={"formdesigntoolbarSelect"}>
									<div className={"formselectContainer"}>
									<Form.Control
										as="select"
										name="country"
										value={this.props.FormStore._getCurrentDesignForm.form_id? this.props.FormStore._getCurrentDesignForm.form_id:"placeholder"}
										ref={ el => this.selectForm =el }
										onChange={this._onListChange}

									>
										<option value={"placeholder"}>choose...</option>
										{
											formList && formList.length > 0 ?(formList.map(form =>{return <option value={form.form_id}>{form.form_name}</option>})):null
										}
									</Form.Control>
									</div>
								</div>
								<div className={"formdesigntoolbarFormBaseInfo"}>
									表单基本信息
								</div>
								<div className={"formdesigntoolbarFormSaveBtn"}>
								<Button onClick={this._onSaveFormClick}>保存表单</Button>
								</div>
							</div>
							<div>
								 <FormBuilder form={fromStructure} onChange={(schema) => {this._formjson = schema;}} options={{
									 language: 'ch',
									 i18n: {
										 en: {
											 'Submit': 'Complete'
										 },
										 ch: {
											 'Basic Components': '基础控件',
											 'Advanced': '高级控件',
											 'Layout' : '布局组件',
											 'Data':'数据',
											 'Page':'页面',
											 'Text Field':'文本',
											 'Number':'数值',
											 'Password':'密码',
											 'Text Area':'文本区',
											 'Checkbox':'选项',
											 'Select Boxes':'选择盒子',
											 'Time':'时间',
											 'Select':'下拉选择',
											 'Radio':'单选',
											 'Content':'内容区',
											 'Button':'按钮',
											 'Email':'邮箱',
											 'Component':'组件',
											 'Url':'网址',
											 'Phone Number':'电话号码',
											 'Date / Time':'日期/时间',
											 'Day':'日期',
											 'Modal Edit':'弹出编辑框',
											 'Tags':'标签',
											 'Currency':'货币',
											 'Address Field':'地址字段',
											 'HTML Element':'网页元素',

											 'Resources':'资源',
											 'File':'文件',
											 'Nested Form':'嵌套表单',
											 'Signature':'手写签名',
											 'Survey':'调查问卷题',

											 required : '{{field}} es requerido.',
											 invalid_email: '{{field}} debe ser un correo electrónico válido.',
											 error : 'Por favor, corrija los siguientes errores antes de enviar.',
										 }
									 },
								 	icons: 'fontawesome'
								 }}/>
							</div>
            </div>
        );
    }
}

export default FormDesigner;
