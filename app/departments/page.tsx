"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  Heart, Brain, Bone, Baby, Stethoscope, Activity,
  Ear, Syringe, Hospital, Microscope,
  Scan, FlaskConical, UserRound, Wind, Droplets,
  ArrowRight, ChevronRight, Phone, Calendar, Scissors,
  Eye, Zap, Shield,
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

function useInView(threshold = 0.12) {
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

const DEPARTMENTS = [
  { name: "Orthopedic",       tagline: "Robotic Joint Replacement Specialists",      icon: <Bone size={26} />,       color: "#7c3aed", slug: "orthopedic",     img: "https://images.unsplash.com/photo-1706777193603-76c3e9613553?q=80&w=1170&auto=format&fit=crop",                                                                                                                            procedures: 10 },
  { name: "Cardiology",       tagline: "Interventional & Preventive Heart Care",     icon: <Heart size={26} />,      color: "#C0145C", slug: "cardiology",     img: "https://images.unsplash.com/photo-1559757296-5c84adc6d116?q=80&w=1331&auto=format&fit=crop",                                                                                                                            procedures: 5  },
  { name: "Neurology",        tagline: "Stroke, Epilepsy & Neuro Rehabilitation",    icon: <Brain size={26} />,      color: "#185FA5", slug: "neurology",      img: "https://images.unsplash.com/photo-1559757175-5700dde675bc?w=480&q=80&auto=format&fit=crop",                                                                                                                             procedures: 6  },
  { name: "Neuro Surgery",    tagline: "Advanced Brain & Spine Surgery",             icon: <Zap size={26} />,        color: "#2e7d52", slug: "neuro-surgery",   img: "https://images.unsplash.com/photo-1624716346720-6c96dfd07807?q=80&w=1172&auto=format&fit=crop",                                                                                                                            procedures: 3  },
  { name: "General Surgery",  tagline: "Laparoscopic, Laser & GI Surgery",           icon: <Scissors size={26} />,   color: "#854F0B", slug: "general-surgery", img: "https://images.unsplash.com/photo-1551190822-a9333d879b1f?q=80&w=1170&auto=format&fit=crop",                                                                                                                            procedures: 5  },
  { name: "General Physician",tagline: "Diabetes, Hypertension & Internal Medicine", icon: <Stethoscope size={26} />,color: "#0a6e6e", slug: "general-physician",img: "https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?q=80&w=1191&auto=format&fit=crop",                                                                                                                           procedures: 7  },
  { name: "Nephrology",       tagline: "Kidney Disease & Dialysis Care",             icon: <Droplets size={26} />,   color: "#6b4ea8", slug: "nephrology",      img: "https://images.unsplash.com/photo-1650897492524-bbc1adb72626?w=600&auto=format&fit=crop&q=60",                                                                                                                           procedures: 3  },
  { name: "Urology",          tagline: "Kidney Stones, Prostate & Andrology",        icon: <Shield size={26} />,     color: "#1270A0", slug: "urology",         img: "https://api.neohospital.com/uploads/categories/image-1716788528326-837446693-Urology.jpg",                                                                                                                               procedures: 5  },
  { name: "Plastic Surgery",  tagline: "Reconstructive, Aesthetic & Burn Care",      icon: <UserRound size={26} />,  color: "#8e44ad", slug: "plastic-surgery", img: "https://plus.unsplash.com/premium_photo-1683147837347-511490205397?fm=jpg&q=60&w=3000&auto=format&fit=crop",                                                                                                             procedures: 4  },
  { name: "Physiotherapy",    tagline: "Sports Rehab & Post-Surgical Recovery",      icon: <Activity size={26} />,   color: "#2e7d52", slug: "physiotherapy",   img: "https://media.istockphoto.com/id/1478745519/photo/close-up-of-physiotherapist-working-with-patient-on-the-bed.jpg?s=612x612&w=0&k=20&c=etDD6btysRBkAtl_0-L71kB50Pl_oNgFvLO_PyS49cM=",                                   procedures: 9  },
  { name: "Gynaecology",      tagline: "Women's Health & Maternity Care",            icon: <Baby size={26} />,       color: "#b05090", slug: "gynaecology",     img: "https://images.unsplash.com/photo-1609220136736-443140cffec6?q=80&w=1170&auto=format&fit=crop",                                                                                                                            procedures: 1  },
  { name: "Anesthesia",       tagline: "Critical Care & Pain Management",            icon: <Syringe size={26} />,    color: "#555",    slug: "anesthesia",      img: "https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?q=80&w=1170&auto=format&fit=crop",                                                                                                                            procedures: 7  },
  { name: "Pediatrics",       tagline: "Child Health & Newborn Care",                icon: <Baby size={26} />,       color: "#e07020", slug: "pediatrics",      img: "https://t4.ftcdn.net/jpg/04/84/86/95/360_F_484869531_B79MGsEMR6KgiO6hSbcpwCNSux12qk13.jpg",                                                                                                                              procedures: 2  },
  { name: "ENT",              tagline: "Ear, Nose & Throat Surgery",                 icon: <Ear size={26} />,        color: "#16a085", slug: "ent",             img: "https://media.istockphoto.com/id/1806607483/photo/child-at-doctors-appointment-ear-exam.jpg?s=612x612&w=0&k=20&c=3IdU3Vt8mNtDpcTUbgKJk61DHd1RKLbmA8o1EdPhOVI=",                                                        procedures: 2  },
  { name: "Dermatology",      tagline: "Skin, Hair & Cosmetic Dermatology",          icon: <Eye size={26} />,        color: "#e67e22", slug: "dermatology",     img: "https://www.oasisdermatology.com/wp-content/uploads/2022/12/What-is-Cosmetic-Dermatology-Oasis-Dermatology-1000x658.jpg",                                                                                                 procedures: 1  },
  { name: "Dental",           tagline: "Maxillofacial & Oral Surgery",               icon: <Hospital size={26} />,   color: "#1abc9c", slug: "dental",          img: "https://images.unsplash.com/photo-1606811971618-4486d14f3f99?q=80&w=1287&auto=format&fit=crop",                                                                                                                            procedures: 1  },
  { name: "Psychiatry",       tagline: "Mental Health & Psychotherapy",              icon: <Brain size={26} />,      color: "#8e44ad", slug: "psychiatry",      img: "https://d2csxpduxe849s.cloudfront.net/media/E32629C6-9347-4F84-81FEAEF7BFA342B3/6AABBF14-F784-4D3A-922AAF7C5C78EEB0/29C4E326-3DE9-44FE-BCB33242F26A4BC3/WebsiteJpg_XL-FPSYT_Main%20Visual_Purple_Website.jpg",           procedures: 1  },
  { name: "Radiology",        tagline: "CT, MRI, X-Ray & Ultrasound Diagnostics",   icon: <Scan size={26} />,       color: "#2c3e50", slug: "radiology",       img: "https://images.unsplash.com/photo-1516069677018-378515003435?q=80&w=1169&auto=format&fit=crop",                                                                                                                            procedures: 2  },
  { name: "Pathology",        tagline: "Lab Diagnostics & Histopathology",           icon: <FlaskConical size={26} />,color:"#7f8c8d", slug: "pathology",       img: "https://media.istockphoto.com/id/519559505/photo/microscope.jpg?s=612x612&w=0&k=20&c=rAsZn6AYnxz7Zy1XASPTjY5jqRFZ8mj9k5fylazvnP8=",                                                                                     procedures: 1  },
  { name: "Pulmonology",      tagline: "Asthma, COPD & Lung Disease",                icon: <Wind size={26} />,       color: "#3060a0", slug: "pulmonology",     img: "https://media.istockphoto.com/id/1609493340/photo/doctor-examining-the-health-of-the-patients-lungs-pulmonologist-doctor-lungs-specialist.jpg?s=612x612&w=0&k=20&c=yhRY0bs-Poyd1_0Vq98-bGIjT4596axEq03xD4Qrda8=",       procedures: 1  },
  { name: "Critical Care",    tagline: "24/7 ICU & Life Support",                    icon: <Microscope size={26} />, color: "#c0392b", slug: "critical-care",   img: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=1153&auto=format&fit=crop",                                                                                                                            procedures: 2  },
];

const FEATURED_DEPTS = [
  { title: "Orthopedic",             sub: "Srikara Hospitals is Hyderabad's leading centre for Robotic Joint Replacement Surgery. Our orthopedic team across all 5 branches specialises in knee & hip replacement, arthroscopy, sports injuries and complex trauma — with faster recovery and precision outcomes.", img: "https://images.unsplash.com/photo-1706777193603-76c3e9613553?q=80&w=900&auto=format&fit=crop", tag: "No.1 Robotic Joint Replacement", reverse: false, href: "/departments/orthopedic" },
  { title: "Neurology & Neuro Surgery", sub: "From stroke management and epilepsy care to complex brain tumour surgeries and minimally invasive spine procedures — our neurosciences team brings together top neurologists and neurosurgeons across all Srikara branches.", img: "https://images.unsplash.com/photo-1559757175-5700dde675bc?w=900&q=88&auto=format&fit=crop", tag: "Brain & Spine Specialists", reverse: true, href: "/departments/neurology" },
  { title: "Cardiology",             sub: "Our cardiologists at Lakdikapul, Kompally, ECIL, LB Nagar and Peerazdiguda provide comprehensive heart care — interventional cardiology, ECG, echocardiography, hypertension management and preventive cardiac screening.", img: "https://images.unsplash.com/photo-1559757296-5c84adc6d116?q=80&w=900&auto=format&fit=crop", tag: "Heart Care Across 5 Branches", reverse: false, href: "/departments/cardiology" },
];

const DOCTORS = [
  { name: "Dr. Akhil Dadi",           dept: "Orthopedic",       exp: "15+ Years", img: "/Akhildadi.jpg",                    color: "#7c3aed", branch: "Kompally & LB Nagar", slug: "akhil-dadi"          },
  { name: "Dr. Bhanu Pratap P",        dept: "Orthopedics",      exp: "12+ Years", img: "/Ladikapul/DR.BHANUPRATAPP.png",    color: "#C0145C", branch: "Lakdikapul",          slug: "bhanu-pratap-p"       },
  { name: "Dr. Sharat Chandra Reddy",  dept: "General Physician",exp: "10+ Years", img: "/doctors/DR.SHARATHCHANDRA.png",    color: "#0a6e6e", branch: "Kompally",            slug: "sharat-chandra-reddy" },
  { name: "Dr. Vaishnavi P",           dept: "Nephrology",       exp: "13+ Years", img: "/Ladikapul/DR.VAISHNAVI.png",       color: "#6b4ea8", branch: "Lakdikapul",          slug: "vaishnavi-p"          },
];

function FadeUp({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const { ref, inView } = useInView(0.1);
  return (
    <div ref={ref} className={className}
      style={{ opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(36px)", transition: `opacity 0.75s ease ${delay}ms, transform 0.75s ease ${delay}ms` }}>
      {children}
    </div>
  );
}

function DeptCard({ dept, index }: { dept: (typeof DEPARTMENTS)[0]; index: number }) {
  const [hovered, setHovered] = useState(false);
  const { ref, inView } = useInView(0.08);
  return (
    <div ref={ref} style={{ opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(28px)", transition: `opacity 0.6s ease ${(index % 4) * 80}ms, transform 0.6s ease ${(index % 4) * 80}ms` }}>
      <Link href={`/departments/${dept.slug}`}>
        <div onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
          style={{ background: "#fff", borderRadius: 22, overflow: "hidden", border: hovered ? `1.5px solid ${dept.color}` : "1px solid #EDE8F0", cursor: "pointer",
            transform: hovered ? "translateY(-7px)" : "translateY(0)", boxShadow: hovered ? `0 24px 48px ${dept.color}22` : "0 2px 12px rgba(0,0,0,0.04)",
            transition: "transform 0.35s ease, box-shadow 0.35s ease, border 0.2s ease" }}>
          <div style={{ height: 150, overflow: "hidden", position: "relative" }}>
            <img src={dept.img} alt={dept.name} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transform: hovered ? "scale(1.06)" : "scale(1)", transition: "transform 0.6s ease" }} />
            <div style={{ position: "absolute", inset: 0, background: `linear-gradient(to top, ${dept.color}cc 0%, transparent 55%)` }} />
            <div style={{ position: "absolute", top: 12, left: 12, width: 40, height: 40, borderRadius: 12, background: "rgba(255,255,255,0.92)", display: "flex", alignItems: "center", justifyContent: "center", color: dept.color, boxShadow: "0 4px 12px rgba(0,0,0,0.12)" }}>{dept.icon}</div>
          </div>
          <div style={{ padding: "14px 16px 12px" }}>
            <h3 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 16, fontWeight: 700, color: "#1C2B4A", marginBottom: 3 }}>{dept.name}</h3>
            <p style={{ fontSize: 11, color: "#9CA3AF", marginBottom: 10 }}>{dept.tagline}</p>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderTop: "1px solid #F3F4F6", paddingTop: 10 }}>
              <span style={{ fontSize: 9, fontWeight: 800, color: "#9CA3AF", textTransform: "uppercase", letterSpacing: "0.14em" }}>{dept.procedures} specialists</span>
              <span style={{ color: dept.color, fontSize: 14 }}>→</span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default function DepartmentsPage() {
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const FILTERS = ["All", "Surgery", "Medicine", "Diagnostics", "Rehab"];
  const FILTER_MAP: Record<string, string[]> = {
    Surgery:     ["Orthopedic","Neuro Surgery","General Surgery","Plastic Surgery","Urology","ENT","Dental","Anesthesia"],
    Medicine:    ["Cardiology","Neurology","General Physician","Nephrology","Gynaecology","Pediatrics","Pulmonology","Critical Care","Psychiatry"],
    Diagnostics: ["Radiology","Pathology"],
    Rehab:       ["Physiotherapy","Dermatology"],
  };
  const filtered = DEPARTMENTS.filter((d) => {
    const matchSearch = d.name.toLowerCase().includes(search.toLowerCase()) || d.tagline.toLowerCase().includes(search.toLowerCase());
    const matchFilter = activeFilter === "All" || (FILTER_MAP[activeFilter] || []).includes(d.name);
    return matchSearch && matchFilter;
  });

  const globalCSS = `
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,700&family=Outfit:wght@300;400;500;600;700;800&display=swap');
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: 'Outfit', sans-serif; }

    @keyframes dp-fadeUp    { from{opacity:0;transform:translateY(40px)} to{opacity:1;transform:translateY(0)} }
    @keyframes dp-fadeIn    { from{opacity:0} to{opacity:1} }
    @keyframes dp-slideRight{ from{opacity:0;transform:translateX(-30px)} to{opacity:1;transform:translateX(0)} }
    @keyframes dp-marquee   { from{transform:translateX(0)} to{transform:translateX(-50%)} }

    .dp-hero-h1   { animation: dp-fadeUp 0.9s ease 0.1s both; }
    .dp-hero-sub  { animation: dp-fadeUp 0.9s ease 0.28s both; }
    .dp-hero-btns { animation: dp-fadeUp 0.9s ease 0.44s both; }
    .dp-hero-stats{ animation: dp-fadeUp 0.9s ease 0.58s both; }
    .dp-hero-img  { animation: dp-fadeIn 1.1s ease 0.2s both; }

    .dp-filter-btn {
      padding: 8px 20px; border-radius: 50px; font-size: 11px; font-weight: 800;
      letter-spacing: 0.12em; text-transform: uppercase; cursor: pointer;
      border: 2px solid transparent; font-family: 'Outfit', sans-serif; transition: all 0.22s;
    }
    .dp-filter-btn.active   { background: #1C2B4A; color: #fff; border-color: #1C2B4A; }
    .dp-filter-btn.inactive { background: transparent; color: #6B7280; border-color: #E5E7EB; }
    .dp-filter-btn.inactive:hover { border-color: #C0145C; color: #C0145C; }

    .dp-search {
      width: 100%; padding: 14px 20px 14px 48px; border-radius: 50px;
      border: 2px solid #EDE8F0; background: #fff; font-size: 14px;
      font-family: 'Outfit', sans-serif; color: #1C2B4A; outline: none;
      transition: border-color 0.22s, box-shadow 0.22s;
    }
    .dp-search:focus { border-color: #C0145C; box-shadow: 0 0 0 4px rgba(192,20,92,0.08); }

    .dp-img-zoom img { transition: transform 0.65s ease; }
    .dp-img-zoom:hover img { transform: scale(1.05); }

    .dp-doc-card { transition: transform 0.36s ease, box-shadow 0.36s ease; }
    .dp-doc-card:hover { transform: translateY(-7px); box-shadow: 0 24px 48px rgba(28,43,74,0.14) !important; }

    a { text-decoration: none; color: inherit; }
    input::placeholder { color: #9CA3AF; }
    ::-webkit-scrollbar { width: 5px; }
    ::-webkit-scrollbar-thumb { background: #C0145C; border-radius: 3px; }

    /* ── Hero grid ── */
    .dp-hero-inner {
      max-width: 1300px; margin: 0 auto;
      padding: 100px 8vw 80px; width: 100%;
      display: grid; grid-template-columns: 1fr 1fr;
      gap: 60px; align-items: center;
    }
    .dp-hero-mosaic {
      display: grid; grid-template-columns: 1fr 1fr;
      grid-template-rows: 230px 180px; gap: 12px;
    }

    /* ── Intro grid ── */
    .dp-intro-grid {
      max-width: 1300px; margin: 0 auto;
      display: grid; grid-template-columns: 1fr 1fr;
      gap: 72px; align-items: center;
    }
    .dp-intro-stats {
      display: grid; grid-template-columns: repeat(3,1fr); gap: 14px; margin-top: 32px;
    }

    /* ── Featured panels ── */
    .dp-featured-panel { display: grid; grid-template-columns: 1fr 1fr; margin-bottom: 3px; }

    /* ── Dept cards grid ── */
    .dp-dept-grid { display: grid; grid-template-columns: repeat(4,1fr); gap: 20px; }

    /* ── Doctors grid ── */
    .dp-doc-grid { display: grid; grid-template-columns: repeat(4,1fr); gap: 24px; }

    /* ── Search row ── */
    .dp-search-row {
      display: flex; align-items: flex-end; justify-content: space-between;
      flex-wrap: wrap; gap: 24px; margin-bottom: 44px;
    }
    .dp-search-wrap { position: relative; width: 300px; }

    /* ════════════════════════════════
       RESPONSIVE
    ════════════════════════════════ */

    /* Tablet 768–1099px */
    @media (max-width: 1099px) {
      .dp-hero-inner        { grid-template-columns: 1fr; gap: 40px; padding: 80px 6vw 60px; }
      .dp-hero-mosaic       { display: none; }
      .dp-intro-grid        { grid-template-columns: 1fr; gap: 40px; }
      .dp-dept-grid         { grid-template-columns: repeat(3, 1fr); }
      .dp-doc-grid          { grid-template-columns: repeat(2, 1fr); }
      .dp-featured-panel    { grid-template-columns: 1fr; }
      .dp-featured-img      { height: 280px !important; }
    }

    /* Mobile <768px */
    @media (max-width: 767px) {
      .dp-hero-inner        { padding: 72px 5vw 48px; }
      .dp-dept-grid         { grid-template-columns: repeat(2, 1fr); gap: 12px; }
      .dp-doc-grid          { grid-template-columns: 1fr; }
      .dp-intro-grid        { padding: 56px 5vw !important; }
      .dp-intro-stats       { grid-template-columns: repeat(3,1fr); gap: 8px; }
      .dp-search-row        { flex-direction: column; align-items: flex-start; }
      .dp-search-wrap       { width: 100%; }
      .dp-featured-panel    { grid-template-columns: 1fr; }
      .dp-featured-img      { height: 220px !important; }
      .dp-featured-text     { padding: 36px 5vw !important; }
      .dp-hero-stats-wrap   { gap: 20px !important; }
      .dp-cta-section       { padding: 56px 5vw !important; margin: 0 4vw 40px !important; }
    }

    /* Very small <400px */
    @media (max-width: 399px) {
      .dp-dept-grid         { grid-template-columns: 1fr; }
      .dp-intro-stats       { grid-template-columns: 1fr 1fr; }
    }
  `;

  return (
    <>
      <Navbar />
      <style dangerouslySetInnerHTML={{ __html: globalCSS }} />

      <div style={{ background: "#F8F6F9", minHeight: "100vh" }}>

        {/* ── §1 HERO ── */}
        <section style={{ position: "relative", overflow: "hidden", background: "#1C2B4A", minHeight: 560, display: "flex", alignItems: "center" }}>
          <div style={{ position: "absolute", inset: 0, opacity: 0.04, backgroundImage: "radial-gradient(rgba(255,255,255,0.9) 1px, transparent 1px)", backgroundSize: "28px 28px", pointerEvents: "none" }} />
          <div style={{ position: "absolute", right: -100, top: -100, width: 600, height: 600, borderRadius: "50%", background: "#C0145C", opacity: 0.08, filter: "blur(100px)", pointerEvents: "none" }} />

          <div className="dp-hero-inner">
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 24, animation: "dp-slideRight 0.7s ease 0.05s both" }}>
                <Link href="/" style={{ fontSize: 12, color: "rgba(255,255,255,0.45)", fontWeight: 500 }}>Home</Link>
                <ChevronRight size={12} color="rgba(255,255,255,0.3)" />
                <span style={{ fontSize: 12, color: "#C0145C", fontWeight: 700, letterSpacing: "0.06em" }}>Departments</span>
              </div>

              <div className="dp-hero-h1" style={{ fontSize: 10, fontWeight: 800, letterSpacing: "0.4em", textTransform: "uppercase", color: "#C0145C", marginBottom: 14 }}>
                Srikara Hospitals · 5 Branches
              </div>
              <h1 className="dp-hero-h1" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(32px, 4.5vw, 60px)", fontWeight: 700, color: "#fff", lineHeight: 1.1, marginBottom: 18 }}>
                21 Medical<br />
                <em style={{ color: "#C0145C", fontStyle: "italic", fontWeight: 400 }}>Specializations</em>
              </h1>
              <p className="dp-hero-sub" style={{ fontSize: 15, color: "rgba(255,255,255,0.58)", lineHeight: 1.82, marginBottom: 36, maxWidth: 460, fontWeight: 300 }}>
                Expert specialists across ECIL, Kompally, LB Nagar, Lakdikapul and Peerazdiguda. Advanced care, compassionate doctors, exceptional outcomes — all under one roof.
              </p>

              <div className="dp-hero-btns" style={{ display: "flex", gap: 14, flexWrap: "wrap", marginBottom: 44 }}>
                <Link href="/doctors">
                  <button style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "13px 28px", borderRadius: 50, background: "linear-gradient(135deg,#C0145C,#e8457e)", color: "#fff", fontFamily: "'Outfit',sans-serif", fontWeight: 800, fontSize: 12, letterSpacing: "0.09em", textTransform: "uppercase", border: "none", cursor: "pointer", boxShadow: "0 8px 24px rgba(192,20,92,0.38)", transition: "transform 0.25s, box-shadow 0.25s" }}
                    onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; }} onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; }}>
                    <Calendar size={14} /> Book Appointment
                  </button>
                </Link>
                <a href="tel:04046460000">
                  <button style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "12px 24px", borderRadius: 50, background: "transparent", color: "#fff", fontFamily: "'Outfit',sans-serif", fontWeight: 700, fontSize: 12, letterSpacing: "0.09em", textTransform: "uppercase", border: "2px solid rgba(255,255,255,0.28)", cursor: "pointer", transition: "background 0.22s" }}
                    onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.1)"} onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                    <Phone size={13} /> 040 4646 0000
                  </button>
                </a>
              </div>

              <div className="dp-hero-stats-wrap" style={{ display: "flex", gap: 32, flexWrap: "wrap" }}>
                {[{ n: "21+", l: "Departments" }, { n: "76+", l: "Specialists" }, { n: "5", l: "Branches" }].map(s => (
                  <div key={s.l}>
                    <div style={{ fontFamily: "'Cormorant Garamond',Georgia,serif", fontSize: 30, fontWeight: 700, color: "#C0145C", lineHeight: 1 }}>{s.n}</div>
                    <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(255,255,255,0.38)", marginTop: 4 }}>{s.l}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right image mosaic — hidden on tablet/mobile via CSS */}
            <div className="dp-hero-img dp-hero-mosaic">
              <div className="dp-img-zoom" style={{ gridRow: "1/3", borderRadius: 24, overflow: "hidden", position: "relative" }}>
                <img src="https://images.unsplash.com/photo-1706777193603-76c3e9613553?q=80&w=600&auto=format&fit=crop" alt="Orthopedic" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(28,43,74,0.7) 0%, transparent 55%)" }} />
                <span style={{ position: "absolute", bottom: 14, left: 14, fontSize: 9, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.16em", padding: "5px 12px", borderRadius: 50, background: "rgba(192,20,92,0.85)", color: "#fff" }}>Robotic Surgery</span>
              </div>
              <div className="dp-img-zoom" style={{ borderRadius: 24, overflow: "hidden" }}>
                <img src="https://images.unsplash.com/photo-1559757296-5c84adc6d116?q=80&w=500&auto=format&fit=crop" alt="Cardiology" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
              </div>
              <div className="dp-img-zoom" style={{ borderRadius: 24, overflow: "hidden", position: "relative" }}>
                <img src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=500&auto=format&fit=crop" alt="Physiotherapy" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                <div style={{ position: "absolute", top: 10, right: 10, background: "#0A7A6A", borderRadius: 12, padding: "7px 11px", textAlign: "center" }}>
                  <div style={{ fontFamily: "'Cormorant Garamond',Georgia,serif", fontSize: 17, fontWeight: 700, color: "#fff", lineHeight: 1 }}>5</div>
                  <div style={{ fontSize: 7, color: "rgba(255,255,255,0.7)", fontWeight: 700, textTransform: "uppercase" }}>Branches</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── §2 MARQUEE ── */}
        <section style={{ background: "#0f1a2e", padding: "11px 0", overflow: "hidden" }}>
          <div style={{ display: "flex", width: "max-content", animation: "dp-marquee 28s linear infinite" }}>
            {[...Array(2)].map((_, ri) =>
              ["Orthopedic","Cardiology","Neurology","Neuro Surgery","General Surgery","Nephrology","Urology","Physiotherapy","Plastic Surgery","ENT","Dermatology","Psychiatry"].map(dept => (
                <span key={`${ri}-${dept}`} style={{ display: "inline-flex", alignItems: "center", gap: 12, marginRight: 40, fontSize: 9, fontWeight: 800, letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(255,255,255,0.38)", whiteSpace: "nowrap" }}>
                  {dept}
                  <span style={{ width: 3, height: 3, borderRadius: "50%", background: "#C0145C", opacity: 0.7, flexShrink: 0 }} />
                </span>
              ))
            )}
          </div>
        </section>

        {/* ── §3 INTRO ── */}
        <section style={{ padding: "96px 8vw", background: "#fff" }}>
          <div className="dp-intro-grid">
            <FadeUp>
              <div className="dp-img-zoom" style={{ borderRadius: 28, overflow: "hidden", height: 460, position: "relative" }}>
                <img src="/department.jpeg" alt="Srikara Hospitals" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(28,43,74,0.72) 0%, transparent 55%)" }} />
                <div style={{ position: "absolute", bottom: 28, left: 28, right: 28 }}>
                  <div style={{ background: "rgba(255,255,255,0.1)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.2)", borderRadius: 18, padding: "16px 20px", display: "flex", gap: 20 }}>
                    {[{ n: "500+", l: "Monthly\nConsultations" }, { n: "98%", l: "Patient\nSatisfaction" }].map(s => (
                      <div key={s.l} style={{ flex: 1, textAlign: "center" }}>
                        <div style={{ fontFamily: "'Cormorant Garamond',Georgia,serif", fontSize: 26, fontWeight: 700, color: "#C0145C", lineHeight: 1 }}>{s.n}</div>
                        <div style={{ fontSize: 9, color: "rgba(255,255,255,0.6)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", marginTop: 4, whiteSpace: "pre" }}>{s.l}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </FadeUp>
            <FadeUp delay={120}>
              <div>
                <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: "0.38em", textTransform: "uppercase", color: "#C0145C", marginBottom: 12 }}>Srikara Hospitals — Hyderabad</div>
                <h2 style={{ fontFamily: "'Cormorant Garamond',Georgia,serif", fontSize: "clamp(24px,3vw,42px)", fontWeight: 700, color: "#1C2B4A", lineHeight: 1.18, marginBottom: 18 }}>
                  Expert Care Across<br /><em style={{ color: "#0A7A6A", fontStyle: "italic", fontWeight: 400 }}>5 Branches in Hyderabad</em>
                </h2>
                <p style={{ fontSize: 14, color: "#6B7280", lineHeight: 1.9, marginBottom: 14 }}>From Robotic Joint Replacement to Interventional Cardiology, Neuro Surgery to Nephrology — Srikara Hospitals delivers specialist-led care across ECIL, Kompally, LB Nagar, Lakdikapul and Peerazdiguda.</p>
                <p style={{ fontSize: 14, color: "#6B7280", lineHeight: 1.9, marginBottom: 32 }}>Our doctors focus on early diagnosis, precision treatment and faster recovery — so you can get back to living your best life sooner.</p>
                {["No.1 Robotic Knee Replacement in Hyderabad","76+ specialist doctors across 5 branches","21 departments under one hospital network","24/7 emergency & critical care support"].map(p => (
                  <div key={p} style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
                    <div style={{ width: 22, height: 22, borderRadius: "50%", background: "rgba(192,20,92,0.1)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#C0145C" }} />
                    </div>
                    <span style={{ fontSize: 13, color: "#374151", fontWeight: 500 }}>{p}</span>
                  </div>
                ))}
                <div className="dp-intro-stats">
                  {[{ n: "21+", l: "Departments", c: "#C0145C" }, { n: "76+", l: "Doctors", c: "#1C2B4A" }, { n: "5", l: "Branches", c: "#0A7A6A" }].map(s => (
                    <div key={s.l} style={{ background: "#F8F6F9", borderRadius: 16, padding: "18px 14px", textAlign: "center", border: "1px solid #EDE8F0" }}>
                      <div style={{ fontFamily: "'Cormorant Garamond',Georgia,serif", fontSize: 28, fontWeight: 700, color: s.c, lineHeight: 1 }}>{s.n}</div>
                      <div style={{ fontSize: 10, color: "#9CA3AF", fontWeight: 600, marginTop: 4 }}>{s.l}</div>
                    </div>
                  ))}
                </div>
              </div>
            </FadeUp>
          </div>
        </section>

        {/* ── §4 FEATURED DEPARTMENTS ── */}
        <section style={{ background: "#F8F6F9" }}>
          <div style={{ maxWidth: 1300, margin: "0 auto", padding: "80px 8vw 0" }}>
            <FadeUp>
              <div style={{ textAlign: "center", marginBottom: 56 }}>
                <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: "0.38em", textTransform: "uppercase", color: "#C0145C", marginBottom: 10 }}>Centres of Excellence</div>
                <h2 style={{ fontFamily: "'Cormorant Garamond',Georgia,serif", fontSize: "clamp(24px,3vw,42px)", fontWeight: 700, color: "#1C2B4A" }}>
                  Our Flagship <em style={{ color: "#0A7A6A", fontStyle: "italic", fontWeight: 400 }}>Specialties</em>
                </h2>
              </div>
            </FadeUp>
          </div>
          {FEATURED_DEPTS.map((item, i) => {
            const textBlock = (
              <div className="dp-featured-text" style={{ padding: "64px 6vw", background: i % 2 === 0 ? "#fff" : "#F8F6F9", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                <span style={{ display: "inline-block", fontSize: 9, fontWeight: 800, letterSpacing: "0.18em", textTransform: "uppercase", padding: "5px 14px", borderRadius: 50, background: "rgba(192,20,92,0.1)", color: "#C0145C", marginBottom: 18, width: "fit-content" }}>{item.tag}</span>
                <h3 style={{ fontFamily: "'Cormorant Garamond',Georgia,serif", fontSize: "clamp(22px,2.5vw,34px)", fontWeight: 700, color: "#1C2B4A", lineHeight: 1.18, marginBottom: 16 }}>{item.title}</h3>
                <p style={{ fontSize: 14, color: "#6B7280", lineHeight: 1.9, marginBottom: 28 }}>{item.sub}</p>
                <Link href={item.href}>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 12, fontWeight: 800, color: "#C0145C", letterSpacing: "0.06em", textTransform: "uppercase", cursor: "pointer" }}>Learn More <ArrowRight size={14} /></span>
                </Link>
              </div>
            );
            const imgBlock = (
              <div className="dp-img-zoom dp-featured-img" style={{ height: 400, overflow: "hidden" }}>
                <img src={item.img} alt={item.title} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
              </div>
            );
            return (
              <FadeUp key={item.title} delay={i * 60}>
                <div className="dp-featured-panel">
                  {item.reverse ? <>{textBlock}{imgBlock}</> : <>{imgBlock}{textBlock}</>}
                </div>
              </FadeUp>
            );
          })}
        </section>

        {/* ── §5 ALL DEPARTMENTS ── */}
        <section style={{ padding: "96px 8vw", background: "#fff" }}>
          <div style={{ maxWidth: 1300, margin: "0 auto" }}>
            <FadeUp>
              <div className="dp-search-row">
                <div>
                  <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: "0.38em", textTransform: "uppercase", color: "#C0145C", marginBottom: 10 }}>Browse Specialties</div>
                  <h2 style={{ fontFamily: "'Cormorant Garamond',Georgia,serif", fontSize: "clamp(24px,3vw,42px)", fontWeight: 700, color: "#1C2B4A" }}>
                    All <em style={{ color: "#0A7A6A", fontStyle: "italic", fontWeight: 400 }}>21 Departments</em>
                  </h2>
                </div>
                <div className="dp-search-wrap">
                  <Stethoscope size={16} style={{ position: "absolute", left: 18, top: "50%", transform: "translateY(-50%)", color: "#9CA3AF" }} />
                  <input className="dp-search" type="text" placeholder="Search departments..." value={search} onChange={e => setSearch(e.target.value)} />
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginBottom: 36, flexWrap: "wrap" }}>
                {FILTERS.map(f => <button key={f} className={`dp-filter-btn ${activeFilter === f ? "active" : "inactive"}`} onClick={() => setActiveFilter(f)}>{f}</button>)}
              </div>
            </FadeUp>
            <div className="dp-dept-grid">
              {filtered.map((dept, i) => <DeptCard key={dept.slug} dept={dept} index={i} />)}
            </div>
            {filtered.length === 0 && (
              <div style={{ textAlign: "center", padding: "60px 0", color: "#9CA3AF" }}>
                <div style={{ fontSize: 40, marginBottom: 12 }}>🔍</div>
                <p style={{ fontSize: 15, fontWeight: 600 }}>No departments found for "{search}"</p>
              </div>
            )}
          </div>
        </section>

        {/* ── §6 MEET THE SPECIALISTS ── */}
        <section style={{ padding: "96px 8vw", background: "#F8F6F9" }}>
          <div style={{ maxWidth: 1300, margin: "0 auto" }}>
            <FadeUp>
              <div style={{ textAlign: "center", marginBottom: 52 }}>
                <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: "0.38em", textTransform: "uppercase", color: "#C0145C", marginBottom: 10 }}>Meet the Team</div>
                <h2 style={{ fontFamily: "'Cormorant Garamond',Georgia,serif", fontSize: "clamp(24px,3vw,42px)", fontWeight: 700, color: "#1C2B4A" }}>
                  Our Leading <em style={{ color: "#0A7A6A", fontStyle: "italic", fontWeight: 400 }}>Specialists</em>
                </h2>
                <p style={{ fontSize: 14, color: "#6B7280", marginTop: 12, maxWidth: 440, margin: "12px auto 0", lineHeight: 1.8 }}>76+ dedicated doctors across 5 Srikara branches in Hyderabad.</p>
              </div>
            </FadeUp>
            <div className="dp-doc-grid">
              {DOCTORS.map((doc, i) => (
                <FadeUp key={doc.name} delay={i * 80}>
                  <div className="dp-doc-card" style={{ background: "#fff", borderRadius: 24, overflow: "hidden", border: "1px solid #EDE8F0", boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}>
                    <div className="dp-img-zoom" style={{ height: 220, overflow: "hidden", position: "relative" }}>
                      <img src={doc.img} alt={doc.name} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top", display: "block" }} />
                      <div style={{ position: "absolute", inset: 0, background: `linear-gradient(to top, ${doc.color}cc 0%, transparent 55%)` }} />
                      <div style={{ position: "absolute", top: 12, right: 12, background: "rgba(255,255,255,0.92)", borderRadius: 10, padding: "5px 10px" }}>
                        <div style={{ fontSize: 10, fontWeight: 800, color: doc.color }}>{doc.exp}</div>
                      </div>
                      <div style={{ position: "absolute", bottom: 10, left: 10, background: "rgba(0,0,0,0.55)", backdropFilter: "blur(6px)", borderRadius: 20, padding: "3px 10px" }}>
                        <div style={{ fontSize: 9, fontWeight: 700, color: "#fff" }}>{doc.branch}</div>
                      </div>
                    </div>
                    <div style={{ padding: "18px 18px 16px" }}>
                      <h3 style={{ fontFamily: "'Cormorant Garamond',Georgia,serif", fontSize: 17, fontWeight: 700, color: "#1C2B4A", marginBottom: 4 }}>{doc.name}</h3>
                      <p style={{ fontSize: 10, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.16em", color: doc.color, marginBottom: 14 }}>{doc.dept}</p>
                      <Link href={`/doctors/${doc.slug}`}>
                        <button style={{ width: "100%", padding: "10px", borderRadius: 50, background: "linear-gradient(135deg,#C0145C,#e8457e)", color: "#fff", fontFamily: "'Outfit',sans-serif", fontSize: 10, fontWeight: 800, letterSpacing: "0.12em", textTransform: "uppercase", border: "none", cursor: "pointer", boxShadow: "0 4px 14px rgba(192,20,92,0.28)", transition: "transform 0.22s, box-shadow 0.22s" }}
                          onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; }} onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; }}>
                          Book Appointment
                        </button>
                      </Link>
                    </div>
                  </div>
                </FadeUp>
              ))}
            </div>
            <FadeUp delay={200}>
              <div style={{ textAlign: "center", marginTop: 44 }}>
                <Link href="/doctors">
                  <button style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "13px 32px", borderRadius: 50, background: "transparent", color: "#1C2B4A", fontFamily: "'Outfit',sans-serif", fontWeight: 800, fontSize: 12, letterSpacing: "0.09em", textTransform: "uppercase", border: "2px solid #1C2B4A", cursor: "pointer", transition: "all 0.25s" }}
                    onMouseEnter={e => { e.currentTarget.style.background = "#1C2B4A"; e.currentTarget.style.color = "#fff"; }}
                    onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#1C2B4A"; }}>
                    View All 76+ Specialists <ArrowRight size={14} />
                  </button>
                </Link>
              </div>
            </FadeUp>
          </div>
        </section>

        {/* ── §7 CTA BANNER ── */}
        <section className="dp-cta-section" style={{ margin: "0 5vw 60px", borderRadius: 36, overflow: "hidden", position: "relative", background: "#1C2B4A", padding: "80px 8vw" }}>
          <div style={{ position: "absolute", top: -80, right: -80, width: 400, height: 400, borderRadius: "50%", background: "#C0145C", opacity: 0.1, filter: "blur(120px)", pointerEvents: "none" }} />
          <div style={{ position: "absolute", bottom: -60, left: -60, width: 320, height: 320, borderRadius: "50%", background: "#4A6FA5", opacity: 0.1, filter: "blur(100px)", pointerEvents: "none" }} />
          <div style={{ position: "absolute", inset: 0, opacity: 0.025, backgroundImage: "linear-gradient(rgba(255,255,255,0.8) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.8) 1px,transparent 1px)", backgroundSize: "60px 60px", pointerEvents: "none" }} />
          <FadeUp>
            <div style={{ maxWidth: 680, margin: "0 auto", textAlign: "center", position: "relative", zIndex: 10 }}>
              <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: "0.38em", textTransform: "uppercase", color: "#C0145C", marginBottom: 16 }}>Get Expert Help</div>
              <h2 style={{ fontFamily: "'Cormorant Garamond',Georgia,serif", fontSize: "clamp(24px,3.5vw,46px)", fontWeight: 700, color: "#fff", lineHeight: 1.2, marginBottom: 14 }}>
                Not Sure Which Department <em style={{ color: "#C0145C", fontStyle: "italic", fontWeight: 400 }}>to Choose?</em>
              </h2>
              <p style={{ fontSize: 15, color: "rgba(255,255,255,0.45)", marginBottom: 38, lineHeight: 1.82, fontWeight: 300 }}>
                Our expert team will guide you to the right specialist within minutes. Call us or book online — available across all 5 Srikara branches in Hyderabad.
              </p>
              <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
                <Link href="/doctors">
                  <button style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "14px 32px", borderRadius: 50, background: "linear-gradient(135deg,#C0145C,#e8457e)", color: "#fff", fontFamily: "'Outfit',sans-serif", fontWeight: 800, fontSize: 12, letterSpacing: "0.09em", textTransform: "uppercase", border: "none", cursor: "pointer", boxShadow: "0 8px 24px rgba(192,20,92,0.42)", transition: "transform 0.25s" }}
                    onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; }} onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; }}>
                    <Calendar size={14} /> Book Appointment
                  </button>
                </Link>
                <a href="tel:04046460000">
                  <button style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "13px 28px", borderRadius: 50, background: "transparent", color: "#fff", fontFamily: "'Outfit',sans-serif", fontWeight: 700, fontSize: 12, letterSpacing: "0.09em", textTransform: "uppercase", border: "2px solid rgba(255,255,255,0.3)", cursor: "pointer", transition: "background 0.22s" }}
                    onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.1)"} onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                    <Phone size={13} /> 040 4646 0000
                  </button>
                </a>
              </div>
            </div>
          </FadeUp>
        </section>

      </div>
      <Footer />
    </>
  );
}