"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import { departments } from "@/data/departments";
import { hospitals } from "@/data/hospitals";
import { doctors } from "@/data/doctors";

/*
  ╔══════════════════════════════════════════════╗
  ║  SRIKARA HOSPITALS  —  Home Page             ║
  ║  Palette:                                    ║
  ║    Crimson   #B8103F                         ║
  ║    Navy      #0B1F3A                         ║
  ║    Teal      #0D7A6B                         ║
  ║    Cream     #F9F7F4                         ║
  ║    Gold      #C9933A                         ║
  ╚══════════════════════════════════════════════╝
*/

/* ── Typewriter hook ─────────────────────────── */
function useTypewriter(text:string , speed = 34, start = false) {
  const [displayed, setDisplayed] = useState("");
  useEffect(() => {
    if (!start) { setDisplayed(""); return; }
    setDisplayed("");
    let i = 0;
    const id = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) clearInterval(id);
    }, speed);
    return () => clearInterval(id);
  }, [text, speed, start]);
  return displayed;
}

/* ── Intersection observer ───────────────────── */
function useInView(threshold = 0.13) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

/* ── Count-up hook ───────────────────────────── */
function useCountUp(
  target: number,
  duration: number = 1800,
  start: boolean = false
) {
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    if (!start) return;

    let startTime: number | undefined;

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;

      const progress = Math.min(
        (timestamp - startTime) / duration,
        1
      );

      setCount(Math.floor(progress * target));

      if (progress < 1) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  }, [start, target, duration]);

  return count;
}

/* ═══════════════════════════════════════════════
   STATIC DATA
═══════════════════════════════════════════════ */
const SLIDES = [
  {
    img: "/herosection.jpg",
    tag: "Robotic Surgery",
    h1: "Precision Surgery,",
    h2: "Life-Changing Results",
    sub: "South India's No. 1 robotic surgery centre — minimally invasive procedures, dramatically faster recovery times.",
  },
  {
    img: "https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=1800&q=88&auto=format&fit=crop",
    tag: "Compassionate Care",
    h1: "Every Patient,",
    h2: "Every Heartbeat Matters",
    sub: "300+ specialists committed to your recovery — 24 hours, 7 days a week, across all 9 hospitals.",
  },
  {
    img: "https://images.unsplash.com/photo-1504813184591-01572f98c85f?w=1800&q=88&auto=format&fit=crop",
    tag: "24 / 7 Emergency",
    h1: "Always On Guard,",
    h2: "Around the Clock",
    sub: "7 Cardiac Cath Labs. Neuro critical care. Trauma centres ready every minute of every day.",
  },
  {
    img: "/herosection.jpg",
    tag: "Happy Recoveries",
    h1: "Thousands Healed,",
    h2: "Millions of Smiles",
    sub: "98 % patient satisfaction. Trusted by families across Telangana & Andhra Pradesh for 25 + years.",
  },
];

const STATS = [
  { num: 9,   suffix: "",   label: "Hospitals",   icon: "🏥" },
  { num: 300, suffix: "+",  label: "Specialists", icon: "👨‍⚕️" },
  { num: 7,   suffix: "",   label: "Cath Labs",   icon: "💓" },
  { num: 25,  suffix: "+",  label: "Years",       icon: "🏆" },
  { num: 98,  suffix: "%",  label: "Satisfaction",icon: "⭐" },
  { num: 24,  suffix: "/7", label: "Emergency",   icon: "🚨" },
];

const QUICK_TILES = [
  {
    img: "https://images.unsplash.com/photo-1579684453423-f84349ef60b0?w=600&q=82&auto=format&fit=crop",
    label: "Specialities",
    sub: "42 Departments",
  },
  {
    img: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=600&q=82&auto=format&fit=crop",
    label: "Emergency & Trauma",
    sub: "24 / 7 Care",
  },
  {
    img: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&q=82&auto=format&fit=crop",
    label: "Health Checkup",
    sub: "Preventive Packages",
  },
  {
    img: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=600&q=82&auto=format&fit=crop",
    label: "Insurance & Cashless",
    sub: "Hassle-free Billing",
  },
  {
    img: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&q=82&auto=format&fit=crop",
    label: "Cancer Screening",
    sub: "Early Detection",
  },
];

const DEPT_FALLBACK = [
  { 
    icon: "🦴", 
    name: "Orthopaedics", 
    tagline: "No.1 Robotic Knee Replacement Center in India", 
    count: 6, 
    slug: "orthopaedics", 
    img: "https://images.unsplash.com/photo-1706777193603-76c3e9613553?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" // Joint/Bone model
  },
  { 
    icon: "🫀", 
    name: "Cardiology", 
    tagline: "7 Cath Lab Centers across our network", 
    count: 6, 
    slug: "cardiology", 
    img: "https://images.unsplash.com/photo-1559757296-5c84adc6d116?q=80&w=1331&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  { 
    icon: "🧠", 
    name: "Neurology", 
    tagline: "24/7 Neuro Critical Care across all branches", 
    count: 6, 
    slug: "neurology", 
    img: "https://images.unsplash.com/photo-1559757175-5700dde675bc?w=480&q=80&auto=format&fit=crop" // Brain scan/model
  },
  { 
    icon: "⚡", 
    name: "Urology", 
    tagline: "6 Laser Urology Centers in our network", 
    count: 6, 
    slug: "urology", 
    img: "https://plus.unsplash.com/premium_photo-1702598804759-8fb687f774fb?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" // Urology specific
  },
  { 
    icon: "🧬", 
    name: "Spine", 
    tagline: "Dedicated spine surgery centers", 
    count: 6, 
    slug: "spine", 
    img: "https://images.unsplash.com/photo-1624716346720-6c96dfd07807?q=80&w=1172&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" // Spine X-ray/Model
  },
  { 
    icon: "🤱", 
    name: "Gynaecology", 
    tagline: "Advanced laparoscopic gynaecology", 
    count: 6, 
    slug: "gynaecology", 
    img: "https://media.istockphoto.com/id/2263270289/photo/human-fetus-and-dna-on-scientific-background-3d-illustration.jpg?s=2048x2048&w=is&k=20&c=kRjsVLkBonp9xYSq5PRvDxAPoTHojaIESd_TcPZJ0gA="
  },
  { 
    icon: "🫘", 
    name: "Nephrology", 
    tagline: "Dialysis centers across all branches", 
    count: 6, 
    slug: "nephrology", 
    img: "https://images.unsplash.com/photo-1650897492524-bbc1adb72626?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8a2lkbmV5fGVufDB8fDB8fHww"
  },
  { 
    icon: "🍕", // Use a stomach or food icon if 🍕 isn't right; emoji support for 'stomach' varies
    name: "Gastro", 
    tagline: "Advanced endoscopy & liver care", 
    count: 6, 
    slug: "gastro", 
    img: "https://images.unsplash.com/photo-1743767587835-7a80fe384236?q=80&w=1355&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
];
const HOSP_FALLBACK = [
  { name: "Srikara Secunderabad", location: "Secunderabad",    beds: 350, tags: ["Flagship","NABH"], slug: "secunderabad", img: "/rtc-x-roads.jpeg", color: "#B8103F", accentColor: "#0B1F3A" },
  { name: "Srikara Kukatpally",   location: "Kukatpally, Hyd", beds: 250, tags: ["NABH"],            slug: "kukatpally",   img: "/Miyapur.jpeg", color: "#0B1F3A", accentColor: "#0D7A6B" },
  { name: "Srikara Miyapur",      location: "Miyapur, Hyd",    beds: 200, tags: ["ISO 9001"],         slug: "miyapur",      img: "Lbnagar.jpeg", color: "#0D7A6B", accentColor: "#0B1F3A" },
  { name: "Srikara Vizag",        location: "Visakhapatnam",   beds: 300, tags: ["NABH"],            slug: "vizag",        img: "Vijayavada.jpeg", color: "#C9933A", accentColor: "#0B1F3A" },
  { name: "Srikara Vijayawada",   location: "Vijayawada, AP",  beds: 275, tags: ["Cardiac","NABH"],  slug: "vijayawada",   img: "/kompally.jpeg", color: "#B8103F", accentColor: "#C9933A" },
  { name: "Srikara Karimnagar",   location: "Karimnagar, TS",  beds: 180, tags: ["Multi-spec"],      slug: "karimnagar",   img: "/ecil.jpeg", color: "#0B1F3A", accentColor: "#B8103F" },
];

/* Real doctor images for the Healing Hands section background hover */
const DOCTOR_BG_IMAGES = [
  "/Akhildadi.jpg",
  "/doctors/DR.SREEDHAR.png",
  "/doctors/DR.SHARATHCHANDRA.png",
  "/doctors/DR.SUMANBABU.png",
  "/doctors/DR.TVSURESH.png",
  "https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=600&q=85&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=600&q=85&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&q=85&auto=format&fit=crop",
];

const EXCELLENCE_PANELS = [
  {
    title: "Internal Medicine",
    sub: "Comprehensive care for hospitalised patients and complex systemic conditions — managed by senior physicians with decades of specialist experience.",
    img: "https://vimalsharmamd.com/wp-content/uploads/2025/02/getty-images-5U7sVXOcV4-unsplash-1024x767.jpg",
    reverse: false,
  },
  {
    title: "Oncology Centre",
    sub: "Advanced cancer therapies including chemotherapy, radiation and immunotherapy — with compassionate, personalised care at every step of your journey.",
    img: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=900&q=85&auto=format&fit=crop",
    reverse: true,
  },
  {
    title: "Heart Centre",
    sub: "World-class cardiology — from interventional diagnostics and cath-lab procedures to open-heart surgeries performed by India's finest cardiologists.",
    img: "https://images.unsplash.com/photo-1628348068343-c6a848d2b6dd?w=900&q=85&auto=format&fit=crop",
    reverse: false,
  },
];

const TESTIMONIALS = [
  {
    name: "Ramesh T.",
    loc: "Hyderabad",
    stars: 5,
    av: "RT",
    text: "The robotic knee surgery at Srikara changed my life. I walked pain-free for the first time in 8 years. The entire team was exceptional — from consultation to recovery.",
  },
  {
    name: "Lakshmi P.",
    loc: "Visakhapatnam",
    stars: 5,
    av: "LP",
    text: "From emergency admission to discharge, every doctor and nurse was compassionate and professional. I can't thank the team enough for saving my husband's life.",
  },
  {
    name: "Vijay K.",
    loc: "Vijayawada",
    stars: 5,
    av: "VK",
    text: "The cardiac team handled my bypass surgery with incredible precision. Six months later I'm back to full health. Srikara Hospitals truly gave me a second chance at life.",
  },
];

/* ── Stat counter item ───────────────────────── */
function StatItem({ num, suffix, label, icon, start }:{
  num: number;
  suffix: string;
  label: string;
  icon: string;
  start: boolean;
}) {
  const count = useCountUp(num, 1800, start);
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", minWidth: 72 }}>
      <span style={{ fontSize: 20, marginBottom: 3 }}>{icon}</span>
      <span
        style={{
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontSize: 28,
          fontWeight: 700,
          color: "#B8103F",
          lineHeight: 1,
        }}
      >
        {count}{suffix}
      </span>
      <span
        style={{
          fontSize: 8,
          fontWeight: 800,
          letterSpacing: "0.22em",
          textTransform: "uppercase",
          color: "rgba(255,255,255,0.45)",
          marginTop: 4,
        }}
      >
        {label}
      </span>
    </div>
  );
}

/* ── Doctor card with hover bg image (right-side only) ── */
function DoctorCard({ doc, bgImage, index }:{
  doc: { name: string; specialty: string; hospital: string; initials: string; color: string };
  bgImage: string;
  index: number;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        borderRadius: 22,
        overflow: "hidden",
        border: "1px solid #E8E2EC",
        background: hovered ? "transparent" : "#fff",
        cursor: "pointer",
        transition: "transform 0.38s ease, box-shadow 0.38s ease",
        transform: hovered ? "translateY(-6px)" : "translateY(0)",
        boxShadow: hovered
          ? "0 24px 48px rgba(11,31,58,0.18)"
          : "0 2px 12px rgba(0,0,0,0.05)",
      }}
    >
      {/* ── Background doctor image (only shows on hover) ── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center top",
          opacity: hovered ? 1 : 0,
          transition: "opacity 0.5s ease",
          zIndex: 0,
        }}
      />
      {/* Dark gradient overlay on hover */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: hovered
            ? "linear-gradient(to top, rgba(11,31,58,0.92) 0%, rgba(11,31,58,0.55) 55%, rgba(11,31,58,0.15) 100%)"
            : "transparent",
          transition: "background 0.5s ease",
          zIndex: 1,
        }}
      />

      {/* ── Card content ── */}
      <div style={{ position: "relative", zIndex: 2, padding: "26px 20px 22px" }}>
        {/* Avatar */}
        <div
          style={{
            position: "relative",
            width: 78,
            height: 78,
            margin: "0 auto 16px",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: -5,
              borderRadius: "50%",
              background: doc.color,
              opacity: hovered ? 0.25 : 0.1,
              transition: "opacity 0.4s",
            }}
          />
          <div
            style={{
              width: 78,
              height: 78,
              borderRadius: "50%",
              background: `linear-gradient(135deg, ${doc.color}, ${doc.color}bb)`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 22,
              fontWeight: 700,
              color: "#fff",
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              boxShadow: `0 8px 24px ${doc.color}44`,
              position: "relative",
              border: hovered ? "2px solid rgba(255,255,255,0.35)" : "2px solid transparent",
              transition: "border 0.4s",
            }}
          >
            {doc.initials}
          </div>
        </div>

        <h3
          style={{
            fontWeight: 700,
            color: hovered ? "#fff" : "#0B1F3A",
            marginBottom: 4,
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: 16,
            transition: "color 0.35s",
            textAlign: "center",
          }}
        >
          {doc.name}
        </h3>
        <p
          style={{
            fontSize: 9,
            fontWeight: 800,
            textTransform: "uppercase",
            letterSpacing: "0.18em",
            color: hovered ? "#f9a8d4" : "#0D7A6B",
            marginBottom: 3,
            transition: "color 0.35s",
            textAlign: "center",
          }}
        >
          {doc.specialty}
        </p>
        <p
          style={{
            fontSize: 10,
            color: hovered ? "rgba(255,255,255,0.6)" : "#9CA3AF",
            marginBottom: 18,
            transition: "color 0.35s",
            textAlign: "center",
          }}
        >
          {doc.hospital}
        </p>

        <Link href="/doctors">
          <div
            style={{
              width: "100%",
              padding: "11px 0",
              borderRadius: 50,
              background: hovered
                ? "linear-gradient(135deg,#B8103F,#e0456e)"
                : "linear-gradient(135deg,#B8103F,#e0456e)",
              color: "#fff",
              fontSize: 9,
              fontWeight: 800,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              textAlign: "center",
              boxShadow: "0 6px 16px rgba(184,16,63,0.32)",
              transition: "transform 0.2s, box-shadow 0.2s",
            }}
          >
            Book Appointment
          </div>
        </Link>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   MAIN PAGE COMPONENT
═══════════════════════════════════════════════ */
export default function HomePage() {
  const [slide, setSlide] = useState(0);
  const [fade, setFade]   = useState(true);
  const [typed, setTyped] = useState(false);
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [deptTab, setDeptTab] = useState("Excellence");
  const [apptForm, setApptForm] = useState({ name: "", phone: "", email: "", dept: "" });

  const { ref: statsRef, inView: statsVis } = useInView(0.1);
  const { ref: aboutRef, inView: aboutVis } = useInView();
  const { ref: tilesRef, inView: tilesVis } = useInView();
  const { ref: deptRef,  inView: deptVis  } = useInView();
  const { ref: exRef,    inView: exVis    } = useInView();
  const { ref: hospRef,  inView: hospVis  } = useInView();
  const { ref: docRef,   inView: docVis   } = useInView();
  const { ref: testRef,  inView: testVis  } = useInView();
  const { ref: newsRef,  inView: newsVis  } = useInView();

  const goTo = useCallback((idx: number) => {
    setFade(false);
    setTyped(false);
    setTimeout(() => {
      setSlide(idx);
      setFade(true);
      setTimeout(() => setTyped(true), 320);
    }, 420);
  }, []);

  useEffect(() => {
    setTyped(true);
    const id = setInterval(() => {
      setSlide((prev) => {
        const next = (prev + 1) % SLIDES.length;
        goTo(next);
        return prev;
      });
    }, 7500);
    return () => clearInterval(id);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slide]);

  const cur     = SLIDES[slide];
  const subText = useTypewriter(cur.sub, 30, typed);

  /* Pick data — use real if loaded, otherwise fallback */
  const deptList = departments?.length ? departments.slice(0, 8) : DEPT_FALLBACK;
  const hospList = hospitals?.length   ? hospitals.slice(0, 6)   : HOSP_FALLBACK;
  const docList  = doctors?.length     ? doctors.slice(0, 8)     : [];

  /* ── Global CSS injected once ── */
  const globalCSS = `
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Outfit:wght@300;400;500;600;700;800&display=swap');

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: 'Outfit', sans-serif; background: #F9F7F4; }

    /* ── Marquee ── */
    @keyframes sk-marquee { from { transform: translateX(0) } to { transform: translateX(-50%) } }
    .sk-marquee-track { display: flex; width: max-content; animation: sk-marquee 30s linear infinite; }

    /* ── Fade up ── */
    .sk-fade { transition: opacity 0.85s ease, transform 0.85s ease; }
    .sk-fade.hidden { opacity: 0; transform: translateY(32px); }
    .sk-fade.visible { opacity: 1; transform: translateY(0); }

    /* ── Pulse dot ── */
    @keyframes sk-pulse { 0%,100%{transform:scale(1);opacity:.6} 50%{transform:scale(1.4);opacity:.15} }

    /* ── Cursor blink ── */
    @keyframes sk-blink { 0%,100%{opacity:1} 50%{opacity:0} }
    .sk-cursor { animation: sk-blink 0.9s infinite; }

    /* ── Card hover lift ── */
    .sk-card { transition: transform 0.36s ease, box-shadow 0.36s ease; }
    .sk-card:hover { transform: translateY(-6px); box-shadow: 0 22px 44px rgba(0,0,0,0.11); }

    /* ── Image zoom on parent hover ── */
    .sk-img-wrap img { transition: transform 0.65s ease; }
    .sk-img-wrap:hover img { transform: scale(1.055); }

    /* ── Buttons ── */
    .sk-btn-primary {
      display: inline-flex; align-items: center; gap: 8px;
      padding: 14px 32px; border-radius: 50px;
      background: linear-gradient(135deg, #B8103F, #e0456e);
      color: #fff; font-family: 'Outfit', sans-serif;
      font-weight: 700; font-size: 12px; letter-spacing: 0.09em;
      text-transform: uppercase; border: none; cursor: pointer;
      box-shadow: 0 8px 24px rgba(184,16,63,0.32);
      transition: transform 0.28s, box-shadow 0.28s;
      text-decoration: none;
    }
    .sk-btn-primary:hover { transform: translateY(-2px); box-shadow: 0 14px 32px rgba(184,16,63,0.42); }

    .sk-btn-outline {
      display: inline-flex; align-items: center; gap: 8px;
      padding: 13px 28px; border-radius: 50px;
      background: transparent; color: #0B1F3A;
      font-family: 'Outfit', sans-serif;
      font-weight: 700; font-size: 12px; letter-spacing: 0.09em;
      text-transform: uppercase; border: 2px solid #0B1F3A;
      cursor: pointer; transition: all 0.28s;
      text-decoration: none;
    }
    .sk-btn-outline:hover { background: #0B1F3A; color: #fff; }

    .sk-btn-outline-white {
      display: inline-flex; align-items: center; gap: 8px;
      padding: 13px 28px; border-radius: 50px;
      background: transparent; color: #fff;
      font-family: 'Outfit', sans-serif;
      font-weight: 700; font-size: 12px; letter-spacing: 0.09em;
      text-transform: uppercase; border: 2px solid rgba(255,255,255,0.38);
      cursor: pointer; transition: all 0.28s;
      text-decoration: none;
    }
    .sk-btn-outline-white:hover { background: rgba(255,255,255,0.1); }

    /* ── Tab buttons ── */
    .sk-tab {
      padding: 9px 22px; border-radius: 50px;
      font-family: 'Outfit', sans-serif;
      font-size: 11px; font-weight: 800; letter-spacing: 0.12em;
      text-transform: uppercase; cursor: pointer;
      border: 2px solid transparent; transition: all 0.22s;
    }
    .sk-tab.active  { background: #0B1F3A; color: #fff; border-color: #0B1F3A; }
    .sk-tab.inactive{ background: transparent; color: #6B7280; border-color: #E5E7EB; }
    .sk-tab.inactive:hover { border-color: #0B1F3A; color: #0B1F3A; }

    /* ── Section label / heading ── */
    .sk-label {
      font-size: 10px; font-weight: 800; letter-spacing: 0.4em;
      text-transform: uppercase; color: #B8103F; margin-bottom: 10px;
      display: block;
    }
    .sk-h2 {
      font-family: 'Cormorant Garamond', Georgia, serif;
      font-size: clamp(28px, 3.2vw, 46px);
      font-weight: 700; color: #0B1F3A; line-height: 1.15;
    }
    .sk-h2 em { font-style: italic; font-weight: 400; color: #0D7A6B; }

    /* ── Pill badge ── */
    .sk-pill {
      display: inline-block; font-size: 9px; font-weight: 800;
      letter-spacing: 0.16em; text-transform: uppercase;
      padding: 5px 14px; border-radius: 50px;
      border: 1px solid rgba(255,255,255,0.22);
      color: #fff; backdrop-filter: blur(6px);
      background: rgba(255,255,255,0.08);
    }

    input, select { outline: none; font-family: 'Outfit', sans-serif; }
    a { text-decoration: none; color: inherit; }

    ::-webkit-scrollbar { width: 5px; }
    ::-webkit-scrollbar-thumb { background: #B8103F; border-radius: 3px; }
    .tile-img:hover {
  transform: scale(1.1);
}

.tile-overlay:hover {
  opacity: 1;
}
  `;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: globalCSS }} />

      {/* ═══════════════════════════════════════════════════
          §1  HERO  — full-viewport photo carousel
      ═══════════════════════════════════════════════════ */}
      <section
        style={{
          position: "relative",
          width: "100%",
          height: "100svh",
          minHeight: "auto",
          overflow: "hidden",
        }}
      >
        {/* Full-bleed background photo */}
        <img
          key={slide}
          src={cur.img}
          alt={cur.tag}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            opacity: fade ? 1 : 0,
            transition: "opacity 0.55s ease",
          }}
        />

        {/* Layered overlays */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(108deg, rgba(11,31,58,0.88) 0%, rgba(11,31,58,0.52) 52%, rgba(11,31,58,0.14) 100%)",
          }}
        />
        {/* Bottom fade into page background */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 200,
            background: "linear-gradient(to bottom, transparent, #F9F7F4)",
          }}
        />
        {/* Subtle dot texture */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            opacity: 0.035,
            backgroundImage: "radial-gradient(rgba(255,255,255,0.9) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
            pointerEvents: "none",
          }}
        />
        {/* Right-edge crimson accent wash */}
        <div
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            width: "36%",
            height: "100%",
            background: "linear-gradient(to left, rgba(184,16,63,0.07), transparent)",
            pointerEvents: "none",
          }}
        />

        {/* ── Slide thumbnail strip — right edge ── */}
        <div
          style={{
            position: "absolute",
            right: 28,
            top: "50%",
            transform: "translateY(-50%)",
            display: "flex",
            flexDirection: "column",
            gap: 10,
            zIndex: 20,
          }}
        >
          {SLIDES.map((s, idx) => (
            <button
              key={idx}
              onClick={() => goTo(idx)}
              style={{
                width: 56,
                height: 56,
                borderRadius: 13,
                overflow: "hidden",
                border: `2px solid ${idx === slide ? "#B8103F" : "rgba(255,255,255,0.22)"}`,
                cursor: "pointer",
                opacity: idx === slide ? 1 : 0.5,
                transition: "all 0.3s",
                background: "none",
                padding: 0,
              }}
            >
              <img
                src={s.img}
                alt={s.tag}
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              />
            </button>
          ))}
        </div>

        {/* ── Hero text block ── */}
        <div
          style={{
            position: "absolute",
            bottom: 155,
            left: 0,
            padding: "0 16px",
            maxWidth: 780,
            zIndex: 10,
          }}
        >
          {/* Live badge */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 9,
              background: "rgba(184,16,63,0.14)",
              border: "1px solid rgba(184,16,63,0.42)",
              backdropFilter: "blur(8px)",
              borderRadius: 50,
              padding: "6px 18px",
              marginBottom: 22,
            }}
          >
            <span
              style={{
                position: "relative",
                display: "inline-block",
                width: 8,
                height: 8,
              }}
            >
              <span
                style={{
                  position: "absolute",
                  inset: 0,
                  borderRadius: "50%",
                  background: "#B8103F",
                  animation: "sk-pulse 1.8s infinite",
                }}
              />
              <span
                style={{
                  position: "relative",
                  display: "block",
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: "#B8103F",
                }}
              />
            </span>
            <span
              style={{
                fontSize: 9,
                fontWeight: 800,
                letterSpacing: "0.32em",
                textTransform: "uppercase",
                color: "#fca5a5",
              }}
            >
              {cur.tag}
            </span>
          </div>

          {/* Main headline */}
          <h1
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: "clamp(38px, 5.8vw, 74px)",
              fontWeight: 700,
              color: "#fff",
              lineHeight: 1.06,
              marginBottom: 18,
              opacity: fade ? 1 : 0,
              transition: "opacity 0.5s ease",
            }}
          >
            {cur.h1}
            <br />
            <em style={{ color: "#B8103F", fontStyle: "italic", fontWeight: 400 }}>{cur.h2}</em>
          </h1>

          {/* Typewriter subtitle */}
          <p
            style={{
              fontSize: "clamp(13px, 1.4vw, 16px)",
              fontWeight: 300,
              color: "rgba(255,255,255,0.62)",
              lineHeight: 1.8,
              marginBottom: 38,
              minHeight: 56,
              maxWidth: 540,
            }}
          >
            {subText}
            <span className="sk-cursor" style={{ marginLeft: 2, opacity: 0.7 }}>|</span>
          </p>

          {/* CTA buttons */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 14, marginBottom: 32 }}>
            <Link href="/doctors">
              <button className="sk-btn-primary">Find a Doctor →</button>
            </Link>
            <Link href="/hospitals">
              <button className="sk-btn-outline-white">Our 9 Hospitals</button>
            </Link>
          </div>

          {/* Micro trust pills */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
       {["NABH Accredited", "Robotic Surgery", "7 Cath Labs", "24/7 ER", "ISO 9001:2015"].map((t) => (
                     <span
                       key={t}
                       className="sk-pill"
                       style={{ color: "rgba(255,255,255,0.38)", background: "rgba(255,255,255,0.03)", borderColor: "rgba(255,255,255,0.1)" }}
                     >
                       {t}
                     </span>
                   ))}
                 </div>
               </div>
       
               {/* ── Stats bar pinned at bottom ── */}
               <div
                 ref={statsRef}
                 style={{
                   position: "absolute",
                   bottom: 0,
                   left: "50%",
                   transform: "translateX(-50%)",
                   zIndex: 20,
                   width: "88%",
                   maxWidth: 940,
                 }}
               >
                 <div
                   style={{
                     display: "flex",
                     alignItems: "center",
                     justifyContent: "space-around",
                     padding: "18px 36px",
                     borderRadius: "24px 24px 0 0",
                     background: "rgba(11,31,58,0.9)",
                     backdropFilter: "blur(18px)",
                     borderTop: "1px solid rgba(184,16,63,0.22)",
                     borderLeft: "1px solid rgba(184,16,63,0.1)",
                     borderRight: "1px solid rgba(184,16,63,0.1)",
                   }}
                 >
                   {STATS.map((s, i) => (
                     <div key={s.label} style={{ display: "flex", alignItems: "center" }}>
                       {i > 0 && (
                         <div
                           style={{
                             width: 1,
                             height: 36,
                             background: "rgba(255,255,255,0.07)",
                             marginRight: 0,
                           }}
                         />
                       )}
                       <div style={{ paddingLeft: i > 0 ? 24 : 0 }}>
                         <StatItem {...s} start={statsVis} />
                       </div>
                     </div>
                   ))}
                 </div>
               </div>
       
               {/* ── Slide indicator dots (mobile) ── */}
               <div
                 style={{
                   position: "absolute",
                   bottom: 90,
                   right: 22,
                   display: "flex",
                   gap: 6,
                   zIndex: 20,
                 }}
               >
                 {SLIDES.map((_, idx) => (
                   <button
                     key={idx}
                     onClick={() => goTo(idx)}
                     style={{
                       height: 6,
                       width: idx === slide ? 22 : 6,
                       borderRadius: 3,
                       background: idx === slide ? "#B8103F" : "rgba(255,255,255,0.3)",
                       border: "none",
                       cursor: "pointer",
                       padding: 0,
                       transition: "all 0.3s",
                     }}
                   />
                 ))}
               </div>
             </section>
       
             {/* ═══════════════════════════════════════════════════
                 §2  TRUST MARQUEE
             ═══════════════════════════════════════════════════ */}
             <section style={{ background: "#0B1F3A", padding: "14px 0", overflow: "hidden" }}>
               <div className="sk-marquee-track">
                 {[...Array(2)].map((_, ri) =>
                   [
                     "🏆 NABH Accredited",
                     "🤖 No.1 Robotic Centre",
                     "💓 7 Cardiac Cath Labs",
                     "🧠 24/7 Neuro Critical Care",
                     "⚡ 6 Laser Urology Centers",
                     "🦴 First Robotic Knee India",
                     "🏥 9 Hospitals · TS & AP",
                     "✅ ISO 9001:2015",
                     "❤️ 25+ Years of Excellence",
                   ].map((item) => (
                     <span
                       key={`${ri}-${item}`}
                       style={{
                         display: "inline-flex",
                         alignItems: "center",
                         gap: 10,
                         marginRight: 56,
                         fontSize: 10,
                         fontWeight: 800,
                         letterSpacing: "0.2em",
                         textTransform: "uppercase",
                         color: "rgba(255,255,255,0.62)",
                         whiteSpace: "nowrap",
                       }}
                     >
                       {item}
                       <span
                         style={{
                           width: 4,
                           height: 4,
                           borderRadius: "50%",
                           background: "#B8103F",
                           flexShrink: 0,
                         }}
                       />
                     </span>
                   ))
                 )}
               </div>
             </section>
       
             {/* ═══════════════════════════════════════════════════
                 §3  ABOUT / INTRO
             ═══════════════════════════════════════════════════ */}
             <section ref={aboutRef} style={{ padding: "100px 8vw", background: "#fff" }}>
               <div
                 className={`sk-fade ${aboutVis ? "visible" : "hidden"}`}
                 style={{
                   maxWidth: 1300,
                   margin: "0 auto",
                   display: "grid",
                   gridTemplateColumns: "1fr 1fr",
                   gap: 72,
                   alignItems: "center",
                 }}
               >
                 {/* ── Left: text ── */}
                 <div>
                   <span className="sk-label">Welcome to Srikara</span>
                   <h2 className="sk-h2" style={{ marginBottom: 20 }}>
                     Dedicated to Providing
                     <br />
                     <em>Quality Care for Every Patient</em>
                   </h2>
                   <p
                     style={{
                       fontSize: 14,
                       color: "#6B7280",
                       lineHeight: 1.92,
                       marginBottom: 16,
                     }}
                   >
                     For over 25 years, Srikara Hospitals has been the cornerstone of
                     healthcare excellence across Telangana and Andhra Pradesh. Our
                     guiding philosophy —&nbsp;
                     <strong style={{ color: "#0B1F3A" }}>Serving Patients is Serving God</strong>
                     &nbsp;— shapes every interaction, every procedure, every outcome.
                   </p>
                   <p
                     style={{
                       fontSize: 14,
                       color: "#6B7280",
                       lineHeight: 1.92,
                       marginBottom: 30,
                     }}
                   >
                     With 9 hospitals, 300+ specialists and India's first robotic
                     surgery centre, we combine the finest medical technology with
                     genuinely compassionate human care.
                   </p>
       
                   {[
                     "India's First Robotic Surgery Centre",
                     "NABH Accredited — multiple campuses",
                     "7 Cardiac Cath Labs · 24/7 Trauma Ready",
                   ].map((point) => (
                     <div
                       key={point}
                       style={{
                         display: "flex",
                         alignItems: "center",
                         gap: 13,
                         marginBottom: 13,
                       }}
                     >
                       <div
                         style={{
                           width: 22,
                           height: 22,
                           borderRadius: "50%",
                           background: "rgba(184,16,63,0.1)",
                           display: "flex",
                           alignItems: "center",
                           justifyContent: "center",
                           flexShrink: 0,
                         }}
                       >
                         <div
                           style={{
                             width: 6,
                             height: 6,
                             borderRadius: "50%",
                             background: "#B8103F",
                           }}
                         />
                       </div>
                       <span style={{ fontSize: 13, color: "#374151", fontWeight: 500 }}>
                         {point}
                       </span>
                     </div>
                   ))}
       
                   <div
                     style={{
                       display: "flex",
                       gap: 18,
                       marginTop: 34,
                       alignItems: "center",
                     }}
                   >
                     <button className="sk-btn-primary">Learn More</button>
                     <a
                       href="tel:+914023456789"
                       style={{
                         fontSize: 13,
                         fontWeight: 700,
                         color: "#0B1F3A",
                         display: "flex",
                         alignItems: "center",
                         gap: 6,
                       }}
                     >
                       📞 040-2345-6789
                     </a>
                   </div>
                 </div>
       
                 {/* ── Right: image collage ── */}
                 <div
                   style={{
                     display: "grid",
                     gridTemplateColumns: "1fr 1fr",
                     gridTemplateRows: "220px 220px",
                     gap: 12,
                   }}
                 >
                   {/* Tall left image */}
                   <div
                     className="sk-img-wrap"
                     style={{
                       gridRow: "1 / 3",
                       borderRadius: 26,
                       overflow: "hidden",
                       position: "relative",
                     }}
                   >
                     <img
                       src="https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=600&q=88&auto=format&fit=crop"
                       alt="Robotic Surgery"
                       style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                     />
                     <div
                       style={{
                         position: "absolute",
                         inset: 0,
                         background:
                           "linear-gradient(to top, rgba(11,31,58,0.65) 0%, transparent 55%)",
                       }}
                     />
                     <div style={{ position: "absolute", bottom: 16, left: 16 }}>
                       <span className="sk-pill" style={{ background: "rgba(184,16,63,0.85)", borderColor: "transparent" }}>
                         Robotic Surgery
                       </span>
                     </div>
                   </div>
       
                   {/* Top-right image */}
                   <div
                     className="sk-img-wrap"
                     style={{ borderRadius: 26, overflow: "hidden", position: "relative" }}
                   >
                     <img
                       src="/Akhildadi.jpg"
                       alt="Doctor with patient"
                       style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                     />
                   </div>
       
                   {/* Bottom-right image + satisfaction badge */}
                   <div
                     className="sk-img-wrap"
                     style={{ borderRadius: 26, overflow: "hidden", position: "relative" }}
                   >
                     <img
                       src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=500&q=88&auto=format&fit=crop"
                       alt="Health Checkup"
                       style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                     />
                     <div
                       style={{
                         position: "absolute",
                         top: 12,
                         right: 12,
                         background: "#0D7A6B",
                         borderRadius: 14,
                         padding: "9px 14px",
                         textAlign: "center",
                       }}
                     >
                       <div
                         style={{
                           fontFamily: "'Cormorant Garamond', Georgia, serif",
                           fontSize: 20,
                           fontWeight: 700,
                           color: "#fff",
                           lineHeight: 1,
                         }}
                       >
                         98%
                       </div>
                       <div
                         style={{
                           fontSize: 7,
                           color: "rgba(255,255,255,0.75)",
                           fontWeight: 700,
                           textTransform: "uppercase",
                           letterSpacing: "0.1em",
                         }}
                       >
                         Satisfaction
                       </div>
                     </div>
                   </div>
                 </div>
               </div>
       
               {/* ── Mini stat cards row ── */}
               <div
                 style={{
                   maxWidth: 1300,
                   margin: "60px auto 0",
                   display: "grid",
                   gridTemplateColumns: "repeat(4, 1fr)",
                   gap: 20,
                 }}
               >
                 {[
                   { n: "500+", lbl: "Consultations / month", icon: "🩺", c: "#B8103F" },
                   { n: "25+",  lbl: "Years of Excellence",   icon: "🏆", c: "#0B1F3A" },
                   { n: "9",    lbl: "Hospitals Across TS & AP", icon: "🏥", c: "#0D7A6B" },
                   { n: "300+", lbl: "Expert Specialists",    icon: "👨‍⚕️", c: "#C9933A" },
                 ].map((s) => (
                   <div
                     key={s.lbl}
                     className="sk-card"
                     style={{
                       background: "#F9F7F4",
                       borderRadius: 20,
                       padding: "28px 22px",
                       textAlign: "center",
                       border: "1px solid #EDE8EC",
                     }}
                   >
                     <div style={{ fontSize: 28, marginBottom: 10 }}>{s.icon}</div>
                     <div
                       style={{
                         fontFamily: "'Cormorant Garamond', Georgia, serif",
                         fontSize: 36,
                         fontWeight: 700,
                         color: s.c,
                         lineHeight: 1,
                         marginBottom: 6,
                       }}
                     >
                       {s.n}
                     </div>
                     <div style={{ fontSize: 11, color: "#6B7280", fontWeight: 500, lineHeight: 1.4 }}>
                       {s.lbl}
                     </div>
                   </div>
                 ))}
               </div>
             </section>
       
             {/* ═══════════════════════════════════════════════════
                 §4  QUICK SERVICE TILES  (like reference site)
             ═══════════════════════════════════════════════════ */}
             <section ref={tilesRef} style={{ background: "#0B1F3A", padding: "40px 0" }}>
  <div
    className={`sk-fade ${tilesVis ? "visible" : "hidden"}`}
    style={{ maxWidth: 1300, margin: "0 auto", padding: "0 6vw" }}
  >
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(5, 1fr)",
        gap: 12
      }}
    >
      {QUICK_TILES.map((tile, i) => (
        <div
          key={tile.label}
          style={{
            position: "relative",
            overflow: "hidden",
            cursor: "pointer",
            borderRadius: 16,
            height: 220,
            transition: "all 0.35s ease",
            boxShadow: "0 10px 30px rgba(0,0,0,0.25)"
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-8px) scale(1.02)";
            e.currentTarget.style.boxShadow = "0 25px 60px rgba(0,0,0,0.35)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0) scale(1)";
            e.currentTarget.style.boxShadow = "0 10px 30px rgba(0,0,0,0.25)";
          }}
        >
          {/* IMAGE */}
          <img
            src={tile.img}
            alt={tile.label}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              transition: "transform 0.6s ease"
            }}
            className="tile-img"
          />

          {/* DARK GRADIENT */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(to top, rgba(11,31,58,0.95) 0%, rgba(11,31,58,0.4) 60%, transparent 100%)"
            }}
          />

          {/* HOVER OVERLAY */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(120deg, rgba(236,72,153,0.25), rgba(59,130,246,0.25))",
              opacity: 0,
              transition: "opacity 0.4s ease"
            }}
            className="tile-overlay"
          />

          {/* TEXT */}
          <div
            style={{
              position: "absolute",
              bottom: 18,
              left: 18,
              right: 18,
              zIndex: 2,
              backdropFilter: "blur(6px)",
              background: "rgba(255,255,255,0.06)",
              padding: "10px 12px",
              borderRadius: 10,
              border: "1px solid rgba(255,255,255,0.1)"
            }}
          >
            <div
              style={{
                fontSize: 13,
                fontWeight: 700,
                color: "#fff",
                marginBottom: 4,
                fontFamily: "'Outfit', sans-serif"
              }}
            >
              {tile.label}
            </div>

            <div
              style={{
                fontSize: 10,
                color: "rgba(255,255,255,0.65)",
                fontWeight: 600,
                letterSpacing: "0.08em",
                textTransform: "uppercase"
              }}
            >
              {tile.sub}
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>
       
             {/* ═══════════════════════════════════════════════════
                 §5  DEPARTMENTS
             ═══════════════════════════════════════════════════ */}
             <section ref={deptRef} style={{ padding: "100px 8vw", background: "#F9F7F4" }}>
               <div
                 className={`sk-fade ${deptVis ? "visible" : "hidden"}`}
                 style={{ maxWidth: 1300, margin: "0 auto" }}
               >
                 <div style={{ textAlign: "center", marginBottom: 44 }}>
                   <span className="sk-label" style={{ display: "block", textAlign: "center" }}>
                     What We Offer
                   </span>
                   <h2 className="sk-h2">
                     Centre of <em>Excellence</em>
                   </h2>
                   <p
                     style={{
                       fontSize: 14,
                       color: "#6B7280",
                       marginTop: 12,
                       maxWidth: 500,
                       margin: "12px auto 0",
                       lineHeight: 1.8,
                     }}
                   >
                     World-class care across 42 disciplines — from robotic surgery to
                     cardiac care, all under one roof.
                   </p>
                 </div>
       
                 {/* Tab switcher */}
                 <div
                   style={{
                     display: "flex",
                     justifyContent: "center",
                     gap: 10,
                     marginBottom: 40,
                   }}
                 >
                   {["Excellence", "Transplants", "Technologies"].map((t) => (
                     <button
                       key={t}
                       className={`sk-tab ${deptTab === t ? "active" : "inactive"}`}
                       onClick={() => setDeptTab(t)}
                     >
                       {t}
                     </button>
                   ))}
                 </div>
       
                 {/* Department grid */}
                 <div
                   style={{
                     display: "grid",
                     gridTemplateColumns: "repeat(4, 1fr)",
                     gap: 20,
                   }}
                 >
                   {deptList.map((dept:any, i:number) => {
                     const name  = dept.shortName || dept.name;
                     const tag   = dept.tagline;
                     const count = dept.procedures?.length ?? dept.count ?? 0;
                     const img   = dept.img || DEPT_FALLBACK[i % DEPT_FALLBACK.length]?.img;
                     const icon  = dept.icon || DEPT_FALLBACK[i % DEPT_FALLBACK.length]?.icon;
                     const href  = dept.slug ? `/departments/${dept.slug}` : "#";
                     return (
                       <Link key={name} href={href}>
                         <div
                           className="sk-card"
                           style={{
                             background: "#fff",
                             borderRadius: 24,
                             overflow: "hidden",
                             border: "1px solid #EDE8EC",
                             cursor: "pointer",
                           }}
                         >
                           {/* Card photo */}
                           <div
                             className="sk-img-wrap"
                             style={{ height: 158, position: "relative", overflow: "hidden" }}
                           >
                             <img
                               src={img}
                               alt={name}
                               style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                             />
                             <div
                               style={{
                                 position: "absolute",
                                 inset: 0,
                                 background:
                                   "linear-gradient(to top, rgba(11,31,58,0.68) 0%, transparent 52%)",
                               }}
                             />
                             <div
                               style={{
                                 position: "absolute",
                                 top: 12,
                                 left: 12,
                                 fontSize: 24,
                               }}
                             >
                               {icon}
                             </div>
                           </div>
                           {/* Card text */}
                           <div style={{ padding: "16px 18px 14px" }}>
                             <h3
                               style={{
                                 fontFamily: "'Cormorant Garamond', Georgia, serif",
                                 fontSize: 16,
                                 fontWeight: 700,
                                 color: "#0B1F3A",
                                 marginBottom: 4,
                               }}
                             >
                               {name}
                             </h3>
                             <p
                               style={{ fontSize: 11, color: "#9CA3AF", marginBottom: 12 }}
                             >
                               {tag}
                             </p>
                             <div
                               style={{
                                 display: "flex",
                                 alignItems: "center",
                                 justifyContent: "space-between",
                                 borderTop: "1px solid #F3F4F6",
                                 paddingTop: 10,
                               }}
                             >
                               <span
                                 style={{
                                   fontSize: 9,
                                   fontWeight: 800,
                                   color: "#9CA3AF",
                                   textTransform: "uppercase",
                                   letterSpacing: "0.14em",
                                 }}
                               >
                                 {count} procedures
                               </span>
                               <span style={{ color: "#B8103F", fontSize: 15 }}>→</span>
                             </div>
                           </div>
                         </div>
                       </Link>
                     );
                   })}
                 </div>
       
                 <div style={{ textAlign: "center", marginTop: 38 }}>
                   <Link href="/departments">
                     <button className="sk-btn-outline">View All Specialties →</button>
                   </Link>
                 </div>
               </div>
             </section>
       
             {/* ═══════════════════════════════════════════════════
                 §6  CENTRE OF EXCELLENCE  — alternating panels
             ═══════════════════════════════════════════════════ */}
             <section ref={exRef} style={{ background: "#fff" }}>
               <div
                 className={`sk-fade ${exVis ? "visible" : "hidden"}`}
                 style={{ maxWidth: 1300, margin: "0 auto", padding: "80px 8vw 0" }}
               >
                 <span className="sk-label" style={{ display: "block", textAlign: "center" }}>
                   Centers of Excellence
                 </span>
                 <h2
                   className="sk-h2"
                   style={{ textAlign: "center", marginBottom: 56 }}
                 >
                   Comprehensive Care Across&nbsp;
                   <em>42 Disciplines</em>
                 </h2>
               </div>
       
               {EXCELLENCE_PANELS.map((panel, i) => {
                 const textBlock = (
                   <div
                     style={{
                       padding: "64px 6vw",
                       background: i % 2 === 0 ? "#F9F7F4" : "#fff",
                       display: "flex",
                       flexDirection: "column",
                       justifyContent: "center",
                     }}
                   >
                     <span className="sk-label">Centre of Excellence</span>
                     <h3
                       style={{
                         fontFamily: "'Cormorant Garamond', Georgia, serif",
                         fontSize: 32,
                         fontWeight: 700,
                         color: "#0B1F3A",
                         lineHeight: 1.2,
                         marginBottom: 16,
                       }}
                     >
                       {panel.title}
                     </h3>
                     <p
                       style={{
                         fontSize: 14,
                         color: "#6B7280",
                         lineHeight: 1.9,
                         marginBottom: 28,
                       }}
                     >
                       {panel.sub}
                     </p>
                     <a
                       href="#"
                       style={{
                         display: "inline-flex",
                         alignItems: "center",
                         gap: 8,
                         fontSize: 12,
                         fontWeight: 800,
                         color: "#B8103F",
                         letterSpacing: "0.06em",
                         textTransform: "uppercase",
                       }}
                     >
                       Learn More →
                     </a>
                   </div>
                 );
       
                 const imgBlock = (
                   <div
                     className="sk-img-wrap"
                     style={{ height: 390, overflow: "hidden" }}
                   >
                     <img
                       src={panel.img}
                       alt={panel.title}
                       style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                     />
                   </div>
                 );
       
                 return (
                   <div
                     key={panel.title}
                     style={{
                       display: "grid",
                       gridTemplateColumns: "1fr 1fr",
                       marginBottom: 3,
                     }}
                   >
                     {panel.reverse
                       ? <>{textBlock}{imgBlock}</>
                       : <>{imgBlock}{textBlock}</>}
                   </div>
                 );
               })}
             </section>
       
             {/* ═══════════════════════════════════════════════════
                 §7  HOSPITALS
             ═══════════════════════════════════════════════════ */}
             <section ref={hospRef} style={{ padding: "100px 8vw", background: "#F9F7F4" }}>
               <div
                 className={`sk-fade ${hospVis ? "visible" : "hidden"}`}
                 style={{ maxWidth: 1300, margin: "0 auto" }}
               >
                 <div
                   style={{
                     display: "flex",
                     alignItems: "flex-end",
                     justifyContent: "space-between",
                     marginBottom: 44,
                     flexWrap: "wrap",
                     gap: 16,
                   }}
                 >
                   <div>
                     <span className="sk-label">Our Presence</span>
                     <h2 className="sk-h2">
                       Regional <em>Healthcare Network</em>
                     </h2>
                   </div>
                   <Link href="/hospitals">
                     <button className="sk-btn-outline">Explore All →</button>
                   </Link>
                 </div>
       
                 <div
                   style={{
                     display: "grid",
                     gridTemplateColumns: "repeat(3, 1fr)",
                     gap: 24,
                   }}
                 >
                   {hospList.map((hosp:any, i:number) => {
                     const img  = hosp.img || HOSP_FALLBACK[i % HOSP_FALLBACK.length]?.img;
                     const tag  = hosp.tags?.[0] ?? "Hospital";
                     const loc  = hosp.location ?? hosp.loc;
                     const nabh = hosp.tags?.includes("NABH") ?? false;
                     return (
                       <Link key={hosp.slug ?? hosp.name} href={hosp.slug ? `/hospitals/${hosp.slug}` : "#"}>
                         <div
                           className="sk-card"
                           style={{
                             background: "#fff",
                             borderRadius: 26,
                             overflow: "hidden",
                             border: "1px solid #EDE8EC",
                             cursor: "pointer",
                           }}
                         >
                           <div
                             className="sk-img-wrap"
                             style={{ height: 180, position: "relative", overflow: "hidden" }}
                           >
                             <img
                               src={img}
                               alt={hosp.name}
                               style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                             />
                             <div
                               style={{
                                 position: "absolute",
                                 inset: 0,
                                 background:
                                   "linear-gradient(to top, rgba(11,31,58,0.7) 0%, transparent 55%)",
                               }}
                             />
                             <div style={{ position: "absolute", top: 14, right: 14 }}>
                               <span className="sk-pill">{tag}</span>
                             </div>
                             <div style={{ position: "absolute", bottom: 12, left: 16 }}>
                               <span style={{ fontSize: 10, color: "rgba(255,255,255,0.72)" }}>
                                 📍 {loc}
                               </span>
                             </div>
                           </div>
                           <div style={{ padding: "20px 20px 16px" }}>
                             <h3
                               style={{
                                 fontFamily: "'Cormorant Garamond', Georgia, serif",
                                 fontSize: 17,
                                 fontWeight: 700,
                                 color: "#0B1F3A",
                                 marginBottom: 12,
                               }}
                             >
                               {hosp.name}
                             </h3>
                             <div
                               style={{
                                 display: "flex",
                                 alignItems: "center",
                                 justifyContent: "space-between",
                                 borderTop: "1px solid #F3F4F6",
                                 paddingTop: 13,
                               }}
                             >
                               <div style={{ display: "flex", gap: 20 }}>
                                 <div>
                                   <div
                                     style={{
                                       fontSize: 8,
                                       fontWeight: 800,
                                       textTransform: "uppercase",
                                       letterSpacing: "0.14em",
                                       color: "#9CA3AF",
                                       marginBottom: 2,
                                     }}
                                   >
                                     Capacity
                                   </div>
                                   <div
                                     style={{
                                       fontSize: 18,
                                       fontWeight: 800,
                                       color: "#0D7A6B",
                                       fontFamily: "'Cormorant Garamond', Georgia, serif",
                                     }}
                                   >
                                     {hosp.beds} Beds
                                   </div>
                                 </div>
                                 {nabh && (
                                   <div
                                     style={{
                                       borderLeft: "1px solid #EDE8EC",
                                       paddingLeft: 18,
                                     }}
                                   >
                                     <div
                                       style={{
                                         fontSize: 8,
                                         fontWeight: 800,
                                         textTransform: "uppercase",
                                         letterSpacing: "0.14em",
                                         color: "#9CA3AF",
                                         marginBottom: 2,
                                       }}
                                     >
                                       Quality
                                     </div>
                                     <div
                                       style={{
                                         fontSize: 15,
                                         fontWeight: 800,
                                         color: "#B8103F",
                                       }}
                                     >
                                       NABH ✓
                                     </div>
                                   </div>
                                 )}
                               </div>
                               <div
                                 style={{
                                   width: 38,
                                   height: 38,
                                   borderRadius: "50%",
                                   background: "#F9F7F4",
                                   display: "flex",
                                   alignItems: "center",
                                   justifyContent: "center",
                                   fontSize: 15,
                                   transition: "background 0.22s",
                                   cursor: "pointer",
                                 }}
                                 onMouseEnter={(e) => (e.currentTarget.style.background = "#0B1F3A")}
                                 onMouseLeave={(e) => (e.currentTarget.style.background = "#F9F7F4")}
                               >
                                 →
                               </div>
                             </div>
                           </div>
                         </div>
                       </Link>
                     );
                   })}
                 </div>
               </div>
             </section>
       
             {/* ═══════════════════════════════════════════════════
                 §8  DOCTORS  —  "Healing Hands"
                      Left side: info cards (plain)
                      Right side: doctor image background reveals on hover
             ═══════════════════════════════════════════════════ */}
             <section ref={docRef} style={{ padding: "100px 0", background: "#fff", overflow: "hidden" }}>
               <div
                 className={`sk-fade ${docVis ? "visible" : "hidden"}`}
                 style={{ maxWidth: "100%",  padding: "0 16px" }}
               >
                 {/* Header */}
                 <div style={{ textAlign: "center", marginBottom: 52 }}>
                   <span className="sk-label" style={{ display: "block", textAlign: "center" }}>
                     The Specialists
                   </span>
                   <h2 className="sk-h2">
                     Healing Hands, <em>Expert Minds</em>
                   </h2>
                   <p
                     style={{
                       fontSize: 14,
                       color: "#6B7280",
                       marginTop: 12,
                       maxWidth: 460,
                       margin: "12px auto 0",
                       lineHeight: 1.8,
                     }}
                   >
                     300+ internationally recognised professionals, each dedicated to
                     your recovery and long-term wellbeing.
                   </p>
                 </div>
       
                 {/* ── Two-column layout ──
                     Left  (5 cols): decorative big doctor photo panel
                     Right (7 cols): doctor cards grid with hover bg images  */}
                 <div
                   style={{
                     display: "grid",
                     gridTemplateColumns: "5fr 7fr",
                     gap: 32,
                     alignItems: "start",
                   }}
                 >
                   {/* ── LEFT: large decorative doctor photo ── */}
                   <div
                     style={{
                       position: "sticky",
                       top: 100,
                       borderRadius: 28,
                       overflow: "hidden",
                       height: 520,
                     }}
                   >
                     <img
                       src="/Akhildadi.jpg"
                       alt="Expert doctors at Srikara"
                       style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                     />
                     <div
                       style={{
                         position: "absolute",
                         inset: 0,
                         background:
                           "linear-gradient(to top, rgba(11,31,58,0.82) 0%, rgba(11,31,58,0.25) 55%, transparent 100%)",
                       }}
                     />
                     {/* Overlay text */}
                     <div
                       style={{
                         position: "absolute",
                         bottom: 32,
                         left: 28,
                         right: 28,
                       }}
                     >
                       <div
                         style={{
                           fontSize: 10,
                           fontWeight: 800,
                           letterSpacing: "0.3em",
                           textTransform: "uppercase",
                           color: "#fca5a5",
                           marginBottom: 8,
                         }}
                       >
                         Trusted by 500 + families monthly
                       </div>
                       <div
                         style={{
                           fontFamily: "'Cormorant Garamond', Georgia, serif",
                           fontSize: 26,
                           fontWeight: 700,
                           color: "#fff",
                           lineHeight: 1.2,
                           marginBottom: 16,
                         }}
                       >
                         Every doctor here is a specialist in their field — and in compassion.
                       </div>
                       <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                         {["300+ Specialists", "NABH Certified", "25+ Years"].map((b) => (
                           <span
                             key={b}
                             className="sk-pill"
                             style={{
                               fontSize: 9,
                               background: "rgba(184,16,63,0.2)",
                               borderColor: "rgba(184,16,63,0.35)",
                             }}
                           >
                             {b}
                           </span>
                         ))}
                       </div>
                     </div>
                   </div>
       
                   {/* ── RIGHT: doctor cards — each has a real doctor bg image on hover ── */}
                   <div
                     style={{
                       display: "grid",
                       gridTemplateColumns: "repeat(2, 1fr)",
                       gap: 18,
                     }}
                   >
                     {docList.map((doc, i) => (
                       <DoctorCard
                         key={doc.id}
                         doc={doc}
                         bgImage={DOCTOR_BG_IMAGES[i % DOCTOR_BG_IMAGES.length]}
                         index={i}
                       />
                     ))}
                   </div>
                 </div>
       
                 <div style={{ textAlign: "center", marginTop: 48 }}>
                   <Link href="/doctors">
                     <button className="sk-btn-outline">View All 300+ Specialists →</button>
                   </Link>
                 </div>
               </div>
             </section>
       
             {/* ═══════════════════════════════════════════════════
                 §9  APPOINTMENT  — full-bleed split
             ═══════════════════════════════════════════════════ */}
             <section style={{ display: "grid", gridTemplateColumns: "1fr 1fr", minHeight: 580 }}>
               {/* Left — doctor photo */}
               <div
                 className="sk-img-wrap"
                 style={{ position: "relative", overflow: "hidden" }}
               >
                 <img
                   src="/callingsection.jpg"
                   alt="Book Appointment"
                   style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                 />
                 <div
                   style={{
                     position: "absolute",
                     inset: 0,
                     background: "linear-gradient(to right, transparent 55%, rgba(11,31,58,0.55))",
                   }}
                 />
                 {/* Rating float */}
                 <div
                   style={{
                     position: "absolute",
                     top: "50%",
                     left: 32,
                     transform: "translateY(-50%)",
                   }}
                 >
                   <div
                     style={{
                       background: "rgba(184,16,63,0.88)",
                       borderRadius: 18,
                       padding: "20px 24px",
                       backdropFilter: "blur(8px)",
                     }}
                   >
                     <div
                       style={{
                         fontFamily: "'Cormorant Garamond', Georgia, serif",
                         fontSize: 26,
                         fontWeight: 700,
                         color: "#fff",
                         lineHeight: 1,
                       }}
                     >
                       4.9 ⭐
                     </div>
                     <div
                       style={{
                         fontSize: 9,
                         color: "rgba(255,255,255,0.72)",
                         fontWeight: 700,
                         textTransform: "uppercase",
                         letterSpacing: "0.15em",
                         marginTop: 5,
                       }}
                     >
                       Patient Rating
                     </div>
                   </div>
                 </div>
               </div>
       
               {/* Right — booking form */}
               <div
                 style={{
                   background: "#0B1F3A",
                   padding: "70px 52px",
                   display: "flex",
                   flexDirection: "column",
                   justifyContent: "center",
                 }}
               >
                 <span className="sk-label" style={{ color: "#B8103F" }}>
                   Appointment
                 </span>
                 <h2
                   style={{
                     fontFamily: "'Cormorant Garamond', Georgia, serif",
                     fontSize: 34,
                     fontWeight: 700,
                     color: "#fff",
                     lineHeight: 1.2,
                     marginBottom: 12,
                   }}
                 >
                   Schedule Your Care
                   <br />
                   <em style={{ color: "#0D7A6B", fontStyle: "italic", fontWeight: 400 }}>
                     with Our Experts
                   </em>
                 </h2>
                 <p
                   style={{
                     fontSize: 13,
                     color: "rgba(255,255,255,0.42)",
                     marginBottom: 32,
                     lineHeight: 1.8,
                   }}
                 >
                   Same-day appointments available. Emergency walk-ins welcome 24/7
                   across all 9 hospitals.
                 </p>
       
                 <div style={{ display: "flex", flexDirection: "column", gap: 13 }}>
                   {[
                     { ph: "Your Full Name",   type: "text",  key: "name"  },
                     { ph: "Phone Number",     type: "tel",   key: "phone" },
                     { ph: "Email Address",    type: "email", key: "email" },
                   ].map((f) => (
                     <input
                       key={f.key}
                       type={f.type}
                       placeholder={f.ph}
                       value={(apptForm as any)[f.key]}
                       onChange={(e) =>
                         setApptForm((prev) => ({ ...prev, [f.key]: e.target.value }))
                       }
                       style={{
                         background: "rgba(255,255,255,0.06)",
                         border: "1px solid rgba(255,255,255,0.1)",
                         borderRadius: 14,
                         padding: "13px 17px",
                         color: "#fff",
                         fontSize: 13,
                         width: "100%",
                       }}
                     />
                   ))}
                   <select
                     value={apptForm.dept}
                     onChange={(e) =>
                       setApptForm((prev) => ({ ...prev, dept: e.target.value }))
                     }
                     style={{
                       background: "rgba(255,255,255,0.06)",
                       border: "1px solid rgba(255,255,255,0.1)",
                       borderRadius: 14,
                       padding: "13px 17px",
                       color: apptForm.dept ? "#fff" : "rgba(255,255,255,0.38)",
                       fontSize: 13,
                       width: "100%",
                     }}
                   >
                     <option value="" disabled>
                       Select Department
                     </option>
                     {deptList.map((d:any) => (
                       <option
                         key={d.name || d.shortName}
                         value={d.name || d.shortName}
                         style={{ background: "#0B1F3A" }}
                       >
                         {d.shortName || d.name}
                       </option>
                     ))}
                   </select>
                   <button
                     className="sk-btn-primary"
                     style={{ width: "100%", justifyContent: "center", padding: "16px", fontSize: 12, marginTop: 4 }}
                   >
                     Book Appointment →
                   </button>
                 </div>
               </div>
             </section>
       
             {/* ═══════════════════════════════════════════════════
                 §10  TESTIMONIALS
             ═══════════════════════════════════════════════════ */}
             <section ref={testRef} style={{ padding: "100px 8vw", background: "#F9F7F4" }}>
               <div
                 className={`sk-fade ${testVis ? "visible" : "hidden"}`}
                 style={{ maxWidth: 1300, margin: "0 auto" }}
               >
                 <div style={{ textAlign: "center", marginBottom: 46 }}>
                   <span className="sk-label" style={{ display: "block", textAlign: "center" }}>
                     Patient Stories
                   </span>
                   <h2 className="sk-h2">
                     Lives We've <em>Touched</em>
                   </h2>
                 </div>
       
                 <div
                   style={{
                     display: "grid",
                     gridTemplateColumns: "repeat(3, 1fr)",
                     gap: 24,
                   }}
                 >
                   {TESTIMONIALS.map((t) => (
                     <div
                       key={t.name}
                       className="sk-card"
                       style={{
                         background: "#fff",
                         borderRadius: 24,
                         padding: "30px 28px",
                         border: "1px solid #EDE8EC",
                       }}
                     >
                       <div style={{ display: "flex", gap: 3, marginBottom: 18 }}>
                         {[...Array(t.stars)].map((_, si) => (
                           <span key={si} style={{ color: "#C9933A", fontSize: 13 }}>
                             ★
                           </span>
                         ))}
                       </div>
                       <p
                         style={{
                           color: "#374151",
                           lineHeight: 1.85,
                           marginBottom: 24,
                           fontStyle: "italic",
                           fontFamily: "'Cormorant Garamond', Georgia, serif",
                           fontSize: 16,
                         }}
                       >
                         "{t.text}"
                       </p>
                       <div
                         style={{
                           display: "flex",
                           alignItems: "center",
                           gap: 14,
                           borderTop: "1px solid #F3F4F6",
                           paddingTop: 20,
                         }}
                       >
                         <div
                           style={{
                             width: 44,
                             height: 44,
                             borderRadius: "50%",
                             background: "linear-gradient(135deg, #B8103F, #0B1F3A)",
                             display: "flex",
                             alignItems: "center",
                             justifyContent: "center",
                             fontSize: 12,
                             fontWeight: 800,
                             color: "#fff",
                             flexShrink: 0,
                           }}
                         >
                           {t.av}
                         </div>
                         <div>
                           <div
                             style={{
                               fontSize: 13,
                               fontWeight: 700,
                               color: "#0B1F3A",
                             }}
                           >
                             {t.name}
                           </div>
                           <div style={{ fontSize: 10, color: "#9CA3AF" }}>
                             📍 {t.loc}
                           </div>
                         </div>
                       </div>
                     </div>
                   ))}
                 </div>
               </div>
             </section>
       
             {/* ═══════════════════════════════════════════════════
                 §11  NEWSLETTER
             ═══════════════════════════════════════════════════ */}
             <section
               ref={newsRef}
               style={{
                 margin: "0 5vw 64px",
                 borderRadius: 40,
                 overflow: "hidden",
                 position: "relative",
                 background: "#0B1F3A",
                 padding: "84px 8vw",
               }}
             >
               {/* Ambient glows */}
               <div
                 style={{
                   position: "absolute",
                   top: -90,
                   right: -90,
                   width: 440,
                   height: 440,
                   borderRadius: "50%",
                   background: "#B8103F",
                   opacity: 0.1,
                   filter: "blur(130px)",
                   pointerEvents: "none",
                 }}
               />
               <div
                 style={{
                   position: "absolute",
                   bottom: -80,
                   left: -80,
                   width: 340,
                   height: 340,
                   borderRadius: "50%",
                   background: "#0D7A6B",
                   opacity: 0.09,
                   filter: "blur(110px)",
                   pointerEvents: "none",
                 }}
               />
               {/* Grid texture */}
               <div
                 style={{
                   position: "absolute",
                   inset: 0,
                   opacity: 0.03,
                   backgroundImage:
                     "linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)",
                   backgroundSize: "64px 64px",
                   pointerEvents: "none",
                 }}
               />
       
               <div
                 className={`sk-fade ${newsVis ? "visible" : "hidden"}`}
                 style={{
                   maxWidth: 600,
                   margin: "0 auto",
                   textAlign: "center",
                   position: "relative",
                   zIndex: 10,
                 }}
               >
                 <span
                   className="sk-label"
                   style={{ display: "block", textAlign: "center", color: "#B8103F" }}
                 >
                   Srikara Insights
                 </span>
                 <h2
                   style={{
                     fontFamily: "'Cormorant Garamond', Georgia, serif",
                     fontSize: "clamp(28px, 3.5vw, 42px)",
                     fontWeight: 700,
                     color: "#fff",
                     marginBottom: 14,
                     lineHeight: 1.2,
                   }}
                 >
                   Stay{" "}
                   <em style={{ color: "#B8103F", fontStyle: "italic", fontWeight: 400 }}>
                     Informed.
                   </em>{" "}
                   Stay Healthy.
                 </h2>
                 <p
                   style={{
                     fontSize: 14,
                     color: "rgba(255,255,255,0.42)",
                     marginBottom: 40,
                     lineHeight: 1.85,
                     fontWeight: 300,
                   }}
                 >
                   Monthly health newsletters from our specialists — treatments, prevention
                   tips and updates across all 9 hospitals.
                 </p>
       
                 {subscribed ? (
                   <div
                     style={{
                       padding: 40,
                       borderRadius: 28,
                       border: "1px solid rgba(184,16,63,0.35)",
                       background: "rgba(184,16,63,0.08)",
                     }}
                   >
                     <div style={{ fontSize: 42, marginBottom: 14 }}>✨</div>
                     <p
                       style={{
                         fontFamily: "'Cormorant Garamond', Georgia, serif",
                         fontSize: 23,
                         color: "#fff",
                         fontWeight: 700,
                         marginBottom: 6,
                       }}
                     >
                       Welcome to the community
                     </p>
                     <p style={{ fontSize: 13, color: "#fca5a5" }}>
                       Subscribed to Srikara Health updates.
                     </p>
                   </div>
                 ) : (
                   <div
                     style={{
                       display: "flex",
                       padding: 6,
                       borderRadius: 50,
                       background: "rgba(255,255,255,0.05)",
                       border: "1px solid rgba(255,255,255,0.1)",
                     }}
                   >
                     <input
                       type="email"
                       value={email}
                       onChange={(e) => setEmail(e.target.value)}
                       placeholder="Enter your email address"
                       style={{
                         flex: 1,
                         padding: "14px 22px",
                         background: "transparent",
                         border: "none",
                         color: "#fff",
                         fontSize: 13,
                         fontWeight: 300,
                       }}
                     />
                     <button
                       className="sk-btn-primary"
                       style={{ borderRadius: 50, flexShrink: 0, whiteSpace: "nowrap" }}
                       onClick={() => { if (email) setSubscribed(true); }}
                     >
                       Subscribe
                     </button>
                   </div>
                 )}
       
                 <p
                   style={{
                     fontSize: 9,
                     marginTop: 20,
                     fontWeight: 700,
                     letterSpacing: "0.22em",
                     textTransform: "uppercase",
                     color: "rgba(255,255,255,0.16)",
                   }}
                 >
                   Privacy Guaranteed · No Spam · Unsubscribe Anytime
                 </p>
               </div>
             </section>
           </>
         );
       }
       