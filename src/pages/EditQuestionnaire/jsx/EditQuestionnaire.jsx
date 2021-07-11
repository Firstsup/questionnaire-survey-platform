import React, {Component} from 'react';
import ReactDOM from "react-dom";
import { Row, Col,Space, Radio, Input,Checkbox} from 'antd';
import { PlusCircleTwoTone,PlusSquareTwoTone, EditTwoTone,CheckOutlined} from '@ant-design/icons';
import {DeleteTwoTone,PlusOutlined}from '@ant-design/icons';
import EditRadio from './EditRadio';
import EditCheckbox from './EditCheckbox';
import EditText from './EditText';
import AddRadio from '../../CreatNewQuestionnaire/jsx/addRadio';
import AddCheckbox from '../../CreatNewQuestionnaire/jsx/addCheckbox';
import AddText from '../../CreatNewQuestionnaire/jsx/AddText';
import {Tag,Divider, Layout, Typography, Button, Modal, message, Spin, Alert} from 'antd';
import Questions from './Questions';

import {Content, Footer, Header} from "antd/es/layout/layout";
const {Title} = Typography;

  const questionnaire={userName: '张三',
  qId:123,
  title:'问卷样本',
  //questionnaireCount:0,
  questionnaireSign:0,
    asknum:4,
    askList:[{
        aid:1,
        ask: "第一个问题",
        type: 1,
        isNecessary: true,
        choiceList: ["选项一", "选项二", "选项三"],
    },{
        aid:2,
        ask: "第二个问题",
        type: 2,
        isNecessary: true,
        choiceList: ["选项一", "选项二", "选项三"],
    },{
        aid:3,
        ask: "第三个问题",
        type: 1,
        isNecessary: true,
        choiceList: ["选项一", "选项二", "选项三"],
    },{
        aid:4,
        ask: "第四个问题1",
        type: 3,
        isNecessary: true,
        choiceList:" ",
    }]
};

class EditQuestionnaire extends  React.Component{
    constructor(props) {
        super(props);
        this.state = {
            questionnaire: questionnaire,
        }
        this.onAddChild=this.onAddChild.bind(this);
    }


    getTitle = () => {
        return (
            <Title className={"title"}>{questionnaire.title}</Title>
        )
    }

    getFooter = () => {
        return (
            <div className={"footer"}>
                <Divider/>
                <p>电子科大--字节跳动技术训练营&nbsp;&nbsp;前端二组</p>
            </div>
        )
    }

//以下是新建题目按钮对应的函数，根据按钮的name判断把哪个题型的子组件加在现有的askList末尾
    onAddChild = (event) => {
        const target = event.target;
        const name = target.name;
        if (name=="addRadio"){
          this.setState(prevState => ({
            askList: [...prevState.askList, <AddRadio key={this.state.asknum+1} handleDelete={this.handleDelete} />]
          }));
          this.setState({
            asknum: this.state.asknum + 1
          });
        }
        else if (name=="addCheckbox"){
          this.setState(prevState => ({
            askList: [...prevState.askList, <AddCheckbox key={this.state.asknum+1}/>]
          }));
          this.setState({
            asknum: this.state.asknum + 1
          });
        }
        else  if (name=="addText"){
          this.setState(prevState => ({
            askList: [...prevState.askList, <AddText key={this.state.asknum+1}/>]
          }));
          this.setState({
            asknum: this.state.asknum + 1
          });
        }
    }

    render() {
        let questionnaire = this.state.questionnaire;
            return (
                <Layout className={"layout"}>
                    <Header className={"header"}>{this.getTitle()}</Header>
                    <Content className={"content"}>
                     //以下是新建题目按钮区域   
                    <div>
                    <Row>
                    <Space direction="vertical">
                        
                        <Button type="primary" name="addRadio" onClick={this.onAddChild} icon={<PlusCircleTwoTone />}>
                            添加单选题 </Button>
                            <Button type="primary" name="addCheckbox" onClick={this.onAddChild}><PlusSquareTwoTone />
                            添加多选题</Button>
                            <Button type="primary" name="addText" onClick={this.onAddChild}><EditTwoTone /> 
                            添加文本题</Button>
                        
                        
                    </Space>
                    
                    
                    </Row>
                     </div>
                     //以上是新建题目按钮区域

                        <Questions askList={questionnaire.askList}
                                                              /></Content>
                    <Button type={"primary"} className={"button"} onClick={this.submit}>提交</Button>
                    <Footer className={"footer"}>{this.getFooter()}</Footer>
                    
                </Layout>
            )
     }
}

export default EditQuestionnaire