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
import Auth from './hoc/auth';
import Header from './components/views/header/header';

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
          </Switch>
        </div>
      </Router>
    </div>
  );
}

App.propTypes = {
  classes: PropTypes.object
};

export default App;