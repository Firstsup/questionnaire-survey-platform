import React, {Component} from 'react';
import RadioTable from "./RadioTable";
import Title from "antd/es/typography/Title";
import {Button} from "antd";
import {BarChartOutlined, PieChartOutlined} from "@ant-design/icons";
import * as echarts from 'echarts';
import $ from 'jquery'
import '../css/Analysis.css'

class RadioAnalysis extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pieChartVisible: false,
            barChartVisible: false
        }
    }

    getCount = (answerSheet, option, question, questionID) => {
        let count = 0;
        answerSheet.forEach((answers) => {
            if (question.options[answers[questionID].answer - 1] === option) {
                return count++;
            }
            return count;
        })
        return count;
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

    getProportion = (count) => {
        return (
            this.toPercent(count / this.props.question.options.length)
        )
    }

    toPercent = (point) => {
        let str = Number(point * 100).toFixed(2);
        str = this.removeTail0(str)
        if (str === "") {
            str += 0
        }
        str += "%";
        return str;
    }

    removeTail0 = (str) => {
        if (!(str.charAt(str.length - 1) === ('0')) && !(str.charAt(str.length - 1) === ('.'))) {
            return str;
        } else {
            return this.removeTail0(str.slice(0, str.length - 1));
        }
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
        const sumCount = this.getSumCount();
        const counts = question.options.map((option) => {
            return (this.getCount(answerSheet, option, question, questionID))
        })
        const proportions = question.options.map((option) => {
            return (this.getProportion(this.getCount(answerSheet, option, question, questionID)))
        })

        if (this.state.pieChartVisible === true) {
            $(() => {
                let pieChart = echarts.getInstanceByDom(document.getElementById('pieChartContainer' + questionID));
                if (pieChart == null) {
                    pieChart = echarts.init(document.getElementById('pieChartContainer' + questionID));
                }
                const pieChartOption = {
                    title: {text: question.subject, left: "center"},
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
                            data: question.options.map((option, optionID) => {
                                return (
                                    {
                                        name: option,
                                        value: counts[optionID],
                                    }
                                )
                            })
                        }
                    ]
                };

                barChartOption && barChart.setOption(barChartOption);

            })
        }

        return (
            <>
                <Title
                    level={5}>{questionID + 1}.{question.subject}&nbsp;&nbsp;[单选题]&nbsp;{question.isNecessary === true ?
                    <span>[必填]</span> : <span>[非必填]</span>}</Title>
                <RadioTable key={questionID} question={question} answerSheet={answerSheet} sumCount={sumCount}
                            counts={counts} proportions={proportions} questionID={questionID}
                            questionnaire={questionnaire}/>
                {this.state.pieChartVisible ?
                    <Button onClick={this.handlePieChartClick}><PieChartOutlined/>隐藏饼状图</Button> :
                    <Button type={"primary"} onClick={this.handlePieChartClick}><PieChartOutlined/>显示饼状图</Button>}
                {this.state.barChartVisible ?
                    <Button onClick={this.handleBarChartClick}><BarChartOutlined/>隐藏柱状图</Button> :
                    <Button type={"primary"} onClick={this.handleBarChartClick}><BarChartOutlined/>显示柱状图</Button>}
                {this.state.pieChartVisible ? <div id={"pieChartContainer" + questionID} className={"pieChart"}
                                                   style={{display: this.state.pieChartVisible}}/> : null}
                {this.state.barChartVisible ? <div id={"barChartContainer" + questionID} className={"barChart"}
                                                   style={{display: this.state.barChartVisible}}/> : null}
            </>
        )
    }

}

export default RadioAnalysis