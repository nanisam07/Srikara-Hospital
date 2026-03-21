"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  MapPin, Phone, Clock, ChevronRight, ArrowRight,
  Star, Shield, Award, Ambulance, Calendar, Search,
  BedDouble, Users, Stethoscope, Heart,
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

/*
  SRIKARA PALETTE
  Crimson   #C0145C
  Navy      #1C2B4A
  Teal      #0A7A6A
  Cream     #F8F6F9
  Gold      #C9933A
*/

/* ── useInView ── */
function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

/* ── FadeUp wrapper ── */
function FadeUp({
  children,
  delay = 0,
  style = {},
}: {
  children: React.ReactNode;
  delay?: number;
  style?: React.CSSProperties;
}) {
  const { ref, inView } = useInView(0.08);
  return (
    <div
      ref={ref}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(32px)",
        transition: `opacity 0.75s ease ${delay}ms, transform 0.75s ease ${delay}ms`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

/* ═══════════════════════════════════════════
   9 HOSPITAL DATA
═══════════════════════════════════════════ */
const HOSPITALS = [
  {
    id: 1,
    name: "RTC 'X' Roads",
    fullName: "Srikara Hospitals — RTC X Roads",
    location: "RTC X Roads, Hyderabad",
    phone: "040 4646 0000",
    slug: "rtc-x-roads",
    beds: 350,
    tag: "Flagship",
    nabh: true,
    specialty: "Robotic Surgery · Cardiology · Neurology",
    color: "#C0145C",
    accent: "#e8457e",
    hours: "24/7",
    img: "rtc-x-roads.jpeg",
    mapLink: "https://maps.google.com",
    tags: ["NABH", "Flagship", "Robotic"],
    featured: true,
  },
  {
    id: 2,
    name: "Miyapur",
    fullName: "Srikara Hospitals — Miyapur",
    location: "Miyapur X Roads, Hyderabad",
    phone: "040 4747 0000",
    slug: "miyapur",
    beds: 250,
    tag: "NABH",
    nabh: true,
    specialty: "Orthopaedics · Cardiac Care",
    color: "#1C2B4A",
    accent: "#4A6FA5",
    hours: "24/7",
    img: "Miyapur.jpeg",
    mapLink: "https://maps.google.com",
    tags: ["NABH", "ISO 9001"],
    featured: false,
  },
  {
    id: 3,
    name: "LB Nagar",
    fullName: "Srikara Hospitals — LB Nagar",
    location: "LB Nagar, Hyderabad",
    phone: "040 66 000 108",
    slug: "lb-nagar",
    beds: 280,
    tag: "Multi-spec",
    nabh: true,
    specialty: "Oncology · Gastroenterology",
    color: "#0A7A6A",
    accent: "#13a892",
    hours: "24/7",
    img: "Lbnagar.jpeg",
    mapLink: "https://maps.google.com",
    tags: ["NABH", "Cancer Centre"],
    featured: false,
  },
  {
    id: 4,
    name: "Vijayawada",
    fullName: "Srikara Hospitals — Vijayawada",
    location: "Vijayawada, Andhra Pradesh",
    phone: "772 999 0003",
    slug: "vijayawada",
    beds: 320,
    tag: "Cardiac",
    nabh: true,
    specialty: "Cardiac Surgery · Neurosciences",
    color: "#C0145C",
    accent: "#C9933A",
    hours: "24/7",
    img: "Vijayavada.jpeg",
    mapLink: "https://maps.google.com",
    tags: ["NABH", "Cath Lab"],
    featured: true,
  },
  {
    id: 5,
    name: "ECIL",
    fullName: "Srikara Hospitals — ECIL",
    location: "ECIL X Roads, Hyderabad",
    phone: "040 41 108 108",
    slug: "ecil",
    beds: 200,
    tag: "ISO 9001",
    nabh: false,
    specialty: "General Medicine · Urology",
    color: "#4A3D8A",
    accent: "#7B6EC0",
    hours: "24/7",
    img: "/ecil.jpeg",
    mapLink: "https://maps.google.com",
    tags: ["ISO 9001", "24/7 ER"],
    featured: false,
  },
  {
    id: 6,
    name: "Kompally",
    fullName: "Srikara Hospitals — Kompally",
    location: "Kompally, Secunderabad",
    phone: "040 6818 0000",
    slug: "kompally",
    beds: 180,
    tag: "Multi-spec",
    nabh: false,
    specialty: "Pulmonology · Dermatology",
    color: "#1C2B4A",
    accent: "#4A6FA5",
    hours: "24/7",
    img: "kompally.jpeg",
    mapLink: "https://maps.google.com",
    tags: ["Multi-spec", "24/7 ER"],
    featured: false,
  },
  {
    id: 7,
    name: "Peerzadiguda",
    fullName: "Srikara Hospitals — Peerzadiguda",
    location: "Peerzadiguda, Hyderabad",
    phone: "040 68 108 108",
    slug: "peerzadiguda",
    beds: 160,
    tag: "Community",
    nabh: false,
    specialty: "ENT · Physiotherapy · Dental",
    color: "#0A7A6A",
    accent: "#13a892",
    hours: "8am–10pm",
    img: "peerzadiguda.jpeg",
    mapLink: "https://maps.google.com",
    tags: ["Community", "Diagnostics"],
    featured: false,
  },
  {
    id: 8,
    name: "Lakdikapul",
    fullName: "Srikara Hospitals — Lakdikapul",
    location: "Lakdikapul, Hyderabad",
    phone: "040 6969 0000",
    slug: "lakdikapul",
    beds: 220,
    tag: "NABH",
    nabh: true,
    specialty: "Nephrology · Mother & Child",
    color: "#C9933A",
    accent: "#e0b050",
    hours: "24/7",
    img: "ladikapul.jpeg",
    mapLink: "https://maps.google.com",
    tags: ["NABH", "Mother & Child"],
    featured: false,
  },
  {
    id: 9,
    name: "Rajahmundry",
    fullName: "Srikara Hospitals — Rajahmundry",
    location: "Rajahmundry, Andhra Pradesh",
    phone: "0883 6818 000",
    slug: "rajahmundry",
    beds: 240,
    tag: "Cardiac",
    nabh: true,
    specialty: "Cardiac Care · Oncology",
    color: "#C0145C",
    accent: "#e8457e",
    hours: "24/7",
    img: "Rajhamundry.jpeg",
    mapLink: "https://maps.google.com",
    tags: ["NABH", "Cath Lab", "Cancer"],
    featured: false,
  },
];

const CITY_FILTERS = ["All", "Hyderabad", "Vijayawada", "Andhra Pradesh", "NABH"];

/* ── Hospital card ── */
function HospitalCard({ hosp, index }: { hosp: typeof HOSPITALS[0]; index: number }) {
  const [hovered, setHovered] = useState(false);
  const { ref, inView } = useInView(0.06);

  return (
    <div
      ref={ref}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.65s ease ${(index % 3) * 90}ms, transform 0.65s ease ${(index % 3) * 90}ms`,
      }}
    >
      <Link href={`/hospitals/${hosp.slug}`}>
        <div
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          style={{
            background: "#fff",
            borderRadius: 26,
            overflow: "hidden",
            border: `1px solid ${hovered ? hosp.color + "44" : "#EDE8F0"}`,
            cursor: "pointer",
            transform: hovered ? "translateY(-7px)" : "translateY(0)",
            boxShadow: hovered
              ? `0 28px 56px rgba(28,43,74,0.14), 0 0 0 1px ${hosp.color}22`
              : "0 2px 14px rgba(0,0,0,0.05)",
            transition: "all 0.38s ease",
          }}
        >
          {/* Photo */}
          <div style={{ height: 190, overflow: "hidden", position: "relative" }}>
            <img
              src={hosp.img}
              alt={hosp.name}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
                transform: hovered ? "scale(1.06)" : "scale(1)",
                transition: "transform 0.65s ease",
              }}
            />
            {/* Gradient */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: `linear-gradient(to top, ${hosp.color}cc 0%, rgba(28,43,74,0.3) 50%, transparent 100%)`,
              }}
            />

            {/* Top badges */}
            <div
              style={{
                position: "absolute",
                top: 14,
                left: 14,
                right: 14,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
              }}
            >
              {/* Featured badge */}
              {hosp.featured && (
                <span
                  style={{
                    fontSize: 8,
                    fontWeight: 900,
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    padding: "4px 12px",
                    borderRadius: 50,
                    background: "#C9933A",
                    color: "#fff",
                  }}
                >
                  ⭐ Featured
                </span>
              )}
              {/* NABH badge */}
              {hosp.nabh && (
                <span
                  style={{
                    fontSize: 8,
                    fontWeight: 900,
                    letterSpacing: "0.16em",
                    textTransform: "uppercase",
                    padding: "4px 12px",
                    borderRadius: 50,
                    background: "rgba(255,255,255,0.15)",
                    color: "#fff",
                    backdropFilter: "blur(8px)",
                    border: "1px solid rgba(255,255,255,0.25)",
                    marginLeft: "auto",
                  }}
                >
                  NABH ✓
                </span>
              )}
            </div>

            {/* Bottom: name overlay */}
            <div style={{ position: "absolute", bottom: 14, left: 16, right: 16 }}>
              <h3
                style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontSize: 20,
                  fontWeight: 700,
                  color: "#fff",
                  lineHeight: 1.1,
                  marginBottom: 4,
                  textShadow: "0 2px 8px rgba(0,0,0,0.3)",
                }}
              >
                {hosp.fullName.replace("Srikara Hospitals — ", "")}
              </h3>
              <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                <MapPin size={10} color="rgba(255,255,255,0.7)" />
                <span style={{ fontSize: 10, color: "rgba(255,255,255,0.72)", fontWeight: 500 }}>
                  {hosp.location}
                </span>
              </div>
            </div>
          </div>

          {/* Info body */}
          <div style={{ padding: "18px 20px 16px" }}>
            {/* Specialty */}
            <p
              style={{
                fontSize: 11,
                color: "#6B7280",
                marginBottom: 14,
                lineHeight: 1.5,
              }}
            >
              {hosp.specialty}
            </p>

            {/* Stats row */}
            <div
              style={{
                display: "flex",
                gap: 0,
                marginBottom: 16,
                background: "#F8F6F9",
                borderRadius: 14,
                overflow: "hidden",
              }}
            >
              {[
                { icon: <BedDouble size={13} />, val: `${hosp.beds}`, lbl: "Beds" },
                { icon: <Clock size={13} />, val: hosp.hours, lbl: "Hours" },
                { icon: <Phone size={13} />, val: "Helpline", lbl: hosp.phone.split(" ")[0] + "..." },
              ].map((s, si) => (
                <div
                  key={s.lbl}
                  style={{
                    flex: 1,
                    padding: "10px 8px",
                    textAlign: "center",
                    borderRight: si < 2 ? "1px solid #EDE8F0" : "none",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      color: hosp.color,
                      marginBottom: 3,
                    }}
                  >
                    {s.icon}
                  </div>
                  <div style={{ fontSize: 11, fontWeight: 800, color: "#1C2B4A", lineHeight: 1 }}>
                    {s.val}
                  </div>
                  <div style={{ fontSize: 8, color: "#9CA3AF", textTransform: "uppercase", letterSpacing: "0.1em", marginTop: 2 }}>
                    {s.lbl}
                  </div>
                </div>
              ))}
            </div>

            {/* Tag pills */}
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 14 }}>
              {hosp.tags.map((t) => (
                <span
                  key={t}
                  style={{
                    fontSize: 8,
                    fontWeight: 800,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    padding: "4px 10px",
                    borderRadius: 6,
                    background: `${hosp.color}12`,
                    color: hosp.color,
                    border: `1px solid ${hosp.color}28`,
                  }}
                >
                  {t}
                </span>
              ))}
            </div>

            {/* Bottom CTA row */}
            <div
              style={{
                display: "flex",
                gap: 8,
                borderTop: "1px solid #F3F4F6",
                paddingTop: 14,
              }}
            >
              <button
                onClick={(e) => {
                e.stopPropagation();
                window.location.href = `tel:${hosp.phone}`;
                }}
                style={{
                  flex: 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 6,
                  padding: "10px",
                  borderRadius: 12,
                  border: `1px solid ${hosp.color}28`,
                  background: `${hosp.color}08`,
                  color: hosp.color,
                  fontSize: 10,
                  fontWeight: 800,
                  textDecoration: "none",
                  transition: "background 0.2s",
                }}
              >
                <Phone size={11} /> Call
              </button>
              {hosp.mapLink &&(
              <a
                href={hosp.mapLink}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                style={{
                  flex: 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 6,
                  padding: "10px",
                  borderRadius: 12,
                  border: "1px solid #EDE8F0",
                  color: "#6B7280",
                  fontSize: 10,
                  fontWeight: 800,
                  textDecoration: "none",
                  transition: "background 0.2s",
                }}
              >
                <MapPin size={11} /> Directions
              </a>
              )}
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 12,
                  background: hovered ? hosp.color : "#F8F6F9",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: hovered ? "#fff" : "#9CA3AF",
                  fontSize: 14,
                  transition: "all 0.28s",
                  flexShrink: 0,
                }}
              >
                →
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

/* ═══════════════════════════════════════════
   MAIN PAGE
═══════════════════════════════════════════ */
export default function HospitalsPage() {
  const [search, setSearch] = useState("");
  const [activeCity, setActiveCity] = useState("All");

  const filtered = HOSPITALS.filter((h) => {
    const matchSearch =
      h.name.toLowerCase().includes(search.toLowerCase()) ||
      h.location.toLowerCase().includes(search.toLowerCase()) ||
      h.specialty.toLowerCase().includes(search.toLowerCase());
    const matchCity =
      activeCity === "All" ||
      (activeCity === "NABH" && h.nabh) ||
      h.location.toLowerCase().includes(activeCity.toLowerCase());
    return matchSearch && matchCity;
  });

  const css = `
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,700&family=Outfit:wght@300;400;500;600;700;800&display=swap');
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: 'Outfit', sans-serif; }

    @keyframes hp-fadeUp   { from { opacity:0; transform:translateY(36px); } to { opacity:1; transform:translateY(0); } }
    @keyframes hp-fadeIn   { from { opacity:0; } to { opacity:1; } }
    @keyframes hp-slideR   { from { opacity:0; transform:translateX(-24px); } to { opacity:1; transform:translateX(0); } }
    @keyframes hp-marquee  { from { transform:translateX(0); } to { transform:translateX(-50%); } }
    @keyframes hp-pulse    { 0%,100%{transform:scale(1);opacity:.6} 50%{transform:scale(1.5);opacity:.15} }
    @keyframes hp-float    { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }

    .hp-hero-h1   { animation: hp-fadeUp  0.9s ease 0.08s both; }
    .hp-hero-sub  { animation: hp-fadeUp  0.9s ease 0.24s both; }
    .hp-hero-btns { animation: hp-fadeUp  0.9s ease 0.38s both; }
    .hp-hero-stat { animation: hp-fadeUp  0.9s ease 0.52s both; }
    .hp-hero-img  { animation: hp-fadeIn  1.1s ease 0.18s both; }
    .hp-breadcrumb{ animation: hp-slideR  0.7s ease 0.04s both; }

    .hp-filter {
      padding: 8px 20px; border-radius: 50px;
      font-family: 'Outfit', sans-serif;
      font-size: 11px; font-weight: 800; letter-spacing: 0.12em;
      text-transform: uppercase; cursor: pointer;
      border: 2px solid transparent; transition: all 0.22s;
    }
    .hp-filter.on  { background: #1C2B4A; color: #fff; border-color: #1C2B4A; }
    .hp-filter.off { background: transparent; color: #6B7280; border-color: #E5E7EB; }
    .hp-filter.off:hover { border-color: #1C2B4A; color: #1C2B4A; }

    .hp-search {
      width: 100%; padding: 14px 20px 14px 48px;
      border-radius: 50px; border: 2px solid #EDE8F0;
      background: #fff; font-size: 14px;
      font-family: 'Outfit', sans-serif;
      color: #1C2B4A; outline: none;
      transition: border-color 0.22s, box-shadow 0.22s;
    }
    .hp-search:focus {
      border-color: #C0145C;
      box-shadow: 0 0 0 4px rgba(192,20,92,0.08);
    }

    .hp-img-zoom img { transition: transform 0.65s ease; }
    .hp-img-zoom:hover img { transform: scale(1.055); }

    .hp-btn-primary {
      display: inline-flex; align-items: center; gap: 8px;
      padding: 13px 30px; border-radius: 50px;
      background: linear-gradient(135deg,#C0145C,#e8457e);
      color: #fff; font-family: 'Outfit', sans-serif;
      font-weight: 800; font-size: 12px; letter-spacing: 0.09em;
      text-transform: uppercase; border: none; cursor: pointer;
      box-shadow: 0 8px 24px rgba(192,20,92,0.36);
      transition: transform 0.25s, box-shadow 0.25s;
      text-decoration: none;
    }
    .hp-btn-primary:hover { transform: translateY(-2px); box-shadow: 0 14px 32px rgba(192,20,92,0.48); }

    .hp-btn-outline {
      display: inline-flex; align-items: center; gap: 8px;
      padding: 12px 26px; border-radius: 50px;
      background: transparent; color: #fff;
      font-family: 'Outfit', sans-serif;
      font-weight: 700; font-size: 12px; letter-spacing: 0.09em;
      text-transform: uppercase; border: 2px solid rgba(255,255,255,0.32);
      cursor: pointer; transition: background 0.22s; text-decoration: none;
    }
    .hp-btn-outline:hover { background: rgba(255,255,255,0.1); }

    .hp-map-strip { background: #0f1a2e; overflow: hidden; padding: 11px 0; }
    .hp-map-inner { display:flex; width:max-content; animation: hp-marquee 32s linear infinite; }

    a { text-decoration: none; color: inherit; }
    input::placeholder { color: #9CA3AF; }
    ::-webkit-scrollbar { width: 5px; }
    ::-webkit-scrollbar-thumb { background: #C0145C; border-radius: 3px; }
  `;

  return (
    <>
    <Navbar />
      <style dangerouslySetInnerHTML={{ __html: css }} />

      <div style={{ background: "#F8F6F9", minHeight: "100vh" }}>

        {/* ══════════════════════════════════════
            §1  HERO
        ══════════════════════════════════════ */}
        <section
          style={{
            position: "relative",
            overflow: "hidden",
            background: "#1C2B4A",
            minHeight: 580,
            display: "flex",
            alignItems: "center",
          }}
        >
          {/* Dot texture */}
          <div style={{ position:"absolute",inset:0,opacity:.035,backgroundImage:"radial-gradient(rgba(255,255,255,.9) 1px,transparent 1px)",backgroundSize:"28px 28px",pointerEvents:"none" }} />
          {/* Glow */}
          <div style={{ position:"absolute",right:-120,top:-120,width:600,height:600,borderRadius:"50%",background:"#C0145C",opacity:.08,filter:"blur(110px)",pointerEvents:"none" }} />
          <div style={{ position:"absolute",left:-80,bottom:-80,width:400,height:400,borderRadius:"50%",background:"#4A6FA5",opacity:.07,filter:"blur(90px)",pointerEvents:"none" }} />

          <div
            style={{
              maxWidth: 1300,
              margin: "0 auto",
              padding: "110px 8vw 80px",
              width: "100%",
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 64,
              alignItems: "center",
            }}
          >
            {/* Left */}
            <div>
              {/* Breadcrumb */}
              <div className="hp-breadcrumb" style={{ display:"flex",alignItems:"center",gap:8,marginBottom:22 }}>
                <Link href="/" style={{ fontSize:12,color:"rgba(255,255,255,.42)",fontWeight:500 }}>Home</Link>
                <ChevronRight size={12} color="rgba(255,255,255,.28)" />
                <span style={{ fontSize:12,color:"#C0145C",fontWeight:700,letterSpacing:"0.06em" }}>Our Hospitals</span>
              </div>

              <div className="hp-hero-h1" style={{ fontSize:10,fontWeight:800,letterSpacing:"0.4em",textTransform:"uppercase",color:"#C0145C",marginBottom:14 }}>
                9 Hospitals Across TS & AP
              </div>

              <h1
                className="hp-hero-h1"
                style={{
                  fontFamily: "'Cormorant Garamond',Georgia,serif",
                  fontSize: "clamp(36px,4.8vw,64px)",
                  fontWeight: 700,
                  color: "#fff",
                  lineHeight: 1.08,
                  marginBottom: 18,
                }}
              >
                A Hospital Near
                <br />
                <em style={{ color:"#C0145C",fontStyle:"italic",fontWeight:400 }}>Wherever You Are</em>
              </h1>

              <p className="hp-hero-sub" style={{ fontSize:15,color:"rgba(255,255,255,.55)",lineHeight:1.82,marginBottom:36,maxWidth:460,fontWeight:300 }}>
                Srikara Hospitals spans 9 locations across Telangana and Andhra Pradesh —
                delivering world-class medical care with NABH-certified quality,
                cutting-edge infrastructure and 300+ specialists.
              </p>

              <div className="hp-hero-btns" style={{ display:"flex",gap:14,flexWrap:"wrap",marginBottom:44 }}>
                <Link href="/doctors" className="hp-btn-primary">
                  <Calendar size={14} /> Book Appointment
                </Link>
                <a href="tel:1800-123-4567" className="hp-btn-outline">
                  <Phone size={13} /> Emergency: 1800-123-4567
                </a>
              </div>

              {/* Stats */}
              <div className="hp-hero-stat" style={{ display:"flex",gap:32,flexWrap:"wrap" }}>
                {[
                  { n:"9",    l:"Hospitals"   },
                  { n:"2,200+",l:"Total Beds" },
                  { n:"24/7", l:"Emergency"   },
                  { n:"NABH", l:"Accredited"  },
                ].map(s => (
                  <div key={s.l}>
                    <div style={{ fontFamily:"'Cormorant Garamond',Georgia,serif",fontSize:28,fontWeight:700,color:"#C0145C",lineHeight:1 }}>{s.n}</div>
                    <div style={{ fontSize:9,fontWeight:700,letterSpacing:"0.18em",textTransform:"uppercase",color:"rgba(255,255,255,.35)",marginTop:4 }}>{s.l}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: image mosaic */}
            <div
              className="hp-hero-img"
              style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gridTemplateRows:"220px 180px",gap:12 }}
            >
              <div className="hp-img-zoom" style={{ gridRow:"1/3",borderRadius:24,overflow:"hidden",position:"relative" }}>
                <img src="https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=600&q=88&auto=format&fit=crop" alt="Srikara Hospital" style={{ width:"100%",height:"100%",objectFit:"cover",display:"block" }} />
                <div style={{ position:"absolute",inset:0,background:"linear-gradient(to top,rgba(28,43,74,.72) 0%,transparent 55%)" }} />
                <span style={{ position:"absolute",bottom:14,left:14,fontSize:9,fontWeight:800,textTransform:"uppercase",letterSpacing:"0.16em",padding:"5px 12px",borderRadius:50,background:"rgba(192,20,92,.85)",color:"#fff" }}>Flagship</span>
              </div>
              <div className="hp-img-zoom" style={{ borderRadius:24,overflow:"hidden" }}>
                <img src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=500&q=88&auto=format&fit=crop" alt="Hospital" style={{ width:"100%",height:"100%",objectFit:"cover",display:"block" }} />
              </div>
              <div className="hp-img-zoom" style={{ borderRadius:24,overflow:"hidden",position:"relative" }}>
                <img src="https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=500&q=88&auto=format&fit=crop" alt="Hospital" style={{ width:"100%",height:"100%",objectFit:"cover",display:"block" }} />
                <div style={{ position:"absolute",top:10,right:10,background:"#0A7A6A",borderRadius:12,padding:"7px 11px",textAlign:"center" }}>
                  <div style={{ fontFamily:"'Cormorant Garamond',Georgia,serif",fontSize:17,fontWeight:700,color:"#fff",lineHeight:1 }}>9</div>
                  <div style={{ fontSize:7,color:"rgba(255,255,255,.7)",fontWeight:700,textTransform:"uppercase" }}>Branches</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════
            §2  LOCATION MARQUEE
        ══════════════════════════════════════ */}
        <div className="hp-map-strip">
          <div className="hp-map-inner">
            {[...Array(2)].map((_,ri) =>
              HOSPITALS.map(h => (
                <span key={`${ri}-${h.id}`} style={{ display:"inline-flex",alignItems:"center",gap:10,marginRight:40,fontSize:10,fontWeight:800,letterSpacing:"0.18em",textTransform:"uppercase",color:"rgba(255,255,255,.5)",whiteSpace:"nowrap" }}>
                  <MapPin size={9} color="#C0145C" /> {h.name} · {h.phone}
                  <span style={{ width:3,height:3,borderRadius:"50%",background:"#C0145C",opacity:.6,flexShrink:0 }} />
                </span>
              ))
            )}
          </div>
        </div>

        {/* ══════════════════════════════════════
            §3  QUICK LOCATION TILES
        ══════════════════════════════════════ */}
        <section style={{ background:"#fff",padding:"64px 8vw 0" }}>
          <div style={{ maxWidth:1300,margin:"0 auto" }}>
            <FadeUp>
              <div style={{ textAlign:"center",marginBottom:40 }}>
                <div style={{ fontSize:10,fontWeight:800,letterSpacing:"0.38em",textTransform:"uppercase",color:"#C0145C",marginBottom:10 }}>Quick Directory</div>
                <h2 style={{ fontFamily:"'Cormorant Garamond',Georgia,serif",fontSize:"clamp(24px,2.8vw,38px)",fontWeight:700,color:"#1C2B4A" }}>
                  All 9 Locations at a <em style={{ color:"#0A7A6A",fontStyle:"italic",fontWeight:400 }}>Glance</em>
                </h2>
              </div>
            </FadeUp>

            {/* Horizontal scroll tiles */}
            <div style={{ display:"grid",gridTemplateColumns:"repeat(9,minmax(130px,1fr))",gap:2,overflowX:"auto",paddingBottom:4 }}>
              {HOSPITALS.map((h, i) => (
                <FadeUp key={h.id} delay={i * 55}>
                  <Link href={`/hospitals/${h.slug}`}>
                    <div
                      style={{
                        padding:"20px 14px",
                        borderRadius:0,
                        borderRight:"1px solid #F0ECF4",
                        cursor:"pointer",
                        textAlign:"center",
                        transition:"background 0.22s",
                        background:"transparent",
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = `${h.color}08`)}
                      onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                    >
                      <div style={{ width:38,height:38,borderRadius:12,background:`${h.color}14`,display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 10px",fontSize:16 }}>🏥</div>
                      <div style={{ fontSize:12,fontWeight:800,color:"#1C2B4A",marginBottom:4,lineHeight:1.2 }}>{h.name}</div>
                      <div style={{ fontSize:9,color:"#9CA3AF",marginBottom:6,lineHeight:1.4 }}>{h.location.split(",")[0]}</div>
                      <span
                            onClick={(e) => {
                            e.stopPropagation();
                            window.location.href = `tel:${h.phone}`;
                                        }}
                            style={{
                            fontSize: 9,
                            fontWeight: 800,
                            color: h.color,
                            letterSpacing: "0.06em",
                            cursor: "pointer"
                            }}
                            >
                        {h.phone}
                        </span>
                    </div>
                  </Link>
                </FadeUp>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════
            §4  WHY SRIKARA  (3 pillars)
        ══════════════════════════════════════ */}
        <section style={{ padding:"80px 8vw",background:"#fff" }}>
          <div style={{ maxWidth:1300,margin:"0 auto" }}>
            <div style={{ display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:24 }}>
              {[
                { icon:<Shield size={28} />, title:"NABH Accredited", sub:"Multiple campuses certified for the highest standards of patient safety and clinical quality.", color:"#C0145C", img:"https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=500&q=80&auto=format&fit=crop" },
                { icon:<Heart size={28} />,  title:"24/7 Emergency",  sub:"Round-the-clock emergency care, trauma services and ambulance support across all 9 hospitals.", color:"#1C2B4A", img:"https://images.unsplash.com/photo-1504813184591-01572f98c85f?w=500&q=80&auto=format&fit=crop" },
                { icon:<Award size={28} />,  title:"25+ Years of Trust",sub:"A legacy of excellence serving millions of families across Telangana and Andhra Pradesh.", color:"#0A7A6A", img:"https://images.unsplash.com/photo-1666214280557-f1b5022eb634?w=500&q=80&auto=format&fit=crop" },
              ].map((p, i) => (
                <FadeUp key={p.title} delay={i * 100}>
                  <div
                    style={{ borderRadius:24,overflow:"hidden",border:"1px solid #EDE8F0",background:"#fff",transition:"transform 0.35s,box-shadow 0.35s" }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.transform="translateY(-6px)"; (e.currentTarget as HTMLDivElement).style.boxShadow="0 22px 44px rgba(0,0,0,.1)"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.transform="translateY(0)"; (e.currentTarget as HTMLDivElement).style.boxShadow="none"; }}
                  >
                    <div className="hp-img-zoom" style={{ height:160,overflow:"hidden",position:"relative" }}>
                      <img src={p.img} alt={p.title} style={{ width:"100%",height:"100%",objectFit:"cover",display:"block" }} />
                      <div style={{ position:"absolute",inset:0,background:`linear-gradient(to top,${p.color}cc 0%,transparent 60%)` }} />
                    </div>
                    <div style={{ padding:"20px 22px" }}>
                      <div style={{ width:44,height:44,borderRadius:14,background:`${p.color}12`,display:"flex",alignItems:"center",justifyContent:"center",color:p.color,marginBottom:14 }}>{p.icon}</div>
                      <h3 style={{ fontFamily:"'Cormorant Garamond',Georgia,serif",fontSize:18,fontWeight:700,color:"#1C2B4A",marginBottom:8 }}>{p.title}</h3>
                      <p style={{ fontSize:13,color:"#6B7280",lineHeight:1.75 }}>{p.sub}</p>
                    </div>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════
            §5  ALL HOSPITALS GRID — searchable
        ══════════════════════════════════════ */}
        <section style={{ padding:"80px 8vw 100px",background:"#F8F6F9" }}>
          <div style={{ maxWidth:1300,margin:"0 auto" }}>

            <FadeUp>
              <div style={{ display:"flex",alignItems:"flex-end",justifyContent:"space-between",flexWrap:"wrap",gap:24,marginBottom:36 }}>
                <div>
                  <div style={{ fontSize:10,fontWeight:800,letterSpacing:"0.38em",textTransform:"uppercase",color:"#C0145C",marginBottom:10 }}>Our Network</div>
                  <h2 style={{ fontFamily:"'Cormorant Garamond',Georgia,serif",fontSize:"clamp(26px,3vw,42px)",fontWeight:700,color:"#1C2B4A" }}>
                    Find Your Nearest <em style={{ color:"#0A7A6A",fontStyle:"italic",fontWeight:400 }}>Hospital</em>
                  </h2>
                </div>
                {/* Search */}
                <div style={{ position:"relative",width:280 }}>
                  <Search size={15} style={{ position:"absolute",left:18,top:"50%",transform:"translateY(-50%)",color:"#9CA3AF" }} />
                  <input className="hp-search" type="text" placeholder="Search by name or city..." value={search} onChange={(e) => setSearch(e.target.value)} />
                </div>
              </div>

              {/* Filter tabs */}
              <div style={{ display:"flex",gap:8,marginBottom:40,flexWrap:"wrap" }}>
                {CITY_FILTERS.map(f => (
                  <button key={f} className={`hp-filter ${activeCity===f?"on":"off"}`} onClick={() => setActiveCity(f)}>{f}</button>
                ))}
              </div>
            </FadeUp>

            {/* Hospital grid */}
            <div style={{ display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:26 }}>
              {filtered.map((h, i) => (
                <HospitalCard key={h.id} hosp={h} index={i} />
              ))}
            </div>

            {filtered.length === 0 && (
              <div style={{ textAlign:"center",padding:"60px 0",color:"#9CA3AF" }}>
                <div style={{ fontSize:40,marginBottom:12 }}>🔍</div>
                <p style={{ fontSize:15,fontWeight:600 }}>No hospitals found for "{search}"</p>
              </div>
            )}
          </div>
        </section>

        {/* ══════════════════════════════════════
            §6  SERVICES ACROSS ALL BRANCHES
        ══════════════════════════════════════ */}
        <section style={{ padding:"80px 8vw",background:"#fff" }}>
          <div style={{ maxWidth:1300,margin:"0 auto" }}>
            <FadeUp>
              <div style={{ textAlign:"center",marginBottom:52 }}>
                <div style={{ fontSize:10,fontWeight:800,letterSpacing:"0.38em",textTransform:"uppercase",color:"#C0145C",marginBottom:10 }}>Common Across All Branches</div>
                <h2 style={{ fontFamily:"'Cormorant Garamond',Georgia,serif",fontSize:"clamp(26px,3vw,40px)",fontWeight:700,color:"#1C2B4A" }}>
                  Services Available <em style={{ color:"#0A7A6A",fontStyle:"italic",fontWeight:400 }}>Everywhere</em>
                </h2>
              </div>
            </FadeUp>

            <div style={{ display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:20 }}>
              {[
                { icon:"🚨",title:"24/7 Emergency",       sub:"Round-the-clock trauma & emergency care at every location.",             img:"https://images.unsplash.com/photo-1579684453423-f84349ef60b0?w=400&q=80&auto=format&fit=crop" },
                { icon:"🔬",title:"Diagnostics & Lab",    sub:"Same-day pathology, MRI, CT scan and X-ray at all branches.",           img:"https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400&q=80&auto=format&fit=crop" },
                { icon:"💊",title:"In-house Pharmacy",    sub:"24/7 pharmacy stocked with all prescribed medications.",                 img:"https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&q=80&auto=format&fit=crop" },
                { icon:"🚑",title:"Ambulance Services",   sub:"GPS-tracked ambulance fleet with trained paramedics on standby.",       img:"https://images.unsplash.com/photo-1559757175-5700dde675bc?w=400&q=80&auto=format&fit=crop" },
                { icon:"💳",title:"Cashless Insurance",   sub:"Empanelled with 50+ insurance providers for hassle-free billing.",      img:"https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=400&q=80&auto=format&fit=crop" },
                { icon:"🛌",title:"ICU & Critical Care",  sub:"Advanced ICU with ventilator support and round-the-clock monitoring.",   img:"https://images.unsplash.com/photo-1504813184591-01572f98c85f?w=400&q=80&auto=format&fit=crop" },
                { icon:"👶",title:"Maternity & NICU",     sub:"Full-service maternity wards with neonatal intensive care unit.",        img:"https://images.unsplash.com/photo-1527613426441-4da17471b66d?w=400&q=80&auto=format&fit=crop" },
                { icon:"🧘",title:"Physiotherapy",        sub:"Dedicated rehabilitation and physiotherapy centre at every branch.",    img:"https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400&q=80&auto=format&fit=crop" },
              ].map((s, i) => (
                <FadeUp key={s.title} delay={i * 60}>
                  <div
                    style={{ background:"#F8F6F9",borderRadius:20,overflow:"hidden",border:"1px solid #EDE8F0",transition:"transform .35s,box-shadow .35s",cursor:"default" }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.transform="translateY(-5px)"; (e.currentTarget as HTMLDivElement).style.boxShadow="0 18px 36px rgba(0,0,0,.08)"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.transform="translateY(0)"; (e.currentTarget as HTMLDivElement).style.boxShadow="none"; }}
                  >
                    <div className="hp-img-zoom" style={{ height:110,overflow:"hidden",position:"relative" }}>
                      <img src={s.img} alt={s.title} style={{ width:"100%",height:"100%",objectFit:"cover",display:"block" }} />
                      <div style={{ position:"absolute",inset:0,background:"linear-gradient(to top,rgba(28,43,74,.6) 0%,transparent 55%)" }} />
                      <div style={{ position:"absolute",bottom:10,left:12,fontSize:20 }}>{s.icon}</div>
                    </div>
                    <div style={{ padding:"14px 16px" }}>
                      <h4 style={{ fontFamily:"'Cormorant Garamond',Georgia,serif",fontSize:15,fontWeight:700,color:"#1C2B4A",marginBottom:6 }}>{s.title}</h4>
                      <p style={{ fontSize:11,color:"#6B7280",lineHeight:1.6 }}>{s.sub}</p>
                    </div>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════
            §7  CTA BANNER
        ══════════════════════════════════════ */}
        <section
          style={{
            margin:"0 5vw 60px",borderRadius:36,overflow:"hidden",
            position:"relative",background:"#1C2B4A",padding:"80px 8vw",
          }}
        >
          <div style={{ position:"absolute",top:-80,right:-80,width:400,height:400,borderRadius:"50%",background:"#C0145C",opacity:.1,filter:"blur(120px)",pointerEvents:"none" }} />
          <div style={{ position:"absolute",bottom:-60,left:-60,width:320,height:320,borderRadius:"50%",background:"#4A6FA5",opacity:.09,filter:"blur(100px)",pointerEvents:"none" }} />
          <div style={{ position:"absolute",inset:0,opacity:.025,backgroundImage:"linear-gradient(rgba(255,255,255,.8) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.8) 1px,transparent 1px)",backgroundSize:"60px 60px",pointerEvents:"none" }} />

          <FadeUp>
            <div style={{ maxWidth:660,margin:"0 auto",textAlign:"center",position:"relative",zIndex:10 }}>
              <div style={{ fontSize:10,fontWeight:800,letterSpacing:"0.38em",textTransform:"uppercase",color:"#C0145C",marginBottom:16 }}>Visit Us Today</div>
              <h2 style={{ fontFamily:"'Cormorant Garamond',Georgia,serif",fontSize:"clamp(28px,3.5vw,46px)",fontWeight:700,color:"#fff",lineHeight:1.2,marginBottom:14 }}>
                A Srikara Hospital Is{" "}
                <em style={{ color:"#C0145C",fontStyle:"italic",fontWeight:400 }}>Always Nearby</em>
              </h2>
              <p style={{ fontSize:15,color:"rgba(255,255,255,.42)",marginBottom:38,lineHeight:1.82,fontWeight:300 }}>
                9 hospitals. 2,200+ beds. 300+ specialists. Whether it's a routine
                check-up or a life-saving emergency — Srikara is here for you,
                24 hours a day, 7 days a week.
              </p>
              <div style={{ display:"flex",gap:14,justifyContent:"center",flexWrap:"wrap" }}>
                <Link href="/doctors" className="hp-btn-primary">
                  <Calendar size={14} /> Book Appointment
                </Link>
                <a href="tel:1800-123-4567" className="hp-btn-outline">
                  <Phone size={13} /> 1800-123-4567
                </a>
              </div>

              {/* Ambulance strip */}
              <div style={{ marginTop:36,display:"flex",alignItems:"center",justifyContent:"center",gap:12,padding:"14px 24px",borderRadius:50,background:"rgba(192,20,92,.1)",border:"1px solid rgba(192,20,92,.22)",width:"fit-content",margin:"36px auto 0" }}>
                <span style={{ width:8,height:8,borderRadius:"50%",background:"#C0145C",animation:"hp-pulse 1.6s infinite",flexShrink:0 }} />
                <span style={{ fontSize:12,fontWeight:800,color:"rgba(255,255,255,.75)",letterSpacing:"0.06em" }}>
                  🚑 Ambulance: 9609108108 &nbsp;·&nbsp; 24/7 All 9 Hospitals
                </span>
              </div>
            </div>
          </FadeUp>
        </section>

      </div>
      <Footer />
    </>
  );
}
