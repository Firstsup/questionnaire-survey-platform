import React, {Component} from 'react';
import { Input, Space } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { UserOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import {BrowserRouter, Route} from "react-router-dom";


class Login extends React.Component {
    constructor(props) {
      super(props);
      this.state = {userName: '',
                    userPassword:'',
                    userPasswordAgain:''
    };
  
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    handleChange(event) {
      this.setState({value: event.target.userName});
    }
  
    handleSubmit(event) {
      alert(  this.userName.value + '，恭喜您注册成功!');
      event.preventDefault();
    }
  
    render() {
      return (
        <BrowserRouter>
         
        <form onSubmit={this.handleSubmit}>
         
         <Input placeholder="登录页面" prefix={<UserOutlined /> } value={this.state.userName} onChange={this.handleChange}/>
         
         <Space direction="vertical">
    <Input.Password placeholder="input password" value={this.state.userPassword} onChange={this.handleChange}/>
    <Input.Password
      placeholder="input password" value={this.state.userPasswordAgain} onChange={this.handleChange}
      iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
    />
  </Space>,
         
  <Button type="submit" block>
      注册
    </Button>
         
    <Button type="link">登录已有账号</Button>
         
         
        </form>
        </BrowserRouter>
      );
    }
  
  }


export default Login
