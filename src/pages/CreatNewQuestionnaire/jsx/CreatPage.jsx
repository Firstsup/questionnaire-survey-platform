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

      handleSubmit(event){
/* 提交时遍历题目列表，如果每一项都不为空才能提交给后端*/

      }
      

      render(){
        return(
          <div> 
            
           <form onSubmit={this.handleSubmit}>
             
             <SideBar ></SideBar>
              
            <button type="submit">保存问卷</button>
             </form> 
             
          </div>
        )
      }
}
export default CreatPage