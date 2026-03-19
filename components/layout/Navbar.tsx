"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

/*
  SRIKARA PALETTE
  Magenta   #C0145C
  Navy      #1C2B4A
  Blue-gray #4A6FA5
  Off-white #F8F6F9
*/

const NAV_LINKS = [
  {
    label: "Hospitals",
    href: "/hospitals",
    sub: [
      { label: "All Hospitals", href: "/hospitals" },
      { label: "Hyderabad",     href: "/hospitals?city=hyderabad" },
      { label: "Vijayawada",    href: "/hospitals?city=vijayawada" },
      { label: "Vizag",         href: "/hospitals?city=vizag" },
    ],
  },
  {
    label: "Departments",
    href: "/departments",
    sub: [
      { label: "Cardiology",   href: "/departments/cardiology" },
      { label: "Neurology",    href: "/departments/neurology" },
      { label: "Orthopaedics", href: "/departments/orthopaedics" },
      { label: "Oncology",     href: "/departments/oncology" },
      { label: "View All →",   href: "/departments" },
    ],
  },
  { label: "Doctors",  href: "/doctors",  sub: null },
  { label: "About Us", href: "/about",    sub: null },
];

export default function Navbar() {
  const [scrolled,     setScrolled]     = useState(false);
  const [mobileOpen,   setMobileOpen]   = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* lock body scroll when mobile drawer open */
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const css = `
    .sk-nav-link {
      display: flex;
      align-items: center;
      gap: 5px;
      padding: 8px 18px;
      border-radius: 10px;
      font-size: 14px;
      font-weight: 600;
      color: rgba(255,255,255,0.88);
      text-decoration: none;
      transition: background 0.2s, color 0.2s;
      white-space: nowrap;
      letter-spacing: 0.02em;
    }
    .sk-nav-link:hover {
      background: rgba(255,255,255,0.10);
      color: #fff;
    }
    .sk-dropdown {
      position: absolute;
      top: calc(100% + 10px);
      left: 0;
      min-width: 210px;
      border-radius: 18px;
      overflow: hidden;
      border: 1px solid rgba(192,20,92,0.22);
      background: #1C2B4A;
      box-shadow: 0 16px 48px rgba(0,0,0,0.38);
      padding: 8px;
      z-index: 100;
      animation: skDropIn 0.18s ease;
    }
    @keyframes skDropIn {
      from { opacity: 0; transform: translateY(-6px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    .sk-dropdown a {
      display: block;
      padding: 11px 16px;
      border-radius: 10px;
      font-size: 13px;
      font-weight: 500;
      color: rgba(255,255,255,0.72);
      text-decoration: none;
      transition: background 0.18s, color 0.18s;
    }
    .sk-dropdown a:hover {
      background: rgba(255,255,255,0.10);
      color: #f472b6;
    }
    .sk-chevron {
      width: 11px;
      height: 11px;
      stroke: #C0145C;
      transition: transform 0.22s;
      flex-shrink: 0;
    }
    .sk-chevron.open { transform: rotate(180deg); }

    .sk-emergency-pill {
      display: flex;
      align-items: center;
      gap: 7px;
      padding: 8px 16px;
      border-radius: 50px;
      border: 1px solid rgba(192,20,92,0.32);
      background: rgba(192,20,92,0.10);
      color: #f472b6;
      font-size: 11px;
      font-weight: 800;
      letter-spacing: 0.09em;
      text-transform: uppercase;
      text-decoration: none;
      white-space: nowrap;
      transition: background 0.22s, border-color 0.22s;
    }
    .sk-emergency-pill:hover {
      background: rgba(192,20,92,0.18);
      border-color: rgba(192,20,92,0.55);
    }
    .sk-pulse-dot {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: #C0145C;
      flex-shrink: 0;
      animation: skPulse 1.6s infinite;
    }
    @keyframes skPulse {
      0%,100% { transform: scale(1);   opacity: 1;   }
      50%      { transform: scale(1.5); opacity: 0.4; }
    }
    .sk-book-btn {
      display: inline-flex;
      align-items: center;
      padding: 11px 24px;
      border-radius: 14px;
      background: linear-gradient(135deg, #C0145C, #e8457e);
      color: #fff;
      font-size: 13px;
      font-weight: 800;
      letter-spacing: 0.07em;
      text-transform: uppercase;
      text-decoration: none;
      border: none;
      cursor: pointer;
      box-shadow: 0 6px 20px rgba(192,20,92,0.38);
      transition: transform 0.22s, box-shadow 0.22s;
      white-space: nowrap;
    }
    .sk-book-btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 10px 28px rgba(192,20,92,0.50);
    }
    .sk-book-btn:active { transform: translateY(0); }

    .sk-ham-bar {
      display: block;
      width: 22px;
      height: 2px;
      border-radius: 2px;
      background: #fff;
      transition: transform 0.28s ease, opacity 0.28s ease;
    }

    .sk-drawer {
      position: fixed;
      top: 0;
      right: 0;
      height: 100%;
      width: 300px;
      background: #1C2B4A;
      border-left: 1px solid rgba(192,20,92,0.18);
      box-shadow: -10px 0 48px rgba(0,0,0,0.38);
      overflow-y: auto;
      z-index: 60;
      transition: transform 0.32s cubic-bezier(0.4,0,0.2,1);
    }
    .sk-drawer.closed { transform: translateX(100%); }
    .sk-drawer.open   { transform: translateX(0);    }

    .sk-drawer-overlay {
      position: fixed;
      inset: 0;
      z-index: 55;
      background: rgba(11,21,42,0.62);
      backdrop-filter: blur(5px);
      transition: opacity 0.3s;
    }
    .sk-drawer-overlay.hidden-ov { opacity: 0; pointer-events: none; }
    .sk-drawer-overlay.show-ov   { opacity: 1; pointer-events: auto; }

    .sk-mobile-link {
      display: block;
      padding: 14px 16px;
      border-radius: 14px;
      font-size: 15px;
      font-weight: 700;
      color: rgba(255,255,255,0.88);
      text-decoration: none;
      transition: background 0.18s;
    }
    .sk-mobile-link:hover { background: rgba(255,255,255,0.08); }

    .sk-mobile-sub {
      display: block;
      padding: 10px 16px;
      border-radius: 10px;
      font-size: 13px;
      font-weight: 500;
      color: rgba(255,255,255,0.50);
      text-decoration: none;
      transition: background 0.18s, color 0.18s;
    }
    .sk-mobile-sub:hover { background: rgba(255,255,255,0.06); color: rgba(255,255,255,0.8); }

    @media (max-width: 1024px) {
      .sk-desktop-nav  { display: none !important; }
      .sk-desktop-ctas { display: none !important; }
      .sk-hamburger    { display: flex !important; }
    }
    @media (min-width: 1025px) {
      .sk-hamburger { display: none !important; }
    }
      /* ✅ MOBILE OPTIMIZATION */
@media (max-width:768px){

  header{
    height:60px !important;
  }

  .sk-drawer{
    width:85% !important;
    max-width:320px;
  }

  .sk-nav-link{
    font-size:13px;
    padding:6px 12px;
  }

}
  `;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: css }} />

      {/* ════════════════════════════════════════
          HEADER
          — transparent on hero, solid navy on scroll
      ════════════════════════════════════════ */}
      <header
        style={{
          position:             "fixed",
          top:                  0,
          left:                 0,
          right:                0,
          zIndex:               50,
          height:               72,
          display:              "flex",
          alignItems:           "center",
          /* ↓ KEY CHANGE: transparent when not scrolled */
          background:           scrolled ? "rgba(28,43,74,0.97)" : "transparent",
          backdropFilter:       scrolled ? "blur(18px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(18px)" : "none",
          borderBottom:         scrolled ? "1px solid rgba(192,20,92,0.22)" : "none",
          boxShadow:            scrolled ? "0 4px 32px rgba(0,0,0,0.32)" : "none",
          transition:           "background 0.45s ease, backdrop-filter 0.45s ease, box-shadow 0.45s ease, border-color 0.45s ease",
        }}
      >
        <div
          style={{
            maxWidth:       1380,
            width:          "100%",
            margin:         "0 auto",
            padding:        "0 16px",
            display:        "flex",
            alignItems:     "center",
            justifyContent: "space-between",
            gap:            16,
          }}
        >
          {/* ── LOGO ── */}
          <Link
            href="/"
            style={{ display: "flex", alignItems: "center", flexShrink: 0, textDecoration: "none" }}
          >
            <div
              style={{
                background:     "#ffffff",
                borderRadius:   12,
                padding:        "7px 14px",
                boxShadow:      "0 2px 14px rgba(0,0,0,0.18)",
                display:        "flex",
                alignItems:     "center",
                justifyContent: "center",
              }}
            >
              <Image
                src="/srikara-logo.png"
                alt="Srikara Hospitals"
                width={148}
                height={38}
                style={{ height: "auto", width: "auto", objectFit: "contain", display: "block",maxHeight:"34px" }}
                priority
              />
            </div>
          </Link>

          {/* ── DESKTOP NAV ── */}
          <nav
            className="sk-desktop-nav"
            style={{
              display:        "flex",
              alignItems:     "center",
              gap:            2,
              flex:           1,
              justifyContent: "center",
            }}
          >
            {NAV_LINKS.map((link) => (
              <div
                key={link.label}
                style={{ position: "relative" }}
                onMouseEnter={() => link.sub && setOpenDropdown(link.label)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <Link href={link.href} className="sk-nav-link">
                  {link.label}
                  {link.sub && (
                    <svg
                      className={`sk-chevron ${openDropdown === link.label ? "open" : ""}`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2.8}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  )}
                </Link>

                {/* Dropdown */}
                {link.sub && openDropdown === link.label && (
                  <div className="sk-dropdown">
                    {link.sub.map((item) => (
                      <Link key={item.label} href={item.href}>
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* ── DESKTOP RIGHT CTAs ── */}
          <div
            className="sk-desktop-ctas"
            style={{ display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}
          >
            <a href="tel:1800-123-4567" className="sk-emergency-pill">
              <span className="sk-pulse-dot" />
              Emergency: 1800-123-4567
            </a>
            <Link href="/doctors" className="sk-book-btn">
              Book Appointment
            </Link>
          </div>

          {/* ── MOBILE HAMBURGER ── */}
          <button
            className="sk-hamburger"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
            style={{
              flexDirection:  "column",
              gap:            5,
              padding:        "10px 12px",
              borderRadius:   10,
              background:     "rgba(255,255,255,0.06)",
              border:         "1px solid rgba(255,255,255,0.1)",
              cursor:         "pointer",
            }}
          >
            <span
              className="sk-ham-bar"
              style={{
                transform: mobileOpen ? "rotate(45deg) translate(5px,5px)" : "none",
              }}
            />
            <span
              className="sk-ham-bar"
              style={{ opacity: mobileOpen ? 0 : 1 }}
            />
            <span
              className="sk-ham-bar"
              style={{
                transform: mobileOpen ? "rotate(-45deg) translate(5px,-5px)" : "none",
              }}
            />
          </button>
        </div>
      </header>

      {/* ════════════════════════════════════════
          MOBILE OVERLAY
      ════════════════════════════════════════ */}
      <div
        className={`sk-drawer-overlay ${mobileOpen ? "show-ov" : "hidden-ov"}`}
        onClick={() => setMobileOpen(false)}
      />

      {/* ════════════════════════════════════════
          MOBILE DRAWER
      ════════════════════════════════════════ */}
      <div className={`sk-drawer ${mobileOpen ? "open" : "closed"}`}>

        {/* Drawer header */}
        <div
          style={{
            display:        "flex",
            alignItems:     "center",
            justifyContent: "space-between",
            padding:        "20px 20px 16px",
            borderBottom:   "1px solid rgba(192,20,92,0.16)",
          }}
        >
          <div
            style={{
              background:   "#fff",
              borderRadius: 10,
              padding:      "6px 14px",
              display:      "inline-flex",
              alignItems:   "center",
            }}
          >
            <Image
              src="/srikara-logo.png"
              alt="Srikara"
              width={110}
              height={28}
              style={{ height: 28, width: "auto", objectFit: "contain", display: "block" }}
            />
          </div>
          <button
            onClick={() => setMobileOpen(false)}
            aria-label="Close menu"
            style={{
              width:          36,
              height:         36,
              borderRadius:   "50%",
              background:     "rgba(255,255,255,0.07)",
              border:         "1px solid rgba(255,255,255,0.1)",
              color:          "rgba(255,255,255,0.65)",
              fontSize:       14,
              cursor:         "pointer",
              display:        "flex",
              alignItems:     "center",
              justifyContent: "center",
              transition:     "background 0.2s",
            }}
          >
            ✕
          </button>
        </div>

        {/* Nav links */}
        <div
          style={{
            padding:        "14px 12px",
            display:        "flex",
            flexDirection:  "column",
            gap:            2,
          }}
        >
          {NAV_LINKS.map((link) => (
            <div key={link.label}>
              <Link
                href={link.href}
                className="sk-mobile-link"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
              {link.sub && (
                <div
                  style={{
                    marginLeft:     16,
                    paddingLeft:    14,
                    borderLeft:     "1px solid rgba(192,20,92,0.2)",
                    marginBottom:   4,
                    display:        "flex",
                    flexDirection:  "column",
                    gap:            1,
                  }}
                >
                  {link.sub.map((sub) => (
                    <Link
                      key={sub.label}
                      href={sub.href}
                      className="sk-mobile-sub"
                      onClick={() => setMobileOpen(false)}
                    >
                      {sub.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Mobile CTAs */}
        <div
          style={{
            padding:        "16px 16px 28px",
            borderTop:      "1px solid rgba(192,20,92,0.16)",
            display:        "flex",
            flexDirection:  "column",
            gap:            12,
          }}
        >
          <a
            href="tel:1800-123-4567"
            style={{
              display:        "flex",
              alignItems:     "center",
              justifyContent: "center",
              gap:            8,
              padding:        "14px",
              borderRadius:   14,
              border:         "1px solid rgba(192,20,92,0.30)",
              background:     "rgba(192,20,92,0.08)",
              color:          "#f472b6",
              fontSize:       13,
              fontWeight:     800,
              letterSpacing:  "0.08em",
              textTransform:  "uppercase",
              textDecoration: "none",
            }}
          >
            <span className="sk-pulse-dot" />
            Emergency: 1800-123-4567
          </a>
          <Link
            href="/doctors"
            className="sk-book-btn"
            onClick={() => setMobileOpen(false)}
            style={{ justifyContent: "center" }}
          >
            Book Appointment
          </Link>
        </div>
      </div>
    </>
  );
}
