import React from "react";
import { ThemeContext, themes } from "./theme-context";

class ThemedButton extends React.Component {
  render() {
    let props = this.props;
    let theme = this.context;
    return <button {...props} style={{ color: themes.dark.foreground }} />;
  }
}
ThemedButton.contextType = ThemeContext;

export default ThemedButton;
