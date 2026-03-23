"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

// ─── BRAND COLORS ─────────────────────────────────────────────────────────────
const N  = "#1B2A4A";
const ND = "#0F1E35";
const NL = "#2E4A7A";
const M  = "#B8246E";
const MD = "#8A1A52";
const ML = "#D4408A";

// ── IMAGES ─────────────────────────────────────────────────────────────────────
const IMG = {
  hero:    "https://images.unsplash.com/photo-1504813184591-01572f98c85f?w=1600&q=85",
  about:   "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=900&q=85",
  cardio:  "https://images.unsplash.com/photo-1628348068343-c6a848d2b6dd?w=700&q=85",
  ortho:   "https://images.unsplash.com/photo-1530026186672-2cd00ffc50fe?w=700&q=85",
  gynae:   "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=700&q=85",
  paeds:   "https://images.unsplash.com/photo-1576765607924-3f7b8410a787?w=700&q=85",
  neuro:   "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=700&q=85",
  diag:    "https://images.unsplash.com/photo-1579154204601-01588f351e67?w=700&q=85",
  icu:     "https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?w=700&q=85",
  waiting: "https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=700&q=85",
  doc1:    "https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=500&q=85",
  doc2:    "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=500&q=85",
  doc3:    "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=500&q=85",
  doc4:    "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=500&q=85",
  doc5:    "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=500&q=85",
  doc6:    "https://images.unsplash.com/photo-1651008376811-b90baee60c1f?w=500&q=85",
  nature2: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=400&q=80",
};

// ── DATA ──────────────────────────────────────────────────────────────────────
const NAV = [
  { l:"Home",        h:"#"             },
  { l:"Doctors",     h:"#doctors"      },
  { l:"Departments", h:"#specialities" },
];

const STATS = [
  { n:"11+",  l:"Years",       s:"Serving North Hyderabad", color: N },
  { n:"36+",  l:"Specialists", s:"Across all departments",  color: M },
  { n:"48k+", l:"Families",    s:"Who trust us",            color: N },
  { n:"240",  l:"Beds",        s:"Across all wings",        color: M },
];

const SPECIALITIES = [
  { name:"Cardiology",               tag:"Heart & Vascular",      img:IMG.cardio, icon:"🫀", accent:N,
    desc:"Comprehensive cardiac care including cath lab, angioplasty, echocardiography and cardiac rehabilitation.",
    list:["Cardiac Cath Lab","Angioplasty & Stenting","ECG & Echo","Cardiac Rehab"] },
  { name:"Orthopaedics",             tag:"Bone & Joint",          img:IMG.ortho,  icon:"🦴", accent:M,
    desc:"Joint replacement, arthroscopy, sports medicine, fracture management and complete spine care.",
    list:["Joint Replacement","Arthroscopy","Spine Surgery","Sports Medicine"] },
  { name:"Obstetrics & Gynaecology", tag:"Women's Health",        img:IMG.gynae,  icon:"👶", accent:N,
    desc:"High-risk obstetrics, IVF fertility clinic, minimally invasive gynaec surgery and complete maternal care.",
    list:["High-Risk OB","IVF & Fertility","Laparoscopy","Neonatal Care"] },
  { name:"Paediatrics & NICU",       tag:"Child Health",          img:IMG.paeds,  icon:"🩺", accent:M,
    desc:"Level III NICU, paediatric surgery, child development, vaccination clinics and adolescent medicine.",
    list:["Level III NICU","Paed Surgery","Vaccination","Child Dev. Clinic"] },
  { name:"Neurology",                tag:"Brain & Nervous System",img:IMG.neuro,  icon:"🧠", accent:N,
    desc:"Stroke unit, epilepsy monitoring, Parkinson's care, neuro-oncology and complete neurological rehabilitation.",
    list:["Stroke Unit","Epilepsy Clinic","Neuro-surgery","Neuro Rehab"] },
  { name:"Diagnostics & Imaging",    tag:"Advanced Diagnostics",  img:IMG.diag,   icon:"🔬", accent:M,
    desc:"3T MRI, 256-slice CT, digital X-Ray, mammography, PET-CT and NABL-certified laboratory.",
    list:["3T MRI","256-Slice CT","NABL Lab","PET-CT"] },
];

const DOCTORS = [
  { name:"Dr. Akhil Dadi",           role:"Robotic Joint Replacement Surgeon",                         qual:"MS (Ortho)",                               img:"/Akhildadi.jpg",                    avail:"Mon–Sat · OPD Hours",    accent:N,    experience:"24+"  },
  { name:"Dr. T.V. Suresh",          role:"Robotic Joint Replacement, Arthroscopic & Trauma Surgeon",  qual:"D. Ortho, DNB Ortho",                      img:"/doctors/TVSURESH.png",             avail:"Mon–Sat · OPD Hours",    accent:M,    experience:"14+"  },
  { name:"Dr. Kiran Kumar",          role:"Robotic Joint Replacement, Arthroscopic & Trauma Surgeon",  qual:"MS (Ortho)",                               img:"/doctors/DR.KIRAN.png",             avail:"Mon–Sat · OPD Hours",    accent:N,    experience:"20+"  },
  { name:"Dr. Khushal Sharnagat",    role:"Interventional Cardiologist",                               qual:"MD, DNB (Cardiology)",                     img:"/doctors/DR.KUSHAL.png",            avail:"Mon–Sat · OPD Hours",    accent:M,    experience:"12+"  },
  { name:"Dr. Sharat Chandra Reddy", role:"General Physician & Diabetologist",                         qual:"MBBS, DNB",                                img:"/doctors/DR.SHARATHCHANDRA.png",    avail:"Mon–Sat · OPD Hours",    accent:N,    experience:"13+"  },
  { name:"Dr. Sandeep Raja",         role:"Neuro & Spine Surgery",                                     qual:"MS, MCh (Neuro Surgery)",                  img:"/doctors/DR.SANDEEP.png",           avail:"Mon–Sat · OPD Hours",    accent:M,    experience:"5+"  },
  { name:"Dr. Nagaraju",             role:"General, Laser & Laparoscopic Surgeon",                     qual:"MS (GS)",                                  img:"/doctors/DR.NAGARAJU.png",          avail:"Mon–Sat · OPD Hours",    accent:N,    experience:"17+"  },
  { name:"Dr. Shridhar Reddy",       role:"Urologist",                                                 qual:"MS, MCh (Urology)",                        img:"/doctors/DR.SREEDHAR.png",          avail:"Mon–Sat · OPD Hours",    accent:M,    experience:"21+"  },
  { name:"Dr. Ramesh Tekula",        role:"Physiotherapist",                                           qual:"MPT (Ortho), MIAP",                        img:"/doctors/DR.RAMESH.png",            avail:"Mon–Sat · OPD Hours",    accent:N,    experience:"11+"  },
  { name:"Dr. Suman Babu",           role:"Plastic Reconstructive & Aesthetic Surgeon",                qual:"MS, MCh (Plastic Surgery)",                img:"/doctors/DR.SUMANBABU.png",         avail:"Mon–Sat · OPD Hours",    accent:M,    experience:"19+"  },
];

const FACILITIES = [
  { name:"24/7 Emergency & Trauma",  img:IMG.icu,     tag:"Emergency",  accent:N,
    desc:"Fully equipped emergency ward with trauma bay, crash carts, ventilators and a rapid response team — round the clock." },
  { name:"Advanced Imaging Centre",  img:IMG.diag,    tag:"Radiology",  accent:M,
    desc:"3-Tesla MRI, 256-slice CT, PET-CT, digital mammography and real-time ultrasound under a single roof." },
  { name:"NABL Certified Lab",       img:IMG.waiting, tag:"Laboratory", accent:N,
    desc:"1,200+ tests, molecular diagnostics, flow cytometry, liquid biopsy and a 24/7 automated blood bank." },
];

const TIMELINE = [
  { year:"2013", title:"Foundation",            desc:"Srikara Kompally opens with 120 beds serving families across North Hyderabad.",                            dot:N },
  { year:"2016", title:"ICU Expansion",         desc:"State-of-the-art 24-bed multi-specialty ICU commissioned with full critical care support.",                 dot:M },
  { year:"2019", title:"NABH Accreditation",    desc:"Earned national accreditation, cementing our commitment to the highest standards of patient care.",         dot:N },
  { year:"2022", title:"Robotic Surgery Suite", desc:"Launched North Hyderabad's first robotic surgical platform for minimally invasive procedures.",             dot:M },
  { year:"2024", title:"IVF & Fertility Clinic",desc:"Dedicated fertility centre opens with IVF lab, embryology suite and counselling services.",                dot:N },
];

const TESTIMONIALS = [
  { quote:"I had a complicated pregnancy and the entire maternal team at Srikara Kompally treated me like family. My twins arrived healthy because of their exceptional care.", name:"Lakshmi Pullela",        area:"Kompally, Hyderabad",  dept:"Obstetrics",  img:IMG.doc2, color:M },
  { quote:"After two failed surgeries elsewhere, Dr. Satya Prasad's cardiac team identified the real problem immediately. The care is extraordinary — personal, thorough and compassionate.", name:"Ranga Rao Avula",  area:"Medchal, Hyderabad",   dept:"Cardiology",  img:IMG.doc1, color:N },
  { quote:"Our son's NICU journey lasted six weeks. Every single day, the paediatrics team gave us hope and transparency. We'll be forever grateful.",                                         name:"Praveen & Divya Reddy",area:"Miyapur, Hyderabad", dept:"Neonatology", img:IMG.doc6, color:M },
];

const SLOTS   = ["9:00 AM","10:00 AM","11:00 AM","12:00 PM","2:00 PM","3:00 PM","4:00 PM","5:00 PM","6:00 PM"];
const BRANCHES = ["RTC X Roads","Miyapur","Lakdikapul","LB Nagar","Vijayawada","Peerzadiguda","Rajahmundry","ECIL","Kompally"];

// ── REVEAL ────────────────────────────────────────────────────────────────────
function useReveal(t = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setOn(true); io.unobserve(el); } }, { threshold:t });
    io.observe(el); return () => io.disconnect();
  }, [t]);
  return { ref, on };
}

function Fade({ children, d=0, up=true, s={} }: { children:React.ReactNode; d?:number; up?:boolean; s?:React.CSSProperties }) {
  const { ref, on } = useReveal();
  return (
    <div ref={ref} style={{ transitionDelay:`${d}ms`, transition:"opacity .85s ease, transform .85s ease", opacity:on?1:0, transform:on?"none":`translate${up?"Y":"X"}(${up?"30px":"24px"})`, ...s }}>
      {children}
    </div>
  );
}

// ── SVG COMPONENTS ────────────────────────────────────────────────────────────
const WaveBottom = ({ fill="#F2F4FA" }: { fill?:string }) => (
  <svg viewBox="0 0 1440 80" style={{ display:"block", width:"100%", marginTop:-1 }} preserveAspectRatio="none">
    <path d="M0,40 C240,0 480,80 720,40 C960,0 1200,80 1440,40 L1440,0 L0,0 Z" fill={fill} />
  </svg>
);

const DualDivider = () => (
  <div style={{ display:"flex", alignItems:"center", gap:"1rem" }}>
    <div style={{ flex:1, height:2, background:`linear-gradient(90deg, transparent, ${N})` }} />
    <div style={{ width:8, height:8, borderRadius:"50%", background:M }} />
    <div style={{ width:12, height:12, transform:"rotate(45deg)", background:N }} />
    <div style={{ width:8, height:8, borderRadius:"50%", background:M }} />
    <div style={{ flex:1, height:2, background:`linear-gradient(90deg, ${M}, transparent)` }} />
  </div>
);

const BlobShape = ({ color, style={} }: { color:string; style?:React.CSSProperties }) => (
  <div style={{ borderRadius:"60% 40% 70% 30% / 50% 60% 40% 50%", background:color, ...style }} />
);

function SLabel({ children, color=N }: { children:React.ReactNode; color?:string }) {
  return (
    <div style={{ display:"inline-flex", alignItems:"center", gap:".6rem", marginBottom:".8rem" }}>
      <span style={{ width:20, height:3, background:color, borderRadius:2, display:"block" }} />
      <span style={{ fontSize:".62rem", fontWeight:800, letterSpacing:".22em", textTransform:"uppercase", color }}>{children}</span>
    </div>
  );
}

// ── PAGE ──────────────────────────────────────────────────────────────────────
export default function KompallyPage() {
  const [scrolled,     setScrolled]    = useState(false);
  const [menuOpen,     setMenuOpen]    = useState(false);
  const [activeSpec,   setActiveSpec]  = useState(0);
  const [activeTest,   setActiveTest]  = useState(0);
  const [selectedSlot, setSelectedSlot]= useState("");
  const [form, setForm] = useState({ name:"", phone:"", dept:"", date:"" });
  const [sent, setSent] = useState(false);
  const [showBook,     setShowBook]    = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn, { passive:true });
    const t = setInterval(() => setActiveTest(p => (p+1) % TESTIMONIALS.length), 5500);
    return () => { window.removeEventListener("scroll", fn); clearInterval(t); };
  }, []);

  const submit = (e:React.FormEvent) => {
    e.preventDefault(); setSent(true);
    setTimeout(() => { setSent(false); setShowBook(false); setSelectedSlot(""); }, 3500);
  };

  const serif: React.CSSProperties = { fontFamily:"'Gilda Display',serif" };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Gilda+Display&family=Nunito:wght@300;400;500;600;700;800&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
        html{scroll-behavior:smooth;}
        body{font-family:'Nunito',sans-serif;background:#FAFBFF;color:#0D1B2E;overflow-x:hidden;}
        .serif{font-family:'Gilda Display',serif;}

        ::-webkit-scrollbar{width:5px;}
        ::-webkit-scrollbar-track{background:#EEF0F8;}
        ::-webkit-scrollbar-thumb{background:linear-gradient(180deg,#1B2A4A,#B8246E);border-radius:3px;}

        body::before{content:'';position:fixed;inset:0;z-index:0;pointer-events:none;
          background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.03'/%3E%3C/svg%3E");
          opacity:.4; mix-blend-mode:multiply;}

        @keyframes fadeUp    {from{opacity:0;transform:translateY(36px);}to{opacity:1;transform:translateY(0);}}
        @keyframes leafFloat {0%,100%{transform:translateY(0) rotate(0deg);}50%{transform:translateY(-10px) rotate(2deg);}}
        @keyframes pulse     {0%,100%{opacity:1;}50%{opacity:.4;}}
        @keyframes marquee   {from{transform:translateX(0);}to{transform:translateX(-50%);}}
        @keyframes slideUp   {from{opacity:0;transform:translateY(20px);}to{opacity:1;transform:translateY(0);}}
        @keyframes scaleIn   {from{opacity:0;transform:scale(.95);}to{opacity:1;transform:scale(1);}}
        @keyframes blobDrift {0%,100%{border-radius:60% 40% 70% 30%/50% 60% 40% 50%;}50%{border-radius:40% 60% 30% 70%/60% 40% 70% 30%;}}

        .ha1{animation:fadeUp .85s ease .1s  both;} .ha2{animation:fadeUp .85s ease .3s  both;}
        .ha3{animation:fadeUp .85s ease .5s  both;} .ha4{animation:fadeUp .85s ease .7s  both;}
        .ha5{animation:fadeUp .85s ease .9s  both;} .ha6{animation:fadeUp .85s ease 1.1s both;}

        .btn-navy{display:inline-flex;align-items:center;gap:8px;background:#1B2A4A;color:#fff;
          padding:.85rem 2.2rem;border-radius:100px;font-size:.88rem;font-weight:700;
          text-decoration:none;transition:all .3s;cursor:pointer;border:none;
          font-family:'Nunito',sans-serif;letter-spacing:.04em;
          box-shadow:0 4px 20px rgba(27,42,74,.28);}
        .btn-navy:hover{background:#0F1E35;transform:translateY(-2px);box-shadow:0 8px 28px rgba(27,42,74,.38);}

        .btn-magenta{display:inline-flex;align-items:center;gap:8px;background:#B8246E;color:#fff;
          padding:.85rem 2.2rem;border-radius:100px;font-size:.88rem;font-weight:700;
          text-decoration:none;transition:all .3s;cursor:pointer;border:none;
          font-family:'Nunito',sans-serif;letter-spacing:.04em;
          box-shadow:0 4px 20px rgba(184,36,110,.28);}
        .btn-magenta:hover{background:#8A1A52;transform:translateY(-2px);box-shadow:0 8px 28px rgba(184,36,110,.38);}

        .btn-outline{display:inline-flex;align-items:center;gap:8px;background:transparent;
          color:#1B2A4A;border:2px solid #1B2A4A;padding:.85rem 2.2rem;border-radius:100px;
          font-size:.88rem;font-weight:700;text-decoration:none;transition:all .3s;cursor:pointer;}
        .btn-outline:hover{background:#1B2A4A;color:#fff;}

        .spec-tab{transition:all .3s;cursor:pointer;border-left:3px solid transparent;}
        .spec-tab.active-navy{border-left-color:#1B2A4A !important;background:#EEF2FA !important;}
        .spec-tab.active-magenta{border-left-color:#B8246E !important;background:#FCF0F6 !important;}
        .spec-tab:hover:not(.active-navy):not(.active-magenta){background:#F4F6FC !important;}

        .doc-card{transition:all .35s ease;overflow:hidden;}
        .doc-card:hover{transform:translateY(-6px);}
        .doc-card img{transition:transform .5s ease;}
        .doc-card:hover img{transform:scale(1.05);}

        .fac-card{transition:all .3s;}
        .fac-card:hover{transform:translateY(-4px);}
        .fac-card img{transition:transform .5s;}
        .fac-card:hover img{transform:scale(1.05);}

        .slot-btn{font-family:'Nunito',sans-serif;font-size:.78rem;font-weight:600;
          border:1.5px solid #D5DCF0;border-radius:100px;padding:.45rem 1rem;cursor:pointer;
          transition:all .25s;background:#FAFBFF;color:#4A5E78;}
        .slot-btn:hover{border-color:#1B2A4A;color:#1B2A4A;}
        .slot-btn.sel-navy{background:#1B2A4A;color:#fff;border-color:#1B2A4A;}
        .slot-btn.sel-magenta{background:#B8246E;color:#fff;border-color:#B8246E;}

        .input-field{width:100%;border:1.5px solid #D5DCF0;border-radius:12px;
          padding:.8rem 1.1rem;font-family:'Nunito',sans-serif;font-size:.92rem;
          color:#0D1B2E;background:#FAFBFF;outline:none;transition:border-color .25s;}
        .input-field:focus{border-color:#1B2A4A;}
        .input-field::placeholder{color:#8A9CB4;}

        /* ══════════════════════════════════════════
           MOBILE RESPONSIVE
           ══════════════════════════════════════════ */
        @media(max-width:768px){
          /* Top strip */
          .top-strip-right{display:none!important;}

          /* Nav */
          .desk{display:none!important;}
          .mob-menu-btn{display:flex!important;}
          nav .nav-pad{padding:0 1.25rem!important;}

          /* Hero */
          .hero-grid{flex-direction:column!important;gap:2rem!important;}
          .hero-left{flex:none!important;width:100%!important;}
          .hero-img-col{display:none!important;}
          .hero-float-card{display:none!important;}
          .hero-pad{padding:5rem 1.25rem 3.5rem!important;}
          .hero-title{font-size:clamp(2.4rem,8vw,3.8rem)!important;line-height:1.05!important;}
          .hero-cta-btns{flex-direction:column!important;}
          .hero-cta-btns .btn-navy,
          .hero-cta-btns .btn-magenta{width:100%!important;justify-content:center!important;}
          .hero-badges{flex-wrap:wrap!important;gap:.5rem!important;}
          .hero-badges span{font-size:.58rem!important;}

          /* Stats */
          .stats-grid{grid-template-columns:1fr 1fr!important;}
          .stats-grid>div{
            padding:1.4rem 1rem!important;
            border-left:none!important;
            border-top:1px solid #D5DCF0!important;
          }

          /* About / Timeline */
          .about-flex{flex-direction:column!important;gap:2rem!important;}
          .about-img-col{flex:none!important;width:100%!important;min-width:unset!important;}
          .about-offset-img{display:none!important;}
          .about-nabh-badge{top:16px!important;left:16px!important;}

          /* Specialities */
          .spec-layout{flex-direction:column!important;}
          .spec-tabs-col{
            width:100%!important;
            flex-direction:row!important;
            overflow-x:auto!important;
            border-right:none!important;
            border-bottom:1px solid #D5DCF0!important;
          }
          .spec-tab{
            min-width:140px!important;
            border-left:none!important;
            border-bottom:3px solid transparent!important;
          }
          .spec-tab.active-navy{border-left:none!important;border-bottom-color:#1B2A4A!important;}
          .spec-tab.active-magenta{border-left:none!important;border-bottom-color:#B8246E!important;}
          .spec-panel-right-img{display:none!important;}

          /* Doctors */
          .doc-grid{grid-template-columns:1fr 1fr!important;}

          /* Testimonials */
          .test-left-panel{display:none!important;}
          .test-right-panel{
            flex:none!important;
            width:100%!important;
            padding:3rem 1.5rem!important;
          }

          /* Facilities */
          .fac-grid{grid-template-columns:1fr!important;}
          .quick-facts-grid{grid-template-columns:1fr 1fr!important;}

          /* Contact */
          .contact-flex{flex-direction:column!important;gap:2rem!important;}
          .contact-info-card{flex:none!important;width:100%!important;min-width:unset!important;}
          .branch-grid{grid-template-columns:1fr 1fr 1fr!important;}

          /* Footer */
          .footer-cols{flex-direction:column!important;gap:1.5rem!important;}

          /* Appointment modal */
          .appt-grid{grid-template-columns:1fr!important;}
          .appt-modal-header{flex-direction:column!important;}
          .appt-modal-header>div{flex:none!important;width:100%!important;}
          .appt-modal-header .close-btn{position:absolute!important;top:1rem!important;right:1rem!important;}

          /* Section padding */
          .sec{padding:4rem 1.25rem!important;}

          /* Floating book button */
          .float-book-btn{
            bottom:1rem!important;
            right:1rem!important;
            font-size:.75rem!important;
            padding:.7rem 1.2rem!important;
          }
        }

        @media(max-width:480px){
          .doc-grid{grid-template-columns:1fr!important;}
          .branch-grid{grid-template-columns:1fr 1fr!important;}
          .stats-grid{grid-template-columns:1fr 1fr!important;}
          .quick-facts-grid{grid-template-columns:1fr 1fr!important;}
          .hero-title{font-size:clamp(2rem,7vw,3rem)!important;}
          .hero-badges span{padding:.25rem .7rem!important;}
        }
      `}</style>

      {/* ── TOP STRIP ── */}
      <div style={{ background:`linear-gradient(90deg,${N} 0%,${ND} 40%,${MD} 70%,${M} 100%)`, padding:"7px 2.5rem", display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:".5rem", position:"relative", zIndex:600 }}>
        <div style={{ display:"flex", alignItems:"center", gap:"1.5rem" }}>
          <div style={{ display:"flex", alignItems:"center", gap:7 }}>
            <span style={{ width:7, height:7, borderRadius:"50%", background:"#4ADE80", animation:"pulse 1.5s ease infinite", display:"inline-block" }} />
            <span style={{ fontSize:".62rem", fontWeight:700, letterSpacing:".18em", textTransform:"uppercase", color:"rgba(255,255,255,.7)" }}>Emergency 24/7</span>
          </div>
          <a href="tel:040-4856-2200" style={{ fontSize:".82rem", fontWeight:800, color:"#fff", textDecoration:"none" }}>040-4856-2200</a>
        </div>
        <div className="top-strip-right" style={{ display:"flex", gap:"1.5rem", alignItems:"center" }}>
          <span style={{ fontSize:".62rem", color:"rgba(255,255,255,.5)", letterSpacing:".08em" }}>Survey No. 47, Kompally, Hyderabad – 500014</span>
          <Link href="/" style={{ fontSize:".62rem", color:"rgba(255,255,255,.5)", textDecoration:"none", letterSpacing:".12em", textTransform:"uppercase" }}>← Main Site</Link>
        </div>
      </div>

      {/* ── NAV ── */}
      <nav style={{ position:"sticky", top:0, zIndex:500, background:scrolled?"rgba(250,251,255,.97)":"#FAFBFF", backdropFilter:scrolled?"blur(16px)":"none", borderBottom:`1px solid ${scrolled?"#D5DCF0":"rgba(27,42,74,.09)"}`, boxShadow:scrolled?"0 2px 24px rgba(27,42,74,.07)":"none", transition:"all .35s" }}>
        <div style={{ height:3, background:`linear-gradient(90deg,${N},${NL},${M},${ML},${M},${N})` }} />
        <div className="nav-pad" style={{ maxWidth:1400, margin:"0 auto", padding:"0 2.5rem", height:68, display:"flex", alignItems:"center", justifyContent:"space-between" }}>

          <Link href="/" style={{ display:"flex", alignItems:"center", gap:12, textDecoration:"none" }}>
            <img src="/srikara-logo.png" alt="Srikara Hospitals" style={{ width:44, height:44, objectFit:"contain", borderRadius:6 }} />
            <div>
              <p style={{ fontFamily:"'Gilda Display',serif", fontSize:"1.05rem", color:N, lineHeight:1.05, letterSpacing:".02em" }}>Srikara</p>
              <p style={{ fontSize:".62rem", color:M, letterSpacing:".2em", textTransform:"uppercase", fontWeight:800, lineHeight:1 }}>Hospitals</p>
              <p style={{ fontSize:".5rem", color:"#8A9CB4", letterSpacing:".12em", textTransform:"uppercase", marginTop:1 }}>Kompally Branch</p>
            </div>
          </Link>

          <div className="desk" style={{ display:"flex", alignItems:"center", gap:"2rem" }}>
            {NAV.map((n,i) => (
              <Link key={n.h} href={n.h} style={{ fontSize:".82rem", fontWeight:600, color:"#4A5E78", textDecoration:"none", transition:"color .2s" }}
                onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.color = i%2===0?N:M}
                onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.color = "#4A5E78"}>
                {n.l}
              </Link>
            ))}
            <button className="btn-magenta" onClick={() => setShowBook(true)} style={{ padding:".52rem 1.4rem", fontSize:".78rem" }}>Book Appointment</button>
          </div>

          <button className="mob-menu-btn" onClick={() => setMenuOpen(!menuOpen)}
            style={{ display:"none", flexDirection:"column", gap:5, background:"none", border:`1.5px solid #D5DCF0`, borderRadius:8, padding:".4rem .6rem", cursor:"pointer" }}>
            {[0,1,2].map(i => <span key={i} style={{ width:22, height:1.5, background:i===1?M:N, display:"block" }} />)}
          </button>
        </div>

        {menuOpen && (
          <div style={{ background:"#FAFBFF", borderTop:`1px solid #D5DCF0`, padding:"1.5rem 1.25rem", display:"flex", flexDirection:"column", gap:"1rem" }}>
            {NAV.map(n => <Link key={n.h} href={n.h} onClick={() => setMenuOpen(false)} style={{ color:"#4A5E78", textDecoration:"none", fontSize:".9rem", fontWeight:600, padding:".5rem 0", borderBottom:"1px solid #D5DCF0" }}>{n.l}</Link>)}
            <button className="btn-magenta" onClick={() => { setMenuOpen(false); setShowBook(true); }} style={{ justifyContent:"center" }}>Book Appointment</button>
          </div>
        )}
      </nav>

      {/* ── HERO ── */}
      <section style={{ position:"relative", background:"#FAFBFF", overflow:"hidden", minHeight:"92vh", display:"flex", alignItems:"center" }}>
        <BlobShape color={`${N}08`} style={{ position:"absolute", width:600, height:600, top:"-15%", left:"-8%", animation:"blobDrift 18s ease-in-out infinite" }} />
        <BlobShape color={`${M}07`} style={{ position:"absolute", width:400, height:400, bottom:"5%", right:"5%", animation:"blobDrift 22s ease-in-out infinite reverse" }} />

        <div style={{ position:"relative", zIndex:2, maxWidth:1400, margin:"0 auto", padding:"6rem 2.5rem 5rem", width:"100%" }} className="hero-pad">
          <div className="hero-grid" style={{ display:"flex", gap:"4rem", alignItems:"center" }}>

            <div className="hero-left" style={{ flex:"0 0 54%" }}>
              <div className="ha1" style={{ display:"inline-flex", alignItems:"center", gap:0, marginBottom:"2rem", borderRadius:100, overflow:"hidden", boxShadow:`0 2px 12px rgba(27,42,74,.15)` }}>
                <span style={{ background:N, color:"#fff", fontSize:".62rem", fontWeight:700, letterSpacing:".14em", textTransform:"uppercase", padding:".4rem 1rem" }}>NABH Accredited</span>
                <span style={{ background:M, color:"#fff", fontSize:".62rem", fontWeight:700, letterSpacing:".14em", textTransform:"uppercase", padding:".4rem 1rem" }}>Kompally · Est. 2013</span>
              </div>

              <h1 className="ha2 hero-title" style={{ fontFamily:"'Gilda Display',serif", fontSize:"clamp(3.2rem,6vw,6.5rem)", lineHeight:1.05, marginBottom:"1.2rem" }}>
                <span style={{ color:N }}>Healthcare</span><br />
                <span style={{ color:M, fontStyle:"italic" }}>grown from</span><br />
                <span style={{ color:N }}>the heart.</span>
              </h1>

              <div className="ha3" style={{ marginBottom:"1.8rem" }}><DualDivider /></div>

              <p className="ha3" style={{ fontSize:"1.05rem", color:"#4A5E78", lineHeight:1.85, maxWidth:500, marginBottom:"2.8rem" }}>
                For over a decade, Srikara Kompally has been North Hyderabad's most trusted partner in health — combining specialist expertise with genuine warmth for every family we serve.
              </p>

              <div className="ha4 hero-cta-btns" style={{ display:"flex", gap:"1rem", flexWrap:"wrap" }}>
                <button className="btn-navy"    onClick={() => setShowBook(true)}>View Departments</button>
                <button className="btn-magenta" onClick={() => setShowBook(true)}>Book Appointment →</button>
              </div>

              <div className="ha5 hero-badges" style={{ display:"flex", gap:".8rem", flexWrap:"wrap", marginTop:"2.5rem", paddingTop:"2rem", borderTop:"1px solid #D5DCF0" }}>
                {[{t:"NABH",c:N},{t:"ISO 9001",c:M},{t:"NABL Lab",c:N},{t:"100+ Insurers",c:M}].map(b => (
                  <span key={b.t} style={{ fontSize:".62rem", fontWeight:700, letterSpacing:".14em", textTransform:"uppercase", color:b.c, border:`1.5px solid ${b.c}45`, borderRadius:100, padding:".28rem .9rem", background:`${b.c}0a` }}>{b.t}</span>
                ))}
              </div>
            </div>

            {/* Right image col — hidden on mobile */}
            <div className="ha3 hero-img-col" style={{ flex:1, position:"relative" }}>
              <div style={{ width:"100%", maxWidth:440, position:"relative" }}>
                <div style={{ width:"100%", paddingBottom:"100%", borderRadius:"60% 40% 50% 50% / 50% 50% 60% 40%", overflow:"hidden", position:"relative", boxShadow:`0 40px 80px rgba(27,42,74,.14)`, border:`4px solid ${M}30` }}>
                  <img src={IMG.hero} alt="Srikara Kompally" style={{ position:"absolute", inset:0, width:"100%", height:"100%", objectFit:"cover" }} />
                  <div style={{ position:"absolute", inset:0, background:`linear-gradient(180deg,transparent 40%,rgba(15,30,53,.38) 100%)` }} />
                </div>

                <div className="hero-float-card" style={{ position:"absolute", bottom:40, left:-20, background:"#fff", borderRadius:16, padding:"1.1rem 1.4rem", boxShadow:`0 12px 40px rgba(27,42,74,.14)`, border:`2px solid ${N}20`, animation:"leafFloat 5s ease-in-out infinite" }}>
                  <p style={{ fontFamily:"'Gilda Display',serif", fontSize:"2rem", color:N, lineHeight:1 }}>11+</p>
                  <p style={{ fontSize:".62rem", fontWeight:700, color:N, letterSpacing:".12em", textTransform:"uppercase", marginTop:3 }}>Years of care</p>
                  <div style={{ height:2, background:N, borderRadius:1, marginTop:6 }} />
                </div>

                <div className="hero-float-card" style={{ position:"absolute", top:30, right:-20, background:"#fff", borderRadius:16, padding:"1rem 1.3rem", boxShadow:`0 12px 40px rgba(184,36,110,.14)`, border:`2px solid ${M}25`, animation:"leafFloat 6s ease-in-out infinite 1s" }}>
                  <div style={{ display:"flex", gap:2, marginBottom:4 }}>{[1,2,3,4,5].map(i => <span key={i} style={{ color:"#F59E0B", fontSize:".9rem" }}>★</span>)}</div>
                  <p style={{ fontSize:".62rem", fontWeight:700, color:M }}>4.9 / 5.0 rating</p>
                  <p style={{ fontSize:".55rem", color:"#8A9CB4" }}>48,000+ patients</p>
                  <div style={{ height:2, background:M, borderRadius:1, marginTop:6 }} />
                </div>

                <div style={{ position:"absolute", top:-24, right:60, width:80, height:80, borderRadius:"50%", overflow:"hidden", border:`3px solid #fff`, boxShadow:`0 8px 24px rgba(27,42,74,.12)` }}>
                  <img src={IMG.nature2} alt="" style={{ width:"100%", height:"100%", objectFit:"cover" }} />
                </div>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="ha6 stats-grid" style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:1, background:"#D5DCF0", marginTop:"4rem", borderRadius:16, overflow:"hidden" }}>
            {STATS.map((s,i) => (
              <div key={i} style={{ background:"#FAFBFF", padding:"1.8rem 1.5rem", textAlign:"center", borderLeft:i>0?"1px solid #D5DCF0":"none", borderTop:`3px solid ${s.color}` }}>
                <p style={{ fontFamily:"'Gilda Display',serif", fontSize:"2.2rem", color:s.color, lineHeight:1 }}>{s.n}</p>
                <p style={{ fontSize:".82rem", fontWeight:800, color:s.color, marginTop:4, opacity:.8 }}>{s.l}</p>
                <p style={{ fontSize:".7rem", color:"#8A9CB4", marginTop:2 }}>{s.s}</p>
              </div>
            ))}
          </div>
        </div>

        <WaveBottom fill="#F2F4FA" />
      </section>

      {/* ── MARQUEE ── */}
      <div style={{ background:"#F2F4FA", padding:".8rem 0", overflow:"hidden", whiteSpace:"nowrap", borderTop:"1px solid #D5DCF0", borderBottom:"1px solid #D5DCF0" }}>
        <div style={{ display:"inline-flex", gap:"3rem", animation:"marquee 35s linear infinite" }}>
          {Array(3).fill(["Advanced Cardiac Care","Joint Replacement","High-Risk Obstetrics","IVF & Fertility","Level III NICU","Stroke Unit","3T MRI & CT","24/7 Emergency","NABH Accredited","Physiotherapy","NABL Laboratory","Robotic Surgery"]).flat().map((t,i) => (
            <span key={i} style={{ display:"inline-flex", alignItems:"center", gap:".7rem", fontSize:".68rem", fontWeight:700, letterSpacing:".16em", textTransform:"uppercase", color:i%2===0?N:M }}>
              <span style={{ width:4, height:4, borderRadius:"50%", background:i%2===0?M:N, display:"inline-block", flexShrink:0 }} />
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* ── ABOUT & TIMELINE ── */}
      <section id="about" className="sec" style={{ background:"#F2F4FA", padding:"8rem 2.5rem", position:"relative" }}>
        <BlobShape color={`${M}06`} style={{ position:"absolute", width:400, height:400, top:"-10%", right:"-5%", animation:"blobDrift 20s ease-in-out infinite" }} />

        <div style={{ maxWidth:1400, margin:"0 auto" }}>
          <Fade>
            <div style={{ textAlign:"center", marginBottom:"5rem" }}>
              <SLabel color={M}>Our Story</SLabel>
              <h2 style={{ fontFamily:"'Gilda Display',serif", fontSize:"clamp(2rem,4vw,3.8rem)", color:N, lineHeight:1.15 }}>
                A decade of healing,<br /><em style={{ color:M }}>one family at a time.</em>
              </h2>
              <div style={{ marginTop:"1.5rem" }}><DualDivider /></div>
            </div>
          </Fade>

          <div className="about-flex" style={{ display:"flex", gap:"5rem", alignItems:"flex-start", flexWrap:"wrap" }}>

            <Fade s={{ flex:"0 0 40%", minWidth:260 }}>
              <div className="about-img-col" style={{ position:"relative" }}>
                <div style={{ borderRadius:"12px 40px 12px 40px", overflow:"hidden", boxShadow:`0 32px 80px rgba(27,42,74,.12)`, border:`3px solid ${M}20` }}>
                  <img src={IMG.about} alt="Srikara Kompally Hospital" style={{ width:"100%", height:440, objectFit:"cover", display:"block" }} />
                  <div style={{ position:"absolute", inset:0, background:`linear-gradient(180deg,transparent 50%,rgba(15,30,53,.35) 100%)` }} />
                </div>
                <div className="about-offset-img" style={{ position:"absolute", bottom:-28, right:-28, width:160, height:140, borderRadius:"24px", overflow:"hidden", border:`4px solid #fff`, boxShadow:`0 12px 40px rgba(27,42,74,.14)` }}>
                  <img src={IMG.waiting} alt="Reception" style={{ width:"100%", height:"100%", objectFit:"cover" }} />
                </div>
                <div className="about-nabh-badge" style={{ position:"absolute", top:24, left:24, background:N, borderRadius:12, padding:".9rem 1.2rem", boxShadow:`0 8px 24px rgba(27,42,74,.28)` }}>
                  <p style={{ fontFamily:"'Gilda Display',serif", fontSize:"1.6rem", color:"#fff", lineHeight:1 }}>NABH</p>
                  <p style={{ fontSize:".58rem", fontWeight:700, color:`${M}`, letterSpacing:".12em", textTransform:"uppercase", marginTop:2 }}>Accredited</p>
                </div>
              </div>
            </Fade>

            <Fade d={150} s={{ flex:1 }}>
              <SLabel color={N}>Our Journey</SLabel>
              <div style={{ position:"relative", marginTop:"1rem" }}>
                <div style={{ position:"absolute", left:20, top:0, bottom:0, width:2, background:`linear-gradient(180deg,${N},${M},${N},${M},${N})`, borderRadius:2 }} />

                {TIMELINE.map((tl, i) => (
                  <Fade key={tl.year} d={i*80}>
                    <div style={{ display:"flex", gap:"1.5rem", marginBottom:"2.5rem", alignItems:"flex-start" }}>
                      <div style={{ position:"relative", flexShrink:0, width:42 }}>
                        <div style={{ width:42, height:42, borderRadius:"50%", background:i===TIMELINE.length-1?tl.dot:"#FAFBFF", border:`2px solid ${tl.dot}`, display:"flex", alignItems:"center", justifyContent:"center", zIndex:1, position:"relative" }}>
                          <div style={{ width:10, height:10, borderRadius:"50%", background:i===TIMELINE.length-1?"#fff":tl.dot }} />
                        </div>
                      </div>
                      <div style={{ flex:1, paddingTop:8 }}>
                        <span style={{ fontSize:".62rem", fontWeight:800, color:tl.dot, letterSpacing:".18em", textTransform:"uppercase" }}>{tl.year}</span>
                        <h4 style={{ fontFamily:"'Gilda Display',serif", fontSize:"1.15rem", color:N, margin:".25rem 0 .5rem" }}>{tl.title}</h4>
                        <p style={{ fontSize:".85rem", color:"#4A5E78", lineHeight:1.7 }}>{tl.desc}</p>
                      </div>
                    </div>
                  </Fade>
                ))}
              </div>
            </Fade>
          </div>
        </div>

        <WaveBottom fill="#FAFBFF" />
      </section>

      {/* ── SPECIALITIES ── */}
      <section id="specialities" className="sec" style={{ background:"#FAFBFF", padding:"8rem 2.5rem" }}>
        <div style={{ maxWidth:1400, margin:"0 auto" }}>
          <Fade>
            <div style={{ textAlign:"center", marginBottom:"4rem" }}>
              <SLabel color={M}>What We Treat</SLabel>
              <h2 style={{ fontFamily:"'Gilda Display',serif", fontSize:"clamp(2rem,4vw,3.8rem)", color:N, lineHeight:1.15 }}>
                Specialities centred<br /><em style={{ color:M }}>around you.</em>
              </h2>
            </div>
          </Fade>

          <div className="spec-layout" style={{ display:"flex", gap:0, border:"1px solid #D5DCF0", borderRadius:16, overflow:"hidden" }}>
            <div className="spec-tabs-col" style={{ width:220, flexShrink:0, borderRight:"1px solid #D5DCF0", display:"flex", flexDirection:"column" }}>
              {SPECIALITIES.map((s,i) => (
                <div key={s.name}
                  className={`spec-tab${activeSpec===i?(s.accent===N?" active-navy":" active-magenta"):""}`}
                  onClick={() => setActiveSpec(i)}
                  style={{ padding:"1.3rem 1.5rem", background:"#FAFBFF", borderBottom:"1px solid #D5DCF0" }}>
                  <div style={{ display:"flex", alignItems:"center", gap:".7rem" }}>
                    <span style={{ fontSize:"1.1rem" }}>{s.icon}</span>
                    <span style={{ fontSize:".85rem", fontWeight:activeSpec===i?700:500, color:activeSpec===i?s.accent:"#4A5E78", lineHeight:1.25 }}>{s.name}</span>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ flex:1, background:"#F2F4FA", position:"relative", overflow:"hidden" }}>
              <div style={{ height:260, overflow:"hidden", position:"relative" }}>
                <img key={activeSpec} src={SPECIALITIES[activeSpec].img} alt={SPECIALITIES[activeSpec].name}
                  style={{ width:"100%", height:"100%", objectFit:"cover", animation:"scaleIn .5s ease", display:"block" }} />
                <div style={{ position:"absolute", inset:0, background:`linear-gradient(180deg,transparent 30%,rgba(15,30,53,.65) 100%)` }} />
                <div style={{ position:"absolute", bottom:"1.5rem", left:"2rem" }}>
                  <span style={{ background:SPECIALITIES[activeSpec].accent, color:"#fff", fontSize:".6rem", fontWeight:700, letterSpacing:".14em", textTransform:"uppercase", padding:".25rem .8rem", borderRadius:100, display:"inline-block", marginBottom:".4rem" }}>{SPECIALITIES[activeSpec].tag}</span>
                  <h3 style={{ fontFamily:"'Gilda Display',serif", fontSize:"1.8rem", color:"#fff", display:"block" }}>{SPECIALITIES[activeSpec].name}</h3>
                </div>
              </div>
              <div style={{ padding:"2rem 2.5rem" }} key={activeSpec+"b"}>
                <p style={{ fontSize:".95rem", color:"#4A5E78", lineHeight:1.85, marginBottom:"1.5rem" }}>{SPECIALITIES[activeSpec].desc}</p>
                <div style={{ display:"flex", flexWrap:"wrap", gap:".6rem", marginBottom:"2rem" }}>
                  {SPECIALITIES[activeSpec].list.map(t => (
                    <span key={t} style={{ fontSize:".72rem", fontWeight:600, color:SPECIALITIES[activeSpec].accent, background:`${SPECIALITIES[activeSpec].accent}0d`, border:`1px solid ${SPECIALITIES[activeSpec].accent}30`, borderRadius:100, padding:".3rem .9rem" }}>{t}</span>
                  ))}
                </div>
                <button
                  className={SPECIALITIES[activeSpec].accent===N?"btn-navy":"btn-magenta"}
                  onClick={() => setShowBook(true)} style={{ fontSize:".78rem", padding:".65rem 1.6rem" }}>
                  Book Consultation →
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── DOCTORS ── */}
      <section id="doctors" className="sec" style={{ background:"#F2F4FA", padding:"8rem 2.5rem", position:"relative" }}>
        <BlobShape color={`${N}05`} style={{ position:"absolute", width:350, height:350, bottom:"-5%", left:"-5%", animation:"blobDrift 16s ease-in-out infinite" }} />

        <div style={{ maxWidth:1400, margin:"0 auto" }}>
          <Fade>
            <div style={{ display:"flex", alignItems:"flex-end", justifyContent:"space-between", marginBottom:"4rem", flexWrap:"wrap", gap:"2rem" }}>
              <div>
                <SLabel color={N}>Our Physicians</SLabel>
                <h2 style={{ fontFamily:"'Gilda Display',serif", fontSize:"clamp(2rem,4vw,3.8rem)", color:N, lineHeight:1.15 }}>
                  Specialists who<br /><em style={{ color:M }}>genuinely listen.</em>
                </h2>
              </div>
              <Link href="#" style={{ fontSize:".82rem", fontWeight:700, color:N, textDecoration:"none", borderBottom:`1.5px solid ${N}`, paddingBottom:2 }}>All 36 Specialists →</Link>
            </div>
          </Fade>

          <div className="doc-grid" style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:"1.5rem" }}>
            {DOCTORS.map((d,i) => (
              <Fade key={d.name} d={i*60}>
                <div className="doc-card" style={{ background:"#FAFBFF", borderRadius:20, border:`1px solid #D5DCF0`, boxShadow:"0 4px 20px rgba(27,42,74,.05)" }}>
                  <div style={{ height:5, background:`linear-gradient(90deg,${d.accent},${d.accent===N?NL:ML})`, borderRadius:"20px 20px 0 0" }} />
                  <div style={{ height:220, overflow:"hidden", position:"relative" }}>
                    <img src={d.img} alt={d.name} style={{ width:"100%", height:"100%", objectFit:"cover", objectPosition:"center top", display:"block" }} />
                    <div style={{ position:"absolute", inset:0, background:`linear-gradient(180deg,transparent 55%,rgba(15,30,53,.6) 100%)` }} />
                    <div style={{ position:"absolute", bottom:"1rem", left:"1rem" }}>
                      <span style={{ background:d.accent, color:"#fff", fontSize:".6rem", fontWeight:700, letterSpacing:".1em", textTransform:"uppercase", padding:".25rem .7rem", borderRadius:100 }}>{d.experience} yrs exp</span>
                    </div>
                  </div>
                  <div style={{ padding:"1.4rem" }}>
                    <p style={{ fontFamily:"'Gilda Display',serif", fontSize:"1.05rem", color:N, marginBottom:".25rem", lineHeight:1.25 }}>{d.name}</p>
                    <p style={{ fontSize:".72rem", fontWeight:700, color:d.accent, marginBottom:".5rem" }}>{d.role}</p>
                    <p style={{ fontSize:".72rem", color:"#4A5E78", lineHeight:1.55, marginBottom:"1rem" }}>{d.qual}</p>
                    <div style={{ paddingTop:".8rem", borderTop:"1px solid #D5DCF0", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
                      <p style={{ fontSize:".7rem", color:"#8A9CB4" }}>{d.avail}</p>
                      <button onClick={() => setShowBook(true)}
                        className={d.accent===N?"btn-navy":"btn-magenta"}
                        style={{ fontSize:".65rem", padding:".35rem 1rem" }}>Book →</button>
                    </div>
                  </div>
                </div>
              </Fade>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section style={{ overflow:"hidden", position:"relative" }}>
        <div style={{ maxWidth:1400, margin:"0 auto", display:"flex", minHeight:480, flexWrap:"wrap" }}>

          <div className="test-left-panel" style={{ flex:"0 0 50%", background:N, padding:"6rem 4rem", display:"flex", flexDirection:"column", justifyContent:"center", position:"relative", overflow:"hidden" }}>
            <div style={{ position:"absolute", inset:0, backgroundImage:`url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='30' cy='30' r='2' fill='%23B8246E' opacity='.07'/%3E%3C/svg%3E")`, backgroundSize:"60px 60px", pointerEvents:"none" }} />
            <Fade>
              <SLabel color={M}>Patient Stories</SLabel>
              <h2 style={{ fontFamily:"'Gilda Display',serif", fontSize:"clamp(2rem,3.5vw,3.2rem)", color:"#fff", lineHeight:1.2, marginBottom:"1rem" }}>Stories of healing.</h2>
              <div style={{ marginBottom:"2rem" }}><DualDivider /></div>
              <p style={{ fontSize:".92rem", color:"rgba(255,255,255,.6)", lineHeight:1.8, maxWidth:340 }}>
                Every recovery is a story of trust. Here are a few of the families who chose Srikara Kompally and never looked back.
              </p>
            </Fade>
          </div>

          <div className="test-right-panel" style={{ flex:1, background:"#FAFBFF", padding:"5rem 3.5rem", display:"flex", flexDirection:"column", justifyContent:"center" }}>
            <div style={{ position:"relative", minHeight:280 }}>
              {TESTIMONIALS.map((t,i) => (
                <div key={i} style={{ position:i===activeTest?"relative":"absolute", inset:0, opacity:i===activeTest?1:0, transform:i===activeTest?"none":"translateY(14px)", transition:"all .7s ease", pointerEvents:i===activeTest?"auto":"none" }}>
                  <div style={{ background:"#fff", border:`1px solid #D5DCF0`, borderRadius:"12px 32px 12px 32px", padding:"2.5rem", position:"relative", boxShadow:"0 4px 24px rgba(27,42,74,.07)", borderTop:`4px solid ${t.color}` }}>
                    <span style={{ background:`${t.color}12`, color:t.color, fontSize:".62rem", fontWeight:700, letterSpacing:".16em", textTransform:"uppercase", border:`1px solid ${t.color}30`, borderRadius:100, padding:".25rem .8rem", display:"inline-block", marginBottom:"1.2rem" }}>{t.dept}</span>
                    <div style={{ fontSize:"3rem", color:`${t.color}20`, lineHeight:1, marginBottom:".5rem", fontFamily:"'Gilda Display',serif" }}>"</div>
                    <p style={{ fontFamily:"'Gilda Display',serif", fontSize:"clamp(1rem,1.7vw,1.2rem)", color:N, lineHeight:1.75, fontStyle:"italic", marginBottom:"1.8rem" }}>{t.quote}</p>
                    <div style={{ display:"flex", alignItems:"center", gap:".9rem" }}>
                      <div style={{ width:44, height:44, borderRadius:"50%", overflow:"hidden", border:`2px solid ${t.color}50`, flexShrink:0 }}>
                        <img src={t.img} alt={t.name} style={{ width:"100%", height:"100%", objectFit:"cover" }} />
                      </div>
                      <div>
                        <p style={{ fontWeight:700, color:N, fontSize:".88rem" }}>{t.name}</p>
                        <p style={{ fontSize:".65rem", color:t.color, marginTop:2 }}>{t.area}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ display:"flex", gap:".5rem", marginTop:"2rem" }}>
              {TESTIMONIALS.map((t,i) => (
                <button key={i} onClick={() => setActiveTest(i)}
                  style={{ width:i===activeTest?32:8, height:3, background:i===activeTest?t.color:"#D5DCF0", border:"none", cursor:"pointer", transition:"all .35s", borderRadius:2, padding:0 }} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FACILITIES ── */}
      <section id="facilities" className="sec" style={{ background:"#FAFBFF", padding:"8rem 2.5rem" }}>
        <div style={{ maxWidth:1400, margin:"0 auto" }}>
          <Fade>
            <div style={{ textAlign:"center", marginBottom:"4rem" }}>
              <SLabel color={N}>Infrastructure</SLabel>
              <h2 style={{ fontFamily:"'Gilda Display',serif", fontSize:"clamp(2rem,4vw,3.8rem)", color:N, lineHeight:1.15 }}>
                Modern care,<br /><em style={{ color:M }}>thoughtfully designed.</em>
              </h2>
            </div>
          </Fade>

          <div className="fac-grid" style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:"1.5rem" }}>
            {FACILITIES.map((f,i) => (
              <Fade key={f.name} d={i*70}>
                <div className="fac-card" style={{ background:"#F2F4FA", borderRadius:"12px 32px 12px 32px", border:`1px solid #D5DCF0`, overflow:"hidden", boxShadow:"0 4px 20px rgba(27,42,74,.05)" }}>
                  <div style={{ height:200, overflow:"hidden", position:"relative" }}>
                    <img src={f.img} alt={f.name} style={{ width:"100%", height:"100%", objectFit:"cover", display:"block" }} />
                    <div style={{ position:"absolute", inset:0, background:`linear-gradient(180deg,transparent 40%,rgba(15,30,53,.6) 100%)` }} />
                    <span style={{ position:"absolute", top:"1rem", right:"1rem", background:f.accent, color:"#fff", fontSize:".6rem", fontWeight:700, letterSpacing:".1em", textTransform:"uppercase", padding:".25rem .7rem", borderRadius:100 }}>{f.tag}</span>
                  </div>
                  <div style={{ padding:"1.6rem", borderTop:`3px solid ${f.accent}` }}>
                    <h3 style={{ fontFamily:"'Gilda Display',serif", fontSize:"1.1rem", color:N, marginBottom:".6rem" }}>{f.name}</h3>
                    <p style={{ fontSize:".82rem", color:"#4A5E78", lineHeight:1.75 }}>{f.desc}</p>
                  </div>
                </div>
              </Fade>
            ))}
          </div>

          <Fade d={200}>
            <div className="quick-facts-grid" style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:1, background:"#D5DCF0", borderRadius:16, overflow:"hidden", marginTop:"3rem" }}>
              {[
                { icon:"🏥", l:"Patient First",      s:"Every decision centred on your well-being", c:N },
                { icon:"🅿️", l:"Free Parking",       s:"Ample covered parking for patients",        c:M },
                { icon:"🍽️", l:"In-House Cafeteria", s:"Healthy meals for patients & families",     c:N },
                { icon:"📱", l:"Digital Records",    s:"Paperless health records & reports",        c:M },
              ].map((f,i) => (
                <div key={i} style={{ background:"#FAFBFF", padding:"1.5rem 1.2rem", textAlign:"center", display:"flex", flexDirection:"column", alignItems:"center", gap:".5rem", borderTop:`3px solid ${f.c}` }}>
                  <span style={{ fontSize:"1.6rem" }}>{f.icon}</span>
                  <p style={{ fontSize:".82rem", fontWeight:700, color:f.c }}>{f.l}</p>
                  <p style={{ fontSize:".7rem", color:"#8A9CB4", lineHeight:1.4 }}>{f.s}</p>
                </div>
              ))}
            </div>
          </Fade>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" className="sec" style={{ background:"#F2F4FA", padding:"8rem 2.5rem", position:"relative", overflow:"hidden" }}>
        <BlobShape color={`${N}05`} style={{ position:"absolute", width:500, height:500, top:"-20%", right:"-10%", animation:"blobDrift 25s ease-in-out infinite" }} />

        <div style={{ maxWidth:1400, margin:"0 auto" }}>
          <Fade>
            <div style={{ textAlign:"center", marginBottom:"4rem" }}>
              <SLabel color={M}>Come Visit Us</SLabel>
              <h2 style={{ fontFamily:"'Gilda Display',serif", fontSize:"clamp(2rem,4vw,3.8rem)", color:N, lineHeight:1.15 }}>
                Srikara Kompally<br /><em style={{ color:M }}>is always here for you.</em>
              </h2>
            </div>
          </Fade>

          <div className="contact-flex" style={{ display:"flex", gap:"4rem", flexWrap:"wrap" }}>

            <Fade s={{ flex:"0 0 40%", minWidth:260 }}>
              <div className="contact-info-card" style={{ background:"#FAFBFF", borderRadius:"12px 32px 12px 32px", border:"1px solid #D5DCF0", overflow:"hidden", boxShadow:"0 8px 40px rgba(27,42,74,.08)" }}>
                <div style={{ height:4, background:`linear-gradient(90deg,${M},${N},${ML})` }} />
                <div style={{ padding:"2.5rem" }}>
                  {[
                    { icon:"📍", l:"Address",          v:"Survey No. 47, Kompally\nHyderabad – 500014, Telangana", c:N },
                    { icon:"🚨", l:"Emergency (24/7)", v:"040-4856-2200",                                           c:"#EF4444" },
                    { icon:"📞", l:"Appointments",     v:"040-4856-2300",                                           c:M },
                    { icon:"✉️", l:"Email",             v:"kompally@srikarahospitals.in",                           c:N },
                    { icon:"🕐", l:"OPD Hours",         v:"Mon – Sat · 8:00 AM – 8:00 PM",                         c:M },
                  ].map((c,i) => (
                    <div key={c.l} style={{ display:"flex", gap:"1rem", paddingBottom:"1.2rem", marginBottom:i<4?"1.2rem":0, borderBottom:i<4?"1px solid #D5DCF0":"none" }}>
                      <span style={{ fontSize:"1.2rem", flexShrink:0, marginTop:2 }}>{c.icon}</span>
                      <div>
                        <p style={{ fontSize:".58rem", fontWeight:700, letterSpacing:".16em", textTransform:"uppercase", color:c.c, marginBottom:".3rem" }}>{c.l}</p>
                        <p style={{ fontSize:".9rem", fontWeight:600, color:N, whiteSpace:"pre-line", lineHeight:1.6 }}>{c.v}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Fade>

            <Fade d={100} s={{ flex:1 }}>
              <SLabel color={N}>Our Network</SLabel>
              <h3 style={{ fontFamily:"'Gilda Display',serif", fontSize:"1.8rem", color:N, lineHeight:1.1, marginBottom:"2rem" }}>Other Srikara Branches</h3>

              <div className="branch-grid" style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:1, background:"#D5DCF0", borderRadius:12, overflow:"hidden", marginBottom:"2rem" }}>
                {BRANCHES.map((b,i) => (
                  <Link key={b} href={`/hospitals/${b.toLowerCase().replace(/ /g,"-")}`}
                    style={{
                      background: b==="Kompally"?`${N}0f`:"#FAFBFF",
                      padding:"1rem 1.1rem", textDecoration:"none",
                      display:"flex", alignItems:"center", justifyContent:"space-between",
                      transition:"background .2s",
                      borderLeft:`2px solid ${b==="Kompally"?N:"transparent"}`,
                      fontWeight:b==="Kompally"?700:600,
                      color:b==="Kompally"?N:"#4A5E78",
                      fontSize:".78rem",
                    }}
                    onMouseEnter={e => { if(b!=="Kompally"){ (e.currentTarget as HTMLAnchorElement).style.background="#EEF2FA"; (e.currentTarget as HTMLAnchorElement).style.borderLeftColor = i%2===0?N:M; } }}
                    onMouseLeave={e => { if(b!=="Kompally"){ (e.currentTarget as HTMLAnchorElement).style.background="#FAFBFF"; (e.currentTarget as HTMLAnchorElement).style.borderLeftColor="transparent"; } }}>
                    <span>{b==="Kompally"?"★ ":""}{b}</span>
                    <span style={{ fontSize:".7rem", color:i%2===0?N:M }}>→</span>
                  </Link>
                ))}
              </div>

              <Link href="/" style={{ display:"inline-flex", alignItems:"center", gap:8, fontSize:".78rem", fontWeight:700, color:N, textDecoration:"none", borderBottom:`1.5px solid ${N}40`, paddingBottom:2 }}>
                ← Back to Main Srikara Website
              </Link>
            </Fade>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ background:`linear-gradient(135deg,${ND} 0%,${N} 50%,${MD} 100%)` }}>
        <div style={{ height:4, background:`linear-gradient(90deg,${M},${ML},${M},${NL},${N})` }} />
        <div style={{ maxWidth:1400, margin:"0 auto", padding:"2rem 2.5rem" }}>
          <div className="footer-cols" style={{ display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:"1rem" }}>
            <div style={{ display:"flex", alignItems:"center", gap:12 }}>
              <div style={{ width:36, height:36, borderRadius:"50%", background:`${NL}60`, border:`2px solid ${M}50`, display:"flex", alignItems:"center", justifyContent:"center" }}>
                <span style={{ fontFamily:"'Gilda Display',serif", fontStyle:"italic", color:"#fff", fontSize:"1rem" }}>S</span>
              </div>
              <div>
                <span style={{ fontSize:".75rem", color:"#fff", fontWeight:700, letterSpacing:".02em" }}>Srikara <span style={{ color:M }}>Hospitals</span></span>
                <span style={{ fontSize:".62rem", color:"rgba(255,255,255,.38)", letterSpacing:".06em", display:"block", marginTop:1 }}>Kompally · © {new Date().getFullYear()} Srikara Hospital Group</span>
              </div>
            </div>
            <div style={{ display:"flex", gap:"2rem", flexWrap:"wrap" }}>
              {["Privacy Policy","Terms of Use","Sitemap"].map((l,i) => (
                <Link key={l} href="#" style={{ fontSize:".65rem", color:"rgba(255,255,255,.28)", textDecoration:"none", letterSpacing:".08em" }}
                  onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.color = i%2===0?M:"#fff"}
                  onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,.28)"}>
                  {l}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </footer>

      {/* ── FLOATING BOOK BUTTON ── */}
      <button className="btn-magenta float-book-btn" onClick={() => setShowBook(true)}
        style={{ position:"fixed", bottom:"2rem", right:"2rem", zIndex:400, fontSize:".78rem" }}>
        📅 Book Appointment
      </button>

      {/* ── APPOINTMENT MODAL ── */}
      {showBook && (
        <div onClick={e => { if(e.target===e.currentTarget){ setShowBook(false); setSelectedSlot(""); } }}
          style={{ position:"fixed", inset:0, zIndex:900, background:"rgba(13,27,46,.72)", backdropFilter:"blur(16px)", display:"flex", alignItems:"center", justifyContent:"center", padding:"1rem" }}>
          <div style={{ width:"100%", maxWidth:660, maxHeight:"92vh", overflowY:"auto", borderRadius:24, background:"#FAFBFF", boxShadow:"0 40px 100px rgba(27,42,74,.28)", animation:"slideUp .3s ease", position:"relative" }}>

            <div style={{ borderRadius:"24px 24px 0 0", overflow:"hidden" }}>
              <div style={{ height:5, background:`linear-gradient(90deg,${N},${NL},${M},${ML})` }} />
              <div className="appt-modal-header" style={{ display:"flex", position:"relative" }}>
                <div style={{ flex:1, background:N, padding:"2rem 2rem 1.5rem" }}>
                  <p style={{ fontSize:".6rem", fontWeight:700, letterSpacing:".18em", textTransform:"uppercase", color:"rgba(255,255,255,.6)", marginBottom:".4rem" }}>Srikara</p>
                  <h3 style={{ fontFamily:"'Gilda Display',serif", fontSize:"1.5rem", color:"#fff", lineHeight:1.1 }}>Book Your<br/>Appointment</h3>
                </div>
                <div style={{ flex:1, background:M, padding:"2rem 2rem 1.5rem", display:"flex", flexDirection:"column", justifyContent:"space-between" }}>
                  <p style={{ fontSize:".6rem", fontWeight:700, letterSpacing:".18em", textTransform:"uppercase", color:"rgba(255,255,255,.6)" }}>Hospitals · Kompally</p>
                  <div>
                    <p style={{ fontSize:".82rem", color:"rgba(255,255,255,.8)", marginBottom:".3rem" }}>✓ Confirmed within 30 mins</p>
                    <p style={{ fontSize:".78rem", color:"rgba(255,255,255,.7)" }}>Mon–Sat · 8 AM – 8 PM</p>
                  </div>
                  <button onClick={() => { setShowBook(false); setSelectedSlot(""); }}
                    style={{ background:"rgba(255,255,255,.15)", border:"none", borderRadius:"50%", width:32, height:32, display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer", color:"#fff", fontSize:"1rem", alignSelf:"flex-end" }}>✕</button>
                </div>
              </div>
            </div>

            <form onSubmit={submit} style={{ padding:"2rem" }}>
              <p style={{ fontSize:".6rem", fontWeight:800, letterSpacing:".2em", textTransform:"uppercase", color:N, marginBottom:"1rem" }}>Your Details</p>
              <div className="appt-grid" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"1rem", marginBottom:"1rem" }}>
                <div>
                  <label style={{ display:"block", fontSize:".68rem", fontWeight:700, color:"#4A5E78", marginBottom:".5rem" }}>Full Name *</label>
                  <input className="input-field" type="text" placeholder="Your full name" value={form.name} onChange={e => setForm(p => ({...p,name:e.target.value}))} />
                </div>
                <div>
                  <label style={{ display:"block", fontSize:".68rem", fontWeight:700, color:"#4A5E78", marginBottom:".5rem" }}>Mobile Number *</label>
                  <input className="input-field" type="tel" placeholder="+91 98765 43210" value={form.phone} onChange={e => setForm(p => ({...p,phone:e.target.value}))} />
                </div>
              </div>
              <div className="appt-grid" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"1rem", marginBottom:"1.5rem" }}>
                <div>
                  <label style={{ display:"block", fontSize:".68rem", fontWeight:700, color:"#4A5E78", marginBottom:".5rem" }}>Department *</label>
                  <select className="input-field" value={form.dept} onChange={e => setForm(p => ({...p,dept:e.target.value}))}>
                    <option value="">Select department</option>
                    {SPECIALITIES.map(s => <option key={s.name}>{s.name}</option>)}
                    <option>General Medicine</option><option>Dermatology</option><option>ENT</option>
                  </select>
                </div>
                <div>
                  <label style={{ display:"block", fontSize:".68rem", fontWeight:700, color:"#4A5E78", marginBottom:".5rem" }}>Preferred Date *</label>
                  <input className="input-field" type="date" value={form.date} onChange={e => setForm(p => ({...p,date:e.target.value}))} min={new Date().toISOString().split("T")[0]} />
                </div>
              </div>

              <div style={{ marginBottom:"2rem" }}>
                <div style={{ background:"#F2F4FA", borderRadius:12, border:"1px solid #D5DCF0", padding:"1.5rem" }}>
                  <p style={{ fontSize:".6rem", fontWeight:800, letterSpacing:".2em", textTransform:"uppercase", color:M, marginBottom:"1.2rem" }}>Pick a Time Slot</p>
                  <div style={{ display:"flex", flexWrap:"wrap", gap:".6rem" }}>
                    {SLOTS.map((sl,i) => (
                      <button key={sl} type="button"
                        className={`slot-btn${selectedSlot===sl?(i%2===0?" sel-navy":" sel-magenta"):""}`}
                        onClick={() => setSelectedSlot(selectedSlot===sl?"":sl)}>
                        {sl}
                      </button>
                    ))}
                  </div>
                  {selectedSlot && (
                    <div style={{ marginTop:"1rem", display:"flex", alignItems:"center", gap:8, padding:".6rem 1rem", background:`${N}10`, borderRadius:100, width:"fit-content" }}>
                      <span style={{ fontSize:".75rem" }}>✅</span>
                      <span style={{ fontSize:".75rem", fontWeight:700, color:N }}>Selected: {selectedSlot}</span>
                    </div>
                  )}
                </div>
              </div>

              <button type="submit"
                style={{ width:"100%", justifyContent:"center", padding:"1rem", fontSize:".9rem", background:sent?"#22c55e":`linear-gradient(90deg,${N},${M})`, color:"#fff", border:"none", borderRadius:100, fontFamily:"'Nunito',sans-serif", fontWeight:700, letterSpacing:".06em", cursor:"pointer", transition:"all .35s", display:"flex", alignItems:"center", gap:8 }}>
                {sent ? "✓ Appointment Confirmed! We'll call you shortly." : "Confirm Appointment →"}
              </button>
              <p style={{ textAlign:"center", fontSize:".72rem", color:"#8A9CB4", marginTop:"1rem" }}>
                Walk-ins welcome · Or call <a href="tel:040-4856-2300" style={{ color:M, fontWeight:700, textDecoration:"none" }}>040-4856-2300</a>
              </p>
            </form>
          </div>
        </div>
      )}
    </>
  );
}