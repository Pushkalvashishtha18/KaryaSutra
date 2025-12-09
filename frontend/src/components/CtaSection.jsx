import React from "react";

const CtaSection = () => (
  <section className="cta-banner">
    <div className="container cta-content">
      <h3 style={{ fontSize: "22px", margin: "0 0 8px" }}>
        Learn more about our listing process, staging, and design work.
      </h3>
      <p style={{ margin: "0 0 16px", color: "#e2e8f0" }}>
        We keep things friendly and simple. See how we approach each project.
      </p>
      <a
        href="#projects"
        className="btn"
        style={{ background: "#ff7f32", border: "none", minWidth: "140px" }}
      >
        Learn More
      </a>
    </div>
  </section>
);

export default CtaSection;

