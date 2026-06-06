"use client";

import NavAuth from "@/components/NavAuth";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Menu, X } from "lucide-react";
import Footer from "@/components/Footer";
export default function DisclaimerPage() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Workshops', path: '/workshops' },
    { name: 'Community', path: '/community' },
    { name: 'Blog', path: '/blog' },
    { name: 'Our Programs', path: '/programs' },
    { name: 'Business Plan', path: '/business-plan' },
    { name: 'Disclaimer', path: '/disclaimer' },
    { name: 'About us', path: '/about' },
    { name: 'Contact', path: '/contact' }
  ];

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-slate-800 flex flex-col relative overflow-hidden select-none">
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-white/80 backdrop-blur-md border-b border-slate-100 py-3 shadow-sm" : "bg-transparent py-5"}`}>
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-full overflow-hidden border border-slate-200 bg-white relative flex-shrink-0">
              <img 
                src="/brand_logo.png" 
                alt="Buddingpreneurs Brand Logo" 
                className="object-cover w-full h-full"
              />
            </div>
            <span className="text-xl font-black tracking-tight text-[#0f172a] font-sans">
              Buddingpreneurs
            </span>
          </a>
          <nav className="hidden lg:flex flex-wrap items-center justify-center gap-4 xl:gap-6">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.path}
                className={`text-[11px] xl:text-xs font-semibold transition-colors ${
                  link.name === 'Disclaimer' ? "text-[#C9540A] border-b-2 border-[#C9540A] pb-1 font-bold" : "text-[#1A1A1A] hover:text-[#C9540A]"
                }`}
              >
                {link.name}
              </a>
            ))}
          <a href="/directory" className="text-[11px] xl:text-xs font-semibold text-[#1A1A1A] hover:text-[#C9540A] transition-colors">Directory</a>
          </nav>
          <div className="flex items-center gap-2 sm:gap-4">
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="lg:hidden p-1.5 sm:p-2 text-[#1A1A1A] hover:bg-gray-200 rounded-full transition-colors z-50 relative">
              {isMobileMenuOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-white/95 backdrop-blur-md pt-24 px-6 pb-6 overflow-y-auto lg:hidden flex flex-col"
          >
            <div className="flex flex-col gap-6 items-center text-center mt-8">
              {navLinks.map((link) => (
                <a key={link.name} href={link.path} onClick={() => setIsMobileMenuOpen(false)} className={`text-lg font-semibold transition-colors ${link.name === 'Disclaimer' ? 'text-[#C9540A]' : 'text-[#1A1A1A] hover:text-[#C9540A]'}`}>
                  {link.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="flex-grow pt-32 pb-20 px-6">
        <div className="max-w-3xl mx-auto bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-slate-100">
          <h1 className="text-4xl font-black text-[#1A1A1A] mb-8">Disclaimer</h1>
          
          <div className="space-y-6 text-slate-600 leading-relaxed">
            <p>
              The information provided by Buddingpreneurs on this website is for general informational and educational purposes only. All information on the site is provided in good faith, however, we make no representation or warranty of any kind, express or implied, regarding the accuracy, adequacy, validity, reliability, availability, or completeness of any information.
            </p>
            <p>
              Under no circumstance shall we have any liability to you for any loss or damage of any kind incurred as a result of the use of the site or reliance on any information provided on the site. Your use of the site and your reliance on any information is solely at your own risk.
            </p>
            <h2 className="text-xl font-bold text-[#1A1A1A] mt-8 mb-4">Professional Disclaimer</h2>
            <p>
              The site cannot and does not contain business, legal, or financial advice. The business information is provided for general informational and educational purposes only and is not a substitute for professional advice.
            </p>
            <h2 className="text-xl font-bold text-[#1A1A1A] mt-8 mb-4">External Links Disclaimer</h2>
            <p>
              The site may contain links to other websites or content belonging to or originating from third parties. Such external links are not investigated, monitored, or checked for accuracy, adequacy, validity, reliability, availability, or completeness by us.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
