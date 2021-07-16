import React, {Component} from 'react';
import ReactDOM from "react-dom";
import {Row, Col, Space, Radio, Input, Checkbox} from 'antd';
import {PlusCircleTwoTone, PlusSquareTwoTone, EditTwoTone, CheckOutlined} from '@ant-design/icons';
import {DeleteTwoTone, PlusOutlined} from '@ant-design/icons';
import EditRadio from './EditRadio';
import EditCheckbox from './EditCheckbox';
import EditText from './EditText';
import AddRadio from '../../CreatNewQuestionnaire/jsx/AddRadio';
import AddMultiple from '../../CreatNewQuestionnaire/jsx/AddMultiple';
import AddText from '../../CreatNewQuestionnaire/jsx/AddText';
import {Tag, Divider, Layout, Typography, Button, Modal, message, Spin, Alert} from 'antd';
import Questions from './Questions';
import {DatePicker} from 'antd';
import moment from "moment";

import '../css/EditQuestionnaire.css'

import {Content, Footer, Header} from "antd/es/layout/layout";

const {Title} = Typography;
const {RangePicker} = DatePicker;

class EditQuestionnaire extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            questionnaire: {
                title: "",
                qid: "",
                questions: [],
                start_time: "",
                end_time:"",
            },
            loading: true
        }

        this.handleDelete = this.handleDelete.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }


    getFooter = () => {
        return (
            <div className={"edit_footer"}>
                <Divider/>
                <p>电子科大--字节跳动技术训练营&nbsp;&nbsp;前端二组</p>
            </div>
        )
    }

//
    onAddRadioChild = () => {
        this.setState(prevState => ({
            questionnaire: {
                ...prevState.questionnaire,

                questions: [...prevState.questionnaire.questions,
                    {
                        subject: '',
                        type: "radio",
                        isNecessary: Boolean,
                        options: [" ", " ",],
                    }]
            }
        }));
    }

    onAddCheckboxChild = () => {
        this.setState(prevState => ({
            questionnaire: {
                ...prevState.questionnaire,

                questions: [...prevState.questionnaire.questions,
                    {
                        subject: '',
                        type: "multiple",
                        isNecessary: Boolean,
                        options: [" ", " ",],
                    }]
            }
        }));
    }

    onAddTextChild = () => {
        this.setState(prevState => ({
            questionnaire: {
                ...prevState.questionnaire,

                questions: [...prevState.questionnaire.questions,
                    {
                        subject: '',
                        type: "text",
                        isNecessary: Boolean,
                        options: [" ", " ",],
                    }]
            }
        }));
    }

    handleDelete = (aid) => {
        let tempQuestions = this.state.questionnaire.questions
        let test = this.state.questionnaire.questions
        for (let i = 0; i < tempQuestions.length; i++) {

            if (i === aid) {

                tempQuestions.splice(i, 1);
                break;
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

    handleChange = (aid, changeName, changeItem) => {//从子组件接受修改的题目的aid、修改的state的名称、修改后的内容
        let tempQuestions = this.state.questionnaire.questions;
        for (let i = 0; i < tempQuestions.length; i++) {
            if (i == aid) {
                //函数Object.defineProperty(object, propertyname, descriptor);
                tempQuestions[i][changeName] = changeItem;
                break;
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
        console.log(aid)
        let tempQuestions = this.state.questionnaire.questions
        console.log(tempQuestions)
        for (let i = 0; i < tempQuestions.length; i++) {
            if (i === aid && i !== 0) {
                let temp = tempQuestions[i];
                tempQuestions[i] = tempQuestions[i - 1];
                tempQuestions[i - 1] = temp;
            }
        }
        console.log(tempQuestions)
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

    save = () => {
        const temp = this.state.questionnaire.questions.map((ask, askID) => {
            return {
                "ask": ask.subject,
                "isNecessary": ask.isNecessary,
                "type": ask.type,
                "aid": askID + 1,
                "choiceList": ask.choiceList.map((choice, cid) => {
                    return {
                        "cid": cid + 1,
                        "content": choice
                    }
                })
            }
        })
        const params = {
            "qid": this.state.questionnaire.qid,
            "title": this.state.questionnaire.title,
            "time": this.state.questionnaire.endTime(),
            "ask_list": temp
        };
        fetch('/api/edit/save', {
            method: 'post',
            body: JSON.stringify(params),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        }).then(res => res.json())
            .then(res => {
                console.log(res.code)
                if (res.code !== 0) {
                    this.props.history.push('/showallquestionnaire')
                    alert("问卷修改成功!");
                } else {
                    alert("问卷修改失败")
                }
            })
    }

    submit = () => {
        const temp = this.state.questionnaire.questions.map((ask, askID) => {
            return {
                "ask": ask.subject,
                "isNecessary": ask.isNecessary,
                "type": ask.type,
                "aid": askID + 1,
                "choiceList": ask.choiceList.map((choice, cid) => {
                    return {
                        "cid": cid + 1,
                        "content": choice
                    }
                })
            }
        })
        const params = {
            "qid": this.state.questionnaire.qid,
            "title": this.state.questionnaire.title,
            "start_time": this.getCreatTime(),
            "time": this.state.questionnaire.endTime(),
            "ask_list": temp
        };
        fetch('/api/edit/submit', {
            method: 'post',
            body: JSON.stringify(params),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        }).then(res => res.json())
            .then(res => {
                console.log(res.code)
                if (res.code !== 0) {
                    this.props.history.push('/showallquestionnaire')
                    alert("问卷修改成功!");
                } else {
                    alert("问卷修改失败")
                }
            })
    }

    onOk = (value) => {
        this.setState({
            end_time: parseInt(moment(value).valueOf() / 1000)
        })
    }

    changeTitle = (e) => {
        const value = e.target.value;
        this.setState({
            questionnaire: {
                title: value,
                qid: this.state.qid,
                questions: this.state.questions
            }
        })
    }

    componentDidMount() {
        fetch('/api/edit?qid=' + this.props.location.search.slice(5), {
            method: 'get',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        }).then(res => res.json())
            .then(res => {
                const get = res.data.data;
                this.setState({
                    questionnaire: {
                        title: get.title,
                        qid: get.qid,
                        questions: get.ask_list.map((list) => {
                            return ({
                                subject: list.ask,
                                type: list.type === 1 ? "radio" : (list.type === 2 ? "multiple" : "text"),
                                isNecessary: list.isNecessary,
                                options: list.choice_list.map((choice) => {
                                    return (choice.content)
                                })
                            })
                        })
                    }
                })
            })
        this.setState({
            loading: false
        })
    }

    render() {
        let questionnaire = this.state.questionnaire;
        if (this.state.loading === true || this.state.questionnaire.title === "") {
            return (<div
                style={{height: document.documentElement.clientHeight, width: document.documentElement.clientWidth}}>
                <Spin className={"edit_spin"} tip="加载中..."/></div>)
        } else {
            return (
                <Layout className={"edit_layout"}>


                    <div>
                        <Row>
                            <Space direction="vertical" className="edit_questionsSideBar1">
                                <Button type="primary" name="addRadio" onClick={this.onAddRadioChild}
                                        block size="large" icon={<PlusCircleTwoTone/>}>
                                    添加单选题 </Button>
                                <Button type="primary" name="addCheckbox"
                                        block size="large" onClick={this.onAddCheckboxChild}><PlusSquareTwoTone/>
                                    添加多选题</Button>
                                <Button type="primary" name="addText" block size="large"
                                        onClick={this.onAddTextChild}><EditTwoTone/>
                                    添加文本题</Button>

                                <Tag color="blue"> 请选择问卷截止时间：</Tag>
                                <DatePicker size="large" showTime onOk={this.onOk}/>


                                <Tag color="blue"> 目前共有 {this.state.questionnaire.questions.length}题</Tag>


                                <Button type="primary" block size="large" onClick={this.submit} shape="round"
                                        icon={<CheckOutlined/>}>
                                    保存并发布问卷
                                </Button>
                                <Button type={"primary"} block size="large" shape="round" onClick={this.save}
                                        icon={<CheckOutlined/>}>保存暂不发布问卷</Button>
                            </Space>
                        </Row>
                    </div>
                    <Space className="edit_questionsSideBar2" size="large" direction="vertical">
                        <Input name="questionnaireTitle" placeholder={this.state.questionnaire.title} size="large"
                               onChange={this.changeTitle}/>
                        <Questions questions={questionnaire.questions} handleDelete={this.handleDelete}
                                   moveUp={this.moveUp}
                                   handleChange={this.handleChange} moveDown={this.moveDown}/>
                    </Space>


                </Layout>

            )
        }
    }
}

export default EditQuestionnaire