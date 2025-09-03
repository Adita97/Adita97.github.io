import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import RSVP from "./components/RSVP";
import Admin from "./components/Admin";
import AdminLogin from "./components/AdminLogin";
import ProtectedRoute from "./components/ProtectedRoute";
import "./styles/admin.css";
import "./styles/select.css";

export default function App() {
  const basename = import.meta.env.PROD ? '/feather-carnival-invite-frontend' : '';
  
  return (
    <BrowserRouter basename={basename}>
      <Routes>
        <Route path="/" element={<RSVP />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <Admin />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
