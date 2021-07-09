import React, {Component} from 'react';
import ReactDom from 'react-dom';
import {DeleteOutlined,PlusOutlined}from '@ant-design/icons';
import { Radio, Input, Space, Button  } from 'antd';
import { //引入react-dnd
    DragSource,
    DropTarget,
} from 'react-dnd';

class EditText extends  React.Component{
    constructor(props){
    super(props);
    this.state={
        aid:this.props.aid,
        ask:this.props.ask,
        type:3,//1单选 2多选 3文本
        isNecessary:this.props.isNecessary,
        choicenum:1,
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
       
        this.setState({
          [name]: value
        })
      }
    
 
    
    
    
    render(){
        
        let ask=this.props.ask;
        let aid=this.props.aid;
        let isNecessary=this.props.isNecessary;
        let choiceList=this.props.choiceList;

    return (
  
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
            <TextArea rows={4} placeholder="请输入您的回答"/>
            </div>
    
        </div>
    </div>
  
    
    )
    
    }
    
    }

export default EditText