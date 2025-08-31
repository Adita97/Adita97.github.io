import React, { useState, useEffect } from "react";

// Simulated language context for demonstration
const useLanguage = () => {
  const translations = {
    "invitation.togetherWithFamilies": "Împreună cu familiile noastre",
    "invitation.honorText": "AVEM ONOAREA DE A VĂ INVITA",
    "invitation.presenceText": "LA CELEBRAREA IUBIRII DINTRE",
    "invitation.and": "&",
    "invitation.date": "Sâmbătă, 14 Iunie 2025",
    "invitation.time": "Ora 16:00",
    "invitation.reception": "Recepție și dans până în zori",
    "invitation.confirmButton": "Confirmă Prezența",
    "invitation.message":
      "Cu inimi pline de bucurie, vă invităm să fiți alături de noi în cea mai importantă zi din viața noastră, când două suflete devin unul singur.",
  };

  return { t: (key, defaultValue) => translations[key] || defaultValue };
};

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
      <svg viewBox="0 0 200 40" className="flourish-svg">
        <path
          d="M0,20 Q50,5 100,20 T200,20"
          stroke="currentColor"
          strokeWidth="1"
          fill="none"
          opacity="0.3"
        />
        <path
          d="M50,25 Q100,10 150,25"
          stroke="currentColor"
          strokeWidth="0.5"
          fill="none"
          opacity="0.2"
        />
      </svg>
    </div>

    {/* Together text with elegant styling */}
    <div className="together-wrapper">
      <span className="decorative-line left"></span>
      <h3 className="together-text">
        {t("invitation.togetherWithFamilies", "Împreună cu familiile noastre")}
      </h3>
      <span className="decorative-line right"></span>
    </div>

    <div className="invitation-main">
      {/* Honor text with letter spacing */}
      <p className="honor-text animate-fade-in">
        {t("invitation.honorText", "AVEM ONOAREA DE A VĂ INVITA")}
      </p>

      {/* Presence text with romantic touch */}
      <p className="presence-text animate-fade-in">
        {t("invitation.presenceText", "LA CELEBRAREA IUBIRII DINTRE")}
      </p>

      {/* Couple names with elegant ampersand */}
      <div className="couple-names-wrapper">
        <h1 className="couple-names">
          <span className="bride-name animate-slide-right">{bride}</span>
          <span className="ampersand-wrapper">
            <span className="ampersand-decoration"></span>
            <span className="ampersand">{t("invitation.and", "&")}</span>
            <span className="ampersand-decoration"></span>
          </span>
          <span className="groom-name animate-slide-left">{groom}</span>
        </h1>
      </div>

      {/* Date with calendar icon */}
      <div className="date-wrapper">
        <span className="date-icon">♡</span>
        <p className="date-text">{t("invitation.date")}</p>
        <span className="date-icon">♡</span>
      </div>

      {/* Event details */}
      <div className="details-section">
        <div className="time-wrapper">
          <svg
            className="icon-clock"
            width="20"
            height="20"
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

      {/* Reception text with decorative elements */}
      <div className="reception-wrapper">
        <span className="reception-decoration">✦</span>
        <p className="reception-text">
          {t("invitation.reception", "Recepție și dans până în zori")}
        </p>
        <span className="reception-decoration">✦</span>
      </div>
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
        <span className="btn-text">
          {t("invitation.confirmButton", "Confirmă Prezența")}
        </span>
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

export default function LuxuryInvitation({
  guestName,
  onConfirm,
  message,
  bride = "ADELINA",
  groom = "MARIUS",
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
    <div className={`luxury-invitation-wrapper ${isVisible ? "visible" : ""}`}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;600;700&family=Montserrat:wght@300;400;500;600&family=Dancing+Script:wght@400;700&family=Cinzel:wght@400;600&display=swap');

        .luxury-invitation-wrapper {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 40px 20px;
          background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
          position: relative;
          overflow: hidden;
          opacity: 0;
          transition: opacity 1s ease;
        }

        .luxury-invitation-wrapper.visible {
          opacity: 1;
        }

        .luxury-invitation-wrapper::before {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: radial-gradient(circle, rgba(212, 175, 55, 0.03) 1px, transparent 1px);
          background-size: 50px 50px;
          animation: shimmer 20s linear infinite;
        }

        @keyframes shimmer {
          0% { transform: translate(0, 0); }
          100% { transform: translate(50px, 50px); }
        }

        .invitation-card {
          max-width: 800px;
          width: 100%;
          background: linear-gradient(135deg, 
            rgba(255, 255, 255, 0.95) 0%, 
            rgba(252, 250, 245, 0.98) 50%, 
            rgba(255, 251, 241, 0.95) 100%);
          border-radius: 20px;
          padding: 60px 40px;
          box-shadow: 
            0 30px 60px rgba(0, 0, 0, 0.3),
            0 0 100px rgba(212, 175, 55, 0.1),
            inset 0 0 120px rgba(212, 175, 55, 0.05);
          position: relative;
          overflow: visible;
          transform: translateY(0);
          transition: transform 0.3s ease;
        }

        .invitation-card:hover {
          transform: translateY(-5px);
        }

        /* Feather decorations */
        .feather-top, .feather-bottom {
          position: absolute;
          width: 180px;
          height: 180px;
          opacity: 0.15;
          z-index: 1;
          pointer-events: none;
        }

        .feather-top {
          top: -30px;
          left: -30px;
          background: linear-gradient(135deg, #d4af37 0%, transparent 70%);
          mask: url("data:image/svg+xml,%3Csvg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20,50 Q30,20 50,30 T80,50 Q70,80 50,70 T20,50' fill='white'/%3E%3C/svg%3E") no-repeat center;
          mask-size: contain;
          transform: rotate(-15deg);
        }

        .feather-bottom {
          bottom: -30px;
          right: -30px;
          background: linear-gradient(135deg, transparent 30%, #d4af37 100%);
          mask: url("data:image/svg+xml,%3Csvg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20,50 Q30,20 50,30 T80,50 Q70,80 50,70 T20,50' fill='white'/%3E%3C/svg%3E") no-repeat center;
          mask-size: contain;
          transform: rotate(165deg);
        }

        .invitation-content {
          position: relative;
          z-index: 2;
          text-align: center;
          color: #2c2c2c;
        }

        /* Header flourish */
        .header-flourish {
          margin-bottom: 30px;
          opacity: 0;
          animation: fadeIn 1s ease 0.2s forwards;
        }

        .flourish-svg {
          width: 200px;
          height: 40px;
          color: #d4af37;
        }

        /* Together text section */
        .together-wrapper {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 20px;
          margin-bottom: 40px;
          opacity: 0;
          animation: fadeIn 1s ease 0.4s forwards;
        }

        .decorative-line {
          height: 1px;
          width: 60px;
          background: linear-gradient(90deg, transparent, #d4af37, transparent);
        }

        .together-text {
          font-family: 'Dancing Script', cursive;
          font-size: 28px;
          color: #d4af37;
          font-weight: 400;
          margin: 0;
          text-shadow: 0 2px 4px rgba(212, 175, 55, 0.2);
        }

        /* Main content animations */
        .animate-fade-in {
          opacity: 0;
          animation: fadeIn 1s ease 0.6s forwards;
        }

        @keyframes fadeIn {
          to { opacity: 1; }
        }

        .animate-slide-right {
          opacity: 0;
          transform: translateX(-30px);
          animation: slideRight 1s ease 0.8s forwards;
        }

        .animate-slide-left {
          opacity: 0;
          transform: translateX(30px);
          animation: slideLeft 1s ease 0.8s forwards;
        }

        @keyframes slideRight {
          to { opacity: 1; transform: translateX(0); }
        }

        @keyframes slideLeft {
          to { opacity: 1; transform: translateX(0); }
        }

        /* Honor and presence text */
        .honor-text, .presence-text {
          font-family: 'Montserrat', sans-serif;
          font-weight: 300;
          letter-spacing: 4px;
          font-size: 12px;
          color: #666;
          margin: 8px 0;
        }

        .presence-text {
          margin-bottom: 30px;
          font-size: 14px;
          color: #d4af37;
          font-weight: 400;
        }

        /* Couple names */
        .couple-names-wrapper {
          margin: 40px 0;
        }

        .couple-names {
          margin: 0;
          line-height: 1.4;
        }

        .bride-name, .groom-name {
          display: block;
          font-family: 'Cormorant Garamond', serif;
          font-size: 52px;
          font-weight: 300;
          color: #2c2c2c;
          letter-spacing: 2px;
        }

        .ampersand-wrapper {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 30px;
          margin: 20px 0;
          opacity: 0;
          animation: fadeIn 1s ease 1s forwards;
        }

        .ampersand {
          font-family: 'Dancing Script', cursive;
          font-size: 36px;
          color: #d4af37;
        }

        .ampersand-decoration {
          width: 40px;
          height: 1px;
          background: linear-gradient(90deg, transparent, #d4af37, transparent);
        }

        /* Date section */
        .date-wrapper {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 15px;
          margin: 30px 0;
          opacity: 0;
          animation: fadeIn 1s ease 1.2s forwards;
        }

        .date-text {
          font-family: 'Cormorant Garamond', serif;
          font-size: 24px;
          color: #666;
          margin: 0;
          font-style: italic;
        }

        .date-icon {
          color: #d4af37;
          font-size: 14px;
          animation: pulse 2s ease infinite;
        }

        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 0.6; }
          50% { transform: scale(1.2); opacity: 1; }
        }

        /* Details section */
        .details-section {
          margin: 40px 0;
          opacity: 0;
          animation: fadeIn 1s ease 1.4s forwards;
        }

        .time-wrapper, .venue-wrapper {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          margin: 15px 0;
          transition: transform 0.3s ease;
        }

        .venue-wrapper {
          text-decoration: none;
          color: inherit;
        }

        .venue-wrapper:hover {
          transform: scale(1.05);
        }

        .icon-clock, .icon-location {
          color: #d4af37;
        }

        .time, .venue {
          font-family: 'Montserrat', sans-serif;
          font-size: 16px;
          color: #666;
          margin: 0;
          font-weight: 400;
        }

        /* Message section */
        .message-wrapper {
          position: relative;
          margin: 40px 0;
          padding: 0 40px;
          opacity: 0;
          animation: fadeIn 1s ease 1.6s forwards;
        }

        .quote-mark {
          position: absolute;
          font-family: 'Cormorant Garamond', serif;
          font-size: 60px;
          color: #d4af37;
          opacity: 0.2;
          line-height: 1;
        }

        .quote-mark.left {
          top: -20px;
          left: 0;
        }

        .quote-mark.right {
          bottom: -40px;
          right: 0;
        }

        .invitation-message {
          font-family: 'Cormorant Garamond', serif;
          font-size: 18px;
          line-height: 1.8;
          color: #666;
          font-style: italic;
          margin: 0;
        }

        /* Reception section */
        .reception-wrapper {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 15px;
          margin: 40px 0;
          opacity: 0;
          animation: fadeIn 1s ease 1.8s forwards;
        }

        .reception-text {
          font-family: 'Dancing Script', cursive;
          font-size: 22px;
          color: #d4af37;
          margin: 0;
        }

        .reception-decoration {
          color: #d4af37;
          font-size: 12px;
        }

        /* RSVP section */
        .rsvp-section {
          margin-top: 50px;
          opacity: 0;
          animation: fadeIn 1s ease 2s forwards;
        }

        .rsvp-divider {
          display: flex;
          justify-content: center;
          margin-bottom: 30px;
        }

        .divider-ornament {
          width: 80px;
          height: 1px;
          background: linear-gradient(90deg, transparent, #d4af37, transparent);
        }

        .guest-name {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          margin-bottom: 25px;
        }

        .guest-prefix {
          font-family: 'Montserrat', sans-serif;
          font-size: 14px;
          color: #999;
          font-style: italic;
        }

        .guest-name-text {
          font-family: 'Cormorant Garamond', serif;
          font-size: 26px;
          color: #2c2c2c;
          font-weight: 600;
        }

        .confirm-btn {
          background: linear-gradient(135deg, #d4af37 0%, #f4e4bc 50%, #d4af37 100%);
          background-size: 200% 200%;
          color: white;
          border: none;
          padding: 14px 40px;
          font-family: 'Montserrat', sans-serif;
          font-size: 14px;
          font-weight: 500;
          letter-spacing: 2px;
          text-transform: uppercase;
          cursor: pointer;
          border-radius: 30px;
          position: relative;
          overflow: hidden;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(212, 175, 55, 0.3);
          display: flex;
          align-items: center;
          gap: 10px;
          margin: 0 auto;
        }

        .confirm-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(212, 175, 55, 0.4);
          background-position: 100% 100%;
        }

        .confirm-btn::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
          transition: left 0.5s ease;
        }

        .confirm-btn:hover::before {
          left: 100%;
        }

        .btn-decoration {
          font-size: 16px;
          animation: pulse 2s ease infinite;
        }

        /* Footer flourish */
        .footer-flourish {
          margin-top: 40px;
          opacity: 0;
          animation: fadeIn 1s ease 2.2s forwards;
        }

        /* Floating hearts animation */
        .floating-hearts {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          overflow: hidden;
        }

        .heart {
          position: absolute;
          color: rgba(212, 175, 55, 0.1);
          animation: floatUp 15s linear infinite;
        }

        .heart:nth-child(1) { left: 10%; }
        .heart:nth-child(2) { left: 25%; }
        .heart:nth-child(3) { left: 40%; }
        .heart:nth-child(4) { left: 60%; }
        .heart:nth-child(5) { left: 75%; }
        .heart:nth-child(6) { left: 90%; }

        @keyframes floatUp {
          0% {
            transform: translateY(100vh) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 0.1;
          }
          90% {
            opacity: 0.1;
          }
          100% {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
          }
        }

        /* Responsive design */
        @media (max-width: 600px) {
          .invitation-card {
            padding: 40px 25px;
          }

          .bride-name, .groom-name {
            font-size: 38px;
          }

          .together-text {
            font-size: 22px;
          }

          .message-wrapper {
            padding: 0 20px;
          }

          .decorative-line {
            width: 40px;
          }
        }
      `}</style>

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
    </div>
  );
}
