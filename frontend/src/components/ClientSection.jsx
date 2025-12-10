import React, { useEffect, useState } from "react";
import { api } from "../services/api.js";
import ClientCard from "./ClientCard.jsx";

const ClientSection = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadClients = async () => {
      try {
        setLoading(true);
        setError(null);
        console.log("Fetching clients from API...");
        const res = await api.get("/api/clients");
        console.log("Clients loaded successfully:", res.data);
        if (res.data && res.data.length > 0) {
          setClients(res.data);
        } else {
          console.warn("No clients found in response");
          setClients([]);
        }
      } catch (err) {
        console.error("Error loading clients:", err);
        console.error("Error details:", {
          message: err.message,
          response: err.response?.data,
          status: err.response?.status,
          url: err.config?.url,
        });
        setError(err.message || "Failed to load clients");
        setClients([]);
      } finally {
        setLoading(false);
      }
    };
    loadClients();
  }, []);

  return (
    <section id="clients" className="section" style={{ background: "linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)", position: "relative" }}>
      <div className="container" style={{ position: "relative", zIndex: 1 }}>
        <div className="section-heading">
          <h2>Happy Clients</h2>
          <p className="muted">Honest words from people we’ve helped.</p>
        </div>
        {loading && (
          <div style={{ textAlign: "center", padding: "40px", color: "#64748b" }}>
            Loading clients...
          </div>
        )}
        {error && (
          <div style={{ textAlign: "center", padding: "40px", color: "#ef4444" }}>
            Error: {error}. Please make sure the backend server is running on port 5000.
          </div>
        )}
        {!loading && !error && clients.length === 0 && (
          <div style={{ textAlign: "center", padding: "40px", color: "#64748b" }}>
            No clients found.
          </div>
        )}
        {!loading && !error && clients.length > 0 && (
          <div className="grid" style={{ gap: "18px" }}>
            {clients.map((c, index) => (
              <ClientCard key={c._id} client={c} delay={index * 0.1} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ClientSection;

