import React, { useState } from "react";
import { api } from "../services/api.js";

const ContactForm = () => {
  const [form, setForm] = useState({ fullName: "", email: "", mobile: "", city: "" });
  const [status, setStatus] = useState(null);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus(null);
    try {
      await api.post("/api/contact", form);
      setStatus("We received your details. Thank you!");
      setForm({ fullName: "", email: "", mobile: "", city: "" });
    } catch (err) {
      setStatus("Something went wrong. Please try again.");
    }
  };

  return (
    <section id="contact" className="section contact">
      <div className="container contact-grid">
        <div>
          <p style={{ color: "rgba(255, 255, 255, 0.8)", fontWeight: 600, letterSpacing: "1px", fontSize: "14px", textTransform: "uppercase", marginBottom: "12px" }}>
            Let's talk
          </p>
          <h2 style={{ fontSize: "42px", fontWeight: 700, margin: "12px 0", color: "#fff" }}>Start a project with us</h2>
          <p style={{ color: "rgba(255, 255, 255, 0.9)", fontSize: "18px", lineHeight: "1.7", marginTop: "16px" }}>
            Share a few details and we'll reach out. Keeping things simple and clear.
          </p>
        </div>
        <form onSubmit={handleSubmit} className="contact-form">
          <div style={{ marginBottom: "12px" }}>
            <label className="label">Full Name</label>
            <input
              name="fullName"
              value={form.fullName}
              onChange={handleChange}
              required
              className="input"
            />
          </div>
          <div style={{ marginBottom: "12px" }}>
            <label className="label">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="input"
            />
          </div>
          <div className="flex-row" style={{ marginBottom: "12px" }}>
            <div style={{ flex: 1 }}>
              <label className="label">Mobile</label>
              <input
                name="mobile"
                type="tel"
                value={form.mobile}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, "");
                  setForm({ ...form, mobile: value });
                }}
                pattern="[0-9]{10,15}"
                minLength="10"
                maxLength="15"
                required
                className="input"
                placeholder="10-15 digits"
              />
            </div>
            <div style={{ flex: 1 }}>
              <label className="label">City</label>
              <input
                name="city"
                value={form.city}
                onChange={handleChange}
                required
                className="input"
              />
            </div>
          </div>
          <button type="submit" className="btn" style={{ width: "100%", background: "linear-gradient(135deg, #ff6b35 0%, #ff8c5a 100%)", padding: "14px", fontSize: "16px", fontWeight: 600 }}>
            Submit
          </button>
          {status && <p style={{ marginTop: "12px", color: "rgba(255, 255, 255, 0.9)", fontSize: "14px", textAlign: "center" }}>{status}</p>}
        </form>
      </div>
    </section>
  );
};

export default ContactForm;

