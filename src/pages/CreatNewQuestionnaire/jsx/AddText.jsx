import React, {Component} from 'react';
import ReactDom from 'react-dom';
import {DeleteTwoTone,PlusOutlined}from '@ant-design/icons';
import { Radio, Input, Space, Checkbox, Row, Col,Button } from 'antd';
class AddText extends Component{
    constructor(props){
        super(props);
        this.state={
            aid:'',
            ask:'',
            type:3,
            isNecessary:Boolean,
            answer:"",
        }
        this.handleChange = this.handleChange.bind(this);
}
handleChange(event) {
    const target = event.target;
    const name = target.name;
    const value =target.value;
  
    this.setState({
      [name]: value
    });
  }
render(){
    const { TextArea } = Input;
    return(
        
     <div>
            <div >
                <span name="aid" value=""/*题号 根据该题在题目数组中的索引号+1生成 */ ></span>
            </div>
    
            <div >
             <Input name="ask" placeholder="请输入问题" onChange={this.handleChange}></Input>
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
            <TextArea rows={4} placeholder="请输入您的回答"/>
            </div>
    </div>
    )
}

}
export default AddText