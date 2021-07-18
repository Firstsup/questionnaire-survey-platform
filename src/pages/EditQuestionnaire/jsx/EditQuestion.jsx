import React from 'react';
import EditRadio from "./EditRadio";
import EditMultiple from "./EditMultiple";
import EditText from "./EditText";

class EditQuestion extends React.Component {
    render() {
        let questions = this.props.questions;
        return (
            questions.map((question, aid) => {
                if (question.type === 'radio') {
                    return (
                        <EditRadio key={"radio" + aid + 1} question={question} aid={aid + 1}
                                   chiefHandleDelete={this.props.chiefHandleDelete}
                                   chiefMoveUp={this.props.chiefMoveUp} chiefMoveDown={this.props.chiefMoveDown}
                                   chiefHandleChange={this.props.chiefHandleChange}
                                   isNew={this.props.isNew}/>
                    )
                } else if (question.type === 'multiple') {
                    return (
                        <EditMultiple key={"multiple" + aid + 1} question={question} aid={aid + 1}
                                      chiefHandleDelete={this.props.chiefHandleDelete}
                                      chiefMoveUp={this.props.chiefMoveUp} chiefMoveDown={this.props.chiefMoveDown}
                                      chiefHandleChange={this.props.chiefHandleChange}
                                      isNew={this.props.isNew}/>
                    )
                } else {
                    return (
                        <EditText key={"text" + aid + 1} question={question} aid={aid + 1}
                                  chiefHandleDelete={this.props.chiefHandleDelete}
                                  chiefMoveUp={this.props.chiefMoveUp} chiefMoveDown={this.props.chiefMoveDown}
                                  chiefHandleChange={this.props.chiefHandleChange}
                                  isNew={this.props.isNew}/>
                    )
                }
            })
        )
    }
}

export default EditQuestion