import React, {Component} from 'react';
import {Modal, Descriptions, Typography} from "antd";
import '../css/SubmitDetailQuestionnaire.css'

const {Title} = Typography;

class ViewQuestionnaireDetail extends Component {
    // state = {
    //     questionnaire: {
    //         title: "",
    //         publisher: "",
    //         fillerCount: 0,
    //         qid: "",
    //         releaseTime: "",
    //         deadline: "",
    //         state: 0,
    //         questions: []
    //     }
    // }

    // componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot: SS) {
    //     if (this.props !== prevProps) {
    //         const Params = {
    //             "qid": this.props.qid,
    //             "ans_qid":this.props.ans_qid
    //         };
    //         if (this.props.qid !== -1) {
    //             fetch('/api/ansContent', {
    //                 method: 'post',
    //                 body: JSON.stringify(Params),
    //                 headers: {
    //                     'Accept': 'application/json',
    //                     'Content-Type': 'application/json',
    //                 },
    //             }).then(res => res.json())
    //                 .then(res => {
    //                     console.log("返回:",res.data);
    //                     const get = res.data.data[0];
    //                     // this.setState({
    //                     //     questionnaire: {
    //                     //         title: get.title,
    //                     //         publisher: get.author,
    //                     //         fillerCount: get.total,
    //                     //         qid: get.qid,
    //                     //         releaseTime: get.start_time,
    //                     //         deadline: get.time,
    //                     //         status: get.status === 0 ? "未发布" : (get.status === 1 ? "发布中" : "已过期"),
    //                     //         questions: get.ask_list.map((list) => {
    //                     //             return ({
    //                     //                 subject: list.ask,
    //                     //                 type: list.type === 1 ? "单选题" : (list.type === 2 ? "多选题" : "文本题"),
    //                     //                 isNecessary: list.isNecessary,
    //                     //                 options: list.choice_list.map((choice) => {
    //                     //                     return (choice.content)
    //                     //                 })
    //                     //             })
    //                     //         })
    //                     //     }
    //                     // })
    //                 })
    //         }
    //     }
    // }

    render() {
        const {questionnaire,answers} = this.props
        console.log("questionnaire",questionnaire);
        console.log("ans:",answers);
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