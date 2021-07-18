import React, { Component } from 'react'
import { Table, Space, message,Layout, Button, Spin } from 'antd';
import {Content, Footer, Header} from "antd/es/layout/layout";
import { DeleteOutlined,EyeOutlined  } from '@ant-design/icons';
import SubmitDetailQuestionnaire from './SubmitDetailQuestionnaire'
import timeConversion from "../../../utils/TimeConversion"
import '../css/SubmitListQuestionnaire.css'
import Title from "antd/es/typography/Title";

export default class SubmitListQuestionnaire extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: '',
            qid:"",
            ans_qid:'',
            answers:'',
            title:'',
            xuhao:'',
            questionnaire: {
                questions: []
            },
            questionnnaireIndex: -1,
            pagination: {
                current: 1,
                pageSize: 10,
            },
            loading: false,
            tableRowId: -1,
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
            var anslist = res.data.data1[0].ans_list
            this.setState({
                questionnaire: {
                    questions: res.data.data2[0].ask_list.map((list,index) => {
                        var anss = [] 
                        if(list.type === 1){
                          if(anslist[index].choice[0] == ''){        
                            anss.push("用户未回答");  
                          }   
                          else{
                            var a =  anslist[index].choice[0].charCodeAt(0) - 65  
                            anss.push(res.data.data2[0].ask_list[index].choice_list[a].content)
                          }      
                        }
                        else if(list.type === 2){
                          let arr = []
                          if(anslist[index].choice[0] == '')
                            anss.push("用户未回答");
                          else{
                            for(let i = 0; i < (anslist[index].choice.length); i++){
                              arr.push(anslist[index].choice[i].charCodeAt(0) - 65);
                            }
                            var j = 0;
                            arr.map((item)=>{
                              anss.push(res.data.data2[0].ask_list[index].choice_list[item].content);
                            })
                          }
                        }
                        else if(list.type === 3){
                          var a =  anslist[index].ans
                          if(a == '')
                            anss.push("用户未回答");
                          else
                            anss.push(a)
                        }
                        return ({
                            subject: list.ask,
                            type: list.type === 1 ? "单选题" : (list.type === 2 ? "多选题" : "文本题"),
                            isNecessary: list.isNecessary,
                            ans:anss
                        })
                    })
                }
            })
            this.setState({answers: res.data.data1[0]})
        });
        this.setState({modalVisible: true})
    }

    handleCancel = () => {
        this.setState({modalVisible: false})
    }
    
    handleDelete = () => {
        if(window.confirm('确定删除吗？')){
            const { data,tableRowId } = this.state
            const Params = {
                "ans_qid":tableRowId
            };
            fetch('/api/deleAns',{
                method: 'post',
                body: JSON.stringify(Params),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
            }).then(res => res.json())
                .then(res =>{
                if (res.code === 1) {
                    const newData = data.filter(
                        (dataObj) => {
                            return dataObj.ans_qid !== tableRowId
                        }
                    )
                    this.setState({data:newData})
                    this.setState({modalVisible: false})
                    message.info("删除成功！")
                } else {
                    alert("数据库故障，未删除成功！")
                }
            });
        }
    }

    settableRowId = (qid,ans_qid,key) => {
        this.setState({tableRowId:ans_qid,qid:qid,ans_qid:ans_qid,xuhao:key})
    }

    componentDidMount() {
        const Params = {
          "qid":(this.props.location.search.split('=')[1]).split('&')[0],
          "title":this.props.location.search.split('=')[2]
        };
        this.setState({title:this.props.location.search.split('=')[2],qid:(this.props.location.search.split('=')[1]).split('&')[0]})
        fetch('/api/ans',{
            method: 'post',
            body: JSON.stringify(Params),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        }).then(res => res.json())
            .then(res =>{
            var newData = []
                res.data.map(((item, index) => {
                    newData.push(Object.assign({}, item, {
                        key: index+1,
                        ans_time: timeConversion(item.ans_time)
                    }))
                }))
                this.setState({data: newData})
        });
    }

    render() {
      const {data,questionnnaireIndex} = this.state
      const columns = [
        {
            title: '序号',
            dataIndex: 'key',
            sorter: (a, b) => a.key - b.key,
            width: '20%',
        },
        {
            title: '提交答卷时间',
            dataIndex: 'ans_time',
            width: '40%',
        },
        {
            title: '操作',
            dataIndex: 'action',
            render: () => (
                <Space size="middle">
                  <span onClick={() => this.handleDelete()}><DeleteOutlined /></span>
                  <span onClick={() => this.handleOnClick()}><EyeOutlined /></span>
                </Space>
            ),
        },
      ];
      if (this.state.loading === true || this.state.questionnaire.title === "") {
        return (
          <div
            style={{
                height: document.documentElement.clientHeight,
                width: document.documentElement.clientWidth
            }}>
            <Spin className={"dataAnalysis_spin"} tip="加载中..."/>
          </div>
        )
      } else {
        return (
          <Layout className={"analysis_layout"}>
            <Header className={"analysis_header"}>
              <Title className={"analysis_header_title"}
              level={2}>问卷《{this.state.title}》的具体答卷</Title>
            </Header>
            <Content className={"analysis_content"}>
              <SubmitDetailQuestionnaire
                xuhao={this.state.xuhao}
                questionnaire={this.state.questionnaire}
                answers={this.state.answers}
                questionnnaireIndex = {questionnnaireIndex}
                modalVisible={this.state.modalVisible}
                handleDelete = {this.handleDelete}
                handleCancel={this.handleCancel}/>
              <Table
              columns={columns}
              dataSource={data}
              onChange={this.handleTableChange}
              onRow = {(record) => {
                return {
                  onMouseEnter: () => {
                    this.settableRowId(record.qid,record.ans_qid,record.key)
                  }
                }
              }}/>
            </Content>
          </Layout>
        )
      }
    }
}