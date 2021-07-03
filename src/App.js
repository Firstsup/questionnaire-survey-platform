import React, {Component} from 'react';
import {BrowserRouter, Route} from "react-router-dom";
import FillQuestionnaire from "./pages/FillQuestionnaire/jsx/FillQuestionnaire";
import './App.css'
import QuestionnaireSubmitComplete from "./pages/FillQuestionnaire/jsx/QuestionnaireSubmitComplete";
import TempTestDetail from "./pages/ViewQuestionnaireDetail/jsx/TempTestDetail";
import HomePage from './pages/testHomePage/jsx/testHomePage';
import Register from './pages/Register/jsx/Register';
import Login1 from './pages/Login/jsx/Login1';
import { Switch } from 'react-router-dom';
import SideBar from './pages/CreatNewQuestionnaire/jsx/SideBar';
import CreatPage1 from './pages/CreatNewQuestionnaire/jsx/CreatPage1';
import addRadio from './pages/CreatNewQuestionnaire/jsx/addRadio';
import addCheckbox from './pages/CreatNewQuestionnaire/jsx/addCheckbox';
function App() {
    return (
        <main>
           <HomePage></HomePage>
            <Switch>
                <Route path="/" component={HomePage} exact />
                <Route path="/src/pages/Register/jsx/Register" component={Register} />
                <Route path="/src/pages/Login/jsx/Login1" component ={Login1}  />
                <Route path="/src/pages/CreatNewQuestionnaire/jsx/SideBar" component ={SideBar}></Route>
                <Route path="/src/pages/CreatNewQuestionnaire/jsx/CreatPage1"component ={CreatPage1}></Route>
                <Route path="/src/pages/CreatNewQuestionnaire/jsx/addRadio"component ={addRadio}></Route>
                <Route path="/src/pages/CreatNewQuestionnaire/jsx/addCheckbox"component ={addCheckbox}></Route>
            </Switch>
        </main>
    )
}

export default App;
