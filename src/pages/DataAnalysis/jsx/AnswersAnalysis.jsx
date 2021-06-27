import React, {Component} from 'react';
import RadioMultipleAnalysis from "./RadioMultipleAnalysis";
import TextAnalysis from "./TextAnalysis";

class AnswersAnalysis extends Component {
    render() {
        const questionnaire = this.props.questionnaire;
        const answerSheet = this.props.answerSheet;
        const submitTime = this.props.submitTime;
        return (
            questionnaire.questions.map((question, questionID) => {
                if (questionnaire.questions[questionID].type === "radio" || questionnaire.questions[questionID].type === "multiple") {
                    return (<RadioMultipleAnalysis key={questionID} question={questionnaire.questions[questionID]}
                                                   answerSheet={answerSheet} questionID={questionID}
                                                   questionnaire={questionnaire}/>)
                } else {
                    return (<TextAnalysis key={questionID} question={questionnaire.questions[questionID]}
                                          answerSheet={answerSheet} questionID={questionID}
                                          questionnaire={questionnaire} submitTime={submitTime}/>)
                }
            })
        )
    }
}

export default AnswersAnalysis