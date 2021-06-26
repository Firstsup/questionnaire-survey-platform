import React, {Component} from 'react';
import { Input, Space } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { UserOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import {BrowserRouter, Route} from "react-router-dom";
import Login from '../../Login/jsx/Login';


class Register extends React.Component {
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

         <Space direction="vertical">
          <Input type="text" placeholder="请输入账号" prefix={<UserOutlined /> } value={this.state.userName} onChange={this.handleChange}/>   
    <Input.Password placeholder="请输入密码" value={this.state.userPassword} onChange={this.handleChange}/>
    <Input.Password
      placeholder="请再次确认密码" value={this.state.userPasswordAgain} onChange={this.handleChange}
      iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
    />
    <button type="submit">注册</button>

<Route path="/src/pages/Login/jsx/Login" component={Login} />
 
  </Space>
         
  
         
         
        </form> 
             </BrowserRouter>
      )
 
    }
}
  



export default Register
