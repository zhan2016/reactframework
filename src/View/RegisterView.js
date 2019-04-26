import React, {Component} from 'react';
import {Button, Form} from "react-bootstrap";
import  '../css/RegisterView.scss';

class RegisterView extends Component {
    handleSubmit = (event)=>
    {

    }
    render() {
        return (
            <div className={"registerviewContainer"}>
                <Form>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>用户名</Form.Label>
                        <Form.Control  placeholder="用户名" ref="username" />
                    </Form.Group>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>邮箱</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" ref="username" />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>密码</Form.Label>
                        <Form.Control type="password" placeholder="Password" ref="password"/>
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>确认密码</Form.Label>
                        <Form.Control type="password" placeholder="Password" ref="password"/>
                    </Form.Group>
                    <Button variant="primary" type="submit" onClick={(event) => this.handleSubmit(event)}>
                        提交
                    </Button>
                </Form>
            </div>
        );
    }
}

export default RegisterView;