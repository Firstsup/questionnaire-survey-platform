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
        const {questionnaire,answers,xuhao} = this.props
        return (
            <Modal
                visible={this.props.modalVisible}
                onOk={this.props.handleDelete}
                onCancel={this.props.handleCancel}
                okText={"删除记录"}
                cancelText={"返回"}
                closable={true}
                width={1000}>
                <Descriptions title={"序号："+xuhao} bordered></Descriptions>                 
                {questionnaire.questions.map((question, questionID) => {
                    return (
                        <div key={questionID}>
                            <Title
                                level={5}>{questionID + 1 + ". " + question.subject + " [" + question.type + "] "}<span
                                className={"view_detail_span"}>{(question.isNecessary === true ? "*" : "")}</span></Title>
                            <p>{question.ans.map((option, optionID) => {
                                return <span key={optionID}>
                                <span>{option}&nbsp;&nbsp;</span>
                                <br/>
                            </span>
                            })}</p>
                            <br/>
                        </div>
                    )
                })}
            </Modal>
        )
    }
}

export default ViewQuestionnaireDetail