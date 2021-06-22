import React, {Component} from 'react';
import {Result, Button} from 'antd';

class QuestionnaireExpire extends Component {
    handleReturn = () => {
        this.props.history.goBack();
    }

    render() {
        return (
            <Result className="result"
                    status="500"
                    title="问卷已过期"
                    extra={<Button type="primary" onClick={this.handleReturn}>返回</Button>}
            />
        )
    }
}

export default QuestionnaireExpire