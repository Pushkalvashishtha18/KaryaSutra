import React from "react";
import { NavLink } from "react-router-dom";

const navItemClass = ({ isActive }) =>
  `admin-link ${isActive ? "admin-link-active" : ""}`;

const AdminSidebar = () => (
  <aside
    style={{
      background: "#0f172a",
      color: "#fff",
      minHeight: "100vh",
      width: "220px",
      padding: "16px",
    }}
  >
    <div style={{ fontSize: "18px", fontWeight: 700, marginBottom: "12px" }}>Admin Panel</div>
    <nav style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
      <NavLink to="/admin/dashboard" className={navItemClass}>
        Overview
      </NavLink>
      <NavLink to="/admin/projects" className={navItemClass}>
        Projects
      </NavLink>
      <NavLink to="/admin/clients" className={navItemClass}>
        Clients
      </NavLink>
      <NavLink to="/admin/contacts" className={navItemClass}>
        Contacts
      </NavLink>
      <NavLink to="/admin/subscribers" className={navItemClass}>
        Subscribers
      </NavLink>
    </nav>
  </aside>
);

export default AdminSidebar;

