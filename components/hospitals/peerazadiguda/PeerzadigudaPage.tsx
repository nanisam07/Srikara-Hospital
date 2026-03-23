"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

/* ── IMAGES ── */
const P = {
  h1:    "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=1200&q=85",
  h2:    "https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?w=800&q=85",
  h3:    "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&q=85",
  h4:    "https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=800&q=85",
  about: "https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=1000&q=85",
  doc1:  "https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=500&q=85",
  doc2:  "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=500&q=85",
  doc3:  "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=500&q=85",
  doc4:  "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=500&q=85",
  doc5:  "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=500&q=85",
  doc6:  "https://images.unsplash.com/photo-1651008376811-b90baee60c1f?w=500&q=85",
  c1:    "https://images.unsplash.com/photo-1628348068343-c6a848d2b6dd?w=600&q=85",
  c2:    "https://images.unsplash.com/photo-1530026186672-2cd00ffc50fe?w=600&q=85",
  c3:    "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=600&q=85",
  c4:    "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&q=85",
  c5:    "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=600&q=85",
  c6:    "https://images.unsplash.com/photo-1579154204601-01588f351e67?w=600&q=85",
  fac1:  "https://images.unsplash.com/photo-1530497610245-94d3c16cda28?w=700&q=85",
  fac2:  "https://images.unsplash.com/photo-1579154204601-01588f351e67?w=700&q=85",
  fac3:  "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=700&q=85",
  ambu:  "https://images.unsplash.com/photo-1587745416684-47953f16f02f?w=900&q=85",
};

const N  = "#1B2A4A";
const ND = "#0F1E35";
const NL = "#2E4A7A";
const M  = "#B8246E";
const MD = "#8A1A52";
const ML = "#D4408A";
const AM = "#F59E0B";

/* ── DATA ── */
const DEPTS = [
  { n:"Orthopedic",       sub:"Bone, Joint & Spine",        icon:"🦴", img:P.c2, clr:M,  txt:"Robotic joint replacement, arthroscopic surgery, fracture care and comprehensive trauma management." },
  { n:"Cardiology",       sub:"Heart & Vascular",           icon:"🫀", img:P.c1, clr:N,  txt:"Interventional cardiology — cath lab, angioplasty and complete cardiac care." },
  { n:"General Physician",sub:"Internal Medicine",          icon:"🩺", img:P.c4, clr:NL, txt:"Expert general medicine, diabetology, preventive care and critical care for complex conditions." },
  { n:"Neurology",        sub:"Brain & Nervous System",     icon:"🧠", img:P.c3, clr:N,  txt:"Neuro and spine surgery, stroke care, neurological medicine and complete neuro-rehabilitation." },
  { n:"General Surgery",  sub:"Surgical Care",              icon:"⚕️", img:P.c5, clr:M,  txt:"General, laser and laparoscopic surgery using minimally invasive techniques for faster recovery." },
  { n:"Urology",          sub:"Urological Care",            icon:"🔬", img:P.c6, clr:N,  txt:"Complete urological care including kidney stones, prostate conditions and reconstructive procedures." },
  { n:"Nephrology",       sub:"Kidney Care",                icon:"🫘", img:P.c1, clr:ML, txt:"Expert nephrology care for CKD, dialysis, kidney disease and electrolyte disorders." },
  { n:"Physiotherapy",    sub:"Rehabilitation",             icon:"🏃", img:P.c2, clr:NL, txt:"Structured physiotherapy and rehabilitation for orthopaedic, neurological and post-surgical recovery." },
  { n:"Plastic Surgery",  sub:"Reconstructive & Aesthetic", icon:"✨", img:P.c3, clr:M,  txt:"Plastic reconstructive and aesthetic surgery for trauma, burns and cosmetic enhancement." },
  { n:"Anesthesia",       sub:"Anaesthesia & Critical Care",icon:"💉", img:P.c4, clr:N,  txt:"Expert anaesthesia and critical care management for surgical and ICU patients." },
];

const DOCS = [
  { name:"Dr. Karunakar Reddy",  role:"Robotic Joint Replacement, Arthroscopic & Trauma Surgeon", qual:"D. Ortho, DNB Ortho, MNAMS, FIJR",        slug:"karunakar-reddy",  img:"/Peeriziguda/DR.KARUNAKAR.png",     acc:M },
  { name:"Dr. Eshwar Patel",     role:"Robotic Joint Replacement, Arthroscopic & Trauma Surgeon", qual:"MS (Ortho), FIJR",                         slug:"eshwar-patel",     img:"/Peeriziguda/DR.ESHWARPATEL.png",   acc:N },
  { name:"Dr. Sachin Bhatkar",   role:"Interventional Cardiologist",                              qual:"MD, DrNB (Cardiology)",                     slug:"sachin-bhatkar",   img:"/Peeriziguda/DR.SACHIN.png",        acc:M },
  { name:"Dr. Raghu Prasad",     role:"General Physician & Diabetologist",                        qual:"DNB (General Medicine, Manipal)",           slug:"raghu-prasad",     img:"/Peeriziguda/DR.RAGHUPRASAD.png",   acc:N },
  { name:"Dr. D. Nagendra Babu", role:"Neuro & Spine Surgery",                                   qual:"MS, MCh (Neuro Surgery)",                   slug:"nagendra-babu",    img:"/Peeriziguda/DR.NAGENDRA BABU.png", acc:M },
  { name:"Dr. Naveen Kumar",     role:"General, Laser & Laparoscopic Surgeon",                    qual:"DNB (General Surgery)",                     slug:"naveen-kumar",     img:"/Peeriziguda/DR.NAVEEN KUMAR.png",  acc:N },
  { name:"Dr. Vinayak Ingalalli",role:"Urologist",                                                qual:"MS, MCh",                                   slug:"vinayak-ingalalli", img:"",                                 acc:M },
  { name:"Dr. G. Roja Sree",    role:"Nephrologist",                                              qual:"MD, DrNB (Nephrology)",                     slug:"roja-sree",        img:"/Peeriziguda/DR.GRojaSree.jpeg",    acc:N },
  { name:"Dr. Praveen Kumar",    role:"Physiotherapist",                                          qual:"BPT, MPT (Ortho)",                          slug:"praveen-kumar",    img:"/Peeriziguda/DR.PRAVEEN.png",       acc:M },
  { name:"Dr. Vineel Kolloju",   role:"Plastic Reconstructive & Aesthetic Surgeon",               qual:"MS, M.Ch (Plastic Surgery)",                slug:"vineel-kolloju",   img:"",                                  acc:N },
  { name:"Dr. Rahul",            role:"Critical Care Specialist",                                 qual:"MD (Anesthesia & Critical Care)",           slug:"rahul",            img:"",                                  acc:M },
  { name:"Dr. Ch. Kishan",       role:"Critical Care Specialist",                                 qual:"MD (Anesthesia & Critical Care)",           slug:"ch-kishan",        img:"",                                  acc:N },
  { name:"Dr. Harsha",           role:"Critical Care Specialist",                                 qual:"MD (Anesthesia & Critical Care)",           slug:"harsha",           img:"",                                  acc:M },
];

const TESTIS = [
  { q:"The cardiac team at Srikara Peerzadiguda had me in the cath lab within 14 minutes. Dr. Ravi Shankar's skill and the ICU team's warmth gave me my life back.", name:"Gopalaiah M.",       area:"Peerzadiguda", dept:"Cardiology",  col:N },
  { q:"Six years of knee pain ended with Dr. Preethi's surgery. I was walking the next morning. The physiotherapy team here is exceptional.",                          name:"Vijaya Lakshmi K.", area:"Uppal",         dept:"Orthopaedics", col:M },
  { q:"My mother's stroke was managed perfectly from emergency to ICU to rehabilitation. I've never seen care so seamlessly coordinated.",                             name:"Karthik Reddy",    area:"Nacharam",      dept:"Neurology",    col:N },
];

const BRANCHES = ["RTC X Roads","Miyapur","Lakdikapul","Kompally","LB Nagar","Vijayawada","Rajahmundry","ECIL","Peerzadiguda"];
const SLOTS    = ["9:00 AM","10:00 AM","11:00 AM","12:00 PM","2:00 PM","3:00 PM","4:00 PM","5:00 PM","6:00 PM"];

/* ── HELPERS ── */
function useVis(t=0.08){
  const r=useRef<HTMLDivElement>(null);
  const [on,setOn]=useState(false);
  useEffect(()=>{
    const el=r.current;if(!el)return;
    const io=new IntersectionObserver(([e])=>{if(e.isIntersecting){setOn(true);io.unobserve(el);}},{threshold:t});
    io.observe(el);return()=>io.disconnect();
  },[t]);
  return{r,on};
}
function Fade({c,d=0,dx=0,dy=28}:{c:React.ReactNode;d?:number;dx?:number;dy?:number}){
  const{r,on}=useVis();
  return<div ref={r} style={{transition:`opacity .85s ease ${d}ms,transform .85s ease ${d}ms`,opacity:on?1:0,transform:on?"none":`translate(${dx}px,${dy}px)`}}>{c}</div>;
}
function Cnt({to,suf,go}:{to:number;suf:string;go:boolean}){
  const[v,setV]=useState(0);const done=useRef(false);
  useEffect(()=>{if(!go||done.current)return;done.current=true;let f=0;const t=()=>{f++;const p=Math.min(f/75,1);setV(Math.round(to*(1-Math.pow(1-p,3))));if(p<1)requestAnimationFrame(t);};requestAnimationFrame(t);},[go,to]);
  return<>{v}{suf}</>;
}

/* ── PAGE ── */
export default function PeerzadigudaPage() {
  const [scrolled,  setScrolled]  = useState(false);
  const [mobileNav, setMobileNav] = useState(false);
  const [activeDept,setActiveDept]= useState(0);
  const [activeTst, setActiveTst] = useState(0);
  const [bookOpen,  setBookOpen]  = useState(false);
  const [statsRun,  setStatsRun]  = useState(false);
  const [form,setForm] = useState({name:"",phone:"",dept:"",date:"",slot:""});
  const [sent,setSent] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(()=>{
    const fn=()=>setScrolled(window.scrollY>60);
    window.addEventListener("scroll",fn,{passive:true});
    const t=setInterval(()=>setActiveTst(p=>(p+1)%TESTIS.length),5800);
    const el=statsRef.current;
    if(el){const io=new IntersectionObserver(([e])=>{if(e.isIntersecting){setStatsRun(true);io.disconnect();}},{threshold:.35});io.observe(el);}
    return()=>{window.removeEventListener("scroll",fn);clearInterval(t);};
  },[]);

  const submit=(e:React.FormEvent)=>{e.preventDefault();setSent(true);setTimeout(()=>{setSent(false);setBookOpen(false);setForm({name:"",phone:"",dept:"",date:"",slot:""});},3500);};

  const WH="#FFFFFF", OF="#F8FAFC", BD="#E2E8F0", TM="#334155", TL="#64748B";

  return(
  <>
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;0,9..144,600;1,9..144,300;1,9..144,400&display=swap');
    *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
    html{scroll-behavior:smooth;}
    body{font-family:'Space Grotesk',sans-serif;background:${OF};color:${N};overflow-x:hidden;}

    ::-webkit-scrollbar{width:5px;}
    ::-webkit-scrollbar-track{background:#EEF2FA;}
    ::-webkit-scrollbar-thumb{background:${M};border-radius:3px;}

    @keyframes fadeUp{from{opacity:0;transform:translateY(30px)}to{opacity:1;transform:none}}
    @keyframes zoomIn{from{transform:scale(1.06)}to{transform:scale(1)}}
    @keyframes marquee{from{transform:translateX(0)}to{transform:translateX(-50%)}}
    @keyframes blink{0%,100%{opacity:1}50%{opacity:.25}}
    @keyframes slideUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:none}}
    @keyframes pulse{0%,100%{box-shadow:0 0 0 0 rgba(27,42,74,.35)}60%{box-shadow:0 0 0 12px rgba(27,42,74,0)}}
    @keyframes mpulse{0%,100%{box-shadow:0 8px 28px rgba(184,36,110,.45)}60%{box-shadow:0 12px 36px rgba(184,36,110,.25)}}

    .a1{animation:fadeUp .8s ease .05s both}.a2{animation:fadeUp .8s ease .22s both}
    .a3{animation:fadeUp .8s ease .4s both}.a4{animation:fadeUp .8s ease .58s both}
    .a5{animation:fadeUp .8s ease .75s both}.a6{animation:fadeUp .8s ease .92s both}

    .nl{font-size:.82rem;font-weight:600;color:${TM};text-decoration:none;transition:color .2s;letter-spacing:.01em;}
    .nl:hover{color:${N};}

    .diag-bot{clip-path:polygon(0 0,100% 0,100% 88%,0 100%);}
    .diag-top{clip-path:polygon(0 6%,100% 0,100% 100%,0 100%);}
    .diag-both{clip-path:polygon(0 5%,100% 0,100% 95%,0 100%);}

    .dept-card{transition:all .3s;cursor:pointer;position:relative;overflow:hidden;}
    .dept-card:hover{transform:translateY(-6px);box-shadow:0 20px 50px rgba(27,42,74,.14)!important;}
    .dept-card img{transition:transform .5s;}
    .dept-card:hover img{transform:scale(1.06);}
    .dept-card .overlay{transition:opacity .3s;opacity:0;}
    .dept-card:hover .overlay{opacity:1;}

    .doc-card{transition:all .3s;overflow:hidden;}
    .doc-card:hover{transform:translateY(-5px);box-shadow:0 20px 50px rgba(27,42,74,.12)!important;}
    .doc-card img{transition:transform .5s;}
    .doc-card:hover img{transform:scale(1.05);}

    .btn-navy{display:inline-flex;align-items:center;gap:8px;background:${N};color:#fff;padding:.9rem 2.2rem;border-radius:8px;font-family:'Space Grotesk',sans-serif;font-size:.88rem;font-weight:700;border:none;cursor:pointer;text-decoration:none;transition:all .28s;letter-spacing:.03em;box-shadow:0 4px 16px rgba(27,42,74,.28);}
    .btn-navy:hover{background:${ND};transform:translateY(-2px);box-shadow:0 8px 28px rgba(27,42,74,.38);}

    .btn-mg{display:inline-flex;align-items:center;gap:8px;background:${M};color:#fff;padding:.9rem 2.2rem;border-radius:8px;font-family:'Space Grotesk',sans-serif;font-size:.88rem;font-weight:700;border:none;cursor:pointer;text-decoration:none;transition:all .28s;letter-spacing:.03em;box-shadow:0 4px 16px rgba(184,36,110,.28);}
    .btn-mg:hover{background:${MD};transform:translateY(-2px);box-shadow:0 8px 28px rgba(184,36,110,.38);}

    .btn-wh{display:inline-flex;align-items:center;gap:8px;background:#fff;color:${N};padding:.9rem 2.2rem;border-radius:8px;font-family:'Space Grotesk',sans-serif;font-size:.88rem;font-weight:700;border:none;cursor:pointer;text-decoration:none;transition:all .28s;}
    .btn-wh:hover{background:#F1F5F9;}

    .btn-ghost{display:inline-flex;align-items:center;gap:8px;background:transparent;color:#fff;padding:.9rem 2.2rem;border-radius:8px;font-family:'Space Grotesk',sans-serif;font-size:.88rem;font-weight:700;border:2px solid rgba(255,255,255,.4);cursor:pointer;text-decoration:none;transition:all .28s;}
    .btn-ghost:hover{background:rgba(255,255,255,.1);border-color:#fff;}

    .btn-outline-n{display:inline-flex;align-items:center;gap:8px;background:transparent;color:${N};padding:.9rem 2.2rem;border-radius:8px;font-family:'Space Grotesk',sans-serif;font-size:.88rem;font-weight:700;border:2px solid ${N};cursor:pointer;text-decoration:none;transition:all .28s;}
    .btn-outline-n:hover{background:${N};color:#fff;}

    .fi{width:100%;border:1.5px solid ${BD};border-radius:10px;padding:.78rem 1rem;font-family:'Space Grotesk',sans-serif;font-size:.92rem;color:${N};background:#fff;outline:none;transition:border-color .2s;}
    .fi:focus{border-color:${N};}
    .fi::placeholder{color:${TL};}
    .fi option{background:#fff;}

    .sl{font-family:'Space Grotesk',sans-serif;font-size:.78rem;font-weight:600;border:1.5px solid ${BD};border-radius:7px;padding:.42rem .9rem;cursor:pointer;transition:all .2s;background:#fff;color:${TM};}
    .sl:hover{border-color:${N};color:${N};}
    .sl.on{background:${N};color:#fff;border-color:${N};}

    .dtab{cursor:pointer;transition:all .25s;border-bottom:2px solid transparent;}
    .dtab:hover{color:${N}!important;}
    .dtab.on{border-bottom-color:currentColor!important;color:${N}!important;font-weight:700!important;}

    /* ── MOBILE RESPONSIVE ── */
    @media(max-width:900px){
      /* Existing breakpoints preserved */
      .desk{display:none!important;}
      .hero-mosaic{display:none!important;}
      .hero-cols{flex-direction:column!important;}
      .stat-row{grid-template-columns:1fr 1fr!important;}
      .dept-grid{grid-template-columns:1fr 1fr!important;}
      .doc-grid{grid-template-columns:1fr 1fr!important;}
      .fac-cols{flex-direction:column!important;}
      .test-pad{padding:2rem 1.5rem!important;}
      .contact-cols{flex-direction:column!important;}
      .bk-grid{grid-template-columns:1fr!important;}
      .branch-g{grid-template-columns:1fr 1fr!important;}
      .sec{padding:4.5rem 1.5rem!important;}
      .hero-inner{padding:5rem 1.5rem 3rem!important;}
      .diag-bot,.diag-top,.diag-both{clip-path:none!important;}

      /* Top strip */
      .top-strip{flex-direction:column!important;align-items:flex-start!important;padding:.5rem 1.2rem!important;gap:.4rem!important;}
      .top-strip-right{gap:.8rem!important;}
      .top-strip-addr{display:none!important;}

      /* Navbar */
      .nav-inner{padding:0 1.2rem!important;height:60px!important;}
      .mob-ham{display:flex!important;}

      /* Hero */
      .hero-section{min-height:auto!important;padding-bottom:2rem!important;}
      .hero-text{flex:none!important;width:100%!important;}

      /* About grid */
      .about-grid{grid-template-columns:1fr!important;gap:2.5rem!important;}
      .about-img{height:300px!important;}
      .about-img img{height:300px!important;}
      .about-feat-grid{grid-template-columns:1fr 1fr!important;}

      /* Dept panel */
      .dept-panel{grid-template-columns:1fr!important;}
      .dept-panel-img{height:220px!important;}

      /* Dept tab bar — scrollable */
      .dept-tabs{overflow-x:auto!important;-webkit-overflow-scrolling:touch!important;}

      /* Facility cards */
      .fac-card-inner{flex-direction:column!important;}
      .fac-card-img{flex:none!important;width:100%!important;height:200px!important;min-height:200px!important;}
      .fac-card-text{border-left:none!important;border-top:3px solid!important;}

      /* Contact */
      .contact-card{flex:none!important;width:100%!important;}

      /* Modal */
      .modal-header{flex-direction:column!important;}
      .modal-navy{border-radius:0!important;}
      .modal-mg{border-radius:0!important;}

      /* Footer */
      .footer-inner{flex-direction:column!important;align-items:flex-start!important;gap:1.2rem!important;padding:1.8rem 1.2rem!important;}
      .footer-links{gap:1.2rem!important;}
    }

    @media(max-width:600px){
      .dept-grid{grid-template-columns:1fr 1fr 1fr!important;}
      .doc-grid{grid-template-columns:1fr!important;}
      .stat-row{grid-template-columns:1fr 1fr!important;}
      .about-feat-grid{grid-template-columns:1fr!important;}
      .branch-g{grid-template-columns:1fr 1fr!important;}
    }

    @media(max-width:420px){
      .doc-grid{grid-template-columns:1fr!important;}
      .branch-g{grid-template-columns:1fr 1fr!important;}
      .hero-ctas{flex-direction:column!important;}
      .hero-ctas a,.hero-ctas button{width:100%!important;justify-content:center!important;}
    }

    .mob-ham{display:none;flex-direction:column;gap:5px;background:none;border:1.5px solid ${BD};border-radius:8px;padding:.4rem .6rem;cursor:pointer;}
    @media(max-width:900px){.mob-ham{display:flex!important;}}
  `}</style>

  {/* ── TOP STRIP ── */}
  <div className="top-strip" style={{background:`linear-gradient(90deg,${N} 0%,${ND} 45%,${MD} 75%,${M} 100%)`,padding:"6px 2rem",display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:".4rem"}}>
    <div style={{display:"flex",alignItems:"center",gap:"1.5rem"}}>
      <div style={{display:"flex",alignItems:"center",gap:7}}>
        <span style={{width:7,height:7,borderRadius:"50%",background:"#4ADE80",animation:"blink 1.4s ease infinite",display:"inline-block"}}/>
        <span style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:".62rem",fontWeight:700,letterSpacing:".18em",textTransform:"uppercase",color:"rgba(255,255,255,.7)"}}>24/7 Emergency</span>
      </div>
      <a href="tel:040-2989-7700" style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:".85rem",fontWeight:800,color:"#fff",textDecoration:"none"}}>040-2989-7700</a>
    </div>
    <div className="top-strip-right" style={{display:"flex",gap:"1.5rem",alignItems:"center"}}>
      <span className="top-strip-addr" style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:".62rem",color:"rgba(255,255,255,.45)"}}>Peerzadiguda, Hyderabad – 500039</span>
      <Link href="/" style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:".62rem",fontWeight:700,color:"rgba(255,255,255,.55)",textDecoration:"none",letterSpacing:".1em",textTransform:"uppercase"}}>← Main Site</Link>
    </div>
  </div>

  {/* ── NAVBAR ── */}
  <header style={{position:"sticky",top:0,zIndex:500,background:scrolled?"rgba(255,255,255,.97)":"#fff",backdropFilter:scrolled?"blur(14px)":"none",borderBottom:`1px solid ${scrolled?BD:"rgba(226,232,240,.5)"}`,boxShadow:scrolled?"0 2px 20px rgba(27,42,74,.07)":"none",transition:"all .3s"}}>
    <div style={{height:3,background:`linear-gradient(90deg,${N},${NL},${M},${ML},${M},${N})`}}/>
    <div className="nav-inner" style={{maxWidth:1400,margin:"0 auto",padding:"0 2rem",height:68,display:"flex",alignItems:"center",justifyContent:"space-between"}}>

      <Link href="/" style={{display:"flex",alignItems:"center",gap:11,textDecoration:"none"}}>
        <div style={{position:"relative",width:42,height:42,flexShrink:0}}>
          <img src="/srikara-logo.png" alt="Srikara Hospitals" style={{width:44,height:44,objectFit:"contain",borderRadius:6}}/>
          <div style={{position:"absolute",bottom:2,right:2,width:9,height:9,borderRadius:"50%",background:M,border:"2px solid #fff"}}/>
        </div>
        <div>
          <p style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:".95rem",fontWeight:700,color:N,lineHeight:1.05}}>Srikara</p>
          <p style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:".6rem",fontWeight:800,color:M,letterSpacing:".18em",textTransform:"uppercase",lineHeight:1}}>Hospitals</p>
          <p style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:".5rem",color:TL,letterSpacing:".12em",textTransform:"uppercase",marginTop:1}}>Peerzadiguda, Hyderabad</p>
        </div>
      </Link>

      <nav className="desk" style={{display:"flex",alignItems:"center",gap:"1.8rem"}}>
        {[{l:"Home",h:"#"},{l:"Doctors",h:"#docs"},{l:"Departments",h:"#depts"}].map((lk,i)=>(
          <Link key={lk.h} href={lk.h} className="nl"
            onMouseEnter={e=>(e.currentTarget as HTMLAnchorElement).style.color=i%2===0?N:M}
            onMouseLeave={e=>(e.currentTarget as HTMLAnchorElement).style.color=TM}>{lk.l}</Link>
        ))}
      </nav>

      <div style={{display:"flex",alignItems:"center",gap:".8rem"}}>
        <a href="tel:040-2989-7800" className="desk nl" style={{display:"flex",alignItems:"center",gap:5}}>
          <span>📞</span> 040-2989-7800
        </a>
        <button className="btn-mg" onClick={()=>setBookOpen(true)} style={{padding:".5rem 1.25rem",fontSize:".8rem"}}>Book Appointment</button>
        <button onClick={()=>setMobileNav(!mobileNav)} className="mob-ham">
          <span style={{display:"block",width:20,height:1.5,background:N}}/>
          <span style={{display:"block",width:20,height:1.5,background:M}}/>
          <span style={{display:"block",width:20,height:1.5,background:N}}/>
        </button>
      </div>
    </div>

    {mobileNav&&(
      <div style={{background:"#fff",borderTop:`1px solid ${BD}`,padding:"1rem 1.5rem",display:"flex",flexDirection:"column",gap:"1rem"}}>
        {[{l:"Home",h:"#"},{l:"Doctors",h:"#docs"},{l:"Departments",h:"#depts"}].map(lk=>(
          <Link key={lk.h} href={lk.h} onClick={()=>setMobileNav(false)} style={{color:TM,textDecoration:"none",fontWeight:600,fontSize:".9rem",padding:".4rem 0",borderBottom:`1px solid ${BD}`}}>{lk.l}</Link>
        ))}
        <a href="tel:040-2989-7700" style={{color:N,textDecoration:"none",fontWeight:600,fontSize:".9rem",padding:".4rem 0",borderBottom:`1px solid ${BD}`}}>📞 040-2989-7700</a>
        <button className="btn-mg" onClick={()=>{setMobileNav(false);setBookOpen(true);}} style={{justifyContent:"center"}}>Book Appointment</button>
      </div>
    )}
  </header>

  {/* ══════════════════════════════════════════
      HERO
      ══════════════════════════════════════════ */}
  <section className="hero-section" style={{background:`linear-gradient(125deg,${N} 0%,${ND} 50%,${MD} 80%,${M} 100%)`,position:"relative",overflow:"hidden",minHeight:"92vh",paddingBottom:80}} >
    <div style={{position:"absolute",inset:0,zIndex:0}}>
      <img src={P.h1} alt="" style={{width:"100%",height:"100%",objectFit:"cover",opacity:.1,animation:"zoomIn 10s ease-out forwards"}}/>
      <div style={{position:"absolute",inset:0,background:`linear-gradient(125deg,${N}F2 0%,rgba(15,30,53,.88) 50%,rgba(138,26,82,.78) 80%,${M}CC 100%)`}}/>
    </div>
    <div style={{position:"absolute",inset:0,zIndex:0,backgroundImage:`linear-gradient(rgba(184,36,110,.06) 1px,transparent 1px),linear-gradient(90deg,rgba(27,42,74,.06) 1px,transparent 1px)`,backgroundSize:"60px 60px",pointerEvents:"none"}}/>

    <div className="hero-inner" style={{position:"relative",zIndex:2,maxWidth:1400,margin:"0 auto",padding:"7rem 2rem 5rem",display:"flex",alignItems:"center",gap:"4rem"}}>

      {/* LEFT TEXT */}
      <div className="hero-text" style={{flex:"0 0 52%"}}>
        <div className="a1" style={{display:"inline-flex",alignItems:"center",gap:8,background:"rgba(184,36,110,.15)",border:"1px solid rgba(184,36,110,.35)",borderRadius:100,padding:".35rem 1.1rem",marginBottom:"2rem"}}>
          <span style={{width:6,height:6,borderRadius:"50%",background:ML,animation:"blink 2s ease infinite",display:"inline-block"}}/>
          <span style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:".62rem",fontWeight:700,letterSpacing:".18em",textTransform:"uppercase",color:ML}}>NABH Accredited · Est. 2015 · Peerzadiguda</span>
        </div>

        <h1 className="a2" style={{fontFamily:"'Fraunces',serif",fontSize:"clamp(3rem,5vw,5rem)",fontWeight:300,color:"#fff",lineHeight:1.1,marginBottom:".8rem"}}>
          Trusted Care
        </h1>
        <h1 className="a2" style={{fontFamily:"'Fraunces',serif",fontSize:"clamp(3rem,5vw,5rem)",fontWeight:300,fontStyle:"italic",color:ML,lineHeight:1.1,marginBottom:"2.5rem"}}>
          Right Here.
        </h1>

        <p className="a3" style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:"1.05rem",color:"rgba(255,255,255,.72)",lineHeight:1.85,maxWidth:500,marginBottom:"2.8rem"}}>
          East Hyderabad's most comprehensive multi-specialty hospital. 32 super-specialists, robotic surgery, AI diagnostics — serving Peerzadiguda, Uppal, Nacharam and beyond since 2015.
        </p>

        <div className="a4 hero-ctas" style={{display:"flex",gap:"1rem",flexWrap:"wrap",marginBottom:"2.5rem"}}>
          <button className="btn-mg" onClick={()=>setBookOpen(true)}>📅 Book Appointment</button>
          <a href="tel:040-2989-7700" className="btn-ghost">🚨 Emergency</a>
        </div>

        <div className="a5" style={{display:"flex",gap:".8rem",flexWrap:"wrap"}}>
          {[{t:"NABH Accredited",c:NL},{t:"ISO 9001",c:ML},{t:"NABL Certified",c:NL},{t:"100+ Insurers",c:ML}].map(b=>(
            <span key={b.t} style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:".62rem",fontWeight:600,color:"rgba(255,255,255,.82)",background:`${b.c}22`,border:`1px solid ${b.c}50`,borderRadius:6,padding:".28rem .85rem"}}>{b.t}</span>
          ))}
        </div>
      </div>

      {/* RIGHT PHOTO MOSAIC — hidden on mobile */}
      <div className="a3 hero-mosaic" style={{flex:1,display:"grid",gridTemplateColumns:"1fr 1fr",gridTemplateRows:"220px 220px",gap:12,position:"relative"}}>
        {[
          {img:P.h2,span:"",     radius:"16px 16px 0 0"},
          {img:P.h3,span:"",     radius:"16px 16px 0 0"},
          {img:P.h4,span:"1/-1", radius:"0 0 16px 16px"},
        ].map((m,i)=>(
          <div key={i} style={{gridColumn:m.span||"auto",overflow:"hidden",borderRadius:m.radius,position:"relative",boxShadow:"0 16px 40px rgba(0,0,0,.35)"}}>
            <img src={m.img} alt="" style={{width:"100%",height:"100%",objectFit:"cover",display:"block",animation:"zoomIn 8s ease-out forwards"}}/>
            <div style={{position:"absolute",inset:0,background:`rgba(15,30,53,.22)`}}/>
          </div>
        ))}
        <div style={{position:"absolute",bottom:16,right:-12,background:"#fff",borderRadius:14,padding:"1rem 1.3rem",boxShadow:"0 16px 40px rgba(0,0,0,.2)",border:`1px solid ${BD}`,minWidth:170}}>
          <div style={{display:"flex",alignItems:"center",gap:7,marginBottom:4}}>
            <span style={{width:8,height:8,borderRadius:"50%",background:"#EF4444",animation:"blink 1.2s ease infinite",display:"inline-block"}}/>
            <span style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:".6rem",fontWeight:800,letterSpacing:".14em",textTransform:"uppercase",color:"#EF4444"}}>Emergency</span>
          </div>
          <p style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:"1rem",fontWeight:800,color:N}}>040-2989-7700</p>
          <p style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:".62rem",color:TL,marginTop:2}}>Available 24 hours</p>
        </div>
      </div>
    </div>
  </section>

  {/* Mobile emergency card — shown below hero on mobile */}
  <div style={{display:"none"}} className="mob-emrg-card">
    <div style={{background:"#fff",margin:"0 1.2rem",padding:"1rem 1.2rem",boxShadow:"0 6px 20px rgba(0,0,0,.09)",borderRadius:12,border:`1px solid ${BD}`,marginTop:"1rem"}}>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:".5rem"}}>
        <div style={{display:"flex",alignItems:"center",gap:7}}>
          <span style={{width:8,height:8,borderRadius:"50%",background:"#EF4444",animation:"blink 1.2s ease infinite",display:"inline-block"}}/>
          <span style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:".62rem",fontWeight:800,letterSpacing:".14em",textTransform:"uppercase",color:"#EF4444"}}>Emergency 24/7</span>
        </div>
        <a href="tel:040-2989-7700" style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:"1rem",fontWeight:800,color:N,textDecoration:"none"}}>040-2989-7700</a>
      </div>
    </div>
  </div>
  <style>{`@media(max-width:900px){.mob-emrg-card{display:block!important;margin-bottom:.5rem;}}`}</style>

  {/* ── STATS ── */}
  <div ref={statsRef} style={{background:AM,position:"relative",zIndex:5,marginTop:"-1px"}}>
    <div className="stat-row" style={{maxWidth:1400,margin:"0 auto",display:"grid",gridTemplateColumns:"repeat(4,1fr)"}}>
      {[{n:9,s:"+",l:"Years of Service",c:N},{n:32,s:"+",l:"Specialists",c:M},{n:42,s:"k+",l:"Patients Annually",c:N},{n:200,s:"",l:"Bed Capacity",c:M}].map((s,i)=>(
        <div key={i} style={{padding:"2rem 1.5rem",textAlign:"center",borderRight:i<3?"1px solid rgba(255,255,255,.3)":"none"}}>
          <p style={{fontFamily:"'Fraunces',serif",fontSize:"2.8rem",fontWeight:600,color:s.c,lineHeight:1}}><Cnt to={s.n} suf={s.s} go={statsRun}/></p>
          <p style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:".72rem",fontWeight:700,letterSpacing:".12em",textTransform:"uppercase",color:"rgba(12,27,51,.7)",marginTop:5}}>{s.l}</p>
        </div>
      ))}
    </div>
  </div>

  {/* ── MARQUEE ── */}
  <div style={{background:N,padding:".75rem 0",overflow:"hidden",whiteSpace:"nowrap"}}>
    <div style={{display:"inline-flex",gap:"3rem",animation:"marquee 32s linear infinite"}}>
      {Array(3).fill(["Advanced Cardiac Care","Robotic Surgery","Level III NICU","3T MRI & PET-CT","24/7 Emergency","NABH Accredited","IVF Clinic","NABL Lab","Stroke Unit","Tumour Board","Bariatric Surgery","Physiotherapy"]).flat().map((t,i)=>(
        <span key={i} style={{display:"inline-flex",alignItems:"center",gap:".8rem",fontFamily:"'Space Grotesk',sans-serif",fontSize:".7rem",fontWeight:700,letterSpacing:".16em",textTransform:"uppercase",color:"rgba(255,255,255,.85)"}}>
          <span style={{width:5,height:5,borderRadius:"50%",background:i%2===0?ML:"rgba(255,255,255,.5)",display:"inline-block"}}/>{t}
        </span>
      ))}
    </div>
  </div>

  {/* ══════════════════════════════════════════
      ABOUT
      ══════════════════════════════════════════ */}
  <section id="about" style={{background:OF,padding:"8rem 2rem",position:"relative"}} className="sec">
    <div style={{maxWidth:1400,margin:"0 auto"}}>
      <div className="about-grid hero-cols" style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"5rem",alignItems:"center"}}>

        <Fade c={
          <div style={{position:"relative"}}>
            <div className="about-img" style={{borderRadius:"12px 80px 12px 12px",overflow:"hidden",boxShadow:`0 32px 80px rgba(27,42,74,.14)`,border:`3px solid ${M}20`}}>
              <img src={P.about} alt="" style={{width:"100%",height:460,objectFit:"cover",display:"block",animation:"zoomIn 6s ease-out forwards"}}/>
            </div>
            <div style={{position:"absolute",top:24,left:24,background:N,borderRadius:12,padding:"1rem 1.3rem",boxShadow:`0 8px 24px rgba(27,42,74,.3)`}}>
              <p style={{fontFamily:"'Fraunces',serif",fontSize:"1.8rem",fontWeight:600,color:"#fff",lineHeight:1}}>2015</p>
              <p style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:".6rem",fontWeight:700,color:"rgba(255,255,255,.65)",letterSpacing:".14em",textTransform:"uppercase",marginTop:2}}>Established</p>
            </div>
            <div style={{position:"absolute",bottom:0,left:0,right:0,background:M,borderRadius:"0 0 12px 12px",padding:"1.2rem 2rem",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
              <p style={{fontFamily:"'Fraunces',serif",fontStyle:"italic",fontSize:"1.1rem",color:"#fff"}}>9+ Years of Trusted Care</p>
              <span style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:".65rem",fontWeight:700,color:"rgba(255,255,255,.8)"}}>Peerzadiguda, Hyderabad</span>
            </div>
          </div>
        } dx={-28}/>

        <Fade c={
          <div>
            <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:"1.2rem"}}>
              <span style={{width:32,height:3,background:M,borderRadius:2,display:"block"}}/>
              <span style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:".68rem",fontWeight:700,letterSpacing:".22em",textTransform:"uppercase",color:M}}>About Srikara Peerzadiguda</span>
            </div>
            <h2 style={{fontFamily:"'Fraunces',serif",fontSize:"clamp(2rem,3.5vw,3.2rem)",fontWeight:400,color:N,lineHeight:1.2,marginBottom:"1.2rem"}}>
              Built for the families<br/><em style={{fontStyle:"italic",color:M}}>of East Hyderabad.</em>
            </h2>
            <p style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:"1rem",color:TM,lineHeight:1.85,marginBottom:"1rem"}}>
              Established in 2015, Srikara Peerzadiguda was purpose-built to bring super-specialty hospital care to one of Hyderabad's fastest-growing zones — serving Peerzadiguda, Uppal, Nacharam, Boduppal and Habsiguda.
            </p>
            <p style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:"1rem",color:TM,lineHeight:1.85,marginBottom:"2rem"}}>
              200 beds. 32 board-certified specialists. Robotic surgery. AI-assisted diagnostics. And a genuine culture of care that starts with listening.
            </p>
            <div className="about-feat-grid" style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"1rem",marginBottom:"2rem"}}>
              {[
                {ic:"🤖",l:"Robotic Surgery",    s:"Precision care",        c:N},
                {ic:"🧬",l:"AI Diagnostics",     s:"3T MRI & CT",           c:M},
                {ic:"🩺",l:"32+ Specialists",    s:"Board-certified",       c:N},
                {ic:"🚑",l:"24/7 Emergency",     s:"<10 min response",      c:M},
              ].map(f=>(
                <div key={f.l} style={{display:"flex",alignItems:"flex-start",gap:10,padding:"1rem",background:"#fff",borderRadius:10,border:`1px solid ${BD}`,borderTop:`3px solid ${f.c}`,transition:"box-shadow .25s"}}
                  onMouseEnter={e=>(e.currentTarget as HTMLDivElement).style.boxShadow=`0 8px 24px rgba(27,42,74,.1)`}
                  onMouseLeave={e=>(e.currentTarget as HTMLDivElement).style.boxShadow=""}>
                  <span style={{fontSize:"1.4rem",flexShrink:0}}>{f.ic}</span>
                  <div>
                    <p style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:".88rem",fontWeight:700,color:f.c}}>{f.l}</p>
                    <p style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:".72rem",color:TL,marginTop:2}}>{f.s}</p>
                  </div>
                </div>
              ))}
            </div>
            <button className="btn-navy" onClick={()=>setBookOpen(true)}>Book a Consultation →</button>
          </div>
        } dx={28}/>
      </div>
    </div>
  </section>

  {/* ══════════════════════════════════════════
      DEPARTMENTS
      ══════════════════════════════════════════ */}
  <section id="depts" style={{background:N,padding:"7rem 2rem",position:"relative"}} className="sec">
    <div style={{maxWidth:1400,margin:"0 auto"}}>
      <Fade c={
        <div style={{display:"flex",alignItems:"flex-end",justifyContent:"space-between",marginBottom:"3rem",flexWrap:"wrap",gap:"2rem"}}>
          <div>
            <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:"1rem"}}>
              <span style={{width:28,height:3,background:M,borderRadius:2,display:"block"}}/>
              <span style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:".65rem",fontWeight:700,letterSpacing:".22em",textTransform:"uppercase",color:ML}}>Medical Specialities</span>
            </div>
            <h2 style={{fontFamily:"'Fraunces',serif",fontSize:"clamp(2rem,3.5vw,3.2rem)",fontWeight:400,color:"#fff",lineHeight:1.15}}>
              Expert care across<br/><em style={{fontStyle:"italic",color:ML}}>every discipline.</em>
            </h2>
          </div>
          <Link href="#" style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:".82rem",fontWeight:700,color:ML,textDecoration:"none",borderBottom:`1.5px solid ${ML}`,paddingBottom:2}}>All Departments →</Link>
        </div>
      }/>

      {/* Tab bar */}
      <Fade c={
        <div className="dept-tabs" style={{display:"flex",gap:0,borderBottom:"1px solid rgba(255,255,255,.1)",marginBottom:"2.5rem",overflowX:"auto"}}>
          {DEPTS.map((d,i)=>(
            <button key={d.n} className={`dtab${activeDept===i?" on":""}`} onClick={()=>setActiveDept(i)}
              style={{fontFamily:"'Space Grotesk',sans-serif",background:"transparent",border:"none",padding:"1rem 1.5rem",cursor:"pointer",fontSize:".82rem",fontWeight:500,color:activeDept===i?"#fff":"rgba(255,255,255,.45)",transition:"all .25s",whiteSpace:"nowrap",borderBottom:`2px solid ${activeDept===i?d.clr:"transparent"}`}}>
              {d.icon} {d.n}
            </button>
          ))}
        </div>
      }/>

      {/* Active dept panel */}
      <div className="dept-panel hero-cols" style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"2rem"}} key={activeDept}>
        <Fade c={
          <div className="dept-panel-img" style={{borderRadius:16,overflow:"hidden",position:"relative",boxShadow:"0 24px 60px rgba(0,0,0,.3)",height:380}}>
            <img src={DEPTS[activeDept].img} alt="" style={{width:"100%",height:"100%",objectFit:"cover",display:"block",animation:"zoomIn 5s ease-out forwards"}}/>
            <div style={{position:"absolute",inset:0,background:`linear-gradient(180deg,transparent 40%,rgba(15,30,53,.85) 100%)`}}/>
            <div style={{position:"absolute",bottom:"1.5rem",left:"1.5rem"}}>
              <span style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:".6rem",fontWeight:700,letterSpacing:".16em",textTransform:"uppercase",color:"rgba(255,255,255,.7)",display:"block",marginBottom:".3rem"}}>{DEPTS[activeDept].sub}</span>
              <h3 style={{fontFamily:"'Fraunces',serif",fontStyle:"italic",fontSize:"1.8rem",color:"#fff",fontWeight:400}}>{DEPTS[activeDept].n}</h3>
            </div>
          </div>
        } dy={20}/>
        <Fade c={
          <div style={{display:"flex",flexDirection:"column",justifyContent:"center",padding:"1rem 0"}}>
            <div style={{width:40,height:3,background:DEPTS[activeDept].clr,borderRadius:2,marginBottom:"1.5rem"}}/>
            <h3 style={{fontFamily:"'Fraunces',serif",fontStyle:"italic",fontSize:"2.2rem",fontWeight:300,color:"#fff",marginBottom:"1.2rem",lineHeight:1.2}}>{DEPTS[activeDept].n}</h3>
            <p style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:"1rem",color:"rgba(255,255,255,.65)",lineHeight:1.85,marginBottom:"2rem"}}>{DEPTS[activeDept].txt}</p>
            <button className="btn-mg" onClick={()=>setBookOpen(true)} style={{width:"fit-content",fontSize:".85rem",padding:".75rem 1.8rem"}}>Book Consultation →</button>
          </div>
        } dy={20} d={100}/>
      </div>

      {/* Small dept grid */}
      <div className="dept-grid" style={{display:"grid",gridTemplateColumns:"repeat(6,1fr)",gap:1,background:"rgba(255,255,255,.06)",marginTop:"2.5rem",borderRadius:12,overflow:"hidden"}}>
        {DEPTS.map((d,i)=>(
          <Fade key={d.n} d={i*40} c={
            <div className="dept-card"
              style={{background:activeDept===i?`${d.clr}18`:"rgba(255,255,255,.03)",padding:"1.2rem 1rem",cursor:"pointer",transition:"background .25s",textAlign:"center",borderBottom:`2px solid ${activeDept===i?d.clr:"transparent"}`}}
              onClick={()=>setActiveDept(i)}>
              <span style={{fontSize:"1.6rem",display:"block",marginBottom:".5rem"}}>{d.icon}</span>
              <p style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:".72rem",fontWeight:600,color:activeDept===i?"#fff":"rgba(255,255,255,.5)",transition:"color .25s"}}>{d.n}</p>
            </div>
          }/>
        ))}
      </div>
    </div>
  </section>

  {/* ══════════════════════════════════════════
      DOCTORS
      ══════════════════════════════════════════ */}
  <section id="docs" style={{background:OF,padding:"7rem 2rem"}} className="sec">
    <div style={{maxWidth:1400,margin:"0 auto"}}>
      <Fade c={
        <div style={{display:"flex",alignItems:"flex-end",justifyContent:"space-between",marginBottom:"3rem",flexWrap:"wrap",gap:"2rem"}}>
          <div>
            <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:"1rem"}}>
              <span style={{width:28,height:3,background:N,borderRadius:2,display:"block"}}/>
              <span style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:".65rem",fontWeight:700,letterSpacing:".22em",textTransform:"uppercase",color:N}}>Our Physicians</span>
            </div>
            <h2 style={{fontFamily:"'Fraunces',serif",fontSize:"clamp(2rem,3.5vw,3.2rem)",fontWeight:400,color:N,lineHeight:1.15}}>
              Specialists who<br/><em style={{fontStyle:"italic",color:M}}>listen first.</em>
            </h2>
          </div>
          <Link href="#" style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:".82rem",fontWeight:700,color:M,textDecoration:"none",borderBottom:`1.5px solid ${M}`,paddingBottom:2}}>All 13 Doctors →</Link>
        </div>
      }/>

      <div className="doc-grid" style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:"1.5rem"}}>
        {DOCS.map((d,i)=>(
          <Fade key={d.name} d={i*65} c={
            <div className="doc-card" style={{background:"#fff",borderRadius:16,border:`1px solid ${BD}`,boxShadow:"0 2px 12px rgba(0,0,0,.05)",overflow:"hidden",cursor:"pointer"}}>
              <div style={{height:4,background:`linear-gradient(90deg,${d.acc},${d.acc===N?NL:ML})`}}/>
              <div style={{height:230,overflow:"hidden",position:"relative",background:"#EEF2FA"}}>
                {d.img ? (
                  <img src={d.img} alt={d.name} style={{width:"100%",height:"100%",objectFit:"cover",objectPosition:"center top",display:"block"}}/>
                ) : (
                  <div style={{width:"100%",height:"100%",display:"flex",alignItems:"center",justifyContent:"center"}}>
                    <span style={{fontSize:"4rem",opacity:.3}}>👨‍⚕️</span>
                  </div>
                )}
                <div style={{position:"absolute",inset:0,background:"linear-gradient(180deg,transparent 55%,rgba(15,30,53,.68) 100%)"}}/>
              </div>
              <div style={{padding:"1.3rem"}}>
                <h3 style={{fontFamily:"'Fraunces',serif",fontStyle:"italic",fontSize:"1.05rem",fontWeight:400,color:N,marginBottom:".25rem",lineHeight:1.3}}>{d.name}</h3>
                <p style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:".75rem",fontWeight:700,color:d.acc,marginBottom:".4rem"}}>{d.role}</p>
                <p style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:".72rem",color:TL,lineHeight:1.5,marginBottom:"1rem"}}>{d.qual}</p>
                <div style={{paddingTop:".9rem",borderTop:`1px solid ${BD}`,display:"flex",alignItems:"center",justifyContent:"flex-end"}}>
                  <Link href={`/doctors/${d.slug}`} className={d.acc===N?"btn-navy":"btn-mg"} style={{fontSize:".68rem",padding:".38rem .95rem"}}>View Profile →</Link>
                </div>
              </div>
            </div>
          }/>
        ))}
      </div>
    </div>
  </section>

  {/* ══════════════════════════════════════════
      TESTIMONIALS
      ══════════════════════════════════════════ */}
  <section style={{background:N,padding:"7rem 2rem",position:"relative",overflow:"hidden"}}>
    <div style={{position:"absolute",inset:0,zIndex:0}}>
      <img src={P.h1} alt="" style={{width:"100%",height:"100%",objectFit:"cover",opacity:.05}}/>
      <div style={{position:"absolute",inset:0,background:`radial-gradient(ellipse at 70% 50%,${MD}20 0%,transparent 65%)`,pointerEvents:"none"}}/>
    </div>
    <div style={{maxWidth:900,margin:"0 auto",position:"relative",zIndex:1,textAlign:"center"}}>
      <Fade c={
        <div style={{marginBottom:"4rem"}}>
          <div style={{display:"inline-flex",alignItems:"center",gap:10,marginBottom:"1rem"}}>
            <span style={{width:20,height:2,background:`${M}60`,display:"block"}}/>
            <span style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:".65rem",fontWeight:700,letterSpacing:".22em",textTransform:"uppercase",color:"rgba(255,255,255,.55)"}}>Patient Stories</span>
            <span style={{width:20,height:2,background:`${M}60`,display:"block"}}/>
          </div>
          <h2 style={{fontFamily:"'Fraunces',serif",fontSize:"clamp(2rem,3.5vw,3.2rem)",fontWeight:400,color:"#fff",fontStyle:"italic"}}>Stories of healing.</h2>
        </div>
      }/>

      <div style={{position:"relative",minHeight:280}}>
        {TESTIS.map((t,i)=>(
          <div key={i} style={{position:i===activeTst?"relative":"absolute",inset:0,opacity:i===activeTst?1:0,transform:i===activeTst?"none":"translateY(14px)",transition:"all .7s ease",pointerEvents:i===activeTst?"auto":"none"}}>
            <div className="test-pad" style={{background:"rgba(255,255,255,.06)",border:`1px solid rgba(184,36,110,.2)`,borderRadius:20,padding:"3rem",backdropFilter:"blur(12px)"}}>
              <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:"1.2rem",flexWrap:"wrap",gap:".8rem"}}>
                <span style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:".65rem",fontWeight:700,letterSpacing:".14em",textTransform:"uppercase",color:"rgba(255,255,255,.85)",background:`${t.col}25`,border:`1px solid ${t.col}45`,borderRadius:100,padding:".28rem .85rem"}}>{t.dept}</span>
                <span style={{color:AM,letterSpacing:2,fontSize:".9rem"}}>★★★★★</span>
              </div>
              <p style={{fontFamily:"'Fraunces',serif",fontStyle:"italic",fontSize:"clamp(1.1rem,2vw,1.45rem)",color:"rgba(255,255,255,.92)",lineHeight:1.8,marginBottom:"2rem"}}>"{t.q}"</p>
              <div style={{display:"flex",alignItems:"center",gap:"1rem"}}>
                <div style={{width:46,height:46,borderRadius:"50%",background:`linear-gradient(135deg,${t.col},${t.col===N?M:N})`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                  <span style={{fontFamily:"'Fraunces',serif",fontStyle:"italic",fontWeight:600,color:"#fff",fontSize:".9rem"}}>{t.name[0]}</span>
                </div>
                <div style={{textAlign:"left"}}>
                  <p style={{fontFamily:"'Space Grotesk',sans-serif",fontWeight:700,color:"#fff",fontSize:".9rem"}}>{t.name}</p>
                  <p style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:".7rem",color:"rgba(255,255,255,.48)",marginTop:2}}>{t.area}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div style={{display:"flex",justifyContent:"center",gap:".5rem",marginTop:"2rem"}}>
        {TESTIS.map((t,i)=>(
          <button key={i} onClick={()=>setActiveTst(i)}
            style={{width:i===activeTst?28:8,height:3,background:i===activeTst?t.col:"rgba(255,255,255,.2)",border:"none",cursor:"pointer",transition:"all .3s",borderRadius:2,padding:0}}/>
        ))}
      </div>
    </div>
  </section>

  {/* ══════════════════════════════════════════
      FACILITIES
      ══════════════════════════════════════════ */}
  <section id="fac" style={{background:"#fff",padding:"7rem 2rem"}} className="sec">
    <div style={{maxWidth:1400,margin:"0 auto"}}>
      <Fade c={
        <div style={{textAlign:"center",marginBottom:"3rem"}}>
          <div style={{display:"inline-flex",alignItems:"center",gap:8,marginBottom:".8rem"}}>
            <span style={{width:24,height:3,background:N,borderRadius:2,display:"block"}}/>
            <span style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:".65rem",fontWeight:700,letterSpacing:".22em",textTransform:"uppercase",color:N}}>Infrastructure</span>
            <span style={{width:24,height:3,background:M,borderRadius:2,display:"block"}}/>
          </div>
          <h2 style={{fontFamily:"'Fraunces',serif",fontSize:"clamp(2rem,3.5vw,3.2rem)",fontWeight:400,color:N}}>
            World-class <em style={{fontStyle:"italic",color:M}}>facilities.</em>
          </h2>
        </div>
      }/>

      {[
        {name:"Advanced Imaging Suite",   tag:"3T MRI + PET-CT", img:P.fac1, desc:"3-Tesla MRI, 256-slice CT, PET-CT and digital mammography available 24 hours, seven days a week.",    flip:false, tc:N},
        {name:"24/7 Emergency & Trauma",  tag:"Emergency",        img:P.ambu, desc:"Fully-equipped trauma bay, crash carts and a rapid response team on standby every minute of every day.", flip:true,  tc:M},
        {name:"NABL Lab + 24/7 Pharmacy", tag:"Pathology",        img:P.fac2, desc:"1,200+ tests, molecular diagnostics and a 24/7 automated blood bank. In-house pharmacy stocked round the clock.", flip:false, tc:N},
      ].map((f,i)=>(
        <Fade key={f.name} d={i*80} c={
          <div className="fac-cols fac-card-inner" style={{display:"flex",flexDirection:f.flip?"row-reverse":"row",marginBottom:"1.5rem",borderRadius:16,overflow:"hidden",boxShadow:"0 4px 24px rgba(27,42,74,.08)",border:`1px solid ${BD}`}}>
            <div className="fac-card-img" style={{flex:"0 0 42%",overflow:"hidden",position:"relative",minHeight:240}}>
              <img src={f.img} alt={f.name} style={{width:"100%",height:"100%",objectFit:"cover",display:"block",minHeight:240,transition:"transform .5s"}}
                onMouseEnter={e=>(e.currentTarget as HTMLImageElement).style.transform="scale(1.05)"}
                onMouseLeave={e=>(e.currentTarget as HTMLImageElement).style.transform=""}/>
              <span style={{position:"absolute",top:"1rem",left:"1rem",background:f.tc,color:"#fff",fontFamily:"'Space Grotesk',sans-serif",fontSize:".6rem",fontWeight:700,letterSpacing:".12em",textTransform:"uppercase",padding:".25rem .7rem",borderRadius:100}}>{f.tag}</span>
            </div>
            <div className="fac-card-text" style={{flex:1,padding:"2.5rem 3rem",display:"flex",flexDirection:"column",justifyContent:"center",background:OF,borderLeft:`3px solid ${f.tc}`}}>
              <h3 style={{fontFamily:"'Fraunces',serif",fontStyle:"italic",fontSize:"1.6rem",fontWeight:400,color:N,marginBottom:"1rem",lineHeight:1.3}}>{f.name}</h3>
              <p style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:".92rem",color:TM,lineHeight:1.8}}>{f.desc}</p>
            </div>
          </div>
        }/>
      ))}

      <Fade d={200} c={
        <div style={{background:`linear-gradient(135deg,#DC2626,#B91C1C)`,borderRadius:16,overflow:"hidden",position:"relative",marginTop:".5rem"}}>
          <div style={{position:"absolute",inset:0}}><img src={P.ambu} alt="" style={{width:"100%",height:"100%",objectFit:"cover",opacity:.1}}/></div>
          <div style={{position:"relative",zIndex:1,display:"flex",alignItems:"center",justifyContent:"space-between",padding:"2rem 2.5rem",flexWrap:"wrap",gap:"2rem"}}>
            <div style={{display:"flex",alignItems:"center",gap:"1.2rem"}}>
              <span style={{fontSize:"2rem",flexShrink:0}}>🚑</span>
              <div>
                <p style={{fontFamily:"'Fraunces',serif",fontStyle:"italic",fontSize:"1.4rem",color:"#fff",lineHeight:1.2}}>24/7 Emergency & Ambulance Service</p>
                <p style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:".88rem",color:"rgba(255,255,255,.8)",marginTop:".3rem"}}>GPS fleet · Trained paramedics · Under 10-minute response</p>
              </div>
            </div>
            <a href="tel:040-2989-7700" style={{display:"inline-flex",alignItems:"center",gap:8,background:"#fff",color:"#DC2626",padding:"1rem 2rem",borderRadius:10,fontFamily:"'Space Grotesk',sans-serif",fontWeight:800,fontSize:".9rem",textDecoration:"none",flexShrink:0,whiteSpace:"nowrap"}}>
              📞 040-2989-7700
            </a>
          </div>
        </div>
      }/>
    </div>
  </section>

  {/* ══════════════════════════════════════════
      CONTACT
      ══════════════════════════════════════════ */}
  <section id="contact" style={{background:OF,padding:"7rem 2rem"}} className="sec">
    <div style={{maxWidth:1400,margin:"0 auto"}}>
      <Fade c={
        <div style={{textAlign:"center",marginBottom:"3rem"}}>
          <h2 style={{fontFamily:"'Fraunces',serif",fontSize:"clamp(2rem,3.5vw,3.2rem)",fontWeight:400,color:N}}>
            Srikara Hospital, <em style={{fontStyle:"italic",color:M}}>Peerzadiguda</em>
          </h2>
        </div>
      }/>
      <div className="contact-cols" style={{display:"flex",gap:"3rem",flexWrap:"wrap"}}>
        <Fade c={
          <div className="contact-card" style={{flex:"0 0 40%",minWidth:260,background:"#fff",borderRadius:16,border:`1px solid ${BD}`,overflow:"hidden",boxShadow:"0 4px 20px rgba(27,42,74,.06)"}}>
            <div style={{height:4,background:`linear-gradient(90deg,${N},${NL},${M})`}}/>
            <div style={{padding:"2rem"}}>
              {[
                {ic:"📍",l:"Address",        v:"Plot 22, Peerzadiguda Main Road\nPeerzadiguda, Hyderabad – 500039", c:N},
                {ic:"🚨",l:"Emergency 24/7", v:"040-2989-7700",                                                       c:"#EF4444"},
                {ic:"📞",l:"Appointments",   v:"040-2989-7800",                                                       c:M},
                {ic:"✉️",l:"Email",           v:"peerzadiguda@srikarahospitals.in",                                    c:N},
                {ic:"🕐",l:"OPD Hours",       v:"Monday – Saturday · 8:00 AM – 8:00 PM",                             c:M},
              ].map((c,i)=>(
                <div key={c.l} style={{display:"flex",gap:"1rem",paddingBottom:"1.1rem",marginBottom:i<4?"1.1rem":0,borderBottom:i<4?`1px solid ${BD}`:"none"}}>
                  <span style={{fontSize:"1.2rem",flexShrink:0,marginTop:2}}>{c.ic}</span>
                  <div>
                    <p style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:".62rem",fontWeight:700,letterSpacing:".14em",textTransform:"uppercase",color:c.c,marginBottom:".25rem"}}>{c.l}</p>
                    <p style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:".9rem",fontWeight:600,color:N,whiteSpace:"pre-line",lineHeight:1.6}}>{c.v}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        } dx={-24}/>

        <Fade c={
          <div style={{flex:1}}>
            <h3 style={{fontFamily:"'Fraunces',serif",fontStyle:"italic",fontSize:"1.8rem",fontWeight:400,color:N,marginBottom:"2rem"}}>Other Srikara Branches</h3>
            <div className="branch-g" style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:1,background:BD,borderRadius:12,overflow:"hidden",marginBottom:"1.5rem"}}>
              {BRANCHES.map((b,i)=>(
                <Link key={b} href={`/hospitals/${b.toLowerCase().replace(/ /g,"-")}`}
                  style={{
                    background:b==="Peerzadiguda"?`${N}0f`:"#fff",
                    padding:".88rem 1rem",textDecoration:"none",
                    display:"flex",alignItems:"center",justifyContent:"space-between",
                    transition:"background .2s",
                    borderLeft:`2px solid ${b==="Peerzadiguda"?N:"transparent"}`,
                    fontWeight:b==="Peerzadiguda"?700:500,
                    color:b==="Peerzadiguda"?N:TM,
                    fontSize:".78rem",
                  }}
                  onMouseEnter={e=>{if(b!=="Peerzadiguda"){(e.currentTarget as HTMLAnchorElement).style.background=OF;(e.currentTarget as HTMLAnchorElement).style.borderLeftColor=i%2===0?N:M;}}}
                  onMouseLeave={e=>{if(b!=="Peerzadiguda"){(e.currentTarget as HTMLAnchorElement).style.background="#fff";(e.currentTarget as HTMLAnchorElement).style.borderLeftColor="transparent";}}}>
                  <span>{b==="Peerzadiguda"?"★ ":""}{b}</span>
                  <span style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:".7rem",color:i%2===0?N:M}}>→</span>
                </Link>
              ))}
            </div>
            <Link href="/" style={{fontFamily:"'Space Grotesk',sans-serif",display:"inline-flex",alignItems:"center",gap:8,fontSize:".82rem",fontWeight:700,color:N,textDecoration:"none",borderBottom:`1.5px solid ${N}`,paddingBottom:2}}>
              ← Back to Main Srikara Website
            </Link>
          </div>
        } dx={24}/>
      </div>
    </div>
  </section>

  {/* ── FOOTER ── */}
  <footer style={{background:N}}>
    <div style={{height:3,background:`linear-gradient(90deg,${M},${ML},${M},${NL},${N})`}}/>
    <div className="footer-inner" style={{maxWidth:1400,margin:"0 auto",padding:"2rem 2rem",display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:"1rem"}}>
      <div style={{display:"flex",alignItems:"center",gap:10}}>
        <div style={{width:30,height:30,borderRadius:6,background:`linear-gradient(135deg,${NL},${M})`,display:"flex",alignItems:"center",justifyContent:"center"}}>
          <span style={{fontFamily:"'Fraunces',serif",fontStyle:"italic",fontSize:"1rem",color:"#fff"}}>S</span>
        </div>
        <span style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:".7rem",color:"rgba(255,255,255,.32)",letterSpacing:".06em"}}>© {new Date().getFullYear()} Srikara Hospital – Peerzadiguda · Srikara Hospital Group, Hyderabad</span>
      </div>
      <div className="footer-links" style={{display:"flex",gap:"2rem"}}>
        {["Privacy","Terms","Sitemap"].map((l,i)=>(
          <Link key={l} href="#" style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:".65rem",color:"rgba(255,255,255,.22)",textDecoration:"none",letterSpacing:".08em"}}
            onMouseEnter={e=>(e.currentTarget as HTMLAnchorElement).style.color=i%2===0?M:"#fff"}
            onMouseLeave={e=>(e.currentTarget as HTMLAnchorElement).style.color="rgba(255,255,255,.22)"}>
            {l}
          </Link>
        ))}
      </div>
    </div>
  </footer>

  {/* ── FLOATING BTN ── */}
  <button className="btn-mg" onClick={()=>setBookOpen(true)}
    style={{position:"fixed",bottom:"1.8rem",right:"1.8rem",zIndex:400,borderRadius:100,padding:".85rem 1.6rem",fontSize:".82rem",animation:"mpulse 3s ease infinite"}}>
    📅 Book Appointment
  </button>

  {/* ══════════════════════════════════════════
      APPOINTMENT MODAL
      ══════════════════════════════════════════ */}
  {bookOpen&&(
    <div onClick={e=>{if(e.target===e.currentTarget)setBookOpen(false);}}
      style={{position:"fixed",inset:0,zIndex:900,background:"rgba(15,30,53,.65)",backdropFilter:"blur(12px)",display:"flex",alignItems:"center",justifyContent:"center",padding:"1rem"}}>
      <div style={{width:"100%",maxWidth:640,maxHeight:"92vh",overflowY:"auto",background:"#fff",borderRadius:20,animation:"slideUp .3s ease",boxShadow:"0 40px 100px rgba(27,42,74,.28)"}}>

        <div style={{borderRadius:"20px 20px 0 0",overflow:"hidden"}}>
          <div style={{height:4,background:`linear-gradient(90deg,${N},${NL},${M},${ML})`}}/>
          <div className="modal-header" style={{display:"flex"}}>
            <div className="modal-navy" style={{flex:1,background:N,padding:"1.8rem 2rem 1.5rem"}}>
              <p style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:".6rem",fontWeight:700,letterSpacing:".18em",textTransform:"uppercase",color:"rgba(255,255,255,.6)",marginBottom:".35rem"}}>Srikara</p>
              <h3 style={{fontFamily:"'Fraunces',serif",fontStyle:"italic",fontSize:"1.5rem",fontWeight:400,color:"#fff",lineHeight:1.1}}>Book Your<br/>Appointment</h3>
            </div>
            <div className="modal-mg" style={{flex:1,background:M,padding:"1.8rem 2rem 1.5rem",display:"flex",flexDirection:"column",justifyContent:"space-between"}}>
              <p style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:".6rem",fontWeight:700,letterSpacing:".18em",textTransform:"uppercase",color:"rgba(255,255,255,.6)"}}>Hospitals · Peerzadiguda</p>
              <div>
                <p style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:".8rem",color:"rgba(255,255,255,.82)",marginBottom:".25rem"}}>✓ Confirmed within 30 minutes</p>
                <p style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:".78rem",color:"rgba(255,255,255,.65)"}}>Mon–Sat · 8 AM – 8 PM</p>
              </div>
              <button onClick={()=>setBookOpen(false)} style={{background:"rgba(255,255,255,.15)",border:"none",borderRadius:"50%",width:32,height:32,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",color:"#fff",fontSize:"1rem",alignSelf:"flex-end"}}>✕</button>
            </div>
          </div>
        </div>

        <form onSubmit={submit} style={{padding:"1.8rem"}}>
          <p style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:".65rem",fontWeight:700,letterSpacing:".18em",textTransform:"uppercase",color:N,marginBottom:".9rem"}}>Personal Details</p>
          <div className="bk-grid" style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"1rem",marginBottom:"1rem"}}>
            {[{l:"Full Name",k:"name",t:"text",ph:"Your full name"},{l:"Mobile Number",k:"phone",t:"tel",ph:"+91 98765 43210"}].map(f=>(
              <div key={f.k}>
                <label style={{fontFamily:"'Space Grotesk',sans-serif",display:"block",fontSize:".7rem",fontWeight:700,color:TM,marginBottom:".4rem"}}>{f.l} *</label>
                <input className="fi" type={f.t} placeholder={f.ph} value={form[f.k as keyof typeof form]} onChange={e=>setForm(p=>({...p,[f.k]:e.target.value}))} required/>
              </div>
            ))}
          </div>
          <div className="bk-grid" style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"1rem",marginBottom:"1.4rem"}}>
            <div>
              <label style={{fontFamily:"'Space Grotesk',sans-serif",display:"block",fontSize:".7rem",fontWeight:700,color:TM,marginBottom:".4rem"}}>Department *</label>
              <select className="fi" value={form.dept} onChange={e=>setForm(p=>({...p,dept:e.target.value}))} required>
                <option value="">Select...</option>
                {DEPTS.map(d=><option key={d.n}>{d.n}</option>)}
                <option>General Medicine</option><option>Dermatology</option><option>ENT</option>
              </select>
            </div>
            <div>
              <label style={{fontFamily:"'Space Grotesk',sans-serif",display:"block",fontSize:".7rem",fontWeight:700,color:TM,marginBottom:".4rem"}}>Preferred Date *</label>
              <input className="fi" type="date" value={form.date} onChange={e=>setForm(p=>({...p,date:e.target.value}))} min={new Date().toISOString().split("T")[0]} required/>
            </div>
          </div>
          <div style={{background:OF,borderRadius:10,border:`1px solid ${BD}`,padding:"1.2rem",marginBottom:"1.4rem"}}>
            <p style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:".65rem",fontWeight:700,letterSpacing:".18em",textTransform:"uppercase",color:M,marginBottom:".8rem"}}>Time Slot</p>
            <div style={{display:"flex",flexWrap:"wrap",gap:".5rem"}}>
              {SLOTS.map(sl=>(
                <button key={sl} type="button" className={`sl${form.slot===sl?" on":""}`} onClick={()=>setForm(p=>({...p,slot:p.slot===sl?"":sl}))}>{sl}</button>
              ))}
            </div>
            {form.slot&&(
              <div style={{marginTop:".8rem",display:"flex",alignItems:"center",gap:7,padding:".5rem .9rem",background:`${N}0d`,border:`1px solid ${N}25`,borderRadius:7}}>
                <span>✅</span>
                <span style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:".8rem",fontWeight:700,color:N}}>Selected: {form.slot}</span>
              </div>
            )}
          </div>
          <button type="submit" style={{width:"100%",display:"flex",justifyContent:"center",alignItems:"center",padding:"1rem",fontFamily:"'Space Grotesk',sans-serif",fontSize:".9rem",fontWeight:700,letterSpacing:".04em",border:"none",borderRadius:8,cursor:"pointer",transition:"all .35s",background:sent?"#22c55e":`linear-gradient(90deg,${N},${M})`,color:"#fff",boxShadow:sent?"0 4px 16px rgba(34,197,94,.3)":`0 4px 16px rgba(184,36,110,.25)`}}>
            {sent?"✓ Confirmed! We'll call you shortly.":"Confirm Appointment →"}
          </button>
          <p style={{fontFamily:"'Space Grotesk',sans-serif",textAlign:"center",fontSize:".72rem",color:TM,marginTop:".9rem"}}>
            Or call: <a href="tel:040-2989-7800" style={{color:M,fontWeight:700,textDecoration:"none"}}>040-2989-7800</a>
          </p>
        </form>
      </div>
    </div>
  )}
  </>
  );
}