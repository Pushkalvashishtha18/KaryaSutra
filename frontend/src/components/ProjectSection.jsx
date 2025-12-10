import React, { useEffect, useState } from "react";
import { api } from "../services/api.js";
import ProjectCard from "./ProjectCard.jsx";

const ProjectSection = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        setLoading(true);
        setError(null);
        console.log("Fetching projects from API...");
        const res = await api.get("/api/projects");
        console.log("Projects loaded successfully:", res.data);
        if (res.data && res.data.length > 0) {
          setProjects(res.data);
        } else {
          console.warn("No projects found in response");
          setProjects([]);
        }
      } catch (err) {
        console.error("Error loading projects:", err);
        console.error("Error details:", {
          message: err.message,
          response: err.response?.data,
          status: err.response?.status,
          url: err.config?.url,
        });
        setError(err.message || "Failed to load projects");
        setProjects([]);
      } finally {
        setLoading(false);
      }
    };
    loadProjects();
  }, []);

  return (
    <section id="projects" className="section" style={{ background: "linear-gradient(180deg, #f8fafc 0%, #ffffff 100%)", position: "relative" }}>
      <div className="container" style={{ position: "relative", zIndex: 1 }}>
        <div className="section-heading">
          <h2>Our Projects</h2>
          <p className="muted">
            We know what buyers look for. Here are simple highlights from recent work.
          </p>
        </div>
        {loading && (
          <div style={{ textAlign: "center", padding: "40px", color: "#64748b" }}>
            Loading projects...
          </div>
        )}
        {error && (
          <div style={{ textAlign: "center", padding: "40px", color: "#ef4444" }}>
            Error: {error}. Please make sure the backend server is running on port 5000.
          </div>
        )}
        {!loading && !error && projects.length === 0 && (
          <div style={{ textAlign: "center", padding: "40px", color: "#64748b" }}>
            No projects found.
          </div>
        )}
        {!loading && !error && projects.length > 0 && (
          <div className="grid" style={{ gap: "20px" }}>
            {projects.map((p, index) => (
              <ProjectCard key={p._id} project={p} delay={index * 0.1} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ProjectSection;

