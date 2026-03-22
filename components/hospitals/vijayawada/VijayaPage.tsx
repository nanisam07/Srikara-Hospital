"use client";
import { useState, useEffect, useRef } from "react";

// ─── DATA ────────────────────────────────────────────────────────────────────

const SPECIALITIES = [
  {
    id: "01", name: "Cardiology", sub: "Heart & Vascular",
    desc: "Complete cardiac care — cath lab, angioplasty, TAVR, EP studies and 24/7 cardiac monitoring in a state-of-the-art unit.",
    img: "https://images.unsplash.com/photo-1628348068343-c6a848d2b6dd?w=600&q=80",
  },
  {
    id: "02", name: "Orthopaedics", sub: "Bone, Joint & Spine",
    desc: "Robotic-assisted joint replacement, arthroscopy, sports injury rehabilitation and complex spinal reconstruction.",
    img: "https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=600&q=80",
  },
  {
    id: "03", name: "Neurology", sub: "Brain & Nervous System",
    desc: "Stroke unit, epilepsy monitoring, Parkinson's clinic, neuro-oncology and full neurological rehabilitation.",
    img: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=600&q=80",
  },
  {
    id: "04", name: "Obstetrics & Gynaecology", sub: "Women's Health",
    desc: "High-risk pregnancy, IVF fertility clinic, laparoscopic surgery, menopause care and breast health centre.",
    img: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&q=80",
  },
  {
    id: "05", name: "Oncology", sub: "Cancer Care",
    desc: "Precision tumour board, targeted chemotherapy, immunotherapy, radiation and compassionate palliative care.",
    img: "https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=600&q=80",
  },
  {
    id: "06", name: "Gastroenterology", sub: "Digestive Health",
    desc: "Advanced GI endoscopy, hepatology, IBD clinic, bariatric surgery and liver transplant evaluation.",
    img: "https://images.unsplash.com/photo-1551076805-e1869033e561?w=600&q=80",
  },
];

const DOCTORS = [
  {
    name: "Dr. Siva Rama Krishna",  role: "Senior Cardiologist",              exp: "19 yrs",
    qual: "DM Cardiology · Nizam's Institute",  avail: "Mon–Sat · 10 AM – 2 PM",
    img: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&q=80",
  },
  {
    name: "Dr. Hymavathi Devi",     role: "Orthopaedic Surgeon",              exp: "16 yrs",
    qual: "MS Ortho, Fellowship · Germany",     avail: "Mon, Wed, Fri · 3–7 PM",
    img: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&q=80",
  },
  {
    name: "Dr. Pavan Kumar Rao",    role: "Neurologist",                      exp: "14 yrs",
    qual: "DM Neurology · AIIMS Delhi",         avail: "Tue, Thu, Sat · 9 AM – 1 PM",
    img: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&q=80",
  },
  {
    name: "Dr. Annapurna Srinivas", role: "Gynaecologist & IVF Specialist",   exp: "17 yrs",
    qual: "MS OBG, FRCOG",                      avail: "Mon–Fri · 11 AM – 3 PM",
    img: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&q=80",
  },
  {
    name: "Dr. Ravi Teja Varma",    role: "Medical Oncologist",               exp: "12 yrs",
    qual: "DM Oncology · Tata Memorial",        avail: "Mon–Fri · 2–6 PM",
    img: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=400&q=80",
  },
  {
    name: "Dr. Suchitra Bommidi",   role: "Gastroenterologist",               exp: "11 yrs",
    qual: "DM Gastro · PGIMER Chandigarh",      avail: "Mon–Sat · 9 AM – 12 PM",
    img: "https://images.unsplash.com/photo-1591604021695-0c69b7c05981?w=400&q=80",
  },
];

const TESTIMONIALS = [
  { text: "I travelled from Guntur to Srikara Vijayawada after hearing about their cardiac care. Dr. Siva Rama Krishna and his team gave me a second life. The care here is extraordinary.", name: "Narayana Rao G.",    area: "Guntur",          dept: "Cardiology"   },
  { text: "After my high-risk pregnancy diagnosis, no one gave me hope until I came here. Dr. Annapurna's team handled everything perfectly. My baby arrived healthy and perfect.",           name: "Meghana & Kiran", area: "Vijayawada",      dept: "Obstetrics"   },
  { text: "Six years of knee pain. One surgery at Srikara. I was walking the next day. Dr. Hymavathi's skill and patience throughout recovery is something I'll always be grateful for.",     name: "Subrahmanyam P.", area: "Krishna District", dept: "Orthopaedics" },
];

const FACILITIES = [
  { tag: "CARDIAC", name: "Cath Lab & Cardiac ICU",     desc: "Bi-plane digital cath lab + 12-bed dedicated cardiac ICU with full telemetry and ECMO backup.",                       img: "https://images.unsplash.com/photo-1504439468489-c8920d796a29?w=600&q=80" },
  { tag: "IMAGING", name: "Advanced Radiology Suite",   desc: "3-Tesla MRI, 256-slice CT, PET-CT, digital mammography and 24/7 emergency imaging.",                                  img: "https://images.unsplash.com/photo-1516549655169-df83a0774514?w=600&q=80" },
  { tag: "SURGERY", name: "Modular Operation Theatres", desc: "7 laminar-flow OTs including robotic surgery suite and neuro-navigation theatre.",                                     img: "https://images.unsplash.com/photo-1584982751601-97dcc096659c?w=600&q=80" },
  { tag: "LAB",     name: "NABL Certified Laboratory",  desc: "1,200+ tests, molecular diagnostics, flow cytometry, liquid biopsy and round-the-clock blood bank.",                 img: "https://images.unsplash.com/photo-1578496780896-7282d7a5e27e?w=600&q=80" },
  { tag: "ICU",     name: "48-Bed Multi-Specialty ICU", desc: "Cardiac, Neuro, Medical and Surgical pods — full monitoring, CRRT and mechanical ventilation.",                       img: "https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=600&q=80"   },
  { tag: "REHAB",   name: "Rehabilitation & Wellness",  desc: "Physiotherapy, occupational therapy, speech-language pathology and post-cardiac rehabilitation.",                     img: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=600&q=80" },
];

// ── Correct 9 Srikara branches ──
const BRANCHES = ["RTC X Roads","Miyapur","Lakdikapul","Kompally","LB Nagar","Peerzadiguda","Rajahmundry","ECIL","Vijayawada"];

const TICKERS = ["Robotic Joint Replacement","Cardiac Cath Lab","3T MRI Suite","NICU Level III","24/7 Blood Bank","Cancer Tumour Board","Stroke Unit","Fertility Clinic","NABH Accredited","Bariatric Surgery"];

// ─── REVEAL HOOK ─────────────────────────────────────────────────────────────
function useReveal(threshold = 0.07) {
  const ref = useRef(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setOn(true); io.unobserve(el); }
    }, { threshold });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return { ref, on };
}

function Reveal({ children, delay = 0, style = {} }: { children: React.ReactNode; delay?: number; style?: React.CSSProperties }) {
  const { ref, on } = useReveal();
  return (
    <div ref={ref} style={{
      opacity: on ? 1 : 0, transform: on ? "none" : "translateY(22px)",
      transition: `opacity .75s ease ${delay}ms, transform .75s ease ${delay}ms`, ...style,
    }}>{children}</div>
  );
}

// ─── COLOUR TOKENS ────────────────────────────────────────────────────────────
// Brand: navy #1B2A4A (SRIKARA) + magenta #B8246E (HOSPITALS)
const C = {
  white:  "#FAFCFE",
  off:    "#F4F6FB",
  panel:  "#E8EDF7",
  border: "#CDD5E5",
  mid:    "#6A7E9A",
  text:   "#0D1B2E",
  muted:  "#3D5570",
  // brand
  navy:   "#1B2A4A",   // primary  — replaces blue  #0B4F8C
  navyL:  "#2E4A7A",   // lighter  — replaces sky   #1565C0
  navyD:  "#0F1E35",   // darker
  magenta:"#B8246E",   // accent   — replaces teal  #00838F
  magentaD:"#8A1A52",  // deeper magenta
  // semantics (unchanged)
  green:  "#2E7D32",
  red:    "#C62828",
};

const globalStyle = `
  @import url('https://fonts.googleapis.com/css2?family=Crimson+Pro:ital,wght@0,300;0,400;0,600;1,300;1,400;1,600&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap');
  *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
  html{scroll-behavior:smooth;}
  body{font-family:'Plus Jakarta Sans',sans-serif;background:#FAFCFE;color:#0D1B2E;overflow-x:hidden;}
  ::-webkit-scrollbar{width:4px;}
  ::-webkit-scrollbar-track{background:#F4F6FB;}
  ::-webkit-scrollbar-thumb{background:#B8246E;border-radius:2px;}
  @keyframes fadeUp{from{opacity:0;transform:translateY(28px);}to{opacity:1;transform:translateY(0);}}
  @keyframes pulse{0%,100%{opacity:1;}50%{opacity:.35;}}
  @keyframes marquee{from{transform:translateX(0);}to{transform:translateX(-50%);}}
  .a1{animation:fadeUp .7s ease .1s both;}
  .a2{animation:fadeUp .7s ease .28s both;}
  .a3{animation:fadeUp .7s ease .46s both;}
  .a4{animation:fadeUp .7s ease .64s both;}
  .a5{animation:fadeUp .7s ease .82s both;}
  .edot{animation:pulse 1.2s ease infinite;}
  .live-ticker{animation:marquee 30s linear infinite;}
  input::placeholder{color:rgba(255,255,255,.35);}
`;

// ─── IMAGE WRAPPER ────────────────────────────────────────────────────────────
function Img({ src, alt, style = {}, caption }: { src: string; alt: string; style?: React.CSSProperties; caption?: string }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{ overflow: "hidden", background: "#dce8f0", position: "relative", ...style }}>
      <img src={src} alt={alt} loading="lazy"
        style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "transform .55s ease", transform: hovered ? "scale(1.04)" : "scale(1)" }} />
      {caption && (
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: `linear-gradient(transparent,rgba(15,30,53,.75))`, padding: "2.5rem 1.2rem .9rem", pointerEvents: "none" }}>
          <span style={{ fontSize: ".68rem", letterSpacing: ".14em", textTransform: "uppercase", color: "rgba(255,255,255,.9)", fontWeight: 600, fontFamily: "'Plus Jakarta Sans',sans-serif" }}>{caption}</span>
        </div>
      )}
    </div>
  );
}

// ─── SECTION HEADER ──────────────────────────────────────────────────────────
function SectionHeader({ label, title, right }: { label: string; title: string; right?: React.ReactNode }) {
  return (
    <Reveal>
      <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: "3.5rem", flexWrap: "wrap", gap: "1.5rem" }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: ".8rem", fontSize: ".62rem", letterSpacing: ".22em", textTransform: "uppercase", color: C.navyL, fontWeight: 600, marginBottom: ".8rem" }}>
            <span style={{ width: 24, height: 2, background: C.navyL, display: "block" }} />
            {label}
          </div>
          <h2 style={{ fontFamily: "'Crimson Pro',serif", fontSize: "clamp(2rem,4vw,3.8rem)", fontWeight: 300, color: C.text, lineHeight: 1.1, letterSpacing: "-.01em" }}
            dangerouslySetInnerHTML={{ __html: title }} />
        </div>
        {right}
      </div>
    </Reveal>
  );
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────
export default function VijayawaPage() {
  const [activeSpec,   setActiveSpec]   = useState(0);
  const [activeTesti,  setActiveTesti]  = useState(0);
  const [form, setForm] = useState({ name: "", phone: "", dept: "", date: "", msg: "" });
  const [sent, setSent] = useState(false);
  const [hoveredDoc,   setHoveredDoc]   = useState<number | null>(null);

  useEffect(() => {
    const t = setInterval(() => setActiveTesti(p => (p + 1) % TESTIMONIALS.length), 5500);
    return () => clearInterval(t);
  }, []);

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault(); setSent(true); setTimeout(() => setSent(false), 3500);
  };

  return (
    <>
      <style>{globalStyle}</style>

      {/* ── Emergency Bar — red (semantic, unchanged) ── */}
      <div style={{ background: C.red, color: "#fff", padding: ".42rem 2.5rem", display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: ".72rem", letterSpacing: ".1em", textTransform: "uppercase", position: "relative", zIndex: 1000 }}>
        <div style={{ display: "flex", alignItems: "center", gap: ".8rem" }}>
          <div className="edot" style={{ width: 7, height: 7, borderRadius: "50%", background: "#FFCDD2", flexShrink: 0 }} />
          <span>24/7 Emergency Line —&nbsp;</span>
          <a href="tel:08662490100" style={{ color: "#fff", fontWeight: 700 }}>0866-2490-100</a>
        </div>
        <span>Plot 14-B, MG Road, Vijayawada – 520 010</span>
      </div>

      {/* ── Navbar ── */}
      <nav style={{ position: "sticky", top: 0, zIndex: 900, background: "rgba(250,252,254,.97)", backdropFilter: "blur(14px)", borderBottom: `1px solid ${C.border}`, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 2.5rem", height: 66 }}>
        <a href="/" style={{ display: "flex", alignItems: "center", gap: 12, textDecoration: "none" }}>
          {/* Logo mark — navy square with magenta inner glow */}
          <div style={{ width: 38, height: 38, background: C.navy, borderRadius: 4, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Crimson Pro',serif", fontSize: "1.3rem", fontWeight: 600, color: "#fff", boxShadow: `inset 0 0 0 2px ${C.magenta}40` }}>S</div>
          <div>
            <div style={{ fontSize: ".8rem", fontWeight: 700, color: C.navy, letterSpacing: ".04em" }}>Srikara Hospital</div>
            <div style={{ fontSize: ".58rem", color: C.magenta, letterSpacing: ".16em", textTransform: "uppercase" }}>Vijayawada Branch</div>
          </div>
        </a>
        <div style={{ display: "flex", alignItems: "center", gap: "2.2rem" }}>
          {[["Home","#"],["Doctors","#doctors"],["Departments","#specialities"]].map(([l, h]) => (
            <a key={l} href={h} style={{ fontSize: ".72rem", color: C.muted, letterSpacing: ".06em", fontWeight: 500, textDecoration: "none", transition: "color .2s" }}
              onMouseEnter={e => e.currentTarget.style.color = C.navy}
              onMouseLeave={e => e.currentTarget.style.color = C.muted}>{l}</a>
          ))}
          <a href="#appointment" style={{ background: C.navy, color: "#fff", padding: ".5rem 1.4rem", borderRadius: 3, fontSize: ".72rem", fontWeight: 600, letterSpacing: ".08em", textDecoration: "none", transition: "background .2s", boxShadow: `0 3px 10px rgba(27,42,74,.25)` }}
            onMouseEnter={e => e.currentTarget.style.background = C.navyD}
            onMouseLeave={e => e.currentTarget.style.background = C.navy}>
            Book Now
          </a>
        </div>
      </nav>

      {/* ══════════════════════════════════════════
          HERO — identical layout, brand colors
          ══════════════════════════════════════════ */}
      <section id="hero" style={{ display: "flex", minHeight: "88vh", background: C.white, position: "relative", overflow: "hidden" }}>

        {/* Left content */}
        <div style={{ flex: "0 0 52%", padding: "5.5rem 3.5rem 5rem", position: "relative", zIndex: 2, display: "flex", flexDirection: "column", justifyContent: "center" }}>
          {/* Blueprint grid — navy tint */}
          <div style={{ position: "absolute", inset: 0, backgroundImage: `linear-gradient(rgba(27,42,74,.03) 1px,transparent 1px),linear-gradient(90deg,rgba(27,42,74,.03) 1px,transparent 1px)`, backgroundSize: "48px 48px", pointerEvents: "none" }} />
          {/* Left accent stripe — navy→magenta gradient */}
          <div style={{ position: "absolute", top: 0, left: 0, width: 4, height: "100%", background: `linear-gradient(180deg,${C.navy},${C.magenta})` }} />

          <div className="a1" style={{ display: "inline-flex", alignItems: "center", gap: ".7rem", background: `rgba(27,42,74,.07)`, border: `1px solid rgba(27,42,74,.14)`, borderRadius: 2, padding: ".35rem 1rem", marginBottom: "1.8rem", fontSize: ".62rem", letterSpacing: ".2em", textTransform: "uppercase", color: C.navy, fontWeight: 600, width: "fit-content" }}>
            <svg width="8" height="8"><circle cx="4" cy="4" r="4" fill="#2E7D32" /></svg>
            Now Operational · NABH Accredited
          </div>

          <h1 className="a2" style={{ fontFamily: "'Crimson Pro',serif", fontSize: "clamp(3rem,5.5vw,5.5rem)", fontWeight: 300, lineHeight: 1.05, color: C.text, marginBottom: "1.4rem", letterSpacing: "-.01em" }}>
            Srikara<br />Hospital<br /><em><strong style={{ color: C.navy }}>Vijayawada</strong></em>
          </h1>

          {/* Accent bar — navy */}
          <div className="a2" style={{ width: 56, height: 3, background: C.navy, marginBottom: "1.7rem" }} />

          <p className="a3" style={{ fontSize: ".93rem", color: C.muted, lineHeight: 1.85, maxWidth: 460, marginBottom: "2.5rem" }}>
            Andhra Pradesh's most progressive multi-specialty hospital — where robotic surgery, precision diagnostics and deeply human care converge to serve every patient with complete clinical excellence.
          </p>

          <div className="a4" style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <a href="#appointment" style={{ display: "inline-flex", alignItems: "center", gap: ".5rem", background: C.navy, color: "#fff", padding: ".85rem 2rem", fontSize: ".78rem", fontWeight: 600, letterSpacing: ".08em", borderRadius: 3, textDecoration: "none", boxShadow: `0 4px 14px rgba(27,42,74,.28)`, transition: "background .2s" }}
              onMouseEnter={e => e.currentTarget.style.background = C.navyD}
              onMouseLeave={e => e.currentTarget.style.background = C.navy}>
              Book Appointment →
            </a>
            <a href="tel:08662490100" style={{ display: "inline-flex", alignItems: "center", gap: ".5rem", border: `1.5px solid ${C.border}`, color: C.muted, padding: ".85rem 2rem", fontSize: ".78rem", fontWeight: 500, letterSpacing: ".08em", borderRadius: 3, textDecoration: "none", transition: "border-color .2s" }}
              onMouseEnter={e => e.currentTarget.style.borderColor = C.navy}
              onMouseLeave={e => e.currentTarget.style.borderColor = C.border}>
              🚨 Emergency
            </a>
          </div>

          <div className="a5" style={{ display: "flex", flexWrap: "wrap", gap: ".6rem", marginTop: "2rem", paddingTop: "2rem", borderTop: `1px solid ${C.border}` }}>
            {["NABH", "ISO 9001", "NABL Lab", "100+ Insurers", "Est. 2014"].map(c => (
              <span key={c} style={{ fontSize: ".58rem", letterSpacing: ".12em", textTransform: "uppercase", fontWeight: 600, background: C.off, border: `1px solid ${C.border}`, color: C.mid, padding: ".28rem .85rem", borderRadius: 2 }}>{c}</span>
            ))}
          </div>
        </div>

        {/* Right — Image Mosaic (identical layout) */}
        <div style={{ flex: 1, display: "grid", gridTemplateColumns: "1.2fr 1fr", gridTemplateRows: "1.3fr 1fr", gap: 3, background: "#dce8f0" }}>
          {/* Big main */}
          <div style={{ gridRow: "1/3", position: "relative" }}>
            <Img src="https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=800&q=80" alt="ICU Care" style={{ height: "100%" }} />
            {/* Stat card — navy border-left accent */}
            <div style={{ position: "absolute", bottom: "1.2rem", left: "1.2rem", background: "rgba(255,255,255,.95)", backdropFilter: "blur(8px)", borderLeft: `3px solid ${C.navy}`, padding: ".75rem 1.1rem", boxShadow: "0 4px 20px rgba(0,0,0,.14)" }}>
              <div style={{ fontFamily: "'Crimson Pro',serif", fontSize: "1.5rem", fontWeight: 600, color: C.navy, lineHeight: 1 }}>280<sup style={{ fontSize: ".9rem" }}>+</sup></div>
              <div style={{ fontSize: ".58rem", letterSpacing: ".12em", textTransform: "uppercase", color: C.muted, marginTop: ".15rem" }}>Hospital Beds</div>
            </div>
          </div>
          <Img src="https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=600&q=80"  alt="Doctor Consultation" style={{ height: "100%" }} caption="Expert Consultation" />
          <Img src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=600&q=80" alt="Patient Care"         style={{ height: "100%" }} caption="Patient Care"        />
        </div>
      </section>

      {/* ── Stats Bar — navy background ── */}
      <div style={{ background: C.navy, display: "grid", gridTemplateColumns: "repeat(4,1fr)" }}>
        {[["10+","Years in Vijayawada"],["36+","Specialist Doctors"],["55k+","Patients Treated"],["280+","Hospital Beds"]].map(([v, l]) => (
          <div key={l} style={{ padding: "1.6rem 2rem", borderRight: "1px solid rgba(255,255,255,.1)" }}>
            <div style={{ fontFamily: "'Crimson Pro',serif", fontSize: "2.5rem", fontWeight: 600, color: "#fff", lineHeight: 1 }}>{v}</div>
            <div style={{ fontSize: ".6rem", color: "rgba(255,255,255,.5)", letterSpacing: ".14em", textTransform: "uppercase", marginTop: ".4rem" }}>{l}</div>
          </div>
        ))}
      </div>

      {/* ── Ticker — off-white, navy dots, magenta scroll ── */}
      <div style={{ background: C.off, borderBottom: `1px solid ${C.border}`, padding: ".65rem 0", overflow: "hidden", whiteSpace: "nowrap" }}>
        <div className="live-ticker" style={{ display: "inline-flex", gap: "3rem" }}>
          {[...TICKERS, ...TICKERS, ...TICKERS].map((t, i) => (
            <span key={i} style={{ display: "inline-flex", alignItems: "center", gap: ".8rem", fontSize: ".62rem", letterSpacing: ".18em", textTransform: "uppercase", color: C.mid }}>
              <span style={{ width: 4, height: 4, background: C.magenta, borderRadius: "50%", display: "inline-block" }} />{t}
            </span>
          ))}
        </div>
      </div>

      {/* ── Gallery Strip — identical structure ── */}
      <div style={{ padding: "4rem 2.5rem 0", maxWidth: 1280, margin: "0 auto" }}>
        <Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gap: 3, height: 360 }}>
            <div style={{ position: "relative" }}>
              <Img src="https://images.unsplash.com/photo-1584982751601-97dcc096659c?w=900&q=80" alt="Operation Theatre" style={{ height: "100%" }} caption="Advanced Operation Theatre" />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
              <Img src="https://images.unsplash.com/photo-1638202993928-7267aad84c31?w=500&q=80" alt="Lab"  style={{ flex: 1 }} caption="NABL Lab"   />
              <Img src="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=500&q=80" alt="ICU"  style={{ flex: 1 }} caption="48-Bed ICU" />
            </div>
          </div>
        </Reveal>
      </div>

      {/* ══════════════════════════════════════════
          SPECIALITIES — identical tab layout
          ══════════════════════════════════════════ */}
      <section id="specialities" style={{ background: C.white, padding: "6rem 2.5rem" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <SectionHeader label="6 Departments" title={`Our <em style="font-style:italic;color:${C.navy};">Specialities</em>`} />
          <Reveal>
            <div style={{ display: "flex", border: `1px solid ${C.border}`, borderRadius: 4, overflow: "hidden" }}>
              {/* Tabs — navy active state */}
              <div style={{ width: 210, flexShrink: 0, borderRight: `1px solid ${C.border}`, display: "flex", flexDirection: "column" }}>
                {SPECIALITIES.map((s, i) => (
                  <button key={s.id} onClick={() => setActiveSpec(i)}
                    style={{ border: "none", background: activeSpec===i ? `rgba(27,42,74,.06)` : "transparent", borderLeft: `3px solid ${activeSpec===i ? C.navy : "transparent"}`, borderBottom: `1px solid ${C.border}`, padding: "1.2rem 1.4rem", textAlign: "left", cursor: "pointer", transition: "all .25s" }}>
                    <div style={{ fontSize: ".58rem", color: C.navyL, letterSpacing: ".16em", marginBottom: ".3rem" }}>{s.id}</div>
                    <div style={{ fontSize: ".82rem", fontWeight: 600, color: activeSpec===i ? C.text : C.muted }}>{s.name}</div>
                  </button>
                ))}
              </div>
              {/* Panel */}
              <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>
                <div style={{ flex: 1, padding: "3rem", position: "relative", overflow: "hidden", background: C.white }}>
                  {/* Giant watermark number — navy */}
                  <div style={{ position: "absolute", top: -30, right: -10, fontFamily: "'Crimson Pro',serif", fontSize: "14rem", fontWeight: 600, color: `rgba(27,42,74,.04)`, lineHeight: 1, pointerEvents: "none", userSelect: "none" }}>{SPECIALITIES[activeSpec].id}</div>
                  <div style={{ fontSize: ".62rem", letterSpacing: ".18em", textTransform: "uppercase", color: C.mid, marginBottom: "1rem" }}>{SPECIALITIES[activeSpec].sub}</div>
                  <h3 style={{ fontFamily: "'Crimson Pro',serif", fontSize: "clamp(1.8rem,3vw,3rem)", fontWeight: 400, color: C.text, marginBottom: ".8rem", lineHeight: 1 }}>{SPECIALITIES[activeSpec].name}</h3>
                  {/* Accent line — navy */}
                  <div style={{ width: 40, height: 2, background: C.navy, marginBottom: "1.2rem" }} />
                  <p style={{ fontSize: ".88rem", color: C.muted, lineHeight: 1.85, maxWidth: 420, marginBottom: "2rem" }}>{SPECIALITIES[activeSpec].desc}</p>
                  <a href="#appointment" style={{ display: "inline-flex", alignItems: "center", gap: ".5rem", border: `1.5px solid ${C.navy}`, color: C.navy, padding: ".65rem 1.6rem", fontSize: ".72rem", fontWeight: 600, letterSpacing: ".1em", borderRadius: 3, textDecoration: "none", transition: "all .2s" }}
                    onMouseEnter={e => { e.currentTarget.style.background = C.navy; e.currentTarget.style.color = "#fff"; }}
                    onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = C.navy; }}>
                    Book Consultation →
                  </a>
                </div>
                <div style={{ width: 300, flexShrink: 0 }}>
                  <Img key={activeSpec} src={SPECIALITIES[activeSpec].img} alt={SPECIALITIES[activeSpec].name} style={{ height: "100%" }} />
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          DOCTORS — identical grid, navy accents
          ══════════════════════════════════════════ */}
      <section id="doctors" style={{ background: C.off, padding: "6rem 2.5rem" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <SectionHeader label="Our Physicians" title={`Expert <em style="font-style:italic;color:${C.navy};">Medical Team</em>`}
            right={<a href="#" style={{ fontSize: ".7rem", letterSpacing: ".12em", textTransform: "uppercase", color: C.navyL, borderBottom: `1px solid rgba(46,74,122,.3)`, paddingBottom: 2, textDecoration: "none" }}>All 36 Specialists →</a>} />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 1, background: C.border }}>
            {DOCTORS.map((d, i) => (
              <Reveal key={d.name} delay={i * 60}>
                <div
                  onMouseEnter={() => setHoveredDoc(i)}
                  onMouseLeave={() => setHoveredDoc(null)}
                  style={{
                    background:  hoveredDoc===i ? C.off : C.white,
                    borderTop:   `3px solid ${hoveredDoc===i ? C.magenta : "transparent"}`,
                    overflow:    "hidden", cursor: "pointer", transition: "all .3s",
                    boxShadow:   hoveredDoc===i ? `0 6px 24px rgba(27,42,74,.1)` : "none",
                  }}>
                  <div style={{ height: 220, position: "relative" }}>
                    <Img src={d.img} alt={d.name} style={{ height: "100%" }} />
                    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(transparent 50%,rgba(15,30,53,.55))", pointerEvents: "none" }} />
                    {/* Exp badge — navy */}
                    <div style={{ position: "absolute", top: 12, right: 12, background: C.navy, color: "#fff", fontSize: ".58rem", letterSpacing: ".14em", textTransform: "uppercase", padding: ".28rem .7rem", fontWeight: 600 }}>
                      {d.exp}
                    </div>
                  </div>
                  <div style={{ padding: "1.4rem 1.6rem" }}>
                    <div style={{ fontFamily: "'Crimson Pro',serif", fontSize: "1.1rem", fontWeight: 600, color: C.text, marginBottom: ".25rem", lineHeight: 1.3 }}>{d.name}</div>
                    {/* Role — magenta */}
                    <div style={{ fontSize: ".68rem", fontWeight: 700, letterSpacing: ".06em", color: C.magenta, marginBottom: ".4rem" }}>{d.role}</div>
                    <div style={{ fontSize: ".7rem", color: C.muted, lineHeight: 1.5, marginBottom: ".9rem" }}>{d.qual}</div>
                    <div style={{ fontSize: ".62rem", color: C.mid, paddingTop: ".8rem", borderTop: `1px solid ${C.border}` }}>{d.avail}</div>
                    {hoveredDoc===i && (
                      <a href="#appointment" style={{ display: "block", marginTop: "1rem", background: C.navy, color: "#fff", padding: ".55rem", textAlign: "center", fontSize: ".65rem", fontWeight: 600, letterSpacing: ".14em", textTransform: "uppercase", borderRadius: 2, textDecoration: "none" }}>
                        Book This Doctor →
                      </a>
                    )}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          TESTIMONIALS — identical layout, navy accents
          ══════════════════════════════════════════ */}
      <section style={{ background: C.off, padding: "6rem 2.5rem" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <Reveal>
              <div style={{ display: "flex", alignItems: "center", gap: ".8rem", fontSize: ".62rem", letterSpacing: ".22em", textTransform: "uppercase", color: C.navyL, fontWeight: 600, marginBottom: ".8rem", justifyContent: "center" }}>
                <span style={{ width: 24, height: 2, background: C.navyL, display: "block" }} />
                Patient Voices
                <span style={{ width: 24, height: 2, background: C.navyL, display: "block" }} />
              </div>
              <h2 style={{ fontFamily: "'Crimson Pro',serif", fontSize: "clamp(2rem,4vw,3.5rem)", fontWeight: 300, color: C.text, lineHeight: 1.1 }}>
                Stories of <em style={{ fontStyle: "italic", color: C.navy }}>Healing</em>
              </h2>
            </Reveal>
          </div>
          <Reveal>
            <div style={{ maxWidth: 820, margin: "0 auto", background: C.white, border: `1px solid ${C.border}`, padding: "3.5rem", position: "relative", boxShadow: `0 2px 24px rgba(27,42,74,.07)` }}>
              {/* Dept label badge — navy */}
              <div style={{ position: "absolute", top: -14, left: "50%", transform: "translateX(-50%)", background: C.navy, color: "#fff", fontSize: ".6rem", letterSpacing: ".18em", textTransform: "uppercase", fontWeight: 600, padding: ".28rem 1.2rem", borderRadius: 2, whiteSpace: "nowrap" }}>
                {TESTIMONIALS[activeTesti].dept}
              </div>
              <div style={{ fontFamily: "'Crimson Pro',serif", fontSize: "5rem", color: C.navy, opacity: .1, lineHeight: 1, marginBottom: ".5rem" }}>"</div>
              <p style={{ fontFamily: "'Crimson Pro',serif", fontSize: "clamp(1.1rem,2vw,1.4rem)", fontStyle: "italic", color: C.text, lineHeight: 1.75, marginBottom: "2rem" }}>
                {TESTIMONIALS[activeTesti].text}
              </p>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "1rem" }}>
                <div style={{ width: 32, height: 1, background: C.border }} />
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: ".88rem", fontWeight: 600, color: C.text }}>{TESTIMONIALS[activeTesti].name}</div>
                  <div style={{ fontSize: ".6rem", letterSpacing: ".12em", textTransform: "uppercase", color: C.navyL, marginTop: 3 }}>{TESTIMONIALS[activeTesti].area}</div>
                </div>
                <div style={{ width: 32, height: 1, background: C.border }} />
              </div>
            </div>
            {/* Progress dots — navy active, magenta hover */}
            <div style={{ display: "flex", justifyContent: "center", gap: ".5rem", marginTop: "2rem" }}>
              {TESTIMONIALS.map((_, i) => (
                <button key={i} onClick={() => setActiveTesti(i)}
                  style={{ width: i===activeTesti ? 36 : 24, height: 2, background: i===activeTesti ? C.navy : C.border, border: "none", cursor: "pointer", transition: "all .35s", padding: 0 }} />
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          FACILITIES — identical grid + FacCard
          ══════════════════════════════════════════ */}
      <section id="facilities" style={{ background: C.white, padding: "6rem 2.5rem" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <SectionHeader label="Infrastructure" title={`World-Class <em style="font-style:italic;color:${C.navy};">Facilities</em>`} />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 1, background: C.border }}>
            {FACILITIES.map((f, i) => (
              <Reveal key={f.name} delay={i * 55}>
                <FacCard f={f} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          APPOINTMENT — navy background (unchanged feel)
          ══════════════════════════════════════════ */}
      <section id="appointment" style={{ background: C.navy, padding: "6rem 2.5rem" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <Reveal>
            <div style={{ marginBottom: "2.5rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: ".7rem", fontSize: ".62rem", letterSpacing: ".22em", textTransform: "uppercase", color: "rgba(255,255,255,.55)", marginBottom: ".8rem" }}>
                <span style={{ width: 20, height: 2, background: "rgba(255,255,255,.35)", display: "block" }} />Schedule a Visit
              </div>
              <h2 style={{ fontFamily: "'Crimson Pro',serif", fontSize: "clamp(2rem,4vw,3.5rem)", fontWeight: 300, color: "#fff", lineHeight: 1.1, marginBottom: ".8rem" }}>
                Book Your<br /><em style={{ opacity: .7 }}>Appointment</em>
              </h2>
              <p style={{ fontSize: ".88rem", color: "rgba(255,255,255,.55)" }}>Confirmed within 30 minutes · Walk-ins always welcome</p>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <form onSubmit={handleSubmit}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1, background: "rgba(255,255,255,.1)", marginBottom: 1 }}>
                {[{ l: "Full Name", k: "name", t: "text", ph: "Your full name" }, { l: "Mobile Number", k: "phone", t: "tel", ph: "+91 98765 43210" }].map(f => (
                  <div key={f.k} style={{ background: "rgba(255,255,255,.06)", padding: "1.6rem 1.8rem" }}>
                    <label style={{ fontSize: ".58rem", letterSpacing: ".2em", textTransform: "uppercase", color: "rgba(255,255,255,.6)", display: "block", marginBottom: ".7rem" }}>{f.l}</label>
                    <input type={f.t} placeholder={f.ph} value={form[f.k as "name" | "phone"]} onChange={e => setForm(p => ({ ...p, [f.k]: e.target.value }))}
                      style={{ width: "100%", background: "transparent", border: "none", borderBottom: "1px solid rgba(255,255,255,.18)", color: "#fff", fontSize: "1rem", padding: ".5rem 0", outline: "none", fontFamily: "'Plus Jakarta Sans',sans-serif" }}
                      onFocus={e => e.currentTarget.style.borderBottomColor = C.magenta}
                      onBlur={e => e.currentTarget.style.borderBottomColor = "rgba(255,255,255,.18)"} />
                  </div>
                ))}
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1, background: "rgba(255,255,255,.1)", marginBottom: 1 }}>
                <div style={{ background: "rgba(255,255,255,.06)", padding: "1.6rem 1.8rem" }}>
                  <label style={{ fontSize: ".58rem", letterSpacing: ".2em", textTransform: "uppercase", color: "rgba(255,255,255,.6)", display: "block", marginBottom: ".7rem" }}>Department</label>
                  <select value={form.dept} onChange={e => setForm(p => ({ ...p, dept: e.target.value }))}
                    style={{ width: "100%", background: "transparent", border: "none", borderBottom: "1px solid rgba(255,255,255,.18)", color: "#fff", fontSize: "1rem", padding: ".5rem 0", outline: "none", fontFamily: "'Plus Jakarta Sans',sans-serif", colorScheme: "dark" }}>
                    <option value="">Select department</option>
                    {SPECIALITIES.map(s => <option key={s.name} style={{ background: C.navy }}>{s.name}</option>)}
                    <option style={{ background: C.navy }}>General Medicine</option>
                    <option style={{ background: C.navy }}>Paediatrics</option>
                  </select>
                </div>
                <div style={{ background: "rgba(255,255,255,.06)", padding: "1.6rem 1.8rem" }}>
                  <label style={{ fontSize: ".58rem", letterSpacing: ".2em", textTransform: "uppercase", color: "rgba(255,255,255,.6)", display: "block", marginBottom: ".7rem" }}>Preferred Date</label>
                  <input type="date" value={form.date} onChange={e => setForm(p => ({ ...p, date: e.target.value }))} min={new Date().toISOString().split("T")[0]}
                    style={{ width: "100%", background: "transparent", border: "none", borderBottom: "1px solid rgba(255,255,255,.18)", color: "#fff", fontSize: "1rem", padding: ".5rem 0", outline: "none", fontFamily: "'Plus Jakarta Sans',sans-serif", colorScheme: "dark" }} />
                </div>
              </div>
              <div style={{ background: "rgba(255,255,255,.06)", padding: "1.6rem 1.8rem", marginBottom: 1 }}>
                <label style={{ fontSize: ".58rem", letterSpacing: ".2em", textTransform: "uppercase", color: "rgba(255,255,255,.6)", display: "block", marginBottom: ".7rem" }}>Reason for Visit</label>
                <input type="text" placeholder="Briefly describe your concern..." value={form.msg} onChange={e => setForm(p => ({ ...p, msg: e.target.value }))}
                  style={{ width: "100%", background: "transparent", border: "none", borderBottom: "1px solid rgba(255,255,255,.18)", color: "#fff", fontSize: "1rem", padding: ".5rem 0", outline: "none", fontFamily: "'Plus Jakarta Sans',sans-serif" }} />
              </div>
              {/* Submit button — white fill on navy, magenta on success */}
              <button type="submit" style={{ width: "100%", background: sent ? "#2E7D32" : "#fff", color: sent ? "#fff" : C.navy, border: "none", padding: "1.4rem", fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: ".82rem", fontWeight: 700, letterSpacing: ".16em", textTransform: "uppercase", cursor: "pointer", transition: "all .3s" }}>
                {sent ? "✓  Appointment Received — We'll Confirm Shortly" : "Confirm Appointment →"}
              </button>
            </form>
          </Reveal>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          CONTACT + BRANCHES — identical layout
          ══════════════════════════════════════════ */}
      <section id="contact" style={{ padding: "6rem 2.5rem", background: C.white }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", display: "flex", gap: "5rem", flexWrap: "wrap" }}>
          {/* Left — contact details */}
          <div style={{ flex: "0 0 38%", minWidth: 260 }}>
            <Reveal>
              <div style={{ display: "flex", alignItems: "center", gap: ".8rem", fontSize: ".62rem", letterSpacing: ".22em", textTransform: "uppercase", color: C.navyL, fontWeight: 600, marginBottom: "1.5rem" }}>
                <span style={{ width: 24, height: 2, background: C.navyL, display: "block" }} />Vijayawada Branch
              </div>
              <h2 style={{ fontFamily: "'Crimson Pro',serif", fontSize: "clamp(1.8rem,3vw,3rem)", fontWeight: 300, color: C.text, marginBottom: "2.5rem", lineHeight: 1 }}>
                Find Us<br /><em style={{ fontStyle: "italic", color: C.navy }}>Anytime</em>
              </h2>
              {[
                { l: "Address",         v: "Plot 14-B, MG Road\nVijayawada – 520 010, AP", col: C.navy  },
                { l: "Emergency 24/7",  v: "0866-2490-100",                                  col: C.red   },
                { l: "Appointments",    v: "0866-2490-200",                                  col: C.navy  },
                { l: "Email",           v: "vijayawada@srikarahospitals.in",                 col: C.navyL },
                { l: "OPD Hours",       v: "Mon – Sat  ·  8:00 AM – 8:00 PM",               col: C.green },
              ].map((c, i, arr) => (
                <div key={c.l} style={{ display: "flex", borderBottom: i < arr.length - 1 ? `1px solid ${C.border}` : "none" }}>
                  <div style={{ width: 3, background: c.col, opacity: .8, flexShrink: 0, marginRight: "1.2rem", borderRadius: 2 }} />
                  <div style={{ padding: "1rem 0" }}>
                    <div style={{ fontSize: ".58rem", letterSpacing: ".16em", textTransform: "uppercase", color: C.mid, marginBottom: ".3rem" }}>{c.l}</div>
                    <div style={{ fontSize: ".88rem", color: C.text, lineHeight: 1.6, whiteSpace: "pre-line" }}>{c.v}</div>
                  </div>
                </div>
              ))}
            </Reveal>
          </div>

          {/* Right — branches grid */}
          <div style={{ flex: 1 }}>
            <Reveal>
              <div style={{ display: "flex", alignItems: "center", gap: ".8rem", fontSize: ".62rem", letterSpacing: ".22em", textTransform: "uppercase", color: C.navyL, fontWeight: 600, marginBottom: "1.5rem" }}>
                <span style={{ width: 24, height: 2, background: C.navyL, display: "block" }} />Our Network
              </div>
              <h2 style={{ fontFamily: "'Crimson Pro',serif", fontSize: "clamp(1.8rem,3vw,3rem)", fontWeight: 300, color: C.text, marginBottom: "2.5rem", lineHeight: 1 }}>
                Srikara<br /><em style={{ fontStyle: "italic", color: C.navy }}>Branches</em>
              </h2>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 1, background: C.border }}>
                {BRANCHES.map(b => (
                  <a key={b} href={`/hospitals/${b.toLowerCase().replace(/ /g, "-")}`}
                    style={{
                      background: b === "Vijayawada" ? `${C.navy}0e` : C.off,
                      padding: ".85rem 1.1rem", display: "flex", alignItems: "center", justifyContent: "space-between",
                      fontSize: ".75rem", color: b === "Vijayawada" ? C.navy : C.muted,
                      fontWeight: b === "Vijayawada" ? 700 : 500,
                      textDecoration: "none",
                      borderLeft: `2px solid ${b === "Vijayawada" ? C.navy : "transparent"}`,
                      transition: "all .2s",
                    }}
                    onMouseEnter={e => { if (b !== "Vijayawada") { e.currentTarget.style.background = C.panel; e.currentTarget.style.borderLeftColor = C.navy; e.currentTarget.style.color = C.text; } }}
                    onMouseLeave={e => { if (b !== "Vijayawada") { e.currentTarget.style.background = C.off; e.currentTarget.style.borderLeftColor = "transparent"; e.currentTarget.style.color = C.muted; } }}>
                    <span>{b === "Vijayawada" ? "★ " : ""}{b}</span>
                    <span style={{ fontSize: ".68rem", color: C.magenta, opacity: .7 }}>→</span>
                  </a>
                ))}
              </div>
              <a href="/" style={{ display: "inline-flex", alignItems: "center", gap: ".5rem", marginTop: "1.5rem", fontSize: ".68rem", letterSpacing: ".12em", textTransform: "uppercase", color: C.mid, borderBottom: `1px solid ${C.border}`, paddingBottom: 2, textDecoration: "none" }}>
                ← Back to Main Site
              </a>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Footer — dark navy ── */}
      <footer style={{ background: C.text, borderTop: `3px solid ${C.navy}` }}>
        {/* Magenta top accent line */}
        <div style={{ height: 2, background: `linear-gradient(90deg,${C.navy},${C.magenta},transparent)` }} />
        <div style={{ padding: "1.8rem 2.5rem" }}>
          <div style={{ maxWidth: 1280, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 28, height: 28, background: `linear-gradient(135deg,${C.navy},${C.magenta})`, borderRadius: 3, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Crimson Pro',serif", fontSize: "1rem", fontWeight: 600, color: "#fff" }}>S</div>
              <span style={{ fontSize: ".62rem", color: "rgba(255,255,255,.35)", letterSpacing: ".08em" }}>
                © {new Date().getFullYear()} Srikara Hospital Vijayawada · Part of Srikara Hospital Group
              </span>
            </div>
            <div style={{ display: "flex", gap: "2rem" }}>
              {["Privacy", "Terms", "Sitemap"].map(l => (
                <a key={l} href="#" style={{ fontSize: ".6rem", color: "rgba(255,255,255,.2)", letterSpacing: ".1em", textTransform: "uppercase", textDecoration: "none" }}
                  onMouseEnter={e => e.currentTarget.style.color = C.magenta}
                  onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,.2)"}>
                  {l}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

// ─── FACILITY CARD ────────────────────────────────────────────────────────────
function FacCard({ f }: { f: typeof FACILITIES[number] }) {
  const [hov, setHov] = useState(false);
  return (
    <div onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{
        background: hov ? "#F4F6FB" : "#FAFCFE",
        borderBottom: `3px solid ${hov ? "#1B2A4A" : "transparent"}`,
        overflow: "hidden", cursor: "pointer", transition: "all .3s",
      }}>
      <div style={{ height: 160, overflow: "hidden", background: "#dce8f0", position: "relative" }}>
        <img src={f.img} alt={f.name} loading="lazy"
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "transform .55s ease", transform: hov ? "scale(1.04)" : "scale(1)" }} />
        {/* Magenta top accent on hover */}
        {hov && <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg,#1B2A4A,#B8246E)` }} />}
      </div>
      <div style={{ padding: "1.5rem" }}>
        {/* Tag badge — navy border on hover */}
        <span style={{ fontSize: ".58rem", letterSpacing: ".16em", textTransform: "uppercase", border: `1px solid ${hov ? "#1B2A4A55" : "#CDD5E5"}`, color: hov ? "#1B2A4A" : "#6A7E9A", padding: ".22rem .7rem", borderRadius: 2, display: "inline-block", marginBottom: ".9rem", transition: "all .3s" }}>{f.tag}</span>
        <div style={{ fontFamily: "'Crimson Pro',serif", fontSize: "1rem", fontWeight: 600, color: "#0D1B2E", lineHeight: 1.35, marginBottom: ".6rem" }}>{f.name}</div>
        <div style={{ fontSize: ".76rem", color: "#3D5570", lineHeight: 1.75 }}>{f.desc}</div>
      </div>
    </div>
  );
}