import React, {Component} from 'react';
import {Button, Col, Form, Modal, Row} from "react-bootstrap";
import {Formik,FieldArray,Field} from "formik";
import * as yup from "yup";
import {inject, observer} from 'mobx-react';
import {withRouter} from "react-router";
import {countryDic} from "../../axios/StudyAPI";
import LO from "lodash";
import {observable} from "mobx";
import {findDOMNode} from "react-dom";
import { createStudy} from '../../axios/StudyAPI';

@inject("AuthStore")
@observer
@withRouter
class StudyModal extends Component {
    @observable countrydic = undefined;
    _submit = (values) =>
    {
        console.log(JSON.stringify(values));
        let is_test = values.is_test[0];
        if(is_test === 'test' || values.is_test)
        {
            values.is_test = true;
        }
        else
        {
            values.is_test = false;
        }
        let data = {study_name:values.studyname,country_id:values.country, is_test_study:values.is_test,user_id:this.props.AuthStore.getAuthInfo.user.id}
        createStudy(data).then((data)=>{
            this.props.handleClose();
            this.props.onaddStudy();
        })

    }
    componentDidMount()
    {
        countryDic().then((dic)=>{
            if(!LO.isEqual(this.countrydic,dic))
            {
                this.countrydic = dic;
            }
        })
    }
    _getFormComponnet = ()=>{
        const schema = yup.object({

        });
        let initvalue = undefined;
        return (<Formik
            validationSchema={schema}
            onSubmit={this._submit}
            initialValues={{
                studyname: initvalue? initvalue.studyname:"",
                country: initvalue ? initvalue.country:(this.countrydic? this.countrydic[0].country_id:""),
                is_test:initvalue ? (initvalue.is_test?['test']:['normal']):['test'],
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
                    <Form.Group as={Row}  controlId="validationFormik01">
                        <Form.Label column sm="4">研究名称</Form.Label>
                        <Col sm="8">
                            <Form.Control
                                type="text"
                                name="studyname"
                                value={values.study_name}
                                onChange={handleChange}
                                isValid={touched.study_name && !errors.study_name}

                            />
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId="formGridState">
                        <Form.Label column sm="4">选择国家</Form.Label>
                        <Col sm="8">
                            <Form.Control
                                as="select"
                                name="country"
                                value={values.countryid}
                                onChange={handleChange}
                                isValid={touched.countryid && !errors.countryid}

                            >
                                {
                                    this.countrydic && this.countrydic.length > 0?(this.countrydic.map(dic=>{return <option value={dic.country_id}>{dic.country_name}</option>})):null
                                }
                            </Form.Control>
                        </Col>
                    </Form.Group>
                    <fieldset>
                        <Form.Group as={Row}>
                            <Form.Label as="legend" column sm={4}>
                                研究类型
                            </Form.Label>
                            <Col sm={8}>
                                <Row>
                                    <FieldArray
                                    name={'is_test'}
                                    render={ arrayHelpers =>
                                        (
                                        <React.Fragment>
                                        <Col>
                                            <Form.Check
                                                type="radio"
                                                label="测试"
                                                name="is_test"
                                                id="formHorizontalRadios2"
                                                custom
                                                checked={values.is_test[0] === "test"}
                                                onChange={e =>{
                                                    if (e.target.checked)
                                                    {
                                                        values.is_test = [];
                                                        arrayHelpers.push("test");
                                                    }
                                                }}
                                            />
                                        </Col>
                                        <Col>
                                        <Form.Check
                                        type="radio"
                                        label="正式"
                                        name="is_test"
                                        id="formHorizontalRadios3"
                                        custom
                                        checked={values.is_test[0] === "normal"}
                                        onChange={e =>{
                                            if (e.target.checked)
                                            {
                                                values.is_test = [];
                                                arrayHelpers.push("normal");
                                            }
                                        }}
                                        />
                                        </Col>
                                        </React.Fragment>)
                                    }

                                    >
                                    </FieldArray>
                                </Row>
                            </Col>
                        </Form.Group>
                    </fieldset>
                    <Button variant="primary" type="submit" >保存</Button>
                </Form>
            )}
        </Formik>)
    }
    render() {
        return (
            <div>
                <Modal show={this.props.Show} onHide={this.props.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>新建临床研究</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {this._getFormComponnet()}
                    </Modal.Body>
                </Modal>
            </div>
        );
    }
}

export default StudyModal;