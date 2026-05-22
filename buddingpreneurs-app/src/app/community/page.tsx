"use client";

import NavAuth from "@/components/NavAuth";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Menu,
  X,
  Mail,
  MapPin,
  Star,
  Quote
} from "lucide-react";
import Footer from "@/components/Footer";

import { siteMetadata } from "../../data/siteData";

export default function CommunityPage() {
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
      
      {/* 🚀 GLOWING HEADER / NAVIGATION BAR */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-white/80 backdrop-blur-md border-b border-slate-100 py-3 shadow-sm" : "bg-transparent py-5"}`}>
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
                  link.name === 'Community' 
                    ? "text-[#C9540A] border-b-2 border-[#C9540A] pb-1 font-bold" 
                    : "text-[#1A1A1A] hover:text-[#C9540A]"
                }`}
              >
                {link.name}
              </a>
            ))}
          <a href="/directory" className="text-[11px] xl:text-xs font-semibold text-[#1A1A1A] hover:text-[#C9540A] transition-colors">Directory</a>
          </nav>

          <div className="flex items-center gap-2 sm:gap-4">
            <NavAuth />
            
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="lg:hidden p-1.5 sm:p-2 text-[#1A1A1A] hover:bg-gray-200 rounded-full transition-colors z-50 relative">
              {isMobileMenuOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
            </button>
          </div>
        </div>
      </header>

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
                <a
                  key={link.name}
                  href={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`text-lg font-semibold transition-colors ${
                    link.name === 'Community' ? 'text-[#C9540A]' : 'text-[#1A1A1A] hover:text-[#C9540A]'
                  }`}
                >
                  {link.name}
                </a>
              ))}
              <div className="w-12 h-px bg-slate-200 my-4" />
              <a href="/business-plan" onClick={() => setIsMobileMenuOpen(false)} className="px-8 py-3.5 rounded-full text-sm font-bold transition-all flex items-center justify-center gap-2 bg-[#0f172a] text-white w-full max-w-xs shadow-sm hover:bg-slate-800">
                <span>Join for Free</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="flex-grow pt-32 pb-20">
        
        {/* HERO SECTION */}
        <section className="px-6 pb-20">
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            <div className="w-full lg:w-1/2">
              <h1 className="text-5xl md:text-6xl font-black text-[#1A1A1A] leading-[1.1] mb-6">
                A Platform for Her to <br />
                <span className="italic font-serif text-[#C9540A]">Start, Share, and Shine</span>
              </h1>
              <p className="text-[#334155] text-lg leading-relaxed mb-10 max-w-xl">
                At Buddingpreneurs, we are committed to uplifting Indian women by turning skills into self-reliance. Whether she’s starting from scratch or looking to grow her small venture, we provide hands-on training, digital promotion guidance, and a supportive sisterhood to help her thrive. This is a space where women learn, share experiences, and shine—together.
              </p>
              
              <div className="bg-white p-8 rounded-3xl shadow-lg border border-slate-100 relative mt-12">
                <div className="absolute -top-6 left-8 bg-[#C9540A] text-white p-3 rounded-full shadow-md">
                  <Quote className="w-6 h-6" />
                </div>
                <div className="flex gap-1 mb-4 pt-2 text-amber-400">
                  <Star className="w-5 h-5 fill-current" />
                  <Star className="w-5 h-5 fill-current" />
                  <Star className="w-5 h-5 fill-current" />
                  <Star className="w-5 h-5 fill-current" />
                  <Star className="w-5 h-5 fill-current" />
                </div>
                <p className="text-slate-700 italic leading-relaxed mb-6">
                  "The buddingpreneurs has been an invaluable resource for learning, networking, and refining entrepreneurial skills. We trust buddingpreneurs. Must try.. see the difference."
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-slate-200 rounded-full flex items-center justify-center font-bold text-slate-500">
                    NC
                  </div>
                  <div>
                    <h4 className="font-bold text-[#1A1A1A]">Nirmla Chib</h4>
                    <p className="text-xs text-slate-500">Entrepreneur, Brand TVAREETAZ, MD</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="w-full lg:w-1/2 relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[4/3] w-full">
                <Image
                  src="/images/community/community_workspace_1779276179265.png"
                  alt="A group of diverse women sitting at a table in a casual workspace"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-[#C9540A] rounded-full mix-blend-multiply opacity-20 blur-xl"></div>
            </div>
          </div>
        </section>

        {/* CTA SECTION */}
        <section className="bg-[#1A1A1A] py-24 px-6 text-white text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-black mb-8">
              Let’s Build Your Dream <span className="italic font-serif text-[#C9540A]">Together</span>
            </h2>
            <p className="text-gray-300 text-lg leading-relaxed mb-10">
              No dream is too small when you have the right support. At Buddingpreneurs, we walk with you at every step — from discovering your skills to launching your brand and growing your confidence. Whether you're curious, committed, or just starting out, we're here to help you begin.
            </p>
            <a href="/contact" className="inline-flex items-center justify-center px-10 py-4 rounded-full text-base font-bold transition-all gap-2 bg-[#C9540A] text-white hover:bg-white hover:text-[#C9540A]">
              <span>Get In Touch</span>
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </section>

        {/* GALLERY SECTION */}
        <section className="py-24 px-6 bg-white border-t border-[#E8E4DF]">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-3xl font-black text-[#1A1A1A] mb-4">Gallery</h2>
            <p className="text-[#C9540A] font-bold tracking-widest uppercase text-sm mb-12">
              From Idea to Income: Empowering Women Through Startup Support
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="aspect-square relative rounded-2xl overflow-hidden">
                <Image src="https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&w=600&q=80" alt="Gallery" fill className="object-cover hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="aspect-square relative rounded-2xl overflow-hidden">
                <Image src="https://images.unsplash.com/photo-1573164574572-cb89e39749b4?auto=format&fit=crop&w=600&q=80" alt="Gallery" fill className="object-cover hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="aspect-square relative rounded-2xl overflow-hidden">
                <Image src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=600&q=80" alt="Gallery" fill className="object-cover hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="aspect-square relative rounded-2xl overflow-hidden">
                <Image src="https://images.unsplash.com/photo-1552581234-26160f608093?auto=format&fit=crop&w=600&q=80" alt="Gallery" fill className="object-cover hover:scale-105 transition-transform duration-500" />
              </div>
            </div>
          </div>
        </section>

      </main>

      {/* FOOTER */}
      <Footer />
    </div>
  );
}
