import React from 'react';
import {Affix, Button, DatePicker, Divider, Input, message, Spin, Statistic} from 'antd';
import {CheckOutlined, EditTwoTone, PlusCircleTwoTone, PlusSquareTwoTone, ProfileOutlined} from '@ant-design/icons';
import '../css/EditQuestion.css';
import EditQuestion from "./EditQuestion";
import moment from "moment";
import timeConversion from "../../../utils/TimeConversion";

class EditQuestionnaire extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '123',
            questionnaire: {
                title: "",
                questions: [],
                createTime: "",
                endTime: "",
            },
            questionNum: 0,
            loading: true,
            isNew: []
        };
    }

    getCreatTime = () => {
        return parseInt(new Date().getTime() / 1000);
    }

    handleSave = () => {
        const temp = this.state.questionnaire.questions.map((question, questionID) => {
            return {
                "ask": question.subject,
                "isNecessary": question.isNecessary,
                "type": question.type === 'radio' ? 1 : (question.type === 'multiple' ? 2 : 3),
                "aid": questionID + 1,
                "choice_list": question.choiceList.map((choice, cid) => {
                    return {
                        "cid": cid + 1,
                        "content": choice
                    }
                })
            }
        })
        const params = {
            "qid": this.props.location.search.slice(5),
            "title": this.state.questionnaire.title,
            "ask_list": temp,
            "time": this.state.questionnaire.endTime
        };
        if (params.title !== "" && params.time !== "") {
            let flag = 1;
            for (let i = 0; i < params.ask_list.length; i++) {
                if (params.ask_list[i].ask === "") {
                    flag = 0;
                }
                for (let j = 0; j < params.ask_list[i].choice_list.length; j++) {
                    if (params.ask_list[i].choice_list[j].cid === "" || params.ask_list[i].choice_list[j].content === "") {
                        flag = 0
                    }
                }
            }
            if (flag === 1) {
                if (params.ask_list.length === 0) {
                    message.warn("问卷内容不能为空")
                    return
                }
                fetch('/api/edit/save', {
                    method: 'post',
                    body: JSON.stringify(params),
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                }).then(res => res.json())
                    .then(res => {
                        if (res.code !== 0) {
                            message.success("问卷保存成功！")
                            setTimeout(() => {
                                this.props.history.push('/showallquestionnaire?username=' + this.state.username)
                            }, 1500)
                        } else {
                            message.error("问卷保存失败，请重新提交！")
                        }
                    })
                return
            }
        }
        message.warn("问卷信息未填写完整")
    }

    handleSubmit = () => {
        const temp = this.state.questionnaire.questions.map((question, questionID) => {
            return {
                "ask": question.subject,
                "isNecessary": question.isNecessary,
                "type": question.type === 'radio' ? 1 : (question.type === 'multiple' ? 2 : 3),
                "aid": questionID + 1,
                "choice_list": question.choiceList.map((choice, cid) => {
                    return {
                        "cid": cid + 1,
                        "content": choice
                    }
                })
            }
        })
        const params = {
            "qid": this.props.location.search.slice(5),
            "title": this.state.questionnaire.title,
            "start_time": this.getCreatTime(),
            "ask_list": temp,
            "time": this.state.questionnaire.endTime
        };
        if (params.title !== "" && params.time !== "") {
            let flag = 1;
            for (let i = 0; i < params.ask_list.length; i++) {
                if (params.ask_list[i].ask === "") {
                    flag = 0;
                }
                for (let j = 0; j < params.ask_list[i].choice_list.length; j++) {
                    if (params.ask_list[i].choice_list[j].cid === "" || params.ask_list[i].choice_list[j].content === "") {
                        flag = 0
                    }
                }
            }
            if (flag === 1) {
                if (params.ask_list.length === 0) {
                    message.warn("问卷内容不能为空")
                    return
                }
                fetch('/api/edit/submit', {
                    method: 'post',
                    body: JSON.stringify(params),
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                }).then(res => res.json())
                    .then(res => {
                        if (res.code !== 0) {
                            message.success("问卷发布成功！")
                            setTimeout(() => {
                                this.props.history.push('/showallquestionnaire?username=' + this.state.username)
                            }, 1500)
                        } else {
                            message.error("问卷发布失败，请重新提交！")
                        }
                    })
                return
            }
        }
        message.warn("问卷信息未填写完整")
    }

    onAddRadioChild = () => {
        let isNew = []
        for (let i = 0; i < this.state.isNew.length; i++) {
            isNew.push(this.state.isNew[i])
        }
        isNew.push(true)
        this.setState(prevState => ({
            questionnaire: {
                title: this.state.questionnaire.title,
                questions: [...prevState.questionnaire.questions,
                    {
                        subject: '',
                        type: "radio",
                        isNecessary: false,
                        choiceList: ["", ""]
                    }],
                createTime: this.state.questionnaire.createTime,
                endTime: this.state.questionnaire.endTime,
            },
            questionNum: this.state.questionNum + 1,
            isNew: isNew
        }));
    }

    onAddCheckBoxChild = () => {
        let isNew = []
        for (let i = 0; i < this.state.isNew.length; i++) {
            isNew.push(this.state.isNew[i])
        }
        isNew.push(true)
        this.setState(prevState => ({
            questionnaire: {
                title: this.state.questionnaire.title,
                questions: [...prevState.questionnaire.questions,
                    {
                        subject: '',
                        type: "multiple",
                        isNecessary: false,
                        choiceList: ["", ""]
                    }],
                createTime: this.state.questionnaire.createTime,
                endTime: this.state.questionnaire.endTime,
            },
            questionNum: this.state.questionNum + 1,
            isNew: isNew
        }));
    }

    onAddTextChild = () => {
        let isNew = []
        for (let i = 0; i < this.state.isNew.length; i++) {
            isNew.push(this.state.isNew[i])
        }
        isNew.push(true)
        this.setState(prevState => ({
            questionnaire: {
                title: this.state.questionnaire.title,
                questions: [...prevState.questionnaire.questions,
                    {
                        subject: '',
                        type: "text",
                        isNecessary: false,
                        choiceList: []
                    }],
                createTime: this.state.questionnaire.createTime,
                endTime: this.state.questionnaire.endTime,
            },
            questionNum: this.state.questionNum + 1,
            isNew: isNew
        }));
    }

    changeTitle = (e) => {
        const value = e.target.value
        this.setState({
            questionnaire: {
                title: value,
                questions: this.state.questionnaire.questions,
                createTime: this.state.questionnaire.createTime,
                endTime: this.state.questionnaire.endTime,
            }
        })
    }

    chiefHandleChange = (aid, newQuestion, isNew) => {
        let tempQuestions = this.state.questionnaire.questions;
        for (let i = 0; i < tempQuestions.length; i++) {
            if ((i + 1) === aid) {
                tempQuestions[i] = newQuestion;
                break;
            }
        }
        this.setState({
            questionnaire: {
                title: this.state.questionnaire.title,
                questions: tempQuestions,
                createTime: this.state.questionnaire.createTime,
                endTime: this.state.questionnaire.endTime,
            },
            isNew: isNew
        })
    }

    chiefHandleDelete = (aid) => {
        let tempQuestions = this.state.questionnaire.questions;
        let tempIsNew = this.state.isNew;
        for (let i = 0; i < tempQuestions.length; i++) {
            if ((i + 1) === aid) {
                tempQuestions.splice(i, 1);
                tempIsNew.splice(i, 1);
                break;
            }
        }
        this.setState({
            questionnaire: {
                title: this.state.questionnaire.title,
                questions: tempQuestions,
                createTime: this.state.questionnaire.createTime,
                endTime: this.state.questionnaire.endTime,
            },
            questionNum: this.state.questionNum - 1,
            isNew: tempIsNew
        })
    }

    chiefMoveUp = (aid) => {
        let tempQuestions = this.state.questionnaire.questions;
        let tempIsNew = this.state.isNew;
        for (let i = 0; i < tempQuestions.length; i++) {
            if ((i + 1) === aid && i !== 0) {
                let temp = tempQuestions[i];
                tempQuestions[i] = tempQuestions[i - 1];
                tempQuestions[i - 1] = temp;
                temp = tempIsNew[i];
                tempIsNew[i] = tempIsNew[i - 1];
                tempIsNew[i - 1] = temp;
            }
        }
        this.setState({
            questionnaire: {
                title: this.state.questionnaire.title,
                questions: tempQuestions,
                createTime: this.state.questionnaire.createTime,
                endTime: this.state.questionnaire.endTime,
            },
            isNew: tempIsNew
        })
    }

    chiefMoveDown = (aid) => {
        let tempQuestions = this.state.questionnaire.questions;
        let tempIsNew = this.state.isNew;
        for (let i = 0; i < tempQuestions.length; i++) {
            if ((i + 1) === aid && i !== tempQuestions.length - 1) {
                let temp = tempQuestions[i];
                tempQuestions[i] = tempQuestions[i + 1];
                tempQuestions[i + 1] = temp;
                temp = tempIsNew[i];
                tempIsNew[i] = tempIsNew[i + 1];
                tempIsNew[i + 1] = temp;
            }
        }
        this.setState({
            questionnaire: {
                title: this.state.questionnaire.title,
                questions: tempQuestions,
                createTime: this.state.questionnaire.createTime,
                endTime: this.state.questionnaire.endTime,
            },
            isNew: tempIsNew
        })
    }

    onOk = (value) => {
        setTimeout(() => {
            this.setState({
                questionnaire: {
                    title: this.state.questionnaire.title,
                    questions: this.state.questionnaire.questions,
                    createTime: this.state.questionnaire.createTime,
                    endTime: parseInt(moment(value).valueOf() / 1000),
                }
            })
        })
    }

    componentDidMount() {
        const params = {
            "qid": this.props.location.search.slice(5)
        };
        fetch('/api/edit?qid=' + params.qid, {
            method: 'get',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        }).then(res => res.json())
            .then(res => {
                const get = res.data.data;
                this.setState({
                    username: get.author,
                    questionnaire: {
                        title: get.title,
                        endTime: get.time,
                        createTime: "",
                        questions: get.ask_list.map((list) => {
                            return ({
                                subject: list.ask,
                                type: list.type === 1 ? "radio" : (list.type === 2 ? "multiple" : "text"),
                                isNecessary: list.isNecessary,
                                choiceList: list.choice_list.map((choice) => {
                                    return (choice.content)
                                })
                            })
                        })
                    },
                    questionNum: get.ask_list.length,
                    isNew: get.ask_list.map(() => {
                        return false
                    })
                })
            });
        this.setState({
            loading: false
        })
    }

    render() {
        if (this.state.loading === true || (this.state.questionnaire.title === "" && this.state.questionnaire.endTime === "")) {
            return (<div
                style={{height: document.documentElement.clientHeight, width: document.documentElement.clientWidth}}>
                <Spin className={"edit_spin"} tip="加载中..."/></div>)
        } else {
            return (
                <>
                    <Affix className={"create_affix"} offsetTop={200}>
                        <div>
                            <Button className={"create_button"}
                                    onClick={this.onAddRadioChild}><PlusCircleTwoTone/>添加单选题</Button>
                            <Button className={"create_button"} onClick={this.onAddCheckBoxChild}><PlusSquareTwoTone/>添加多选题</Button>
                            <Button className={"create_button"}
                                    onClick={this.onAddTextChild}><EditTwoTone/>添加文本题</Button>
                            <Statistic className={"create_statistic"} title="当前题目数" value={this.state.questionNum}
                                       prefix={<ProfileOutlined/>}/>
                        </div>
                    </Affix>
                    <div className={"create_content"}>
                        <div className={"create_title_div"}><span
                            className={"create_title_span"}><strong>问卷标题：</strong></span><Input
                            className={"create_title"}
                            value={this.state.questionnaire.title}
                            name="questionnaireTitle"
                            placeholder="请输入问卷标题"
                            onChange={this.changeTitle}/>
                        </div>
                        <div className={"create_title_div"}>
                            <span><strong>发布者：</strong>{this.state.username}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><span
                            className={"create_title_span"}><strong>问卷截止时间：</strong></span>
                            <DatePicker className={"create_datePicker"}
                                        defaultValue={moment(timeConversion(this.state.questionnaire.endTime), 'YYYY-MM-DD HH:mm:ss')}
                                        showTime showNow={false} allowClear={false} onOk={this.onOk}/>
                        </div>
                        <Divider>问卷内容</Divider>
                        <EditQuestion questions={this.state.questionnaire.questions}
                                      chiefHandleDelete={this.chiefHandleDelete}
                                      chiefHandleChange={this.chiefHandleChange}
                                      chiefMoveUp={this.chiefMoveUp} chiefMoveDown={this.chiefMoveDown}
                                      isNew={this.state.isNew}/>
                        <Divider className={"create_divider"}/>
                        <div className={"create_buttons"}>
                            <Button className={"create_submit_button"} type="primary" onClick={this.handleSubmit}
                                    shape="round"><CheckOutlined/>保存并发布问卷</Button>
                            <Button className={"create_submit_button"} type="primary" onClick={this.handleSave}
                                    shape="round"><CheckOutlined/>保存问卷</Button>
                        </div>
                    </div>
                </>
            )
        }
    }
}

export default EditQuestionnaire;