"use client";
import { useState, useEffect, useRef } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const branches = [
  { id: 1, city: "Miyapur",         area: "Hyderabad",            since: "2015", beds: 150, specialty: "Multi-Specialty Care"             },
  { id: 2, city: "RTC X Roads",     area: "Secunderabad",         since: "2013", beds: 200, specialty: "Orthopaedics & Joint Replacement"  },
  { id: 3, city: "Kompally",        area: "North Hyderabad",      since: "2016", beds: 120, specialty: "Advanced Surgery & Emergency"       },
  { id: 4, city: "Rajahmundry",     area: "East Godavari, AP",    since: "2016", beds: 180, specialty: "Cardiology & Multispecialty"        },
  { id: 5, city: "Vijayawada",      area: "Krishna District, AP", since: "2018", beds: 150, specialty: "Advanced Orthopaedics"              },
  { id: 6, city: "Peerzadiguda",    area: "East Hyderabad",       since: "2015", beds: 200, specialty: "Trauma & Robotic Surgery"           },
  { id: 7, city: "LB Nagar",        area: "South Hyderabad",      since: "2017", beds: 120, specialty: "Neuro & Spine Care"                 },
  { id: 8, city: "ECIL",            area: "East Hyderabad",       since: "2014", beds: 130, specialty: "Cardiology & General Surgery"       },
  { id: 9, city: "Lakdikapul",      area: "Central Hyderabad",    since: "2019", beds: 100, specialty: "Gynaecology & Women's Health"       },
];

const stats = [
  { value: "10+",   label: "Years of Excellence"  },
  { value: "9",     label: "Specialized Branches" },
  { value: "1400+", label: "Beds Across Network"  },
  { value: "500k+", label: "Successful Surgeries" },
];

const leadership = [
  { name: "Dr. Akhil Dadi",   role: "Chairman & Managing Director", specialty: "Joint Replacement & Orthopaedics", exp: "25+ yrs", initial: "AD" },
  { name: "Dr. Sudhir Reddy", role: "Director",                      specialty: "Orthopaedics",                    exp: "20 yrs",  initial: "SR" },
  { name: "Dr. K.V. Ratnam",  role: "Chief of Neurosciences",        specialty: "Neurology & Spine",               exp: "22 yrs",  initial: "KR" },
  { name: "Dr. R. Jagan",     role: "Medical Director",              specialty: "Internal Medicine",               exp: "18 yrs",  initial: "RJ" },
];

const values = [
  { icon: "✦", title: "Precision Surgery",  desc: "Pioneers in computer-navigated and robotic joint replacement surgery in South India, with outcomes rivalling the world's best." },
  { icon: "◈", title: "Patient Centric",    desc: "Personalised recovery protocols designed to get every patient back on their feet in record time, with dignity and compassion." },
  { icon: "⬡", title: "Ethical Standards",  desc: "Transparent billing and strict evidence-based treatment protocols are the cornerstones of every clinical decision we make." },
  { icon: "⊕", title: "Rapid Recovery",     desc: "Minimally invasive techniques pioneered at Srikara reduce post-operative pain, blood loss and hospital stays dramatically." },
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

function StatCard({ value, label, active }: { value: string; label: string; active: boolean }) {
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
  const [activeBranch, setActiveBranch] = useState<number | null>(1);
  const statsRef = useRef<HTMLElement>(null);

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
      <Navbar />
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Nunito+Sans:wght@300;400;600;700;800&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        :root {
          --navy:      #1B2D5B;
          --navy-dk:   #111D3A;
          --navy-dkr:  #0C1528;
          --navy-lt:   #2A4480;
          --navy-pale: #EDF1FA;
          --pink:      #A3195B;
          --pink-dark: #751242;
          --pink-lt:   #C2206D;
          --pink-pale: #FBF0F5;
          --pink-glow: #F9A8D4;
          --white:     #ffffff;
          --cream:     #F7F9FC;
          --ink:       #0D1A35;
          --text-mid:  #3A5070;
          --text-soft: #6B7FA0;
          --border:    rgba(27,45,91,0.12);
        }

        .about-root {
          font-family: 'Nunito Sans', sans-serif;
          background: var(--cream);
          color: var(--ink);
          overflow-x: hidden;
        }

        /* ── HERO ── */
        .hero {
          min-height: 92vh;
          background: linear-gradient(135deg, var(--navy-dkr) 0%, var(--navy-dk) 50%, var(--navy) 100%);
          display: grid;
          grid-template-columns: 1fr 1fr;
          position: relative;
          overflow: hidden;
        }
        .hero::before {
          content: '';
          position: absolute; inset: 0;
          background: radial-gradient(ellipse at 80% 45%, rgba(163,25,91,0.32) 0%, transparent 60%);
        }
        .hero::after {
          content: '';
          position: absolute; inset: 0;
          background-image:
            repeating-linear-gradient(0deg,  rgba(255,255,255,0.022) 0, rgba(255,255,255,0.022) 1px, transparent 1px, transparent 52px),
            repeating-linear-gradient(90deg, rgba(255,255,255,0.022) 0, rgba(255,255,255,0.022) 1px, transparent 1px, transparent 52px);
          pointer-events: none;
        }
        .hero-left {
          display: flex; flex-direction: column; justify-content: center;
          padding: 90px 80px; position: relative; z-index: 2;
        }
        .hero-eyebrow {
          font-size: 11px; font-weight: 800; letter-spacing: 0.32em;
          text-transform: uppercase; color: var(--pink-glow);
          margin-bottom: 28px; display: flex; align-items: center; gap: 14px;
        }
        .hero-eyebrow::before {
          content: ''; width: 36px; height: 2px;
          background: var(--pink-lt); border-radius: 2px; flex-shrink: 0;
        }
        .hero-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(36px, 5vw, 72px); font-weight: 700;
          color: var(--white); line-height: 1.1; margin-bottom: 28px;
        }
        .hero-title em { font-style: italic; color: var(--pink-glow); }
        .hero-subtitle {
          font-size: 17px; line-height: 1.9;
          color: rgba(255,255,255,0.68); max-width: 460px; margin-bottom: 44px;
        }
        .hero-badge-row { display: flex; gap: 10px; flex-wrap: wrap; margin-bottom: 40px; }
        .hero-badge {
          font-size: 10px; font-weight: 800; letter-spacing: 0.14em;
          text-transform: uppercase; color: rgba(255,255,255,0.82);
          background: rgba(255,255,255,0.09); border: 1px solid rgba(255,255,255,0.18);
          padding: 6px 14px; border-radius: 100px;
        }
        .hero-cta {
          background: var(--pink); color: var(--white);
          padding: 17px 42px; font-weight: 800; font-size: 12px;
          text-transform: uppercase; letter-spacing: 2px;
          text-decoration: none; width: fit-content; border-radius: 6px;
          transition: 0.3s; box-shadow: 0 8px 28px rgba(163,25,91,0.48);
          display: inline-block;
        }
        .hero-cta:hover { background: var(--pink-lt); transform: translateY(-3px); }
        .hero-right {
          display: flex; align-items: center; justify-content: center;
          position: relative; z-index: 2;
        }
        .hero-emblem-wrap { position: relative; display: flex; align-items: center; justify-content: center; }
        .ring { position: absolute; border-radius: 50%; border: 1px solid rgba(163,25,91,0.22); }
        .ring-1 { width: 420px; height: 420px; }
        .ring-2 { width: 310px; height: 310px; border-color: rgba(163,25,91,0.35); }
        .hero-emblem {
          width: 240px; height: 240px; border-radius: 50%;
          background: rgba(163,25,91,0.12); border: 2px solid rgba(163,25,91,0.4);
          backdrop-filter: blur(10px);
          display: flex; align-items: center; justify-content: center;
          box-shadow: 0 0 80px rgba(163,25,91,0.25), inset 0 0 40px rgba(255,255,255,0.03);
          position: relative;
        }
        .hero-emblem-inner { text-align: center; }
        .hero-emblem-icon {
          font-size: 52px; color: var(--pink-glow); display: block;
          margin-bottom: 10px; filter: drop-shadow(0 0 16px rgba(163,25,91,0.6));
        }
        .hero-emblem-name {
          font-family: 'Playfair Display', serif; font-size: 22px;
          color: var(--white); letter-spacing: 5px; font-weight: 600;
        }
        .hero-emblem-sub {
          font-size: 10px; color: var(--pink-glow); letter-spacing: 3px;
          text-transform: uppercase; margin-top: 5px; font-weight: 800;
        }
        .hero-emblem-tagline {
          font-size: 9px; color: rgba(255,255,255,0.4);
          letter-spacing: 1.5px; margin-top: 8px; font-style: italic;
        }

        /* ── STATS ── */
        .stats-section {
          background: linear-gradient(90deg, var(--navy), var(--pink), var(--navy));
          display: grid; grid-template-columns: repeat(4, 1fr);
        }
        .stat-card {
          padding: 52px 30px; text-align: center;
          border-right: 1px solid rgba(255,255,255,0.15);
          transition: background 0.3s; cursor: default;
        }
        .stat-card:last-child { border-right: none; }
        .stat-card:hover { background: rgba(0,0,0,0.15); }
        .stat-value {
          font-family: 'Playfair Display', serif; font-size: 58px;
          font-weight: 700; color: var(--white); margin-bottom: 8px; line-height: 1;
        }
        .stat-label {
          color: rgba(255,255,255,0.78); font-size: 11px;
          text-transform: uppercase; letter-spacing: 2px; font-weight: 700;
        }

        /* ── SECTIONS ── */
        .section { padding: 100px 80px; }
        .section-inner { max-width: 1220px; margin: 0 auto; }
        .section-tag {
          font-size: 10px; font-weight: 800; color: var(--pink);
          letter-spacing: 3px; text-transform: uppercase;
          margin-bottom: 16px; display: flex; align-items: center; gap: 12px;
        }
        .section-tag::before {
          content: ''; width: 24px; height: 2px;
          background: var(--pink); border-radius: 2px; flex-shrink: 0;
        }
        .section-title {
          font-family: 'Playfair Display', serif; font-size: 46px;
          font-weight: 700; margin-bottom: 32px;
          color: var(--navy-dk); line-height: 1.2;
        }
        .section-title em { font-style: italic; color: var(--pink); }

        /* ── STORY ── */
        .story-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: center; }
        .story-text p { font-size: 16px; line-height: 1.9; color: var(--text-mid); margin-bottom: 22px; }
        .story-quote {
          border-left: 4px solid var(--pink); padding: 28px 32px;
          background: var(--pink-pale); font-family: 'Playfair Display', serif;
          font-size: 20px; font-style: italic; color: var(--navy-dk);
          margin: 32px 0; border-radius: 0 8px 8px 0;
        }
        .story-quote small {
          display: block; margin-top: 12px; font-size: 11px;
          font-family: 'Nunito Sans', sans-serif; font-style: normal;
          color: var(--pink); font-weight: 800; letter-spacing: 1.5px; text-transform: uppercase;
        }
        .story-visual {
          position: relative; height: 460px; border-radius: 12px;
          overflow: hidden; box-shadow: 0 32px 64px rgba(27,45,91,0.2);
        }
        .story-visual img { width: 100%; height: 100%; object-fit: cover; }
        .story-visual::after {
          content: ''; position: absolute; bottom: 0; left: 0; right: 0;
          height: 5px; background: linear-gradient(90deg, var(--navy), var(--pink));
        }
        .story-inline-stats {
          display: grid; grid-template-columns: 1fr 1fr; gap: 1px;
          background: var(--border); border-radius: 10px; overflow: hidden; margin-top: 32px;
        }
        .story-inline-stat { background: var(--white); padding: 22px 20px; text-align: center; }
        .story-inline-stat-num {
          font-family: 'Playfair Display', serif; font-size: 2rem;
          font-weight: 700; color: var(--pink); line-height: 1;
        }
        .story-inline-stat-lbl {
          font-size: 11px; font-weight: 700; color: var(--text-soft);
          letter-spacing: 0.08em; text-transform: uppercase; margin-top: 4px;
        }

        /* ── VALUES ── */
        .values-section { background: var(--navy-pale); }
        .values-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px; margin-top: 50px; }
        .value-card {
          background: var(--white); padding: 44px 34px; border-radius: 12px;
          box-shadow: 0 4px 20px rgba(27,45,91,0.07);
          border-top: 4px solid transparent; transition: 0.3s;
        }
        .value-card:hover { border-top-color: var(--pink); transform: translateY(-6px); box-shadow: 0 20px 44px rgba(27,45,91,0.14); }
        .value-icon { font-size: 28px; color: var(--navy); margin-bottom: 18px; display: block; }
        .value-card:hover .value-icon { color: var(--pink); }
        .value-title { font-weight: 800; font-size: 16px; margin-bottom: 12px; color: var(--navy-dk); }
        .value-desc { font-size: 14px; color: var(--text-soft); line-height: 1.75; }

        /* ── BRANCHES ── */
        .branches-section { background: var(--white); }
        .branches-intro { font-size: 16px; line-height: 1.85; color: var(--text-mid); max-width: 640px; margin-bottom: 50px; }
        .branches-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
        .branch-card {
          background: var(--cream); padding: 28px 26px; border-radius: 12px;
          cursor: pointer; border: 2px solid var(--border); transition: 0.25s;
          position: relative; overflow: hidden;
        }
        .branch-card::before {
          content: ''; position: absolute; top: 0; left: 0; right: 0;
          height: 3px; background: linear-gradient(90deg, var(--navy), var(--pink));
          transform: scaleX(0); transform-origin: left; transition: transform 0.3s;
        }
        .branch-card:hover:not(.active)::before, .branch-card.active::before { transform: scaleX(1); }
        .branch-card:hover:not(.active) { border-color: rgba(27,45,91,0.28); box-shadow: 0 8px 24px rgba(27,45,91,0.1); background: var(--white); }
        .branch-card.active { background: var(--navy-dk); border-color: var(--navy-dk); color: var(--white); box-shadow: 0 16px 40px rgba(27,45,91,0.28); }
        .branch-num { font-size: 10px; font-weight: 800; letter-spacing: 0.18em; text-transform: uppercase; margin-bottom: 10px; display: block; }
        .branch-card:not(.active) .branch-num { color: var(--pink); }
        .branch-card.active .branch-num { color: rgba(249,168,212,0.8); }
        .branch-city { font-size: 18px; font-weight: 900; margin-bottom: 3px; }
        .branch-card:not(.active) .branch-city { color: var(--navy-dk); }
        .branch-card.active .branch-city { color: var(--white); }
        .branch-area { font-size: 12px; margin-bottom: 14px; font-weight: 600; }
        .branch-card:not(.active) .branch-area { color: var(--text-soft); }
        .branch-card.active .branch-area { color: rgba(255,255,255,0.55); }
        .branch-tag {
          font-size: 10px; padding: 5px 12px; border-radius: 100px;
          font-weight: 800; text-transform: uppercase; letter-spacing: 0.08em;
          display: inline-block; margin-bottom: 10px;
        }
        .branch-card:not(.active) .branch-tag { background: var(--pink-pale); color: var(--pink); }
        .branch-card.active .branch-tag { background: rgba(163,25,91,0.28); color: var(--pink-glow); }
        .branch-meta { display: flex; align-items: center; gap: 14px; margin-top: 8px; font-size: 11px; font-weight: 700; }
        .branch-card:not(.active) .branch-meta { color: var(--text-soft); }
        .branch-card.active .branch-meta { color: rgba(255,255,255,0.5); }
        .branch-meta span { display: flex; align-items: center; gap: 4px; }

        /* ── LEADERSHIP ── */
        .leadership-section { background: var(--navy-dkr); }
        .leadership-section .section-tag { color: var(--pink-glow); }
        .leadership-section .section-tag::before { background: var(--pink-glow); }
        .leadership-section .section-title { color: var(--white); }
        .leadership-section .section-title em { color: var(--pink-glow); }
        .leadership-intro { font-size: 16px; line-height: 1.85; color: rgba(255,255,255,0.55); max-width: 620px; margin-bottom: 0; }
        .leadership-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; margin-top: 50px; }
        .leader-card {
          background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08);
          padding: 44px 28px; text-align: center; color: var(--white);
          border-radius: 12px; transition: 0.3s; position: relative; overflow: hidden;
        }
        .leader-card::after {
          content: ''; position: absolute; bottom: 0; left: 0; right: 0;
          height: 3px; background: linear-gradient(90deg, var(--navy-lt), var(--pink));
          transform: scaleX(0); transition: transform 0.3s;
        }
        .leader-card:hover::after { transform: scaleX(1); }
        .leader-card:hover { background: rgba(163,25,91,0.1); border-color: rgba(163,25,91,0.35); transform: translateY(-5px); }
        .leader-avatar {
          width: 80px; height: 80px; border-radius: 50%;
          background: linear-gradient(135deg, var(--pink), var(--pink-dark));
          color: var(--white); display: flex; align-items: center; justify-content: center;
          margin: 0 auto 24px; font-size: 22px; font-weight: 700;
          font-family: 'Playfair Display', serif; letter-spacing: 1px;
          box-shadow: 0 8px 28px rgba(163,25,91,0.5);
        }
        .leader-name { font-size: 17px; font-weight: 700; margin-bottom: 7px; font-family: 'Playfair Display', serif; }
        .leader-role { color: var(--pink-glow); font-size: 10px; text-transform: uppercase; letter-spacing: 1.5px; margin-bottom: 10px; font-weight: 800; }
        .leader-specialty { font-size: 12px; color: rgba(255,255,255,0.42); line-height: 1.5; }

        /* ── CTA BANNER ── */
        .cta-banner {
          background: linear-gradient(130deg, var(--navy-dk) 0%, var(--navy) 45%, var(--pink-dark) 100%);
          padding: 100px 80px; text-align: center; color: var(--white);
          position: relative; overflow: hidden;
        }
        .cta-banner::before {
          content: ''; position: absolute; inset: 0;
          background: radial-gradient(circle at 25% 50%, rgba(255,255,255,0.05) 0%, transparent 55%);
          pointer-events: none;
        }
        .cta-banner::after {
          content: ''; position: absolute; bottom: 0; left: 0; right: 0;
          height: 4px; background: linear-gradient(90deg, var(--navy-lt), var(--pink), var(--navy-lt));
        }
        .cta-tagline {
          font-size: 11px; font-weight: 800; letter-spacing: 0.3em;
          text-transform: uppercase; color: var(--pink-glow); margin-bottom: 20px;
          position: relative; display: flex; align-items: center; justify-content: center; gap: 14px;
        }
        .cta-tagline::before, .cta-tagline::after {
          content: ''; width: 32px; height: 1.5px; background: rgba(249,168,212,0.5); border-radius: 2px;
        }
        .cta-title {
          font-family: 'Playfair Display', serif; font-size: clamp(28px, 4vw, 52px);
          font-weight: 700; margin-bottom: 14px; position: relative; line-height: 1.2;
        }
        .cta-sub {
          font-size: 17px; color: rgba(255,255,255,0.65); margin-bottom: 46px;
          position: relative; font-style: italic; font-family: 'Playfair Display', serif;
        }
        .cta-btn-row { display: flex; gap: 16px; justify-content: center; flex-wrap: wrap; position: relative; }
        .cta-btn-primary {
          background: var(--pink); color: var(--white); padding: 18px 52px;
          border: none; font-weight: 800; font-size: 12px; text-transform: uppercase;
          letter-spacing: 2px; cursor: pointer; border-radius: 6px; transition: 0.3s;
          box-shadow: 0 8px 28px rgba(163,25,91,0.5);
        }
        .cta-btn-primary:hover { background: var(--pink-lt); transform: translateY(-3px); }
        .cta-btn-secondary {
          background: transparent; color: var(--white); padding: 18px 48px;
          border: 2px solid rgba(255,255,255,0.35); font-weight: 800; font-size: 12px;
          text-transform: uppercase; letter-spacing: 2px; cursor: pointer; border-radius: 6px; transition: 0.3s;
        }
        .cta-btn-secondary:hover { background: rgba(255,255,255,0.08); border-color: rgba(255,255,255,0.6); transform: translateY(-3px); }

        /* ════════════════════════════════
           RESPONSIVE BREAKPOINTS
        ════════════════════════════════ */

        /* ── Tablet 768–1099px ── */
        @media (max-width: 1099px) {
          .values-grid     { grid-template-columns: repeat(2, 1fr); }
          .branches-grid   { grid-template-columns: repeat(2, 1fr); }
          .leadership-grid { grid-template-columns: repeat(2, 1fr); }
          .hero-left       { padding: 80px 48px; }
          .section         { padding: 80px 48px; }
        }

        /* ── Mobile <768px ── */
        @media (max-width: 767px) {
          /* Hero */
          .hero                { grid-template-columns: 1fr; min-height: auto; }
          .hero-left           { padding: 80px 22px 50px; }
          .hero-right          { display: none; }
          .hero-subtitle       { font-size: 15px; }
          .hero-cta            { padding: 14px 28px; }

          /* Stats */
          .stats-section       { grid-template-columns: repeat(2, 1fr); }
          .stat-card           { padding: 32px 16px; border-right: 1px solid rgba(255,255,255,0.15); }
          .stat-card:nth-child(2) { border-right: none; }
          .stat-card:nth-child(4) { border-right: none; }
          .stat-value          { font-size: 36px; }
          .stat-label          { font-size: 9px; }

          /* Sections */
          .section             { padding: 56px 20px; }
          .section-title       { font-size: 28px; }

          /* Story */
          .story-grid          { grid-template-columns: 1fr; gap: 36px; }
          .story-visual        { height: 260px; }
          .story-quote         { padding: 20px 22px; font-size: 16px; }

          /* Values */
          .values-grid         { grid-template-columns: 1fr; gap: 16px; }
          .value-card          { padding: 30px 24px; }

          /* Branches */
          .branches-grid       { grid-template-columns: 1fr; }
          .branches-intro      { font-size: 14px; }

          /* Leadership */
          .leadership-grid     { grid-template-columns: 1fr; }
          .leader-card         { padding: 32px 20px; }

          /* CTA */
          .cta-banner          { padding: 56px 20px; }
          .cta-tagline         { font-size: 9px; letter-spacing: 0.2em; }
          .cta-btn-primary     { padding: 14px 28px; }
          .cta-btn-secondary   { padding: 14px 24px; }
        }

        /* ── Very small <400px ── */
        @media (max-width: 399px) {
          .hero-badge-row      { gap: 7px; }
          .hero-badge          { font-size: 8px; padding: 5px 10px; }
          .stats-section       { grid-template-columns: 1fr 1fr; }
          .story-inline-stats  { grid-template-columns: 1fr 1fr; }
        }
      `}</style>

      <div className="about-root">

        {/* ── HERO ── */}
        <section className="hero">
          <div className="hero-left">
            <span className="hero-eyebrow">Serving Patients is Serving GOD · Est. 2013</span>
            <h1 className="hero-title">
              Precision <em>Surgery,</em><br />
              Compassionate <em>Care.</em>
            </h1>
            <p className="hero-subtitle">
              Under the visionary leadership of Dr. Akhil Dadi, Srikara Hospitals has redefined joint replacement and multi-specialty care across Telangana and Andhra Pradesh for over a decade — spanning 9 branches and serving hundreds of thousands of patients.
            </p>
            <div className="hero-badge-row">
              {["NABH Accredited","ISO 9001:2015","NABL Certified","100+ Insurers"].map(b => (
                <span key={b} className="hero-badge">{b}</span>
              ))}
            </div>
            <a href="#story" className="hero-cta">Our Clinical Journey &nbsp;→</a>
          </div>
          <div className="hero-right">
            <div className="hero-emblem-wrap">
              <div className="ring ring-1" />
              <div className="ring ring-2" />
              <div className="hero-emblem">
                <div className="hero-emblem-inner">
                  <span className="hero-emblem-icon">✿</span>
                  <div className="hero-emblem-name">SRIKARA</div>
                  <div className="hero-emblem-sub">HOSPITALS</div>
                  <div className="hero-emblem-tagline">Serving Patients is Serving GOD</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── STATS ── */}
        <section className="stats-section" ref={statsRef}>
          {stats.map((s, i) => (
            <StatCard key={i} value={s.value} label={s.label} active={statsVisible} />
          ))}
        </section>

        {/* ── STORY ── */}
        <section className="section" id="story">
          <div className="section-inner">
            <div className="story-grid">
              <div className="story-text">
                <span className="section-tag">Since 2013</span>
                <h2 className="section-title">Redefining <em>Joint Replacement</em></h2>
                <p>
                  Srikara Hospitals was founded as a boutique orthopaedic centre and has since evolved into a multi-city healthcare powerhouse. We are recognised for our "Rapid Recovery" protocols, enabling patients to walk within hours of major joint replacement surgery.
                </p>
                <div className="story-quote">
                  "Our goal was never just to operate — but to restore quality of life through surgical precision, compassionate care and relentless clinical innovation."
                  <small>— Dr. Akhil Dadi, Chairman &amp; MD</small>
                </div>
                <p>
                  With 9 centres across Hyderabad, Telangana and Andhra Pradesh, we bring together the finest surgical minds and the latest robotic technology to ensure every patient — from Miyapur to Rajahmundry — receives world-class treatment.
                </p>
                <div className="story-inline-stats">
                  {[["9","Branches"],["1400+","Beds"],["500k+","Surgeries"],["10+","Years"]].map(([n, l]) => (
                    <div className="story-inline-stat" key={l}>
                      <div className="story-inline-stat-num">{n}</div>
                      <div className="story-inline-stat-lbl">{l}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="story-visual">
                <img src="/herosection.jpg" alt="Srikara Flagship Facility" />
              </div>
            </div>
          </div>
        </section>

        {/* ── VALUES ── */}
        <section className="section values-section">
          <div className="section-inner">
            <span className="section-tag">Core Values</span>
            <h2 className="section-title">Why <em>Choose Srikara?</em></h2>
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

        {/* ── BRANCHES ── */}
        <section className="section branches-section">
          <div className="section-inner">
            <span className="section-tag">Our Network</span>
            <h2 className="section-title">9 Centers of <em>Excellence</em></h2>
            <p className="branches-intro">
              From Central Hyderabad to the coastal districts of Andhra Pradesh, every Srikara branch is equipped with the same standard of advanced care, experienced specialists and compassionate service.
            </p>
            <div className="branches-grid">
              {branches.map((b) => (
                <div
                  key={b.id}
                  className={`branch-card ${activeBranch === b.id ? "active" : ""}`}
                  onClick={() => setActiveBranch(b.id)}
                >
                  <span className="branch-num">Branch 0{b.id}</span>
                  <div className="branch-city">{b.city}</div>
                  <div className="branch-area">{b.area} · Est. {b.since}</div>
                  <span className="branch-tag">{b.specialty}</span>
                  <div className="branch-meta">
                    <span>🛏 {b.beds} Beds</span>
                    <span>· 24/7 Emergency</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── LEADERSHIP ── */}
        <section className="section leadership-section">
          <div className="section-inner">
            <span className="section-tag">Leadership</span>
            <h2 className="section-title">World-Class <em>Specialists</em></h2>
            <p className="leadership-intro">
              Srikara's leadership team brings together decades of surgical excellence, academic distinction and a shared commitment to patient-first care across every branch in our network.
            </p>
            <div className="leadership-grid">
              {leadership.map((l, i) => (
                <div className="leader-card" key={i}>
                  <div className="leader-avatar">{l.initial}</div>
                  <div className="leader-name">{l.name}</div>
                  <div className="leader-role">{l.role}</div>
                  <div className="leader-specialty">{l.specialty}<br/>{l.exp} Experience</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="cta-banner">
          <div className="cta-tagline">Srikara Hospitals · 9 Branches Across Telangana &amp; AP</div>
          <h2 className="cta-title">Your path to painless mobility<br/>starts here.</h2>
          <p className="cta-sub">Serving Patients is Serving GOD</p>
          <div className="cta-btn-row">
            <button className="cta-btn-primary">Book a Consultation</button>
            <button className="cta-btn-secondary">Find Your Nearest Branch</button>
          </div>
        </section>

      </div>
      <Footer />
    </>
  );
}