"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

/*
  SRIKARA PALETTE
  Magenta   #C0145C
  Navy      #1C2B4A
  Blue-gray #4A6FA5
  Off-white #F8F6F9
*/

const HOSPITAL_BRANCHES = [
  { id: "SECUNDERABAD", name: "Secunderabad Branch",   address: "Main Road, Secunderabad",         phone: "040-456789" },
  { id: "MIYAPUR",      name: "Miyapur Branch",        address: "Miyapur X Roads, Hyderabad",      phone: "040-556789" },
  { id: "KARKHANA",     name: "Karkhana Branch",       address: "Karkhana, Secunderabad",          phone: "040-656789" },
  { id: "VIJAYAWADA",   name: "Vijayawada Branch",     address: "MG Road, Vijayawada",             phone: "0866-456789" },
];

const DEPT_COLUMNS = [
  ["Cardiology", "Neurology", "Orthopaedics", "Oncology", "Urology"],
  ["Gastroenterology", "Pulmonology", "Nephrology", "Dermatology", "Dental"],
  ["Mother & Child", "Robotic Surgery", "Ophthalmology", "ENT", "Emergency"],
];

const QUICK_ACTIONS = [
  { label: "Book Appointment", icon: "⚡", href: "/doctors",   accent: true  },
  { label: "Find Specialist",  icon: "🔬", href: "/doctors",   accent: false },
  { label: "Emergency Care",   icon: "❤️", href: "tel:1800-123-4567", accent: false },
  { label: "Patient Portal",   icon: "🛡️", href: "/portal",   accent: false },
];

export default function Footer() {
  const [activeBranch, setActiveBranch] = useState("SECUNDERABAD");
  const branch = HOSPITAL_BRANCHES.find((b) => b.id === activeBranch)!;

  return (
    <>
      {/* ═══════════════════════════════════════════
          MAIN FOOTER BODY
      ═══════════════════════════════════════════ */}
      <footer
        style={{
          background: "#0f1a2e",
          borderTop: "1px solid rgba(192,20,92,0.18)",
        }}
      >
        {/* ── Top stripe: logo + tagline ── */}
        <div
          style={{
            borderBottom: "1px solid rgba(255,255,255,0.06)",
            padding: "36px 6vw",
          }}
        >
          <div
            style={{
              maxWidth: 1280,
              margin: "0 auto",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: 20,
            }}
          >
            {/* Logo */}
            <Link href="/" style={{ display: "flex", alignItems: "center", gap: 14, textDecoration: "none" }}>
              <div
                style={{
                  background: "#fff",
                  borderRadius: 12,
                  padding: "8px 16px",
                  boxShadow: "0 2px 16px rgba(0,0,0,0.18)",
                  display: "inline-flex",
                  alignItems: "center",
                }}
              >
                <Image
                  src="/srikara-logo.png"
                  alt="Srikara Hospitals"
                  width={140}
                  height={36}
                  style={{ height: 36, width: "auto", objectFit: "contain", display: "block" }}
                  priority
                />
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
                <span
                  style={{
                    fontSize: 10,
                    fontWeight: 800,
                    letterSpacing: "0.22em",
                    textTransform: "uppercase",
                    color: "#C0145C",
                  }}
                >
                  • NEXT-GEN CARE
                </span>
                <span
                  style={{
                    fontSize: 11,
                    color: "rgba(255,255,255,0.38)",
                    fontWeight: 400,
                    letterSpacing: "0.04em",
                  }}
                >
                  Serving Patients is Serving God
                </span>
              </div>
            </Link>

            {/* Social icons + certifications */}
            <div style={{ display: "flex", alignItems: "center", gap: 20, flexWrap: "wrap" }}>
              {/* Cert badges */}
              <div style={{ display: "flex", gap: 8 }}>
                {["NABH CERTIFIED", "ISO 9001:2015"].map((cert) => (
                  <span
                    key={cert}
                    style={{
                      fontSize: 8,
                      fontWeight: 800,
                      letterSpacing: "0.18em",
                      textTransform: "uppercase",
                      color: "rgba(255,255,255,0.55)",
                      padding: "5px 12px",
                      border: "1px solid rgba(255,255,255,0.1)",
                      borderRadius: 6,
                      background: "rgba(255,255,255,0.04)",
                    }}
                  >
                    {cert}
                  </span>
                ))}
              </div>

              {/* Social icons */}
              <div style={{ display: "flex", gap: 8 }}>
                {[
                  { icon: "f",  label: "Facebook" },
                  { icon: "in", label: "LinkedIn" },
                  { icon: "tw", label: "Twitter"  },
                  { icon: "yt", label: "YouTube"  },
                ].map((s) => (
                  <button
                    key={s.label}
                    aria-label={s.label}
                    style={{
                      width: 34,
                      height: 34,
                      borderRadius: "50%",
                      background: "rgba(255,255,255,0.06)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      color: "rgba(255,255,255,0.42)",
                      fontSize: 10,
                      fontWeight: 800,
                      textTransform: "uppercase",
                      cursor: "pointer",
                      transition: "all 0.22s",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.background = "rgba(192,20,92,0.2)";
                      (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(192,20,92,0.45)";
                      (e.currentTarget as HTMLButtonElement).style.color = "#f472b6";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.06)";
                      (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.1)";
                      (e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.42)";
                    }}
                  >
                    {s.icon}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── Main 3-column content ── */}
        <div
          style={{
            maxWidth: 1280,
            margin: "0 auto",
            padding: "52px 6vw",
            display: "grid",
            gridTemplateColumns: "1.4fr 1.6fr 1fr",
            gap: 52,
            alignItems: "start",
          }}
        >
          {/* ── COL 1: About + Hospital directory ── */}
          <div>
            <p
              style={{
                fontSize: 13,
                color: "rgba(255,255,255,0.45)",
                lineHeight: 1.85,
                marginBottom: 28,
              }}
            >
              We aren't just a hospital; we are a technology-driven healing
              ecosystem. Pioneers in robotic orthopaedic surgery in South India.
              9 hospitals across Telangana & Andhra Pradesh.
            </p>

            {/* Hospital directory widget */}
            <div
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(192,20,92,0.18)",
                borderRadius: 18,
                overflow: "hidden",
              }}
            >
              {/* Widget header */}
              <div
                style={{
                  padding: "12px 16px",
                  borderBottom: "1px solid rgba(255,255,255,0.06)",
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                <span style={{ fontSize: 12 }}>📍</span>
                <span
                  style={{
                    fontSize: 9,
                    fontWeight: 800,
                    letterSpacing: "0.24em",
                    textTransform: "uppercase",
                    color: "rgba(255,255,255,0.45)",
                  }}
                >
                  Instant Hospital Directory
                </span>
              </div>

              {/* Branch tabs */}
              <div
                style={{
                  display: "flex",
                  gap: 4,
                  padding: "10px 12px",
                  flexWrap: "wrap",
                  borderBottom: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                {HOSPITAL_BRANCHES.map((b) => (
                  <button
                    key={b.id}
                    onClick={() => setActiveBranch(b.id)}
                    style={{
                      fontSize: 9,
                      fontWeight: 800,
                      letterSpacing: "0.16em",
                      textTransform: "uppercase",
                      padding: "5px 10px",
                      borderRadius: 6,
                      border: "none",
                      cursor: "pointer",
                      transition: "all 0.2s",
                      background:
                        activeBranch === b.id
                          ? "#C0145C"
                          : "rgba(255,255,255,0.06)",
                      color:
                        activeBranch === b.id
                          ? "#fff"
                          : "rgba(255,255,255,0.45)",
                    }}
                  >
                    {b.id}
                  </button>
                ))}
              </div>

              {/* Active branch info */}
              <div style={{ padding: "16px 16px 18px" }}>
                <div
                  style={{
                    fontSize: 15,
                    fontWeight: 700,
                    color: "#fff",
                    marginBottom: 6,
                    letterSpacing: "0.01em",
                  }}
                >
                  {branch.name}
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 7,
                    marginBottom: 14,
                  }}
                >
                  <span style={{ fontSize: 11, marginTop: 1, opacity: 0.6 }}>📍</span>
                  <span
                    style={{
                      fontSize: 12,
                      color: "rgba(255,255,255,0.50)",
                      lineHeight: 1.5,
                    }}
                  >
                    {branch.address}
                  </span>
                </div>
                <a
                  href={`tel:${branch.phone}`}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    fontSize: 16,
                    fontWeight: 800,
                    color: "#C0145C",
                    textDecoration: "none",
                    letterSpacing: "0.02em",
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) =>
                    ((e.currentTarget as HTMLAnchorElement).style.color = "#f472b6")
                  }
                  onMouseLeave={(e) =>
                    ((e.currentTarget as HTMLAnchorElement).style.color = "#C0145C")
                  }
                >
                  <span
                    style={{
                      width: 28,
                      height: 28,
                      borderRadius: "50%",
                      background: "rgba(192,20,92,0.15)",
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 12,
                    }}
                  >
                    📞
                  </span>
                  {branch.phone}
                </a>
              </div>
            </div>
          </div>

          {/* ── COL 2: Departments grid ── */}
          <div>
            <h4
              style={{
                fontSize: 9,
                fontWeight: 800,
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                color: "#C0145C",
                marginBottom: 22,
              }}
            >
              Our Specialties
            </h4>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "8px 16px",
              }}
            >
              {DEPT_COLUMNS.map((col, ci) =>
                col.map((dept) => (
                  <Link
                    key={dept}
                    href={`/departments/${dept.toLowerCase().replace(/\s+/g, "-").replace(/&/g, "")}`}
                    style={{
                      fontSize: 12,
                      color: "rgba(255,255,255,0.50)",
                      textDecoration: "none",
                      fontWeight: 500,
                      padding: "4px 0",
                      transition: "color 0.2s",
                      display: "block",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                    onMouseEnter={(e) =>
                      ((e.currentTarget as HTMLAnchorElement).style.color = "#f472b6")
                    }
                    onMouseLeave={(e) =>
                      ((e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.50)")
                    }
                  >
                    {dept}
                  </Link>
                ))
              )}
            </div>

            {/* View all depts */}
            <Link
              href="/departments"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                marginTop: 20,
                fontSize: 11,
                fontWeight: 800,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "#4A6FA5",
                textDecoration: "none",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLAnchorElement).style.color = "#f472b6")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLAnchorElement).style.color = "#4A6FA5")
              }
            >
              View All 42 Departments →
            </Link>
          </div>

          {/* ── COL 3: Quick actions ── */}
          <div>
            <h4
              style={{
                fontSize: 9,
                fontWeight: 800,
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                color: "#C0145C",
                marginBottom: 22,
              }}
            >
              Quick Access
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {QUICK_ACTIONS.map((action) => (
                <Link
                  key={action.label}
                  href={action.href}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "13px 16px",
                    borderRadius: 14,
                    border: `1px solid ${action.accent ? "rgba(192,20,92,0.35)" : "rgba(255,255,255,0.08)"}`,
                    background: action.accent
                      ? "linear-gradient(135deg, rgba(192,20,92,0.15), rgba(192,20,92,0.05))"
                      : "rgba(255,255,255,0.03)",
                    textDecoration: "none",
                    transition: "all 0.22s",
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(192,20,92,0.5)";
                    (e.currentTarget as HTMLAnchorElement).style.background = "rgba(192,20,92,0.12)";
                    (e.currentTarget as HTMLAnchorElement).style.transform = "translateX(3px)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.borderColor = action.accent
                      ? "rgba(192,20,92,0.35)"
                      : "rgba(255,255,255,0.08)";
                    (e.currentTarget as HTMLAnchorElement).style.background = action.accent
                      ? "linear-gradient(135deg, rgba(192,20,92,0.15), rgba(192,20,92,0.05))"
                      : "rgba(255,255,255,0.03)";
                    (e.currentTarget as HTMLAnchorElement).style.transform = "translateX(0)";
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <span style={{ fontSize: 16 }}>{action.icon}</span>
                    <span
                      style={{
                        fontSize: 12,
                        fontWeight: 700,
                        color: action.accent ? "#f472b6" : "rgba(255,255,255,0.72)",
                        letterSpacing: "0.02em",
                      }}
                    >
                      {action.label}
                    </span>
                  </div>
                  <span
                    style={{
                      fontSize: 14,
                      color: action.accent ? "#C0145C" : "rgba(255,255,255,0.25)",
                    }}
                  >
                    ↗
                  </span>
                </Link>
              ))}
            </div>

            {/* Emergency number big */}
            <div
              style={{
                marginTop: 22,
                padding: "16px 18px",
                borderRadius: 14,
                background: "rgba(192,20,92,0.08)",
                border: "1px solid rgba(192,20,92,0.2)",
              }}
            >
              <div
                style={{
                  fontSize: 9,
                  fontWeight: 800,
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.35)",
                  marginBottom: 6,
                }}
              >
                24/7 Emergency Helpline
              </div>
              <a
                href="tel:1800-123-4567"
                style={{
                  fontSize: 18,
                  fontWeight: 900,
                  color: "#C0145C",
                  textDecoration: "none",
                  letterSpacing: "0.04em",
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                <span
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    background: "#C0145C",
                    animation: "footerPulse 1.5s infinite",
                    flexShrink: 0,
                  }}
                />
                1800-123-4567
              </a>
            </div>
          </div>
        </div>

        {/* ── Departments marquee strip ── */}
        <div
          style={{
            borderTop: "1px solid rgba(255,255,255,0.05)",
            borderBottom: "1px solid rgba(255,255,255,0.05)",
            padding: "10px 0",
            overflow: "hidden",
            background: "rgba(255,255,255,0.02)",
          }}
        >
          <div
            style={{
              display: "flex",
              width: "max-content",
              animation: "footerMarquee 28s linear infinite",
            }}
          >
            {[...Array(2)].map((_, ri) =>
              [
                "CARDIOLOGY",
                "ORTHOPEDICS",
                "NEUROLOGY",
                "GASTROENTEROLOGY",
                "UROLOGY",
                "ONCOLOGY",
                "EMERGENCY",
                "ROBOTIC SURGERY",
                "PULMONOLOGY",
                "NEPHROLOGY",
              ].map((dept) => (
                <span
                  key={`${ri}-${dept}`}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 14,
                    marginRight: 36,
                    fontSize: 9,
                    fontWeight: 800,
                    letterSpacing: "0.26em",
                    color: "rgba(255,255,255,0.22)",
                    whiteSpace: "nowrap",
                    textTransform: "uppercase",
                  }}
                >
                  {dept}
                  <span
                    style={{
                      width: 3,
                      height: 3,
                      borderRadius: "50%",
                      background: "#C0145C",
                      opacity: 0.6,
                      flexShrink: 0,
                    }}
                  />
                </span>
              ))
            )}
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div
          style={{
            maxWidth: 1280,
            margin: "0 auto",
            padding: "20px 6vw",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 14,
          }}
        >
          <p
            style={{
              fontSize: 11,
              color: "rgba(255,255,255,0.25)",
              letterSpacing: "0.04em",
            }}
          >
            © {new Date().getFullYear()} Srikara Hospitals. All rights reserved. &nbsp;·&nbsp; NABH Accredited &nbsp;·&nbsp; ISO 9001:2015
          </p>
          <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
            {["Privacy Policy", "Terms of Service", "Sitemap", "Cookies"].map((l) => (
              <Link
                key={l}
                href="#"
                style={{
                  fontSize: 10,
                  color: "rgba(255,255,255,0.22)",
                  textDecoration: "none",
                  letterSpacing: "0.06em",
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.65)")
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.22)")
                }
              >
                {l}
              </Link>
            ))}
          </div>
          <p
            style={{
              fontSize: 10,
              color: "rgba(255,255,255,0.15)",
              letterSpacing: "0.06em",
            }}
          >
            CRAFTING WELLNESS
          </p>
        </div>
      </footer>
        
        {/* Keyframes injected here (runs once) */}
        <style>{`
          @keyframes footerPulse {
            0%, 100% { transform: scale(1); opacity: 0.9; }
            50%       { transform: scale(1.4); opacity: 0.35; }
          }
          @keyframes footerMarquee {
            from { transform: translateX(0); }
            to   { transform: translateX(-50%); }
          }
        `}</style>
      
    </>
  );
}
