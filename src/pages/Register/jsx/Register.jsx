import React, {Component} from 'react';
import { Input, Space } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { UserOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import {BrowserRouter, Route} from "react-router-dom";
import Login1 from '../../Login/jsx/Login1';


class Register extends React.Component {
    constructor(props) {
      super(props);
      this.state = {userName: '',
                    userPassword:'',
                    userPasswordAgain:'',
                    phoneNumber:''
    };
  
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    handleChange(event) {
      const target = event.target;
      const name = target.name;
      const value =target.value;
     /* if(target.name=="userPasswordAgain"){
  
        if(value==this.state.userPassword){
          this.setState({ userPasswordAgain: value });
        
      }
        else 
        alert('密码不一致！请检查密码');
      }
      */
      this.setState({
        [name]: value
      });
    }
  
    handleSubmit(event) {
      alert(  this.state.userName + '，恭喜您注册成功!');
      event.preventDefault();
    }
  

    render() {
       

      return (
 <BrowserRouter>
  
        <form onSubmit={this.handleSubmit}>

         <Space direction="vertical">
        
         <Input name="userName" type="text" placeholder="请输入账号" prefix={<UserOutlined /> } value={this.state.userName} onChange={this.handleChange}/>   
    <Input name="userPassword" placeholder="请输入密码" value={this.state.userPassword} onChange={this.handleChange}/>
    <Input name="userPasswordAgain" 
      placeholder="请再次确认密码" value={this.state.userPasswordAgain} onChange={this.handleChange}
      iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
    />
    <input  name="phoneNumber" placeholder="设置四位数字作为找回密码的凭证" value={this.state.phoneNumber} onChange={this.handleChange}/>

    <button variant="contained" color="primary" type="submit">注册</button>

<Route path="/src/pages/Login/jsx/Login1" component={Login1} />
 
  </Space>
         
  
         
         
        </form> 
             </BrowserRouter>
      )
 
    }
}
  



export default Register
