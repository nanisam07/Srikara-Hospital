"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

const HOSPITAL_BRANCHES = [
  { id: "RTC",    name: "RTC X Roads Branch",  address: "Main Road, Secunderabad",    phone: "040 4646 0000" },
  { id: "MIYAPUR",name: "Miyapur Branch",       address: "Miyapur X Roads, Hyderabad", phone: "040 4747 0000" },
  { id: "LBNAGAR",name: "LB Nagar Branch",      address: "LB Nagar, Hyderabad",        phone: "040 66 000 108" },
  { id: "VJYWDA", name: "Vijayawada Branch",    address: "MG Road, Vijayawada",        phone: "772 999 0003" },
  { id: "ECIL",   name: "ECIL Branch",          address: "ECIL X Roads, Hyderabad",    phone: "040 41 108 108" },
  { id: "KMPALY", name: "Kompally Branch",      address: "Kompally, Secunderabad",     phone: "040 6818 0000" },
  { id: "PEERZ",  name: "Peerzadiguda Branch", address: "Peerzadiguda, Hyderabad",    phone: "040 68 108 108" },
  { id: "LKDKPL", name: "Lakdikapul Branch",   address: "Lakdikapul, Hyderabad",      phone: "040 6969 0000" },
  { id: "RJHMDR", name: "Rajahmundry Branch",  address: "Dwaraka Nagar, Khammam",     phone: "0883 6818 000" },
];

const ALL_DEPTS = [
  "Cardiology","Neurology","Orthopaedics","Oncology",
  "Urology","Gastroenterology","Pulmonology","Nephrology",
  "Dermatology","Dental","Mother & Child","Robotic Surgery",
  "Ophthalmology","ENT","Emergency",
];

const QUICK_ACTIONS = [
  { label: "Book Appointment", icon: "⚡", href: "/doctors",           accent: true  },
  { label: "Find Specialist",  icon: "🔬", href: "/doctors",           accent: false },
  { label: "Emergency Care",   icon: "❤️", href: "tel:1800-123-4567",  accent: false },
];

export default function Footer() {
  const [activeBranch, setActiveBranch] = useState("RTC");
  const branch = HOSPITAL_BRANCHES.find((b) => b.id === activeBranch) ?? HOSPITAL_BRANCHES[0];

  return (
    <>
      <style>{`
        /* ── animations ── */
        @keyframes footerPulse {
          0%,100%{ transform:scale(1);   opacity:0.9;  }
          50%    { transform:scale(1.4); opacity:0.35; }
        }
        @keyframes footerMarquee {
          from{ transform:translateX(0);    }
          to  { transform:translateX(-50%); }
        }

        /* global reset inside footer */
        .ftr-root, .ftr-root * { box-sizing:border-box; }
        .ftr-root { overflow-x:hidden; width:100%; }

        /* ── top stripe ── */
        .ftr-top {
          display:flex; align-items:center; justify-content:space-between;
          flex-wrap:wrap; gap:14px;
          padding:26px 5vw;
          border-bottom:1px solid rgba(255,255,255,0.06);
        }
        .ftr-top-right {
          display:flex; align-items:center; gap:12px; flex-wrap:wrap;
        }
        .ftr-certs { display:flex; gap:7px; flex-wrap:wrap; }
        .ftr-socials { display:flex; gap:7px; }

        /* ── body grid ── */
        .ftr-body {
          display:grid;
          grid-template-columns:1fr 1fr 1fr;
          gap:36px;
          max-width:1280px;
          margin:0 auto;
          padding:42px 5vw;
          width:100%;
        }
        .ftr-col { min-width:0; }

        /* ── dept grid (inside col 2) ── */
        .ftr-dept-grid {
          display:grid;
          grid-template-columns:1fr 1fr 1fr;
          gap:5px 10px;
        }
        .ftr-dept-link {
          font-size:12px; color:rgba(255,255,255,0.48); text-decoration:none;
          font-weight:500; padding:3px 0; display:block;
          white-space:normal; word-break:break-word; line-height:1.4;
          transition:color 0.2s;
        }
        .ftr-dept-link:hover { color:#f472b6; }

        /* ── branch tab strip ── */
        .ftr-branches {
          display:flex; gap:5px;
          flex-wrap:wrap;
          padding:9px 12px;
          border-bottom:1px solid rgba(255,255,255,0.06);
        }

        /* ── quick action card ── */
        .ftr-qa {
          display:flex; align-items:center; justify-content:space-between;
          padding:11px 13px; border-radius:12px; text-decoration:none;
          transition:all 0.22s; width:100%;
        }
        .ftr-qa:hover { filter:brightness(1.12); transform:translateX(3px); }

        /* ── marquee ── */
        .ftr-marquee-track {
          display:flex; width:max-content;
          animation:footerMarquee 28s linear infinite;
        }

        /* ── bottom bar ── */
        .ftr-bottom {
          display:flex; align-items:center; justify-content:space-between;
          flex-wrap:wrap; gap:12px;
          max-width:1280px; margin:0 auto;
          padding:16px 5vw;
        }
        .ftr-legal { display:flex; gap:18px; flex-wrap:wrap; }

        /* ══════════════════════════════
           TABLET  768–1023px
        ══════════════════════════════ */
        @media (max-width:1023px) {
          .ftr-body {
            grid-template-columns:1fr 1fr;
            gap:28px;
          }
          /* col-3 (quick actions) spans full width */
          .ftr-col-qa {
            grid-column:1 / -1;
          }
          /* on tablet, quick actions + emergency side by side */
          .ftr-qa-inner {
            display:grid;
            grid-template-columns:1fr 1fr;
            gap:20px;
            align-items:start;
          }
          .ftr-dept-grid {
            grid-template-columns:1fr 1fr;
          }
        }

        /* ══════════════════════════════
           MOBILE  <768px
        ══════════════════════════════ */
        @media (max-width:767px) {
          .ftr-body {
            grid-template-columns:1fr;
            gap:24px;
            padding:28px 4vw;
          }
          .ftr-col-qa { grid-column:auto; }
          .ftr-qa-inner { display:block; }
          .ftr-dept-grid {
            grid-template-columns:1fr 1fr;
            gap:5px 8px;
          }
          .ftr-top {
            flex-direction:column;
            align-items:flex-start;
            padding:20px 4vw;
          }
          .ftr-bottom {
            flex-direction:column;
            align-items:flex-start;
            padding:14px 4vw;
          }
          /* branch tabs: horizontal scroll so they don't wrap messily */
          .ftr-branches {
            flex-wrap:nowrap;
            overflow-x:auto;
            -webkit-overflow-scrolling:touch;
            scrollbar-width:none;
          }
          .ftr-branches::-webkit-scrollbar { display:none; }
          .ftr-legal { gap:12px; }
          .ftr-emergency-box { margin-top:16px !important; }
        }

        @media (max-width:399px) {
          .ftr-dept-grid { grid-template-columns:1fr; }
          .ftr-dept-link { font-size:11px; }
        }
      `}</style>

      <footer className="ftr-root" style={{ background:"#0f1a2e", borderTop:"1px solid rgba(192,20,92,0.18)" }}>

        {/* ── Top stripe ── */}
        <div className="ftr-top">
          {/* Logo + tagline */}
          <Link href="/" style={{ display:"flex", alignItems:"center", gap:12, textDecoration:"none", flexShrink:0 }}>
            <div style={{ background:"#fff", borderRadius:11, padding:"6px 13px", display:"inline-flex", alignItems:"center", boxShadow:"0 2px 14px rgba(0,0,0,0.18)" }}>
              <Image src="/srikara-logo.png" alt="Srikara Hospitals" width={118} height={30} style={{ height:30, width:"auto", objectFit:"contain", display:"block" }} priority />
            </div>
            <div style={{ display:"flex", flexDirection:"column", gap:3 }}>
              <span style={{ fontSize:9, fontWeight:800, letterSpacing:"0.22em", textTransform:"uppercase", color:"#C0145C" }}>• NEXT-GEN CARE</span>
              <span style={{ fontSize:10, color:"rgba(255,255,255,0.36)", fontWeight:400 }}>Serving Patients is Serving God</span>
            </div>
          </Link>

          {/* Certs + social */}
          <div className="ftr-top-right">
            <div className="ftr-certs">
              {["NABH", "ISO 9001"].map((c) => (
                <span key={c} style={{ fontSize:8, fontWeight:800, letterSpacing:"0.14em", textTransform:"uppercase", color:"rgba(255,255,255,0.52)", padding:"4px 10px", border:"1px solid rgba(255,255,255,0.1)", borderRadius:6, background:"rgba(255,255,255,0.04)", whiteSpace:"nowrap" }}>{c}</span>
              ))}
            </div>
            <div className="ftr-socials">
              {[{ icon:"f", label:"Facebook" },{ icon:"in", label:"LinkedIn" },{ icon:"tw", label:"Twitter" },{ icon:"yt", label:"YouTube" }].map((s) => (
                <button key={s.label} aria-label={s.label}
                  style={{ width:32, height:32, borderRadius:"50%", background:"rgba(255,255,255,0.06)", border:"1px solid rgba(255,255,255,0.1)", color:"rgba(255,255,255,0.40)", fontSize:9, fontWeight:800, textTransform:"uppercase", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", transition:"all 0.2s" }}
                  onMouseEnter={(e) => { e.currentTarget.style.background="rgba(192,20,92,0.2)"; e.currentTarget.style.color="#f472b6"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background="rgba(255,255,255,0.06)"; e.currentTarget.style.color="rgba(255,255,255,0.40)"; }}
                >{s.icon}</button>
              ))}
            </div>
          </div>
        </div>

        {/* ── Body ── */}
        <div className="ftr-body">

          {/* COL 1 — About + hospital directory */}
          <div className="ftr-col">
            <p style={{ fontSize:13, color:"rgba(255,255,255,0.40)", lineHeight:1.8, marginBottom:20 }}>
              Technology-driven healing ecosystem. Pioneers in robotic orthopaedic surgery in South India — 9 hospitals across Telangana &amp; Andhra Pradesh.
            </p>

            <div style={{ background:"rgba(255,255,255,0.04)", border:"1px solid rgba(192,20,92,0.18)", borderRadius:14, overflow:"hidden" }}>
              {/* Widget header */}
              <div style={{ padding:"9px 14px", borderBottom:"1px solid rgba(255,255,255,0.06)", display:"flex", alignItems:"center", gap:7 }}>
                <span style={{ fontSize:11 }}>📍</span>
                <span style={{ fontSize:8, fontWeight:800, letterSpacing:"0.22em", textTransform:"uppercase", color:"rgba(255,255,255,0.38)" }}>Hospital Directory</span>
              </div>

              {/* Branch tab chips — scrollable on mobile */}
              <div className="ftr-branches">
                {HOSPITAL_BRANCHES.map((b) => (
                  <button key={b.id} onClick={() => setActiveBranch(b.id)}
                    style={{ fontSize:8, fontWeight:800, letterSpacing:"0.1em", textTransform:"uppercase", padding:"5px 9px", borderRadius:6, border:"none", cursor:"pointer", flexShrink:0, transition:"all 0.18s",
                      background: activeBranch === b.id ? "#C0145C" : "rgba(255,255,255,0.06)",
                      color:      activeBranch === b.id ? "#fff"    : "rgba(255,255,255,0.40)",
                    }}
                  >{b.id}</button>
                ))}
              </div>

              {/* Branch detail */}
              <div style={{ padding:"13px 14px 15px" }}>
                <div style={{ fontSize:13, fontWeight:700, color:"#fff", marginBottom:5 }}>{branch.name}</div>
                <div style={{ display:"flex", gap:6, marginBottom:11 }}>
                  <span style={{ fontSize:10, opacity:0.45, flexShrink:0, marginTop:1 }}>📍</span>
                  <span style={{ fontSize:11, color:"rgba(255,255,255,0.42)", lineHeight:1.5 }}>{branch.address}</span>
                </div>
                <a href={`tel:${branch.phone}`}
                  style={{ display:"inline-flex", alignItems:"center", gap:7, fontSize:13, fontWeight:800, color:"#C0145C", textDecoration:"none", transition:"color 0.2s" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color="#f472b6")}
                  onMouseLeave={(e) => (e.currentTarget.style.color="#C0145C")}
                >
                  <span style={{ width:24, height:24, borderRadius:"50%", background:"rgba(192,20,92,0.14)", display:"inline-flex", alignItems:"center", justifyContent:"center", fontSize:10 }}>📞</span>
                  {branch.phone}
                </a>
              </div>
            </div>
          </div>

          {/* COL 2 — Departments */}
          <div className="ftr-col">
            <h4 style={{ fontSize:9, fontWeight:800, letterSpacing:"0.3em", textTransform:"uppercase", color:"#C0145C", marginBottom:16 }}>Our Specialties</h4>
            <div className="ftr-dept-grid">
              {ALL_DEPTS.map((d) => (
                <Link key={d} href={`/departments/${d.toLowerCase().replace(/\s+/g,"-").replace(/&/g,"")}`} className="ftr-dept-link">{d}</Link>
              ))}
            </div>
            <Link href="/departments"
              style={{ display:"inline-flex", alignItems:"center", gap:5, marginTop:16, fontSize:10, fontWeight:800, letterSpacing:"0.12em", textTransform:"uppercase", color:"#4A6FA5", textDecoration:"none", transition:"color 0.2s" }}
              onMouseEnter={(e) => (e.currentTarget.style.color="#f472b6")}
              onMouseLeave={(e) => (e.currentTarget.style.color="#4A6FA5")}
            >View All 42 Departments →</Link>
          </div>

          {/* COL 3 — Quick actions */}
          <div className="ftr-col ftr-col-qa">
            <div className="ftr-qa-inner">
              {/* Quick actions list */}
              <div>
                <h4 style={{ fontSize:9, fontWeight:800, letterSpacing:"0.3em", textTransform:"uppercase", color:"#C0145C", marginBottom:14 }}>Quick Access</h4>
                <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
                  {QUICK_ACTIONS.map((a) => (
                    <Link key={a.label} href={a.href} className="ftr-qa"
                      style={{ border:`1px solid ${a.accent ? "rgba(192,20,92,0.35)" : "rgba(255,255,255,0.08)"}`, background: a.accent ? "linear-gradient(135deg,rgba(192,20,92,0.15),rgba(192,20,92,0.05))" : "rgba(255,255,255,0.03)" }}
                    >
                      <div style={{ display:"flex", alignItems:"center", gap:9 }}>
                        <span style={{ fontSize:14 }}>{a.icon}</span>
                        <span style={{ fontSize:12, fontWeight:700, color: a.accent ? "#f472b6" : "rgba(255,255,255,0.72)" }}>{a.label}</span>
                      </div>
                      <span style={{ fontSize:13, color: a.accent ? "#C0145C" : "rgba(255,255,255,0.22)" }}>↗</span>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Emergency number box */}
              <div className="ftr-emergency-box" style={{ marginTop:16, padding:"14px 16px", borderRadius:12, background:"rgba(192,20,92,0.08)", border:"1px solid rgba(192,20,92,0.2)" }}>
                <div style={{ fontSize:8, fontWeight:800, letterSpacing:"0.22em", textTransform:"uppercase", color:"rgba(255,255,255,0.30)", marginBottom:7 }}>24/7 Emergency Helpline</div>
                <a href="tel:1800-123-4567" style={{ fontSize:16, fontWeight:900, color:"#C0145C", textDecoration:"none", display:"flex", alignItems:"center", gap:8 }}>
                  <span style={{ width:8, height:8, borderRadius:"50%", background:"#C0145C", animation:"footerPulse 1.5s infinite", flexShrink:0 }} />
                  1800-123-4567
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* ── Marquee ── */}
        <div style={{ borderTop:"1px solid rgba(255,255,255,0.05)", borderBottom:"1px solid rgba(255,255,255,0.05)", padding:"9px 0", overflow:"hidden", background:"rgba(255,255,255,0.02)" }}>
          <div className="ftr-marquee-track">
            {[...Array(2)].map((_,ri) =>
              ["CARDIOLOGY","ORTHOPEDICS","NEUROLOGY","GASTROENTEROLOGY","UROLOGY","ONCOLOGY","EMERGENCY","ROBOTIC SURGERY","PULMONOLOGY","NEPHROLOGY"].map((d) => (
                <span key={`${ri}-${d}`} style={{ display:"inline-flex", alignItems:"center", gap:12, marginRight:32, fontSize:9, fontWeight:800, letterSpacing:"0.24em", color:"rgba(255,255,255,0.18)", whiteSpace:"nowrap", textTransform:"uppercase" }}>
                  {d}
                  <span style={{ width:3, height:3, borderRadius:"50%", background:"#C0145C", opacity:0.5, flexShrink:0 }} />
                </span>
              ))
            )}
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div style={{ borderTop:"1px solid rgba(255,255,255,0.04)" }}>
          <div className="ftr-bottom">
            <p style={{ fontSize:10, color:"rgba(255,255,255,0.20)", letterSpacing:"0.03em" }}>
              © {new Date().getFullYear()} Srikara Hospitals. All rights reserved. · NABH · ISO 9001:2015
            </p>
            <div className="ftr-legal">
              {["Privacy Policy","Terms of Service","Sitemap","Cookies"].map((l) => (
                <Link key={l} href="#"
                  style={{ fontSize:10, color:"rgba(255,255,255,0.20)", textDecoration:"none", letterSpacing:"0.05em", transition:"color 0.2s", whiteSpace:"nowrap" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color="rgba(255,255,255,0.65)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color="rgba(255,255,255,0.20)")}
                >{l}</Link>
              ))}
            </div>
            <p style={{ fontSize:9, color:"rgba(255,255,255,0.12)", letterSpacing:"0.08em" }}>CRAFTING WELLNESS</p>
          </div>
        </div>

      </footer>
    </>
  );
}