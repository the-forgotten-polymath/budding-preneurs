"use client";

import NavAuth from "@/components/NavAuth";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Menu, X, Mail, MapPin } from "lucide-react";
import Footer from "@/components/Footer";
export default function ContactPage() {
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
                  link.name === 'Contact' ? "text-[#C9540A] border-b-2 border-[#C9540A] pb-1 font-bold" : "text-[#1A1A1A] hover:text-[#C9540A]"
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
                <a key={link.name} href={link.path} onClick={() => setIsMobileMenuOpen(false)} className={`text-lg font-semibold transition-colors ${link.name === 'Contact' ? 'text-[#C9540A]' : 'text-[#1A1A1A] hover:text-[#C9540A]'}`}>
                  {link.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="flex-grow pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16">
          
          <div className="w-full lg:w-1/2">
            <h1 className="text-5xl md:text-6xl font-black text-[#1A1A1A] leading-[1.1] mb-6">
              Let's Build Your Dream <span className="italic font-serif text-[#C9540A]">Together</span>
            </h1>
            <p className="text-slate-600 text-lg mb-10 leading-relaxed">
              No dream is too small when you have the right support. Fill out the form below and let us help you turn your skills into a thriving business.
            </p>

            <form className="bg-white p-8 rounded-3xl shadow-xl border border-slate-100 space-y-6">
              <div>
                <label className="block text-sm font-bold text-[#1A1A1A] mb-2">Name *</label>
                <input type="text" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#C9540A] focus:border-transparent transition-all bg-slate-50" placeholder="Your full name" required />
              </div>
              <div>
                <label className="block text-sm font-bold text-[#1A1A1A] mb-2">Email Address</label>
                <input type="email" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#C9540A] focus:border-transparent transition-all bg-slate-50" placeholder="you@example.com" />
              </div>
              <div>
                <label className="block text-sm font-bold text-[#1A1A1A] mb-2">Mobile Number *</label>
                <input type="tel" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#C9540A] focus:border-transparent transition-all bg-slate-50" placeholder="Your mobile number" required />
              </div>
              <div>
                <label className="block text-sm font-bold text-[#1A1A1A] mb-2">Business Category *</label>
                <select defaultValue="" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#C9540A] focus:border-transparent transition-all bg-slate-50" required>
                  <option value="" disabled>Select a category</option>
                  <option value="crafting">Crafting</option>
                  <option value="food">Food & Baking</option>
                  <option value="apparel">Apparel & Fashion</option>
                  <option value="services">Services</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold text-[#1A1A1A] mb-2">Social Media Page Link (If you have one)</label>
                <input type="url" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#C9540A] focus:border-transparent transition-all bg-slate-50" placeholder="https://instagram.com/yourpage" />
              </div>
              
              <button type="submit" className="w-full py-4 rounded-full bg-[#1A1A1A] text-white font-bold hover:bg-[#C9540A] transition-colors flex justify-center items-center gap-2">
                Submit Application <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
          
          <div className="w-full lg:w-1/2 flex flex-col gap-8">
            <div className="rounded-3xl overflow-hidden shadow-xl relative aspect-[4/3]">
              <img src="/images/contact/contact_notebooks_1779276280527.png" alt="Workshop Setting" className="object-cover w-full h-full" />
            </div>
            <div className="rounded-3xl overflow-hidden shadow-xl relative aspect-[4/3]">
              <img src="/images/contact/contact_dice_1779276264734.png" alt="Dice" className="object-cover w-full h-full" />
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
