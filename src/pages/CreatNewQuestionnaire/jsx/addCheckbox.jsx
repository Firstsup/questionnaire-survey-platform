import React, {Component} from 'react';
import ReactDom from 'react-dom';
import {DeleteTwoTone,PlusOutlined}from '@ant-design/icons';
import { Radio, Input, Space, Checkbox, Row, Col,Button } from 'antd';
class AddCheckbox extends Component{
  constructor(props){
      super(props);
      this.state={
          aid:'',
          ask:'',
          type:2,
          isNecessary:Boolean,
          choiceList: [//每个选项内容
            "","","","",
      
          ]
      
      
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
        addChoice(event){
          //将组件插入新建选项button的前方
          
          }
          render(){
            return (
             // <RenderInCreatPage> 应在此处用RenderInCreatPage包裹，将内容插入form指定位置
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
                     <Checkbox.Group  onChange={this.handleChange} name="choiceList" >
                        <Space direction="vertical">
                            <Checkbox value="A"><Input  placeholder="请输入选项内容" onChange={this.handleChange}></Input></Checkbox>
                       
                       
                            <Checkbox value="B"><Input  placeholder="请输入选项内容" onChange={this.handleChange}></Input></Checkbox>
                         
                         
                            <Checkbox value="C"><Input  placeholder="请输入选项内容" onChange={this.handleChange}></Input></Checkbox>
                         
                            <Button type="dashed" onClick= {this.addChoice}><PlusOutlined />添加选项</Button>
                        </Space>
                      </Checkbox.Group>
                    </div>
            
                </div>
            </div>
            // </RenderInCreatPage>
            
            )
            
            }

}
 export default AddCheckbox
