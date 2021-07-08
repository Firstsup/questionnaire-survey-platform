import React, {Component} from 'react';
import {Checkbox, Space} from 'antd';
import {Typography} from "antd";
import '../css/Question.css'

const {Title} = Typography;

class MultipleQuestion extends Component {
    constructor(props) {
        super(props);
        this.state = {
            choice: [],
        }
    }

    handleMultipleChange = (checkedValues) => {
        setTimeout(() => {
            this.setState({choice: checkedValues.sort()})
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
                       level={4}>{questionID + 1}.&nbsp;{question.subject}&nbsp;<span className={"question_span"}>[多选题]</span>&nbsp;&nbsp;{this.props.warringVisible[questionID] ? (
                    <span className={"question_show_warring"}>请填写本题</span>) : null}</Title>
                <div className={"question_left"}/>
                <Checkbox.Group onChange={this.handleMultipleChange}>
                    <Space direction="vertical">
                        {
                            question.options.map((option, optionID) => {
                                return (
                                    <Checkbox key={optionID} value={optionID + 1}
                                    >{option}</Checkbox>
                                )
                            })
                        }
                    </Space>
                </Checkbox.Group>
            </div>
        )
    }
}

export default MultipleQuestion