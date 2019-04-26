import React, {Component} from 'react';
import { findDOMNode } from 'react-dom';
import { Button, FormLabel, Form, Row, Col } from 'react-bootstrap';
import '../css/LoginView.scss'
import {inject, observer} from "mobx-react";
import {withRouter} from "react-router-dom";
import {LoginAPI,setToken} from '../axios/LoginAPI';


@inject("AuthStore")
@observer
@withRouter
class LoginView extends Component {
    handleSubmit = async (event) => {
        const username = findDOMNode(this.refs.username);
        const password = findDOMNode(this.refs.password);
        const rememberme = findDOMNode(this.refs.remember);
        const creds = { username: username.value.trim(), password: password.value.trim() }
        //this.props.onLoginClick(creds)
        //console.log(creds);
        LoginAPI(creds).then( (authData) => {
            //console.log(JSON.stringify(authData));
            setToken(authData.token);
            this.props.AuthStore.loginSuccessInfo(authData);
            this.props.history.push('/study');

        })

    }

    render() {
        const {errorMessage} = this.props;

        return (
            <div className={"loginviewContainer"}>
            <Form>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>用户名/邮箱</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" ref="username" />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>密码</Form.Label>
                    <Form.Control type="password" placeholder="Password" ref="password"/>
                </Form.Group>
                <Form.Group controlId="formBasicChecbox">
                    <Form.Check type="checkbox" label="记住我" ref="remember"/>
                </Form.Group>
                <Row>
                    <Col>
                        <Button variant="primary" type="submit" onClick={(event) => this.handleSubmit(event)}>
                            提交
                        </Button>
                    </Col>
                    <Col>
                        <Button variant="primary"  onClick={(event) => this.props.history.push('/register')}>
                            注册
                        </Button>
                    </Col>
                </Row>
            </Form>
        </div>
        )
    }
}

export default LoginView;