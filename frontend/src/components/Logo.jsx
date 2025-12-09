import React from "react";

const Logo = () => (
  <div className="logo">
    <svg
      width="42"
      height="42"
      viewBox="0 0 42 42"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="42" height="42" rx="10" fill="url(#logoGradient)" />
      <defs>
        <linearGradient id="logoGradient" x1="0" y1="0" x2="42" y2="42">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#ff6b35" />
        </linearGradient>
      </defs>
      <path
        d="M21 14L30 20V26L21 32L12 26V20L21 14Z"
        fill="#fff"
        stroke="rgba(255, 255, 255, 0.3)"
        strokeWidth="1.5"
      />
      <circle cx="21" cy="21" r="4.5" fill="url(#logoGradient)" />
    </svg>
    <span style={{ marginLeft: "12px", fontWeight: 700, fontSize: "22px" }}>KaryaSutra</span>
  </div>
);

export default Logo;

