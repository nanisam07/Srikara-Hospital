"use client";
import { useState, useEffect, useRef } from "react";

// REAL SRIKARA BRANCH DATA
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

// LEADERSHIP UPDATED TO ACTUAL SRIKARA FOUNDER
const leadership = [
  {
    name: "Dr. Akhil Dadi",
    role: "Chairman & Managing Director",
    specialty: "Joint Replacement & Orthopaedics",
    exp: "25+ yrs",
    initial: "AD",
  },
  {
    name: "Dr. Sudhir Reddy",
    role: "Director",
    specialty: "Orthopaedics",
    exp: "20 yrs",
    initial: "SR",
  },
  {
    name: "Dr. K.V. Ratnam",
    role: "Chief of Neurosciences",
    specialty: "Neurology",
    exp: "22 yrs",
    initial: "KR",
  },
  {
    name: "Dr. R. Jagan",
    role: "Medical Director",
    specialty: "Internal Medicine",
    exp: "18 yrs",
    initial: "RJ",
  },
];

const values = [
  {
    icon: "✦",
    title: "Precision Surgery",
    desc: "Pioneers in computer-navigated and robotic joint replacement surgery in South India.",
  },
  {
    icon: "◈",
    title: "Patient Centric",
    desc: "Personalized recovery protocols designed to get patients back on their feet in record time.",
  },
  {
    icon: "⬡",
    title: "Ethical Standards",
    desc: "Transparent billing and evidence-based treatments are the cornerstones of our practice.",
  },
  {
    icon: "⊕",
    title: "Rapid Recovery",
    desc: "Specialized in minimally invasive techniques that reduce pain and hospital stays.",
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

function StatCard({ value, label, active }:{ value: string; label: string; active: boolean; }) {
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
          --teal: #0c4e4e;
          --teal-light: #166d6d;
          --teal-pale: #f0f7f7;
          --gold: #d4af37;
          --gold-light: #f1d37a;
          --cream: #fdfcf9;
          --deep: #082d2d;
          --mid: #2c3e3e;
          --soft: #7a8c8c;
          --white: #ffffff;
          --border: rgba(12,78,78,0.1);
        }

        .about-root { font-family: 'DM Sans', sans-serif; background: var(--cream); color: var(--deep); overflow-x: hidden; }

        .hero { min-height: 92vh; background: var(--deep); display: grid; grid-template-columns: 1fr 1fr; position: relative; overflow: hidden; }
        .hero::before { content: ''; position: absolute; inset: 0; background: radial-gradient(circle at 70% 50%, rgba(20,100,100,0.4) 0%, transparent 80%); }
        .hero-left { display: flex; flex-direction: column; justify-content: center; padding: 80px; position: relative; z-index: 1; }
        .hero-eyebrow { font-size: 11px; font-weight: 700; letter-spacing: 0.3em; text-transform: uppercase; color: var(--gold); margin-bottom: 24px; display: flex; align-items: center; gap: 15px; }
        .hero-eyebrow::before { content: ''; width: 30px; height: 1px; background: var(--gold); }
        .hero-title { font-family: 'Cormorant Garamond', serif; font-size: clamp(48px, 6vw, 80px); font-weight: 300; color: var(--white); line-height: 1.1; margin-bottom: 30px; }
        .hero-title em { font-style: italic; color: var(--gold-light); }
        .hero-subtitle { font-size: 17px; line-height: 1.8; color: rgba(255,255,255,0.7); max-width: 480px; margin-bottom: 40px; }
        .hero-cta { background: var(--gold); color: var(--deep); padding: 18px 36px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; text-decoration: none; width: fit-content; transition: 0.3s; }
        .hero-cta:hover { background: var(--white); transform: translateY(-3px); }

        .hero-right { display: flex; align-items: center; justify-content: center; position: relative; }
        .hero-emblem { width: 380px; height: 380px; border-radius: 50%; border: 1px solid rgba(212,175,55,0.2); display: flex; align-items: center; justify-content: center; }
        .hero-emblem-inner { text-align: center; }
        .hero-emblem-cross { font-size: 80px; color: var(--gold); display: block; margin-bottom: 10px; }
        .hero-emblem-name { font-family: 'Cormorant Garamond', serif; font-size: 32px; color: var(--white); letter-spacing: 4px; font-weight: 400; }
        
        .section { padding: 100px 80px; }
        .section-inner { max-width: 1200px; margin: 0 auto; }
        .section-tag { font-size: 10px; font-weight: 700; color: var(--teal); letter-spacing: 3px; text-transform: uppercase; margin-bottom: 20px; display: block; }
        .section-title { font-family: 'Cormorant Garamond', serif; font-size: 48px; font-weight: 300; margin-bottom: 30px; }
        .section-title em { color: var(--teal); font-style: italic; }

        .stats-section { background: var(--teal); padding: 60px 80px; display: grid; grid-template-columns: repeat(4, 1fr); gap: 1px; background-color: rgba(255,255,255,0.1); }
        .stat-card { background: var(--teal); padding: 50px; text-align: center; border: 1px solid rgba(255,255,255,0.05); }
        .stat-value { font-family: 'Cormorant Garamond', serif; font-size: 60px; color: var(--gold-light); margin-bottom: 10px; }
        .stat-label { color: rgba(255,255,255,0.6); font-size: 11px; text-transform: uppercase; letter-spacing: 2px; }

        .story-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: center; }
        .story-text p { font-size: 16px; line-height: 1.8; color: var(--mid); margin-bottom: 20px; }
        .story-quote { border-left: 4px solid var(--gold); padding: 30px; background: var(--teal-pale); font-family: 'Cormorant Garamond', serif; font-size: 24px; font-style: italic; color: var(--teal); margin: 30px 0; }

        .values-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; margin-top: 50px; }
        .value-card { background: var(--white); padding: 40px; box-shadow: 0 10px 30px rgba(0,0,0,0.03); border-bottom: 3px solid transparent; transition: 0.3s; }
        .value-card:hover { border-bottom-color: var(--gold); transform: translateY(-5px); }
        .value-icon { font-size: 30px; color: var(--teal); margin-bottom: 20px; display: block; }
        .value-title { font-weight: 600; margin-bottom: 15px; color: var(--deep); }
        .value-desc { font-size: 14px; color: var(--soft); line-height: 1.6; }

        .branches-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1px; background: var(--border); margin-top: 50px; }
        .branch-card { background: var(--white); padding: 40px; cursor: pointer; transition: 0.3s; }
        .branch-card.active { background: var(--teal-pale); }
        .branch-city { font-size: 20px; font-weight: 600; margin-bottom: 5px; }
        .branch-area { font-size: 14px; color: var(--soft); margin-bottom: 20px; }
        .branch-tag { font-size: 10px; padding: 5px 12px; border: 1px solid var(--border); color: var(--teal); font-weight: 600; text-transform: uppercase; }

        .leadership-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; margin-top: 50px; }
        .leader-card { background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); padding: 40px; text-align: center; color: white; transition: 0.3s; }
        .leader-card:hover { background: rgba(255,255,255,0.1); border-color: var(--gold); }
        .leader-avatar { width: 80px; height: 80px; border-radius: 50%; background: var(--gold); color: var(--deep); display: flex; align-items: center; justify-content: center; margin: 0 auto 20px; font-size: 24px; font-weight: 700; }
        .leader-name { font-size: 18px; margin-bottom: 5px; }
        .leader-role { color: var(--gold); font-size: 11px; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 10px; }

        .cta-banner { background: var(--teal); padding: 100px; text-align: center; color: white; }
        .cta-title { font-family: 'Cormorant Garamond', serif; font-size: 50px; margin-bottom: 30px; }
        .cta-btn-primary { background: var(--gold); color: var(--deep); padding: 18px 40px; border: none; font-weight: 700; text-transform: uppercase; cursor: pointer; }

        @media (max-width: 1024px) {
          .hero, .story-grid, .stats-section, .values-grid, .branches-grid, .leadership-grid { grid-template-columns: 1fr; }
          .hero-right { display: none; }
          .section { padding: 60px 20px; }
        }
      `}</style>

      <div className="about-root">
        <section className="hero">
          <div className="hero-left">
            <span className="hero-eyebrow">Excellence in Orthopaedics</span>
            <h1 className="hero-title">
              Precision <em>Surgery,</em><br />
              Personalized <em>Care.</em>
            </h1>
            <p className="hero-subtitle">
              Under the visionary leadership of Dr. Akhil Dadi, Srikara Hospitals has redefined joint replacement and multispecialty care in India for over a decade.
            </p>
            <a href="#story" className="hero-cta">Our Clinical Journey &nbsp;→</a>
          </div>
          <div className="hero-right">
            <div className="hero-emblem">
              <div className="hero-emblem-inner">
                <span className="hero-emblem-cross">✚</span>
                <div className="hero-emblem-name">SRIKARA</div>
              </div>
            </div>
          </div>
        </section>

        <section className="stats-section" ref={statsRef}>
          {stats.map((s, i) => (
            <StatCard key={i} value={s.value} label={s.label} active={statsVisible} />
          ))}
        </section>

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
                  <br /><small>— Dr. Akhil Dadi</small>
                </div>
                <p>
                  With centers across Telangana and Andhra Pradesh, we bring together the finest surgical minds and the latest robotic technology to ensure every patient receives world-class treatment.
                </p>
              </div>
              {/* Replace the current placeholder div with this */}
<div className="story-visual-container" style={{ position: 'relative', height: '400px' }}>
  <img 
    src="/herosection.jpg" // Change this to your actual image path
    alt="Srikara Flagship Facility"
    style={{ 
      width: '100%', 
      height: '100%', 
      objectFit: 'cover', 
      borderRadius: '4px',
      boxShadow: '0 20px 40px rgba(0,0,0,0.1)' 
    }} 
  />
</div>
            </div>
          </div>
        </section>

        <section className="section" style={{ background: 'var(--cream)' }}>
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

        <section className="section">
          <div className="section-inner">
            <span className="section-tag">Our Network</span>
            <h2 className="section-title">8 Centers of <em>Excellence</em></h2>
            <div className="branches-grid">
              {branches.map((b) => (
                <div key={b.id} className={`branch-card ${activeBranch === b.id ? "active" : ""}`} onClick={() => setActiveBranch(b.id)}>
                  <div className="branch-city">{b.city}</div>
                  <div className="branch-area">{b.area} · Since {b.since}</div>
                  <span className="branch-tag">{b.specialty}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section" style={{ background: 'var(--deep)' }}>
          <div className="section-inner">
            <span className="section-tag" style={{ color: 'var(--gold)' }}>Leadership</span>
            <h2 className="section-title" style={{ color: 'white' }}>World-Class <em>Specialists</em></h2>
            <div className="leadership-grid">
              {leadership.map((l, i) => (
                <div className="leader-card" key={i}>
                  <div className="leader-avatar">{l.initial}</div>
                  <div className="leader-name">{l.name}</div>
                  <div className="leader-role">{l.role}</div>
                  <div style={{ fontSize: '13px', opacity: 0.6 }}>{l.specialty}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="cta-banner">
          <h2 className="cta-title">Your path to painless mobility starts here.</h2>
          <button className="cta-btn-primary">Book a Consultation</button>
        </section>
      </div>
    </>
  );
}