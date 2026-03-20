"use client";
import { useState, useEffect, useRef } from "react";


// ─── DATA ─────────────────────────────────────────────────────────────────────
const SPECIALITIES = [
  { id:"01", name:"Cardiology",       sub:"Heart & Vascular",  desc:"Interventional cardiology, EP studies, TAVR, structural heart disease and complete cardiac imaging with 24/7 monitoring.",     img:"https://images.unsplash.com/photo-1628348068343-c6a848d2b6dd?w=800&q=85" },
  { id:"02", name:"Neurosciences",    sub:"Brain & Spine",     desc:"Stroke unit, epilepsy monitoring, neurosurgery, movement disorders and comprehensive neuro-rehabilitation under one roof.",    img:"https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=800&q=85" },
  { id:"03", name:"Orthopaedics",     sub:"Bones & Joints",    desc:"Robotic-assisted joint replacement, arthroscopy, sports medicine, complex spinal surgery and dedicated post-op rehabilitation.", img:"https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=800&q=85" },
  { id:"04", name:"Oncology",         sub:"Cancer Care",       desc:"Multidisciplinary tumour board, precision oncology, immunotherapy, day-care chemotherapy and compassionate palliative services.", img:"https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=800&q=85" },
  { id:"05", name:"Paediatrics",      sub:"Child Health",      desc:"Level III NICU, paediatric surgery, child development centre, neonatal intensive care and adolescent health clinic.",           img:"https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=85" },
  { id:"06", name:"Gynaecology",      sub:"Women's Health",    desc:"High-risk pregnancy, IVF fertility clinic, robotic gynaecological surgery and comprehensive breast health centre.",              img:"https://images.unsplash.com/photo-1551076805-e1869033e561?w=800&q=85" },
  { id:"07", name:"Gastroenterology", sub:"Digestive Health",  desc:"Advanced therapeutic endoscopy, hepatology, IBD clinic, bariatric surgery and complete gastrointestinal oncology.",             img:"https://images.unsplash.com/photo-1638202993928-7267aad84c31?w=800&q=85" },
  { id:"08", name:"Urology",          sub:"Urinary Tract",     desc:"Robotic urological surgery, renal transplant programme, stone disease management and urodynamics diagnostic laboratory.",        img:"https://images.unsplash.com/photo-1516549655169-df83a0774514?w=800&q=85" },
];

const DOCTORS = [
  { name:"Dr. Anil Reddy Konduru",  role:"Chief Cardiologist",            exp:"21", qual:"DM Cardiology · Cleveland Clinic Fellow", avail:"Mon–Sat · 10 AM–2 PM",  img:"https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=500&q=80" },
  { name:"Dr. Shalini Meredith",    role:"Senior Neurologist",            exp:"17", qual:"DM Neurology · NIMHANS Bengaluru",       avail:"Mon–Fri · 9 AM–1 PM",   img:"https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=500&q=80" },
  { name:"Dr. Kiran Babu Naidu",    role:"Orthopaedic Surgeon",           exp:"19", qual:"MS Ortho · Fellowship USA",              avail:"Tue, Thu, Sat · 3–7 PM", img:"https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=500&q=80" },
  { name:"Dr. Padma Raghavan",      role:"Gynaecologist & IVF Specialist",exp:"15", qual:"MS OBG · FOGSI Fellowship",              avail:"Mon–Fri · 11 AM–3 PM",  img:"https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=500&q=80" },
  { name:"Dr. Venkat Srinivasan",   role:"Surgical Oncologist",           exp:"14", qual:"MCh Oncosurgery · Tata Memorial",        avail:"Mon, Wed, Fri · 2–6 PM", img:"https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=500&q=80" },
  { name:"Dr. Rohit Ganapathi",     role:"Neonatologist",                 exp:"11", qual:"DNB Paeds, Fellowship NNF",              avail:"Mon–Sat · 8 AM–12 PM",  img:"https://images.unsplash.com/photo-1591604021695-0c69b7c05981?w=500&q=80" },
];

const TESTIMONIALS = [
  { text:"After my stroke, I thought life would never be normal again. The neuro team at Srikara Miyapur brought me back. Six months later, I'm walking and back at work. I owe them everything.", name:"Suresh Varma", area:"Hyderabad", dept:"Neurology", img:"https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=700&q=80" },
  { text:"The robotic surgery for my knee replacement was phenomenal. I was walking the very next day. Dr. Kiran's team sets a standard I've never encountered anywhere else in the city.", name:"Kamala Devi", area:"Miyapur", dept:"Orthopaedics", img:"https://images.unsplash.com/photo-1584982751601-97dcc096659c?w=700&q=80" },
  { text:"Our IVF journey of 4 years ended here with the most beautiful result — our daughter. Dr. Padma and the entire fertility team walked every step of the way with us.", name:"Rajesh & Aruna", area:"Hyderabad", dept:"IVF & Fertility", img:"https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=700&q=80" },
];

const FACILITIES = [
  { num:"01", tag:"ICU",   name:"36-Bed Critical Care",   desc:"Mixed ICU pods — cardiac, neuro, medical and surgical. CRRT and ECMO capabilities 24/7.",                   img:"https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=700&q=80" },
  { num:"02", tag:"OT",    name:"8 Operation Theatres",   desc:"Laminar-flow OTs including a dedicated robotic surgery suite and neuro-navigation enabled theatre.",         img:"https://images.unsplash.com/photo-1584982751601-97dcc096659c?w=700&q=80" },
  { num:"03", tag:"IMG",   name:"3T MRI · CT · PET-CT",   desc:"Complete imaging — 3-Tesla MRI, 256-slice dual-energy CT, PET-CT and nuclear medicine suite.",               img:"https://images.unsplash.com/photo-1516549655169-df83a0774514?w=700&q=80" },
  { num:"04", tag:"LAB",   name:"NABL Laboratory",         desc:"1,400+ test menu. Molecular diagnostics, flow cytometry, liquid biopsy and round-the-clock blood bank.",     img:"https://images.unsplash.com/photo-1578496780896-7282d7a5e27e?w=700&q=80" },
  { num:"05", tag:"REHAB", name:"Rehabilitation Centre",   desc:"Physio, occupational therapy, speech-language pathology, aqua therapy and cardiac rehabilitation.",           img:"https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=700&q=80" },
  { num:"06", tag:"PHM",   name:"24/7 Pharmacy",           desc:"Full in-patient and retail pharmacy, cold-chain biologics and automated dispensing systems.",                 img:"https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=700&q=80" },
];

const BRANCHES = ["RTC X Roads","Ameerpet","Kukatpally","LB Nagar","Dilsukhnagar","Secunderabad","Begumpet","Uppal"];
const TICKERS  = ["Robotic Surgery","Level III NICU","PET-CT Imaging","Cardiac Cath Lab","ECMO Centre","24/7 Blood Bank","NABH Certified","Neuro-Navigation OT","Bone Marrow Transplant","Day Care Chemo","AI Diagnostics","Dialysis Unit"];

// ─── COLOUR TOKENS ─────────────────────────────────────────────────────────────
const C = {
  bg:"#0E1117", surface:"#141920", raised:"#1A2230",
  border:"rgba(255,255,255,0.08)", borderMid:"rgba(255,255,255,0.14)",
  white:"#F2F5F0", muted:"rgba(242,245,240,0.5)", faint:"rgba(242,245,240,0.18)",
  green:"#4ADE80", greenDim:"#166534", greenGlow:"rgba(74,222,128,0.12)",
  amber:"#F59E0B", red:"#EF4444",
};

// ─── GLOBAL STYLES ─────────────────────────────────────────────────────────────
const G = `
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700&family=Outfit:wght@300;400;500;600&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
html{scroll-behavior:smooth;}
body{font-family:'Outfit',sans-serif;background:#0E1117;color:#F2F5F0;overflow-x:hidden;}
::-webkit-scrollbar{width:3px;}
::-webkit-scrollbar-track{background:#0E1117;}
::-webkit-scrollbar-thumb{background:#4ADE80;border-radius:2px;}
@keyframes fadeUp{from{opacity:0;transform:translateY(32px);}to{opacity:1;transform:translateY(0);}}
@keyframes fadeIn{from{opacity:0;}to{opacity:1;}}
@keyframes pulse{0%,100%{opacity:1;}50%{opacity:.3;}}
@keyframes marquee{from{transform:translateX(0);}to{transform:translateX(-50%);}}
@keyframes glow{0%,100%{box-shadow:0 0 0 0 rgba(74,222,128,.4);}60%{box-shadow:0 0 0 12px rgba(74,222,128,0);}}
.a1{animation:fadeUp .8s ease .05s both;}
.a2{animation:fadeUp .8s ease .22s both;}
.a3{animation:fadeUp .8s ease .38s both;}
.a4{animation:fadeUp .8s ease .54s both;}
.a5{animation:fadeUp .8s ease .7s both;}
.glow-btn{animation:glow 2.5s ease infinite;}
.ticker-m{animation:marquee 35s linear infinite;}
`;

// ─── HOOKS & HELPERS ───────────────────────────────────────────────────────────
function useReveal(t=0.06){
  const ref=useRef(null);const[on,setOn]=useState(false);
  useEffect(()=>{
    const el=ref.current;if(!el)return;
    const io=new IntersectionObserver(([e])=>{if(e.isIntersecting){setOn(true);io.unobserve(el);}},{threshold:t});
    io.observe(el);return()=>io.disconnect();
  },[]);
  return{ref,on};
}

function Reveal({
  children,
  delay = 0,
  style = {},
}: {
  children: React.ReactNode;
  delay?: number;
  style?: React.CSSProperties;
}) {
  const { ref, on } = useReveal();

  return (
    <div
      ref={ref}
      style={{
        opacity: on ? 1 : 0,
        transform: on ? "none" : "translateY(28px)",
        transition: `opacity .8s ease ${delay}ms, transform .8s ease ${delay}ms`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

function ZoomPhoto({src,alt,style={},overlay=true} : { src: string, alt: string, style?: React.CSSProperties, overlay?: boolean }) {
  const[h,setH]=useState(false);
  return(
    <div onMouseEnter={()=>setH(true)} onMouseLeave={()=>setH(false)}
      style={{overflow:"hidden",position:"relative",background:"#1A2230",...style}}>
      <img src={src} alt={alt} loading="lazy"
        style={{width:"100%",height:"100%",objectFit:"cover",display:"block",transition:"transform .6s ease",transform:h?"scale(1.05)":"scale(1)"}}/>
      {overlay&&<div style={{position:"absolute",inset:0,background:"linear-gradient(transparent 40%,rgba(14,17,23,.7))",pointerEvents:"none"}}/>}
    </div>
  );
}

function GreenPill({children} : { children: React.ReactNode }) {
  return(
    <span style={{display:"inline-flex",alignItems:"center",gap:".5rem",background:C.greenGlow,border:`1px solid ${C.green}35`,color:C.green,fontSize:".6rem",letterSpacing:".2em",textTransform:"uppercase",fontWeight:600,padding:".3rem 1rem",borderRadius:100}}>
      {children}
    </span>
  );
}

// ─── PAGE ──────────────────────────────────────────────────────────────────────
export default function MiyapurPage(){
  const[activeSpec,setActiveSpec]=useState(0);
  const[activeTesti,setActiveTesti]=useState(0);
  const [hovDoc, setHovDoc] = useState<number | null>(null);
  const[form,setForm]=useState({name:"",phone:"",dept:"",date:"",msg:""});
  const[sent,setSent]=useState(false);

  useEffect(()=>{
    const t=setInterval(()=>setActiveTesti(p=>(p+1)%TESTIMONIALS.length),5500);
    return()=>clearInterval(t);
  },[]);

  const submit=(e: { preventDefault: () => void; })=>{e.preventDefault();setSent(true);setTimeout(()=>setSent(false),3500);};

  return(
    <>
      <style>{G}</style>

      {/* ── EMERGENCY STRIP ── */}
      <div style={{background:`linear-gradient(90deg,${C.green},#22c55e)`,padding:".38rem 2.5rem",display:"flex",alignItems:"center",justifyContent:"space-between",fontSize:".7rem",fontWeight:600,letterSpacing:".1em",textTransform:"uppercase",color:C.bg}}>
        <div style={{display:"flex",alignItems:"center",gap:".8rem"}}>
          <span style={{width:7,height:7,borderRadius:"50%",background:C.bg,animation:"pulse 1s ease infinite",display:"inline-block",flexShrink:0}}/>
          24/7 Emergency &nbsp;·&nbsp;
          <a href="tel:04035678900" style={{color:C.bg,fontWeight:700}}>040-3567-8900</a>
        </div>
        <span style={{opacity:.7}}>Plot 8-A, Miyapur X Roads · Hyderabad 500049</span>
      </div>

      {/* ── NAV ── */}
      <nav style={{position:"sticky",top:0,zIndex:900,background:"rgba(14,17,23,.92)",backdropFilter:"blur(20px)",borderBottom:`1px solid ${C.border}`,display:"flex",alignItems:"center",justifyContent:"space-between",padding:"0 2.5rem",height:64}}>
        <a href="/" style={{display:"flex",alignItems:"center",gap:12,textDecoration:"none"}}>
          <div style={{width:36,height:36,borderRadius:"50%",border:`2px solid ${C.green}`,display:"flex",alignItems:"center",justifyContent:"center",position:"relative",flexShrink:0}}>
            <div style={{position:"absolute",width:"1px",height:18,background:C.green}}/>
            <div style={{position:"absolute",width:18,height:"1px",background:C.green}}/>
          </div>
          <div>
            <div style={{fontFamily:"'Playfair Display',serif",fontSize:".95rem",fontWeight:700,color:C.white,letterSpacing:".02em",lineHeight:1.2}}>Srikara Hospital</div>
            <div style={{fontSize:".55rem",color:C.green,letterSpacing:".22em",textTransform:"uppercase",fontWeight:500}}>Miyapur · Hyderabad</div>
          </div>
        </a>
        <div style={{display:"flex",alignItems:"center",gap:"2rem"}}>
          {[["Specialities","#specialities"],["Team","#doctors"],["Facilities","#facilities"],["Appointment","#appointment"]].map(([l,h])=>(
            <a key={l} href={h} style={{fontSize:".72rem",color:C.muted,letterSpacing:".06em",fontWeight:400,textDecoration:"none"}}
              onMouseEnter={e=>e.currentTarget.style.color=C.white}
              onMouseLeave={e=>e.currentTarget.style.color=C.muted}>{l}</a>
          ))}
          <a href="#appointment" className="glow-btn"
            style={{background:C.green,color:C.bg,padding:".48rem 1.4rem",borderRadius:100,fontSize:".72rem",fontWeight:600,letterSpacing:".08em",textDecoration:"none"}}
            onMouseEnter={e=>e.currentTarget.style.background="#22c55e"}
            onMouseLeave={e=>e.currentTarget.style.background=C.green}>
            Book Now
          </a>
        </div>
      </nav>

      {/* ══════════════════════════════════════════════
          HERO — Full-bleed dark, text over photo
          ══════════════════════════════════════════════ */}
      <section id="hero" style={{position:"relative",minHeight:"92vh",overflow:"hidden",display:"flex",flexDirection:"column",justifyContent:"flex-end"}}>
        {/* BG photo */}
        <div style={{position:"absolute",inset:0}}>
          <img src="https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=1600&q=85" alt="Srikara Miyapur" loading="eager"
            style={{width:"100%",height:"100%",objectFit:"cover",display:"block"}}/>
          <div style={{position:"absolute",inset:0,background:"linear-gradient(105deg,rgba(14,17,23,.94) 0%,rgba(14,17,23,.6) 55%,rgba(14,17,23,.25) 100%)"}}/>
          <div style={{position:"absolute",bottom:0,left:0,right:0,height:"40%",background:"linear-gradient(transparent,rgba(14,17,23,1))"}}/>
        </div>
        {/* Grain */}
        <div style={{position:"absolute",inset:0,backgroundImage:`url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.75' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.04'/%3E%3C/svg%3E")`,opacity:.4,pointerEvents:"none"}}/>

        {/* Floating stats top-right */}
        <div style={{position:"absolute",top:"12%",right:"4%",display:"flex",flexDirection:"column",gap:10,zIndex:2}} className="a4">
          {[["42+","Specialists On Call"],["350+","Hospital Beds"],["60k+","Patients Healed"]].map(([v,l])=>(
            <div key={l} style={{background:"rgba(14,17,23,.8)",backdropFilter:"blur(16px)",border:`1px solid ${C.border}`,borderLeft:`3px solid ${C.green}`,padding:".9rem 1.4rem",minWidth:185}}>
              <div style={{fontFamily:"'Playfair Display',serif",fontSize:"2rem",fontWeight:700,color:C.white,lineHeight:1}}>{v}</div>
              <div style={{fontSize:".58rem",color:C.muted,letterSpacing:".14em",textTransform:"uppercase",marginTop:".2rem"}}>{l}</div>
            </div>
          ))}
        </div>

        {/* Hero text */}
        <div style={{position:"relative",zIndex:2,padding:"0 3.5rem 5rem",maxWidth:820}}>
          <div className="a1" style={{marginBottom:"1.6rem"}}>
            <GreenPill><span style={{width:6,height:6,borderRadius:"50%",background:C.green,display:"inline-block"}}/>Now Operational · Est. 2012 · NABH</GreenPill>
          </div>

          <h1 className="a2" style={{fontFamily:"'Playfair Display',serif",fontSize:"clamp(3.5rem,7vw,7.5rem)",fontWeight:900,lineHeight:.92,letterSpacing:"-.02em",color:C.white,marginBottom:"2rem"}}>
            Precision<br/>
            <span style={{fontStyle:"italic",fontWeight:400,color:C.green}}>Medicine</span><br/>
            <span style={{fontWeight:400}}>Miyapur</span>
          </h1>

          <div className="a2" style={{display:"flex",alignItems:"center",gap:"1.2rem",marginBottom:"2rem"}}>
            <div style={{width:56,height:2,background:C.green,flexShrink:0}}/>
            <span style={{fontSize:".68rem",letterSpacing:".2em",textTransform:"uppercase",color:C.muted,fontWeight:400}}>West Hyderabad's Advanced Multi-Specialty Hospital</span>
          </div>

          <p className="a3" style={{fontSize:"1.05rem",color:"rgba(242,245,240,.7)",lineHeight:1.8,maxWidth:560,marginBottom:"3rem",fontWeight:300}}>
            Combining robotic surgery, AI-powered diagnostics and round-the-clock intensive care — delivering clinical excellence with genuine human compassion at every step.
          </p>

          <div className="a4" style={{display:"flex",gap:"1rem",flexWrap:"wrap",marginBottom:"2.5rem"}}>
            <a href="#appointment"
              style={{display:"inline-flex",alignItems:"center",gap:".6rem",background:C.green,color:C.bg,padding:"1rem 2.2rem",borderRadius:4,fontSize:".82rem",fontWeight:600,letterSpacing:".1em",textDecoration:"none",transition:"all .2s"}}
              onMouseEnter={e=>{e.currentTarget.style.background="#22c55e";e.currentTarget.style.transform="translateY(-2px)";e.currentTarget.style.boxShadow=`0 8px 28px ${C.greenGlow}`}}
              onMouseLeave={e=>{e.currentTarget.style.background=C.green;e.currentTarget.style.transform="none";e.currentTarget.style.boxShadow="none"}}>
              Book Appointment →
            </a>
            <a href="tel:04035678900"
              style={{display:"inline-flex",alignItems:"center",gap:".6rem",border:"1.5px solid rgba(255,255,255,.2)",color:C.white,padding:"1rem 2.2rem",borderRadius:4,fontSize:".82rem",fontWeight:400,letterSpacing:".1em",textDecoration:"none",transition:"all .2s"}}
              onMouseEnter={e=>{e.currentTarget.style.borderColor=C.red;e.currentTarget.style.color=C.red}}
              onMouseLeave={e=>{e.currentTarget.style.borderColor="rgba(255,255,255,.2)";e.currentTarget.style.color=C.white}}>
              🚨 Emergency Line
            </a>
          </div>

          <div className="a5" style={{display:"flex",gap:".6rem",flexWrap:"wrap"}}>
            {["NABH Accredited","ISO 9001","NABL Lab","100+ Insurers","ECMO Centre"].map(c=>(
              <span key={c} style={{fontSize:".58rem",letterSpacing:".12em",textTransform:"uppercase",fontWeight:500,background:"rgba(255,255,255,.06)",border:"1px solid rgba(255,255,255,.1)",color:C.muted,padding:".28rem .9rem",borderRadius:2}}>{c}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ── GREEN TICKER ── */}
      <div style={{background:C.green,padding:".6rem 0",overflow:"hidden",whiteSpace:"nowrap"}}>
        <div className="ticker-m" style={{display:"inline-flex",gap:"3rem"}}>
          {[...TICKERS,...TICKERS,...TICKERS].map((t,i)=>(
            <span key={i} style={{display:"inline-flex",alignItems:"center",gap:".8rem",fontSize:".62rem",letterSpacing:".18em",textTransform:"uppercase",color:C.bg,fontWeight:600}}>
              <span style={{width:4,height:4,background:C.bg,borderRadius:"50%",display:"inline-block"}}/>
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* ══════════════════════════════════════════════
          PHOTO MOSAIC
          ══════════════════════════════════════════════ */}
      <section style={{background:C.bg,padding:"5rem 2.5rem"}}>
        <div style={{maxWidth:1280,margin:"0 auto"}}>
          <Reveal>
            <div style={{display:"flex",alignItems:"center",gap:"2rem",marginBottom:"2.5rem"}}>
              <GreenPill>Our Campus</GreenPill>
              <div style={{flex:1,height:1,background:C.border}}/>
              <span style={{fontSize:".6rem",letterSpacing:".18em",textTransform:"uppercase",color:C.faint}}>Miyapur · Hyderabad</span>
            </div>
          </Reveal>
          <Reveal>
            <div style={{display:"grid",gridTemplateColumns:"2fr 1fr 1fr",gridTemplateRows:"240px 200px",gap:4}}>
              <div style={{gridRow:"1/3",position:"relative"}}>
                <ZoomPhoto src="https://images.unsplash.com/photo-1584982751601-97dcc096659c?w=900&q=85" alt="Operation Theatre" style={{height:"100%"}}/>
                <div style={{position:"absolute",top:16,left:16}}>
                  <span style={{fontFamily:"'Playfair Display',serif",fontSize:"5rem",fontWeight:900,color:"rgba(74,222,128,.13)",lineHeight:1,userSelect:"none"}}>01</span>
                </div>
                <div style={{position:"absolute",bottom:20,left:20}}>
                  <span style={{fontSize:".6rem",letterSpacing:".16em",textTransform:"uppercase",color:"rgba(255,255,255,.5)",border:"1px solid rgba(255,255,255,.18)",padding:".25rem .8rem",fontWeight:500}}>Robotic OT Suite</span>
                </div>
              </div>
              {[
                {src:"https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=600&q=85",label:"ICU"},
                {src:"https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=600&q=85",label:"Neuro Unit"},
                {src:"https://images.unsplash.com/photo-1578496780896-7282d7a5e27e?w=600&q=85",label:"NABL Lab"},
                {src:"https://images.unsplash.com/photo-1516549655169-df83a0774514?w=600&q=85",label:"Imaging Suite"},
              ].map(({src,label})=>(
                <div key={label} style={{position:"relative"}}>
                  <ZoomPhoto src={src} alt={label} style={{height:"100%"}}/>
                  <div style={{position:"absolute",bottom:12,left:12}}>
                    <span style={{fontSize:".6rem",letterSpacing:".14em",textTransform:"uppercase",color:"rgba(255,255,255,.7)",background:"rgba(14,17,23,.5)",padding:".2rem .6rem"}}>{label}</span>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          SPECIALITIES — Tabbed with giant photo panel
          ══════════════════════════════════════════════ */}
      <section id="specialities" style={{background:C.surface,padding:"6rem 0",position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",inset:0,zIndex:0}}>
          <img key={activeSpec} src={SPECIALITIES[activeSpec].img} alt="" style={{width:"100%",height:"100%",objectFit:"cover",opacity:.06,transition:"opacity .5s ease"}}/>
        </div>
        <div style={{maxWidth:1280,margin:"0 auto",padding:"0 2.5rem",position:"relative",zIndex:1}}>
          <Reveal>
            <div style={{display:"flex",alignItems:"flex-end",gap:"2rem",marginBottom:"4rem"}}>
              <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:"clamp(2.5rem,5vw,5rem)",fontWeight:900,color:C.white,letterSpacing:"-.02em",lineHeight:.9}}>
                Our<br/><em style={{fontStyle:"italic",fontWeight:400,color:C.green}}>Specialities</em>
              </h2>
              <div style={{flex:1,height:1,background:C.border,marginLeft:"2rem",alignSelf:"flex-end",marginBottom:8}}/>
              <span style={{fontSize:".62rem",letterSpacing:".2em",textTransform:"uppercase",color:C.faint,alignSelf:"flex-end",marginBottom:8}}>8 Departments</span>
            </div>
          </Reveal>
          <Reveal>
            <div style={{display:"flex",border:`1px solid ${C.border}`}}>
              {/* Tabs */}
              <div style={{width:240,flexShrink:0,borderRight:`1px solid ${C.border}`,display:"flex",flexDirection:"column"}}>
                {SPECIALITIES.map((s,i)=>(
                  <button key={s.id} onClick={()=>setActiveSpec(i)}
                    style={{background:activeSpec===i?C.greenGlow:"transparent",border:"none",borderLeft:`3px solid ${activeSpec===i?C.green:"transparent"}`,borderBottom:`1px solid ${C.border}`,padding:"1.1rem 1.4rem",textAlign:"left",cursor:"pointer",display:"flex",alignItems:"center",gap:"1rem",transition:"all .25s"}}>
                    <span style={{fontFamily:"'Playfair Display',serif",fontSize:"1rem",fontWeight:700,color:activeSpec===i?C.green:"rgba(255,255,255,.18)",width:28,flexShrink:0}}>{s.id}</span>
                    <span style={{fontSize:".82rem",fontWeight:activeSpec===i?600:400,color:activeSpec===i?C.white:C.muted}}>{s.name}</span>
                  </button>
                ))}
              </div>
              {/* Detail panel */}
              <div style={{flex:1,display:"flex",minHeight:460,overflow:"hidden"}}>
                <div style={{flex:1,padding:"3.5rem",display:"flex",flexDirection:"column",justifyContent:"center"}}>
                  <div style={{fontSize:".6rem",letterSpacing:".22em",textTransform:"uppercase",color:C.green,fontWeight:600,marginBottom:"1.2rem"}}>{SPECIALITIES[activeSpec].sub}</div>
                  <h3 style={{fontFamily:"'Playfair Display',serif",fontSize:"clamp(2rem,3.5vw,3.5rem)",fontWeight:700,color:C.white,lineHeight:1,marginBottom:"1.5rem",letterSpacing:"-.01em"}}>{SPECIALITIES[activeSpec].name}</h3>
                  <div style={{width:48,height:2,background:C.green,marginBottom:"1.5rem",borderRadius:1}}/>
                  <p style={{fontSize:".95rem",color:C.muted,lineHeight:1.85,maxWidth:440,marginBottom:"2.5rem",fontWeight:300}}>{SPECIALITIES[activeSpec].desc}</p>
                  <a href="#appointment"
                    style={{display:"inline-flex",alignItems:"center",gap:".5rem",background:C.green,color:C.bg,padding:".75rem 1.8rem",borderRadius:4,fontSize:".75rem",fontWeight:600,letterSpacing:".1em",textDecoration:"none",width:"fit-content",transition:"all .2s"}}
                    onMouseEnter={e=>{e.currentTarget.style.background="#22c55e";e.currentTarget.style.transform="translateY(-1px)"}}
                    onMouseLeave={e=>{e.currentTarget.style.background=C.green;e.currentTarget.style.transform="none"}}>
                    Book Consultation →
                  </a>
                </div>
                <div style={{width:"38%",flexShrink:0,position:"relative",overflow:"hidden"}}>
                  <ZoomPhoto key={activeSpec} src={SPECIALITIES[activeSpec].img} alt={SPECIALITIES[activeSpec].name} style={{height:"100%"}} overlay={false}/>
                  <div style={{position:"absolute",inset:0,background:"linear-gradient(90deg,rgba(20,25,32,.85) 0%,transparent 40%)",pointerEvents:"none"}}/>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          DOCTORS — Horizontal scrolling strip
          ══════════════════════════════════════════════ */}
      <section id="doctors" style={{background:C.bg,padding:"6rem 0",overflow:"hidden"}}>
        <div style={{maxWidth:1280,margin:"0 auto",padding:"0 2.5rem",marginBottom:"3rem"}}>
          <Reveal>
            <div style={{display:"flex",alignItems:"flex-end",justifyContent:"space-between"}}>
              <div>
                <GreenPill>Our Physicians</GreenPill>
                <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:"clamp(2.5rem,5vw,5rem)",fontWeight:900,color:C.white,lineHeight:.92,letterSpacing:"-.02em",marginTop:"1.2rem"}}>
                  Meet the<br/><em style={{fontStyle:"italic",fontWeight:400,color:C.green}}>Expert Team</em>
                </h2>
              </div>
              <a href="#" style={{fontSize:".7rem",letterSpacing:".14em",textTransform:"uppercase",color:C.green,borderBottom:`1px solid ${C.green}45`,paddingBottom:2,textDecoration:"none"}}>All 42 Specialists →</a>
            </div>
          </Reveal>
        </div>
        {/* Horizontal scroll */}
        <div style={{display:"flex",gap:3,paddingLeft:"2.5rem",paddingRight:"2.5rem",overflowX:"auto",scrollbarWidth:"none",msOverflowStyle:"none"}}>
          {DOCTORS.map((d,i)=>(
            <Reveal key={d.name} delay={i*55} style={{flexShrink:0,width:262}}>
              <div
                onMouseEnter={()=>setHovDoc(i)} onMouseLeave={()=>setHovDoc(null)}
                style={{background:hovDoc===i?C.raised:C.surface,border:`1px solid ${hovDoc===i?C.green+"50":C.border}`,overflow:"hidden",transition:"all .35s",cursor:"pointer",transform:hovDoc===i?"translateY(-6px)":"none",boxShadow:hovDoc===i?`0 16px 40px rgba(74,222,128,.12)`:"none"}}>
                <div style={{height:280,position:"relative",overflow:"hidden",background:"#1A2230"}}>
                  <img src={d.img} alt={d.name} loading="lazy"
                    style={{width:"100%",height:"100%",objectFit:"cover",display:"block",transition:"transform .5s ease",transform:hovDoc===i?"scale(1.06)":"scale(1)"}}/>
                  <div style={{position:"absolute",inset:0,background:"linear-gradient(transparent 50%,rgba(14,17,23,.88))",pointerEvents:"none"}}/>
                  <div style={{position:"absolute",top:12,right:12,background:C.green,color:C.bg,fontSize:".58rem",letterSpacing:".14em",textTransform:"uppercase",padding:".28rem .65rem",fontWeight:700,borderRadius:2}}>{d.exp} yrs</div>
                  <div style={{position:"absolute",bottom:0,left:0,right:0,padding:"1rem 1.2rem"}}>
                    <div style={{fontFamily:"'Playfair Display',serif",fontSize:"1.05rem",fontWeight:700,color:C.white,lineHeight:1.2,marginBottom:".2rem"}}>{d.name}</div>
                    <div style={{fontSize:".65rem",fontWeight:600,letterSpacing:".06em",color:C.green}}>{d.role}</div>
                  </div>
                </div>
                <div style={{padding:"1.2rem 1.4rem"}}>
                  <div style={{fontSize:".7rem",color:C.muted,lineHeight:1.5,marginBottom:"1rem",fontWeight:300}}>{d.qual}</div>
                  <div style={{fontSize:".62rem",color:C.faint,paddingTop:".8rem",borderTop:`1px solid ${C.border}`,marginBottom:hovDoc===i?"1rem":0}}>{d.avail}</div>
                  {hovDoc===i&&(
                    <a href="#appointment" style={{display:"block",background:C.green,color:C.bg,padding:".6rem",textAlign:"center",fontSize:".65rem",fontWeight:700,letterSpacing:".14em",textTransform:"uppercase",borderRadius:3,textDecoration:"none",animation:"fadeIn .2s ease"}}>
                      Book This Doctor →
                    </a>
                  )}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          TESTIMONIALS — Split dark layout with photo
          ══════════════════════════════════════════════ */}
      <section style={{background:C.surface,position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",left:"30%",top:"50%",transform:"translate(-50%,-50%)",width:"50vw",height:"50vw",borderRadius:"50%",background:`radial-gradient(circle,${C.greenGlow} 0%,transparent 65%)`,pointerEvents:"none"}}/>
        <div style={{maxWidth:1280,margin:"0 auto",display:"flex",minHeight:520,position:"relative",zIndex:1}}>
          {/* Left photo */}
          <div style={{flex:"0 0 42%",position:"relative",overflow:"hidden"}}>
            <ZoomPhoto key={activeTesti} src={TESTIMONIALS[activeTesti].img} alt="Patient" style={{height:"100%"}} overlay={false}/>
            <div style={{position:"absolute",inset:0,background:"linear-gradient(90deg,transparent 60%,rgba(20,25,32,1))",pointerEvents:"none"}}/>
            <div style={{position:"absolute",top:32,left:32}}>
              <GreenPill>{TESTIMONIALS[activeTesti].dept}</GreenPill>
            </div>
          </div>
          {/* Right text */}
          <div style={{flex:1,padding:"5rem 4rem",display:"flex",flexDirection:"column",justifyContent:"center"}}>
            <div style={{fontFamily:"'Playfair Display',serif",fontSize:"7rem",color:C.green,opacity:.12,lineHeight:.8,marginBottom:"1rem",fontWeight:900}}>"</div>
            <p style={{fontFamily:"'Playfair Display',serif",fontSize:"clamp(1.1rem,2vw,1.6rem)",fontStyle:"italic",fontWeight:400,color:C.white,lineHeight:1.7,marginBottom:"3rem"}}>{TESTIMONIALS[activeTesti].text}</p>
            <div style={{display:"flex",alignItems:"center",gap:"1.2rem",marginBottom:"2.5rem"}}>
              <div style={{width:36,height:2,background:C.green}}/>
              <div>
                <div style={{fontSize:".92rem",fontWeight:600,color:C.white}}>{TESTIMONIALS[activeTesti].name}</div>
                <div style={{fontSize:".6rem",letterSpacing:".14em",textTransform:"uppercase",color:C.green,marginTop:3}}>{TESTIMONIALS[activeTesti].area}</div>
              </div>
            </div>
            <div style={{display:"flex",gap:"1rem"}}>
              {TESTIMONIALS.map((_,i)=>(
                <button key={i} onClick={()=>setActiveTesti(i)}
                  style={{width:i===activeTesti?40:10,height:2,background:i===activeTesti?C.green:C.border,border:"none",cursor:"pointer",transition:"all .35s",padding:0,borderRadius:1}}/>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          FACILITIES — Numbered row cards
          ══════════════════════════════════════════════ */}
      <section id="facilities" style={{background:C.bg,padding:"6rem 2.5rem"}}>
        <div style={{maxWidth:1280,margin:"0 auto"}}>
          <Reveal>
            <div style={{display:"flex",alignItems:"flex-end",justifyContent:"space-between",marginBottom:"5rem"}}>
              <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:"clamp(2.5rem,5vw,5rem)",fontWeight:900,color:C.white,lineHeight:.92,letterSpacing:"-.02em"}}>
                World-Class<br/><em style={{fontStyle:"italic",fontWeight:400,color:C.green}}>Facilities</em>
              </h2>
              <span style={{fontSize:".6rem",letterSpacing:".2em",textTransform:"uppercase",color:C.faint}}>Infrastructure · Miyapur Campus</span>
            </div>
          </Reveal>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:1,background:C.border}}>
            {FACILITIES.map((f,i)=>(
              <Reveal key={f.name} delay={i*50}>
                <FacRow f={f}/>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          APPOINTMENT — Dark grid form
          ══════════════════════════════════════════════ */}
      <section id="appointment" style={{background:C.surface,padding:"7rem 2.5rem",position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",inset:0,backgroundImage:`linear-gradient(${C.green}07 1px,transparent 1px),linear-gradient(90deg,${C.green}07 1px,transparent 1px)`,backgroundSize:"64px 64px",pointerEvents:"none"}}/>
        <div style={{position:"absolute",right:"-10%",top:"50%",transform:"translateY(-50%)",width:"40vw",height:"40vw",borderRadius:"50%",background:`radial-gradient(circle,${C.greenGlow} 0%,transparent 65%)`,pointerEvents:"none"}}/>
        <div style={{maxWidth:900,margin:"0 auto",position:"relative",zIndex:1}}>
          <Reveal>
            <div style={{textAlign:"center",marginBottom:"4rem"}}>
              <GreenPill>Schedule a Visit</GreenPill>
              <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:"clamp(2.5rem,5vw,5rem)",fontWeight:900,color:C.white,lineHeight:.92,letterSpacing:"-.02em",marginTop:"1.5rem"}}>
                Book Your<br/><em style={{fontStyle:"italic",fontWeight:400,color:C.green}}>Appointment</em>
              </h2>
              <p style={{fontSize:".88rem",color:C.muted,marginTop:"1.2rem",fontWeight:300}}>Confirmed within 30 minutes · Walk-ins always welcome</p>
            </div>
          </Reveal>
          <Reveal delay={80}>
            <form onSubmit={submit}>
              {[
                [{l:"Full Name",k:"name",t:"text",ph:"Your full name"},{l:"Mobile Number",k:"phone",t:"tel",ph:"+91 98765 43210"}],
                [{l:"Department",k:"dept",t:"select",ph:""},{l:"Preferred Date",k:"date",t:"date",ph:""}],
              ].map((row,ri)=>(
                <div key={ri} style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:2,marginBottom:2}}>
                  {row.map(f=>(
                    <div key={f.k} style={{background:C.raised,padding:"1.6rem 1.8rem",border:`1px solid ${C.border}`}}>
                      <label style={{fontSize:".55rem",letterSpacing:".22em",textTransform:"uppercase",color:C.green,display:"block",marginBottom:".7rem",fontWeight:600}}>{f.l}</label>
                      {f.t==="select"?(
                        <select value={form.dept} onChange={e=>setForm(p=>({...p,dept:e.target.value}))}
                          style={{width:"100%",background:"transparent",border:"none",borderBottom:`1px solid ${C.border}`,color:form.dept?C.white:C.faint,fontSize:".95rem",padding:".4rem 0",outline:"none",fontFamily:"'Outfit',sans-serif",colorScheme:"dark",cursor:"pointer"}}>
                          <option value="" style={{background:C.raised}}>Select department</option>
                          {SPECIALITIES.map(s=><option key={s.name} style={{background:C.raised}}>{s.name}</option>)}
                          <option style={{background:C.raised}}>General Medicine</option>
                        </select>
                      ):(
                        <input type={f.t} placeholder={f.ph} value={form[f.k as "name" | "phone" | "dept" | "date" | "msg"]} onChange={e=>setForm(p=>({...p,[f.k]:e.target.value}))}
                          min={f.t==="date"?new Date().toISOString().split("T")[0]:undefined}
                          style={{width:"100%",background:"transparent",border:"none",borderBottom:`1px solid ${C.border}`,color:C.white,fontSize:".95rem",padding:".4rem 0",outline:"none",fontFamily:"'Outfit',sans-serif",colorScheme:"dark"}}
                          onFocus={e=>e.currentTarget.style.borderBottomColor=C.green}
                          onBlur={e=>e.currentTarget.style.borderBottomColor=C.border}/>
                      )}
                    </div>
                  ))}
                </div>
              ))}
              <div style={{background:C.raised,padding:"1.6rem 1.8rem",border:`1px solid ${C.border}`,marginBottom:2}}>
                <label style={{fontSize:".55rem",letterSpacing:".22em",textTransform:"uppercase",color:C.green,display:"block",marginBottom:".7rem",fontWeight:600}}>Reason for Visit</label>
                <input type="text" placeholder="Briefly describe your concern..." value={form.msg} onChange={e=>setForm(p=>({...p,msg:e.target.value}))}
                  style={{width:"100%",background:"transparent",border:"none",borderBottom:`1px solid ${C.border}`,color:C.white,fontSize:".95rem",padding:".4rem 0",outline:"none",fontFamily:"'Outfit',sans-serif"}}
                  onFocus={e=>e.currentTarget.style.borderBottomColor=C.green}
                  onBlur={e=>e.currentTarget.style.borderBottomColor=C.border}/>
              </div>
              <button type="submit"
                style={{width:"100%",background:sent?"#166834":C.green,color:sent?"#dcfce7":C.bg,border:"none",padding:"1.4rem 2rem",fontFamily:"'Outfit',sans-serif",fontSize:".88rem",fontWeight:700,letterSpacing:".18em",textTransform:"uppercase",cursor:"pointer",transition:"all .35s",borderRadius:4}}>
                {sent?"✓  Appointment Received — We'll Confirm Shortly":"Confirm Appointment →"}
              </button>
            </form>
          </Reveal>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          CONTACT + BRANCHES
          ══════════════════════════════════════════════ */}
      <section id="contact" style={{background:C.bg,padding:"6rem 2.5rem",borderTop:`1px solid ${C.border}`}}>
        <div style={{maxWidth:1280,margin:"0 auto",display:"grid",gridTemplateColumns:"1fr 1fr",gap:"5rem"}}>
          <Reveal>
            <GreenPill>Reach Us</GreenPill>
            <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:"clamp(2rem,3.5vw,3.5rem)",fontWeight:900,color:C.white,lineHeight:.95,letterSpacing:"-.01em",marginTop:"1.2rem",marginBottom:"2.5rem"}}>
              Miyapur<br/><em style={{fontStyle:"italic",fontWeight:400,color:C.green}}>Branch</em>
            </h2>
            <div style={{border:`1px solid ${C.border}`}}>
              {[
                {l:"Address",v:"Plot 8-A, Miyapur X Roads\nMiyapur, Hyderabad – 500049",col:C.green},
                {l:"Emergency 24/7",v:"040-3567-8900",col:C.red},
                {l:"Appointments",v:"040-3567-8800",col:C.green},
                {l:"Email",v:"miyapur@srikarahospitals.in",col:C.green},
                {l:"OPD Hours",v:"Mon – Sat · 8:00 AM – 8:00 PM",col:C.amber},
              ].map((c,i,arr)=>(
                <div key={c.l} style={{display:"flex",borderBottom:i<arr.length-1?`1px solid ${C.border}`:"none",cursor:"pointer",transition:"background .2s"}}
                  onMouseEnter={e=>e.currentTarget.style.background=C.surface}
                  onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
                  <div style={{width:3,flexShrink:0,background:c.col,opacity:.8}}/>
                  <div style={{padding:"1rem 1.4rem"}}>
                    <div style={{fontSize:".55rem",letterSpacing:".18em",textTransform:"uppercase",color:C.faint,marginBottom:".3rem"}}>{c.l}</div>
                    <div style={{fontSize:".88rem",color:C.white,lineHeight:1.6,whiteSpace:"pre-line",fontWeight:300}}>{c.v}</div>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal delay={100}>
            <span style={{display:"inline-flex",alignItems:"center",gap:".5rem",background:"rgba(255,255,255,.05)",border:"1px solid rgba(255,255,255,.1)",color:C.muted,fontSize:".6rem",letterSpacing:".2em",textTransform:"uppercase",fontWeight:600,padding:".3rem 1rem",borderRadius:100}}>Srikara Network</span>
            <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:"clamp(2rem,3.5vw,3.5rem)",fontWeight:900,color:C.white,lineHeight:.95,letterSpacing:"-.01em",marginTop:"1.2rem",marginBottom:"2.5rem"}}>
              Other<br/><em style={{fontStyle:"italic",fontWeight:400,color:C.green}}>Branches</em>
            </h2>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:1,background:C.border}}>
              {BRANCHES.map(b=>(
                <a key={b} href={`/hospitals/${b.toLowerCase().replace(/ /g, "-")}`}
                  style={{background:C.surface,padding:".9rem 1.2rem",display:"flex",alignItems:"center",justifyContent:"space-between",fontSize:".78rem",color:C.muted,fontWeight:400,textDecoration:"none",borderLeft:"2px solid transparent",transition:"all .2s"}}
                  onMouseEnter={e=>{e.currentTarget.style.background=C.raised;e.currentTarget.style.borderLeftColor=C.green;e.currentTarget.style.color=C.white}}
                  onMouseLeave={e=>{e.currentTarget.style.background=C.surface;e.currentTarget.style.borderLeftColor="transparent";e.currentTarget.style.color=C.muted}}>
                  <span>{b}</span>
                  <span style={{fontSize:".68rem",color:C.green,opacity:.5}}>→</span>
                </a>
              ))}
            </div>
            <a href="/hospitals" style={{display:"inline-flex",alignItems:"center",gap:".5rem",marginTop:"1.5rem",fontSize:".65rem",letterSpacing:".14em",textTransform:"uppercase",color:C.faint,borderBottom:`1px solid ${C.border}`,paddingBottom:2,textDecoration:"none"}}>
              ← All Srikara Branches
            </a>
          </Reveal>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{background:"#07090C",borderTop:`1px solid ${C.border}`,padding:"1.8rem 2.5rem"}}>
        <div style={{height:2,background:`linear-gradient(90deg,${C.green},#22c55e,transparent)`,marginBottom:"1.5rem"}}/>
        <div style={{maxWidth:1280,margin:"0 auto",display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:"1rem"}}>
          <div style={{display:"flex",alignItems:"center",gap:12}}>
            <div style={{width:28,height:28,borderRadius:"50%",border:`1.5px solid ${C.green}`,display:"flex",alignItems:"center",justifyContent:"center"}}>
              <span style={{fontFamily:"'Playfair Display',serif",fontSize:".9rem",fontWeight:700,color:C.green}}>S</span>
            </div>
            <span style={{fontSize:".62rem",color:"rgba(255,255,255,.25)",letterSpacing:".08em"}}>
              © {new Date().getFullYear()} Srikara Hospital Miyapur · Part of Srikara Hospital Group
            </span>
          </div>
          <div style={{display:"flex",gap:"2rem"}}>
            {["Privacy","Terms","Sitemap"].map(l=>(
              <a key={l} href="#" style={{fontSize:".6rem",color:"rgba(255,255,255,.18)",letterSpacing:".1em",textTransform:"uppercase",textDecoration:"none"}}>{l}</a>
            ))}
          </div>
        </div>
      </footer>
    </>
  );
}

// ─── FACILITY ROW CARD ─────────────────────────────────────────────────────────
function FacRow({f} :{f:(typeof FACILITIES)[0]}){
  const[hov,setHov]=useState(false);
  return(
    <div onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
      style={{background:hov?"#1A2230":"#141920",display:"flex",gap:0,overflow:"hidden",borderLeft:`3px solid ${hov?"#4ADE80":"transparent"}`,transition:"all .3s",cursor:"pointer"}}>
      <div style={{width:120,flexShrink:0,overflow:"hidden",background:"#1A2230"}}>
        <img src={f.img} alt={f.name} loading="lazy"
          style={{width:"100%",height:"100%",objectFit:"cover",display:"block",opacity:hov?.85:.45,transition:"all .4s ease",transform:hov?"scale(1.07)":"scale(1)"}}/>
      </div>
      <div style={{padding:"1.6rem 2rem",flex:1}}>
        <div style={{display:"flex",alignItems:"center",gap:".8rem",marginBottom:".7rem"}}>
          <span style={{fontFamily:"'Playfair Display',serif",fontSize:"1.4rem",fontWeight:900,color:hov?"#4ADE80":"rgba(255,255,255,.1)",transition:"color .3s",lineHeight:1}}>{f.num}</span>
          <span style={{fontSize:".55rem",letterSpacing:".18em",textTransform:"uppercase",border:`1px solid ${hov?"#4ADE8050":"rgba(255,255,255,.1)"}`,color:hov?"#4ADE80":"rgba(255,255,255,.3)",padding:".22rem .65rem",borderRadius:2,transition:"all .3s"}}>{f.tag}</span>
        </div>
        <div style={{fontFamily:"'Playfair Display',serif",fontSize:"1.05rem",fontWeight:700,color:"#F2F5F0",lineHeight:1.3,marginBottom:".6rem"}}>{f.name}</div>
        <div style={{fontSize:".76rem",color:"rgba(242,245,240,.4)",lineHeight:1.75,fontWeight:300}}>{f.desc}</div>
      </div>
    </div>
  );
}
