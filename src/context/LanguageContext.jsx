import React, { createContext, useState, useContext } from "react";
import translations from "../translations.json";

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState("ro");

  const t = (key) => {
    if (!key) return "";

    // Handle nested keys (e.g., "invitation.date")
    if (key.includes(".")) {
      const keys = key.split(".");
      let value = translations[language];

      for (const nestedKey of keys) {
        value = value?.[nestedKey];
        if (value === undefined) break;
      }

      return value || key;
    }

    // Handle simple keys
    return translations[language]?.[key] || key;
  };

  const value = {
    language,
    setLanguage,
    t,
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
