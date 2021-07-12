import React, {Component} from 'react';
import ReactDom from 'react-dom';
import {DeleteOutlined, PlusOutlined} from '@ant-design/icons';
import {Radio, Input, Space, Button} from 'antd';
import EditRadio from './EditRadio';
import EditCheckbox from './EditCheckbox';
import EditText from './EditText';


class Questions extends Component {
    render() {
        let questions = this.props.questions;
        return (
            questions.map((item, aid) => {
                if (item.type === 'radio') {
                    return (
                        <EditRadio id={aid} key={aid} aid={aid + 1} question={item} 
                        handleChange={this.props.handleChange} handleDelete={this.props.handleDelete} moveUp={this.props.moveUp} moveDown={this.props.moveDown}/>
                    )
                } else if (item.type === 'multiple') {
                    return (
                        <EditCheckbox key={aid} aid={aid + 1} question={item} 
                        handleChange={this.props.handleChange} handleDelete={this.props.handleDelete} moveUp={this.props.moveUp} moveDown={this.props.moveDown}/>
                    )
                } else {
                    return (
                        <EditText key={aid} aid={aid + 1} question={item} 
                        handleChange={this.props.handleChange} handleDelete={this.props.handleDelete} moveUp={this.props.moveUp} moveDown={this.props.moveDown}/>
                    )
                }
            })
        )
    }
}

export default Questions