"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

// ─── DATA ─────────────────────────────────────────────────────────────────────

const NAV = [
  { label: "Home", href: "#" },
  { label: "Doctors", href: "#doctors" },
  { label: "Departments", href: "#specialities" },
];

const STATS = [
  { value: "15", unit: "yrs", label: "Serving the city" },
  { value: "38", unit: "+", label: "Specialist doctors" },
  { value: "50k", unit: "+", label: "Lives touched" },
  { value: "24", unit: "/7", label: "Emergency care" },
];

const SPECIALITIES = [
  { icon: "♥", name: "Cardiology", tag: "01", desc: "Advanced cardiac diagnostics and interventional procedures including cath lab and echocardiography." },
  { icon: "◈", name: "Orthopaedics", tag: "02", desc: "Joint replacement, arthroscopy, fracture care and complete musculoskeletal rehabilitation." },
  { icon: "⬡", name: "Neurology", tag: "03", desc: "Comprehensive neurological care from stroke management to complex movement disorders." },
  { icon: "◎", name: "Oncology", tag: "04", desc: "Multidisciplinary cancer care with chemotherapy, immunotherapy and precision treatment." },
  { icon: "✦", name: "Paediatrics", tag: "05", desc: "Neonatal ICU through adolescent health — gentle, child-first care at every stage." },
  { icon: "◉", name: "Gynaecology", tag: "06", desc: "Women's health, high-risk obstetrics, laparoscopic surgery and fertility services." },
];

const DOCTORS = [
  { name: "Dr. Rajesh Kumar Sharma", role: "Interventional Cardiologist", exp: "18", qual: "MD, DM · AIIMS New Delhi", avail: "Mon–Sat  10am–2pm", tone: "#0F1E35" },
  { name: "Dr. Priya Venkataraman", role: "Gynaecologist & Obstetrician", exp: "14", qual: "MS (OBG) · Osmania Medical College", avail: "Mon–Fri  9am–1pm", tone: "#8A1A52" },
  { name: "Dr. Suresh Anand Reddy", role: "Orthopaedic Surgeon", exp: "22", qual: "MS Ortho · Fellowship Germany", avail: "Tue Thu Sat  11am–3pm", tone: "#1B2A4A" },
  { name: "Dr. Anitha Krishnamurthy", role: "Neurologist", exp: "11", qual: "DM Neurology · Nizam's Institute", avail: "Mon Wed Fri  4pm–7pm", tone: "#6B1045" },
];

const TESTIMONIALS = [
  { quote: "The cardiac team here gave me my life back. Dr. Sharma and his colleagues treated me with extraordinary precision and even more extraordinary warmth.", name: "Ravi Teja Goud", place: "Musheerabad" },
  { quote: "From my first prenatal visit to delivery, the care I received was unlike anything I'd known. Dr. Priya made every step feel safe and beautiful.", name: "Sunitha Reddy", place: "Begumpet" },
  { quote: "Six years of knee pain ended in a single surgery. The rehab team kept me going. I walked out of this hospital feeling decades younger.", name: "Krishna Murthy", place: "RTC X Roads" },
];

const BRANCHES = [
  "RTC X Roads",
  "Miyapur",
  "Lakdikapul",
  "Kompally",
  "Vijayawada",
  "Peerzadiguda",
  "Rajahmundry",
  "ECIL",
  "LB Nagar",
];

// ─── REVEAL HOOK ──────────────────────────────────────────────────────────────

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setOn(true); io.unobserve(el); } }, { threshold: 0.08 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return { ref, on };
}

function R({ children, d = 0, cls = "" }: { children: React.ReactNode; d?: number; cls?: string }) {
  const { ref, on } = useReveal();
  return (
    <div ref={ref} style={{ transitionDelay: `${d}ms` }}
      className={`transition-all duration-[900ms] ease-out ${on ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"} ${cls}`}>
      {children}
    </div>
  );
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────

export default function RTCPage({ hospital }: { hospital: any }) {
  const [scrollY, setScrollY] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeTest, setActiveTest] = useState(0);
  const [form, setForm] = useState({ name: "", phone: "", dept: "", date: "" });
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const fn = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    const t = setInterval(() => setActiveTest(p => (p + 1) % TESTIMONIALS.length), 5000);
    return () => clearInterval(t);
  }, []);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 3500);
  };

  const navBg = scrollY > 60;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,200;0,9..144,400;0,9..144,600;1,9..144,200;1,9..144,400&family=Outfit:wght@300;400;500;600&display=swap');

        :root {
          --ink:     #0F1621;
          --navy:    #1B2A4A;
          --deep-n:  #0F1E35;
          --magenta: #B8246E;
          --deep-m:  #8A1A52;
          --gold:    #C4922B;
          --light-n: #2E4A7A;
          --light-m: #D4408A;
          --cream:   #FAF7F5;
          --warm:    #F3EEF0;
          --parch:   #EDE0E8;
          --mist:    #D5C8D2;
          --white:   #FDFBFC;
        }

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; font-size: 16px; }
        body { font-family: 'Outfit', sans-serif; background: var(--cream); color: var(--ink); overflow-x: hidden; cursor: none; }

        .cursor { position: fixed; pointer-events: none; z-index: 9999; mix-blend-mode: multiply; }
        .cursor-dot { width: 8px; height: 8px; background: var(--magenta); border-radius: 50%; transform: translate(-50%, -50%); transition: transform .1s; }
        .cursor-ring { width: 36px; height: 36px; border: 1.5px solid var(--magenta); border-radius: 50%; transform: translate(-50%, -50%); transition: all .15s ease; opacity: .5; }

        .serif { font-family: 'Fraunces', serif; }

        @keyframes fadeUp   { from { opacity:0; transform:translateY(40px); } to { opacity:1; transform:translateY(0); } }
        @keyframes fadeIn   { from { opacity:0; } to { opacity:1; } }
        @keyframes spin     { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes marquee  { from { transform:translateX(0); } to { transform:translateX(-50%); } }
        @keyframes breathe  { 0%,100% { transform:scale(1); } 50% { transform:scale(1.04); } }
        @keyframes slideIn  { from { transform:translateX(100%); opacity:0; } to { transform:translateX(0); opacity:1; } }

        .h-a1 { animation: fadeUp .9s ease .1s both; }
        .h-a2 { animation: fadeUp .9s ease .3s both; }
        .h-a3 { animation: fadeUp .9s ease .5s both; }
        .h-a4 { animation: fadeUp .9s ease .7s both; }
        .h-a5 { animation: fadeUp .9s ease .9s both; }

        body::before {
          content: '';
          position: fixed; inset: 0; z-index: 0; pointer-events: none;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
          opacity: .35;
        }

        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: var(--warm); }
        ::-webkit-scrollbar-thumb { background: var(--magenta); border-radius: 2px; }

        @media (max-width: 768px) {
          body { cursor: auto; }
          .cursor { display: none; }
          .desk { display: none !important; }
          .mob-show { display: flex !important; }
          .hero-cols { flex-direction: column !important; }
          .why-cols { flex-direction: column !important; }
          .spec-grid { grid-template-columns: 1fr !important; }
          .doc-grid  { grid-template-columns: 1fr !important; }
          .stat-row  { flex-wrap: wrap !important; gap: 2rem !important; }
          .contact-cols { flex-direction: column !important; }
          .footer-cols { flex-direction: column !important; }
          .pad { padding: 4rem 1.5rem !important; }
          .nav-inner { padding: 0 1.5rem !important; }
          .watermark { display: none !important; }
          .hero-title { font-size: clamp(3rem,10vw,5rem) !important; }
          .appt-cols { flex-direction: column !important; }
        }
      `}</style>

      <CursorTrail />

      {/* ── NAV ── */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 500,
        transition: "all .4s ease",
        background: navBg ? "rgba(250,246,240,0.97)" : "transparent",
        backdropFilter: navBg ? "blur(16px)" : "none",
        borderBottom: navBg ? "1px solid rgba(184,36,110,0.15)" : "1px solid transparent",
        boxShadow: navBg ? "0 2px 40px rgba(15,22,33,0.08)" : "none",
      }}>
        <div className="nav-inner" style={{ maxWidth: 1400, margin: "0 auto", padding: "0 3rem", height: 72, display: "flex", alignItems: "center", justifyContent: "space-between" }}>

          {/* Logo */}
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: 12, textDecoration: "none" }}>
            <div style={{ width: 44, height: 44, borderRadius: "50%", background: "linear-gradient(135deg, var(--magenta) 0%, var(--light-n) 100%)", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", flexShrink: 0 }}>
              <span style={{ color: "#fff", fontSize: "1.1rem", fontFamily: "'Fraunces',serif", fontWeight: 600, fontStyle: "italic" }}>S</span>
              <div style={{ position: "absolute", inset: -3, borderRadius: "50%", border: "1px dashed rgba(184,36,110,0.4)", animation: "spin 20s linear infinite" }} />
            </div>
            <div>
              <p style={{ fontFamily: "'Fraunces',serif", fontSize: "1rem", fontWeight: 600, color: "var(--magenta)", lineHeight: 1.1 }}>Srikara Hospital</p>
              <p style={{ fontSize: "0.6rem", color: "var(--light-n)", letterSpacing: "0.18em", textTransform: "uppercase" }}>RTC X Roads · Hyderabad</p>
            </div>
          </Link>

          {/* Desktop Links */}
          <div className="desk" style={{ display: "flex", alignItems: "center", gap: "2.5rem" }}>
            {NAV.map(l => (
              <Link key={l.href} href={l.href} style={{ fontSize: "0.78rem", color: "var(--ink)", letterSpacing: "0.1em", textTransform: "uppercase", textDecoration: "none", opacity: 0.7, transition: "opacity .2s" }}
                onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.opacity = "1"}
                onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.opacity = "0.7"}>
                {l.label}
              </Link>
            ))}
            <Link href="#appointment" style={{ background: "var(--magenta)", color: "#fff", padding: "0.55rem 1.4rem", borderRadius: 2, fontSize: "0.78rem", letterSpacing: "0.1em", textTransform: "uppercase", textDecoration: "none", transition: "background .2s" }}
              onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.background = "var(--light-n)"}
              onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.background = "var(--magenta)"}>
              Book Now
            </Link>
          </div>

          {/* Mobile toggle */}
          <button className="mob-show" style={{ display: "none", background: "none", border: "none", cursor: "pointer", flexDirection: "column", gap: 5 }} onClick={() => setMenuOpen(!menuOpen)}>
            {[0, 1, 2].map(i => <span key={i} style={{ width: 24, height: 1.5, background: "var(--magenta)", display: "block", transition: "all .3s", transform: menuOpen && i === 0 ? "rotate(45deg) translateY(6px)" : menuOpen && i === 2 ? "rotate(-45deg) translateY(-6px)" : menuOpen && i === 1 ? "scaleX(0)" : "none" }} />)}
          </button>
        </div>

        {menuOpen && (
          <div style={{ background: "var(--white)", borderTop: "1px solid var(--warm)", padding: "1.5rem", display: "flex", flexDirection: "column", gap: "1.2rem", animation: "slideIn .25s ease" }}>
            {NAV.map(l => (
              <Link key={l.href} href={l.href} onClick={() => setMenuOpen(false)} style={{ fontSize: "0.9rem", color: "var(--ink)", textDecoration: "none", letterSpacing: "0.08em", textTransform: "uppercase", paddingBottom: "0.8rem", borderBottom: "1px solid var(--warm)" }}>{l.label}</Link>
            ))}
            <Link href="#appointment" onClick={() => setMenuOpen(false)} style={{ background: "var(--magenta)", color: "#fff", padding: "0.8rem 1.5rem", textAlign: "center", textDecoration: "none", letterSpacing: "0.1em", textTransform: "uppercase", fontSize: "0.82rem" }}>Book Appointment</Link>
          </div>
        )}
      </nav>

      {/* ── HERO ── */}
      <section style={{ minHeight: "100vh", background: "linear-gradient(145deg, var(--deep-n) 0%, #0A0F1A 45%, var(--deep-m) 100%)", position: "relative", overflow: "hidden", display: "flex", alignItems: "center" }}>

        {/* Big watermark */}
        <div className="watermark" style={{ position: "absolute", right: -60, top: "50%", transform: "translateY(-50%) rotate(90deg)", fontFamily: "'Fraunces',serif", fontSize: "22vw", fontWeight: 200, color: "rgba(250,246,240,0.03)", lineHeight: 1, whiteSpace: "nowrap", pointerEvents: "none", letterSpacing: "0.1em", userSelect: "none" }}>
          SRIKARA
        </div>

        {/* Decorative circles — brand accent */}
        <div style={{ position: "absolute", right: "8%", top: "50%", transform: "translateY(-50%)", width: "42vw", height: "42vw", borderRadius: "50%", border: "1px solid rgba(184,36,110,0.2)", animation: "breathe 8s ease-in-out infinite" }} />
        <div style={{ position: "absolute", right: "12%", top: "50%", transform: "translateY(-50%)", width: "34vw", height: "34vw", borderRadius: "50%", border: "1px solid rgba(27,42,74,0.18)" }} />

        {/* Content */}
        <div style={{ position: "relative", zIndex: 2, width: "100%", maxWidth: 1400, margin: "0 auto", padding: "8rem 3rem 5rem", display: "flex", alignItems: "center", gap: "5rem" }} className="hero-cols">

          {/* Left */}
          <div style={{ flex: "0 0 55%" }}>
            <div className="h-a1" style={{ display: "inline-flex", alignItems: "center", gap: 10, marginBottom: "2rem" }}>
              <div style={{ width: 32, height: 1, background: "var(--magenta)" }} />
              <span style={{ fontSize: "0.68rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "var(--magenta)" }}>RTC X Roads, Hyderabad</span>
            </div>

            <h1 className="h-a2 hero-title serif" style={{ fontSize: "clamp(3.5rem,6vw,6rem)", fontWeight: 200, color: "var(--parch)", lineHeight: 1.05, marginBottom: "2rem" }}>
              Where healing<br />
              meets <em style={{ fontStyle: "italic", color: "#A8C0E0" }}>heart.</em>
            </h1>

            <p className="h-a3" style={{ fontSize: "1rem", color: "rgba(237,224,204,0.65)", lineHeight: 1.8, maxWidth: 460, marginBottom: "3rem" }}>
              A multi-specialty centre born from one conviction — that every patient deserves care as individual as they are. Serving Musheerabad since 2008.
            </p>

            <div className="h-a4" style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
              <Link href="#appointment" style={{ display: "inline-flex", alignItems: "center", gap: 10, background: "var(--magenta)", color: "#fff", padding: "0.9rem 2.2rem", textDecoration: "none", fontSize: "0.82rem", letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 600, transition: "all .3s" }}
                onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = "var(--light-n)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = "var(--magenta)"; }}>
                <span>→</span> Book Appointment
              </Link>
              <a href="tel:040-2765-4321" style={{ display: "inline-flex", alignItems: "center", gap: 10, border: "1px solid rgba(237,224,204,0.25)", color: "var(--parch)", padding: "0.9rem 2.2rem", textDecoration: "none", fontSize: "0.82rem", letterSpacing: "0.1em", textTransform: "uppercase", transition: "border-color .3s" }}
                onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.borderColor = "var(--magenta)"}
                onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(237,224,204,0.25)"}>
                🚨 040-2765-4321
              </a>
            </div>

            {/* Stats row */}
            <div className="h-a5 stat-row" style={{ display: "flex", gap: "3rem", marginTop: "4rem", paddingTop: "2.5rem", borderTop: "1px solid rgba(237,224,204,0.1)" }}>
              {STATS.map(s => (
                <div key={s.label}>
                  <p className="serif" style={{ fontSize: "2.2rem", fontWeight: 400, color: "var(--parch)", lineHeight: 1 }}>
                    {s.value}<span style={{ fontSize: "1.2rem", color: "var(--magenta)" }}>{s.unit}</span>
                  </p>
                  <p style={{ fontSize: "0.7rem", color: "rgba(237,224,204,0.45)", letterSpacing: "0.12em", textTransform: "uppercase", marginTop: 4 }}>{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right – Info card stack */}
          <div className="h-a3 desk" style={{ flex: 1, display: "flex", flexDirection: "column", gap: "1rem" }}>
            <div style={{ background: "rgba(250,246,240,0.06)", border: "1px solid rgba(184,36,110,0.25)", borderRadius: 4, padding: "2rem", backdropFilter: "blur(12px)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: "1.5rem" }}>
                <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#5ECA7A", display: "block", boxShadow: "0 0 0 4px rgba(94,202,122,0.2)", animation: "breathe 2s ease-in-out infinite" }} />
                <span style={{ fontSize: "0.72rem", color: "rgba(237,224,204,0.7)", letterSpacing: "0.12em", textTransform: "uppercase" }}>Emergency Active — 24/7</span>
              </div>
              <p className="serif" style={{ fontSize: "1.5rem", fontWeight: 400, color: "var(--parch)", marginBottom: "0.5rem" }}>040-2765-4321</p>
              <p style={{ fontSize: "0.78rem", color: "rgba(237,224,204,0.45)", lineHeight: 1.6 }}>Plot 12, RTC X Roads, Musheerabad,<br />Hyderabad – 500020</p>
            </div>

            <div style={{ display: "flex", gap: "0.6rem", flexWrap: "wrap" }}>
              {["NABH Accredited", "ISO 9001:2015", "100+ Insurance Partners", "NABL Lab"].map(t => (
                <span key={t} style={{ fontSize: "0.65rem", letterSpacing: "0.1em", textTransform: "uppercase", border: "1px solid rgba(196,146,43,0.4)", color: "var(--magenta)", padding: "0.3rem 0.8rem", borderRadius: 1 }}>{t}</span>
              ))}
            </div>

            <div style={{ background: "rgba(184,36,110,0.2)", border: "1px solid rgba(184,36,110,0.3)", padding: "1.2rem", borderRadius: 4 }}>
              <p style={{ fontSize: "0.65rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--magenta)", marginBottom: "0.6rem" }}>OPD Hours</p>
              <p style={{ fontFamily: "'Fraunces',serif", fontSize: "1.1rem", fontWeight: 400, color: "var(--parch)" }}>Mon – Sat &nbsp;·&nbsp; 8:00 AM – 8:00 PM</p>
            </div>
          </div>
        </div>

        {/* Curved bottom divider */}
        <div style={{ position: "absolute", bottom: -1, left: 0, right: 0 }}>
          <svg viewBox="0 0 1440 80" style={{ width: "100%", display: "block" }} preserveAspectRatio="none">
            <path d="M0,80 C360,0 1080,60 1440,10 L1440,80 Z" fill="var(--cream)" />
          </svg>
        </div>
      </section>

      {/* ── INTRO STRIP ── */}
      <section style={{ background: "var(--cream)", padding: "1.5rem 3rem", overflow: "hidden", whiteSpace: "nowrap", borderBottom: "1px solid var(--mist)" }}>
        <div style={{ display: "inline-flex", gap: "4rem", animation: "marquee 35s linear infinite" }}>
          {Array(3).fill(["Advanced Cardiac Care", "Laparoscopic Surgery", "Neonatal ICU", "Digital Pathology", "Joint Replacement", "Robotic Surgery", "24/7 Trauma", "NABH Certified", "Blood Bank", "Dialysis Unit"]).flat().map((t, i) => (
            <span key={i} style={{ display: "inline-flex", alignItems: "center", gap: "1.2rem", fontSize: "0.72rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--light-n)" }}>
              <span style={{ width: 4, height: 4, borderRadius: "50%", background: "var(--magenta)", display: "block", flexShrink: 0 }} />{t}
            </span>
          ))}
        </div>
      </section>

      {/* ── SPECIALITIES ── */}
      <section id="specialities" className="pad" style={{ background: "var(--cream)", padding: "7rem 3rem" }}>
        <div style={{ maxWidth: 1400, margin: "0 auto" }}>
          <R>
            <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: "4rem", flexWrap: "wrap", gap: "2rem" }}>
              <div>
                <span style={{ fontSize: "0.65rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--magenta)", display: "block", marginBottom: "1rem" }}>What we treat</span>
                <h2 className="serif" style={{ fontSize: "clamp(2.5rem,4vw,4rem)", fontWeight: 200, color: "var(--navy)", lineHeight: 1.1 }}>
                  Departments built<br /><em style={{ fontStyle: "italic" }}>around you.</em>
                </h2>
              </div>
              <Link href="#" style={{ fontSize: "0.75rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--light-n)", textDecoration: "none", borderBottom: "1px solid var(--light-n)", paddingBottom: 2, transition: "color .2s" }}>All Departments →</Link>
            </div>
          </R>

          <div className="spec-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1px", background: "var(--mist)" }}>
            {SPECIALITIES.map((s, i) => (
              <R key={s.name} d={i * 60}>
                <div style={{ background: "var(--cream)", padding: "2.5rem 2rem", transition: "background .3s", cursor: "pointer", position: "relative", overflow: "hidden" }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLDivElement).style.background = "linear-gradient(135deg, var(--navy), var(--deep-m))";
                    (e.currentTarget as HTMLDivElement).querySelectorAll("[data-text]").forEach(el => ((el as HTMLElement).style.color = "var(--parch)"));
                    (e.currentTarget as HTMLDivElement).querySelectorAll("[data-sub]").forEach(el => ((el as HTMLElement).style.color = "rgba(237,224,204,0.55)"));
                    (e.currentTarget as HTMLDivElement).querySelectorAll("[data-tag]").forEach(el => ((el as HTMLElement).style.color = "var(--magenta)"));
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLDivElement).style.background = "var(--cream)";
                    (e.currentTarget as HTMLDivElement).querySelectorAll("[data-text]").forEach(el => ((el as HTMLElement).style.color = ""));
                    (e.currentTarget as HTMLDivElement).querySelectorAll("[data-sub]").forEach(el => ((el as HTMLElement).style.color = ""));
                    (e.currentTarget as HTMLDivElement).querySelectorAll("[data-tag]").forEach(el => ((el as HTMLElement).style.color = ""));
                  }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "2rem" }}>
                    <span data-tag style={{ fontSize: "0.6rem", letterSpacing: "0.2em", color: "var(--mist)", textTransform: "uppercase", transition: "color .3s" }}>{s.tag}</span>
                    <span style={{ fontSize: "1.8rem", lineHeight: 1, color: "var(--magenta)", transition: "color .3s" }}>{s.icon}</span>
                  </div>
                  <h3 data-text className="serif" style={{ fontSize: "1.5rem", fontWeight: 400, color: "var(--navy)", marginBottom: "0.8rem", transition: "color .3s" }}>{s.name}</h3>
                  <p data-sub style={{ fontSize: "0.82rem", color: "var(--light-n)", lineHeight: 1.7, transition: "color .3s" }}>{s.desc}</p>
                </div>
              </R>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY US — asymmetric ── */}
      <section style={{ background: "var(--parch)", overflow: "hidden" }}>
        <div className="why-cols" style={{ maxWidth: 1400, margin: "0 auto", display: "flex", minHeight: 600 }}>

          {/* Left */}
          <div className="pad" style={{ flex: "0 0 45%", padding: "7rem 3rem", background: "linear-gradient(160deg, var(--navy) 0%, #0A0F1A 50%, var(--deep-m) 100%)", position: "relative", overflow: "hidden" }}>
            <div className="watermark" style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", fontFamily: "'Fraunces',serif", fontSize: "18rem", fontWeight: 200, color: "rgba(250,246,240,0.03)", lineHeight: 1, pointerEvents: "none", whiteSpace: "nowrap" }}>15</div>
            <R>
              <span style={{ fontSize: "0.65rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--magenta)", display: "block", marginBottom: "1.5rem" }}>Why Srikara</span>
              <h2 className="serif" style={{ fontSize: "clamp(2.2rem,3.5vw,3.5rem)", fontWeight: 200, color: "var(--parch)", lineHeight: 1.15, marginBottom: "2rem" }}>
                Trust built<br />over <em style={{ fontStyle: "italic", color: "#A8C0E0" }}>fifteen years.</em>
              </h2>
              <p style={{ fontSize: "0.92rem", color: "rgba(237,224,204,0.6)", lineHeight: 1.8, maxWidth: 380, marginBottom: "3rem" }}>
                We believe in medicine that sees the person first and the condition second. Every process, every protocol here is built around that single truth.
              </p>
            </R>
            <R d={150}>
              <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                {[
                  { n: "01", t: "38 Board-Certified Specialists", d: "International fellowships, decades of combined expertise." },
                  { n: "02", t: "3-Tesla MRI & 128-Slice CT", d: "Precision diagnostics that guide every clinical decision." },
                  { n: "03", t: "Transparent, Honest Pricing", d: "No hidden charges. No surprises. Ever." },
                ].map(w => (
                  <div key={w.n} style={{ display: "flex", gap: "1.2rem", alignItems: "flex-start" }}>
                    <span className="serif" style={{ fontSize: "1.8rem", fontWeight: 200, color: "rgba(184,36,110,0.5)", lineHeight: 1, flexShrink: 0, width: 36 }}>{w.n}</span>
                    <div>
                      <p style={{ fontSize: "0.88rem", fontWeight: 600, color: "var(--parch)", marginBottom: "0.3rem" }}>{w.t}</p>
                      <p style={{ fontSize: "0.78rem", color: "rgba(237,224,204,0.45)", lineHeight: 1.6 }}>{w.d}</p>
                    </div>
                  </div>
                ))}
              </div>
            </R>
          </div>

          {/* Right — Testimonial carousel */}
          <div className="pad" style={{ flex: 1, padding: "7rem 3rem", display: "flex", flexDirection: "column", justifyContent: "center", position: "relative" }}>
            <R>
              <span style={{ fontSize: "0.65rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--magenta)", display: "block", marginBottom: "1.5rem" }}>Patient voices</span>

              <div style={{ position: "relative", minHeight: 240 }}>
                {TESTIMONIALS.map((t, i) => (
                  <div key={i} style={{ position: i === activeTest ? "relative" : "absolute", top: 0, left: 0, right: 0, opacity: i === activeTest ? 1 : 0, transform: i === activeTest ? "none" : "translateY(10px)", transition: "all .6s ease", pointerEvents: i === activeTest ? "auto" : "none" }}>
                    <div style={{ fontSize: "4rem", color: "var(--magenta)", lineHeight: 1, marginBottom: "1rem", fontFamily: "'Fraunces',serif", opacity: 0.25 }}>"</div>
                    <p className="serif" style={{ fontSize: "clamp(1.1rem,2vw,1.4rem)", fontWeight: 300, color: "var(--navy)", lineHeight: 1.6, fontStyle: "italic", marginBottom: "2rem" }}>
                      {t.quote}
                    </p>
                    <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                      <div style={{ width: 40, height: 40, borderRadius: "50%", background: "linear-gradient(135deg, var(--magenta), var(--light-n))", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <span style={{ fontSize: "0.7rem", fontFamily: "'Fraunces',serif", color: "#fff", fontWeight: 600 }}>{t.name[0]}</span>
                      </div>
                      <div>
                        <p style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--navy)" }}>{t.name}</p>
                        <p style={{ fontSize: "0.72rem", color: "var(--light-n)" }}>{t.place}, Hyderabad</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ display: "flex", gap: "0.5rem", marginTop: "2rem" }}>
                {TESTIMONIALS.map((_, i) => (
                  <button key={i} onClick={() => setActiveTest(i)} style={{ width: i === activeTest ? 28 : 8, height: 3, background: i === activeTest ? "var(--magenta)" : "var(--mist)", border: "none", cursor: "pointer", transition: "all .3s", borderRadius: 2, padding: 0 }} />
                ))}
              </div>
            </R>
          </div>
        </div>
      </section>

      {/* ── DOCTORS ── */}
      <section id="doctors" className="pad" style={{ background: "var(--cream)", padding: "7rem 3rem" }}>
        <div style={{ maxWidth: 1400, margin: "0 auto" }}>
          <R>
            <div style={{ marginBottom: "4rem" }}>
              <span style={{ fontSize: "0.65rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--magenta)", display: "block", marginBottom: "1rem" }}>Our physicians</span>
              <h2 className="serif" style={{ fontSize: "clamp(2.5rem,4vw,4rem)", fontWeight: 200, color: "var(--navy)", lineHeight: 1.1 }}>
                Specialists who<br /><em style={{ fontStyle: "italic" }}>listen first.</em>
              </h2>
            </div>
          </R>

          <div className="doc-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1px", background: "var(--mist)" }}>
            {DOCTORS.map((d, i) => (
              <R key={d.name} d={i * 80}>
                <div style={{ background: "var(--white)", padding: 0, overflow: "hidden", transition: "all .3s", cursor: "pointer" }}
                  onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.transform = "translateY(-4px)"}
                  onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.transform = ""}>
                  <div style={{ height: 180, background: d.tone, display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "1.2rem", position: "relative" }}>
                    <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-55%)", fontSize: "5rem" }}>
                      {i % 2 === 0 ? "👨‍⚕️" : "👩‍⚕️"}
                    </div>
                    <span style={{ background: "rgba(250,246,240,0.15)", color: "#fff", fontSize: "0.65rem", letterSpacing: "0.12em", textTransform: "uppercase", padding: "0.3rem 0.7rem", borderRadius: 1, width: "fit-content", backdropFilter: "blur(8px)" }}>{d.exp} yrs experience</span>
                  </div>
                  <div style={{ padding: "1.5rem" }}>
                    <p className="serif" style={{ fontSize: "1.05rem", fontWeight: 600, color: "var(--navy)", marginBottom: "0.3rem" }}>{d.name}</p>
                    <p style={{ fontSize: "0.75rem", color: "var(--magenta)", fontWeight: 500, marginBottom: "0.5rem", letterSpacing: "0.04em" }}>{d.role}</p>
                    <p style={{ fontSize: "0.72rem", color: "var(--light-n)", marginBottom: "1rem", lineHeight: 1.5 }}>{d.qual}</p>
                    <div style={{ paddingTop: "0.8rem", borderTop: "1px solid var(--warm)", fontSize: "0.7rem", color: "var(--ink)", opacity: 0.5 }}>
                      <span style={{ letterSpacing: "0.08em" }}>{d.avail}</span>
                    </div>
                  </div>
                </div>
              </R>
            ))}
          </div>

          <R d={200}>
            <div style={{ textAlign: "center", marginTop: "2.5rem" }}>
              <Link href="#" style={{ display: "inline-flex", alignItems: "center", gap: 10, border: "1px solid var(--magenta)", color: "var(--magenta)", padding: "0.8rem 2rem", textDecoration: "none", fontSize: "0.78rem", letterSpacing: "0.12em", textTransform: "uppercase", transition: "all .3s" }}
                onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = "var(--magenta)"; (e.currentTarget as HTMLAnchorElement).style.color = "#fff"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = ""; (e.currentTarget as HTMLAnchorElement).style.color = "var(--magenta)"; }}>
                View all 38 specialists →
              </Link>
            </div>
          </R>
        </div>
      </section>

      {/* ── APPOINTMENT ── */}
      <section id="appointment" style={{ background: "linear-gradient(145deg, var(--navy) 0%, #0A1020 50%, var(--deep-n) 100%)", padding: "7rem 3rem", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", right: -100, top: "50%", transform: "translateY(-50%)", width: 500, height: 500, borderRadius: "50%", border: "1px solid rgba(184,36,110,0.15)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", right: -50, top: "50%", transform: "translateY(-50%)", width: 350, height: 350, borderRadius: "50%", border: "1px solid rgba(27,42,74,0.18)", pointerEvents: "none" }} />

        <div style={{ maxWidth: 1000, margin: "0 auto", position: "relative", zIndex: 1 }} className="appt-cols">
          <R>
            <div style={{ marginBottom: "4rem" }}>
              <span style={{ fontSize: "0.65rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--magenta)", display: "block", marginBottom: "1rem" }}>Schedule a visit</span>
              <h2 className="serif" style={{ fontSize: "clamp(2.5rem,4vw,4rem)", fontWeight: 200, color: "var(--parch)", lineHeight: 1.1 }}>
                Book your<br /><em style={{ fontStyle: "italic", color: "#A8C0E0" }}>appointment.</em>
              </h2>
              <p style={{ fontSize: "0.9rem", color: "rgba(237,224,204,0.55)", lineHeight: 1.8, marginTop: "1rem", maxWidth: 400 }}>
                Our team will confirm your slot within 30 minutes. Walk-ins welcome — but a booking guarantees your time.
              </p>
            </div>
          </R>

          <R d={100}>
            <form onSubmit={submit} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1px", background: "rgba(250,246,240,0.08)" }}>
              {[
                { label: "Your Name", key: "name", type: "text", ph: "Full name" },
                { label: "Mobile Number", key: "phone", type: "tel", ph: "+91 98765 43210" },
              ].map(f => (
                <div key={f.key} style={{ background: "rgba(250,246,240,0.04)", padding: "1.5rem", transition: "background .2s" }}
                  onFocusCapture={e => (e.currentTarget as HTMLDivElement).style.background = "rgba(250,246,240,0.08)"}
                  onBlurCapture={e => (e.currentTarget as HTMLDivElement).style.background = "rgba(250,246,240,0.04)"}>
                  <label style={{ display: "block", fontSize: "0.62rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--magenta)", marginBottom: "0.6rem" }}>{f.label}</label>
                  <input type={f.type} placeholder={f.ph} value={form[f.key as keyof typeof form]}
                    onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))}
                    style={{ width: "100%", background: "transparent", border: "none", borderBottom: "1px solid rgba(237,224,204,0.15)", color: "var(--parch)", fontSize: "1rem", padding: "0.5rem 0", outline: "none", fontFamily: "'Fraunces',serif", fontWeight: 300 }} />
                </div>
              ))}

              <div style={{ background: "rgba(250,246,240,0.04)", padding: "1.5rem" }}>
                <label style={{ display: "block", fontSize: "0.62rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--magenta)", marginBottom: "0.6rem" }}>Speciality</label>
                <select value={form.dept} onChange={e => setForm(p => ({ ...p, dept: e.target.value }))}
                  style={{ width: "100%", background: "transparent", border: "none", borderBottom: "1px solid rgba(237,224,204,0.15)", color: "var(--parch)", fontSize: "1rem", padding: "0.5rem 0", outline: "none", fontFamily: "'Fraunces',serif", fontWeight: 300, cursor: "pointer" }}>
                  <option value="" style={{ background: "var(--navy)" }}>Choose dept.</option>
                  {SPECIALITIES.map(s => <option key={s.name} value={s.name} style={{ background: "var(--navy)" }}>{s.name}</option>)}
                  <option style={{ background: "var(--navy)" }}>General Medicine</option>
                </select>
              </div>

              <div style={{ background: "rgba(250,246,240,0.04)", padding: "1.5rem" }}>
                <label style={{ display: "block", fontSize: "0.62rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--magenta)", marginBottom: "0.6rem" }}>Preferred Date</label>
                <input type="date" value={form.date} onChange={e => setForm(p => ({ ...p, date: e.target.value }))}
                  min={new Date().toISOString().split("T")[0]}
                  style={{ width: "100%", background: "transparent", border: "none", borderBottom: "1px solid rgba(237,224,204,0.15)", color: "var(--parch)", fontSize: "1rem", padding: "0.5rem 0", outline: "none", fontFamily: "'Fraunces',serif", fontWeight: 300, colorScheme: "dark" }} />
              </div>

              <div style={{ gridColumn: "1/-1", background: sent ? "#2A6B3D" : "var(--magenta)", transition: "background .3s" }}>
                <button type="submit" style={{ width: "100%", padding: "1.4rem", background: "transparent", border: "none", cursor: "pointer", fontFamily: "'Outfit',sans-serif", fontSize: "0.82rem", fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", color: "#fff" }}>
                  {sent ? "✓ We'll confirm within 30 minutes" : "Confirm Appointment →"}
                </button>
              </div>
            </form>
          </R>
        </div>
      </section>

      {/* ── FACILITIES ── */}
      <section id="facilities" className="pad" style={{ background: "var(--warm)", padding: "7rem 3rem" }}>
        <div style={{ maxWidth: 1400, margin: "0 auto" }}>
          <R>
            <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: "4rem", flexWrap: "wrap", gap: "2rem" }}>
              <div>
                <span style={{ fontSize: "0.65rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--magenta)", display: "block", marginBottom: "1rem" }}>Infrastructure</span>
                <h2 className="serif" style={{ fontSize: "clamp(2.5rem,4vw,4rem)", fontWeight: 200, color: "var(--navy)", lineHeight: 1.1 }}>
                  Built to care<br /><em style={{ fontStyle: "italic" }}>for complexity.</em>
                </h2>
              </div>
            </div>
          </R>

          <div style={{ display: "flex", flexDirection: "column", gap: "1px", background: "var(--mist)" }}>
            {[
              { icon: "🫀", t: "Cardiac Catheterisation Lab", d: "Bi-plane cath lab for angiography, angioplasty, stenting and complex electrophysiology procedures. Staffed 24/7 for STEMI cases.", tag: "Cardiology" },
              { icon: "🔭", t: "Advanced Imaging Centre", d: "3-Tesla MRI, 128-slice CT Scanner, 4D Ultrasound, Digital Mammography and Bone Densitometry — all under one roof.", tag: "Radiology" },
              { icon: "🧪", t: "NABL Accredited Laboratory", d: "Full automation. 1,200+ test menu. Stat results in 4 hours. Pathology, microbiology, molecular diagnostics and flow cytometry.", tag: "Pathology" },
              { icon: "🏥", t: "24/7 Emergency & Trauma Bay", d: "Level II trauma centre with dedicated resuscitation bays, crash carts, ventilators and a rapid response team always on standby.", tag: "Emergency" },
              { icon: "🏋️", t: "Rehabilitation & Physiotherapy", d: "Complete inpatient and outpatient rehab — physiotherapy, occupational therapy, speech therapy and hydrotherapy pools.", tag: "Rehab" },
              { icon: "💊", t: "Round-the-Clock Pharmacy", d: "24/7 dispensary with generic and branded medications, cold-chain biologics, oncology drugs and automated dispensing.", tag: "Pharmacy" },
            ].map((f, i) => (
              <R key={f.t} d={i * 50}>
                <div style={{ display: "flex", alignItems: "center", gap: 0, background: "var(--warm)", transition: "background .3s", cursor: "pointer" }}
                  onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.background = "var(--cream)"}
                  onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.background = "var(--warm)"}>
                  <div style={{ flexShrink: 0, width: 80, height: 80, display: "flex", alignItems: "center", justifyContent: "center", background: i % 2 === 0 ? "var(--navy)" : "var(--deep-n)", fontSize: "1.5rem" }}>
                    <span>{f.icon}</span>
                  </div>
                  <div style={{ flex: 1, padding: "1.5rem 2rem", display: "flex", alignItems: "center", gap: "3rem", flexWrap: "wrap" }}>
                    <div style={{ minWidth: 200 }}>
                      <span style={{ fontSize: "0.6rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--magenta)", display: "block", marginBottom: "0.3rem" }}>{f.tag}</span>
                      <h4 className="serif" style={{ fontSize: "1.15rem", fontWeight: 600, color: "var(--navy)" }}>{f.t}</h4>
                    </div>
                    <p style={{ fontSize: "0.82rem", color: "var(--light-n)", lineHeight: 1.7, flex: 1, maxWidth: 480 }}>{f.d}</p>
                  </div>
                  <div className="desk" style={{ flexShrink: 0, padding: "0 2rem", color: "var(--mist)", fontSize: "1.2rem" }}>→</div>
                </div>
              </R>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" className="pad" style={{ background: "linear-gradient(145deg, var(--navy) 0%, #0A1020 50%, var(--deep-n) 100%)", padding: "6rem 3rem" }}>
        <div style={{ maxWidth: 1400, margin: "0 auto" }}>
          <R>
            <div className="contact-cols" style={{ display: "flex", gap: "5rem", flexWrap: "wrap" }}>
              <div style={{ flex: "0 0 35%" }}>
                <span style={{ fontSize: "0.65rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--magenta)", display: "block", marginBottom: "1.5rem" }}>Find us</span>
                <h2 className="serif" style={{ fontSize: "clamp(2rem,3vw,3rem)", fontWeight: 200, color: "var(--parch)", lineHeight: 1.2, marginBottom: "2rem" }}>
                  Come see us<br /><em style={{ fontStyle: "italic", color: "#A8C0E0" }}>anytime.</em>
                </h2>
                <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                  {[
                    { label: "Address", val: "Plot 12, RTC X Roads\nMusheerabad, Hyderabad – 500020" },
                    { label: "Emergency", val: "040-2765-4321 (24/7)" },
                    { label: "Appointments", val: "040-2765-4300" },
                    { label: "Email", val: "rtcxroads@srikarahospitals.in" },
                    { label: "OPD Hours", val: "Mon – Sat  ·  8:00 AM – 8:00 PM" },
                  ].map(c => (
                    <div key={c.label} style={{ paddingBottom: "1.2rem", borderBottom: "1px solid rgba(250,246,240,0.08)" }}>
                      <p style={{ fontSize: "0.6rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--magenta)", marginBottom: "0.4rem" }}>{c.label}</p>
                      <p style={{ fontSize: "0.9rem", color: "rgba(237,224,204,0.75)", lineHeight: 1.6, whiteSpace: "pre-line" }}>{c.val}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Branches */}
              <div style={{ flex: 1 }}>
                <span style={{ fontSize: "0.65rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--magenta)", display: "block", marginBottom: "1.5rem" }}>Our branches</span>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1px", background: "rgba(250,246,240,0.08)" }}>
                  {BRANCHES.map((b) => (
                    <Link key={b} href={`/hospitals/${b.toLowerCase().replace(/ /g, "-")}`}
                      style={{
                        background: b === "RTC X Roads" ? "rgba(184,36,110,0.35)" : "var(--navy)",
                        padding: "1.2rem 1.5rem", textDecoration: "none", display: "flex", alignItems: "center", justifyContent: "space-between", transition: "background .2s",
                        borderLeft: b === "RTC X Roads" ? "3px solid var(--magenta)" : "3px solid transparent"
                      }}
                      onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.background = "rgba(250,246,240,0.08)"}
                      onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.background = b === "RTC X Roads" ? "rgba(184,36,110,0.35)" : "var(--navy)"}>
                      <span style={{ fontSize: "0.88rem", color: b === "RTC X Roads" ? "var(--parch)" : "rgba(237,224,204,0.65)" }}>
                        {b === "RTC X Roads" ? "★ " : ""}{b}
                      </span>
                      <span style={{ fontSize: "0.75rem", color: "var(--magenta)" }}>→</span>
                    </Link>
                  ))}
                </div>
                <Link href="/hospitals" style={{ display: "inline-flex", alignItems: "center", gap: 8, marginTop: "1.5rem", fontSize: "0.75rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--light-n)", textDecoration: "none", borderBottom: "1px solid var(--light-n)", paddingBottom: 2 }}>
                  ← All Srikara Hospitals
                </Link>
              </div>
            </div>
          </R>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ background: "#080C14", padding: "2rem 3rem" }}>
        <div style={{ maxWidth: 1400, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
          <p style={{ fontSize: "0.72rem", color: "rgba(237,224,204,0.25)", letterSpacing: "0.06em" }}>
            © {new Date().getFullYear()} Srikara Hospital – RTC X Roads. Part of Srikara Hospital Group, Hyderabad.
          </p>
          <div style={{ display: "flex", gap: "1.5rem" }}>
            {["Privacy", "Terms", "Sitemap"].map(l => (
              <Link key={l} href="#" style={{ fontSize: "0.7rem", color: "rgba(237,224,204,0.3)", textDecoration: "none", letterSpacing: "0.08em" }}>{l}</Link>
            ))}
          </div>
        </div>
      </footer>
    </>
  );
}

// ─── CURSOR COMPONENT ─────────────────────────────────────────────────────────

function CursorTrail() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let raf: number;
    let mx = 0, my = 0, rx = 0, ry = 0;

    const move = (e: MouseEvent) => { mx = e.clientX; my = e.clientY; };
    window.addEventListener("mousemove", move);

    const tick = () => {
      rx += (mx - rx) * 0.12;
      ry += (my - ry) * 0.12;
      if (dotRef.current) { dotRef.current.style.left = `${mx}px`; dotRef.current.style.top = `${my}px`; }
      if (ringRef.current) { ringRef.current.style.left = `${rx}px`; ringRef.current.style.top = `${ry}px`; }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => { window.removeEventListener("mousemove", move); cancelAnimationFrame(raf); };
  }, []);

  return (
    <>
      <div className="cursor" ref={dotRef} style={{ position: "fixed", top: 0, left: 0, zIndex: 9999, pointerEvents: "none" }}>
        <div className="cursor-dot" />
      </div>
      <div className="cursor" ref={ringRef} style={{ position: "fixed", top: 0, left: 0, zIndex: 9998, pointerEvents: "none" }}>
        <div className="cursor-ring" />
      </div>
    </>
  );
}