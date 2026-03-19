"use client";
import { useState, useEffect, useRef } from "react";

const branches = [
  { id: 1, city: "Hyderabad", area: "Banjara Hills", since: "2005", beds: 320, specialty: "Cardiac Care" },
  { id: 2, city: "Hyderabad", area: "Kukatpally", since: "2008", beds: 280, specialty: "Neurosciences" },
  { id: 3, city: "Hyderabad", area: "Secunderabad", since: "2010", beds: 250, specialty: "Orthopedics" },
  { id: 4, city: "Vijayawada", area: "MG Road", since: "2011", beds: 300, specialty: "Oncology" },
  { id: 5, city: "Visakhapatnam", area: "MVP Colony", since: "2013", beds: 260, specialty: "Pediatrics" },
  { id: 6, city: "Warangal", area: "Hanamkonda", since: "2015", beds: 180, specialty: "Diabetology" },
  { id: 7, city: "Tirupati", area: "Balaji Nagar", since: "2016", beds: 200, specialty: "Urology" },
  { id: 8, city: "Nellore", area: "Grand Trunk Rd", since: "2018", beds: 160, specialty: "Gastroenterology" },
  { id: 9, city: "Karimnagar", area: "RTC Colony", since: "2020", beds: 150, specialty: "Pulmonology" },
];

const stats = [
  { value: "20+", label: "Years of Excellence" },
  { value: "10", label: "Hospital Branches" },
  { value: "2100+", label: "Beds Across Network" },
  { value: "1M+", label: "Patients Treated" },
];

const values = [
  {
    icon: "✦",
    title: "Compassionate Care",
    desc: "Every patient is treated with dignity, empathy, and respect—from first visit to full recovery.",
  },
  {
    icon: "◈",
    title: "Clinical Excellence",
    desc: "Our physicians and specialists operate at the frontier of medicine with evidence-based protocols.",
  },
  {
    icon: "⬡",
    title: "Innovation First",
    desc: "We invest in cutting-edge technology and research to deliver tomorrow's treatments today.",
  },
  {
    icon: "⊕",
    title: "Community Rooted",
    desc: "Born in Telangana, serving Andhra Pradesh—our mission is deeply tied to the communities we call home.",
  },
];

const leadership = [
  {
    name: "Dr. Suresh Rao",
    role: "Chairman & Founder",
    specialty: "Cardiothoracic Surgery",
    exp: "35 yrs",
    initial: "SR",
  },
  {
    name: "Dr. Priya Srikara",
    role: "Managing Director",
    specialty: "Internal Medicine",
    exp: "28 yrs",
    initial: "PS",
  },
  {
    name: "Dr. Anil Reddy",
    role: "Chief Medical Officer",
    specialty: "Neurology",
    exp: "22 yrs",
    initial: "AR",
  },
  {
    name: "Dr. Meena Sharma",
    role: "Director — Oncology",
    specialty: "Medical Oncology",
    exp: "19 yrs",
    initial: "MS",
  },
];

function useCountUp(target: string, duration = 1800, active = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active) return;
    const num = parseInt(target.replace(/\D/g, ""));
    if (!num) return;
    let start = 0;
    const step = num / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= num) { setCount(num); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [active, target, duration]);
  return count;
}

function StatCard({ value, label, active }:{
    value: string;
    label: string;
    active: boolean;
}) {
  const num = useCountUp(value, 1600, active);
  const suffix = value.replace(/[0-9]/g, "");
  return (
    <div className="stat-card">
      <div className="stat-value">{active ? `${num}${suffix}` : "0"}</div>
      <div className="stat-label">{label}</div>
    </div>
  );
}

export default function AboutPage() {
  const [statsVisible, setStatsVisible] = useState(false);
  const [activeBranch, setActiveBranch] = useState<number | null>(0);
  const statsRef = useRef(null);
  

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStatsVisible(true); },
      { threshold: 0.3 }
    );
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500;600&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        :root {
          --teal: #0a5f5f;
          --teal-light: #117a7a;
          --teal-pale: #e6f4f4;
          --gold: #c9a84c;
          --gold-light: #e8c87a;
          --cream: #faf8f4;
          --deep: #0d1f1f;
          --mid: #2a4040;
          --soft: #6b8585;
          --white: #ffffff;
          --border: rgba(10,95,95,0.12);
        }

        .about-root {
          font-family: 'DM Sans', sans-serif;
          background: var(--cream);
          color: var(--deep);
          overflow-x: hidden;
        }

        /* ─── HERO ─── */
        .hero {
          min-height: 92vh;
          background: var(--deep);
          display: grid;
          grid-template-columns: 1fr 1fr;
          position: relative;
          overflow: hidden;
        }
        .hero::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse 80% 80% at 70% 50%, rgba(10,95,95,0.45) 0%, transparent 70%);
          pointer-events: none;
        }
        .hero-grid-lines {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(10,95,95,0.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(10,95,95,0.08) 1px, transparent 1px);
          background-size: 60px 60px;
          pointer-events: none;
        }
        .hero-left {
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 100px 60px 100px 80px;
          position: relative;
          z-index: 1;
        }
        .hero-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: var(--gold);
          margin-bottom: 32px;
        }
        .hero-eyebrow::before {
          content: '';
          width: 36px; height: 1px;
          background: var(--gold);
        }
        .hero-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(52px, 6vw, 86px);
          font-weight: 300;
          line-height: 1.05;
          color: var(--white);
          margin-bottom: 28px;
        }
        .hero-title em {
          font-style: italic;
          color: var(--gold-light);
        }
        .hero-subtitle {
          font-size: 16px;
          font-weight: 300;
          line-height: 1.8;
          color: rgba(255,255,255,0.65);
          max-width: 440px;
          margin-bottom: 48px;
        }
        .hero-cta {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          background: var(--gold);
          color: var(--deep);
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          padding: 16px 32px;
          border: none;
          cursor: pointer;
          text-decoration: none;
          transition: all 0.3s ease;
          width: fit-content;
        }
        .hero-cta:hover { background: var(--gold-light); transform: translateX(4px); }
        .hero-right {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1;
        }
        .hero-emblem {
          width: 340px; height: 340px;
          border-radius: 50%;
          border: 1px solid rgba(201,168,76,0.25);
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
        }
        .hero-emblem::before {
          content: '';
          position: absolute;
          width: 280px; height: 280px;
          border-radius: 50%;
          border: 1px solid rgba(201,168,76,0.15);
        }
        .hero-emblem::after {
          content: '';
          position: absolute;
          width: 220px; height: 220px;
          border-radius: 50%;
          background: rgba(10,95,95,0.3);
          border: 1px solid rgba(201,168,76,0.3);
        }
        .hero-emblem-inner {
          position: relative;
          z-index: 2;
          text-align: center;
        }
        .hero-emblem-cross {
          font-size: 64px;
          color: var(--gold);
          display: block;
          line-height: 1;
          margin-bottom: 8px;
        }
        .hero-emblem-name {
          font-family: 'Cormorant Garamond', serif;
          font-size: 22px;
          font-weight: 400;
          color: var(--white);
          letter-spacing: 0.08em;
        }
        .hero-emblem-tagline {
          font-size: 9px;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: var(--gold);
          margin-top: 4px;
        }
        .hero-year-badge {
          position: absolute;
          bottom: 80px;
          right: 80px;
          text-align: right;
        }
        .hero-year {
          font-family: 'Cormorant Garamond', serif;
          font-size: 80px;
          font-weight: 300;
          color: rgba(255,255,255,0.06);
          line-height: 1;
        }
        .hero-year-label {
          font-size: 10px;
          letter-spacing: 0.2em;
          color: rgba(255,255,255,0.3);
          text-transform: uppercase;
        }

        /* ─── SECTION WRAPPER ─── */
        .section { padding: 100px 80px; }
        .section-inner { max-width: 1280px; margin: 0 auto; }
        .section-header { margin-bottom: 64px; }
        .section-tag {
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: var(--teal);
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 20px;
        }
        .section-tag::after { content: ''; flex: 1; height: 1px; background: var(--border); max-width: 80px; }
        .section-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(36px, 4vw, 54px);
          font-weight: 300;
          line-height: 1.15;
          color: var(--deep);
        }
        .section-title em { font-style: italic; color: var(--teal); }

        /* ─── STATS ─── */
        .stats-section {
          background: var(--teal);
          padding: 80px;
          position: relative;
          overflow: hidden;
        }
        .stats-section::before {
          content: '';
          position: absolute;
          right: -100px; top: -100px;
          width: 400px; height: 400px;
          border-radius: 50%;
          background: rgba(255,255,255,0.03);
        }
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 2px;
          max-width: 1280px;
          margin: 0 auto;
        }
        .stat-card {
          background: rgba(255,255,255,0.06);
          padding: 48px 40px;
          text-align: center;
          border: 1px solid rgba(255,255,255,0.08);
          transition: background 0.3s;
        }
        .stat-card:hover { background: rgba(255,255,255,0.1); }
        .stat-value {
          font-family: 'Cormorant Garamond', serif;
          font-size: 64px;
          font-weight: 300;
          color: var(--gold-light);
          line-height: 1;
          margin-bottom: 12px;
        }
        .stat-label {
          font-size: 12px;
          font-weight: 500;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.6);
        }

        /* ─── STORY ─── */
        .story-section { background: var(--white); }
        .story-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: center; }
        .story-text p {
          font-size: 16px;
          font-weight: 300;
          line-height: 1.9;
          color: var(--mid);
          margin-bottom: 20px;
        }
        .story-text p:last-child { margin-bottom: 0; }
        .story-quote {
          border-left: 3px solid var(--gold);
          padding: 24px 32px;
          background: var(--cream);
          margin: 32px 0;
        }
        .story-quote p {
          font-family: 'Cormorant Garamond', serif;
          font-size: 22px !important;
          font-style: italic;
          color: var(--teal) !important;
          line-height: 1.5 !important;
          margin: 0 !important;
        }
        .story-visual {
          position: relative;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .story-img-placeholder {
          background: linear-gradient(135deg, var(--teal) 0%, var(--teal-light) 100%);
          border-radius: 2px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: rgba(255,255,255,0.5);
          font-size: 13px;
          letter-spacing: 0.1em;
        }
        .story-img-main { height: 320px; }
        .story-img-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
        .story-img-small { height: 160px; }
        .story-badge {
          position: absolute;
          top: 24px; right: -20px;
          background: var(--gold);
          color: var(--deep);
          padding: 20px 24px;
          text-align: center;
          box-shadow: 0 8px 32px rgba(0,0,0,0.15);
        }
        .story-badge-num {
          font-family: 'Cormorant Garamond', serif;
          font-size: 36px;
          font-weight: 600;
          display: block;
          line-height: 1;
        }
        .story-badge-text {
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.15em;
          text-transform: uppercase;
        }

        /* ─── VALUES ─── */
        .values-section { background: var(--cream); }
        .values-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 2px; }
        .value-card {
          background: var(--white);
          padding: 48px 36px;
          border-top: 3px solid transparent;
          transition: all 0.3s ease;
          cursor: default;
        }
        .value-card:hover { border-top-color: var(--teal); transform: translateY(-4px); box-shadow: 0 20px 40px rgba(0,0,0,0.06); }
        .value-icon {
          font-size: 28px;
          color: var(--teal);
          margin-bottom: 24px;
          display: block;
        }
        .value-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 22px;
          font-weight: 600;
          color: var(--deep);
          margin-bottom: 16px;
        }
        .value-desc {
          font-size: 14px;
          font-weight: 300;
          line-height: 1.8;
          color: var(--soft);
        }

        /* ─── BRANCHES ─── */
        .branches-section { background: var(--white); }
        .branches-intro {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 80px;
          margin-bottom: 64px;
          align-items: end;
        }
        .branches-desc {
          font-size: 16px;
          font-weight: 300;
          line-height: 1.9;
          color: var(--mid);
        }
        .branches-map-hint {
          text-align: right;
          font-size: 13px;
          color: var(--soft);
        }
        .branches-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2px;
        }
        .branch-card {
          background: var(--cream);
          padding: 36px;
          cursor: pointer;
          transition: all 0.25s ease;
          border: 1px solid transparent;
          position: relative;
          overflow: hidden;
        }
        .branch-card::before {
          content: '';
          position: absolute;
          bottom: 0; left: 0;
          width: 0; height: 3px;
          background: var(--gold);
          transition: width 0.3s ease;
        }
        .branch-card:hover::before, .branch-card.active::before { width: 100%; }
        .branch-card:hover, .branch-card.active {
          background: var(--white);
          border-color: var(--border);
          box-shadow: 0 8px 32px rgba(0,0,0,0.06);
        }
        .branch-number {
          font-family: 'Cormorant Garamond', serif;
          font-size: 48px;
          font-weight: 300;
          color: rgba(10,95,95,0.1);
          line-height: 1;
          margin-bottom: 16px;
        }
        .branch-city {
          font-size: 18px;
          font-weight: 600;
          color: var(--deep);
          margin-bottom: 4px;
        }
        .branch-area {
          font-size: 13px;
          color: var(--soft);
          margin-bottom: 20px;
        }
        .branch-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }
        .branch-tag {
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          padding: 5px 12px;
          border: 1px solid var(--border);
          color: var(--teal);
          background: transparent;
        }
        .branch-specialty-tag { background: var(--teal); color: var(--white); border-color: var(--teal); }

        /* ─── LEADERSHIP ─── */
        .leadership-section { background: var(--deep); }
        .leadership-section .section-title { color: var(--white); }
        .leadership-section .section-title em { color: var(--gold-light); }
        .leadership-section .section-tag { color: var(--gold); }
        .leadership-section .section-tag::after { background: rgba(255,255,255,0.1); }
        .leadership-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px; }
        .leader-card {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          padding: 36px 28px;
          transition: all 0.3s ease;
          text-align: center;
        }
        .leader-card:hover {
          background: rgba(255,255,255,0.08);
          border-color: rgba(201,168,76,0.4);
          transform: translateY(-4px);
        }
        .leader-avatar {
          width: 88px; height: 88px;
          border-radius: 50%;
          background: linear-gradient(135deg, var(--teal), var(--teal-light));
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 24px;
          font-family: 'Cormorant Garamond', serif;
          font-size: 28px;
          font-weight: 600;
          color: var(--gold-light);
          border: 2px solid rgba(201,168,76,0.3);
        }
        .leader-name {
          font-family: 'Cormorant Garamond', serif;
          font-size: 20px;
          font-weight: 400;
          color: var(--white);
          margin-bottom: 8px;
        }
        .leader-role {
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--gold);
          margin-bottom: 12px;
        }
        .leader-specialty {
          font-size: 13px;
          color: rgba(255,255,255,0.45);
        }
        .leader-exp {
          display: inline-block;
          margin-top: 16px;
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: var(--teal-light);
          border: 1px solid rgba(10,95,95,0.4);
          padding: 4px 12px;
        }

        /* ─── CTA BANNER ─── */
        .cta-banner {
          background: linear-gradient(135deg, var(--teal) 0%, var(--teal-light) 100%);
          padding: 80px;
          text-align: center;
          position: relative;
          overflow: hidden;
        }
        .cta-banner::before {
          content: '✦';
          position: absolute;
          font-size: 400px;
          color: rgba(255,255,255,0.03);
          left: -100px; top: -100px;
          line-height: 1;
          pointer-events: none;
        }
        .cta-banner-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(36px, 5vw, 60px);
          font-weight: 300;
          color: var(--white);
          line-height: 1.2;
          margin-bottom: 20px;
        }
        .cta-banner-sub {
          font-size: 16px;
          font-weight: 300;
          color: rgba(255,255,255,0.7);
          margin-bottom: 40px;
        }
        .cta-group { display: flex; gap: 16px; justify-content: center; flex-wrap: wrap; }
        .cta-btn-primary {
          background: var(--gold);
          color: var(--deep);
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          padding: 18px 40px;
          border: none;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .cta-btn-primary:hover { background: var(--gold-light); }
        .cta-btn-outline {
          background: transparent;
          color: var(--white);
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          padding: 18px 40px;
          border: 1px solid rgba(255,255,255,0.4);
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .cta-btn-outline:hover { background: rgba(255,255,255,0.1); border-color: white; }

        /* ─── RESPONSIVE ─── */
        @media (max-width: 1024px) {
          .hero { grid-template-columns: 1fr; min-height: auto; }
          .hero-right { display: none; }
          .hero-left { padding: 80px 40px; }
          .section { padding: 80px 40px; }
          .stats-section { padding: 60px 40px; }
          .stats-grid { grid-template-columns: repeat(2, 1fr); }
          .story-grid { grid-template-columns: 1fr; gap: 48px; }
          .story-visual { order: -1; }
          .story-badge { right: 0; }
          .values-grid { grid-template-columns: repeat(2, 1fr); }
          .branches-intro { grid-template-columns: 1fr; gap: 24px; }
          .branches-map-hint { text-align: left; }
          .branches-grid { grid-template-columns: repeat(2, 1fr); }
          .leadership-grid { grid-template-columns: repeat(2, 1fr); }
        }

        @media (max-width: 640px) {
          .hero-left { padding: 60px 24px; }
          .section { padding: 60px 24px; }
          .stats-section { padding: 48px 24px; }
          .stats-grid { grid-template-columns: repeat(2, 1fr); gap: 2px; }
          .values-grid { grid-template-columns: 1fr; }
          .branches-grid { grid-template-columns: 1fr; }
          .leadership-grid { grid-template-columns: 1fr; }
          .cta-banner { padding: 60px 24px; }
        }

        /* ─── ANIMATIONS ─── */
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .hero-eyebrow { animation: fadeUp 0.6s ease both; }
        .hero-title { animation: fadeUp 0.6s 0.15s ease both; }
        .hero-subtitle { animation: fadeUp 0.6s 0.3s ease both; }
        .hero-cta { animation: fadeUp 0.6s 0.45s ease both; }

        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .hero-emblem { animation: spin-slow 30s linear infinite; }
        .hero-emblem-inner { animation: spin-slow 30s linear infinite reverse; }
      `}</style>

      <div className="about-root">

        {/* ─── HERO ─── */}
        <section className="hero">
          <div className="hero-grid-lines" />
          <div className="hero-left">
            <span className="hero-eyebrow">About Srikara Hospitals</span>
            <h1 className="hero-title">
              Healing with<br />
              <em>Heart,</em><br />
              Since 2005.
            </h1>
            <p className="hero-subtitle">
              For over two decades, Srikara Hospitals has been the most trusted name in healthcare across Telangana and Andhra Pradesh — combining clinical precision with genuine human compassion.
            </p>
            <a href="#story" className="hero-cta">
              Our Story &nbsp;→
            </a>
          </div>
          <div className="hero-right">
            <div className="hero-emblem">
              <div className="hero-emblem-inner">
                <span className="hero-emblem-cross">✚</span>
                <div className="hero-emblem-name">SRIKARA</div>
                <div className="hero-emblem-tagline">Hospitals & Research</div>
              </div>
            </div>
            <div className="hero-year-badge">
              <div className="hero-year">2005</div>
              <div className="hero-year-label">Est. Hyderabad</div>
            </div>
          </div>
        </section>

        {/* ─── STATS ─── */}
        <section className="stats-section" ref={statsRef}>
          <div className="stats-grid">
            {stats.map((s, i) => (
              <StatCard key={i} value={s.value} label={s.label} active={statsVisible} />
            ))}
          </div>
        </section>

        {/* ─── STORY ─── */}
        <section className="section story-section" id="story">
          <div className="section-inner">
            <div className="story-grid">
              <div className="story-text">
                <div className="section-header">
                  <div className="section-tag">Our Story</div>
                  <h2 className="section-title">A vision born from<br /><em>community need</em></h2>
                </div>
                <p>
                  In 2005, Dr. Suresh Rao founded Srikara Hospitals in Banjara Hills, Hyderabad, with a singular conviction: that world-class healthcare should not be the privilege of a few, but the right of every family. Starting with just 80 beds and a team of 12 dedicated physicians, the hospital quickly earned a reputation for clinical excellence and patient-first care.
                </p>
                <div className="story-quote">
                  <p>"We did not build hospitals. We built sanctuaries of hope — places where every patient walks in knowing they will be heard, healed, and cared for."</p>
                </div>
                <p>
                  Over the next two decades, Srikara grew into a network of 10 hospitals spanning both Telugu states — each branch rooted in its local community, each carrying the founding values of compassion, innovation, and excellence. Today, we employ over 4,000 healthcare professionals and operate specialized centres of excellence in oncology, cardiac care, neurosciences, and more.
                </p>
              </div>
              <div className="story-visual">
                <div className="story-badge">
                  <span className="story-badge-num">10</span>
                  <span className="story-badge-text">Branches</span>
                </div>
                <div className="story-img-placeholder story-img-main">
                  Hospital Flagship — Banjara Hills
                </div>
                <div className="story-img-row">
                  <div className="story-img-placeholder story-img-small">ICU Wing</div>
                  <div className="story-img-placeholder story-img-small">Research Lab</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── VALUES ─── */}
        <section className="section values-section">
          <div className="section-inner">
            <div className="section-header">
              <div className="section-tag">What Drives Us</div>
              <h2 className="section-title">Our Core <em>Values</em></h2>
            </div>
            <div className="values-grid">
              {values.map((v, i) => (
                <div className="value-card" key={i}>
                  <span className="value-icon">{v.icon}</span>
                  <div className="value-title">{v.title}</div>
                  <p className="value-desc">{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── BRANCHES ─── */}
        <section className="section branches-section">
          <div className="section-inner">
            <div className="branches-intro">
              <div>
                <div className="section-tag">Our Network</div>
                <h2 className="section-title">10 Hospitals.<br /><em>One Standard.</em></h2>
              </div>
              <p className="branches-desc">
                From Hyderabad's city centres to Tirupati's sacred precincts — every Srikara branch delivers identical clinical protocols, technology standards, and patient care philosophy. Consistency is our promise.
              </p>
            </div>
            <div className="branches-grid">
              {/* Main branch */}
              <div
                className={`branch-card ${activeBranch === 0 ? "active" : ""}`}
                onClick={() => setActiveBranch(activeBranch === 0 ? null : 0)}
                style={{ background: activeBranch === 0 ? "white" : undefined }}
              >
                <div className="branch-number">01</div>
                <div className="branch-city">Hyderabad — Flagship</div>
                <div className="branch-area">Banjara Hills · Est. 2005</div>
                <div className="branch-tags">
                  <span className="branch-tag">320 Beds</span>
                  <span className="branch-tag branch-specialty-tag">Headquarters</span>
                </div>
              </div>
              {/* Other branches */}
              {branches.map((b, i) => (
                <div
                  key={b.id}
                  className={`branch-card ${activeBranch === b.id ? "active" : ""}`}
                  onClick={() => setActiveBranch(activeBranch === b.id ? null : b.id)}
                >
                  <div className="branch-number">0{i + 2}</div>
                  <div className="branch-city">{b.city}</div>
                  <div className="branch-area">{b.area} · Est. {b.since}</div>
                  <div className="branch-tags">
                    <span className="branch-tag">{b.beds} Beds</span>
                    <span className="branch-tag branch-specialty-tag">{b.specialty}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── LEADERSHIP ─── */}
        <section className="section leadership-section">
          <div className="section-inner">
            <div className="section-header">
              <div className="section-tag">Leadership</div>
              <h2 className="section-title">The Minds Behind<br /><em>Srikara</em></h2>
            </div>
            <div className="leadership-grid">
              {leadership.map((l, i) => (
                <div className="leader-card" key={i}>
                  <div className="leader-avatar">{l.initial}</div>
                  <div className="leader-name">{l.name}</div>
                  <div className="leader-role">{l.role}</div>
                  <div className="leader-specialty">{l.specialty}</div>
                  <div className="leader-exp">{l.exp} Experience</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── CTA BANNER ─── */}
        <section className="cta-banner">
          <h2 className="cta-banner-title">
            Your health journey<br />begins here.
          </h2>
          <p className="cta-banner-sub">
            Find a Srikara Hospital near you — across 7 cities in Telangana & Andhra Pradesh.
          </p>
          <div className="cta-group">
            <button className="cta-btn-primary">Book an Appointment</button>
            <button className="cta-btn-outline">Find a Branch</button>
          </div>
        </section>

      </div>
    </>
  );
}