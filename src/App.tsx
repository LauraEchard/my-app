import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// STYLE
import "./App.css";

// SCREENS
import ScreenWelcome from "../src/screens/ScreenWelcome";
import ScreenResults from "../src/screens/ScreenResults";
import ScreenInfo from "../src/screens/ScreenInfo";

// CONTEXT
import { ThemeContext, Theme } from "./contexts/theme-context";

// REDUX
import user from "./reducers/user";
import { Provider } from "react-redux";
import { createStore, combineReducers } from "redux";
const store = createStore(combineReducers({ user }));

function App() {
  const [theme, setTheme] = React.useState(Theme.Light);

  return (
    <Provider store={store}>
      <ThemeContext.Provider value={{ theme, setTheme }}>
        <Router>
          <Switch>
            <Route exact path="/" component={ScreenWelcome} />
            <Route exact path="/info" component={ScreenInfo} />
            <Route exact path="/results" component={ScreenResults} />
          </Switch>
        </Router>
      </ThemeContext.Provider>
    </Provider>
  );
}

export default App;
