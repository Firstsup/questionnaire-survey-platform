import React, {Component} from 'react';
import ReactDOM from "react-dom";
import { Row, Col,Button,Space, Radio, Input} from 'antd';
import { PlusCircleTwoTone,PlusSquareTwoTone, EditTwoTone} from '@ant-design/icons';
import {DeleteTwoTone,PlusOutlined}from '@ant-design/icons';



class SideBar extends React.Component {

  constructor(p) {
    super(p);
    this.state = {};

    // 为了在回调中使用 `this`，这个绑定是必不可少的
    this.handleClick = this.handleClick.bind(this);
  }


  handleClick = (event) => {
    const target = event.target;
      const name = target.name;
    switch (name) {
      case "addRadio":
        //  alert('hi'); 
         return <addRadio/>;
        break;
      
      case "addCheckbox":
        alert('调用添加多选题class');
        break;
      case "addText":
        alert('调用添加文本题class');
        break;
  
    }
  }

  

render(){
return(
    <div>
    <div >
      添加题目
      

    </div>

    <Row>
    <Space direction="vertical">
       
        <button type="primary" name="addRadio" onClick={this.handleClick} ><i><PlusCircleTwoTone /></i>
          添加单选题</button>
          <button type="primary" name="addCheckbox" onClick={this.handleClick}><i><PlusSquareTwoTone /></i>
          添加多选题</button>
          <button type="primary" name="addText" onClick={this.handleClick}><i><EditTwoTone /> </i>
          添加单行文本题</button>
        
        
     </Space>

    
    </Row>
    </div>

  
);
}

}

class RenderInCreatPage extends Component{
  constructor(p){
   super();
  }

  componentDidMount(){//新建一个div标签并塞进body
      this.popup = React.createElement("div");
      CreatPage.form.appendChild(this.popup);
      this._renderLayer();
     }
     componentDidUpdate() {
      this._renderLayer();
     }
     componentWillUnmount(){//在组件卸载的时候，保证弹层也被卸载掉
      ReactDOM.unmountComponentAtNode(this.popup);
      CreatPage.form.removeChild(this.popup);
     }
     _renderLayer(){//将弹层渲染到CreatPage下的form标签
      ReactDOM.render(this.props.children, this.popup);
     }

 }

class addRadio extends Component{
  constructor(props){
  super(props);
  this.state={
      aid:'',
      ask:'',
      type:0,
      isNecessary:Boolean,
      choiceList: [//每个选项内容
  
  
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
  
  
  }
  
  
  /*
    
  componentDidMount(){   
      
      
      popupInfo={
      rootDom:CreatPage.form,//接收弹层组件的DOM节点，如document.body
      
      left:left,//相对位置
      
      top:top//位置信息
      
      }
  }
  
  
  componentDidUpdate() {
  this._renderLayer();
  
  }
  
  componentWillUnmount(){//在组件卸载的时候，保证弹层也被卸载掉
  
  ReactDom.unmountComponentAtNode(this.popup);
  
  document.body.removeChild(this.popup);
  
  }
  
  _renderLayer(){//将弹层渲染到body下的div标签
  
  ReactDom.render(this.props.children, this.popup);
  
  }
  
  
  */
  
  render(){
  return (
    <RenderInCreatPage>
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
              <Radio.Group onChange={this.handleChange} name="choiceList"  >
              <Space direction="vertical">
              <Radio value={1} ><Input  placeholder="请输入选项内容" onChange={this.handleChange}></Input></Radio>
              <Radio value={2}><Input  placeholder="请输入选项内容" onChange={this.handleChange}></Input></Radio>
              <Button type="dashed" onClick= {this.addChoice}><PlusOutlined />添加选项</Button>
              
          </Space>
        </Radio.Group>
          </div>
  
      </div>
  </div>
  </RenderInCreatPage>
  
  )
  
  }
  
  }

class CreatPage extends  React.Component {
   constructor(props) {
        super(props);
        this.state = {userName: '蓝百灵',
                      questionnaireId:123,
                      questionnaireTitle:'',
                      //questionnaireCount:0,
                      questionnaireSign:0,
                      askList:[
                            
                        ]
      };
    
        //this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }

      handleDelete(event){//删除应该是子组件发出请求，父组件CreatPage的askList数组中删掉这一个元素 难点：拖拽元素改变顺序，数组索引怎么办
        const target = event.target;
        const name = target.name;
        const value =target.value;
        var index=event.target.getAttribute(askList.index);
        var askList=this.state.askList;
        askList.splice(index,1,"");
            this.setState({askList:askList})
           
      }


      handleSubmit(event){
/* 提交时遍历题目列表，如果每一项都不为空才能提交给后端*/

      }
      

      render(){
        return(
          <div> 
            <SideBar ></SideBar>
           <form onSubmit={this.handleSubmit}>
             <div>

             </div>
              
            <button type="submit">保存问卷</button>
             </form> 
             
          </div>
        )
      }
}
export default CreatPage