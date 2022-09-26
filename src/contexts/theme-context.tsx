import React from "react";
import { createContext, useContext } from "react";

// LIST OF THEMES
export enum Theme {
  Dark = "Dark",
  Light = "Light",
}

// TYPE FOR THEMECONTEXT
export type ThemeContextType = {
  theme: Theme;
  setTheme: (Theme: Theme) => void;
};

// CREATION OF THEMECONTEXT
export const ThemeContext = createContext<ThemeContextType>({
  theme: Theme.Dark,
  setTheme: (theme) => console.warn("no theme provider"),
});

// SPECIAL HOOK TO CONSUME THEMECONTEXT
export const useTheme = () => useContext(ThemeContext);
