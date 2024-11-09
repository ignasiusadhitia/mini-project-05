import { useCallback, useEffect, useState } from "react";

const useTheme = () => {
  // Check theme preference from localStorage
  const getInitialTheme = () => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      return savedTheme;
    }

    // If no preference saved, set theme to system preference
    const prefersDarkMode = window.matchMedia(
      "(prefers-color-scheme:dark)"
    ).matches;
    return prefersDarkMode ? "dark" : "light";
  };

  const [theme, setTheme] = useState(getInitialTheme);

  // Function to change theme and save it to localStorage
  const toggleTheme = useCallback(() => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  }, [theme]);

  // Update body class to match theme
  useEffect(() => {
    document.body.classList.remove("light", "dark");
    document.body.classList.add(theme);
  }, [theme]);

  // Update theme if system preference changes
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme:dark)");
    const handleChange = () => {
      if (!localStorage.getItem("theme")) {
        setTheme(mediaQuery.matches ? "dark" : "light");
      }
    };
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return { theme, toggleTheme };
};

export default useTheme;
