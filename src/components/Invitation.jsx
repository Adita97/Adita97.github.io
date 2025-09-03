import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";
import "../styles/invitation.css";

const HeartAnimation = () => (
  <div className="floating-hearts">
    {[...Array(6)].map((_, i) => (
      <div key={i} className="heart" style={{ animationDelay: `${i * 0.5}s` }}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
      </div>
    ))}
  </div>
);

const InvitationContent = ({
  guestName,
  onConfirm,
  message,
  bride,
  groom,
  venueLink,
  venueName,
  t,
}) => (
  <>
    {/* Decorative header flourish */}
    <div className="header-flourish">
      <svg viewBox="0 0 300 50" className="flourish-svg">
        <path
          d="M0,25 Q75,8 150,25 T300,25"
          stroke="currentColor"
          strokeWidth="1.5"
          fill="none"
          opacity="0.4"
        />
        <path
          d="M50,30 Q150,12 250,30"
          stroke="currentColor"
          strokeWidth="0.8"
          fill="none"
          opacity="0.3"
        />
        <circle cx="150" cy="25" r="3" fill="currentColor" opacity="0.6" />
        <path
          d="M140,25 L160,25 M150,15 L150,35"
          stroke="currentColor"
          strokeWidth="1"
          opacity="0.5"
        />
      </svg>
    </div>

    {/* Elegant invitation title */}
    <div className="invitation-title">
      <h2 className="title-text">WEDDING INVITATION</h2>
      <div className="title-underline"></div>
    </div>

    {/* Together text with elegant styling */}
    <div className="together-wrapper">
      <span className="decorative-line left"></span>
      <h3 className="together-text">{t("invitation.togetherWithFamilies")}</h3>
      <span className="decorative-line right"></span>
    </div>

    <div className="invitation-main">
      {/* Honor text with letter spacing */}
      <p className="honor-text">{t("invitation.honorText")}</p>

      {/* Presence text with romantic touch */}
      <p className="presence-text">{t("invitation.presenceText")}</p>

      {/* Couple names with elegant ampersand */}
      <div className="couple-names-wrapper">
        <h1 className="couple-names">
          <span className="bride-name">{bride}</span>
          <div className="ampersand-wrapper">
            <span className="ampersand-decoration left-decoration">𓆩❤︎𓆪</span>
            <span className="ampersand">{t("invitation.and")}</span>
            <span className="ampersand-decoration right-decoration">𓆩❤︎𓆪</span>
          </div>
          <span className="groom-name">{groom}</span>
        </h1>
      </div>

      {/* Date with elegant calendar styling */}
      <div className="date-wrapper">
        <div className="date-ornament">✦</div>
        <div className="date-content">
          <p className="date-text">{t("invitation.date")}</p>
        </div>
        <div className="date-ornament">✦</div>
      </div>

      {/* Event details with enhanced styling */}
      <div className="details-section">
        <div className="time-wrapper">
          <svg
            className="icon-clock"
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
          >
            <circle cx="12" cy="12" r="10" strokeWidth="1.5" />
            <path d="M12 6v6l4 2" strokeWidth="1.5" />
          </svg>
          <p className="time">{t("invitation.time")}</p>
        </div>

        <a
          href={venueLink}
          target="_blank"
          rel="noopener noreferrer"
          className="venue-wrapper"
        >
          <svg
            className="icon-location"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
          >
            <path
              d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"
              strokeWidth="1.5"
            />
            <circle cx="12" cy="9" r="2.5" strokeWidth="1.5" />
          </svg>
          <p className="venue">{venueName}</p>
        </a>
      </div>

      {/* Personal message with quotation marks */}
      <div className="message-wrapper">
        <span className="quote-mark left">"</span>
        <p className="invitation-message">{message}</p>
        <span className="quote-mark right">"</span>
      </div>
      <div className="ps-wrapper">
        <p className="honor-text animate-fade-in">{t("invitation.psText")}</p>
      </div>

      {/* Reception text with decorative elements */}
      {/* <div className="reception-wrapper">
        <span className="reception-decoration">✦</span>
        <p className="reception-text">{t("invitation.reception")}</p>
        <span className="reception-decoration">✦</span>
      </div> */}
    </div>

    {/* RSVP section with enhanced styling */}
    <div className="rsvp-section">
      <div className="rsvp-divider">
        <span className="divider-ornament"></span>
      </div>

      {guestName && (
        <p className="guest-name">
          <span className="guest-prefix">Pentru</span>
          <span className="guest-name-text">{guestName}</span>
        </p>
      )}

      <button className="confirm-btn" onClick={onConfirm}>
        <span className="btn-text">{t("invitation.confirmButton")}</span>
        <span className="btn-decoration">♡</span>
      </button>
    </div>

    {/* Footer flourish */}
    <div className="footer-flourish">
      <svg viewBox="0 0 200 30" className="flourish-svg">
        <path
          d="M20,15 Q100,5 180,15"
          stroke="currentColor"
          strokeWidth="0.5"
          fill="none"
          opacity="0.2"
        />
      </svg>
    </div>
  </>
);

export default function Invitation({
  guestName,
  onConfirm,
  message = null,
  bride = "Adelina",
  groom = "Marius",
  venueLink = "https://maps.app.goo.gl/26SqD4Qux6zUrSaf8",
  venueName = "Imperial Palace",
}) {
  const { t } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const displayMessage = message || t("invitation.message");

  return (
    <motion.div
      className={`luxury-invitation-wrapper ${isVisible ? "visible" : ""}`}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.8 }}
    >
      <div className="invitation-card">
        <div className="feather-top" aria-hidden="true" />
        <HeartAnimation />

        <div className="invitation-content">
          <InvitationContent
            guestName={guestName}
            onConfirm={onConfirm}
            message={displayMessage}
            bride={bride}
            groom={groom}
            venueLink={venueLink}
            venueName={venueName}
            t={t}
          />
        </div>

        <div className="feather-bottom" aria-hidden="true" />
      </div>
    </motion.div>
  );
}
