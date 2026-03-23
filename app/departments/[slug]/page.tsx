import { notFound } from "next/navigation";
import { departments, getDepartmentBySlug, type Department } from "@/data/departments";
import type { Metadata } from "next";
import { doctorsWithSlug } from "@/data/doctors";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const dept = getDepartmentBySlug(slug);
  if (!dept) return { title: "Department Not Found | Srikara Hospitals" };
  return {
    title: `${dept.name} | Srikara Hospitals`,
    description: dept.desc,
    openGraph: {
      title: `${dept.name} — ${dept.tagline} | Srikara Hospitals`,
      description: dept.desc,
      images: [{ url: dept.heroImg }],
    },
  };
}

export function generateStaticParams() {
  return departments.map((d) => ({ slug: d.slug }));
}

export default async function DepartmentPage({ params }: Props) {
  const { slug } = await params;
  const dept = getDepartmentBySlug(slug);
  if (!dept) notFound();
  return <DepartmentView dept={dept} />;
}

function hexToLightBg(hex: string): string {
  const map: Record<string, string> = {
    "#B01C4E": "#fdf0f4", "#4A2D8C": "#f5f2fb", "#B06A10": "#fdf7ef",
    "#0E6B7A": "#f0f8fa", "#B5456A": "#fdf0f5", "#8B1A1A": "#fdf2f2",
    "#1565A0": "#f0f6ff", "#1B5E8A": "#f0f7ff", "#2E7D52": "#f0fbf4",
    "#2565A8": "#f0f4ff", "#1A4A6A": "#f0f5fa", "#7A4A1E": "#fdf8f2",
    "#1C3A6B": "#f0f3fa", "#1E6B3E": "#f2fbf5", "#A05C20": "#fdf8f2",
    "#C21010": "#fff5f5", "#1A6B4A": "#f0fdf6", "#5E2D8C": "#f8f2fd",
    "#1A5E8A": "#f0f6fb", "#3D3580": "#f5f4fb",
  };
  return map[hex] ?? "#f7fafc";
}

function getInitials(name: string): string {
  return name
    .replace(/^Dr\.?\s*/i, "")
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((n) => n[0]?.toUpperCase() ?? "")
    .join("");
}

function DepartmentView({ dept }: { dept: Department }) {
  const A = dept.color;
  const AL = hexToLightBg(A);

  const departmentDoctors = doctorsWithSlug.filter((doc) =>
    doc.department.toLowerCase().includes(dept.name.toLowerCase()) ||
    dept.name.toLowerCase().includes(doc.department.toLowerCase())
  );

  return (
    <main style={{ fontFamily: "'DM Sans', sans-serif", background: "#f7fafc" }}>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=DM+Sans:wght@300;400;500;600;700&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .doctor-card {
          background: #fff; border-radius: 20px; overflow: hidden;
          box-shadow: 0 4px 24px rgba(0,0,0,0.07); border: 1.5px solid #f0f4f8;
          transition: all 0.35s cubic-bezier(0.34,1.56,0.64,1);
          cursor: pointer; text-decoration: none; display: block; color: inherit;
        }
        .doctor-card:hover { transform: translateY(-10px) scale(1.02); box-shadow: 0 28px 60px rgba(0,0,0,0.15); border-color: ${A}55; }
        .doctor-card:hover .book-btn { background: ${A} !important; }
        .proc-item:hover { border-left-color: ${A} !important; background: ${AL} !important; transform: translateX(4px); }

        /* ── Hero layout ── */
        .dv-hero-inner {
          max-width: 1280px; margin: 0 auto;
          padding: 5rem 2.5rem; width: 100%; position: relative; z-index: 1;
        }
        .dv-hero-photo {
          position: absolute; right: 0; top: 0; bottom: 0; width: 44%; overflow: hidden;
        }

        /* ── Stats bar ── */
        .dv-stats-bar {
          background: ${A};
          display: grid;
          grid-template-columns: repeat(${dept.stats.length}, 1fr);
        }

        /* ── Procedures layout ── */
        .dv-proc-layout {
          max-width: 1280px; margin: 0 auto;
          display: flex; gap: 4rem; align-items: flex-start; flex-wrap: wrap;
        }
        .dv-proc-content { flex: 1 1 480px; }
        .dv-proc-img     { flex: 0 0 300px; }
        .dv-proc-grid    { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }

        /* ── Doctors grid ── */
        .dv-doc-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 24px;
        }

        /* ── CTA ── */
        .dv-cta-btns { display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap; }

        /* ── Other depts ── */
        .dv-other-depts { display: flex; flex-wrap: wrap; gap: 8px; }

        /* ── Breadcrumb ── */
        .dv-breadcrumb {
          background: #fff; border-bottom: 1px solid #e8edf2;
          padding: .6rem 2.5rem; font-size: .72rem; color: #9aabb8;
          display: flex; align-items: center; gap: .5rem; flex-wrap: wrap;
        }

        /* ════════════════════════════════
           RESPONSIVE
        ════════════════════════════════ */

        /* Tablet 768–1023px */
        @media (max-width: 1023px) {
          .dv-hero-photo   { display: none; }
          .dv-hero-inner   { padding: 4rem 2rem; }
          .dv-stats-bar    { grid-template-columns: repeat(2, 1fr) !important; }
          .dv-stat-item:nth-child(2) { border-right: none !important; }
          .dv-proc-img     { flex: 0 0 100%; }
          .dv-proc-img > div { height: 260px !important; }
        }

        /* Mobile <768px */
        @media (max-width: 767px) {
          .dv-breadcrumb   { padding: .5rem 1.2rem; }
          .dv-hero-inner   { padding: 3rem 1.2rem 2.5rem; }
          .dv-hero-title   { font-size: clamp(2.2rem, 9vw, 3.5rem) !important; }
          .dv-cta-btns a, .dv-cta-btns a * { font-size: .78rem !important; }
          .dv-stats-bar    { grid-template-columns: 1fr 1fr !important; }
          .dv-stat-item    { padding: 1.1rem 1rem !important; }
          .dv-stat-val     { font-size: 1.7rem !important; }
          .dv-proc-section { padding: 3rem 1.2rem !important; }
          .dv-proc-content { flex: 0 0 100%; }
          .dv-proc-grid    { grid-template-columns: 1fr; gap: 8px; }
          .dv-doc-section  { padding: 3rem 1.2rem !important; }
          .dv-doc-grid     { grid-template-columns: 1fr; }
          .dv-book-section { padding: 3rem 1.2rem !important; }
          .dv-other-section{ padding: 2rem 1.2rem !important; }
          .dv-other-depts  { gap: 6px; }
        }

        @media (max-width: 399px) {
          .dv-proc-grid    { grid-template-columns: 1fr; }
          .dv-stats-bar    { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>

      {/* ── Breadcrumb ── */}
      <nav className="dv-breadcrumb">
        <a href="/"           style={{ color: A, fontWeight: 600, textDecoration: "none" }}>Home</a>
        <span>›</span>
        <a href="/departments" style={{ color: A, fontWeight: 600, textDecoration: "none" }}>Departments</a>
        <span>›</span>
        <span style={{ color: "#4a657a", fontWeight: 500 }}>{dept.name}</span>
      </nav>

      {/* ── Hero ── */}
      <section style={{ background: "linear-gradient(135deg,#071420 0%,#0f1e30 60%,#060e18 100%)", minHeight: "72vh", position: "relative", overflow: "hidden", display: "flex", alignItems: "center" }}>
        {/* Glow */}
        <div style={{ position: "absolute", right: "8%", top: "40%", transform: "translateY(-50%)", width: "40vw", height: "40vw", borderRadius: "50%", background: `radial-gradient(circle,${A}28 0%,transparent 65%)`, pointerEvents: "none", filter: "blur(20px)" }} />

        {/* Right photo — hidden on tablet/mobile via CSS */}
        <div className="dv-hero-photo">
          <img src={dept.heroImg} alt={dept.name} style={{ width: "100%", height: "100%", objectFit: "cover", opacity: .65 }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg,#071420 0%,transparent 50%)" }} />
        </div>

        <div className="dv-hero-inner">
          <div style={{ maxWidth: 580 }}>
            {/* Badge */}
            <div style={{ display: "inline-flex", alignItems: "center", gap: ".6rem", background: `${A}22`, border: `1px solid ${A}45`, borderRadius: 100, padding: ".3rem 1rem", marginBottom: "1.5rem", fontSize: ".62rem", letterSpacing: ".2em", textTransform: "uppercase", color: A, fontWeight: 700 }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: A, display: "inline-block", boxShadow: `0 0 8px ${A}` }} />
              {dept.badge}
            </div>
            {/* Title */}
            <h1 className="dv-hero-title" style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2.8rem,5.5vw,5.5rem)", fontWeight: 700, color: "#fff", lineHeight: .92, marginBottom: "1.2rem", letterSpacing: "-.01em" }}>
              {dept.name}<br />
              <em style={{ color: A, fontWeight: 400, fontSize: ".65em" }}>{dept.tagline}</em>
            </h1>
            <div style={{ width: 56, height: 3, background: A, borderRadius: 2, marginBottom: "1.5rem" }} />
            <p style={{ fontSize: "1rem", color: "rgba(255,255,255,.62)", lineHeight: 1.8, maxWidth: 480, marginBottom: "2.5rem", fontWeight: 300 }}>{dept.desc}</p>
            {/* CTAs */}
            <div className="dv-cta-btns" style={{ justifyContent: "flex-start" }}>
              <a href="#book" style={{ display: "inline-flex", alignItems: "center", gap: ".5rem", padding: ".9rem 2rem", borderRadius: 8, fontSize: ".82rem", fontWeight: 700, textDecoration: "none", background: A, color: "#fff", boxShadow: `0 8px 24px ${A}55` }}>
                Book Appointment →
              </a>
              <a href="tel:04046460000" style={{ display: "inline-flex", alignItems: "center", gap: ".5rem", padding: ".9rem 2rem", borderRadius: 8, fontSize: ".82rem", fontWeight: 500, color: "rgba(255,255,255,.8)", border: "1.5px solid rgba(255,255,255,.2)", textDecoration: "none", backdropFilter: "blur(10px)" }}>
                📞 040 4646 0000
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats Bar ── */}
      <div className="dv-stats-bar">
        {dept.stats.map(([v, l], i) => (
          <div key={i} className="dv-stat-item" style={{ padding: "1.6rem 1.5rem", borderRight: i < dept.stats.length - 1 ? "1px solid rgba(255,255,255,.2)" : "none", textAlign: "center" }}>
            <div className="dv-stat-val" style={{ fontFamily: "'Playfair Display', serif", fontSize: "2.2rem", fontWeight: 700, color: "#fff", lineHeight: 1 }}>{v}</div>
            <div style={{ fontSize: ".6rem", color: "rgba(255,255,255,.65)", letterSpacing: ".12em", textTransform: "uppercase", marginTop: ".4rem" }}>{l}</div>
          </div>
        ))}
      </div>

      {/* ── Procedures & Treatments ── */}
      <section className="dv-proc-section" style={{ padding: "5.5rem 2.5rem", background: AL }}>
        <div className="dv-proc-layout">
          <div className="dv-proc-content">
            <div style={{ fontSize: ".62rem", letterSpacing: ".22em", textTransform: "uppercase", color: A, fontWeight: 700, marginBottom: ".7rem" }}>Clinical Services</div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.6rem,3vw,2.8rem)", fontWeight: 600, color: "#0f2235", marginBottom: "2rem" }}>Procedures & Treatments</h2>
            <div className="dv-proc-grid">
              {dept.procedureList.map((p) => (
                <div key={p} className="proc-item" style={{ display: "flex", alignItems: "center", gap: ".7rem", padding: ".9rem 1.2rem", background: "#fff", border: "1px solid #e8edf2", borderRadius: 8, borderLeft: `3px solid ${A}`, transition: "all 0.2s ease" }}>
                  <div style={{ width: 6, height: 6, borderRadius: "50%", background: A, flexShrink: 0 }} />
                  <span style={{ fontSize: ".82rem", color: "#2a3f52", fontWeight: 500 }}>{p}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="dv-proc-img">
            <div style={{ borderRadius: 16, overflow: "hidden", height: 380, boxShadow: `0 20px 48px ${A}22` }}>
              <img src={dept.heroImg2 ?? dept.heroImg} alt={dept.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
          </div>
        </div>
      </section>

      {/* ── Specialist Doctors ── */}
      <section className="dv-doc-section" style={{ padding: "5.5rem 2.5rem", background: "#fff" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ fontSize: ".62rem", letterSpacing: ".22em", textTransform: "uppercase", color: A, fontWeight: 700, marginBottom: ".7rem" }}>Our Team</div>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.6rem,3.5vw,3rem)", fontWeight: 600, color: "#0f2235", marginBottom: ".6rem" }}>Specialist Doctors</h2>
          <p style={{ fontSize: ".9rem", color: "#6a8090", marginBottom: "2.5rem", maxWidth: 520 }}>
            Meet our experienced specialists dedicated to delivering world-class care at Srikara Hospitals.
          </p>

          {departmentDoctors.length === 0 ? (
            <div style={{ textAlign: "center", padding: "60px 24px", background: AL, borderRadius: 16, border: `1.5px dashed ${A}40` }}>
              <div style={{ fontSize: 48, marginBottom: 12 }}>👨‍⚕️</div>
              <p style={{ color: "#6a8090", fontSize: ".9rem" }}>Doctor profiles for this department are being updated. Please call us for specialist availability.</p>
              <a href="tel:04046460000" style={{ display: "inline-block", marginTop: 16, padding: ".7rem 1.8rem", background: A, color: "#fff", borderRadius: 8, fontWeight: 700, fontSize: ".82rem", textDecoration: "none" }}>📞 Call for Appointments</a>
            </div>
          ) : (
            <div className="dv-doc-grid">
              {departmentDoctors.map((doc, index) => {
                const initials = getInitials(doc.name);
                return (
                  <a key={`${doc.slug}-${index}`} href={`/doctors?doctor=${doc.slug}`} className="doctor-card">
                    <div style={{ height: 4, background: `linear-gradient(90deg, ${A}, #C0145C)` }} />
                    <div style={{ position: "relative", height: 220, overflow: "hidden" }}>
                      {doc.image ? (
                        <img src={doc.image} alt={doc.name} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top" }} />
                      ) : (
                        <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: `linear-gradient(135deg, ${A}22, ${A}44)` }}>
                          <span style={{ fontSize: "4rem", fontWeight: 800, color: A, fontFamily: "'Playfair Display', serif", opacity: 0.7 }}>{initials}</span>
                        </div>
                      )}
                      <div style={{ position: "absolute", bottom: 10, left: 10, background: "rgba(0,0,0,0.6)", backdropFilter: "blur(8px)", borderRadius: 20, padding: "3px 10px", fontSize: ".65rem", fontWeight: 700, color: "#fff", border: "1px solid rgba(255,255,255,0.15)" }}>{doc.branch}</div>
                    </div>
                    <div style={{ padding: "1.3rem 1.4rem 1.4rem" }}>
                      <div style={{ marginBottom: 10 }}>
                        <h3 style={{ fontSize: "1.05rem", fontWeight: 700, color: "#0f2235", marginBottom: 4, fontFamily: "'Playfair Display', serif" }}>{doc.name}</h3>
                        <div style={{ fontSize: ".75rem", fontWeight: 700, color: A, textTransform: "uppercase", letterSpacing: ".05em", marginBottom: 2 }}>{doc.department}</div>
                        <div style={{ fontSize: ".72rem", color: "#7a9090" }}>{doc.qualification}</div>
                      </div>
                      <div style={{ fontSize: ".68rem", fontWeight: 600, color: "#4a6070", background: AL, padding: "5px 10px", borderRadius: 20, marginBottom: 14, display: "inline-block", border: `1px solid ${A}20`, maxWidth: "100%", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{doc.designation}</div>
                      <button className="book-btn" style={{ width: "100%", padding: "10px", borderRadius: 10, border: "none", background: "#0a6e6e", color: "#fff", fontSize: ".8rem", fontWeight: 700, cursor: "pointer", transition: "background 0.3s ease", letterSpacing: ".02em" }}>
                        Book Appointment
                      </button>
                    </div>
                  </a>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* ── Book Appointment ── */}
      <section id="book" className="dv-book-section" style={{ background: "#0f2235", padding: "5rem 2.5rem", textAlign: "center" }}>
        <div style={{ maxWidth: 580, margin: "0 auto" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: ".5rem", background: `${A}22`, border: `1px solid ${A}45`, borderRadius: 100, padding: ".3rem 1rem", marginBottom: "1.5rem", fontSize: ".62rem", letterSpacing: ".2em", textTransform: "uppercase", color: A, fontWeight: 700 }}>✦ Ready to consult?</div>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.6rem,3vw,2.8rem)", fontWeight: 600, color: "#fff", marginBottom: "1rem", lineHeight: 1.2 }}>
            Expert {dept.name} Care<br />
            <em style={{ color: A, fontStyle: "normal", fontWeight: 400 }}>at your nearest branch</em>
          </h2>
          <p style={{ color: "rgba(255,255,255,.5)", fontSize: ".95rem", marginBottom: "2rem", lineHeight: 1.8 }}>
            Call <strong style={{ color: "#fff" }}>040 4646 0000</strong> or book online.<br />
            Mon–Sat, 8 AM–8 PM · Emergency: <strong style={{ color: "#fff" }}>9609108108</strong>
          </p>
          <div className="dv-cta-btns">
            <a href="tel:04046460000" style={{ background: A, color: "#fff", padding: ".9rem 2.2rem", borderRadius: 8, fontSize: ".82rem", fontWeight: 700, textDecoration: "none", boxShadow: `0 8px 24px ${A}55` }}>📞 Call Now</a>
            <a href="#" style={{ border: "1.5px solid rgba(255,255,255,.25)", color: "#fff", padding: ".9rem 2.2rem", borderRadius: 8, fontSize: ".82rem", fontWeight: 500, textDecoration: "none", backdropFilter: "blur(10px)" }}>Book Online →</a>
          </div>
        </div>
      </section>

      {/* ── Other Departments ── */}
      <section className="dv-other-section" style={{ padding: "3rem 2.5rem", background: "#f7fafc" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ fontSize: ".7rem", letterSpacing: ".18em", textTransform: "uppercase", color: "#9aabb8", marginBottom: "1.2rem", fontWeight: 600 }}>Other Departments</div>
          <div className="dv-other-depts">
            {departments.filter((d) => d.slug !== dept.slug).slice(0, 12).map((d) => (
              <a key={d.slug} href={`/departments/${d.slug}`} style={{ padding: ".45rem 1.1rem", borderRadius: 100, fontSize: ".72rem", fontWeight: 500, textDecoration: "none", background: "#fff", border: "1px solid #e8edf2", color: "#4a657a", transition: "all 0.2s" }}>{d.name}</a>
            ))}
            <a href="/departments" style={{ padding: ".45rem 1.1rem", borderRadius: 100, fontSize: ".72rem", fontWeight: 700, textDecoration: "none", background: "#0f2235", color: "#fff" }}>All Departments →</a>
          </div>
        </div>
      </section>
    </main>
  );
}