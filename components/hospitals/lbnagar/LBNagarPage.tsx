"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

// ─── DATA ─────────────────────────────────────────────────────────────────────

const NAV_LINKS = [
  { label: "Specialities", href: "#specialities" },
  { label: "Our Doctors", href: "#doctors" },
  { label: "Facilities", href: "#facilities" },
  { label: "Appointment", href: "#appointment" },
  { label: "Contact", href: "#contact" },
];

const STATS = [
  { num: "17", sup: "+", sub: "Years Serving\nLB Nagar" },
  { num: "44", sup: "+", sub: "Specialist\nPhysicians" },
  { num: "70k", sup: "+", sub: "Patients\nHealed" },
  { num: "400", sup: "+", sub: "Bed\nCapacity" },
];

const SPECIALITIES = [
  {
    roman: "I", name: "Cardiology", tag: "Heart & Vascular",
    desc: "Full-spectrum cardiac care — from non-invasive diagnostics to complex interventional procedures and cardiac surgery.",
    treatments: ["Angioplasty", "Pacemaker", "Echo & Stress Test", "Cardiac Rehab"],
  },
  {
    roman: "II", name: "Orthopaedics", tag: "Bone, Joint & Spine",
    desc: "Precision musculoskeletal care from fracture management to advanced joint replacement and spinal reconstruction.",
    treatments: ["Knee Replacement", "Arthroscopy", "Spine Surgery", "Sports Medicine"],
  },
  {
    roman: "III", name: "Neurology & Neurosurgery", tag: "Brain & Nervous System",
    desc: "Comprehensive neurological and neurosurgical care with a dedicated stroke unit and epilepsy monitoring centre.",
    treatments: ["Stroke Care", "Epilepsy Clinic", "Brain Tumour", "Neuro Rehab"],
  },
  {
    roman: "IV", name: "Gastroenterology", tag: "Digestive Health",
    desc: "Advanced endoscopy, hepatology, IBD management and bariatric surgery performed by dedicated GI specialists.",
    treatments: ["Endoscopy", "Liver Disease", "Bariatric Surgery", "IBD Clinic"],
  },
  {
    roman: "V", name: "Obstetrics & Gynaecology", tag: "Women's Health",
    desc: "Complete women's health from high-risk obstetrics and fertility to minimally invasive gynaecological surgery.",
    treatments: ["High-Risk OB", "Fertility & IVF", "Laparoscopy", "Menopause Clinic"],
  },
  {
    roman: "VI", name: "Oncology", tag: "Cancer Care",
    desc: "Multidisciplinary tumour board, precision chemotherapy, targeted therapy and comprehensive palliative care.",
    treatments: ["Tumour Board", "Chemotherapy", "Targeted Therapy", "Palliative Care"],
  },
];

const DOCTORS = [
  {
    name: "Dr. Madhavi Latha Reddy", role: "Senior Cardiologist",
    qual: "DM Cardiology · Nizam's Institute of Medical Sciences",
    exp: "20", avail: "Mon – Sat · 10 AM – 2 PM",
    initial: "M",
  },
  {
    name: "Dr. Sreenivas Rao Boddu", role: "Orthopaedic & Joint Replacement Surgeon",
    qual: "MS Ortho, Fellowship · Royal College UK",
    exp: "18", avail: "Mon, Wed, Fri · 3 PM – 7 PM",
    initial: "S",
  },
  {
    name: "Dr. Farida Sultana", role: "Neurologist & Stroke Specialist",
    qual: "DM Neurology · AIIMS New Delhi",
    exp: "16", avail: "Tue, Thu, Sat · 9 AM – 1 PM",
    initial: "F",
  },
  {
    name: "Dr. Ramesh Chandra Nair", role: "Surgical Gastroenterologist",
    qual: "MCh GI Surgery · KEM Hospital Mumbai",
    exp: "22", avail: "Mon – Fri · 11 AM – 3 PM",
    initial: "R",
  },
  {
    name: "Dr. Usha Priyadarshini", role: "Obstetrician & Gynaecologist",
    qual: "MS OBG, FRCOG · Apollo Hospitals",
    exp: "14", avail: "Mon – Sat · 9 AM – 12 PM",
    initial: "U",
  },
  {
    name: "Dr. Ajay Krishnaswamy", role: "Medical Oncologist",
    qual: "DM Medical Oncology · Tata Memorial Centre",
    exp: "13", avail: "Mon – Fri · 2 PM – 6 PM",
    initial: "A",
  },
];

const FACILITIES = [
  { icon: "✦", name: "Cardiac Catheterisation Lab", desc: "Bi-plane digital cath lab enabling angiography, angioplasty and complex electrophysiology — staffed round the clock for STEMI emergencies." },
  { icon: "◈", name: "3T MRI & 256-Slice CT Suite", desc: "Cutting-edge imaging including 3-Tesla MRI, 256-slice CT, digital mammography and nuclear medicine under a single roof." },
  { icon: "⬡", name: "Modular Operation Theatres", desc: "Eight laminar-flow OTs with dedicated suites for cardiac, neuro, robotic and orthopaedic procedures." },
  { icon: "◎", name: "NABL Accredited Laboratory", desc: "Comprehensive automated laboratory offering 1,400+ tests with molecular diagnostics, flow cytometry and 24/7 blood bank." },
  { icon: "✧", name: "48-Bed Multi-Specialty ICU", desc: "Cardiac, Neuro, Surgical and Medical ICU pods with full monitoring, CRRT, ECMO and ventilator support." },
  { icon: "❋", name: "Rehabilitation & Wellness Centre", desc: "Physiotherapy, occupational therapy, speech pathology, hydrotherapy and a dedicated cardiac rehab programme." },
];

const TESTIMONIALS = [
  {
    text: "After years of chronic back pain, Dr. Sreenivas performed a minimally invasive spinal fusion that gave me my life back. The care at LB Nagar is truly beyond words.",
    name: "Venkat Ramaiah",
    area: "LB Nagar, Hyderabad",
    dept: "Orthopaedics",
  },
  {
    text: "Dr. Usha guided us through an incredibly difficult high-risk pregnancy with unmatched expertise and compassion. Our son is healthy and thriving thanks to this remarkable team.",
    name: "Deepa & Suresh Mohan",
    area: "Saroornagar, Hyderabad",
    dept: "Obstetrics",
  },
  {
    text: "When my father suffered a massive stroke, the team here saved his life in minutes. Dr. Farida's stroke protocol and the ICU staff are nothing short of extraordinary.",
    name: "Pradeep Kumar",
    area: "Hayathnagar, Hyderabad",
    dept: "Neurology",
  },
];

const OTHER_BRANCHES = [
  "RTC X Roads", "Ameerpet", "Kukatpally", "Miyapur",
  "Dilsukhnagar", "Secunderabad", "Begumpet", "Uppal",
];

// ─── REVEAL HOOK ──────────────────────────────────────────────────────────────
function useReveal(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setOn(true); io.unobserve(el); } },
      { threshold }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return { ref, on };
}

function Reveal({ children, delay = 0, style = {} }: {
  children: React.ReactNode; delay?: number; style?: React.CSSProperties;
}) {
  const { ref, on } = useReveal();
  return (
    <div ref={ref} style={{
      transitionDelay: `${delay}ms`,
      transition: "opacity .85s ease, transform .85s ease",
      opacity: on ? 1 : 0,
      transform: on ? "none" : "translateY(28px)",
      ...style,
    }}>
      {children}
    </div>
  );
}

// ─── SVG DECORATIVE COMPONENTS ────────────────────────────────────────────────

const DiamondDivider = ({ color = "#8B1A2F" }: { color?: string }) => (
  <div style={{ display: "flex", alignItems: "center", gap: "0.8rem", margin: "0" }}>
    <div style={{ flex: 1, height: 1, background: `linear-gradient(90deg, transparent, ${color})` }} />
    <svg width="12" height="12" viewBox="0 0 12 12">
      <rect x="2" y="2" width="8" height="8" fill={color} transform="rotate(45 6 6)" />
    </svg>
    <svg width="18" height="18" viewBox="0 0 18 18">
      <rect x="3" y="3" width="12" height="12" fill="none" stroke={color} strokeWidth="1.5" transform="rotate(45 9 9)" />
    </svg>
    <svg width="12" height="12" viewBox="0 0 12 12">
      <rect x="2" y="2" width="8" height="8" fill={color} transform="rotate(45 6 6)" />
    </svg>
    <div style={{ flex: 1, height: 1, background: `linear-gradient(90deg, ${color}, transparent)` }} />
  </div>
);

const CornerOrnament = ({ size = 32, color = "#8B1A2F", flip = false }: { size?: number; color?: string; flip?: boolean }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" style={{ transform: flip ? "rotate(180deg)" : "none" }}>
    <path d="M2 2 L16 2 L16 5 L5 5 L5 16 L2 16 Z" fill={color} opacity="0.7" />
    <path d="M4 4 L14 4 L14 6 L6 6 L6 14 L4 14 Z" fill="none" stroke={color} strokeWidth="0.5" opacity="0.4" />
  </svg>
);

const SunburstDivider = ({ color = "#C4922A" }: { color?: string }) => (
  <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "1rem" }}>
    <div style={{ flex: 1, height: 1, background: `linear-gradient(90deg, transparent, ${color}50)` }} />
    <svg width="48" height="48" viewBox="0 0 48 48">
      {Array.from({ length: 12 }).map((_, i) => {
        const angle = (i * 30 * Math.PI) / 180;
        const x1 = 24 + 14 * Math.cos(angle);
        const y1 = 24 + 14 * Math.sin(angle);
        const x2 = 24 + 22 * Math.cos(angle);
        const y2 = 24 + 22 * Math.sin(angle);
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth="1.2" opacity="0.7" />;
      })}
      <circle cx="24" cy="24" r="6" fill="none" stroke={color} strokeWidth="1.2" />
      <circle cx="24" cy="24" r="3" fill={color} opacity="0.8" />
    </svg>
    <div style={{ flex: 1, height: 1, background: `linear-gradient(90deg, ${color}50, transparent)` }} />
  </div>
);

const ArtDecoPattern = () => (
  <svg width="100%" height="120" viewBox="0 0 1440 120" preserveAspectRatio="none" style={{ display: "block" }}>
    <defs>
      <pattern id="deco" x="0" y="0" width="80" height="120" patternUnits="userSpaceOnUse">
        <line x1="40" y1="0" x2="40" y2="120" stroke="#8B1A2F" strokeWidth="0.5" opacity="0.15" />
        <line x1="0" y1="60" x2="80" y2="60" stroke="#C4922A" strokeWidth="0.5" opacity="0.1" />
        <polygon points="40,10 50,30 40,50 30,30" fill="none" stroke="#8B1A2F" strokeWidth="0.5" opacity="0.12" />
        <polygon points="40,70 50,90 40,110 30,90" fill="none" stroke="#8B1A2F" strokeWidth="0.5" opacity="0.12" />
      </pattern>
    </defs>
    <rect width="1440" height="120" fill="url(#deco)" />
  </svg>
);

// ─── MAIN PAGE ────────────────────────────────────────────────────────────────
export default function LBNagarPage() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSpec, setActiveSpec] = useState(0);
  const [activeTest, setActiveTest] = useState(0);
  const [form, setForm] = useState({ name: "", phone: "", dept: "", date: "", reason: "" });
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    const t = setInterval(() => setActiveTest(p => (p + 1) % TESTIMONIALS.length), 5500);
    return () => clearInterval(t);
  }, []);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 3500);
  };

  const C = {
    ivory:   "#FAF6EE",
    parchment: "#F2EAD8",
    warm:    "#E8DCC8",
    mist:    "#D4C9B2",
    burgun:  "#8B1A2F",
    wine:    "#6B1422",
    gold:    "#C4922A",
    golddim: "#A67620",
    ink:     "#1C1108",
    brown:   "#3D2B1A",
    mid:     "#7A6548",
  };

  const serif1: React.CSSProperties = { fontFamily: "'Playfair Display', serif" };
  const serif2: React.CSSProperties = { fontFamily: "'Libre Baskerville', serif" };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=Crimson+Pro:ital,wght@0,300;0,400;1,300;1,400&display=swap');

        :root {
          --ivory:   #FAF6EE;
          --parch:   #F2EAD8;
          --warm:    #E8DCC8;
          --mist:    #D4C9B2;
          --burgun:  #8B1A2F;
          --wine:    #6B1422;
          --gold:    #C4922A;
          --golddim: #A67620;
          --ink:     #1C1108;
          --brown:   #3D2B1A;
          --mid:     #7A6548;
        }

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body {
          font-family: 'Crimson Pro', serif;
          background: var(--ivory);
          color: var(--ink);
          overflow-x: hidden;
        }

        /* Subtle paper texture */
        body::before {
          content: '';
          position: fixed; inset: 0; z-index: 0; pointer-events: none;
          background-image:
            url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
          opacity: .4;
          mix-blend-mode: multiply;
        }

        /* Scrollbar */
        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-track { background: var(--warm); }
        ::-webkit-scrollbar-thumb { background: var(--burgun); border-radius: 0; }

        /* Animations */
        @keyframes fadeUp   { from { opacity:0; transform:translateY(36px); } to { opacity:1; transform:translateY(0); } }
        @keyframes fadeIn   { from { opacity:0; } to { opacity:1; } }
        @keyframes shimmer  { 0%,100% { opacity:.6; } 50% { opacity:1; } }
        @keyframes marquee  { from { transform:translateX(0); } to { transform:translateX(-50%); } }
        @keyframes rotateSlowly { from { transform:rotate(0deg); } to { transform:rotate(360deg); } }
        @keyframes scaleIn  { from { transform:scale(0.94); opacity:0; } to { transform:scale(1); opacity:1; } }

        .ha1 { animation: fadeUp .9s ease .1s both; }
        .ha2 { animation: fadeUp .9s ease .3s both; }
        .ha3 { animation: fadeUp .9s ease .5s both; }
        .ha4 { animation: fadeUp .9s ease .7s both; }
        .ha5 { animation: fadeUp .9s ease .9s both; }

        /* Art Deco border frame */
        .deco-frame {
          position: relative;
        }
        .deco-frame::before, .deco-frame::after {
          content: '';
          position: absolute;
          border: 1px solid rgba(139,26,47,0.25);
          pointer-events: none;
        }
        .deco-frame::before { inset: 8px; }
        .deco-frame::after  { inset: 14px; border-style: dashed; border-width: 0.5px; border-color: rgba(196,146,42,0.2); }

        /* Spec tab */
        .spec-tab { transition: all .3s ease; cursor: pointer; }
        .spec-tab:hover { background: var(--parch) !important; }

        /* Doc card */
        .doc-hover { transition: all .35s ease; }
        .doc-hover:hover { transform: translateY(-6px); box-shadow: 0 20px 60px rgba(139,26,47,0.12); }

        /* Input styling */
        .deco-input {
          width: 100%;
          background: transparent;
          border: none;
          border-bottom: 1px solid var(--mist);
          color: var(--ink);
          font-family: 'Crimson Pro', serif;
          font-size: 1.1rem;
          padding: .5rem 0;
          outline: none;
          transition: border-color .3s;
        }
        .deco-input:focus { border-bottom-color: var(--burgun); }
        .deco-input::placeholder { color: var(--mist); font-style: italic; }
        .deco-input option { background: var(--ivory); color: var(--ink); }

        /* Facility card */
        .fac-card { transition: all .3s ease; cursor: pointer; }
        .fac-card:hover { background: var(--parch) !important; transform: translateY(-3px); }

        /* Mobile */
        @media (max-width: 768px) {
          .desk { display: none !important; }
          .mob-ham { display: flex !important; }
          .hero-grid { grid-template-columns: 1fr !important; }
          .stat-grid { grid-template-columns: 1fr 1fr !important; }
          .spec-layout { flex-direction: column !important; }
          .doc-grid { grid-template-columns: 1fr 1fr !important; }
          .fac-grid { grid-template-columns: 1fr !important; }
          .appt-inner { grid-template-columns: 1fr !important; }
          .contact-grid { grid-template-columns: 1fr !important; }
          .footer-grid { flex-direction: column !important; gap: 2rem !important; }
          .branch-grid { grid-template-columns: 1fr 1fr !important; }
          .section-pad { padding: 4rem 1.5rem !important; }
          .hero-title { font-size: clamp(3rem,9vw,5rem) !important; }
          .watermark-text { display: none !important; }
          .hero-pad { padding: 7rem 1.5rem 4rem !important; }
        }
      `}</style>

      {/* ── TOP INFO STRIP ── */}
      <div style={{ background: C.burgun, padding: "7px 3rem", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "0.5rem", position: "relative", zIndex: 600 }}>
        <div style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
          <span style={{ fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(250,246,238,0.75)", ...serif2 }}>
            Srikara Hospital · LB Nagar Branch
          </span>
          <span style={{ width: 1, height: 14, background: "rgba(250,246,238,0.25)", display: "block" }} />
          <a href="tel:040-2429-6100" style={{ fontSize: "0.7rem", color: "#FAF6EE", textDecoration: "none", letterSpacing: "0.1em", ...serif2 }}>
            Emergency: 040-2429-6100
          </a>
        </div>
        <Link href="/" style={{ fontSize: "0.62rem", color: "rgba(250,246,238,0.6)", textDecoration: "none", letterSpacing: "0.15em", textTransform: "uppercase", ...serif2 }}>
          ← Main Website
        </Link>
      </div>

      {/* ── NAVBAR ── */}
      <nav style={{
        position: "sticky", top: 0, zIndex: 500,
        background: scrolled ? "rgba(250,246,238,0.97)" : "var(--ivory)",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        borderBottom: `1px solid ${scrolled ? "rgba(139,26,47,0.15)" : "rgba(139,26,47,0.08)"}`,
        boxShadow: scrolled ? "0 2px 32px rgba(139,26,47,0.08)" : "none",
        transition: "all .4s ease",
      }}>
        {/* Art Deco top border */}
        <div style={{ height: 3, background: `linear-gradient(90deg, var(--burgun), var(--gold), var(--burgun))` }} />

        <div className="section-pad" style={{ maxWidth: 1400, margin: "0 auto", padding: "0 3rem", height: 68, display: "flex", alignItems: "center", justifyContent: "space-between" }}>

          {/* Logo */}
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: 14, textDecoration: "none" }}>
            {/* Art Deco emblem */}
            <div style={{ width: 44, height: 44, position: "relative", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <svg width="44" height="44" viewBox="0 0 44 44">
                <polygon points="22,4 40,13 40,31 22,40 4,31 4,13" fill="none" stroke={C.burgun} strokeWidth="1.5" />
                <polygon points="22,9 35,15.5 35,28.5 22,35 9,28.5 9,15.5" fill="none" stroke={C.gold} strokeWidth="0.75" opacity="0.6" />
              </svg>
              <span style={{ position: "absolute", ...serif1, fontSize: "1rem", fontWeight: 700, fontStyle: "italic", color: C.burgun }}>S</span>
            </div>
            <div>
              <p style={{ ...serif1, fontSize: "1.1rem", fontWeight: 700, color: C.burgun, lineHeight: 1.1, letterSpacing: "0.02em" }}>Srikara Hospital</p>
              <p style={{ fontSize: "0.58rem", color: C.gold, letterSpacing: "0.22em", textTransform: "uppercase", ...serif2 }}>LB Nagar · Hyderabad</p>
            </div>
          </Link>

          {/* Desktop */}
          <div className="desk" style={{ display: "flex", alignItems: "center", gap: "2.5rem" }}>
            {NAV_LINKS.map(l => (
              <Link key={l.href} href={l.href} style={{ ...serif2, fontSize: "0.78rem", color: C.brown, letterSpacing: "0.06em", textDecoration: "none", transition: "color .2s" }}
                onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.color = C.burgun}
                onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.color = C.brown}>
                {l.label}
              </Link>
            ))}
            <Link href="#appointment" style={{ ...serif1, background: C.burgun, color: C.ivory, padding: "0.5rem 1.6rem", fontSize: "0.78rem", textDecoration: "none", letterSpacing: "0.08em", fontStyle: "italic", transition: "background .2s" }}
              onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.background = C.wine}
              onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.background = C.burgun}>
              Book Appointment
            </Link>
          </div>

          {/* Mobile toggle */}
          <button className="mob-ham" onClick={() => setMenuOpen(!menuOpen)}
            style={{ display: "none", flexDirection: "column", gap: 5, background: "none", border: `1px solid ${C.mist}`, padding: "0.4rem 0.6rem", cursor: "pointer" }}>
            {[0, 1, 2].map(i => (
              <span key={i} style={{ width: 22, height: 1.5, background: C.burgun, display: "block" }} />
            ))}
          </button>
        </div>

        {menuOpen && (
          <div style={{ background: C.ivory, borderTop: `1px solid ${C.warm}`, padding: "1.5rem 2rem", display: "flex", flexDirection: "column", gap: "1.2rem" }}>
            {NAV_LINKS.map(l => (
              <Link key={l.href} href={l.href} onClick={() => setMenuOpen(false)}
                style={{ ...serif2, color: C.brown, textDecoration: "none", fontSize: "0.9rem", letterSpacing: "0.06em", paddingBottom: "0.8rem", borderBottom: `1px solid ${C.warm}` }}>
                {l.label}
              </Link>
            ))}
            <Link href="#appointment" onClick={() => setMenuOpen(false)}
              style={{ ...serif1, background: C.burgun, color: C.ivory, padding: "0.8rem", textAlign: "center", textDecoration: "none", fontStyle: "italic" }}>
              Book Appointment
            </Link>
          </div>
        )}
      </nav>

      {/* ── HERO ── */}
      <section style={{ background: C.ivory, position: "relative", overflow: "hidden", minHeight: "92vh", display: "flex", alignItems: "center" }}>

        {/* Art Deco background pattern */}
        <div style={{ position: "absolute", inset: 0, opacity: 0.06, pointerEvents: "none" }}>
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="deco-bg" x="0" y="0" width="120" height="120" patternUnits="userSpaceOnUse">
                <polygon points="60,10 110,35 110,85 60,110 10,85 10,35" fill="none" stroke={C.burgun} strokeWidth="0.8" />
                <polygon points="60,25 95,42 95,78 60,95 25,78 25,42" fill="none" stroke={C.gold} strokeWidth="0.4" />
                <circle cx="60" cy="60" r="4" fill={C.burgun} opacity="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#deco-bg)" />
          </svg>
        </div>

        {/* Radial fade */}
        <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse at 60% 50%, ${C.ivory} 30%, transparent 80%)`, pointerEvents: "none", zIndex: 1 }} />

        {/* Large watermark */}
        <div className="watermark-text desk" style={{ position: "absolute", right: -60, top: "50%", transform: "translateY(-50%)", ...serif1, fontSize: "22vw", fontWeight: 700, color: "rgba(139,26,47,0.04)", lineHeight: 0.9, letterSpacing: "0.05em", pointerEvents: "none", userSelect: "none", whiteSpace: "nowrap", zIndex: 1 }}>
          LB NAGAR
        </div>

        {/* Content */}
        <div style={{ position: "relative", zIndex: 2, width: "100%", maxWidth: 1400, margin: "0 auto", padding: "6rem 3rem 5rem" }} className="hero-pad">

          {/* Art Deco corner ornaments */}
          <div className="desk" style={{ position: "absolute", top: "4rem", left: "3rem" }}><CornerOrnament color={C.burgun} /></div>
          <div className="desk" style={{ position: "absolute", top: "4rem", right: "3rem" }}><CornerOrnament color={C.burgun} flip /></div>

          {/* Eyebrow */}
          <div className="ha1" style={{ display: "flex", alignItems: "center", gap: "1.2rem", marginBottom: "2rem" }}>
            <div style={{ width: 48, height: 1, background: C.gold }} />
            <span style={{ ...serif2, fontSize: "0.68rem", letterSpacing: "0.28em", textTransform: "uppercase", color: C.gold }}>
              Est. 2007 · LB Nagar, Hyderabad
            </span>
            <div style={{ width: 48, height: 1, background: C.gold }} />
          </div>

          <div className="hero-grid" style={{ display: "grid", gridTemplateColumns: "55% 1fr", gap: "5rem", alignItems: "center" }}>

            {/* Left */}
            <div>
              <h1 className="ha2 hero-title" style={{ ...serif1, fontSize: "clamp(3.5rem,6.5vw,7.5rem)", fontWeight: 700, color: C.burgun, lineHeight: 0.92, marginBottom: "0.5rem", letterSpacing: "-0.01em" }}>
                Caring for
              </h1>
              <h1 className="ha2 hero-title" style={{ ...serif1, fontSize: "clamp(3.5rem,6.5vw,7.5rem)", fontWeight: 400, fontStyle: "italic", color: C.ink, lineHeight: 0.92, marginBottom: "0.5rem" }}>
                generations
              </h1>
              <h1 className="ha2 hero-title" style={{ ...serif1, fontSize: "clamp(3.5rem,6.5vw,7.5rem)", fontWeight: 700, color: C.burgun, lineHeight: 0.92, marginBottom: "2.5rem" }}>
                of families.
              </h1>

              <div className="ha3" style={{ marginBottom: "2rem" }}>
                <DiamondDivider color={C.gold} />
              </div>

              <p className="ha3" style={{ ...serif2, fontSize: "1.05rem", color: C.mid, lineHeight: 1.85, maxWidth: 500, marginBottom: "3rem", fontWeight: 400 }}>
                For seventeen years, Srikara LB Nagar has stood as South-East Hyderabad's most trusted centre for compassionate, expert healthcare — where every patient is treated with the dignity and attention they deserve.
              </p>

              <div className="ha4" style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                <Link href="#appointment" style={{ ...serif1, display: "inline-flex", alignItems: "center", gap: 10, background: C.burgun, color: C.ivory, padding: "0.95rem 2.4rem", textDecoration: "none", fontSize: "0.88rem", fontStyle: "italic", letterSpacing: "0.06em", transition: "all .3s", boxShadow: `4px 4px 0 ${C.gold}` }}
                  onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = C.wine; (e.currentTarget as HTMLAnchorElement).style.boxShadow = `6px 6px 0 ${C.gold}`; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = C.burgun; (e.currentTarget as HTMLAnchorElement).style.boxShadow = `4px 4px 0 ${C.gold}`; }}>
                  Reserve Your Appointment
                </Link>
                <a href="tel:040-2429-6100" style={{ ...serif2, display: "inline-flex", alignItems: "center", gap: 10, border: `1.5px solid ${C.mist}`, color: C.brown, padding: "0.95rem 2rem", textDecoration: "none", fontSize: "0.85rem", transition: "border-color .3s" }}
                  onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.borderColor = C.burgun}
                  onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.borderColor = C.mist}>
                  🚑 &nbsp;Emergency: 040-2429-6100
                </a>
              </div>

              {/* Certifications */}
              <div className="ha5" style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap", marginTop: "2.5rem", paddingTop: "2rem" }}>
                {["NABH Accredited", "ISO 9001:2015", "NABL Lab", "100+ Insurers"].map(tag => (
                  <span key={tag} style={{ ...serif2, fontSize: "0.62rem", letterSpacing: "0.14em", textTransform: "uppercase", color: C.gold, border: `1px solid ${C.gold}40`, padding: "0.3rem 0.8rem" }}>{tag}</span>
                ))}
              </div>
            </div>

            {/* Right — Stats in Art Deco frame */}
            <div className="ha3 deco-frame desk" style={{ padding: "3rem 2.5rem", background: C.parchment }}>
              {/* Decorative top line */}
              <div style={{ marginBottom: "2rem" }}><SunburstDivider color={C.gold} /></div>

              <div className="stat-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem" }}>
                {STATS.map((s, i) => (
                  <div key={i} style={{ textAlign: "center", paddingBottom: "1.5rem", borderBottom: i < 2 ? `1px solid ${C.mist}` : "none" }}>
                    <p style={{ ...serif1, fontSize: "3.2rem", fontWeight: 700, color: C.burgun, lineHeight: 1 }}>
                      {s.num}<span style={{ fontSize: "1.5rem", color: C.gold }}>{s.sup}</span>
                    </p>
                    <p style={{ ...serif2, fontSize: "0.65rem", letterSpacing: "0.12em", textTransform: "uppercase", color: C.mid, marginTop: 8, whiteSpace: "pre-line", lineHeight: 1.5 }}>{s.sub}</p>
                  </div>
                ))}
              </div>

              <div style={{ marginTop: "2rem" }}><SunburstDivider color={C.gold} /></div>

              {/* Emergency card */}
              <div style={{ marginTop: "2rem", background: C.burgun, padding: "1.2rem 1.5rem", position: "relative" }}>
                <div style={{ position: "absolute", top: 4, left: 4, right: 4, bottom: 4, border: `1px solid rgba(196,146,42,0.35)`, pointerEvents: "none" }} />
                <div style={{ display: "flex", alignItems: "center", gap: "0.8rem" }}>
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#FF6B6B", animation: "shimmer 2s ease infinite", flexShrink: 0 }} />
                  <div>
                    <p style={{ ...serif1, fontSize: "0.62rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(250,246,238,0.65)", marginBottom: "0.25rem" }}>24/7 Emergency</p>
                    <p style={{ ...serif1, fontSize: "1.15rem", color: C.ivory, fontWeight: 600 }}>040-2429-6100</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Art Deco bottom border */}
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0 }}>
          <div style={{ height: 2, background: `linear-gradient(90deg, transparent, ${C.burgun}, ${C.gold}, ${C.burgun}, transparent)` }} />
          <ArtDecoPattern />
        </div>
      </section>

      {/* ── MARQUEE ── */}
      <div style={{ background: C.burgun, padding: "0.8rem 0", overflow: "hidden", whiteSpace: "nowrap", position: "relative", zIndex: 2 }}>
        <div style={{ display: "inline-flex", gap: "3rem", animation: "marquee 35s linear infinite" }}>
          {Array(3).fill(["Advanced Cardiac Care", "Joint Replacement Surgery", "Stroke Neurology", "High-Risk Obstetrics", "Oncology & Tumour Board", "Bariatric Surgery", "Neonatal ICU", "NABH Accredited", "24/7 Emergency", "Digital Diagnostics", "Fertility & IVF", "Physiotherapy & Rehab"]).flat().map((t, i) => (
            <span key={i} style={{ display: "inline-flex", alignItems: "center", gap: "1rem", ...serif2, fontSize: "0.68rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(250,246,238,0.75)" }}>
              <svg width="8" height="8" viewBox="0 0 8 8"><rect x="1" y="1" width="6" height="6" fill={C.gold} transform="rotate(45 4 4)" /></svg>
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* ── SPECIALITIES ── */}
      <section id="specialities" className="section-pad" style={{ background: C.ivory, padding: "7rem 3rem" }}>
        <div style={{ maxWidth: 1400, margin: "0 auto" }}>

          <Reveal>
            <div style={{ textAlign: "center", marginBottom: "1rem" }}>
              <span style={{ ...serif2, fontSize: "0.65rem", letterSpacing: "0.28em", textTransform: "uppercase", color: C.gold }}>Medical Excellence</span>
            </div>
            <h2 style={{ ...serif1, fontSize: "clamp(2.2rem,4vw,4.5rem)", fontWeight: 700, color: C.burgun, textAlign: "center", lineHeight: 1.05, marginBottom: "0.5rem" }}>
              Our Specialities
            </h2>
            <p style={{ ...serif1, fontSize: "clamp(1.2rem,2vw,1.6rem)", color: C.mid, fontStyle: "italic", fontWeight: 400, textAlign: "center", marginBottom: "2rem" }}>
              Comprehensive care across every discipline
            </p>
            <div style={{ marginBottom: "4rem" }}><DiamondDivider color={C.burgun} /></div>
          </Reveal>

          {/* Tab layout */}
          <div className="spec-layout" style={{ display: "flex", gap: "0", border: `1px solid ${C.mist}` }}>

            {/* Left — tab list */}
            <div style={{ width: 260, flexShrink: 0, borderRight: `1px solid ${C.mist}` }}>
              {SPECIALITIES.map((s, i) => (
                <Reveal key={s.name} delay={i * 50}>
                  <div
                    className="spec-tab"
                    onClick={() => setActiveSpec(i)}
                    style={{
                      padding: "1.4rem 1.5rem",
                      background: activeSpec === i ? C.parchment : C.ivory,
                      borderLeft: activeSpec === i ? `3px solid ${C.burgun}` : "3px solid transparent",
                      borderBottom: `1px solid ${C.warm}`,
                      transition: "all .25s",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "0.8rem" }}>
                      <span style={{ ...serif1, fontSize: "0.7rem", color: activeSpec === i ? C.burgun : C.mist, fontStyle: "italic", fontWeight: 600, transition: "color .25s" }}>{s.roman}</span>
                      <span style={{ ...serif1, fontSize: "0.92rem", fontWeight: activeSpec === i ? 700 : 400, color: activeSpec === i ? C.burgun : C.brown, transition: "all .25s" }}>{s.name}</span>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>

            {/* Right — content panel */}
            <div style={{ flex: 1, padding: "3rem 3.5rem", background: C.parchment, position: "relative" }}>
              {/* Corner ornaments */}
              <div style={{ position: "absolute", top: "1.5rem", left: "1.5rem" }}><CornerOrnament size={24} color={C.gold} /></div>
              <div style={{ position: "absolute", top: "1.5rem", right: "1.5rem" }}><CornerOrnament size={24} color={C.gold} flip /></div>

              <div style={{ animation: "scaleIn .4s ease" }} key={activeSpec}>
                <span style={{ ...serif2, fontSize: "0.62rem", letterSpacing: "0.2em", textTransform: "uppercase", color: C.gold, display: "block", marginBottom: "0.8rem" }}>
                  {SPECIALITIES[activeSpec].tag}
                </span>
                <h3 style={{ ...serif1, fontSize: "clamp(1.8rem,3vw,3rem)", fontWeight: 700, color: C.burgun, lineHeight: 1.1, marginBottom: "1rem" }}>
                  {SPECIALITIES[activeSpec].name}
                </h3>
                <div style={{ marginBottom: "1.5rem" }}><DiamondDivider color={C.gold} /></div>
                <p style={{ ...serif2, fontSize: "1rem", color: C.brown, lineHeight: 1.85, marginBottom: "2rem" }}>
                  {SPECIALITIES[activeSpec].desc}
                </p>

                <div>
                  <p style={{ ...serif2, fontSize: "0.62rem", letterSpacing: "0.18em", textTransform: "uppercase", color: C.mid, marginBottom: "1rem" }}>Key Treatments</p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.6rem" }}>
                    {SPECIALITIES[activeSpec].treatments.map(t => (
                      <span key={t} style={{ ...serif2, fontSize: "0.78rem", color: C.brown, border: `1px solid ${C.mist}`, padding: "0.35rem 0.9rem", background: C.ivory }}>
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div style={{ marginTop: "2.5rem" }}>
                  <Link href="#appointment" style={{ ...serif1, display: "inline-flex", alignItems: "center", gap: 10, color: C.burgun, textDecoration: "none", fontSize: "0.88rem", fontStyle: "italic", borderBottom: `1px solid ${C.burgun}`, paddingBottom: 2, transition: "color .2s" }}
                    onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.color = C.wine}
                    onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.color = C.burgun}>
                    Book a consultation →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── DOCTORS ── */}
      <section id="doctors" className="section-pad" style={{ background: C.parchment, padding: "7rem 3rem" }}>
        <div style={{ maxWidth: 1400, margin: "0 auto" }}>
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: "1rem" }}>
              <span style={{ ...serif2, fontSize: "0.65rem", letterSpacing: "0.28em", textTransform: "uppercase", color: C.gold }}>Our Physicians</span>
            </div>
            <h2 style={{ ...serif1, fontSize: "clamp(2.2rem,4vw,4.5rem)", fontWeight: 700, color: C.burgun, textAlign: "center", marginBottom: "0.4rem" }}>
              Distinguished Specialists
            </h2>
            <p style={{ ...serif1, fontSize: "clamp(1.1rem,2vw,1.5rem)", color: C.mid, fontStyle: "italic", textAlign: "center", marginBottom: "2rem" }}>
              Expertise you can trust, compassion you will feel
            </p>
            <div style={{ marginBottom: "4rem" }}><DiamondDivider color={C.burgun} /></div>
          </Reveal>

          <div className="doc-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.5rem" }}>
            {DOCTORS.map((d, i) => (
              <Reveal key={d.name} delay={i * 70}>
                <div className="doc-hover" style={{ background: C.ivory, border: `1px solid ${C.warm}`, position: "relative", overflow: "hidden" }}>
                  {/* Top colour band */}
                  <div style={{ height: 4, background: i % 3 === 0 ? `linear-gradient(90deg,${C.burgun},${C.wine})` : i % 3 === 1 ? `linear-gradient(90deg,${C.gold},${C.golddim})` : `linear-gradient(90deg,${C.brown},${C.mid})` }} />

                  {/* Inner double border */}
                  <div style={{ margin: "1rem", padding: "1.5rem", border: `1px solid ${C.warm}`, position: "relative" }}>
                    {/* Corner ornaments small */}
                    <div style={{ position: "absolute", top: 6, left: 6 }}><CornerOrnament size={16} color={C.gold} /></div>
                    <div style={{ position: "absolute", top: 6, right: 6 }}><CornerOrnament size={16} color={C.gold} flip /></div>

                    {/* Initial circle */}
                    <div style={{ width: 56, height: 56, border: `2px solid ${C.burgun}`, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1.2rem", position: "relative" }}>
                      <div style={{ position: "absolute", inset: 3, borderRadius: "50%", border: `1px solid ${C.gold}40` }} />
                      <span style={{ ...serif1, fontSize: "1.4rem", fontStyle: "italic", fontWeight: 700, color: C.burgun }}>{d.initial}</span>
                    </div>

                    <p style={{ ...serif1, fontSize: "1.05rem", fontWeight: 700, color: C.burgun, lineHeight: 1.2, marginBottom: "0.3rem" }}>{d.name}</p>
                    <p style={{ ...serif2, fontSize: "0.72rem", color: C.gold, fontWeight: 700, letterSpacing: "0.05em", marginBottom: "0.6rem" }}>{d.role}</p>
                    <p style={{ ...serif2, fontSize: "0.75rem", color: C.mid, lineHeight: 1.5, marginBottom: "1.2rem" }}>{d.qual}</p>

                    <div style={{ paddingTop: "0.9rem", borderTop: `1px solid ${C.warm}` }}>
                      <span style={{ ...serif2, fontSize: "0.62rem", letterSpacing: "0.14em", textTransform: "uppercase", color: C.gold, display: "block", marginBottom: "0.3rem" }}>Availability</span>
                      <span style={{ ...serif2, fontSize: "0.78rem", color: C.brown }}>{d.avail}</span>
                    </div>

                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "1rem" }}>
                      <span style={{ ...serif2, fontSize: "0.62rem", letterSpacing: "0.1em", textTransform: "uppercase", color: C.mist }}>{d.exp} yrs experience</span>
                      <Link href="#appointment" style={{ ...serif1, fontSize: "0.72rem", color: C.burgun, textDecoration: "none", fontStyle: "italic", borderBottom: `1px solid ${C.burgun}`, paddingBottom: 1 }}>
                        Book →
                      </Link>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={300}>
            <div style={{ textAlign: "center", marginTop: "3rem" }}>
              <Link href="#" style={{ ...serif1, display: "inline-flex", alignItems: "center", gap: 10, color: C.burgun, textDecoration: "none", fontSize: "0.92rem", fontStyle: "italic", border: `1.5px solid ${C.burgun}`, padding: "0.8rem 2.5rem", transition: "all .3s" }}
                onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = C.burgun; (e.currentTarget as HTMLAnchorElement).style.color = C.ivory; }}
                onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = "transparent"; (e.currentTarget as HTMLAnchorElement).style.color = C.burgun; }}>
                View All 44 Specialists
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section style={{ background: C.burgun, padding: "7rem 3rem", position: "relative", overflow: "hidden" }}>
        {/* Art Deco bg pattern */}
        <div style={{ position: "absolute", inset: 0, opacity: 0.06, pointerEvents: "none" }}>
          <svg width="100%" height="100%"><defs><pattern id="tp" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
            <polygon points="40,5 75,22 75,58 40,75 5,58 5,22" fill="none" stroke={C.ivory} strokeWidth="0.5" /></pattern></defs>
            <rect width="100%" height="100%" fill="url(#tp)" /></svg>
        </div>

        <div style={{ maxWidth: 900, margin: "0 auto", position: "relative", zIndex: 1, textAlign: "center" }}>
          <Reveal>
            <span style={{ ...serif2, fontSize: "0.65rem", letterSpacing: "0.28em", textTransform: "uppercase", color: "rgba(196,146,42,0.9)", display: "block", marginBottom: "1rem" }}>Patient Voices</span>
            <h2 style={{ ...serif1, fontSize: "clamp(2rem,3.5vw,3.5rem)", fontWeight: 700, color: C.ivory, marginBottom: "1rem" }}>
              Stories of Healing
            </h2>
            <div style={{ marginBottom: "3.5rem" }}><DiamondDivider color={C.gold} /></div>
          </Reveal>

          {/* Testimonial carousel */}
          <div style={{ position: "relative", minHeight: 280 }}>
            {TESTIMONIALS.map((t, i) => (
              <div key={i} style={{ position: i === activeTest ? "relative" : "absolute", top: 0, left: 0, right: 0, opacity: i === activeTest ? 1 : 0, transform: i === activeTest ? "none" : "translateY(12px)", transition: "all .7s ease", pointerEvents: i === activeTest ? "auto" : "none" }}>
                <div style={{ border: `1px solid rgba(196,146,42,0.3)`, padding: "3rem", position: "relative" }}>
                  <div style={{ position: "absolute", top: 8, left: 8, right: 8, bottom: 8, border: `1px solid rgba(196,146,42,0.12)`, pointerEvents: "none" }} />
                  <div style={{ position: "absolute", top: "1.5rem", left: "1.5rem" }}><CornerOrnament size={20} color={C.gold} /></div>
                  <div style={{ position: "absolute", top: "1.5rem", right: "1.5rem" }}><CornerOrnament size={20} color={C.gold} flip /></div>

                  <p style={{ ...serif1, fontSize: "0.62rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(196,146,42,0.8)", marginBottom: "1.5rem" }}>{t.dept}</p>
                  <p style={{ ...serif1, fontSize: "clamp(1.1rem,2vw,1.5rem)", fontStyle: "italic", color: "rgba(250,246,238,0.9)", lineHeight: 1.7, marginBottom: "2.5rem", fontWeight: 400 }}>
                    "{t.text}"
                  </p>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "1.2rem" }}>
                    <div style={{ width: 1, height: 28, background: "rgba(196,146,42,0.4)" }} />
                    <div>
                      <p style={{ ...serif1, fontWeight: 600, color: C.ivory, fontSize: "0.9rem" }}>{t.name}</p>
                      <p style={{ ...serif2, fontSize: "0.68rem", color: "rgba(196,146,42,0.8)", marginTop: 2 }}>{t.area}</p>
                    </div>
                    <div style={{ width: 1, height: 28, background: "rgba(196,146,42,0.4)" }} />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ display: "flex", justifyContent: "center", gap: "0.5rem", marginTop: "2.5rem" }}>
            {TESTIMONIALS.map((_, i) => (
              <button key={i} onClick={() => setActiveTest(i)} style={{ width: i === activeTest ? 32 : 8, height: 3, background: i === activeTest ? C.gold : "rgba(196,146,42,0.3)", border: "none", cursor: "pointer", transition: "all .3s", padding: 0 }} />
            ))}
          </div>
        </div>
      </section>

      {/* ── FACILITIES ── */}
      <section id="facilities" className="section-pad" style={{ background: C.ivory, padding: "7rem 3rem" }}>
        <div style={{ maxWidth: 1400, margin: "0 auto" }}>
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: "1rem" }}>
              <span style={{ ...serif2, fontSize: "0.65rem", letterSpacing: "0.28em", textTransform: "uppercase", color: C.gold }}>Infrastructure</span>
            </div>
            <h2 style={{ ...serif1, fontSize: "clamp(2.2rem,4vw,4.5rem)", fontWeight: 700, color: C.burgun, textAlign: "center", marginBottom: "0.4rem" }}>
              Our Facilities
            </h2>
            <p style={{ ...serif1, fontSize: "clamp(1.1rem,2vw,1.5rem)", color: C.mid, fontStyle: "italic", textAlign: "center", marginBottom: "2rem" }}>
              Built for clinical excellence, designed for patient comfort
            </p>
            <div style={{ marginBottom: "4rem" }}><DiamondDivider color={C.burgun} /></div>
          </Reveal>

          <div className="fac-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.5rem" }}>
            {FACILITIES.map((f, i) => (
              <Reveal key={f.name} delay={i * 70}>
                <div className="fac-card" style={{ background: C.parchment, padding: "2.5rem 2rem", border: `1px solid ${C.warm}`, position: "relative", overflow: "hidden" }}>
                  {/* Top ruled line */}
                  <div style={{ height: 3, background: `linear-gradient(90deg, ${C.burgun}, ${C.gold})`, marginBottom: "2rem" }} />

                  <div style={{ display: "flex", alignItems: "flex-start", gap: "1rem", marginBottom: "1.2rem" }}>
                    <span style={{ fontSize: "1.5rem", color: C.burgun, lineHeight: 1, flexShrink: 0, marginTop: 2 }}>{f.icon}</span>
                    <h3 style={{ ...serif1, fontSize: "1.05rem", fontWeight: 700, color: C.burgun, lineHeight: 1.3 }}>{f.name}</h3>
                  </div>

                  <p style={{ ...serif2, fontSize: "0.82rem", color: C.mid, lineHeight: 1.8 }}>{f.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── APPOINTMENT ── */}
      <section id="appointment" className="section-pad" style={{ background: C.parchment, padding: "7rem 3rem", position: "relative", overflow: "hidden" }}>
        {/* Art Deco corner ornaments */}
        <div className="desk" style={{ position: "absolute", top: "3rem", left: "3rem" }}><CornerOrnament size={48} color={C.burgun} /></div>
        <div className="desk" style={{ position: "absolute", top: "3rem", right: "3rem" }}><CornerOrnament size={48} color={C.burgun} flip /></div>
        <div className="desk" style={{ position: "absolute", bottom: "3rem", left: "3rem" }}><CornerOrnament size={48} color={C.burgun} flip /></div>
        <div className="desk" style={{ position: "absolute", bottom: "3rem", right: "3rem" }}><CornerOrnament size={48} color={C.burgun} /></div>

        <div style={{ maxWidth: 820, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: "1rem" }}>
              <span style={{ ...serif2, fontSize: "0.65rem", letterSpacing: "0.28em", textTransform: "uppercase", color: C.gold }}>Schedule a Consultation</span>
            </div>
            <h2 style={{ ...serif1, fontSize: "clamp(2.2rem,4vw,4.5rem)", fontWeight: 700, color: C.burgun, textAlign: "center", marginBottom: "0.4rem" }}>
              Book Your Appointment
            </h2>
            <p style={{ ...serif1, fontSize: "clamp(1rem,1.8vw,1.4rem)", color: C.mid, fontStyle: "italic", textAlign: "center", marginBottom: "2rem" }}>
              We confirm every booking within 30 minutes
            </p>
            <div style={{ marginBottom: "3.5rem" }}><DiamondDivider color={C.burgun} /></div>
          </Reveal>

          <Reveal delay={100}>
            <form onSubmit={submit} style={{ border: `1px solid ${C.mist}`, position: "relative" }}>
              {/* Inner ornamental border */}
              <div style={{ position: "absolute", inset: 8, border: `1px solid ${C.gold}25`, pointerEvents: "none", zIndex: 0 }} />

              <div className="appt-inner" style={{ position: "relative", zIndex: 1, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 0 }}>
                {[
                  { label: "Your Full Name", key: "name", type: "text", ph: "As per your records" },
                  { label: "Mobile Number", key: "phone", type: "tel", ph: "+91 98765 43210" },
                ].map((f, idx) => (
                  <div key={f.key} style={{ padding: "2rem 2rem 1.5rem", borderBottom: `1px solid ${C.warm}`, borderRight: idx === 0 ? `1px solid ${C.warm}` : "none" }}>
                    <label style={{ ...serif2, fontSize: "0.6rem", letterSpacing: "0.2em", textTransform: "uppercase", color: C.gold, display: "block", marginBottom: "0.8rem" }}>{f.label}</label>
                    <input type={f.type} placeholder={f.ph} value={form[f.key as keyof typeof form]}
                      onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))}
                      className="deco-input"
                      style={{ fontFamily: "'Crimson Pro',serif" }} />
                  </div>
                ))}

                <div style={{ padding: "2rem 2rem 1.5rem", borderBottom: `1px solid ${C.warm}`, borderRight: `1px solid ${C.warm}` }}>
                  <label style={{ ...serif2, fontSize: "0.6rem", letterSpacing: "0.2em", textTransform: "uppercase", color: C.gold, display: "block", marginBottom: "0.8rem" }}>Department</label>
                  <select value={form.dept} onChange={e => setForm(p => ({ ...p, dept: e.target.value }))} className="deco-input">
                    <option value="">Select department</option>
                    {SPECIALITIES.map(s => <option key={s.name}>{s.name}</option>)}
                    <option>General Medicine</option>
                    <option>Paediatrics</option>
                  </select>
                </div>

                <div style={{ padding: "2rem 2rem 1.5rem", borderBottom: `1px solid ${C.warm}` }}>
                  <label style={{ ...serif2, fontSize: "0.6rem", letterSpacing: "0.2em", textTransform: "uppercase", color: C.gold, display: "block", marginBottom: "0.8rem" }}>Preferred Date</label>
                  <input type="date" value={form.date} onChange={e => setForm(p => ({ ...p, date: e.target.value }))}
                    min={new Date().toISOString().split("T")[0]} className="deco-input" />
                </div>

                <div style={{ padding: "2rem 2rem 1.5rem", gridColumn: "1 / -1" }}>
                  <label style={{ ...serif2, fontSize: "0.6rem", letterSpacing: "0.2em", textTransform: "uppercase", color: C.gold, display: "block", marginBottom: "0.8rem" }}>Reason for Visit</label>
                  <input type="text" placeholder="Briefly describe your concern or purpose of visit" value={form.reason}
                    onChange={e => setForm(p => ({ ...p, reason: e.target.value }))} className="deco-input" />
                </div>
              </div>

              <button type="submit" style={{ width: "100%", background: sent ? "#4A7C59" : C.burgun, color: C.ivory, border: "none", padding: "1.4rem", ...serif1, fontSize: "1.05rem", fontStyle: "italic", letterSpacing: "0.1em", cursor: "pointer", transition: "background .3s", position: "relative", zIndex: 1 }}>
                {sent ? "✦ Your Appointment Has Been Received" : "Reserve My Consultation ✦"}
              </button>
            </form>
          </Reveal>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" className="section-pad" style={{ background: C.ivory, padding: "6rem 3rem", borderTop: `1px solid ${C.warm}` }}>
        <div style={{ maxWidth: 1400, margin: "0 auto" }}>
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: "4rem" }}>
              <span style={{ ...serif2, fontSize: "0.65rem", letterSpacing: "0.28em", textTransform: "uppercase", color: C.gold }}>Find Us</span>
              <h2 style={{ ...serif1, fontSize: "clamp(2rem,3.5vw,4rem)", fontWeight: 700, color: C.burgun, marginTop: "0.5rem" }}>
                LB Nagar Branch
              </h2>
            </div>
          </Reveal>

          <div className="contact-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem" }}>

            {/* Contact details */}
            <Reveal>
              <div style={{ border: `1px solid ${C.warm}`, position: "relative" }}>
                <div style={{ height: 3, background: `linear-gradient(90deg,${C.burgun},${C.gold})` }} />
                <div style={{ padding: "2.5rem" }}>
                  {[
                    { l: "Address", v: "D.No. 1-1-58/A, LB Nagar Main Road\nLB Nagar, Hyderabad – 500074" },
                    { l: "Emergency (24/7)", v: "040-2429-6100" },
                    { l: "Appointments", v: "040-2429-6200" },
                    { l: "Email", v: "lbnagar@srikarahospitals.in" },
                    { l: "OPD Hours", v: "Monday – Saturday · 8:00 AM – 8:00 PM" },
                  ].map((c, i) => (
                    <div key={c.l} style={{ paddingBottom: "1.2rem", marginBottom: "1.2rem", borderBottom: i < 4 ? `1px solid ${C.warm}` : "none" }}>
                      <p style={{ ...serif2, fontSize: "0.58rem", letterSpacing: "0.18em", textTransform: "uppercase", color: C.gold, marginBottom: "0.35rem" }}>{c.l}</p>
                      <p style={{ ...serif1, fontSize: "1rem", color: C.burgun, lineHeight: 1.6, whiteSpace: "pre-line" }}>{c.v}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            {/* Other branches */}
            <Reveal delay={100}>
              <div>
                <div style={{ marginBottom: "2rem" }}>
                  <DiamondDivider color={C.gold} />
                </div>
                <h3 style={{ ...serif1, fontSize: "1.5rem", fontWeight: 700, color: C.burgun, marginBottom: "0.5rem" }}>Srikara Network</h3>
                <p style={{ ...serif2, fontSize: "0.82rem", color: C.mid, marginBottom: "2rem" }}>Visit any of our 9 branches across Hyderabad</p>

                <div className="branch-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1px", background: C.mist, marginBottom: "2rem" }}>
                  {OTHER_BRANCHES.map((b, i) => (
                    <Link key={b} href={`/hospitals/${b.toLowerCase().replace(/ /g, "-")}`}
                      style={{ background: C.ivory, padding: "0.9rem 1.2rem", textDecoration: "none", display: "flex", alignItems: "center", justifyContent: "space-between", transition: "background .2s" }}
                      onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.background = C.parchment}
                      onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.background = C.ivory}>
                      <span style={{ ...serif2, fontSize: "0.82rem", color: C.brown }}>{b}</span>
                      <span style={{ ...serif1, fontSize: "0.72rem", color: C.gold, fontStyle: "italic" }}>→</span>
                    </Link>
                  ))}
                </div>

                <Link href="/" style={{ ...serif1, display: "inline-flex", alignItems: "center", gap: 8, color: C.burgun, textDecoration: "none", fontStyle: "italic", fontSize: "0.88rem", borderBottom: `1px solid ${C.burgun}`, paddingBottom: 2 }}>
                  ← View All Srikara Branches
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ background: C.burgun }}>
        <div style={{ height: 3, background: `linear-gradient(90deg,${C.wine},${C.gold},${C.wine})` }} />
        <div style={{ padding: "2rem 3rem" }}>
          <div className="footer-grid" style={{ maxWidth: 1400, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <svg width="28" height="28" viewBox="0 0 44 44"><polygon points="22,4 40,13 40,31 22,40 4,31 4,13" fill="none" stroke={C.ivory} strokeWidth="1.5" opacity="0.7" /></svg>
              <span style={{ ...serif2, fontSize: "0.7rem", color: "rgba(250,246,238,0.6)", letterSpacing: "0.08em" }}>
                © {new Date().getFullYear()} Srikara Hospital – LB Nagar · Part of Srikara Hospital Group, Hyderabad
              </span>
            </div>
            <div style={{ display: "flex", gap: "2rem" }}>
              {["Privacy Policy", "Terms of Use", "Sitemap"].map(l => (
                <Link key={l} href="#" style={{ ...serif2, fontSize: "0.65rem", color: "rgba(250,246,238,0.45)", textDecoration: "none", letterSpacing: "0.1em" }}>{l}</Link>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}