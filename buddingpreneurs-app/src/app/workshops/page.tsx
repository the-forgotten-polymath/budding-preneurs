"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Menu,
  X,
  Mail,
  MapPin,
  Calendar,
  Sparkles,
  BookOpen
} from "lucide-react";
import { siteMetadata } from "../../data/siteData";
import Footer from "@/components/Footer";

export default function WorkshopsPage() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
            <a href="/" className="text-[11px] xl:text-xs font-semibold text-[#0f172a] hover:text-slate-500 transition-colors">Home</a>
            <a href="/workshops" className="text-[11px] xl:text-xs font-bold text-[#C9540A] transition-colors border-b-2 border-[#C9540A] pb-1">Workshops</a>
            <a href="/community" className="text-[11px] xl:text-xs font-semibold text-[#0f172a] hover:text-slate-500 transition-colors">Community</a>
            <a href="/blog" className="text-[11px] xl:text-xs font-semibold text-[#0f172a] hover:text-slate-500 transition-colors">Blog</a>
            <a href="/programs" className="text-[11px] xl:text-xs font-semibold text-[#0f172a] hover:text-slate-500 transition-colors">Our Programs</a>
            <a href="/business-plan" className="text-[11px] xl:text-xs font-semibold text-[#0f172a] hover:text-slate-500 transition-colors">Business Plan</a>
            <a href="/disclaimer" className="text-[11px] xl:text-xs font-semibold text-[#0f172a] hover:text-slate-500 transition-colors">Disclaimer</a>
            <a href="/about" className="text-[11px] xl:text-xs font-semibold text-[#0f172a] hover:text-slate-500 transition-colors">About us</a>
            <a href="/contact" className="text-[11px] xl:text-xs font-semibold text-[#0f172a] hover:text-slate-500 transition-colors">Contact</a>
          </nav>

          <div className="flex items-center gap-2 sm:gap-4">
            <a href="/business-plan" className="px-4 py-2 sm:px-5 sm:py-2.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 bg-[#0f172a] hover:bg-slate-800 text-white shadow-sm">
              <span>Join for Free</span>
              <ArrowRight className="w-3 h-3" />
            </a>
            
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="lg:hidden p-1.5 sm:p-2 text-[#0f172a] hover:bg-slate-100 rounded-full transition-colors z-50 relative">
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
              {['Home', 'Workshops', 'Community', 'Blog', 'Our Programs', 'Business Plan', 'Disclaimer', 'About us', 'Contact'].map((item) => (
                <a
                  key={item}
                  href={item === 'Home' ? '/' : item === 'Our Programs' ? '/programs' : item === 'About us' ? '/about' : `/${item.toLowerCase().replace(' ', '-')}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`text-lg font-semibold transition-colors ${item === 'Workshops' ? 'text-[#C9540A]' : 'text-[#0f172a] hover:text-[#C9540A]'}`}
                >
                  {item}
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
        <section className="px-6 pb-20 text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-100 text-[#C9540A] text-xs font-bold tracking-widest uppercase mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Transformative Sessions</span>
          </div>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-[#1A1A1A] leading-[1.1] mb-8">
            Enable Women to <br />
            <span className="italic font-serif text-[#C9540A]">Lead and Launch</span>
          </h1>
          <p className="text-[#334155] text-lg md:text-xl leading-relaxed mb-10 max-w-2xl mx-auto">
            Join our skill development workshops to boost your business and connect with like-minded women.
          </p>
        </section>

        {/* SECONDARY HERO / IDEAS TO IMPACT */}
        <section className="py-16 px-6 border-y border-[#E8E4DF] bg-white">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12 lg:gap-20">
            <div className="w-full md:w-1/2">
              <h2 className="text-4xl md:text-5xl font-black text-[#1A1A1A] mb-6">
                Grow Her Ideas <span className="italic font-serif text-[#C9540A]">into Impact</span>
              </h2>
              <p className="text-[#334155] text-lg leading-relaxed">
                Join our workshops to enhance skills and promote businesses. We provide hands-on training, industry insights, and a supportive community.
              </p>
            </div>
            <div className="w-full md:w-1/2">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[4/3] w-full">
                <Image
                  src="/images/workshops/workshops_magazine_1779275458338.png"
                  alt="Secret Women's Business Magazine"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* WORKSHOP CATEGORIES */}
        <section className="py-24 px-6 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            
            {/* CARD 1 */}
            <div className="bg-white rounded-3xl overflow-hidden border border-[#E8E4DF] hover:shadow-xl transition-shadow flex flex-col group">
              <div className="relative h-64 sm:h-80 w-full overflow-hidden">
                <Image 
                  src="/images/workshops/workshops_women_flower_1779275541121.png" 
                  alt="Women collaborating" 
                  fill 
                  className="object-cover group-hover:scale-105 transition-transform duration-700" 
                />
              </div>
              <div className="p-8 flex flex-col flex-grow">
                <div className="flex items-center gap-2 text-sm text-[#C9540A] font-bold mb-4 uppercase tracking-wider">
                  <BookOpen className="w-4 h-4" /> Training
                </div>
                <h3 className="text-2xl font-black text-[#1A1A1A] mb-3">Skill Development</h3>
                <p className="text-[#6B6B6B] leading-relaxed mb-8 flex-grow">
                  Learn essential skills for business growth and promotion. Gain practical knowledge from experts in various fields.
                </p>
                <a href="/business-plan" className="inline-flex items-center justify-center w-full px-6 py-3 rounded-full text-sm font-bold transition-all gap-2 bg-[#0f172a] text-white hover:bg-[#C9540A]">
                  <span>Join</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* CARD 2 */}
            <div className="bg-white rounded-3xl overflow-hidden border border-[#E8E4DF] hover:shadow-xl transition-shadow flex flex-col group">
              <div className="relative h-64 sm:h-80 w-full overflow-hidden bg-slate-50">
                <Image 
                  src="/images/workshops/workshops_yoga_1779275490769.png" 
                  alt="Yoga Wellness" 
                  fill 
                  className="object-cover object-top group-hover:scale-105 transition-transform duration-700" 
                />
              </div>
              <div className="p-8 flex flex-col flex-grow">
                <div className="flex items-center gap-2 text-sm text-[#C9540A] font-bold mb-4 uppercase tracking-wider">
                  <Sparkles className="w-4 h-4" /> Wellness
                </div>
                <h3 className="text-2xl font-black text-[#1A1A1A] mb-3">Yoga Wellness-Fitness</h3>
                <p className="text-[#6B6B6B] leading-relaxed mb-8 flex-grow">
                  Participate in wellness workshops for holistic empowerment and growth. Keep your mind and body balanced.
                </p>
                <a href="/programs" className="inline-flex items-center justify-center w-full px-6 py-3 rounded-full text-sm font-bold transition-all gap-2 border-2 border-[#0f172a] text-[#0f172a] hover:bg-[#0f172a] hover:text-white">
                  <span>Explore</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>

          </div>
        </section>

        {/* DETAILED WORKSHOPS */}
        <section className="bg-[#1A1A1A] py-24 px-6 text-white relative overflow-hidden">
          {/* Background Decorative Rings */}
          <div className="absolute top-0 right-0 -mr-40 -mt-40 w-96 h-96 rounded-full border-[20px] border-[#2A2A2A] opacity-50 blur-xl"></div>
          <div className="absolute bottom-0 left-0 -ml-40 -mb-40 w-96 h-96 rounded-full border-[20px] border-[#C9540A] opacity-20 blur-xl"></div>
          
          <div className="max-w-7xl mx-auto flex flex-col gap-24 relative z-10">
            
            {/* FEATURED WORKSHOP 1 */}
            <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
              <div className="w-full lg:w-1/2 relative">
                <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[4/3] w-full border border-gray-800">
                  <Image
                    src="/images/workshops/workshops_sign_1779275512627.png"
                    alt="Forcing a Change sign"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="w-full lg:w-1/2">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-800 text-amber-400 text-xs font-bold tracking-widest uppercase mb-6">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Featured Workshop</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-black mb-6">
                  Skill Development <span className="italic font-serif text-[#C9540A]">Workshop</span>
                </h2>
                <p className="text-gray-300 text-lg leading-relaxed mb-8">
                  Join our empowering Skill Development Workshop designed for Indian women entrepreneurs. Learn essential skills in brand promotion on Facebook, Instagram, and WhatsApp. Collaborate with fellow women to enhance your business acumen and achieve economic independence through shared resources and support.
                </p>
                <a href="/contact" className="inline-flex items-center justify-center px-8 py-4 rounded-full text-sm font-bold transition-all gap-2 bg-[#C9540A] text-white hover:bg-white hover:text-[#C9540A]">
                  <span>Register Now</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* FEATURED WORKSHOP 2 */}
            <div className="flex flex-col-reverse lg:flex-row items-center gap-12 lg:gap-16">
              <div className="w-full lg:w-1/2">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-800 text-amber-400 text-xs font-bold tracking-widest uppercase mb-6">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Next Generation</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-black mb-6">
                  Kids Online <span className="italic font-serif text-[#C9540A]">Workshop</span>
                </h2>
                <p className="text-gray-300 text-lg leading-relaxed mb-8">
                  Enroll your kids in our engaging Online Workshop tailored for young minds. This interactive session focuses on skill development and creativity, fostering a supportive environment for children to learn and grow. Empower the next generation of innovators and entrepreneurs today!
                </p>
                <a href="/business-plan" className="inline-flex items-center justify-center px-8 py-4 rounded-full text-sm font-bold transition-all gap-2 bg-white text-[#1A1A1A] hover:bg-[#C9540A] hover:text-white">
                  <span>Join Today</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
              <div className="w-full lg:w-1/2 relative">
                <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[4/3] w-full border border-gray-800">
                  <Image
                    src="/images/workshops/workshops_stone_1779275526393.png"
                    alt="Holding a stone"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>

          </div>
        </section>

      </main>

      <Footer />

    </div>
  );
}
