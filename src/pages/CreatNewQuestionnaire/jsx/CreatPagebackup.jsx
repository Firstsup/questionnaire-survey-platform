import React, {Component} from 'react';
import ReactDOM from "react-dom";
import { Row, Col,Space, Button,Radio, Input,Checkbox} from 'antd';
import { PlusCircleTwoTone,PlusSquareTwoTone, EditTwoTone,CheckOutlined} from '@ant-design/icons';
import {DeleteTwoTone,PlusOutlined}from '@ant-design/icons';
import AddRadio from './addRadio';
import AddCheckbox from './addCheckbox';
import AddText from './AddText';
import { Tag, Divider } from 'antd';
import { Layout } from 'antd';
import '../css/CreatQuestion.css';

const { Header, Footer, Sider, Content } = Layout;

//只是备份


class CreatPage1 extends  React.Component {
   constructor(props) {
        super(props);
        this.state = {userName: '蓝百灵',
                      questionnaireId:123,
                      questionnaireTitle:'',
                      //questionnaireCount:0,
                      questionnaireSign:0,
                        asknum:0,//题目数组的aid是从1开始的
                        askList:[ ],//新建页面的所有key从1开始
                        askListContent:[],//这个数组是要传给后端的内容
      };
       
       // this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onAddChild=this.onAddChild.bind(this);
        this.handleDelete=this.handleDelete.bind(this);
        
      }


      handleSubmit(event){
          alert("正在提交");/* 提交时遍历题目列表，如果每一项都不为空才能提交给后端*/

      }
 
      onAddChild = (event) => {
        const target = event.target;
        const name = target.name;
        if (name=="addRadio"){ //要在页面渲染的所有题目的题目数组askList
          this.setState(prevState => ({
            askList: [...prevState.askList, <AddRadio asknum={this.state.asknum} key={this.state.asknum+1} handleChangeChoice={this.handleChangeChoice} handleDelete={this.handleDelete} />]
          }));

           this.setState(prevState =>({//提交时要传给后端的数组
            askListContent:[...prevState.askListContent,
            { aid:this.state.asknum+1,
              ask:'',
              type:1,//1单选 2多选 3文本
              isNecessary:Boolean,
              choicecontent:[" "," ",]} ]
          }));

          this.setState({
            asknum: this.state.asknum + 1,
            
          });
         
        }
        else if (name=="addCheckbox"){
          this.setState(prevState => ({
            askList: [...prevState.askList, <AddCheckbox asknum={this.state.asknum} key={this.state.asknum+1} handleChangeChoice={this.handleChangeChoice} handleDelete={this.handleDelete}/>]
          }));

          this.setState(prevState =>({
            askListContent:[ ...prevState.askListContent,
            { aid:this.state.asknum+1,
              ask:'',
              type:2,//1单选 2多选 3文本
              isNecessary:Boolean,
              choicecontent:[" "," ",]} ]
          }));

          this.setState({
            asknum: this.state.asknum + 1
          });
        }
        else  if (name=="addText"){
          this.setState(prevState => ({
            askList: [...prevState.askList, <AddText  asknum={this.state.asknum} key={this.state.asknum+1} handleDelete={this.handleDelete}/>]
          }));

          this.setState(prevState =>({//文本题没有选项，choicecontent数组为空
            askListContent:[ ...prevState.askListContent,
            { aid:this.state.asknum+1,
              ask:'',
              type:1,//1单选 2多选 3文本
              isNecessary:Boolean,
              choicecontent:[ ]} ]
          }));

          this.setState({
            asknum: this.state.asknum + 1
          });
        }
        
     
        
      }

      handleChangeChoice=(asknumber,choiceInput)=>{
        const askListContent=this.state.askListContent.map((askContent,aid)=>{//askListContent是可以传给后端的问卷数组
          return (
            asknumber === aid ? {choicecontent: choiceInput} : askContent)//这里需要把问卷数组里 aid匹配子组件传入的asknumber的项 的choicecontent子数组设为choiceInput
        });

        this.setState(
          {askListContent: askListContent}

        
      );
        
         console.log(this.state.askListContent);
      }

   handleDelete=(aid)=>{//这里的aid和askList数组索引一致，是真实的aid-1
   
    alert("接收到删除数组第"+aid+"项的请求");
      let tempQuestions=this.state.askList;
      for(let i=0;i<tempQuestions.length;i++){
          if(i===aid){
            tempQuestions.splice(i,1);
            break;
          }
      }
      this.setState({
        askList:tempQuestions
      })
      this.setState({
        asknum:this.state.asknum-1
      })

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
            <Button type="primary" name="addCheckbox" onClick={this.onAddChild}><PlusSquareTwoTone  />
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