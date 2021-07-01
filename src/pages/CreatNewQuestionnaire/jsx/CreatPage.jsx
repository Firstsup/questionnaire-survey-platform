import React, {Component} from 'react';
import { Row, Col,Button,Space } from 'antd';
import SideBar from './SideBar';
import addRadio from './addRadio';

class CreatPage extends  React.Component {
   constructor(props) {
        super(props);
        this.state = {userName: '蓝百灵',
                      questionnaireId:123,
                      questionnaireCount:0,
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
        var index=event.target.getAttribute("data-index");
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
            
           <form onSubmit={this.handleSubmit}>
             
             <SideBar ></SideBar>
             <div>

             </div>
              
            <button type="submit">保存问卷</button>
             </form> 
             
          </div>
        )
      }
}
export default CreatPage