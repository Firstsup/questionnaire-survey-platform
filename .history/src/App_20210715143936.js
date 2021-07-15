import React, {Component} from 'react';
import {BrowserRouter, Route} from "react-router-dom";
import FillQuestionnaire from "./pages/FillQuestionnaire/jsx/FillQuestionnaire";
import './App.css';
import QuestionnaireSubmitComplete from "./pages/FillQuestionnaire/jsx/QuestionnaireSubmitComplete";
import ShowAllQuestionnaire from "./pages/ManageQuestionnaire/jsx/ShowAllQuestionnaire";
import DataAnalysis from "./pages/DataAnalysis/jsx/DataAnalysis";
import SubmitListQuestionnaire from "./pages/SubmitListQuestionnaire/jsx/SubmitListQuestionnaire";
import Register from "./pages/Login/jsx/Register";
import Login from './pages/Login/jsx/Login';
import CreatPage1 from './pages/CreatNewQuestionnaire/jsx/CreatPage1';
import EditQuestionnaire from './pages/EditQuestionnaire/jsx/EditQuestionnaire';
import ResetPassword from './pages/Login/jsx/ResetPassword';
import ModifyPassword from './pages/Login/jsx/ModifyPassword';

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <Route path={'/fillquestionnaire'} component={FillQuestionnaire}/>
                <Route path={'/fillquestionnairesubmitcomplete'} component={QuestionnaireSubmitComplete}/>
                <Route path={'/dataanalysis'} component={DataAnalysis}/>
                <Route path={'/submitlistquestionnaire'} component={SubmitListQuestionnaire}/>
                <Route path={'/showallquestionnaire'} component={ShowAllQuestionnaire}/>
                <Route path={'/register'} component={Register} />
                <Route path={'/login'} component ={Login}  />
                <Route path={'/createpage'} component ={CreatPage1} />
                <Route path={'/editquestionnaire'} component ={EditQuestionnaire} />
                <Route path={'/resetpassword'} component ={ResetPassword} />
                <Route path={'/password'} component ={ResetPassword} />
            </BrowserRouter>
        )
    }
}

export default App;
