import React, {Component} from 'react';
import {Input, Button, Form, Typography, message} from 'antd';
import '../css/ResetPassword.css';

const {Title} = Typography;

class ResetPassword extends Component {
    onFinish = (values) => {
        const params = {
            "user": values.username,
            "verification": values.check,
            "newPwd": values.password
        };
        fetch('/api/forgetPwd', {
            method: 'post',
            body: JSON.stringify(params),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        }).then(res => res.json())
            .then(res => {
                if (res.code === 1) {
                    message.success("密码重置成功！")
                    setTimeout(() => {
                        this.props.history.push('/login')
                    }, 1500)
                } else if (res.code === 0) {
                    message.error("用户不存在，请重新输入！")
                } else {
                    message.error("验证不正确，请重新输入！")
                }
            })
    }

    render() {
        return (
            <>
                <img className={"login_title"} src={"./qlogo.png"} alt={"logo"}/>
                <Form
                    name="normal_reset"
                    className="reset-form"
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
                    <Form.Item
                        name="password"
                        label={"新密码"}
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
                        label={"确认新密码"}
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
                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="reset-form-button">重置密码</Button>
                    </Form.Item>
                </Form>
            </>
        )
    }
}


export default ResetPassword