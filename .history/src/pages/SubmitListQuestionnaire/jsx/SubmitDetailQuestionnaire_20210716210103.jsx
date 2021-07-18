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
        console.log("questionnaire-123",questionnaire);
        console.log("ans:",answers);

    console.log("dedaode",this.state.questionnaires.questions);
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