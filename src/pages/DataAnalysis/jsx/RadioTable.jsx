import React, {Component} from 'react';
import {Progress} from "@antv/g2plot";
import {Table} from "antd";
import $ from 'jquery'

class RadioTable extends Component {
    renderProgress = (questionID, optionID, count, sumCount) => {
        const progress = new Progress('container' + questionID + optionID, {
            height: 10,
            width: 50,
            autoFit: false,
            percent: count / sumCount,
            color: ['#5B8FF9', '#E8EDF3'],
        });
        progress.render();
    }

    render() {
        const question = this.props.question;
        const questionID = this.props.questionID;
        const sumCount = this.props.sumCount;
        const counts = this.props.counts;
        const proportions = this.props.proportions;
        const columns = [
            {
                title: "选项",
                dataIndex: "option",
                sorter: {compare: (a, b) => a.option > b.option}
            },
            {
                title: "小计",
                dataIndex: "count",
                sorter: {compare: (a, b) => a.count - b.count}
            },
            {
                title: "比例",
                dataIndex: "proportion"
            }
        ]

        let data = question.options.map((option, optionID) => {
            return (
                {
                    key: optionID,
                    option: option,
                    count: counts[optionID],
                    proportion: <><span
                        id={'container' + questionID + optionID}/><span>{proportions[optionID]}</span></>
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
                   footer={() => "本题有效填写人次： " + sumCount}/>
        )
    }
}

export default RadioTable