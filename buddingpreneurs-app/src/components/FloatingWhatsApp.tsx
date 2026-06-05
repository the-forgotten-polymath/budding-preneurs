"use client";

import React from "react";
import { siteMetadata } from "../data/siteData";

export default function FloatingWhatsApp() {
  return (
    <a
      href={siteMetadata.socialLinks.whatsappDirect}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:bg-[#20ba5a] transition-all duration-300 hover:scale-110 flex items-center justify-center group"
      aria-label="Contact us on WhatsApp"
    >
      {/* Pulse effect */}
      <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-40 animate-ping group-hover:animate-none" />
      
      {/* WhatsApp SVG Icon */}
      <svg className="w-6 h-6 relative z-10" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path fillRule="evenodd" d="M12.004 2C6.48 2 2 6.48 2 12.004c0 1.944.557 3.763 1.528 5.297l-1.077 3.931 4.027-1.056c1.48.81 3.175 1.277 4.981 1.277 5.523 0 10.003-4.48 10.003-10.003C21.562 6.48 17.08 2 12.004 2zm5.753 14.225c-.244.688-1.218 1.25-1.684 1.328-.465.078-.97.108-3.05-.733-2.434-.984-3.993-3.463-4.115-3.628-.122-.165-1.01-1.343-1.01-2.56 0-1.219.643-1.819.871-2.072.228-.253.5-.316.666-.316.166 0 .332.003.477.01.155.006.363-.057.57.447.243.593.83 2.031.902 2.178.072.146.12.316.023.51-.097.193-.146.313-.292.484-.146.17-.308.38-.44.51-.15.148-.306.31-.132.61.174.3.774 1.278 1.66 2.069.871.777 1.583 1.03 1.905 1.164.322.133.51.11.7-.11.19-.22.812-.944 1.03-1.265.218-.323.435-.27.732-.16.297.11 1.884.887 2.207 1.047.322.16.536.24.614.373.078.133.078.769-.166 1.457z" clipRule="evenodd" />
      </svg>
    </a>
  );
}
