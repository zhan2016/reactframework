import React, { Component } from 'react';
import { Form,FormBuilder} from "react-formio";
import {inject, observer} from "mobx-react";
import {observable} from "mobx";
import _ from 'lodash';
import {Spinner, Button} from 'react-bootstrap'
import {createFormData,updateFormData} from '../../axios/RecordFormAPI';
import RepeatFormModal from './RepeatFormModal'

@inject("CurrentVariable","RecordStore","FormStore")
@observer
class FormShowItem extends Component {
	@observable _repeatViewVisible = false;
	_repeatEventView = ()=>{

	}
	@observable _spinnershow = false;
	_formSubmitted = (value)=>{
		//console.log(this._postdata)

		let dataid = this.props.RecordStore._getCurrentFormDataID;
		let patientid = this.props.RecordStore._getCurrentRecord.patient_id;
		let formid = this.props.RecordStore._getCurrentForm.form_id;
		let isdefault = false;
		if(this.props.RecordStore._getCurrentForm.repeatable)
		{
			isdefault = true;
		}
		let postdata = {
			patient_id:patientid,
			form_id: formid,
			isdefault:isdefault,
			form_data:JSON.stringify(value.data)
		}
	//	console.log(JSON.stringify(postdata))
		if(!dataid)
		{
			createFormData(postdata).then(data=>{
				//console.log(data);
				this._spinnershow = false;
				let formdatalist = this.props.RecordStore._currentFormDataList;
				formdatalist.push(data);
				this.props.RecordStore._setCurrentFormDataID(data.data_id);
				this.props.RecordStore._setCurrentDataSource(data.form_data);
			})
		}
		else
		{
			updateFormData(dataid,postdata).then(data=>{
				let formdatalist = this.props.RecordStore._currentFormDataList;
				let index = formdatalist.findIndex(item=> item.data_id === data.data_id);
				if(index !== -1)
				{
					formdatalist.splice(index, 1, data);
				}
				this.props.RecordStore._setCurrentDataSource(data.form_data);
				this._spinnershow = false;
			})
		}
		this._spinnershow = true;

	}
	render() {
		let currentform = this.props.RecordStore._getCurrentForm;
    return (
      <div>
		  {
		  	this._spinnershow?<Spinner animation="border" role="status">
				<span className="sr-only">Loading...</span>
			</Spinner>:null
		  }
		  {currentform && currentform.repeatable ? <Button onClick = {()=>{this._repeatViewVisible = true}}>管理重复事件</Button>:null}
		  {
			  !_.isEmpty(this.props.RecordStore._currentFormSource) ?
				  (<Form form={this.props.RecordStore._currentFormSource} onSubmit={this._formSubmitted} submission={{ data : (this.props.RecordStore._getCurrentDataSource?this.props.RecordStore._getCurrentDataSource:{})}}/>):
				  <div>去设计表单吧</div>
		  }
		  <RepeatFormModal visible={this._repeatViewVisible} onclose={()=>{this._repeatViewVisible = false;}} onsave={()=>{this._repeatViewVisible = false;}}/>
			</div>
    );
  }
}

export default FormShowItem;
