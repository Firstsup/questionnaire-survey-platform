import React, {Component} from 'react';
import { Result } from 'antd';

class QuestionnaireSubmitComplete extends Component {
    render() {
        return (
            <Result
                status="success"
                title="提交成功"
            />
        )
    }
}

export default QuestionnaireSubmitComplete