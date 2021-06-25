import React, {Component} from 'react';
import {Typography, Radio, Space} from "antd";
import '../css/Question.css'

const {Title} = Typography;

class RadioQuestion extends Component {
    constructor(props) {
        super(props);
        this.state = {
            choice: 0,
            warringVisible: this.props.warringVisible
        }
    }

    handleRadioChange = (e) => {
        setTimeout(() => {
            this.setState({choice: e.target.value})
            this.props.changeAnswer(this.props.questionID, this.state.choice)
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
                       level={4}>{questionID + 1}.&nbsp;{question.subject}&nbsp;<span className={"question_span"}>[单选题]</span>&nbsp;&nbsp;{this.state.warringVisible[questionID] ? (
                    <span className={"question_show_warring"}>请填写本题</span>) : null}</Title>
                <div className={"question_left"}/>
                <Radio.Group className={"question_radio_group"}>
                    <Space direction="vertical">
                        {
                            question.options.map((option, optionID) => {
                                return (
                                    <Radio key={optionID} value={optionID + 1}
                                           onChange={this.handleRadioChange}>{option}</Radio>
                                )
                            })
                        }
                    </Space>
                </Radio.Group>
            </div>
        )
    }
}

export default RadioQuestion