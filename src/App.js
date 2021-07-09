import React, {Component} from 'react';
import {BrowserRouter, Route} from "react-router-dom";
import FillQuestionnaire from "./pages/FillQuestionnaire/jsx/FillQuestionnaire";
import './App.css';
import QuestionnaireSubmitComplete from "./pages/FillQuestionnaire/jsx/QuestionnaireSubmitComplete";
import ShowAllQuestionnaire from "./pages/ManageQuestionnaire/jsx/ShowAllQuestionnaire";
import DataAnalysis from "./pages/DataAnalysis/jsx/DataAnalysis";
import SubmitListQuestionnaire from "./pages/SubmitListQuestionnaire/jsx/SubmitListQuestionnaire";
import HomePage from './pages/testHomePage/jsx/testHomePage';
import Register from './pages/Register/jsx/Register';
import Login1 from './pages/Login/jsx/Login1';
import CreatPage1 from './pages/CreatNewQuestionnaire/jsx/CreatPage1';
import EditQuestionnaire from './pages/EditQuestionnaire/jsx/EditQuestionnaire';

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <Route path="/" component={HomePage} exact />
                <Route path={'/fillquestionnaire'} component={FillQuestionnaire}/>
                <Route path={'/fillquestionnairesubmitcomplete'} component={QuestionnaireSubmitComplete}/>
                <Route path={'/dataanalysis'} component={DataAnalysis}/>
                <Route path={'/submitlistquestionnaire'} component={SubmitListQuestionnaire}/>
                <Route path={'/showallquestionnaire'} component={ShowAllQuestionnaire}/>
                <Route path="/register" component={Register} />
                <Route path="/login" component ={Login1}  />
                <Route path="/src/pages/CreatNewQuestionnaire/jsx/CreatPage1" component ={CreatPage1} />
                <Route path="/src/pages/EditQuestionnaire/jsx/EditQuestionnaire" component ={EditQuestionnaire} />
            </BrowserRouter>
        )
    }
}

export default App;
