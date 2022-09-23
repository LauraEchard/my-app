import React from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import logo from "./logo.svg";
import ScreenWelcome from "./ScreenWelcome";
import ScreenResult from "./ScreenResult";
import ScreenInfo from "./ScreenInfo";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={ScreenWelcome} />
        <Route exact path="/screenresult" component={ScreenResult} />
        <Route exact path="/screeninfo" component={ScreenInfo} />
      </Switch>
    </Router>
  );
}

export default App;
