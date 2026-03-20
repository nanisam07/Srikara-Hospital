"use client";
import { useState, useEffect, useRef } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const branches = [
  { id: 1, city: "Secunderabad", area: "RTC X Roads", since: "2013", beds: 200, specialty: "Orthopaedics & Joint Replacement" },
  { id: 2, city: "Miyapur", area: "Hyderabad", since: "2015", beds: 150, specialty: "Multi-Specialty Care" },
  { id: 3, city: "Kukatpally", area: "Hyderabad", since: "2017", beds: 100, specialty: "Emergency & Trauma" },
  { id: 4, city: "Vijayawada", area: "Benz Circle", since: "2018", beds: 150, specialty: "Advanced Orthopaedics" },
  { id: 5, city: "Kothapet", area: "Hyderabad", since: "2019", beds: 120, specialty: "Sports Medicine" },
  { id: 6, city: "Nizamabad", area: "Telangana", since: "2020", beds: 100, specialty: "Neuro & Spine" },
  { id: 7, city: "Tirupati", area: "Renigunta Road", since: "2021", beds: 150, specialty: "Arthroscopy & Joint Care" },
  { id: 8, city: "Khammam", area: "Telangana", since: "2022", beds: 100, specialty: "General Surgery" },
];

const stats = [
  { value: "10+", label: "Years of Excellence" },
  { value: "8", label: "Specialized Branches" },
  { value: "1000+", label: "Beds Across Network" },
  { value: "500k+", label: "Successful Surgeries" },
];

const leadership = [
  { name: "Dr. Akhil Dadi", role: "Chairman & Managing Director", specialty: "Joint Replacement & Orthopaedics", exp: "25+ yrs", initial: "AD" },
  { name: "Dr. Sudhir Reddy", role: "Director", specialty: "Orthopaedics", exp: "20 yrs", initial: "SR" },
  { name: "Dr. K.V. Ratnam", role: "Chief of Neurosciences", specialty: "Neurology", exp: "22 yrs", initial: "KR" },
  { name: "Dr. R. Jagan", role: "Medical Director", specialty: "Internal Medicine", exp: "18 yrs", initial: "RJ" },
];

const values = [
  { icon: "✦", title: "Precision Surgery", desc: "Pioneers in computer-navigated and robotic joint replacement surgery in South India." },
  { icon: "◈", title: "Patient Centric", desc: "Personalized recovery protocols designed to get patients back on their feet in record time." },
  { icon: "⬡", title: "Ethical Standards", desc: "Transparent billing and evidence-based treatments are the cornerstones of our practice." },
  { icon: "⊕", title: "Rapid Recovery", desc: "Specialized in minimally invasive techniques that reduce pain and hospital stays." },
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
      <Navbar />
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Nunito+Sans:wght@300;400;600;700;800&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        :root {
          /* ── EXACT Srikara Logo Colors ── */
          /* Steel blue-grey from "SRIKARA" wordmark */
          --blue:         #4a6382;
          --blue-dark:    #2e4060;
          --blue-darker:  #1c2d45;
          --blue-light:   #6a82a0;
          --blue-pale:    #eef2f7;

          /* Magenta / deep pink from "HOSPITALS" + emblem */
          --pink:         #96114a;
          --pink-dark:    #6b0c35;
          --pink-light:   #b01858;
          --pink-pale:    #faeef4;

          --white:        #ffffff;
          --cream:        #f9fafb;
          --text-dark:    #1c2d45;
          --text-mid:     #3d4f63;
          --text-soft:    #6b7a8d;
          --border:       rgba(74,99,130,0.14);
        }

        .about-root {
          font-family: 'Nunito Sans', sans-serif;
          background: var(--cream);
          color: var(--text-dark);
          overflow-x: hidden;
        }

        /* ══ HERO ══════════════════════════════════════ */
        .hero {
          min-height: 92vh;
          background: linear-gradient(135deg, var(--blue-darker) 0%, var(--blue-dark) 55%, var(--blue) 100%);
          display: grid;
          grid-template-columns: 1fr 1fr;
          position: relative;
          overflow: hidden;
        }
        .hero::before {
          content: '';
          position: absolute; inset: 0;
          background: radial-gradient(ellipse at 78% 45%, rgba(194,24,91,0.28) 0%, transparent 62%);
        }
        .hero::after {
          content: '';
          position: absolute; inset: 0;
          background-image:
            repeating-linear-gradient(0deg,  rgba(255,255,255,0.025) 0, rgba(255,255,255,0.025) 1px, transparent 1px, transparent 48px),
            repeating-linear-gradient(90deg, rgba(255,255,255,0.025) 0, rgba(255,255,255,0.025) 1px, transparent 1px, transparent 48px);
        }
        .hero-left {
          display: flex; flex-direction: column; justify-content: center;
          padding: 90px 80px; position: relative; z-index: 1;
        }
        .hero-eyebrow {
          font-size: 11px; font-weight: 800; letter-spacing: 0.32em;
          text-transform: uppercase; color: var(--pink-light);
          margin-bottom: 28px; display: flex; align-items: center; gap: 14px;
        }
        .hero-eyebrow::before {
          content: ''; width: 36px; height: 2px;
          background: var(--pink-light); border-radius: 2px; flex-shrink: 0;
        }
        .hero-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(44px, 5.5vw, 76px); font-weight: 700;
          color: var(--white); line-height: 1.1; margin-bottom: 28px;
        }
        .hero-title em { font-style: italic; color: #f4a0c0; }
        .hero-subtitle {
          font-size: 17px; line-height: 1.9;
          color: rgba(255,255,255,0.7); max-width: 460px; margin-bottom: 44px;
        }
        .hero-cta {
          background: var(--pink); color: var(--white);
          padding: 17px 40px; font-weight: 800; font-size: 12px;
          text-transform: uppercase; letter-spacing: 2px;
          text-decoration: none; width: fit-content; border-radius: 4px;
          transition: 0.3s; box-shadow: 0 8px 28px rgba(194,24,91,0.45);
        }
        .hero-cta:hover {
          background: var(--pink-light); transform: translateY(-3px);
          box-shadow: 0 14px 36px rgba(194,24,91,0.55);
        }
        .hero-right {
          display: flex; align-items: center; justify-content: center;
          position: relative; z-index: 1;
        }
        .hero-emblem {
          width: 360px; height: 360px; border-radius: 50%;
          border: 2px solid rgba(194,24,91,0.3);
          background: rgba(255,255,255,0.05); backdrop-filter: blur(8px);
          display: flex; align-items: center; justify-content: center;
          box-shadow: 0 0 80px rgba(194,24,91,0.2), inset 0 0 40px rgba(255,255,255,0.03);
        }
        .hero-emblem-inner { text-align: center; }
        .hero-emblem-icon {
          font-size: 88px; color: var(--pink-light); display: block;
          margin-bottom: 14px; filter: drop-shadow(0 0 20px rgba(194,24,91,0.5));
        }
        .hero-emblem-name {
          font-family: 'Playfair Display', serif; font-size: 30px;
          color: var(--white); letter-spacing: 6px; font-weight: 600;
        }
        .hero-emblem-sub {
          font-size: 12px; color: var(--pink-light); letter-spacing: 3px;
          text-transform: uppercase; margin-top: 6px; font-weight: 800;
        }
        .hero-emblem-tagline {
          font-size: 10px; color: rgba(255,255,255,0.4);
          letter-spacing: 1.5px; margin-top: 10px; font-style: italic;
        }

        /* ══ STATS BAR ══════════════════════════════════ */
        .stats-section {
          background: var(--pink); padding: 0;
          display: grid; grid-template-columns: repeat(4, 1fr);
        }
        .stat-card {
          padding: 52px 30px; text-align: center;
          border-right: 1px solid rgba(255,255,255,0.18);
          transition: background 0.3s; cursor: default;
        }
        .stat-card:last-child { border-right: none; }
        .stat-card:hover { background: var(--pink-dark); }
        .stat-value {
          font-family: 'Playfair Display', serif; font-size: 58px;
          font-weight: 700; color: var(--white); margin-bottom: 8px; line-height: 1;
        }
        .stat-label {
          color: rgba(255,255,255,0.8); font-size: 11px;
          text-transform: uppercase; letter-spacing: 2px; font-weight: 700;
        }

        /* ══ SHARED SECTION ══════════════════════════════ */
        .section { padding: 100px 80px; }
        .section-inner { max-width: 1200px; margin: 0 auto; }
        .section-tag {
          font-size: 10px; font-weight: 800; color: var(--pink);
          letter-spacing: 3px; text-transform: uppercase;
          margin-bottom: 16px; display: flex; align-items: center; gap: 10px;
        }
        .section-tag::before {
          content: ''; width: 24px; height: 2px;
          background: var(--pink); border-radius: 2px; flex-shrink: 0;
        }
        .section-title {
          font-family: 'Playfair Display', serif; font-size: 46px;
          font-weight: 700; margin-bottom: 32px;
          color: var(--blue-dark); line-height: 1.2;
        }
        .section-title em { font-style: italic; color: var(--pink); }

        /* ══ STORY ══════════════════════════════════════ */
        .story-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: center; }
        .story-text p { font-size: 16px; line-height: 1.9; color: var(--text-mid); margin-bottom: 22px; }
        .story-quote {
          border-left: 4px solid var(--pink); padding: 28px 32px;
          background: var(--pink-pale); font-family: 'Playfair Display', serif;
          font-size: 21px; font-style: italic; color: var(--blue-dark);
          margin: 32px 0; border-radius: 0 6px 6px 0;
        }
        .story-quote small {
          display: block; margin-top: 12px; font-size: 12px;
          font-family: 'Nunito Sans', sans-serif; font-style: normal;
          color: var(--pink); font-weight: 800;
          letter-spacing: 1px; text-transform: uppercase;
        }
        .story-visual-container {
          position: relative; height: 440px;
          border-radius: 8px; overflow: hidden;
          box-shadow: 0 30px 60px rgba(46,64,96,0.18);
        }
        .story-visual-container img { width: 100%; height: 100%; object-fit: cover; }
        .story-visual-container::after {
          content: ''; position: absolute; bottom: 0; left: 0; right: 0;
          height: 5px; background: linear-gradient(90deg, var(--blue), var(--pink));
        }

        /* ══ VALUES ═════════════════════════════════════ */
        .values-section { background: var(--blue-pale); }
        .values-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px; margin-top: 50px; }
        .value-card {
          background: var(--white); padding: 42px 34px; border-radius: 8px;
          box-shadow: 0 4px 20px rgba(74,99,130,0.08);
          border-top: 4px solid transparent; transition: 0.3s;
        }
        .value-card:hover {
          border-top-color: var(--pink); transform: translateY(-6px);
          box-shadow: 0 20px 44px rgba(74,99,130,0.14);
        }
        .value-icon { font-size: 30px; color: var(--blue); margin-bottom: 18px; display: block; }
        .value-title { font-weight: 800; font-size: 16px; margin-bottom: 12px; color: var(--blue-dark); }
        .value-desc { font-size: 14px; color: var(--text-soft); line-height: 1.7; }

        /* ══ BRANCHES ═══════════════════════════════════ */
        .branches-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-top: 50px; }
        .branch-card {
          background: var(--white); padding: 30px; border-radius: 8px;
          cursor: pointer; border: 2px solid var(--border); transition: 0.25s;
        }
        .branch-card:hover:not(.active) {
          border-color: var(--blue-light); box-shadow: 0 8px 24px rgba(74,99,130,0.12);
        }
        .branch-card.active { background: var(--blue-dark); border-color: var(--blue-dark); color: var(--white); }
        .branch-city { font-size: 17px; font-weight: 800; margin-bottom: 4px; }
        .branch-area { font-size: 12px; margin-bottom: 16px; opacity: 0.6; }
        .branch-tag {
          font-size: 10px; padding: 5px 12px; border-radius: 20px;
          font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; display: inline-block;
        }
        .branch-card:not(.active) .branch-tag { background: var(--pink-pale); color: var(--pink); }
        .branch-card.active .branch-tag { background: rgba(194,24,91,0.25); color: #f4a0c0; }
        .branch-beds { margin-top: 10px; font-size: 12px; font-weight: 700; display: flex; align-items: center; gap: 5px; }
        .branch-card:not(.active) .branch-beds { color: var(--blue); }
        .branch-card.active .branch-beds { color: rgba(255,255,255,0.6); }

        /* ══ LEADERSHIP ═════════════════════════════════ */
        .leadership-section { background: var(--blue-darker); }
        .leadership-section .section-tag { color: #f4a0c0; }
        .leadership-section .section-tag::before { background: #f4a0c0; }
        .leadership-section .section-title { color: var(--white); }
        .leadership-section .section-title em { color: #f4a0c0; }
        .leadership-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; margin-top: 50px; }
        .leader-card {
          background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.09);
          padding: 44px 32px; text-align: center; color: var(--white);
          border-radius: 8px; transition: 0.3s;
        }
        .leader-card:hover {
          background: rgba(194,24,91,0.1); border-color: rgba(194,24,91,0.4);
          transform: translateY(-4px);
        }
        .leader-avatar {
          width: 78px; height: 78px; border-radius: 50%;
          background: linear-gradient(135deg, var(--pink), var(--pink-dark));
          color: var(--white); display: flex; align-items: center; justify-content: center;
          margin: 0 auto 22px; font-size: 22px; font-weight: 700;
          font-family: 'Playfair Display', serif;
          box-shadow: 0 8px 24px rgba(194,24,91,0.45);
        }
        .leader-name { font-size: 17px; font-weight: 700; margin-bottom: 6px; font-family: 'Playfair Display', serif; }
        .leader-role { color: #f4a0c0; font-size: 10px; text-transform: uppercase; letter-spacing: 1.5px; margin-bottom: 10px; font-weight: 800; }
        .leader-specialty { font-size: 12px; color: rgba(255,255,255,0.45); }

        /* ══ CTA BANNER ══════════════════════════════════ */
        .cta-banner {
          background: linear-gradient(135deg, var(--blue-dark) 0%, var(--blue) 50%, var(--pink-dark) 100%);
          padding: 100px 80px; text-align: center; color: var(--white); position: relative; overflow: hidden;
        }
        .cta-banner::before {
          content: ''; position: absolute; inset: 0;
          background: radial-gradient(circle at 20% 50%, rgba(255,255,255,0.06) 0%, transparent 55%);
        }
        .cta-title {
          font-family: 'Playfair Display', serif; font-size: 46px;
          font-weight: 700; margin-bottom: 14px; position: relative;
        }
        .cta-sub {
          font-size: 17px; color: rgba(255,255,255,0.75); margin-bottom: 42px;
          position: relative; font-style: italic; font-family: 'Playfair Display', serif;
        }
        .cta-btn-primary {
          background: var(--pink); color: var(--white); padding: 18px 52px;
          border: none; font-weight: 800; font-size: 13px; text-transform: uppercase;
          letter-spacing: 2px; cursor: pointer; border-radius: 4px; transition: 0.3s;
          position: relative; box-shadow: 0 8px 28px rgba(194,24,91,0.45);
        }
        .cta-btn-primary:hover {
          background: var(--white); color: var(--pink); transform: translateY(-3px);
          box-shadow: 0 16px 36px rgba(0,0,0,0.25);
        }

        /* ══ RESPONSIVE ══════════════════════════════════ */
        @media (max-width: 1100px) {
          .values-grid  { grid-template-columns: repeat(2, 1fr); }
          .branches-grid { grid-template-columns: repeat(2, 1fr); }
          .leadership-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 768px) {
          .hero { grid-template-columns: 1fr; min-height: auto; }
          .hero-left { padding: 60px 24px; }
          .hero-right { display: none; }
          .story-grid { grid-template-columns: 1fr; gap: 40px; }
          .stats-section { grid-template-columns: repeat(2, 1fr); }
          .section { padding: 60px 24px; }
          .values-grid, .branches-grid, .leadership-grid { grid-template-columns: 1fr; }
          .cta-banner { padding: 60px 24px; }
          .cta-title { font-size: 32px; }
          .section-title { font-size: 34px; }
        }
      `}</style>

      <div className="about-root">

        {/* HERO */}
        <section className="hero">
          <div className="hero-left">
            <span className="hero-eyebrow">Excellence in Orthopaedics Since 2013</span>
            <h1 className="hero-title">
              Precision <em>Surgery,</em><br />
              Personalized <em>Care.</em>
            </h1>
            <p className="hero-subtitle">
              Under the visionary leadership of Dr. Akhil Dadi, Srikara Hospitals has redefined joint replacement and multispecialty care across South India for over a decade.
            </p>
            <a href="#story" className="hero-cta">Our Clinical Journey &nbsp;→</a>
          </div>
          <div className="hero-right">
            <div className="hero-emblem">
              <div className="hero-emblem-inner">
                <span className="hero-emblem-icon">✿</span>
                <div className="hero-emblem-name">SRIKARA</div>
                <div className="hero-emblem-sub">HOSPITALS</div>
                <div className="hero-emblem-tagline">Serving Patients is Serving GOD</div>
              </div>
            </div>
          </div>
        </section>

        {/* STATS */}
        <section className="stats-section" ref={statsRef}>
          {stats.map((s, i) => (
            <StatCard key={i} value={s.value} label={s.label} active={statsVisible} />
          ))}
        </section>

        {/* STORY */}
        <section className="section" id="story">
          <div className="section-inner">
            <div className="story-grid">
              <div className="story-text">
                <span className="section-tag">Since 2013</span>
                <h2 className="section-title">Redefining <em>Joint Replacement</em></h2>
                <p>
                  Srikara Hospitals was founded as a boutique orthopedic center and has since evolved into a multi-city healthcare powerhouse. We are known for our "Rapid Recovery" protocols, allowing patients to walk within hours of major surgery.
                </p>
                <div className="story-quote">
                  "Our goal was never just to operate, but to restore quality of life through surgical precision and technological innovation."
                  <small>— Dr. Akhil Dadi, Chairman & MD</small>
                </div>
                <p>
                  With centers across Telangana and Andhra Pradesh, we bring together the finest surgical minds and the latest robotic technology to ensure every patient receives world-class treatment.
                </p>
              </div>
              <div className="story-visual-container">
                <img src="/herosection.jpg" alt="Srikara Flagship Facility" />
              </div>
            </div>
          </div>
        </section>

        {/* VALUES */}
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

        {/* BRANCHES */}
        <section className="section">
          <div className="section-inner">
            <span className="section-tag">Our Network</span>
            <h2 className="section-title">8 Centers of <em>Excellence</em></h2>
            <div className="branches-grid">
              {branches.map((b) => (
                <div
                  key={b.id}
                  className={`branch-card ${activeBranch === b.id ? "active" : ""}`}
                  onClick={() => setActiveBranch(b.id)}
                >
                  <div className="branch-city">{b.city}</div>
                  <div className="branch-area">{b.area} · Since {b.since}</div>
                  <span className="branch-tag">{b.specialty}</span>
                  <div className="branch-beds">🛏 {b.beds} Beds</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* LEADERSHIP */}
        <section className="section leadership-section">
          <div className="section-inner">
            <span className="section-tag">Leadership</span>
            <h2 className="section-title">World-Class <em>Specialists</em></h2>
            <div className="leadership-grid">
              {leadership.map((l, i) => (
                <div className="leader-card" key={i}>
                  <div className="leader-avatar">{l.initial}</div>
                  <div className="leader-name">{l.name}</div>
                  <div className="leader-role">{l.role}</div>
                  <div className="leader-specialty">{l.specialty} · {l.exp}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="cta-banner">
          <h2 className="cta-title">Your path to painless mobility starts here.</h2>
          <p className="cta-sub">Serving Patients is Serving GOD</p>
          <button className="cta-btn-primary">Book a Consultation</button>
        </section>

      </div>
      <Footer />
    </>
  );
}