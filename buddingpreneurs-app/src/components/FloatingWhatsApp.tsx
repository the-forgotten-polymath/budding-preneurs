"use client";

import React from "react";
import { siteMetadata } from "../data/siteData";

export default function FloatingWhatsApp() {
  return (
    <a
      href={siteMetadata.socialLinks.whatsappDirect}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-3 group"
      aria-label="Contact us on WhatsApp"
    >
      {/* Real-looking interactive WhatsApp tooltip */}
      <div className="bg-white text-slate-800 text-[11px] font-extrabold px-3.5 py-2 rounded-xl shadow-xl border border-slate-100/80 opacity-0 -translate-x-3 scale-95 pointer-events-none group-hover:opacity-100 group-hover:translate-x-0 group-hover:scale-100 transition-all duration-300 whitespace-nowrap hidden sm:block">
        Need help? Chat with us!
      </div>

      <div className="relative bg-[#25D366] text-white p-3.5 rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.15)] shadow-emerald-500/20 hover:bg-[#20ba5a] transition-all duration-300 hover:scale-110 flex items-center justify-center">
        {/* Pulse effect */}
        <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-35 animate-ping group-hover:animate-none" />
        
        {/* Official WhatsApp SVG Icon */}
        <svg viewBox="0 0 448 512" className="w-6 h-6 text-white relative z-10 fill-current">
          <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L32 503l141.1-37c32.7 17.8 69.4 27.2 107.1 27.2 122.4 0 222-99.6 222-222 0-59.3-23-115.1-65-157.1zM223.9 453c-33.2 0-65.7-8.9-94-25.7l-6.7-4-83.9 22 22.4-81.8-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 54 81.2 54 130.4 0 101.7-82.8 184.5-184.6 184.5zm100.8-137.5c-5.5-2.8-32.6-16.1-37.7-17.9-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.6-13.4 37.2-26.3 4.6-13 4.6-24.1 3.2-26.3-1.4-2.2-5.1-3.5-10.6-6.3z"/>
        </svg>
      </div>
    </a>
  );
}
