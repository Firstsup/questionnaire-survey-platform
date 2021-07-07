import React, {Component} from 'react';
import ReactDom from 'react-dom';
import {DeleteTwoTone,PlusOutlined}from '@ant-design/icons';
import { Radio, Input, Space, Button  } from 'antd';
import CreatPage from './CreatPage';



class AddRadio extends  React.Component{
    constructor(props){
    super(props);
    this.state={
        aid:'',
        ask:'',
        type:1,//1单选 2多选 3文本
        isNecessary:Boolean,
        choicenum:2,
        choiceList: [<Radio disabled={true}  ><Input name="choicecontent" key={0} placeholder="请输入选项内容" onChange={this.handleChange}></Input></Radio>,
        <Radio disabled={true} ><Input name="choicecontent" key={1} placeholder="请输入选项内容" onChange={this.handleChange}></Input></Radio>
                
    
        ]
    ,
        choicecontent:[]
    
    
    }
    this.addChoice = this.addChoice.bind(this);
    this.handleChange = this.handleChange.bind(this);
 
    }


    
    handleChange=  (event) => {
        const target = event.target;
        const name = target.name;
        const value =target.value;
        const key = target.key;
        if(name=="choicecontent"){
            if(typeof this.state.choicecontent[key]=='​undefined')
            {
                this.setState(prevState => ({
                    choicecontent: [...prevState.choicecontent,value]
                  }));
            }
            else{
            this.setState({
                [name[key]]: value
              });}
        }
        else{
        this.setState({
          [name]: value
        });}
      }
    
    addChoice(){
        this.setState(prevState => ({
            choiceList: [...prevState.choiceList, <Radio disabled={true} ><Input name="choicecontent" key={this.state.choicenum} placeholder="请输入选项内容" onChange={this.handleChange}></Input></Radio>]
          }));
          this.setState({
            choicenum: this.state.choicenum + 1
          });
    }
    
  
    
    render(){
    return (
     // <RenderInCreatPage>
    <div>
        <div>
            <div >
                <span name="aid" value=""/*题号 根据该题在题目数组中的索引号+1生成 */ ></span>
            </div>
    
            <div >
             <Input name="ask" placeholder="请输入该单选题的问题" onChange={this.handleChange}></Input>
            </div>
    
            <div>
                <button onClick={this.handleDelete} /*删除该题目*/> <DeleteTwoTone  /></button>   
            </div>
    
            <div>
                <span>该题为：</span>
                <Radio.Group name="isNecessary" onChange={this.handleChange} >
                     <Radio value={true}>必填</Radio>
                     <Radio value={false}>选填</Radio>
                </Radio.Group>
            </div>
    
            <div>
                <Radio.Group   >
                <Space direction="vertical" >
                
                    {this.state.choiceList}
                    
                <Button type="dashed" onClick= {this.addChoice}><PlusOutlined />添加选项</Button>
         
            </Space>
          </Radio.Group>
            </div>
    
        </div>
    </div>
    // </RenderInCreatPage>
    
    )
    
    }
    
    }

export default AddRadio