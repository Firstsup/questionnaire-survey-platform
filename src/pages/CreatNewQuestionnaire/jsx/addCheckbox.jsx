import React, {Component} from 'react';
import ReactDom from 'react-dom';
import DeleteTwoTone from '@ant-design/icons';
import { Radio, Input, Space, Checkbox  } from 'antd';
 class addCheckbox extends Component{
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
 }
