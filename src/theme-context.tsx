import React from "react";

export const themes = {
  light: {
    foreground: "#000000",
    background: "#eeeeee",
  },
  dark: {
    foreground: "#555555",
    background: "#222222",
  },
};

export const ThemeContext = React.createContext(themes.dark);