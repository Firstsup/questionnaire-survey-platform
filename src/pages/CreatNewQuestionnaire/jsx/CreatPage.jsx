import React, {Component} from 'react';


class CreatPage extends Component(){
    constructor(props) {
        super(props);
        this.state = {userName: '蓝百灵',
                      questionnaireId:'',
                      questionnaireCount:'',
                      questionnaireSign:'',
                      askList:[
                            {askId:'',
                             askType:'',
                            },
                          {}
                        ]
      };
    
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }

      
}