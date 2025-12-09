import React, { useEffect, useState } from "react";
import { authApi } from "../services/api.js";
import { useAuth } from "../state/AuthContext.jsx";

const SubscribersPage = () => {
  const { token } = useAuth();
  const client = authApi(token);
  const [subs, setSubs] = useState([]);

  const load = async () => {
    const res = await client.get("/api/newsletter");
    setSubs(res.data);
  };

  useEffect(() => {
    load().catch((err) => console.error(err));
  }, []);

  const handleDelete = async (id) => {
    await client.delete(`/api/newsletter/${id}`);
    await load();
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
      <h2 style={{ margin: 0 }}>Subscribers</h2>
      <div className="card" style={{ padding: "0" }}>
        <table className="table">
          <thead>
            <tr>
              <th>Email</th>
              <th>Subscribed</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {subs.map((s) => (
              <tr key={s._id}>
                <td>{s.email}</td>
                <td>{s.subscribedAt ? new Date(s.subscribedAt).toLocaleDateString() : "-"}</td>
                <td>
                  <button className="btn" style={{ background: "#ef4444" }} onClick={() => handleDelete(s._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SubscribersPage;

