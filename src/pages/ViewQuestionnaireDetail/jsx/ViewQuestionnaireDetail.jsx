import React, {Component} from 'react';
import {Modal, Descriptions, Badge, Typography} from "antd";
import '../css/ViewQuestionnaireDetail.css'

const {Title} = Typography;

class ViewQuestionnaireDetail extends Component {
    render() {
        const questionnaire = this.props.questionnaire
        return (
            <Modal
                visible={this.props.modalVisible}
                onOk={this.props.handleOk}
                onCancel={this.props.handleCancel}
                okText={"分享链接"}
                cancelText={"关闭"}
                closable={true}
                width={1000}>
                <Descriptions title="问卷详情" column={2} layout={"horizontal"} bordered>
                    <Descriptions.Item label="问卷题目">{questionnaire.title}</Descriptions.Item>
                    <Descriptions.Item label="发布者">{questionnaire.publisher}</Descriptions.Item>
                    <Descriptions.Item label="答卷人次">{questionnaire.fillerCount}</Descriptions.Item>
                    <Descriptions.Item label="问卷ID">{questionnaire.qid}</Descriptions.Item>
                    <Descriptions.Item label="发布时间">{questionnaire.releaseTime.toLocaleDateString()}</Descriptions.Item>
                    <Descriptions.Item label="截止时间">{questionnaire.deadline.toLocaleDateString()}</Descriptions.Item>
                    <Descriptions.Item label="问卷状态" span={2}>
                        {questionnaire.state === "发布中" ?
                            <Badge status="processing" text="发布中"/> : (questionnaire.state === "未发布" ?
                                <Badge status="default" text="未发布"/> : <Badge status="warning" text="已过期"/>)}
                    </Descriptions.Item>
                </Descriptions>
                <Descriptions bordered>
                    <Descriptions.Item label="问卷题目">
                        {questionnaire.questions.map((question, questionID) => {
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
                        })}
                        <br/>
                    </Descriptions.Item>
                </Descriptions>
            </Modal>
        )
    }
}

export default ViewQuestionnaireDetail