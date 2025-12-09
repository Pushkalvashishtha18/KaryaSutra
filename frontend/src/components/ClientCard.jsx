import React from "react";

const ClientCard = ({ client, delay = 0 }) => {
  const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000";
  const placeholderImage = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Crect fill='%23e5e7eb' width='200' height='200'/%3E%3Ctext fill='%236b7280' font-family='sans-serif' font-size='14' x='50%25' y='50%25' text-anchor='middle' dy='.3em'%3EClient%3C/text%3E%3C/svg%3E";
  const imageUrl = client.imageUrl?.startsWith("http")
    ? client.imageUrl
    : client.imageUrl?.startsWith("/")
    ? `${API_BASE}${client.imageUrl}`
    : client.imageUrl || placeholderImage;

  return (
    <div className="simple-card fade-in" style={{ animationDelay: `${delay}s` }}>
      <div style={{ display: "flex", gap: "12px", alignItems: "center", marginBottom: "10px" }}>
        <img
          src={imageUrl}
          alt={client.name}
          style={{ width: "56px", height: "56px", borderRadius: "50%", objectFit: "cover" }}
          loading="lazy"
          onError={(e) => {
            e.target.src = placeholderImage;
            e.target.onerror = null; // Prevent infinite loop
          }}
        />
      <div>
        <p style={{ margin: 0, fontWeight: 600 }}>{client.name}</p>
        <p className="muted" style={{ margin: 0, fontSize: "13px" }}>
          {client.designation}
        </p>
      </div>
    </div>
    <p className="muted" style={{ margin: 0 }}>
      "{client.description}"
    </p>
  </div>
  );
};

export default ClientCard;

