// src/components/SuccessScreen.jsx
import React from "react";
import { motion } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";

export default function SuccessScreen({ t, rsvpData }) {
  const notify = () => toast("Here is your toast.");
  return (
    <motion.div
      className="rsvp-form-container"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* ✅ Toast container inside this component */}
      <Toaster
        position="bottom-center"
        toastOptions={{
          duration: 5000, // how long it shows
          style: {
            position: "sticky",
            top: 0,
            maxWidth: "90vw", // fit nicely on small screens
            width: "auto",
            minWidth: "300px", // not too tiny
            margin: "0 auto 20px", // 20px from bottom
            padding: "16px 24px",
            background: "linear-gradient(135deg, #fffaf0, #fff5f8)", // soft wedding colors
            color: "#5a3e36",
            fontFamily: "'Playfair Display', serif",
            fontSize: "16px",
            fontWeight: 500,
            letterSpacing: "0.5px",
            borderRadius: "20px",
            border: "2px solid rgba(218, 165, 32, 0.3)", // subtle gold border
            boxShadow: "0 8px 20px rgba(218, 165, 32, 0.15)",
            textAlign: "center",
            backdropFilter: "blur(4px)",
          },
          success: {
            style: {
              background: "linear-gradient(135deg, #fff1e6, #ffe6f0)",
              color: "#a76f46",
              border: "2px solid rgba(255, 215, 0, 0.3)",
            },
            iconTheme: {
              primary: "#f7c948",
              secondary: "#fffaf0",
            },
          },
          error: {
            style: {
              background: "linear-gradient(135deg, #fff0f0, #ffe6eb)",
              color: "#d85c5c",
              border: "2px solid rgba(255, 99, 71, 0.3)",
            },
            iconTheme: {
              primary: "#e74c3c",
              secondary: "#fff0f0",
            },
          },
        }}
      />
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
                    onClick={() => toast(t("menuNotReady"))}
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
                    onClick={() => toast(t("menuNotReady"))}
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
            <h2 className="rsvp-form-title">{t("thankYou")}</h2>
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
