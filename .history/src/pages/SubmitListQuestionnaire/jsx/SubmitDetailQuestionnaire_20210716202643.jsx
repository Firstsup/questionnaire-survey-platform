import React, {Component} from 'react';
import {Modal, Descriptions, Typography} from "antd";
import '../css/SubmitDetailQuestionnaire.css'

const {Title} = Typography;

class ViewQuestionnaireDetail extends Component {
    state = {
        questionnaires: {
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

    render() {
        const {questionnaire,answers} = this.props
        console.log("questionnaire",questionnaire);
        console.log("ans:",answers);

        this.setState({
            questionnaires: {
                // title: get.title,
                // publisher: get.author,
                // fillerCount: get.total,
                // qid: get.qid,
                // releaseTime: get.start_time,
                // deadline: get.time,
                // status: get.status === 0 ? "未发布" : (get.status === 1 ? "发布中" : "已过期"),
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
        return (
            <Modal
                visible={this.props.modalVisible}
                onOk={this.props.handleDelete}
                onCancel={this.props.handleCancel}
                okText={"删除记录"}
                cancelText={"返回"}
                closable={true}
                width={1000}>
                <Descriptions title={"序号："} bordered></Descriptions>                 
                {/* {questionnaire.questions.map((question, questionID) => {
                    return (
                        <div key={questionID}>
                            <Title
                                level={5}>{questionID + 1 + ". " + question.subject + " [" + question.type + "] "}<span className={"view_detail_span"}>{(question.isNecessary === true ? "*" : "")}</span></Title>
                            <p>{question.type === "文本题" ? null : question.options.map((option, optionID) => {
                                return <span key={optionID}>
                                    <span><strong>{String.fromCharCode(65 + optionID)}.</strong>&nbsp;{option}&nbsp;&nbsp;</span>
                                    <br/>
                                </span>
                            })}</p>
                            <br/>
                        </div>
                    )
                })} */}
            </Modal>
        )
    }
}

export default ViewQuestionnaireDetail