"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Menu, X, Mail, MapPin } from "lucide-react";
import { siteMetadata } from "../../data/siteData";

export default function BlogPage() {
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
                  link.name === 'Blog' 
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
                    link.name === 'Blog' ? 'text-[#C9540A]' : 'text-[#0f172a] hover:text-[#C9540A]'
                  }`}
                >
                  {link.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="flex-grow pt-32 pb-20">
        
        {/* HERO SECTION */}
        <section className="px-6 pb-16 text-center max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-black text-[#1A1A1A] leading-[1.1] mb-6">
            Empower Her Dreams: <br />
            <span className="italic font-serif text-[#C9540A]">Startups That Start at Home</span>
          </h1>
          <p className="text-[#334155] text-lg leading-relaxed max-w-2xl mx-auto">
            Join our vibrant community for skill development and marketing support, celebrating women-led businesses in India.
          </p>
        </section>

        {/* FEATURE IMAGE */}
        <section className="px-6 pb-20 max-w-6xl mx-auto">
          <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[16/9] md:aspect-[21/9] w-full bg-slate-50">
            <Image
              src="/images/blog/blog_women_steps_1779276238965.png"
              alt="Five young women standing on outdoor steps expressing playful gestures"
              fill
              className="object-cover object-top"
            />
          </div>
        </section>

        {/* ARTICLES SECTION */}
        <section className="px-6 max-w-6xl mx-auto flex flex-col gap-24">
          
          {/* Article 1 */}
          <article className="flex flex-col lg:flex-row gap-12 items-center">
            <div className="w-full lg:w-1/2 relative">
              <div className="relative rounded-3xl overflow-hidden shadow-xl aspect-square w-full">
                <Image
                  src="/images/blog/blog_woman_board_1779276223265.png"
                  alt="Woman pointing paper on board"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <div className="w-full lg:w-1/2 flex flex-col gap-4">
              <h2 className="text-3xl md:text-4xl font-black text-[#1A1A1A]">Why We Help Women Start Their Own Ventures</h2>
              <p className="text-slate-600 leading-relaxed">
                At Buddingpreneurs, our core mission is simple yet life-changing: to help women start up their own ventures, become financially independent, and take confident steps toward a stronger future. In many Indian homes, women are the backbone of the family — nurturing, managing, and supporting everyone around them. But when it comes to financial participation, many women are still on the sidelines.
              </p>
              <p className="text-slate-600 leading-relaxed">
                We believe that every woman has a skill worth turning into a startup — whether it’s crafting, teaching, baking, designing, or promoting ideas online. Through skill development workshops, brand promotion training, and a strong community, we help women turn those talents into self-sustaining micro-enterprises.
              </p>
              <div className="mt-4 flex items-center gap-3">
                <div className="w-10 h-10 bg-[#C9540A]/10 text-[#C9540A] rounded-full flex justify-center items-center font-bold">SB</div>
                <div className="text-sm">
                  <p className="font-bold text-[#1A1A1A]">Sasmita Behera</p>
                  <p className="text-slate-500">5/6/2025 • 1 min read</p>
                </div>
              </div>
            </div>
          </article>

          {/* Article 2 */}
          <article className="flex flex-col-reverse lg:flex-row gap-12 items-center">
            <div className="w-full lg:w-1/2 flex flex-col gap-4">
              <h2 className="text-3xl md:text-4xl font-black text-[#1A1A1A]">From Kitchen Table to Startup – The Rise of Home-Based Women Entrepreneurs</h2>
              <p className="text-slate-600 leading-relaxed">
                Today, more Indian women are turning their kitchens, bedrooms, or balconies into the first headquarters of their dreams. With just a smartphone, a Facebook page, and a little support, home-based businesses are booming — from homemade pickles to handcrafted jewellery.
              </p>
              <p className="text-slate-600 leading-relaxed">
                At Buddingpreneur, we celebrate and support these women. We believe that a startup doesn’t have to begin with big investments — it begins with belief, skills, and the will to try. Our workshops and training help women build digital presence, handle customer queries, and convert their talents into income. Every time a woman sells her first product or service online, she takes her first step toward independence.
              </p>
              <div className="mt-4 flex items-center gap-3">
                <div className="w-10 h-10 bg-[#C9540A]/10 text-[#C9540A] rounded-full flex justify-center items-center font-bold">SB</div>
                <div className="text-sm">
                  <p className="font-bold text-[#1A1A1A]">Sasmita Behera</p>
                  <p className="text-slate-500">5/6/2025 • 1 min read</p>
                </div>
              </div>
            </div>
            <div className="w-full lg:w-1/2 relative">
              <div className="relative rounded-3xl overflow-hidden shadow-xl aspect-square w-full">
                <Image
                  src="/images/blog/blog_rally_1779276207325.png"
                  alt="Women gathered for a rally"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </article>

        </section>
        
        {/* EMPOWERING WOMEN BLOCK */}
        <section className="mt-24 bg-[#C9540A] py-16 px-6 text-center text-white">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-black mb-4 italic font-serif">Empowering Women Entrepreneurs</h2>
            <p className="text-white/80 text-lg">Together, we build, we grow, we succeed.</p>
          </div>
        </section>

      </main>

      <footer id="contact" className="py-16 px-6 bg-[#1C1C1C] relative z-10 w-full">
        {/* Same Footer Code ... shortened for space */}
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 items-start text-white">
          <div className="col-span-1 md:col-span-2">
            <span className="text-2xl font-black tracking-tight font-sans lowercase">buddingpreneurs</span>
            <p className="text-[#888888] text-sm leading-relaxed max-w-sm font-sans mt-6">
              Indian women entrepreneurs rise here.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
