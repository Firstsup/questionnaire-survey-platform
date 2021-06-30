import React, {Component} from 'react';
import { Row, Col,Button,Space } from 'antd';
import { PlusCircleTwoTone,PlusSquareTwoTone, EditTwoTone} from '@ant-design/icons';

/*
const subjects = [{
    name: '单选题',
    type: 'radio',
    icon: '',
  }, 
   {
    name: '多选题',
    type: 'checkbox',
    icon: '',
  }, 
   {
    name: '单行文本题',
    type: 'text',
    icon: '',
  } ]
  */





  /*
  constructor(props) {
        super(props);
        this.state = {
      };
    
        this.handleChange = this.handleChange.bind(this);
     
      }
      */
class SideBar extends React.Component {

render(){
return(
    <div>
    <div >
      添加题目
      

    </div>

    <Row>
    <Space direction="vertical">
       
        <Button type="primary"><i><PlusCircleTwoTone /></i>
          添加单选题</Button>
          <Button type="primary"><i><PlusSquareTwoTone /></i>
          添加多选题</Button>
          <Button type="primary"><i><EditTwoTone /> </i>
          添加单行文本题</Button>
        
        
     </Space>

    
    </Row>
    </div>

  
);
}

}
export default SideBar
