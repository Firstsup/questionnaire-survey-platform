import React, {Component} from 'react';
import {Button, Modal, Table, Input, Divider} from "antd";
import Title from "antd/es/typography/Title";
import '../css/Analysis.css'

const {Search} = Input;

class TextAnalysis extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false,
            data: this.initData()
        }
    }

    handleOnclick = () => {
        this.setState({
            modalVisible: true
        })
    }

    handleOk = () => {
        this.setState({
            modalVisible: false
        })
    }

    handleCancel = () => {
        this.setState({
            modalVisible: false
        })
    }

    initData = () => {
        let id = 0;
        let data = this.props.answerSheet.map((answer, answerID) => {
            if (answer[this.props.questionID].answer != null) {
                return (
                    {
                        key: answerID,
                        id: ++id,
                        submitTime: this.props.submitTime[answerID].toLocaleDateString(),
                        answer: answer[this.props.questionID].answer
                    }
                )
            }
            return null
        })
        for (let i = 0; i < data.length; i++) {
            if (data[i] == null) {
                data.splice(i, 1);
                i--;
            }
        }
        return data
    }

    onSearch = (value) => {
        let data = this.initData()
        for (let i = 0; i < data.length; i++) {
            if (data[i] == null || !data[i].answer.includes(value)) {
                data.splice(i, 1);
                i--;
            }
        }
        this.setState({
            data: data
        })
    }

    render() {
        const questionID = this.props.questionID;
        const question = this.props.questionnaire.questions[this.props.questionID]

        const columns = [
            {
                title: <span style={{fontWeight: "bold"}}>序号</span>,
                dataIndex: 'id',
                align: "center",
                width: '10%'
            },
            {
                title: <span style={{fontWeight: "bold"}}>提交时间</span>,
                dataIndex: 'submitTime',
                align: "center",
                width: '20%'
            },
            {
                title: <span style={{fontWeight: "bold"}}>答案内容</span>,
                dataIndex: 'answer',
            }
        ]

        return (
            <>
                <Title
                    level={5}>{questionID + 1}.&nbsp;{question.subject}&nbsp;&nbsp;<span
                    className={"analysis_question_type"}>[文本题]</span>&nbsp;&nbsp;{question.isNecessary === true ?
                    <span className={"analysis_question_isNecessary"}>[必填]</span> :
                    <span className={"analysis_question_isNecessary"}>[非必填]</span>}</Title>
                <Button className={"text_button"} type={"primary"} onClick={this.handleOnclick}>查看详细信息</Button>
                <Modal
                    title={questionID + 1 + '. ' + question.subject}
                    visible={this.state.modalVisible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    footer={null}
                    width={1000}>
                    <Search className={"text_search"} placeholder="输入搜索内容" allowClear onSearch={this.onSearch} style={{width: 350}}/>
                    <Table columns={columns}
                           dataSource={this.state.data}
                           bordered
                    />
                </Modal>
                <Divider/>
            </>
        )
    }
}

export default TextAnalysis