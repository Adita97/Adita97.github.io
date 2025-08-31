import React from "react";
import { motion } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";
import translations from "../translations.json";
import "../styles/language-welcome.css";

const languages = {
  ro: {
    native: "Română",
    welcome: "Bun venit",
  },
  ru: {
    native: "Русский",
    welcome: "Добро пожаловать",
  },
};

export default function LanguageSelector({ onLanguageSelected }) {
  const { setLanguage } = useLanguage();

  const handleSelectLanguage = (lang) => {
    setLanguage(lang);
    onLanguageSelected();
  };

  return (
    <motion.div
      className="language-welcome"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <h1>Bun venit • Добро пожаловать</h1>
      <div className="language-options">
        {Object.entries(languages).map(([lang, { native, welcome }]) => (
          <motion.div
            key={lang}
            className="language-card"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleSelectLanguage(lang)}
          >
            <div className="native-name">{native}</div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
