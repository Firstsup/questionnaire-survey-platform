import React, {Component} from 'react'
import {BrowserRouter, Route} from "react-router-dom";
import FillQuestionnaire from "./pages/FillQuestionnaire/jsx/FillQuestionnaire";
import './App.css'
import QuestionnaireSubmitComplete from "./pages/FillQuestionnaire/jsx/QuestionnaireSubmitComplete";
import TempTestDetail from "./pages/ViewQuestionnaireDetail/jsx/TempTestDetail";
import ShowAllQuestionnaire from "./pages/ManageQuestionnaire/jsx/ShowAllQuestionnaire"
import DataAnalysis from "./pages/DataAnalysis/jsx/DataAnalysis";
import {ConfigProvider} from "antd";
import cn from 'antd/es/locale/zh_CN'

class App extends Component {
    render() {
        return (
            <ConfigProvider locale={cn}>
                <BrowserRouter>
                    <Route path={'/fillquestionnaire'} component={FillQuestionnaire}/>
                    <Route path={'/fillquestionnairesubmitcomplete'} component={QuestionnaireSubmitComplete}/>
                    <Route path={'/temptestdetail'} component={TempTestDetail}/>
                    <Route path={'/dataanalysis'} component={DataAnalysis}/>
                    <Route path={'/'} exact component={ShowAllQuestionnaire}/>
                </BrowserRouter>
            </ConfigProvider>
        )
    }
}

export default App;
