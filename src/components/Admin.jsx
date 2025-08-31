import React, { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";

export default function Admin() {
  const [session, setSession] = useState(null);
  const [guests, setGuests] = useState([]);
  const [newGuest, setNewGuest] = useState({
    first_name: "",
    last_name: "",
    title: "",
    message: "",
  });

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (session) {
      fetchGuests();
    }
  }, [session]);

  async function fetchGuests() {
    const { data, error } = await supabase
      .from("guests")
      .select("*")
      .order("last_name, first_name");

    if (error) {
      console.error("Error fetching guests:", error);
      return;
    }
    setGuests(data);
  }

  async function handleAddGuest(e) {
    e.preventDefault();
    const { error } = await supabase.from("guests").insert([newGuest]);

    if (error) {
      console.error("Error adding guest:", error);
      return;
    }

    setNewGuest({
      first_name: "",
      last_name: "",
      title: "",
      message: "",
    });
    fetchGuests();
  }

  async function handleDeleteGuest(id) {
    const { error } = await supabase.from("guests").delete().eq("id", id);

    if (error) {
      console.error("Error deleting guest:", error);
      return;
    }

    fetchGuests();
  }

  if (!session) {
    return (
      <div className="admin-auth">
        <Auth
          supabaseClient={supabase}
          appearance={{ theme: ThemeSupa }}
          providers={[]}
          theme="dark"
        />
      </div>
    );
  }

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h1>Guest Management</h1>
        <button
          onClick={() => supabase.auth.signOut()}
          className="sign-out-btn"
        >
          Sign Out
        </button>
      </div>

      <form onSubmit={handleAddGuest} className="add-guest-form">
        <input
          type="text"
          placeholder="First Name"
          value={newGuest.first_name}
          onChange={(e) =>
            setNewGuest({ ...newGuest, first_name: e.target.value })
          }
          required
        />
        <input
          type="text"
          placeholder="Last Name"
          value={newGuest.last_name}
          onChange={(e) =>
            setNewGuest({ ...newGuest, last_name: e.target.value })
          }
          required
        />
        <input
          type="text"
          placeholder="Title (Optional)"
          value={newGuest.title}
          onChange={(e) => setNewGuest({ ...newGuest, title: e.target.value })}
        />
        <textarea
          placeholder="Custom Message (Optional)"
          value={newGuest.message}
          onChange={(e) =>
            setNewGuest({ ...newGuest, message: e.target.value })
          }
        />
        <button type="submit" className="gold-btn">
          Add Guest
        </button>
      </form>

      <div className="guest-list">
        <h2>Guest List</h2>
        <div className="table-container">
          <table className="guests-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Title</th>
                <th>Message</th>
                <th>RSVP Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {guests.map((guest) => (
                <tr key={guest.id}>
                  <td>
                    {guest.first_name} {guest.last_name}
                  </td>
                  <td>{guest.title || "-"}</td>
                  <td>{guest.message || "-"}</td>
                  <td>
                    <span
                      className={`status-badge ${
                        guest.confirmed ? "confirmed" : "pending"
                      }`}
                    >
                      {guest.confirmed ? "Confirmed" : "Pending"}
                    </span>
                  </td>
                  <td>
                    <button
                      onClick={() => handleDeleteGuest(guest.id)}
                      className="delete-btn"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {guests.length === 0 && (
                <tr>
                  <td colSpan="5" style={{ textAlign: "center" }}>
                    No guests added yet
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
