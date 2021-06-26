// import { deflate } from 'pako'
import React,{Component} from 'react'
import '../css/ShowAllQuestionnaire.css'
import { Table, Space, Button ,Input, Pagination } from 'antd';
import { PlusOutlined,DeleteOutlined } from '@ant-design/icons';
import {nanoid} from 'nanoid';
import imgPath from '../../../assets/head.png'

//搜索框的
const { Search } = Input;
const onSearch = value => console.log(value);
  
const data = [
  {qid:22,key:22,title:"test1",status:0,time:"2020-1.0",checked:false},
  {qid:23,key:23,title:"test1",status:0,time:"2020-1.0",checked:false},
  {qid:24,key:24,title:"test1",status:0,time:"2020-1.0",checked:false},
  {qid:25,key:25,title:"test1",status:1,time:"2020-1.0",checked:false},
  {qid:26,key:26,title:"test1",status:1,time:"2020-1.0",checked:false},
  {qid:27,key:27,title:"test1",status:1,time:"2020-1.0",checked:false}
];

console.log("data",new Date())
//   const expandable = { expandedRowRender: record => <p>{record.description}</p> };
//   const title = () => 'Here is title';
const showHeader = true;
//   const footer = () => 'Here is footer';
const pagination = { position: 'bottom' };
const rowId = -1;
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
      rowId: rowId,
      selectedRowKeys: [],
      // columns: columns
    };
    //table的每一列

    
    //单个删除问卷
    handleDelete = () => {
      if(window.confirm('确定删除吗？')){
        const { data,rowId } = this.state
        console.log("data",data)
        console.log("row",rowId)
        const newData = data.filter((dataObj)=>{
          return dataObj.qid !== rowId
        })
        //更新状态
        this.setState({data:newData})
      }
    }
    
    //设置每一行的Id
    setRowId = (rowId) => {
      // console.log("now id",rowId)
      this.setState({rowId:rowId})
    }

    //选中多选框
    onSelectChange = selectedRowKeys => {
      console.log('selectedRowKeys changed: ', selectedRowKeys);
      this.setState({ selectedRowKeys });
      // console.log("log",this.state)
    };

    //批量删除
    multiDelete = (selectedRowKeys) => {
      console.log("multiDelete", selectedRowKeys)
      console.log("key",this.state.data)
      if(window.confirm('确定删除吗？')){
        const { data } = this.state
        console.log("dataObj.key", data);
        const newData = data.filter((dataObj)=>{
          return !selectedRowKeys.includes(dataObj.key)
        })
        //更新状态
        this.setState({data:newData})
      }
    }

    //创建新问卷
    createNew = () => {
      console.log("createNew")
    }

    render(){
      const { selectedRowKeys,rowId,size,xScroll, yScroll,data, ...state } = this.state;
      const scroll = {};
      const rowSelection = {
        selectedRowKeys,
        onChange: this.onSelectChange,
      };
      const hasSelected = selectedRowKeys.length > 0;
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
              <a href='http://localhost:3000/'>查看问卷</a>
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
                    <div id="userName"><img src={imgPath} alt="头像"/>xiejing</div>
                </header>
          </div>
          <div id="list">
              <div id='newQuestion'>
                  <Button id="addButton" onClick={this.createNew} type="primary" shape="round" icon={<PlusOutlined style={{ fontSize:'16px'}} />} >新建问卷</Button>
                  <div id="searchButton">
                      <Search placeholder="请输入问卷名称搜索" onSearch={onSearch} enterButton/>
                  </div>
              </div>
              {/* <span style={{ marginLeft: 8 }}>
                {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
              </span> */}
              {/* <button onClick={()=>this.multiDelete([1])}>批量删除</button> */}
              <Button id="deleteButton" onClick={()=>this.multiDelete(this.state.selectedRowKeys)} type="primary" icon={<DeleteOutlined style={{ fontSize:'16px'}} />} >批量删除</Button>
              <Table
              {...this.state}
              pagination={{ position: [this.state.top, this.state.bottom] }}
              columns={tableColumns}
              dataSource={state.hasData ? data : null}
              scroll={scroll} rowSelection={rowSelection}
              onRow = {(record) => {
                return {
                  onMouseEnter: () => {
                    this.setRowId(record.qid)
                    }
                  }
                }
              }
              />
              {/* <Pagination size="small" total={50} showSizeChanger showQuickJumper /> */}
          </div>
        </div>
      )   
  }
}

