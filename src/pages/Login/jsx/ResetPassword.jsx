import React, {Component} from 'react';
import { Input, Space,InputNumber,Button } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { UserOutlined } from '@ant-design/icons';
import {BrowserRouter, Route,Link} from "react-router-dom";
import '../css/Login.css';
import Background from '../picture/LoginPicture.jpg';
//未解决：密码切换可见状态
/*改密码页面，需要和后端交互的部分：
输入用户名 userName，密码凭证 phoneNumber，新密码 userPasswordNew，若用户名和密码凭证对应则存入新密码，错误则返回错误。
                                        对应的接口：

                                
                                    */    
                                    
                                        
  var sectionStyle = {
  width: "100%",
  height: "950px",
  backgroundImage: `url(${Background})` 
 };
class ResetPassword extends Component {
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

      this.setState({
        [name]: value
      });
    }
  
    handleSubmit(event) {
      const target = event.target;
      const name = target.name;
      const value =target.value;
      if(this.state.userName.length!=0){
      if((this.state.userPassword.length!=0)&&(this.state.userPassword==this.state.userPasswordAgain)&&(this.state.phoneNumber.length==4))
      { //此时向后端提交。核对用户名和凭证。 
        alert(  this.state.userName + '，您的密码正在修改');
         event.preventDefault();
      }
    else 
    {
      if(this.state.userPassword.length==0){
      alert("请输入密码！");
      event.preventDefault();}
      else {if (this.state.userPassword!=this.state.userPasswordAgain){
      alert("密码不一致！");
      event.preventDefault();}
    else if(this.state.phoneNumber.length!=4){

      alert ("密码凭证必须为4位！");
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
     
    
     
       <div style={sectionStyle}>
  
        <form className={"loginform"} >

         <Space direction="vertical" className="resetform" size="large">
        
         <Input name="userName" type="text" size="large" placeholder="请输入账号" prefix={<UserOutlined /> }  onChange={this.handleChange}/> 
         <Input name="phoneNumber" size="large" placeholder="请输入4位密码凭证" onChange={this.handleChange} />
    <Input name="userPassword" size="large" type="string" placeholder="请输入新密码"  onChange={this.handleChange} />
    <Input name="userPasswordAgain" size="large" type="string"
      placeholder="请再次确认新密码"  onChange={this.handleChange}
      />
   

    <Button  type="primary" size="large" block onClick={this.handleSubmit}>确认修改</Button>

    

 
  </Space>
         
  
         
         
        </form> 
        </div>
         
      )
 
    }
}
  



export default ResetPassword