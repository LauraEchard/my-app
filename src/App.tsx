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
import { ThemeContext, themes } from "./theme-context";
const store = createStore(combineReducers({ user }));

function App() {
  return (
    <Provider store={store}>
      <ThemeContext.Provider value={themes.dark}>
        <Router>
          <Switch>
            <Route exact path="/" component={ScreenWelcome} />
            <Route exact path="/results" component={ScreenResult} />
            <Route exact path="/summary" component={ScreenInfo} />
          </Switch>
        </Router>
      </ThemeContext.Provider>
    </Provider>
  );
}

export default App;
