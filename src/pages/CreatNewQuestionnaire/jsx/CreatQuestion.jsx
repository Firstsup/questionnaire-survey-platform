import React, {Component} from 'react';
import ReactDOM from "react-dom";
import { Row, Col,Space, Button,Radio, Input,Checkbox} from 'antd';
import { PlusCircleTwoTone,PlusSquareTwoTone, EditTwoTone,CheckOutlined} from '@ant-design/icons';
import {DeleteTwoTone,PlusOutlined}from '@ant-design/icons';
import AddRadio from './addRadio';
import AddCheckbox from './addCheckbox';
import AddText from './AddText';
import { Tag, Divider } from 'antd';
import { Layout } from 'antd';
import "../css/CreatQuestion.css"

class CreatQuestion extends  React.Component{
    render(){
        let questions = this.props.questions;
        return(
            questions.map((question, aid) => {
                if (question.type === 1) {
                    return (
                        <AddRadio  data-index={aid}  key={aid} question={question} aid={aid} ask={question.ask} type={question.type} 
                        isNecessary={question.isNecessary} choiceList={question.choiceList} handleDelete={this.props.handleDelete}
                        moveUp={this.props.moveUp} moveDown={this.props.moveDown} handleChange={this.props.handleChange}     />
                    )
                } else if (question.type === 2) {
                    return (
                        <AddCheckbox data-index={aid} key={aid} question={question} aid={aid} ask={question.ask} type={question.type} 
                        isNecessary={question.isNecessary} choiceList={question.choiceList} handleDelete={this.props.handleDelete}
                        moveUp={this.props.moveUp} moveDown={this.props.moveDown} handleChange={this.props.handleChange}     />
                    )
                } else {
                    return (
                        <AddText data-index={aid} key={aid} question={question} aid={aid} ask={question.ask} type={question.type} 
                        isNecessary={question.isNecessary} choiceList={question.choiceList} handleDelete={this.props.handleDelete}
                        moveUp={this.props.moveUp} moveDown={this.props.moveDown} handleChange={this.props.handleChange}     />
                    )
                }
            })
        )
    }
}
export default CreatQuestion