"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

// ── IMAGES ─────────────────────────────────────────────────────────────────────
const IMG = {
  hero:      "https://images.unsplash.com/photo-1504813184591-01572f98c85f?w=1600&q=85",
  about:     "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=900&q=85",
  doctors:   "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=900&q=85",
  cardio:    "https://images.unsplash.com/photo-1628348068343-c6a848d2b6dd?w=700&q=85",
  ortho:     "https://images.unsplash.com/photo-1530026186672-2cd00ffc50fe?w=700&q=85",
  gynae:     "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=700&q=85",
  paeds:     "https://images.unsplash.com/photo-1576765607924-3f7b8410a787?w=700&q=85",
  neuro:     "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=700&q=85",
  diag:      "https://images.unsplash.com/photo-1579154204601-01588f351e67?w=700&q=85",
  icu:       "https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?w=700&q=85",
  waiting:   "https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=700&q=85",
  doc1:      "https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=500&q=85",
  doc2:      "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=500&q=85",
  doc3:      "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=500&q=85",
  doc4:      "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=500&q=85",
  doc5:      "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=500&q=85",
  doc6:      "https://images.unsplash.com/photo-1651008376811-b90baee60c1f?w=500&q=85",
  nature1:   "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80",
  nature2:   "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=400&q=80",
};

// ── DATA ──────────────────────────────────────────────────────────────────────
const NAV = [
  { l:"About Us", h:"#about" },
  { l:"Specialities", h:"#specialities" },
  { l:"Our Doctors", h:"#doctors" },
  { l:"Facilities", h:"#facilities" },
  { l:"Contact", h:"#contact" },
];

const STATS = [
  { n:"11+", l:"Years", s:"Serving North Hyderabad" },
  { n:"36+", l:"Specialists", s:"Across all departments" },
  { n:"48k+", l:"Families", s:"Who trust us" },
  { n:"240", l:"Beds", s:"Across all wings" },
];

const SPECIALITIES = [
  { name:"Cardiology", tag:"Heart & Vascular", img:IMG.cardio, icon:"🫀", color:"#B45F59",
    desc:"Comprehensive cardiac care including cath lab, angioplasty, echocardiography and cardiac rehabilitation.",
    list:["Cardiac Cath Lab","Angioplasty & Stenting","ECG & Echo","Cardiac Rehab"] },
  { name:"Orthopaedics", tag:"Bone & Joint", img:IMG.ortho, icon:"🦴", color:"#5B7E6B",
    desc:"Joint replacement, arthroscopy, sports medicine, fracture management and complete spine care.",
    list:["Joint Replacement","Arthroscopy","Spine Surgery","Sports Medicine"] },
  { name:"Obstetrics & Gynaecology", tag:"Women's Health", img:IMG.gynae, icon:"👶", color:"#B07D5B",
    desc:"High-risk obstetrics, IVF fertility clinic, minimally invasive gynaec surgery and complete maternal care.",
    list:["High-Risk OB","IVF & Fertility","Laparoscopy","Neonatal Care"] },
  { name:"Paediatrics & NICU", tag:"Child Health", img:IMG.paeds, icon:"🍃", color:"#5B7498",
    desc:"Level III NICU, paediatric surgery, child development, vaccination clinics and adolescent medicine.",
    list:["Level III NICU","Paed Surgery","Vaccination","Child Dev. Clinic"] },
  { name:"Neurology", tag:"Brain & Nervous System", img:IMG.neuro, icon:"🧠", color:"#7B5EA7",
    desc:"Stroke unit, epilepsy monitoring, Parkinson's care, neuro-oncology and complete neurological rehabilitation.",
    list:["Stroke Unit","Epilepsy Clinic","Neuro-surgery","Neuro Rehab"] },
  { name:"Diagnostics & Imaging", tag:"Advanced Diagnostics", img:IMG.diag, icon:"🔬", color:"#3D7A8A",
    desc:"3T MRI, 256-slice CT, digital X-Ray, mammography, PET-CT and NABL-certified laboratory.",
    list:["3T MRI","256-Slice CT","NABL Lab","PET-CT"] },
];

const DOCTORS = [
  { name:"Dr. Satya Prasad Rao", role:"Senior Cardiologist", qual:"DM Cardiology · NIMS Hyderabad", exp:"19", img:IMG.doc1, avail:"Mon–Sat · 10:00 AM – 2:00 PM", color:"#B45F59" },
  { name:"Dr. Mamatha Goswami", role:"Orthopaedic Surgeon", qual:"MS Ortho, Fellowship UK", exp:"16", img:IMG.doc2, avail:"Mon, Wed, Fri · 3:00–7:00 PM", color:"#5B7E6B" },
  { name:"Dr. Srinivasa Rao", role:"Neurologist", qual:"DM Neurology · AIIMS New Delhi", exp:"14", img:IMG.doc3, avail:"Tue, Thu, Sat · 9:00 AM–1:00 PM", color:"#7B5EA7" },
  { name:"Dr. Anita Sharma", role:"Gynaecologist & IVF Specialist", qual:"MS OBG, FRCOG", exp:"17", img:IMG.doc4, avail:"Mon–Fri · 11:00 AM – 3:00 PM", color:"#B07D5B" },
  { name:"Dr. Kiran Babu", role:"Surgical Gastroenterologist", qual:"MCh GI Surgery · KEM Mumbai", exp:"12", img:IMG.doc5, avail:"Mon–Fri · 2:00 PM – 6:00 PM", color:"#3D7A8A" },
  { name:"Dr. Rekha Ponnala", role:"Neonatologist", qual:"DNB Paeds, NNF Fellowship", exp:"13", img:IMG.doc6, avail:"Mon–Sat · 8:00 AM – 12:00 PM", color:"#5B7498" },
];

const FACILITIES = [
  { name:"24/7 Emergency & Trauma", img:IMG.icu, tag:"Emergency", desc:"Fully equipped emergency ward with trauma bay, crash carts, ventilators and a rapid response team — round the clock." },
  { name:"Advanced Imaging Centre", img:IMG.diag, tag:"Radiology", desc:"3-Tesla MRI, 256-slice CT, PET-CT, digital mammography and real-time ultrasound under a single roof." },
  { name:"NABL Certified Lab", img:IMG.waiting, tag:"Laboratory", desc:"1,200+ tests, molecular diagnostics, flow cytometry, liquid biopsy and a 24/7 automated blood bank." },
];

const TIMELINE = [
  { year:"2013", title:"Foundation", desc:"Srikara Kompally opens with 120 beds serving families across North Hyderabad." },
  { year:"2016", title:"ICU Expansion", desc:"State-of-the-art 24-bed multi-specialty ICU commissioned with full critical care support." },
  { year:"2019", title:"NABH Accreditation", desc:"Earned national accreditation, cementing our commitment to the highest standards of patient care." },
  { year:"2022", title:"Robotic Surgery Suite", desc:"Launched North Hyderabad's first robotic surgical platform for minimally invasive procedures." },
  { year:"2024", title:"IVF & Fertility Clinic", desc:"Dedicated fertility centre opens with IVF lab, embryology suite and counselling services." },
];

const TESTIMONIALS = [
  { quote:"I had a complicated pregnancy and the entire maternal team at Srikara Kompally treated me like family. My twins arrived healthy because of their exceptional care.", name:"Lakshmi Pullela", area:"Kompally, Hyderabad", dept:"Obstetrics", img:IMG.doc2 },
  { quote:"After two failed surgeries elsewhere, Dr. Satya Prasad's cardiac team identified the real problem immediately. The care here is extraordinary — personal, thorough and compassionate.", name:"Ranga Rao Avula", area:"Medchal, Hyderabad", dept:"Cardiology", img:IMG.doc1 },
  { quote:"Our son's NICU journey lasted six weeks. Every single day, the paediatrics team gave us hope and transparency. We'll be forever grateful.", name:"Praveen & Divya Reddy", area:"Miyapur, Hyderabad", dept:"Neonatology", img:IMG.doc6 },
];

const SLOTS = ["9:00 AM","10:00 AM","11:00 AM","12:00 PM","2:00 PM","3:00 PM","4:00 PM","5:00 PM","6:00 PM"];
const BRANCHES = ["RTC X Roads","Miyapur","LB Nagar","ECIL","Ameerpet","Kukatpally","Dilsukhnagar","Vijayawada","Secunderabad"];

// ── REVEAL ────────────────────────────────────────────────────────────────────
function useReveal(t = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setOn(true); io.unobserve(el); } }, { threshold: t });
    io.observe(el); return () => io.disconnect();
  }, [t]);
  return { ref, on };
}

function Fade({ children, d = 0, up = true, s = {} }: { children: React.ReactNode; d?: number; up?: boolean; s?: React.CSSProperties }) {
  const { ref, on } = useReveal();
  return (
    <div ref={ref} style={{ transitionDelay:`${d}ms`, transition:"opacity .85s ease, transform .85s ease", opacity: on?1:0, transform: on?"none":`translate${up?"Y":"X"}(${up?"30px":"24px"})`, ...s }}>
      {children}
    </div>
  );
}

// ── SVG ORGANICS ──────────────────────────────────────────────────────────────
const WaveTop = ({ fill = "#F7F4EF" }: { fill?: string }) => (
  <svg viewBox="0 0 1440 80" style={{ display:"block", width:"100%", marginBottom:-1 }} preserveAspectRatio="none">
    <path d="M0,40 C240,80 480,0 720,40 C960,80 1200,0 1440,40 L1440,80 L0,80 Z" fill={fill} />
  </svg>
);

const WaveBottom = ({ fill = "#F7F4EF" }: { fill?: string }) => (
  <svg viewBox="0 0 1440 80" style={{ display:"block", width:"100%", marginTop:-1 }} preserveAspectRatio="none">
    <path d="M0,40 C240,0 480,80 720,40 C960,0 1200,80 1440,40 L1440,0 L0,0 Z" fill={fill} />
  </svg>
);

const LeafDivider = ({ color = "#5B7E6B" }: { color?: string }) => (
  <div style={{ display:"flex", alignItems:"center", gap:"1rem" }}>
    <div style={{ flex:1, height:1, background:`linear-gradient(90deg, transparent, ${color}40)` }} />
    <svg width="32" height="20" viewBox="0 0 32 20">
      <path d="M16 2 C8 2 2 8 2 14 C2 14 8 10 16 10 C24 10 30 14 30 14 C30 8 24 2 16 2 Z" fill={color} opacity=".35" />
      <path d="M16 10 L16 18" stroke={color} strokeWidth="1.5" opacity=".5" strokeLinecap="round" />
    </svg>
    <div style={{ flex:1, height:1, background:`linear-gradient(90deg, ${color}40, transparent)` }} />
  </div>
);

const BlobShape = ({ color, style = {} }: { color: string; style?: React.CSSProperties }) => (
  <div style={{ borderRadius:"60% 40% 70% 30% / 50% 60% 40% 50%", background:color, ...style }} />
);

// ── MAIN ──────────────────────────────────────────────────────────────────────
export default function KompallyPage() {
  const [scrolled, setScrolled]     = useState(false);
  const [menuOpen, setMenuOpen]     = useState(false);
  const [activeSpec, setActiveSpec] = useState(0);
  const [activeTest, setActiveTest] = useState(0);
  const [selectedSlot, setSelectedSlot] = useState("");
  const [form, setForm]             = useState({ name:"", phone:"", dept:"", date:"" });
  const [sent, setSent]             = useState(false);
  const [showBook, setShowBook]     = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn, { passive:true });
    const t = setInterval(() => setActiveTest(p => (p+1) % TESTIMONIALS.length), 5500);
    return () => { window.removeEventListener("scroll", fn); clearInterval(t); };
  }, []);

  const submit = (e: React.FormEvent) => {
    e.preventDefault(); setSent(true);
    setTimeout(() => { setSent(false); setShowBook(false); setSelectedSlot(""); }, 3500);
  };

  const C = {
    forest:"#2D5016", sage:"#5B7E6B", lime:"#7EA850", sand:"#C4A882",
    clay:"#8B5E3C", cream:"#FAF8F3", warm:"#F2EDE3", parch:"#E8DDD0",
    mist:"#D4CAB8", ink:"#1A2010", mid:"#5A6548", light:"#8A9478",
    white:"#FFFFFF", rose:"#B45F59", blue:"#5B7498",
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Gilda+Display&family=Nunito:wght@300;400;500;600;700;800&display=swap');

        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
        html{scroll-behavior:smooth;}
        body{font-family:'Nunito',sans-serif;background:#FAF8F3;color:#1A2010;overflow-x:hidden;}
        .serif{font-family:'Gilda Display',serif;}

        ::-webkit-scrollbar{width:5px;}
        ::-webkit-scrollbar-track{background:#F2EDE3;}
        ::-webkit-scrollbar-thumb{background:#5B7E6B;border-radius:3px;}

        /* Paper texture */
        body::before{content:'';position:fixed;inset:0;z-index:0;pointer-events:none;
          background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.04'/%3E%3C/svg%3E");
          opacity:.5; mix-blend-mode:multiply;}

        @keyframes fadeUp{from{opacity:0;transform:translateY(36px);}to{opacity:1;transform:translateY(0);}}
        @keyframes leafFloat{0%,100%{transform:translateY(0) rotate(0deg);}50%{transform:translateY(-10px) rotate(3deg);}}
        @keyframes pulse{0%,100%{opacity:1;}50%{opacity:.4;}}
        @keyframes marquee{from{transform:translateX(0);}to{transform:translateX(-50%);}}
        @keyframes slideUp{from{opacity:0;transform:translateY(20px);}to{opacity:1;transform:translateY(0);}}
        @keyframes scaleIn{from{opacity:0;transform:scale(.95);}to{opacity:1;transform:scale(1);}}
        @keyframes ripple{0%{transform:scale(1);opacity:.5;}100%{transform:scale(2.2);opacity:0;}}
        @keyframes pathDraw{from{stroke-dashoffset:1000;}to{stroke-dashoffset:0;}}
        @keyframes blobDrift{0%,100%{border-radius:60% 40% 70% 30%/50% 60% 40% 50%;}50%{border-radius:40% 60% 30% 70%/60% 40% 70% 30%;}}

        .ha1{animation:fadeUp .85s ease .1s both;} .ha2{animation:fadeUp .85s ease .3s both;}
        .ha3{animation:fadeUp .85s ease .5s both;} .ha4{animation:fadeUp .85s ease .7s both;}
        .ha5{animation:fadeUp .85s ease .9s both;} .ha6{animation:fadeUp .85s ease 1.1s both;}

        .btn-green{display:inline-flex;align-items:center;gap:8px;background:#5B7E6B;color:#fff;
          padding:.85rem 2.2rem;border-radius:100px;font-size:.88rem;font-weight:700;
          text-decoration:none;transition:all .3s;cursor:pointer;border:none;
          font-family:'Nunito',sans-serif;letter-spacing:.04em;
          box-shadow:0 4px 20px rgba(91,126,107,.3);}
        .btn-green:hover{background:#4A6B59;transform:translateY(-2px);box-shadow:0 8px 28px rgba(91,126,107,.4);}
        .btn-outline-green{display:inline-flex;align-items:center;gap:8px;background:transparent;
          color:#5B7E6B;border:2px solid #5B7E6B;padding:.85rem 2.2rem;border-radius:100px;
          font-size:.88rem;font-weight:700;text-decoration:none;transition:all .3s;cursor:pointer;}
        .btn-outline-green:hover{background:#5B7E6B;color:#fff;}
        .btn-clay{display:inline-flex;align-items:center;gap:8px;background:#8B5E3C;color:#fff;
          padding:.85rem 2.2rem;border-radius:100px;font-size:.88rem;font-weight:700;
          text-decoration:none;transition:all .3s;cursor:pointer;border:none;
          font-family:'Nunito',sans-serif;box-shadow:0 4px 20px rgba(139,94,60,.25);}
        .btn-clay:hover{background:#7A4F30;transform:translateY(-2px);}

        .spec-tab{transition:all .3s;cursor:pointer;border-left:3px solid transparent;}
        .spec-tab.active{border-left-color:#5B7E6B;background:#F2EDE3 !important;}
        .spec-tab:hover:not(.active){background:#F2EDE3 !important;}

        .doc-card{transition:all .35s ease;overflow:hidden;}
        .doc-card:hover{transform:translateY(-6px);box-shadow:0 20px 60px rgba(45,80,22,.1) !important;}
        .doc-card img{transition:transform .5s ease;}
        .doc-card:hover img{transform:scale(1.05);}

        .fac-card{transition:all .3s;}
        .fac-card:hover{transform:translateY(-4px);box-shadow:0 16px 48px rgba(45,80,22,.1) !important;}
        .fac-card img{transition:transform .5s;}
        .fac-card:hover img{transform:scale(1.05);}

        .slot-btn{font-family:'Nunito',sans-serif;font-size:.78rem;font-weight:600;
          border:1.5px solid #D4CAB8;border-radius:100px;padding:.45rem 1rem;cursor:pointer;
          transition:all .25s;background:#FAF8F3;color:#5A6548;}
        .slot-btn:hover{border-color:#5B7E6B;color:#5B7E6B;}
        .slot-btn.selected{background:#5B7E6B;color:#fff;border-color:#5B7E6B;}

        .input-field{width:100%;border:1.5px solid #D4CAB8;border-radius:12px;
          padding:.8rem 1.1rem;font-family:'Nunito',sans-serif;font-size:.92rem;
          color:#1A2010;background:#FAF8F3;outline:none;transition:border-color .25s;}
        .input-field:focus{border-color:#5B7E6B;}
        .input-field::placeholder{color:#A89880;}
        .input-field option{background:#FAF8F3;color:#1A2010;}

        @media(max-width:768px){
          .desk{display:none!important;} .mob-menu-btn{display:flex!important;}
          .hero-grid{flex-direction:column!important;}
          .hero-img-col{display:none!important;}
          .stats-grid{grid-template-columns:1fr 1fr!important;}
          .spec-layout{flex-direction:column!important;}
          .spec-tabs-col{width:100%!important;flex-direction:row!important;overflow-x:auto!important;border-right:none!important;border-bottom:1px solid #E8DDD0!important;}
          .spec-tab{min-width:140px!important;border-left:none!important;border-bottom:3px solid transparent!important;}
          .spec-tab.active{border-left:none!important;border-bottom-color:#5B7E6B!important;}
          .doc-grid{grid-template-columns:1fr 1fr!important;}
          .fac-grid{grid-template-columns:1fr!important;}
          .tl-row{flex-direction:column!important;gap:.5rem!important;}
          .tl-row .tl-spacer{display:none!important;}
          .contact-cols{flex-direction:column!important;}
          .footer-cols{flex-direction:column!important;gap:1.5rem!important;}
          .branch-grid{grid-template-columns:1fr 1fr 1fr!important;}
          .appt-grid{grid-template-columns:1fr!important;}
          .sec{padding:5rem 1.5rem!important;}
          .hero-pad{padding:6rem 1.5rem 4rem!important;}
          .hero-title{font-size:clamp(3rem,9vw,5rem)!important;}
          .test-inner{padding:2rem 1.5rem!important;}
        }
      `}</style>

      {/* ── TOP STRIP ── */}
      <div style={{ background:C.forest, padding:"7px 2.5rem", display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:".5rem", position:"relative", zIndex:600 }}>
        <div style={{ display:"flex", alignItems:"center", gap:"1.5rem" }}>
          <div style={{ display:"flex", alignItems:"center", gap:7 }}>
            <span style={{ width:7,height:7,borderRadius:"50%",background:"#7EA850",animation:"pulse 1.5s ease infinite",display:"inline-block" }} />
            <span style={{ fontSize:".62rem", fontWeight:700, letterSpacing:".18em", textTransform:"uppercase", color:"rgba(250,248,243,.7)" }}>Emergency 24/7</span>
          </div>
          <a href="tel:040-4856-2200" style={{ fontSize:".82rem", fontWeight:800, color:"#FAF8F3", textDecoration:"none" }}>040-4856-2200</a>
        </div>
        <div style={{ display:"flex", gap:"1.5rem", alignItems:"center" }}>
          <span style={{ fontSize:".62rem", color:"rgba(250,248,243,.5)", letterSpacing:".08em" }}>Survey No. 47, Kompally, Hyderabad – 500014</span>
          <Link href="/" style={{ fontSize:".62rem", color:"rgba(250,248,243,.5)", textDecoration:"none", letterSpacing:".12em", textTransform:"uppercase" }}>← Main Site</Link>
        </div>
      </div>

      {/* ── NAV ── */}
      <nav style={{ position:"sticky", top:0, zIndex:500, background: scrolled?"rgba(250,248,243,.97)":"#FAF8F3", backdropFilter: scrolled?"blur(16px)":"none", borderBottom:`1px solid ${scrolled?C.parch:"rgba(196,168,130,.2)"}`, boxShadow: scrolled?"0 2px 24px rgba(45,80,22,.07)":"none", transition:"all .35s" }}>
        {/* Green top rule */}
        <div style={{ height:3, background:`linear-gradient(90deg,${C.forest},${C.sage},${C.lime})` }} />
        <div style={{ maxWidth:1400, margin:"0 auto", padding:"0 2.5rem", height:68, display:"flex", alignItems:"center", justifyContent:"space-between" }}>

          {/* Logo */}
          <Link href="/" style={{ display:"flex", alignItems:"center", gap:12, textDecoration:"none" }}>
            <div style={{ position:"relative", width:44, height:44, flexShrink:0 }}>
              <div style={{ position:"absolute", inset:0, borderRadius:"50%", background:`linear-gradient(135deg,${C.forest},${C.sage})` }} />
              <div style={{ position:"absolute", inset:-3, borderRadius:"50%", border:`1.5px dashed rgba(94,126,75,.3)`, animation:"leafFloat 6s ease-in-out infinite" }} />
              <div style={{ position:"absolute", inset:0, borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center" }}>
                <span className="serif" style={{ fontSize:"1.2rem", color:"#FAF8F3", fontStyle:"italic" }}>S</span>
              </div>
            </div>
            <div>
              <p className="serif" style={{ fontSize:"1.05rem", color:C.forest, lineHeight:1.1 }}>Srikara Hospital</p>
              <p style={{ fontSize:".58rem", color:C.sage, letterSpacing:".2em", textTransform:"uppercase", fontWeight:700 }}>Kompally Branch</p>
            </div>
          </Link>

          {/* Desktop */}
          <div className="desk" style={{ display:"flex", alignItems:"center", gap:"2rem" }}>
            {NAV.map(n => (
              <Link key={n.h} href={n.h} style={{ fontSize:".82rem", fontWeight:600, color:C.mid, textDecoration:"none", transition:"color .2s" }}
                onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.color=C.forest}
                onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.color=C.mid}>
                {n.l}
              </Link>
            ))}
            <button className="btn-green" onClick={() => setShowBook(true)} style={{ padding:".52rem 1.4rem", fontSize:".78rem" }}>
              Book Appointment
            </button>
          </div>

          {/* Mobile */}
          <button className="mob-menu-btn" onClick={() => setMenuOpen(!menuOpen)}
            style={{ display:"none", flexDirection:"column", gap:5, background:"none", border:`1.5px solid ${C.parch}`, borderRadius:8, padding:".4rem .6rem", cursor:"pointer" }}>
            {[0,1,2].map(i => <span key={i} style={{ width:22,height:1.5,background:C.forest,display:"block" }} />)}
          </button>
        </div>
        {menuOpen && (
          <div style={{ background:C.cream, borderTop:`1px solid ${C.parch}`, padding:"1.5rem 2rem", display:"flex", flexDirection:"column", gap:"1rem" }}>
            {NAV.map(n => <Link key={n.h} href={n.h} onClick={() => setMenuOpen(false)} style={{ color:C.mid, textDecoration:"none", fontSize:".9rem", fontWeight:600, padding:".5rem 0", borderBottom:`1px solid ${C.parch}` }}>{n.l}</Link>)}
            <button className="btn-green" onClick={() => { setMenuOpen(false); setShowBook(true); }} style={{ justifyContent:"center" }}>Book Appointment</button>
          </div>
        )}
      </nav>

      {/* ── HERO ── */}
      <section style={{ position:"relative", background:C.cream, overflow:"hidden", minHeight:"92vh", display:"flex", alignItems:"center" }}>

        {/* Organic blob backgrounds */}
        <BlobShape color="rgba(126,168,80,.08)" style={{ position:"absolute", width:600,height:600, top:"-15%",left:"-8%", animation:"blobDrift 18s ease-in-out infinite" }} />
        <BlobShape color="rgba(91,126,107,.06)" style={{ position:"absolute", width:400,height:400, bottom:"5%",right:"5%", animation:"blobDrift 22s ease-in-out infinite reverse" }} />

        {/* Leaf watermark */}
        <div className="desk" style={{ position:"absolute", right:"-5%", top:"50%", transform:"translateY(-50%)", fontSize:"40vw", color:"rgba(45,80,22,.025)", lineHeight:1, pointerEvents:"none", userSelect:"none" }}>🌿</div>

        <div style={{ position:"relative", zIndex:2, maxWidth:1400, margin:"0 auto", padding:"6rem 2.5rem 5rem", width:"100%" }} className="hero-pad">
          <div className="hero-grid" style={{ display:"flex", gap:"4rem", alignItems:"center" }}>

            {/* Left */}
            <div style={{ flex:"0 0 54%" }}>
              {/* Eyebrow pill */}
              <div className="ha1" style={{ display:"inline-flex", alignItems:"center", gap:10, background:`${C.sage}15`, border:`1px solid ${C.sage}30`, borderRadius:100, padding:".4rem 1.2rem", marginBottom:"2rem" }}>
                <span style={{ fontSize:".65rem" }}>🌿</span>
                <span style={{ fontSize:".62rem", fontWeight:700, letterSpacing:".18em", textTransform:"uppercase", color:C.sage }}>Kompally · North Hyderabad · Est. 2013</span>
              </div>

              <h1 className="ha2 hero-title serif" style={{ fontFamily:"'Gilda Display',serif", fontSize:"clamp(3.2rem,6vw,6.5rem)", lineHeight:1.05, color:C.forest, marginBottom:"1.2rem" }}>
                Healthcare<br />
                <span style={{ color:C.sage, fontStyle:"italic" }}>grown from</span><br />
                the heart.
              </h1>

              <div className="ha3" style={{ marginBottom:"1.8rem" }}>
                <LeafDivider color={C.sand} />
              </div>

              <p className="ha3" style={{ fontSize:"1.05rem", color:C.mid, lineHeight:1.85, maxWidth:500, marginBottom:"2.8rem" }}>
                For over a decade, Srikara Kompally has been North Hyderabad's most trusted partner in health. We believe care should feel as natural as breathing — expert, warm and deeply personal.
              </p>

              <div className="ha4" style={{ display:"flex", gap:"1rem", flexWrap:"wrap" }}>
                <button className="btn-green" onClick={() => setShowBook(true)}>🌿 Book Appointment</button>
                <a href="tel:040-4856-2200" className="btn-outline-green">🚑 Emergency Line</a>
              </div>

              {/* Cert badges */}
              <div className="ha5" style={{ display:"flex", gap:".8rem", flexWrap:"wrap", marginTop:"2.5rem", paddingTop:"2rem", borderTop:`1px solid ${C.parch}` }}>
                {[{t:"NABH",c:C.sage},{t:"ISO 9001",c:C.clay},{t:"NABL Lab",c:C.blue},{t:"100+ Insurers",c:C.sand}].map(b => (
                  <span key={b.t} style={{ fontSize:".62rem", fontWeight:700, letterSpacing:".14em", textTransform:"uppercase", color:b.c, border:`1.5px solid ${b.c}40`, borderRadius:100, padding:".28rem .9rem", background:`${b.c}08` }}>{b.t}</span>
                ))}
              </div>
            </div>

            {/* Right — Image collage */}
            <div className="ha3 hero-img-col" style={{ flex:1, position:"relative" }}>
              {/* Main circle image */}
              <div style={{ width:"100%", maxWidth:440, position:"relative" }}>
                <div style={{ width:"100%", paddingBottom:"100%", borderRadius:"60% 40% 50% 50% / 50% 50% 60% 40%", overflow:"hidden", position:"relative", boxShadow:`0 40px 80px rgba(45,80,22,.15)` }}>
                  <img src={IMG.hero} alt="Srikara Kompally" style={{ position:"absolute", inset:0, width:"100%", height:"100%", objectFit:"cover", objectPosition:"center" }} />
                  <div style={{ position:"absolute", inset:0, background:`linear-gradient(180deg,transparent 40%,rgba(45,80,22,.4) 100%)` }} />
                </div>

                {/* Floating stat */}
                <div style={{ position:"absolute", bottom:40, left:-20, background:C.white, borderRadius:16, padding:"1.1rem 1.4rem", boxShadow:"0 12px 40px rgba(45,80,22,.12)", border:`1px solid ${C.parch}`, animation:"leafFloat 5s ease-in-out infinite" }}>
                  <p className="serif" style={{ fontSize:"2rem", color:C.forest, lineHeight:1 }}>11+</p>
                  <p style={{ fontSize:".62rem", fontWeight:700, color:C.mid, letterSpacing:".12em", textTransform:"uppercase", marginTop:3 }}>Years of care</p>
                </div>

                {/* Floating rating */}
                <div style={{ position:"absolute", top:30, right:-20, background:C.white, borderRadius:16, padding:"1rem 1.3rem", boxShadow:"0 12px 40px rgba(45,80,22,.12)", border:`1px solid ${C.parch}`, animation:"leafFloat 6s ease-in-out infinite 1s" }}>
                  <div style={{ display:"flex", gap:2, marginBottom:3 }}>{[1,2,3,4,5].map(i => <span key={i} style={{ color:"#F59E0B", fontSize:".9rem" }}>★</span>)}</div>
                  <p style={{ fontSize:".62rem", fontWeight:700, color:C.mid }}>4.9 / 5.0 rating</p>
                  <p style={{ fontSize:".55rem", color:C.light }}>48,000+ patients</p>
                </div>

                {/* Small nature accent image */}
                <div style={{ position:"absolute", top:-24, right:60, width:80, height:80, borderRadius:"50%", overflow:"hidden", border:`3px solid ${C.white}`, boxShadow:"0 8px 24px rgba(45,80,22,.12)" }}>
                  <img src={IMG.nature2} alt="" style={{ width:"100%", height:"100%", objectFit:"cover" }} />
                </div>
              </div>
            </div>
          </div>

          {/* Stats row */}
          <div className="ha6 stats-grid" style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:1, background:C.parch, marginTop:"4rem", borderRadius:16, overflow:"hidden" }}>
            {STATS.map((s,i) => (
              <div key={i} style={{ background:C.cream, padding:"1.8rem 1.5rem", textAlign:"center", borderLeft: i>0?`1px solid ${C.parch}`:"none" }}>
                <p className="serif" style={{ fontSize:"2.2rem", color:C.forest, lineHeight:1 }}>{s.n}</p>
                <p style={{ fontSize:".82rem", fontWeight:800, color:C.sage, marginTop:4 }}>{s.l}</p>
                <p style={{ fontSize:".7rem", color:C.light, marginTop:2 }}>{s.s}</p>
              </div>
            ))}
          </div>
        </div>

        <WaveBottom fill={C.warm} />
      </section>

      {/* ── MARQUEE ── */}
      <div style={{ background:C.warm, padding:".8rem 0", overflow:"hidden", whiteSpace:"nowrap", borderTop:`1px solid ${C.parch}`, borderBottom:`1px solid ${C.parch}` }}>
        <div style={{ display:"inline-flex", gap:"3rem", animation:"marquee 35s linear infinite" }}>
          {Array(3).fill(["Advanced Cardiac Care 🌿","Joint Replacement 🌿","High-Risk Obstetrics 🌿","IVF & Fertility 🌿","Level III NICU 🌿","Stroke Unit 🌿","3T MRI & CT 🌿","24/7 Emergency 🌿","NABH Accredited 🌿","Physiotherapy 🌿","NABL Laboratory 🌿","Robotic Surgery 🌿"]).flat().map((t,i) => (
            <span key={i} style={{ fontSize:".68rem", fontWeight:700, letterSpacing:".16em", textTransform:"uppercase", color:C.sage }}>{t}</span>
          ))}
        </div>
      </div>

      {/* ── ABOUT & TIMELINE ── */}
      <section id="about" className="sec" style={{ background:C.warm, padding:"8rem 2.5rem", position:"relative" }}>
        <BlobShape color="rgba(91,126,107,.05)" style={{ position:"absolute", width:400, height:400, top:"-10%", right:"-5%", animation:"blobDrift 20s ease-in-out infinite" }} />

        <div style={{ maxWidth:1400, margin:"0 auto" }}>
          <Fade>
            <div style={{ textAlign:"center", marginBottom:"5rem" }}>
              <span style={{ fontSize:".65rem", fontWeight:700, letterSpacing:".24em", textTransform:"uppercase", color:C.sage, display:"block", marginBottom:".8rem" }}>Our Story</span>
              <h2 className="serif" style={{ fontFamily:"'Gilda Display',serif", fontSize:"clamp(2rem,4vw,3.8rem)", color:C.forest, lineHeight:1.15 }}>
                A decade of healing,<br /><em>one family at a time.</em>
              </h2>
              <div style={{ marginTop:"1.5rem" }}><LeafDivider color={C.sage} /></div>
            </div>
          </Fade>

          <div style={{ display:"flex", gap:"5rem", alignItems:"flex-start", flexWrap:"wrap" }}>

            {/* Left — About image */}
            <Fade s={{ flex:"0 0 40%", minWidth:260 }}>
              <div style={{ position:"relative" }}>
                <div style={{ borderRadius:"12px 40px 12px 40px", overflow:"hidden", boxShadow:`0 32px 80px rgba(45,80,22,.12)` }}>
                  <img src={IMG.about} alt="Srikara Kompally Hospital" style={{ width:"100%", height:440, objectFit:"cover", display:"block" }} />
                  <div style={{ position:"absolute", inset:0, background:"linear-gradient(180deg,transparent 50%,rgba(45,80,22,.4) 100%)" }} />
                </div>
                {/* Overlapping small image */}
                <div style={{ position:"absolute", bottom:-28, right:-28, width:160, height:140, borderRadius:"24px", overflow:"hidden", border:`4px solid ${C.white}`, boxShadow:"0 12px 40px rgba(45,80,22,.15)" }}>
                  <img src={IMG.waiting} alt="Reception" style={{ width:"100%", height:"100%", objectFit:"cover" }} />
                </div>
                {/* Badge */}
                <div style={{ position:"absolute", top:24, left:24, background:C.sage, borderRadius:12, padding:".9rem 1.2rem", boxShadow:"0 8px 24px rgba(91,126,107,.35)" }}>
                  <p className="serif" style={{ fontSize:"1.6rem", color:"#fff", lineHeight:1 }}>NABH</p>
                  <p style={{ fontSize:".58rem", fontWeight:700, color:"rgba(255,255,255,.75)", letterSpacing:".12em", textTransform:"uppercase", marginTop:2 }}>Accredited</p>
                </div>
              </div>
            </Fade>

            {/* Right — Timeline */}
            <Fade d={150} s={{ flex:1 }}>
              <p style={{ fontSize:".65rem", fontWeight:700, letterSpacing:".24em", textTransform:"uppercase", color:C.sage, marginBottom:"2.5rem" }}>Our Journey</p>
              <div style={{ position:"relative" }}>
                {/* Vertical line */}
                <div style={{ position:"absolute", left:20, top:0, bottom:0, width:2, background:`linear-gradient(180deg,${C.sage},${C.lime},${C.sand})`, borderRadius:2 }} />

                {TIMELINE.map((tl, i) => (
                  <Fade key={tl.year} d={i*80}>
                    <div className="tl-row" style={{ display:"flex", gap:"1.5rem", marginBottom:"2.5rem", alignItems:"flex-start" }}>
                      {/* Dot */}
                      <div style={{ position:"relative", flexShrink:0, width:42 }}>
                        <div style={{ width:42, height:42, borderRadius:"50%", background: i===TIMELINE.length-1?C.sage:C.cream, border:`2px solid ${C.sage}`, display:"flex", alignItems:"center", justifyContent:"center", position:"relative", zIndex:1 }}>
                          <div style={{ width:10, height:10, borderRadius:"50%", background: i===TIMELINE.length-1?"#fff":C.sage }} />
                        </div>
                      </div>
                      {/* Content */}
                      <div style={{ flex:1, paddingTop:8 }}>
                        <span style={{ fontSize:".62rem", fontWeight:800, color:C.sage, letterSpacing:".18em", textTransform:"uppercase" }}>{tl.year}</span>
                        <h4 className="serif" style={{ fontFamily:"'Gilda Display',serif", fontSize:"1.15rem", color:C.forest, margin:".25rem 0 .5rem" }}>{tl.title}</h4>
                        <p style={{ fontSize:".85rem", color:C.mid, lineHeight:1.7 }}>{tl.desc}</p>
                      </div>
                    </div>
                  </Fade>
                ))}
              </div>
            </Fade>
          </div>
        </div>

        <WaveBottom fill={C.cream} />
      </section>

      {/* ── SPECIALITIES ── */}
      <section id="specialities" className="sec" style={{ background:C.cream, padding:"8rem 2.5rem" }}>
        <div style={{ maxWidth:1400, margin:"0 auto" }}>
          <Fade>
            <div style={{ textAlign:"center", marginBottom:"4rem" }}>
              <span style={{ fontSize:".65rem", fontWeight:700, letterSpacing:".24em", textTransform:"uppercase", color:C.sage, display:"block", marginBottom:".8rem" }}>What We Treat</span>
              <h2 className="serif" style={{ fontFamily:"'Gilda Display',serif", fontSize:"clamp(2rem,4vw,3.8rem)", color:C.forest, lineHeight:1.15 }}>
                Specialities centred<br /><em>around you.</em>
              </h2>
            </div>
          </Fade>

          <div className="spec-layout" style={{ display:"flex", gap:0, border:`1px solid ${C.parch}`, borderRadius:16, overflow:"hidden" }}>

            {/* Tab list */}
            <div className="spec-tabs-col" style={{ width:220, flexShrink:0, borderRight:`1px solid ${C.parch}`, display:"flex", flexDirection:"column" }}>
              {SPECIALITIES.map((s,i) => (
                <div key={s.name} className={`spec-tab${activeSpec===i?" active":""}`}
                  onClick={() => setActiveSpec(i)}
                  style={{ padding:"1.3rem 1.5rem", background:C.cream, borderBottom:`1px solid ${C.parch}`, cursor:"pointer" }}>
                  <div style={{ display:"flex", alignItems:"center", gap:".7rem" }}>
                    <span style={{ fontSize:"1.1rem" }}>{s.icon}</span>
                    <span style={{ fontSize:".85rem", fontWeight: activeSpec===i?700:500, color: activeSpec===i?C.forest:C.mid, lineHeight:1.25 }}>{s.name}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Panel */}
            <div style={{ flex:1, background:C.warm, position:"relative", overflow:"hidden" }}>
              {/* Photo */}
              <div style={{ height:260, overflow:"hidden", position:"relative" }}>
                <img key={activeSpec} src={SPECIALITIES[activeSpec].img} alt={SPECIALITIES[activeSpec].name}
                  style={{ width:"100%", height:"100%", objectFit:"cover", animation:"scaleIn .5s ease", display:"block" }} />
                <div style={{ position:"absolute", inset:0, background:"linear-gradient(180deg,transparent 30%,rgba(45,80,22,.6) 100%)" }} />
                <div style={{ position:"absolute", bottom:"1.5rem", left:"2rem" }}>
                  <span style={{ fontSize:".58rem", fontWeight:700, letterSpacing:".18em", textTransform:"uppercase", color:"rgba(250,248,243,.7)", display:"block", marginBottom:".3rem" }}>{SPECIALITIES[activeSpec].tag}</span>
                  <h3 className="serif" style={{ fontFamily:"'Gilda Display',serif", fontSize:"1.8rem", color:"#FAF8F3" }}>{SPECIALITIES[activeSpec].name}</h3>
                </div>
              </div>

              {/* Body */}
              <div style={{ padding:"2rem 2.5rem" }} key={activeSpec+"b"}>
                <p style={{ fontSize:".95rem", color:C.mid, lineHeight:1.85, marginBottom:"1.5rem" }}>{SPECIALITIES[activeSpec].desc}</p>
                <div style={{ display:"flex", flexWrap:"wrap", gap:".6rem", marginBottom:"2rem" }}>
                  {SPECIALITIES[activeSpec].list.map(t => (
                    <span key={t} style={{ fontSize:".72rem", fontWeight:600, color:SPECIALITIES[activeSpec].color, background:`${SPECIALITIES[activeSpec].color}10`, border:`1px solid ${SPECIALITIES[activeSpec].color}30`, borderRadius:100, padding:".3rem .9rem" }}>{t}</span>
                  ))}
                </div>
                <button className="btn-green" onClick={() => setShowBook(true)} style={{ fontSize:".78rem", padding:".65rem 1.6rem" }}>Book Consultation →</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── DOCTORS ── */}
      <section id="doctors" className="sec" style={{ background:C.warm, padding:"8rem 2.5rem", position:"relative" }}>
        <BlobShape color="rgba(126,168,80,.06)" style={{ position:"absolute", width:350, height:350, bottom:"-5%", left:"-5%", animation:"blobDrift 16s ease-in-out infinite" }} />

        <div style={{ maxWidth:1400, margin:"0 auto" }}>
          <Fade>
            <div style={{ display:"flex", alignItems:"flex-end", justifyContent:"space-between", marginBottom:"4rem", flexWrap:"wrap", gap:"2rem" }}>
              <div>
                <span style={{ fontSize:".65rem", fontWeight:700, letterSpacing:".24em", textTransform:"uppercase", color:C.sage, display:"block", marginBottom:".8rem" }}>Our Physicians</span>
                <h2 className="serif" style={{ fontFamily:"'Gilda Display',serif", fontSize:"clamp(2rem,4vw,3.8rem)", color:C.forest, lineHeight:1.15 }}>
                  Specialists who<br /><em>genuinely listen.</em>
                </h2>
              </div>
              <Link href="#" style={{ fontSize:".82rem", fontWeight:700, color:C.sage, textDecoration:"none", borderBottom:`1.5px solid ${C.sage}`, paddingBottom:2 }}>All 36 Specialists →</Link>
            </div>
          </Fade>

          <div className="doc-grid" style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:"1.5rem" }}>
            {DOCTORS.map((d,i) => (
              <Fade key={d.name} d={i*60}>
                <div className="doc-card" style={{ background:C.cream, borderRadius:20, border:`1px solid ${C.parch}`, boxShadow:`0 4px 20px rgba(45,80,22,.05)`, cursor:"pointer" }}>
                  {/* Colour band */}
                  <div style={{ height:4, background:`linear-gradient(90deg,${d.color},${d.color}90)`, borderRadius:"20px 20px 0 0" }} />
                  {/* Photo */}
                  <div style={{ height:220, overflow:"hidden", position:"relative" }}>
                    <img src={d.img} alt={d.name} style={{ width:"100%", height:"100%", objectFit:"cover", objectPosition:"center top", display:"block" }} />
                    <div style={{ position:"absolute", inset:0, background:"linear-gradient(180deg,transparent 55%,rgba(45,80,22,.55) 100%)" }} />
                    <div style={{ position:"absolute", bottom:"1rem", left:"1rem" }}>
                      <span style={{ background:`${d.color}`, color:"#fff", fontSize:".6rem", fontWeight:700, letterSpacing:".1em", textTransform:"uppercase", padding:".25rem .7rem", borderRadius:100 }}>{d.exp} yrs exp</span>
                    </div>
                  </div>
                  {/* Info */}
                  <div style={{ padding:"1.4rem" }}>
                    <p className="serif" style={{ fontFamily:"'Gilda Display',serif", fontSize:"1.05rem", color:C.forest, marginBottom:".25rem", lineHeight:1.25 }}>{d.name}</p>
                    <p style={{ fontSize:".72rem", fontWeight:700, color:d.color, marginBottom:".5rem" }}>{d.role}</p>
                    <p style={{ fontSize:".72rem", color:C.mid, lineHeight:1.55, marginBottom:"1rem" }}>{d.qual}</p>
                    <div style={{ paddingTop:".8rem", borderTop:`1px solid ${C.parch}`, display:"flex", alignItems:"center", justifyContent:"space-between" }}>
                      <p style={{ fontSize:".7rem", color:C.light }}>{d.avail}</p>
                      <button onClick={() => setShowBook(true)} className="btn-green" style={{ fontSize:".65rem", padding:".35rem 1rem" }}>Book →</button>
                    </div>
                  </div>
                </div>
              </Fade>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section style={{ background:C.forest, padding:"8rem 2.5rem", position:"relative", overflow:"hidden" }}>
        {/* Leaf pattern bg */}
        <div style={{ position:"absolute", inset:0, backgroundImage:`url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M40 10 C20 10 10 30 10 40 C10 40 25 35 40 35 C55 35 70 40 70 40 C70 30 60 10 40 10 Z' fill='%23FAF8F3' opacity='.03'/%3E%3C/svg%3E")`, backgroundSize:"80px 80px", pointerEvents:"none" }} />

        <div style={{ maxWidth:880, margin:"0 auto", textAlign:"center", position:"relative", zIndex:1 }}>
          <Fade>
            <span style={{ fontSize:".65rem", fontWeight:700, letterSpacing:".24em", textTransform:"uppercase", color:`${C.lime}90`, display:"block", marginBottom:"1rem" }}>Patient Stories</span>
            <h2 className="serif" style={{ fontFamily:"'Gilda Display',serif", fontSize:"clamp(2rem,4vw,3.5rem)", color:"#FAF8F3", lineHeight:1.2, marginBottom:"1rem" }}>
              Stories of healing.
            </h2>
            <div style={{ marginBottom:"4rem" }}><LeafDivider color={`${C.sand}80`} /></div>
          </Fade>

          {/* Carousel */}
          <div style={{ position:"relative", minHeight:320 }}>
            {TESTIMONIALS.map((t,i) => (
              <div key={i} style={{ position: i===activeTest?"relative":"absolute", inset:0, opacity: i===activeTest?1:0, transform: i===activeTest?"none":"translateY(14px)", transition:"all .7s ease", pointerEvents: i===activeTest?"auto":"none" }}>
                <div className="test-inner" style={{ background:"rgba(250,248,243,.06)", border:"1px solid rgba(250,248,243,.1)", borderRadius:"12px 40px 12px 40px", padding:"3rem", backdropFilter:"blur(12px)", position:"relative" }}>
                  {/* Quote mark */}
                  <div className="serif" style={{ fontFamily:"'Gilda Display',serif", fontSize:"5rem", color:`${C.lime}20`, lineHeight:1, marginBottom:"1rem" }}>"</div>

                  <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:"1.5rem", flexWrap:"wrap", gap:".8rem" }}>
                    <span style={{ fontSize:".62rem", fontWeight:700, letterSpacing:".16em", textTransform:"uppercase", color:`${C.lime}80`, background:`${C.lime}10`, border:`1px solid ${C.lime}25`, borderRadius:100, padding:".25rem .8rem" }}>{t.dept}</span>
                    <span style={{ color:"#F59E0B", letterSpacing:2 }}>★★★★★</span>
                  </div>

                  <p className="serif" style={{ fontFamily:"'Gilda Display',serif", fontSize:"clamp(1.1rem,2vw,1.4rem)", color:"rgba(250,248,243,.88)", lineHeight:1.75, fontStyle:"italic", marginBottom:"2.5rem" }}>{t.quote}</p>

                  <div style={{ display:"flex", alignItems:"center", gap:"1rem" }}>
                    <div style={{ width:52, height:52, borderRadius:"50%", overflow:"hidden", border:`2px solid ${C.sage}40`, flexShrink:0 }}>
                      <img src={t.img} alt={t.name} style={{ width:"100%", height:"100%", objectFit:"cover" }} />
                    </div>
                    <div style={{ textAlign:"left" }}>
                      <p style={{ fontWeight:700, color:"#FAF8F3", fontSize:".9rem" }}>{t.name}</p>
                      <p style={{ fontSize:".68rem", color:"rgba(250,248,243,.45)", marginTop:2 }}>{t.area}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ display:"flex", justifyContent:"center", gap:".5rem", marginTop:"2.5rem" }}>
            {TESTIMONIALS.map((_,i) => (
              <button key={i} onClick={() => setActiveTest(i)}
                style={{ width: i===activeTest?32:8, height:3, background: i===activeTest?C.lime:"rgba(250,248,243,.2)", border:"none", cursor:"pointer", transition:"all .35s", borderRadius:2, padding:0 }} />
            ))}
          </div>
        </div>
      </section>

      {/* ── FACILITIES ── */}
      <section id="facilities" className="sec" style={{ background:C.cream, padding:"8rem 2.5rem" }}>
        <div style={{ maxWidth:1400, margin:"0 auto" }}>
          <Fade>
            <div style={{ textAlign:"center", marginBottom:"4rem" }}>
              <span style={{ fontSize:".65rem", fontWeight:700, letterSpacing:".24em", textTransform:"uppercase", color:C.sage, display:"block", marginBottom:".8rem" }}>Infrastructure</span>
              <h2 className="serif" style={{ fontFamily:"'Gilda Display',serif", fontSize:"clamp(2rem,4vw,3.8rem)", color:C.forest, lineHeight:1.15 }}>
                Modern care,<br /><em>naturally designed.</em>
              </h2>
            </div>
          </Fade>

          <div className="fac-grid" style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:"1.5rem" }}>
            {FACILITIES.map((f,i) => (
              <Fade key={f.name} d={i*70}>
                <div className="fac-card" style={{ background:C.warm, borderRadius:"12px 32px 12px 32px", border:`1px solid ${C.parch}`, overflow:"hidden", boxShadow:`0 4px 20px rgba(45,80,22,.05)` }}>
                  <div style={{ height:200, overflow:"hidden", position:"relative" }}>
                    <img src={f.img} alt={f.name} style={{ width:"100%", height:"100%", objectFit:"cover", display:"block" }} />
                    <div style={{ position:"absolute", inset:0, background:"linear-gradient(180deg,transparent 40%,rgba(45,80,22,.55) 100%)" }} />
                    <span style={{ position:"absolute", top:"1rem", right:"1rem", background:C.sage, color:"#fff", fontSize:".6rem", fontWeight:700, letterSpacing:".1em", textTransform:"uppercase", padding:".25rem .7rem", borderRadius:100 }}>{f.tag}</span>
                  </div>
                  <div style={{ padding:"1.6rem" }}>
                    <h3 className="serif" style={{ fontFamily:"'Gilda Display',serif", fontSize:"1.1rem", color:C.forest, marginBottom:".6rem" }}>{f.name}</h3>
                    <p style={{ fontSize:".82rem", color:C.mid, lineHeight:1.75 }}>{f.desc}</p>
                  </div>
                </div>
              </Fade>
            ))}
          </div>

          {/* Mini quick-fact strip */}
          <Fade d={200}>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:1, background:C.parch, borderRadius:16, overflow:"hidden", marginTop:"3rem" }}>
              {[
                { icon:"🌿", l:"Green Hospital", s:"Sustainable design & energy practices" },
                { icon:"🅿️", l:"Free Parking", s:"Ample covered parking for patients" },
                { icon:"🍽️", l:"In-House Cafeteria", s:"Healthy meals for patients & families" },
                { icon:"📱", l:"Digital Records", s:"Paperless health records & reports" },
              ].map((f,i) => (
                <div key={i} style={{ background:C.cream, padding:"1.5rem 1.2rem", textAlign:"center", display:"flex", flexDirection:"column", alignItems:"center", gap:".5rem" }}>
                  <span style={{ fontSize:"1.6rem" }}>{f.icon}</span>
                  <p style={{ fontSize:".82rem", fontWeight:700, color:C.forest }}>{f.l}</p>
                  <p style={{ fontSize:".7rem", color:C.light, lineHeight:1.4 }}>{f.s}</p>
                </div>
              ))}
            </div>
          </Fade>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" className="sec" style={{ background:C.warm, padding:"8rem 2.5rem", position:"relative", overflow:"hidden" }}>
        <BlobShape color="rgba(91,126,107,.06)" style={{ position:"absolute", width:500, height:500, top:"-20%", right:"-10%", animation:"blobDrift 25s ease-in-out infinite" }} />

        <div style={{ maxWidth:1400, margin:"0 auto" }}>
          <Fade>
            <div style={{ textAlign:"center", marginBottom:"4rem" }}>
              <span style={{ fontSize:".65rem", fontWeight:700, letterSpacing:".24em", textTransform:"uppercase", color:C.sage, display:"block", marginBottom:".8rem" }}>Come Visit Us</span>
              <h2 className="serif" style={{ fontFamily:"'Gilda Display',serif", fontSize:"clamp(2rem,4vw,3.8rem)", color:C.forest, lineHeight:1.15 }}>
                Srikara Kompally<br /><em>is always here for you.</em>
              </h2>
            </div>
          </Fade>

          <div className="contact-cols" style={{ display:"flex", gap:"4rem", flexWrap:"wrap" }}>

            {/* Info card */}
            <Fade s={{ flex:"0 0 40%", minWidth:260 }}>
              <div style={{ background:C.cream, borderRadius:"12px 32px 12px 32px", border:`1px solid ${C.parch}`, overflow:"hidden", boxShadow:`0 8px 40px rgba(45,80,22,.08)` }}>
                <div style={{ height:3, background:`linear-gradient(90deg,${C.forest},${C.sage},${C.lime})` }} />
                <div style={{ padding:"2.5rem" }}>
                  {[
                    { icon:"📍", l:"Address", v:"Survey No. 47, Kompally\nHyderabad – 500014, Telangana" },
                    { icon:"🚨", l:"Emergency (24/7)", v:"040-4856-2200" },
                    { icon:"📞", l:"Appointments", v:"040-4856-2300" },
                    { icon:"✉️", l:"Email", v:"kompally@srikarahospitals.in" },
                    { icon:"🕐", l:"OPD Hours", v:"Mon – Sat · 8:00 AM – 8:00 PM" },
                  ].map((c,i) => (
                    <div key={c.l} style={{ display:"flex", gap:"1rem", paddingBottom:"1.2rem", marginBottom: i<4?"1.2rem":0, borderBottom: i<4?`1px solid ${C.parch}`:"none" }}>
                      <span style={{ fontSize:"1.2rem", flexShrink:0, marginTop:2 }}>{c.icon}</span>
                      <div>
                        <p style={{ fontSize:".58rem", fontWeight:700, letterSpacing:".16em", textTransform:"uppercase", color:C.sage, marginBottom:".3rem" }}>{c.l}</p>
                        <p style={{ fontSize:".9rem", fontWeight:600, color:C.forest, whiteSpace:"pre-line", lineHeight:1.6 }}>{c.v}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Fade>

            {/* Branches */}
            <Fade d={100} s={{ flex:1 }}>
              <p style={{ fontSize:".65rem", fontWeight:700, letterSpacing:".24em", textTransform:"uppercase", color:C.sage, marginBottom:"1rem" }}>Our Network</p>
              <h3 className="serif" style={{ fontFamily:"'Gilda Display',serif", fontSize:"1.8rem", color:C.forest, lineHeight:1.1, marginBottom:"2rem" }}>Other Srikara Branches</h3>

              <div className="branch-grid" style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:1, background:C.parch, borderRadius:12, overflow:"hidden", marginBottom:"2rem" }}>
                {BRANCHES.map(b => (
                  <Link key={b} href={`/hospitals/${b.toLowerCase().replace(/ /g,"-")}`}
                    style={{ background:C.cream, padding:"1rem 1.1rem", textDecoration:"none", display:"flex", alignItems:"center", justifyContent:"space-between", transition:"background .2s", borderLeft:"2px solid transparent" }}
                    onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background=C.warm; (e.currentTarget as HTMLAnchorElement).style.borderLeftColor=C.sage; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background=C.cream; (e.currentTarget as HTMLAnchorElement).style.borderLeftColor="transparent"; }}>
                    <span style={{ fontSize:".78rem", fontWeight:600, color:C.mid }}>{b}</span>
                    <span style={{ fontSize:".7rem", color:C.sage }}>→</span>
                  </Link>
                ))}
              </div>

              <Link href="/" style={{ display:"inline-flex", alignItems:"center", gap:8, fontSize:".78rem", fontWeight:700, color:C.sage, textDecoration:"none", borderBottom:`1.5px solid ${C.sage}40`, paddingBottom:2 }}
                onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.borderBottomColor=C.sage}
                onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.borderBottomColor=`${C.sage}40`}>
                ← Back to Main Srikara Website
              </Link>
            </Fade>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ background:C.forest }}>
        <div style={{ height:3, background:`linear-gradient(90deg,${C.lime},${C.sage},${C.lime})` }} />
        <div style={{ maxWidth:1400, margin:"0 auto", padding:"2rem 2.5rem" }}>
          <div className="footer-cols" style={{ display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:"1rem" }}>
            <div style={{ display:"flex", alignItems:"center", gap:12 }}>
              <div style={{ width:36, height:36, borderRadius:"50%", background:`${C.sage}40`, border:`1px solid ${C.sage}60`, display:"flex", alignItems:"center", justifyContent:"center" }}>
                <span className="serif" style={{ fontStyle:"italic", color:"#FAF8F3", fontSize:"1rem" }}>S</span>
              </div>
              <span style={{ fontSize:".68rem", color:"rgba(250,248,243,.35)", letterSpacing:".06em" }}>
                © {new Date().getFullYear()} Srikara Hospital – Kompally · Part of Srikara Hospital Group, Hyderabad
              </span>
            </div>
            <div style={{ display:"flex", gap:"2rem" }}>
              {["Privacy Policy","Terms of Use","Sitemap"].map(l => (
                <Link key={l} href="#" style={{ fontSize:".65rem", color:"rgba(250,248,243,.25)", textDecoration:"none", letterSpacing:".08em" }}>{l}</Link>
              ))}
            </div>
          </div>
        </div>
      </footer>

      {/* ── FLOATING BOOK BTN ── */}
      <button onClick={() => setShowBook(true)} className="btn-green"
        style={{ position:"fixed", bottom:"2rem", right:"2rem", zIndex:400, boxShadow:"0 8px 32px rgba(91,126,107,.45)", fontSize:".78rem" }}>
        🌿 Book Appointment
      </button>

      {/* ── APPOINTMENT MODAL WITH SLOT PICKER ── */}
      {showBook && (
        <div onClick={e => { if(e.target===e.currentTarget) { setShowBook(false); setSelectedSlot(""); } }}
          style={{ position:"fixed", inset:0, zIndex:900, background:"rgba(26,32,16,.7)", backdropFilter:"blur(16px)", display:"flex", alignItems:"center", justifyContent:"center", padding:"1rem" }}>
          <div style={{ width:"100%", maxWidth:660, maxHeight:"92vh", overflowY:"auto", borderRadius:24, background:C.cream, boxShadow:"0 40px 100px rgba(45,80,22,.3)", animation:"slideUp .3s ease" }}>

            {/* Header */}
            <div style={{ borderRadius:"24px 24px 0 0", overflow:"hidden" }}>
              <div style={{ height:4, background:`linear-gradient(90deg,${C.forest},${C.sage},${C.lime})` }} />
              <div style={{ padding:"2rem 2rem 1.5rem", background:C.warm, borderBottom:`1px solid ${C.parch}`, display:"flex", justifyContent:"space-between", alignItems:"flex-start" }}>
                <div>
                  <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:".5rem" }}>
                    <span style={{ fontSize:".9rem" }}>🌿</span>
                    <span style={{ fontSize:".6rem", fontWeight:700, letterSpacing:".18em", textTransform:"uppercase", color:C.sage }}>Srikara Hospital · Kompally</span>
                  </div>
                  <h3 className="serif" style={{ fontFamily:"'Gilda Display',serif", fontSize:"1.6rem", color:C.forest }}>Book Your Appointment</h3>
                  <p style={{ fontSize:".78rem", color:C.mid, marginTop:".3rem" }}>Confirmed within 30 minutes · Mon–Sat 8 AM – 8 PM</p>
                </div>
                <button onClick={() => { setShowBook(false); setSelectedSlot(""); }}
                  style={{ background:C.cream, border:`1px solid ${C.parch}`, borderRadius:"50%", width:36, height:36, display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer", color:C.mid, fontSize:"1rem", flexShrink:0 }}>✕</button>
              </div>
            </div>

            <form onSubmit={submit} style={{ padding:"2rem" }}>
              {/* Step 1 — Personal Info */}
              <p style={{ fontSize:".6rem", fontWeight:800, letterSpacing:".2em", textTransform:"uppercase", color:C.sage, marginBottom:"1rem" }}>Your Details</p>
              <div className="appt-grid" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"1rem", marginBottom:"1rem" }}>
                <div>
                  <label style={{ display:"block", fontSize:".68rem", fontWeight:700, color:C.mid, marginBottom:".5rem" }}>Full Name *</label>
                  <input className="input-field" type="text" placeholder="Your full name" value={form.name} onChange={e => setForm(p => ({...p,name:e.target.value}))} />
                </div>
                <div>
                  <label style={{ display:"block", fontSize:".68rem", fontWeight:700, color:C.mid, marginBottom:".5rem" }}>Mobile Number *</label>
                  <input className="input-field" type="tel" placeholder="+91 98765 43210" value={form.phone} onChange={e => setForm(p => ({...p,phone:e.target.value}))} />
                </div>
              </div>
              <div className="appt-grid" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"1rem", marginBottom:"1.5rem" }}>
                <div>
                  <label style={{ display:"block", fontSize:".68rem", fontWeight:700, color:C.mid, marginBottom:".5rem" }}>Department *</label>
                  <select className="input-field" value={form.dept} onChange={e => setForm(p => ({...p,dept:e.target.value}))}>
                    <option value="">Select department</option>
                    {SPECIALITIES.map(s => <option key={s.name}>{s.name}</option>)}
                    <option>General Medicine</option>
                    <option>Dermatology</option>
                    <option>ENT</option>
                  </select>
                </div>
                <div>
                  <label style={{ display:"block", fontSize:".68rem", fontWeight:700, color:C.mid, marginBottom:".5rem" }}>Preferred Date *</label>
                  <input className="input-field" type="date" value={form.date} onChange={e => setForm(p => ({...p,date:e.target.value}))} min={new Date().toISOString().split("T")[0]} />
                </div>
              </div>

              {/* Step 2 — Time Slot Picker */}
              <div style={{ marginBottom:"2rem" }}>
                <div style={{ background:C.warm, borderRadius:12, border:`1px solid ${C.parch}`, padding:"1.5rem" }}>
                  <p style={{ fontSize:".6rem", fontWeight:800, letterSpacing:".2em", textTransform:"uppercase", color:C.sage, marginBottom:"1.2rem" }}>Pick a Time Slot</p>
                  <div style={{ display:"flex", flexWrap:"wrap", gap:".6rem" }}>
                    {SLOTS.map(sl => (
                      <button key={sl} type="button" className={`slot-btn${selectedSlot===sl?" selected":""}`} onClick={() => setSelectedSlot(selectedSlot===sl?"":sl)}>
                        {sl}
                      </button>
                    ))}
                  </div>
                  {selectedSlot && (
                    <div style={{ marginTop:"1rem", display:"flex", alignItems:"center", gap:8, padding:".6rem 1rem", background:`${C.sage}12`, borderRadius:100, width:"fit-content" }}>
                      <span style={{ fontSize:".75rem" }}>✅</span>
                      <span style={{ fontSize:".75rem", fontWeight:700, color:C.sage }}>Selected: {selectedSlot}</span>
                    </div>
                  )}
                </div>
              </div>

              <button type="submit" className="btn-green" style={{ width:"100%", justifyContent:"center", padding:"1rem", fontSize:".9rem", background: sent?"#4A7C59":C.sage }}>
                {sent ? "🌿 Appointment Confirmed! We'll call you shortly." : "Confirm Appointment 🌿"}
              </button>
              <p style={{ textAlign:"center", fontSize:".72rem", color:C.light, marginTop:"1rem" }}>
                Walk-ins welcome · Or call <a href="tel:040-4856-2300" style={{ color:C.sage, fontWeight:700, textDecoration:"none" }}>040-4856-2300</a>
              </p>
            </form>
          </div>
        </div>
      )}
    </>
  );
}