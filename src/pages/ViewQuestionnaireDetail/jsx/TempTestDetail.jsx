import React, {Component} from 'react';
import {message, Button} from "antd";
import ViewQuestionnaireDetail from "./ViewQuestionnaireDetail";

const questionnaire = {
    title: "test",
    qid: "123",
    publisher: "Firstsup",
    state: "发布中",
    fillerCount: 5,
    releaseTime: new Date("2020-1-1"),
    deadline: new Date("2020-12-31"),
    questions: [
        {
            subject: "question1",
            type: "单选题",
            isNecessary: true,
            options: ["option1", "option2", "option3"],
        },
        {
            subject: "question2",
            type: "多选题",
            isNecessary: true,
            options: ["如今，数据科学竞赛（大数据竞赛，机器学习竞赛，人工智能算法竞赛）已经成为各大知名互联网企业征集解决方案和选拔人才的第一选择，很多同学为了拿到大厂offer，纷纷加入了数据竞赛的浪潮之中。遗憾的是，大部分同学都在激烈的竞争中成为炮灰，许多人不停地上网浏览各类竞赛开源分享，却依旧感到困惑迷茫。", "option2", "option3"],
        },
        {
            subject: "question3",
            type: "文本题",
            isNecessary: true,
        },
        {
            subject: "question4",
            type: "单选题",
            isNecessary: false,
            options: ["option1", "option2", "option3", "option4", "option5", "option6", "option7", "option8"],
        },
        {
            subject: "question5",
            type: "多选题",
            isNecessary: false,
            options: ["option1", "option2", "option3", "option4"],
        },
        {
            subject: "question6",
            type: "文本题",
            isNecessary: false,
        }
    ]
}

class TempTestDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            questionnaire: questionnaire,
            modalVisible: false
        }
    }

    handleOnClick = () => {
        this.setState({modalVisible: true})
    }

    handleOk = () => {
        //调用分享问卷链接
        message.success("问卷链接已拷贝至粘贴板").then(() => null);
    }

    handleCancel = () => {
        this.setState({modalVisible: false})
    }

    render() {
        return (
            <>
                <Button onClick={this.handleOnClick}>点我</Button>
                <ViewQuestionnaireDetail
                    questionnaire={this.state.questionnaire}
                    modalVisible={this.state.modalVisible}
                    handleOk={this.handleOk}
                    handleCancel={this.handleCancel}/>
            </>
        )
    }
}

export default TempTestDetail