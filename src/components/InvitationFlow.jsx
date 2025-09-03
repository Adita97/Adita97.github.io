// src/components/InvitationFlow.jsx
import React from "react";
import { motion } from "framer-motion";
import Invitation from "./Invitation";

export default function InvitationFlow({
  t,
  selectedGuest,
  lastName,
  showRsvpForm,
  rsvpData,
  handleRsvpChange,
  submit,
  submitRsvpForm,
}) {
  return (
    <motion.div
      key="invitation"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.8 }}
    >
      {!showRsvpForm ? (
        <Invitation
          guestName={`${selectedGuest?.first_name} ${lastName}`}
          onConfirm={submit}
          message={selectedGuest?.message}
        />
      ) : (
        <motion.div
          className="rsvp-form-container"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
        >
          <div className="rsvp-form">
            <h2 className="rsvp-form-title">{t("withPleasure")}</h2>
            <form onSubmit={submitRsvpForm}>
              {/* Will You Join */}
              <div className="rsvp-form-group">
                <label className="rsvp-form-label">{t("willYouJoin")}</label>
                <select
                  className="rsvp-form-select"
                  name="attending"
                  value={rsvpData.attending}
                  onChange={handleRsvpChange}
                  required
                >
                  <option value="">{t("pleaseChoose")}</option>
                  <option value="yes">{t("yesAnswer")}</option>
                  <option value="no">{t("noAnswer")}</option>
                </select>
              </div>

              {/* Bringing Guests */}
              {rsvpData.attending === "yes" && (
                <div className="rsvp-form-group">
                  <label className="rsvp-form-label">
                    {t("bringingGuests")}
                  </label>
                  <select
                    className="rsvp-form-select"
                    name="bringing_guests"
                    value={rsvpData.bringing_guests}
                    onChange={handleRsvpChange}
                    required
                  >
                    <option value="">{t("pleaseChoose")}</option>
                    <option value="yes">{t("yesBringGuests")}</option>
                    <option value="no">{t("noBringGuests")}</option>
                  </select>

                  {/* Guest names input */}
                  {rsvpData.bringing_guests === "yes" && (
                    <div className="guests-input-container visible">
                      <label className="rsvp-form-label">
                        {t("guestNames")}
                      </label>
                      <input
                        type="text"
                        className="rsvp-form-input"
                        name="guest_names"
                        value={rsvpData.guest_names}
                        onChange={handleRsvpChange}
                        placeholder={t("enterGuestNames")}
                        required
                      />
                    </div>
                  )}
                </div>
              )}

              {/* Song request */}
              {rsvpData.attending === "yes" && (
                <div className="rsvp-form-group">
                  <label className="rsvp-form-label">{t("songRequest")}</label>
                  <input
                    type="text"
                    className="rsvp-form-input"
                    name="song_request"
                    value={rsvpData.song_request}
                    onChange={handleRsvpChange}
                    placeholder={t("shareSong")}
                  />
                </div>
              )}

              <button type="submit" className="rsvp-submit-btn">
                {t("sendResponse")}
              </button>
            </form>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
