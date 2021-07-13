import React from 'react';
import {DeleteOutlined, PlusOutlined} from '@ant-design/icons';
import {Radio, Input, Space, Button} from 'antd';
import "../css/CreatQuestion.css"


class AddRadio extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            aid: this.props.aid,//新建页面的所有排序从0开始
            ask: this.props.ask,
            type: this.props.type,//1单选 2多选 3文本
            isNecessary: this.props.isNecessary,
            choiceList: this.props.choiceList
        }
        this.addChoice = this.addChoice.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    /*changRadioChioce=(event)=>{
          const target = event.target;
          const name = target.name;
          const value =target.value;
          const key = target.key;

              const choices = this.state.choicecontent.map((choice, index) => {
                  return (
                      key == (index+1) ? {choice :value }: choice)
              });
              this.setState(
                  {choicecontent: choices}
              )
          this.props.handleChangeChoice(this.state.aid,this.state.choicecontent);
      }
  */

    handleChange(e) {
        const name = e.target.name;
        const value = e.target.value;
        if (name === "choiceList") {//查找修改的是选项数组的哪一项
            const cid = e.target.getAttribute("data-index");
            let tempQuestions = this.state.choiceList;
            for (let i = 0; i < tempQuestions.length; i++) {
                if (i === cid) {
                    tempQuestions[i] = value;
                }
            }
            this.setState({
                choiceList: tempQuestions   //修改了state的选项数组
            })
            this.props.handleChange(this.state.aid, name, this.state.choiceList);//把修改的aid、state名称、修改后的内容传给父组件
        } else {
            this.setState({
                [name]: value,
            });
            this.props.handleChange(this.state.aid, name, value);
        }
    }

    addChoice() {
        this.setState(prevState => ({
            choiceList: [...prevState.choiceList, " "]
        }));

    }

    handleDelete = () => {
        alert(this.state.aid);
// alert("点击发出删除请求");
        this.props.handleDelete(this.state.aid);

    }

    moveUp = () => {
        this.props.moveUp(this.state.aid);
    }
    moveDown = () => {
        this.props.moveUp(this.state.aid);

    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps !== this.props) {
            this.setState({
                aid: this.props.aid,//新建页面的所有排序从0开始
                ask: this.props.ask,
                type: this.props.type,//1单选 2多选 3文本
                isNecessary: this.props.isNecessary,
                choiceList: this.props.choiceList
            })
        }
    }

    render() {

        return (
            // <RenderInCreatPage>
            <div className="questionsdiv">
                <div>
                    <div>
                        <span>第{this.state.aid + 1}题</span>
                    </div>

                    <div>
                        <Input name="ask" size="large" placeholder={this.state.ask}
                               onChange={this.handleChange}/>
                    </div>

                    <div>
                        <Button type="primary" size="large" onClick={this.handleDelete}
                                icon={<DeleteOutlined/>}/>
                    </div>

                    <div>
                        <span>该题为：</span>
                        <Radio.Group name="isNecessary" value={this.state.isNecessary} onChange={this.handleChange}>
                            <Radio value={true}>必填</Radio>
                            <Radio value={false}>选填</Radio>
                        </Radio.Group>
                    </div>

                    <div>
                        <Radio.Group>
                            <Space direction="vertical">

                                {
                                    this.state.choiceList.map((choice, index) => {
                                        return (
                                            <Radio disabled={true}>
                                                <Input onChange={this.handleChange}
                                                       key={index}
                                                       data-index={index}
                                                       name="choiceList"
                                                       size="large"
                                                       className="asksoptions"
                                                       placeholder={choice}/></Radio>
                                        )
                                    })
                                }
                                <div>


                                </div>


                            </Space>
                        </Radio.Group>

                    </div>
                    <br/><Button type="dashed" onClick={this.addChoice}><PlusOutlined/>添加选项</Button>
                    <Button onClick={this.moveUp}>上移</Button>
                    <Button onClick={this.moveDown}>下移</Button>
                </div>
            </div>
            // </RenderInCreatPage>

        )

    }

}

export default AddRadio