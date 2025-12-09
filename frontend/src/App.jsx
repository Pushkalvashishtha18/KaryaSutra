import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home.jsx";
import AdminLogin from "./pages/AdminLogin.jsx";
import AdminShell from "./pages/AdminShell.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import ProjectsPage from "./pages/ProjectsPage.jsx";
import ClientsPage from "./pages/ClientsPage.jsx";
import ContactsPage from "./pages/ContactsPage.jsx";
import SubscribersPage from "./pages/SubscribersPage.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

const App = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/admin/login" element={<AdminLogin />} />
    <Route
      path="/admin"
      element={
        <ProtectedRoute>
          <AdminShell />
        </ProtectedRoute>
      }
    >
      <Route index element={<Navigate to="dashboard" replace />} />
      <Route path="dashboard" element={<AdminDashboard />} />
      <Route path="projects" element={<ProjectsPage />} />
      <Route path="clients" element={<ClientsPage />} />
      <Route path="contacts" element={<ContactsPage />} />
      <Route path="subscribers" element={<SubscribersPage />} />
    </Route>
    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>
);

export default App;

