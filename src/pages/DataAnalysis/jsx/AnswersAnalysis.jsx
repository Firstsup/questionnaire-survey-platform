import React, {Component} from 'react';
import RadioAnalysis from "./RadioAnalysis";
import MultipleAnalysis from "./MultipleAnalysis";
import TextAnalysis from "./TextAnalysis";

class AnswersAnalysis extends Component {
    render() {
        const questionnaire = this.props.questionnaire;
        const answerSheet = this.props.answerSheet;
        return (
            questionnaire.questions.map((question, questionID) => {
                if (questionnaire.questions[questionID].type === "radio") {
                    return(<RadioAnalysis key={questionID} question={questionnaire.questions[questionID]} answerSheet={answerSheet} questionID={questionID} questionnaire={questionnaire}/>)
                }
                else if (questionnaire.questions[questionID].type === "multiple") {
                    return(<MultipleAnalysis key={questionID} question={questionnaire.questions[questionID]} answerSheet={answerSheet} questionID={questionID} questionnaire={questionnaire}/>)
                }
                else {
                    return(<TextAnalysis key={questionID} question={questionnaire.questions[questionID]} answerSheet={answerSheet} questionID={questionID} questionnaire={questionnaire}/>)
                }
            })
        )
    }
}

export default AnswersAnalysis