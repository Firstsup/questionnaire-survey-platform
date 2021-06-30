import React, {Component} from 'react';
import { Row, Col } from 'antd';
import { PlusCircleTwoTone } from '@ant-design/icons';

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
    <Row>
      <Col flex={2}>添加题目
      </Col>

    </Row>

    <Row>
      <col flex={2}>
        <div>
        <Button type="primary"><i><PlusCircleTwoTone /></i>
          添加单选题</Button>
          
        </div>
      </col>
    </Row>
    </div>

  
);
}

}
