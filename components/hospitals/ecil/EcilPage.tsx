"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";

// ── IMAGES ────────────────────────────────────────────────────────────────────
const IMG = {
  heroBg:    "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=1800&q=80",
  heroDoc:   "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=900&q=80",
  cardio:    "https://images.unsplash.com/photo-1628348068343-c6a848d2b6dd?w=600&q=80",
  ortho:     "https://images.unsplash.com/photo-1530026186672-2cd00ffc50fe?w=600&q=80",
  neuro:     "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=600&q=80",
  gynae:     "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&q=80",
  paeds:     "https://images.unsplash.com/photo-1576765607924-3f7b8410a787?w=600&q=80",
  onco:      "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=600&q=80",
  icu:       "https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?w=800&q=80",
  lab:       "https://images.unsplash.com/photo-1579154204601-01588f351e67?w=800&q=80",
  ot:        "https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=800&q=80",
  mri:       "https://images.unsplash.com/photo-1530497610245-94d3c16cda28?w=800&q=80",
  reception: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&q=80",
  pharmacy:  "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800&q=80",
  doc1:      "https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=400&q=80",
  doc2:      "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&q=80",
  doc3:      "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&q=80",
  doc4:      "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&q=80",
  doc5:      "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&q=80",
  doc6:      "https://images.unsplash.com/photo-1651008376811-b90baee60c1f?w=400&q=80",
  aboutHosp: "https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=900&q=80",
  waiting:   "https://images.unsplash.com/photo-1504813184591-01572f98c85f?w=800&q=80",
  ambulance: "https://images.unsplash.com/photo-1587745416684-47953f16f02f?w=600&q=80",
};

// ── DATA ──────────────────────────────────────────────────────────────────────
const NAV = [
  { label: "About",       href: "#about"       },
  { label: "Specialities",href: "#specialities"},
  { label: "Doctors",     href: "#doctors"     },
  { label: "Facilities",  href: "#facilities"  },
  { label: "Contact",     href: "#contact"     },
];

const STATS = [
  { num: "13+", label: "Years of Excellence"  },
  { num: "45+", label: "Super Specialists"    },
  { num: "65k+",label: "Patients Annually"   },
  { num: "320", label: "Bed Capacity"         },
];

const SPECIALITIES = [
  { name:"Cardiology",               tag:"Heart & Vascular",         img:IMG.cardio, desc:"Advanced interventional cardiology — cath lab, angioplasty, pacemakers, electrophysiology and cardiac rehab.",                                       icon:"🫀" },
  { name:"Orthopaedics",             tag:"Bone, Joint & Spine",       img:IMG.ortho,  desc:"Robotic joint replacement, arthroscopy, sports medicine, fracture care and comprehensive spinal surgeries.",                                            icon:"🦴" },
  { name:"Neurology",                tag:"Brain & Nervous System",    img:IMG.neuro,  desc:"Stroke unit, epilepsy monitoring, Parkinson's & movement disorder clinic, neuro-oncology and neuro-rehab.",                                             icon:"🧠" },
  { name:"Obstetrics & Gynaecology", tag:"Women's Health",            img:IMG.gynae,  desc:"High-risk obstetrics, IVF & fertility, laparoscopic surgery, menopause clinic and comprehensive breast care.",                                          icon:"👶" },
  { name:"Paediatrics & NICU",       tag:"Child Health",              img:IMG.paeds,  desc:"Level III NICU, paediatric surgery, child development, adolescent medicine and paediatric intensive care.",                                              icon:"🩺" },
  { name:"Oncology",                 tag:"Comprehensive Cancer Care", img:IMG.onco,   desc:"Multi-disciplinary tumour board, precision chemotherapy, targeted therapy, immunotherapy and palliative services.",                                      icon:"🔬" },
];

const DOCTORS = [
  { name:"Dr. Nagendra Babu K.",   role:"Senior Cardiologist & Electrophysiologist",    exp:"21 yrs", qual:"DM Cardiology · Nizam's Institute of Medical Sciences", avail:"Mon–Sat · 10:00 AM – 2:00 PM",    img:IMG.doc1 },
  { name:"Dr. Sunita Ramachandra", role:"Head of Orthopaedics",                         exp:"18 yrs", qual:"MS Ortho · Fellowship Royal College UK",                  avail:"Mon, Wed, Fri · 3:00 PM – 7:00 PM",img:IMG.doc2 },
  { name:"Dr. Aravind Prasad",     role:"Consultant Neurologist",                       exp:"15 yrs", qual:"DM Neurology · AIIMS New Delhi",                          avail:"Tue, Thu, Sat · 9:00 AM – 1:00 PM", img:IMG.doc3 },
  { name:"Dr. Kavitha Nair",       role:"Gynaecologist & IVF Specialist",               exp:"17 yrs", qual:"MS OBG, FRCOG · Apollo Hospitals",                        avail:"Mon–Fri · 11:00 AM – 3:00 PM",     img:IMG.doc4 },
  { name:"Dr. Ramprasad Goud",     role:"Surgical Oncologist",                          exp:"13 yrs", qual:"MCh Oncosurgery · Tata Memorial Centre",                  avail:"Mon–Fri · 2:00 PM – 6:00 PM",      img:IMG.doc5 },
  { name:"Dr. Latha Reddy",        role:"Consultant Paediatrician & Neonatologist",     exp:"14 yrs", qual:"DNB Paeds, Fellowship NNF",                               avail:"Mon–Sat · 8:00 AM – 12:00 PM",     img:IMG.doc6 },
];

const FACILITIES = [
  { name:"Cardiac Cath Lab & ICU",      img:IMG.icu,       tag:"24/7",    desc:"Bi-plane digital cath lab with 12-bed cardiac ICU, full telemetry and ECMO backup for critical cardiac cases."                    },
  { name:"Advanced MRI & CT Suite",     img:IMG.mri,       tag:"3T MRI",  desc:"3-Tesla MRI, 256-slice CT, PET-CT, digital mammography and nuclear medicine — all under one roof."                                 },
  { name:"Modular Operation Theatres",  img:IMG.ot,        tag:"8 OTs",   desc:"Laminar flow OTs with robotic surgery suite, neuro-navigation and dedicated cardiac & orthopaedic theatres."                       },
  { name:"NABL Accredited Laboratory",  img:IMG.lab,       tag:"NABL",    desc:"1,400+ tests, molecular diagnostics, flow cytometry, liquid biopsy and round-the-clock blood bank services."                       },
  { name:"Patient Reception & Lounges", img:IMG.reception, tag:"Comfort", desc:"Spacious, air-conditioned reception, digital check-in kiosks, family waiting lounges and multilingual support staff."              },
  { name:"24/7 In-House Pharmacy",      img:IMG.pharmacy,  tag:"24/7",    desc:"Full-range retail and inpatient pharmacy with cold-chain biologics, oncology drugs and automated dispensing."                      },
];

const TESTIMONIALS = [
  { text:"After my heart attack, the Srikara ECIL team responded in under 8 minutes. Dr. Nagendra and his cardiac team performed my angioplasty flawlessly. I'm back to full health.",                                              name:"Ramaiah Naidu",     area:"ECIL, Hyderabad",          rating:5, dept:"Cardiology"    },
  { text:"My IVF journey of three years finally succeeded here. Dr. Kavitha's patience, her team's precision, and the warmth of the nursing staff made the most stressful time of my life bearable.",                                name:"Priya & Venkat S.", area:"Kushaiguda, Hyderabad",     rating:5, dept:"IVF & Fertility" },
  { text:"I had a spinal disc surgery with Dr. Sunita. She explained every step clearly and my recovery was faster than anyone expected. Exceptional clinical skill and human care combined.",                                        name:"Balaiah Rao",       area:"AS Rao Nagar, Hyderabad",  rating:5, dept:"Orthopaedics"   },
];

// ── Correct 9 Srikara branches ──
const OTHER_BRANCHES = ["RTC X Roads","Miyapur","Lakdikapul","Kompally","LB Nagar","Peerzadiguda","Rajahmundry","Vijayawada"];

// ── COLOUR TOKENS ─────────────────────────────────────────────────────────────
// Brand: navy #1B2A4A (SRIKARA text) + magenta #B8246E (HOSPITALS text)
const C = {
  // backgrounds / neutrals — unchanged
  white:  "#FFFFFF",
  off:    "#F4F7FC",
  sky:    "#EEF2FA",
  mist:   "#F0F4FC",
  border: "#E0E8F4",
  text:   "#0D1B2E",
  mid:    "#4A6080",
  light:  "#8AAAC8",
  // ── Srikara brand ──
  navy:    "#1B2A4A",     // primary  – was blue  #0A3D6B
  navyD:   "#0F1E35",     // darker   – was blue hover
  navyL:   "#2E4A7A",     // lighter  – for sub-accents
  magenta: "#B8246E",     // accent   – was teal  #00897B
  magentaD:"#8A1A52",     // deeper   – was teal hover
  magentaL:"#D4408A",     // lighter  – was tealLight #00ACC1
};

// ── HOOKS ─────────────────────────────────────────────────────────────────────
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

function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const { ref, on } = useReveal();
  return (
    <div ref={ref} className={className}
      style={{ transitionDelay: `${delay}ms`, transition: "opacity .85s ease, transform .85s ease", opacity: on ? 1 : 0, transform: on ? "none" : "translateY(28px)" }}>
      {children}
    </div>
  );
}

function Stars({ n }: { n: number }) {
  return <span style={{ color: "#F59E0B", letterSpacing: 2 }}>{Array(n).fill("★").join("")}</span>;
}

// ── PAGE ──────────────────────────────────────────────────────────────────────
export default function EcilPage() {
  const [scrollY,   setScrollY]   = useState(0);
  const [menuOpen,  setMenuOpen]  = useState(false);
  const [activeTest,setActiveTest]= useState(0);
  const [form, setForm] = useState({ name:"", phone:"", dept:"", date:"", msg:"" });
  const [sent, setSent] = useState(false);
  const [apptOpen, setApptOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", fn, { passive: true });
    const t = setInterval(() => setActiveTest(p => (p + 1) % TESTIMONIALS.length), 5500);
    return () => { window.removeEventListener("scroll", fn); clearInterval(t); };
  }, []);

  const submit = (e: React.FormEvent) => {
    e.preventDefault(); setSent(true);
    setTimeout(() => { setSent(false); setApptOpen(false); }, 3500);
  };

  const navSolid = scrollY > 80;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Merriweather:ital,wght@0,300;0,400;0,700;1,300;1,400&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
        html{scroll-behavior:smooth;}
        body{font-family:'Plus Jakarta Sans',sans-serif;background:#fff;color:#0D1B2E;overflow-x:hidden;}

        /* Scrollbar — navy track, magenta thumb */
        ::-webkit-scrollbar{width:5px;}
        ::-webkit-scrollbar-track{background:#F0F4FC;}
        ::-webkit-scrollbar-thumb{background:#B8246E;border-radius:3px;}

        @keyframes fadeUp  {from{opacity:0;transform:translateY(40px);}to{opacity:1;transform:translateY(0);}}
        @keyframes fadeIn  {from{opacity:0;}to{opacity:1;}}
        @keyframes pulse   {0%,100%{opacity:1;}50%{opacity:.4;}}
        @keyframes marquee {from{transform:translateX(0);}to{transform:translateX(-50%);}}
        @keyframes float   {0%,100%{transform:translateY(0);}50%{transform:translateY(-10px);}}
        @keyframes slideUp {from{opacity:0;transform:translateY(20px);}to{opacity:1;transform:translateY(0);}}
        @keyframes zoomIn  {from{transform:scale(1.08);}to{transform:scale(1);}}

        .ha1{animation:fadeUp .9s ease .1s  both;}  .ha2{animation:fadeUp .9s ease .3s  both;}
        .ha3{animation:fadeUp .9s ease .5s  both;}  .ha4{animation:fadeUp .9s ease .7s  both;}
        .ha5{animation:fadeUp .9s ease .9s  both;}  .ha6{animation:fadeUp .9s ease 1.1s both;}
        .hero-img{animation:zoomIn 8s ease-out both;}

        /* Card interactions */
        .spec-card{overflow:hidden;cursor:pointer;transition:all .4s ease;}
        .spec-card:hover{transform:translateY(-6px);box-shadow:0 24px 64px rgba(27,42,74,.14);}
        .spec-card img{transition:transform .6s ease;}
        .spec-card:hover img{transform:scale(1.07);}

        .doc-card{overflow:hidden;cursor:pointer;transition:all .35s ease;}
        .doc-card:hover{transform:translateY(-5px);box-shadow:0 20px 50px rgba(27,42,74,.11);}
        .doc-card img{transition:transform .5s ease;}
        .doc-card:hover img{transform:scale(1.04);}

        .fac-card{overflow:hidden;cursor:pointer;transition:all .35s ease;}
        .fac-card:hover{transform:translateY(-4px);box-shadow:0 16px 48px rgba(27,42,74,.09);}
        .fac-card img{transition:transform .5s ease;}
        .fac-card:hover img{transform:scale(1.05);}

        /* Buttons */
        /* Primary — navy fill */
        .btn-primary{display:inline-flex;align-items:center;gap:8px;background:#1B2A4A;color:#fff;padding:.85rem 2rem;border-radius:4px;text-decoration:none;font-size:.85rem;font-weight:700;letter-spacing:.04em;transition:all .25s;cursor:pointer;border:none;font-family:'Plus Jakarta Sans',sans-serif;}
        .btn-primary:hover{background:#0F1E35;transform:translateY(-2px);box-shadow:0 8px 28px rgba(27,42,74,.28);}

        /* Outline — navy border */
        .btn-outline{display:inline-flex;align-items:center;gap:8px;background:transparent;color:#1B2A4A;padding:.85rem 2rem;border-radius:4px;text-decoration:none;font-size:.85rem;font-weight:600;letter-spacing:.04em;transition:all .25s;border:1.5px solid #1B2A4A;}
        .btn-outline:hover{background:#1B2A4A;color:#fff;}

        /* Accent — magenta fill (was btn-teal) */
        .btn-magenta{display:inline-flex;align-items:center;gap:8px;background:#B8246E;color:#fff;padding:.85rem 2rem;border-radius:4px;text-decoration:none;font-size:.85rem;font-weight:700;letter-spacing:.04em;transition:all .25s;cursor:pointer;border:none;font-family:'Plus Jakarta Sans',sans-serif;}
        .btn-magenta:hover{background:#8A1A52;}

        /* Section typography helpers */
        .section-tag{display:inline-flex;align-items:center;gap:.5rem;font-size:.68rem;font-weight:700;letter-spacing:.2em;text-transform:uppercase;color:#B8246E;margin-bottom:.8rem;}
        .section-tag::before{content:'';display:block;width:20px;height:2px;background:#B8246E;}
        .section-h{font-family:'Merriweather',serif;font-size:clamp(2rem,3.5vw,3rem);font-weight:700;color:#1B2A4A;line-height:1.2;}
        .section-sub{font-size:1rem;color:#4A6080;line-height:1.8;max-width:540px;}

        /* Form focus */
        input,select,textarea{outline:none;font-family:'Plus Jakarta Sans',sans-serif;}
        input:focus,select:focus,textarea:focus{border-color:#B8246E !important;}

        /* Appointment modal */
        .appt-overlay{position:fixed;inset:0;z-index:900;background:rgba(15,30,53,.65);backdrop-filter:blur(8px);display:flex;align-items:center;justify-content:center;padding:1rem;animation:fadeIn .25s ease;}
        .appt-modal{background:#fff;border-radius:12px;width:100%;max-width:640px;max-height:90vh;overflow-y:auto;box-shadow:0 40px 100px rgba(27,42,74,.22);animation:slideUp .3s ease;}

        /* Responsive */
        @media(max-width:768px){
          .desk{display:none !important;} .mob-show{display:flex !important;}
          .hero-grid{grid-template-columns:1fr !important;}
          .hero-img-col{display:none !important;}
          .stats-grid{grid-template-columns:1fr 1fr !important;}
          .spec-grid{grid-template-columns:1fr !important;}
          .doc-grid{grid-template-columns:1fr 1fr !important;}
          .fac-grid{grid-template-columns:1fr !important;}
          .about-grid{grid-template-columns:1fr !important;}
          .contact-grid{grid-template-columns:1fr !important;}
          .footer-grid{flex-direction:column !important;gap:2rem !important;}
          .branch-grid{grid-template-columns:1fr 1fr 1fr !important;}
          .section-pad{padding:4rem 1.5rem !important;}
          .hero-pad{padding:6rem 1.5rem 4rem !important;}
        }
      `}</style>

      {/* ── EMERGENCY TOP BAR — navy ── */}
      <div style={{ background: C.navy, padding: "6px 2rem", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: ".5rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
          <span style={{ display: "flex", alignItems: "center", gap: 6, fontSize: ".68rem", color: "rgba(255,255,255,.65)", letterSpacing: ".1em", textTransform: "uppercase", fontWeight: 500 }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#4ADE80", animation: "pulse 1.5s ease infinite", display: "inline-block" }} />
            24/7 Emergency Active
          </span>
          <a href="tel:040-2717-6000" style={{ fontSize: ".82rem", color: "#fff", fontWeight: 700, textDecoration: "none", letterSpacing: ".05em" }}>📞 040-2717-6000</a>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
          <span style={{ fontSize: ".65rem", color: "rgba(255,255,255,.5)", letterSpacing: ".1em" }}>ECIL X Roads, Hyderabad – 500062</span>
          <Link href="/" style={{ fontSize: ".65rem", color: "rgba(255,255,255,.55)", textDecoration: "none", letterSpacing: ".1em", textTransform: "uppercase", fontWeight: 600 }}>← Main Site</Link>
        </div>
      </div>

      {/* ── NAVBAR — white, navy brand line ── */}
      <nav style={{ position: "sticky", top: 0, zIndex: 500, background: navSolid ? "rgba(255,255,255,.97)" : "#fff", borderBottom: `1px solid ${C.border}`, boxShadow: navSolid ? `0 2px 24px rgba(27,42,74,.08)` : "none", backdropFilter: "blur(12px)", transition: "all .3s" }}>
        <div className="section-pad" style={{ maxWidth: 1400, margin: "0 auto", padding: "0 2.5rem", height: 68, display: "flex", alignItems: "center", justifyContent: "space-between" }}>

          {/* Logo — navy + magenta gradient square */}
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: 12, textDecoration: "none" }}>
            <div style={{ width: 42, height: 42, borderRadius: 8, background: `linear-gradient(135deg,${C.navy},${C.navyL})`, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: `0 4px 12px rgba(27,42,74,.22)`, position: "relative" }}>
              <span style={{ color: "#fff", fontSize: "1.3rem", fontFamily: "'Merriweather',serif", fontWeight: 700, fontStyle: "italic" }}>S</span>
              {/* Magenta accent dot */}
              <span style={{ position: "absolute", bottom: 4, right: 4, width: 6, height: 6, borderRadius: "50%", background: C.magenta, display: "block" }} />
            </div>
            <div>
              <p style={{ fontSize: "1rem", fontWeight: 800, color: C.navy, lineHeight: 1.1 }}>Srikara Hospital</p>
              <p style={{ fontSize: ".58rem", color: C.magenta, letterSpacing: ".18em", textTransform: "uppercase", fontWeight: 600 }}>ECIL Branch · Hyderabad</p>
            </div>
          </Link>

          {/* Desktop nav — Home / Doctors / Departments */}
          <div className="desk" style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
            {[["Home","#"],["Doctors","#doctors"],["Departments","#specialities"]].map(([l,h]) => (
              <Link key={l} href={h} style={{ fontSize: ".82rem", color: C.mid, fontWeight: 500, textDecoration: "none", transition: "color .2s" }}
                onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.color = C.navy}
                onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.color = C.mid}>
                {l}
              </Link>
            ))}
            <button className="btn-primary" onClick={() => setApptOpen(true)} style={{ padding: ".55rem 1.4rem", fontSize: ".78rem" }}>
              Book Appointment
            </button>
          </div>

          {/* Mobile toggle */}
          <button className="mob-show" onClick={() => setMenuOpen(!menuOpen)}
            style={{ display: "none", flexDirection: "column", gap: 5, background: "none", border: `1px solid ${C.border}`, borderRadius: 6, padding: ".4rem .6rem", cursor: "pointer" }}>
            {[0,1,2].map(i => <span key={i} style={{ width: 22, height: 1.5, background: C.navy, display: "block" }} />)}
          </button>
        </div>

        {menuOpen && (
          <div style={{ background: "#fff", borderTop: `1px solid ${C.border}`, padding: "1.5rem 2rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
            {[["Home","#"],["Doctors","#doctors"],["Departments","#specialities"]].map(([l,h]) => (
              <Link key={l} href={h} onClick={() => setMenuOpen(false)} style={{ color: C.text, textDecoration: "none", fontSize: ".9rem", fontWeight: 500, padding: ".5rem 0", borderBottom: `1px solid ${C.border}` }}>{l}</Link>
            ))}
            <button className="btn-primary" onClick={() => { setMenuOpen(false); setApptOpen(true); }} style={{ justifyContent: "center" }}>Book Appointment</button>
          </div>
        )}
      </nav>

      {/* ══════════════════════════════════════════
          HERO — navy bg, same structure
          ══════════════════════════════════════════ */}
      <section style={{ background: C.navy, position: "relative", overflow: "hidden", minHeight: "92vh", display: "flex", alignItems: "center" }}>

        {/* Background hospital photo */}
        <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
          <img src={IMG.heroBg} alt="Hospital" className="hero-img"
            style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", opacity: .15 }} />
          {/* navy → magenta diagonal overlay */}
          <div style={{ position: "absolute", inset: 0, background: `linear-gradient(105deg,${C.navy} 45%,rgba(27,42,74,.7) 75%,rgba(184,36,110,.25) 100%)` }} />
        </div>

        <div style={{ position: "relative", zIndex: 2, width: "100%", maxWidth: 1400, margin: "0 auto", padding: "5rem 2.5rem" }} className="hero-pad">
          <div className="hero-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "center" }}>

            {/* Left */}
            <div>
              {/* Status pill — magenta glow */}
              <div className="ha1" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: `rgba(184,36,110,.15)`, border: `1px solid rgba(184,36,110,.3)`, borderRadius: 100, padding: ".35rem 1rem", marginBottom: "2rem" }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#4ADE80", animation: "pulse 2s ease infinite", display: "inline-block" }} />
                <span style={{ fontSize: ".65rem", fontWeight: 700, letterSpacing: ".16em", textTransform: "uppercase", color: "rgba(220,130,180,.9)" }}>NABH Accredited · ECIL, Hyderabad</span>
              </div>

              <h1 className="ha2" style={{ fontFamily: "'Merriweather',serif", fontSize: "clamp(2.6rem,5vw,4.8rem)", fontWeight: 700, color: "#fff", lineHeight: 1.1, marginBottom: "1.5rem" }}>
                Trusted Healthcare<br />
                {/* Italic accent — soft pink-white (was teal #63D9D0) */}
                <span style={{ color: "#E8A0C0", fontStyle: "italic" }}>Close to Home.</span>
              </h1>

              <p className="ha3" style={{ fontSize: "1.05rem", color: "rgba(255,255,255,.68)", lineHeight: 1.85, maxWidth: 480, marginBottom: "2.8rem" }}>
                Srikara ECIL is East Hyderabad's premier multi-specialty hospital — combining 45+ specialist doctors, robotic surgery, AI diagnostics and genuine human warmth to deliver care that truly makes a difference.
              </p>

              <div className="ha4" style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                {/* Primary CTA — magenta fill */}
                <button className="btn-magenta" onClick={() => setApptOpen(true)}>📅 Book Appointment</button>
                <a href="tel:040-2717-6000" className="btn-outline"
                  style={{ color: "rgba(255,255,255,.82)", borderColor: "rgba(255,255,255,.28)" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = "rgba(255,255,255,.1)"; (e.currentTarget as HTMLAnchorElement).style.color = "#fff"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = "transparent"; (e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,.82)"; }}>
                  🚨 040-2717-6000
                </a>
              </div>

              {/* Certification badges */}
              <div className="ha5" style={{ display: "flex", gap: "1rem", flexWrap: "wrap", marginTop: "2.5rem" }}>
                {[{ l:"NABH",s:"Accredited"},{l:"ISO",s:"9001:2015"},{l:"NABL",s:"Certified Lab"},{l:"100+",s:"Insurers"}].map(b => (
                  <div key={b.l} style={{ background: "rgba(255,255,255,.07)", border: "1px solid rgba(255,255,255,.12)", borderRadius: 6, padding: ".5rem .9rem", textAlign: "center" }}>
                    <p style={{ fontSize: ".88rem", fontWeight: 800, color: "#fff", lineHeight: 1 }}>{b.l}</p>
                    <p style={{ fontSize: ".58rem", color: "rgba(255,255,255,.45)", letterSpacing: ".1em", textTransform: "uppercase", marginTop: 2 }}>{b.s}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — doctor photo card */}
            <div className="ha3 hero-img-col" style={{ position: "relative" }}>
              <div style={{ borderRadius: 16, overflow: "hidden", boxShadow: "0 40px 80px rgba(0,0,0,.38)", position: "relative" }}>
                <img src={IMG.heroDoc} alt="Srikara ECIL doctors"
                  style={{ width: "100%", height: 480, objectFit: "cover", objectPosition: "center top", display: "block" }} />
                <div style={{ position: "absolute", inset: 0, background: `linear-gradient(180deg,transparent 50%,rgba(15,30,53,.88) 100%)` }} />
                <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "2rem 1.8rem" }}>
                  <p style={{ fontSize: ".65rem", fontWeight: 700, letterSpacing: ".2em", textTransform: "uppercase", color: C.magenta, marginBottom: ".4rem" }}>Our Team</p>
                  <p style={{ fontFamily: "'Merriweather',serif", fontSize: "1.2rem", fontWeight: 700, color: "#fff", lineHeight: 1.35 }}>45+ Dedicated<br />Specialists on Call</p>
                </div>
              </div>

              {/* Floating emergency card — white with magenta pulse dot */}
              <div style={{ position: "absolute", top: 20, right: -16, background: "#fff", borderRadius: 10, padding: "1rem 1.2rem", boxShadow: `0 12px 40px rgba(27,42,74,.18)`, minWidth: 180, animation: "float 4s ease-in-out infinite" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: ".3rem" }}>
                  <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#EF4444", animation: "pulse 1.5s ease infinite", display: "inline-block" }} />
                  <span style={{ fontSize: ".58rem", fontWeight: 700, letterSpacing: ".14em", textTransform: "uppercase", color: "#EF4444" }}>Emergency</span>
                </div>
                <p style={{ fontSize: "1.1rem", fontWeight: 800, color: C.navy, lineHeight: 1 }}>040-2717-6000</p>
                <p style={{ fontSize: ".62rem", color: C.mid, marginTop: 3 }}>Available 24 hours a day</p>
              </div>

              {/* Floating stat chip — magenta (was teal) */}
              <div style={{ position: "absolute", bottom: 60, left: -16, background: C.magenta, borderRadius: 10, padding: "1rem 1.2rem", boxShadow: `0 12px 40px rgba(184,36,110,.28)`, animation: "float 5s ease-in-out infinite 1s" }}>
                <p style={{ fontSize: "1.6rem", fontWeight: 800, color: "#fff", lineHeight: 1 }}>65k<span style={{ fontSize: ".9rem" }}>+</span></p>
                <p style={{ fontSize: ".6rem", fontWeight: 600, color: "rgba(255,255,255,.72)", letterSpacing: ".12em", textTransform: "uppercase", marginTop: 2 }}>Patients annually</p>
              </div>
            </div>
          </div>

          {/* Stats row — same translucent panels */}
          <div className="ha6 stats-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "1px", background: "rgba(255,255,255,.1)", marginTop: "4rem", borderRadius: 10, overflow: "hidden" }}>
            {STATS.map((s, i) => (
              <div key={i} style={{ background: "rgba(255,255,255,.06)", padding: "1.8rem 2rem", backdropFilter: "blur(12px)" }}>
                <p style={{ fontFamily: "'Merriweather',serif", fontSize: "2.2rem", fontWeight: 700, color: "#fff", lineHeight: 1 }}>{s.num}</p>
                <p style={{ fontSize: ".7rem", fontWeight: 600, letterSpacing: ".1em", textTransform: "uppercase", color: "rgba(255,255,255,.48)", marginTop: 6 }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MARQUEE — magenta bg ── */}
      <div style={{ background: C.magenta, padding: ".8rem 0", overflow: "hidden", whiteSpace: "nowrap" }}>
        <div style={{ display: "inline-flex", gap: "3rem", animation: "marquee 30s linear infinite" }}>
          {Array(3).fill(["Advanced Cardiac Care","Robotic Joint Replacement","Level III NICU","3T MRI & PET-CT","24/7 Trauma Centre","NABH Accredited","IVF & Fertility Clinic","NABL Laboratory","Stroke Unit","Bariatric Surgery","Oncology Tumour Board","Physiotherapy & Rehab"]).flat().map((t, i) => (
            <span key={i} style={{ display: "inline-flex", alignItems: "center", gap: ".9rem", fontSize: ".68rem", fontWeight: 600, letterSpacing: ".18em", textTransform: "uppercase", color: "rgba(255,255,255,.85)" }}>
              <span style={{ width: 4, height: 4, borderRadius: "50%", background: "rgba(255,255,255,.45)", display: "inline-block" }} />{t}
            </span>
          ))}
        </div>
      </div>

      {/* ══════════════════════════════════════════
          ABOUT — white bg, same image collage
          ══════════════════════════════════════════ */}
      <section id="about" className="section-pad" style={{ background: "#fff", padding: "7rem 2.5rem" }}>
        <div style={{ maxWidth: 1400, margin: "0 auto" }}>
          <div className="about-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem", alignItems: "center" }}>

            {/* Left — images collage */}
            <Reveal>
              <div style={{ position: "relative" }}>
                <img src={IMG.aboutHosp} alt="Srikara ECIL Hospital"
                  style={{ width: "100%", height: 420, objectFit: "cover", borderRadius: 12, display: "block" }} />
                <div style={{ position: "absolute", bottom: -24, right: -24, borderRadius: 10, overflow: "hidden", border: "4px solid #fff", boxShadow: `0 12px 40px rgba(27,42,74,.14)`, width: 200 }}>
                  <img src={IMG.waiting} alt="Patient waiting area" style={{ width: "100%", height: 140, objectFit: "cover", display: "block" }} />
                </div>
                {/* Navy badge — was blue */}
                <div style={{ position: "absolute", top: 24, left: 24, background: C.navy, borderRadius: 8, padding: ".8rem 1.2rem", boxShadow: `0 8px 24px rgba(27,42,74,.28)` }}>
                  <p style={{ fontFamily: "'Merriweather',serif", fontSize: "1.8rem", fontWeight: 700, color: "#fff", lineHeight: 1 }}>13+</p>
                  <p style={{ fontSize: ".6rem", fontWeight: 600, color: "rgba(255,255,255,.6)", letterSpacing: ".12em", textTransform: "uppercase" }}>Years of care</p>
                </div>
              </div>
            </Reveal>

            {/* Right text */}
            <Reveal delay={150}>
              <span className="section-tag">About Srikara ECIL</span>
              <h2 className="section-h" style={{ marginBottom: "1.2rem" }}>A hospital built<br />on trust &amp; expertise</h2>
              <p className="section-sub" style={{ marginBottom: "1.5rem" }}>
                Established in 2011, Srikara ECIL has grown to become East Hyderabad's most comprehensive multi-specialty hospital. We serve the communities of ECIL, Kushaiguda, AS Rao Nagar, Neredmet and beyond.
              </p>
              <p className="section-sub" style={{ marginBottom: "2.5rem" }}>
                Our 320-bed facility is equipped with the latest medical technology — from robotic surgery systems and 3T MRI to a fully automated NABL-certified laboratory. But what truly sets us apart is our culture of compassion-first care.
              </p>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "2.5rem" }}>
                {[
                  { icon:"🏥", l:"320 Beds",       s:"Including ICU & HDU"   },
                  { icon:"🤖", l:"Robotic Surgery", s:"Advanced precision care"},
                  { icon:"🩸", l:"Blood Bank",      s:"24/7 availability"     },
                  { icon:"🚑", l:"Ambulance Fleet", s:"GPS-tracked response"  },
                ].map(f => (
                  <div key={f.l} style={{ display: "flex", alignItems: "flex-start", gap: ".9rem", padding: "1rem", background: C.mist, borderRadius: 8, border: `1px solid ${C.border}` }}>
                    <span style={{ fontSize: "1.4rem", flexShrink: 0 }}>{f.icon}</span>
                    <div>
                      <p style={{ fontSize: ".88rem", fontWeight: 700, color: C.navy, lineHeight: 1.2 }}>{f.l}</p>
                      <p style={{ fontSize: ".72rem", color: C.mid, marginTop: 2 }}>{f.s}</p>
                    </div>
                  </div>
                ))}
              </div>
              <button className="btn-primary" onClick={() => setApptOpen(true)}>Book a Consultation →</button>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          SPECIALITIES — mist bg, magenta accents
          ══════════════════════════════════════════ */}
      <section id="specialities" className="section-pad" style={{ background: C.mist, padding: "7rem 2.5rem" }}>
        <div style={{ maxWidth: 1400, margin: "0 auto" }}>
          <Reveal>
            <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: "3.5rem", flexWrap: "wrap", gap: "1.5rem" }}>
              <div>
                <span className="section-tag">Medical Departments</span>
                <h2 className="section-h">Specialities &amp; Departments</h2>
              </div>
              <Link href="#" style={{ fontSize: ".8rem", fontWeight: 700, color: C.magenta, textDecoration: "none", borderBottom: `1.5px solid ${C.magenta}`, paddingBottom: 2 }}>View All Departments →</Link>
            </div>
          </Reveal>

          <div className="spec-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "1.5rem" }}>
            {SPECIALITIES.map((s, i) => (
              <Reveal key={s.name} delay={i * 60}>
                <div className="spec-card" style={{ background: "#fff", borderRadius: 12, border: `1px solid ${C.border}` }}>
                  <div style={{ height: 200, overflow: "hidden", borderRadius: "12px 12px 0 0", position: "relative" }}>
                    <img src={s.img} alt={s.name} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                    <div style={{ position: "absolute", inset: 0, background: `linear-gradient(180deg,transparent 40%,rgba(15,30,53,.65) 100%)` }} />
                    <div style={{ position: "absolute", bottom: "1rem", left: "1rem", display: "flex", alignItems: "center", gap: ".6rem" }}>
                      <span style={{ fontSize: "1.4rem" }}>{s.icon}</span>
                      <span style={{ fontSize: ".62rem", fontWeight: 700, letterSpacing: ".14em", textTransform: "uppercase", color: "rgba(255,255,255,.85)" }}>{s.tag}</span>
                    </div>
                  </div>
                  <div style={{ padding: "1.5rem" }}>
                    <h3 style={{ fontFamily: "'Merriweather',serif", fontSize: "1.1rem", fontWeight: 700, color: C.navy, marginBottom: ".6rem", lineHeight: 1.3 }}>{s.name}</h3>
                    <p style={{ fontSize: ".82rem", color: C.mid, lineHeight: 1.75, marginBottom: "1.2rem" }}>{s.desc}</p>
                    {/* CTA — magenta */}
                    <button className="btn-magenta" onClick={() => setApptOpen(true)} style={{ fontSize: ".72rem", padding: ".55rem 1.2rem" }}>Book Appointment →</button>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          DOCTORS — white bg
          ══════════════════════════════════════════ */}
      <section id="doctors" className="section-pad" style={{ background: "#fff", padding: "7rem 2.5rem" }}>
        <div style={{ maxWidth: 1400, margin: "0 auto" }}>
          <Reveal>
            <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: "3.5rem", flexWrap: "wrap", gap: "1.5rem" }}>
              <div>
                <span className="section-tag">Our Team</span>
                <h2 className="section-h">Meet Our Specialists</h2>
                <p className="section-sub" style={{ marginTop: ".5rem", maxWidth: 480 }}>Board-certified experts with international training, united by a single purpose — your well-being.</p>
              </div>
              <Link href="#" style={{ fontSize: ".8rem", fontWeight: 700, color: C.magenta, textDecoration: "none", borderBottom: `1.5px solid ${C.magenta}`, paddingBottom: 2 }}>All 45 Doctors →</Link>
            </div>
          </Reveal>

          <div className="doc-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "1.5rem" }}>
            {DOCTORS.map((d, i) => (
              <Reveal key={d.name} delay={i * 70}>
                <div className="doc-card" style={{ background: "#fff", borderRadius: 12, border: `1px solid ${C.border}`, overflow: "hidden" }}>
                  <div style={{ height: 240, overflow: "hidden", position: "relative" }}>
                    <img src={d.img} alt={d.name} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top", display: "block" }} />
                    <div style={{ position: "absolute", inset: 0, background: `linear-gradient(180deg,transparent 55%,rgba(15,30,53,.7) 100%)` }} />
                    {/* Experience badge — magenta */}
                    <div style={{ position: "absolute", bottom: "1rem", left: "1rem" }}>
                      <span style={{ background: C.magenta, color: "#fff", fontSize: ".6rem", fontWeight: 700, letterSpacing: ".12em", textTransform: "uppercase", padding: ".25rem .7rem", borderRadius: 100 }}>{d.exp} experience</span>
                    </div>
                  </div>
                  <div style={{ padding: "1.4rem" }}>
                    <h3 style={{ fontFamily: "'Merriweather',serif", fontSize: "1rem", fontWeight: 700, color: C.navy, lineHeight: 1.25, marginBottom: ".3rem" }}>{d.name}</h3>
                    {/* Role — magenta */}
                    <p style={{ fontSize: ".75rem", fontWeight: 700, color: C.magenta, marginBottom: ".5rem" }}>{d.role}</p>
                    <p style={{ fontSize: ".72rem", color: C.mid, lineHeight: 1.55, marginBottom: "1rem" }}>{d.qual}</p>
                    <div style={{ paddingTop: "1rem", borderTop: `1px solid ${C.border}`, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <div>
                        <p style={{ fontSize: ".58rem", fontWeight: 700, letterSpacing: ".12em", textTransform: "uppercase", color: C.light, marginBottom: ".2rem" }}>Available</p>
                        <p style={{ fontSize: ".72rem", fontWeight: 600, color: C.text }}>{d.avail}</p>
                      </div>
                      {/* Book btn — navy */}
                      <button className="btn-primary" onClick={() => setApptOpen(true)} style={{ fontSize: ".68rem", padding: ".45rem 1rem" }}>Book →</button>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          TESTIMONIALS — navy bg
          ══════════════════════════════════════════ */}
      <section style={{ background: C.navy, padding: "7rem 2.5rem", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
          <img src={IMG.heroBg} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", opacity: .05 }} />
        </div>
        <div style={{ maxWidth: 960, margin: "0 auto", position: "relative", zIndex: 1, textAlign: "center" }}>
          <Reveal>
            {/* Section tag — magenta */}
            <span className="section-tag" style={{ justifyContent: "center", color: C.magenta }}>
              <span style={{ background: C.magenta }} />
              Patient Stories
            </span>
            <h2 style={{ fontFamily: "'Merriweather',serif", fontSize: "clamp(1.8rem,3.5vw,3rem)", fontWeight: 700, color: "#fff", marginBottom: "1rem", lineHeight: 1.2 }}>What Our Patients Say</h2>
            <p style={{ fontSize: "1rem", color: "rgba(255,255,255,.55)", marginBottom: "4rem" }}>Real stories from the families we've had the privilege of caring for</p>
          </Reveal>

          <div style={{ position: "relative", minHeight: 280 }}>
            {TESTIMONIALS.map((t, i) => (
              <div key={i} style={{ position: i===activeTest?"relative":"absolute", inset: 0, opacity: i===activeTest?1:0, transform: i===activeTest?"none":"translateY(12px)", transition: "all .7s ease", pointerEvents: i===activeTest?"auto":"none" }}>
                <div style={{ background: "rgba(255,255,255,.06)", border: "1px solid rgba(255,255,255,.1)", borderRadius: 16, padding: "3rem", backdropFilter: "blur(12px)" }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.5rem", flexWrap: "wrap", gap: "1rem" }}>
                    {/* Dept pill — magenta tint */}
                    <span style={{ background: `${C.magenta}25`, color: C.magenta, fontSize: ".65rem", fontWeight: 700, letterSpacing: ".16em", textTransform: "uppercase", padding: ".3rem .9rem", borderRadius: 100, border: `1px solid rgba(184,36,110,.3)` }}>{t.dept}</span>
                    <Stars n={t.rating} />
                  </div>
                  <p style={{ fontFamily: "'Merriweather',serif", fontSize: "clamp(1.05rem,2vw,1.35rem)", fontStyle: "italic", color: "rgba(255,255,255,.88)", lineHeight: 1.75, marginBottom: "2.5rem" }}>"{t.text}"</p>
                  <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                    {/* Avatar — navy→magenta gradient */}
                    <div style={{ width: 48, height: 48, borderRadius: "50%", background: `linear-gradient(135deg,${C.navyL},${C.magenta})`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <span style={{ fontFamily: "'Merriweather',serif", fontWeight: 700, color: "#fff", fontSize: ".9rem" }}>{t.name[0]}</span>
                    </div>
                    <div style={{ textAlign: "left" }}>
                      <p style={{ fontWeight: 700, color: "#fff", fontSize: ".9rem" }}>{t.name}</p>
                      <p style={{ fontSize: ".7rem", color: "rgba(255,255,255,.48)", marginTop: 2 }}>{t.area}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Progress dots — magenta active */}
          <div style={{ display: "flex", justifyContent: "center", gap: ".5rem", marginTop: "2.5rem" }}>
            {TESTIMONIALS.map((_,i) => (
              <button key={i} onClick={() => setActiveTest(i)}
                style={{ width: i===activeTest?32:8, height: 3, background: i===activeTest?C.magenta:"rgba(255,255,255,.2)", border: "none", cursor: "pointer", transition: "all .3s", borderRadius: 2, padding: 0 }} />
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          FACILITIES — mist bg
          ══════════════════════════════════════════ */}
      <section id="facilities" className="section-pad" style={{ background: C.mist, padding: "7rem 2.5rem" }}>
        <div style={{ maxWidth: 1400, margin: "0 auto" }}>
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
              <span className="section-tag" style={{ justifyContent: "center" }}><span />World-Class Infrastructure</span>
              <h2 className="section-h" style={{ margin: "0 auto" }}>Our Facilities</h2>
              <p className="section-sub" style={{ margin: ".8rem auto 0", textAlign: "center" }}>Built with the latest technology, designed around patient comfort and clinical efficiency</p>
            </div>
          </Reveal>

          <div className="fac-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "1.5rem" }}>
            {FACILITIES.map((f, i) => (
              <Reveal key={f.name} delay={i * 60}>
                <div className="fac-card" style={{ background: "#fff", borderRadius: 12, border: `1px solid ${C.border}` }}>
                  <div style={{ height: 200, overflow: "hidden", borderRadius: "12px 12px 0 0", position: "relative" }}>
                    <img src={f.img} alt={f.name} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                    <div style={{ position: "absolute", inset: 0, background: `linear-gradient(180deg,transparent 30%,rgba(15,30,53,.6) 100%)` }} />
                    {/* Tag — magenta */}
                    <span style={{ position: "absolute", top: "1rem", right: "1rem", background: C.magenta, color: "#fff", fontSize: ".6rem", fontWeight: 700, letterSpacing: ".12em", textTransform: "uppercase", padding: ".25rem .7rem", borderRadius: 100 }}>{f.tag}</span>
                  </div>
                  <div style={{ padding: "1.4rem" }}>
                    <h3 style={{ fontFamily: "'Merriweather',serif", fontSize: "1rem", fontWeight: 700, color: C.navy, marginBottom: ".6rem", lineHeight: 1.3 }}>{f.name}</h3>
                    <p style={{ fontSize: ".8rem", color: C.mid, lineHeight: 1.75 }}>{f.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── AMBULANCE CTA STRIP — red (semantic, kept) ── */}
      <section style={{ background: "#EF4444", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
          <img src={IMG.ambulance} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", opacity: .1 }} />
        </div>
        <div style={{ maxWidth: 1400, margin: "0 auto", padding: "3rem 2.5rem", position: "relative", zIndex: 1, display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "2rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
            <div style={{ width: 56, height: 56, borderRadius: "50%", background: "rgba(255,255,255,.15)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.8rem", flexShrink: 0 }}>🚑</div>
            <div>
              <p style={{ fontFamily: "'Merriweather',serif", fontSize: "1.3rem", fontWeight: 700, color: "#fff", lineHeight: 1.2 }}>24/7 Emergency &amp; Ambulance Service</p>
              <p style={{ fontSize: ".88rem", color: "rgba(255,255,255,.8)", marginTop: ".3rem" }}>GPS-tracked fleet · Trained paramedics · Response in under 12 minutes</p>
            </div>
          </div>
          <a href="tel:040-2717-6000"
            style={{ display: "inline-flex", alignItems: "center", gap: 10, background: "#fff", color: "#EF4444", padding: "1rem 2.2rem", borderRadius: 6, textDecoration: "none", fontSize: ".9rem", fontWeight: 800, letterSpacing: ".06em", whiteSpace: "nowrap", transition: "all .25s", boxShadow: "0 8px 24px rgba(0,0,0,.2)" }}
            onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.background = "#FEE2E2"}
            onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.background = "#fff"}>
            📞 Call 040-2717-6000
          </a>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          CONTACT — white bg
          ══════════════════════════════════════════ */}
      <section id="contact" className="section-pad" style={{ background: "#fff", padding: "7rem 2.5rem" }}>
        <div style={{ maxWidth: 1400, margin: "0 auto" }}>
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: "4rem" }}>
              <span className="section-tag" style={{ justifyContent: "center" }}><span />Find Us</span>
              <h2 className="section-h">Srikara Hospital · ECIL Branch</h2>
            </div>
          </Reveal>

          <div className="contact-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3rem" }}>

            {/* Contact details */}
            <Reveal>
              <div style={{ background: C.mist, borderRadius: 12, border: `1px solid ${C.border}`, overflow: "hidden" }}>
                {/* Navy → magenta top accent line */}
                <div style={{ height: 4, background: `linear-gradient(90deg,${C.navy},${C.magenta})` }} />
                <div style={{ padding: "2.5rem" }}>
                  {[
                    { icon:"📍", l:"Address",        v:"Plot 12, ECIL X Roads, Kushaiguda\nHyderabad – 500062, Telangana"  },
                    { icon:"🚨", l:"Emergency (24/7)",v:"040-2717-6000"                                                     },
                    { icon:"📞", l:"Appointments",   v:"040-2717-6100"                                                      },
                    { icon:"✉️", l:"Email",           v:"ecil@srikarahospitals.in"                                          },
                    { icon:"🕐", l:"OPD Hours",       v:"Mon – Sat · 8:00 AM – 8:00 PM"                                    },
                  ].map((c, i) => (
                    <div key={c.l} style={{ display: "flex", gap: "1rem", paddingBottom: "1.2rem", marginBottom: i < 4 ? "1.2rem" : 0, borderBottom: i < 4 ? `1px solid ${C.border}` : "none" }}>
                      <span style={{ fontSize: "1.2rem", flexShrink: 0, marginTop: 2 }}>{c.icon}</span>
                      <div>
                        {/* Label — magenta */}
                        <p style={{ fontSize: ".6rem", fontWeight: 700, letterSpacing: ".16em", textTransform: "uppercase", color: C.magenta, marginBottom: ".3rem" }}>{c.l}</p>
                        <p style={{ fontSize: ".9rem", color: C.navy, fontWeight: 600, whiteSpace: "pre-line", lineHeight: 1.6 }}>{c.v}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            {/* Branches */}
            <Reveal delay={100}>
              <div>
                <h3 style={{ fontFamily: "'Merriweather',serif", fontSize: "1.5rem", fontWeight: 700, color: C.navy, marginBottom: ".5rem" }}>Our Other Branches</h3>
                <p style={{ fontSize: ".88rem", color: C.mid, marginBottom: "2rem" }}>Srikara Hospital Group serves patients across 9 locations in Hyderabad &amp; Andhra Pradesh</p>
                <div className="branch-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "1px", background: C.border, borderRadius: 10, overflow: "hidden", marginBottom: "2rem" }}>
                  {OTHER_BRANCHES.map(b => (
                    <Link key={b} href={`/hospitals/${b.toLowerCase().replace(/ /g,"-")}`}
                      style={{ background: C.mist, padding: ".9rem 1rem", textDecoration: "none", textAlign: "center", transition: "background .2s" }}
                      onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.background = C.sky}
                      onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.background = C.mist}>
                      <p style={{ fontSize: ".75rem", fontWeight: 600, color: C.navy }}>{b}</p>
                    </Link>
                  ))}
                </div>
                <Link href="/" style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: ".8rem", fontWeight: 700, color: C.magenta, textDecoration: "none", borderBottom: `1.5px solid ${C.magenta}`, paddingBottom: 2 }}>
                  ← Back to Main Srikara Website
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── FOOTER — navy ── */}
      <footer style={{ background: C.navy }}>
        {/* Magenta → navy gradient top line */}
        <div style={{ height: 3, background: `linear-gradient(90deg,${C.magenta},${C.navy},${C.magenta})` }} />
        <div style={{ maxWidth: 1400, margin: "0 auto", padding: "2rem 2.5rem" }}>
          <div className="footer-grid" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ width: 36, height: 36, borderRadius: 6, background: `linear-gradient(135deg,${C.navyL},${C.magenta})`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ fontFamily: "'Merriweather',serif", fontWeight: 700, fontSize: "1.1rem", fontStyle: "italic", color: "#fff" }}>S</span>
              </div>
              <span style={{ fontSize: ".72rem", color: "rgba(255,255,255,.38)", letterSpacing: ".06em" }}>
                © {new Date().getFullYear()} Srikara Hospital – ECIL Branch · Part of Srikara Hospital Group, Hyderabad
              </span>
            </div>
            <div style={{ display: "flex", gap: "2rem" }}>
              {["Privacy Policy","Terms of Service","Sitemap"].map(l => (
                <Link key={l} href="#" style={{ fontSize: ".65rem", color: "rgba(255,255,255,.28)", textDecoration: "none", letterSpacing: ".08em" }}
                  onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.color = C.magenta}
                  onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,.28)"}>
                  {l}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </footer>

      {/* ── FLOATING APPOINTMENT BUTTON — magenta ── */}
      <button onClick={() => setApptOpen(true)}
        style={{ position: "fixed", bottom: "2rem", right: "2rem", zIndex: 400, background: C.magenta, color: "#fff", border: "none", borderRadius: "50px", padding: ".9rem 1.6rem", fontSize: ".82rem", fontWeight: 700, letterSpacing: ".06em", cursor: "pointer", boxShadow: `0 8px 32px rgba(184,36,110,.42)`, transition: "all .3s", display: "flex", alignItems: "center", gap: 8, fontFamily: "'Plus Jakarta Sans',sans-serif" }}
        onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.transform = "scale(1.05)"; (e.currentTarget as HTMLButtonElement).style.boxShadow = `0 12px 40px rgba(184,36,110,.55)`; }}
        onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.transform = "scale(1)";   (e.currentTarget as HTMLButtonElement).style.boxShadow = `0 8px 32px rgba(184,36,110,.42)`; }}>
        <span style={{ fontSize: "1.1rem" }}>📅</span> Book Appointment
      </button>

      {/* ── APPOINTMENT MODAL ── */}
      {apptOpen && (
        <div className="appt-overlay" onClick={(e) => { if (e.target === e.currentTarget) setApptOpen(false); }}>
          <div className="appt-modal">
            {/* Modal header — navy → magenta gradient */}
            <div style={{ background: `linear-gradient(135deg,${C.navy},${C.magenta})`, padding: "2rem 2rem 1.5rem" }}>
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
                <div>
                  <p style={{ fontSize: ".65rem", fontWeight: 700, letterSpacing: ".18em", textTransform: "uppercase", color: "rgba(255,255,255,.65)", marginBottom: ".4rem" }}>Srikara Hospital · ECIL Branch</p>
                  <h3 style={{ fontFamily: "'Merriweather',serif", fontSize: "1.5rem", fontWeight: 700, color: "#fff", lineHeight: 1.2 }}>Book Your Appointment</h3>
                  <p style={{ fontSize: ".8rem", color: "rgba(255,255,255,.62)", marginTop: ".4rem" }}>Confirmed within 30 minutes · Mon–Sat, 8 AM – 8 PM</p>
                </div>
                <button onClick={() => setApptOpen(false)}
                  style={{ background: "rgba(255,255,255,.15)", border: "none", borderRadius: "50%", width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "#fff", fontSize: "1.1rem", flexShrink: 0 }}>✕</button>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={submit} style={{ padding: "2rem" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.2rem", marginBottom: "1.2rem" }}>
                {[
                  { label:"Full Name *",     key:"name",  type:"text", ph:"Your full name"     },
                  { label:"Mobile Number *", key:"phone", type:"tel",  ph:"+91 98765 43210"     },
                ].map(f => (
                  <div key={f.key}>
                    <label style={{ display: "block", fontSize: ".68rem", fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", color: C.mid, marginBottom: ".5rem" }}>{f.label}</label>
                    <input type={f.type} placeholder={f.ph} value={form[f.key as keyof typeof form]}
                      onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))}
                      style={{ width: "100%", border: `1.5px solid ${C.border}`, borderRadius: 6, padding: ".75rem 1rem", fontSize: ".9rem", color: C.text, background: C.mist }} />
                  </div>
                ))}
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.2rem", marginBottom: "1.2rem" }}>
                <div>
                  <label style={{ display: "block", fontSize: ".68rem", fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", color: C.mid, marginBottom: ".5rem" }}>Department *</label>
                  <select value={form.dept} onChange={e => setForm(p => ({ ...p, dept: e.target.value }))}
                    style={{ width: "100%", border: `1.5px solid ${C.border}`, borderRadius: 6, padding: ".75rem 1rem", fontSize: ".9rem", color: form.dept ? C.text : C.mid, background: C.mist }}>
                    <option value="">Select department</option>
                    {SPECIALITIES.map(s => <option key={s.name}>{s.name}</option>)}
                    <option>General Medicine</option>
                    <option>Dermatology</option>
                    <option>ENT</option>
                    <option>Ophthalmology</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: "block", fontSize: ".68rem", fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", color: C.mid, marginBottom: ".5rem" }}>Preferred Date</label>
                  <input type="date" value={form.date} onChange={e => setForm(p => ({ ...p, date: e.target.value }))}
                    min={new Date().toISOString().split("T")[0]}
                    style={{ width: "100%", border: `1.5px solid ${C.border}`, borderRadius: 6, padding: ".75rem 1rem", fontSize: ".9rem", color: C.text, background: C.mist }} />
                </div>
              </div>

              <div style={{ marginBottom: "1.5rem" }}>
                <label style={{ display: "block", fontSize: ".68rem", fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", color: C.mid, marginBottom: ".5rem" }}>Reason for Visit</label>
                <input type="text" placeholder="Briefly describe your concern..." value={form.msg}
                  onChange={e => setForm(p => ({ ...p, msg: e.target.value }))}
                  style={{ width: "100%", border: `1.5px solid ${C.border}`, borderRadius: 6, padding: ".75rem 1rem", fontSize: ".9rem", color: C.text, background: C.mist }} />
              </div>

              {/* Submit — magenta, green on success */}
              <button type="submit" className="btn-magenta"
                style={{ width: "100%", justifyContent: "center", padding: "1rem", fontSize: ".9rem", background: sent ? "#22c55e" : C.magenta }}>
                {sent ? "✓ Appointment Confirmed! We'll call you shortly." : "Confirm Appointment →"}
              </button>

              <p style={{ textAlign: "center", fontSize: ".72rem", color: C.mid, marginTop: "1rem" }}>
                Or call us directly: <a href="tel:040-2717-6100" style={{ color: C.magenta, fontWeight: 700, textDecoration: "none" }}>040-2717-6100</a>
              </p>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
