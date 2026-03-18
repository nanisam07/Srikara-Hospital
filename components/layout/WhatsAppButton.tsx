"use client";
import { useState } from "react";
import { X, Phone } from "lucide-react";

export default function EmergencyBanner() {
  const [visible, setVisible] = useState(true);
  if (!visible) return null;

  return (
    <div className="bg-red-700 text-white text-xs sm:text-sm py-2 px-4 flex items-center justify-between z-50 relative">
      <div className="flex items-center gap-2 flex-1 justify-center flex-wrap">
        <span className="inline-block w-2 h-2 bg-white rounded-full animate-pulse flex-shrink-0" />
        <span className="font-bold tracking-widest uppercase">24/7 Emergency</span>
        <span className="text-red-300 hidden sm:inline">|</span>
        <a href="tel:9609108108" className="flex items-center gap-1 font-bold hover:underline">
          <Phone size={12} />
          Ambulance: 9609108108
        </a>
        <span className="text-red-300 hidden md:inline">|</span>
        <span className="hidden md:inline text-red-200">All 9 Hospitals across Hyderabad &amp; AP</span>
      </div>
      <button onClick={() => setVisible(false)} className="ml-3 text-red-300 hover:text-white flex-shrink-0">
        <X size={14} />
      </button>
    </div>
  );
}