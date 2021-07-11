import React, {Component} from 'react';
import ReactDom from 'react-dom';
import {DeleteOutlined, PlusOutlined} from '@ant-design/icons';
import {Radio, Input, Space, Button} from 'antd';


class EditCheckbox extends React.Component {
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
        this.addChoice = this.addChoice.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange = (event) => {
        const target = event.target;
        const name = target.name;
        const value = target.value;
        const key = target.key;
        if (name == "choiceList") {
            if (typeof this.state.choiceList[key] == '​undefined') {
                this.setState(prevState => ({
                    choicecontent: [...prevState.choiceList, value]
                }));
            } else {
                this.setState({
                    [name[key]]: value
                });
            }
        } else {
            this.setState({
                [name]: value
            });
        }
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

    addChoice() {
        this.setState(prevState => ({
            choiceList: [...prevState.choiceList,
                <Radio disabled={true}><Input name="choiceList" key={this.state.choicenum + 1} placeholder="请输入选项内容"
                                              onChange={this.handleChange}/></Radio>]
        }));
        this.setState({
            choicenum: this.state.choicenum + 1
        });
    }


    render() {
        return (
            // <RenderInCreatPage>
            <div>
                <div>
                    <div>
                        <span name="aid" value=""/*题号 根据该题在题目数组中的索引号+1生成 */ >这是第{this.state.aid}题</span>
                    </div>

                    <div>
                        <Input name="ask" onChange={this.handleChange} placeholder={this.state.subject}/>
                    </div>

                    <div>
                        <Button type="primary" onClick={this.handleDelete} icon={<DeleteOutlined/>}/>
                    </div>

                    <div>
                        <span>该题为：</span>
                        <Radio.Group name="isNecessary" value={this.state.isNecessary} onChange={this.handleChange}>
                            <Radio value={true}>必填</Radio>
                            <Radio value={false}>选填</Radio>
                        </Radio.Group>
                    </div>

                    <div>
                        <Radio.Group>
                            <Space direction="vertical">

                                {
                                    this.state.choiceList.map((choice, index) => {

                                        return (
                                            <Radio key={index + 1} disabled={true}><Input onChange={this.handleChange}
                                                                                          key={index + 1}
                                                                                          placeholder={choice}/></Radio>
                                        )
                                    })
                                }

                                <Button type="dashed" onClick={this.addChoice}><PlusOutlined/>添加选项</Button>

                            </Space>
                        </Radio.Group>
                    </div>
                    <Button onClick={this.moveUp}>上移</Button>
                    <Button onClick={this.moveDown}>下移</Button>
                </div>

            </div>
            // </RenderInCreatPage>

        )

    }

}

export default EditCheckbox