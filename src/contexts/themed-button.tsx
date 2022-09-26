import React from "react";
import "../App.css";
import { useTheme, Theme } from "./theme-context";

// ICONS
import { RiMoonFill } from "react-icons/ri";
import { MdWbSunny } from "react-icons/md";

type ThemeButtonProps = {
  children: React.ReactNode;
};

function ThemedButton({ children }: ThemeButtonProps) {
  const { theme, setTheme } = useTheme();

  // FUNCTION TO SWITCH THEME
  let changeTheme = () => {
    if (theme === Theme.Dark) {
      setTheme(Theme.Light);
    } else {
      setTheme(Theme.Dark);
    }
  };

  // ICON DEPENDING ON THE CURRENT THEME
  let icon;
  if (theme === Theme.Dark) {
    icon = <RiMoonFill className="Icon" />;
  } else if (theme === Theme.Light) {
    icon = <MdWbSunny className="Icon" />;
  }

  return (
    <button
      className={theme === Theme.Dark ? "Dark-Button" : "Light-Button"}
      onClick={() => changeTheme()}
    >
      {theme === Theme.Dark ? "LIGHT MODE" : "DARK MODE"}
      {icon}
    </button>
  );
}

export default ThemedButton;
