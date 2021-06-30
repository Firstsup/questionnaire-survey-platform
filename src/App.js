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
import CreatPage from './pages/CreatNewQuestionnaire/jsx/CreatPage';
function App() {
    return (
        <main>
            <HomePage />
            <Switch>
                <Route path="/" component={HomePage} exact />
                <Route path="/src/pages/Register/jsx/Register" component={Register} />
                <Route path="/src/pages/Login/jsx/Login1" component ={Login1}  />
                <Route path="/src/pages/CreatNewQuestionnaire/jsx/SideBar" component ={SideBar}></Route>
                <Route path="/src/pages/CreatNewQuestionnaire/jsx/CreatPage"> component ={CreatPage}</Route>
                <Route component={Error} />
            </Switch>
        </main>
    )
}

export default App;
