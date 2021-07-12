import React, {Component} from 'react';
import {Divider, Layout, Typography, Button, Modal, message, Spin, Alert} from 'antd';
import {Content, Footer, Header} from "antd/es/layout/layout";
import '../css/FillQuestionnaire.css'
import QuestionnaireExpire from "./QuestionnaireExpire";
import Questions from "./Questions";

const {Title} = Typography;

class FillQuestionnaire extends Component {
    constructor(props) {
        super(props);
        this.state = {
            questionnaire: {
                title: "",
                qid: "",
                status: "",
                questions: [],
            },
            answers: [],
            warringVisible: [],
            loading: true,
            submitConfirmVisible: false,
            submitConfirmLoading: false,
            modalText: "确认提交问卷？"
        }
    }

    getTitle = () => {
        return (
            <Title className={"fill_question_title"}>{this.state.questionnaire.title}</Title>
        )
    }

    getFooter = () => {
        return (
            <div className={"question_footer"}>
                <Divider/>
                <p>电子科大--字节跳动技术训练营&nbsp;&nbsp;前端二组</p>
            </div>
        )
    }

    changeAnswer = (questionID, answerInput) => {
        const answers = this.state.answers.map((answer, answerID) => {
            return (
                answerID === questionID ? {answer: answerInput} : answer)
        })
        this.setState(
            {answers: answers}
        )
    }

    checkIsNecessary = () => {
        return this.state.answers.map((answer, answerID) => {
            return this.state.questionnaire.questions[answerID].isNecessary === true && (this.state.answers[answerID].answer === null || this.state.answers[answerID].answer === "")
        })
    }

    count = () => {
        let count = 0;
        this.state.warringVisible.map((item) => {
            if (item !== false) {
                count++
            }
            return count
        })
        return count
    }

    submit = () => {
        const needWarring = this.checkIsNecessary()
        needWarring.map((item, ID) => {
            const temp = this.state.warringVisible
            temp[ID] = item
            this.setState({warringVisible: temp})
            return null
        })
        if (needWarring.every(item => item === false)) {
            this.setState({submitConfirmVisible: true})
        }
    }

    handleOk = () => {
        this.setState({modalText: "正在提交"})
        this.setState({submitConfirmLoading: true})
        setTimeout(() => {
            this.setState({submitConfirmVisible: false})
            this.setState({submitConfirmLoading: false})
            const params = {
                qid: this.state.questionnaire.qid,
                ans_time: parseInt(new Date().getTime() / 1000),
                ans_list: this.state.answers.map((answer, answerID) => {
                    return ({
                        ans_aid: answerID + 1,
                        ans: this.state.questionnaire.questions[answerID].type === "text" ? (answer.answer === null ? "" : answer.answer) : "",
                        choice: this.state.questionnaire.questions[answerID].type === "text" ? "" : (this.state.questionnaire.questions[answerID].type === "radio" ? (answer.answer === null ? "" : String.fromCharCode(answer.answer + 64)) : (answer.answer === null ? [""] : answer.answer.map((ans) => String.fromCharCode(ans + 64))))
                    })
                })
            }
            console.log(params)
            fetch(('/api/ansFill'), {
                method: 'post',
                body: JSON.stringify(params),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
            }).then(res => res.json())
                .then(res => {
                    if (res.ans_qid !== 0) {
                        this.props.history.push("/fillquestionnairesubmitcomplete");
                    } else {
                        return message.error("问卷提交失败，请重新提交！");
                    }
                })
        }, 2000);
    }

    handleCancel = () => {
        this.setState({submitConfirmVisible: false})
    };

    componentDidMount() {
        const params = {
            "qid": this.props.location.search.slice(5)
        };
        fetch('/api/fill', {
            method: 'post',
            body: JSON.stringify(params),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        }).then(res => res.json())
            .then(res => {
                const get = res.data.data[0];
                this.setState({
                    questionnaire: {
                        title: get.title,
                        qid: get.qid,
                        status: get.status === 1 ? "active" : "",
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
                this.setState({
                    answers: this.state.questionnaire.questions.map(() => {
                        return {answer: null}
                    }),
                    warringVisible: this.state.questionnaire.questions.map(() => {
                        return false
                    }),
                })
            });
        this.setState({
            loading: false
        })
    }

    render() {
        if (this.state.loading === true || this.state.questionnaire.title === "") {
            return (<div
                style={{height: document.documentElement.clientHeight, width: document.documentElement.clientWidth}}>
                <Spin className={"question_spin"} tip="加载中..."/></div>)
        } else {
            const questionnaire = this.state.questionnaire;
            if (questionnaire.status === "active") {
                return (
                    <Layout className={"question_layout"}>
                        <Header className={"question_header"}>{this.getTitle()}</Header>
                        <Content className={"question_content"}><Questions questions={questionnaire.questions}
                                                                           warringVisible={this.state.warringVisible}
                                                                           changeAnswer={this.changeAnswer}/></Content>
                        <Button type={"primary"} className={"question_button"} onClick={this.submit}>提交</Button>
                        {this.state.warringVisible.every(item => item === false) ? null : (
                            <p className={"question_alert"}>您还有{this.count()}题未填写</p>)}
                        <Footer className={"question_footer"}>{this.getFooter()}</Footer>
                        <Modal
                            title="提交确认"
                            visible={this.state.submitConfirmVisible}
                            onOk={this.handleOk}
                            confirmLoading={this.state.submitConfirmLoading}
                            onCancel={this.handleCancel}
                            okText={"确定"}
                            cancelText={"取消"}
                        >
                            <p>{this.state.modalText}</p>
                        </Modal>
                    </Layout>
                )
            } else {
                return (
                    <QuestionnaireExpire history={this.props.history}/>
                )
            }
        }
    }
}

export default FillQuestionnaire