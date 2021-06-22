import React, {Component} from 'react'
import {BrowserRouter, Route} from "react-router-dom";
import FillQuestionnaire from "./pages/FillQuestionnaire/jsx/FillQuestionnaire";
import './App.css'
import QuestionnaireSubmitComplete from "./pages/FillQuestionnaire/jsx/QuestionnaireSubmitComplete";
import TempTestDetail from "./pages/ViewQuestionnaireDetail/jsx/TempTestDetail";

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <Route path={'/fillquestionnaire'} component={FillQuestionnaire}/>
                <Route path={'/fillquestionnairesubmitcomplete'} component={QuestionnaireSubmitComplete}/>
                <Route path={'/temptestdetail'} component={TempTestDetail}/>
            </BrowserRouter>
        )
    }
}

export default App;
