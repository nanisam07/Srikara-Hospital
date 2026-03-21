"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { doctors as rawDoctors } from "@/data/doctors";
import { useRouter, useSearchParams } from "next/navigation";

// ─────────────────────────────────────────────
// CONSTANTS
// ─────────────────────────────────────────────

const BRANCH_COLORS: Record<string, string> = {
  ECIL: "#7c3aed",
  Kompally: "#2e7d52",
  "L.B. Nagar": "#0a6e6e",
  Lakdikapul: "#C0145C",
  Peerazdiguda: "#c0574d",
};

const DEPT_COLORS: Record<string, string> = {
  Orthopedic: "#7c3aed",
  Orthopedics: "#7c3aed",
  Cardiology: "#c0574d",
  Nephrology: "#6b4ea8",
  Neurology: "#185FA5",
  "Neuro Surgery": "#2e7d52",
  "General Surgery": "#854F0B",
  "General Medicine": "#0a6e6e",
  "General Physician": "#0a6e6e",
  Urology: "#0a6e6e",
  Gynaecology: "#b05090",
  Pediatrics: "#e07020",
  Pulmonology: "#3060a0",
  "Plastic Surgery": "#8e44ad",
  ENT: "#16a085",
  Physiotherapy: "#2e7d52",
  Anesthesia: "#555",
  Pathology: "#7f8c8d",
  Dermatology: "#e67e22",
  Psychiatry: "#8e44ad",
  Radiology: "#2c3e50",
  "Critical Care": "#c0392b",
  Dental: "#1abc9c",
};

const BRANCH_ID_MAP: Record<string, string> = {
  ECIL: "ecil",
  Kompally: "kompally",
  "L.B. Nagar": "lb-nagar",
  Lakdikapul: "lakdikapul",
  Peerazdiguda: "peerazdiguda",
};

const BRANCHES = [
  { id: "all", label: "All Branches" },
  { id: "ecil", label: "ECIL" },
  { id: "lakdikapul", label: "Lakdikapul" },
  { id: "kompally", label: "Kompally" },
  { id: "lb-nagar", label: "LB Nagar" },
  { id: "peerazdiguda", label: "Peerazdiguda" },
];

const SPECIALTIES = [
  "All Specialties",
  "Orthopedic",
  "Cardiology",
  "Nephrology",
  "Neurology",
  "Neuro Surgery",
  "General Surgery",
  "General Medicine",
  "General Physician",
  "Urology",
  "Gynaecology",
  "Pediatrics",
  "Pulmonology",
  "Plastic Surgery",
  "ENT",
  "Physiotherapy",
  "Anesthesia",
  "Pathology",
  "Dermatology",
  "Psychiatry",
  "Radiology",
  "Critical Care",
  "Dental",
];

const TIME_SLOTS = [
  "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM",
  "11:00 AM", "11:30 AM", "2:00 PM", "2:30 PM",
  "3:00 PM", "3:30 PM", "4:00 PM", "4:30 PM",
];

const YOUTUBE_VIDEOS = [
  { id: "wN7aF3lfcyg", title: "Happy Patient Testimonial", subtitle: "Advanced Joint Replacement" },
  { id: "QLoG2-jGjy8", title: "24 Hour Discharge After Knee Replacement", subtitle: "Interventional Cardiology" },
  { id: "9b-mJJ73Dyk", title: "HIP Replacement Surgery by Dr. Akhil Dadi — back to work in 45 days", subtitle: "Brain & Spine Surgery" },
  { id: "lWONcnIKAtw", title: "First Robotic Knee Replacement Surgery by Dr. Akhil Dadi at Srikara Hospitals LB Nagar", subtitle: "Real Transformations" },
];

// ─────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────

interface Doctor {
  id: string;
  name: string;
  slug: string;
  initials: string;
  color: string;
  department: string;
  specialty: string;
  qualifications: string;
  image?: string;
  available: boolean;
  nextSlot: string;
  rating: number;
  reviews: number;
  experience: string;
  patients: string;
  fee: string;
  branch: string;
  branchId: string;
  languages: string[];
  about: string;
  specializations: { label: string; bg: string; iconColor: string; icon: string }[];
  education: { degree: string; institute: string; year: string }[];
  workExp: { role: string; org: string; period: string; code: string }[];
  patientReviews: { name: string; stars: number; text: string; date: string }[];
  branches: { name: string; address: string }[];
}

// ─────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────

function getInitials(name: string): string {
  return name
    .replace(/^Dr\.?\s*/i, "")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");
}

// Seed-based pseudo-random so values stay stable per doctor
function seededRandom(seed: number) {
  const x = Math.sin(seed + 1) * 10000;
  return x - Math.floor(x);
}

// ─────────────────────────────────────────────
// BUILD DOCTORS LIST FROM doctors.ts
// ─────────────────────────────────────────────

const DOCTORS: Doctor[] = rawDoctors.map((d, idx) => {
  const seed = idx + 1;
  const color = DEPT_COLORS[d.department] || BRANCH_COLORS[d.branch] || "#0a6e6e";
  const branchId = BRANCH_ID_MAP[d.branch] || "ecil";
  const available = idx % 3 !== 0;

  return {
    id: d.id,
    name: d.name,
    slug: d.slug,
    initials: getInitials(d.name),
    color,
    department: d.department,
    specialty: d.designation,
    qualifications: d.qualification,
    image: d.image,
    available,
    nextSlot: available ? "Today, 11:30 AM" : "Tomorrow, 9:30 AM",
    rating: parseFloat((4.6 + seededRandom(seed) * 0.4).toFixed(1)),
    reviews: Math.floor(100 + seededRandom(seed + 1) * 500),
    experience: `${5 + Math.floor(seededRandom(seed + 2) * 20)}+ yrs`,
    patients: `${1000 + Math.floor(seededRandom(seed + 3) * 9000)}+`,
    fee: `₹${400 + Math.floor(seededRandom(seed + 4) * 5) * 50}`,
    branch: d.branch,
    branchId,
    languages: ["Telugu", "English"],
    about: `${d.name} is a specialist in ${d.department} at Srikara Hospitals, ${d.branch}. With expertise in ${d.designation.toLowerCase()}, they are dedicated to delivering compassionate, evidence-based care to every patient.`,
    specializations: [
      { label: d.designation.split(",")[0] || d.department, bg: "#e6f4f4", iconColor: color, icon: "shield" },
      { label: d.department, bg: "#eaf3de", iconColor: "#3B6D11", icon: "heart" },
      { label: "Patient Care", bg: "#e6f1fb", iconColor: "#185FA5", icon: "wave" },
      { label: "Expert Consultation", bg: "#faeeda", iconColor: "#854F0B", icon: "award" },
    ],
    education: [
      {
        degree: d.qualification || d.department,
        institute: "Osmania Medical College, Hyderabad",
        year: `${2000 + Math.floor(seededRandom(seed + 5) * 20)}`,
      },
      {
        degree: "MBBS",
        institute: "Gandhi Medical College, Hyderabad",
        year: `${1995 + Math.floor(seededRandom(seed + 6) * 15)}`,
      },
    ],
    workExp: [
      {
        role: d.designation,
        org: `Srikara Hospitals – ${d.branch}`,
        period: `${2015 + Math.floor(seededRandom(seed + 7) * 8)} – Present`,
        code: "SH",
      },
      {
        role: "Consultant",
        org: "Apollo Hospitals, Hyderabad",
        period: `${2010 + Math.floor(seededRandom(seed + 8) * 5)} – ${2015 + Math.floor(seededRandom(seed + 7) * 8)}`,
        code: "AH",
      },
    ],
    patientReviews: [
      {
        name: "Patient",
        stars: 5,
        text: `Excellent doctor. ${d.name} was very thorough and caring throughout the treatment.`,
        date: "1 week ago",
      },
      {
        name: "Satisfied Patient",
        stars: 5,
        text: "Highly recommended. Professional and compassionate care.",
        date: "2 weeks ago",
      },
    ],
    branches: [{ name: `Srikara Hospitals – ${d.branch}`, address: `${d.branch}, Hyderabad` }],
  };
});

// ─────────────────────────────────────────────
// ICON HELPER
// ─────────────────────────────────────────────

function Icon({ name, size = 16, color = "currentColor" }: { name: string; size?: number; color?: string }) {
  const s = { width: size, height: size, stroke: color, fill: "none", strokeWidth: 1.8, flexShrink: 0 } as React.CSSProperties;
  const p: Record<string, React.ReactNode> = {
    heart: <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />,
    wave: <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />,
    shield: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />,
    drop: <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />,
    star: <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" fill={color} stroke="none" />,
    clock: <><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></>,
    pin: <><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></>,
    phone: <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.45a2 2 0 0 1 1.99-2.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.96a16 16 0 0 0 6.29 6.29l1.94-1.94a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />,
    back: <polyline points="15 18 9 12 15 6" />,
    calendar: <><rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></>,
    search: <><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></>,
    brain: <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.46 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 4.44-1.14zm5 0A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96-.46 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-4.44-1.14z" />,
    bone: <path d="M17 10c.7-.7 1-1.5 1-2.5a3.5 3.5 0 0 0-7 0c0 1 .3 1.8 1 2.5L7 15c-.7.7-1 1.5-1 2.5a3.5 3.5 0 0 0 7 0c0-1-.3-1.8-1-2.5l5-5z" />,
    run: <><circle cx="13" cy="4" r="1" /><path d="m7 21 2-7H5l4-7h8l-2 4h2l-3 6H9" /></>,
    spine: <><line x1="12" y1="2" x2="12" y2="22" /><path d="M9 6h6M9 10h6M9 14h6M9 18h6" /></>,
    play: <><circle cx="12" cy="12" r="10" /><polygon points="10 8 16 12 10 16 10 8" fill={color} stroke="none" /></>,
    chevron_right: <polyline points="9 18 15 12 9 6" />,
    award: <><circle cx="12" cy="8" r="6" /><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11" /></>,
    users: <><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></>,
    check: <polyline points="20 6 9 17 4 12" />,
    x: <><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></>,
    activity: <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />,
  };
  return <svg viewBox="0 0 24 24" style={s} xmlns="http://www.w3.org/2000/svg">{p[name] || p["heart"]}</svg>;
}

// ─────────────────────────────────────────────
// DOCTOR CARD
// ─────────────────────────────────────────────

function DoctorCard({ doctor, onClick }: { doctor: Doctor; onClick: () => void }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "#fff", borderRadius: 20, overflow: "hidden",
        border: hovered ? `1.5px solid ${doctor.color}` : "1.5px solid #f0f0f0",
        cursor: "pointer",
        transition: "all 0.35s cubic-bezier(0.34,1.56,0.64,1)",
        transform: hovered ? "translateY(-8px) scale(1.01)" : "translateY(0) scale(1)",
        boxShadow: hovered ? `0 24px 60px ${doctor.color}30` : "0 4px 18px rgba(0,0,0,0.06)",
        position: "relative",
      }}
    >
      {/* Top accent */}
      <div style={{
        height: 4,
        background: `linear-gradient(90deg, ${doctor.color}, #C0145C)`,
        opacity: hovered ? 1 : 0.5,
        transition: "opacity 0.3s",
      }} />

      <div style={{ padding: "18px 18px 16px" }}>
        {/* Availability */}
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 5,
          fontSize: 10, fontWeight: 700, padding: "3px 10px", borderRadius: 20,
          marginBottom: 14, letterSpacing: "0.04em",
          background: doctor.available ? "rgba(22,163,74,0.08)" : "rgba(234,179,8,0.1)",
          color: doctor.available ? "#15803d" : "#b45309",
          border: `1px solid ${doctor.available ? "rgba(22,163,74,0.2)" : "rgba(234,179,8,0.3)"}`,
        }}>
          <span style={{
            width: 5, height: 5, borderRadius: "50%", flexShrink: 0,
            background: doctor.available ? "#16a34a" : "#d97706",
            boxShadow: doctor.available ? "0 0 0 2px rgba(22,163,74,0.25)" : "none",
          }} />
          {doctor.available ? "Available Today" : "Next Available"}
        </div>

        {/* Avatar + Name */}
        <div style={{ display: "flex", gap: 13, alignItems: "flex-start", marginBottom: 14 }}>
          <div style={{
            width: 58, height: 58, borderRadius: 14, overflow: "hidden",
            flexShrink: 0, background: doctor.color,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 17, fontWeight: 800, color: "#fff",
            fontFamily: "'Cormorant Garamond', serif",
            boxShadow: `0 4px 12px ${doctor.color}40`,
            border: "2px solid #f8f8f8",
          }}>
            {doctor.image
              ? <img src={doctor.image} alt={doctor.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              : doctor.initials}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 17, fontWeight: 700, color: "#0f1a1a", marginBottom: 2, lineHeight: 1.2 }}>
              {doctor.name}
            </div>
            <div style={{ fontSize: 11, fontWeight: 700, color: doctor.color, marginBottom: 3, textTransform: "uppercase", letterSpacing: "0.05em" }}>
              {doctor.department}
            </div>
            <div style={{ fontSize: 10, color: "#94a3a3", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              {doctor.qualifications}
            </div>
          </div>
        </div>

        {/* Designation pill */}
        <div style={{
          fontSize: 10, fontWeight: 600, color: doctor.color,
          background: `${doctor.color}12`, padding: "3px 10px", borderRadius: 20,
          display: "inline-block", marginBottom: 10,
          border: `1px solid ${doctor.color}25`,
          maxWidth: "100%", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
        }}>
          {doctor.specialty}
        </div>

        {/* Stats */}
        <div style={{
          display: "flex", alignItems: "center",
          background: "linear-gradient(135deg, #f8fafa, #f0f8f8)",
          borderRadius: 11, padding: "10px 12px", marginBottom: 12,
          border: "1px solid #e8f4f4",
        }}>
          {[
            { v: `⭐ ${doctor.rating}`, l: `${doctor.reviews} reviews` },
            { v: doctor.experience, l: "Experience" },
            { v: doctor.fee, l: "per visit" },
          ].map((s) => (
            <div key={s.l} style={{ flex: 1, textAlign: "center", display: "flex", flexDirection: "column", gap: 2 }}>
              <strong style={{ fontSize: 12, fontWeight: 700, color: "#0f1a1a" }}>{s.v}</strong>
              <small style={{ fontSize: 9, color: "#7a9090" }}>{s.l}</small>
            </div>
          ))}
        </div>

        {/* Tags */}
        <div style={{ display: "flex", gap: 5, flexWrap: "wrap", marginBottom: 14 }}>
          <span style={{ fontSize: 9, fontWeight: 600, color: "#0a6e6e", background: "#e6f4f4", padding: "2px 8px", borderRadius: 20 }}>Telugu</span>
          <span style={{ fontSize: 9, fontWeight: 600, color: "#0a6e6e", background: "#e6f4f4", padding: "2px 8px", borderRadius: 20 }}>English</span>
          <span style={{ fontSize: 9, fontWeight: 600, color: "#C0145C", background: "rgba(192,20,92,0.07)", padding: "2px 8px", borderRadius: 20 }}>
            {doctor.branch}
          </span>
        </div>

        {/* Footer */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 10, color: "#5a7070" }}>
            <Icon name="clock" size={12} color="#7a9090" />
            {doctor.nextSlot}
          </div>
          <button
            onClick={(e) => { e.stopPropagation(); onClick(); }}
            style={{
              background: hovered ? `linear-gradient(135deg, ${doctor.color}, #C0145C)` : "#0a6e6e",
              color: "#fff", border: "none", borderRadius: 9,
              padding: "8px 14px", fontSize: 11, fontWeight: 700,
              transition: "all 0.3s ease", whiteSpace: "nowrap",
              boxShadow: hovered ? `0 4px 16px ${doctor.color}60` : "none",
              cursor: "pointer",
            }}
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// DOCTOR DETAIL
// ─────────────────────────────────────────────

function DoctorDetail({ doctor, onBack }: { doctor: Doctor; onBack: () => void }) {
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [booked, setBooked] = useState(false);
  const [activeTab, setActiveTab] = useState<"overview" | "education" | "reviews">("overview");
  const [scrollY, setScrollY] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = document.getElementById("detail-scroll-container");
    if (!el) return;
    const handler = () => setScrollY(el.scrollTop);
    el.addEventListener("scroll", handler);
    return () => el.removeEventListener("scroll", handler);
  }, []);

  const handleBook = () => {
    if (!selectedSlot) return;
    setBooked(true);
    setTimeout(() => setBooked(false), 3500);
  };

  const parallaxOffset = Math.min(scrollY * 0.4, 80);
  const heroOpacity = Math.max(1 - scrollY / 350, 0);

  return (
    <div id="detail-scroll-container" style={{ minHeight: "100vh", overflowY: "auto", background: "#0a0f0f", fontFamily: "'DM Sans', sans-serif" }}>

      {/* Floating Nav */}
      <div style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        padding: "14px 28px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        background: scrollY > 120 ? "rgba(10,15,15,0.95)" : "transparent",
        backdropFilter: scrollY > 120 ? "blur(20px)" : "none",
        borderBottom: scrollY > 120 ? "1px solid rgba(255,255,255,0.06)" : "none",
        transition: "all 0.4s ease",
      }}>
        <button onClick={onBack} style={{
          display: "flex", alignItems: "center", gap: 8,
          background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)",
          color: "#fff", padding: "8px 16px", borderRadius: 30,
          fontSize: 12, fontWeight: 600, cursor: "pointer",
        }}>
          <Icon name="back" size={14} color="#fff" /> All Doctors
        </button>
        <div style={{ color: "#fff", fontSize: 13, fontWeight: 600, opacity: scrollY > 120 ? 1 : 0, transition: "opacity 0.3s" }}>
          {doctor.name}
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)", color: "#fff", padding: "8px 16px", borderRadius: 30, fontSize: 12, cursor: "pointer" }}>Share</button>
          <button style={{ background: "rgba(192,20,92,0.8)", border: "none", color: "#fff", padding: "8px 16px", borderRadius: 30, fontSize: 12, fontWeight: 700, cursor: "pointer" }}>Save</button>
        </div>
      </div>

      {/* Hero */}
      <div ref={heroRef} style={{ position: "relative", height: "100vh", minHeight: 600, overflow: "hidden", display: "flex", alignItems: "flex-end" }}>
        <div style={{ position: "absolute", inset: 0, background: `linear-gradient(135deg, #0a0f0f 0%, ${doctor.color}22 50%, #C0145C15 100%)` }} />
        <div style={{
          position: "absolute", inset: 0, opacity: 0.04,
          backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          transform: `translateY(${parallaxOffset}px)`,
        }} />
        <div style={{
          position: "absolute", top: "20%", right: "10%",
          width: 400, height: 400, borderRadius: "50%",
          background: `radial-gradient(circle, ${doctor.color}30, transparent 70%)`,
          filter: "blur(40px)",
          transform: `translateY(${parallaxOffset * 0.5}px)`,
        }} />

        {/* Doctor portrait */}
        <div style={{
          position: "absolute", right: "5%", bottom: 0,
          width: "min(45%, 420px)", height: "85%",
          transform: `translateY(${parallaxOffset * 0.2}px)`,
          opacity: heroOpacity,
        }}>
          <div style={{ width: "100%", height: "100%", borderRadius: 24, overflow: "hidden", background: "#000" }}>
            {doctor.image ? (
              <img src={doctor.image} alt={doctor.name}
                style={{ width: "100%", height: "100%", objectFit: "contain", objectPosition: "center", borderRadius: 24 }} />
            ) : (
              <div style={{
                width: "100%", height: "100%",
                display: "flex", alignItems: "center", justifyContent: "center",
                background: `linear-gradient(180deg, ${doctor.color}40 0%, transparent 100%)`,
              }}>
                <span style={{ fontSize: 140, fontWeight: 900, color: "rgba(255,255,255,0.08)", fontFamily: "'Cormorant Garamond', serif" }}>
                  {doctor.initials}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Hero text */}
        <div style={{
          position: "relative", zIndex: 10,
          padding: "0 40px 60px", maxWidth: 600,
          opacity: heroOpacity,
          transform: `translateY(${-parallaxOffset * 0.3}px)`,
        }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 6,
            background: doctor.available ? "rgba(22,163,74,0.12)" : "rgba(234,179,8,0.12)",
            border: `1px solid ${doctor.available ? "rgba(22,163,74,0.3)" : "rgba(234,179,8,0.3)"}`,
            color: doctor.available ? "#4ade80" : "#fbbf24",
            padding: "6px 14px", borderRadius: 30, fontSize: 11, fontWeight: 700,
            marginBottom: 20, backdropFilter: "blur(10px)",
          }}>
            <span style={{
              width: 6, height: 6, borderRadius: "50%",
              background: doctor.available ? "#4ade80" : "#fbbf24",
            }} />
            {doctor.available ? "AVAILABLE TODAY" : `NEXT: ${doctor.nextSlot}`}
          </div>

          <h1 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(36px, 5vw, 62px)",
            fontWeight: 700, color: "#fff", lineHeight: 1.1,
            marginBottom: 10, letterSpacing: "-0.02em",
          }}>{doctor.name}</h1>

          <div style={{ fontSize: 14, fontWeight: 700, color: "#C0145C", textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: 6 }}>
            {doctor.specialty}
          </div>
          <div style={{ fontSize: 12, color: "rgba(255,255,255,0.45)", marginBottom: 28 }}>
            {doctor.qualifications}
          </div>

          <div style={{ display: "flex", gap: 16, flexWrap: "wrap", marginBottom: 32 }}>
            {[
              { icon: "star", val: doctor.rating.toString(), lbl: "Rating", color: "#fbbf24" },
              { icon: "award", val: doctor.experience, lbl: "Experience", color: "#60a5fa" },
              { icon: "users", val: doctor.patients, lbl: "Patients", color: "#34d399" },
            ].map((s) => (
              <div key={s.lbl} style={{
                display: "flex", alignItems: "center", gap: 10,
                background: "rgba(255,255,255,0.05)", backdropFilter: "blur(10px)",
                border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, padding: "10px 16px",
              }}>
                <Icon name={s.icon} size={16} color={s.color} />
                <div>
                  <div style={{ fontSize: 15, fontWeight: 800, color: "#fff" }}>{s.val}</div>
                  <div style={{ fontSize: 9, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "0.06em" }}>{s.lbl}</div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            {doctor.languages.map((l) => (
              <span key={l} style={{
                background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)",
                color: "rgba(255,255,255,0.6)", fontSize: 10, fontWeight: 600, padding: "4px 12px", borderRadius: 20,
              }}>{l}</span>
            ))}
            <span style={{
              background: "rgba(192,20,92,0.2)", border: "1px solid rgba(192,20,92,0.4)",
              color: "#f472b6", fontSize: 10, fontWeight: 700, padding: "4px 12px", borderRadius: 20,
            }}>{doctor.branch}</span>
          </div>
        </div>

        <div style={{
          position: "absolute", bottom: 24, left: "50%", transform: "translateX(-50%)",
          display: "flex", flexDirection: "column", alignItems: "center", gap: 6,
          opacity: Math.max(1 - scrollY / 100, 0),
        }}>
          <div style={{ fontSize: 9, color: "rgba(255,255,255,0.3)", letterSpacing: "0.1em", textTransform: "uppercase" }}>Scroll</div>
          <div style={{ width: 1, height: 30, background: "linear-gradient(to bottom, rgba(255,255,255,0.3), transparent)" }} />
        </div>
      </div>

      {/* Main Content */}
      <div style={{ background: "#f5f7f7" }}>

        {/* Sticky tab bar */}
        <div style={{
          background: "#fff", borderBottom: "1px solid #e8f0f0",
          padding: "16px 40px",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          flexWrap: "wrap", gap: 12,
          position: "sticky", top: 0, zIndex: 50,
        }}>
          <div style={{ display: "flex", gap: 4 }}>
            {(["overview", "education", "reviews"] as const).map((tab) => (
              <button key={tab} onClick={() => setActiveTab(tab)} style={{
                padding: "8px 18px", borderRadius: 9, border: "none", cursor: "pointer",
                fontSize: 12, fontWeight: 600, textTransform: "capitalize",
                background: activeTab === tab ? "#0a0f0f" : "transparent",
                color: activeTab === tab ? "#fff" : "#5a7070",
                transition: "all 0.2s",
              }}>{tab}</button>
            ))}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontSize: 13, color: "#5a7070" }}>Consultation:</span>
            <span style={{ fontSize: 20, fontWeight: 800, color: "#0a6e6e" }}>{doctor.fee}</span>
            <button
              onClick={() => document.getElementById("booking-widget")?.scrollIntoView({ behavior: "smooth" })}
              style={{
                background: "linear-gradient(135deg, #C0145C, #880E4F)",
                color: "#fff", border: "none", borderRadius: 10,
                padding: "10px 22px", fontSize: 12, fontWeight: 700, cursor: "pointer",
                boxShadow: "0 4px 16px rgba(192,20,92,0.35)",
              }}
            >Book Appointment</button>
          </div>
        </div>

        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "40px 24px 80px", display: "flex", gap: 28, alignItems: "flex-start" }}>

          {/* Left content */}
          <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", gap: 24 }}>

            {activeTab === "overview" && (
              <>
                <div style={cardStyle}>
                  <SectionHeading>About</SectionHeading>
                  <p style={{ fontSize: 14, color: "#4a6060", lineHeight: 1.85 }}>{doctor.about}</p>
                </div>
                <div style={cardStyle}>
                  <SectionHeading>Areas of Expertise</SectionHeading>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 12 }}>
                    {doctor.specializations.map((sp) => (
                      <div key={sp.label} style={{
                        display: "flex", alignItems: "center", gap: 12,
                        padding: "14px 16px", borderRadius: 12,
                        border: "1px solid #e8f0f0",
                        background: "linear-gradient(135deg, #fff, #f8fdfd)",
                      }}>
                        <div style={{
                          width: 38, height: 38, borderRadius: 10,
                          background: sp.bg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                        }}>
                          <Icon name={sp.icon} size={16} color={sp.iconColor} />
                        </div>
                        <span style={{ fontSize: 12, fontWeight: 600, color: "#1a2f2f" }}>{sp.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div style={cardStyle}>
                  <SectionHeading>Work Experience</SectionHeading>
                  {doctor.workExp.map((e, i) => (
                    <div key={e.role + i} style={{
                      display: "flex", gap: 16, padding: "16px 0",
                      borderBottom: i < doctor.workExp.length - 1 ? "1px solid #f0f8f8" : "none",
                    }}>
                      <div style={{
                        width: 44, height: 44, borderRadius: 10,
                        background: "linear-gradient(135deg, #e6f4f4, #d0ebeb)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: 11, fontWeight: 800, color: "#0a6e6e", flexShrink: 0,
                      }}>{e.code}</div>
                      <div>
                        <div style={{ fontSize: 14, fontWeight: 700, color: "#1a2f2f" }}>{e.role}</div>
                        <div style={{ fontSize: 12, color: "#4a6060", marginTop: 2 }}>{e.org}</div>
                        <div style={{ fontSize: 10, color: "#9aafaf", marginTop: 4, background: "#f4fafa", padding: "2px 8px", borderRadius: 20, display: "inline-block" }}>{e.period}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}

            {activeTab === "education" && (
              <div style={cardStyle}>
                <SectionHeading>Education & Qualifications</SectionHeading>
                <div style={{ position: "relative", paddingLeft: 28 }}>
                  <div style={{
                    position: "absolute", left: 8, top: 8, bottom: 8,
                    width: 2, background: "linear-gradient(to bottom, #C0145C, #0a6e6e)", borderRadius: 1,
                  }} />
                  {doctor.education.map((e, i) => (
                    <div key={e.degree} style={{
                      position: "relative", marginBottom: 24,
                      background: "#fff", borderRadius: 12, padding: "16px 18px",
                      border: "1px solid #e8f0f0", boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                    }}>
                      <div style={{
                        position: "absolute", left: -38, top: 18,
                        width: 12, height: 12, borderRadius: "50%",
                        background: i === 0 ? "#C0145C" : "#0a6e6e",
                        border: "2px solid #fff",
                      }} />
                      <div style={{ fontSize: 14, fontWeight: 700, color: "#1a2f2f" }}>{e.degree}</div>
                      <div style={{ fontSize: 12, color: "#4a6060", marginTop: 4 }}>{e.institute}</div>
                      <div style={{ fontSize: 10, color: "#C0145C", fontWeight: 700, marginTop: 6, background: "rgba(192,20,92,0.07)", padding: "2px 8px", borderRadius: 20, display: "inline-block" }}>
                        Class of {e.year}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "reviews" && (
              <div style={cardStyle}>
                <SectionHeading>Patient Reviews</SectionHeading>
                <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                  {doctor.patientReviews.map((r, ri) => (
                    <div key={ri} style={{
                      background: "linear-gradient(135deg, #f8fdfd, #fff)",
                      border: "1px solid #e0eeee", borderRadius: 14, padding: "16px 18px",
                    }}>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                        <div>
                          <div style={{ fontSize: 13, fontWeight: 700, color: "#1a2f2f" }}>{r.name}</div>
                          <div style={{ fontSize: 10, color: "#9aafaf", marginTop: 2 }}>{r.date}</div>
                        </div>
                        <div style={{ display: "flex", gap: 2 }}>
                          {Array.from({ length: r.stars }).map((_, i) => <Icon key={i} name="star" size={13} color="#f59e0b" />)}
                        </div>
                      </div>
                      <p style={{ fontSize: 13, color: "#4a6060", lineHeight: 1.7 }}>{r.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div id="booking-widget" style={{ width: 300, flexShrink: 0, display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ background: "#0a0f0f", borderRadius: 20, overflow: "hidden", border: "1px solid rgba(255,255,255,0.06)" }}>
              <div style={{ padding: "20px 18px 0", background: `linear-gradient(135deg, ${doctor.color}20, rgba(192,20,92,0.15))` }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
                  <div>
                    <div style={{ fontSize: 10, color: "rgba(255,255,255,0.4)", marginBottom: 4, textTransform: "uppercase", letterSpacing: "0.06em" }}>Consultation Fee</div>
                    <div style={{ fontSize: 28, fontWeight: 800, color: "#fff" }}>{doctor.fee}</div>
                    <div style={{ fontSize: 10, color: "rgba(255,255,255,0.35)" }}>per visit · Includes follow-up</div>
                  </div>
                  <div style={{
                    background: doctor.available ? "rgba(74,222,128,0.12)" : "rgba(251,191,36,0.12)",
                    border: `1px solid ${doctor.available ? "rgba(74,222,128,0.25)" : "rgba(251,191,36,0.25)"}`,
                    borderRadius: 8, padding: "6px 10px", textAlign: "center",
                  }}>
                    <div style={{ fontSize: 9, color: doctor.available ? "#4ade80" : "#fbbf24", fontWeight: 700 }}>
                      {doctor.available ? "TODAY" : "TOMORROW"}
                    </div>
                  </div>
                </div>
              </div>

              <div style={{ padding: "16px 18px" }}>
                <div style={{ fontSize: 10, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 10 }}>
                  Select Time Slot
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 6, marginBottom: 16 }}>
                  {TIME_SLOTS.map((s) => (
                    <button key={s} onClick={() => setSelectedSlot(s)} style={{
                      padding: "7px 2px", borderRadius: 8,
                      border: `1px solid ${selectedSlot === s ? "#C0145C" : "rgba(255,255,255,0.1)"}`,
                      background: selectedSlot === s ? "rgba(192,20,92,0.25)" : "rgba(255,255,255,0.04)",
                      color: selectedSlot === s ? "#f472b6" : "rgba(255,255,255,0.5)",
                      fontSize: 10, fontWeight: selectedSlot === s ? 700 : 500,
                      cursor: "pointer", transition: "all 0.2s", textAlign: "center",
                    }}>{s}</button>
                  ))}
                </div>

                {booked ? (
                  <div style={{
                    background: "rgba(74,222,128,0.12)", border: "1px solid rgba(74,222,128,0.25)",
                    borderRadius: 10, padding: "12px 16px", display: "flex", alignItems: "center", gap: 8,
                    color: "#4ade80", fontSize: 13, fontWeight: 700,
                  }}>
                    <Icon name="check" size={16} color="#4ade80" /> Booked for {selectedSlot}!
                  </div>
                ) : (
                  <button onClick={handleBook} disabled={!selectedSlot} style={{
                    width: "100%", padding: "13px", borderRadius: 10, border: "none",
                    background: selectedSlot ? "linear-gradient(135deg, #C0145C, #880E4F)" : "rgba(255,255,255,0.06)",
                    color: selectedSlot ? "#fff" : "rgba(255,255,255,0.25)",
                    fontSize: 13, fontWeight: 700, cursor: selectedSlot ? "pointer" : "not-allowed",
                    boxShadow: selectedSlot ? "0 8px 24px rgba(192,20,92,0.4)" : "none",
                    transition: "all 0.3s",
                  }}>
                    {selectedSlot ? `Confirm ${selectedSlot}` : "Select a time slot"}
                  </button>
                )}
                <p style={{ fontSize: 9, color: "rgba(255,255,255,0.2)", textAlign: "center", marginTop: 8 }}>
                  Free cancellation up to 2 hrs before
                </p>
              </div>
            </div>

            <div style={{ background: "#fff", borderRadius: 16, padding: "16px", border: "1px solid #e8f0f0" }}>
              {[
                { icon: "pin", label: "Branch", val: doctor.branch },
                { icon: "clock", label: "Timings", val: "9:00 AM – 6:00 PM" },
                { icon: "phone", label: "Helpline", val: "040 4646 0000" },
              ].map((r, i, a) => (
                <div key={r.label} style={{
                  display: "flex", alignItems: "center", gap: 12, padding: "10px 0",
                  borderBottom: i < a.length - 1 ? "1px solid #f0f8f8" : "none",
                }}>
                  <div style={{ width: 32, height: 32, borderRadius: 8, background: "#e6f4f4", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Icon name={r.icon} size={14} color="#0a6e6e" />
                  </div>
                  <div>
                    <div style={{ fontSize: 10, color: "#9aafaf" }}>{r.label}</div>
                    <div style={{ fontSize: 12, fontWeight: 700, color: "#1a2f2f", marginTop: 1 }}>{r.val}</div>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ background: "#fff", borderRadius: 16, padding: "16px", border: "1px solid #e8f0f0" }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: "#5a7070", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 10 }}>Available At</div>
              {doctor.branches.map((b) => (
                <div key={b.name} style={{
                  display: "flex", alignItems: "flex-start", gap: 10,
                  background: "linear-gradient(135deg, #e6f4f4, #d8eded)", borderRadius: 10, padding: "10px 12px",
                }}>
                  <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#0a6e6e", marginTop: 4, flexShrink: 0 }} />
                  <div>
                    <div style={{ fontSize: 12, fontWeight: 700, color: "#085041" }}>{b.name}</div>
                    <div style={{ fontSize: 10, color: "#0F6E56", marginTop: 2 }}>{b.address}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* YouTube section */}
        <div style={{ background: "#0a0f0f", padding: "70px 24px 80px", borderTop: "1px solid rgba(255,255,255,0.04)" }}>
          <div style={{ maxWidth: 1200, margin: "0 auto" }}>
            <div style={{ marginBottom: 40, textAlign: "center" }}>
              <div style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                background: "rgba(192,20,92,0.1)", border: "1px solid rgba(192,20,92,0.25)",
                borderRadius: 30, padding: "6px 16px", marginBottom: 16,
              }}>
                <Icon name="play" size={12} color="#C0145C" />
                <span style={{ fontSize: 11, fontWeight: 700, color: "#C0145C", letterSpacing: "0.08em", textTransform: "uppercase" }}>Watch & Learn</span>
              </div>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 700, color: "#fff", lineHeight: 1.2, marginBottom: 12 }}>
                Srikara <em style={{ color: "#C0145C", fontStyle: "normal" }}>Excellence</em> on Screen
              </h2>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 20 }}>
              {YOUTUBE_VIDEOS.map((video, idx) => <VideoCard key={video.id} video={video} index={idx} />)}
            </div>
            <div style={{ textAlign: "center", marginTop: 36 }}>
              <a href="https://www.youtube.com/@SrikaraHospitals" target="_blank" rel="noopener noreferrer" style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)",
                color: "rgba(255,255,255,0.7)", padding: "12px 28px", borderRadius: 30,
                fontSize: 13, fontWeight: 600, textDecoration: "none",
              }}>
                View All Videos on YouTube <Icon name="chevron_right" size={14} color="rgba(255,255,255,0.5)" />
              </a>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes pulse { 0%,100%{box-shadow:0 0 8px #4ade80}50%{box-shadow:0 0 16px #4ade80,0 0 24px rgba(74,222,128,0.3)} }
        @keyframes fadeUp { from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)} }
      `}</style>
    </div>
  );
}

function VideoCard({ video, index }: { video: typeof YOUTUBE_VIDEOS[0]; index: number }) {
  const [hovered, setHovered] = useState(false);
  return (
    <a href={`https://www.youtube.com/watch?v=${video.id}`} target="_blank" rel="noopener noreferrer"
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{
        display: "block", textDecoration: "none", borderRadius: 16, overflow: "hidden",
        border: `1px solid ${hovered ? "rgba(192,20,92,0.4)" : "rgba(255,255,255,0.08)"}`,
        transform: hovered ? "translateY(-6px) scale(1.02)" : "translateY(0) scale(1)",
        transition: "all 0.35s cubic-bezier(0.34,1.56,0.64,1)",
        background: "#111819",
        animation: `fadeUp 0.5s ease ${index * 0.1}s both`,
      }}
    >
      <div style={{ position: "relative", paddingTop: "56.25%", background: "#1a2020", overflow: "hidden" }}>
        <img src={`https://img.youtube.com/vi/${video.id}/maxresdefault.jpg`} alt={video.title}
          style={{
            position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover",
            filter: hovered ? "brightness(0.7)" : "brightness(0.5)",
            transform: hovered ? "scale(1.06)" : "scale(1)", transition: "all 0.5s ease",
          }}
          onError={(e) => { (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${video.id}/hqdefault.jpg`; }}
        />
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{
            width: 52, height: 52, borderRadius: "50%",
            background: hovered ? "#C0145C" : "rgba(255,255,255,0.9)",
            display: "flex", alignItems: "center", justifyContent: "center",
            transition: "all 0.3s", transform: hovered ? "scale(1.1)" : "scale(1)",
          }}>
            <svg viewBox="0 0 24 24" style={{ width: 20, height: 20 }}>
              <polygon points="5 3 19 12 5 21 5 3" fill={hovered ? "#fff" : "#C0145C"} />
            </svg>
          </div>
        </div>
      </div>
      <div style={{ padding: "14px 16px 16px" }}>
        <div style={{ fontSize: 9, fontWeight: 700, color: "#C0145C", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 6 }}>{video.subtitle}</div>
        <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 16, fontWeight: 700, color: hovered ? "#fff" : "rgba(255,255,255,0.85)", lineHeight: 1.3 }}>{video.title}</div>
      </div>
    </a>
  );
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      fontFamily: "'Cormorant Garamond', serif", fontSize: 20, fontWeight: 700, color: "#0f1a1a",
      marginBottom: 16, paddingBottom: 12, borderBottom: "2px solid #f0f8f8",
      display: "flex", alignItems: "center", gap: 10,
    }}>
      <span style={{ width: 3, height: 18, background: "linear-gradient(to bottom, #C0145C, #0a6e6e)", borderRadius: 2, display: "inline-block" }} />
      {children}
    </div>
  );
}

const cardStyle: React.CSSProperties = {
  background: "#fff", borderRadius: 18, padding: "24px",
  border: "1px solid #e8f0f0", boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
};

// ─────────────────────────────────────────────
// MAIN PAGE
// ─────────────────────────────────────────────

export default function DoctorsPage() {
  const [activeBranch, setActiveBranch] = useState("all");
  const [activeSpec, setActiveSpec] = useState("All Specialties");
  const [search, setSearch] = useState("");
  const router = useRouter();
const searchParams = useSearchParams();

const slug = searchParams.get("doctor");

const selectedDoctor = DOCTORS.find(
  (d) => d.slug === slug
);

  const filtered = useMemo(() => {
    return DOCTORS.filter((d) => {
      const matchBranch = activeBranch === "all" || d.branchId === activeBranch;
      const matchSpec = activeSpec === "All Specialties" ||
        d.department.toLowerCase() === activeSpec.toLowerCase() ||
        d.department.toLowerCase().includes(activeSpec.toLowerCase());
      const matchSearch =
        d.name.toLowerCase().includes(search.toLowerCase()) ||
        d.department.toLowerCase().includes(search.toLowerCase()) ||
        d.specialty.toLowerCase().includes(search.toLowerCase()) ||
        d.branch.toLowerCase().includes(search.toLowerCase()) ||
        d.qualifications.toLowerCase().includes(search.toLowerCase());
      return matchBranch && matchSpec && matchSearch;
    });
  }, [activeBranch, activeSpec, search]);

  

  if (selectedDoctor) {
  return (
    <>
      <GlobalStyle />
      <DoctorDetail
        doctor={selectedDoctor}
        onBack={() => router.push("/doctors")}
      />
    </>
  );
}

  return (
    <>
      <Navbar />
      <GlobalStyle />
      <div style={{ minHeight: "100vh", fontFamily: "'DM Sans', sans-serif", background: "#f5f7f7" }}>

        {/* Hero */}
        <section style={{
          background: "linear-gradient(135deg, #0a0f0f 0%, #1a0a14 60%, #0f1a1a 100%)",
          padding: "80px 24px 70px", textAlign: "center", position: "relative", overflow: "hidden",
        }}>
          <div style={{ position: "absolute", inset: 0, opacity: 0.03, backgroundImage: "linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)", backgroundSize: "50px 50px" }} />
          <div style={{ position: "absolute", top: -100, left: "20%", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(192,20,92,0.15), transparent 70%)", filter: "blur(40px)" }} />
          <div style={{ position: "absolute", bottom: -100, right: "15%", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(10,110,110,0.15), transparent 70%)", filter: "blur(40px)" }} />

          <div style={{ position: "relative", zIndex: 1 }}>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 6,
              background: "rgba(192,20,92,0.1)", border: "1px solid rgba(192,20,92,0.25)",
              borderRadius: 30, padding: "6px 16px", marginBottom: 24,
              color: "#f472b6", fontSize: 11, fontWeight: 700, letterSpacing: "0.08em",
            }}>✦ Srikara Hospitals · Multiple Branches</div>

            <h1 style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(36px, 6vw, 68px)", fontWeight: 700, color: "#fff",
              lineHeight: 1.1, marginBottom: 16, letterSpacing: "-0.02em",
            }}>
              Find the Right <span style={{ color: "#C0145C" }}>Doctor</span> for You
            </h1>
            <p style={{ fontSize: 15, color: "rgba(255,255,255,0.45)", maxWidth: 480, margin: "0 auto 32px" }}>
              Expert specialists across every domain, available at a Srikara branch near you.
            </p>

            {/* Search */}
            <div style={{
              display: "flex", alignItems: "center", gap: 12,
              background: "rgba(255,255,255,0.05)", backdropFilter: "blur(20px)",
              border: "1px solid rgba(255,255,255,0.1)", borderRadius: 16,
              padding: "14px 20px", maxWidth: 560, margin: "0 auto 32px",
            }}>
              <Icon name="search" size={16} color="rgba(255,255,255,0.3)" />
              <input
                style={{ flex: 1, border: "none", outline: "none", fontSize: 14, color: "#fff", background: "transparent" }}
                placeholder="Search doctor, specialty or branch..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              {search && (
                <button onClick={() => setSearch("")} style={{
                  background: "rgba(255,255,255,0.08)", border: "none", borderRadius: 6,
                  width: 24, height: 24, color: "rgba(255,255,255,0.5)", cursor: "pointer",
                  fontSize: 11, display: "flex", alignItems: "center", justifyContent: "center",
                }}>✕</button>
              )}
            </div>

            {/* Stats */}
            <div style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap" }}>
              {[
                { v: `${DOCTORS.length}+`, l: "Doctors" },
                { v: `${DOCTORS.filter((d) => d.available).length}+`, l: "Available Now" },
                { v: "5", l: "Branches" },
                { v: `${SPECIALTIES.length - 1}`, l: "Specialties" },
              ].map((s) => (
                <div key={s.l} style={{
                  background: "rgba(255,255,255,0.05)", backdropFilter: "blur(10px)",
                  border: "1px solid rgba(255,255,255,0.08)", borderRadius: 12, padding: "12px 20px", textAlign: "center",
                }}>
                  <strong style={{ display: "block", color: "#fff", fontSize: 22, fontWeight: 800, fontFamily: "'Cormorant Garamond', serif" }}>{s.v}</strong>
                  <small style={{ color: "rgba(255,255,255,0.35)", fontSize: 10 }}>{s.l}</small>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Branch tabs */}
        <div style={{ background: "#fff", padding: "20px 24px", borderBottom: "1px solid #e8f0f0" }}>
          <div style={{ maxWidth: 1200, margin: "0 auto" }}>
            <div style={{ fontSize: 10, fontWeight: 800, color: "#9aafaf", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 12 }}>Our Branches</div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {BRANCHES.map((b) => (
                <button key={b.id} onClick={() => setActiveBranch(b.id)} style={{
                  padding: "9px 18px", borderRadius: 10,
                  border: `1.5px solid ${activeBranch === b.id ? "#C0145C" : "#e0eeee"}`,
                  background: activeBranch === b.id ? "rgba(192,20,92,0.06)" : "#fff",
                  fontSize: 12, fontWeight: activeBranch === b.id ? 700 : 500,
                  color: activeBranch === b.id ? "#C0145C" : "#3a5050",
                  cursor: "pointer", transition: "all 0.2s",
                }}>{b.label}</button>
              ))}
            </div>
          </div>
        </div>

        {/* Specialty chips */}
        <div style={{ background: "#f8fafa", padding: "12px 24px", borderBottom: "1px solid #edf0f0" }}>
          <div style={{ maxWidth: 1200, margin: "0 auto" }}>
            <div style={{ display: "flex", gap: 8, overflowX: "auto", scrollbarWidth: "none" }}>
              {SPECIALTIES.map((sp) => (
                <button key={sp} onClick={() => setActiveSpec(sp)} style={{
                  whiteSpace: "nowrap", padding: "7px 16px", borderRadius: 20,
                  border: `1.5px solid ${activeSpec === sp ? "#0a6e6e" : "#e0eaea"}`,
                  background: activeSpec === sp ? "#e6f4f4" : "#fff",
                  fontSize: 12, fontWeight: activeSpec === sp ? 700 : 500,
                  color: activeSpec === sp ? "#0a6e6e" : "#4a6060",
                  flexShrink: 0, cursor: "pointer", transition: "all 0.2s",
                }}>{sp}</button>
              ))}
            </div>
          </div>
        </div>

        {/* Doctors grid */}
        <section style={{ maxWidth: 1200, margin: "0 auto", padding: "32px 24px 80px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 22, flexWrap: "wrap", gap: 10 }}>
            <span style={{ fontSize: 14, fontWeight: 700, color: "#0f1a1a" }}>
              {filtered.length} doctor{filtered.length !== 1 ? "s" : ""} found
              {activeBranch !== "all" && ` · ${BRANCHES.find((b) => b.id === activeBranch)?.label}`}
              {activeSpec !== "All Specialties" && ` · ${activeSpec}`}
            </span>
            <select style={{ border: "1.5px solid #e0eeee", borderRadius: 9, padding: "7px 12px", fontSize: 12, color: "#3a5050", background: "#fff", outline: "none" }}>
              <option>Relevance</option>
              <option>Rating</option>
              <option>Experience</option>
              <option>Fee: Low to High</option>
            </select>
          </div>

          {filtered.length === 0 ? (
            <div style={{ textAlign: "center", padding: "80px 24px", background: "#fff", borderRadius: 20, border: "2px dashed #e0eeee" }}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>🔍</div>
              <h3 style={{ fontSize: 20, fontWeight: 700, color: "#1a2f2f", marginBottom: 8 }}>No doctors found</h3>
              <p style={{ fontSize: 13, color: "#7a9090", marginBottom: 20 }}>Try adjusting your filters.</p>
              <button
                onClick={() => { setActiveBranch("all"); setActiveSpec("All Specialties"); setSearch(""); }}
                style={{ background: "#0a6e6e", color: "#fff", border: "none", borderRadius: 10, padding: "12px 24px", fontSize: 13, fontWeight: 700, cursor: "pointer" }}
              >Reset Filters</button>
            </div>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 18 }}>
              {filtered.map((d) => <DoctorCard key={d.id} doctor={d} onClick={() => router.push(`/doctors?doctor=${d.slug}`)}/>)}
            </div>
          )}
        </section>
      </div>
      <Footer />
    </>
  );
}

function GlobalStyle() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400&family=DM+Sans:wght@300;400;500;600;700&display=swap');
      *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
      html,body{font-family:'DM Sans',sans-serif;background:#f5f7f7;color:#2a3f3f;scroll-behavior:smooth}
      button,input,select{font-family:'DM Sans',sans-serif;cursor:pointer}
      ::-webkit-scrollbar{height:4px;width:4px}
      ::-webkit-scrollbar-track{background:transparent}
      ::-webkit-scrollbar-thumb{background:#c0d8d8;border-radius:2px}
      input::placeholder{color:rgba(255,255,255,0.3)}
    `}</style>
  );
}
