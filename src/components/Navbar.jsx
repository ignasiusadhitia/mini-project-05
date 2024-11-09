import React, { useContext } from "react";
import { StudentAppContext } from "../context/StudentAppContext";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { language, changeLanguage, theme, toggleTheme } =
    useContext(StudentAppContext);

  return (
    <div className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          Student App
        </Link>
        <div className="navbar-buttons">
          <button
            onClick={() => changeLanguage(language === "en" ? "id" : "en")}
          >
            {language === "en" ? "ID" : "EN"}
          </button>
          <button onClick={toggleTheme} className="theme-toggle">
            {theme === "light" ? "🌙" : "☀️"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
