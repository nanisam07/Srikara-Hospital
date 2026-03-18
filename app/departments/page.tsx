"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  Heart, Brain, Bone, Baby, Stethoscope, Activity,
  Eye, Ear, Syringe, Hospital, Microscope,
  Scan, FlaskConical, UserRound, Wind, Droplets,
  ArrowRight, ChevronRight, Phone, Calendar,
} from "lucide-react";

/*
  SRIKARA PALETTE
  Crimson   #C0145C
  Navy      #1C2B4A
  Blue-gray #4A6FA5
  Cream     #F8F6F9
*/

/* ── useInView hook ── */
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

/* ── Data ── */
const DEPARTMENTS = [
  {
    name: "Cardiology",
    tagline: "Heart & Vascular Care",
    icon: <Heart size={26} />,
    color: "#C0145C",
    slug: "cardiology",
    img: "https://images.unsplash.com/photo-1628348068343-c6a848d2b6dd?w=500&q=80&auto=format&fit=crop",
    procedures: 18,
  },
  {
    name: "Neurosciences",
    tagline: "Brain & Spine",
    icon: <Brain size={26} />,
    color: "#6D3FC0",
    slug: "neurosciences",
    img: "https://images.unsplash.com/photo-1559757175-5700dde675bc?w=500&q=80&auto=format&fit=crop",
    procedures: 22,
  },
  {
    name: "Orthopaedics",
    tagline: "Bone & Joint Care",
    icon: <Bone size={26} />,
    color: "#C07014",
    slug: "orthopaedics",
    img: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=500&q=80&auto=format&fit=crop",
    procedures: 15,
  },
  {
    name: "Robotic Surgery",
    tagline: "Minimally Invasive",
    icon: <Syringe size={26} />,
    color: "#0A7A6A",
    slug: "robotic-surgery",
    img: "https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=500&q=80&auto=format&fit=crop",
    procedures: 12,
  },
  {
    name: "Mother & Child",
    tagline: "Obstetrics & Paeds",
    icon: <Baby size={26} />,
    color: "#C0145C",
    slug: "mother-child",
    img: "https://images.unsplash.com/photo-1527613426441-4da17471b66d?w=500&q=80&auto=format&fit=crop",
    procedures: 14,
  },
  {
    name: "Oncology",
    tagline: "Cancer Centre",
    icon: <Microscope size={26} />,
    color: "#9B1212",
    slug: "oncology",
    img: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=500&q=80&auto=format&fit=crop",
    procedures: 20,
  },
  {
    name: "Pulmonology",
    tagline: "Lung & Respiratory",
    icon: <Wind size={26} />,
    color: "#1270A0",
    slug: "pulmonology",
    img: "https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=500&q=80&auto=format&fit=crop",
    procedures: 10,
  },
  {
    name: "Nephrology",
    tagline: "Kidney Function",
    icon: <Droplets size={26} />,
    color: "#1C6EA4",
    slug: "nephrology",
    img: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=500&q=80&auto=format&fit=crop",
    procedures: 9,
  },
  {
    name: "Dental",
    tagline: "Oral Health",
    icon: <UserRound size={26} />,
    color: "#3D7A3D",
    slug: "dental",
    img: "https://images.unsplash.com/photo-1588776814546-daab30f310ce?w=500&q=80&auto=format&fit=crop",
    procedures: 8,
  },
  {
    name: "Ophthalmology",
    tagline: "Eye Care",
    icon: <Eye size={26} />,
    color: "#4A6FA5",
    slug: "ophthalmology",
    img: "https://images.unsplash.com/photo-1516574187841-693083f05b1e?w=500&q=80&auto=format&fit=crop",
    procedures: 11,
  },
  {
    name: "Radiology",
    tagline: "Imaging & Diagnostics",
    icon: <Scan size={26} />,
    color: "#2E6B8A",
    slug: "radiology",
    img: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=500&q=80&auto=format&fit=crop",
    procedures: 13,
  },
  {
    name: "ENT",
    tagline: "Head & Neck",
    icon: <Ear size={26} />,
    color: "#8A5A2E",
    slug: "ent",
    img: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=500&q=80&auto=format&fit=crop",
    procedures: 7,
  },
  {
    name: "General Medicine",
    tagline: "Internal Medicine",
    icon: <Stethoscope size={26} />,
    color: "#1C2B4A",
    slug: "general-medicine",
    img: "https://images.unsplash.com/photo-1631815588090-d4bfec5b1b98?w=500&q=80&auto=format&fit=crop",
    procedures: 16,
  },
  {
    name: "Physiotherapy",
    tagline: "Rehab & Recovery",
    icon: <Activity size={26} />,
    color: "#2A8A5A",
    slug: "physiotherapy",
    img: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=500&q=80&auto=format&fit=crop",
    procedures: 6,
  },
  {
    name: "Dermatology",
    tagline: "Skin & Hair",
    icon: <UserRound size={26} />,
    color: "#C07A14",
    slug: "dermatology",
    img: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=500&q=80&auto=format&fit=crop",
    procedures: 10,
  },
  {
    name: "Emergency",
    tagline: "24/7 Trauma Care",
    icon: <Hospital size={26} />,
    color: "#C01414",
    slug: "emergency",
    img: "https://images.unsplash.com/photo-1504813184591-01572f98c85f?w=500&q=80&auto=format&fit=crop",
    procedures: 25,
  },
  {
    name: "Pathology",
    tagline: "Lab & Diagnostics",
    icon: <FlaskConical size={26} />,
    color: "#2E6B4A",
    slug: "pathology",
    img: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=500&q=80&auto=format&fit=crop",
    procedures: 8,
  },
  {
    name: "Endocrinology",
    tagline: "Hormones & Metabolism",
    icon: <FlaskConical size={26} />,
    color: "#6D2EC0",
    slug: "endocrinology",
    img: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=500&q=80&auto=format&fit=crop",
    procedures: 9,
  },
  {
    name: "Urology",
    tagline: "Urinary Health",
    icon: <Droplets size={26} />,
    color: "#1C6EA4",
    slug: "urology",
    img: "https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=500&q=80&auto=format&fit=crop",
    procedures: 11,
  },
  {
    name: "Psychiatry",
    tagline: "Mental Wellness",
    icon: <Brain size={26} />,
    color: "#4A3D8A",
    slug: "psychiatry",
    img: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=500&q=80&auto=format&fit=crop",
    procedures: 8,
  },
];

const FEATURED_DEPTS = [
  {
    title: "Cardiology",
    sub: "Award-winning cardiac care — from interventional diagnostics and 7 Cath Labs to complex open-heart surgeries performed by India's finest cardiologists.",
    img: "https://images.unsplash.com/photo-1628348068343-c6a848d2b6dd?w=900&q=88&auto=format&fit=crop",
    tag: "7 Cath Labs",
    reverse: false,
    href: "/departments/cardiology",
  },
  {
    title: "Robotic Surgery",
    sub: "India's first robotic surgery centre — minimally invasive procedures across orthopaedics, urology and gynaecology. Smaller incisions. Faster recovery.",
    img: "https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=900&q=88&auto=format&fit=crop",
    tag: "No.1 in South India",
    reverse: true,
    href: "/departments/robotic-surgery",
  },
  {
    title: "Oncology Centre",
    sub: "Comprehensive cancer care — chemotherapy, radiation, immunotherapy and surgical oncology under one roof with a compassionate multidisciplinary team.",
    img: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=900&q=88&auto=format&fit=crop",
    tag: "Full Spectrum",
    reverse: false,
    href: "/departments/oncology",
  },
];

const DOCTORS = [
  {
    name: "Dr. Rajesh Kumar",
    dept: "Cardiology",
    exp: "15+ Years",
    img: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&q=80&auto=format&fit=crop",
    color: "#C0145C",
  },
  {
    name: "Dr. Sneha Reddy",
    dept: "Neurosciences",
    exp: "12+ Years",
    img: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&q=80&auto=format&fit=crop",
    color: "#6D3FC0",
  },
  {
    name: "Dr. Arjun Mehta",
    dept: "Orthopaedics",
    exp: "10+ Years",
    img: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&q=80&auto=format&fit=crop",
    color: "#C07014",
  },
  {
    name: "Dr. Priya Sharma",
    dept: "Robotic Surgery",
    exp: "14+ Years",
    img: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&q=80&auto=format&fit=crop",
    color: "#0A7A6A",
  },
];

/* ── FadeUp wrapper ── */
function FadeUp({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const { ref, inView } = useInView(0.1);
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(36px)",
        transition: `opacity 0.75s ease ${delay}ms, transform 0.75s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

/* ── Department card ── */
function DeptCard({ dept, index }: { dept: (typeof DEPARTMENTS)[0]; index: number }) {
  const [hovered, setHovered] = useState(false);
  const { ref, inView } = useInView(0.08);

  return (
    <div
      ref={ref}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.6s ease ${(index % 4) * 80}ms, transform 0.6s ease ${(index % 4) * 80}ms`,
      }}
    >
      <Link href={`/departments/${dept.slug}`}>
        <div
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          style={{
            background: "#fff",
            borderRadius: 22,
            overflow: "hidden",
            border: "1px solid #EDE8F0",
            cursor: "pointer",
            transform: hovered ? "translateY(-7px)" : "translateY(0)",
            boxShadow: hovered
              ? "0 24px 48px rgba(28,43,74,0.14)"
              : "0 2px 12px rgba(0,0,0,0.04)",
            transition: "transform 0.35s ease, box-shadow 0.35s ease",
          }}
        >
          {/* Image */}
          <div style={{ height: 150, overflow: "hidden", position: "relative" }}>
            <img
              src={dept.img}
              alt={dept.name}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
                transform: hovered ? "scale(1.06)" : "scale(1)",
                transition: "transform 0.6s ease",
              }}
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: `linear-gradient(to top, ${dept.color}cc 0%, transparent 55%)`,
              }}
            />
            {/* Icon badge */}
            <div
              style={{
                position: "absolute",
                top: 12,
                left: 12,
                width: 40,
                height: 40,
                borderRadius: 12,
                background: "rgba(255,255,255,0.92)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: dept.color,
                boxShadow: "0 4px 12px rgba(0,0,0,0.12)",
              }}
            >
              {dept.icon}
            </div>
          </div>

          {/* Text */}
          <div style={{ padding: "14px 16px 12px" }}>
            <h3
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: 16,
                fontWeight: 700,
                color: "#1C2B4A",
                marginBottom: 3,
              }}
            >
              {dept.name}
            </h3>
            <p style={{ fontSize: 11, color: "#9CA3AF", marginBottom: 10 }}>
              {dept.tagline}
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
                {dept.procedures} procedures
              </span>
              <span style={{ color: dept.color, fontSize: 14 }}>→</span>
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
export default function DepartmentsPage() {
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");

  const FILTERS = ["All", "Surgery", "Diagnostics", "Medicine", "Emergency"];

  const filtered = DEPARTMENTS.filter((d) =>
    d.name.toLowerCase().includes(search.toLowerCase()) ||
    d.tagline.toLowerCase().includes(search.toLowerCase())
  );

  const globalCSS = `
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,700&family=Outfit:wght@300;400;500;600;700;800&display=swap');

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: 'Outfit', sans-serif; }

    @keyframes dp-fadeUp {
      from { opacity: 0; transform: translateY(40px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    @keyframes dp-fadeIn {
      from { opacity: 0; }
      to   { opacity: 1; }
    }
    @keyframes dp-slideRight {
      from { opacity: 0; transform: translateX(-30px); }
      to   { opacity: 1; transform: translateX(0); }
    }
    @keyframes dp-marquee {
      from { transform: translateX(0); }
      to   { transform: translateX(-50%); }
    }
    @keyframes dp-pulse {
      0%,100% { transform: scale(1); opacity: 0.6; }
      50%      { transform: scale(1.4); opacity: 0.15; }
    }
    @keyframes dp-float {
      0%,100% { transform: translateY(0); }
      50%      { transform: translateY(-10px); }
    }

    .dp-hero-h1 {
      animation: dp-fadeUp 0.9s ease 0.1s both;
    }
    .dp-hero-sub {
      animation: dp-fadeUp 0.9s ease 0.28s both;
    }
    .dp-hero-btns {
      animation: dp-fadeUp 0.9s ease 0.44s both;
    }
    .dp-hero-stats {
      animation: dp-fadeUp 0.9s ease 0.58s both;
    }
    .dp-hero-img {
      animation: dp-fadeIn 1.1s ease 0.2s both;
    }

    .dp-filter-btn {
      padding: 8px 20px;
      border-radius: 50px;
      font-size: 11px;
      font-weight: 800;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      cursor: pointer;
      border: 2px solid transparent;
      font-family: 'Outfit', sans-serif;
      transition: all 0.22s;
    }
    .dp-filter-btn.active  { background: #1C2B4A; color: #fff; border-color: #1C2B4A; }
    .dp-filter-btn.inactive{ background: transparent; color: #6B7280; border-color: #E5E7EB; }
    .dp-filter-btn.inactive:hover { border-color: #1C2B4A; color: #1C2B4A; }

    .dp-search {
      width: 100%;
      padding: 14px 20px 14px 48px;
      border-radius: 50px;
      border: 2px solid #EDE8F0;
      background: #fff;
      font-size: 14px;
      font-family: 'Outfit', sans-serif;
      color: #1C2B4A;
      outline: none;
      transition: border-color 0.22s, box-shadow 0.22s;
    }
    .dp-search:focus {
      border-color: #C0145C;
      box-shadow: 0 0 0 4px rgba(192,20,92,0.08);
    }

    .dp-img-zoom img { transition: transform 0.65s ease; }
    .dp-img-zoom:hover img { transform: scale(1.05); }

    .dp-doc-card {
      transition: transform 0.36s ease, box-shadow 0.36s ease;
    }
    .dp-doc-card:hover {
      transform: translateY(-7px);
      box-shadow: 0 24px 48px rgba(28,43,74,0.14) !important;
    }

    a { text-decoration: none; color: inherit; }
    input::placeholder { color: #9CA3AF; }
    ::-webkit-scrollbar { width: 5px; }
    ::-webkit-scrollbar-thumb { background: #C0145C; border-radius: 3px; }
  `;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: globalCSS }} />

      <div style={{ background: "#F8F6F9", minHeight: "100vh" }}>

        {/* ═══════════════════════════════════════════
            §1  HERO
        ═══════════════════════════════════════════ */}
        <section
          style={{
            position: "relative",
            overflow: "hidden",
            background: "#1C2B4A",
            minHeight: 560,
            display: "flex",
            alignItems: "center",
          }}
        >
          {/* Background texture */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              opacity: 0.04,
              backgroundImage: "radial-gradient(rgba(255,255,255,0.9) 1px, transparent 1px)",
              backgroundSize: "28px 28px",
              pointerEvents: "none",
            }}
          />
          {/* Right ambient glow */}
          <div
            style={{
              position: "absolute",
              right: -100,
              top: -100,
              width: 600,
              height: 600,
              borderRadius: "50%",
              background: "#C0145C",
              opacity: 0.08,
              filter: "blur(100px)",
              pointerEvents: "none",
            }}
          />

          <div
            style={{
              maxWidth: 1300,
              margin: "0 auto",
              padding: "100px 8vw 80px",
              width: "100%",
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 60,
              alignItems: "center",
            }}
          >
            {/* Left: text */}
            <div>
              {/* Breadcrumb */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  marginBottom: 24,
                  animation: "dp-slideRight 0.7s ease 0.05s both",
                }}
              >
                <Link
                  href="/"
                  style={{ fontSize: 12, color: "rgba(255,255,255,0.45)", fontWeight: 500 }}
                >
                  Home
                </Link>
                <ChevronRight size={12} color="rgba(255,255,255,0.3)" />
                <span
                  style={{
                    fontSize: 12,
                    color: "#C0145C",
                    fontWeight: 700,
                    letterSpacing: "0.06em",
                  }}
                >
                  Departments
                </span>
              </div>

              <div
                className="dp-hero-h1"
                style={{
                  fontSize: 10,
                  fontWeight: 800,
                  letterSpacing: "0.4em",
                  textTransform: "uppercase",
                  color: "#C0145C",
                  marginBottom: 14,
                }}
              >
                Medical Excellence
              </div>

              <h1
                className="dp-hero-h1"
                style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontSize: "clamp(36px, 4.5vw, 60px)",
                  fontWeight: 700,
                  color: "#fff",
                  lineHeight: 1.1,
                  marginBottom: 18,
                }}
              >
                World-Class
                <br />
                <em style={{ color: "#C0145C", fontStyle: "italic", fontWeight: 400 }}>
                  Specializations
                </em>
              </h1>

              <p
                className="dp-hero-sub"
                style={{
                  fontSize: 15,
                  color: "rgba(255,255,255,0.58)",
                  lineHeight: 1.82,
                  marginBottom: 36,
                  maxWidth: 460,
                  fontWeight: 300,
                }}
              >
                42 departments. 300+ specialists. State-of-the-art technology. Every
                condition treated with precision, compassion and India's most
                advanced medical expertise.
              </p>

              <div
                className="dp-hero-btns"
                style={{ display: "flex", gap: 14, flexWrap: "wrap", marginBottom: 44 }}
              >
                <Link href="/doctors">
                  <button
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 8,
                      padding: "13px 28px",
                      borderRadius: 50,
                      background: "linear-gradient(135deg,#C0145C,#e8457e)",
                      color: "#fff",
                      fontFamily: "'Outfit',sans-serif",
                      fontWeight: 800,
                      fontSize: 12,
                      letterSpacing: "0.09em",
                      textTransform: "uppercase",
                      border: "none",
                      cursor: "pointer",
                      boxShadow: "0 8px 24px rgba(192,20,92,0.38)",
                      transition: "transform 0.25s, box-shadow 0.25s",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "translateY(-2px)";
                      e.currentTarget.style.boxShadow = "0 14px 32px rgba(192,20,92,0.5)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow = "0 8px 24px rgba(192,20,92,0.38)";
                    }}
                  >
                    <Calendar size={14} />
                    Book Appointment
                  </button>
                </Link>
                <a href="tel:1800-123-4567">
                  <button
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 8,
                      padding: "12px 24px",
                      borderRadius: 50,
                      background: "transparent",
                      color: "#fff",
                      fontFamily: "'Outfit',sans-serif",
                      fontWeight: 700,
                      fontSize: 12,
                      letterSpacing: "0.09em",
                      textTransform: "uppercase",
                      border: "2px solid rgba(255,255,255,0.28)",
                      cursor: "pointer",
                      transition: "background 0.22s",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.background = "rgba(255,255,255,0.1)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.background = "transparent")
                    }
                  >
                    <Phone size={13} />
                    Emergency: 1800-123-4567
                  </button>
                </a>
              </div>

              {/* Quick stats */}
              <div
                className="dp-hero-stats"
                style={{ display: "flex", gap: 32, flexWrap: "wrap" }}
              >
                {[
                  { n: "42+", l: "Departments" },
                  { n: "300+", l: "Specialists" },
                  { n: "24/7", l: "Emergency" },
                ].map((s) => (
                  <div key={s.l}>
                    <div
                      style={{
                        fontFamily: "'Cormorant Garamond',Georgia,serif",
                        fontSize: 30,
                        fontWeight: 700,
                        color: "#C0145C",
                        lineHeight: 1,
                      }}
                    >
                      {s.n}
                    </div>
                    <div
                      style={{
                        fontSize: 10,
                        fontWeight: 700,
                        letterSpacing: "0.18em",
                        textTransform: "uppercase",
                        color: "rgba(255,255,255,0.38)",
                        marginTop: 4,
                      }}
                    >
                      {s.l}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: image mosaic */}
            <div
              className="dp-hero-img"
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gridTemplateRows: "230px 180px",
                gap: 12,
              }}
            >
              {/* Big top-left */}
              <div
                className="dp-img-zoom"
                style={{ gridRow: "1/3", borderRadius: 24, overflow: "hidden", position: "relative" }}
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
                    background: "linear-gradient(to top, rgba(28,43,74,0.7) 0%, transparent 55%)",
                  }}
                />
                <span
                  style={{
                    position: "absolute",
                    bottom: 14,
                    left: 14,
                    fontSize: 9,
                    fontWeight: 800,
                    textTransform: "uppercase",
                    letterSpacing: "0.16em",
                    padding: "5px 12px",
                    borderRadius: 50,
                    background: "rgba(192,20,92,0.85)",
                    color: "#fff",
                  }}
                >
                  Robotic Surgery
                </span>
              </div>
              {/* Top-right */}
              <div
                className="dp-img-zoom"
                style={{ borderRadius: 24, overflow: "hidden" }}
              >
                <img
                  src="https://images.unsplash.com/photo-1628348068343-c6a848d2b6dd?w=500&q=88&auto=format&fit=crop"
                  alt="Cardiology"
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                />
              </div>
              {/* Bottom-right */}
              <div
                className="dp-img-zoom"
                style={{ borderRadius: 24, overflow: "hidden", position: "relative" }}
              >
                <img
                  src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=500&q=88&auto=format&fit=crop"
                  alt="Oncology"
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                />
                <div
                  style={{
                    position: "absolute",
                    top: 10,
                    right: 10,
                    background: "#0A7A6A",
                    borderRadius: 12,
                    padding: "7px 11px",
                    textAlign: "center",
                  }}
                >
                  <div
                    style={{
                      fontFamily: "'Cormorant Garamond',Georgia,serif",
                      fontSize: 17,
                      fontWeight: 700,
                      color: "#fff",
                      lineHeight: 1,
                    }}
                  >
                    42+
                  </div>
                  <div
                    style={{
                      fontSize: 7,
                      color: "rgba(255,255,255,0.7)",
                      fontWeight: 700,
                      textTransform: "uppercase",
                    }}
                  >
                    Depts
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════
            §2  MARQUEE STRIP
        ═══════════════════════════════════════════ */}
        <section
          style={{ background: "#0f1a2e", padding: "11px 0", overflow: "hidden" }}
        >
          <div style={{ display: "flex", width: "max-content", animation: "dp-marquee 28s linear infinite" }}>
            {[...Array(2)].map((_, ri) =>
              ["Cardiology", "Neurosciences", "Orthopaedics", "Robotic Surgery", "Oncology", "Emergency", "Pulmonology", "ENT", "Dental", "Ophthalmology", "Nephrology", "Radiology"].map(
                (dept) => (
                  <span
                    key={`${ri}-${dept}`}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 12,
                      marginRight: 40,
                      fontSize: 9,
                      fontWeight: 800,
                      letterSpacing: "0.22em",
                      textTransform: "uppercase",
                      color: "rgba(255,255,255,0.38)",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {dept}
                    <span
                      style={{
                        width: 3,
                        height: 3,
                        borderRadius: "50%",
                        background: "#C0145C",
                        opacity: 0.7,
                        flexShrink: 0,
                      }}
                    />
                  </span>
                )
              )
            )}
          </div>
        </section>

        {/* ═══════════════════════════════════════════
            §3  INTRO — about + stats
        ═══════════════════════════════════════════ */}
        <section style={{ padding: "96px 8vw", background: "#fff" }}>
          <div
            style={{
              maxWidth: 1300,
              margin: "0 auto",
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 72,
              alignItems: "center",
            }}
          >
            {/* Left image */}
            <FadeUp>
              <div
                className="dp-img-zoom"
                style={{ borderRadius: 28, overflow: "hidden", height: 460, position: "relative" }}
              >
                <img
                  src="https://images.unsplash.com/photo-1666214280557-f1b5022eb634?w=800&q=88&auto=format&fit=crop"
                  alt="Advanced Care"
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                />
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "linear-gradient(to top, rgba(28,43,74,0.72) 0%, transparent 55%)",
                  }}
                />
                {/* Floating badge */}
                <div
                  style={{
                    position: "absolute",
                    bottom: 28,
                    left: 28,
                    right: 28,
                  }}
                >
                  <div
                    style={{
                      background: "rgba(255,255,255,0.1)",
                      backdropFilter: "blur(12px)",
                      border: "1px solid rgba(255,255,255,0.2)",
                      borderRadius: 18,
                      padding: "16px 20px",
                      display: "flex",
                      gap: 20,
                    }}
                  >
                    {[
                      { n: "500+", l: "Monthly\nConsultations" },
                      { n: "98%", l: "Patient\nSatisfaction" },
                    ].map((s) => (
                      <div key={s.l} style={{ flex: 1, textAlign: "center" }}>
                        <div
                          style={{
                            fontFamily: "'Cormorant Garamond',Georgia,serif",
                            fontSize: 26,
                            fontWeight: 700,
                            color: "#C0145C",
                            lineHeight: 1,
                          }}
                        >
                          {s.n}
                        </div>
                        <div
                          style={{
                            fontSize: 9,
                            color: "rgba(255,255,255,0.6)",
                            fontWeight: 700,
                            textTransform: "uppercase",
                            letterSpacing: "0.1em",
                            marginTop: 4,
                            whiteSpace: "pre",
                          }}
                        >
                          {s.l}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </FadeUp>

            {/* Right text */}
            <FadeUp delay={120}>
              <div>
                <div
                  style={{
                    fontSize: 10,
                    fontWeight: 800,
                    letterSpacing: "0.38em",
                    textTransform: "uppercase",
                    color: "#C0145C",
                    marginBottom: 12,
                  }}
                >
                  Advanced Multispecialty Care
                </div>
                <h2
                  style={{
                    fontFamily: "'Cormorant Garamond',Georgia,serif",
                    fontSize: "clamp(26px,3vw,42px)",
                    fontWeight: 700,
                    color: "#1C2B4A",
                    lineHeight: 1.18,
                    marginBottom: 18,
                  }}
                >
                  Everything You Need,
                  <br />
                  <em style={{ color: "#0A7A6A", fontStyle: "italic", fontWeight: 400 }}>
                    Under One Roof
                  </em>
                </h2>
                <p
                  style={{
                    fontSize: 14,
                    color: "#6B7280",
                    lineHeight: 1.9,
                    marginBottom: 14,
                  }}
                >
                  Our hospital offers a complete ecosystem of healthcare services,
                  combining expert doctors, cutting-edge infrastructure and a
                  patient-first philosophy. From emergency trauma to robotic surgery,
                  we deliver outcomes that matter.
                </p>
                <p
                  style={{
                    fontSize: 14,
                    color: "#6B7280",
                    lineHeight: 1.9,
                    marginBottom: 32,
                  }}
                >
                  We focus on early diagnosis, precision treatment and faster
                  recovery — so you can get back to living your best life.
                </p>

                {/* Checklist */}
                {[
                  "India's First Robotic Surgery Centre",
                  "NABH Accredited — multiple campuses",
                  "Same-day diagnostics & lab results",
                  "24/7 emergency & critical care",
                ].map((p) => (
                  <div
                    key={p}
                    style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}
                  >
                    <div
                      style={{
                        width: 22,
                        height: 22,
                        borderRadius: "50%",
                        background: "rgba(192,20,92,0.1)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      <div
                        style={{ width: 6, height: 6, borderRadius: "50%", background: "#C0145C" }}
                      />
                    </div>
                    <span style={{ fontSize: 13, color: "#374151", fontWeight: 500 }}>{p}</span>
                  </div>
                ))}

                {/* 4 stat boxes */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(3,1fr)",
                    gap: 14,
                    marginTop: 32,
                  }}
                >
                  {[
                    { n: "42+", l: "Departments", c: "#C0145C" },
                    { n: "300+", l: "Doctors", c: "#1C2B4A" },
                    { n: "24/7", l: "Emergency", c: "#0A7A6A" },
                  ].map((s) => (
                    <div
                      key={s.l}
                      style={{
                        background: "#F8F6F9",
                        borderRadius: 16,
                        padding: "18px 14px",
                        textAlign: "center",
                        border: "1px solid #EDE8F0",
                      }}
                    >
                      <div
                        style={{
                          fontFamily: "'Cormorant Garamond',Georgia,serif",
                          fontSize: 28,
                          fontWeight: 700,
                          color: s.c,
                          lineHeight: 1,
                        }}
                      >
                        {s.n}
                      </div>
                      <div style={{ fontSize: 10, color: "#9CA3AF", fontWeight: 600, marginTop: 4 }}>
                        {s.l}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </FadeUp>
          </div>
        </section>

        {/* ═══════════════════════════════════════════
            §4  FEATURED DEPARTMENTS — alternating panels
        ═══════════════════════════════════════════ */}
        <section style={{ background: "#F8F6F9" }}>
          <div style={{ maxWidth: 1300, margin: "0 auto", padding: "80px 8vw 0" }}>
            <FadeUp>
              <div style={{ textAlign: "center", marginBottom: 56 }}>
                <div
                  style={{
                    fontSize: 10,
                    fontWeight: 800,
                    letterSpacing: "0.38em",
                    textTransform: "uppercase",
                    color: "#C0145C",
                    marginBottom: 10,
                  }}
                >
                  Centres of Excellence
                </div>
                <h2
                  style={{
                    fontFamily: "'Cormorant Garamond',Georgia,serif",
                    fontSize: "clamp(26px,3vw,42px)",
                    fontWeight: 700,
                    color: "#1C2B4A",
                  }}
                >
                  Our Flagship{" "}
                  <em style={{ color: "#0A7A6A", fontStyle: "italic", fontWeight: 400 }}>
                    Specialties
                  </em>
                </h2>
              </div>
            </FadeUp>
          </div>

          {FEATURED_DEPTS.map((item, i) => {
            const textBlock = (
              <div
                style={{
                  padding: "64px 6vw",
                  background: i % 2 === 0 ? "#fff" : "#F8F6F9",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <span
                  style={{
                    display: "inline-block",
                    fontSize: 9,
                    fontWeight: 800,
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    padding: "5px 14px",
                    borderRadius: 50,
                    background: "rgba(192,20,92,0.1)",
                    color: "#C0145C",
                    marginBottom: 18,
                    width: "fit-content",
                  }}
                >
                  {item.tag}
                </span>
                <h3
                  style={{
                    fontFamily: "'Cormorant Garamond',Georgia,serif",
                    fontSize: 34,
                    fontWeight: 700,
                    color: "#1C2B4A",
                    lineHeight: 1.18,
                    marginBottom: 16,
                  }}
                >
                  {item.title}
                </h3>
                <p
                  style={{
                    fontSize: 14,
                    color: "#6B7280",
                    lineHeight: 1.9,
                    marginBottom: 28,
                  }}
                >
                  {item.sub}
                </p>
                <Link href={item.href}>
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 8,
                      fontSize: 12,
                      fontWeight: 800,
                      color: "#C0145C",
                      letterSpacing: "0.06em",
                      textTransform: "uppercase",
                      cursor: "pointer",
                    }}
                  >
                    Learn More <ArrowRight size={14} />
                  </span>
                </Link>
              </div>
            );

            const imgBlock = (
              <div
                className="dp-img-zoom"
                style={{ height: 400, overflow: "hidden" }}
              >
                <img
                  src={item.img}
                  alt={item.title}
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                />
              </div>
            );

            return (
              <FadeUp key={item.title} delay={i * 60}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", marginBottom: 3 }}>
                  {item.reverse ? <>{textBlock}{imgBlock}</> : <>{imgBlock}{textBlock}</>}
                </div>
              </FadeUp>
            );
          })}
        </section>

        {/* ═══════════════════════════════════════════
            §5  ALL DEPARTMENTS — searchable grid
        ═══════════════════════════════════════════ */}
        <section style={{ padding: "96px 8vw", background: "#fff" }}>
          <div style={{ maxWidth: 1300, margin: "0 auto" }}>
            <FadeUp>
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-end",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                  gap: 24,
                  marginBottom: 44,
                }}
              >
                <div>
                  <div
                    style={{
                      fontSize: 10,
                      fontWeight: 800,
                      letterSpacing: "0.38em",
                      textTransform: "uppercase",
                      color: "#C0145C",
                      marginBottom: 10,
                    }}
                  >
                    Browse Specialties
                  </div>
                  <h2
                    style={{
                      fontFamily: "'Cormorant Garamond',Georgia,serif",
                      fontSize: "clamp(26px,3vw,42px)",
                      fontWeight: 700,
                      color: "#1C2B4A",
                    }}
                  >
                    All{" "}
                    <em style={{ color: "#0A7A6A", fontStyle: "italic", fontWeight: 400 }}>
                      Departments
                    </em>
                  </h2>
                </div>

                {/* Search */}
                <div style={{ position: "relative", width: 300 }}>
                  <Stethoscope
                    size={16}
                    style={{
                      position: "absolute",
                      left: 18,
                      top: "50%",
                      transform: "translateY(-50%)",
                      color: "#9CA3AF",
                    }}
                  />
                  <input
                    className="dp-search"
                    type="text"
                    placeholder="Search departments..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
              </div>

              {/* Filter tabs */}
              <div style={{ display: "flex", gap: 8, marginBottom: 36, flexWrap: "wrap" }}>
                {FILTERS.map((f) => (
                  <button
                    key={f}
                    className={`dp-filter-btn ${activeFilter === f ? "active" : "inactive"}`}
                    onClick={() => setActiveFilter(f)}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </FadeUp>

            {/* Dept grid */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4,1fr)",
                gap: 20,
              }}
            >
              {filtered.map((dept, i) => (
                <DeptCard key={dept.slug} dept={dept} index={i} />
              ))}
            </div>

            {filtered.length === 0 && (
              <div style={{ textAlign: "center", padding: "60px 0", color: "#9CA3AF" }}>
                <div style={{ fontSize: 40, marginBottom: 12 }}>🔍</div>
                <p style={{ fontSize: 15, fontWeight: 600 }}>No departments found for "{search}"</p>
              </div>
            )}
          </div>
        </section>

        {/* ═══════════════════════════════════════════
            §6  MEET THE SPECIALISTS
        ═══════════════════════════════════════════ */}
        <section style={{ padding: "96px 8vw", background: "#F8F6F9" }}>
          <div style={{ maxWidth: 1300, margin: "0 auto" }}>
            <FadeUp>
              <div style={{ textAlign: "center", marginBottom: 52 }}>
                <div
                  style={{
                    fontSize: 10,
                    fontWeight: 800,
                    letterSpacing: "0.38em",
                    textTransform: "uppercase",
                    color: "#C0145C",
                    marginBottom: 10,
                  }}
                >
                  Meet the Team
                </div>
                <h2
                  style={{
                    fontFamily: "'Cormorant Garamond',Georgia,serif",
                    fontSize: "clamp(26px,3vw,42px)",
                    fontWeight: 700,
                    color: "#1C2B4A",
                  }}
                >
                  Our Leading{" "}
                  <em style={{ color: "#0A7A6A", fontStyle: "italic", fontWeight: 400 }}>
                    Specialists
                  </em>
                </h2>
                <p
                  style={{
                    fontSize: 14,
                    color: "#6B7280",
                    marginTop: 12,
                    maxWidth: 440,
                    margin: "12px auto 0",
                    lineHeight: 1.8,
                  }}
                >
                  300+ internationally recognised professionals dedicated to your
                  recovery.
                </p>
              </div>
            </FadeUp>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4,1fr)",
                gap: 24,
              }}
            >
              {DOCTORS.map((doc, i) => (
                <FadeUp key={doc.name} delay={i * 80}>
                  <div
                    className="dp-doc-card"
                    style={{
                      background: "#fff",
                      borderRadius: 24,
                      overflow: "hidden",
                      border: "1px solid #EDE8F0",
                      boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
                    }}
                  >
                    {/* Photo */}
                    <div
                      className="dp-img-zoom"
                      style={{ height: 220, overflow: "hidden", position: "relative" }}
                    >
                      <img
                        src={doc.img}
                        alt={doc.name}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          objectPosition: "top",
                          display: "block",
                        }}
                      />
                      <div
                        style={{
                          position: "absolute",
                          inset: 0,
                          background: `linear-gradient(to top, ${doc.color}cc 0%, transparent 55%)`,
                        }}
                      />
                      {/* Experience badge */}
                      <div
                        style={{
                          position: "absolute",
                          top: 12,
                          right: 12,
                          background: "rgba(255,255,255,0.92)",
                          borderRadius: 10,
                          padding: "5px 10px",
                        }}
                      >
                        <div
                          style={{ fontSize: 10, fontWeight: 800, color: doc.color }}
                        >
                          {doc.exp}
                        </div>
                      </div>
                    </div>

                    {/* Info */}
                    <div style={{ padding: "18px 18px 16px" }}>
                      <h3
                        style={{
                          fontFamily: "'Cormorant Garamond',Georgia,serif",
                          fontSize: 17,
                          fontWeight: 700,
                          color: "#1C2B4A",
                          marginBottom: 4,
                        }}
                      >
                        {doc.name}
                      </h3>
                      <p
                        style={{
                          fontSize: 10,
                          fontWeight: 800,
                          textTransform: "uppercase",
                          letterSpacing: "0.16em",
                          color: doc.color,
                          marginBottom: 14,
                        }}
                      >
                        {doc.dept}
                      </p>
                      <Link href="/doctors">
                        <button
                          style={{
                            width: "100%",
                            padding: "10px",
                            borderRadius: 50,
                            background: "linear-gradient(135deg,#C0145C,#e8457e)",
                            color: "#fff",
                            fontFamily: "'Outfit',sans-serif",
                            fontSize: 10,
                            fontWeight: 800,
                            letterSpacing: "0.12em",
                            textTransform: "uppercase",
                            border: "none",
                            cursor: "pointer",
                            boxShadow: "0 4px 14px rgba(192,20,92,0.28)",
                            transition: "transform 0.22s, box-shadow 0.22s",
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.transform = "translateY(-2px)";
                            e.currentTarget.style.boxShadow =
                              "0 8px 22px rgba(192,20,92,0.4)";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.transform = "translateY(0)";
                            e.currentTarget.style.boxShadow =
                              "0 4px 14px rgba(192,20,92,0.28)";
                          }}
                        >
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
                  <button
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 8,
                      padding: "13px 32px",
                      borderRadius: 50,
                      background: "transparent",
                      color: "#1C2B4A",
                      fontFamily: "'Outfit',sans-serif",
                      fontWeight: 800,
                      fontSize: 12,
                      letterSpacing: "0.09em",
                      textTransform: "uppercase",
                      border: "2px solid #1C2B4A",
                      cursor: "pointer",
                      transition: "all 0.25s",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "#1C2B4A";
                      e.currentTarget.style.color = "#fff";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "transparent";
                      e.currentTarget.style.color = "#1C2B4A";
                    }}
                  >
                    View All 300+ Specialists <ArrowRight size={14} />
                  </button>
                </Link>
              </div>
            </FadeUp>
          </div>
        </section>

        {/* ═══════════════════════════════════════════
            §7  CTA BANNER
        ═══════════════════════════════════════════ */}
        <section
          style={{
            margin: "0 5vw 60px",
            borderRadius: 36,
            overflow: "hidden",
            position: "relative",
            background: "#1C2B4A",
            padding: "80px 8vw",
          }}
        >
          {/* Glows */}
          <div
            style={{
              position: "absolute",
              top: -80,
              right: -80,
              width: 400,
              height: 400,
              borderRadius: "50%",
              background: "#C0145C",
              opacity: 0.1,
              filter: "blur(120px)",
              pointerEvents: "none",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: -60,
              left: -60,
              width: 320,
              height: 320,
              borderRadius: "50%",
              background: "#4A6FA5",
              opacity: 0.1,
              filter: "blur(100px)",
              pointerEvents: "none",
            }}
          />
          {/* Grid texture */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              opacity: 0.025,
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.8) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.8) 1px,transparent 1px)",
              backgroundSize: "60px 60px",
              pointerEvents: "none",
            }}
          />

          <FadeUp>
            <div
              style={{
                maxWidth: 680,
                margin: "0 auto",
                textAlign: "center",
                position: "relative",
                zIndex: 10,
              }}
            >
              <div
                style={{
                  fontSize: 10,
                  fontWeight: 800,
                  letterSpacing: "0.38em",
                  textTransform: "uppercase",
                  color: "#C0145C",
                  marginBottom: 16,
                }}
              >
                Get Expert Help
              </div>
              <h2
                style={{
                  fontFamily: "'Cormorant Garamond',Georgia,serif",
                  fontSize: "clamp(28px,3.5vw,46px)",
                  fontWeight: 700,
                  color: "#fff",
                  lineHeight: 1.2,
                  marginBottom: 14,
                }}
              >
                Not Sure Which Department{" "}
                <em style={{ color: "#C0145C", fontStyle: "italic", fontWeight: 400 }}>
                  to Choose?
                </em>
              </h2>
              <p
                style={{
                  fontSize: 15,
                  color: "rgba(255,255,255,0.45)",
                  marginBottom: 38,
                  lineHeight: 1.82,
                  fontWeight: 300,
                }}
              >
                Our expert team will guide you to the right specialist within
                minutes. Call us or book an appointment online — available
                24/7 across all 9 hospitals.
              </p>
              <div
                style={{
                  display: "flex",
                  gap: 14,
                  justifyContent: "center",
                  flexWrap: "wrap",
                }}
              >
                <Link href="/doctors">
                  <button
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 8,
                      padding: "14px 32px",
                      borderRadius: 50,
                      background: "linear-gradient(135deg,#C0145C,#e8457e)",
                      color: "#fff",
                      fontFamily: "'Outfit',sans-serif",
                      fontWeight: 800,
                      fontSize: 12,
                      letterSpacing: "0.09em",
                      textTransform: "uppercase",
                      border: "none",
                      cursor: "pointer",
                      boxShadow: "0 8px 24px rgba(192,20,92,0.42)",
                      transition: "transform 0.25s, box-shadow 0.25s",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "translateY(-2px)";
                      e.currentTarget.style.boxShadow =
                        "0 14px 32px rgba(192,20,92,0.55)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow =
                        "0 8px 24px rgba(192,20,92,0.42)";
                    }}
                  >
                    <Calendar size={14} />
                    Book Appointment
                  </button>
                </Link>
                <a href="tel:1800-123-4567">
                  <button
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 8,
                      padding: "13px 28px",
                      borderRadius: 50,
                      background: "transparent",
                      color: "#fff",
                      fontFamily: "'Outfit',sans-serif",
                      fontWeight: 700,
                      fontSize: 12,
                      letterSpacing: "0.09em",
                      textTransform: "uppercase",
                      border: "2px solid rgba(255,255,255,0.3)",
                      cursor: "pointer",
                      transition: "background 0.22s",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.background = "rgba(255,255,255,0.1)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.background = "transparent")
                    }
                  >
                    <Phone size={13} />
                    Call 1800-123-4567
                  </button>
                </a>
              </div>
            </div>
          </FadeUp>
        </section>

      </div>
    </>
  );
}
