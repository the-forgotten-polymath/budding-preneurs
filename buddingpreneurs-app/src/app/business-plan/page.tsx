"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Menu, X, CheckCircle2 } from "lucide-react";
import { siteMetadata } from "../../data/siteData";

export default function BusinessPlanPage() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
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
        {/* Simplified Header for brevity, same as others */}
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2 group">
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
                  link.name === 'Business Plan' 
                    ? "text-[#C9540A] border-b-2 border-[#C9540A] pb-1 font-bold" 
                    : "text-[#0f172a] hover:text-slate-500"
                }`}
              >
                {link.name}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-2 sm:gap-4">
            <a href="/contact" className="px-4 py-2 sm:px-5 sm:py-2.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 bg-[#0f172a] hover:bg-slate-800 text-white shadow-sm">
              <span>Join for Free</span>
              <ArrowRight className="w-3 h-3" />
            </a>
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="lg:hidden p-1.5 sm:p-2 text-[#0f172a] hover:bg-slate-100 rounded-full transition-colors z-50 relative">
              {isMobileMenuOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
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
                <a key={link.name} href={link.path} onClick={() => setIsMobileMenuOpen(false)} className={`text-lg font-semibold transition-colors ${link.name === 'Business Plan' ? 'text-[#C9540A]' : 'text-[#0f172a] hover:text-[#C9540A]'}`}>
                  {link.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="flex-grow pt-32 pb-20 px-6 max-w-5xl mx-auto w-full">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-black text-[#1A1A1A] mb-4">Business Plan</h1>
          <p className="text-[#C9540A] font-bold tracking-widest uppercase text-sm">Ideal Membership Structure</p>
        </div>

        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-slate-100">
          <h2 className="text-3xl font-black mb-8 border-b pb-4">Membership Tiers</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
              <h3 className="text-xl font-bold text-[#1A1A1A] mb-2">Basic</h3>
              <p className="text-slate-500 mb-6 text-sm">For those just starting out.</p>
              <ul className="space-y-3 mb-8">
                <li className="flex gap-2 text-sm"><CheckCircle2 className="w-5 h-5 text-[#C9540A] shrink-0"/> Access to basic workshops</li>
                <li className="flex gap-2 text-sm"><CheckCircle2 className="w-5 h-5 text-[#C9540A] shrink-0"/> Community forum access</li>
                <li className="flex gap-2 text-sm"><CheckCircle2 className="w-5 h-5 text-[#C9540A] shrink-0"/> Monthly newsletter</li>
              </ul>
              <button className="w-full py-3 rounded-xl border-2 border-[#1A1A1A] font-bold hover:bg-[#1A1A1A] hover:text-white transition-colors">Join Free</button>
            </div>
            
            <div className="bg-[#1A1A1A] text-white rounded-2xl p-6 border border-slate-800 relative transform md:-translate-y-4 shadow-2xl">
              <div className="absolute top-0 right-0 bg-[#C9540A] text-xs font-bold px-3 py-1 rounded-bl-xl rounded-tr-xl">POPULAR</div>
              <h3 className="text-xl font-bold mb-2">Pro</h3>
              <p className="text-gray-400 mb-6 text-sm">For growing entrepreneurs.</p>
              <ul className="space-y-3 mb-8">
                <li className="flex gap-2 text-sm"><CheckCircle2 className="w-5 h-5 text-[#C9540A] shrink-0"/> All Basic features</li>
                <li className="flex gap-2 text-sm"><CheckCircle2 className="w-5 h-5 text-[#C9540A] shrink-0"/> Advanced marketing tools</li>
                <li className="flex gap-2 text-sm"><CheckCircle2 className="w-5 h-5 text-[#C9540A] shrink-0"/> 1-on-1 mentorship</li>
                <li className="flex gap-2 text-sm"><CheckCircle2 className="w-5 h-5 text-[#C9540A] shrink-0"/> Digital catalog setup</li>
              </ul>
              <button className="w-full py-3 rounded-xl bg-[#C9540A] font-bold hover:bg-white hover:text-[#C9540A] transition-colors">Get Started</button>
            </div>
            
            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
              <h3 className="text-xl font-bold text-[#1A1A1A] mb-2">Elite</h3>
              <p className="text-slate-500 mb-6 text-sm">For established businesses.</p>
              <ul className="space-y-3 mb-8">
                <li className="flex gap-2 text-sm"><CheckCircle2 className="w-5 h-5 text-[#C9540A] shrink-0"/> All Pro features</li>
                <li className="flex gap-2 text-sm"><CheckCircle2 className="w-5 h-5 text-[#C9540A] shrink-0"/> Brand promotion campaigns</li>
                <li className="flex gap-2 text-sm"><CheckCircle2 className="w-5 h-5 text-[#C9540A] shrink-0"/> Priority support</li>
                <li className="flex gap-2 text-sm"><CheckCircle2 className="w-5 h-5 text-[#C9540A] shrink-0"/> Exclusive networking events</li>
              </ul>
              <button className="w-full py-3 rounded-xl border-2 border-[#1A1A1A] font-bold hover:bg-[#1A1A1A] hover:text-white transition-colors">Contact Us</button>
            </div>
          </div>
        </div>
      </main>

      {/* Simplified footer */}
      <footer className="py-12 bg-[#1C1C1C] text-center text-white">
        <p className="text-[#888888] text-sm">© {new Date().getFullYear()} Buddingpreneurs. All rights reserved.</p>
      </footer>
    </div>
  );
}
