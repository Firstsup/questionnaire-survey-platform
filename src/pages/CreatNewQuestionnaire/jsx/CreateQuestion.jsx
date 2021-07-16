import React from 'react';
import AddRadio from './AddRadio';
import AddMultiple from './AddMultiple';
import AddText from './AddText';

class CreateQuestion extends React.Component {
    render() {
        let questions = this.props.questions;
        return (
            questions.map((question, aid) => {
                if (question.type === 'radio') {
                    return (
                        <AddRadio key={"radio" + aid + 1} question={question} aid={aid + 1}
                                  chiefHandleDelete={this.props.chiefHandleDelete}
                                  chiefMoveUp={this.props.chiefMoveUp} chiefMoveDown={this.props.chiefMoveDown}
                                  chiefHandleChange={this.props.chiefHandleChange}/>
                    )
                } else if (question.type === 'multiple') {
                    return (
                        <AddMultiple key={"multiple" + aid + 1} question={question} aid={aid + 1}
                                     chiefHandleDelete={this.props.chiefHandleDelete}
                                     chiefMoveUp={this.props.chiefMoveUp} chiefMoveDown={this.props.chiefMoveDown}
                                     chiefHandleChange={this.props.chiefHandleChange}/>
                    )
                } else {
                    return (
                        <AddText key={"text" + aid + 1} question={question} aid={aid + 1}
                                 chiefHandleDelete={this.props.chiefHandleDelete}
                                 chiefMoveUp={this.props.chiefMoveUp} chiefMoveDown={this.props.chiefMoveDown}
                                 chiefHandleChange={this.props.chiefHandleChange}/>
                    )
                }
            })
        )
    }
}

export default CreateQuestion