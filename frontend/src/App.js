import './App.css';
import React from "react";
import PropTypes from "prop-types";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import LandingPage from './components/views/LandingPage/LandingPage.js';
import LoginPage from './components/views/LoginPage/LoginPage';
import RegisterPage from './components/views/RegisterPage/RegisterPage';
import FlightSearchPage from './components/views/FlightSearchPage/FlightSearchPage';
import MyPage from './components/views/MyPage/MyPage';
import Auth from './hoc/auth';
import Header from './components/views/header/header';
import Footer from './components/views/footer/footer';

function App() {
  return (
    <div>
      <Header></Header>
      <Router>
        <div>
        <Switch>
            <Route exact path="/" component={Auth(LandingPage, null )  } />
            <Route exact path="/login" component={Auth(LoginPage, false) } />
            <Route exact path="/register" component={Auth(RegisterPage, false)} />
            <Route exact path="/flightsearch" component={Auth(FlightSearchPage, null )  } />
            {/* mypage다 만들고 접근을 true로 바꾸기 */}
            <Route exact path="/mypage" component={Auth(MyPage, null) } />
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