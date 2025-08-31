// src/components/SuccessScreen.jsx
import React from "react";
import { motion } from "framer-motion";

export default function SuccessScreen({ t, rsvpData }) {
  return (
    <motion.div
      className="rsvp-form-container"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="rsvp-form">
        {rsvpData.confirmed === true ? (
          <>
            <h2 className="rsvp-form-title">{t("welcome")}</h2>

            {rsvpData.alreadyResponded ? (
              <div className="contact-info">
                <h3 className="contact-title">{t("alreadyConfirmed")}</h3>
                <p>{t("contactChanges")}</p>

                <div className="contact-details">
                  <div className="contact-item">
                    <span>📧</span>
                    <span>marius.adrian97@gmail.com</span>
                  </div>
                  <div className="contact-item">
                    <span>📱</span>
                    <span>+40 730 327 146</span>
                  </div>
                </div>

                <div className="menu-options">
                  <motion.div
                    className="menu-option"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => alert(t("menuNotReady"))}
                  >
                    <h3 className="menu-option-title">{t("restaurantMenu")}</h3>
                    <p className="menu-option-description">{t("viewMenu")}</p>
                  </motion.div>

                  <motion.div
                    className="menu-option"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() =>
                      window.open(
                        "https://maps.app.goo.gl/26SqD4Qux6zUrSaf8",
                        "_blank"
                      )
                    }
                  >
                    <h3 className="menu-option-title">{t("location")}</h3>
                    <p className="menu-option-description">
                      {t("findLocation")}
                    </p>
                  </motion.div>
                </div>
              </div>
            ) : (
              <>
                <p className="invitation-message">{t("thankYouAccept")}</p>
                <div className="menu-options">
                  <motion.div
                    className="menu-option"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => alert(t("menuNotReady"))}
                  >
                    <h3 className="menu-option-title">{t("restaurantMenu")}</h3>
                    <p className="menu-option-description">{t("viewMenu")}</p>
                  </motion.div>

                  <motion.div
                    className="menu-option"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() =>
                      window.open(
                        "https://maps.app.goo.gl/26SqD4Qux6zUrSaf8",
                        "_blank"
                      )
                    }
                  >
                    <h3 className="menu-option-title">{t("location")}</h3>
                    <p className="menu-option-description">
                      {t("findLocation")}
                    </p>
                  </motion.div>
                </div>
              </>
            )}
          </>
        ) : (
          <>
            <h2 className="rsvp-form-title">Thank You for Your Response</h2>
            <p className="invitation-message">{t("thankYouDecline")}</p>
            <p>{t("contactChanges")}</p>
            <div className="contact-details">
              <div className="contact-item">
                <span>📧</span>
                <a
                  className="email-contact"
                  href="mailto:marius.adrian97@gmail.com"
                >
                  marius.adrian97@gmail.com
                </a>
              </div>
              <div className="contact-item">
                <span>📱</span>
                <span>+40 730 327 146</span>
              </div>
            </div>
          </>
        )}
      </div>
    </motion.div>
  );
}
