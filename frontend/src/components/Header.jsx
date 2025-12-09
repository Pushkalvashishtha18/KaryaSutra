import React, { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "./Logo.jsx";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="header">
      <div className="container header-inner">
        <Logo />
        <nav className="nav">
          <a href="#services" onClick={() => setMobileMenuOpen(false)}>Services</a>
          <a href="#projects" onClick={() => setMobileMenuOpen(false)}>Projects</a>
          <a href="#clients" onClick={() => setMobileMenuOpen(false)}>Testimonials</a>
          <a href="#about" onClick={() => setMobileMenuOpen(false)}>About</a>
        </nav>
        <div className="header-actions">
          <button
            className="mobile-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? "✕" : "☰"}
          </button>
          <Link to="/admin" className="btn secondary" style={{ display: mobileMenuOpen ? "none" : "inline-flex" }}>
            Admin
          </Link>
          <a href="#contact" className="btn" style={{ background: "linear-gradient(135deg, #ff6b35 0%, #ff8c5a 100%)", display: mobileMenuOpen ? "none" : "inline-flex" }}>
            Contact
          </a>
        </div>
        <nav className={`mobile-nav ${mobileMenuOpen ? "active" : ""}`}>
          <a href="#services" onClick={() => setMobileMenuOpen(false)}>Services</a>
          <a href="#projects" onClick={() => setMobileMenuOpen(false)}>Projects</a>
          <a href="#clients" onClick={() => setMobileMenuOpen(false)}>Testimonials</a>
          <a href="#about" onClick={() => setMobileMenuOpen(false)}>About</a>
          <Link to="/admin" className="btn secondary" onClick={() => setMobileMenuOpen(false)}>
            Admin
          </Link>
          <a href="#contact" className="btn" style={{ background: "linear-gradient(135deg, #ff6b35 0%, #ff8c5a 100%)" }} onClick={() => setMobileMenuOpen(false)}>
            Contact
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Header;

