import React, {Component} from 'react';
import {BrowserRouter, Route} from "react-router-dom";
import {Link} from "react-router-dom";
import Register from "../../Register/jsx/Register";
import Login from "../../Login/jsx/Login";

class HomePage extends React.Component{
  render()  {
      return(
  <div>
    <Link to="/">回到主页 </Link>
    <Link to="/src/pages/Register/jsx/Register">注册 </Link>
    <Link to="/src/pages/Login/jsx/Login.jsx">登录 </Link>
  </div>
       ) }
}

export default HomePage;
