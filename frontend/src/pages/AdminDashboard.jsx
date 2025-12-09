import React, { useEffect, useState } from "react";
import { api } from "../services/api.js";
import { useAuth } from "../state/AuthContext.jsx";
import { authApi } from "../services/api.js";

const AdminDashboard = () => {
  const { token } = useAuth();
  const [stats, setStats] = useState({ projects: 0, clients: 0, contacts: 0, subscribers: 0 });

  useEffect(() => {
    const load = async () => {
      const [proj, cli] = await Promise.all([
        api.get("/api/projects"),
        api.get("/api/clients"),
      ]);
      const auth = authApi(token);
      const [contactRes, subsRes] = await Promise.all([
        auth.get("/api/contact"),
        auth.get("/api/newsletter"),
      ]);
      setStats({
        projects: proj.data.length,
        clients: cli.data.length,
        contacts: contactRes.data.total || contactRes.data.items?.length || 0,
        subscribers: subsRes.data.length,
      });
    };
    load().catch((err) => console.error(err));
  }, [token]);

  const cards = [
    { title: "Projects", value: stats.projects, bg: "#e0f2fe", color: "#0ea5e9" },
    { title: "Clients", value: stats.clients, bg: "#dcfce7", color: "#16a34a" },
    { title: "Contacts", value: stats.contacts, bg: "#fef9c3", color: "#d97706" },
    { title: "Subscribers", value: stats.subscribers, bg: "#ede9fe", color: "#7c3aed" },
  ];

  return (
    <div>
      <h1 style={{ marginBottom: "16px" }}>Overview</h1>
      <div className="dash-cards">
        {cards.map((card) => (
          <div
            key={card.title}
            style={{
              padding: "16px",
              borderRadius: "12px",
              background: card.bg,
              color: card.color,
            }}
          >
            <p style={{ margin: 0, fontWeight: 600 }}>{card.title}</p>
            <p style={{ margin: "6px 0 0", fontSize: "26px", fontWeight: 700 }}>{card.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;

