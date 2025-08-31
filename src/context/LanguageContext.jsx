import React, { createContext, useState, useContext } from "react";
import translations from "../translations.json";

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState("ro");

  const value = {
    language,
    setLanguage,
    t: (key) => {
      const translation = translations[language]?.[key];
      if (typeof key === "string" && key.includes(".")) {
        const [section, subKey] = key.split(".");
        return translations[language]?.[section]?.[subKey];
      }
      return translation;
    },
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
