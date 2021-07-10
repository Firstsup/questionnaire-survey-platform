import React, {Component} from 'react';
import ReactDOM from "react-dom";
import { Row, Col,Button,Space, Radio, Input,Checkbox} from 'antd';
import { PlusCircleTwoTone,PlusSquareTwoTone, EditTwoTone,CheckOutlined} from '@ant-design/icons';
import {DeleteTwoTone,PlusOutlined}from '@ant-design/icons';
import AddRadio from './addRadio';
import AddCheckbox from './addCheckbox';
import AddText from './AddText';
import { Tag, Divider } from 'antd';
import { Layout } from 'antd';
import '../css/CreatQuestion.css';
const { Header, Footer, Sider, Content } = Layout;








 

 
  

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
        this.onAddChild=this.onAddChild.bind(this);
      }

      componentDidUpdate(prevProps, prevState) {
       
      //应该删除askList中isDeleted为true的项。目前不可用，会影响添加题目

      /*
        for (var i=1;i<=this.state.asknum;i++){

          if(this.state.askList[i].isDeleted==true){
         const initSelectInputList  = this.state.askList;
         
         initSelectInputList.splice(i, 1);
         this.initUpdateList(initSelectInputList);
         this.setState({
           askList:initSelectInputList
         });
         }
       }
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
     
        
        return(
        <div id="content" >
          <div className="questionsSideBar">
          <div>
        <div>
      
      
        <Row>
        <Space direction="vertical">
           
            <Button type="primary" name="addRadio" onClick={this.onAddChild} icon={<PlusCircleTwoTone />}>
              添加单选题 </Button>
              <Button type="primary" name="addCheckbox" onClick={this.onAddChild}><PlusSquareTwoTone />
              添加多选题</Button>
              <Button type="primary" name="addText" onClick={this.onAddChild}><EditTwoTone /> 
              添加文本题</Button>
            
            
         </Space>
      
        
        </Row>
        </div>
        
        
        </div>
          <br/>
          <div>
             <Tag color="blue" > 目前共有  {this.state.asknum}题</Tag>
          <br/>
        
             <Button type="primary" onClick={this.handleSubmit} shape="round" icon={<CheckOutlined />} >
         确认创建
        </Button>
          </div>
          </div>
          <div className="questionsConten" >
            
          <Space direction="vertical" >
            <Input name="questionnaireTitle" placeholder="请输入问卷标题" onChange={this.handleChange}></Input>
            <Divider>问卷内容</Divider>
          {this.state.askList}
          </Space>
            
           
            </div>
     
         
          </div>
        )
      }

    
}
 
/*const ChildComponent = (props) => {
if(props.id=="addRadio"){
  return(<div>123</div>);
}
else if(props.id=="addCheckbox"){
  return(addCheckbox);
}
}*/
  
  
export default CreatPage1;