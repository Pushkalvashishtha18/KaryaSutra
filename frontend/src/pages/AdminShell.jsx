import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import AdminSidebar from "../components/AdminSidebar.jsx";
import { useAuth } from "../state/AuthContext.jsx";

const AdminShell = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/admin/login");
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", background: "#f7f7fb" }}>
      <AdminSidebar />
      <main style={{ flex: 1 }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "16px 24px",
            borderBottom: "1px solid #e5e7eb",
            background: "#fff",
          }}
        >
          <div>
            <p className="muted" style={{ margin: 0 }}>
              Welcome back
            </p>
            <p style={{ margin: 0, fontWeight: 600 }}>{user?.name || "Admin"}</p>
          </div>
          <button onClick={handleLogout} className="btn secondary">
            Logout
          </button>
        </div>
        <div style={{ padding: "24px" }}>
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminShell;

