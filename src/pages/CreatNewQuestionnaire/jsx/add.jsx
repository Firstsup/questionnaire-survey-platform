import {Component} from 'react'
import React from "react";
import ReactDOM from "react-dom";
import CreatPage from './CreatPage';
class RenderInCreatPage extends Component{
    constructor(p){
     super();
    }

    componentDidMount(){//新建一个div标签并塞进body
        this.popup = React.createElement("div");
        CreatPage.form.appendChild(this.popup);
        this._renderLayer();
       }
       componentDidUpdate() {
        this._renderLayer();
       }
       componentWillUnmount(){//在组件卸载的时候，保证弹层也被卸载掉
        ReactDOM.unmountComponentAtNode(this.popup);
        CreatPage.form.removeChild(this.popup);
       }
       _renderLayer(){//将弹层渲染到CreatPage组件下的form标签
        ReactDOM.render(this.props.children, this.popup);
       }



 
   }

   export default RenderInCreatPage