import React, {Component} from 'react';
import ReactDom from 'react-dom';
import {DeleteOutlined,PlusOutlined}from '@ant-design/icons';
import { Radio, Input, Space, Checkbox, Row, Col,Button } from 'antd';
class AddCheckbox extends Component{
  constructor(props){
      super(props);
      this.state={
          aid:this.props.aid,
          ask:this.props.question.ask,
          type:this.props.question.type,
          isNecessary:this.props.question.isNecessary,
          choiceList:this.props.question.choiceList
      
      }
      this.addChoice = this.addChoice.bind(this);
      this.handleChange = this.handleChange.bind(this);
      this.handleDelete = this.handleDelete.bind(this);

      }


      handleChange(event) {
        const target = event.target;
        const name = target.name;
        const value =target.value;

        if(name=="choiceList"){//查找修改的是选项数组的哪一项
                let tempQuestions = this.state.choiceList;
                const cid=event.target.getAttribute("data-index");
                  tempQuestions.map((choice, index) => {
                    return (
                      index === cid ? {choice: value} : choice
                    )
                })
                this.setState({
                  choiceList: tempQuestions   //修改了state的选项数组
              })
                  this.props.handleChange(this.state.aid,name,this.state.choiceList);//把修改的aid、state名称、修改后的内容传给父组件
        }
        else{
                this.setState({
                  [name]: value
                });
                  this.props.handleChange(this.state.aid,name,value);
            }
        }

        addChoice() {
          this.setState(prevState => ({
              choiceList: [...prevState.choiceList," "]
          }));
  
      }

      handleDelete=()=>{
        alert(this.state.aid);
  // alert("点击发出删除请求");
         this.props.handleDelete(this.state.aid);
    
}

       moveUp=()=>{
        this.props.moveUp(this.state.aid);
      }
       moveDown=()=>{
        this.props.moveUp(this.state.aid);
      
      }
        
          render(){
            return (
            
            <div>
                <div>
                  <div>
                <span>第{this.state.aid+1}题</span>
                </div>
            
            
                    <div >
                     <Input name="ask" placeholder={this.state.ask} onChange={this.handleChange}></Input>
                    </div>
            
                    <div>
                    <Button type="primary" onClick={this.handleDelete}  icon={<DeleteOutlined />}></Button>      
                    </div>
            
                    <div>
                        <span>该题为：</span>
                        <Radio.Group name="isNecessary" value={this.state.isNecessary} onChange={this.handleChange} >
                             <Radio value={true}>必填</Radio>
                             <Radio value={false}>选填</Radio>
                        </Radio.Group>
                    </div>
            
                    <div>
                     <Checkbox.Group    >
                        <Space direction="vertical">
                            
                             
                {
                           this.state.choiceList.map((choice, index) => {
                                        return (
                                            <Checkbox key={index } disabled={true}>
                                              <Input onChange={this.handleChange}
                                                     key={index} 
                                                     data-index={index}
                                                     name="choiceList"
                                                     placeholder={choice}/>
                                            </Checkbox>
                                        )
                                    })
                                }
                            <Button type="dashed" onClick= {this.addChoice}><PlusOutlined />添加选项</Button>
                        </Space>
                      </Checkbox.Group>
                    </div>
                    <Button onClick={this.moveUp}>上移</Button>
                    <Button onClick={this.moveDown}>下移</Button>
                </div>
            </div>
            // </RenderInCreatPage>
            
            )
            
            }

}
 export default AddCheckbox
