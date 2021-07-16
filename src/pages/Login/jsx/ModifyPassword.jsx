import React, {Component} from 'react';
import {Input, Button, Form, Typography, message} from 'antd';
import '../css/ResetPassword.css';

const {Title} = Typography;

class ModifyPassword extends Component {
    onFinish = (values) => {
        const params = {
            "user": values.username,
            "originPwd": values.oripassword,
            "newPwd": values.password
        };
        fetch('/api/changePwd', {
            method: 'post',
            body: JSON.stringify(params),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        }).then(res => res.json())
            .then(res => {
                console.log(res)
                if (res.code === 1) {
                    message.success("密码修改成功！")
                    setTimeout(() => {
                        this.props.history.push('/showallquestionnaire')
                    }, 1500)
                } else if (res.code === 0) {
                    message.error("用户不存在，请重新输入！")
                } else {
                    message.error("原密码不正确，请重新输入！")
                }
            })
    }

    render() {
        return (
            <>
                <Title className={"reset_title"} level={1}>正&nbsp;版&nbsp;问卷星</Title>
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
                        name="oripassword"
                        label={"原密码"}
                        rules={[
                            {
                                required: true,
                                message: '请输入原密码！',
                            },
                            ({getFieldValue}) => ({
                                validator(_, value) {
                                    if (!value || (getFieldValue('oripassword').length >= 4 && getFieldValue('oripassword').length <= 16)) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('密码长度应为4-16位！'));
                                },
                            }),
                        ]}>
                        <Input.Password/>
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


export default ModifyPassword