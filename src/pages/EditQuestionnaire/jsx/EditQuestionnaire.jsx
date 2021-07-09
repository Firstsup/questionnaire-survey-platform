import React, {Component} from 'react';
import ReactDOM from "react-dom";
import { Row, Col,Space, Radio, Input,Checkbox} from 'antd';
import { PlusCircleTwoTone,PlusSquareTwoTone, EditTwoTone,CheckOutlined} from '@ant-design/icons';
import {DeleteTwoTone,PlusOutlined}from '@ant-design/icons';
import EditRadio from './EditRadio';
import EditCheckbox from './EditCheckbox';
import EditText from './EditText';
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

    render() {
        let questionnaire = this.state.questionnaire;
            return (
                <Layout className={"layout"}>
                    <Header className={"header"}>{this.getTitle()}</Header>
                    <Content className={"content"}><Questions askList={questionnaire.askList}
                                                              /></Content>
                    <Button type={"primary"} className={"button"} onClick={this.submit}>提交</Button>
                    <Footer className={"footer"}>{this.getFooter()}</Footer>
                    
                </Layout>
            )
     }
}

export default EditQuestionnaire