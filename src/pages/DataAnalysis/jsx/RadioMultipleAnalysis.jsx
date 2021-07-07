import React, {Component} from 'react';
import RadioMultipleTable from "./RadioMultipleTable";
import Title from "antd/es/typography/Title";
import {Button, Divider} from "antd";
import {BarChartOutlined, PieChartOutlined} from "@ant-design/icons";
import * as echarts from 'echarts';
import $ from 'jquery'
import '../css/Analysis.css'

class RadioMultipleAnalysis extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pieChartVisible: false,
            barChartVisible: false
        }
    }

    getCount = (answerSheet, option, question, questionID) => {
        if (question.type === "radio") {
            let count = 0;
            answerSheet.forEach((answers) => {
                if (question.options[answers[questionID].answer - 1] === option) {
                    return count++;
                }
                return count;
            })
            return count;
        } else {
            let count = 0;
            answerSheet.forEach((answers) => {
                for (let i = 0; i < (answers[questionID].answer == null ? 0 : answers[questionID].answer.length); i++) {
                    if (question.options[answers[questionID].answer[i] - 1] === option) {
                        return count++;
                    }
                }
                return count;
            })
            return count;
        }
    }

    getSumCount = () => {
        let c = 0;
        for (let i = 0; i < this.props.answerSheet.length; i++) {
            if (this.props.answerSheet[i][this.props.questionID].answer !== null) {
                c++;
            }
        }
        return c;
    }

    getProportion = (count, sumCount) => {
        return (
            this.toPercent(count / sumCount)
        )
    }

    toPercent = (point) => {
        let str = parseFloat(Number(point * 100).toFixed(2));
        str += "%";
        return str;
    }

    handlePieChartClick = () => {
        this.setState({
            pieChartVisible: !this.state.pieChartVisible
        })
    }

    handleBarChartClick = () => {
        this.setState({
            barChartVisible: !this.state.barChartVisible
        })
    }

    render() {
        const questionID = this.props.questionID;
        const question = this.props.questionnaire.questions[this.props.questionID]
        const answerSheet = this.props.answerSheet;
        const questionnaire = this.props.questionnaire;
        const sumCount = this.getSumCount(question);
        const counts = question.options.map((option) => {
            return (this.getCount(answerSheet, option, question, questionID))
        })
        const proportions = question.options.map((option, optionID) => {
            return (this.getProportion(counts[optionID], sumCount))
        })

        if (this.state.pieChartVisible === true) {
            $(() => {
                let pieChart = echarts.getInstanceByDom(document.getElementById('pieChartContainer' + questionID));
                if (pieChart == null) {
                    pieChart = echarts.init(document.getElementById('pieChartContainer' + questionID));
                }
                const pieChartOption = {
                    tooltip: {trigger: "item"},
                    legend: {
                        orient: 'vertical',
                        left: 'left',
                    },
                    series: [
                        {
                            type: 'pie',
                            radius: '50%',
                            data: question.options.map((option, optionID) => {
                                return (
                                    {
                                        name: option,
                                        value: counts[optionID],
                                    }
                                )
                            }),
                            emphasis: {
                                itemStyle: {
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                                }
                            }
                        }
                    ]
                };
                pieChartOption && pieChart.setOption(pieChartOption);
            })
        }

        if (this.state.barChartVisible === true) {
            $(() => {
                let barChart = echarts.getInstanceByDom(document.getElementById('barChartContainer' + questionID));
                if (barChart == null) {
                    barChart = echarts.init(document.getElementById('barChartContainer' + questionID));
                }
                const barChartOption = {
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'shadow'
                        }
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis: [
                        {
                            type: 'category',
                            data: question.options.map((option) => option),
                            axisTick: {
                                alignWithLabel: true
                            }
                        }
                    ],
                    yAxis: [
                        {
                            type: 'value'
                        }
                    ],
                    series: [
                        {
                            type: 'bar',
                            barWidth: '60%',
                            data: counts.map((count) => count)
                        }
                    ]
                };

                barChartOption && barChart.setOption(barChartOption);

            })
        }

        return (
            <>
                <Title
                    level={5}>{questionID + 1}.&nbsp;{question.subject}&nbsp;&nbsp;{question.type === "radio" ?
                    <span className={"analysis_question_type"}>[单选题]</span> :
                    <span className={"analysis_question_type"}>[多选题]</span>}&nbsp;&nbsp;{question.isNecessary === true ?
                    <span className={"analysis_question_isNecessary"}>[必填]</span> :
                    <span className={"analysis_question_isNecessary"}>[非必填]</span>}</Title>
                <RadioMultipleTable className={"analysis_table"} key={questionID} question={question}
                                    answerSheet={answerSheet} sumCount={sumCount}
                                    counts={counts} proportions={proportions} questionID={questionID}
                                    questionnaire={questionnaire}/>
                <span className={"analysis_chart_buttons"}>{this.state.pieChartVisible ?
                    <Button className={"pieChartButton"}
                            onClick={this.handlePieChartClick}><PieChartOutlined/>隐藏饼状图</Button> :
                    <Button className={"pieChartButton"} type={"primary"}
                            onClick={this.handlePieChartClick}><PieChartOutlined/>显示饼状图</Button>}
                    {this.state.barChartVisible ?
                        <Button className={"barChartButton"} onClick={this.handleBarChartClick}><BarChartOutlined/>隐藏柱状图</Button> :
                        <Button className={"barChartButton"} type={"primary"}
                                onClick={this.handleBarChartClick}><BarChartOutlined/>显示柱状图</Button>}</span>
                {this.state.pieChartVisible ? <div id={"pieChartContainer" + questionID} className={"pieChart"}
                                                   style={{display: this.state.pieChartVisible}}/> : null}
                {this.state.barChartVisible ? <div id={"barChartContainer" + questionID} className={"barChart"}
                                                   style={{display: this.state.barChartVisible}}/> : null}
                <Divider/>
            </>
        )
    }

}

export default RadioMultipleAnalysis