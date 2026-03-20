// app/departments/[slug]/page.tsx
// Fixed for Next.js 15 — params must be awaited (it's now a Promise)

import { notFound } from "next/navigation";
import { departments, getDepartmentBySlug, type Department } from "@/data/departments";
import type { Metadata } from "next";

// ─── Types ─────────────────────────────────────────────────────────────────────
type Props = {
  params: Promise<{ slug: string }>;  // ← Next.js 15: params is a Promise
};

// ─── SEO Metadata ──────────────────────────────────────────────────────────────
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;  // ← must await
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

// ─── Static params (all 20 slugs pre-rendered at build time) ──────────────────
export function generateStaticParams() {
  return departments.map((d) => ({ slug: d.slug }));
}

// ─── Page ──────────────────────────────────────────────────────────────────────
export default async function DepartmentPage({ params }: Props) {
  const { slug } = await params;  // ← must await
  const dept = getDepartmentBySlug(slug);
  if (!dept) notFound();
  return <DepartmentView dept={dept} />;
}

// ─── Helper: derive light background tint from accent color ───────────────────
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

// ─── View Component ────────────────────────────────────────────────────────────
function DepartmentView({ dept }: { dept: Department }) {
  const A = dept.color;
  const AL = hexToLightBg(A);

  return (
    <main style={{ fontFamily: "'DM Sans', sans-serif", background: "#f7fafc" }}>

      {/* ── Breadcrumb ── */}
      <nav style={{ background: "#fff", borderBottom: "1px solid #e8edf2", padding: ".6rem 2.5rem", fontSize: ".7rem", color: "#9aabb8", display: "flex", alignItems: "center", gap: ".5rem" }}>
        <a href="/" style={{ color: "#1565C0" }}>Home</a>
        <span>›</span>
        <a href="/departments" style={{ color: "#1565C0" }}>Departments</a>
        <span>›</span>
        <span style={{ color: "#4a657a", fontWeight: 500 }}>{dept.name}</span>
      </nav>

      {/* ── Hero ── */}
      <section style={{ background: "linear-gradient(135deg,#071420 0%,#0f1e30 60%,#060e18 100%)", minHeight: "72vh", position: "relative", overflow: "hidden", display: "flex", alignItems: "center" }}>
        {/* Ambient glow */}
        <div style={{ position: "absolute", right: "8%", top: "40%", transform: "translateY(-50%)", width: "40vw", height: "40vw", borderRadius: "50%", background: `radial-gradient(circle,${A}22 0%,transparent 65%)`, pointerEvents: "none" }} />
        {/* Right photo */}
        <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: "44%", overflow: "hidden" }}>
          <img src={dept.heroImg} alt={dept.name} style={{ width: "100%", height: "100%", objectFit: "cover", opacity: .65 }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg,#071420 0%,transparent 50%)" }} />
        </div>

        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "5rem 2.5rem", width: "100%", position: "relative", zIndex: 1 }}>
          <div style={{ maxWidth: 580 }}>
            {/* Badge */}
            <div style={{ display: "inline-flex", alignItems: "center", gap: ".6rem", background: `${A}22`, border: `1px solid ${A}45`, borderRadius: 100, padding: ".3rem 1rem", marginBottom: "1.5rem", fontSize: ".62rem", letterSpacing: ".2em", textTransform: "uppercase" as const, color: A, fontWeight: 600 }}>
              <span style={{ width: 5, height: 5, borderRadius: "50%", background: A, display: "inline-block" }} />
              {dept.badge}
            </div>
            {/* Title */}
            <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(3rem,5.5vw,5.5rem)", fontWeight: 700, color: "#fff", lineHeight: .92, marginBottom: "1.2rem", letterSpacing: "-.01em" }}>
              {dept.name}<br />
              <em style={{ color: A, fontWeight: 400, fontSize: ".65em" }}>{dept.tagline}</em>
            </h1>
            <div style={{ width: 56, height: 3, background: A, borderRadius: 2, marginBottom: "1.5rem" }} />
            {/* Description */}
            <p style={{ fontSize: "1rem", color: "rgba(255,255,255,.62)", lineHeight: 1.8, maxWidth: 480, marginBottom: "2.5rem", fontWeight: 300 }}>
              {dept.desc}
            </p>
            {/* CTAs */}
            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" as const }}>
              <a href="#book" style={{ display: "inline-flex", alignItems: "center", gap: ".5rem", padding: ".9rem 2rem", borderRadius: 4, fontSize: ".82rem", fontWeight: 700, textDecoration: "none", background: A, color: "#fff" }}>
                Book Appointment →
              </a>
              <a href="tel:04046460000" style={{ display: "inline-flex", alignItems: "center", gap: ".5rem", padding: ".9rem 2rem", borderRadius: 4, fontSize: ".82rem", fontWeight: 500, color: "rgba(255,255,255,.7)", border: "1.5px solid rgba(255,255,255,.2)", textDecoration: "none" }}>
                📞 040 4646 0000
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats Bar ── */}
      <div style={{ background: A, display: "grid", gridTemplateColumns: `repeat(${dept.stats.length},1fr)` }}>
        {dept.stats.map(([v, l], i) => (
          <div key={i} style={{ padding: "1.4rem 1.5rem", borderRight: "1px solid rgba(255,255,255,.15)", textAlign: "center" as const }}>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "2rem", fontWeight: 700, color: "#fff", lineHeight: 1 }}>{v}</div>
            <div style={{ fontSize: ".58rem", color: "rgba(255,255,255,.6)", letterSpacing: ".1em", textTransform: "uppercase" as const, marginTop: ".3rem" }}>{l}</div>
          </div>
        ))}
      </div>

      {/* ── Procedures & Treatments ── */}
      <section style={{ padding: "5.5rem 2.5rem", background: AL }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", display: "flex", gap: "4rem", alignItems: "flex-start", flexWrap: "wrap" as const }}>
          <div style={{ flex: "1 1 480px" }}>
            <div style={{ fontSize: ".62rem", letterSpacing: ".22em", textTransform: "uppercase" as const, color: A, fontWeight: 600, marginBottom: ".7rem" }}>
              Clinical Services
            </div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.8rem,3vw,2.8rem)", fontWeight: 600, color: "#0f2235", marginBottom: "2rem" }}>
              Procedures & Treatments
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              {dept.procedureList.map((p) => (
                <div key={p} style={{ display: "flex", alignItems: "center", gap: ".7rem", padding: ".9rem 1.2rem", background: "#fff", border: "1px solid #e8edf2", borderRadius: 8, borderLeft: `3px solid ${A}` }}>
                  <div style={{ width: 6, height: 6, borderRadius: "50%", background: A, flexShrink: 0 }} />
                  <span style={{ fontSize: ".82rem", color: "#2a3f52", fontWeight: 500 }}>{p}</span>
                </div>
              ))}
            </div>
          </div>
          <div style={{ flex: "0 0 300px" }}>
            <div style={{ borderRadius: 12, overflow: "hidden", height: 380, boxShadow: `0 20px 48px ${A}22` }}>
              <img
                src={dept.heroImg2 ?? dept.heroImg}
                alt={dept.name}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Specialist Doctors ── */}
      <section style={{ padding: "5.5rem 2.5rem", background: "#fff" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ fontSize: ".62rem", letterSpacing: ".22em", textTransform: "uppercase" as const, color: A, fontWeight: 600, marginBottom: ".7rem" }}>
            Our Team
          </div>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.8rem,3.5vw,3rem)", fontWeight: 600, color: "#0f2235", marginBottom: "2.5rem" }}>
            Specialist Doctors
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: `repeat(${Math.min(dept.doctors.length, 3)},1fr)`, gap: 24 }}>
            {dept.doctors.map((doc) => (
              <div key={doc.name} style={{ background: "#fff", border: "1px solid #e8edf2", borderRadius: 12, overflow: "hidden", boxShadow: "0 2px 12px rgba(0,0,0,.05)" }}>
                {/* Photo */}
                <div style={{ height: 220, overflow: "hidden", position: "relative" }}>
                  <img
                    src={doc.img}
                    alt={doc.name}
                    style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top" }}
                  />
                  <div style={{ position: "absolute", inset: 0, background: `linear-gradient(transparent 55%,${A}cc)`, pointerEvents: "none" }} />
                  <div style={{ position: "absolute", bottom: 10, left: 12, fontSize: ".6rem", color: "rgba(255,255,255,.9)", letterSpacing: ".12em", textTransform: "uppercase" as const, fontWeight: 600 }}>
                    {doc.dept}
                  </div>
                </div>
                {/* Info */}
                <div style={{ padding: "1.2rem 1.4rem" }}>
                  <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.05rem", fontWeight: 600, color: "#1a2b3c", marginBottom: ".25rem" }}>
                    {doc.name}
                  </div>
                  <div style={{ fontSize: ".7rem", fontWeight: 600, color: A, marginBottom: ".4rem" }}>{doc.role}</div>
                  <div style={{ fontSize: ".68rem", color: "#6b7f93", marginBottom: ".8rem", lineHeight: 1.5 }}>{doc.qual}</div>
                  <div style={{ display: "flex", justifyContent: "space-between", paddingTop: ".7rem", borderTop: "1px solid #eef2f6", fontSize: ".62rem" }}>
                    <span style={{ color: "#9aabb8" }}>{doc.exp} experience</span>
                    <span style={{ background: `${A}18`, color: A, padding: ".2rem .7rem", borderRadius: 100, fontWeight: 600 }}>{doc.avail}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Book Appointment ── */}
      <section id="book" style={{ background: "#0f2235", padding: "4.5rem 2.5rem", textAlign: "center" as const }}>
        <div style={{ maxWidth: 580, margin: "0 auto" }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.8rem,3vw,2.8rem)", fontWeight: 600, color: "#fff", marginBottom: "1rem" }}>
            Ready to consult our {dept.name} specialists?
          </h2>
          <p style={{ color: "rgba(255,255,255,.5)", fontSize: ".95rem", marginBottom: "2rem", lineHeight: 1.7 }}>
            Call <strong style={{ color: "#fff" }}>040 4646 0000</strong> or book online.
            Mon–Sat, 8 AM–8 PM.
            <br />Emergency: <strong style={{ color: "#fff" }}>9609108108</strong>
          </p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" as const }}>
            <a href="tel:04046460000" style={{ background: A, color: "#fff", padding: ".85rem 2rem", borderRadius: 4, fontSize: ".82rem", fontWeight: 700, textDecoration: "none" }}>
              📞 Call Now
            </a>
            <a href="#" style={{ border: "2px solid rgba(255,255,255,.25)", color: "#fff", padding: ".85rem 2rem", borderRadius: 4, fontSize: ".82rem", fontWeight: 500, textDecoration: "none" }}>
              Book Online →
            </a>
          </div>
        </div>
      </section>

      {/* ── Other Departments quick-nav ── */}
      <section style={{ padding: "3rem 2.5rem", background: "#f7fafc" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ fontSize: ".7rem", letterSpacing: ".18em", textTransform: "uppercase" as const, color: "#9aabb8", marginBottom: "1.2rem" }}>
            Other Departments
          </div>
          <div style={{ display: "flex", flexWrap: "wrap" as const, gap: 8 }}>
            {departments
              .filter((d) => d.slug !== dept.slug)
              .slice(0, 12)
              .map((d) => (
                <a
                  key={d.slug}
                  href={`/departments/${d.slug}`}
                  style={{ padding: ".45rem 1rem", borderRadius: 100, fontSize: ".72rem", fontWeight: 500, textDecoration: "none", background: "#fff", border: "1px solid #e8edf2", color: "#4a657a" }}
                >
                  {d.name}
                </a>
              ))}
            <a
              href="/departments"
              style={{ padding: ".45rem 1rem", borderRadius: 100, fontSize: ".72rem", fontWeight: 600, textDecoration: "none", background: "#0f2235", color: "#fff" }}
            >
              All Departments →
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
