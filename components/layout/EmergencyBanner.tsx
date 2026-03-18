"use client";
import { useState } from "react";
import { X, Phone } from "lucide-react";

export default function EmergencyBanner() {
  const [visible, setVisible] = useState(true);
  if (!visible) return null;
  return (
    <div className="relative z-50 flex items-center justify-between px-4 py-2 text-xs sm:text-sm"
      style={{ background: "#1e3a5f", color: "#fff" }}>
      <div className="flex items-center gap-3 flex-1 justify-center flex-wrap">
        <span className="w-2 h-2 rounded-full animate-pulse flex-shrink-0" style={{ background: "#e91e8c" }} />
        <span className="font-bold tracking-widest uppercase text-white/90">24/7 Emergency</span>
        <span className="text-white/30 hidden sm:inline">|</span>
        <a href="tel:9609108108" className="flex items-center gap-1 font-bold hover:underline" style={{ color: "#fce4ec" }}>
          <Phone size={12} /> Ambulance: 9609108108
        </a>
        <span className="text-white/30 hidden md:inline">|</span>
        <span className="hidden md:inline text-white/60">9 Hospitals · Hyderabad &amp; Andhra Pradesh</span>
      </div>
      <button onClick={() => setVisible(false)} className="ml-3 text-white/40 hover:text-white flex-shrink-0">
        <X size={14} />
      </button>
    </div>
  );
}