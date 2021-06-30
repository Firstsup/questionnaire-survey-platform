import React, {Component} from 'react';
import {Progress} from "@antv/g2plot";
import {Table} from "antd";
import $ from 'jquery'

class RadioMultipleTable extends Component {
    renderProgress = (questionID, optionID, count, sumCount) => {
        if ($('#container' + questionID + optionID).is(":empty")) {
            const progress = new Progress('container' + questionID + optionID, {
                height: 25,
                width: 200,
                autoFit: false,
                percent: count / sumCount,
                color: ['#5B8FF9', '#E8EDF3']
            });
            progress.render();
        }
    }

    render() {
        const question = this.props.question;
        const questionID = this.props.questionID;
        const sumCount = this.props.sumCount;
        const counts = this.props.counts;
        const proportions = this.props.proportions;
        const columns = [
            {
                title: <span style={{fontWeight: "bold"}}>选项</span>,
                dataIndex: "option",
                align: "center",
                width: "40%",
                sorter: {compare: (a, b) => a.option.localeCompare(b.option)}
            },
            {
                title: <span style={{fontWeight: "bold"}}>小计</span>,
                dataIndex: "count",
                align: "center",
                width: "10%",
                sorter: {compare: (a, b) => a.count - b.count}
            },
            {
                title: <span style={{fontWeight: "bold"}}>比例</span>,
                width: "50%",
                dataIndex: "proportion"
            }
        ]

        let data = question.options.map((option, optionID) => {
            return (
                {
                    key: optionID,
                    option: option,
                    count: counts[optionID],
                    proportion: <><span className={"little_bar"}
                        id={'container' + questionID + optionID}/><span className={"analysis_proportion"}>{proportions[optionID]}</span></>
                }
            )
        })

        $(() => {
            question.options.map((option, optionID) => {
                return (this.renderProgress(questionID, optionID, counts[optionID], sumCount))
            })
        })

        return (
            <Table columns={columns}
                   rowKey={(r) => r.key}
                   dataSource={data}
                   bordered
                   pagination={false}
                   footer={() => <span style={{fontWeight: "bold"}}>本题有效填写人次：&nbsp;{sumCount}</span>}/>
        )
    }
}

export default RadioMultipleTable