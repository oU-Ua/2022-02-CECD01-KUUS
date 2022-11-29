import './App.css';
import React from "react";
import PropTypes from "prop-types";
import { BrowserRouter as Router, Switch, Route, useLocation} from "react-router-dom";
import {useEffect} from 'react';

import LandingPage from './components/views/LandingPage/LandingPage.js';
import LoginPage from './components/views/LoginPage/LoginPage';
import RegisterPage from './components/views/RegisterPage/RegisterPage';
import FlightSearchPage from './components/views/FlightSearchPage/FlightSearchPage';
import MyPage from './components/views/MyPage/MyPage';
import MyPageShared from './components/views/MyPage/MyPageShared';
import MyPageCreate from './components/views/MyPage/MyPageCreate';
import Auth from './hoc/auth';
import Header from './components/views/header/header';
import Footer from './components/views/footer/footer';
let currentPath = "";

function App() {  
  //같은 Link를 클릭해도 새로고침 되도록 하기(여기서부터) 
  let location = useLocation();
  useEffect(() => {
    if(currentPath === location.pathname) window.location.reload();
     
    currentPath = location.pathname;
  }, [location]);
  //같은 Link를 클릭해도 새로고침 되도록 하기(여기까지)

  return (
    <div>
      <Header></Header>
      <Router>
        <div>
        <Switch>
            <Route exact path="/" component={Auth(LandingPage, null)  } />
            <Route exact path="/login" component={Auth(LoginPage, false) } />
            <Route exact path="/register" component={Auth(RegisterPage, false)} />
            <Route exact path="/flightsearch" component={Auth(FlightSearchPage, null )  } />
            {/* mypage다 만들고 접근을 true로 바꾸기 */}
            <Route exact path="/mypage" component={Auth(MyPage, null) } />
            <Route exact path="/mypage/shared" component={Auth(MyPageShared, null) } />
            <Route exact path="/mypage/create" component={Auth(MyPageCreate, null) } />
          </Switch>
        </div>
      </Router>
      <Footer></Footer>
    </div>
  );
}

App.propTypes = {
  classes: PropTypes.object
};

export default App;