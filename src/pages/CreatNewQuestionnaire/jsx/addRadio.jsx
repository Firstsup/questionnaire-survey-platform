import React, {Component} from 'react';
import ReactDom from 'react-dom';
import {DeleteOutlined,PlusOutlined}from '@ant-design/icons';
import { Radio, Input, Space, Button  } from 'antd';
import CreatPage from './CreatPage';




class AddRadio extends  React.Component{
    constructor(props){
    super(props);
    this.state={
        aid:1,//新建页面的所有key从1开始
        ask:'',
        type:1,//1单选 2多选 3文本
        isNecessary:Boolean,
        choicenum:2,
        isDeleted:false,
        choiceList: [<Radio disabled={true}  ><Input name="choicecontent" key={1} placeholder="请输入选项内容" onChange={this.changRadioChioce}></Input></Radio>,
        <Radio disabled={true} ><Input name="choicecontent" key={2} placeholder="请输入选项内容" onChange={this.changRadioChioce}></Input></Radio>
                
    
        ]
    ,
        choicecontent:["","",]
    
    
    }
    this.addChoice = this.addChoice.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.changRadioChioce = this.changRadioChioce.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    
    }

    changRadioChioce=(event)=>{
        const target = event.target;
        const name = target.name;
        const value =target.value;
        const key = target.key;
           
            const choices = this.state.choicecontent.map((choice, index) => {
                return (
                    key == (index+1) ? {choice :value }: choice)
            });
            this.setState(
                {choicecontent: choices}
            )
        this.props.handleChangeChoice(this.state.aid,this.state.choicecontent);
    }

    
    handleChange=  (event) => {
        const target = event.target;
        const name = target.name;
        const value =target.value;
        const key = target.key;
       
       
        this.setState({
          [name]: value
        });
      }
    
    addChoice(){
        this.setState(prevState => ({
            choiceList: [...prevState.choiceList, <Radio disabled={true} ><Input name="choicecontent" key={this.state.choicenum+1} placeholder="请输入选项内容" onChange={this.handleChange}></Input></Radio>],
             choicecontent:[...prevState.choicecontent," "]
        }));
            
          this.setState({
            choicenum: this.state.choicenum + 1
          });
    }
    
    handleDelete=()=>{
        alert(this.state.aid);
      // alert("点击发出删除请求");
        this.props.handleDelete(this.state.aid-1);
        
    }
  
 componentDidMount(){
     this.setState({
         aid:this.props.asknum+1
     })
 }
    render(){

    return (
     // <RenderInCreatPage>
    <div>
        <div>
            <div >
              <span>第{this.state.aid}题</span>
            </div>
    
            <div >
             <Input name="ask" placeholder="请输入该单选题的问题" onChange={this.handleChange}></Input>
            </div>
    
           <div>
                <Button type="primary" onClick={this.handleDelete}   icon={<DeleteOutlined />}></Button>   
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
                    
                    <div>

                  
                        
                        </div>
                    
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