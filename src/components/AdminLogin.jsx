import React, { useState } from "react";
import { supabase } from "../lib/supabase";
import { Navigate, useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [session, setSession] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [checking, setChecking] = useState(true);
  const navigate = useNavigate();

  React.useEffect(() => {
    let mounted = true;
    let subscription = null;

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!mounted) return;
      console.debug("[AdminLogin] initial session", session);
      setSession(session);
      if (session?.user?.email) {
        checkIfAdmin(session.user.email).finally(() => {
          if (mounted) setChecking(false);
        });
      } else {
        if (mounted) setChecking(false);
      }
    });

    const authSub = supabase.auth.onAuthStateChange((_event, session) => {
      if (!mounted) return;
      console.debug("[AdminLogin] auth state change", _event, session);
      setSession(session);
      setChecking(true);
      if (session?.user?.email) {
        checkIfAdmin(session.user.email).finally(() => {
          if (mounted) setChecking(false);
        });
      } else {
        setIsAdmin(false);
        if (mounted) setChecking(false);
      }
    });

    subscription = authSub?.data?.subscription ?? null;

    return () => {
      mounted = false;
      try {
        if (subscription && typeof subscription.unsubscribe === "function") {
          subscription.unsubscribe();
        }
      } catch (e) {
        console.warn("[AdminLogin] unsubscribe failed", e);
      }
    };
  }, []);

  async function checkIfAdmin(email) {
    try {
      const { data, error } = await supabase
        .from("admins")
        .select("id")
        .eq("email", email)
        .single();

      console.debug("[AdminLogin] admin check", email, { data, error });

      if (data && !error) {
        setIsAdmin(true);
        return true;
      } else {
        setIsAdmin(false);
        return false;
      }
    } catch (err) {
      console.error("[AdminLogin] admin check error", err);
      setIsAdmin(false);
      return false;
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const email = e.target.email.value;
    const password = e.target.password.value;

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    // update local session
    try {
      const { data: sessionData } = await supabase.auth.getSession();
      setSession(sessionData.session ?? null);
    } catch (e) {
      console.warn("[AdminLogin] getSession failed after signIn", e);
    }

    if (data?.user) {
      const isAdminNow = await checkIfAdmin(data.user.email);

      if (!isAdminNow) {
        setError("You are not authorized to access this area");
        await supabase.auth.signOut();
        setLoading(false);
        return;
      }

      // navigate immediately when admin confirmed
      setLoading(false);
      navigate("/admin", { replace: true });
      return;
    }

    setLoading(false);
  }

  // While we are checking the existing session/admin status, show a loading state
  if (checking) {
    return (
      <div className="invite-root">
        <div className="overlay" />
        <div className="card admin-login-card">
          <div className="admin-loading">
            <div className="loading-spinner">Checking session...</div>
          </div>
        </div>
      </div>
    );
  }

  // If there's an active session and admin status known, redirect to admin
  if (session && isAdmin) {
    return <Navigate to="/admin" replace />;
  }

  // Otherwise show the login form (do not auto-redirect logged-in non-admins)
  return (
    <div className="invite-root">
      <div className="overlay" />

      <div className="card admin-login-card">
        <h1 className="title">Admin Login</h1>

        <form onSubmit={handleSubmit} className="admin-login-form">
          {error && <div className="error-message">{error}</div>}

          <div className="form-row">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              required
              placeholder="Enter your email"
            />
          </div>

          <div className="form-row">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              required
              placeholder="Enter your password"
            />
          </div>

          <button type="submit" className="gold-btn" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}
