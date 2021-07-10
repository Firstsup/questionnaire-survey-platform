import React, {Component} from 'react';
import ReactDom from 'react-dom';
import {DeleteOutlined,PlusOutlined}from '@ant-design/icons';
import { Radio, Input, Space, Button  } from 'antd';
import EditRadio from './EditRadio';
import EditCheckbox from './EditCheckbox';
import EditText from './EditText';


class Questions extends Component {
    render() {
        let questions = this.props.askList;
        return (
            questions.map((item, aid) => {
                if (item.type === 1) {
                    return (
                        <EditRadio key={aid} ask={this.props.ask} aid={aid} choiceList={this.props.choiceList} isNecessary={this.props.isNecessary}
                                      onChange={this.handleChange}/>
                    )
                } else if (item.type === 2) {
                    return (
                        <EditCheckbox key={aid} ask={this.props.ask} aid={aid} choiceList={this.props.choiceList} isNecessary={this.props.isNecessary}
                        onChange={this.handleChange}/>
                    )
                } else {
                    return (
                        <EditText key={aid} ask={this.props.ask} aid={aid} choiceList={this.props.choiceList} isNecessary={this.props.isNecessary}
                        onChange={this.handleChange}/>
                    )
                }
            })
        )
    }
}

export default Questions