import React, {Component} from 'react';
import { Input } from 'antd';
import { UserOutlined } from '@ant-design/icons';

class Login extends React.Component{

render(){
  return(
  <form>
    <Input size="large" placeholder="large size" prefix={<UserOutlined />} />
    <br />
    <br />
    <Input placeholder="default size" prefix={<UserOutlined />} />
    <br />
    <br />
    <Input size="small" placeholder="small size" prefix={<UserOutlined />} />
  </form>,
  mountNode
 
  )
  }
}


