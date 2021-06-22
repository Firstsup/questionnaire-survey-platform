import React, {Component} from 'react';
import RadioQuestion from "./RadioQuestion";
import MultipleQuestion from "./MultipleQuestion";
import TextQuestion from "./TextQuestion";

class Questions extends Component {
    render() {
        let questions = this.props.questions;
        return (
            questions.map((question, questionID) => {
                if (question.type === "radio") {
                    return (
                        <RadioQuestion key={questionID} question={question} questionID={questionID}
                                       warringVisible={this.props.warringVisible}
                                       changeAnswer={this.props.changeAnswer}/>
                    )
                } else if (question.type === "multiple") {
                    return (
                        <MultipleQuestion key={questionID} question={question} questionID={questionID}
                                          warringVisible={this.props.warringVisible}
                                          changeAnswer={this.props.changeAnswer}/>
                    )
                } else {
                    return (
                        <TextQuestion key={questionID} question={question} questionID={questionID}
                                      warringVisible={this.props.warringVisible}
                                      changeAnswer={this.props.changeAnswer}/>
                    )
                }
            })
        )
    }
}

export default Questions