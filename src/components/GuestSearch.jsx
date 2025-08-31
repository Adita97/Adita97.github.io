// src/components/GuestSearch.jsx
import React from "react";
import { motion } from "framer-motion";

export default function GuestSearch({
  t,
  lastName,
  setLastName,
  inputRef,
  loading,
  suggestions,
  activeSuggestion,
  handleKeyDown,
  setSuggestions,
  setActiveSuggestion,
  firstOptions,
  selectedFirst,
  setSelectedFirst,
  setSelectedGuest,
  setShowInvitation,
}) {
  return (
    <motion.div
      className="card"
      key="search-form"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="title">{t("title")}</h1>
      <p className="subtitle">{t("subtitle")}</p>

      {/* Last name input */}
      <div className="form-row">
        <label>{t("lastName")}</label>
        <input
          ref={inputRef}
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={t("enterLastName")}
        />
        {loading && <div className="loading">{t("searching")}</div>}

        {suggestions.length > 0 && (
          <div className="suggestions-list">
            {suggestions.map((suggestion, index) => (
              <div
                key={suggestion.last_name}
                className={`suggestion-item ${
                  index === activeSuggestion ? "active" : ""
                }`}
                onClick={() => {
                  setLastName(suggestion.last_name);
                  setSuggestions([]);
                  setActiveSuggestion(-1);
                }}
              >
                {suggestion.last_name}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* First name select */}
      {firstOptions.length > 0 && (
        <div className="form-row">
          <label>{t("firstName")}</label>
          <select
            value={selectedFirst}
            onChange={(e) => {
              const guest = firstOptions.find((g) => g.id === e.target.value);
              setSelectedFirst(e.target.value);
              setSelectedGuest(guest);
            }}
          >
            <option value="">{t("select")}</option>
            {firstOptions.map((guest) => (
              <option key={guest.id} value={guest.id}>
                {guest.first_name}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Button */}
      {selectedFirst && (
        <div className="actions">
          <button className="gold-btn" onClick={() => setShowInvitation(true)}>
            {t("viewInvitation")}
          </button>
        </div>
      )}
    </motion.div>
  );
}
