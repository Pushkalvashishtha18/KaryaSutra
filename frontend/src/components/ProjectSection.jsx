import React, { useEffect, useState } from "react";
import { api } from "../services/api.js";
import ProjectCard from "./ProjectCard.jsx";

const ProjectSection = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    api
      .get("/api/projects")
      .then((res) => setProjects(res.data))
      .catch((err) => {
        console.error(err);
        setProjects([
          {
            _id: "p1",
            name: "Consultation",
            description: "Simple guidance to prep listings.",
            imageUrl:
              "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=600&q=80",
          },
          {
            _id: "p2",
            name: "Design",
            description: "Friendly design tweaks that sell.",
            imageUrl:
              "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=600&q=80",
          },
          {
            _id: "p3",
            name: "Marketing & Design",
            description: "Clean visuals and clear messaging.",
            imageUrl:
              "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=600&q=80",
          },
          {
            _id: "p4",
            name: "Consultation & Marketing",
            description: "Support for outreach and follow-ups.",
            imageUrl:
              "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=600&q=80",
          },
          {
            _id: "p5",
            name: "Consultation",
            description: "Walkthroughs with staging tips.",
            imageUrl:
              "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=600&q=80",
          },
        ]);
      });
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
        <div className="grid" style={{ gap: "20px" }}>
          {projects.map((p, index) => (
            <ProjectCard key={p._id} project={p} delay={index * 0.1} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectSection;

