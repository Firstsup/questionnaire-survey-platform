import React, {Component} from 'react';
import AnswersAnalysis from "./AnswersAnalysis";
import {Layout, Button, Spin} from "antd";
import {Content, Footer, Header} from "antd/es/layout/layout";
import '../css/DataAnalysis.css'
import Title from "antd/es/typography/Title";

class DataAnalysis extends Component {
    constructor() {
        super();
        this.state = {
            questionnaire: {
                title: "",
                qid: "",
                status: "",
                questions: []
            },
            countAll: [],
            count: [],
            loading: true
        }
    }

    handleViewClick = () => {
        this.props.history.push('/submitlistquestionnaire?qid=' + this.state.qid)
    }

    handleBackClick = () => {
        this.props.history.goBack()
    }

    componentDidMount() {
        let max = 0;
        const params = {
            "qid": this.props.location.search.slice(5)
        };
        fetch('/api/fill', {
            method: 'post',
            body: JSON.stringify(params),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        }).then(res => res.json())
            .then(res => {
                const get = res.data.data[0];
                this.setState({
                    questionnaire: {
                        title: get.title,
                        qid: get.qid,
                        status: get.status === 1 ? "active" : "",
                        questions: get.ask_list.map((list) => {
                            return ({
                                subject: list.ask,
                                type: list.type === 1 ? "radio" : (list.type === 2 ? "multiple" : "text"),
                                isNecessary: list.isNecessary,
                                options: list.choice_list.map((choice) => {
                                    return (choice.content)
                                })
                            })
                        })
                    }
                })
                for (let i = 0; i < get.ask_list.length; i++) {
                    if (get.ask_list[i].choice_list.length > max) {
                        max = get.ask_list[i].choice_list.length
                    }
                }
            })
        fetch('/api/analysis', {
            method: 'post',
            body: JSON.stringify(params),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        }).then(res => res.json())
            .then(res => {      
                const get = res.data.data;
                log
                console.log("get.count",get.count);
                let countAll = [];
                for (const c in get.count) {
                    console.log("c",c)
                    countAll.push(parseInt(get.count[c]))
                }
                console.log("countAll",countAll);
                let count = get.cnt;
                if (count != "") {
                    console.log("get.cnt",get.cnt);
                    console.log("count[0]",count[0]);
                    count = count[0].map(function (col, i) {
                        return count.map(function (row) {
                            return row[i];
                        })
                    });
                }
                this.setState({
                    countAll: countAll != "" ? countAll : this.state.questionnaire.questions.map(() => {
                        return 0
                    }),
                    count: count != "" ? count : this.state.questionnaire.questions.map(() => {
                        return (new Array(max).fill(0))
                    }),
                    loading: false
                })
            });
    }

    render() {
        if (this.state.loading === true || this.state.questionnaire.title === "") {
            return (
                <div
                    style={{
                        height: document.documentElement.clientHeight,
                        width: document.documentElement.clientWidth
                    }}>
                    <Spin className={"dataAnalysis_spin"} tip="加载中..."/></div>
            )
        } else {
            return (
                <Layout className={"analysis_layout"}>
                    <Header className={"analysis_header"}><Title className={"analysis_header_title"}
                                                                 level={2}>问卷《{this.state.questionnaire.title}》&nbsp;结果分析</Title></Header>
                    <Content className={"analysis_content"}><AnswersAnalysis className={"analysis_answers"}
                                                                             questionnaire={this.state.questionnaire}
                                                                             countAll={this.state.countAll}
                                                                             count={this.state.count}/></Content>
                    <Footer className={"analysis_footer"}><Button type={"primary"} className={"analysis_view_button"}
                                                                  onClick={this.handleViewClick}>查看具体答卷</Button><Button
                        onClick={this.handleBackClick}>返回</Button></Footer>
                </Layout>
            )
        }
    }
}

export default DataAnalysis