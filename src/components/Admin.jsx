import React, { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import "../styles/admin.css";

export default function Admin() {
  const [session, setSession] = useState(null);
  const [guests, setGuests] = useState([]);
  const [filteredGuests, setFilteredGuests] = useState([]);
  const [newGuest, setNewGuest] = useState({
    first_name: "",
    last_name: "",
    title: "",
    message: "",
  });
  const [editingGuest, setEditingGuest] = useState(null);
  const [filters, setFilters] = useState({
    status: "all", // all, confirmed, declined, pending
    hasSong: "all", // all, yes, no
    hasAdditionalGuests: "all", // all, yes, no
  });
  const [stats, setStats] = useState({
    total: 0,
    confirmed: 0,
    declined: 0,
    pending: 0,
    withSongs: 0,
    withAdditionalGuests: 0,
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

  useEffect(() => {
    applyFilters();
    calculateStats();
  }, [guests, filters]);

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

  async function handleUpdateGuest(guestId, updates) {
    const { error } = await supabase
      .from("guests")
      .update(updates)
      .eq("id", guestId);

    if (error) {
      console.error("Error updating guest:", error);
      return;
    }

    fetchGuests();
    setEditingGuest(null);
  }

  async function handleDeleteGuest(id) {
    if (!confirm("Are you sure you want to delete this guest?")) return;
    
    const { error } = await supabase.from("guests").delete().eq("id", id);

    if (error) {
      console.error("Error deleting guest:", error);
      return;
    }

    fetchGuests();
  }

  // Auto-confirm guests mentioned in additional guests
  async function autoConfirmAdditionalGuests() {
    for (const guest of guests) {
      if (guest.guest_names && guest.guest_names.trim()) {
        const additionalGuestNames = guest.guest_names
          .split(',')
          .map(name => name.trim().toLowerCase());
        
        for (const additionalName of additionalGuestNames) {
          // Try to find matching guest in database
          const matchingGuest = guests.find(g => 
            `${g.first_name} ${g.last_name}`.toLowerCase() === additionalName ||
            g.first_name.toLowerCase() === additionalName ||
            g.last_name.toLowerCase() === additionalName
          );

          if (matchingGuest && matchingGuest.confirmed === null) {
            await handleUpdateGuest(matchingGuest.id, { confirmed: true });
          }
        }
      }
    }
  }

  function applyFilters() {
    let filtered = [...guests];

    // Filter by RSVP status
    if (filters.status !== "all") {
      if (filters.status === "confirmed") {
        filtered = filtered.filter(guest => guest.confirmed === true);
      } else if (filters.status === "declined") {
        filtered = filtered.filter(guest => guest.confirmed === false);
      } else if (filters.status === "pending") {
        filtered = filtered.filter(guest => guest.confirmed === null);
      }
    }

    // Filter by song request
    if (filters.hasSong !== "all") {
      if (filters.hasSong === "yes") {
        filtered = filtered.filter(guest => guest.song_request && guest.song_request.trim());
      } else if (filters.hasSong === "no") {
        filtered = filtered.filter(guest => !guest.song_request || !guest.song_request.trim());
      }
    }

    // Filter by additional guests
    if (filters.hasAdditionalGuests !== "all") {
      if (filters.hasAdditionalGuests === "yes") {
        filtered = filtered.filter(guest => guest.guest_names && guest.guest_names.trim());
      } else if (filters.hasAdditionalGuests === "no") {
        filtered = filtered.filter(guest => !guest.guest_names || !guest.guest_names.trim());
      }
    }

    setFilteredGuests(filtered);
  }

  function calculateStats() {
    const total = guests.length;
    const confirmed = guests.filter(g => g.confirmed === true).length;
    const declined = guests.filter(g => g.confirmed === false).length;
    const pending = guests.filter(g => g.confirmed === null).length;
    const withSongs = guests.filter(g => g.song_request && g.song_request.trim()).length;
    const withAdditionalGuests = guests.filter(g => g.guest_names && g.guest_names.trim()).length;

    setStats({
      total,
      confirmed,
      declined,
      pending,
      withSongs,
      withAdditionalGuests,
    });
  }

  function getStatusBadge(guest) {
    if (guest.confirmed === true) {
      return <span className="status-badge confirmed">Confirmed</span>;
    } else if (guest.confirmed === false) {
      return <span className="status-badge declined">Declined</span>;
    } else {
      return <span className="status-badge pending">Pending</span>;
    }
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
        <div className="header-actions">
          <button
            onClick={autoConfirmAdditionalGuests}
            className="auto-confirm-btn"
            title="Auto-confirm guests mentioned in additional guests field"
          >
            Auto-Confirm Additional Guests
          </button>
          <button
            onClick={() => supabase.auth.signOut()}
            className="sign-out-btn"
          >
            Sign Out
          </button>
        </div>
      </div>

      {/* Statistics Dashboard */}
      <div className="stats-dashboard">
        <h2>Statistics Overview</h2>
        <div className="stats-grid">
          <div className="stat-card">
            <h3>Total Guests</h3>
            <div className="stat-number">{stats.total}</div>
          </div>
          <div className="stat-card confirmed">
            <h3>Confirmed</h3>
            <div className="stat-number">{stats.confirmed}</div>
          </div>
          <div className="stat-card declined">
            <h3>Declined</h3>
            <div className="stat-number">{stats.declined}</div>
          </div>
          <div className="stat-card pending">
            <h3>Pending</h3>
            <div className="stat-number">{stats.pending}</div>
          </div>
          <div className="stat-card">
            <h3>With Songs</h3>
            <div className="stat-number">{stats.withSongs}</div>
          </div>
          <div className="stat-card">
            <h3>With Additional Guests</h3>
            <div className="stat-number">{stats.withAdditionalGuests}</div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="filters-section">
        <h2>Filters</h2>
        <div className="filters-grid">
          <div className="filter-group">
            <label>RSVP Status:</label>
            <select
              value={filters.status}
              onChange={(e) => setFilters({...filters, status: e.target.value})}
              className="filter-select"
            >
              <option value="all">All ({stats.total})</option>
              <option value="confirmed">Confirmed ({stats.confirmed})</option>
              <option value="declined">Declined ({stats.declined})</option>
              <option value="pending">Pending ({stats.pending})</option>
            </select>
          </div>
          <div className="filter-group">
            <label>Song Request:</label>
            <select
              value={filters.hasSong}
              onChange={(e) => setFilters({...filters, hasSong: e.target.value})}
              className="filter-select"
            >
              <option value="all">All</option>
              <option value="yes">Has Song ({stats.withSongs})</option>
              <option value="no">No Song ({stats.total - stats.withSongs})</option>
            </select>
          </div>
          <div className="filter-group">
            <label>Additional Guests:</label>
            <select
              value={filters.hasAdditionalGuests}
              onChange={(e) => setFilters({...filters, hasAdditionalGuests: e.target.value})}
              className="filter-select"
            >
              <option value="all">All</option>
              <option value="yes">Has Additional ({stats.withAdditionalGuests})</option>
              <option value="no">No Additional ({stats.total - stats.withAdditionalGuests})</option>
            </select>
          </div>
        </div>
      </div>

      {/* Add Guest Form */}
      <div className="add-guest-section">
        <h2>Add New Guest</h2>
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
      </div>

      {/* Guest List */}
      <div className="guest-list">
        <h2>Guest List ({filteredGuests.length} of {stats.total})</h2>
        <div className="table-container">
          <table className="guests-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Title</th>
                <th>Message</th>
                <th>RSVP Status</th>
                <th>Additional Guests</th>
                <th>Song Request</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredGuests.map((guest) => (
                <tr key={guest.id}>
                  <td>
                    {guest.first_name} {guest.last_name}
                  </td>
                  <td>{guest.title || "-"}</td>
                  <td>
                    {editingGuest?.id === guest.id ? (
                      <textarea
                        value={editingGuest.message || ""}
                        onChange={(e) =>
                          setEditingGuest({
                            ...editingGuest,
                            message: e.target.value,
                          })
                        }
                        className="edit-message-input"
                      />
                    ) : (
                      <div
                        className="message-cell"
                        onClick={() =>
                          setEditingGuest({
                            id: guest.id,
                            message: guest.message || "",
                          })
                        }
                        title="Click to edit"
                      >
                        {guest.message || "-"}
                      </div>
                    )}
                  </td>
                  <td>{getStatusBadge(guest)}</td>
                  <td>
                    <div className="additional-guests">
                      {guest.guest_names ? (
                        <div className="guests-list">
                          {guest.guest_names.split(',').map((name, idx) => (
                            <span key={idx} className="guest-tag">
                              {name.trim()}
                            </span>
                          ))}
                        </div>
                      ) : (
                        "-"
                      )}
                    </div>
                  </td>
                  <td>
                    <div className="song-request">
                      {guest.song_request ? (
                        <span className="song-tag" title={guest.song_request}>
                          🎵 {guest.song_request}
                        </span>
                      ) : (
                        "-"
                      )}
                    </div>
                  </td>
                  <td>
                    <div className="actions-cell">
                      {editingGuest?.id === guest.id ? (
                        <div className="edit-actions">
                          <button
                            onClick={() =>
                              handleUpdateGuest(guest.id, {
                                message: editingGuest.message,
                              })
                            }
                            className="save-btn"
                          >
                            Save
                          </button>
                          <button
                            onClick={() => setEditingGuest(null)}
                            className="cancel-btn"
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <div className="guest-actions">
                          <button
                            onClick={() =>
                              setEditingGuest({
                                id: guest.id,
                                message: guest.message || "",
                              })
                            }
                            className="edit-btn"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteGuest(guest.id)}
                            className="delete-btn"
                          >
                            Delete
                          </button>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
              {filteredGuests.length === 0 && (
                <tr>
                  <td colSpan="7" style={{ textAlign: "center" }}>
                    No guests match the current filters
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
