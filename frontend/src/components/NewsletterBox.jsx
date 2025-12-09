import React, { useState } from "react";
import { api } from "../services/api.js";

const NewsletterBox = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus(null);
    try {
      await api.post("/api/newsletter", { email });
      setStatus("Subscribed! Thanks for joining.");
      setEmail("");
    } catch (err) {
      setStatus("Subscription failed. Try again.");
    }
  };

  return (
    <div className="footer-bar">
      <div className="container">
        <div style={{ display: "flex", gap: "30px", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", padding: "30px 0" }}>
          <div className="footer-nav">
            <a href="#services">Home</a>
            <a href="#services">Services</a>
            <a href="#projects">Projects</a>
            <a href="#clients">Testimonials</a>
            <a href="#contact">Contact</a>
          </div>
          <form className="footer-subscribe" onSubmit={handleSubmit}>
            <label htmlFor="newsletter" style={{ color: "rgba(255, 255, 255, 0.9)", fontWeight: 500, fontSize: "15px" }}>
              Subscribe to us
            </label>
            <input
              id="newsletter"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter Email Address"
              className="input"
              style={{ background: "rgba(255, 255, 255, 0.15)", borderColor: "rgba(255, 255, 255, 0.3)", color: "#fff", minWidth: "220px", padding: "10px 16px" }}
            />
            <button className="btn" style={{ background: "linear-gradient(135deg, #ff6b35 0%, #ff8c5a 100%)", border: "none", padding: "10px 24px" }}>
              Subscribe
            </button>
          </form>
        </div>
        {status && (
          <p style={{ textAlign: "center", marginTop: "12px", color: "rgba(255, 255, 255, 0.9)", fontSize: "14px" }}>
            {status}
          </p>
        )}
        <div style={{ textAlign: "center", paddingTop: "20px", borderTop: "1px solid rgba(255, 255, 255, 0.1)", marginTop: "20px", color: "rgba(255, 255, 255, 0.7)", fontSize: "14px" }}>
          © 2024 KaryaSutra. All Rights Reserved.
        </div>
      </div>
    </div>
  );
};

export default NewsletterBox;

