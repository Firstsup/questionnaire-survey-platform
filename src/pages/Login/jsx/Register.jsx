import React from 'react';
import {Input, Button, Form, Typography, message} from 'antd';
import '../css/Register.css';

const {Title} = Typography;

class Register extends React.Component {
    onFinish = (values) => {
        const params = {
            "user": values.username,
            "pwd": values.password,
            "verification": values.check
        };
        fetch('/api/register', {
            method: 'post',
            body: JSON.stringify(params),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        }).then(res => res.json())
            .then(res => {
                if (res.code === 1) {
                    message.success("注册成功！")
                    setTimeout(() => {
                        this.props.history.push('/login')
                    }, 1500)
                } else {
                    message.error("用户名已存在！")
                }
            })
    }

    render() {
        return (
            <>
                <Title className={"register_title"} level={1}>正&nbsp;版&nbsp;问卷星</Title>
                <Form
                    name="normal_register"
                    className="register-form"
                    onFinish={this.onFinish}>
                    <Form.Item
                        name="username"
                        label={"用户名"}
                        rules={[
                            {
                                required: true,
                                message: '请输入用户名！',
                            },
                            ({getFieldValue}) => ({
                                validator(_, value) {
                                    if (!value || (getFieldValue('username').length <= 10)) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('用户名长度最多为10'));
                                },
                            }),
                        ]}>
                        <Input/>
                    </Form.Item>
                    <Form.Item
                        name="password"
                        label={"密码"}
                        rules={[
                            {
                                required: true,
                                message: '请输入密码！',
                            },
                            ({getFieldValue}) => ({
                                validator(_, value) {
                                    if (!value || (getFieldValue('password').length >= 4 && getFieldValue('password').length <= 16)) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('密码长度应为4-16位！'));
                                },
                            }),
                        ]}>
                        <Input.Password/>
                    </Form.Item>
                    <Form.Item
                        name="repassword"
                        label={"确认密码"}
                        rules={[
                            {
                                required: true,
                                message: '请确认密码！',
                            },
                            ({getFieldValue}) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('密码不一致！'));
                                },
                            }),
                        ]}>
                        <Input.Password/>
                    </Form.Item>
                    <Form.Item
                        name="check"
                        label={"手机尾号后4位"}
                        rules={[
                            {
                                required: true,
                                message: '请输入手机尾号后4位！',
                            },
                            ({getFieldValue}) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('check').length === 4) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('请输入4位数字！'));
                                },
                            }),
                        ]}>
                        <Input/>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="register-form-button">注册</Button>
                    </Form.Item>
                </Form>
            </>
        )
    }
}

export default Register