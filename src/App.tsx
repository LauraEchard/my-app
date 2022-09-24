import React from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import logo from "./logo.svg";
import ScreenWelcome from "./ScreenWelcome";
import ScreenResult from "./ScreenResult";
import ScreenInfo from "./ScreenInfo";
import user from "./reducers/user";
import { Provider } from "react-redux";
import { createStore, combineReducers } from "redux";
const store = createStore(combineReducers({ user }));

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route exact path="/" component={ScreenWelcome} />
          <Route exact path="/screenresult" component={ScreenResult} />
          <Route exact path="/screeninfo" component={ScreenInfo} />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
