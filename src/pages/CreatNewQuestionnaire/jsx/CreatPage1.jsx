import React, {Component} from 'react';
import ReactDOM from "react-dom";
import {Row, Col, Space, Button, Radio, Input, Checkbox} from 'antd';
import {PlusCircleTwoTone, PlusSquareTwoTone, EditTwoTone, CheckOutlined} from '@ant-design/icons';
import {DeleteTwoTone, PlusOutlined} from '@ant-design/icons';
import AddRadio from './addRadio';
import AddCheckbox from './addCheckbox';
import AddText from './AddText';
import {Tag, Divider} from 'antd';
import {Layout} from 'antd';
import {DatePicker} from 'antd';
import '../css/CreatQuestion.css';
import CreatQuestion from './CreatQuestion';
import moment from "moment";

const {Header, Footer, Sider, Content} = Layout;
const {RangePicker} = DatePicker;

class CreatPage1 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: '蓝百灵',
            questionnaireId: 123,
            questionnaireTitle: '',
            //questionnaireCount:0,
            questionnaireSign: 0,
            asknum: 0,//题目数组的aid是从0开始的
            askList: [], //这个数组是要传给后端的内容
            creatTime: " ",
            endTime: " ",
            key: 0
        };

        // this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.moveDown = this.moveDown.bind(this);
        this.moveUp = this.moveUp.bind(this);
    }

    getCreatTime = () => {
        const CreatTime = parseInt(new Date().getTime() / 1000)
        return CreatTime;
    }

    handleSave = () => {
        const temp = this.state.askList.map((ask, askID) => {
            return {
                "ask": ask.ask,
                "isNecessary": ask.isNecessary,
                "type": ask.type,
                "aid": askID + 1,
                "choiceList": ask.choiceList.map((choice, cid) => {
                    return {
                        "cid": cid + 1,
                        "content": choice
                    }
                })
            }
        })
        const params = {
            "author": this.state.userName,
            "title": this.state.questionnaireTitle,
            "ask_list": temp
        };
        fetch('/api/createSave', {
            method: 'post',
            body: JSON.stringify(params),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        }).then(res => res.json())
            .then(res => {
                console.log(res.code)
                if (res.code !== 0) {
                    this.props.history.push('/showallquestionnaire')
                    alert("问卷保存成功!");
                } else {
                    alert("问卷保存失败")
                }
            })
    }

    handleSubmit = () => {
        const temp = this.state.askList.map((ask, askID) => {
            return {
                "ask": ask.ask,
                "isNecessary": ask.isNecessary,
                "type": ask.type,
                "aid": askID + 1,
                "choiceList": ask.choiceList.map((choice, cid) => {
                    return {
                        "cid": cid + 1,
                        "content": choice
                    }
                })
            }
        })
        const params = {
            "author": this.state.userName,
            "title": this.state.questionnaireTitle,
            "start_time": this.getCreatTime(),
            "ask_list": temp
        };
        fetch('/api/createSubmit', {
            method: 'post',
            body: JSON.stringify(params),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        }).then(res => res.json())
            .then(res => {
                console.log(res.code)
                if (res.code !== 0) {
                    this.props.history.push('/showallquestionnaire')
                    alert("问卷创建成功!");
                } else {
                    alert("问卷创建失败")
                }
            })
    }

    onAddRadioChild = () => {
        this.setState(prevState => ({
            askList: [...prevState.askList,
                {

                    ask: '',
                    type: 1,//1单选 2多选 3文本
                    isNecessary: Boolean,
                    choiceList: [" ", " ",],
                }],
            asknum: this.state.asknum + 1,
        }));
    }

    onAddCheckBoxChild = () => {
        this.setState(prevState => ({
            askList: [...prevState.askList,
                {

                    ask: '',
                    type: 2,//1单选 2多选 3文本
                    isNecessary: Boolean,
                    choiceList: [" ", " ",],
                }],
            asknum: this.state.asknum + 1,
        }));
    }

    onAddTextChild = () => {
        this.setState(prevState => ({//文本题没有选项，choicecontent数组为空
            askList: [...prevState.askList,
                {

                    ask: '',
                    type: 3,//1单选 2多选 3文本
                    isNecessary: Boolean,
                    choiceList: [],
                }],
            asknum: this.state.asknum + 1
        }));
    }

    handleChange = (aid, changeName, changeItem) => {//从子组件接受修改的题目的aid、修改的state的名称、修改后的内容

        let tempaskList = this.state.askList;
        for (let i = 0; i < tempaskList.length; i++) {
            if (i == aid) {
                //函数Object.defineProperty(object, propertyname, descriptor);
                tempaskList[i][changeName] = changeItem;
                break;
            }
        }
        this.setState({
            askList: tempaskList
        })


    }

    changeTitle = (event) => {
        const target = event.target;
        const name = target.name;
        const value = target.value;
        this.setState({
            questionnaireTitle: value
        })
    }
    /* handleChangeChoice=(asknumber,choiceInput)=>{
       const askListContent=this.state.askListContent.map((askContent,aid)=>{//askList是可以传给后端的问卷数组
         return (
           asknumber === aid ? {choicecontent: choiceInput} : askContent)//这里需要把问卷数组里 aid匹配子组件传入的asknumber的项 的choicecontent子数组设为choiceInput
       });

       this.setState(
         {askListContent: askListContent}


     );

        console.log(this.state.askListContent);
     }
*/
    handleDelete = (aid) => {//这里的aid和askList数组索引一致

        alert("接收到删除数组索引为" + aid + "项的请求");
        let tempQuestions = this.state.askList;
        for (let i = 0; i < tempQuestions.length; i++) {
            if (i === aid) {
                tempQuestions.splice(i, 1);
                break;
            }
        }
        this.setState({
            askList: tempQuestions
        })
        this.setState({
            asknum: this.state.asknum - 1
        })

    }

    moveUp = (aid) => {
        alert(aid);
        let tempQuestions = this.state.askList;
        for (let i = 0; i < tempQuestions.length; i++) {
            if (i === aid && i !== 0) {//数组最前面的题目不能前移
                let temp = tempQuestions[i];
                tempQuestions[i] = tempQuestions[i - 1];
                tempQuestions[i - 1] = temp;

            }
        }
        this.setState({
            askList: tempQuestions
        })
    }
    moveDown = (aid) => {
        let tempQuestions = this.state.askList;
        for (let i = 0; i < tempQuestions.length; i++) {
            if (i === aid && i !== tempQuestions.length - 1) {//数组最后一项不能再后移
                let temp = tempQuestions[i];
                tempQuestions[i] = tempQuestions[i + 1];
                tempQuestions[i + 1] = temp;

            }
        }
        this.setState({
            askList: tempQuestions
        })
    }


    onOk = (value) => {
        console.log('问卷截止时间为：', parseInt(moment(value).valueOf() / 1000));
        /* this.setState({
             endTime:
              })
              */
    }

    render() {


        return (
            <div id="content" className="questionsConten">
                <div>
                    <div>
                        <div>


                            <Row>
                                <Space id="SideBar" className="questionsSideBar1" direction="vertical" align="left"
                                       size="large">
                                    <Button type="primary" name="addRadio" onClick={this.onAddRadioChild} block
                                            size="large"
                                            icon={<PlusCircleTwoTone/>}>
                                        添加单选题 </Button>
                                    <Button type="primary" name="addCheckbox" block size="large"
                                            onClick={this.onAddCheckBoxChild}><PlusSquareTwoTone/>
                                        添加多选题</Button>
                                    <Button type="primary" name="addText" block size="large"
                                            onClick={this.onAddTextChild}><EditTwoTone/>
                                        添加文本题</Button>
                                    <Tag color="blue"> 请选择问卷截止时间：</Tag>
                                    <DatePicker size="large" showTime onChange={this.setEndTime} onOk={this.onOk}/>


                                    <Tag color="blue"> 目前共有 {this.state.asknum}题</Tag>

                                    <Button type="primary" block size="large" onClick={this.handleSave} shape="round"
                                            icon={<CheckOutlined/>}>
                                        保存暂不发布问卷
                                    </Button>
                                    <Button type="primary" block size="large" onClick={this.handleSubmit} shape="round"
                                            icon={<CheckOutlined/>}>
                                        保存并发布问卷
                                    </Button>

                                </Space>


                            </Row>
                        </div>


                    </div>
                    <br/>
                </div>

                <div>

                    <Space direction="vertical" className="questionsSideBar2" size="middle">
                        <Input name="questionnaireTitle" placeholder="请输入问卷标题" size="large"
                               onChange={this.changeTitle}/>
                        <Divider>问卷内容</Divider>
                        <CreatQuestion questions={this.state.askList} handleDelete={this.handleDelete}
                                       handleChange={this.handleChange}
                                       moveUp={this.moveUp} moveDown={this.moveDown}/>
                    </Space>


                </div>


            </div>
        )
    }


}

/*const ChildComponent = (props) => {
if(props.id=="addRadio"){
  return(<div>123</div>);
}
else if(props.id=="addCheckbox"){
  return(addCheckbox);
}
}*/


export default CreatPage1;