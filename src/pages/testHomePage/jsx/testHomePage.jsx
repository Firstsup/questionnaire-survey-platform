import React, {Component} from 'react';
import {BrowserRouter, Route} from "react-router-dom";
import {Link} from "react-router-dom";
import Register from "../../Register/jsx/Register";
import Login1 from "../../Login/jsx/Login1";
import SideBar from '../../CreatNewQuestionnaire/jsx/SideBar';
import CreatPage from '../../CreatNewQuestionnaire/jsx/CreatPage';

class HomePage extends React.Component{
  render()  {
      return(
  <div>
    <Link to="/">回到主页 </Link>
    <Link to="/src/pages/Register/jsx/Register">注册 </Link>
    <Link to="/src/pages/Login/jsx/Login1">登录 </Link>
    <Link to="/src/pages/CreatNewQuestionnaire/jsx/SideBar">SideBar </Link>
    <Link to="/src/pages/CreatNewQuestionnaire/jsx/CreatPage">CreatPage </Link>
  </div>
       ) }
}

export default HomePage;
