import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api.js";
import { useAuth } from "../state/AuthContext.jsx";

const AdminLogin = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await api.post("/api/auth/login", form);
      login(res.data);
      navigate("/admin/dashboard");
    } catch (err) {
      setError("Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#f1f5f9",
        padding: "20px",
      }}
    >
      <div style={{ background: "#fff", borderRadius: "12px", padding: "24px", width: "360px" }}>
        <h1 style={{ margin: "0 0 6px" }}>Admin Login</h1>
        <p className="muted" style={{ margin: "0 0 16px" }}>
          Access the dashboard
        </p>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "12px" }}>
            <label className="label">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="input"
            />
          </div>
          <div style={{ marginBottom: "12px" }}>
            <label className="label">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              className="input"
            />
          </div>
          <button type="submit" disabled={loading} className="btn" style={{ width: "100%" }}>
            {loading ? "Signing in..." : "Login"}
          </button>
          {error && (
            <p style={{ color: "red", marginTop: "8px", fontSize: "14px" }}>{error}</p>
          )}
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;

