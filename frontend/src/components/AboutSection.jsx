import React from "react";

const AboutSection = () => (
  <section id="about" className="section" style={{ background: "#fff" }}>
    <div className="container">
      <div className="section-heading">
        <h2>About Us</h2>
        <p className="muted">
          We bring fifteen years of experience in real estate, excellent customer service and a
          commitment to work hard, listen and follow through. We provide quality service to build
          relationships with clients and, more importantly, maintain those relationships by
          communicating effectively.
        </p>
      </div>
      <div className="grid" style={{ gap: "24px", marginTop: "40px" }}>
        <div className="simple-card fade-in">
          <div style={{ width: "50px", height: "50px", borderRadius: "12px", background: "linear-gradient(135deg, var(--primary) 0%, var(--primary-light) 100%)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "16px", fontSize: "24px" }}>
            🎯
          </div>
          <h3>Our Mission</h3>
          <p className="muted" style={{ margin: 0, fontSize: "15px" }}>
            To provide simple, effective real estate solutions that help clients achieve their
            goals.
          </p>
        </div>
        <div className="simple-card fade-in">
          <div style={{ width: "50px", height: "50px", borderRadius: "12px", background: "linear-gradient(135deg, var(--secondary) 0%, var(--secondary-light) 100%)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "16px", fontSize: "24px" }}>
            💎
          </div>
          <h3>Our Values</h3>
          <p className="muted" style={{ margin: 0, fontSize: "15px" }}>
            We believe in clear communication, honest service, and building lasting relationships
            with our clients.
          </p>
        </div>
        <div className="simple-card fade-in">
          <div style={{ width: "50px", height: "50px", borderRadius: "12px", background: "linear-gradient(135deg, var(--accent) 0%, #34d399 100%)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "16px", fontSize: "24px" }}>
            🚀
          </div>
          <h3>Our Approach</h3>
          <p className="muted" style={{ margin: 0, fontSize: "15px" }}>
            We keep things friendly and straightforward, making real estate accessible to everyone.
          </p>
        </div>
      </div>
    </div>
  </section>
);

export default AboutSection;

