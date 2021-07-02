import React, {Component} from 'react';
import { Row, Col,Button,Space } from 'antd';
import { PlusCircleTwoTone,PlusSquareTwoTone, EditTwoTone} from '@ant-design/icons';
import addRadio from './addRadio';



class SideBar extends React.Component {

  constructor(p) {
    super(p);
    this.state = {};

    // 为了在回调中使用 `this`，这个绑定是必不可少的
    this.handleClick = this.handleClick.bind(this);
  }


  handleClick = (event) => {
    const target = event.target;
      const name = target.name;
    switch (name) {
      case "addRadio":
        //  alert('hi'); 
         return <addRadio></addRadio>;
        break;
      
      case "addCheckbox":
        alert('调用添加多选题class');
        break;
      case "addText":
        alert('调用添加文本题class');
        break;
  
    }
  }

  

render(){
return(
    <div>
    <div >
      添加题目
      

    </div>

    <Row>
    <Space direction="vertical">
       
        <button type="primary" name="addRadio" onClick={this.handleClick} ><i><PlusCircleTwoTone /></i>
          添加单选题</button>
          <button type="primary" name="addCheckbox" onClick={this.handleClick}><i><PlusSquareTwoTone /></i>
          添加多选题</button>
          <button type="primary" name="addText" onClick={this.handleClick}><i><EditTwoTone /> </i>
          添加单行文本题</button>
        
        
     </Space>

    
    </Row>
    </div>

  
);
}

}
export default SideBar
