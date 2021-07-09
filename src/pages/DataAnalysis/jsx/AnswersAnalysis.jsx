import React, {Component} from 'react';
import RadioMultipleAnalysis from "./RadioMultipleAnalysis";
import TextAnalysis from "./TextAnalysis";

class AnswersAnalysis extends Component {
    render() {
        const questionnaire = this.props.questionnaire;
        return (
            questionnaire.questions.map((question, questionID) => {
                if (questionnaire.questions[questionID].type === "radio" || questionnaire.questions[questionID].type === "multiple") {
                    return (<RadioMultipleAnalysis key={questionID} question={questionnaire.questions[questionID]}
                                                   countAll={this.props.countAll}
                                                   count={this.props.count} questionID={questionID}
                                                   questionnaire={questionnaire}/>)
                } else {
                    return (<TextAnalysis key={questionID}
                                          qid={questionnaire.qid}
                                          question={questionnaire.questions[questionID]}
                                          aid={questionID + 1}/>)
                }
            })
        )
    }
}

export default AnswersAnalysis