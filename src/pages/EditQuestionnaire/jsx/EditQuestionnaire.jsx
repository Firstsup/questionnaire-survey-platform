import React, {Component} from 'react';
import ReactDOM from "react-dom";
import {Row, Col, Space, Radio, Input, Checkbox} from 'antd';
import {PlusCircleTwoTone, PlusSquareTwoTone, EditTwoTone, CheckOutlined} from '@ant-design/icons';
import {DeleteTwoTone, PlusOutlined} from '@ant-design/icons';
import EditRadio from './EditRadio';
import EditCheckbox from './EditCheckbox';
import EditText from './EditText';
import AddRadio from '../../CreatNewQuestionnaire/jsx/addRadio';
import AddCheckbox from '../../CreatNewQuestionnaire/jsx/addCheckbox';
import AddText from '../../CreatNewQuestionnaire/jsx/AddText';
import {Tag, Divider, Layout, Typography, Button, Modal, message, Spin, Alert} from 'antd';
import Questions from './Questions';
import '../css/EditQuestionnaire.css'

import {Content, Footer, Header} from "antd/es/layout/layout";

const {Title} = Typography;

class EditQuestionnaire extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            questionnaire: {
                title: "fetch test",
                qid: "107",
                questions: [{
                    subject: "你最喜欢哪个宝可梦",
                    type: "radio",
                    isNecessary: true,
                    options: ["皮卡丘", "杰尼龟", "小火龙"]
                },
                    {
                        subject: "你最喜欢哪个天线宝宝",
                        type: "multiple",
                        isNecessary: true,
                        options: ["丁丁", "迪西", "拉拉", "小波"]
                    }, {
                        subject: "你对数据库有什么建议",
                        type: "radio",
                        isNecessary: false,
                        options: []
                    }]
            }
        }
        // this.state = {
        //     questionnaire: {
        //         title: "",
        //         qid: "",
        //         questions: [],
        //     },
        //     loading: true
        // }
        this.onAddChild = this.onAddChild.bind(this);
    }


    getTitle = () => {
        return (
            <Title className={"edit_title"}>{this.state.questionnaire.title}</Title>
        )
    }

    getFooter = () => {
        return (
            <div className={"edit_footer"}>
                <Divider/>
                <p>电子科大--字节跳动技术训练营&nbsp;&nbsp;前端二组</p>
            </div>
        )
    }

//以下是新建题目按钮对应的函数，根据按钮的name判断把哪个题型的子组件加在现有的askList末尾
    onAddChild = (event) => {
        const target = event.target;
        const name = target.name;
        if (name == "addRadio") {
            this.setState(prevState => ({
                askList: [...prevState.askList,
                    <AddRadio key={this.state.asknum + 1} handleDelete={this.handleDelete}/>]
            }));
            this.setState({
                asknum: this.state.asknum + 1
            });
        } else if (name == "addCheckbox") {
            this.setState(prevState => ({
                askList: [...prevState.askList, <AddCheckbox key={this.state.asknum + 1}/>]
            }));
            this.setState({
                asknum: this.state.asknum + 1
            });
        } else if (name == "addText") {
            this.setState(prevState => ({
                askList: [...prevState.askList, <AddText key={this.state.asknum + 1}/>]
            }));
            this.setState({
                asknum: this.state.asknum + 1
            });
        }
    }

    handleDelete = (aid) => {
        let tempQuestions = this.state.questionnaire.questions
        for (let i = 0; i < tempQuestions.length; i++) {
            if (i === aid) {
                tempQuestions.splice(i, 1)
                break
            }
        }
        this.setState({
            questionnaire: {
                title: this.state.title,
                qid: this.state.qid,
                questions: tempQuestions
            }
        })
    }

    moveUp = (aid) => {
        let tempQuestions = this.state.questionnaire.questions
        for (let i = 0; i < tempQuestions.length; i++) {
            if (i === aid && i !== 0) {
                let temp = tempQuestions[i];
                tempQuestions[i] = tempQuestions[i - 1];
                tempQuestions[i - 1] = temp;
            }
        }
        this.setState({
            questionnaire: {
                title: this.state.title,
                qid: this.state.qid,
                questions: tempQuestions
            }
        })
    }

    moveDown = (aid) => {
        let tempQuestions = this.state.questionnaire.questions
        for (let i = 0; i < tempQuestions.length; i++) {
            if (i === aid && i !== tempQuestions.length - 1) {
                let temp = tempQuestions[i];
                tempQuestions[i] = tempQuestions[i + 1];
                tempQuestions[i + 1] = temp;
            }
        }
        this.setState({
            questionnaire: {
                title: this.state.title,
                qid: this.state.qid,
                questions: tempQuestions
            }
        })
    }

    // componentDidMount() {
    //     fetch('/api/edit?qid=' + this.props.location.search.slice(5), {
    //         method: 'get',
    //         headers: {
    //             'Accept': 'application/json',
    //             'Content-Type': 'application/json',
    //         },
    //     }).then(res => res.json())
    //         .then(res => {
    //             const get = res.data.data;
    //             this.setState({
    //                 questionnaire: {
    //                     title: get.title,
    //                     qid: get.qid,
    //                     questions: get.ask_list.map((list) => {
    //                         return ({
    //                             subject: list.ask,
    //                             type: list.type === 1 ? "radio" : (list.type === 2 ? "multiple" : "text"),
    //                             isNecessary: list.isNecessary,
    //                             options: list.choice_list.map((choice) => {
    //                                 return (choice.content)
    //                             })
    //                         })
    //                     })
    //                 }
    //             })
    //         })
    //     this.setState({
    //         loading: false
    //     })
    // }

    render() {
        let questionnaire = this.state.questionnaire;
        return (
            <Layout className={"edit_layout"}>
                <Header className={"edit_header"}>{this.getTitle()}</Header>
                <Content className={"edit_content"}>
                    <div>
                        <Row>
                            <Space direction="vertical">
                                <Button type="primary" name="addRadio" onClick={this.onAddChild}
                                        icon={<PlusCircleTwoTone/>}>
                                    添加单选题 </Button>
                                <Button type="primary" name="addCheckbox"
                                        onClick={this.onAddChild}><PlusSquareTwoTone/>
                                    添加多选题</Button>
                                <Button type="primary" name="addText" onClick={this.onAddChild}><EditTwoTone/>
                                    添加文本题</Button>
                            </Space>
                        </Row>
                    </div>
                    <Questions questions={questionnaire.questions} handleDelete={this.handleDelete} moveUp={this.moveUp}
                               moveDown={this.moveDown}/></Content>
                <Button type={"primary"} className={"edit_button"} onClick={this.submit}>提交</Button>
                <Footer className={"edit_footer"}>{this.getFooter()}</Footer>
            </Layout>
        )
        // let questionnaire = this.state.questionnaire;
        // if (this.state.loading === true || this.state.questionnaire.title === "") {
        //     return (<div
        //         style={{height: document.documentElement.clientHeight, width: document.documentElement.clientWidth}}>
        //         <Spin className={"edit_spin"} tip="加载中..."/></div>)
        // } else {
        //     return (
        //         <Layout className={"edit_layout"}>
        //             <Header className={"edit_header"}>{this.getTitle()}</Header>
        //             <Content className={"edit_content"}>
        //                 <div>
        //                     <Row>
        //                         <Space direction="vertical">
        //                             <Button type="primary" name="addRadio" onClick={this.onAddChild}
        //                                     icon={<PlusCircleTwoTone/>}>
        //                                 添加单选题 </Button>
        //                             <Button type="primary" name="addCheckbox"
        //                                     onClick={this.onAddChild}><PlusSquareTwoTone/>
        //                                 添加多选题</Button>
        //                             <Button type="primary" name="addText" onClick={this.onAddChild}><EditTwoTone/>
        //                                 添加文本题</Button>
        //                         </Space>
        //                     </Row>
        //                 </div>
        //                 <Questions questions={questionnaire.questions} handleDelete={this.handleDelete} moveUp={this.moveUp} moveDown={this.moveDown}/></Content>
        //             <Button type={"primary"} className={"edit_button"} onClick={this.submit}>提交</Button>
        //             <Footer className={"edit_footer"}>{this.getFooter()}</Footer>
        //         </Layout>
        //     )
        // }
    }
}

export default EditQuestionnaire