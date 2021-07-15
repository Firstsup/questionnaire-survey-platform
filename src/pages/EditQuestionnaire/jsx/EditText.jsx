import React, {Component} from 'react';
import ReactDom from 'react-dom';
import {DeleteOutlined, PlusOutlined} from '@ant-design/icons';
import {Radio, Input, Space, Button} from 'antd';
import '../css/EditQuestionnaire.css'

const {TextArea} = Input;

class EditText extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            aid: this.props.aid,
            subject: this.props.question.subject,
            type: this.props.question.type,
            isNecessary: this.props.question.isNecessary,
            choicenum: this.props.question.options.length,
            choiceList: this.props.question.options,
        }
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange = (event) => {
        const target = event.target;
        const name = target.name;
        const value = target.value;

        this.setState({
            [name]: value
        })

        this.props.handleChange(this.state.aid,name,value);
    }
    handleDelete = () => {
        this.props.handleDelete(this.state.aid - 1)
    }

    moveUp = () => {
        this.props.moveUp(this.state.aid - 1)
    }

    moveDown = () => {
        this.props.moveDown(this.state.aid - 1)
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps !== this.props) {
            this.setState({
                aid: this.props.aid,
                subject: this.props.question.subject,
                type: this.props.question.type,
                isNecessary: this.props.question.isNecessary,
                choicenum: this.props.question.options.length,
                choiceList: this.props.question.options,
            })
        }
    }

    render() {
        return (

            <div className="edit_questionsdiv">
                <div>
                    <div>
                        <span name="aid" value=""/*题号 根据该题在题目数组中的索引号+1生成 */ >这是第{this.state.aid}题</span>
                    </div>

                    <div>
                        <Input name="subject" onChange={this.handleChange} size="large" placeholder={this.state.subject}/>
                    </div>

                    <div>
                        <Button type="primary" onClick={this.handleDelete} size="large" icon={<DeleteOutlined/>}/>
                    </div>

                    <div>
                        <span>该题为：</span>
                        <Radio.Group name="isNecessary"  onChange={this.handleChange}>
                            <Radio value={true}>必填</Radio>
                            <Radio value={false}>选填</Radio>
                        </Radio.Group>
                    </div>
                    <Button onClick={this.moveUp}>上移</Button>
                    <Button onClick={this.moveDown}>下移</Button>

                </div>
            </div>


        )

    }

}

export default EditText