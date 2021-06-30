import React, {Component} from 'react';
import { Row, Col,Button,Space } from 'antd';
import { PlusCircleTwoTone,PlusSquareTwoTone, EditTwoTone} from '@ant-design/icons';
import addRadio from './addRadio';



class SideBar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {isToggleOn: true};

    // 为了在回调中使用 `this`，这个绑定是必不可少的
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick = (name) => {
    switch (name) {
      case "addRadio":
        //return addRadio;
       alert('调用添加单选题class');
      case 'addCheckbox':
        return 'icon-duoxuan-icon';
      case 'addText':
        return 'icon-duohangicon';
  
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
       
        <Button type="primary" name="addRadio" onClick= {this.handleClick} ><i><PlusCircleTwoTone /></i>
          添加单选题</Button>
          <Button type="primary" name="addCheckbox" onClick={this.handleClick}><i><PlusSquareTwoTone /></i>
          添加多选题</Button>
          <Button type="primary" name="addText" onClick={this.handleClick}><i><EditTwoTone /> </i>
          添加单行文本题</Button>
        
        
     </Space>

    
    </Row>
    </div>

  
);
}

}
export default SideBar
