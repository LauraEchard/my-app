import React from "react";
import "../App.css";
import { useTheme, Theme } from "./theme-context";

type ThemeBackgroundProps = {
  children: React.ReactNode;
};

function ThemedBackground({ children }: ThemeBackgroundProps) {
  const { theme, setTheme } = useTheme();
  return (
    <div className={theme === Theme.Dark ? "Dark-body" : "Light-body"}>
      {children}
    </div>
  );
}

export default ThemedBackground;
