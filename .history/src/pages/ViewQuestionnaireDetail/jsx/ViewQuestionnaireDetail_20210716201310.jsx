import React, {Component} from 'react';
import {Badge, Descriptions, Modal, Typography} from "antd";
import '../css/ViewQuestionnaireDetail.css'
import timeConversion from '../../../utils/TimeConversion'

const {Title} = Typography;

class ViewQuestionnaireDetail extends Component {
    constructor() {
        super();
        this.state = {
            questionnaire: {
                title: "",
                publisher: "",
                fillerCount: 0,
                qid: "",
                releaseTime: "",
                deadline: "",
                state: 0,
                questions: []
            }
        }
    }

    componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot: SS) {
        if (this.props !== prevProps) {
            const Params = {
                "qid": this.props.qid
            };
            if (this.props.qid !== -1) {
                fetch('api/quesContent', {
                    method: 'post',
                    body: JSON.stringify(Params),
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                }).then(res => res.json())
                    .then(res => {
                        const get = res.data.data[0];
                        // console.log("get si :",get);
                        this.setState({
                            questionnaire: {
                                title: get.title,
                                publisher: get.author,
                                fillerCount: get.total,
                                qid: get.qid,
                                releaseTime: get.start_time,
                                deadline: get.time,
                                status: get.status === 0 ? "未发布" : (get.status === 1 ? "发布中" : "已过期"),
                                questions: get.ask_list.map((list) => {
                                    return ({
                                        subject: list.ask,
                                        type: list.type === 1 ? "单选题" : (list.type === 2 ? "多选题" : "文本题"),
                                        isNecessary: list.isNecessary,
                                        options: list.choice_list.map((choice) => {
                                            return (choice.content)
                                        })
                                    })
                                })
                            }
                        })
                    })
            }
        }
        console.log("questions-",this.staquestionnaire.questions);
    }

    render() {
        const questionnaire = this.state.questionnaire
        if (questionnaire.title === "") {
            return null
        } else {
            return (
                <Modal
                    visible={this.props.modalVisible}
                    onOk={() => this.props.handleOk(questionnaire.status,questionnaire.qid)}
                    onCancel={this.props.handleCancel}
                    okText={questionnaire.status === "未发布" ? "发布问卷" : (questionnaire.status === "发布中" ? "分享链接" : "确定")}
                    cancelText={"关闭"}
                    closable={true}
                    width={1000}>
                    <Descriptions title="问卷详情" column={2} layout={"horizontal"} bordered>
                        <Descriptions.Item label="问卷题目">{questionnaire.title}</Descriptions.Item>
                        <Descriptions.Item label="发布者">{questionnaire.publisher}</Descriptions.Item>
                        <Descriptions.Item label="答卷人次">{questionnaire.fillerCount}</Descriptions.Item>
                        <Descriptions.Item label="问卷ID">{questionnaire.qid}</Descriptions.Item>
                        <Descriptions.Item
                            label="发布时间">{timeConversion(questionnaire.releaseTime)}</Descriptions.Item>
                        <Descriptions.Item
                            label="截止时间">{timeConversion(questionnaire.deadline)}</Descriptions.Item>
                        <Descriptions.Item label="问卷状态" span={2}>
                            {questionnaire.status === "发布中" ?
                                <Badge status="processing" text="发布中"/> : (questionnaire.status === "未发布" ?
                                    <Badge status="default" text="未发布"/> : <Badge status="warning" text="已过期"/>)}
                        </Descriptions.Item>
                    </Descriptions>
                    <Descriptions bordered>
                        <Descriptions.Item label="问卷题目">
                            {questionnaire.questions.map((question, questionID) => {
                                return (
                                    <div key={questionID}>
                                        <Title
                                            level={5}>{questionID + 1 + ". " + question.subject + " [" + question.type + "] "}<span
                                            className={"view_detail_span"}>{(question.isNecessary === true ? "*" : "")}</span></Title>
                                        <p>{question.type === "文本题" ? null : question.options.map((option, optionID) => {
                                            return <span key={optionID}>
                                            <span><strong>{String.fromCharCode(65 + optionID)}.</strong>&nbsp;{option}&nbsp;&nbsp;</span>
                                            <br/>
                                        </span>
                                        })}</p>
                                        <br/>
                                    </div>
                                )
                            })}
                            <br/>
                        </Descriptions.Item>
                    </Descriptions>
                </Modal>
            )
        }
    }
}

export default ViewQuestionnaireDetail