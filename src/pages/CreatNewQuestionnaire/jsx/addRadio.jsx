import React, {Component} from 'react';
import ReactDom from 'react-dom';
import DeleteTwoTone from '@material-ui/icons/DeleteTwoTone';
import { Radio, Input, Space  } from 'antd';


class addRadio extends Component{
constructor(props){
super(props);
this.state={
    aid:'',
    ask:'',
    type:0,
    isNecessary:Boolean,
    choiceList: [//每个选项内容


    ]


}

this.handleChange = this.handleChange.bind(this);
}

handleChange(event) {
    const target = event.target;
    const name = target.name;
    const value =target.value;
  
    this.setState({
      [name]: value
    });
  }



/*  //所有生命周期函数待梳理
componentDidMount(){   
    
    
    popupInfo={
    rootDom:,//接收弹层组件的DOM节点，如document.body
    
    left:,//相对位置
    
    top://位置信息
    
    }
}


componentDidUpdate() {
this._renderLayer();

}

componentWillUnmount(){//在组件卸载的时候，保证弹层也被卸载掉

ReactDom.unmountComponentAtNode(this.popup);

document.body.removeChild(this.popup);

}

_renderLayer(){//将弹层渲染到body下的div标签

ReactDom.render(this.props.children, this.popup);

}


*/

render(){
return (
<div>
    <div>
        <div >
            <span name="aid" value=""/*题号 根据该题在题目数组中的索引号+1生成 */ ></span>
        </div>

        <div >
         <Input name="ask" placeholder="请输入该单选题的问题" onChange={this.handleChange}></Input>
        </div>

        <div>
            <button onClick={this.handleDelete} /*删除该题目*/> <DeleteTwoTone  /></button>   
        </div>

        <div>
            <span>该题为：</span>
            <Radio.Group name="isNecessary" onChange={this.handleChange} >
                 <Radio value={true}>必填</Radio>
                 <Radio value={false}>选填</Radio>
            </Radio.Group>
        </div>

        <div>
            <Radio.Group onChange={this.handleChange} name="choiceList">
            <Space direction="vertical">
            <Radio value={1} ><Input  placeholder="请输入选项内容" onChange={this.handleChange}></Input></Radio>
            <Radio value={2}><Input  placeholder="请输入选项内容" onChange={this.handleChange}></Input></Radio>
            <Radio value={3}>
            { <Input placeholder="添加选项" style={{ width: 100, marginLeft: 10 }} />  }
          </Radio>
        </Space>
      </Radio.Group>
        </div>

    </div>
</div>

)

}

}

export default addRadio