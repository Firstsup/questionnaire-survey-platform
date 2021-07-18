import React from 'react';
import {
    PlusOutlined,
    MinusOutlined,
    CloseCircleOutlined,
    UpCircleOutlined,
    DownCircleOutlined, InfoCircleOutlined, CheckCircleOutlined
} from '@ant-design/icons';
import {Radio, Input, Button, Typography, Space, Checkbox, message} from 'antd';
import "../css/EditedQuestions.css"

const {Title, Text} = Typography;

class EditMultiple extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            aid: this.props.aid,
            question: this.props.question,
            value: null,
            isEditing: this.props.isNew[this.props.aid - 1]
        }
    }

    addChoice = () => {
        const temp = this.state.question.choiceList
        temp.push("")
        this.setState({
            question: {
                subject: this.state.question.subject,
                type: this.state.question.type,
                isNecessary: this.state.question.isNecessary,
                choiceList: temp
            }
        });
    }

    handleTitleChange = (value) => {
        const newSubject = value.target.value
        const question = {
            subject: newSubject,
            type: this.props.question.type,
            isNecessary: this.props.question.isNecessary,
            choiceList: this.props.question.choiceList
        }
        this.props.chiefHandleChange(this.state.aid, question, this.props.isNew)
    }

    handleNecessaryChange = (value) => {
        setTimeout(() => {
            this.setState({
                question: {
                    subject: this.state.question.subject,
                    type: this.state.question.type,
                    isNecessary: value.target.value,
                    choiceList: this.state.question.choiceList
                }
            })
            this.props.chiefHandleChange(this.state.aid, this.state.question, this.props.isNew)
        })
    }

    handleChoiceChange = (value) => {
        const newChoice = value.target.value
        const question = {
            subject: this.props.question.subject,
            type: this.props.question.type,
            isNecessary: this.props.question.isNecessary,
            choiceList: this.props.question.choiceList.map((choice, cid) => {
                return (
                    value.target.name == cid ? newChoice : choice
                )
            })
        }
        this.props.chiefHandleChange(this.state.aid, question, this.props.isNew)
    }

    handleChoiceDelete = (value) => {
        let tempChoices = this.state.question.choiceList;
        for (let i = 0; i < tempChoices.length; i++) {
            if (i === value) {
                tempChoices.splice(i, 1);
                break;
            }
        }
        setTimeout(() => {
            this.setState({
                question: {
                    subject: this.state.question.subject,
                    type: this.state.question.type,
                    isNecessary: this.state.question.isNecessary,
                    choiceList: tempChoices
                }
            })
            this.props.chiefHandleChange(this.state.aid, this.state.question, this.props.isNew)
        })
    }

    handleDelete = () => {
        this.props.chiefHandleDelete(this.state.aid);
    }

    moveUp = () => {
        this.props.chiefMoveUp(this.state.aid);
    }

    moveDown = () => {
        this.props.chiefMoveDown(this.state.aid);
    }

    save = () => {
        let flag = 1
        if (this.state.question.subject === "") {
            flag = 0
        }
        for (let i = 0; i < this.state.question.choiceList.length; i++) {
            if (this.state.question.choiceList[i] === "") {
                flag = 0
            }
        }
        if (flag === 1) {
            this.setState({
                isEditing: false
            })
            let isNew = this.props.isNew
            for (let i = 0; i < isNew.length; i++) {
                if (i === this.props.aid - 1) {
                    isNew[i] = false
                }
            }
            this.props.chiefHandleChange(this.state.aid, this.state.question, isNew)
            return
        }
        message.warn("请将题目信息填写完整再保存")
    }

    edit = () => {
        this.setState({
            isEditing: true
        })
        let isNew = this.props.isNew
        for (let i = 0; i < isNew.length; i++) {
            if (i === this.props.aid - 1) {
                isNew[i] = true
            }
        }
        this.props.chiefHandleChange(this.state.aid, this.state.question, isNew)
    }

    componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot: SS) {
        if (prevProps !== this.props) {
            this.setState({
                aid: this.props.aid,
                question: this.props.question,
                isEditing: this.props.isNew[this.props.aid - 1]
            })
        }
    }

    render() {
        if (this.state.isEditing === true) {
            return (
                <div className={"add_div"}>
                    <Title level={3}>{this.state.aid}.&nbsp;<Input className={"add_title_input"} placeholder={"请输入题目"}
                                                                   value={this.props.question.subject}
                                                                   onChange={this.handleTitleChange}/></Title>
                    <div className={"add_isNecessary"}><span>该题为：&nbsp;&nbsp;</span>
                        <Radio.Group value={this.state.question.isNecessary} onChange={this.handleNecessaryChange}>
                            <Radio value={true}>必填</Radio>
                            <Radio value={false}>非必填</Radio>
                        </Radio.Group></div>
                    <div>
                        {this.props.question.choiceList.map((choice, cid) => {
                            return (
                                <div className={"create_checkbox_div"} key={cid}>
                                    <Space className={"add_space"} direction={"vertical"}>
                                        <div className={"add_choice_div"}>
                                            <Checkbox defaultChecked={false} disabled><Input
                                                className={"add_choice_input"}
                                                id={"radio" + this.state.aid + cid}
                                                name={cid}
                                                placeholder={"请输入选项"}
                                                value={choice}
                                                onChange={this.handleChoiceChange}/></Checkbox>
                                            <Button size={"small"} shape="circle"
                                                    icon={<MinusOutlined/>}
                                                    onClick={() => this.handleChoiceDelete(cid)}/>
                                        </div>
                                    </Space>
                                </div>
                            )
                        })}
                    </div>
                    <Button className={"add_choice"} type="dashed" onClick={this.addChoice}><PlusOutlined/>添加选项</Button>
                    <Button className={"add_button"} size={"small"} icon={<CloseCircleOutlined/>}
                            onClick={this.handleDelete}>删除</Button>
                    <Button className={"add_button"} size={"small"} icon={<DownCircleOutlined/>}
                            onClick={this.moveDown}>下移</Button>
                    <Button className={"add_button"} size={"small"} icon={<UpCircleOutlined/>}
                            onClick={this.moveUp}>上移</Button>
                    <Button className={"add_button"} type={"primary"} size={"small"} icon={<CheckCircleOutlined/>}
                            onClick={this.save}>保存</Button>
                </div>
            )
        } else {
            return (
                <div className={"add_div"}>
                    <Title className={"add_title"} level={3}>{this.state.aid}.&nbsp;</Title><Title
                    className={"add_title"} level={4}>{this.props.question.subject}</Title>
                    <div className={"add_isNecessary"}>该题为：&nbsp;&nbsp;{this.state.question.isNecessary === true ?
                        <span>必填</span> :
                        <span>非必填</span>}</div>
                    <div>
                        {this.props.question.choiceList.map((choice, cid) => {
                            return (
                                <div className={"create_checkbox_div"} key={cid}>
                                    <Space className={"add_space"} direction={"vertical"}>
                                        <div className={"add_choice_div"}>
                                            <Checkbox defaultChecked={false} disabled><Text>{choice}</Text></Checkbox>
                                        </div>
                                    </Space>
                                </div>
                            )
                        })}
                    </div>
                    <Button className={"add_button"} size={"small"} icon={<CloseCircleOutlined/>}
                            onClick={this.handleDelete}>删除</Button>
                    <Button className={"add_button"} size={"small"} icon={<DownCircleOutlined/>}
                            onClick={this.moveDown}>下移</Button>
                    <Button className={"add_button"} size={"small"} icon={<UpCircleOutlined/>}
                            onClick={this.moveUp}>上移</Button>
                    <Button className={"add_button"} size={"small"} icon={<InfoCircleOutlined/>}
                            onClick={this.edit}>编辑</Button>
                </div>
            )
        }
    }
}

export default EditMultiple