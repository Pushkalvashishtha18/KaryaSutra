import React from "react";

const ProjectCard = ({ project, delay = 0 }) => {
  const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000";
  const placeholderImage = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='450' height='350'%3E%3Crect fill='%23e5e7eb' width='450' height='350'/%3E%3Ctext fill='%236b7280' font-family='sans-serif' font-size='18' x='50%25' y='50%25' text-anchor='middle' dy='.3em'%3EProject%3C/text%3E%3C/svg%3E";
  const imageUrl = project.imageUrl?.startsWith("http")
    ? project.imageUrl
    : project.imageUrl?.startsWith("/")
    ? `${API_BASE}${project.imageUrl}`
    : project.imageUrl || placeholderImage;

  return (
    <div className="card fade-in" style={{ animationDelay: `${delay}s` }}>
      <img src={imageUrl} alt={project.name} loading="lazy" onError={(e) => {
        e.target.src = placeholderImage;
        e.target.onerror = null; // Prevent infinite loop
      }} />
    <div className="card-body">
      <h3 style={{ margin: "0 0 6px", fontSize: "18px" }}>{project.name}</h3>
      <p className="muted" style={{ margin: "0 0 10px" }}>
        {project.description}
      </p>
      <button className="btn secondary" style={{ padding: "8px 12px" }}>
        Read More →
      </button>
    </div>
  </div>
  );
};

export default ProjectCard;

