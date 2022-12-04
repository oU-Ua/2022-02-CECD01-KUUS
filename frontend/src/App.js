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
import MyPageSchedule from './components/views/MyPage/MyPageSchedule';
import MyPageShare from './components/views/MyPage/MyPageShare';
import MyPageCreate from './components/views/MyPage/MyPageCreate';
import SharedPage from './components/views/SharedPage/SharedPage';
import SharedPageRegister from './components/views/SharedPage/SharedPageRegister';

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
            <Route exact path="/mypage/schedules/:id" component={Auth(MyPageSchedule, null) } />
            <Route exact path="/mypage/schedule/share" component={Auth(MyPageShare, null) } />
            <Route exact path="/mypage/create" component={Auth(MyPageCreate, null) } />
            <Route exact path="/share/:id" component={Auth(SharedPage, null) } />
            <Route exact path="/share/register/:id" component={Auth(SharedPageRegister, null) } />
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