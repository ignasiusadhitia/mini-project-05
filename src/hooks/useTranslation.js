import React, { useCallback, useState } from "react";
import translations from "../utils/translations";

const useTranslation = () => {
  const [language, setLanguage] = useState(
    localStorage.getItem("language") || "en"
  );

  // Function to change language and save it to localStorage
  const changeLanguage = useCallback((lang) => {
    setLanguage(lang);
    localStorage.setItem("language", lang);
  }, []);

  // Function to get text from translation file
  const t = useCallback(
    (key) => translations[language][key] || key, // Return key if translation not found
    [language]
  );

  return { t, language, changeLanguage };
};

export default useTranslation;
