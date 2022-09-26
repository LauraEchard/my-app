import React from "react";
import "../App.css";
import { useTheme, Theme } from "./theme-context";

type ThemeFieldProps = {
  children: React.ReactNode;
};

function ThemedField({ children }: ThemeFieldProps) {
  const { theme, setTheme } = useTheme();
  return (
    <p className={theme === Theme.Dark ? "Dark-p1" : "Light-p1"}>{children}</p>
  );
}

export default ThemedField;
