import React from "react";
import { Navigate } from "react-router-dom";
import { supabase } from "../lib/supabase";

export default function ProtectedRoute({ children }) {
  const [loading, setLoading] = React.useState(true);
  const [session, setSession] = React.useState(null);
  const [isAdmin, setIsAdmin] = React.useState(false);

  React.useEffect(() => {
    let mounted = true;
    let subscription = null;

    async function checkAdminForSession(s) {
      try {
        if (!mounted) return;
        setLoading(true);

        const currentSession =
          s ?? (await supabase.auth.getSession()).data?.session ?? null;
        if (!mounted) return;
        setSession(currentSession);

        if (currentSession?.user?.email) {
          const { data, error } = await supabase
            .from("admins")
            .select("id")
            .eq("email", currentSession.user.email)
            .single();

          if (!mounted) return;
          setIsAdmin(Boolean(data && !error));
        } else {
          setIsAdmin(false);
        }
      } catch (err) {
        console.error("[ProtectedRoute] check error", err);
        if (mounted) setIsAdmin(false);
      } finally {
        if (mounted) setLoading(false);
      }
    }

    // initial check
    checkAdminForSession();

    const authSub = supabase.auth.onAuthStateChange((_event, s) => {
      checkAdminForSession(s);
    });

    subscription = authSub?.data?.subscription ?? null;

    return () => {
      mounted = false;
      try {
        if (subscription && typeof subscription.unsubscribe === "function") {
          subscription.unsubscribe();
        }
      } catch (e) {
        // ignore
      }
    };
  }, []);

  if (loading) {
    return (
      <div className="admin-loading">
        <div className="loading-spinner">Loading...</div>
      </div>
    );
  }

  if (!session || !isAdmin) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
}
