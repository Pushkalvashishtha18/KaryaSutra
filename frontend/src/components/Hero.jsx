import React from "react";

const Hero = () => (
  <section className="hero" id="services">
    <div className="floating-shapes"></div>
    <div className="container">
      <div style={{ position: "relative", maxWidth: "850px", margin: "0 auto", textAlign: "center", zIndex: 2 }}>
        <p style={{ color: "rgba(255, 255, 255, 0.95)", fontWeight: 600, letterSpacing: "3px", fontSize: "14px", textTransform: "uppercase", marginBottom: "20px", textShadow: "0 2px 4px rgba(0,0,0,0.1)" }}>
          Consultation, Design & Marketing
        </p>
        <h1 style={{ fontSize: "56px", lineHeight: "1.15", margin: "20px 0", fontWeight: 800, textShadow: "0 4px 20px rgba(0,0,0,0.3)", background: "linear-gradient(135deg, #fff 0%, rgba(255,255,255,0.9) 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
          Get a free consultation that fits your needs.
        </h1>
        <p style={{ color: "rgba(255, 255, 255, 0.95)", marginBottom: "40px", fontSize: "20px", lineHeight: "1.7", textShadow: "0 2px 8px rgba(0,0,0,0.2)" }}>
          Simple, approachable help for listings and design. Built by a fresher, crafted to feel
          welcoming.
        </p>
        <div className="flex-row" style={{ justifyContent: "center", gap: "20px" }}>
          <a href="#projects" className="btn" style={{ background: "linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)", border: "none", padding: "16px 36px", fontSize: "17px", fontWeight: 600, boxShadow: "0 8px 24px rgba(245, 158, 11, 0.4)" }}>
            See Projects
          </a>
          <a href="#contact" className="btn secondary" style={{ padding: "16px 36px", fontSize: "17px", fontWeight: 600, background: "rgba(255, 255, 255, 0.15)", backdropFilter: "blur(10px)", border: "2px solid rgba(255, 255, 255, 0.3)" }}>
            Contact Us
          </a>
        </div>
      </div>
    </div>
  </section>
);

export default Hero;

