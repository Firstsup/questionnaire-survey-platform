import React, {Component} from 'react';
import ReactDOM from "react-dom";
import {Row, Col, Space, Radio, Input, Checkbox} from 'antd';
import {PlusCircleTwoTone, PlusSquareTwoTone, EditTwoTone, CheckOutlined} from '@ant-design/icons';
import {DeleteTwoTone, PlusOutlined} from '@ant-design/icons';
import EditRadio from './EditRadio';
import EditCheckbox from './EditCheckbox';
import EditText from './EditText';
import AddRadio from '../../CreatNewQuestionnaire/jsx/addRadio';
import AddCheckbox from '../../CreatNewQuestionnaire/jsx/addCheckbox';
import AddText from '../../CreatNewQuestionnaire/jsx/AddText';
import {Tag, Divider, Layout, Typography, Button, Modal, message, Spin, Alert} from 'antd';
import Questions from './Questions';
import { DatePicker} from 'antd';
import moment from "moment";

import '../css/EditQuestionnaire.css'

import {Content, Footer, Header} from "antd/es/layout/layout";

const {Title} = Typography;
const { RangePicker } = DatePicker;
class EditQuestionnaire extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            questionnaire: {
                title: "fetch test",
                qid: "107",
                endTime:"",//问卷截止时间
                questions: [{
                    subject: "你最喜欢哪个宝可梦",
                    type: "radio",
                    isNecessary: true,
                    options: ["皮卡丘", "杰尼龟", "小火龙"]
                },
                    {
                        subject: "你最喜欢哪?????",
                        type: "radio",
                        isNecessary: true,
                        options: ["皮卡丘", "杰尼龟", "小火龙"]
                    },
                    {
                        subject: "你最喜欢哪个天线宝宝",
                        type: "multiple",
                        isNecessary: true,
                        options: ["丁丁", "迪西", "拉拉", "小波"]
                    }, {
                        subject: "你对数据库有什么建议",
                        type: "text",     //把此处的type从radio修改成了text
                        isNecessary: false,
                        options: []
                    }]
            }
        }
        // this.state = {
        //     questionnaire: {
        //         title: "",
        //         qid: "",
        //         questions: [],
        //     },
        //     loading: true
        // }

        this.handleDelete = this.handleDelete.bind(this);
        this.handleChange=this.handleChange.bind(this);
    }


    getFooter = () => {
        return (
            <div className={"edit_footer"}>
                <Divider/>
                <p>电子科大--字节跳动技术训练营&nbsp;&nbsp;前端二组</p>
            </div>
        )
    }

//
    onAddRadioChild = () => {
        this.setState(prevState => ({
            questionnaire: {
                ...prevState.questionnaire,

                questions: [...prevState.questionnaire.questions,
                    {
                        subject: '',
                        type: "radio",
                        isNecessary: Boolean,
                        options: [" ", " ",],
                    }]
            }
        }));
    }

    onAddCheckboxChild = () => {
        this.setState(prevState => ({
            questionnaire: {
                ...prevState.questionnaire,

                questions: [...prevState.questionnaire.questions,
                    {
                        subject: '',
                        type: "multiple",
                        isNecessary: Boolean,
                        options: [" ", " ",],
                    }]
            }
        }));
    }

    onAddTextChild = () => {
        this.setState(prevState => ({
            questionnaire: {
                ...prevState.questionnaire,

                questions: [...prevState.questionnaire.questions,
                    {
                        subject: '',
                        type: "text",
                        isNecessary: Boolean,
                        options: [" ", " ",],
                    }]
            }
        }));
    }

    handleDelete = (aid) => {
        let tempQuestions = this.state.questionnaire.questions
        let test = this.state.questionnaire.questions
        for (let i = 0; i < tempQuestions.length; i++) {

            if (i === aid) {

                tempQuestions.splice(i, 1);
                break;
            }
        }
        this.setState({
            questionnaire: {
                title: this.state.title,
                qid: this.state.qid,
                questions: tempQuestions
            }
        })

    }

    handleChange = (aid,changeName,changeItem) => {//从子组件接受修改的题目的aid、修改的state的名称、修改后的内容
       
        let tempQuestions=this.state.questionnaire.questions;
        for(let i=0;i<tempQuestions.length;i++){
            if(i==aid){
                 //函数Object.defineProperty(object, propertyname, descriptor);
                 tempQuestions[i][changeName]=changeItem;
                break;                                                       
            }
        }
        this.setState({
            questionnaire: {
                title: this.state.title,
                qid: this.state.qid,
                questions: tempQuestions
            }
        })
    }

    moveUp = (aid) => {
        let tempQuestions = this.state.questionnaire.questions
        for (let i = 0; i < tempQuestions.length; i++) {
            if (i === aid && i !== 0) {
                let temp = tempQuestions[i];
                tempQuestions[i] = tempQuestions[i - 1];
                tempQuestions[i - 1] = temp;
            }
        }
        this.setState({
            questionnaire: {
                title: this.state.title,
                qid: this.state.qid,
                questions: tempQuestions
            }
        })
    }

    moveDown = (aid) => {
        let tempQuestions = this.state.questionnaire.questions
        for (let i = 0; i < tempQuestions.length; i++) {
            if (i === aid && i !== tempQuestions.length - 1) {
                let temp = tempQuestions[i];
                tempQuestions[i] = tempQuestions[i + 1];
                tempQuestions[i + 1] = temp;
            }
        }
        this.setState({
            questionnaire: {
                title: this.state.title,
                qid: this.state.qid,
                questions: tempQuestions
            }
        })
    }
    submit=()=>{
        console.log(this.state.questionnaire);
    }

    onOk=(value)=>{
        console.log('问卷截止时间为：', parseInt(moment(value).valueOf() / 1000));
       /* this.setState({
            endTime:
             })
           更新截止时间  */
    }


    changeTitle=(e)=>{
        const value=e.target.value;
        this.setState({
            questionnaire: {
                title: value,
                qid: this.state.qid,
                questions: this.state.questions
            }
        })
    }

    // componentDidMount() {
    //     fetch('/api/edit?qid=' + this.props.location.search.slice(5), {
    //         method: 'get',
    //         headers: {
    //             'Accept': 'application/json',
    //             'Content-Type': 'application/json',
    //         },
    //     }).then(res => res.json())
    //         .then(res => {
    //             const get = res.data.data;
    //             this.setState({
    //                 questionnaire: {
    //                     title: get.title,
    //                     qid: get.qid,
    //                     questions: get.ask_list.map((list) => {
    //                         return ({
    //                             subject: list.ask,
    //                             type: list.type === 1 ? "radio" : (list.type === 2 ? "multiple" : "text"),
    //                             isNecessary: list.isNecessary,
    //                             options: list.choice_list.map((choice) => {
    //                                 return (choice.content)
    //                             })
    //                         })
    //                     })
    //                 }
    //             })
    //         })
    //     this.setState({
    //         loading: false
    //     })
    // }

    render() {
        let questionnaire = this.state.questionnaire;
        return (
            <Layout className={"edit_layout"}>

              
             
                    <div>
                        <Row>
                            <Space direction="vertical" className="edit_questionsSideBar1">
                                <Button type="primary" name="addRadio" onClick={this.onAddRadioChild}
                                      block size="large"  icon={<PlusCircleTwoTone/>}>
                                    添加单选题 </Button>
                                <Button type="primary" name="addCheckbox"
                                      block size="large"  onClick={this.onAddCheckboxChild}><PlusSquareTwoTone/>
                                    添加多选题</Button>
                                <Button type="primary" name="addText" block size="large" onClick={this.onAddTextChild}><EditTwoTone/>
                                    添加文本题</Button> 
                                
                                 <Tag color="blue" > 请选择问卷截止时间：</Tag>
                                        <DatePicker  size="large" showTime onChange={this.setEndTime} onOk={this.onOk} />
                                                
                                            
                                        <Tag color="blue"> 目前共有 {this.state.questionnaire.questions.length}题</Tag>
                                    
                                    
                                        <Button type="primary" block size="large" onClick={this.submit} shape="round" icon={<CheckOutlined/>}>
                                            保存并发布问卷
                                        </Button>
                                        <Button type={"primary"} block size="large" shape="round" onClick={this.submit} icon={<CheckOutlined/>}>保存暂不发布问卷</Button>
                            </Space>
                        </Row>
                    </div>
                    <Space className="edit_questionsSideBar2" size="large" direction="vertical">
                    <Input name="questionnaireTitle" placeholder={this.state.questionnaire.title} size="large" onChange={this.changeTitle}></Input>
                    <Questions questions={questionnaire.questions} handleDelete={this.handleDelete} moveUp={this.moveUp}
                               handleChange={this.handleChange} moveDown={this.moveDown}/>
                               </Space>
               
              
            </Layout>
            
        ) 
        
        // let questionnaire = this.state.questionnaire;
        // if (this.state.loading === true || this.state.questionnaire.title === "") {
        //     return (<div
        //         style={{height: document.documentElement.clientHeight, width: document.documentElement.clientWidth}}>
        //         <Spin className={"edit_spin"} tip="加载中..."/></div>)
        // } else {
        //     return (
        //         <Layout className={"edit_layout"}>
        //             <Header className={"edit_header"}>{this.getTitle()}</Header>
        //             <Content className={"edit_content"}>
        //                 <div>
        //                     <Row>
        //                         <Space direction="vertical">
        //                             <Button type="primary" name="addRadio" onClick={this.onAddChild}
        //                                     icon={<PlusCircleTwoTone/>}>
        //                                 添加单选题 </Button>
        //                             <Button type="primary" name="addCheckbox"
        //                                     onClick={this.onAddChild}><PlusSquareTwoTone/>
        //                                 添加多选题</Button>
        //                             <Button type="primary" name="addText" onClick={this.onAddChild}><EditTwoTone/>
        //                                 添加文本题</Button>
        //                         </Space>
        //                     </Row>
        //                 </div>
        //                 <Questions questions={questionnaire.questions} handleDelete={this.handleDelete} moveUp={this.moveUp} moveDown={this.moveDown}/></Content>
        //             <Button type={"primary"} className={"edit_button"} onClick={this.submit}>提交</Button>
        //             <Footer className={"edit_footer"}>{this.getFooter()}</Footer>
        //         </Layout>
        //     )
        // }
    }
}

export default EditQuestionnaire