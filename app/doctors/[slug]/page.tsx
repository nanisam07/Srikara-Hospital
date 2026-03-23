import { doctors } from "@/data/doctors";
import { notFound } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

/* ── Helpers ── */
function getInitials(name: string): string {
  return name
    .replace(/^Dr\.?\s*/i, "")
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");
}

function seededRandom(seed: number) {
  const x = Math.sin(seed + 1) * 10000;
  return x - Math.floor(x);
}

const DEPT_COLORS: Record<string, string> = {
  Orthopedic: "#7c3aed", Orthopedics: "#7c3aed", Cardiology: "#C0145C",
  Nephrology: "#6b4ea8", Neurology: "#185FA5", "Neuro Surgery": "#2e7d52",
  "General Surgery": "#854F0B", "General Medicine": "#0a6e6e",
  "General Physician": "#0a6e6e", Urology: "#1270A0", Gynaecology: "#b05090",
  Pediatrics: "#e07020", Pulmonology: "#3060a0", "Plastic Surgery": "#8e44ad",
  ENT: "#16a085", Physiotherapy: "#2e7d52", Anesthesia: "#555",
  Pathology: "#7f8c8d", Dermatology: "#e67e22", Psychiatry: "#8e44ad",
  Radiology: "#2c3e50", "Critical Care": "#c0392b", Dental: "#1abc9c",
};

const TIME_SLOTS = [
  "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM",
  "11:00 AM", "11:30 AM", "2:00 PM", "2:30 PM",
  "3:00 PM", "3:30 PM", "4:00 PM", "4:30 PM",
];

/* ════════════════════════════════════════════
   SERVER COMPONENT — builds the full profile
════════════════════════════════════════════ */
export default function DoctorPage({ params }: any) {
  const doctor = doctors.find((d) => d.slug === params.slug);
  if (!doctor) return notFound();

  const idx    = doctors.indexOf(doctor);
  const seed   = idx + 1;
  const color  = DEPT_COLORS[doctor.department] || "#0a6e6e";
  const initials = getInitials(doctor.name);

  const rating   = parseFloat((4.6 + seededRandom(seed) * 0.4).toFixed(1));
  const reviews  = Math.floor(100 + seededRandom(seed + 1) * 500);
  const expYears = 5 + Math.floor(seededRandom(seed + 2) * 20);
  const patients = 1000 + Math.floor(seededRandom(seed + 3) * 9000);
  const fee      = 400 + Math.floor(seededRandom(seed + 4) * 5) * 50;
  const available = idx % 3 !== 0;

  /* ── derive light bg from color ── */
  const lightBg: Record<string, string> = {
    "#7c3aed":"#f5f3ff","#C0145C":"#fff0f5","#6b4ea8":"#f5f2fb",
    "#185FA5":"#f0f6ff","#2e7d52":"#f0fbf4","#854F0B":"#fdf7ef",
    "#0a6e6e":"#e6f4f4","#1270A0":"#f0f5fa","#b05090":"#fdf0f5",
    "#e07020":"#fff5ee","#3060a0":"#f0f5fb","#8e44ad":"#f8f2fd",
    "#16a085":"#f0faf7","#555":"#f5f5f5","#7f8c8d":"#f4f6f6",
    "#e67e22":"#fef9f0","#2c3e50":"#f2f4f5","#c0392b":"#fdf2f0","#1abc9c":"#f0fbf8",
  };
  const AL = lightBg[color] || "#f7fafc";

  const css = `
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400&family=DM+Sans:wght@300;400;500;600;700;800&display=swap');
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html, body { font-family: 'DM Sans', sans-serif; background: #f5f7f7; overflow-x: hidden; }
    a { text-decoration: none; color: inherit; }
    img { max-width: 100%; display: block; }
    ::-webkit-scrollbar { width: 4px; }
    ::-webkit-scrollbar-thumb { background: ${color}; border-radius: 2px; }

    /* ── Accent bar ── */
    .dp-accent { height: 4px; background: linear-gradient(90deg, ${color}, #C0145C); }

    /* ── Breadcrumb ── */
    .dp-breadcrumb {
      background: #fff; border-bottom: 1px solid #e8edf2;
      padding: .55rem 2rem; font-size: .72rem; color: #9aabb8;
      display: flex; align-items: center; gap: .5rem; flex-wrap: wrap;
    }
    .dp-breadcrumb a { color: ${color}; font-weight: 600; }

    /* ── Hero ── */
    .dp-hero {
      background: linear-gradient(135deg, #071420 0%, #0f1e30 60%, #060e18 100%);
      position: relative; overflow: hidden; min-height: 68vh;
      display: flex; align-items: flex-end;
    }
    .dp-hero-glow {
      position: absolute; right: 8%; top: 40%; transform: translateY(-50%);
      width: 38vw; height: 38vw; border-radius: 50%;
      background: radial-gradient(circle, ${color}28 0%, transparent 65%);
      filter: blur(20px); pointer-events: none;
    }
    .dp-hero-photo {
      position: absolute; right: 0; top: 0; bottom: 0; width: 42%;
      overflow: hidden;
    }
    .dp-hero-photo img { width: 100%; height: 100%; object-fit: cover; object-position: top; opacity: .65; }
    .dp-hero-photo::before {
      content: ''; position: absolute; inset: 0; z-index: 1;
      background: linear-gradient(90deg, #071420 0%, transparent 50%);
    }
    .dp-hero-content {
      position: relative; z-index: 2;
      max-width: 1280px; margin: 0 auto;
      padding: 5rem 2rem 3.5rem; width: 100%;
    }
    .dp-hero-badge {
      display: inline-flex; align-items: center; gap: .5rem;
      background: ${color}22; border: 1px solid ${color}45;
      border-radius: 100px; padding: .3rem 1rem; margin-bottom: 1.4rem;
      font-size: .62rem; letter-spacing: .2em; text-transform: uppercase;
      color: ${color}; font-weight: 700;
    }
    .dp-avail-badge {
      display: inline-flex; align-items: center; gap: .5rem;
      border-radius: 100px; padding: .35rem 1.1rem; margin-bottom: 1.4rem;
      font-size: .68rem; font-weight: 800; letter-spacing: .06em;
      backdrop-filter: blur(10px);
    }
    .dp-hero-name {
      font-family: 'Cormorant Garamond', serif;
      font-size: clamp(2.4rem, 5vw, 4.2rem); font-weight: 700;
      color: #fff; line-height: 1.05; margin-bottom: .65rem; letter-spacing: -.01em;
    }
    .dp-hero-dept {
      font-size: .8rem; font-weight: 800; text-transform: uppercase;
      letter-spacing: .14em; color: ${color}; margin-bottom: .35rem;
    }
    .dp-hero-qual { font-size: .75rem; color: rgba(255,255,255,.42); margin-bottom: 1.8rem; }
    .dp-hero-stats {
      display: flex; gap: 12px; flex-wrap: wrap; margin-bottom: 1.8rem;
    }
    .dp-stat-pill {
      display: flex; align-items: center; gap: 10px;
      background: rgba(255,255,255,.05); backdrop-filter: blur(10px);
      border: 1px solid rgba(255,255,255,.1); border-radius: 12px; padding: 10px 16px;
    }
    .dp-hero-tags { display: flex; gap: 8px; flex-wrap: wrap; }
    .dp-hero-tag {
      background: rgba(255,255,255,.07); border: 1px solid rgba(255,255,255,.12);
      color: rgba(255,255,255,.6); font-size: .65rem; font-weight: 600;
      padding: .28rem .85rem; border-radius: 20px;
    }
    .dp-hero-tag-accent {
      background: ${color}28; border-color: ${color}50;
      color: ${color === "#C0145C" ? "#f9a8d4" : color}; font-weight: 800;
    }

    /* ── Stats bar ── */
    .dp-stats-bar {
      background: ${color};
      display: grid; grid-template-columns: repeat(4, 1fr);
    }
    .dp-stats-bar-item {
      padding: 1.3rem 1.2rem; text-align: center;
      border-right: 1px solid rgba(255,255,255,.2);
    }
    .dp-stats-bar-item:last-child { border-right: none; }
    .dp-stats-bar-val {
      font-family: 'Cormorant Garamond', serif;
      font-size: 1.9rem; font-weight: 700; color: #fff; line-height: 1;
    }
    .dp-stats-bar-lbl {
      font-size: .58rem; color: rgba(255,255,255,.65);
      letter-spacing: .12em; text-transform: uppercase; margin-top: .35rem;
    }

    /* ── Layout: main content + sidebar ── */
    .dp-layout {
      max-width: 1280px; margin: 0 auto;
      padding: 2.5rem 2rem 5rem;
      display: grid; grid-template-columns: 1fr 340px; gap: 28px; align-items: start;
    }
    .dp-left { display: flex; flex-direction: column; gap: 20px; }

    /* ── Card ── */
    .dp-card {
      background: #fff; border-radius: 18px; padding: 24px;
      border: 1px solid #e8f0f0; box-shadow: 0 2px 12px rgba(0,0,0,.04);
    }
    .dp-card-h {
      font-family: 'Cormorant Garamond', serif; font-size: 1.2rem;
      font-weight: 700; color: #0f1a1a; margin-bottom: 16px;
      padding-bottom: 12px; border-bottom: 2px solid #f0f8f8;
      display: flex; align-items: center; gap: 10px;
    }
    .dp-card-h::before {
      content: ''; width: 3px; height: 18px; border-radius: 2px;
      background: linear-gradient(to bottom, ${color}, #0a6e6e); display: inline-block;
    }

    /* ── About ── */
    .dp-about-text { font-size: .9rem; color: #4a6060; line-height: 1.85; }

    /* ── Expertise grid ── */
    .dp-expertise-grid {
      display: grid; grid-template-columns: repeat(auto-fill, minmax(190px, 1fr)); gap: 12px;
    }
    .dp-expertise-item {
      display: flex; align-items: center; gap: 12px;
      padding: 13px 16px; border-radius: 12px;
      border: 1px solid #e8f0f0; background: linear-gradient(135deg, #fff, #f8fdfd);
      font-size: .78rem; font-weight: 600; color: #1a2f2f;
    }
    .dp-expertise-icon {
      width: 36px; height: 36px; border-radius: 9px;
      display: flex; align-items: center; justify-content: center;
      font-size: 16px; flex-shrink: 0;
    }

    /* ── Timeline (education) ── */
    .dp-timeline { position: relative; padding-left: 28px; }
    .dp-timeline-line {
      position: absolute; left: 8px; top: 8px; bottom: 8px; width: 2px;
      background: linear-gradient(to bottom, ${color}, #0a6e6e); border-radius: 1px;
    }
    .dp-timeline-item {
      position: relative; margin-bottom: 20px; background: #fff;
      border-radius: 12px; padding: 15px 18px;
      border: 1px solid #e8f0f0; box-shadow: 0 2px 8px rgba(0,0,0,.04);
    }
    .dp-timeline-dot {
      position: absolute; left: -38px; top: 16px;
      width: 12px; height: 12px; border-radius: 50%; border: 2px solid #fff;
    }
    .dp-timeline-title { font-size: .88rem; font-weight: 700; color: #1a2f2f; }
    .dp-timeline-sub   { font-size: .75rem; color: #4a6060; margin-top: 4px; }
    .dp-timeline-badge {
      display: inline-block; margin-top: 6px; font-size: .65rem; font-weight: 700;
      padding: 2px 8px; border-radius: 20px;
    }

    /* ── Work exp ── */
    .dp-work-item {
      display: flex; gap: 14px; padding: 14px 0;
      border-bottom: 1px solid #f0f8f8;
    }
    .dp-work-item:last-child { border-bottom: none; }
    .dp-work-code {
      width: 42px; height: 42px; border-radius: 9px; flex-shrink: 0;
      background: linear-gradient(135deg, #e6f4f4, #d0ebeb);
      display: flex; align-items: center; justify-content: center;
      font-size: .7rem; font-weight: 800; color: #0a6e6e;
    }
    .dp-work-role  { font-size: .88rem; font-weight: 700; color: #1a2f2f; }
    .dp-work-org   { font-size: .75rem; color: #4a6060; margin-top: 2px; }
    .dp-work-period {
      font-size: .65rem; color: #9aafaf; margin-top: 4px;
      background: #f4fafa; padding: 2px 8px; border-radius: 20px; display: inline-block;
    }

    /* ── Sidebar ── */
    .dp-sidebar { display: flex; flex-direction: column; gap: 16px; }

    /* ── Booking widget ── */
    .dp-booking {
      background: #0a0f0f; border-radius: 20px;
      overflow: hidden; border: 1px solid rgba(255,255,255,.06);
    }
    .dp-booking-top {
      padding: 20px 18px 0;
      background: linear-gradient(135deg, ${color}20, rgba(192,20,92,0.15));
    }
    .dp-booking-fee-label {
      font-size: .62rem; color: rgba(255,255,255,.4); margin-bottom: 4px;
      text-transform: uppercase; letter-spacing: .06em;
    }
    .dp-booking-fee  { font-size: 1.8rem; font-weight: 800; color: #fff; line-height: 1; }
    .dp-booking-note { font-size: .62rem; color: rgba(255,255,255,.35); margin-top: 2px; }
    .dp-booking-body { padding: 16px 18px; }
    .dp-slots-label  { font-size: .62rem; color: rgba(255,255,255,.4); text-transform: uppercase; letter-spacing: .06em; margin-bottom: 10px; }
    .dp-slots-grid   { display: grid; grid-template-columns: repeat(3,1fr); gap: 6px; margin-bottom: 16px; }
    .dp-slot {
      padding: 7px 4px; border-radius: 8px; font-size: .65rem; font-weight: 500;
      cursor: pointer; text-align: center; border: 1px solid rgba(255,255,255,.1);
      background: rgba(255,255,255,.04); color: rgba(255,255,255,.5); transition: all .2s;
    }
    .dp-book-btn {
      width: 100%; padding: 13px; border-radius: 10px; border: none;
      font-family: 'DM Sans', sans-serif; font-size: .82rem; font-weight: 700;
      cursor: pointer; transition: all .3s;
    }
    .dp-cancel-note { font-size: .58rem; color: rgba(255,255,255,.2); text-align: center; margin-top: 8px; }

    /* ── Info card ── */
    .dp-info-card { background: #fff; border-radius: 16px; padding: 16px; border: 1px solid #e8f0f0; }
    .dp-info-row  { display: flex; align-items: center; gap: 12px; padding: 10px 0; border-bottom: 1px solid #f0f8f8; }
    .dp-info-row:last-child { border-bottom: none; }
    .dp-info-icon {
      width: 32px; height: 32px; border-radius: 8px;
      background: ${AL}; display: flex; align-items: center; justify-content: center;
      font-size: 14px; flex-shrink: 0;
    }
    .dp-info-label { font-size: .65rem; color: #9aafaf; }
    .dp-info-val   { font-size: .78rem; font-weight: 700; color: #1a2f2f; margin-top: 1px; }

    /* ── Branch card ── */
    .dp-branch-card { background: #fff; border-radius: 16px; padding: 16px; border: 1px solid #e8f0f0; }
    .dp-branch-h    { font-size: .65rem; font-weight: 700; color: #5a7070; text-transform: uppercase; letter-spacing: .06em; margin-bottom: 10px; }
    .dp-branch-item {
      display: flex; gap: 10px; background: linear-gradient(135deg, #e6f4f4, #d8eded);
      border-radius: 10px; padding: 10px 12px;
    }
    .dp-branch-dot { width: 7px; height: 7px; border-radius: 50%; background: #0a6e6e; margin-top: 4px; flex-shrink: 0; }
    .dp-branch-name { font-size: .78rem; font-weight: 700; color: #085041; }
    .dp-branch-addr { font-size: .65rem; color: #0F6E56; margin-top: 2px; }

    /* ── Other depts ── */
    .dp-other-section { padding: 2.5rem 2rem; background: #f7fafc; }
    .dp-other-inner   { max-width: 1280px; margin: 0 auto; }
    .dp-other-h       { font-size: .7rem; letter-spacing: .18em; text-transform: uppercase; color: #9aabb8; margin-bottom: 1.1rem; font-weight: 600; }
    .dp-other-tags    { display: flex; flex-wrap: wrap; gap: 8px; }
    .dp-other-tag     { padding: .4rem 1rem; border-radius: 100px; font-size: .72rem; font-weight: 500; text-decoration: none; background: #fff; border: 1px solid #e8edf2; color: #4a657a; transition: all .2s; }
    .dp-other-tag:hover { background: ${color}; color: #fff; border-color: ${color}; }
    .dp-other-all     { background: #0f2235; color: #fff; font-weight: 700; border-color: #0f2235; }

    /* ═══════════════════════════════
       RESPONSIVE
    ═══════════════════════════════ */

    /* Tablet 768–1023px */
    @media(max-width:1023px){
      .dp-hero-photo { display: none; }
      .dp-layout     { grid-template-columns: 1fr; }
      .dp-sidebar    { width: 100%; }
      .dp-stats-bar  { grid-template-columns: repeat(2,1fr); }
      .dp-stats-bar-item:nth-child(2) { border-right: none; }
      .dp-expertise-grid { grid-template-columns: repeat(2,1fr); }
    }

    /* Mobile <768px */
    @media(max-width:767px){
      .dp-hero-content   { padding: 3.5rem 1.2rem 2.5rem; }
      .dp-hero-name      { font-size: clamp(2rem, 8vw, 3rem); }
      .dp-hero-stats     { gap: 8px; }
      .dp-stat-pill      { padding: 8px 12px; }
      .dp-layout         { padding: 1.5rem 1rem 4rem; gap: 16px; }
      .dp-card           { padding: 18px 14px; }
      .dp-slots-grid     { grid-template-columns: repeat(2,1fr); }
      .dp-expertise-grid { grid-template-columns: 1fr; }
      .dp-stats-bar      { grid-template-columns: repeat(2,1fr); }
      .dp-stats-bar-val  { font-size: 1.5rem; }
      .dp-breadcrumb     { padding: .5rem 1rem; }
      .dp-other-section  { padding: 1.8rem 1rem; }
    }

    @media(max-width:399px){
      .dp-hero-stats { flex-direction: column; }
      .dp-stat-pill  { width: 100%; }
    }
  `;

  return (
    <>
      <Navbar />
      <style dangerouslySetInnerHTML={{ __html: css }} />

      {/* ── Breadcrumb ── */}
      <nav className="dp-breadcrumb">
        <a href="/">Home</a>
        <span>›</span>
        <a href="/doctors">Doctors</a>
        <span>›</span>
        <span style={{ color: "#4a657a", fontWeight: 500 }}>{doctor.name}</span>
      </nav>

      {/* ── Hero ── */}
      <section className="dp-hero">
        <div className="dp-hero-glow" />

        {/* Right photo — hidden on tablet/mobile */}
        <div className="dp-hero-photo">
          {doctor.image && <img src={doctor.image} alt={doctor.name} />}
        </div>

        <div className="dp-hero-content">
          <div style={{ maxWidth: 560 }}>
            {/* Dept badge */}
            <div className="dp-hero-badge">
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: color, display: "inline-block", boxShadow: `0 0 8px ${color}` }} />
              {doctor.department}
            </div>

            {/* Availability */}
            <div className="dp-avail-badge" style={{
              background: available ? "rgba(22,163,74,0.12)" : "rgba(234,179,8,0.12)",
              border: `1px solid ${available ? "rgba(22,163,74,0.3)" : "rgba(234,179,8,0.3)"}`,
              color: available ? "#4ade80" : "#fbbf24",
              marginLeft: 8,
              display: "inline-flex",
            }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: available ? "#4ade80" : "#fbbf24" }} />
              {available ? "Available Today" : "Next: Tomorrow"}
            </div>

            {/* Name */}
            <h1 className="dp-hero-name">{doctor.name}</h1>
            <div className="dp-hero-dept">{doctor.designation}</div>
            <div className="dp-hero-qual">{doctor.qualification}</div>

            {/* Stat pills */}
            <div className="dp-hero-stats">
              {[
                { emoji: "⭐", val: rating.toString(), lbl: "Rating" },
                { emoji: "🏆", val: `${expYears}+ yrs`, lbl: "Experience" },
                { emoji: "👥", val: `${patients}+`, lbl: "Patients" },
              ].map((s) => (
                <div key={s.lbl} className="dp-stat-pill">
                  <span style={{ fontSize: 16 }}>{s.emoji}</span>
                  <div>
                    <div style={{ fontSize: 15, fontWeight: 800, color: "#fff" }}>{s.val}</div>
                    <div style={{ fontSize: 9, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "0.06em" }}>{s.lbl}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Tags */}
            <div className="dp-hero-tags">
              <span className="dp-hero-tag">Telugu</span>
              <span className="dp-hero-tag">English</span>
              <span className="dp-hero-tag dp-hero-tag-accent">{doctor.branch}</span>
              <span className="dp-hero-tag">{reviews} Reviews</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats bar ── */}
      <div className="dp-stats-bar">
        {[
          { val: `⭐ ${rating}`, lbl: "Patient Rating" },
          { val: `${expYears}+ Yrs`, lbl: "Experience" },
          { val: `₹${fee}`, lbl: "Consultation Fee" },
          { val: `${patients}+`, lbl: "Patients Treated" },
        ].map((s, i) => (
          <div key={s.lbl} className="dp-stats-bar-item">
            <div className="dp-stats-bar-val">{s.val}</div>
            <div className="dp-stats-bar-lbl">{s.lbl}</div>
          </div>
        ))}
      </div>

      {/* ── Main layout ── */}
      <div style={{ background: "#f5f7f7" }}>
        <div className="dp-layout">

          {/* ── LEFT ── */}
          <div className="dp-left">

            {/* About */}
            <div className="dp-card">
              <div className="dp-card-h">About</div>
              <p className="dp-about-text">
                {doctor.name} is a dedicated specialist in <strong>{doctor.department}</strong> at
                Srikara Hospitals, {doctor.branch}. With over {expYears} years of clinical
                experience and expertise in {doctor.designation.toLowerCase()}, they are committed
                to delivering evidence-based, compassionate care to every patient — from initial
                diagnosis to complete recovery.
              </p>
            </div>

            {/* Areas of Expertise */}
            <div className="dp-card">
              <div className="dp-card-h">Areas of Expertise</div>
              <div className="dp-expertise-grid">
                {[
                  { icon: "🛡️", label: doctor.designation.split(",")[0] || doctor.department },
                  { icon: "❤️", label: doctor.department },
                  { icon: "🩺", label: "Patient Care" },
                  { icon: "🏆", label: "Expert Consultation" },
                  { icon: "🔬", label: "Clinical Research" },
                  { icon: "🤝", label: "Compassionate Care" },
                ].map((e) => (
                  <div key={e.label} className="dp-expertise-item">
                    <div className="dp-expertise-icon" style={{ background: AL }}>{e.icon}</div>
                    {e.label}
                  </div>
                ))}
              </div>
            </div>

            {/* Education */}
            <div className="dp-card">
              <div className="dp-card-h">Education & Qualifications</div>
              <div className="dp-timeline">
                <div className="dp-timeline-line" />
                {[
                  { title: doctor.qualification || doctor.department, org: "Osmania Medical College, Hyderabad", year: `${2000 + Math.floor(seededRandom(seed + 5) * 20)}`, primary: true },
                  { title: "MBBS", org: "Gandhi Medical College, Hyderabad", year: `${1995 + Math.floor(seededRandom(seed + 6) * 15)}`, primary: false },
                ].map((e) => (
                  <div key={e.title} className="dp-timeline-item">
                    <div className="dp-timeline-dot" style={{ background: e.primary ? color : "#0a6e6e" }} />
                    <div className="dp-timeline-title">{e.title}</div>
                    <div className="dp-timeline-sub">{e.org}</div>
                    <span className="dp-timeline-badge" style={{ background: e.primary ? `${color}12` : "#e6f4f4", color: e.primary ? color : "#0a6e6e" }}>
                      Class of {e.year}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Work Experience */}
            <div className="dp-card">
              <div className="dp-card-h">Work Experience</div>
              {[
                { code: "SH", role: doctor.designation, org: `Srikara Hospitals – ${doctor.branch}`, period: `${2015 + Math.floor(seededRandom(seed + 7) * 8)} – Present` },
                { code: "AH", role: "Consultant Physician", org: "Apollo Hospitals, Hyderabad", period: `${2010 + Math.floor(seededRandom(seed + 8) * 5)} – ${2014 + Math.floor(seededRandom(seed + 7) * 5)}` },
              ].map((e) => (
                <div key={e.code} className="dp-work-item">
                  <div className="dp-work-code">{e.code}</div>
                  <div>
                    <div className="dp-work-role">{e.role}</div>
                    <div className="dp-work-org">{e.org}</div>
                    <span className="dp-work-period">{e.period}</span>
                  </div>
                </div>
              ))}
            </div>

          </div>

          {/* ── SIDEBAR ── */}
          <div className="dp-sidebar">

            {/* Booking widget */}
            <div className="dp-booking">
              <div className="dp-booking-top">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
                  <div>
                    <div className="dp-booking-fee-label">Consultation Fee</div>
                    <div className="dp-booking-fee">₹{fee}</div>
                    <div className="dp-booking-note">per visit · Includes follow-up</div>
                  </div>
                  <div style={{
                    background: available ? "rgba(74,222,128,0.12)" : "rgba(251,191,36,0.12)",
                    border: `1px solid ${available ? "rgba(74,222,128,0.25)" : "rgba(251,191,36,0.25)"}`,
                    borderRadius: 8, padding: "6px 10px", textAlign: "center",
                  }}>
                    <div style={{ fontSize: 9, color: available ? "#4ade80" : "#fbbf24", fontWeight: 700 }}>{available ? "TODAY" : "TOMORROW"}</div>
                  </div>
                </div>
              </div>
              <div className="dp-booking-body">
                <div className="dp-slots-label">Select Time Slot</div>
                <div className="dp-slots-grid">
                  {TIME_SLOTS.map((s) => (
                    <div key={s} className="dp-slot">{s}</div>
                  ))}
                </div>
                <Link href={`/doctors?doctor=${doctor.slug}`}>
                  <button className="dp-book-btn" style={{ background: `linear-gradient(135deg, ${color}, #C0145C)`, color: "#fff", boxShadow: `0 8px 24px ${color}44` }}>
                    Book Appointment →
                  </button>
                </Link>
                <p className="dp-cancel-note">Free cancellation up to 2 hrs before</p>
              </div>
            </div>

            {/* Info */}
            <div className="dp-info-card">
              {[
                { icon: "📍", label: "Branch",   val: `Srikara Hospitals – ${doctor.branch}` },
                { icon: "🕐", label: "Timings",  val: "9:00 AM – 6:00 PM, Mon–Sat" },
                { icon: "📞", label: "Helpline", val: "040 4646 0000" },
                { icon: "🌐", label: "Languages",val: "Telugu, English" },
              ].map((r) => (
                <div key={r.label} className="dp-info-row">
                  <div className="dp-info-icon">{r.icon}</div>
                  <div>
                    <div className="dp-info-label">{r.label}</div>
                    <div className="dp-info-val">{r.val}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Branch */}
            <div className="dp-branch-card">
              <div className="dp-branch-h">Available At</div>
              <div className="dp-branch-item">
                <div className="dp-branch-dot" />
                <div>
                  <div className="dp-branch-name">Srikara Hospitals – {doctor.branch}</div>
                  <div className="dp-branch-addr">{doctor.branch}, Hyderabad</div>
                </div>
              </div>
            </div>

            {/* Emergency */}
            <div style={{ background: "rgba(192,20,92,0.08)", border: "1px solid rgba(192,20,92,0.2)", borderRadius: 14, padding: "14px 16px" }}>
              <div style={{ fontSize: "0.65rem", fontWeight: 800, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(0,0,0,0.4)", marginBottom: 6 }}>24/7 Emergency</div>
              <a href="tel:9609108108" style={{ fontSize: "1.1rem", fontWeight: 900, color: "#C0145C", textDecoration: "none", display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#C0145C", animation: "pulse 1.5s infinite", flexShrink: 0 }} />
                9609108108
              </a>
            </div>

          </div>
        </div>
      </div>

      {/* ── Other Doctors ── */}
      <section className="dp-other-section">
        <div className="dp-other-inner">
          <div className="dp-other-h">More Specialists</div>
          <div className="dp-other-tags">
            {doctors.filter((d) => d.slug !== doctor.slug && d.department === doctor.department).slice(0, 6).map((d) => (
              <a key={d.slug} href={`/doctors/${d.slug}`} className="dp-other-tag">{d.name}</a>
            ))}
            {doctors.filter((d) => d.slug !== doctor.slug && d.branch === doctor.branch).slice(0, 4).map((d) => (
              <a key={d.slug} href={`/doctors/${d.slug}`} className="dp-other-tag">{d.name}</a>
            ))}
            <a href="/doctors" className="dp-other-tag dp-other-all">All Doctors →</a>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes pulse {
          0%,100%{ transform:scale(1); opacity:1; }
          50%{ transform:scale(1.5); opacity:0.4; }
        }
      `}</style>

      <Footer />
    </>
  );
}