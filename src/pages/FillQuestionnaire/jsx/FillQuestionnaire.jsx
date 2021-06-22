import React, {Component} from 'react';
import {Divider, Layout, Typography, Button, Modal} from 'antd';
import {Content, Footer, Header} from "antd/es/layout/layout";
import '../css/FillQuestionnaire.css'
import QuestionnaireExpire from "./QuestionnaireExpire";
import Questions from "./Questions";

const {Title} = Typography;
const questionnaire = {
    title: "test",
    qid: "123",
    state: "actve",
    questions: [
        {
            subject: "question1",
            type: "radio",
            isNecessary: true,
            options: ["option1", "option2", "option3"],
        },
        {
            subject: "question2",
            type: "multiple",
            isNecessary: true,
            options: ["option1", "option2", "option3"],
        },
        {
            subject: "question3",
            type: "text",
            isNecessary: true,
        },
        {
            subject: "question4",
            type: "radio",
            isNecessary: false,
            options: ["option1", "option2", "option3", "option4"],
        },
        {
            subject: "question5",
            type: "multiple",
            isNecessary: false,
            options: ["option1", "option2", "option3", "option4"],
        },
        {
            subject: "question6",
            type: "text",
            isNecessary: false,
        }
    ]
}

//获取数据

class FillQuestionnaire extends Component {
    constructor(props) {
        super(props);
        this.state = {
            questionnaire: questionnaire,
            answers: questionnaire.questions.map(() => {
                return {answer: null}
            }),
            warringVisible: questionnaire.questions.map(() => {
                return false
            }),
            submitConfirmVisible: false,
            submitConfirmLoading: false,
            modalText: "确认提交问卷？"
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
            //返回数据
            this.props.history.push("/fillquestionnairesubmitcomplete");
        }, 2000);
    }

    handleCancel = () => {
        this.setState({submitConfirmVisible: false})
    };

    render() {
        let questionnaire = this.state.questionnaire;
        if (questionnaire.state !== "active") {
            return (
                <QuestionnaireExpire history={this.props.history}/>
            )
        } else {
            return (
                <Layout className={"layout"}>
                    <Header className={"header"}>{this.getTitle()}</Header>
                    <Content className={"content"}><Questions questions={questionnaire.questions}
                                                              warringVisible={this.state.warringVisible}
                                                              changeAnswer={this.changeAnswer}/></Content>
                    <Button type={"primary"} className={"button"} onClick={this.submit}>提交</Button>
                    {this.state.warringVisible.every(item => item === false) ? null : (
                        <p className={"alert"}>您还有{this.count()}题未填写</p>)}
                    <Footer className={"footer"}>{this.getFooter()}</Footer>
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
        }
    }
}

export default FillQuestionnaire