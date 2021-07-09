// import { deflate } from 'pako'
import React,{Component} from 'react'
// import { useState } from 'react';
import '../css/ShowAllQuestionnaire.css'
import { Table, Space, Button ,Input, Menu, Dropdown, message, Modal } from 'antd';
import { PlusOutlined,DeleteOutlined,DownOutlined } from '@ant-design/icons';
import imgPath from '../../../assets/head.png'
import ViewQuestionnaireDetail from "../../ViewQuestionnaireDetail/jsx/ViewQuestionnaireDetail";
import copy from 'copy-to-clipboard'
//搜索框的
const {Search} = Input;
const onSearch = value => console.log(value);
// const [isModalVisible, setIsModalVisible] = useState(false);

const showHeader = true;
const pagination = {position: 'bottom'};
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
      data: [],
      rowId: -1,
      selectedRowKeys: [],
      questionnaire: questionnaire,
      modalVisible: false,
      modalVisiblePassword: false,
      originPwd:'',
      newPwd:'',
      checkPwd:''
      // user: user,
    };
    //table的每一列 

    ItemonClick = ({key}) => {
        if (`${key}` === '1') {
            alert("change password")
        }
        if (`${key}` === '2') {
            this.props.history.push('/')
        }
    };

    //发送请求
    componentDidMount() {
        fetch('/api/manage?user=xyl', {
            method: 'get',
            headers: {
                'Accept': 'application/json',
            },
        }).then(res => res.json())
            .then(res => {
                var newData = []
                res.data.data.map(((item, index) => {
                    newData.push(Object.assign({}, item, {
                        key: item.qid,
                        status: item.status === 0 ? "未发布" : (item.status === 1 ? "发布中" : "已结束")
                    }))
                }))
                this.setState({data: newData})
            });
    }

    //单个删除问卷
    handleDelete = () => {
        if (window.confirm('确定删除吗？')) {
            const {data, rowId} = this.state
            const Params = {
                "deleteList": rowId
            };
            fetch('/api/manage/delete', {
                method: 'post',
                body: JSON.stringify(Params),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
            }).then(res => res.json())
                .then(res => {
                    if (res.code === 1) {
                        const newData = data.filter((dataObj) => {
                            return dataObj.qid !== rowId
                        })
                        this.setState({data: newData})
                    } else {
                        alert("数据库故障，未删除成功！")
                    }
                });
        }
    }

    //设置每一行的Id
    setRowId = (rowId) => {
        this.setState({rowId: rowId})
    }

    //选中多选框
    onSelectChange = selectedRowKeys => {
        this.setState({selectedRowKeys});
    };

    //批量删除
    multiDelete = (selectedRowKeys) => {
        if (window.confirm('确定删除吗？')) {
            const {data} = this.state
            const Params = {
                "deleteList": selectedRowKeys
            };
            fetch('/api/manage/delete', {
                method: 'post',
                body: JSON.stringify(Params),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
            }).then(res => res.json())
                .then(res => {
                    if (res.code === 1) {
                        const newData = data.filter((dataObj) => {
                            return !selectedRowKeys.includes(dataObj.key)
                        })
                        this.setState({data: newData})
                    } else {
                        alert("未选中问卷，删除不成功，请确认已选中问卷！")
                    }
                });
        }
    }

    //创建新问卷
    createNew = () => {
        // console.log("createNew")
    }

    handleOnClick = () => {
        this.setState({modalVisible: true})
    }

    handleOk = (status, qid) => {
        console.log(status)
        if (status === "未发布") {
            alert('123')
        } else if (status === "发布中") {
            copy('http://localhost:3000/fillquestionnaire?qid=' + this.state.data[0].qid);
            message.success("问卷链接已拷贝至粘贴板").then(() => null);
            this.setState({modalVisible: false})
        } else {
            this.setState({modalVisible: false})
        }
    }

    handleCancel = () => {
        this.setState({modalVisible: false})
    }

    //查看结果
    handleResult = () => {
      this.props.history.push('/dataanalysis?qid='+this.state.rowId)
    }

    //得到原始密码  
    getOriginPwd = (event) => {
      this.setState({originPwd:event.target.value})
    }

    //得到新密码
    getNewPwd = (event) => {
      this.setState({newPwd:event.target.value})
    }

    //检查2次密码是否一致
    checkNewPwd = (event) => {
      this.setState({checkPwd:event.target.value})
    }

    render(){
      const { selectedRowKeys,rowId,size,xScroll, yScroll,statusNum,data, ...state } = this.state;
      const scroll = {};
      const rowSelection = {
        selectedRowKeys,
        onChange: this.onSelectChange,
      };
      for (let i of data){
        console.log("i",i.qid)
      }
      // console.log("statusNum",data.map)
      const menu = (
        <Menu onClick={this.ItemonClick}>
          <Menu.Item key="1">更改密码</Menu.Item>
          <Menu.Item key="2">退出登录</Menu.Item>
        </Menu>
      )
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
          width: "35%"
        },
        {
          title: '操作问卷',
          key: 'action',
          dataIndex: 'action',
          render: (text,data) => (
            // return( 
              <Space size="middle">
                <span onClick={()=> this.handleOnClick()}>查看问卷</span>              
                <span>{data.statusNum===0?"编辑问卷":""}</span>              
                <span onClick={()=> this.handleResult()}>{data.statusNum!==0?"查看数据":""}</span>  
                <span>{data.statusNum===1?"分享":""}</span>
                <span onClick={()=> this.handleDelete()}>{data.statusNum===0?"删除":""}</span>
              </Space>
            // )
          )

            // return( 
            // <Space size="middle">
            //   <span onClick={()=> this.handleDelete()}>{"发布中"?"删除":""}</span>
            //   <a href='http://localhost:3000/'>{statusNum}shanchu</a>
            //   <a href='http://localhost:3000/'>{1>0?"编辑问卷":""}</a>
            //   <span onClick={()=> this.handleOnClick()}>{1<0?"查看问卷":""}</span> 
            //   <span onClick={()=> this.handleResult()}>查看结果</span>  
            //   {/* 查看数据  1>0?"查看数据":""*/}
            // </Space>
            // )
          // ),


        },
      ];
      const tableColumns = columns

      return(
        <div>
          <div>
            <header id="header">
              <div id="userName">
                <Dropdown overlay={menu} >
                  <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                  <img src={imgPath} alt="头像"/>xiejing<DownOutlined style={{ fontSize:'14px',padding:'4px'}}/>
                  </a>
                </Dropdown>
              </div>
            </header>
          </div>
          <div id="list">
              <div id='newQuestion'>
                  <Button id="deleteButton" onClick={()=>this.multiDelete(this.state.selectedRowKeys)} type="primary" icon={<DeleteOutlined style={{ fontSize:'16px'}} />} >批量删除</Button>
                  <Button id="addButton" onClick={this.createNew} type="primary" style={{ margin:'0 16px'}} icon={<PlusOutlined style={{ fontSize:'16px'}} />} >新建问卷</Button>
                  <div id="searchButton">
                      <Search placeholder="请输入问卷名称搜索" onSearch={onSearch} enterButton/>
                  </div>
              </div>
              {/* shape="round" */}
              
              <Table
              {...this.state}
              pagination={{ position: [this.state.top, this.state.bottom] }}
              columns={tableColumns}
              dataSource={state.hasData ? data : null}
              scroll={scroll} rowSelection={rowSelection}
              onRow = {(record) => {
                return {
                  onMouseEnter: () => {
                    console.log("record",record)
                    this.setRowId(record.qid)
                    }
                  }
                }
              }
              />

              <ViewQuestionnaireDetail
                    questionnaire={this.state.questionnaire}
                    modalVisible={this.state.modalVisible}
                    qid={this.state.rowId}
                    handleOk={this.handleOk}
                    handleCancel={this.handleCancel}
              />  

              {/* <Pagination size="small" total={50} showSizeChanger showQuickJumper /> */}
          </div>
          <Modal title="修改密码" okText={"确定"}
                cancelText={"关闭"} visible={this.state.modalVisiblePassword} onOk={this.handleOkPassword} onCancel={this.handleCancelPassword} >
            <p><Input placeholder="请输入初始密码" style={{borderRadius:"6px"}} onChange = {this.getOriginPwd} /></p>
            <p><Input placeholder="请输入新密码" style={{borderRadius:"6px"}} onChange = {this.getNewPwd} /></p>
            <p><Input placeholder="请重复输入新密码" style={{borderRadius:"6px"}} onChange = {this.checkNewPwd}/></p>
          </Modal>
        </div>
      )   
  }
}

