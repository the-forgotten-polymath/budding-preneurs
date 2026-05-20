"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Menu, X } from "lucide-react";

export default function AboutPage() {
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
      
      {/* HEADER */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-white/80 backdrop-blur-md border-b border-slate-100 py-3 shadow-sm" : "bg-transparent py-5"}`}>
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2 group">
            <span className="text-xl font-black tracking-tight text-[#0f172a] font-sans">Buddingpreneurs</span>
          </a>
          <nav className="hidden lg:flex flex-wrap items-center justify-center gap-4 xl:gap-6">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.path}
                className={`text-[11px] xl:text-xs font-semibold transition-colors ${
                  link.name === 'About us' ? "text-[#C9540A] border-b-2 border-[#C9540A] pb-1 font-bold" : "text-[#0f172a] hover:text-slate-500"
                }`}
              >
                {link.name}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-2 sm:gap-4">
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="lg:hidden p-1.5 sm:p-2 text-[#0f172a] hover:bg-slate-100 rounded-full transition-colors z-50 relative">
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
                <a key={link.name} href={link.path} onClick={() => setIsMobileMenuOpen(false)} className={`text-lg font-semibold transition-colors ${link.name === 'About us' ? 'text-[#C9540A]' : 'text-[#0f172a] hover:text-[#C9540A]'}`}>
                  {link.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="flex-grow pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-black text-[#1A1A1A] mb-10 text-center">About Us</h1>
          
          <div className="bg-white rounded-3xl p-8 shadow-xl border border-slate-100 mb-12">
            <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
            <p className="text-slate-600 leading-relaxed mb-6">
              To empower Indian women by providing them with the necessary skills, digital training, and community support to launch their own home-based ventures and achieve economic independence.
            </p>
            <h2 className="text-2xl font-bold mb-4">The Journey</h2>
            <p className="text-slate-600 leading-relaxed">
              Buddingpreneurs was born out of a simple observation: millions of Indian women possess incredible skills—from cooking and crafting to organizing and managing—but lack the platform and knowledge to monetize them. We bridge this gap through practical workshops, mentorship, and a supportive sisterhood that cheers every milestone, no matter how small.
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row items-center gap-8 bg-slate-50 rounded-3xl p-8 border border-slate-200">
            <div className="w-48 h-48 rounded-full overflow-hidden shrink-0 border-4 border-white shadow-lg relative">
              <img src="/images/founder.png" alt="Founder" className="object-cover w-full h-full" />
            </div>
            <div>
              <h3 className="text-2xl font-black text-[#1A1A1A] mb-2">Sasmita Behera</h3>
              <p className="text-[#C9540A] font-bold text-sm mb-4">Founder & Director</p>
              <p className="text-slate-600 leading-relaxed">
                A visionary entrepreneur dedicated to grassroots empowerment. Sasmita believes that when you invest in a woman, you invest in an entire family and community. Her leadership at Buddingpreneurs has guided numerous women from concept to successful execution of their business ideas.
              </p>
            </div>
          </div>
        </div>
      </main>

      <footer className="py-12 bg-[#1C1C1C] text-center text-white mt-auto">
        <p className="text-[#888888] text-sm">© {new Date().getFullYear()} Buddingpreneurs. All rights reserved.</p>
      </footer>
    </div>
  );
}
