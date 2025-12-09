import React, { useEffect, useState } from "react";
import { authApi } from "../services/api.js";
import { useAuth } from "../state/AuthContext.jsx";

const ProjectsPage = () => {
  const { token } = useAuth();
  const client = authApi(token);
  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState({ name: "", description: "", image: null, id: null });
  const [message, setMessage] = useState(null);

  const load = async () => {
    const res = await client.get("/api/projects");
    setProjects(res.data);
  };

  useEffect(() => {
    load().catch((err) => console.error(err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    const data = new FormData();
    data.append("name", form.name);
    data.append("description", form.description);
    if (form.image) data.append("image", form.image);
    try {
      if (form.id) {
        await client.put(`/api/projects/${form.id}`, data);
        setMessage("Project updated.");
      } else {
        await client.post("/api/projects", data);
        setMessage("Project created.");
      }
      setForm({ name: "", description: "", image: null, id: null });
      await load();
    } catch (err) {
      setMessage("Error saving project.");
    }
  };

  const handleEdit = (p) => {
    setForm({ name: p.name, description: p.description, image: null, id: p._id });
  };

  const handleDelete = async (id) => {
    await client.delete(`/api/projects/${id}`);
    await load();
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h2 style={{ margin: 0 }}>Projects</h2>
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
            <label className="label">Description</label>
            <input
              className="input"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
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
          {form.id ? "Update Project" : "Add Project"}
        </button>
        {message && <p className="muted" style={{ marginTop: "8px" }}>{message}</p>}
      </form>
      <div className="grid" style={{ gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))" }}>
        {projects.map((p) => (
          <div key={p._id} className="card">
            <img src={p.imageUrl} alt={p.name} style={{ height: "160px", objectFit: "cover" }} />
            <div className="card-body">
              <p style={{ margin: 0, fontWeight: 600 }}>{p.name}</p>
              <p className="muted" style={{ margin: "6px 0" }}>
                {p.description}
              </p>
              <div className="flex-row" style={{ gap: "8px" }}>
                <button className="btn secondary" type="button" onClick={() => handleEdit(p)}>
                  Edit
                </button>
                <button
                  className="btn"
                  type="button"
                  onClick={() => handleDelete(p._id)}
                  style={{ background: "#ef4444" }}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectsPage;

