import React, {Component} from 'react';
import {inject, observer} from "mobx-react";
import {observable} from "mobx";
import _ from "lodash";
import {createRecord, updateRecord} from "../../axios/RecordAPI";
import * as yup from "yup";
import {Formik} from "formik";
import {Button, Col, Form, Modal, Row} from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment'
@inject("RecordStore","CurrentVariable")
@observer
class RecordModal extends Component {
    @observable _datetime;
    _handleColse = ()=>{
        this.props.RecordStore._changeFieldModalVisible(false);
    }
    _getModalTitle = ()=>{
        let forminit = this.props.RecordStore._recordModalInit;
        if(forminit && Object.keys(forminit).length > 0)
        {
            return `修改${forminit.patient_name}`;
        }
        else
        {
            return `新建病人`;
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
        let forminit = this.props.RecordStore._recordModalInit;
        console.log(values);
        if(!_.isEmpty(forminit))
        {
            //存在初始值 update数据
            updateRecord(forminit.patient_id, values).then((data)=>{
                    this.props.CurrentVariable._updateRecord(data);
                     this.props.RecordStore._changeFieldModalVisible(false);
                })
        }
        else
        {
            //不存在初始值，新建表单
            //console.log(values.form_pos === this.props.CurrentVariable._getFormList.length.toString())
                createRecord(Object.assign(values, {study_id:this.props.CurrentVariable.getCurrentStudyId})).then((data)=>{
                    this.props.CurrentVariable._addRecord(data);
                    this.props.RecordStore._changeFieldModalVisible(false);

                })

        }
        //console.log(JSON.stringify(values));
    }
    _handleChangeS=(event)=>{
        event.preventDefault();
        event.stopPropagation();
        this._datetime =  event.target.value;
    }
    _getFormComponnet = ()=>{
        let forminit = this.props.RecordStore._recordModalInit;
        const schema = yup.object({
            patient_name: yup.string().required(),
            patient_birthdata: yup.string().required(),
        });
        let initvalue = forminit;
        return (<Formik
            validationSchema={schema}
            onSubmit={this._submit}
            initialValues={{
                patient_selfid: !_.isEmpty(initvalue)? initvalue.patient_selfid:"",
                patient_name: !_.isEmpty(initvalue)? initvalue.patient_name:"",
                patient_sex:  !_.isEmpty(initvalue) ? initvalue.patient_sex:0,
                patient_birthdata: !_.isEmpty(initvalue) ? (initvalue.patient_birthdata):"3-1-2014",
                patient_phonenum:!_.isEmpty(initvalue) ? (initvalue.patient_phonenum):"",
                patient_email:!_.isEmpty(initvalue) ? (initvalue.patient_email):"",
                patient_identity:!_.isEmpty(initvalue) ? (initvalue.patient_identity):"",

            }}
        >
            {({
                  handleSubmit,
                  handleChange,
                  values,
                  touched,
                  errors,
                  setFieldValue
              }) => (
                <Form noValidate onSubmit={handleSubmit}>
                    <Form.Group as={Row}  controlId="selectpos">
                        <Form.Label column sm="4">编号</Form.Label>
                        <Col sm="8">
                            <Form.Control
                                type="text"
                                name="patient_selfid"
                                value={values.patient_selfid}
                                onChange={handleChange}
                                isValid={touched.patient_selfid && !errors.patient_selfid}
                            />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row}  controlId="textdes">
                        <Form.Label column sm="4">姓名</Form.Label>
                        <Col sm="8">
                            <Form.Control
                                type="text"
                                name="patient_name"
                                value={values.patient_name}
                                onChange={handleChange}
                                isValid={touched.patient_name && !errors.patient_name}
                            />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row}  controlId="selectpos">
                        <Form.Label column sm="4">性别</Form.Label>
                        <Col sm="8">
                            <Form.Control
                                as="select"
                                name="patient_sex"
                                value={values.patient_sex}
                                onChange={handleChange}
                                isValid={touched.patient_sex && !errors.patient_sex}
                                feedback={"选择位置"}
                            >
                                <option value={1}>男</option>
                                <option value={0}>女</option>
                            </Form.Control>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row}  controlId="textdes">
                        <Form.Label column sm="4">出生日期</Form.Label>
                        <Col sm="8">
                            <DatePicker
                                readOnly={false}
                                isClearable={true}
                                name={'patient_birthdata'}
                                value={values.patient_birthdata}
                                onChange={e => {console.log(`${JSON.stringify(e)}`); setFieldValue('patient_birthdata',moment(e).format('YYYY-MM-DD'))}}
                            />

                        </Col>
                    </Form.Group>
                    <Form.Group as={Row}  controlId="textdes">
                        <Form.Label column sm="4">身份证</Form.Label>
                        <Col sm="8">
                            <Form.Control
                                type="text"
                                name="patient_identity"
                                value={values.patient_identity}
                                onChange={handleChange}
                                isValid={touched.patient_identity && !errors.patient_identity}
                            />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row}  controlId="textdes">
                        <Form.Label column sm="4">手机号</Form.Label>
                        <Col sm="8">
                            <Form.Control
                                type="text"
                                name="patient_phonenum"
                                value={values.patient_phonenum}
                                onChange={handleChange}
                                isValid={touched.patient_phonenum && !errors.patient_phonenum}
                            />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row}  controlId="textdes">
                        <Form.Label column sm="4">邮箱地址</Form.Label>
                        <Col sm="8">
                            <Form.Control
                                type="email"
                                name="patient_email"
                                value={values.patient_email}
                                onChange={handleChange}
                                isValid={touched.patient_email && !errors.patient_email}
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
                <Modal show={this.props.RecordStore._getModalVisible} onHide={this._handleColse}>
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

export default RecordModal;