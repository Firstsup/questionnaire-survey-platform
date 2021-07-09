import React, {Component} from 'react';
import ReactDOM from "react-dom";
import { Row, Col,Button,Space, Radio, Input,Checkbox} from 'antd';
import { PlusCircleTwoTone,PlusSquareTwoTone, EditTwoTone,CheckOutlined} from '@ant-design/icons';
import {DeleteTwoTone,PlusOutlined}from '@ant-design/icons';
import AddRadio from './addRadio';
import AddCheckbox from './addCheckbox';
import AddText from './AddText';
import { Tag, Divider } from 'antd';







 

 
  

class CreatPage1 extends  React.Component {
   constructor(props) {
        super(props);
        this.state = {userName: '蓝百灵',
                      questionnaireId:123,
                      questionnaireTitle:'',
                      //questionnaireCount:0,
                      questionnaireSign:0,
                        asknum:0,
                        askList:[]
      };
       
       // this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        
      }
      
      handleDelete(event){
        alert("点击删除");
        //删除应该是组件发出请求，CreatPage的askList数组中删掉这一个元素 难点：拖拽元素改变顺序，数组索引怎么办
       /* const target = event.target;
        const key=event.key;
        const initSelectInputList  = this.state.askList;
        initSelectInputList.splice(key, 1);
        this.initUpdateList(initSelectInputList);
        this.setState({
          askList:initSelectInputList
        });
        */
      }


      handleSubmit(event){
          alert("正在提交");/* 提交时遍历题目列表，如果每一项都不为空才能提交给后端*/

      }
      componentDidMount() {
       
      }
 
      onAddChild = (event) => {
        const target = event.target;
        const name = target.name;
        if (name=="addRadio"){
          this.setState(prevState => ({
            askList: [...prevState.askList, <AddRadio key={this.state.asknum+1} handleDelete={this.handleDelete} />]
          }));
          this.setState({
            asknum: this.state.asknum + 1
          });
        }
        else if (name=="addCheckbox"){
          this.setState(prevState => ({
            askList: [...prevState.askList, <AddCheckbox key={this.state.asknum+1}/>]
          }));
          this.setState({
            asknum: this.state.asknum + 1
          });
        }
        else  if (name=="addText"){
          this.setState(prevState => ({
            askList: [...prevState.askList, <AddText key={this.state.asknum+1}/>]
          }));
          this.setState({
            asknum: this.state.asknum + 1
          });
        }
      /* if(name=="addRadio"){
        this.setState(prevState => ({
          askList: [...prevState.askList, <ChildComponent key={this.state.asknum} id="addRadio" />]
        }));
        this.setState({
          asknum: this.state.asknum + 1
        });
       
       }
       else if(name=="addCheckbox"){
        this.setState(prevState => ({
          askList: [...prevState.askList, <ChildComponent key={this.state.asknum} id="addCheckbox" />]
        }));
        this.setState({
          asknum: this.state.asknum + 1
        });
       }
       else if(name=="addText"){
        this.setState(prevState => ({
          askList: [...prevState.askList, <ChildComponent key={this.state.asknum} id="addText" />]
        }));
        this.setState({
          asknum: this.state.asknum + 1
        });
       }
       */
        
      }
 
      
      render(){
        for (var i = 0; i < this.state.asknum; i += 1){

        }
        
        return(<div id="content" >
            <ParentComponent addChild={this.onAddChild}>
            
           
          </ParentComponent>
          <div>
          {this.state.askList}
            <br/>
            <Tag color="blue" > 目前共有  {this.state.asknum}题</Tag>
            </div>
          <br/>
          <Button type="primary" onClick={this.handleSubmit} shape="round" icon={<CheckOutlined />} >
         确认创建
        </Button>
          </div>
        )
      }

    
}
const ParentComponent = props => (
  <div>
  <div>
  <div >
    添加题目
    

  </div>

  <Row>
  <Space direction="vertical">
     
      <Button type="primary" name="addRadio" onClick={props.addChild} icon={<PlusCircleTwoTone />}>
        添加单选题 </Button>
        <Button type="primary" name="addCheckbox" onClick={props.addChild}><PlusSquareTwoTone />
        添加多选题</Button>
        <Button type="primary" name="addText" onClick={props.addChild}><EditTwoTone /> 
        添加单行文本题</Button>
      
      
   </Space>

  
  </Row>
  </div>
  
  <form>
  <div id="formcontent">
 
 <div>
 
 </div>
  </div>
   

  </form> 
  
  </div>
);
/*const ChildComponent = (props) => {
if(props.id=="addRadio"){
  return(<div>123</div>);
}
else if(props.id=="addCheckbox"){
  return(addCheckbox);
}
}*/
  
  
export default CreatPage1;