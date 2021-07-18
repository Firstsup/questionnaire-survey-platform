import React, {Component} from 'react';
import ReactDom from 'react-dom';
import {DeleteOutlined, PlusOutlined} from '@ant-design/icons';
import {Radio, Input, Space, Button} from 'antd';
import '../css/EditQuestionnaire.css'


class EditRadio extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            aid: this.props.aid,
            subject: this.props.question.subject,
            type: this.props.question.type,
            isNecessary: this.props.question.isNecessary,
            choicenum: this.props.question.options.length,
            choiceList: this.props.question.options,
        }
        this.addChoice = this.addChoice.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange=(e)=> {
       
        const name = e.target.name;
        const value =e.target.value;
      
        if(name=="choiceList"){//查找修改的是选项数组的哪一项
               const cid=e.target.getAttribute("data-index");
                let tempQuestions = this.state.choiceList;
  
                     for(let i=0;i<tempQuestions.length;i++){
                       if(i==cid){
                         tempQuestions[i]=value;
                       }
                     }
                this.setState({
                  choiceList: tempQuestions   //修改了state的选项数组
                 })

                 this.props.handleChange(this.state.aid-1,name,this.state.choiceList);//把修改的aid、state名称、修改后的内容传给父组件
        }
        else{
                this.setState({
                  [name]: value,
                });
             
               this.props.handleChange(this.state.aid-1,name,value);
                 
            } 
            
            
        }


    handleDelete = () => {
        this.props.handleDelete(this.state.aid - 1)
    }

    moveUp = () => {
        this.props.moveUp(this.state.aid - 1)
    }

    moveDown = () => {
        this.props.moveDown(this.state.aid - 1)
    }

    addChoice() {
        this.setState(prevState => ({
            choiceList: [...prevState.choiceList, " "]
        }));
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps !== this.props) {
            this.setState({
                aid: this.props.aid,
                subject: this.props.question.subject,
                type: this.props.question.type,
                isNecessary: this.props.question.isNecessary,
                choicenum: this.props.question.options.length,
                choiceList: this.props.question.options,
            })
        }
    }

    render() {
        return (
            <div className="edit_questionsdiv">
                <div>
                    <div>
                        <span name="aid" value=""/*题号 根据该题在题目数组中的索引号+1生成 */ >这是第{this.state.aid}题</span>
                    </div>

                    <div>
                        <Input name="subject" size="large" onChange={this.handleChange} placeholder={this.state.subject}/>
                    </div>

                    <div>
                        <Button type="primary" size="large" onClick={this.handleDelete} icon={<DeleteOutlined/>}/>
                    </div>

                    <div>
                        <span>该题为：</span>
                        <Radio.Group name="isNecessary" onChange={this.handleChange}>
                            <Radio value={true}>必填</Radio>
                            <Radio value={false}>非必填</Radio>
                        </Radio.Group>
                    </div>

                    <div>
                        <Radio.Group>
                            <Space direction="vertical" >

                                {
                                    this.state.choiceList.map((choice, index) => {
                                        return (
                                            <Radio key={index + 1} disabled={true}><Input onChange={this.handleChange}
                                                                                          key={index + 1}
                                                                                          name="choiceList"
                                                                                          data-index={index}
                                                                                           className="edi_options"
                                                                                           size="large"
                                                                                          placeholder={choice}/></Radio>
                                        )
                                    })
                                }

                                <Button type="dashed" onClick={this.addChoice}><PlusOutlined/>添加选项</Button>

                            </Space>
                        </Radio.Group>
                    </div>
                    <Button onClick={this.moveUp}>上移</Button>
                    <Button onClick={this.moveDown}>下移</Button>
                </div>
            </div>
            // </RenderInCreatPage>

        )

    }

}

export default EditRadio