import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "../lib/supabase";

import Invitation from "./Invitation";
import LanguageSelector from "./LanguageSelector";
import { useLanguage } from "../context/LanguageContext";
import GuestSearch from "./GuestSearch";
import SuccessScreen from "./SuccessScreen";
import InvitationFlow from "./InvitationFlow";

import "../styles/dropdown.css";
import "../styles/contact.css";
import "../styles/language-selector.css";
import "../styles/cross-platform.css";

export default function RSVP() {
  const { t } = useLanguage();
  const inputRef = useRef(null);

  /* ---------------- STATE ---------------- */
  // UI state
  const [pageVisible, setPageVisible] = useState(false); // controls page fade-in
  const [showOverlay, setShowOverlay] = useState(true);
  const [overlayFading, setOverlayFading] = useState(false);
  const [showLanguageSelector, setShowLanguageSelector] = useState(true);
  const [showInvitation, setShowInvitation] = useState(false);
  const [showRsvpForm, setShowRsvpForm] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Guest search
  const [lastName, setLastName] = useState("");
  const [firstOptions, setFirstOptions] = useState([]);
  const [selectedFirst, setSelectedFirst] = useState("");
  const [selectedGuest, setSelectedGuest] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [activeSuggestion, setActiveSuggestion] = useState(-1);
  const [loading, setLoading] = useState(false);

  // RSVP form data
  const [rsvpData, setRsvpData] = useState({
    attending: "",
    bringing_guests: "",
    guest_names: "",
    song_request: "",
    confirmed: false,
    alreadyResponded: false,
  });

  /* ---------------- EFFECTS ---------------- */
  // Overlay animation (play GIF, fade, reveal)
  useEffect(() => {
    // overlay timing
    const PLAY_MS = 1500; // total overlay play time
    const FADE_MS = 400; // fade out duration
    const SHOW_PAGE_MS = 700; // when page starts showing

    let fadeTimer, hideTimer, showPageTimer;

    // show page halfway through overlay
    showPageTimer = setTimeout(() => {
      setPageVisible(true);
    }, SHOW_PAGE_MS);

    // start fade after overlay play time
    fadeTimer = setTimeout(() => {
      setOverlayFading(true);

      hideTimer = setTimeout(() => {
        setShowOverlay(false);
        setOverlayFading(false);
      }, FADE_MS);
    }, PLAY_MS);

    return () => {
      clearTimeout(showPageTimer);
      clearTimeout(fadeTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  // Reveal scaling effect immediately
  useEffect(() => {
    document.querySelector(".invite-root")?.classList.add("revealed");
  }, []);

  // Search guests with debounce
  useEffect(() => {
    const timeoutId = setTimeout(async () => {
      if (lastName.length < 4) {
        setFirstOptions([]);
        setSuggestions([]);
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        // Last names
        const { data: lastNames } = await supabase
          .from("guests")
          .select("last_name")
          .ilike("last_name", `${lastName}%`)
          .order("last_name");

        if (lastNames) {
          const uniqueLastNames = Array.from(
            new Set(lastNames.map((g) => g.last_name))
          ).map((name) => ({ last_name: name }));

          setSuggestions(uniqueLastNames);

          if (uniqueLastNames.length === 1) {
            setLastName(uniqueLastNames[0].last_name);
            setSuggestions([]);
          }
        }

        // First names
        const { data } = await supabase
          .from("guests")
          .select("id, first_name, message, last_name")
          .ilike("last_name", `${lastName}%`)
          .order("last_name, first_name");

        setFirstOptions(data || []);
      } catch (err) {
        console.error("Search error:", err);
        setFirstOptions([]);
        setSuggestions([]);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [lastName]);

  /* ---------------- HANDLERS ---------------- */
  const handleKeyDown = (e) => {
    if (!suggestions.length) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setActiveSuggestion((prev) =>
          prev < suggestions.length - 1 ? prev + 1 : prev
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setActiveSuggestion((prev) => (prev > 0 ? prev - 1 : 0));
        break;
      case "Enter":
        if (activeSuggestion >= 0) {
          e.preventDefault();
          setLastName(suggestions[activeSuggestion].last_name);
          setSuggestions([]);
          setActiveSuggestion(-1);
        }
        break;
      case "Escape":
        setSuggestions([]);
        setActiveSuggestion(-1);
        break;
    }
  };

  const handleRsvpChange = (e) => {
    const { name, value } = e.target;
    setRsvpData((prev) => ({ ...prev, [name]: value }));
  };

  const submit = async () => {
    if (!selectedFirst) return alert(t("pleaseSelectFirstName"));

    const guest = firstOptions.find((g) => g.id === selectedFirst);
    if (!guest) return alert(t("pleaseSelectValidGuest"));

    const { data, error } = await supabase
      .from("guests")
      .select("confirmed, bringing_guests, guest_names, song_request")
      .eq("id", guest.id)
      .single();

    if (error) return console.error("Error checking RSVP status:", error);

    if (data.confirmed !== null) {
      setRsvpData({
        attending: data.confirmed ? "yes" : "no",
        bringing_guests: data.bringing_guests ? "yes" : "no",
        guest_names: data.guest_names || "",
        song_request: data.song_request || "",
        confirmed: data.confirmed,
        alreadyResponded: true,
      });
      setShowRsvpForm(false);
      setShowInvitation(false);
      setShowSuccess(true);
      return;
    }

    setShowRsvpForm(true);
  };

  const submitRsvpForm = async (e) => {
    e.preventDefault();
    const guest = firstOptions.find((g) => g.id === selectedFirst);
    if (!guest) return;

    const isAttending = rsvpData.attending === "Yes, I can't wait";

    const { error } = await supabase
      .from("guests")
      .update({
        confirmed: isAttending,
        bringing_guests:
          rsvpData.bringing_guests === "Yes, the more the merrier!",
        guest_names: rsvpData.guest_names,
        song_request: rsvpData.song_request,
      })
      .eq("id", guest.id);

    if (error) return alert("Failed to confirm RSVP");
    setRsvpData((prev) => ({
      ...prev,
      confirmed: isAttending,
      alreadyResponded: true,
    }));

    setShowRsvpForm(false);
    setShowInvitation(false);
    setShowSuccess(true);
  };

  /* ---------------- JSX ---------------- */
  return (
    <>
      {/* Overlay always shown first */}
      {showOverlay && (
        <div
          className={`envelope-overlay ${overlayFading ? "fade-out" : ""}`}
          onClick={() => {
            setOverlayFading(true);
            setTimeout(() => {
              setShowOverlay(false);
              setOverlayFading(false);
              setPageVisible(true);
            }, 200);
          }}
          role="button"
          aria-label="Deschide invitația"
        >
          <img
            src="/assets/envelope-overlay.gif"
            alt="Envelope opening"
            className="envelope-gif"
          />
        </div>
      )}

      {/* Page content (hidden until pageVisible = true) */}
      <motion.div
        className="invite-root"
        initial={{ opacity: 0 }}
        animate={{ opacity: pageVisible ? 1 : 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        style={{ visibility: pageVisible ? "visible" : "hidden" }}
      >
        {/* Background */}
        <video className="bg-video" autoPlay muted loop playsInline>
          <source src="/assets/bride-groom.mp4" type="video/mp4" />
        </video>
        <div className="overlay" />

        {/* Your AnimatePresence flow remains unchanged */}
        <AnimatePresence mode="wait">
          {showLanguageSelector ? (
            <LanguageSelector
              onLanguageSelected={() => setShowLanguageSelector(false)}
            />
          ) : showSuccess ? (
            /* ✅ RSVP Success UI */
            <SuccessScreen t={t} rsvpData={rsvpData} />
          ) : !showInvitation ? (
            /* ✅ Guest Search */
            <GuestSearch
              t={t}
              lastName={lastName}
              setLastName={setLastName}
              inputRef={inputRef}
              loading={loading}
              suggestions={suggestions}
              activeSuggestion={activeSuggestion}
              handleKeyDown={handleKeyDown}
              setSuggestions={setSuggestions}
              setActiveSuggestion={setActiveSuggestion}
              firstOptions={firstOptions}
              selectedFirst={selectedFirst}
              setSelectedFirst={setSelectedFirst}
              setSelectedGuest={setSelectedGuest}
              setShowInvitation={setShowInvitation}
            />
          ) : (
            /* ✅ Invitation / RSVP form */
            <InvitationFlow
              selectedGuest={selectedGuest}
              lastName={lastName}
              submit={submit}
              message={selectedGuest?.message}
              showRsvpForm={showRsvpForm}
              submitRsvpForm={submitRsvpForm}
              rsvpData={rsvpData}
              handleRsvpChange={handleRsvpChange}
              t={t}
            />
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
}
