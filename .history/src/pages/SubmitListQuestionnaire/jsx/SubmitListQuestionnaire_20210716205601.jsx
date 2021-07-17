import React, { Component } from 'react'
import { Table, Space } from 'antd';
// import reqwest from 'reqwest';
import { DeleteOutlined,EyeOutlined  } from '@ant-design/icons';
import SubmitDetailQuestionnaire from './SubmitDetailQuestionnaire'
import timeConversion from "../../../utils/TimeConversion"

// const questionnaire = {
//     title: "test",
//     ans_qid: "123",
//     publisher: "Firstsup",
//     state: "发布中",
//     fillerCount: 5,
//     releaseTime: new Date("2020-1-1"),
//     deadline: new Date("2020-12-31"),
//     questions: [
//         {
//             subject: "question1:你喜欢什么食物",
//             type: "单选题",
//             isNecessary: true,
//             options: ["option1", "option2", "option3"],
//         },
//         {
//             subject: "question2：你喜欢什么动物",
//             type: "多选题",
//             isNecessary: true,
//             options: ["如今，数据科学竞赛（大数据竞赛，机器学习竞赛，人工智能算法竞赛）已经成为各大知名互联网企业征集解决方案和选拔人才的第一选择，很多同学为了拿到大厂offer，纷纷加入了数据竞赛的浪潮之中。遗憾的是，大部分同学都在激烈的竞争中成为炮灰，许多人不停地上网浏览各类竞赛开源分享，却依旧感到困惑迷茫。", "option2", "option3"],
//         },
//         {
//             subject: "question3：描述一下自己",
//             type: "文本题",
//             isNecessary: true,
//         },
//         {
//             subject: "question4：下面哪个你最喜欢",
//             type: "单选题",
//             isNecessary: false,
//             options: ["option1", "option2", "option3", "option4", "option5", "option6", "option7", "option8"],
//         },
//         {
//             subject: "question5：下面哪些你最喜欢",
//             type: "多选题",
//             isNecessary: false,
//             options: ["option1", "option2", "option3", "option4"],
//         },
//         {
//             subject: "question6：对本问卷满意吗",
//             type: "文本题",
//             isNecessary: false,
//         }
//     ]
// }

// const getRandomuserParams = params => ({
//     results: params.pagination.pageSize,
//     page: params.pagination.current,
//     ...params,
// });

export default class SubmitListQuestionnaire extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: '',
            qid:"",
            ans_qid:'',
            answers:'',
            // questions:'',
            // questions: [],
            questionnaire: {
                // title: "",
                // publisher: "",
                // fillerCount: 0,
                // qid: "",
                // releaseTime: "",
                // deadline: "",
                // state: 0,
                questions: []
            },
            questionnnaireIndex: -1,
            // ans_qid: ans_qid,
            pagination: {
                current: 1,
                pageSize: 10,
            },
            loading: false,
            tableRowId: -1,
            // questionnaire: questionnaire,
            modalVisible: false
        }
    }

    handleOnClick = () => {
        const Params = {
            "qid":this.state.qid,
            "ans_qid":this.state.ans_qid
        };
        fetch('/api/ansContent',{
            method: 'post',
            body: JSON.stringify(Params),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        }).then(res => res.json())
            .then(res =>{
            console.log("fanhuide:",res.data);
            
            this.setState({
                questionnaire: {
                    questions: res.data.data2.ask_list.map((list) => {
                        return ({
                            subject: list.ask,
                            type: list.type === 1 ? "单选题" : (list.type === 2 ? "多选题" : "文本题"),
                            isNecessary: list.isNecessary
                        })
                    })
                }
            })
            // this.setState({answers: res.data.data1[0],questions:res.data.data2[0]})
        });
        this.setState({modalVisible: true})
    }

    handleCancel = () => {
        this.setState({modalVisible: false})
    }
    
    handleDelete = () => {
        if(window.confirm('确定删除吗？')){
            const { data,tableRowId } = this.state
            console.log("tableRowId",tableRowId)
            console.log("data22222222",data)
            const newData = data.filter(
                (dataObj) => {
                    console.log("data",dataObj.ans_qid)
                    console.log(dataObj.ans_qid !== tableRowId)
                    return dataObj.ans_qid !== tableRowId
                }
            )
            this.setState({data:newData})
            this.setState({modalVisible: false})
        }
    }

    settableRowId = (qid,ans_qid) => {
        this.setState({tableRowId:ans_qid,qid:qid,ans_qid:ans_qid})
    }

        // //发送请求
        // componentDidMount() {
        //     this.state.username = this.props.location.search.slice(10);
        //     fetch('/api/manage?user='+this.state.username, {
        //         method: 'get',
        //         headers: {
        //             'Accept': 'application/json',
        //         },
        //     }).then(res => res.json())
                // .then(res => {
                //     var newData = []
                //     res.data.data.map(((item, index) => {
                //         newData.push(Object.assign({}, item, {
                //             key: item.qid,
                //             status: item.status === 0 ? "未发布" : (item.status === 1 ? "发布中" : "已结束")
                //         }))
                //     }))
        //             this.setState({data: newData})
        //         });
        // }
    componentDidMount() {
        const Params = {
            "qid":this.props.location.search.slice(5)
        };
        fetch('/api/ans',{
            method: 'post',
            body: JSON.stringify(Params),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        }).then(res => res.json())
            .then(res =>{
            console.log("resdata",res.data);
            var newData = []
                res.data.map(((item, index) => {
                    newData.push(Object.assign({}, item, {
                        key: index+1,
                        ans_time: timeConversion(item.ans_time)
                    }))
                }))
                this.setState({data: newData})
        });
        // const { pagination } = this.state;
        // this.fetch({ pagination });
    }

    // handleTableChange = (pagination, filters, sorter) => {
    //     this.fetch({
    //         sortField: sorter.field,
    //         sortOrder: sorter.order,
    //         pagination,
    //         ...filters,
    //     });
    // };

    // fetch = (params = {}) => {
    //     this.setState({ loading: true });
    //     reqwest({
    //         url: 'https://randomuser.me/api',
    //         method: 'get',
    //         type: 'json',
    //         data: getRandomuserParams(params),
    //     }).then(data => {
    //         console.log(data);
    //         this.setState({
    //         loading: false,
    //         // data: data.results,
    //         data:data,
    //         pagination: {
    //             ...params.pagination,
    //             total: 200,
    //             // 200 is mock data, you should read it from server
    //             // total: data.totalCount,
    //         },
    //         });
    //     });
    // };

    render() {
        const {data,questionnnaireIndex} = this.state
        // console.log(data)
        const columns = [
            {
                title: '序号',
                dataIndex: 'key',
                // sorter: true,
                sorter: (a, b) => a.key - b.key,
                // render: name => `${key}`,
                width: '20%',
            },
            {
                title: '提交答卷时间',
                dataIndex: 'ans_time',
                // filters: [
                // { text: 'Male', value: 'male' },
                // { text: 'Female', value: 'female' },
                // ],
                width: '40%',
            },
            {
                title: '操作',
                dataIndex: 'action',
                render: () => (
                    <Space size="middle">
                      <span onClick={()=> this.handleDelete()}><DeleteOutlined /></span>
                      <span onClick={()=> this.handleOnClick()}><EyeOutlined /></span>
                    </Space>
                ),
            },
        ];

        return (
            <>
            <SubmitDetailQuestionnaire
                    questionnaire={this.state.questions}
                    answers={this.state.answers}
                    questionnnaireIndex = {questionnnaireIndex}
                    modalVisible={this.state.modalVisible}
                    handleDelete = {this.handleDelete}
                    handleCancel={this.handleCancel}/>
            <Table style={{width:'80%',marginLeft: '10%'}}
            columns={columns}
            // rowKey={record => record.login.uuid}
            dataSource={data}
            // pagination={pagination}
            // loading={loading}
            onChange={this.handleTableChange}
            onRow = {(record) => {
                return {
                  onMouseEnter: () => {
                    // console.log("record",record)
                    this.settableRowId(record.qid,record.ans_qid)
                    }
                  }
                }
              }
            />
            </>
        )
    }
}
