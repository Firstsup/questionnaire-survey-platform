// import { deflate } from 'pako'
import React,{Component} from 'react'
import '../css/ShowAllQuestionnaire.css'
import { Table, Space, Button ,Input } from 'antd';
import { PlusOutlined,DeleteOutlined } from '@ant-design/icons';
// import {nanoid} from 'nanoid';
import imgPath from '../../../assets/head.png'
import ViewQuestionnaireDetail from "../../ViewQuestionnaireDetail/jsx/ViewQuestionnaireDetail";
//搜索框的
const { Search } = Input;
const onSearch = value => console.log(value);
  
const data = [
  {qid:22,key:22,title:"test1",status:0,time:"2020-1.0"},
  {qid:23,key:23,title:"test1",status:0,time:"2020-1.0"},
  {qid:24,key:24,title:"test1",status:0,time:"2020-1.0"},
  {qid:25,key:25,title:"test1",status:1,time:"2020-1.0"},
  {qid:26,key:26,title:"test1",status:1,time:"2020-1.0"},
  {qid:27,key:27,title:"test1",status:1,time:"2020-1.0"}
];

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

//   const expandable = { expandedRowRender: record => <p>{record.description}</p> };
//   const title = () => 'Here is title';
const showHeader = true;
const pagination = { position: 'bottom' };
// const rowId = -1;
//分页
// function showTotal(total) {
// return `Total ${total} items`;
// }

export default class PageList extends Component{ 
  state = {
      size: 'large',
      // yScroll: true,
      bordered: false,
      loading: false,
      pagination,
      // size: 'default', 
      title: undefined,
      showHeader,
      rowSelection: {},
      scroll: undefined,
      hasData: true,
      tableLayout: undefined,
      top: 'none',
      bottom: 'bottomRight',
      data: data,
      rowId: -1,
      selectedRowKeys: [],
      questionnaire: questionnaire,
      modalVisible: false
      // user: user,
    };
    //table的每一列

    //单个删除问卷
    handleDelete = () => {
      if(window.confirm('确定删除吗？')){
        const { data,rowId } = this.state
        const Params = {
          "deleteList": rowId
        };
        fetch('/api/manage/delete',{
            method: 'post',
            body: JSON.stringify(Params),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        }).then(res => res.json())
            .then(res =>{
            if(res.code == 1){
              const newData = data.filter((dataObj)=>{
                return dataObj.qid !== rowId
              })
              this.setState({data:newData})
            }
            else{
              alert("数据库故障，未删除成功！")
            }
        });      
      }
    }
    
    //设置每一行的Id
    setRowId = (rowId) => {
      this.setState({rowId:rowId})
    }

    //选中多选框
    onSelectChange = selectedRowKeys => {
      this.setState({ selectedRowKeys });
    };

    //发送请求
    testOnClick = () => {
      fetch('/api/manage?user=xyl',{
        method: 'get',
        headers: {
            'Accept': 'application/json',
        },
      }).then(res=>res.json())
        .then(res=>{
          var newData = []
          res.data.data.map(((item, index)=> {
            newData.push(Object.assign({},item,{key:item.qid}))
          }))
        this.setState({data:newData})
      });
    }

    //批量删除
    multiDelete = (selectedRowKeys) => {
      if(window.confirm('确定删除吗？')){
        const { data } = this.state
        const Params = {
          "deleteList": selectedRowKeys
        };
        fetch('/api/manage/delete',{
            method: 'post',
            body: JSON.stringify(Params),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        }).then(res => res.json())
          .then(res =>{
            if(res.code == 1){
              const newData = data.filter((dataObj)=>{
                return !selectedRowKeys.includes(dataObj.key)
              })
              this.setState({data:newData})
            }
            else{
              alert("数据库故障，未删除成功！")
            }
          }); 
      }
    }

    changePassword = () => {
      alert(123)
    }

    //创建新问卷
    createNew = () => {
      // console.log("createNew")
    }

    handleOnClick = () => {
      this.setState({modalVisible: true})
    }

    render(){
      const { selectedRowKeys,rowId,size,xScroll, yScroll,data, ...state } = this.state;
      const scroll = {};
      const rowSelection = {
        selectedRowKeys,
        onChange: this.onSelectChange,
      };
      // const hasSelected = selectedRowKeys.length > 0;
      const columns = [
        {
          title: '问卷名称',
          dataIndex: 'title',
          width: "10%"
        },
        {
          title: '问卷id',
          dataIndex: 'qid',
          width: "10%"
        },
        {
          title: '问卷状态',
          dataIndex: 'status',
          width: "10%"
        },
        {
          sorter: (a, b) => a.age - b.age,
          title: '创建时间',
          dataIndex: 'time',
          width: "41%"
        },
        {
          title: '操作问卷',
          key: 'action',
        //   sorter: true,
      
          render: () => (
            <Space size="middle">
              <span onClick={()=> this.handleDelete()}>删除</span>
              <a href='http://localhost:3000/'>分享</a>
              <a href='http://localhost:3000/'>编辑问卷</a>
              <span onClick={()=> this.handleOnClick()}>查看问卷</span> 
              <a href='http://localhost:3000/' className="ant-dropdown-link">
                查看结果 
              </a>
            </Space>
          ),
        },
      ];
      const tableColumns = columns

      if (yScroll) {
        scroll.y = 840;
      }
      if (xScroll) {
        scroll.x = '100vw';
      }
      if (xScroll === 'fixed') {
        tableColumns[0].fixed = true;
        tableColumns[tableColumns.length - 1].fixed = 'right';
      }

      return(
        <div>
          <div>
                <header id="header">
                    <div id="userName" onClick={this.changePassword}><img src={imgPath} alt="头像"/>xiejing</div>
                </header>
          </div>
          <div id="list">
              <div id='newQuestion'>
                  <Button id="addButton" onClick={this.createNew} type="primary" shape="round" icon={<PlusOutlined style={{ fontSize:'16px'}} />} >新建问卷</Button>
                  <div id="searchButton">
                      <Search placeholder="请输入问卷名称搜索" onSearch={onSearch} enterButton/>
                  </div>
              </div>
              <Button id="deleteButton" onClick={()=>this.multiDelete(this.state.selectedRowKeys)} type="primary" icon={<DeleteOutlined style={{ fontSize:'16px'}} />} >批量删除</Button>
              <button onClick={()=> this.testOnClick()} >test  123   </button>
              
              <Table
              {...this.state}
              pagination={{ position: [this.state.top, this.state.bottom] }}
              columns={tableColumns}
              dataSource={state.hasData ? data : null}
              scroll={scroll} rowSelection={rowSelection}
              onRow = {(record) => {
                return {
                  onMouseEnter: () => {
                    // console.log("record",record)
                    this.setRowId(record.qid)
                    }
                  }
                }
              }
              />

              <ViewQuestionnaireDetail
                    questionnaire={this.state.questionnaire}
                    modalVisible={this.state.modalVisible}
                    handleOk={this.handleOk}
                    handleCancel={this.handleCancel}
              />  

              {/* <Pagination size="small" total={50} showSizeChanger showQuickJumper /> */}
          </div>
        </div>
      )   
  }
}

