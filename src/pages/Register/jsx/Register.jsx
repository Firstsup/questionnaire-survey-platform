import React, {Component} from 'react';
import { Input, Space } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { UserOutlined } from '@ant-design/icons';
// import { Button } from 'antd';
import {BrowserRouter, Route,Link} from "react-router-dom";
import Login1 from '../../Login/jsx/Login1';

/*注册页面，需要和后端交互的部分：
判断后端数据库是否已存在该用户名，若不存在，向后端存入用户名 userName，密码 userPassword，密码凭证 phoneNumber
                                        对应的接口：

                                
                                    */    
class Register extends Component {
    constructor(props) {
      super(props);
      this.state = {userName: '',
                    userPassword:'',
                    userPasswordAgain:'', //userPasswordAgain不用存储到后端，在提交时判断，若一致并且phoneNumber为4位，才把用户名、密码和phoneNumber给后端。
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
      最后决定在点击submit的时候检查*/
      this.setState({
        [name]: value
      });
    }
  
    handleSubmit(event) {
      if(this.state.userName.length!==0){
      if((this.state.userPassword.length!==0)&&(this.state.userPassword===this.state.userPasswordAgain)&&(this.state.phoneNumber.length===4))
      {
        alert(  this.state.userName + '，恭喜您注册成功!');
         event.preventDefault();
      }
    else 
    {
      if(this.state.userPassword.length===0){
      alert("请输入密码！");
      event.preventDefault();}
      else {if (this.state.userPassword!==this.state.userPasswordAgain){
      alert("密码不一致！");
      event.preventDefault();}
    else if(this.state.phoneNumber.length!==4){

      alert ("密码凭证必须为4为！");
      event.preventDefault();
    }
    }
      
      
    }

}
    else alert("请输入用户名！");

      event.preventDefault();
    }
  

    render() {
       

      return (
 <BrowserRouter>
  
        <form onSubmit={this.handleSubmit}>

         <Space direction="vertical">
        
         <Input name="userName" type="text" placeholder="请输入账号" prefix={<UserOutlined /> }  onChange={this.handleChange}/>   
    <Input name="userPassword" type="string" placeholder="请输入密码"  onChange={this.handleChange} iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}/>
    <Input name="userPasswordAgain" type="string"
      placeholder="请再次确认密码"  onChange={this.handleChange}
      iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
    />
    <input  name="phoneNumber" type="number" placeholder="设置四位数字作为找回密码的凭证" onChange={this.handleChange} iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}/>

    <button  color="primary" type="submit">注册</button>

<Route path="/src/pages/Login/jsx/Login1" component={Login1} />
<Link to="/src/pages/Login/jsx/Login1">登录已有帐号 </Link>
 
  </Space>
         
  
         
         
        </form> 
             </BrowserRouter>
      )
 
    }
}
  



export default Register
