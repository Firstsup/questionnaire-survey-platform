import React from 'react';
import {
    CloseCircleOutlined,
    UpCircleOutlined,
    DownCircleOutlined
} from '@ant-design/icons';
import {Radio, Input, Button, Typography} from 'antd';
import "../css/CreatedQuestions.css"

const {Title} = Typography;

class AddText extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            aid: this.props.aid,
            question: this.props.question,
            value: null
        }
    }

    handleTitleChange = (value) => {
        const newSubject = value.target.value
        const question = {
            subject: newSubject,
            type: this.props.question.type,
            isNecessary: this.props.question.isNecessary,
            choiceList: this.props.question.choiceList
        }
        this.props.chiefHandleChange(this.state.aid, question)
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
            this.props.chiefHandleChange(this.state.aid, this.state.question)
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

    componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot: SS) {
        if (prevProps !== this.props) {
            this.setState({
                aid: this.props.aid,
                question: this.props.question
            })
        }
    }

    render() {
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
                <Button className={"add_button"} size={"small"} icon={<CloseCircleOutlined/>}
                        onClick={this.handleDelete}>删除</Button>
                <Button className={"add_button"} size={"small"} icon={<DownCircleOutlined/>}
                        onClick={this.moveDown}>下移</Button>
                <Button className={"add_button"} size={"small"} icon={<UpCircleOutlined/>}
                        onClick={this.moveUp}>上移</Button>
            </div>
        )
    }
}

export default AddText