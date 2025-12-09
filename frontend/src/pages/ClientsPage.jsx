import React, { useEffect, useState, useMemo } from "react";
import { authApi } from "../services/api.js";
import { useAuth } from "../state/AuthContext.jsx";

const ClientsPage = () => {
  const { token } = useAuth();
  const client = useMemo(() => {
    console.log("Creating API client with token:", token ? "Token exists" : "No token");
    return token ? authApi(token) : null;
  }, [token]);
  const [clients, setClients] = useState([]);
  const [form, setForm] = useState({
    name: "",
    designation: "",
    description: "",
    image: null,
    id: null,
  });
  const [message, setMessage] = useState(null);

  const load = async () => {
    if (!client) {
      console.warn("Cannot load clients - no API client available");
      return;
    }
    try {
      console.log("Loading clients...");
      const res = await client.get("/api/clients");
      console.log("Clients loaded:", res.data);
      setClients(res.data);
    } catch (err) {
      console.error("Error loading clients:", err);
      console.error("Error response:", err.response);
      setMessage("Error loading clients. Please refresh the page.");
    }
  };

  useEffect(() => {
    if (client) {
      console.log("Client API instance created, loading clients...");
      load();
    } else {
      console.warn("No client API instance - token might be missing");
    }
  }, [client]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!client) {
      setMessage("Please login to continue.");
      return;
    }
    setMessage(null);
    const data = new FormData();
    data.append("name", form.name);
    data.append("designation", form.designation);
    data.append("description", form.description);
    if (form.image) data.append("image", form.image);
    try {
      if (form.id) {
        await client.put(`/api/clients/${form.id}`, data);
        setMessage("Client updated successfully!");
      } else {
        await client.post("/api/clients", data);
        setMessage("Client added successfully!");
      }
      setForm({ name: "", designation: "", description: "", image: null, id: null });
      // Reset file input
      const fileInput = document.querySelector('input[type="file"]');
      if (fileInput) fileInput.value = "";
      await load();
    } catch (err) {
      console.error("Error saving client:", err);
      const errorMsg = err.response?.data?.message || 
                       err.response?.data?.errors?.[0]?.msg || 
                       err.message || 
                       "Error saving client. Please try again.";
      setMessage(errorMsg);
    }
  };

  const handleEdit = (c) => {
    console.log("Edit clicked for client:", c);
    setForm({
      name: c.name || "",
      designation: c.designation || "",
      description: c.description || "",
      image: null,
      id: c._id,
    });
    // Scroll to form
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 100);
  };

  const handleDelete = async (id) => {
    console.log("Delete clicked for client ID:", id);
    if (!client) {
      console.error("No client API instance available");
      setMessage("Please login to continue.");
      return;
    }
    if (!window.confirm("Are you sure you want to delete this client?")) {
      return;
    }
    try {
      console.log("Attempting to delete client:", id);
      const response = await client.delete(`/api/clients/${id}`);
      console.log("Delete response:", response);
      setMessage("Client deleted successfully!");
      await load();
      setTimeout(() => setMessage(null), 3000);
    } catch (err) {
      console.error("Error deleting client:", err);
      console.error("Error details:", err.response?.data);
      setMessage(err.response?.data?.message || "Error deleting client. Please try again.");
      setTimeout(() => setMessage(null), 5000);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h2 style={{ margin: 0 }}>Clients</h2>
        {!client && (
          <p style={{ color: "#ef4444", fontSize: "14px", margin: 0 }}>
            ⚠️ Not authenticated
          </p>
        )}
      </div>
      <form
        onSubmit={handleSubmit}
        style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: "12px", padding: "14px" }}
      >
        <div className="grid" style={{ gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))" }}>
          <div style={{ marginBottom: "10px" }}>
            <label className="label">Name</label>
            <input
              className="input"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
          </div>
          <div style={{ marginBottom: "10px" }}>
            <label className="label">Designation</label>
            <input
              className="input"
              value={form.designation}
              onChange={(e) => setForm({ ...form, designation: e.target.value })}
              required
            />
          </div>
          <div style={{ gridColumn: "1 / -1", marginBottom: "10px" }}>
            <label className="label">Testimonial</label>
            <textarea
              className="input"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              rows="3"
              required
            />
          </div>
          <div style={{ marginBottom: "10px" }}>
            <label className="label">Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setForm({ ...form, image: e.target.files[0] })}
              className="input"
            />
          </div>
        </div>
        <button className="btn" style={{ marginTop: "8px" }}>
          {form.id ? "Update Client" : "Add Client"}
        </button>
        {message && (
          <p
            style={{
              marginTop: "12px",
              padding: "10px",
              borderRadius: "8px",
              background: message.includes("Error") ? "#fee2e2" : "#d1fae5",
              color: message.includes("Error") ? "#991b1b" : "#065f46",
              fontSize: "14px",
            }}
          >
            {message}
          </p>
        )}
      </form>
      <div className="grid" style={{ gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))" }}>
        {clients.map((c) => (
          <div key={c._id} className="simple-card" style={{ display: "flex", flexDirection: "column", gap: "8px", position: "relative", zIndex: 1 }}>
            <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
              <img
                src={
                  c.imageUrl?.startsWith("http")
                    ? c.imageUrl
                    : c.imageUrl?.startsWith("/")
                    ? `${import.meta.env.VITE_API_BASE || "http://localhost:5000"}${c.imageUrl}`
                    : c.imageUrl || "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Crect fill='%23e5e7eb' width='200' height='200'/%3E%3Ctext fill='%236b7280' font-family='sans-serif' font-size='14' x='50%25' y='50%25' text-anchor='middle' dy='.3em'%3EClient%3C/text%3E%3C/svg%3E"
                }
                alt={c.name}
                style={{ width: "60px", height: "60px", borderRadius: "50%", objectFit: "cover", backgroundColor: "#e5e7eb" }}
                onError={(e) => {
                  // Use data URI instead of external placeholder
                  e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Crect fill='%23e5e7eb' width='200' height='200'/%3E%3Ctext fill='%236b7280' font-family='sans-serif' font-size='14' x='50%25' y='50%25' text-anchor='middle' dy='.3em'%3EClient%3C/text%3E%3C/svg%3E";
                  e.target.onerror = null; // Prevent infinite loop
                }}
              />
              <div>
                <p style={{ margin: 0, fontWeight: 600 }}>{c.name}</p>
                <p className="muted" style={{ margin: 0 }}>{c.designation}</p>
              </div>
            </div>
            <p className="muted" style={{ margin: 0 }}>{c.description}</p>
            <div 
              className="flex-row" 
              style={{ gap: "8px", marginTop: "8px", position: "relative", zIndex: 10 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                className="btn secondary"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  console.log("Edit button clicked for client:", c._id, c);
                  if (!client) {
                    setMessage("Error: Not authenticated. Please login again.");
                    return;
                  }
                  handleEdit(c);
                }}
                style={{ flex: 1, cursor: "pointer", position: "relative", zIndex: 11 }}
              >
                Edit
              </button>
              <button
                type="button"
                className="btn"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  console.log("Delete button clicked for client:", c._id);
                  if (!client) {
                    setMessage("Error: Not authenticated. Please login again.");
                    return;
                  }
                  handleDelete(c._id);
                }}
                style={{ background: "#ef4444", flex: 1, cursor: "pointer", position: "relative", zIndex: 11 }}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClientsPage;

