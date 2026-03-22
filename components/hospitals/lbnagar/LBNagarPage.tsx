"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

// ─── DATA ─────────────────────────────────────────────────────────────────────

const NAV_LINKS = [
  { label: "Home",        href: "#"            },
  { label: "Doctors",     href: "#doctors"      },
  { label: "Departments", href: "#specialities" },
];

const STATS = [
  { num: "17", sup: "+", sub: "Years Serving\nLB Nagar" },
  { num: "44", sup: "+", sub: "Specialist\nPhysicians" },
  { num: "70k", sup: "+", sub: "Patients\nHealed" },
  { num: "400", sup: "+", sub: "Bed\nCapacity" },
];

const SPECIALITIES = [
  {
    roman: "I",    name: "Orthopedic",       tag: "Bone, Joint & Spine",
    desc: "Robotic joint replacement, arthroscopic surgery, trauma surgery and comprehensive musculoskeletal care.",
    treatments: ["Robotic Joint Replacement", "Arthroscopy", "Trauma Surgery", "Sports Medicine"],
    img: "https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=700&q=80",
  },
  {
    roman: "II",   name: "Cardiology",       tag: "Heart & Vascular",
    desc: "Clinical and interventional cardiology, echocardiography, pacemakers and comprehensive cardiac rehabilitation.",
    treatments: ["Clinical Cardiology", "Echo & ECG", "Pacemaker", "Cardiac Rehab"],
    img: "https://images.unsplash.com/photo-1628348068343-c6a848d2b6dd?w=700&q=80",
  },
  {
    roman: "III",  name: "General Physician", tag: "Internal Medicine",
    desc: "Expert general medicine, diabetology, preventive care and critical care for complex systemic conditions.",
    treatments: ["General Medicine", "Diabetology", "Critical Care", "Preventive Care"],
    img: "https://images.unsplash.com/photo-1638202993928-7267aad84c31?w=700&q=80",
  },
  {
    roman: "IV",   name: "Gynaecology",      tag: "Women's Health",
    desc: "Comprehensive gynaecological care and obstetric services for women across all life stages.",
    treatments: ["Gynaecology", "Obstetrics", "Minimally Invasive Surgery", "Antenatal Care"],
    img: "https://images.unsplash.com/photo-1551076805-e1869033e561?w=700&q=80",
  },
  {
    roman: "V",    name: "Neuro Surgery",    tag: "Brain & Spine",
    desc: "Advanced brain and spine surgery, stroke care, tumour resection and complete neurological intervention.",
    treatments: ["Brain Surgery", "Spine Surgery", "Stroke Care", "Tumour Resection"],
    img: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=700&q=80",
  },
  {
    roman: "VI",   name: "General Surgery",  tag: "Surgical Care",
    desc: "Surgical gastroenterology, laparoscopic surgery, hernia repair and minimally invasive procedures.",
    treatments: ["Laparoscopic Surgery", "Hernia Repair", "GI Surgery", "Laser Surgery"],
    img: "https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=700&q=80",
  },
  {
    roman: "VII",  name: "Urology",          tag: "Urological Care",
    desc: "Urological and andrological care including kidney stones, prostate, reconstructive and endoscopic procedures.",
    treatments: ["Kidney Stones", "Prostate Care", "Andrology", "Endourology"],
    img: "https://images.unsplash.com/photo-1638202993928-7267aad84c31?w=700&q=80",
  },
  {
    roman: "VIII", name: "Physiotherapy",    tag: "Rehabilitation",
    desc: "Structured physiotherapy and rehabilitation for orthopaedic, neurological and post-surgical recovery.",
    treatments: ["Ortho Rehab", "Neuro Rehab", "Post-Op Rehab", "Sports Physio"],
    img: "https://images.unsplash.com/photo-1551076805-e1869033e561?w=700&q=80",
  },
];

const DOCTORS = [
  { name: "Dr. Bharath Reddy Katta",   role: "Robotic Joint Replacement, Arthroscopic & Trauma Surgeon", qual: "MS (Ortho), FIJR",                                           slug: "bharath-reddy-katta",   initial: "B", img: "/LBnagar/DR.BHARATH.png" },
  { name: "Dr. Sameer Hanu Maharshi",  role: "Robotic Joint Replacement, Arthroscopic & Trauma Surgeon", qual: "MS (Ortho), FIJR",                                           slug: "sameer-hanu-maharshi",  initial: "S", img: "/LBnagar/DR.SAMEER HANU.png" },
  { name: "Dr. Akhil Dadi",            role: "Robotic Joint Replacement Surgeon",                        qual: "MS (Ortho)",                                                  slug: "akhil-dadi",            initial: "A", img: "/Akhildadi.jpg" },
  { name: "Dr. Rajashekar",            role: "Clinical Cardiologist",                                    qual: "MBBS, Diploma (Cardiology)",                                  slug: "rajashekar",            initial: "R", img: "/LBnagar/DR.SRAJASHEKAR.png" },
  { name: "Dr. Karunakar",             role: "General Physician & Diabetologist & Critical Care",        qual: "MBBS, MD",                                                    slug: "karunakar",             initial: "K", img: "/LBnagar/DR.KARUNAKAR.png" },
  { name: "Dr. Pranathi",              role: "Gynaecologist",                                            qual: "MBBS, DGO",                                                   slug: "pranathi",              initial: "P", img: "" },
  { name: "Dr. Kota Ravi Chandra",     role: "Brain & Spine Surgeon",                                   qual: "MBBS, MS, MCh (Neuro Surgery)",                               slug: "ravi-chandra",          initial: "K", img: "/LBnagar/DR.RAVICHANDER.png" },
  { name: "Dr. Hemanth Kumar",         role: "Surgical Gastro & Laparoscopic Surgeon",                  qual: "MBBS, DNB (GS), FMAS, FIAGES, FISCP, FALS – HERNIA",          slug: "hemanth-kumar",         initial: "H", img: "/LBnagar/DR.HEMANTH.png" },
  { name: "Dr. Srikanth",              role: "Urologist & Andrologist",                                 qual: "MBBS, DNB, DrNB (Urology)",                                   slug: "srikanth",              initial: "S", img: "" },
  { name: "Dr. Raj Kiran",             role: "Plastic Reconstructive & Aesthetic Surgeon",              qual: "MS (General Surgery), M.Ch (Plastic Surgery)",                slug: "raj-kiran",             initial: "R", img: "" },
  { name: "Dr. Jaipal",               role: "Pediatrician",                                             qual: "MBBS (Pediatrics)",                                           slug: "jaipal",                initial: "J", img: "" },
  { name: "Dr. Raghu Kumar",           role: "ENT Specialist",                                          qual: "MBBS, MS",                                                    slug: "raghu-kumar",           initial: "R", img: "" },
];

const FACILITIES = [
  {
    icon: "✦", name: "Cardiac Catheterisation Lab",
    desc: "Bi-plane digital cath lab enabling angiography, angioplasty and complex electrophysiology — staffed round the clock for STEMI emergencies.",
    img: "https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=600&q=80",
  },
  {
    icon: "◈", name: "3T MRI & 256-Slice CT Suite",
    desc: "Cutting-edge imaging including 3-Tesla MRI, 256-slice CT, digital mammography and nuclear medicine under a single roof.",
    img: "https://images.unsplash.com/photo-1516549655169-df83a0774514?w=600&q=80",
  },
  {
    icon: "⬡", name: "Modular Operation Theatres",
    desc: "Eight laminar-flow OTs with dedicated suites for cardiac, neuro, robotic and orthopaedic procedures.",
    img: "https://images.unsplash.com/photo-1584982751601-97dcc096659c?w=600&q=80",
  },
  {
    icon: "◎", name: "NABL Accredited Laboratory",
    desc: "Comprehensive automated laboratory offering 1,400+ tests with molecular diagnostics, flow cytometry and 24/7 blood bank.",
    img: "https://images.unsplash.com/photo-1578496780896-7282d7a5e27e?w=600&q=80",
  },
  {
    icon: "✧", name: "48-Bed Multi-Specialty ICU",
    desc: "Cardiac, Neuro, Surgical and Medical ICU pods with full monitoring, CRRT, ECMO and ventilator support.",
    img: "https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=600&q=80",
  },
  {
    icon: "❋", name: "Rehabilitation & Wellness Centre",
    desc: "Physiotherapy, occupational therapy, speech pathology, hydrotherapy and a dedicated cardiac rehab programme.",
    img: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=600&q=80",
  },
];

const TESTIMONIALS = [
  {
    text: "After years of chronic back pain, Dr. Sreenivas performed a minimally invasive spinal fusion that gave me my life back. The care at LB Nagar is truly beyond words.",
    name: "Venkat Ramaiah",       area: "LB Nagar, Hyderabad",      dept: "Orthopaedics",
    img: "https://images.unsplash.com/photo-1584982751601-97dcc096659c?w=800&q=80",
  },
  {
    text: "Dr. Usha guided us through an incredibly difficult high-risk pregnancy with unmatched expertise and compassion. Our son is healthy and thriving thanks to this remarkable team.",
    name: "Deepa & Suresh Mohan", area: "Saroornagar, Hyderabad",   dept: "Obstetrics",
    img: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80",
  },
  {
    text: "When my father suffered a massive stroke, the team here saved his life in minutes. Dr. Farida's stroke protocol and the ICU staff are nothing short of extraordinary.",
    name: "Pradeep Kumar",        area: "Hayathnagar, Hyderabad",   dept: "Neurology",
    img: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=800&q=80",
  },
];

// Hospital campus photo mosaic
const CAMPUS_PHOTOS = [
  { src: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=900&q=85", label: "Main Building",      span: "row" },
  { src: "https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=600&q=80",   label: "Critical Care ICU"  },
  { src: "https://images.unsplash.com/photo-1584982751601-97dcc096659c?w=600&q=80", label: "Operation Theatre"  },
  { src: "https://images.unsplash.com/photo-1578496780896-7282d7a5e27e?w=600&q=80", label: "NABL Laboratory"    },
  { src: "https://images.unsplash.com/photo-1516549655169-df83a0774514?w=600&q=80", label: "Imaging Suite"      },
];

const OTHER_BRANCHES = [
  "RTC X Roads", "Miyapur", "Lakdikapul", "Kompally",
  "Vijayawada",  "Peerzadiguda", "Rajahmundry", "ECIL",
];

// ─── COLOURS ──────────────────────────────────────────────────────────────────
const N  = "#1B2A4A";   // navy
const ND = "#0F1E35";   // navy dark
const M  = "#B8246E";   // magenta
const MD = "#8A1A52";   // magenta dark

// ─── REVEAL HOOK ──────────────────────────────────────────────────────────────
function useReveal(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setOn(true); io.unobserve(el); } },
      { threshold }
    );
    io.observe(el); return () => io.disconnect();
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
      opacity: on ? 1 : 0, transform: on ? "none" : "translateY(28px)", ...style,
    }}>{children}</div>
  );
}

// ─── DECORATIVE COMPONENTS ────────────────────────────────────────────────────
const DiamondDivider = ({ color = M }: { color?: string }) => (
  <div style={{ display: "flex", alignItems: "center", gap: "0.8rem" }}>
    <div style={{ flex: 1, height: 1, background: `linear-gradient(90deg,transparent,${color})` }} />
    <svg width="12" height="12" viewBox="0 0 12 12"><rect x="2" y="2" width="8" height="8" fill={color} transform="rotate(45 6 6)" /></svg>
    <svg width="18" height="18" viewBox="0 0 18 18"><rect x="3" y="3" width="12" height="12" fill="none" stroke={color} strokeWidth="1.5" transform="rotate(45 9 9)" /></svg>
    <svg width="12" height="12" viewBox="0 0 12 12"><rect x="2" y="2" width="8" height="8" fill={color} transform="rotate(45 6 6)" /></svg>
    <div style={{ flex: 1, height: 1, background: `linear-gradient(90deg,${color},transparent)` }} />
  </div>
);

const CornerOrnament = ({ size = 32, color = M, flip = false }: { size?: number; color?: string; flip?: boolean }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" style={{ transform: flip ? "rotate(180deg)" : "none" }}>
    <path d="M2 2 L16 2 L16 5 L5 5 L5 16 L2 16 Z" fill={color} opacity="0.65" />
    <path d="M4 4 L14 4 L14 6 L6 6 L6 14 L4 14 Z" fill="none" stroke={color} strokeWidth="0.5" opacity="0.35" />
  </svg>
);

const SunburstDivider = ({ color = N }: { color?: string }) => (
  <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "1rem" }}>
    <div style={{ flex: 1, height: 1, background: `linear-gradient(90deg,transparent,${color}40)` }} />
    <svg width="48" height="48" viewBox="0 0 48 48">
      {Array.from({ length: 12 }).map((_, i) => {
        const a = (i * 30 * Math.PI) / 180;
        return <line key={i} x1={24+14*Math.cos(a)} y1={24+14*Math.sin(a)} x2={24+22*Math.cos(a)} y2={24+22*Math.sin(a)} stroke={color} strokeWidth="1.2" opacity="0.6" />;
      })}
      <circle cx="24" cy="24" r="6" fill="none" stroke={color} strokeWidth="1.2" />
      <circle cx="24" cy="24" r="3"  fill={color} opacity="0.75" />
    </svg>
    <div style={{ flex: 1, height: 1, background: `linear-gradient(90deg,${color}40,transparent)` }} />
  </div>
);

const ArtDecoPattern = () => (
  <svg width="100%" height="120" viewBox="0 0 1440 120" preserveAspectRatio="none" style={{ display: "block" }}>
    <defs>
      <pattern id="deco" x="0" y="0" width="80" height="120" patternUnits="userSpaceOnUse">
        <line x1="40" y1="0"   x2="40" y2="120" stroke={N} strokeWidth="0.5" opacity="0.1"  />
        <line x1="0"  y1="60"  x2="80" y2="60"  stroke={M} strokeWidth="0.5" opacity="0.08" />
        <polygon points="40,10 50,30 40,50 30,30" fill="none" stroke={N} strokeWidth="0.5" opacity="0.09" />
        <polygon points="40,70 50,90 40,110 30,90" fill="none" stroke={N} strokeWidth="0.5" opacity="0.09" />
      </pattern>
    </defs>
    <rect width="1440" height="120" fill="url(#deco)" />
  </svg>
);

// ─── PAGE ─────────────────────────────────────────────────────────────────────
export default function LBNagarPage() {
  const [scrolled,   setScrolled]   = useState(false);
  const [menuOpen,   setMenuOpen]   = useState(false);
  const [activeSpec, setActiveSpec] = useState(0);
  const [activeTest, setActiveTest] = useState(0);
  const [form, setForm] = useState({ name:"", phone:"", dept:"", date:"", reason:"" });
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    const t = setInterval(() => setActiveTest(p => (p+1) % TESTIMONIALS.length), 5500);
    return () => clearInterval(t);
  }, []);

  const submit = (e: React.FormEvent) => {
    e.preventDefault(); setSent(true); setTimeout(() => setSent(false), 3500);
  };

  const serif1: React.CSSProperties = { fontFamily: "'Playfair Display',serif" };
  const serif2: React.CSSProperties = { fontFamily: "'Libre Baskerville',serif" };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=Crimson+Pro:ital,wght@0,300;0,400;1,300;1,400&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
        html{scroll-behavior:smooth;}
        body{font-family:'Crimson Pro',serif;background:#fff;color:#0F1621;overflow-x:hidden;}
        body::before{content:'';position:fixed;inset:0;z-index:0;pointer-events:none;background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");opacity:.2;mix-blend-mode:multiply;}
        ::-webkit-scrollbar{width:5px;}
        ::-webkit-scrollbar-track{background:#EDF0F5;}
        ::-webkit-scrollbar-thumb{background:#B8246E;border-radius:0;}
        @keyframes fadeUp{from{opacity:0;transform:translateY(36px);}to{opacity:1;transform:translateY(0);}}
        @keyframes shimmer{0%,100%{opacity:.6;}50%{opacity:1;}}
        @keyframes marquee{from{transform:translateX(0);}to{transform:translateX(-50%);}}
        @keyframes scaleIn{from{transform:scale(.94);opacity:0;}to{transform:scale(1);opacity:1;}}
        @keyframes imgReveal{from{opacity:0;transform:scale(1.06);}to{opacity:1;transform:scale(1);}}
        .ha1{animation:fadeUp .9s ease .1s both;}
        .ha2{animation:fadeUp .9s ease .3s both;}
        .ha3{animation:fadeUp .9s ease .5s both;}
        .ha4{animation:fadeUp .9s ease .7s both;}
        .ha5{animation:fadeUp .9s ease .9s both;}
        .deco-frame{position:relative;}
        .deco-frame::before,.deco-frame::after{content:'';position:absolute;pointer-events:none;}
        .deco-frame::before{inset:8px;border:1px solid rgba(27,42,74,.18);}
        .deco-frame::after{inset:14px;border:.5px dashed rgba(184,36,110,.15);}
        .spec-tab{transition:all .3s ease;cursor:pointer;}
        .spec-tab:hover{background:#F5F7FA !important;}
        .doc-hover{transition:all .35s ease;}
        .doc-hover:hover{transform:translateY(-6px);box-shadow:0 20px 60px rgba(27,42,74,.1);}
        .fac-card{transition:all .3s ease;cursor:pointer;}
        .fac-card:hover .fac-img{transform:scale(1.05);}
        .fac-img{transition:transform .5s ease;}
        .deco-input{width:100%;background:transparent;border:none;border-bottom:1px solid #D5DCE8;color:#0F1621;font-family:'Crimson Pro',serif;font-size:1.1rem;padding:.5rem 0;outline:none;transition:border-color .3s;}
        .deco-input:focus{border-bottom-color:#1B2A4A;}
        .deco-input::placeholder{color:#D5DCE8;font-style:italic;}
        .deco-input option{background:#fff;color:#0F1621;}
        img{display:block;}
        @media(max-width:768px){
          .desk{display:none !important;}
          .mob-ham{display:flex !important;}
          .hero-grid{grid-template-columns:1fr !important;}
          .spec-layout{flex-direction:column !important;}
          .doc-grid{grid-template-columns:1fr 1fr !important;}
          .fac-grid{grid-template-columns:1fr !important;}
          .appt-inner{grid-template-columns:1fr !important;}
          .contact-grid{grid-template-columns:1fr !important;}
          .mosaic-grid{grid-template-columns:1fr 1fr !important;grid-template-rows:auto !important;}
          .mosaic-main{grid-row:auto !important;}
          .section-pad{padding:4rem 1.5rem !important;}
          .hero-title{font-size:clamp(3rem,9vw,5rem) !important;}
          .wm{display:none !important;}
          .hero-pad{padding:7rem 1.5rem 4rem !important;}
        }
      `}</style>

      {/* ── TOP INFO STRIP ── */}
      <div style={{ background: N, padding: "7px 3rem", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: ".5rem", position: "relative", zIndex: 600 }}>
        <div style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
          <span style={{ fontSize: ".65rem", letterSpacing: ".2em", textTransform: "uppercase", color: "rgba(255,255,255,.6)", ...serif2 }}>Srikara Hospital · LB Nagar Branch</span>
          <span style={{ width: 1, height: 14, background: "rgba(255,255,255,.2)", display: "block" }} />
          <a href="tel:040-2429-6100" style={{ fontSize: ".7rem", color: M, fontWeight: 700, textDecoration: "none", letterSpacing: ".1em", ...serif2 }}>Emergency: 040-2429-6100</a>
        </div>
        <Link href="/" style={{ fontSize: ".62rem", color: "rgba(255,255,255,.45)", textDecoration: "none", letterSpacing: ".15em", textTransform: "uppercase", ...serif2 }}>← Main Website</Link>
      </div>

      {/* ── NAVBAR ── */}
      <nav style={{ position: "sticky", top: 0, zIndex: 500, background: scrolled ? "rgba(255,255,255,.97)" : "#fff", backdropFilter: scrolled ? "blur(16px)" : "none", borderBottom: `1px solid ${scrolled ? "rgba(27,42,74,.14)" : "rgba(27,42,74,.07)"}`, boxShadow: scrolled ? "0 2px 32px rgba(27,42,74,.07)" : "none", transition: "all .4s ease" }}>
        <div style={{ height: 3, background: `linear-gradient(90deg,${N},${M},${N})` }} />
        <div className="section-pad" style={{ maxWidth: 1400, margin: "0 auto", padding: "0 3rem", height: 68, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: 14, textDecoration: "none" }}>
            <div style={{ width: 44, height: 44, position: "relative", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <svg width="44" height="44" viewBox="0 0 44 44">
                <polygon points="22,4 40,13 40,31 22,40 4,31 4,13" fill="none" stroke={N} strokeWidth="1.5" />
                <polygon points="22,9 35,15.5 35,28.5 22,35 9,28.5 9,15.5" fill="none" stroke={M} strokeWidth=".75" opacity=".55" />
              </svg>
              {/* 🔥 LOGO IMAGE */}
  <img
    src="/srikara-logo.png"   
    alt="Srikara Hospitals"
    style={{
      width: 44,
      height: 44,
      objectFit: "contain",
      borderRadius: 6,
    }}
  />
            </div>
            <div>
              <p style={{ ...serif1, fontSize: "1.1rem", fontWeight: 700, color: N, lineHeight: 1.1, letterSpacing: ".02em" }}>Srikara Hospital</p>
              <p style={{ fontSize: ".58rem", color: M, letterSpacing: ".22em", textTransform: "uppercase", ...serif2 }}>LB Nagar · Hyderabad</p>
            </div>
          </Link>
          <div className="desk" style={{ display: "flex", alignItems: "center", gap: "2.5rem" }}>
            {NAV_LINKS.map(l => (
              <Link key={l.href} href={l.href} style={{ ...serif2, fontSize: ".78rem", color: "#1B2A4A", letterSpacing: ".06em", textDecoration: "none", transition: "color .2s" }}
                onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.color = M}
                onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.color = N}>{l.label}</Link>
            ))}
            <Link href="#appointment" style={{ ...serif1, background: N, color: "#fff", padding: ".5rem 1.6rem", fontSize: ".78rem", textDecoration: "none", letterSpacing: ".08em", fontStyle: "italic", transition: "background .2s", boxShadow: `0 3px 12px rgba(27,42,74,.22)` }}
              onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.background = ND}
              onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.background = N}>
              Book Appointment
            </Link>
          </div>
          <button className="mob-ham" onClick={() => setMenuOpen(!menuOpen)} style={{ display: "none", flexDirection: "column", gap: 5, background: "none", border: `1px solid #D5DCE8`, padding: ".4rem .6rem", cursor: "pointer" }}>
            {[0,1,2].map(i => <span key={i} style={{ width: 22, height: 1.5, background: N, display: "block" }} />)}
          </button>
        </div>
        {menuOpen && (
          <div style={{ background: "#fff", borderTop: "1px solid #EDF0F5", padding: "1.5rem 2rem", display: "flex", flexDirection: "column", gap: "1.2rem" }}>
            {NAV_LINKS.map(l => (
              <Link key={l.href} href={l.href} onClick={() => setMenuOpen(false)} style={{ ...serif2, color: N, textDecoration: "none", fontSize: ".9rem", letterSpacing: ".06em", paddingBottom: ".8rem", borderBottom: "1px solid #EDF0F5" }}>{l.label}</Link>
            ))}
            <Link href="#appointment" onClick={() => setMenuOpen(false)} style={{ ...serif1, background: N, color: "#fff", padding: ".8rem", textAlign: "center", textDecoration: "none", fontStyle: "italic" }}>Book Appointment</Link>
          </div>
        )}
      </nav>

      {/* ══════════════════════════════════════════
          HERO — white with right-side hospital photo
          ══════════════════════════════════════════ */}
      <section style={{ background: "#fff", position: "relative", overflow: "hidden", minHeight: "92vh", display: "flex", alignItems: "center" }}>

        {/* Art Deco bg pattern */}
        <div style={{ position: "absolute", inset: 0, opacity: .04, pointerEvents: "none" }}>
          <svg width="100%" height="100%">
            <defs><pattern id="deco-bg" x="0" y="0" width="120" height="120" patternUnits="userSpaceOnUse">
              <polygon points="60,10 110,35 110,85 60,110 10,85 10,35" fill="none" stroke={N} strokeWidth=".8" />
              <polygon points="60,25 95,42 95,78 60,95 25,78 25,42" fill="none" stroke={M} strokeWidth=".4" />
              <circle cx="60" cy="60" r="4" fill={N} opacity=".5" />
            </pattern></defs>
            <rect width="100%" height="100%" fill="url(#deco-bg)" />
          </svg>
        </div>

        {/* Right-side hospital photo */}
        <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: "48%", overflow: "hidden" }}>
          <img src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1200&q=85" alt="Srikara Hospital LB Nagar"
            style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }} />
          {/* Gradient fade left so text reads cleanly */}
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg,#fff 0%,rgba(255,255,255,.4) 35%,transparent 65%)", pointerEvents: "none" }} />
          {/* Bottom dark fade */}
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom,transparent 60%,rgba(255,255,255,.6))", pointerEvents: "none" }} />

          {/* Floating accreditation badge on photo */}
          <div style={{ position: "absolute", top: 28, right: 28, background: N, padding: "1rem 1.4rem", boxShadow: `0 8px 28px rgba(27,42,74,.3)` }}>
            <div style={{ position: "absolute", inset: 4, border: `1px solid rgba(184,36,110,.4)`, pointerEvents: "none" }} />
            <p style={{ ...serif2, fontSize: ".55rem", letterSpacing: ".2em", textTransform: "uppercase", color: "rgba(255,255,255,.55)", marginBottom: ".3rem" }}>Accredited By</p>
            <p style={{ ...serif1, fontSize: ".95rem", color: "#fff", fontWeight: 700 }}>NABH & NABL</p>
          </div>

          {/* Floating emergency card */}
          <div style={{ position: "absolute", bottom: 32, right: 28, background: "#fff", padding: "1.1rem 1.4rem", boxShadow: "0 10px 36px rgba(0,0,0,.12)", border: `1px solid rgba(184,36,110,.2)` }}>
            <div style={{ display: "flex", alignItems: "center", gap: ".5rem", marginBottom: ".4rem" }}>
              <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#22c55e", display: "inline-block", boxShadow: "0 0 0 3px rgba(34,197,94,.2)", animation: "shimmer 2s ease infinite" }} />
              <span style={{ ...serif2, fontSize: ".58rem", color: "#22c55e", fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase" }}>Emergency Active</span>
            </div>
            <p style={{ ...serif1, fontSize: "1.1rem", color: N }}>040-2429-6100</p>
            <p style={{ ...serif2, fontSize: ".65rem", color: "#888", marginTop: ".2rem" }}>24 hours · 7 days a week</p>
          </div>
        </div>

        {/* White radial fade over photo for text legibility */}
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 30% 50%,#fff 25%,transparent 68%)", pointerEvents: "none", zIndex: 1 }} />

        {/* Watermark */}
        <div className="wm desk" style={{ position: "absolute", right: "5%", top: "50%", transform: "translateY(-50%)", ...serif1, fontSize: "20vw", fontWeight: 700, color: "rgba(27,42,74,.03)", lineHeight: .9, letterSpacing: ".05em", pointerEvents: "none", userSelect: "none", whiteSpace: "nowrap", zIndex: 1 }}>LB NAGAR</div>

        {/* Content */}
        <div style={{ position: "relative", zIndex: 2, width: "100%", maxWidth: 1400, margin: "0 auto", padding: "6rem 3rem 5rem" }} className="hero-pad">
          <div className="desk" style={{ position: "absolute", top: "4rem", left: "3rem" }}><CornerOrnament color={N} /></div>

          {/* Eyebrow */}
          <div className="ha1" style={{ display: "flex", alignItems: "center", gap: "1.2rem", marginBottom: "2rem" }}>
            <div style={{ width: 48, height: 1, background: M }} />
            <span style={{ ...serif2, fontSize: ".68rem", letterSpacing: ".28em", textTransform: "uppercase", color: M }}>Est. 2007 · LB Nagar, Hyderabad</span>
            <div style={{ width: 48, height: 1, background: M }} />
          </div>

          {/* Hero text — left 52% */}
          <div style={{ maxWidth: "50%" }} className="hero-grid">
            <h1 className="ha2 hero-title" style={{ ...serif1, fontSize: "clamp(3.5rem,6.5vw,7.5rem)", fontWeight: 700, color: N, lineHeight: .92, marginBottom: ".5rem", letterSpacing: "-.01em" }}>Caring for</h1>
            <h1 className="ha2 hero-title" style={{ ...serif1, fontSize: "clamp(3.5rem,6.5vw,7.5rem)", fontWeight: 400, fontStyle: "italic", color: "#0F1621", lineHeight: .92, marginBottom: ".5rem" }}>generations</h1>
            <h1 className="ha2 hero-title" style={{ ...serif1, fontSize: "clamp(3.5rem,6.5vw,7.5rem)", fontWeight: 700, color: N, lineHeight: .92, marginBottom: "2.5rem" }}>of families.</h1>

            <div className="ha3" style={{ marginBottom: "2rem" }}><DiamondDivider color={M} /></div>

            <p className="ha3" style={{ ...serif2, fontSize: "1.05rem", color: "#4A6080", lineHeight: 1.85, maxWidth: 480, marginBottom: "3rem" }}>
              For seventeen years, Srikara LB Nagar has stood as South-East Hyderabad's most trusted centre for compassionate, expert healthcare — where every patient is treated with the dignity and attention they deserve.
            </p>

            <div className="ha4" style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
              <Link href="#appointment" style={{ ...serif1, display: "inline-flex", alignItems: "center", gap: 10, background: N, color: "#fff", padding: ".95rem 2.4rem", textDecoration: "none", fontSize: ".88rem", fontStyle: "italic", letterSpacing: ".06em", transition: "all .3s", boxShadow: `4px 4px 0 ${M}` }}
                onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = ND; (e.currentTarget as HTMLAnchorElement).style.boxShadow = `6px 6px 0 ${M}`; }}
                onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = N; (e.currentTarget as HTMLAnchorElement).style.boxShadow = `4px 4px 0 ${M}`; }}>
                Reserve Your Appointment
              </Link>
              <a href="tel:040-2429-6100" style={{ ...serif2, display: "inline-flex", alignItems: "center", gap: 10, border: `1.5px solid #D5DCE8`, color: N, padding: ".95rem 2rem", textDecoration: "none", fontSize: ".85rem", transition: "border-color .3s" }}
                onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.borderColor = N}
                onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.borderColor = "#D5DCE8"}>
                🚑 &nbsp;Emergency: 040-2429-6100
              </a>
            </div>

            <div className="ha5" style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap", marginTop: "2.5rem", paddingTop: "2rem" }}>
              {["NABH Accredited","ISO 9001:2015","NABL Lab","100+ Insurers"].map(tag => (
                <span key={tag} style={{ ...serif2, fontSize: ".62rem", letterSpacing: ".14em", textTransform: "uppercase", color: M, border: `1px solid ${M}40`, padding: ".3rem .8rem" }}>{tag}</span>
              ))}
            </div>
          </div>
        </div>

        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0 }}>
          <div style={{ height: 2, background: `linear-gradient(90deg,transparent,${N},${M},${N},transparent)` }} />
          <ArtDecoPattern />
        </div>
      </section>

      {/* ── MARQUEE ── */}
      <div style={{ background: N, padding: ".8rem 0", overflow: "hidden", whiteSpace: "nowrap", position: "relative", zIndex: 2 }}>
        <div style={{ display: "inline-flex", gap: "3rem", animation: "marquee 35s linear infinite" }}>
          {Array(3).fill(["Advanced Cardiac Care","Joint Replacement Surgery","Stroke Neurology","High-Risk Obstetrics","Oncology & Tumour Board","Bariatric Surgery","Neonatal ICU","NABH Accredited","24/7 Emergency","Digital Diagnostics","Fertility & IVF","Physiotherapy & Rehab"]).flat().map((t,i) => (
            <span key={i} style={{ display: "inline-flex", alignItems: "center", gap: "1rem", ...serif2, fontSize: ".68rem", letterSpacing: ".2em", textTransform: "uppercase", color: "rgba(255,255,255,.72)" }}>
              <svg width="8" height="8" viewBox="0 0 8 8"><rect x="1" y="1" width="6" height="6" fill={M} transform="rotate(45 4 4)" /></svg>
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* ══════════════════════════════════════════
          PHOTO MOSAIC — campus gallery
          ══════════════════════════════════════════ */}
      <section style={{ background: "#fff", padding: "5rem 3rem 0" }}>
        <div style={{ maxWidth: 1400, margin: "0 auto" }}>
          <Reveal>
            <div style={{ display: "flex", alignItems: "center", gap: "1.5rem", marginBottom: "2rem" }}>
              <span style={{ ...serif2, fontSize: ".6rem", letterSpacing: ".22em", textTransform: "uppercase", color: M }}>Our Campus</span>
              <div style={{ flex: 1, height: 1, background: "linear-gradient(90deg,#D5DCE8,transparent)" }} />
              <span style={{ ...serif2, fontSize: ".6rem", letterSpacing: ".16em", textTransform: "uppercase", color: "#D5DCE8" }}>LB Nagar · Hyderabad</span>
            </div>
          </Reveal>
          <Reveal>
            <div className="mosaic-grid" style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gridTemplateRows: "240px 200px", gap: 4 }}>
              {/* Main large photo */}
              <div className="mosaic-main" style={{ gridRow: "1/3", position: "relative", overflow: "hidden", background: "#EDF0F5" }}>
                <img src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1000&q=85" alt="Srikara LB Nagar Building"
                  style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform .6s ease" }}
                  onMouseEnter={e => (e.currentTarget as HTMLImageElement).style.transform = "scale(1.04)"}
                  onMouseLeave={e => (e.currentTarget as HTMLImageElement).style.transform = "scale(1)"} />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(transparent 55%,rgba(27,42,74,.55))", pointerEvents: "none" }} />
                <div style={{ position: "absolute", bottom: 20, left: 20 }}>
                  <span style={{ ...serif2, fontSize: ".6rem", letterSpacing: ".16em", textTransform: "uppercase", color: "rgba(255,255,255,.75)", border: `1px solid ${M}55`, padding: ".25rem .8rem" }}>Main Building</span>
                </div>
                {/* Art Deco number watermark */}
                <div style={{ position: "absolute", top: 14, left: 18, ...serif1, fontSize: "5rem", fontWeight: 700, color: `${M}20`, lineHeight: 1, userSelect: "none" }}>01</div>
              </div>
              {/* 4 smaller photos */}
              {[
                { src: "https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=600&q=80",  label: "ICU" },
                { src: "https://images.unsplash.com/photo-1584982751601-97dcc096659c?w=600&q=80", label: "OT Suite" },
                { src: "https://images.unsplash.com/photo-1578496780896-7282d7a5e27e?w=600&q=80", label: "Laboratory" },
                { src: "https://images.unsplash.com/photo-1516549655169-df83a0774514?w=600&q=80", label: "MRI Suite" },
              ].map(({ src, label }) => (
                <div key={label} style={{ position: "relative", overflow: "hidden", background: "#EDF0F5" }}>
                  <img src={src} alt={label} loading="lazy"
                    style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform .6s ease" }}
                    onMouseEnter={e => (e.currentTarget as HTMLImageElement).style.transform = "scale(1.06)"}
                    onMouseLeave={e => (e.currentTarget as HTMLImageElement).style.transform = "scale(1)"} />
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(transparent 50%,rgba(27,42,74,.5))", pointerEvents: "none" }} />
                  <div style={{ position: "absolute", bottom: 10, left: 12 }}>
                    <span style={{ ...serif2, fontSize: ".58rem", letterSpacing: ".14em", textTransform: "uppercase", color: "rgba(255,255,255,.8)", background: "rgba(27,42,74,.4)", padding: ".18rem .55rem" }}>{label}</span>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          QUICK SERVICES BAR
          ══════════════════════════════════════════ */}
      <section style={{ background: "#F5F7FA", borderTop: "1px solid #EDF0F5", borderBottom: "1px solid #EDF0F5", padding: "2.2rem 3rem", marginTop: "4px" }}>
        <div style={{ maxWidth: 1400, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "1.2rem" }}>
          {[
            { icon: "🩺", title: "OPD Consultation", sub: "Book with a specialist", href: "#appointment" },
            { icon: "🚑", title: "Emergency Care",    sub: "040-2429-6100 · 24/7",  href: "tel:040-2429-6100" },
            { icon: "🧪", title: "Lab & Reports",     sub: "NABL certified tests",   href: "#facilities" },
            { icon: "🏨", title: "Health Packages",   sub: "Preventive check-ups",   href: "#appointment" },
          ].map(q => (
            <a key={q.title} href={q.href}
              style={{ background: "#fff", border: "1px solid #EDF0F5", padding: "1.1rem 1.3rem", display: "flex", alignItems: "center", gap: ".9rem", textDecoration: "none", transition: "all .2s" }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = `${M}55`; e.currentTarget.style.boxShadow = `0 4px 18px rgba(184,36,110,.09)`; e.currentTarget.style.transform = "translateY(-2px)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "#EDF0F5"; e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.transform = "none"; }}>
              <span style={{ fontSize: "1.5rem", flexShrink: 0 }}>{q.icon}</span>
              <div>
                <div style={{ ...serif1, fontSize: ".85rem", fontWeight: 600, color: N }}>{q.title}</div>
                <div style={{ ...serif2, fontSize: ".68rem", color: "#888", marginTop: 2 }}>{q.sub}</div>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════
          SPECIALITIES — tab layout with dept image
          ══════════════════════════════════════════ */}
      <section id="specialities" className="section-pad" style={{ background: "#fff", padding: "7rem 3rem" }}>
        <div style={{ maxWidth: 1400, margin: "0 auto" }}>
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: "1rem" }}>
              <span style={{ ...serif2, fontSize: ".65rem", letterSpacing: ".28em", textTransform: "uppercase", color: M }}>Medical Excellence</span>
            </div>
            <h2 style={{ ...serif1, fontSize: "clamp(2.2rem,4vw,4.5rem)", fontWeight: 700, color: N, textAlign: "center", lineHeight: 1.05, marginBottom: ".5rem" }}>Our Specialities</h2>
            <p style={{ ...serif1, fontSize: "clamp(1.2rem,2vw,1.6rem)", color: "#4A6080", fontStyle: "italic", textAlign: "center", marginBottom: "2rem" }}>Comprehensive care across every discipline</p>
            <div style={{ marginBottom: "4rem" }}><DiamondDivider color={N} /></div>
          </Reveal>

          <div className="spec-layout" style={{ display: "flex", border: `1px solid #D5DCE8` }}>
            {/* Tab list */}
            <div style={{ width: 260, flexShrink: 0, borderRight: `1px solid #D5DCE8` }}>
              {SPECIALITIES.map((s, i) => (
                <Reveal key={s.name} delay={i * 50}>
                  <div className="spec-tab" onClick={() => setActiveSpec(i)}
                    style={{ padding: "1.4rem 1.5rem", background: activeSpec===i ? "#F5F7FA" : "#fff", borderLeft: activeSpec===i ? `3px solid ${N}` : "3px solid transparent", borderBottom: "1px solid #EDF0F5" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: ".8rem" }}>
                      <span style={{ ...serif1, fontSize: ".7rem", color: activeSpec===i ? M : "#D5DCE8", fontStyle: "italic", fontWeight: 600, transition: "color .25s" }}>{s.roman}</span>
                      <span style={{ ...serif1, fontSize: ".92rem", fontWeight: activeSpec===i ? 700 : 400, color: activeSpec===i ? N : "#1B2A4A", transition: "all .25s" }}>{s.name}</span>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>

            {/* Detail panel — with department image */}
            <div style={{ flex: 1, display: "flex", background: "#F5F7FA", overflow: "hidden" }}>
              {/* Text side */}
              <div style={{ flex: 1, padding: "3rem 3rem", position: "relative" }}>
                <div style={{ position: "absolute", top: "1.5rem", left: "1.5rem" }}><CornerOrnament size={24} color={M} /></div>
                <div style={{ position: "absolute", top: "1.5rem", right: "1.5rem" }}><CornerOrnament size={24} color={M} flip /></div>
                <div style={{ animation: "scaleIn .4s ease" }} key={activeSpec}>
                  <span style={{ ...serif2, fontSize: ".62rem", letterSpacing: ".2em", textTransform: "uppercase", color: M, display: "block", marginBottom: ".8rem" }}>{SPECIALITIES[activeSpec].tag}</span>
                  <h3 style={{ ...serif1, fontSize: "clamp(1.8rem,3vw,3rem)", fontWeight: 700, color: N, lineHeight: 1.1, marginBottom: "1rem" }}>{SPECIALITIES[activeSpec].name}</h3>
                  <div style={{ marginBottom: "1.5rem" }}><DiamondDivider color={M} /></div>
                  <p style={{ ...serif2, fontSize: "1rem", color: "#1B2A4A", lineHeight: 1.85, marginBottom: "2rem" }}>{SPECIALITIES[activeSpec].desc}</p>
                  <div>
                    <p style={{ ...serif2, fontSize: ".62rem", letterSpacing: ".18em", textTransform: "uppercase", color: "#4A6080", marginBottom: "1rem" }}>Key Treatments</p>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: ".6rem" }}>
                      {SPECIALITIES[activeSpec].treatments.map(t => (
                        <span key={t} style={{ ...serif2, fontSize: ".78rem", color: N, border: `1px solid #D5DCE8`, padding: ".35rem .9rem", background: "#fff" }}>{t}</span>
                      ))}
                    </div>
                  </div>
                  <div style={{ marginTop: "2.5rem" }}>
                    <Link href="#appointment" style={{ ...serif1, display: "inline-flex", alignItems: "center", gap: 10, color: N, textDecoration: "none", fontSize: ".88rem", fontStyle: "italic", borderBottom: `1px solid ${N}`, paddingBottom: 2 }}>
                      Book a consultation →
                    </Link>
                  </div>
                </div>
              </div>
              {/* Department photo right panel */}
              <div style={{ width: "36%", flexShrink: 0, position: "relative", overflow: "hidden" }}>
                <img key={activeSpec} src={SPECIALITIES[activeSpec].img} alt={SPECIALITIES[activeSpec].name} loading="lazy"
                  style={{ width: "100%", height: "100%", objectFit: "cover", animation: "imgReveal .5s ease" }} />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg,#F5F7FA 0%,transparent 30%)", pointerEvents: "none" }} />
                {/* Dept label on photo */}
                <div style={{ position: "absolute", bottom: 20, right: 16 }}>
                  <span style={{ ...serif2, fontSize: ".58rem", letterSpacing: ".14em", textTransform: "uppercase", color: "rgba(255,255,255,.8)", background: `${N}90`, padding: ".22rem .7rem" }}>{SPECIALITIES[activeSpec].tag}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          DOCTORS — with real photos
          ══════════════════════════════════════════ */}
      <section id="doctors" className="section-pad" style={{ background: "#F5F7FA", padding: "7rem 3rem" }}>
        <div style={{ maxWidth: 1400, margin: "0 auto" }}>
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: "1rem" }}>
              <span style={{ ...serif2, fontSize: ".65rem", letterSpacing: ".28em", textTransform: "uppercase", color: M }}>Our Physicians</span>
            </div>
            <h2 style={{ ...serif1, fontSize: "clamp(2.2rem,4vw,4.5rem)", fontWeight: 700, color: N, textAlign: "center", marginBottom: ".4rem" }}>Distinguished Specialists</h2>
            <p style={{ ...serif1, fontSize: "clamp(1.1rem,2vw,1.5rem)", color: "#4A6080", fontStyle: "italic", textAlign: "center", marginBottom: "2rem" }}>Expertise you can trust, compassion you will feel</p>
            <div style={{ marginBottom: "4rem" }}><DiamondDivider color={N} /></div>
          </Reveal>

          <div className="doc-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "1.5rem" }}>
            {DOCTORS.map((d, i) => (
              <Reveal key={d.name} delay={i * 70}>
                <div className="doc-hover" style={{ background: "#fff", border: `1px solid #EDF0F5`, position: "relative", overflow: "hidden" }}>
                  {/* Top colour band */}
                  <div style={{ height: 4, background: i%3===0 ? `linear-gradient(90deg,${N},${ND})` : i%3===1 ? `linear-gradient(90deg,${M},${MD})` : `linear-gradient(90deg,#4A6080,${N})` }} />

                  {/* Doctor photo */}
                  <div style={{ height: 220, overflow: "hidden", position: "relative", background: "#EDF0F5" }}>
                    {d.img ? (
                      <img src={d.img} alt={d.name} loading="lazy"
                        style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top", transition: "transform .5s ease" }}
                        onMouseEnter={e => (e.currentTarget as HTMLImageElement).style.transform = "scale(1.05)"}
                        onMouseLeave={e => (e.currentTarget as HTMLImageElement).style.transform = "scale(1)"} />
                    ) : (
                      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <span style={{ fontSize: "4rem", opacity: .3 }}>👨‍⚕️</span>
                      </div>
                    )}
                    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(transparent 55%,rgba(27,42,74,.6))", pointerEvents: "none" }} />
                    {/* Name overlay */}
                    <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: ".8rem 1.2rem" }}>
                      <p style={{ ...serif1, fontSize: "1rem", fontWeight: 700, color: "#fff", lineHeight: 1.2 }}>{d.name}</p>
                      <p style={{ ...serif2, fontSize: ".65rem", color: M, fontWeight: 700, letterSpacing: ".05em", marginTop: ".15rem" }}>{d.role}</p>
                    </div>
                  </div>

                  {/* Card body */}
                  <div style={{ margin: ".8rem", padding: "1rem 1.2rem", border: `1px solid #EDF0F5`, position: "relative" }}>
                    <div style={{ position: "absolute", top: 5, left: 5 }}><CornerOrnament size={14} color={M} /></div>
                    <div style={{ position: "absolute", top: 5, right: 5 }}><CornerOrnament size={14} color={M} flip /></div>
                    <p style={{ ...serif2, fontSize: ".75rem", color: "#4A6080", lineHeight: 1.5, marginBottom: "1rem" }}>{d.qual}</p>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", marginTop: ".9rem" }}>
                      <Link href={`/doctors?doctor=${d.slug}`} style={{ ...serif1, fontSize: ".75rem", color: N, textDecoration: "none", fontStyle: "italic", borderBottom: `1px solid ${N}`, paddingBottom: 1 }}>View Profile →</Link>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={300}>
            <div style={{ textAlign: "center", marginTop: "3rem" }}>
              <Link href="#" style={{ ...serif1, display: "inline-flex", alignItems: "center", gap: 10, color: N, textDecoration: "none", fontSize: ".92rem", fontStyle: "italic", border: `1.5px solid ${N}`, padding: ".8rem 2.5rem", transition: "all .3s" }}
                onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = N; (e.currentTarget as HTMLAnchorElement).style.color = "#fff"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = "transparent"; (e.currentTarget as HTMLAnchorElement).style.color = N; }}>
                View All 12 Specialists
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          TESTIMONIALS — navy with photo panel
          ══════════════════════════════════════════ */}
      <section style={{ background: N, position: "relative", overflow: "hidden" }}>
        {/* Art Deco pattern */}
        <div style={{ position: "absolute", inset: 0, opacity: .05, pointerEvents: "none" }}>
          <svg width="100%" height="100%"><defs><pattern id="tp" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
            <polygon points="40,5 75,22 75,58 40,75 5,58 5,22" fill="none" stroke="#fff" strokeWidth=".5" /></pattern></defs>
            <rect width="100%" height="100%" fill="url(#tp)" /></svg>
        </div>

        <div style={{ maxWidth: 1400, margin: "0 auto", display: "flex", minHeight: 500, position: "relative", zIndex: 1 }}>
          {/* Left — photo changes with testimonial */}
          <div style={{ flex: "0 0 42%", position: "relative", overflow: "hidden" }}>
            {TESTIMONIALS.map((t, i) => (
              <div key={i} style={{ position: "absolute", inset: 0, opacity: i === activeTest ? 1 : 0, transition: "opacity .8s ease" }}>
                <img src={t.img} alt={t.dept} loading="lazy"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg,transparent 55%,rgba(27,42,74,1))", pointerEvents: "none" }} />
              </div>
            ))}
            {/* Dept pill */}
            <div style={{ position: "absolute", top: 28, left: 24, zIndex: 2 }}>
              <span style={{ ...serif2, fontSize: ".6rem", letterSpacing: ".18em", textTransform: "uppercase", color: M, border: `1px solid ${M}55`, background: `${N}80`, padding: ".3rem .9rem", backdropFilter: "blur(8px)" }}>
                {TESTIMONIALS[activeTest].dept}
              </span>
            </div>
          </div>

          {/* Right — text */}
          <div style={{ flex: 1, padding: "5rem 4rem 5rem 3rem", display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <Reveal>
              <span style={{ ...serif2, fontSize: ".65rem", letterSpacing: ".28em", textTransform: "uppercase", color: M, display: "block", marginBottom: "1rem" }}>Patient Voices</span>
              <h2 style={{ ...serif1, fontSize: "clamp(2rem,3.5vw,3.5rem)", fontWeight: 700, color: "#fff", marginBottom: "1rem" }}>Stories of Healing</h2>
              <div style={{ marginBottom: "3rem" }}><DiamondDivider color={M} /></div>

              <div style={{ position: "relative", minHeight: 220 }}>
                {TESTIMONIALS.map((t, i) => (
                  <div key={i} style={{ position: i===activeTest ? "relative" : "absolute", top: 0, left: 0, right: 0, opacity: i===activeTest ? 1 : 0, transform: i===activeTest ? "none" : "translateY(12px)", transition: "all .7s ease", pointerEvents: i===activeTest ? "auto" : "none" }}>
                    <div style={{ border: `1px solid rgba(184,36,110,.3)`, padding: "2.5rem", position: "relative" }}>
                      <div style={{ position: "absolute", inset: 8, border: `1px solid rgba(184,36,110,.12)`, pointerEvents: "none" }} />
                      <div style={{ position: "absolute", top: "1.2rem", left: "1.2rem" }}><CornerOrnament size={18} color={M} /></div>
                      <div style={{ position: "absolute", top: "1.2rem", right: "1.2rem" }}><CornerOrnament size={18} color={M} flip /></div>
                      <p style={{ ...serif1, fontSize: "clamp(1.05rem,1.8vw,1.4rem)", fontStyle: "italic", color: "rgba(255,255,255,.9)", lineHeight: 1.7, marginBottom: "2rem" }}>"{t.text}"</p>
                      <div style={{ display: "flex", alignItems: "center", gap: "1.2rem" }}>
                        <div style={{ width: 1, height: 28, background: `${M}60` }} />
                        <div>
                          <p style={{ ...serif1, fontWeight: 600, color: "#fff", fontSize: ".9rem" }}>{t.name}</p>
                          <p style={{ ...serif2, fontSize: ".68rem", color: M, marginTop: 2 }}>{t.area}</p>
                        </div>
                        <div style={{ width: 1, height: 28, background: `${M}60` }} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ display: "flex", gap: ".5rem", marginTop: "2.5rem" }}>
                {TESTIMONIALS.map((_,i) => (
                  <button key={i} onClick={() => setActiveTest(i)}
                    style={{ width: i===activeTest ? 32 : 8, height: 3, background: i===activeTest ? M : `${M}35`, border: "none", cursor: "pointer", transition: "all .3s", padding: 0 }} />
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          FACILITIES — with image thumbnails
          ══════════════════════════════════════════ */}
      <section id="facilities" className="section-pad" style={{ background: "#fff", padding: "7rem 3rem" }}>
        <div style={{ maxWidth: 1400, margin: "0 auto" }}>
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: "1rem" }}>
              <span style={{ ...serif2, fontSize: ".65rem", letterSpacing: ".28em", textTransform: "uppercase", color: M }}>Infrastructure</span>
            </div>
            <h2 style={{ ...serif1, fontSize: "clamp(2.2rem,4vw,4.5rem)", fontWeight: 700, color: N, textAlign: "center", marginBottom: ".4rem" }}>Our Facilities</h2>
            <p style={{ ...serif1, fontSize: "clamp(1.1rem,2vw,1.5rem)", color: "#4A6080", fontStyle: "italic", textAlign: "center", marginBottom: "2rem" }}>Built for clinical excellence, designed for patient comfort</p>
            <div style={{ marginBottom: "4rem" }}><DiamondDivider color={N} /></div>
          </Reveal>

          <div className="fac-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "1.5rem" }}>
            {FACILITIES.map((f, i) => (
              <Reveal key={f.name} delay={i * 70}>
                <div className="fac-card" style={{ background: "#F5F7FA", border: `1px solid #D5DCE8`, overflow: "hidden" }}>
                  {/* Photo thumbnail */}
                  <div style={{ height: 160, overflow: "hidden", position: "relative" }}>
                    <img src={f.img} alt={f.name} loading="lazy" className="fac-img"
                      style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(transparent 40%,rgba(27,42,74,.55))", pointerEvents: "none" }} />
                    {/* Gradient top rule */}
                    <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg,${N},${M})` }} />
                    <div style={{ position: "absolute", bottom: 12, left: 14 }}>
                      <span style={{ ...serif2, fontSize: ".58rem", letterSpacing: ".14em", textTransform: "uppercase", color: "rgba(255,255,255,.8)", background: `${N}80`, padding: ".18rem .6rem" }}>{f.icon} {f.name.split(" ").slice(-1)[0]}</span>
                    </div>
                  </div>
                  {/* Text */}
                  <div style={{ padding: "1.5rem 1.5rem" }}>
                    <div style={{ display: "flex", alignItems: "flex-start", gap: ".8rem", marginBottom: ".9rem" }}>
                      <span style={{ fontSize: "1.3rem", color: N, lineHeight: 1, flexShrink: 0, marginTop: 2 }}>{f.icon}</span>
                      <h3 style={{ ...serif1, fontSize: "1rem", fontWeight: 700, color: N, lineHeight: 1.3 }}>{f.name}</h3>
                    </div>
                    <p style={{ ...serif2, fontSize: ".8rem", color: "#4A6080", lineHeight: 1.8 }}>{f.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          APPOINTMENT
          ══════════════════════════════════════════ */}
      <section id="appointment" className="section-pad" style={{ background: "#F5F7FA", padding: "7rem 3rem", position: "relative", overflow: "hidden" }}>
        <div className="desk" style={{ position: "absolute", top: "3rem",    left: "3rem"  }}><CornerOrnament size={48} color={N} /></div>
        <div className="desk" style={{ position: "absolute", top: "3rem",    right: "3rem" }}><CornerOrnament size={48} color={N} flip /></div>
        <div className="desk" style={{ position: "absolute", bottom: "3rem", left: "3rem"  }}><CornerOrnament size={48} color={N} flip /></div>
        <div className="desk" style={{ position: "absolute", bottom: "3rem", right: "3rem" }}><CornerOrnament size={48} color={N} /></div>

        <div style={{ maxWidth: 820, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: "1rem" }}>
              <span style={{ ...serif2, fontSize: ".65rem", letterSpacing: ".28em", textTransform: "uppercase", color: M }}>Schedule a Consultation</span>
            </div>
            <h2 style={{ ...serif1, fontSize: "clamp(2.2rem,4vw,4.5rem)", fontWeight: 700, color: N, textAlign: "center", marginBottom: ".4rem" }}>Book Your Appointment</h2>
            <p style={{ ...serif1, fontSize: "clamp(1rem,1.8vw,1.4rem)", color: "#4A6080", fontStyle: "italic", textAlign: "center", marginBottom: "2rem" }}>We confirm every booking within 30 minutes</p>
            <div style={{ marginBottom: "3.5rem" }}><DiamondDivider color={N} /></div>
          </Reveal>

          <Reveal delay={100}>
            <form onSubmit={submit} style={{ border: `1px solid #D5DCE8`, background: "#fff", position: "relative" }}>
              <div style={{ position: "absolute", inset: 8, border: `1px solid ${M}18`, pointerEvents: "none", zIndex: 0 }} />
              <div className="appt-inner" style={{ position: "relative", zIndex: 1, display: "grid", gridTemplateColumns: "1fr 1fr" }}>
                {[
                  { label: "Your Full Name", key: "name",  type: "text", ph: "As per your records"  },
                  { label: "Mobile Number",  key: "phone", type: "tel",  ph: "+91 98765 43210"       },
                ].map((f, idx) => (
                  <div key={f.key} style={{ padding: "2rem 2rem 1.5rem", borderBottom: "1px solid #EDF0F5", borderRight: idx===0 ? "1px solid #EDF0F5" : "none" }}>
                    <label style={{ ...serif2, fontSize: ".6rem", letterSpacing: ".2em", textTransform: "uppercase", color: M, display: "block", marginBottom: ".8rem" }}>{f.label}</label>
                    <input type={f.type} placeholder={f.ph} value={form[f.key as keyof typeof form]}
                      onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))}
                      className="deco-input" style={{ fontFamily: "'Crimson Pro',serif" }} />
                  </div>
                ))}
                <div style={{ padding: "2rem 2rem 1.5rem", borderBottom: "1px solid #EDF0F5", borderRight: "1px solid #EDF0F5" }}>
                  <label style={{ ...serif2, fontSize: ".6rem", letterSpacing: ".2em", textTransform: "uppercase", color: M, display: "block", marginBottom: ".8rem" }}>Department</label>
                  <select value={form.dept} onChange={e => setForm(p => ({ ...p, dept: e.target.value }))} className="deco-input">
                    <option value="">Select department</option>
                    {SPECIALITIES.map(s => <option key={s.name}>{s.name}</option>)}
                    <option>General Medicine</option>
                    <option>Paediatrics</option>
                  </select>
                </div>
                <div style={{ padding: "2rem 2rem 1.5rem", borderBottom: "1px solid #EDF0F5" }}>
                  <label style={{ ...serif2, fontSize: ".6rem", letterSpacing: ".2em", textTransform: "uppercase", color: M, display: "block", marginBottom: ".8rem" }}>Preferred Date</label>
                  <input type="date" value={form.date} onChange={e => setForm(p => ({ ...p, date: e.target.value }))}
                    min={new Date().toISOString().split("T")[0]} className="deco-input" />
                </div>
                <div style={{ padding: "2rem 2rem 1.5rem", gridColumn: "1 / -1" }}>
                  <label style={{ ...serif2, fontSize: ".6rem", letterSpacing: ".2em", textTransform: "uppercase", color: M, display: "block", marginBottom: ".8rem" }}>Reason for Visit</label>
                  <input type="text" placeholder="Briefly describe your concern" value={form.reason}
                    onChange={e => setForm(p => ({ ...p, reason: e.target.value }))} className="deco-input" />
                </div>
              </div>
              <button type="submit" style={{ width: "100%", background: sent ? "#22c55e" : N, color: "#fff", border: "none", padding: "1.4rem", ...serif1, fontSize: "1.05rem", fontStyle: "italic", letterSpacing: ".1em", cursor: "pointer", transition: "background .3s", position: "relative", zIndex: 1 }}>
                {sent ? "✦ Your Appointment Has Been Received" : "Reserve My Consultation ✦"}
              </button>
            </form>
          </Reveal>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          CONTACT
          ══════════════════════════════════════════ */}
      <section id="contact" className="section-pad" style={{ background: "#fff", padding: "6rem 3rem", borderTop: "1px solid #EDF0F5" }}>
        <div style={{ maxWidth: 1400, margin: "0 auto" }}>
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: "4rem" }}>
              <span style={{ ...serif2, fontSize: ".65rem", letterSpacing: ".28em", textTransform: "uppercase", color: M }}>Find Us</span>
              <h2 style={{ ...serif1, fontSize: "clamp(2rem,3.5vw,4rem)", fontWeight: 700, color: N, marginTop: ".5rem" }}>LB Nagar Branch</h2>
            </div>
          </Reveal>

          <div className="contact-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem" }}>
            <Reveal>
              {/* Map-style photo + details */}
              <div style={{ border: `1px solid #D5DCE8`, overflow: "hidden" }}>
                <div style={{ height: 200, position: "relative", overflow: "hidden" }}>
                  <img src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=900&q=80" alt="Srikara LB Nagar" loading="lazy"
                    style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(transparent 50%,rgba(27,42,74,.7))", pointerEvents: "none" }} />
                  <div style={{ height: 3, background: `linear-gradient(90deg,${N},${M})`, position: "absolute", top: 0, left: 0, right: 0 }} />
                  <div style={{ position: "absolute", bottom: 14, left: 16 }}>
                    <span style={{ ...serif1, fontSize: ".9rem", fontWeight: 600, color: "#fff" }}>📍 LB Nagar, Hyderabad</span>
                  </div>
                </div>
                <div style={{ padding: "2rem" }}>
                  {[
                    { l: "Address",          v: "D.No. 1-1-58/A, LB Nagar Main Road\nLB Nagar, Hyderabad – 500074" },
                    { l: "Emergency (24/7)", v: "040-2429-6100" },
                    { l: "Appointments",     v: "040-2429-6200" },
                    { l: "Email",            v: "lbnagar@srikarahospitals.in" },
                    { l: "OPD Hours",        v: "Monday – Saturday · 8:00 AM – 8:00 PM" },
                  ].map((c, i) => (
                    <div key={c.l} style={{ paddingBottom: "1rem", marginBottom: "1rem", borderBottom: i < 4 ? "1px solid #EDF0F5" : "none" }}>
                      <p style={{ ...serif2, fontSize: ".58rem", letterSpacing: ".18em", textTransform: "uppercase", color: M, marginBottom: ".3rem" }}>{c.l}</p>
                      <p style={{ ...serif1, fontSize: ".95rem", color: N, lineHeight: 1.6, whiteSpace: "pre-line" }}>{c.v}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal delay={100}>
              <div>
                <div style={{ marginBottom: "2rem" }}><DiamondDivider color={M} /></div>
                <h3 style={{ ...serif1, fontSize: "1.5rem", fontWeight: 700, color: N, marginBottom: ".5rem" }}>Srikara Network</h3>
                <p style={{ ...serif2, fontSize: ".82rem", color: "#4A6080", marginBottom: "2rem" }}>Visit any of our 9 branches across Hyderabad & beyond</p>
                <div className="branch-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1px", background: "#D5DCE8", marginBottom: "2rem" }}>
                  {OTHER_BRANCHES.map(b => (
                    <Link key={b} href={`/hospitals/${b.toLowerCase().replace(/ /g,"-")}`}
                      style={{ background: "#fff", padding: ".9rem 1.2rem", textDecoration: "none", display: "flex", alignItems: "center", justifyContent: "space-between", transition: "background .2s" }}
                      onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.background = "#F5F7FA"}
                      onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.background = "#fff"}>
                      <span style={{ ...serif2, fontSize: ".82rem", color: N }}>{b}</span>
                      <span style={{ ...serif1, fontSize: ".72rem", color: M, fontStyle: "italic" }}>→</span>
                    </Link>
                  ))}
                </div>
                <Link href="/" style={{ ...serif1, display: "inline-flex", alignItems: "center", gap: 8, color: N, textDecoration: "none", fontStyle: "italic", fontSize: ".88rem", borderBottom: `1px solid ${N}`, paddingBottom: 2 }}>
                  ← View All Srikara Branches
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ background: N }}>
        <div style={{ height: 3, background: `linear-gradient(90deg,${ND},${M},${ND})` }} />
        <div style={{ padding: "2rem 3rem" }}>
          <div style={{ maxWidth: 1400, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <svg width="28" height="28" viewBox="0 0 44 44"><polygon points="22,4 40,13 40,31 22,40 4,31 4,13" fill="none" stroke="#fff" strokeWidth="1.5" opacity=".6" /></svg>
              <span style={{ ...serif2, fontSize: ".7rem", color: "rgba(255,255,255,.45)", letterSpacing: ".08em" }}>
                © {new Date().getFullYear()} Srikara Hospital – LB Nagar · Part of Srikara Hospital Group, Hyderabad
              </span>
            </div>
            <div style={{ display: "flex", gap: "2rem" }}>
              {["Privacy Policy","Terms of Use","Sitemap"].map(l => (
                <Link key={l} href="#" style={{ ...serif2, fontSize: ".65rem", color: "rgba(255,255,255,.3)", textDecoration: "none", letterSpacing: ".1em" }}>{l}</Link>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}