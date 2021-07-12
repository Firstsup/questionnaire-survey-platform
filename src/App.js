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
import ResetPassword from './pages/Login/jsx/ResetPassword';

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
                <Route path="/Register" component={Register} />
                <Route path="/Login1" component ={Login1}  />
                <Route path="/CreatPage1" component ={CreatPage1} />
                <Route path="/EditQuestionnaire" component ={EditQuestionnaire} />
                <Route path="/ResetPassword" component ={ResetPassword} />
            </BrowserRouter>
        )
    }
}

export default App;
