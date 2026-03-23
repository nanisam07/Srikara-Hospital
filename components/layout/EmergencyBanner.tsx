"use client";
import { useState } from "react";
import { X, Phone } from "lucide-react";

export default function EmergencyBanner() {
  const [visible, setVisible] = useState(true);
  if (!visible) return null;

  return (
    <>
      <style>{`
        .eb-root {
          position: relative;
          z-index: 60;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 9px 16px;
          background: #1e3a5f;
          color: #fff;
          min-height: 40px;
        }
        .eb-inner {
          display: flex;
          align-items: center;
          gap: 10px;
          flex: 1;
          justify-content: center;
          flex-wrap: wrap;
        }
        .eb-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #e91e8c;
          flex-shrink: 0;
          animation: ebPulse 1.6s infinite;
        }
        @keyframes ebPulse {
          0%,100% { transform: scale(1); opacity: 1; }
          50%      { transform: scale(1.5); opacity: 0.4; }
        }
        .eb-label {
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.92);
          white-space: nowrap;
        }
        .eb-sep {
          color: rgba(255,255,255,0.25);
          font-size: 11px;
        }
        .eb-phone {
          display: flex;
          align-items: center;
          gap: 5px;
          font-size: 12px;
          font-weight: 800;
          color: #fce4ec;
          text-decoration: none;
          letter-spacing: 0.04em;
          white-space: nowrap;
          transition: color 0.2s;
        }
        .eb-phone:hover { color: #fff; text-decoration: underline; }
        .eb-tagline {
          font-size: 11px;
          color: rgba(255,255,255,0.55);
          white-space: nowrap;
        }
        .eb-close {
          background: none;
          border: none;
          cursor: pointer;
          color: rgba(255,255,255,0.4);
          padding: 4px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          margin-left: 10px;
          transition: color 0.2s, background 0.2s;
        }
        .eb-close:hover {
          color: #fff;
          background: rgba(255,255,255,0.1);
        }

        /* ── Hide lower-priority elements on smaller screens ── */
        @media (max-width: 639px) {
          .eb-sep        { display: none; }
          .eb-tagline    { display: none; }
          .eb-label      { font-size: 9px; letter-spacing: 0.18em; }
          .eb-phone      { font-size: 11px; }
          .eb-root       { padding: 7px 12px; }
        }
        @media (max-width: 359px) {
          .eb-label { display: none; }
        }
      `}</style>

      <div className="eb-root">
        <div className="eb-inner">
          <span className="eb-dot" />
          <span className="eb-label">24 / 7 Emergency</span>
          <span className="eb-sep">|</span>
          <a href="tel:9609108108" className="eb-phone">
            <Phone size={12} />
            Ambulance: 9609108108
          </a>
          <span className="eb-sep">|</span>
          <span className="eb-tagline">9 Hospitals · Hyderabad &amp; Andhra Pradesh</span>
        </div>
        <button
          className="eb-close"
          onClick={() => setVisible(false)}
          aria-label="Dismiss banner"
        >
          <X size={14} />
        </button>
      </div>
    </>
  );
}