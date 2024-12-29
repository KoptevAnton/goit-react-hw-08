import { useState, useEffect } from "react";

import s from './ThemeProvider.module.css';

const ThemeProvider = () => {
  const [isDark, setIsDark] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      return savedTheme === "dark"; 
    }
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  const toggleTheme = () => {
    setIsDark(prevIsDark => !prevIsDark);
  };

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark-theme");
      document.documentElement.classList.remove("light-theme");
      localStorage.setItem("theme", "dark"); 
    } else {
      document.documentElement.classList.add("light-theme");
      document.documentElement.classList.remove("dark-theme");
      localStorage.setItem("theme", "light"); 
    }
  }, [isDark]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const handleSystemThemeChange = e => {
      if (!localStorage.getItem("theme")) {
        setIsDark(e.matches); 
      } else {
        localStorage.removeItem("theme");
        setIsDark(e.matches);
      }
    };

    mediaQuery.addEventListener("change", handleSystemThemeChange);

    return () => {
      mediaQuery.removeEventListener("change", handleSystemThemeChange);
    };
  }, []);

  return (
      <div className={s.wrapper}>
        <button className={s.btn} onClick={toggleTheme}>
          {isDark ? "theme 🌞" : "theme 🌛"}
        </button>
      </div>
  );
};

export default ThemeProvider;
