import React, {Component} from 'react';
import ReactDom from 'react-dom';
import {DeleteOutlined,PlusOutlined}from '@ant-design/icons';
import { Radio, Input, Space, Button  } from 'antd';
import { //引入react-dnd
    DragSource,
    DropTarget,
} from 'react-dnd'



class EditRadio extends  React.Component{
    constructor(props){
    super(props);
    this.state={
        aid:this.props.aid,
        ask:this.props.ask,
        type:1,//1单选 2多选 3文本
        isNecessary:this.props.isNecessary,
        choicenum:0,
        choiceList:this.props.choiceList,
    }
    this.addChoice = this.addChoice.bind(this);
    this.handleChange = this.handleChange.bind(this);
 
    }


    
    handleChange=  (event) => {
        const target = event.target;
        const name = target.name;
        const value =target.value;
        const key = target.key;
        if(name=="choiceList"){
            if(typeof this.state.choiceList[key]=='​undefined')
            {
                this.setState(prevState => ({
                    choicecontent: [...prevState.choiceList,value]
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
            choiceList: [...prevState.choiceList, <Radio disabled={true} ><Input name="choiceList" key={this.state.choicenum+1} placeholder="请输入选项内容" onChange={this.handleChange}></Input></Radio>]
          }));
          this.setState({
            choicenum: this.state.choicenum + 1
          });
    }
    
  
    
    render(){
        let ask=this.props.ask;
        let aid=this.props.aid;
        let isNecessary=this.props.isNecessary;
        let choiceList=this.props.choiceList;

    return (
     // <RenderInCreatPage>
    <div>
        <div>
            <div >
                <span name="aid" value=""/*题号 根据该题在题目数组中的索引号+1生成 */ >这是第{aid}题</span>
            </div>
    
            <div >
             <Input name="ask"  onChange={this.handleChange}>{ask}</Input>
            </div>
    
           <div>
                <Button type="primary" onClick={this.handleDelete}  icon={<DeleteOutlined />}></Button>   
           </div>
    
            <div>
                <span>该题为：</span>
                <Radio.Group name="isNecessary" value={isNecessary} onChange={this.handleChange}  >
                     <Radio value={true}>必填</Radio>
                     <Radio value={false}>选填</Radio>
                </Radio.Group>
            </div>
    
            <div>
                <Radio.Group   >
                <Space direction="vertical" >
                
                {
                           choiceList.map((choice, index) => {
                                return (
                                    <Radio disabled={true}><Input onChange={this.handleChange} key={index+1}>{choice}</Input></Radio>
                                )
                            })
                  }
                    
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

export default EditRadio