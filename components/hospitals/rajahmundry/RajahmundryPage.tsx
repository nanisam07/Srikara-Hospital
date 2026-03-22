"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

/* ─── BRAND ─────────────────────────────────────────────────── */
const NAVY  = "#1B2D5B";
const NAVDK = "#111D3A";
const NAVLT = "#2A4480";
const PINK  = "#A3195B";
const PINKL = "#C0206D";
const PINKP = "#FBF0F5";
const NAVYP = "#EDF1FA";
const WH    = "#FFFFFF";
const BG    = "#F7F9FD";
const BDR   = "#DDE5F0";
const INK   = "#0D1A35";
const MID   = "#4A5E80";
const LT    = "#8898B8";
const GOLD  = "#F0A500";

/* ─── IMAGES — every page gets different images ─────────────── */
// HOME page images
const HOME_IMG = {
  hero:    "https://images.unsplash.com/photo-1504813184591-01572f98c85f?w=1600&q=85",
  about1:  "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=900&q=85",
  about2:  "https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=600&q=85",
  about3:  "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=600&q=85",
  test:    "https://images.unsplash.com/photo-1504813184591-01572f98c85f?w=1200&q=75",
  fac1:    "https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?w=700&q=85",
  fac2:    "https://images.unsplash.com/photo-1530497610245-94d3c16cda28?w=700&q=85",
  fac3:    "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=700&q=85",
  fac4:    "https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=700&q=85",
  fac5:    "https://images.unsplash.com/photo-1576765607924-3f7b8410a787?w=700&q=85",
  fac6:    "https://images.unsplash.com/photo-1587745416684-47953f16f02f?w=700&q=85",
  emrg:    "https://images.unsplash.com/photo-1587745416684-47953f16f02f?w=900&q=85",
};

// DEPARTMENTS page images (completely different)
const DEPT_IMG = {
  cardio:  "https://images.unsplash.com/photo-1628348068343-c6a848d2b6dd?w=800&q=85",
  ortho:   "https://images.unsplash.com/photo-1530026186672-2cd00ffc50fe?w=800&q=85",
  neuro:   "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=800&q=85",
  gynae:   "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=85",
  onco:    "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=800&q=85",
  gastro:  "https://images.unsplash.com/photo-1579154204601-01588f351e67?w=800&q=85",
  physio:  "https://images.unsplash.com/photo-1598520106830-8c45c2035460?w=800&q=85",
  diag:    "https://images.unsplash.com/photo-1579154204601-01588f351e67?w=800&q=85",
};

// DOCTORS page images (completely different faces/styles)
const DOC_IMG = {
  d1: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=600&q=85",
  d2: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=600&q=85",
  d3: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=600&q=85",
  d4: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=600&q=85",
  d5: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=600&q=85",
  d6: "https://images.unsplash.com/photo-1651008376811-b90baee60c1f?w=600&q=85",
  bg: "https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=1400&q=75",
};

/* ─── DATA ─────────────────────────────────────────────────── */
type Page = "home" | "departments" | "doctors";

const BRANCHES = [
  "Miyapur","RTC X Roads","Kompally","Peerzadiguda",
  "Rajahmundry","Lakdikapul","LB Nagar","Vijayawada","ECIL",
];

const DEPTS = [
  { n:"Cardiology",        sub:"Heart & Vascular",      icon:"🫀", img:DEPT_IMG.cardio, clr:PINK,
    desc:"Comprehensive cardiac care — Cath Lab, Angioplasty, TAVR, Echocardiography and a 12-bed Cardiac ICU staffed around the clock.",
    pts:["Cardiac Cath Lab","Angioplasty & Stenting","TAVR","Echocardiography","24-Bed Cardiac ICU"] },
  { n:"Orthopaedics",      sub:"Bone, Joint & Spine",   icon:"🦴", img:DEPT_IMG.ortho, clr:NAVY,
    desc:"Robotic joint replacement, arthroscopy, sports medicine, fracture management and complex spinal surgery.",
    pts:["Robotic Joint Replacement","Arthroscopy","Spine Surgery","Sports Medicine","Fracture Care"] },
  { n:"Neurology",         sub:"Brain & Nervous System", icon:"🧠", img:DEPT_IMG.neuro, clr:"#5B21B6",
    desc:"Stroke unit, epilepsy monitoring, Parkinson's clinic, neuro-oncology and complete neuro-rehabilitation.",
    pts:["Stroke Unit","Epilepsy Monitoring","Parkinson's Clinic","Neuro-surgery","Neuro Rehab"] },
  { n:"Obs & Gynaecology", sub:"Women's Health",         icon:"👶", img:DEPT_IMG.gynae, clr:PINK,
    desc:"High-risk obstetrics, IVF & fertility, laparoscopic surgery, Level III NICU and complete maternal care.",
    pts:["High-Risk Obstetrics","IVF & Fertility","Laparoscopy","Level III NICU","Maternal Health"] },
  { n:"Oncology",          sub:"Cancer Care",            icon:"🔬", img:DEPT_IMG.onco,  clr:"#065F46",
    desc:"Weekly tumour board, precision chemotherapy, immunotherapy, targeted therapy and palliative care.",
    pts:["Tumour Board","Chemotherapy","Immunotherapy","Targeted Therapy","Palliative Care"] },
  { n:"Gastroenterology",  sub:"Digestive Health",       icon:"🫁", img:DEPT_IMG.gastro, clr:NAVLT,
    desc:"GI endoscopy, hepatology, IBD clinic, bariatric surgery and comprehensive digestive disease management.",
    pts:["GI Endoscopy","Hepatology","IBD Clinic","Bariatric Surgery","Colonoscopy"] },
  { n:"Physiotherapy",     sub:"Rehabilitation",          icon:"🏃", img:DEPT_IMG.physio, clr:"#047857",
    desc:"Post-surgery, cardiac, neurological and sports rehabilitation — physiotherapy, OT and speech therapy.",
    pts:["Post-Surgery Rehab","Cardiac Rehab","Neuro Rehab","Sports Rehab","Speech Therapy"] },
  { n:"Diagnostics",       sub:"Imaging & Lab",           icon:"🔭", img:DEPT_IMG.diag,  clr:"#92400E",
    desc:"3T MRI, 256-slice CT, PET-CT, digital mammography and NABL-certified lab with 1,200+ tests.",
    pts:["3-Tesla MRI","256-Slice CT","PET-CT","Digital Mammography","NABL Certified Lab"] },
];

const DOCS = [
  { name:"Dr. Venkata Rao Nanduri",  role:"Senior Cardiologist",            qual:"DM Cardiology · NIMS Hyderabad",      exp:"20",  img:DOC_IMG.d1, avail:"Mon–Sat · 10 AM–2 PM",   dept:"Cardiology"       },
  { name:"Dr. Padmaja Kommuri",       role:"Orthopaedic Surgeon",             qual:"MS Ortho · Fellowship Royal College", exp:"16",  img:DOC_IMG.d2, avail:"Mon, Wed, Fri · 3–7 PM", dept:"Orthopaedics"     },
  { name:"Dr. Kishore Babu Allam",    role:"Neurologist",                     qual:"DM Neurology · AIIMS New Delhi",      exp:"14",  img:DOC_IMG.d3, avail:"Tue, Thu, Sat · 9–1 PM", dept:"Neurology"        },
  { name:"Dr. Hymavathi Talluri",     role:"Gynaecologist & IVF Specialist",  qual:"MS OBG · FRCOG",                      exp:"18",  img:DOC_IMG.d4, avail:"Mon–Fri · 11 AM–3 PM",   dept:"Obs & Gynaecology"},
  { name:"Dr. Surya Prakash Rao",     role:"Medical Oncologist",              qual:"DM Oncology · Tata Memorial",         exp:"13",  img:DOC_IMG.d5, avail:"Mon–Fri · 2–6 PM",        dept:"Oncology"         },
  { name:"Dr. Annapurna Devi",        role:"Gastroenterologist",              qual:"DM Gastro · PGIMER Chandigarh",       exp:"11",  img:DOC_IMG.d6, avail:"Mon–Sat · 8 AM–12 PM",    dept:"Gastroenterology" },
];

const STATS = [
  { n:8,   s:"+",  l:"Years" },
  { n:30,  s:"+",  l:"Doctors" },
  { n:38,  s:"k+", l:"Patients" },
  { n:180, s:"",   l:"Beds" },
];

const TESTIS = [
  { q:"After my heart attack the team at Srikara Rajahmundry had me in the cath lab within minutes. Dr. Venkata Rao's expertise and the ICU team's round-the-clock care genuinely saved my life.", name:"Subrahmanyam P.",  area:"Rajahmundry, AP",  dept:"Cardiology"    },
  { q:"Dr. Padmaja's knee replacement gave me mobility I hadn't known for five years. I was walking the very next morning. The physiotherapy team was patient, skilled and encouraging throughout.", name:"Kamala Rani D.",   area:"Kakinada, AP",     dept:"Orthopaedics"  },
  { q:"After three years of IVF failures elsewhere, Dr. Hymavathi's team at Srikara succeeded. Clinical precision combined with extraordinary compassion — we are forever grateful.", name:"Priya & Kiran V.", area:"Rajahmundry, AP",  dept:"IVF & Fertility"},
];

const SLOTS = ["9:00 AM","10:00 AM","11:00 AM","12:00 PM","2:00 PM","3:00 PM","4:00 PM","5:00 PM","6:00 PM"];

/* ─── HELPERS ─────────────────────────────────────────────── */
function useVis(t = 0.08) {
  const r = useRef<HTMLDivElement>(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const el = r.current; if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setOn(true); io.unobserve(el); } }, { threshold: t });
    io.observe(el); return () => io.disconnect();
  }, [t]);
  return { r, on };
}

function Fade({ children, d = 0, x = 0, y = 32 }: { children: React.ReactNode; d?: number; x?: number; y?: number }) {
  const { r, on } = useVis();
  return (
    <div ref={r} style={{ transition: `opacity .9s ease ${d}ms, transform .9s ease ${d}ms`, opacity: on ? 1 : 0, transform: on ? "none" : `translate(${x}px,${y}px)` }}>
      {children}
    </div>
  );
}

function Cnt({ to, suf, go }: { to: number; suf: string; go: boolean }) {
  const [v, setV] = useState(0); const done = useRef(false);
  useEffect(() => {
    if (!go || done.current) return; done.current = true;
    let f = 0; const run = () => { f++; const p = Math.min(f / 75, 1); setV(Math.round(to * (1 - Math.pow(1 - p, 3)))); if (p < 1) requestAnimationFrame(run); }; requestAnimationFrame(run);
  }, [go, to]);
  return <>{v}{suf}</>;
}

/* ─── SRIKARA LOGO SVG ─────────────────────────────────────── */
const Logo = ({ h = 46 }: { h?: number }) => (
  <svg height={h} viewBox="0 0 260 80" xmlns="http://www.w3.org/2000/svg">
    {/* Flower */}
    <g transform="translate(4,4)">
      {[0,45,90,135,180,225,270,315].map((deg, i) => (
        <g key={i} transform={`rotate(${deg},35,35)`}>
          <ellipse cx="35" cy="11" rx="5.5" ry="9.5" fill={PINK} opacity=".92"/>
          <circle cx="35" cy="3.5" r="3.8" fill={NAVY}/>
        </g>
      ))}
      <circle cx="35" cy="35" r="5.5" fill={WH}/>
    </g>
    {/* SRIKARA */}
    <text x="84" y="54" fontFamily="'Arial Black',Arial,sans-serif" fontWeight="900" fontSize="34" fill={NAVY} letterSpacing="-0.5">SRIKARA</text>
    {/* Leaf between SR and IKARA */}
    <ellipse cx="105" cy="44" rx="4.5" ry="11" fill={PINK} opacity=".95" transform="rotate(-8,105,44)"/>
    {/* HOSPITALS */}
    <text x="84" y="74" fontFamily="'Arial Black',Arial,sans-serif" fontWeight="900" fontSize="20" fill={PINK} letterSpacing="2.5">HOSPITALS</text>
  </svg>
);

/* ─── MAIN ──────────────────────────────────────────────────── */
export default function Rajahmundry() {
  const [page,      setPage]      = useState<Page>("home");
  const [scrolled,  setScrolled]  = useState(false);
  const [mobMenu,   setMobMenu]   = useState(false);
  const [activeDept,setActiveDept]= useState(0);
  const [activeTst, setActiveTst] = useState(0);
  const [bookOpen,  setBookOpen]  = useState(false);
  const [statsGo,   setStatsGo]   = useState(false);
  const [form, setForm] = useState({ name:"", phone:"", dept:"", date:"", slot:"" });
  const [sent, setSent] = useState(false);
  const statRef = useRef<HTMLDivElement>(null);
  const deptScrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => { window.scrollTo({ top: 0, behavior: "smooth" }); }, [page]);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 55);
    window.addEventListener("scroll", fn, { passive: true });
    const t = setInterval(() => setActiveTst(p => (p + 1) % TESTIS.length), 5800);
    const el = statRef.current;
    if (el) {
      const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setStatsGo(true); io.disconnect(); } }, { threshold: .3 });
      io.observe(el);
    }
    return () => { window.removeEventListener("scroll", fn); clearInterval(t); };
  }, []);

  const submit = (e: React.FormEvent) => {
    e.preventDefault(); setSent(true);
    setTimeout(() => { setSent(false); setBookOpen(false); setForm({ name:"", phone:"", dept:"", date:"", slot:"" }); }, 3500);
  };

  /* ═══ NAVBAR ════════════════════════════════════════════════ */
  const Nav = () => (
    <>
      {/* Emergency strip */}
      <div style={{ background: NAVDK, padding: "6px 2rem", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: ".4rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "1.8rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ position: "relative", display: "inline-flex", width: 10, height: 10 }}>
              <span style={{ position: "absolute", width: "100%", height: "100%", borderRadius: "50%", background: "#EF4444", animation: "ping 1.5s ease infinite", opacity: .5 }}/>
              <span style={{ position: "relative", width: 10, height: 10, borderRadius: "50%", background: "#EF4444", display: "inline-block" }}/>
            </span>
            <span style={{ fontFamily: "'Nunito',sans-serif", fontSize: ".62rem", fontWeight: 800, letterSpacing: ".16em", textTransform: "uppercase", color: "rgba(255,255,255,.72)" }}>Emergency 24/7</span>
          </div>
          <a href="tel:0883-246-1100" style={{ fontFamily: "'Nunito',sans-serif", fontSize: ".9rem", fontWeight: 900, color: WH, textDecoration: "none" }}>0883-246-1100</a>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
          <span style={{ fontFamily: "'Nunito',sans-serif", fontSize: ".62rem", color: "rgba(255,255,255,.42)" }}>D.No. 7-31, Morampudi Road, Rajahmundry – 533101</span>
          <Link href="/" style={{ fontFamily: "'Nunito',sans-serif", fontSize: ".62rem", fontWeight: 700, color: "rgba(255,255,255,.5)", textDecoration: "none", letterSpacing: ".1em", textTransform: "uppercase" }}>← Main Site</Link>
        </div>
      </div>

      {/* Main nav */}
      <header style={{ position: "sticky", top: 0, zIndex: 500, background: scrolled ? "rgba(255,255,255,.97)" : WH, backdropFilter: scrolled ? "blur(16px)" : "none", borderBottom: `1px solid ${scrolled ? BDR : "rgba(221,229,240,.45)"}`, boxShadow: scrolled ? "0 2px 24px rgba(27,45,91,.07)" : "none", transition: "all .3s" }}>
        {/* Brand colour bar */}
        <div style={{ height: 4, background: `linear-gradient(90deg,${NAVY} 0%,${PINK} 50%,${NAVY} 100%)` }} />
        <div style={{ maxWidth: 1300, margin: "0 auto", padding: "0 2rem", height: 68, display: "flex", alignItems: "center", justifyContent: "space-between" }}>

          {/* Logo */}
          <button onClick={() => { setPage("home"); setMobMenu(false); }} style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}>
            <Logo h={44} />
          </button>

          {/* Branch badge */}
          <div style={{ display: "flex", alignItems: "center", gap: 10 }} className="d-nav">
            <div style={{ width: 1, height: 30, background: BDR }}/>
            <div>
              <p style={{ fontFamily: "'Nunito',sans-serif", fontSize: ".56rem", fontWeight: 700, letterSpacing: ".16em", textTransform: "uppercase", color: LT }}>Branch</p>
              <p style={{ fontFamily: "'Nunito',sans-serif", fontSize: ".88rem", fontWeight: 900, color: NAVY, marginTop: 1 }}>Rajahmundry</p>
            </div>
          </div>

          {/* 3 page nav */}
          <nav style={{ display: "flex", alignItems: "center", background: BG, borderRadius: 10, padding: "4px", gap: "2px" }} className="d-nav">
            {(["home","departments","doctors"] as Page[]).map(pg => (
              <button key={pg} onClick={() => setPage(pg)}
                style={{ fontFamily: "'Nunito',sans-serif", fontSize: ".84rem", fontWeight: 800, color: page === pg ? WH : MID, background: page === pg ? PINK : "transparent", border: "none", cursor: "pointer", padding: ".55rem 1.3rem", borderRadius: 7, transition: "all .25s", whiteSpace: "nowrap", letterSpacing: ".01em" }}>
                {pg === "home" ? "Home" : pg === "departments" ? "Departments" : "Doctors"}
              </button>
            ))}
          </nav>

          <div style={{ display: "flex", alignItems: "center", gap: ".8rem" }}>
            <a href="tel:0883-246-1200" className="d-nav" style={{ fontFamily: "'Nunito',sans-serif", fontSize: ".8rem", fontWeight: 800, color: NAVY, textDecoration: "none", display: "flex", alignItems: "center", gap: 5 }}>
              <span>📞</span>0883-246-1200
            </a>
            <button onClick={() => setBookOpen(true)}
              style={{ fontFamily: "'Nunito',sans-serif", background: PINK, color: WH, border: "none", borderRadius: 9, padding: ".58rem 1.4rem", fontSize: ".82rem", fontWeight: 900, cursor: "pointer", boxShadow: `0 4px 16px ${PINK}44`, transition: "all .25s" }}
              onMouseEnter={e => (e.currentTarget as HTMLButtonElement).style.background = PINKL}
              onMouseLeave={e => (e.currentTarget as HTMLButtonElement).style.background = PINK}>
              Book Appointment
            </button>
            <button onClick={() => setMobMenu(!mobMenu)} className="m-ham"
              style={{ display: "none", flexDirection: "column", gap: 5, background: "none", border: `1.5px solid ${BDR}`, borderRadius: 8, padding: ".4rem .6rem", cursor: "pointer" }}>
              {[0,1,2].map(i => <span key={i} style={{ width: 20, height: 1.5, background: NAVY, display: "block" }}/>)}
            </button>
          </div>
        </div>
        {mobMenu && (
          <div style={{ background: WH, borderTop: `1px solid ${BDR}`, padding: "1rem 1.5rem", display: "flex", flexDirection: "column", gap: ".8rem" }}>
            {(["home","departments","doctors"] as Page[]).map(pg => (
              <button key={pg} onClick={() => { setPage(pg); setMobMenu(false); }}
                style={{ fontFamily: "'Nunito',sans-serif", background: page === pg ? PINKP : "transparent", border: "none", color: page === pg ? PINK : MID, fontWeight: 800, fontSize: ".9rem", cursor: "pointer", padding: ".65rem .9rem", borderRadius: 7, textAlign: "left" }}>
                {pg === "home" ? "Home" : pg === "departments" ? "Departments" : "Doctors"}
              </button>
            ))}
            <button onClick={() => { setMobMenu(false); setBookOpen(true); }}
              style={{ fontFamily: "'Nunito',sans-serif", background: PINK, color: WH, border: "none", borderRadius: 8, padding: ".8rem", fontWeight: 900, cursor: "pointer" }}>
              Book Appointment
            </button>
          </div>
        )}
      </header>
    </>
  );

  /* ═══ HOME PAGE ═════════════════════════════════════════════ */
  const HomePage = () => (
    <div>

      {/* ── HERO — FULL-HEIGHT SPLIT SCREEN ── */}
      <section style={{ display: "flex", minHeight: "92vh", overflow: "hidden" }} className="hero-split">
        {/* Left — colour panel */}
        <div style={{ flex: "0 0 50%", background: `linear-gradient(150deg,${NAVDK} 0%,${NAVY} 60%,#3A104A 100%)`, display: "flex", alignItems: "center", padding: "7rem 4rem 5rem 3rem", position: "relative", overflow: "hidden" }}>
          {/* Decorative circles */}
          <div style={{ position: "absolute", bottom: "-15%", left: "-10%", width: 400, height: 400, borderRadius: "50%", border: `1px solid ${PINK}20`, pointerEvents: "none" }}/>
          <div style={{ position: "absolute", bottom: "-25%", left: "-20%", width: 600, height: 600, borderRadius: "50%", border: `1px solid ${PINK}12`, pointerEvents: "none" }}/>
          <div style={{ position: "absolute", top: "10%", right: "-5%", width: 200, height: 200, borderRadius: "50%", background: `radial-gradient(circle,${PINK}18 0%,transparent 70%)`, pointerEvents: "none" }}/>

          <div style={{ position: "relative", zIndex: 2, maxWidth: 520 }}>
            {/* NABH tag */}
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: `${PINK}22`, border: `1px solid ${PINK}40`, borderRadius: 100, padding: ".36rem 1rem", marginBottom: "2rem", animation: "fadeUp .8s ease .1s both" }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#4ADE80", animation: "blink 2s ease infinite", display: "inline-block" }}/>
              <span style={{ fontFamily: "'Nunito',sans-serif", fontSize: ".62rem", fontWeight: 800, letterSpacing: ".18em", textTransform: "uppercase", color: "rgba(255,255,255,.88)" }}>NABH Accredited · Est. 2016 · Rajahmundry</span>
            </div>

            <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(2.8rem,4.5vw,5rem)", fontWeight: 700, color: WH, lineHeight: 1.08, marginBottom: "1.2rem", animation: "fadeUp .8s ease .28s both" }}>
              Where every<br/>family finds<br/><em style={{ fontStyle: "italic", color: "#F9A8D4" }}>expert care.</em>
            </h1>

            <p style={{ fontFamily: "'Nunito',sans-serif", fontSize: "1rem", color: "rgba(255,255,255,.68)", lineHeight: 1.85, marginBottom: "2.5rem", animation: "fadeUp .8s ease .46s both" }}>
              East Godavari's most comprehensive multi-specialty hospital — 30 super-specialists, robotic surgery and compassionate care serving Rajahmundry and the wider region since 2016.
            </p>

            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", animation: "fadeUp .8s ease .64s both" }}>
              <button onClick={() => setBookOpen(true)}
                style={{ fontFamily: "'Nunito',sans-serif", display: "inline-flex", alignItems: "center", gap: 8, background: PINK, color: WH, padding: ".9rem 2.2rem", borderRadius: 9, fontSize: ".88rem", fontWeight: 900, border: "none", cursor: "pointer", boxShadow: `0 4px 24px ${PINK}55`, transition: "all .28s" }}>
                📅 Book Appointment
              </button>
              <a href="tel:0883-246-1100"
                style={{ fontFamily: "'Nunito',sans-serif", display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,.06)", color: WH, padding: ".9rem 1.8rem", borderRadius: 9, fontSize: ".88rem", fontWeight: 800, border: "1px solid rgba(255,255,255,.25)", textDecoration: "none", transition: "all .28s" }}>
                🚨 Emergency
              </a>
            </div>

            {/* Floating stat cards */}
            <div ref={statRef} style={{ display: "flex", gap: "1rem", marginTop: "3rem", animation: "fadeUp .8s ease .85s both" }}>
              {STATS.map((s, i) => (
                <div key={i} style={{ background: "rgba(255,255,255,.07)", border: "1px solid rgba(255,255,255,.12)", borderRadius: 12, padding: "1rem 1.2rem", backdropFilter: "blur(8px)", flex: 1, textAlign: "center" }}>
                  <p style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.8rem", fontWeight: 700, color: WH, lineHeight: 1 }}>
                    <Cnt to={s.n} suf={s.s} go={statsGo}/>
                  </p>
                  <p style={{ fontFamily: "'Nunito',sans-serif", fontSize: ".62rem", fontWeight: 700, color: "rgba(255,255,255,.6)", letterSpacing: ".1em", textTransform: "uppercase", marginTop: 4 }}>{s.l}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right — photo panel */}
        <div style={{ flex: 1, position: "relative", overflow: "hidden" }} className="hero-photo-r">
          <img src={HOME_IMG.hero} alt="Srikara Rajahmundry Hospital" style={{ width: "100%", height: "100%", objectFit: "cover", animation: "zoomIn 10s ease-out forwards" }}/>
          <div style={{ position: "absolute", inset: 0, background: `linear-gradient(90deg,${NAVDK}80 0%,transparent 40%),linear-gradient(180deg,transparent 50%,${NAVDK}88 100%)` }}/>

          {/* Overlapping info card */}
          <div style={{ position: "absolute", bottom: "3rem", left: "50%", transform: "translateX(-50%)", width: "85%", background: "rgba(255,255,255,.92)", backdropFilter: "blur(16px)", borderRadius: 16, padding: "1.4rem 1.6rem", boxShadow: "0 24px 60px rgba(27,45,91,.2)", border: `1px solid ${BDR}` }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ width: 42, height: 42, borderRadius: 10, background: `linear-gradient(135deg,${NAVY},${PINK})`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <span style={{ fontSize: "1.3rem" }}>🏥</span>
                </div>
                <div>
                  <p style={{ fontFamily: "'Playfair Display',serif", fontStyle: "italic", fontSize: ".95rem", fontWeight: 400, color: INK, lineHeight: 1.2 }}>Srikara Hospitals</p>
                  <p style={{ fontFamily: "'Nunito',sans-serif", fontSize: ".62rem", fontWeight: 800, color: PINK, letterSpacing: ".1em", textTransform: "uppercase" }}>Rajahmundry Branch</p>
                </div>
              </div>
              <div style={{ display: "flex", gap: ".6rem" }}>
                {["NABH","NABL","ISO"].map(b => (
                  <span key={b} style={{ fontFamily: "'Nunito',sans-serif", fontSize: ".58rem", fontWeight: 900, color: NAVY, background: NAVYP, border: `1px solid ${NAVY}22`, borderRadius: 100, padding: ".2rem .65rem" }}>{b}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Emergency badge top */}
          <div style={{ position: "absolute", top: "2.5rem", right: "1.5rem", background: "#EF4444", borderRadius: 12, padding: ".8rem 1.1rem" }}>
            <p style={{ fontFamily: "'Nunito',sans-serif", fontSize: ".58rem", fontWeight: 800, letterSpacing: ".14em", textTransform: "uppercase", color: WH, opacity: .85, marginBottom: 2 }}>Emergency 24/7</p>
            <p style={{ fontFamily: "'Nunito',sans-serif", fontSize: ".95rem", fontWeight: 900, color: WH }}>0883-246-1100</p>
          </div>
        </div>
      </section>

      {/* ── MARQUEE ── */}
      <div style={{ background: PINKP, borderTop: `2px solid ${PINK}22`, borderBottom: `2px solid ${PINK}22`, padding: ".72rem 0", overflow: "hidden", whiteSpace: "nowrap" }}>
        <div style={{ display: "inline-flex", gap: "3.5rem", animation: "marquee 32s linear infinite" }}>
          {Array(3).fill(["Advanced Cardiac Care","Robotic Surgery","Level III NICU","3T MRI & PET-CT","24/7 Emergency","NABH Accredited","IVF & Fertility","NABL Laboratory","Stroke Unit","Tumour Board","Bariatric Surgery","Physiotherapy"]).flat().map((t, i) => (
            <span key={i} style={{ fontFamily: "'Nunito',sans-serif", display: "inline-flex", alignItems: "center", gap: ".8rem", fontSize: ".7rem", fontWeight: 800, letterSpacing: ".16em", textTransform: "uppercase", color: PINK }}>
              <span style={{ width: 5, height: 5, borderRadius: "50%", background: NAVY, flexShrink: 0, display: "inline-block" }}/>{t}
            </span>
          ))}
        </div>
      </div>

      {/* ── ABOUT — 3-col asymmetric ── */}
      <section style={{ background: WH, padding: "7rem 2rem" }}>
        <div style={{ maxWidth: 1300, margin: "0 auto" }}>
          <Fade>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: "3.5rem" }}>
              <div style={{ width: 4, height: 44, background: PINK, borderRadius: 2 }}/>
              <div>
                <p style={{ fontFamily: "'Nunito',sans-serif", fontSize: ".62rem", fontWeight: 800, letterSpacing: ".22em", textTransform: "uppercase", color: PINK }}>About Us</p>
                <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(1.8rem,3vw,2.8rem)", fontWeight: 700, color: INK, lineHeight: 1.15 }}>
                  East Godavari's most <em style={{ fontStyle: "italic", color: NAVY }}>trusted hospital.</em>
                </h2>
              </div>
            </div>
          </Fade>

          {/* 3-column asymmetric grid */}
          <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr 1fr", gap: "1.5rem", alignItems: "stretch" }} className="about-grid">

            {/* Col 1 — tall photo */}
            <Fade x={-24}>
              <div style={{ borderRadius: 20, overflow: "hidden", height: "100%", minHeight: 480, position: "relative", boxShadow: `0 24px 60px ${NAVY}18` }}>
                <img src={HOME_IMG.about1} alt="Hospital" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}/>
                <div style={{ position: "absolute", inset: 0, background: `linear-gradient(180deg,transparent 50%,${NAVDK}CC 100%)` }}/>
                <div style={{ position: "absolute", bottom: "2rem", left: "1.5rem", right: "1.5rem" }}>
                  <div style={{ background: PINK, borderRadius: 8, padding: ".6rem 1rem", display: "inline-block", marginBottom: ".6rem" }}>
                    <p style={{ fontFamily: "'Playfair Display',serif", fontSize: "2rem", fontWeight: 700, color: WH, lineHeight: 1 }}>2016</p>
                    <p style={{ fontFamily: "'Nunito',sans-serif", fontSize: ".58rem", fontWeight: 700, color: "rgba(255,255,255,.75)", letterSpacing: ".12em", textTransform: "uppercase" }}>Established</p>
                  </div>
                  <p style={{ fontFamily: "'Playfair Display',serif", fontStyle: "italic", fontSize: "1.1rem", color: WH }}>8+ Years Serving East Godavari</p>
                </div>
              </div>
            </Fade>

            {/* Col 2 — pull quote + features */}
            <Fade d={100}>
              <div style={{ display: "flex", flexDirection: "column", gap: "1.4rem", height: "100%" }}>
                {/* Pull quote */}
                <div style={{ background: `linear-gradient(135deg,${NAVY},${NAVLT})`, borderRadius: 20, padding: "2.2rem", flex: "0 0 auto" }}>
                  <div style={{ fontSize: "3rem", color: PINK, lineHeight: 1, marginBottom: ".8rem", fontFamily: "serif" }}>"</div>
                  <p style={{ fontFamily: "'Playfair Display',serif", fontStyle: "italic", fontSize: "1.05rem", color: "rgba(255,255,255,.9)", lineHeight: 1.7 }}>
                    Our commitment is to make world-class healthcare accessible to every family in East Godavari.
                  </p>
                  <div style={{ marginTop: "1.2rem", display: "flex", alignItems: "center", gap: ".8rem" }}>
                    <div style={{ width: 32, height: 2, background: PINK, borderRadius: 1 }}/>
                    <span style={{ fontFamily: "'Nunito',sans-serif", fontSize: ".72rem", fontWeight: 700, color: "rgba(255,255,255,.6)" }}>Medical Director, Srikara Rajahmundry</span>
                  </div>
                </div>
                {/* Feature grid */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", flex: 1 }}>
                  {[{ic:"🤖",l:"Robotic Surgery",s:"Minimally invasive"},{ic:"🧬",l:"AI Diagnostics",s:"3T MRI & 256-CT"},{ic:"🏥",l:"180 Beds",s:"Full inpatient care"},{ic:"🚑",l:"24/7 Emergency",s:"<10 min response"}].map(f => (
                    <div key={f.l} style={{ background: BG, borderRadius: 14, padding: "1.2rem", border: `1px solid ${BDR}`, display: "flex", flexDirection: "column", gap: ".4rem", transition: "all .3s", cursor: "default" }}
                      onMouseEnter={e => { const el = e.currentTarget as HTMLDivElement; el.style.boxShadow = `0 8px 24px ${PINK}1A`; el.style.borderColor = PINK; }}
                      onMouseLeave={e => { const el = e.currentTarget as HTMLDivElement; el.style.boxShadow = ""; el.style.borderColor = BDR; }}>
                      <span style={{ fontSize: "1.5rem" }}>{f.ic}</span>
                      <p style={{ fontFamily: "'Nunito',sans-serif", fontSize: ".85rem", fontWeight: 800, color: NAVY }}>{f.l}</p>
                      <p style={{ fontFamily: "'Nunito',sans-serif", fontSize: ".7rem", color: LT }}>{f.s}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Fade>

            {/* Col 3 — stacked photos + text */}
            <Fade d={180} x={24}>
              <div style={{ display: "flex", flexDirection: "column", gap: "1.4rem" }}>
                <div style={{ borderRadius: 16, overflow: "hidden", height: 220 }}>
                  <img src={HOME_IMG.about2} alt="Specialists" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "transform .5s" }}
                    onMouseEnter={e => (e.currentTarget as HTMLImageElement).style.transform = "scale(1.05)"}
                    onMouseLeave={e => (e.currentTarget as HTMLImageElement).style.transform = ""}/>
                </div>
                <div style={{ borderRadius: 16, overflow: "hidden", height: 160 }}>
                  <img src={HOME_IMG.about3} alt="Patient care" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "transform .5s" }}
                    onMouseEnter={e => (e.currentTarget as HTMLImageElement).style.transform = "scale(1.05)"}
                    onMouseLeave={e => (e.currentTarget as HTMLImageElement).style.transform = ""}/>
                </div>
                <div style={{ background: PINKP, borderRadius: 16, padding: "1.5rem", border: `1px solid ${PINK}25`, flex: 1 }}>
                  <p style={{ fontFamily: "'Nunito',sans-serif", fontSize: ".88rem", color: MID, lineHeight: 1.82, marginBottom: "1.2rem" }}>
                    Established in 2016, we serve Rajahmundry, Kakinada, Peddapuram and the entire East Godavari district with 30+ board-certified specialists across 8 specialities.
                  </p>
                  <button onClick={() => setBookOpen(true)}
                    style={{ fontFamily: "'Nunito',sans-serif", display: "inline-flex", alignItems: "center", gap: 8, background: NAVY, color: WH, padding: ".78rem 1.6rem", borderRadius: 8, fontSize: ".82rem", fontWeight: 900, border: "none", cursor: "pointer", transition: "all .25s" }}
                    onMouseEnter={e => (e.currentTarget as HTMLButtonElement).style.background = NAVLT}
                    onMouseLeave={e => (e.currentTarget as HTMLButtonElement).style.background = NAVY}>
                    Book Consultation →
                  </button>
                </div>
              </div>
            </Fade>
          </div>
        </div>
      </section>

      {/* ── DEPT QUICK LOOK ── */}
      <section style={{ background: BG, padding: "7rem 2rem" }}>
        <div style={{ maxWidth: 1300, margin: "0 auto" }}>
          <Fade>
            <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: "3rem", flexWrap: "wrap", gap: "1.5rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ width: 4, height: 44, background: NAVY, borderRadius: 2 }}/>
                <div>
                  <p style={{ fontFamily: "'Nunito',sans-serif", fontSize: ".62rem", fontWeight: 800, letterSpacing: ".22em", textTransform: "uppercase", color: NAVY }}>Medical Specialities</p>
                  <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(1.8rem,3vw,2.8rem)", fontWeight: 700, color: INK, lineHeight: 1.15 }}>
                    Expert care in <em style={{ fontStyle: "italic", color: PINK }}>8 departments.</em>
                  </h2>
                </div>
              </div>
              <button onClick={() => setPage("departments")}
                style={{ fontFamily: "'Nunito',sans-serif", display: "inline-flex", alignItems: "center", gap: 6, background: "transparent", color: PINK, border: `2px solid ${PINK}`, borderRadius: 9, padding: ".65rem 1.5rem", fontSize: ".82rem", fontWeight: 900, cursor: "pointer", transition: "all .25s" }}
                onMouseEnter={e => { const b = e.currentTarget as HTMLButtonElement; b.style.background = PINK; b.style.color = WH; }}
                onMouseLeave={e => { const b = e.currentTarget as HTMLButtonElement; b.style.background = "transparent"; b.style.color = PINK; }}>
                View All Departments →
              </button>
            </div>
          </Fade>

          {/* 2-row dept cards */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "1rem" }} className="dept-grid-h">
            {DEPTS.map((d, i) => (
              <Fade key={d.n} d={i * 45}>
                <div onClick={() => { setActiveDept(i); setPage("departments"); }}
                  style={{ position: "relative", overflow: "hidden", borderRadius: 16, height: 180, cursor: "pointer", transition: "transform .3s, box-shadow .3s", boxShadow: "0 2px 12px rgba(27,45,91,.08)" }}
                  onMouseEnter={e => { const el = e.currentTarget as HTMLDivElement; el.style.transform = "translateY(-5px)"; el.style.boxShadow = `0 16px 40px ${NAVY}22`; }}
                  onMouseLeave={e => { const el = e.currentTarget as HTMLDivElement; el.style.transform = ""; el.style.boxShadow = "0 2px 12px rgba(27,45,91,.08)"; }}>
                  <img src={d.img} alt={d.n} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "transform .5s" }}
                    onMouseEnter={e => (e.currentTarget as HTMLImageElement).style.transform = "scale(1.07)"}
                    onMouseLeave={e => (e.currentTarget as HTMLImageElement).style.transform = ""}/>
                  <div style={{ position: "absolute", inset: 0, background: `linear-gradient(180deg,transparent 30%,${NAVDK}CC 100%)` }}/>
                  <div style={{ position: "absolute", top: "1rem", left: "1rem", fontSize: "1.5rem" }}>{d.icon}</div>
                  <div style={{ position: "absolute", bottom: ".9rem", left: "1rem", right: "1rem" }}>
                    <p style={{ fontFamily: "'Nunito',sans-serif", fontSize: ".82rem", fontWeight: 900, color: WH, lineHeight: 1.2 }}>{d.n}</p>
                    <p style={{ fontFamily: "'Nunito',sans-serif", fontSize: ".62rem", color: "rgba(255,255,255,.65)", marginTop: 2 }}>{d.sub}</p>
                  </div>
                </div>
              </Fade>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section style={{ position: "relative", overflow: "hidden", padding: "7rem 2rem" }}>
        <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
          <img src={HOME_IMG.test} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }}/>
          <div style={{ position: "absolute", inset: 0, background: `linear-gradient(135deg,${NAVDK}F5 0%,${NAVY}EE 50%,${NAVDK}F0 100%)` }}/>
        </div>

        <div style={{ maxWidth: 900, margin: "0 auto", position: "relative", zIndex: 1, textAlign: "center" }}>
          <Fade>
            <div style={{ marginBottom: "3.5rem" }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 10, marginBottom: "1rem" }}>
                <span style={{ width: 20, height: 2, background: `${PINK}60`, display: "block" }}/>
                <span style={{ fontFamily: "'Nunito',sans-serif", fontSize: ".65rem", fontWeight: 800, letterSpacing: ".22em", textTransform: "uppercase", color: "rgba(255,255,255,.6)" }}>Patient Stories</span>
                <span style={{ width: 20, height: 2, background: `${PINK}60`, display: "block" }}/>
              </div>
              <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(1.8rem,3vw,2.8rem)", fontWeight: 700, color: WH }}>
                <em style={{ fontStyle: "italic" }}>Voices of healing.</em>
              </h2>
            </div>
          </Fade>

          <div style={{ position: "relative", minHeight: 300 }}>
            {TESTIS.map((t, i) => (
              <div key={i} style={{ position: i === activeTst ? "relative" : "absolute", inset: 0, opacity: i === activeTst ? 1 : 0, transform: i === activeTst ? "none" : "translateY(16px)", transition: "all .7s ease", pointerEvents: i === activeTst ? "auto" : "none" }}>
                <div style={{ background: "rgba(255,255,255,.06)", border: "1px solid rgba(255,255,255,.12)", borderRadius: 20, padding: "3rem", backdropFilter: "blur(12px)", position: "relative", overflow: "hidden" }}>
                  <div style={{ position: "absolute", top: "-20%", right: "-5%", width: 200, height: 200, borderRadius: "50%", background: `radial-gradient(circle,${PINK}15 0%,transparent 70%)`, pointerEvents: "none" }}/>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.5rem", flexWrap: "wrap", gap: ".8rem", position: "relative", zIndex: 1 }}>
                    <span style={{ fontFamily: "'Nunito',sans-serif", fontSize: ".65rem", fontWeight: 800, letterSpacing: ".12em", textTransform: "uppercase", color: "rgba(255,255,255,.88)", background: `${PINK}30`, border: `1px solid ${PINK}50`, borderRadius: 100, padding: ".28rem .85rem" }}>{t.dept}</span>
                    <span style={{ color: GOLD, letterSpacing: 2, fontSize: ".9rem" }}>★★★★★</span>
                  </div>
                  <p style={{ fontFamily: "'Playfair Display',serif", fontStyle: "italic", fontSize: "clamp(1.05rem,1.8vw,1.35rem)", color: "rgba(255,255,255,.92)", lineHeight: 1.8, marginBottom: "2rem", position: "relative", zIndex: 1 }}>"{t.q}"</p>
                  <div style={{ display: "flex", alignItems: "center", gap: "1rem", position: "relative", zIndex: 1 }}>
                    <div style={{ width: 46, height: 46, borderRadius: "50%", background: `linear-gradient(135deg,${PINK},${NAVY})`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <span style={{ fontFamily: "'Playfair Display',serif", fontStyle: "italic", color: WH, fontSize: "1rem" }}>{t.name[0]}</span>
                    </div>
                    <div style={{ textAlign: "left" }}>
                      <p style={{ fontFamily: "'Nunito',sans-serif", fontWeight: 900, color: WH, fontSize: ".9rem" }}>{t.name}</p>
                      <p style={{ fontFamily: "'Nunito',sans-serif", fontSize: ".7rem", color: "rgba(255,255,255,.5)", marginTop: 2 }}>{t.area}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", justifyContent: "center", gap: ".5rem", marginTop: "2rem" }}>
            {TESTIS.map((_, i) => (
              <button key={i} onClick={() => setActiveTst(i)} style={{ width: i === activeTst ? 32 : 8, height: 3, background: i === activeTst ? PINK : "rgba(255,255,255,.22)", border: "none", cursor: "pointer", transition: "all .3s", borderRadius: 2, padding: 0 }}/>
            ))}
          </div>
        </div>
      </section>

      {/* ── FACILITIES ── */}
      <section style={{ background: WH, padding: "7rem 2rem" }}>
        <div style={{ maxWidth: 1300, margin: "0 auto" }}>
          <Fade>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: "3rem" }}>
              <div style={{ width: 4, height: 44, background: PINK, borderRadius: 2 }}/>
              <div>
                <p style={{ fontFamily: "'Nunito',sans-serif", fontSize: ".62rem", fontWeight: 800, letterSpacing: ".22em", textTransform: "uppercase", color: PINK }}>Infrastructure</p>
                <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(1.8rem,3vw,2.8rem)", fontWeight: 700, color: INK, lineHeight: 1.15 }}>
                  World-class <em style={{ fontStyle: "italic", color: NAVY }}>facilities.</em>
                </h2>
              </div>
            </div>
          </Fade>

          {/* Bento-style facility grid */}
          <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr 1fr", gridTemplateRows: "240px 240px", gap: "1.2rem" }} className="fac-bento">
            {[
              { name:"24/7 Emergency & Trauma", tag:"Emergency", img:HOME_IMG.fac1, span:"1 / 1 / 3 / 2", desc:"Trauma bay, crash carts and rapid response every hour." },
              { name:"Advanced Imaging Suite",  tag:"Radiology", img:HOME_IMG.fac2, span:"1 / 2 / 2 / 3", desc:"3T MRI, 256-slice CT and PET-CT available 24 hrs." },
              { name:"Modular OTs",             tag:"Surgery",   img:HOME_IMG.fac4, span:"1 / 3 / 2 / 4", desc:"Six laminar-flow OTs with robotic surgery suite." },
              { name:"NABL Laboratory",         tag:"Pathology", img:HOME_IMG.fac3, span:"2 / 2 / 3 / 3", desc:"1,200+ tests and 24/7 blood bank." },
              { name:"In-House Pharmacy",       tag:"Pharmacy",  img:HOME_IMG.fac5, span:"2 / 3 / 3 / 4", desc:"Full 24/7 dispensary — all medications in stock." },
            ].map((f, i) => (
              <Fade key={f.name} d={i * 55}>
                <div style={{ gridArea: f.span, position: "relative", overflow: "hidden", borderRadius: 18, cursor: "default", transition: "transform .3s", boxShadow: "0 4px 20px rgba(27,45,91,.1)" }}
                  onMouseEnter={e => { const el = e.currentTarget as HTMLDivElement; el.style.transform = "scale(1.02)"; }}
                  onMouseLeave={e => { const el = e.currentTarget as HTMLDivElement; el.style.transform = ""; }}>
                  <img src={f.img} alt={f.name} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "transform .6s" }}
                    onMouseEnter={e => (e.currentTarget as HTMLImageElement).style.transform = "scale(1.06)"}
                    onMouseLeave={e => (e.currentTarget as HTMLImageElement).style.transform = ""}/>
                  <div style={{ position: "absolute", inset: 0, background: `linear-gradient(180deg,transparent 30%,${NAVDK}CC 100%)` }}/>
                  <div style={{ position: "absolute", top: "1rem", left: "1rem" }}>
                    <span style={{ fontFamily: "'Nunito',sans-serif", fontSize: ".6rem", fontWeight: 900, letterSpacing: ".12em", textTransform: "uppercase", background: PINK, color: WH, padding: ".24rem .7rem", borderRadius: 100 }}>{f.tag}</span>
                  </div>
                  <div style={{ position: "absolute", bottom: "1.2rem", left: "1.2rem", right: "1.2rem" }}>
                    <p style={{ fontFamily: "'Playfair Display',serif", fontStyle: "italic", fontSize: "1.05rem", color: WH, lineHeight: 1.3, marginBottom: ".3rem" }}>{f.name}</p>
                    <p style={{ fontFamily: "'Nunito',sans-serif", fontSize: ".7rem", color: "rgba(255,255,255,.7)" }}>{f.desc}</p>
                  </div>
                </div>
              </Fade>
            ))}
          </div>

          {/* Emrg strip */}
          <Fade d={200}>
            <div style={{ marginTop: "1.2rem", background: "linear-gradient(135deg,#DC2626,#9B1C1C)", borderRadius: 16, overflow: "hidden", position: "relative" }}>
              <div style={{ position: "absolute", inset: 0 }}><img src={HOME_IMG.emrg} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", opacity: .12 }}/></div>
              <div style={{ position: "relative", zIndex: 1, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "1.8rem 2.5rem", flexWrap: "wrap", gap: "2rem" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "1.2rem" }}>
                  <span style={{ fontSize: "2rem" }}>🚑</span>
                  <div>
                    <p style={{ fontFamily: "'Playfair Display',serif", fontStyle: "italic", fontSize: "1.35rem", color: WH, lineHeight: 1.2 }}>24/7 Emergency & Ambulance Service</p>
                    <p style={{ fontFamily: "'Nunito',sans-serif", fontSize: ".86rem", color: "rgba(255,255,255,.78)", marginTop: ".25rem" }}>GPS fleet · Trained paramedics · Under 10-minute response</p>
                  </div>
                </div>
                <a href="tel:0883-246-1100" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: WH, color: "#DC2626", padding: ".9rem 2rem", borderRadius: 9, fontFamily: "'Nunito',sans-serif", fontWeight: 900, fontSize: ".88rem", textDecoration: "none", flexShrink: 0 }}>📞 0883-246-1100</a>
              </div>
            </div>
          </Fade>
        </div>
      </section>

      {/* ── CONTACT & BRANCHES ── */}
      <section style={{ background: BG, padding: "7rem 2rem" }}>
        <div style={{ maxWidth: 1300, margin: "0 auto" }}>
          <Fade>
            <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(1.8rem,3vw,2.8rem)", fontWeight: 700, color: INK, textAlign: "center", marginBottom: "3rem" }}>
              Srikara Hospitals, <em style={{ fontStyle: "italic", color: PINK }}>Rajahmundry</em>
            </h2>
          </Fade>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3rem" }} className="two-col">
            <Fade x={-24}>
              <div style={{ background: WH, borderRadius: 20, border: `1px solid ${BDR}`, overflow: "hidden", boxShadow: `0 8px 40px ${NAVY}0C` }}>
                <div style={{ height: 5, background: `linear-gradient(90deg,${NAVY},${PINK},${NAVY})` }}/>
                <div style={{ padding: "2.2rem" }}>
                  {[
                    { ic:"📍", l:"Address",        v:"D.No. 7-31, Morampudi Road\nRajahmundry – 533101, AP" },
                    { ic:"🚨", l:"Emergency 24/7", v:"0883-246-1100" },
                    { ic:"📞", l:"Appointments",   v:"0883-246-1200" },
                    { ic:"✉️", l:"Email",            v:"rajahmundry@srikarahospitals.in" },
                    { ic:"🕐", l:"OPD Hours",        v:"Mon – Sat · 8:00 AM – 8:00 PM" },
                  ].map((c, i) => (
                    <div key={c.l} style={{ display: "flex", gap: "1rem", paddingBottom: "1.1rem", marginBottom: i < 4 ? "1.1rem" : 0, borderBottom: i < 4 ? `1px solid ${BDR}` : "none" }}>
                      <span style={{ fontSize: "1.2rem", flexShrink: 0, marginTop: 2 }}>{c.ic}</span>
                      <div>
                        <p style={{ fontFamily: "'Nunito',sans-serif", fontSize: ".62rem", fontWeight: 900, letterSpacing: ".14em", textTransform: "uppercase", color: PINK, marginBottom: ".25rem" }}>{c.l}</p>
                        <p style={{ fontFamily: "'Nunito',sans-serif", fontSize: ".9rem", fontWeight: 700, color: INK, whiteSpace: "pre-line", lineHeight: 1.6 }}>{c.v}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Fade>

            <Fade x={24} d={100}>
              <h3 style={{ fontFamily: "'Playfair Display',serif", fontStyle: "italic", fontSize: "1.8rem", fontWeight: 400, color: INK, marginBottom: "1.8rem" }}>Srikara Network</h3>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 1, background: BDR, borderRadius: 14, overflow: "hidden", marginBottom: "1.5rem" }}>
                {BRANCHES.map(b => (
                  <div key={b} style={{ background: BG, padding: ".9rem 1rem", display: "flex", alignItems: "center", justifyContent: "space-between", transition: "background .2s", cursor: "pointer" }}
                    onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.background = WH}
                    onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.background = BG}>
                    <span style={{ fontFamily: "'Nunito',sans-serif", fontSize: ".78rem", fontWeight: b === "Rajahmundry" ? 900 : 700, color: b === "Rajahmundry" ? PINK : MID }}>{b}</span>
                    {b === "Rajahmundry"
                      ? <span style={{ fontFamily: "'Nunito',sans-serif", fontSize: ".56rem", fontWeight: 900, color: NAVY, background: NAVYP, border: `1px solid ${NAVY}20`, borderRadius: 100, padding: ".14rem .5rem" }}>This Branch</span>
                      : <span style={{ fontSize: ".7rem", color: PINK }}>→</span>}
                  </div>
                ))}
              </div>
              <Link href="/" style={{ fontFamily: "'Nunito',sans-serif", display: "inline-flex", alignItems: "center", gap: 8, fontSize: ".82rem", fontWeight: 900, color: NAVY, textDecoration: "none", borderBottom: `1.5px solid ${NAVY}`, paddingBottom: 2 }}>
                ← Back to Main Srikara Website
              </Link>
            </Fade>
          </div>
        </div>
      </section>
    </div>
  );

  /* ═══ DEPARTMENTS PAGE ═══════════════════════════════════════ */
  const DepartmentsPage = () => (
    <div>
      {/* Full-width hero */}
      <div style={{ background: `linear-gradient(135deg,${NAVDK},${NAVY})`, padding: "4rem 2rem 3rem", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: `linear-gradient(${PINK}08 1px,transparent 1px),linear-gradient(90deg,${PINK}08 1px,transparent 1px)`, backgroundSize: "60px 60px", pointerEvents: "none" }}/>
        <div style={{ maxWidth: 1300, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: ".8rem" }}>
            <span style={{ width: 24, height: 3, background: PINK, borderRadius: 2, display: "block" }}/>
            <span style={{ fontFamily: "'Nunito',sans-serif", fontSize: ".65rem", fontWeight: 800, letterSpacing: ".22em", textTransform: "uppercase", color: `${PINK}CC` }}>Medical Specialities</span>
          </div>
          <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(2rem,4vw,3.5rem)", fontWeight: 700, color: WH }}>
            Our <em style={{ fontStyle: "italic", color: "#F9A8D4" }}>Departments</em>
          </h1>
          <p style={{ fontFamily: "'Nunito',sans-serif", fontSize: ".98rem", color: "rgba(255,255,255,.65)", marginTop: ".6rem" }}>
            8 specialities — expert, compassionate care at Srikara Rajahmundry.
          </p>
        </div>
      </div>

      {/* Pill tabs */}
      <div style={{ background: WH, borderBottom: `1px solid ${BDR}`, padding: "1.2rem 2rem", position: "sticky", top: 70, zIndex: 100, overflowX: "auto", whiteSpace: "nowrap" }}>
        <div style={{ maxWidth: 1300, margin: "0 auto", display: "inline-flex", gap: ".5rem" }}>
          {DEPTS.map((d, i) => (
            <button key={d.n} onClick={() => { setActiveDept(i); document.getElementById(`dept-${i}`)?.scrollIntoView({ behavior: "smooth", block: "nearest" }); }}
              style={{ fontFamily: "'Nunito',sans-serif", display: "inline-flex", alignItems: "center", gap: ".5rem", padding: ".55rem 1.2rem", borderRadius: 100, fontSize: ".8rem", fontWeight: 800, cursor: "pointer", transition: "all .25s", border: `1.5px solid ${activeDept === i ? PINK : BDR}`, background: activeDept === i ? PINK : WH, color: activeDept === i ? WH : MID, flexShrink: 0 }}>
              {d.icon} {d.n}
            </button>
          ))}
        </div>
      </div>

      {/* Dept panels — each with a different photo layout */}
      <div style={{ background: BG }}>
        {DEPTS.map((d, i) => (
          <div key={d.n} id={`dept-${i}`} style={{ maxWidth: 1300, margin: "0 auto", padding: "4rem 2rem", borderBottom: i < DEPTS.length - 1 ? `1px solid ${BDR}` : "none" }}>
            <div style={{ display: "grid", gridTemplateColumns: i % 2 === 0 ? "1fr 1fr" : "1fr 1fr", gap: "3rem", alignItems: "center" }} className="two-col">

              {/* Photo side — alternates */}
              <div style={{ order: i % 2 === 0 ? 1 : 2 }}>
                <div style={{ borderRadius: i % 2 === 0 ? "16px 60px 16px 16px" : "60px 16px 16px 16px", overflow: "hidden", boxShadow: `0 24px 60px ${NAVY}18`, position: "relative" }}>
                  <img src={d.img} alt={d.n} style={{ width: "100%", height: 360, objectFit: "cover", display: "block", transition: "transform .6s" }}
                    onMouseEnter={e => (e.currentTarget as HTMLImageElement).style.transform = "scale(1.04)"}
                    onMouseLeave={e => (e.currentTarget as HTMLImageElement).style.transform = ""}/>
                  <div style={{ position: "absolute", inset: 0, background: `linear-gradient(180deg,transparent 50%,${NAVDK}AA 100%)` }}/>
                  <div style={{ position: "absolute", top: "1.2rem", left: "1.2rem", display: "flex", alignItems: "center", gap: 8 }}>
                    <div style={{ width: 40, height: 40, borderRadius: 10, background: "rgba(255,255,255,.15)", backdropFilter: "blur(8px)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.4rem" }}>{d.icon}</div>
                    <span style={{ fontFamily: "'Nunito',sans-serif", fontSize: ".62rem", fontWeight: 800, letterSpacing: ".14em", textTransform: "uppercase", color: WH, background: "rgba(0,0,0,.25)", backdropFilter: "blur(4px)", padding: ".22rem .7rem", borderRadius: 100 }}>{d.sub}</span>
                  </div>
                </div>
              </div>

              {/* Text side */}
              <div style={{ order: i % 2 === 0 ? 2 : 1 }}>
                <div style={{ width: 36, height: 4, background: d.clr, borderRadius: 2, marginBottom: "1.5rem" }}/>
                <h2 style={{ fontFamily: "'Playfair Display',serif", fontStyle: "italic", fontSize: "clamp(1.6rem,2.5vw,2.4rem)", fontWeight: 400, color: INK, lineHeight: 1.2, marginBottom: "1rem" }}>{d.n}</h2>
                <p style={{ fontFamily: "'Nunito',sans-serif", fontSize: ".98rem", color: MID, lineHeight: 1.85, marginBottom: "1.8rem" }}>{d.desc}</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: ".5rem", marginBottom: "2rem" }}>
                  {d.pts.map(pt => (
                    <span key={pt} style={{ fontFamily: "'Nunito',sans-serif", fontSize: ".72rem", fontWeight: 700, color: d.clr, background: `${d.clr}12`, border: `1px solid ${d.clr}28`, borderRadius: 100, padding: ".3rem .9rem" }}>{pt}</span>
                  ))}
                </div>
                <button onClick={() => setBookOpen(true)}
                  style={{ fontFamily: "'Nunito',sans-serif", display: "inline-flex", alignItems: "center", gap: 8, background: PINK, color: WH, padding: ".88rem 2rem", borderRadius: 9, fontSize: ".88rem", fontWeight: 900, border: "none", cursor: "pointer", boxShadow: `0 4px 16px ${PINK}44`, transition: "all .25s" }}>
                  Book Consultation →
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  /* ═══ DOCTORS PAGE ══════════════════════════════════════════ */
  const DoctorsPage = () => (
    <div>
      {/* Hero with bg photo */}
      <div style={{ position: "relative", overflow: "hidden", minHeight: 280, display: "flex", alignItems: "center", padding: "4rem 2rem" }}>
        <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
          <img src={DOC_IMG.bg} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }}/>
          <div style={{ position: "absolute", inset: 0, background: `linear-gradient(135deg,${NAVDK}F5 0%,${NAVY}EE 60%,rgba(58,16,74,.92) 100%)` }}/>
        </div>
        <div style={{ maxWidth: 1300, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: ".8rem" }}>
            <span style={{ width: 24, height: 3, background: PINK, borderRadius: 2, display: "block" }}/>
            <span style={{ fontFamily: "'Nunito',sans-serif", fontSize: ".65rem", fontWeight: 800, letterSpacing: ".22em", textTransform: "uppercase", color: `${PINK}CC` }}>Medical Team</span>
          </div>
          <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(2rem,4vw,3.5rem)", fontWeight: 700, color: WH }}>
            Meet Our <em style={{ fontStyle: "italic", color: "#F9A8D4" }}>Specialists</em>
          </h1>
          <p style={{ fontFamily: "'Nunito',sans-serif", fontSize: ".98rem", color: "rgba(255,255,255,.65)", marginTop: ".6rem" }}>
            Board-certified experts delivering compassionate, world-class care at Srikara Rajahmundry.
          </p>
        </div>
      </div>

      {/* Staggered doctor grid */}
      <div style={{ background: BG, padding: "5rem 2rem" }}>
        <div style={{ maxWidth: 1300, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "2rem" }} className="three-col">
            {DOCS.map((d, i) => (
              <Fade key={d.name} d={i * 70} y={i % 2 === 0 ? 32 : 48}>
                <div style={{ background: WH, borderRadius: 20, overflow: "hidden", transition: "all .35s", cursor: "pointer", boxShadow: "0 4px 20px rgba(27,45,91,.08)", position: "relative" }}
                  onMouseEnter={e => { const el = e.currentTarget as HTMLDivElement; el.style.transform = "translateY(-8px)"; el.style.boxShadow = `0 24px 60px ${NAVY}22`; }}
                  onMouseLeave={e => { const el = e.currentTarget as HTMLDivElement; el.style.transform = ""; el.style.boxShadow = "0 4px 20px rgba(27,45,91,.08)"; }}>

                  {/* Large portrait */}
                  <div style={{ height: 300, overflow: "hidden", position: "relative" }}>
                    <img src={d.img} alt={d.name} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top", display: "block", transition: "transform .6s" }}
                      onMouseEnter={e => (e.currentTarget as HTMLImageElement).style.transform = "scale(1.06)"}
                      onMouseLeave={e => (e.currentTarget as HTMLImageElement).style.transform = ""}/>
                    <div style={{ position: "absolute", inset: 0, background: `linear-gradient(180deg,transparent 45%,${NAVDK}CC 100%)` }}/>
                    {/* Dept badge */}
                    <span style={{ position: "absolute", top: "1rem", right: "1rem", fontFamily: "'Nunito',sans-serif", fontSize: ".6rem", fontWeight: 800, background: "rgba(255,255,255,.9)", color: MID, padding: ".22rem .65rem", borderRadius: 100 }}>{d.dept}</span>
                    {/* Exp badge */}
                    <div style={{ position: "absolute", bottom: "1.2rem", left: "1.2rem", background: PINK, borderRadius: 9, padding: ".45rem .9rem" }}>
                      <p style={{ fontFamily: "'Nunito',sans-serif", fontSize: ".62rem", fontWeight: 700, color: "rgba(255,255,255,.8)", letterSpacing: ".1em", textTransform: "uppercase" }}>Experience</p>
                      <p style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.2rem", fontWeight: 700, color: WH, lineHeight: 1 }}>{d.exp} <span style={{ fontSize: ".75rem" }}>yrs</span></p>
                    </div>
                  </div>

                  {/* Info */}
                  <div style={{ padding: "1.6rem" }}>
                    <h3 style={{ fontFamily: "'Playfair Display',serif", fontStyle: "italic", fontSize: "1.1rem", fontWeight: 400, color: INK, marginBottom: ".3rem", lineHeight: 1.3 }}>{d.name}</h3>
                    <p style={{ fontFamily: "'Nunito',sans-serif", fontSize: ".75rem", fontWeight: 900, color: PINK, marginBottom: ".4rem" }}>{d.role}</p>
                    <p style={{ fontFamily: "'Nunito',sans-serif", fontSize: ".72rem", color: LT, lineHeight: 1.5, marginBottom: "1.2rem" }}>{d.qual}</p>

                    {/* Availability bar */}
                    <div style={{ background: NAVYP, borderRadius: 9, padding: ".75rem 1rem", display: "flex", alignItems: "center", justifyContent: "space-between", gap: ".8rem", marginBottom: "1rem" }}>
                      <div>
                        <p style={{ fontFamily: "'Nunito',sans-serif", fontSize: ".58rem", fontWeight: 900, letterSpacing: ".12em", textTransform: "uppercase", color: LT, marginBottom: ".18rem" }}>Available</p>
                        <p style={{ fontFamily: "'Nunito',sans-serif", fontSize: ".75rem", fontWeight: 800, color: NAVY }}>{d.avail}</p>
                      </div>
                      <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#22C55E", flexShrink: 0, boxShadow: "0 0 0 3px rgba(34,197,94,.2)" }}/>
                    </div>

                    <button onClick={() => setBookOpen(true)}
                      style={{ fontFamily: "'Nunito',sans-serif", width: "100%", display: "flex", justifyContent: "center", alignItems: "center", background: NAVY, color: WH, border: "none", borderRadius: 9, padding: ".75rem", fontSize: ".82rem", fontWeight: 900, cursor: "pointer", transition: "background .25s" }}
                      onMouseEnter={e => (e.currentTarget as HTMLButtonElement).style.background = PINK}
                      onMouseLeave={e => (e.currentTarget as HTMLButtonElement).style.background = NAVY}>
                      Book Appointment →
                    </button>
                  </div>
                </div>
              </Fade>
            ))}
          </div>

          {/* CTA footer */}
          <Fade d={250}>
            <div style={{ marginTop: "3rem", background: `linear-gradient(135deg,${NAVY},${NAVDK})`, borderRadius: 20, padding: "3rem", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "2rem", position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: 300, background: `radial-gradient(ellipse at right,${PINK}20 0%,transparent 70%)`, pointerEvents: "none" }}/>
              <div style={{ position: "relative", zIndex: 1 }}>
                <h3 style={{ fontFamily: "'Playfair Display',serif", fontStyle: "italic", fontSize: "1.6rem", color: WH, marginBottom: ".5rem" }}>Book with any specialist today</h3>
                <p style={{ fontFamily: "'Nunito',sans-serif", fontSize: ".88rem", color: "rgba(255,255,255,.65)" }}>Confirmed within 30 minutes · Mon–Sat 8 AM – 8 PM · Walk-ins welcome</p>
              </div>
              <button onClick={() => setBookOpen(true)}
                style={{ fontFamily: "'Nunito',sans-serif", display: "inline-flex", alignItems: "center", gap: 8, background: PINK, color: WH, padding: "1rem 2.5rem", borderRadius: 9, fontSize: ".92rem", fontWeight: 900, border: "none", cursor: "pointer", boxShadow: `0 4px 20px ${PINK}55`, position: "relative", zIndex: 1, flexShrink: 0 }}>
                Book an Appointment →
              </button>
            </div>
          </Fade>
        </div>
      </div>
    </div>
  );

  /* ── RENDER ── */
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600;1,700&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
        html{scroll-behavior:smooth;}
        body{font-family:'Nunito',sans-serif;background:#F7F9FD;color:#0D1A35;overflow-x:hidden;}
        ::-webkit-scrollbar{width:5px;} ::-webkit-scrollbar-track{background:#EEF2F8;} ::-webkit-scrollbar-thumb{background:${PINK};border-radius:3px;}

        @keyframes fadeUp{from{opacity:0;transform:translateY(28px)}to{opacity:1;transform:none}}
        @keyframes zoomIn{from{transform:scale(1.06)}to{transform:scale(1)}}
        @keyframes marquee{from{transform:translateX(0)}to{transform:translateX(-50%)}}
        @keyframes blink{0%,100%{opacity:1}50%{opacity:.25}}
        @keyframes ping{75%,100%{transform:scale(1.8);opacity:0}}

        .d-nav{display:flex;align-items:center;}
        .m-ham{display:none!important;}

        @media(max-width:960px){
          .d-nav{display:none!important;}
          .m-ham{display:flex!important;}
          .hero-split,.two-col,.about-grid{display:block!important;}
          .hero-photo-r{display:none!important;}
          .hero-split > div:first-child{min-height:90vh;}
          .dept-grid-h{grid-template-columns:1fr 1fr!important;}
          .fac-bento{grid-template-columns:1fr!important;grid-template-rows:auto!important;}
          .fac-bento > *{grid-area:auto!important;height:200px!important;}
          .three-col{grid-template-columns:1fr 1fr!important;}
          section{padding:4rem 1.5rem!important;}
          .about-grid > *{margin-bottom:1.5rem;}
        }
      `}</style>

      <Nav />

      {page === "home"        && <HomePage />}
      {page === "departments" && <DepartmentsPage />}
      {page === "doctors"     && <DoctorsPage />}

      {/* FOOTER */}
      <footer style={{ background: NAVDK }}>
        <div style={{ height: 5, background: `linear-gradient(90deg,${NAVY},${PINK},${NAVY})` }}/>
        <div style={{ maxWidth: 1300, margin: "0 auto", padding: "2rem 2rem", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 36, height: 36, borderRadius: 8, background: `linear-gradient(135deg,${PINK},${NAVY})`, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontFamily: "'Playfair Display',serif", fontStyle: "italic", color: WH, fontSize: "1.1rem" }}>S</span>
            </div>
            <span style={{ fontFamily: "'Nunito',sans-serif", fontSize: ".7rem", color: "rgba(255,255,255,.35)", letterSpacing: ".06em" }}>
              © {new Date().getFullYear()} Srikara Hospitals – Rajahmundry · Part of Srikara Hospital Group
            </span>
          </div>
          <div style={{ display: "flex", gap: "2rem" }}>
            {["Privacy","Terms","Sitemap"].map(l => (
              <a key={l} href="#" style={{ fontFamily: "'Nunito',sans-serif", fontSize: ".65rem", color: "rgba(255,255,255,.25)", textDecoration: "none" }}>{l}</a>
            ))}
          </div>
        </div>
      </footer>

      {/* FLOATING BTN */}
      <button onClick={() => setBookOpen(true)}
        style={{ position: "fixed", bottom: "1.8rem", right: "1.8rem", zIndex: 400, fontFamily: "'Nunito',sans-serif", background: PINK, color: WH, border: "none", borderRadius: 100, padding: ".9rem 1.7rem", fontSize: ".82rem", fontWeight: 900, cursor: "pointer", boxShadow: `0 8px 28px ${PINK}55`, transition: "all .3s" }}
        onMouseEnter={e => { const b = e.currentTarget as HTMLButtonElement; b.style.transform = "scale(1.06)"; }}
        onMouseLeave={e => { const b = e.currentTarget as HTMLButtonElement; b.style.transform = "scale(1)"; }}>
        📅 Book Appointment
      </button>

      {/* APPOINTMENT MODAL */}
      {bookOpen && (
        <div onClick={e => { if (e.target === e.currentTarget) setBookOpen(false); }}
          style={{ position: "fixed", inset: 0, zIndex: 900, background: "rgba(13,26,53,.7)", backdropFilter: "blur(14px)", display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem" }}>
          <div style={{ width: "100%", maxWidth: 640, maxHeight: "92vh", overflowY: "auto", background: WH, borderRadius: 22, boxShadow: "0 40px 100px rgba(0,0,0,.3)", animation: "fadeUp .3s ease" }}>
            {/* Header */}
            <div style={{ height: 5, background: `linear-gradient(90deg,${NAVY},${PINK},${NAVY})`, borderRadius: "22px 22px 0 0" }}/>
            <div style={{ background: `linear-gradient(135deg,${NAVY},${NAVDK})`, padding: "2rem 2rem 1.6rem", display: "flex", justifyContent: "space-between", alignItems: "flex-start", position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", right: "-8%", top: "50%", transform: "translateY(-50%)", width: 220, height: 220, borderRadius: "50%", background: `radial-gradient(circle,${PINK}22 0%,transparent 70%)`, pointerEvents: "none" }}/>
              <div style={{ position: "relative", zIndex: 1 }}>
                <p style={{ fontFamily: "'Nunito',sans-serif", fontSize: ".62rem", fontWeight: 800, letterSpacing: ".18em", textTransform: "uppercase", color: `${PINK}CC`, marginBottom: ".4rem" }}>Srikara Hospitals · Rajahmundry</p>
                <h3 style={{ fontFamily: "'Playfair Display',serif", fontStyle: "italic", fontSize: "1.6rem", color: WH }}>Book Appointment</h3>
                <p style={{ fontFamily: "'Nunito',sans-serif", fontSize: ".8rem", color: "rgba(255,255,255,.58)", marginTop: ".35rem" }}>Confirmed within 30 minutes · Mon–Sat 8 AM – 8 PM</p>
              </div>
              <button onClick={() => setBookOpen(false)} style={{ background: "rgba(255,255,255,.12)", border: "none", borderRadius: "50%", width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: WH, fontSize: "1rem", position: "relative", zIndex: 1 }}>✕</button>
            </div>

            <form onSubmit={submit} style={{ padding: "2rem" }}>
              <p style={{ fontFamily: "'Nunito',sans-serif", fontSize: ".65rem", fontWeight: 900, letterSpacing: ".18em", textTransform: "uppercase", color: PINK, marginBottom: ".9rem" }}>Your Details</p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1rem" }}>
                {[{ l:"Full Name *", k:"name", t:"text", ph:"Your full name" },{ l:"Mobile Number *", k:"phone", t:"tel", ph:"+91 98765 43210" }].map(f => (
                  <div key={f.k}>
                    <label style={{ fontFamily: "'Nunito',sans-serif", display: "block", fontSize: ".7rem", fontWeight: 800, color: MID, marginBottom: ".4rem" }}>{f.l}</label>
                    <input type={f.t} placeholder={f.ph} value={form[f.k as keyof typeof form]} onChange={e => setForm(p => ({ ...p, [f.k]: e.target.value }))} required
                      style={{ width: "100%", border: `1.5px solid ${BDR}`, borderRadius: 9, padding: ".78rem 1rem", fontFamily: "'Nunito',sans-serif", fontSize: ".92rem", color: INK, background: BG, outline: "none", transition: "border-color .2s" }}
                      onFocus={e => (e.currentTarget as HTMLInputElement).style.borderColor = PINK}
                      onBlur={e => (e.currentTarget as HTMLInputElement).style.borderColor = BDR}/>
                  </div>
                ))}
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1.4rem" }}>
                <div>
                  <label style={{ fontFamily: "'Nunito',sans-serif", display: "block", fontSize: ".7rem", fontWeight: 800, color: MID, marginBottom: ".4rem" }}>Department *</label>
                  <select value={form.dept} onChange={e => setForm(p => ({ ...p, dept: e.target.value }))} required
                    style={{ width: "100%", border: `1.5px solid ${BDR}`, borderRadius: 9, padding: ".78rem 1rem", fontFamily: "'Nunito',sans-serif", fontSize: ".92rem", color: form.dept ? INK : LT, background: BG, outline: "none" }}
                    onFocus={e => (e.currentTarget as HTMLSelectElement).style.borderColor = PINK}
                    onBlur={e => (e.currentTarget as HTMLSelectElement).style.borderColor = BDR}>
                    <option value="">Select department</option>
                    {DEPTS.map(d => <option key={d.n}>{d.n}</option>)}
                    <option>General Medicine</option><option>Dermatology</option><option>ENT</option>
                  </select>
                </div>
                <div>
                  <label style={{ fontFamily: "'Nunito',sans-serif", display: "block", fontSize: ".7rem", fontWeight: 800, color: MID, marginBottom: ".4rem" }}>Preferred Date *</label>
                  <input type="date" value={form.date} onChange={e => setForm(p => ({ ...p, date: e.target.value }))} min={new Date().toISOString().split("T")[0]} required
                    style={{ width: "100%", border: `1.5px solid ${BDR}`, borderRadius: 9, padding: ".78rem 1rem", fontFamily: "'Nunito',sans-serif", fontSize: ".92rem", color: INK, background: BG, outline: "none" }}/>
                </div>
              </div>
              <div style={{ background: BG, borderRadius: 11, border: `1px solid ${BDR}`, padding: "1.2rem", marginBottom: "1.4rem" }}>
                <p style={{ fontFamily: "'Nunito',sans-serif", fontSize: ".65rem", fontWeight: 900, letterSpacing: ".18em", textTransform: "uppercase", color: PINK, marginBottom: ".8rem" }}>Time Slot</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: ".5rem" }}>
                  {SLOTS.map(sl => (
                    <button key={sl} type="button" onClick={() => setForm(p => ({ ...p, slot: p.slot === sl ? "" : sl }))}
                      style={{ fontFamily: "'Nunito',sans-serif", fontSize: ".78rem", fontWeight: 700, border: `1.5px solid ${form.slot === sl ? PINK : BDR}`, borderRadius: 8, padding: ".42rem .9rem", cursor: "pointer", background: form.slot === sl ? PINK : WH, color: form.slot === sl ? WH : MID, transition: "all .2s" }}>
                      {sl}
                    </button>
                  ))}
                </div>
                {form.slot && (
                  <div style={{ marginTop: ".8rem", display: "flex", alignItems: "center", gap: 7, padding: ".5rem .9rem", background: "#ECFDF5", border: "1px solid #A7F3D0", borderRadius: 8 }}>
                    <span>✅</span>
                    <span style={{ fontFamily: "'Nunito',sans-serif", fontSize: ".8rem", fontWeight: 800, color: "#059669" }}>Selected: {form.slot}</span>
                  </div>
                )}
              </div>
              <button type="submit"
                style={{ width: "100%", display: "flex", justifyContent: "center", alignItems: "center", fontFamily: "'Nunito',sans-serif", background: sent ? "#059669" : PINK, color: WH, border: "none", borderRadius: 9, padding: "1rem", fontSize: ".9rem", fontWeight: 900, cursor: "pointer", transition: "background .3s", boxShadow: `0 4px 18px ${PINK}44` }}>
                {sent ? "✓ Confirmed! We will call you shortly." : "Confirm Appointment →"}
              </button>
              <p style={{ fontFamily: "'Nunito',sans-serif", textAlign: "center", fontSize: ".72rem", color: MID, marginTop: ".9rem" }}>
                Or call: <a href="tel:0883-246-1200" style={{ color: PINK, fontWeight: 900, textDecoration: "none" }}>0883-246-1200</a>
              </p>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
