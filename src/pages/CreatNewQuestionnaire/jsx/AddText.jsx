import React, {Component} from 'react';
import ReactDom from 'react-dom';
import {DeleteOutlined,PlusOutlined}from '@ant-design/icons';
import { Radio, Input, Space, Checkbox, Row, Col,Button } from 'antd';
class AddText extends Component{
    constructor(props){
        super(props);
        this.state={
            aid:this.props.aid,
            ask:this.props.question.ask,
            type:this.props.question.type,
            isNecessary:this.props.question.isNecessary
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
}
    handleChange(event) {
    const target = event.target;
    const name = target.name;
    const value =target.value;
  
    this.setState({
        [name]: value
      });

    this.props.handleChange(this.state.aid,name,value);
  }

     handleDelete=()=>{
        alert(this.state.aid);
  // alert("点击发出删除请求");
         this.props.handleDelete(this.state.aid);
    
}

componentDidMount(){
    this.setState({
        aid:this.props.aid
    })
}
componentDidUpdate(prevProps, prevState) {
   
   if(prevProps.aid !== this.props.aid) {
       this.setState({
           aid:this.props.aid
       })
   }
 }
 moveUp=()=>{
    this.props.moveUp(this.state.aid);
  }
   moveDown=()=>{
    this.props.moveUp(this.state.aid);
  
  }
render(){
    const { TextArea } = Input;
    return(
        
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
                    <Button onClick={this.moveUp}>上移</Button>
                    <Button onClick={this.moveDown}>下移</Button>
    </div>
    )
}

}
export default AddText