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
import '../css/CreatQuestion.css';
import CreatQuestion from './CreatQuestion';

const {Header, Footer, Sider, Content} = Layout;


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

        };

        // this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.moveDown=this.moveDown.bind(this);
        this.moveUp=this.moveUp.bind(this);
    }


    handleSubmit(event) {
        alert("正在提交");/* 提交时遍历题目列表，如果每一项都不为空才能提交给后端*/

    }

    onAddRadioChild = () => {
        this.setState(prevState => ({
            askList: [...prevState.askList,
                {
                    aid: Number,
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
                    aid: Number,
                    ask: '',
                    type: 2,//1单选 2多选 3文本
                    isNecessary: Boolean,
                    choiceList: [" ", " ",],
                }] ,
                asknum: this.state.asknum + 1,
        }));
    }

    onAddTextChild = () => {
        this.setState(prevState => ({//文本题没有选项，choicecontent数组为空
            askList: [...prevState.askList,
                {
                    aid: Number,
                    ask: '',
                    type: 3,//1单选 2多选 3文本
                    isNecessary: Boolean,
                    choiceList: [],
                }] ,
                 asknum: this.state.asknum + 1
        }));
    }

    handleChange = (aid,changeName,changeItem) => {//从子组件接受修改的题目的aid、修改的state的名称、修改后的内容

        let tempaskList=this.state.askList;
        for(let i=0;i<tempaskList.length;i++){
            if(i==aid){
                 //函数Object.defineProperty(object, propertyname, descriptor);
                tempaskList[i][changeName]=changeItem;
               
                break;                                                       
            }
        }
        this.setState({
            askList:tempaskList
        })
            console.log(this.state.askList[aid]);
        
    }

    changeTitle=(event)=>{
        const target = event.target;
        const name = target.name;
        const value =target.value;
        this.setState({
            questionnaireTitle:value
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
                break;
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
                break;
            }
        }
        this.setState({
            askList: tempQuestions
        })
    }


    render() {


        return (
            <div id="content">
                <div className="questionsSideBar">
                    <div>
                        <div>


                            <Row>
                                <Space direction="vertical">
                                    <Button type="primary" name="addRadio" onClick={this.onAddRadioChild}
                                            icon={<PlusCircleTwoTone/>}>
                                        添加单选题 </Button>
                                    <Button type="primary" name="addCheckbox"
                                            onClick={this.onAddCheckBoxChild}><PlusSquareTwoTone/>
                                        添加多选题</Button>
                                    <Button type="primary" name="addText"
                                            onClick={this.onAddTextChild}><EditTwoTone/>
                                        添加文本题</Button>

                                </Space>


                            </Row>
                        </div>


                    </div>
                    <br/>
                    <div>
                        <Tag color="blue"> 目前共有 {this.state.asknum}题</Tag>
                        <br/>

                        <Button type="primary" onClick={this.handleSubmit} shape="round" icon={<CheckOutlined/>}>
                            确认创建
                        </Button>
                    </div>
                </div>
                <div className="questionsConten">

                    <Space direction="vertical">
                        <Input name="questionnaireTitle" placeholder="请输入问卷标题" onChange={this.changeTitle}></Input>
                        <Divider>问卷内容</Divider>
                        <CreatQuestion questions={this.state.askList} handleDelete={this.handleDelete} handleChange={this.handleChange}
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