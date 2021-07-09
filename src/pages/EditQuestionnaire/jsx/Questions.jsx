import React, {Component} from 'react';
import ReactDom from 'react-dom';
import {DeleteOutlined,PlusOutlined}from '@ant-design/icons';
import { Radio, Input, Space, Button  } from 'antd';
import { //引入react-dnd
    DragSource,
    DropTarget,
} from 'react-dnd';
import EditRadio from './EditRadio';
import EditCheckbox from './EditCheckbox';
import EditText from './EditText';


class Questions extends Component {
    render() {
        let questions = this.props.askList;
        return (
            questions.map((ask, aid) => {
                if (ask.type === 1) {
                    return (
                        <EditRadio key={aid} ask={ask} aid={aid} choiceList={choiceList} isNecessary={isNecessary}
                                      onChange={this.handleChange}/>
                    )
                } else if (ask.type === 2) {
                    return (
                        <EditCheckbox key={aid} ask={ask} aid={aid} choiceList={choiceList}
                        onChange={this.handleChange}/>
                    )
                } else {
                    return (
                        <EditText key={aid} ask={ask} aid={aid} choiceList={choiceList}
                        onChange={this.handleChange}/>
                    )
                }
            })
        )
    }
}

export default Questions