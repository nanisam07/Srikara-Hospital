"use client";
import { useState, useEffect, useRef } from "react";

const SPECIALITIES = [
  { id:"01", icon:"🫀", name:"Cardiology",       sub:"Heart & Vascular",   desc:"Interventional cardiology, EP studies, TAVR, cath lab and 24/7 cardiac monitoring." },
  { id:"02", icon:"🧠", name:"Neurosciences",    sub:"Brain & Spine",      desc:"Stroke unit, epilepsy monitoring, neurosurgery and comprehensive neuro-rehabilitation." },
  { id:"03", icon:"🦴", name:"Orthopaedics",     sub:"Bones & Joints",     desc:"Robotic joint replacement, arthroscopy, sports medicine and spinal surgery." },
  { id:"04", icon:"🎗️", name:"Oncology",         sub:"Cancer Care",        desc:"Precision oncology, immunotherapy, day-care chemo and multidisciplinary tumour board." },
  { id:"05", icon:"👶", name:"Paediatrics",      sub:"Child Health",       desc:"Level III NICU, paediatric surgery, child development and adolescent health." },
  { id:"06", icon:"🌸", name:"Gynaecology",      sub:"Women's Health",     desc:"High-risk pregnancy, IVF, robotic gynaecological surgery and breast health." },
  { id:"07", icon:"🫁", name:"Gastroenterology", sub:"Digestive Health",   desc:"Advanced endoscopy, hepatology, IBD clinic and bariatric surgery." },
  { id:"08", icon:"🫘", name:"Urology",          sub:"Urinary Tract",      desc:"Robotic urological surgery, renal transplant and stone disease management." },
];

const DOCTORS = [
  { name:"Dr. Anil Reddy Konduru",  role:"Chief Cardiologist",             exp:"21", qual:"DM Cardiology · Cleveland Clinic Fellow",  avail:"Mon–Sat · 10 AM–2 PM",   img:"https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&q=80" },
  { name:"Dr. Shalini Meredith",    role:"Senior Neurologist",             exp:"17", qual:"DM Neurology · NIMHANS Bengaluru",         avail:"Mon–Fri · 9 AM–1 PM",    img:"https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&q=80" },
  { name:"Dr. Kiran Babu Naidu",    role:"Orthopaedic Surgeon",            exp:"19", qual:"MS Ortho · Fellowship USA",                avail:"Tue, Thu, Sat · 3–7 PM", img:"https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&q=80" },
  { name:"Dr. Padma Raghavan",      role:"Gynaecologist & IVF Specialist", exp:"15", qual:"MS OBG · FOGSI Fellowship",                avail:"Mon–Fri · 11 AM–3 PM",   img:"https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&q=80" },
  { name:"Dr. Venkat Srinivasan",   role:"Surgical Oncologist",            exp:"14", qual:"MCh Oncosurgery · Tata Memorial",          avail:"Mon,Wed,Fri · 2–6 PM",   img:"https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=400&q=80" },
  { name:"Dr. Rohit Ganapathi",     role:"Neonatologist",                  exp:"11", qual:"DNB Paeds · Fellowship NNF",               avail:"Mon–Sat · 8 AM–12 PM",   img:"https://images.unsplash.com/photo-1591604021695-0c69b7c05981?w=400&q=80" },
];

const STATS = [
  { val:"42+",  label:"Specialist Doctors" },
  { val:"350",  label:"Hospital Beds" },
  { val:"60k+", label:"Patients Treated" },
  { val:"24/7", label:"Emergency Care" },
];

const TESTIMONIALS = [
  { text:"After my stroke, I thought life would never be normal again. The neuro team at Srikara Miyapur brought me back completely. Six months later, I'm walking and back at work.", name:"Suresh Varma", area:"Miyapur, Hyderabad", dept:"Neurology" },
  { text:"The robotic knee replacement was phenomenal — I was walking the very next day. Dr. Kiran's team sets a standard I've never encountered anywhere else in the city.", name:"Kamala Devi", area:"Kukatpally, Hyderabad", dept:"Orthopaedics" },
  { text:"Our IVF journey of 4 years ended here with the most beautiful result — our daughter. Dr. Padma and the fertility team walked every step of the way with us.", name:"Rajesh & Aruna", area:"Hyderabad", dept:"IVF & Fertility" },
];

const FACILITIES = [
  { tag:"ICU",   icon:"🏥", name:"36-Bed Critical Care Unit",  desc:"Cardiac, neuro, medical and surgical ICU pods with CRRT and ECMO capabilities around the clock." },
  { tag:"OT",    icon:"⚕️",  name:"8 Laminar-Flow OTs",         desc:"Dedicated robotic surgery suite and neuro-navigation enabled theatre with cutting-edge equipment." },
  { tag:"IMG",   icon:"🔬", name:"3T MRI · 256-CT · PET-CT",   desc:"Complete imaging — 3-Tesla MRI, dual-energy CT, PET-CT and a full nuclear medicine suite." },
  { tag:"LAB",   icon:"🧪", name:"NABL Accredited Laboratory",  desc:"1,400+ test menu with molecular diagnostics, flow cytometry, liquid biopsy and 24/7 blood bank." },
  { tag:"REHAB", icon:"💪", name:"Rehabilitation Centre",       desc:"Physio, occupational therapy, speech-language pathology, aqua therapy and cardiac rehab." },
  { tag:"PHM",   icon:"💊", name:"24/7 In-house Pharmacy",      desc:"Full in-patient and retail pharmacy, cold-chain biologics and automated dispensing systems." },
];

const BRANCHES = ["RTC X Roads","Miyapur","Lakdikapul","Kompally","Vijayawada","Peerzadiguda","Rajahmundry","ECIL","LB Nagar"];
const TICKERS  = ["Robotic Surgery","Level III NICU","PET-CT Imaging","Cardiac Cath Lab","ECMO Centre","24/7 Blood Bank","NABH Certified","Neuro-Navigation OT","Day Care Chemo","AI Diagnostics","Dialysis Unit","Bone Marrow Transplant"];
const ACCREDS  = ["NABH Accredited","ISO 9001:2015","NABL Laboratory","100+ Insurance Partners","ECMO Centre"];

// Brand colours
const N  = "#1B2A4A";   // navy
const NL = "#2E4A7A";   // navy light
const M  = "#B8246E";   // magenta
const ML = "#D4408A";   // magenta light

const G = `
@import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;1,300&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
html{scroll-behavior:smooth;}
body{font-family:'DM Sans',sans-serif;background:#fff;color:#1a1a2e;overflow-x:hidden;}
a{text-decoration:none;}
::-webkit-scrollbar{width:4px;}
::-webkit-scrollbar-track{background:#f5f5f5;}
::-webkit-scrollbar-thumb{background:${M};border-radius:2px;}
@keyframes fadeUp{from{opacity:0;transform:translateY(22px);}to{opacity:1;transform:translateY(0);}}
@keyframes pulse{0%,100%{opacity:1;}50%{opacity:.35;}}
@keyframes marquee{from{transform:translateX(0);}to{transform:translateX(-50%);}}
.a1{animation:fadeUp .65s ease .05s both;}
.a2{animation:fadeUp .65s ease .18s both;}
.a3{animation:fadeUp .65s ease .3s both;}
.a4{animation:fadeUp .65s ease .42s both;}
.a5{animation:fadeUp .65s ease .54s both;}
.ticker{animation:marquee 40s linear infinite;}
input,select{font-family:'DM Sans',sans-serif;}
input::placeholder{color:rgba(26,26,46,.3);}
`;

function useReveal(){
  const ref=useRef<HTMLDivElement>(null);
  const[on,setOn]=useState(false);
  useEffect(()=>{
    const el=ref.current;if(!el)return;
    const io=new IntersectionObserver(([e])=>{if(e.isIntersecting){setOn(true);io.unobserve(el);}},{threshold:.07});
    io.observe(el);return()=>io.disconnect();
  },[]);
  return{ref,on};
}

function Reveal({children,delay=0,style={}}:{children:React.ReactNode;delay?:number;style?:React.CSSProperties}){
  const{ref,on}=useReveal();
  return(
    <div ref={ref} style={{opacity:on?1:0,transform:on?"none":"translateY(20px)",transition:`opacity .7s ease ${delay}ms,transform .7s ease ${delay}ms`,...style}}>
      {children}
    </div>
  );
}

// ── SUB-COMPONENTS ──────────────────────────────────────────────────────────
function SectionLabel({children}:{children:React.ReactNode}){
  return <div style={{fontSize:".62rem",color:M,fontWeight:700,letterSpacing:".18em",textTransform:"uppercase",marginBottom:".8rem",display:"flex",alignItems:"center",gap:".6rem"}}>
    <span style={{width:20,height:2,background:M,display:"inline-block",borderRadius:1}}/>
    {children}
  </div>;
}

function SpecCard({s,active,onClick}:{s:(typeof SPECIALITIES)[0];active:boolean;onClick:()=>void}){
  const[hov,setHov]=useState(false);
  const hi=hov||active;
  return(
    <div onClick={onClick} onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
      style={{background:hi?N:"#fff",border:`1.5px solid ${hi?N:"#eaeaf5"}`,borderRadius:12,padding:"1.4rem",cursor:"pointer",transition:"all .25s",transform:hi?"translateY(-3px)":"none",boxShadow:hi?`0 10px 30px rgba(27,42,74,.18)`:"0 1px 4px rgba(0,0,0,.04)"}}>
      <div style={{fontSize:"1.7rem",marginBottom:".8rem"}}>{s.icon}</div>
      <div style={{fontSize:".55rem",color:M,letterSpacing:".14em",textTransform:"uppercase",fontWeight:700,marginBottom:".3rem"}}>{s.sub}</div>
      <h3 style={{fontFamily:"'DM Serif Display',serif",fontSize:"1rem",color:hi?"#fff":N,marginBottom:".5rem"}}>{s.name}</h3>
      <p style={{fontSize:".72rem",color:hi?"rgba(255,255,255,.55)":"#888",lineHeight:1.7}}>{s.desc}</p>
      <div style={{marginTop:"1rem",fontSize:".7rem",color:M,fontWeight:600}}>Book →</div>
    </div>
  );
}

function DoctorCard({d}:{d:(typeof DOCTORS)[0]}){
  const[hov,setHov]=useState(false);
  return(
    <div onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
      style={{background:"#fff",border:"1px solid #eaeaf5",borderRadius:12,overflow:"hidden",transition:"all .3s",boxShadow:hov?"0 12px 35px rgba(27,42,74,.12)":"0 2px 8px rgba(0,0,0,.04)",transform:hov?"translateY(-4px)":"none"}}>
      <div style={{height:220,overflow:"hidden",position:"relative",background:`${N}10`}}>
        <img src={d.img} alt={d.name} loading="lazy"
          style={{width:"100%",height:"100%",objectFit:"cover",objectPosition:"top",display:"block",transition:"transform .5s ease",transform:hov?"scale(1.04)":"scale(1)"}}/>
        <div style={{position:"absolute",top:12,right:12,background:N,color:"#fff",fontSize:".6rem",fontWeight:700,letterSpacing:".1em",textTransform:"uppercase",padding:".3rem .75rem",borderRadius:100}}>
          {d.exp} yrs
        </div>
      </div>
      <div style={{padding:"1.3rem"}}>
        <div style={{fontSize:".6rem",color:M,fontWeight:700,letterSpacing:".1em",textTransform:"uppercase",marginBottom:".35rem"}}>{d.role}</div>
        <h3 style={{fontFamily:"'DM Serif Display',serif",fontSize:"1.05rem",color:N,marginBottom:".4rem"}}>{d.name}</h3>
        <div style={{fontSize:".7rem",color:"#888",marginBottom:".9rem",lineHeight:1.5}}>{d.qual}</div>
        <div style={{paddingTop:".8rem",borderTop:"1px solid #f0f0f8",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
          <div style={{fontSize:".68rem",color:"#666"}}>{d.avail}</div>
          <a href="#appointment" style={{background:hov?M:`${M}15`,color:hov?"#fff":M,fontSize:".68rem",fontWeight:700,padding:".4rem .9rem",borderRadius:6,transition:"all .2s"}}>
            Book →
          </a>
        </div>
      </div>
    </div>
  );
}

function FacCard({f}:{f:(typeof FACILITIES)[0]}){
  const[hov,setHov]=useState(false);
  return(
    <div onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
      style={{background:"#fff",border:`1px solid ${hov?`${N}30`:"#eaeaf5"}`,borderRadius:12,padding:"1.6rem",transition:"all .25s",boxShadow:hov?"0 8px 24px rgba(27,42,74,.09)":"0 1px 4px rgba(0,0,0,.04)",borderTop:`3px solid ${hov?M:"#eaeaf5"}`}}>
      <div style={{display:"flex",alignItems:"center",gap:".9rem",marginBottom:".9rem"}}>
        <div style={{width:46,height:46,borderRadius:10,background:hov?`${N}12`:"#f8f9ff",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"1.35rem",transition:"background .2s",flexShrink:0}}>
          {f.icon}
        </div>
        <div>
          <div style={{fontSize:".55rem",color:M,fontWeight:700,letterSpacing:".14em",textTransform:"uppercase"}}>{f.tag}</div>
          <h4 style={{fontFamily:"'DM Serif Display',serif",fontSize:".95rem",color:N,marginTop:".15rem"}}>{f.name}</h4>
        </div>
      </div>
      <p style={{fontSize:".76rem",color:"#666",lineHeight:1.75,fontWeight:300}}>{f.desc}</p>
    </div>
  );
}

// ── PAGE ────────────────────────────────────────────────────────────────────
export default function MiyapurPage(){
  const[scrollY,setScrollY]=useState(0);
  const[activeSpec,setActiveSpec]=useState(0);
  const[activeTesti,setActiveTesti]=useState(0);
  const[form,setForm]=useState({name:"",phone:"",dept:"",date:""});
  const[sent,setSent]=useState(false);

  useEffect(()=>{
    const fn=()=>setScrollY(window.scrollY);
    window.addEventListener("scroll",fn,{passive:true});
    return()=>window.removeEventListener("scroll",fn);
  },[]);

  useEffect(()=>{
    const t=setInterval(()=>setActiveTesti(p=>(p+1)%TESTIMONIALS.length),5500);
    return()=>clearInterval(t);
  },[]);

  const submit=(e:React.FormEvent)=>{e.preventDefault();setSent(true);setTimeout(()=>setSent(false),3500);};

  return(
    <>
      <style>{G}</style>

      {/* ── TOP BAR ── */}
      <div style={{background:N,color:"#fff",padding:".4rem 2.5rem",display:"flex",alignItems:"center",justifyContent:"space-between",fontSize:".68rem"}}>
        <div style={{display:"flex",alignItems:"center",gap:"1.5rem"}}>
          <span style={{display:"flex",alignItems:"center",gap:".5rem"}}>
            <span style={{width:6,height:6,borderRadius:"50%",background:"#4ade80",display:"inline-block",animation:"pulse 1.5s ease infinite"}}/>
            24/7 Emergency: <a href="tel:04035678900" style={{color:M,fontWeight:700,marginLeft:4}}>040-3567-8900</a>
          </span>
          <span style={{opacity:.4}}>|</span>
          <span style={{opacity:.65}}>OPD: Mon–Sat · 8 AM – 8 PM</span>
        </div>
        <span style={{opacity:.55,fontSize:".64rem"}}>📍 Plot 8-A, Miyapur X Roads, Hyderabad – 500049</span>
      </div>

      {/* ── NAV ── */}
      <nav style={{position:"sticky",top:0,zIndex:900,background:"#fff",borderBottom:`1px solid ${scrollY>60?"#e5e5ee":"#f0f0f8"}`,boxShadow:scrollY>60?"0 2px 16px rgba(27,42,74,.07)":"none",transition:"all .3s",padding:"0 2.5rem",height:66,display:"flex",alignItems:"center",justifyContent:"space-between"}}>
        {/* Logo */}
        <a href="/" style={{display:"flex",alignItems:"center",gap:12}}>
          <div style={{width:42,height:42,borderRadius:"50%",background:`linear-gradient(135deg,${N},${NL})`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,boxShadow:`0 3px 12px rgba(27,42,74,.22)`}}>
            <span style={{fontFamily:"'DM Serif Display',serif",fontSize:"1.05rem",color:"#fff"}}>S</span>
          </div>
          <div>
            <div style={{fontFamily:"'DM Serif Display',serif",fontSize:"1rem",color:N,lineHeight:1.15}}>Srikara Hospitals</div>
            <div style={{fontSize:".57rem",color:M,letterSpacing:".18em",textTransform:"uppercase",fontWeight:700}}>Miyapur · Hyderabad</div>
          </div>
        </a>
        {/* Links */}
        <div style={{display:"flex",alignItems:"center",gap:"2rem"}}>
          {[["Home","#"],["Doctors","#doctors"],["Departments","#specialities"]].map(([l,h])=>(
            <a key={l} href={h} style={{fontSize:".8rem",color:"#5a5a7a",fontWeight:500,transition:"color .2s"}}
              onMouseEnter={e=>e.currentTarget.style.color=N}
              onMouseLeave={e=>e.currentTarget.style.color="#5a5a7a"}>{l}</a>
          ))}
          <a href="tel:04035678900"
            style={{display:"flex",alignItems:"center",gap:".4rem",fontSize:".78rem",color:N,fontWeight:600,border:`1.5px solid ${N}30`,padding:".42rem 1rem",borderRadius:4,transition:"all .2s"}}
            onMouseEnter={e=>{e.currentTarget.style.background=N;e.currentTarget.style.color="#fff";}}
            onMouseLeave={e=>{e.currentTarget.style.background="transparent";e.currentTarget.style.color=N;}}>
            📞 Call Us
          </a>
          <a href="#appointment"
            style={{fontSize:".8rem",fontWeight:600,background:M,color:"#fff",padding:".5rem 1.3rem",borderRadius:4,letterSpacing:".03em",transition:"background .2s",boxShadow:`0 3px 12px rgba(184,36,110,.28)`}}
            onMouseEnter={e=>e.currentTarget.style.background=ML}
            onMouseLeave={e=>e.currentTarget.style.background=M}>
            Book Appointment
          </a>
        </div>
      </nav>

      {/* ══════════════════════════════════════════
          HERO — Light, photo right
          ══════════════════════════════════════════ */}
      <section style={{background:"#fff",display:"flex",minHeight:"88vh",overflow:"hidden",position:"relative"}}>

        {/* Left content */}
        <div style={{flex:"0 0 52%",padding:"5.5rem 3rem 4rem 3.5rem",display:"flex",flexDirection:"column",justifyContent:"center",position:"relative",zIndex:2}}>
          <div className="a1" style={{display:"inline-flex",alignItems:"center",gap:".6rem",background:`${N}0d`,border:`1px solid ${N}20`,padding:".35rem 1rem",borderRadius:100,width:"fit-content",marginBottom:"1.8rem"}}>
            <span style={{width:6,height:6,borderRadius:"50%",background:M,display:"inline-block"}}/>
            <span style={{fontSize:".62rem",color:N,fontWeight:700,letterSpacing:".12em",textTransform:"uppercase"}}>NABH Accredited · Est. 2012</span>
          </div>

          <h1 className="a2" style={{fontFamily:"'DM Serif Display',serif",fontSize:"clamp(2.6rem,4.8vw,4.4rem)",color:N,lineHeight:1.08,marginBottom:"1.4rem",letterSpacing:"-.01em"}}>
            Advanced<br/>Multi-Specialty<br/><span style={{color:M,fontStyle:"italic"}}>Care at Miyapur</span>
          </h1>

          <p className="a3" style={{fontSize:".98rem",color:"#5a5a7a",lineHeight:1.8,maxWidth:480,marginBottom:"2.2rem",fontWeight:300}}>
            42 specialist doctors. Robotic surgery. AI-powered diagnostics. Round-the-clock ICU — all under one roof, all for you.
          </p>

          <div className="a4" style={{display:"flex",gap:"1rem",flexWrap:"wrap",marginBottom:"2.8rem"}}>
            <a href="#appointment"
              style={{display:"inline-flex",alignItems:"center",gap:".5rem",background:M,color:"#fff",padding:".88rem 1.9rem",borderRadius:6,fontSize:".83rem",fontWeight:600,letterSpacing:".03em",boxShadow:`0 5px 18px rgba(184,36,110,.28)`,transition:"all .2s"}}
              onMouseEnter={e=>{e.currentTarget.style.background=ML;e.currentTarget.style.transform="translateY(-2px)";}}
              onMouseLeave={e=>{e.currentTarget.style.background=M;e.currentTarget.style.transform="none";}}>
              Book Appointment →
            </a>
            <a href="tel:04035678900"
              style={{display:"inline-flex",alignItems:"center",gap:".5rem",color:N,padding:".88rem 1.9rem",borderRadius:6,fontSize:".83rem",fontWeight:600,border:`1.5px solid ${N}25`,transition:"all .2s"}}
              onMouseEnter={e=>e.currentTarget.style.background=`${N}08`}
              onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
              🚨 040-3567-8900
            </a>
          </div>

          {/* Stats */}
          <div className="a5" style={{display:"flex",gap:"2.5rem",paddingTop:"2rem",borderTop:"1px solid #eee",flexWrap:"wrap"}}>
            {STATS.map(s=>(
              <div key={s.label}>
                <div style={{fontFamily:"'DM Serif Display',serif",fontSize:"2rem",color:N,lineHeight:1}}>{s.val}</div>
                <div style={{fontSize:".65rem",color:"#999",letterSpacing:".08em",textTransform:"uppercase",marginTop:3}}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right photo */}
        <div style={{flex:1,position:"relative",overflow:"hidden"}}>
          <img src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=1000&q=85" alt="Srikara Miyapur"
            style={{width:"100%",height:"100%",objectFit:"cover",display:"block"}}/>
          <div style={{position:"absolute",inset:0,background:"linear-gradient(90deg,#fff 0%,transparent 18%)",pointerEvents:"none"}}/>
          {/* Emergency card */}
          <div style={{position:"absolute",bottom:28,left:20,background:"#fff",borderRadius:12,padding:"1.1rem 1.3rem",boxShadow:"0 10px 36px rgba(0,0,0,.11)",minWidth:210,border:`1.5px solid ${M}20`}}>
            <div style={{display:"flex",alignItems:"center",gap:".5rem",marginBottom:".4rem"}}>
              <span style={{width:7,height:7,borderRadius:"50%",background:"#22c55e",display:"inline-block",boxShadow:"0 0 0 3px rgba(34,197,94,.2)"}}/>
              <span style={{fontSize:".58rem",color:"#22c55e",fontWeight:700,letterSpacing:".1em",textTransform:"uppercase"}}>Emergency Active</span>
            </div>
            <div style={{fontFamily:"'DM Serif Display',serif",fontSize:"1.25rem",color:N}}>040-3567-8900</div>
            <div style={{fontSize:".67rem",color:"#999",marginTop:".25rem"}}>24 hours · 7 days a week</div>
          </div>
          {/* NABH badge */}
          <div style={{position:"absolute",top:22,right:22,background:N,borderRadius:8,padding:".75rem 1.1rem",boxShadow:`0 6px 22px rgba(27,42,74,.25)`}}>
            <div style={{fontSize:".55rem",color:"rgba(255,255,255,.5)",letterSpacing:".12em",textTransform:"uppercase",marginBottom:".25rem"}}>Accredited By</div>
            <div style={{fontSize:".85rem",color:"#fff",fontWeight:700}}>NABH & NABL</div>
          </div>
        </div>
      </section>

      {/* ── TICKER ── */}
      <div style={{background:N,padding:".62rem 0",overflow:"hidden",whiteSpace:"nowrap"}}>
        <div className="ticker" style={{display:"inline-flex",gap:"3rem"}}>
          {[...TICKERS,...TICKERS,...TICKERS].map((t,i)=>(
            <span key={i} style={{display:"inline-flex",alignItems:"center",gap:".8rem",fontSize:".62rem",letterSpacing:".16em",textTransform:"uppercase",color:"rgba(255,255,255,.8)",fontWeight:500}}>
              <span style={{width:4,height:4,borderRadius:"50%",background:M,display:"inline-block",flexShrink:0}}/>
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* ── QUICK SERVICES ── */}
      <section style={{background:"#f8f9ff",borderBottom:"1px solid #eaeaf5",padding:"2.2rem 2.5rem"}}>
        <div style={{maxWidth:1200,margin:"0 auto",display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:"1.2rem"}}>
          {[
            {icon:"🩺",title:"OPD Consultation",sub:"Book with specialist",href:"#appointment"},
            {icon:"🚑",title:"Emergency",sub:"040-3567-8900 · 24/7",href:"tel:04035678900"},
            {icon:"🧪",title:"Lab & Reports",sub:"NABL certified tests",href:"#facilities"},
            {icon:"🏨",title:"Health Packages",sub:"Preventive check-ups",href:"#appointment"},
          ].map(q=>(
            <a key={q.title} href={q.href}
              style={{background:"#fff",border:"1px solid #eaeaf5",borderRadius:10,padding:"1.1rem 1.3rem",display:"flex",alignItems:"center",gap:".9rem",transition:"all .2s"}}
              onMouseEnter={e=>{e.currentTarget.style.borderColor=M;e.currentTarget.style.boxShadow=`0 4px 18px rgba(184,36,110,.1)`;e.currentTarget.style.transform="translateY(-2px)";}}
              onMouseLeave={e=>{e.currentTarget.style.borderColor="#eaeaf5";e.currentTarget.style.boxShadow="none";e.currentTarget.style.transform="none";}}>
              <span style={{fontSize:"1.5rem"}}>{q.icon}</span>
              <div>
                <div style={{fontSize:".82rem",fontWeight:600,color:N}}>{q.title}</div>
                <div style={{fontSize:".68rem",color:"#888",marginTop:1}}>{q.sub}</div>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════
          DEPARTMENTS
          ══════════════════════════════════════════ */}
      <section id="specialities" style={{background:"#fff",padding:"5rem 2.5rem"}}>
        <div style={{maxWidth:1200,margin:"0 auto"}}>
          <Reveal>
            <div style={{display:"flex",alignItems:"flex-end",justifyContent:"space-between",marginBottom:"2.5rem",flexWrap:"wrap",gap:"1rem"}}>
              <div>
                <SectionLabel>Clinical Expertise</SectionLabel>
                <h2 style={{fontFamily:"'DM Serif Display',serif",fontSize:"clamp(2rem,3vw,2.8rem)",color:N}}>Our Departments</h2>
              </div>
              <a href="#" style={{fontSize:".75rem",color:M,fontWeight:600,borderBottom:`1px solid ${M}`,paddingBottom:2}}>View All →</a>
            </div>
          </Reveal>
          <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:"1rem"}}>
            {SPECIALITIES.map((s,i)=>(
              <Reveal key={s.id} delay={i*45}>
                <SpecCard s={s} active={activeSpec===i} onClick={()=>setActiveSpec(i)}/>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          WHY US + TESTIMONIALS — Split
          ══════════════════════════════════════════ */}
      <section style={{background:N,overflow:"hidden"}}>
        <div style={{maxWidth:1200,margin:"0 auto",display:"flex",minHeight:480}}>
          {/* Left navy */}
          <div style={{flex:"0 0 50%",padding:"5rem 3.5rem",position:"relative",overflow:"hidden"}}>
            <div style={{position:"absolute",right:-20,top:"50%",transform:"translateY(-50%)",fontFamily:"'DM Serif Display',serif",fontSize:"16rem",color:"rgba(255,255,255,.03)",lineHeight:1,userSelect:"none",pointerEvents:"none"}}>12</div>
            <Reveal>
              <SectionLabel>Trusted Since 2012</SectionLabel>
              <h2 style={{fontFamily:"'DM Serif Display',serif",fontSize:"clamp(1.8rem,3vw,2.8rem)",color:"#fff",lineHeight:1.15,marginBottom:"1.3rem"}}>
                Why Patients<br/>Choose Srikara
              </h2>
              <p style={{fontSize:".9rem",color:"rgba(255,255,255,.55)",lineHeight:1.9,maxWidth:380,marginBottom:"2.2rem",fontWeight:300}}>
                We see the person before we see the condition. Every process here is built around genuine, comprehensive care for every patient.
              </p>
              {[
                {n:"01",t:"42 Board-Certified Specialists",d:"International fellowships, decades of combined expertise."},
                {n:"02",t:"Robotic & Minimally Invasive Surgery",d:"Faster recovery, fewer complications, better outcomes."},
                {n:"03",t:"Transparent, Ethical Pricing",d:"No hidden charges. Clear bills. 100+ insurance partners."},
              ].map(w=>(
                <div key={w.n} style={{display:"flex",gap:".9rem",marginBottom:"1.1rem"}}>
                  <span style={{fontFamily:"'DM Serif Display',serif",fontSize:"1.5rem",color:`${M}55`,lineHeight:1,flexShrink:0,width:28}}>{w.n}</span>
                  <div>
                    <div style={{fontSize:".83rem",fontWeight:600,color:"#fff",marginBottom:".2rem"}}>{w.t}</div>
                    <div style={{fontSize:".72rem",color:"rgba(255,255,255,.4)",lineHeight:1.6}}>{w.d}</div>
                  </div>
                </div>
              ))}
            </Reveal>
          </div>
          {/* Right testimonial — white bg */}
          <div style={{flex:1,background:"#f8f9ff",padding:"5rem 3.5rem",display:"flex",flexDirection:"column",justifyContent:"center"}}>
            <Reveal>
              <SectionLabel>Patient Stories</SectionLabel>
              <div style={{position:"relative",minHeight:230}}>
                {TESTIMONIALS.map((t,i)=>(
                  <div key={i} style={{position:i===activeTesti?"relative":"absolute",top:0,left:0,right:0,opacity:i===activeTesti?1:0,transform:i===activeTesti?"none":"translateY(10px)",transition:"all .6s ease",pointerEvents:i===activeTesti?"auto":"none"}}>
                    <div style={{fontFamily:"'DM Serif Display',serif",fontSize:"3.5rem",color:M,opacity:.2,lineHeight:.8,marginBottom:".8rem"}}>"</div>
                    <p style={{fontFamily:"'DM Serif Display',serif",fontSize:"clamp(1rem,1.7vw,1.2rem)",fontStyle:"italic",color:N,lineHeight:1.7,marginBottom:"1.4rem"}}>{t.text}</p>
                    <div style={{display:"flex",alignItems:"center",gap:".9rem"}}>
                      <div style={{width:38,height:38,borderRadius:"50%",background:`linear-gradient(135deg,${N},${M})`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                        <span style={{fontFamily:"'DM Serif Display',serif",color:"#fff",fontSize:".85rem"}}>{t.name[0]}</span>
                      </div>
                      <div>
                        <div style={{fontSize:".83rem",fontWeight:600,color:N}}>{t.name}</div>
                        <div style={{fontSize:".65rem",color:M,marginTop:1}}>{t.dept} · {t.area}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div style={{display:"flex",gap:".5rem",marginTop:"2rem"}}>
                {TESTIMONIALS.map((_,i)=>(
                  <button key={i} onClick={()=>setActiveTesti(i)}
                    style={{width:i===activeTesti?28:8,height:3,background:i===activeTesti?M:"#ccc",border:"none",cursor:"pointer",transition:"all .3s",borderRadius:2,padding:0}}/>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          DOCTORS
          ══════════════════════════════════════════ */}
      <section id="doctors" style={{background:"#f8f9ff",padding:"5rem 2.5rem"}}>
        <div style={{maxWidth:1200,margin:"0 auto"}}>
          <Reveal>
            <div style={{display:"flex",alignItems:"flex-end",justifyContent:"space-between",marginBottom:"2.5rem",flexWrap:"wrap",gap:"1rem"}}>
              <div>
                <SectionLabel>Our Physicians</SectionLabel>
                <h2 style={{fontFamily:"'DM Serif Display',serif",fontSize:"clamp(2rem,3vw,2.8rem)",color:N}}>Meet the Expert Team</h2>
              </div>
              <a href="#" style={{fontSize:".75rem",color:M,fontWeight:600,borderBottom:`1px solid ${M}`,paddingBottom:2}}>All 42 Specialists →</a>
            </div>
          </Reveal>
          <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:"1.5rem"}}>
            {DOCTORS.map((d,i)=>(
              <Reveal key={d.name} delay={i*55}>
                <DoctorCard d={d}/>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          APPOINTMENT
          ══════════════════════════════════════════ */}
      <section id="appointment" style={{background:"#fff",padding:"5rem 2.5rem",borderTop:"1px solid #eaeaf5"}}>
        <div style={{maxWidth:1200,margin:"0 auto",display:"grid",gridTemplateColumns:"1fr 1fr",gap:"5rem",alignItems:"center"}}>
          {/* Left info */}
          <Reveal>
            <SectionLabel>Schedule a Visit</SectionLabel>
            <h2 style={{fontFamily:"'DM Serif Display',serif",fontSize:"clamp(2rem,3vw,2.8rem)",color:N,marginBottom:"1.3rem"}}>Book an Appointment</h2>
            <p style={{fontSize:".9rem",color:"#5a5a7a",lineHeight:1.8,marginBottom:"2rem",fontWeight:300}}>
              Our team confirms your slot within 30 minutes. Walk-ins welcome — but a booking guarantees your time with the right specialist.
            </p>
            <div style={{display:"flex",flexDirection:"column",gap:".9rem"}}>
              {[
                {icon:"📞",label:"Appointments",val:"040-3567-8800"},
                {icon:"🚨",label:"Emergency (24/7)",val:"040-3567-8900",urgent:true},
                {icon:"📧",label:"Email",val:"miyapur@srikarahospitals.in"},
                {icon:"🕐",label:"OPD Hours",val:"Mon–Sat  ·  8:00 AM – 8:00 PM"},
              ].map(c=>(
                <div key={c.label} style={{display:"flex",gap:".9rem",alignItems:"center",padding:".9rem 1rem",background:"#f8f9ff",borderRadius:8,border:"1px solid #eaeaf5"}}>
                  <span style={{fontSize:"1.1rem",flexShrink:0}}>{c.icon}</span>
                  <div>
                    <div style={{fontSize:".58rem",color:"#aaa",letterSpacing:".1em",textTransform:"uppercase",marginBottom:".2rem"}}>{c.label}</div>
                    <div style={{fontSize:".85rem",fontWeight:600,color:(c as any).urgent?"#ef4444":N}}>{c.val}</div>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
          {/* Right form */}
          <Reveal delay={100}>
            <div style={{background:"#fff",border:"1px solid #eaeaf5",borderRadius:16,padding:"2.5rem",boxShadow:"0 8px 36px rgba(27,42,74,.07)"}}>
              <h3 style={{fontFamily:"'DM Serif Display',serif",fontSize:"1.45rem",color:N,marginBottom:".4rem"}}>Request an Appointment</h3>
              <p style={{fontSize:".75rem",color:"#aaa",marginBottom:"1.8rem"}}>We'll confirm your slot within 30 minutes</p>
              <form onSubmit={submit}>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:".9rem",marginBottom:".9rem"}}>
                  {[
                    {l:"Full Name *",k:"name",t:"text",ph:"Your full name"},
                    {l:"Mobile Number *",k:"phone",t:"tel",ph:"+91 98765 43210"},
                  ].map(f=>(
                    <div key={f.k}>
                      <label style={{fontSize:".6rem",fontWeight:700,color:"#4a4a6a",letterSpacing:".08em",textTransform:"uppercase",display:"block",marginBottom:".4rem"}}>{f.l}</label>
                      <input type={f.t} placeholder={f.ph} required value={form[f.k as keyof typeof form]}
                        onChange={e=>setForm(p=>({...p,[f.k]:e.target.value}))}
                        style={{width:"100%",border:"1.5px solid #dde",borderRadius:6,padding:".68rem .9rem",fontSize:".86rem",color:N,outline:"none",transition:"border-color .2s",background:"#fdfdff"}}
                        onFocus={e=>e.currentTarget.style.borderColor=M}
                        onBlur={e=>e.currentTarget.style.borderColor="#dde"}/>
                    </div>
                  ))}
                </div>
                <div style={{marginBottom:".9rem"}}>
                  <label style={{fontSize:".6rem",fontWeight:700,color:"#4a4a6a",letterSpacing:".08em",textTransform:"uppercase",display:"block",marginBottom:".4rem"}}>Department</label>
                  <select value={form.dept} onChange={e=>setForm(p=>({...p,dept:e.target.value}))}
                    style={{width:"100%",border:"1.5px solid #dde",borderRadius:6,padding:".68rem .9rem",fontSize:".86rem",color:form.dept?N:"#aaa",outline:"none",background:"#fdfdff",cursor:"pointer"}}
                    onFocus={e=>e.currentTarget.style.borderColor=M}
                    onBlur={e=>e.currentTarget.style.borderColor="#dde"}>
                    <option value="">Select a department</option>
                    {SPECIALITIES.map(s=><option key={s.name}>{s.name}</option>)}
                    <option>General Medicine</option>
                  </select>
                </div>
                <div style={{marginBottom:"1.4rem"}}>
                  <label style={{fontSize:".6rem",fontWeight:700,color:"#4a4a6a",letterSpacing:".08em",textTransform:"uppercase",display:"block",marginBottom:".4rem"}}>Preferred Date</label>
                  <input type="date" min={new Date().toISOString().split("T")[0]} value={form.date}
                    onChange={e=>setForm(p=>({...p,date:e.target.value}))}
                    style={{width:"100%",border:"1.5px solid #dde",borderRadius:6,padding:".68rem .9rem",fontSize:".86rem",color:N,outline:"none",background:"#fdfdff"}}
                    onFocus={e=>e.currentTarget.style.borderColor=M}
                    onBlur={e=>e.currentTarget.style.borderColor="#dde"}/>
                </div>
                <button type="submit"
                  style={{width:"100%",background:sent?"#22c55e":M,color:"#fff",border:"none",borderRadius:8,padding:".95rem",fontSize:".86rem",fontWeight:700,letterSpacing:".05em",cursor:"pointer",transition:"all .35s",boxShadow:sent?"0 4px 14px rgba(34,197,94,.3)":`0 4px 14px rgba(184,36,110,.28)`}}>
                  {sent?"✓ Appointment Request Received!":"Confirm Appointment →"}
                </button>
              </form>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          FACILITIES
          ══════════════════════════════════════════ */}
      <section id="facilities" style={{background:"#f8f9ff",padding:"5rem 2.5rem"}}>
        <div style={{maxWidth:1200,margin:"0 auto"}}>
          <Reveal>
            <div style={{textAlign:"center",marginBottom:"2.8rem"}}>
              <SectionLabel>Infrastructure</SectionLabel>
              <h2 style={{fontFamily:"'DM Serif Display',serif",fontSize:"clamp(2rem,3vw,2.8rem)",color:N}}>World-Class Facilities</h2>
            </div>
          </Reveal>
          <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:"1.3rem"}}>
            {FACILITIES.map((f,i)=>(
              <Reveal key={f.name} delay={i*50}>
                <FacCard f={f}/>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── ACCREDITATIONS ── */}
      <section style={{background:"#fff",borderTop:"1px solid #eaeaf5",borderBottom:"1px solid #eaeaf5",padding:"1.8rem 2.5rem"}}>
        <div style={{maxWidth:1200,margin:"0 auto",display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:"1.2rem"}}>
          <div style={{fontSize:".62rem",color:"#aaa",letterSpacing:".14em",textTransform:"uppercase",fontWeight:600}}>Accreditations & Certifications</div>
          <div style={{display:"flex",gap:".8rem",flexWrap:"wrap"}}>
            {ACCREDS.map(a=>(
              <span key={a} style={{fontSize:".68rem",fontWeight:600,color:N,background:`${N}0d`,border:`1px solid ${N}20`,padding:".38rem .9rem",borderRadius:100,letterSpacing:".03em"}}>{a}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          CONTACT + BRANCHES
          ══════════════════════════════════════════ */}
      <section id="contact" style={{background:"#f8f9ff",padding:"5rem 2.5rem"}}>
        <div style={{maxWidth:1200,margin:"0 auto",display:"grid",gridTemplateColumns:"1fr 1fr",gap:"4rem"}}>
          <Reveal>
            <SectionLabel>Find Us</SectionLabel>
            <h2 style={{fontFamily:"'DM Serif Display',serif",fontSize:"clamp(1.8rem,2.8vw,2.5rem)",color:N,marginBottom:"1.5rem"}}>Miyapur Branch</h2>
            {/* Map placeholder */}
            <div style={{height:190,background:`linear-gradient(135deg,${N}12,${M}08)`,borderRadius:12,marginBottom:"1.3rem",display:"flex",alignItems:"center",justifyContent:"center",border:"1px solid #e0e0ef"}}>
              <div style={{textAlign:"center"}}>
                <div style={{fontSize:"2rem",marginBottom:".4rem"}}>📍</div>
                <div style={{fontSize:".78rem",color:N,fontWeight:600}}>Plot 8-A, Miyapur X Roads</div>
                <div style={{fontSize:".68rem",color:"#888",marginTop:2}}>Miyapur, Hyderabad – 500049</div>
              </div>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:".9rem"}}>
              {[
                {l:"Emergency",v:"040-3567-8900",c:"#ef4444"},
                {l:"Appointments",v:"040-3567-8800",c:M},
                {l:"Email",v:"miyapur@srikara.in",c:N},
                {l:"OPD Hours",v:"Mon–Sat · 8AM–8PM",c:N},
              ].map(c=>(
                <div key={c.l} style={{background:"#fff",border:"1px solid #eaeaf5",borderRadius:8,padding:".85rem 1rem",borderTop:`3px solid ${c.c}`}}>
                  <div style={{fontSize:".58rem",color:"#bbb",letterSpacing:".1em",textTransform:"uppercase",marginBottom:".25rem"}}>{c.l}</div>
                  <div style={{fontSize:".8rem",fontWeight:700,color:c.c}}>{c.v}</div>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal delay={100}>
            <SectionLabel>Srikara Network</SectionLabel>
            <h2 style={{fontFamily:"'DM Serif Display',serif",fontSize:"clamp(1.8rem,2.8vw,2.5rem)",color:N,marginBottom:"1.5rem"}}>Our Other Branches</h2>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:".7rem"}}>
              {BRANCHES.map(b=>(
                <a key={b} href={`/hospitals/${b.toLowerCase().replace(/ /g,"-")}`}
                  style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:".85rem 1.1rem",borderRadius:8,background:b==="Miyapur"?`${M}10`:"#fff",border:`1px solid ${b==="Miyapur"?M+"45":"#eaeaf5"}`,fontWeight:b==="Miyapur"?700:400,color:b==="Miyapur"?M:"#4a4a6a",fontSize:".8rem",transition:"all .2s"}}
                  onMouseEnter={e=>{if(b!=="Miyapur"){e.currentTarget.style.borderColor=`${M}45`;e.currentTarget.style.color=N;}}}
                  onMouseLeave={e=>{if(b!=="Miyapur"){e.currentTarget.style.borderColor="#eaeaf5";e.currentTarget.style.color="#4a4a6a";}}}>
                  <span>{b==="Miyapur"?"★ ":""}{b}</span>
                  <span style={{fontSize:".68rem",color:M,opacity:.65}}>→</span>
                </a>
              ))}
            </div>
            <a href="/hospitals" style={{display:"inline-flex",alignItems:"center",gap:".4rem",marginTop:"1.3rem",fontSize:".7rem",color:"#aaa",borderBottom:"1px solid #ccc",paddingBottom:2}}>
              ← All Srikara Locations
            </a>
          </Reveal>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{background:N}}>
        <div style={{height:3,background:`linear-gradient(90deg,${M},${ML},transparent)`}}/>
        <div style={{maxWidth:1200,margin:"0 auto",padding:"2.2rem 2.5rem",display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:"1.5rem"}}>
          <div style={{display:"flex",alignItems:"center",gap:".9rem"}}>
            <div style={{width:32,height:32,borderRadius:"50%",background:`linear-gradient(135deg,${NL},${M})`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
              <span style={{fontFamily:"'DM Serif Display',serif",color:"#fff",fontSize:".88rem"}}>S</span>
            </div>
            <div>
              <div style={{fontFamily:"'DM Serif Display',serif",color:"#fff",fontSize:".9rem"}}>Srikara Hospital, Miyapur</div>
              <div style={{fontSize:".6rem",color:"rgba(255,255,255,.4)",marginTop:2}}>© {new Date().getFullYear()} Srikara Hospital Group · All rights reserved</div>
            </div>
          </div>
          <div style={{display:"flex",gap:"2rem"}}>
            {["Privacy Policy","Terms of Use","Sitemap"].map(l=>(
              <a key={l} href="#" style={{fontSize:".65rem",color:"rgba(255,255,255,.32)",letterSpacing:".06em"}}
                onMouseEnter={e=>e.currentTarget.style.color=M}
                onMouseLeave={e=>e.currentTarget.style.color="rgba(255,255,255,.32)"}>
                {l}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </>
  );
}