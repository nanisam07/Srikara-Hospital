"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";

/* ── BRAND ── */
const NAV = "#1B2D5B", NAVDK = "#111D3A", NAVDKR = "#0C1528", NAVLT = "#2A4480";
const PINK = "#A3195B", PINKLT = "#C2206D", PINKDK = "#751242", PINKP = "#FBF0F5";
const GLOW = "#F9A8D4";
const WH = "#FFFFFF", CRM = "#F7F9FC", CARD = "#FFFFFF";
const BDR = "rgba(27,45,91,0.12)", INK = "#0D1A35", MID = "#3A5070", SOFT = "#6B7FA0";

/* ── IMAGES — all different ── */
const IMG = {
  h1: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=1800&q=85",
  h2: "https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?w=900&q=85",
  ab1:"https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=1000&q=85",
  ab2:"https://images.unsplash.com/photo-1504813184591-01572f98c85f?w=700&q=85",
  d1: "https://images.unsplash.com/photo-1628348068343-c6a848d2b6dd?w=800&q=85",
  d2: "https://images.unsplash.com/photo-1530026186672-2cd00ffc50fe?w=800&q=85",
  d3: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=800&q=85",
  d4: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=85",
  d5: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=800&q=85",
  d6: "https://images.unsplash.com/photo-1579154204601-01588f351e67?w=800&q=85",
  d7: "https://images.unsplash.com/photo-1598520106830-8c45c2035460?w=800&q=85",
  d8: "https://images.unsplash.com/photo-1530497610245-94d3c16cda28?w=800&q=85",
  dr1:"https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=600&q=85",
  dr2:"https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=600&q=85",
  dr3:"https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=600&q=85",
  dr4:"https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=600&q=85",
  dr5:"https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=600&q=85",
  dr6:"https://images.unsplash.com/photo-1651008376811-b90baee60c1f?w=600&q=85",
  f1: "https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=800&q=85",
  f2: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&q=85",
  f3: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800&q=85",
  ambu:"https://images.unsplash.com/photo-1587745416684-47953f16f02f?w=800&q=85",
};

type Page = "home"|"departments"|"doctors";

const BRANCHES = ["Miyapur","RTC X Roads","Kompally","Peerzadiguda","Rajahmundry","Lakdikapul","LB Nagar","Vijayawada","ECIL"];

const DEPTS = [
  {n:"Orthopedics",     sub:"Bone, Joint & Spine",        ic:"🦴",img:IMG.d2,col:NAV,
   pts:["Robotic Joint Replacement","Arthroscopy","Ilizarov Surgery","Complex Trauma"],
   desc:"Robotic joint replacement, arthroscopic, Ilizarov and complex trauma surgery by gold-medallist specialists."},
  {n:"Cardiology",      sub:"Heart & Vascular",           ic:"🫀",img:IMG.d1,col:PINK,
   pts:["Interventional Cardiology","Angioplasty","Echo & ECG","Cardiac Rehab"],
   desc:"Comprehensive interventional cardiac care including cath lab, angioplasty and cardiac rehabilitation."},
  {n:"Nephrology",      sub:"Kidney Care",                ic:"🫘",img:IMG.d3,col:"#5B21B6",
   pts:["Dialysis","Kidney Transplant","CKD Management","Electrolyte Disorders"],
   desc:"Expert nephrology care for CKD, dialysis, kidney transplant and complex electrolyte disorders."},
  {n:"Neuro Surgery",   sub:"Brain & Spine",              ic:"🧠",img:IMG.d4,col:NAV,
   pts:["Brain Surgery","Spine Surgery","Neuro Oncology","Cranial Procedures"],
   desc:"Advanced brain and spine surgery, neuro-oncology and comprehensive cranial procedures."},
  {n:"Neurology",       sub:"Neurological Medicine",      ic:"⚡",img:IMG.d5,col:"#5B21B6",
   pts:["Neuro Physician","Stroke Care","Epilepsy Clinic","Movement Disorders"],
   desc:"Expert neurological medicine for stroke, epilepsy, movement disorders and neuro-rehabilitation."},
  {n:"General Surgery", sub:"Surgical Care",              ic:"⚕️",img:IMG.d6,col:NAVLT,
   pts:["Laparoscopic Surgery","Hernia","General Surgery","Minimally Invasive"],
   desc:"General, laparoscopic and minimally invasive surgery by experienced surgical specialists."},
  {n:"General Medicine",sub:"Internal Medicine",          ic:"🩺",img:IMG.d7,col:"#047857",
   pts:["General Physician","Diabetology","Preventive Care","Critical Care"],
   desc:"Expert general medicine, diabetology, preventive care and management of complex conditions."},
  {n:"Urology",         sub:"Urological Care",            ic:"🔬",img:IMG.d8,col:"#92400E",
   pts:["Kidney Stones","Prostate Care","Reconstructive Urology","Endourology"],
   desc:"Complete urological care including kidney stones, prostate, reconstructive and endoscopic procedures."},
  {n:"Physiotherapy",   sub:"Rehabilitation",             ic:"🏃",img:IMG.d1,col:"#047857",
   pts:["Post-Surgery Rehab","Ortho Rehab","Neuro Rehab","Sports Physio"],
   desc:"Comprehensive physiotherapy and rehabilitation for orthopaedic, neurological and post-surgical recovery."},
  {n:"Plastic Surgery", sub:"Reconstructive & Aesthetic", ic:"✨",img:IMG.d2,col:PINK,
   pts:["Reconstructive Surgery","Aesthetic Surgery","Burns Care","Microsurgery"],
   desc:"Plastic reconstructive and aesthetic surgery for trauma, burns and cosmetic enhancement."},
];

const DOCS = [
  {name:"Dr. Bhanu Pratap P",    role:"Consultant Robotic Joint Replacement, Arthroscopic, Ilizarov & Complex Trauma Surgeon", qual:"MBBS, MS (Ortho) – Gold Medalist, FIJR, FIAS, FILRDC", slug:"bhanu-pratap-p",    img:"/Ladikapul/DR.BHANUPRATAPP.png",         dept:"Orthopedics"},
  {name:"Dr. Shashank",          role:"Orthopedic Surgeon",                                                                   qual:"Ortho",                                                 slug:"shashank",          img:"/Ladikapul/DR.SHASHANK.jpeg",            dept:"Orthopedics"},
  {name:"Dr. Rameshwari",        role:"Cardiologist",                                                                         qual:"MBBS, MD, DM",                                          slug:"rameshwari",         img:"/Ladikapul/DR.RAMESHWARI.png",           dept:"Cardiology"},
  {name:"Dr. Vaishnavi P",       role:"Nephrologist",                                                                         qual:"MBBS, MD, FACP, FASN (USA)",                            slug:"vaishnavi-p",        img:"/Ladikapul/DR.VAISHNAVI.png",            dept:"Nephrology"},
  {name:"Dr. Nikhil Veludandi",  role:"Neuro Surgeon",                                                                        qual:"MBBS, MS (GS), MCh",                                    slug:"nikhil-veludandi",   img:"/Ladikapul/DR.NIKHIL.png",               dept:"Neuro Surgery"},
  {name:"Dr. Sushmita",          role:"Neuro Physician",                                                                      qual:"MBBS, MD (GM, NIMS)",                                   slug:"sushmita",           img:"",                                       dept:"Neurology"},
  {name:"Dr. Gopi Srikanth",     role:"Neuro Physician",                                                                      qual:"MD (General Medicine), DM (Neurology)",                 slug:"gopi-srikanth",      img:"",                                       dept:"Neurology"},
  {name:"Dr. Sreedhar Reddy",    role:"General Surgeon",                                                                      qual:"MBBS, DNB, FMAS",                                       slug:"srredhar-reddy",     img:"/Ladikapul/DR.SREEDHARREDDY.png",        dept:"General Surgery"},
  {name:"Dr. Ganesh G",          role:"General Physician",                                                                    qual:"MBBS, DNB",                                             slug:"ganesh-g",           img:"/Ladikapul/DR.GANESH.png",               dept:"General Medicine"},
  {name:"Dr. Harsha Vardhan",    role:"Urologist",                                                                            qual:"MBBS, DNB, MCh (Urology)",                              slug:"harsha-vardhan",     img:"/Ladikapul/DR.HARSHAVARDHAN.png",        dept:"Urology"},
  {name:"Dr. Junaid",            role:"Physiotherapist",                                                                      qual:"BPT, DAC, MIAP",                                        slug:"junaid",             img:"/Ladikapul/DR.JUNAID.png",               dept:"Physiotherapy"},
  {name:"Dr. Vinay Kumar",       role:"Pediatrician",                                                                         qual:"Pediatrics",                                            slug:"vinay-kumar",        img:"",                                       dept:"Pediatrics"},
  {name:"Dr. Saka Laxman",       role:"Plastic Surgeon",                                                                      qual:"Plastic Surgery",                                       slug:"saka-laxman",        img:"",                                       dept:"Plastic Surgery"},
  {name:"Dr. Nalinikanth",       role:"ENT Surgeon",                                                                          qual:"DLO",                                                   slug:"nalinikanth",        img:"",                                       dept:"ENT"},
  {name:"Dr. Irshad",            role:"Pathologist",                                                                          qual:"MBBS, MD (Osmania)",                                    slug:"irshad",             img:"",                                       dept:"Pathology"},
];

const TESTI = [
  {q:"The cardiac team at Srikara Lakdikapul had me in surgery within the hour of admission. Dr. Kavitha's expertise and the ICU team's warmth gave me my life back. I am forever grateful.",name:"Venkateswarlu P.",area:"Lakdikapul"},
  {q:"After years of knee pain Dr. Srinivas's robotic replacement had me walking the very next day. The physiotherapy team was patient, skilled and genuinely encouraging every single step.",name:"Sarada Devi M.",area:"Abids, Hyderabad"},
  {q:"Dr. Meena's IVF team helped us succeed after three years of heartbreak elsewhere. Their clinical precision combined with deep human compassion was unlike anything we had experienced.",name:"Priya & Rohit K.",area:"Nampally, Hyderabad"},
];

const SLOTS = ["9:00 AM","10:00 AM","11:00 AM","12:00 PM","2:00 PM","3:00 PM","4:00 PM","5:00 PM","6:00 PM"];

/* ── helpers ── */
function useVis(t=0.07){
  const r=useRef<HTMLDivElement>(null);const[on,setOn]=useState(false);
  useEffect(()=>{const el=r.current;if(!el)return;const io=new IntersectionObserver(([e])=>{if(e.isIntersecting){setOn(true);io.unobserve(el);}},{threshold:t});io.observe(el);return()=>io.disconnect();},[t]);
  return{r,on};
}
function Reveal({c,d=0,y=28,x=0}:{c:React.ReactNode;d?:number;y?:number;x?:number}){
  const{r,on}=useVis();
  return<div ref={r} style={{transition:`opacity .9s ease ${d}ms,transform .9s ease ${d}ms`,opacity:on?1:0,transform:on?"none":`translate(${x}px,${y}px)`}}>{c}</div>;
}

/* ── LOGO SVG ── */
const Logo=({h=42}:{h?:number})=>(
  <svg height={h} viewBox="0 0 265 80" xmlns="http://www.w3.org/2000/svg">
  
  {/* ✅ USE image INSTEAD OF img */}
  <image
    href="/srikara-logo.png"
    x="0"
    y="10"
    width="80"
    height="80"
    preserveAspectRatio="xMidYMid meet"
  />

  <text
    x="84"
    y="52"
    fontFamily="'Arial Black',Arial,sans-serif"
    fontWeight="900"
    fontSize="32"
    fill={NAV}
    letterSpacing="-0.5"
  >
    SRIKARA
  </text>

  <ellipse
    cx="103"
    cy="43"
    rx="4"
    ry="10"
    fill={PINK}
    opacity=".95"
    transform="rotate(-8,103,43)"
  />

  <text
    x="84"
    y="73"
    fontFamily="'Arial Black',Arial,sans-serif"
    fontWeight="900"
    fontSize="19"
    fill={PINK}
    letterSpacing="2.5"
  >
    HOSPITALS
  </text>

</svg>
);

/* ══════════════════════════════════════════════════════
   MAIN
══════════════════════════════════════════════════════ */
export default function LakdikapulPage(){
  const[page,setPage]=useState<Page>("home");
  const[scrolled,setScrolled]=useState(false);
  const[mob,setMob]=useState(false);
  const[openDept,setOpenDept]=useState<number|null>(null);
  const[tIdx,setTIdx]=useState(0);
  const[bookOpen,setBookOpen]=useState(false);
  const[form,setForm]=useState({name:"",phone:"",dept:"",date:"",slot:""});
  const[sent,setSent]=useState(false);
  const filmRef=useRef<HTMLDivElement>(null);

  useEffect(()=>{window.scrollTo({top:0,behavior:"smooth"});},[page]);
  useEffect(()=>{
    const fn=()=>setScrolled(window.scrollY>55);
    window.addEventListener("scroll",fn,{passive:true});
    const t=setInterval(()=>setTIdx(p=>(p+1)%TESTI.length),5800);
    return()=>{window.removeEventListener("scroll",fn);clearInterval(t);};
  },[]);

  const submit=(e:React.FormEvent)=>{
    e.preventDefault();setSent(true);
    setTimeout(()=>{setSent(false);setBookOpen(false);setForm({name:"",phone:"",dept:"",date:"",slot:""});},3500);
  };

  const scrollFilm=(dir:1|-1)=>{if(filmRef.current)filmRef.current.scrollBy({left:dir*360,behavior:"smooth"});};

  /* ── NAV ── */
  const Nav=()=>(
    <>
      <div style={{background:NAVDKR,padding:"5px 2rem",display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:".4rem"}}>
        <div style={{display:"flex",alignItems:"center",gap:"1.6rem"}}>
          <span style={{display:"inline-flex",alignItems:"center",gap:7}}>
            <span style={{width:8,height:8,borderRadius:"50%",background:"#22C55E",display:"inline-block",boxShadow:"0 0 0 3px rgba(34,197,94,.2)"}}/>
            <span style={{fontFamily:"'DM Sans',sans-serif",fontSize:".6rem",fontWeight:700,letterSpacing:".18em",textTransform:"uppercase",color:"rgba(255,255,255,.7)"}}>Emergency 24/7</span>
          </span>
          <a href="tel:040-6600-7700" style={{fontFamily:"'DM Sans',sans-serif",fontSize:".88rem",fontWeight:800,color:WH,textDecoration:"none"}}>040-6600-7700</a>
        </div>
        <div style={{display:"flex",gap:"1.4rem",alignItems:"center"}}>
          <span style={{fontFamily:"'DM Sans',sans-serif",fontSize:".6rem",color:"rgba(255,255,255,.42)"}}>Road No.10, Banjara Hills, Lakdikapul – 500004</span>
          <Link href="/" style={{fontFamily:"'DM Sans',sans-serif",fontSize:".6rem",fontWeight:700,color:"rgba(255,255,255,.5)",textDecoration:"none",letterSpacing:".1em",textTransform:"uppercase"}}>← Main Site</Link>
        </div>
      </div>

      <header style={{position:"sticky",top:0,zIndex:500,background:scrolled?"rgba(255,255,255,.97)":WH,backdropFilter:scrolled?"blur(16px)":"none",borderBottom:`1px solid ${scrolled?BDR:"rgba(27,45,91,.1)"}`,boxShadow:scrolled?"0 2px 24px rgba(27,45,91,.08)":"none",transition:"all .3s"}}>
        {/* Twin colour stripe */}
        <div style={{height:2,background:NAV}}/>
        <div style={{height:2,background:PINK}}/>
        <div style={{maxWidth:1300,margin:"0 auto",padding:"0 2rem",height:66,display:"flex",alignItems:"center",justifyContent:"space-between"}}>

          <button onClick={()=>{setPage("home");setMob(false);}} style={{background:"none",border:"none",cursor:"pointer",padding:0}}>
            <Logo h={40}/>
          </button>

          {/* Branch label */}
          <div style={{display:"flex",alignItems:"center",gap:10}} className="dk">
            <div style={{width:1,height:26,background:BDR}}/>
            <div>
              <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:".56rem",fontWeight:700,letterSpacing:".16em",textTransform:"uppercase",color:SOFT,lineHeight:1.1}}>Branch</p>
              <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:".88rem",fontWeight:900,color:NAV}}>Lakdikapul</p>
            </div>
          </div>

          {/* 3-page pill nav */}
          <nav style={{display:"flex",alignItems:"center",background:"#F0F4F8",border:`1px solid ${BDR}`,borderRadius:12,padding:"5px",gap:"3px"}} className="dk">
            {(["home","departments","doctors"] as Page[]).map(pg=>(
              <button key={pg} onClick={()=>setPage(pg)}
                style={{fontFamily:"'DM Sans',sans-serif",fontSize:".84rem",fontWeight:page===pg?900:600,color:page===pg?WH:MID,background:page===pg?PINK:"transparent",border:"none",cursor:"pointer",padding:".55rem 1.3rem",borderRadius:8,transition:"all .22s",whiteSpace:"nowrap"}}>
                {pg==="home"?"Home":pg==="departments"?"Departments":"Doctors"}
              </button>
            ))}
          </nav>

          <div style={{display:"flex",alignItems:"center",gap:".8rem"}}>
            <a href="tel:040-6600-7800" className="dk" style={{fontFamily:"'DM Sans',sans-serif",fontSize:".8rem",fontWeight:700,color:NAV,textDecoration:"none",display:"flex",alignItems:"center",gap:5}}>📞 040-6600-7800</a>
            <button onClick={()=>setBookOpen(true)}
              style={{fontFamily:"'DM Sans',sans-serif",background:PINK,color:WH,border:"none",borderRadius:8,padding:".58rem 1.4rem",fontSize:".82rem",fontWeight:800,cursor:"pointer",transition:"all .25s"}}
              onMouseEnter={e=>(e.currentTarget as HTMLButtonElement).style.background=PINKLT}
              onMouseLeave={e=>(e.currentTarget as HTMLButtonElement).style.background=PINK}>
              Book Appointment
            </button>
            <button onClick={()=>setMob(!mob)} className="mk"
              style={{display:"none",flexDirection:"column",gap:5,background:"none",border:`1.5px solid ${BDR}`,borderRadius:8,padding:".4rem .6rem",cursor:"pointer"}}>
              {[0,1,2].map(i=><span key={i} style={{width:20,height:1.5,background:NAV,display:"block"}}/>)}
            </button>
          </div>
        </div>
        {mob&&(
          <div style={{background:WH,borderTop:`1px solid ${BDR}`,padding:"1rem 1.5rem",display:"flex",flexDirection:"column",gap:".8rem"}}>
            {(["home","departments","doctors"] as Page[]).map(pg=>(
              <button key={pg} onClick={()=>{setPage(pg);setMob(false);}}
                style={{fontFamily:"'DM Sans',sans-serif",background:page===pg?PINKP:"transparent",border:"none",color:page===pg?PINK:MID,fontWeight:800,fontSize:".9rem",cursor:"pointer",padding:".6rem .9rem",borderRadius:7,textAlign:"left"}}>
                {pg==="home"?"Home":pg==="departments"?"Departments":"Doctors"}
              </button>
            ))}
            <button onClick={()=>{setMob(false);setBookOpen(true);}}
              style={{fontFamily:"'DM Sans',sans-serif",background:PINK,color:WH,border:"none",borderRadius:8,padding:".8rem",fontWeight:800,cursor:"pointer"}}>Book Appointment</button>
          </div>
        )}
      </header>
    </>
  );

  /* ══════════════════════════════════════════
     HOME
  ══════════════════════════════════════════ */
  const Home=()=>(
    <div>

      {/* ── KINETIC HERO — watermark + floating card ── */}
      <section style={{minHeight:"100vh",background:NAVDKR,position:"relative",overflow:"hidden",display:"flex",alignItems:"center"}}>

        {/* Full bleed photo right half */}
        <div style={{position:"absolute",right:0,top:0,bottom:0,width:"52%",zIndex:0}}>
          <img src={IMG.h1} alt="" style={{width:"100%",height:"100%",objectFit:"cover",opacity:.28,animation:"zoomIn 10s ease-out forwards"}}/>
          <div style={{position:"absolute",inset:0,background:`linear-gradient(90deg,${NAVDKR} 0%,${NAVDKR}00 60%)`}}/>
        </div>

        {/* Giant LAKDIKAPUL watermark */}
        <div style={{position:"absolute",inset:0,zIndex:1,display:"flex",alignItems:"center",justifyContent:"center",pointerEvents:"none",overflow:"hidden"}}>
          <span style={{fontFamily:"'Anton',sans-serif",fontSize:"clamp(6rem,16vw,18rem)",fontWeight:400,color:"rgba(163,25,91,0.07)",lineHeight:1,letterSpacing:".04em",textTransform:"uppercase",userSelect:"none",whiteSpace:"nowrap"}}>LAKDIKAPUL</span>
        </div>

        {/* Grid */}
        <div style={{position:"absolute",inset:0,zIndex:1,backgroundImage:`linear-gradient(rgba(163,25,91,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(163,25,91,.04) 1px,transparent 1px)`,backgroundSize:"72px 72px",pointerEvents:"none"}}/>

        {/* Left pink glow */}
        <div style={{position:"absolute",top:"20%",left:"-5%",width:320,height:320,borderRadius:"50%",background:`radial-gradient(circle,${PINK}18 0%,transparent 65%)`,zIndex:1,pointerEvents:"none"}}/>

        {/* Content */}
        <div style={{position:"relative",zIndex:2,maxWidth:1300,margin:"0 auto",padding:"7rem 2rem 6rem",width:"100%"}}>

          {/* Eyebrow */}
          <div style={{display:"inline-flex",alignItems:"center",gap:10,background:`${PINK}20`,border:`1px solid ${PINK}40`,borderRadius:100,padding:".36rem 1.1rem",marginBottom:"2.5rem",animation:"fadeUp .8s ease .1s both"}}>
            <span style={{width:6,height:6,borderRadius:"50%",background:"#4ADE80",animation:"blink 2s ease infinite",display:"inline-block"}}/>
            <span style={{fontFamily:"'DM Sans',sans-serif",fontSize:".62rem",fontWeight:700,letterSpacing:".18em",textTransform:"uppercase",color:"rgba(255,255,255,.9)"}}>NABH Accredited · Est. 2019 · Central Hyderabad</span>
          </div>

          {/* Giant layered headline — Anton display */}
          <div style={{marginBottom:"2.5rem",animation:"fadeUp .85s ease .25s both"}}>
            {/* Outlined ghost behind */}
            <p style={{fontFamily:"'Anton',sans-serif",fontSize:"clamp(4rem,10vw,10rem)",fontWeight:400,lineHeight:.88,letterSpacing:".02em",textTransform:"uppercase",WebkitTextStroke:`2px rgba(249,168,212,0.18)`,color:"transparent",position:"absolute",pointerEvents:"none",userSelect:"none",marginTop:0}}>CARE.</p>
            <h1 style={{fontFamily:"'Anton',sans-serif",fontSize:"clamp(4rem,10vw,10rem)",fontWeight:400,color:WH,lineHeight:.88,letterSpacing:".02em",textTransform:"uppercase",paddingTop:"0.08em"}}>
              <span style={{display:"block"}}>WHERE</span>
              <span style={{display:"block",color:PINK}}>CARE</span>
              <span style={{display:"block",WebkitTextStroke:`2px rgba(255,255,255,.35)`,color:"transparent"}}>BEGINS.</span>
            </h1>
          </div>

          <p style={{fontFamily:"'Lora',serif",fontStyle:"italic",fontSize:"1.1rem",color:"rgba(255,255,255,.68)",lineHeight:1.85,maxWidth:500,marginBottom:"3rem",animation:"fadeUp .85s ease .44s both"}}>
            Central Hyderabad's most trusted multi-specialty hospital — 28+ super-specialists, robotic surgery, AI diagnostics and compassionate care serving Lakdikapul, Abids, Nampally and the heart of the city.
          </p>

          <div style={{display:"flex",gap:"1rem",flexWrap:"wrap",marginBottom:"3.5rem",animation:"fadeUp .85s ease .6s both"}}>
            <button onClick={()=>setBookOpen(true)}
              style={{fontFamily:"'DM Sans',sans-serif",display:"inline-flex",alignItems:"center",gap:8,background:PINK,color:WH,padding:"1rem 2.5rem",borderRadius:0,fontSize:".9rem",fontWeight:900,border:"none",cursor:"pointer",boxShadow:`0 4px 24px ${PINK}55`,transition:"all .28s",letterSpacing:".05em",textTransform:"uppercase",clipPath:"polygon(0 0,calc(100% - 12px) 0,100% 100%,12px 100%)"}}>
              Book Appointment
            </button>
            <a href="tel:040-6600-7700"
              style={{fontFamily:"'DM Sans',sans-serif",display:"inline-flex",alignItems:"center",gap:8,background:"transparent",color:WH,padding:"1rem 2rem",borderRadius:0,fontSize:".9rem",fontWeight:700,border:"2px solid rgba(255,255,255,.3)",textDecoration:"none",transition:"all .28s",letterSpacing:".04em",textTransform:"uppercase",clipPath:"polygon(12px 0,100% 0,calc(100% - 12px) 100%,0 100%)"}}>
              🚨 Emergency
            </a>
          </div>

          {/* Horizontal stat strip */}
          <div style={{display:"flex",gap:0,animation:"fadeUp .85s ease .78s both",maxWidth:580}} className="stat-strip">
            {[{n:"8+",l:"Years"},{n:"28+",l:"Doctors"},{n:"32k+",l:"Patients"},{n:"150",l:"Beds"}].map((s,i)=>(
              <div key={i} style={{flex:1,padding:"1.2rem 1rem",borderLeft:i===0?"none":`1px solid rgba(255,255,255,.1)`,textAlign:"center"}}>
                <p style={{fontFamily:"'Anton',sans-serif",fontSize:"2.2rem",color:WH,lineHeight:1}}>{s.n}</p>
                <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:".62rem",fontWeight:700,color:"rgba(255,255,255,.5)",letterSpacing:".12em",textTransform:"uppercase",marginTop:3}}>{s.l}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Scrolldown cue */}
        <div style={{position:"absolute",bottom:"2rem",left:"50%",transform:"translateX(-50%)",zIndex:2,display:"flex",flexDirection:"column",alignItems:"center",gap:6,opacity:.5,animation:"fadeUp 1s ease 1.2s both"}}>
          <span style={{fontFamily:"'DM Sans',sans-serif",fontSize:".58rem",fontWeight:700,letterSpacing:".2em",textTransform:"uppercase",color:WH}}>Scroll</span>
          <div style={{width:1,height:32,background:`linear-gradient(${WH},transparent)`}}/>
        </div>
      </section>

      {/* ── MARQUEE ── */}
      <div style={{background:PINK,padding:".75rem 0",overflow:"hidden",whiteSpace:"nowrap"}}>
        <div style={{display:"inline-flex",gap:"3rem",animation:"marquee 30s linear infinite"}}>
          {Array(3).fill(["Cardiac Cath Lab","Robotic Surgery","Level III NICU","3T MRI · PET-CT","24/7 Emergency","NABH Accredited","IVF & Fertility","NABL Laboratory","Stroke Unit","Tumour Board","Bariatric Surgery","Physiotherapy"]).flat().map((t,i)=>(
            <span key={i} style={{fontFamily:"'DM Sans',sans-serif",display:"inline-flex",alignItems:"center",gap:".8rem",fontSize:".7rem",fontWeight:700,letterSpacing:".16em",textTransform:"uppercase",color:"rgba(255,255,255,.9)"}}>
              <span style={{width:5,height:5,borderRadius:"50%",background:"rgba(255,255,255,.5)",display:"inline-block"}}/>{t}
            </span>
          ))}
        </div>
      </div>

      {/* ── ABOUT — large number design ── */}
      <section style={{background:WH,padding:"8rem 2rem",position:"relative",overflow:"hidden"}}>
        {/* BIG decorative "10" */}
        <div style={{position:"absolute",right:"-2%",top:"50%",transform:"translateY(-50%)",fontFamily:"'Anton',sans-serif",fontSize:"clamp(12rem,28vw,36rem)",fontWeight:400,color:`${NAV}05`,lineHeight:1,userSelect:"none",pointerEvents:"none"}}>10</div>

        <div style={{maxWidth:1300,margin:"0 auto",display:"grid",gridTemplateColumns:"1fr 1fr",gap:"6rem",alignItems:"center"}} className="two-col">

          <Reveal c={
            <div>
              {/* Section number */}
              <p style={{fontFamily:"'Anton',sans-serif",fontSize:"4.5rem",color:`${PINK}18`,lineHeight:1,marginBottom:"-1.2rem"}}>01</p>
              <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:"1rem"}}>
                <div style={{width:4,height:42,background:`linear-gradient(${NAV},${PINK})`,borderRadius:2}}/>
                <div>
                  <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:".65rem",fontWeight:800,letterSpacing:".22em",textTransform:"uppercase",color:PINK}}>About Us</p>
                  <h2 style={{fontFamily:"'Anton',sans-serif",fontSize:"clamp(2.2rem,4vw,3.8rem)",color:INK,lineHeight:.95,letterSpacing:".02em",textTransform:"uppercase",marginTop:4}}>
                    BUILT FOR<br/><span style={{color:PINK}}>CENTRAL</span><br/>HYDERABAD.
                  </h2>
                </div>
              </div>
              <p style={{fontFamily:"'Lora',serif",fontStyle:"italic",fontSize:"1.05rem",color:MID,lineHeight:1.85,marginBottom:"1.2rem"}}>
                Established in 2019, Srikara Lakdikapul serves the heart of Hyderabad — Lakdikapul, Abids, Nampally, Himayatnagar — with a 150-bed facility combining advanced technology and genuine compassion.
              </p>
              <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:".95rem",color:MID,lineHeight:1.85,marginBottom:"2.5rem"}}>
                28+ board-certified specialists, robotic surgery, 3T MRI, NABL laboratory and a dedicated cardiac unit — everything a Central Hyderabad family needs, under one roof.
              </p>
              {/* Inline facts */}
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:1,background:BDR,borderRadius:12,overflow:"hidden",marginBottom:"2.5rem"}}>
                {[{n:"28+",l:"Super Specialists"},{n:"150",l:"Hospital Beds"},{n:"32k+",l:"Patients/Year"},{n:"8+",l:"Years of Care"}].map(f=>(
                  <div key={f.l} style={{background:CRM,padding:"1.2rem",textAlign:"center"}}>
                    <p style={{fontFamily:"'Anton',sans-serif",fontSize:"2rem",color:PINK,lineHeight:1}}>{f.n}</p>
                    <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:".65rem",fontWeight:700,color:SOFT,letterSpacing:".1em",textTransform:"uppercase",marginTop:3}}>{f.l}</p>
                  </div>
                ))}
              </div>
              <button onClick={()=>setBookOpen(true)}
                style={{fontFamily:"'DM Sans',sans-serif",display:"inline-flex",alignItems:"center",gap:8,background:NAV,color:WH,padding:".95rem 2.4rem",borderRadius:0,fontSize:".88rem",fontWeight:800,border:"none",cursor:"pointer",transition:"all .25s",textTransform:"uppercase",letterSpacing:".06em",clipPath:"polygon(0 0,calc(100% - 12px) 0,100% 100%,12px 100%)"}}>
                Book Consultation →
              </button>
            </div>
          } x={-28}/>

          <Reveal d={150} c={
            <div style={{position:"relative"}}>
              {/* Stacked photos */}
              <div style={{position:"relative",zIndex:2}}>
                <div style={{borderRadius:"0 40px 0 0",overflow:"hidden",boxShadow:`0 32px 80px ${NAV}22`}}>
                  <img src={IMG.ab1} alt="" style={{width:"100%",height:460,objectFit:"cover",display:"block"}}/>
                  <div style={{position:"absolute",inset:0,background:`linear-gradient(180deg,transparent 55%,${NAVDKR}BB 100%)`}}/>
                </div>
                {/* Second offset photo */}
                <div style={{position:"absolute",bottom:-32,left:-32,width:200,height:170,borderRadius:"0 0 0 20px",overflow:"hidden",border:`4px solid ${WH}`,boxShadow:"0 12px 40px rgba(0,0,0,.14)",zIndex:3}}>
                  <img src={IMG.ab2} alt="" style={{width:"100%",height:"100%",objectFit:"cover"}}/>
                </div>
              </div>
              {/* Pink year stamp — overlapping corner */}
              <div style={{position:"absolute",top:-24,right:-24,background:PINK,padding:"1.4rem 1.8rem",zIndex:4,boxShadow:`0 8px 28px ${PINK}55`}}>
                <p style={{fontFamily:"'Anton',sans-serif",fontSize:"2.4rem",color:WH,lineHeight:.9}}>2019</p>
                <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:".58rem",fontWeight:700,color:"rgba(255,255,255,.7)",letterSpacing:".14em",textTransform:"uppercase",marginTop:3}}>Established</p>
              </div>
            </div>
          }/>
        </div>
      </section>

      {/* ── DEPT QUICK LOOK — large text cards ── */}
      <section style={{background:NAVDKR,padding:"8rem 2rem",position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",inset:0,backgroundImage:`linear-gradient(${PINK}05 1px,transparent 1px),linear-gradient(90deg,${PINK}05 1px,transparent 1px)`,backgroundSize:"64px 64px",pointerEvents:"none"}}/>

        <div style={{maxWidth:1300,margin:"0 auto"}}>
          <Reveal c={
            <div style={{display:"flex",alignItems:"flex-end",justifyContent:"space-between",marginBottom:"4rem",flexWrap:"wrap",gap:"2rem"}}>
              <div>
                <p style={{fontFamily:"'Anton',sans-serif",fontSize:"4.5rem",color:`${PINK}15`,lineHeight:1,marginBottom:"-1.2rem"}}>02</p>
                <div style={{display:"flex",alignItems:"center",gap:10,marginTop:0}}>
                  <div style={{width:4,height:42,background:`linear-gradient(${GLOW},${PINK})`,borderRadius:2}}/>
                  <div>
                    <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:".65rem",fontWeight:800,letterSpacing:".22em",textTransform:"uppercase",color:`${GLOW}CC`}}>Medical Specialities</p>
                    <h2 style={{fontFamily:"'Anton',sans-serif",fontSize:"clamp(2.2rem,4vw,3.8rem)",color:WH,lineHeight:.95,letterSpacing:".02em",textTransform:"uppercase",marginTop:4}}>
                      8 DEPARTMENTS<br/><span style={{color:PINK}}>OF EXCELLENCE.</span>
                    </h2>
                  </div>
                </div>
              </div>
              <button onClick={()=>setPage("departments")}
                style={{fontFamily:"'DM Sans',sans-serif",display:"inline-flex",alignItems:"center",gap:6,background:"transparent",color:GLOW,border:`1.5px solid ${GLOW}55`,borderRadius:0,padding:".7rem 1.6rem",fontSize:".82rem",fontWeight:800,cursor:"pointer",transition:"all .25s",letterSpacing:".06em",textTransform:"uppercase",clipPath:"polygon(0 0,calc(100% - 10px) 0,100% 100%,10px 100%)"}}>
                All Departments →
              </button>
            </div>
          }/>

          {/* 4-col number list */}
          <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:"1px",background:"rgba(255,255,255,.06)"}} className="dept-g">
            {DEPTS.map((d,i)=>(
              <Reveal key={d.n} d={i*40} c={
                <div onClick={()=>{setPage("departments");}}
                  style={{background:"transparent",padding:"2rem 1.5rem",cursor:"pointer",transition:"background .28s",position:"relative",overflow:"hidden",borderTop:`2px solid ${d.col}`,display:"flex",flexDirection:"column",gap:"1rem"}}
                  onMouseEnter={e=>{(e.currentTarget as HTMLDivElement).style.background="rgba(255,255,255,.04)";}}
                  onMouseLeave={e=>{(e.currentTarget as HTMLDivElement).style.background="transparent";}}>
                  {/* Big number */}
                  <span style={{fontFamily:"'Anton',sans-serif",fontSize:"3.5rem",color:"rgba(255,255,255,.08)",lineHeight:1,position:"absolute",top:"1rem",right:"1rem"}}>{String(i+1).padStart(2,"0")}</span>
                  <span style={{fontSize:"1.8rem"}}>{d.ic}</span>
                  <div>
                    <p style={{fontFamily:"'Anton',sans-serif",fontSize:"1.1rem",color:WH,letterSpacing:".04em",textTransform:"uppercase",lineHeight:1.1}}>{d.n}</p>
                    <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:".68rem",color:"rgba(255,255,255,.45)",marginTop:4,fontWeight:600,letterSpacing:".06em"}}>{d.sub}</p>
                  </div>
                  <div style={{width:20,height:2,background:d.col,borderRadius:1}}/>
                </div>
              }/>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS — overlapping cards ── */}
      <section style={{background:CRM,padding:"8rem 2rem",position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",top:"-10%",right:"-5%",width:400,height:400,borderRadius:"50%",background:`radial-gradient(circle,${PINK}08 0%,transparent 65%)`,pointerEvents:"none"}}/>

        <div style={{maxWidth:1300,margin:"0 auto"}}>
          <Reveal c={
            <div style={{marginBottom:"4rem"}}>
              <p style={{fontFamily:"'Anton',sans-serif",fontSize:"4.5rem",color:`${PINK}10`,lineHeight:1,marginBottom:"-1.2rem"}}>03</p>
              <div style={{display:"flex",alignItems:"center",gap:10}}>
                <div style={{width:4,height:42,background:`linear-gradient(${NAV},${PINK})`,borderRadius:2}}/>
                <div>
                  <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:".65rem",fontWeight:800,letterSpacing:".22em",textTransform:"uppercase",color:PINK}}>Patient Stories</p>
                  <h2 style={{fontFamily:"'Anton',sans-serif",fontSize:"clamp(2.2rem,4vw,3.8rem)",color:INK,lineHeight:.95,letterSpacing:".02em",textTransform:"uppercase",marginTop:4}}>
                    VOICES OF<br/><span style={{color:PINK}}>HEALING.</span>
                  </h2>
                </div>
              </div>
            </div>
          }/>

          <div style={{position:"relative",minHeight:340}}>
            {TESTI.map((t,i)=>(
              <div key={i} style={{position:i===tIdx?"relative":"absolute",inset:0,opacity:i===tIdx?1:0,transform:i===tIdx?"none":"translateY(18px)",transition:"all .7s ease",pointerEvents:i===tIdx?"auto":"none"}}>
                <div style={{background:WH,border:`1px solid ${BDR}`,borderRadius:0,padding:"3.5rem",borderLeft:`6px solid ${PINK}`,boxShadow:`0 24px 60px ${NAV}10`}}>
                  {/* Big quote mark */}
                  <div style={{fontFamily:"'Anton',sans-serif",fontSize:"6rem",color:`${PINK}12`,lineHeight:1,marginBottom:"1rem"}}>"</div>
                  <p style={{fontFamily:"'Lora',serif",fontStyle:"italic",fontSize:"clamp(1.1rem,2vw,1.45rem)",color:INK,lineHeight:1.8,marginBottom:"2.5rem"}}>"{t.q}"</p>
                  <div style={{display:"flex",alignItems:"center",gap:"1rem"}}>
                    <div style={{width:48,height:48,borderRadius:"50%",background:`linear-gradient(135deg,${PINK},${NAV})`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                      <span style={{fontFamily:"'Anton',sans-serif",color:WH,fontSize:"1.2rem"}}>{t.name[0]}</span>
                    </div>
                    <div>
                      <p style={{fontFamily:"'DM Sans',sans-serif",fontWeight:800,color:INK,fontSize:".9rem"}}>{t.name}</p>
                      <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:".7rem",color:SOFT,marginTop:2}}>{t.area}</p>
                    </div>
                    <div style={{marginLeft:"auto",color:"#FCD34D",letterSpacing:2,fontSize:".9rem"}}>★★★★★</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div style={{display:"flex",gap:".5rem",marginTop:"2rem"}}>
            {TESTI.map((_,i)=>(
              <button key={i} onClick={()=>setTIdx(i)} style={{width:i===tIdx?36:10,height:4,background:i===tIdx?PINK:BDR,border:"none",cursor:"pointer",transition:"all .3s",borderRadius:0,padding:0}}/>
            ))}
          </div>
        </div>
      </section>

      {/* ── FACILITIES — split screen rows ── */}
      <section style={{background:WH,padding:"8rem 2rem"}}>
        <div style={{maxWidth:1300,margin:"0 auto"}}>
          <Reveal c={
            <div style={{marginBottom:"4rem"}}>
              <p style={{fontFamily:"'Anton',sans-serif",fontSize:"4.5rem",color:`${NAV}08`,lineHeight:1,marginBottom:"-1.2rem"}}>04</p>
              <div style={{display:"flex",alignItems:"center",gap:10}}>
                <div style={{width:4,height:42,background:`linear-gradient(${PINK},${NAV})`,borderRadius:2}}/>
                <div>
                  <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:".65rem",fontWeight:800,letterSpacing:".22em",textTransform:"uppercase",color:PINK}}>Infrastructure</p>
                  <h2 style={{fontFamily:"'Anton',sans-serif",fontSize:"clamp(2.2rem,4vw,3.8rem)",color:INK,lineHeight:.95,letterSpacing:".02em",textTransform:"uppercase",marginTop:4}}>
                    WORLD-CLASS<br/><span style={{color:PINK}}>FACILITIES.</span>
                  </h2>
                </div>
              </div>
            </div>
          }/>

          {/* Alternating split rows */}
          {[
            {name:"24/7 Emergency & Trauma Centre",tag:"Emergency",img:IMG.ambu,desc:"Fully-equipped trauma bay, crash carts, ventilators and a rapid response team on standby every hour of every day. GPS ambulance fleet with sub-10-minute response."},
            {name:"Advanced Imaging Suite",tag:"Radiology",img:IMG.f1,desc:"3-Tesla MRI, 256-slice CT, PET-CT and digital mammography — all under one roof, available 24 hours. Reports delivered in under 4 hours."},
            {name:"NABL Certified Laboratory",tag:"Pathology",img:IMG.f2,desc:"1,200+ tests, molecular diagnostics, flow cytometry, liquid biopsy and a 24/7 automated blood bank with all 12 blood components in stock."},
          ].map((f,i)=>(
            <Reveal key={f.name} d={i*60} c={
              <div style={{display:"grid",gridTemplateColumns:i%2===0?"1.2fr 1fr":"1fr 1.2fr",gap:0,marginBottom:1,overflow:"hidden"}} className="fac-row">
                <div style={{order:i%2===0?1:2,overflow:"hidden",position:"relative",minHeight:300}}>
                  <img src={f.img} alt={f.name} style={{width:"100%",height:"100%",objectFit:"cover",display:"block",minHeight:300,transition:"transform .6s"}}
                    onMouseEnter={e=>(e.currentTarget as HTMLImageElement).style.transform="scale(1.04)"}
                    onMouseLeave={e=>(e.currentTarget as HTMLImageElement).style.transform=""}/>
                  <div style={{position:"absolute",top:"1.5rem",left:i%2===0?"1.5rem":"auto",right:i%2===0?"auto":"1.5rem",background:PINK,padding:".4rem 1rem"}}>
                    <span style={{fontFamily:"'DM Sans',sans-serif",fontSize:".62rem",fontWeight:800,letterSpacing:".14em",textTransform:"uppercase",color:WH}}>{f.tag}</span>
                  </div>
                </div>
                <div style={{order:i%2===0?2:1,padding:"3.5rem",background:i%2===0?NAV:NAVDK,display:"flex",flexDirection:"column",justifyContent:"center"}}>
                  <h3 style={{fontFamily:"'Anton',sans-serif",fontSize:"1.6rem",color:WH,letterSpacing:".03em",textTransform:"uppercase",lineHeight:1.1,marginBottom:"1.2rem"}}>{f.name}</h3>
                  <p style={{fontFamily:"'Lora',serif",fontStyle:"italic",fontSize:".98rem",color:"rgba(255,255,255,.7)",lineHeight:1.8}}>{f.desc}</p>
                </div>
              </div>
            }/>
          ))}

          {/* Emergency CTA */}
          <Reveal d={200} c={
            <div style={{background:PINK,padding:"2.5rem",display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:"2rem",marginTop:1}}>
              <div>
                <p style={{fontFamily:"'Anton',sans-serif",fontSize:"1.8rem",color:WH,letterSpacing:".04em",textTransform:"uppercase",lineHeight:1.1}}>24/7 Emergency & Ambulance</p>
                <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:".88rem",color:"rgba(255,255,255,.78)",marginTop:".3rem"}}>GPS fleet · Trained paramedics · Under 10-minute response across Central Hyderabad</p>
              </div>
              <a href="tel:040-6600-7700" style={{display:"inline-flex",alignItems:"center",gap:8,background:WH,color:PINK,padding:"1rem 2.2rem",fontFamily:"'DM Sans',sans-serif",fontWeight:900,fontSize:".9rem",textDecoration:"none",flexShrink:0,letterSpacing:".06em",textTransform:"uppercase",clipPath:"polygon(0 0,calc(100% - 10px) 0,100% 100%,10px 100%)"}}>
                📞 040-6600-7700
              </a>
            </div>
          }/>
        </div>
      </section>

      {/* ── CONTACT & BRANCHES ── */}
      <section style={{background:CRM,padding:"8rem 2rem"}}>
        <div style={{maxWidth:1300,margin:"0 auto"}}>
          <Reveal c={
            <h2 style={{fontFamily:"'Anton',sans-serif",fontSize:"clamp(2rem,4vw,3.8rem)",color:INK,letterSpacing:".02em",textTransform:"uppercase",textAlign:"center",marginBottom:"4rem",lineHeight:.95}}>
              SRIKARA HOSPITALS<br/><span style={{color:PINK}}>LAKDIKAPUL</span>
            </h2>
          }/>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"3rem"}} className="two-col">
            <Reveal x={-24} c={
              <div style={{background:WH,border:`1px solid ${BDR}`,overflow:"hidden"}}>
                <div style={{height:4,background:`linear-gradient(90deg,${NAV},${PINK})`}}/>
                <div style={{padding:"2.2rem"}}>
                  {[
                    {ic:"📍",l:"Address",v:"8-2-293/82/A, Road No. 10\nBanjara Hills Rd, Lakdikapul\nHyderabad – 500004"},
                    {ic:"🚨",l:"Emergency 24/7",v:"040-6600-7700"},
                    {ic:"📞",l:"Appointments",v:"040-6600-7800"},
                    {ic:"✉️",l:"Email",v:"lakdikapul@srikarahospitals.in"},
                    {ic:"🕐",l:"OPD Hours",v:"Mon – Sat · 8:00 AM – 8:00 PM"},
                  ].map((c,i)=>(
                    <div key={c.l} style={{display:"flex",gap:"1rem",paddingBottom:"1.1rem",marginBottom:i<4?"1.1rem":0,borderBottom:i<4?`1px solid ${BDR}`:"none"}}>
                      <span style={{fontSize:"1.2rem",flexShrink:0,marginTop:2}}>{c.ic}</span>
                      <div>
                        <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:".62rem",fontWeight:800,letterSpacing:".14em",textTransform:"uppercase",color:PINK,marginBottom:".25rem"}}>{c.l}</p>
                        <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:".9rem",fontWeight:700,color:INK,whiteSpace:"pre-line",lineHeight:1.6}}>{c.v}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            }/>
            <Reveal x={24} d={100} c={
              <div>
                <h3 style={{fontFamily:"'Anton',sans-serif",fontSize:"2rem",color:INK,letterSpacing:".04em",textTransform:"uppercase",marginBottom:"2rem",lineHeight:.95}}>SRIKARA<br/><span style={{color:PINK}}>NETWORK</span></h3>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:1,background:BDR,overflow:"hidden",marginBottom:"1.5rem"}}>
                  {BRANCHES.map(b=>(
                    <div key={b} style={{background:CRM,padding:".88rem 1rem",display:"flex",alignItems:"center",justifyContent:"space-between",transition:"background .2s",cursor:"pointer"}}
                      onMouseEnter={e=>(e.currentTarget as HTMLDivElement).style.background=WH}
                      onMouseLeave={e=>(e.currentTarget as HTMLDivElement).style.background=CRM}>
                      <span style={{fontFamily:"'DM Sans',sans-serif",fontSize:".78rem",fontWeight:b==="Lakdikapul"?900:700,color:b==="Lakdikapul"?PINK:MID}}>{b}</span>
                      {b==="Lakdikapul"
                        ?<span style={{fontFamily:"'DM Sans',sans-serif",fontSize:".55rem",fontWeight:900,color:NAV,background:"#EDF1FA",borderRadius:100,padding:".12rem .5rem",border:`1px solid ${NAV}20`}}>Here</span>
                        :<span style={{fontSize:".7rem",color:PINK}}>→</span>}
                    </div>
                  ))}
                </div>
                <Link href="/" style={{fontFamily:"'DM Sans',sans-serif",display:"inline-flex",alignItems:"center",gap:8,fontSize:".82rem",fontWeight:800,color:NAV,textDecoration:"none",borderBottom:`1.5px solid ${NAV}`,paddingBottom:2}}>← Back to Main Srikara Website</Link>
              </div>
            }/>
          </div>
        </div>
      </section>
    </div>
  );

  /* ══════════════════════════════════════════
     DEPARTMENTS — ACCORDION
  ══════════════════════════════════════════ */
  const Departments=()=>(
    <div>
      <div style={{background:`linear-gradient(135deg,${NAVDKR},${NAV})`,padding:"5rem 2rem 4rem",position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",inset:0,backgroundImage:`linear-gradient(${PINK}06 1px,transparent 1px),linear-gradient(90deg,${PINK}06 1px,transparent 1px)`,backgroundSize:"56px 56px",pointerEvents:"none"}}/>
        <div style={{position:"absolute",right:"-5%",bottom:"-20%",width:320,height:320,borderRadius:"50%",background:`radial-gradient(circle,${PINK}16 0%,transparent 65%)`,pointerEvents:"none"}}/>
        <div style={{maxWidth:1300,margin:"0 auto",position:"relative",zIndex:1}}>
          <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:".65rem",fontWeight:800,letterSpacing:".22em",textTransform:"uppercase",color:`${GLOW}CC`,marginBottom:".8rem"}}>Medical Specialities</p>
          <h1 style={{fontFamily:"'Anton',sans-serif",fontSize:"clamp(2.5rem,5vw,5rem)",color:WH,letterSpacing:".02em",textTransform:"uppercase",lineHeight:.88}}>
            OUR<br/><span style={{color:PINK}}>DEPARTMENTS</span>
          </h1>
          <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:".98rem",color:"rgba(255,255,255,.55)",marginTop:".8rem"}}>8 specialities · expert compassionate care at Srikara Lakdikapul</p>
        </div>
      </div>

      <div style={{background:CRM,padding:"3rem 2rem"}}>
        <div style={{maxWidth:1300,margin:"0 auto",display:"flex",flexDirection:"column",gap:1,background:BDR}}>
          {DEPTS.map((d,i)=>(
            <div key={d.n} style={{background:WH,overflow:"hidden"}}>
              {/* Accordion header */}
              <button onClick={()=>setOpenDept(openDept===i?null:i)}
                style={{width:"100%",display:"grid",gridTemplateColumns:"64px 1fr auto",alignItems:"center",gap:"1.5rem",padding:"1.8rem 2rem",background:"none",border:"none",cursor:"pointer",textAlign:"left",transition:"background .25s",borderLeft:`4px solid ${openDept===i?d.col:"transparent"}`}}
                onMouseEnter={e=>(e.currentTarget as HTMLButtonElement).style.background=CRM}
                onMouseLeave={e=>(e.currentTarget as HTMLButtonElement).style.background="none"}>
                {/* Number */}
                <span style={{fontFamily:"'Anton',sans-serif",fontSize:"2.2rem",color:openDept===i?d.col:`${INK}20`,lineHeight:1,transition:"color .25s"}}>{String(i+1).padStart(2,"0")}</span>
                <div>
                  <div style={{display:"flex",alignItems:"center",gap:"0.7rem"}}>
                    <span style={{fontSize:"1.2rem"}}>{d.ic}</span>
                    <span style={{fontFamily:"'Anton',sans-serif",fontSize:"1.2rem",color:openDept===i?INK:MID,letterSpacing:".04em",textTransform:"uppercase",transition:"color .25s"}}>{d.n}</span>
                    <span style={{fontFamily:"'DM Sans',sans-serif",fontSize:".65rem",fontWeight:700,color:SOFT,letterSpacing:".08em",textTransform:"uppercase",marginLeft:4}}>· {d.sub}</span>
                  </div>
                </div>
                <span style={{fontSize:"1.3rem",color:openDept===i?d.col:SOFT,transition:"all .3s",transform:openDept===i?"rotate(45deg)":"none",display:"inline-block"}}>+</span>
              </button>

              {/* Accordion panel */}
              <div style={{maxHeight:openDept===i?600:0,overflow:"hidden",transition:"max-height .5s ease"}}>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:0,borderTop:`1px solid ${BDR}`}} className="two-col">
                  <div style={{overflow:"hidden",position:"relative",minHeight:280}}>
                    <img src={d.img} alt={d.n} style={{width:"100%",height:"100%",objectFit:"cover",display:"block",minHeight:280}}/>
                    <div style={{position:"absolute",inset:0,background:`linear-gradient(180deg,transparent 40%,${NAVDKR}CC 100%)`}}/>
                    <div style={{position:"absolute",top:0,left:0,right:0,height:3,background:d.col}}/>
                  </div>
                  <div style={{padding:"3rem",background:CRM}}>
                    <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:".98rem",color:MID,lineHeight:1.85,marginBottom:"1.5rem"}}>{d.desc}</p>
                    <div style={{display:"flex",flexWrap:"wrap",gap:".5rem",marginBottom:"2rem"}}>
                      {d.pts.map(pt=>(
                        <span key={pt} style={{fontFamily:"'DM Sans',sans-serif",fontSize:".72rem",fontWeight:700,color:d.col,background:`${d.col}12`,border:`1px solid ${d.col}28`,borderRadius:0,padding:".3rem .9rem"}}>{pt}</span>
                      ))}
                    </div>
                    <button onClick={()=>setBookOpen(true)}
                      style={{fontFamily:"'DM Sans',sans-serif",display:"inline-flex",alignItems:"center",gap:8,background:PINK,color:WH,padding:".88rem 2rem",borderRadius:0,fontSize:".88rem",fontWeight:800,border:"none",cursor:"pointer",letterSpacing:".05em",textTransform:"uppercase",clipPath:"polygon(0 0,calc(100% - 10px) 0,100% 100%,10px 100%)"}}>
                      Book Consultation →
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  /* ══════════════════════════════════════════
     DOCTORS — HORIZONTAL FILMSTRIP
  ══════════════════════════════════════════ */
  const Doctors=()=>(
    <div>
      <div style={{position:"relative",overflow:"hidden",minHeight:320,display:"flex",alignItems:"center",padding:"5rem 2rem",background:NAVDKR}}>
        <div style={{position:"absolute",inset:0,zIndex:0}}>
          <img src={IMG.h2} alt="" style={{width:"100%",height:"100%",objectFit:"cover",opacity:.2}}/>
          <div style={{position:"absolute",inset:0,background:`linear-gradient(135deg,${NAVDKR}F5,${NAV}F0 55%,${NAVDKR}F5)`}}/>
        </div>
        <div style={{position:"absolute",right:"-5%",top:"50%",transform:"translateY(-50%)",width:300,height:300,borderRadius:"50%",background:`radial-gradient(circle,${PINK}18 0%,transparent 65%)`,zIndex:1,pointerEvents:"none"}}/>
        <div style={{maxWidth:1300,margin:"0 auto",position:"relative",zIndex:2}}>
          <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:".65rem",fontWeight:800,letterSpacing:".22em",textTransform:"uppercase",color:`${GLOW}CC`,marginBottom:".8rem"}}>Medical Team</p>
          <h1 style={{fontFamily:"'Anton',sans-serif",fontSize:"clamp(2.5rem,5vw,5rem)",color:WH,letterSpacing:".02em",textTransform:"uppercase",lineHeight:.88}}>
            MEET OUR<br/><span style={{color:PINK}}>SPECIALISTS</span>
          </h1>
          <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:".98rem",color:"rgba(255,255,255,.55)",marginTop:".8rem"}}>Board-certified experts · compassionate care · Srikara Lakdikapul</p>
        </div>
      </div>

      <div style={{background:NAVDK,padding:"4rem 0 5rem"}}>
        {/* Filmstrip nav */}
        <div style={{maxWidth:1300,margin:"0 auto",padding:"0 2rem",display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:"2rem"}}>
          <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:".78rem",fontWeight:700,color:"rgba(255,255,255,.45)",letterSpacing:".1em",textTransform:"uppercase"}}>← Scroll →</p>
          <div style={{display:"flex",gap:".5rem"}}>
            {[-1,1].map(dir=>(
              <button key={dir} onClick={()=>scrollFilm(dir as 1|-1)}
                style={{width:44,height:44,borderRadius:0,background:"rgba(255,255,255,.07)",border:`1px solid rgba(255,255,255,.12)`,cursor:"pointer",color:WH,fontSize:"1.2rem",display:"flex",alignItems:"center",justifyContent:"center",transition:"background .25s"}}
                onMouseEnter={e=>(e.currentTarget as HTMLButtonElement).style.background=PINK}
                onMouseLeave={e=>(e.currentTarget as HTMLButtonElement).style.background="rgba(255,255,255,.07)"}>
                {dir===-1?"←":"→"}
              </button>
            ))}
          </div>
        </div>

        {/* Horizontal scroll filmstrip */}
        <div ref={filmRef} style={{display:"flex",gap:"2px",overflowX:"auto",paddingLeft:"calc((100vw - 1300px) / 2)",paddingRight:"2rem",scrollSnapType:"x mandatory",scrollbarWidth:"none"}}
          className="filmstrip">
          {DOCS.map((d,i)=>(
            <div key={d.name} style={{flexShrink:0,width:340,scrollSnapAlign:"start",background:NAV,position:"relative",overflow:"hidden",cursor:"pointer",transition:"all .3s"}}
              onMouseEnter={e=>{const el=e.currentTarget as HTMLDivElement;el.style.transform="translateY(-6px)";}}
              onMouseLeave={e=>{const el=e.currentTarget as HTMLDivElement;el.style.transform="";}}>
              {/* Top colour bar */}
              <div style={{height:4,background:`linear-gradient(90deg,${PINK},${NAV})`}}/>
              {/* Photo */}
              <div style={{height:280,overflow:"hidden",position:"relative",background:"#1B2D5B"}}>
                {d.img ? (
                  <img src={d.img} alt={d.name} style={{width:"100%",height:"100%",objectFit:"cover",objectPosition:"center top",display:"block",transition:"transform .5s"}}
                    onMouseEnter={e=>(e.currentTarget as HTMLImageElement).style.transform="scale(1.06)"}
                    onMouseLeave={e=>(e.currentTarget as HTMLImageElement).style.transform=""}/>
                ) : (
                  <div style={{width:"100%",height:"100%",display:"flex",alignItems:"center",justifyContent:"center"}}>
                    <span style={{fontSize:"4rem",opacity:.3}}>👨‍⚕️</span>
                  </div>
                )}
                <div style={{position:"absolute",inset:0,background:`linear-gradient(180deg,transparent 45%,${NAVDKR}CC 100%)`}}/>
                {/* Dept tag */}
                <span style={{position:"absolute",top:"1rem",left:"1rem",fontFamily:"'DM Sans',sans-serif",fontSize:".6rem",fontWeight:800,letterSpacing:".1em",textTransform:"uppercase",background:PINK,color:WH,padding:".22rem .7rem"}}>{d.dept}</span>
              </div>
              {/* Info */}
              <div style={{padding:"1.6rem"}}>
                <h3 style={{fontFamily:"'Lora',serif",fontStyle:"italic",fontSize:"1.05rem",color:WH,marginBottom:".3rem",lineHeight:1.3}}>{d.name}</h3>
                <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:".75rem",fontWeight:800,color:GLOW,marginBottom:".4rem"}}>{d.role}</p>
                <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:".7rem",color:"rgba(255,255,255,.45)",lineHeight:1.5,marginBottom:"1.4rem"}}>{d.qual}</p>
                <div style={{display:"flex",alignItems:"center",justifyContent:"flex-end",paddingTop:".9rem",borderTop:"1px solid rgba(255,255,255,.1)"}}>
                  <Link href={`/doctors?doctor=${d.slug}`}
                    style={{fontFamily:"'DM Sans',sans-serif",background:PINK,color:WH,border:"none",padding:".5rem 1.1rem",fontSize:".72rem",fontWeight:800,cursor:"pointer",letterSpacing:".06em",textTransform:"uppercase",textDecoration:"none"}}
                    onMouseEnter={e=>(e.currentTarget as HTMLAnchorElement).style.background=PINKLT}
                    onMouseLeave={e=>(e.currentTarget as HTMLAnchorElement).style.background=PINK}>
                    View Profile →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div style={{background:`linear-gradient(135deg,${NAV},${NAVDKR})`,padding:"3.5rem",textAlign:"center",position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",inset:0,background:`radial-gradient(ellipse at center,${PINK}14 0%,transparent 65%)`,pointerEvents:"none"}}/>
        <h3 style={{fontFamily:"'Anton',sans-serif",fontSize:"clamp(1.8rem,3.5vw,3rem)",color:WH,letterSpacing:".03em",textTransform:"uppercase",marginBottom:".6rem",position:"relative",zIndex:1,lineHeight:.95}}>
          BOOK WITH ANY SPECIALIST<br/><span style={{color:PINK}}>TODAY.</span>
        </h3>
        <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:".9rem",color:"rgba(255,255,255,.6)",marginBottom:"2.5rem",position:"relative",zIndex:1}}>Confirmed within 30 minutes · Mon–Sat 8 AM – 8 PM · Walk-ins welcome</p>
        <button onClick={()=>setBookOpen(true)}
          style={{fontFamily:"'DM Sans',sans-serif",background:PINK,color:WH,border:"none",padding:"1.1rem 3rem",fontSize:".92rem",fontWeight:900,cursor:"pointer",textTransform:"uppercase",letterSpacing:".08em",clipPath:"polygon(0 0,calc(100% - 14px) 0,100% 100%,14px 100%)",boxShadow:`0 4px 24px ${PINK}55`,position:"relative",zIndex:1}}>
          Book an Appointment →
        </button>
      </div>
    </div>
  );

  /* ── RENDER ── */
  return(
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Anton&family=Lora:ital,wght@0,400;0,600;1,400;1,600&family=DM+Sans:wght@300;400;500;600;700;800;900&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
        html{scroll-behavior:smooth;}
        body{font-family:'DM Sans',sans-serif;background:#F7F9FC;color:#0D1A35;overflow-x:hidden;}
        ::-webkit-scrollbar{width:4px;} ::-webkit-scrollbar-track{background:#EEF2F8;} ::-webkit-scrollbar-thumb{background:${PINK};}
        .filmstrip::-webkit-scrollbar{display:none;}

        @keyframes fadeUp{from{opacity:0;transform:translateY(28px)}to{opacity:1;transform:none}}
        @keyframes zoomIn{from{transform:scale(1.06)}to{transform:scale(1)}}
        @keyframes marquee{from{transform:translateX(0)}to{transform:translateX(-50%)}}
        @keyframes blink{0%,100%{opacity:1}50%{opacity:.25}}

        .dk{display:flex;align-items:center;gap:.5rem;}
        .mk{display:none!important;}

        @media(max-width:960px){
          .dk{display:none!important;} .mk{display:flex!important;}
          .two-col,.fac-row{display:block!important;}
          .dept-g{grid-template-columns:1fr 1fr!important;}
          .stat-strip{flex-wrap:wrap!important;}
        }
      `}</style>

      <Nav/>
      {page==="home"&&<Home/>}
      {page==="departments"&&<Departments/>}
      {page==="doctors"&&<Doctors/>}

      <footer style={{background:NAVDKR}}>
        <div style={{height:4,background:`linear-gradient(90deg,${NAV},${PINK},${NAV})`}}/>
        <div style={{maxWidth:1300,margin:"0 auto",padding:"1.8rem 2rem",display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:"1rem"}}>
          <Logo h={34}/>
          <span style={{fontFamily:"'DM Sans',sans-serif",fontSize:".68rem",color:"rgba(255,255,255,.28)"}}>© {new Date().getFullYear()} Srikara Hospitals – Lakdikapul · Part of Srikara Hospital Group</span>
        </div>
      </footer>

      <button onClick={()=>setBookOpen(true)}
        style={{position:"fixed",bottom:"1.8rem",right:"1.8rem",zIndex:400,fontFamily:"'DM Sans',sans-serif",background:PINK,color:WH,border:"none",padding:".92rem 1.7rem",fontSize:".82rem",fontWeight:800,cursor:"pointer",boxShadow:`0 8px 28px ${PINK}55`,transition:"all .3s",textTransform:"uppercase",letterSpacing:".06em",clipPath:"polygon(0 0,calc(100% - 10px) 0,100% 100%,10px 100%)"}}>
        📅 Book Now
      </button>

      {bookOpen&&(
        <div onClick={e=>{if(e.target===e.currentTarget)setBookOpen(false);}}
          style={{position:"fixed",inset:0,zIndex:900,background:"rgba(13,26,53,.72)",backdropFilter:"blur(14px)",display:"flex",alignItems:"center",justifyContent:"center",padding:"1rem"}}>
          <div style={{width:"100%",maxWidth:640,maxHeight:"92vh",overflowY:"auto",background:WH,boxShadow:"0 40px 100px rgba(0,0,0,.3)",animation:"fadeUp .3s ease"}}>
            <div style={{height:4,background:`linear-gradient(90deg,${NAV},${PINK},${NAV})`}}/>
            <div style={{background:`linear-gradient(135deg,${NAVDKR},${NAV})`,padding:"2rem 2rem 1.6rem",display:"flex",justifyContent:"space-between",alignItems:"flex-start",position:"relative",overflow:"hidden"}}>
              <div style={{position:"absolute",right:"-5%",top:"50%",transform:"translateY(-50%)",width:200,height:200,borderRadius:"50%",background:`radial-gradient(circle,${PINK}20 0%,transparent 65%)`,pointerEvents:"none"}}/>
              <div style={{position:"relative",zIndex:1}}>
                <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:".62rem",fontWeight:800,letterSpacing:".18em",textTransform:"uppercase",color:`${GLOW}BB`,marginBottom:".4rem"}}>Srikara Hospitals · Lakdikapul</p>
                <h3 style={{fontFamily:"'Anton',sans-serif",fontSize:"1.8rem",color:WH,letterSpacing:".04em",textTransform:"uppercase",lineHeight:1}}>BOOK APPOINTMENT</h3>
                <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:".8rem",color:"rgba(255,255,255,.55)",marginTop:".35rem"}}>Confirmed within 30 minutes · Mon–Sat 8 AM – 8 PM</p>
              </div>
              <button onClick={()=>setBookOpen(false)} style={{background:"rgba(255,255,255,.12)",border:"none",width:36,height:36,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",color:WH,fontSize:"1rem",position:"relative",zIndex:1}}>✕</button>
            </div>
            <form onSubmit={submit} style={{padding:"2rem"}}>
              <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:".65rem",fontWeight:800,letterSpacing:".18em",textTransform:"uppercase",color:PINK,marginBottom:".9rem"}}>Your Details</p>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"1rem",marginBottom:"1rem"}}>
                {[{l:"Full Name *",k:"name",t:"text",ph:"Your full name"},{l:"Mobile Number *",k:"phone",t:"tel",ph:"+91 98765 43210"}].map(f=>(
                  <div key={f.k}>
                    <label style={{fontFamily:"'DM Sans',sans-serif",display:"block",fontSize:".7rem",fontWeight:700,color:MID,marginBottom:".4rem"}}>{f.l}</label>
                    <input type={f.t} placeholder={f.ph} value={form[f.k as keyof typeof form]} onChange={e=>setForm(p=>({...p,[f.k]:e.target.value}))} required
                      style={{width:"100%",border:`1.5px solid ${BDR}`,borderRadius:0,padding:".78rem 1rem",fontFamily:"'DM Sans',sans-serif",fontSize:".92rem",color:INK,background:CRM,outline:"none",transition:"border-color .2s"}}
                      onFocus={e=>(e.currentTarget as HTMLInputElement).style.borderColor=PINK}
                      onBlur={e=>(e.currentTarget as HTMLInputElement).style.borderColor=BDR}/>
                  </div>
                ))}
              </div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"1rem",marginBottom:"1.4rem"}}>
                <div>
                  <label style={{fontFamily:"'DM Sans',sans-serif",display:"block",fontSize:".7rem",fontWeight:700,color:MID,marginBottom:".4rem"}}>Department *</label>
                  <select value={form.dept} onChange={e=>setForm(p=>({...p,dept:e.target.value}))} required
                    style={{width:"100%",border:`1.5px solid ${BDR}`,borderRadius:0,padding:".78rem 1rem",fontFamily:"'DM Sans',sans-serif",fontSize:".92rem",color:form.dept?INK:SOFT,background:CRM,outline:"none"}}>
                    <option value="">Select department</option>
                    {DEPTS.map(d=><option key={d.n}>{d.n}</option>)}
                    <option>General Medicine</option><option>Dermatology</option><option>ENT</option>
                  </select>
                </div>
                <div>
                  <label style={{fontFamily:"'DM Sans',sans-serif",display:"block",fontSize:".7rem",fontWeight:700,color:MID,marginBottom:".4rem"}}>Preferred Date *</label>
                  <input type="date" value={form.date} onChange={e=>setForm(p=>({...p,date:e.target.value}))} min={new Date().toISOString().split("T")[0]} required
                    style={{width:"100%",border:`1.5px solid ${BDR}`,borderRadius:0,padding:".78rem 1rem",fontFamily:"'DM Sans',sans-serif",fontSize:".92rem",color:INK,background:CRM,outline:"none"}}/>
                </div>
              </div>
              <div style={{background:CRM,border:`1px solid ${BDR}`,padding:"1.2rem",marginBottom:"1.4rem"}}>
                <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:".65rem",fontWeight:800,letterSpacing:".18em",textTransform:"uppercase",color:PINK,marginBottom:".8rem"}}>Time Slot</p>
                <div style={{display:"flex",flexWrap:"wrap",gap:".5rem"}}>
                  {SLOTS.map(sl=>(
                    <button key={sl} type="button" onClick={()=>setForm(p=>({...p,slot:p.slot===sl?"":sl}))}
                      style={{fontFamily:"'DM Sans',sans-serif",fontSize:".78rem",fontWeight:700,border:`1.5px solid ${form.slot===sl?PINK:BDR}`,borderRadius:0,padding:".42rem .9rem",cursor:"pointer",background:form.slot===sl?PINK:WH,color:form.slot===sl?WH:MID,transition:"all .2s"}}>
                      {sl}
                    </button>
                  ))}
                </div>
                {form.slot&&(
                  <div style={{marginTop:".8rem",display:"flex",alignItems:"center",gap:7,padding:".5rem .9rem",background:"#ECFDF5",border:"1px solid #A7F3D0"}}>
                    <span>✅</span>
                    <span style={{fontFamily:"'DM Sans',sans-serif",fontSize:".8rem",fontWeight:800,color:"#059669"}}>Selected: {form.slot}</span>
                  </div>
                )}
              </div>
              <button type="submit"
                style={{width:"100%",display:"flex",justifyContent:"center",alignItems:"center",fontFamily:"'DM Sans',sans-serif",background:sent?"#059669":PINK,color:WH,border:"none",padding:"1rem",fontSize:".9rem",fontWeight:900,cursor:"pointer",transition:"background .3s",textTransform:"uppercase",letterSpacing:".06em",clipPath:"polygon(0 0,calc(100% - 10px) 0,100% 100%,10px 100%)"}}>
                {sent?"✓ Confirmed! We will call you shortly.":"Confirm Appointment →"}
              </button>
              <p style={{fontFamily:"'DM Sans',sans-serif",textAlign:"center",fontSize:".72rem",color:MID,marginTop:".9rem"}}>
                Or call: <a href="tel:040-6600-7800" style={{color:PINK,fontWeight:900,textDecoration:"none"}}>040-6600-7800</a>
              </p>
            </form>
          </div>
        </div>
      )}
    </>
  );
}