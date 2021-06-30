import React, {Component} from 'react';
import '../css/Question.css'
import {Input} from 'antd';
import {Typography} from "antd";

const {Title} = Typography;
const {TextArea} = Input;

class TextQuestion extends Component {
    constructor(props) {
        super(props);
        this.state = {
            answer: null,
            warringVisible: this.props.warringVisible
        }
    }

    handleTextChange = e => {
        setTimeout(() => {
            this.setState({answer: e.target.value})
            this.props.changeAnswer(this.props.questionID, this.state.answer.trim())
        })
    }

    render() {
        let question = this.props.question;
        let questionID = this.props.questionID;
        return (
            <div className={"question"}>
                <div className={"question_left"}>
                    {
                        question.isNecessary ? (<p className={"question_isNecessary"}>*</p>) : null
                    }
                </div>
                <Title className={"question_title"}
                       level={4}>{questionID + 1}.&nbsp;{question.subject}&nbsp;<span className={"question_span"}>[文本题]</span>&nbsp;&nbsp;{this.state.warringVisible[questionID] ? (
                    <span className={"question_show_warring"}>请填写本题</span>) : null}</Title>
                <div className={"question_left"}/>
                <TextArea className={"question_textarea"} showCount maxLength={50} onChange={this.handleTextChange}/>
            </div>
        )
    }
}

export default TextQuestion