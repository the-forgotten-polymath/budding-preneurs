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

      <main className="flex-grow">
        {/* HERO SECTION */}
        <section className="pt-32 pb-20 px-6 max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-100 text-[#C9540A] text-xs font-bold tracking-widest uppercase mb-6">
            <span>Membership Plans</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-[#1A1A1A] leading-[1.1] mb-6">
            Invest in Your <br />
            <span className="italic font-serif text-[#C9540A]">Business Journey</span>
          </h1>
          <p className="text-[#334155] text-lg leading-relaxed max-w-2xl mx-auto mb-10">
            Whether you're just starting out or looking to scale your existing home-based venture, our membership plans are designed to give you the exact support, training, and community you need.
          </p>
        </section>

        {/* PRICING SECTION */}
        <section className="pb-24 px-6 max-w-6xl mx-auto">
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-slate-100">
            <h2 className="text-3xl font-black mb-8 border-b pb-4 text-center">Membership Tiers</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 hover:shadow-md transition-shadow">
                <h3 className="text-xl font-bold text-[#1A1A1A] mb-2">Basic</h3>
                <p className="text-slate-500 mb-6 text-sm h-10">For those just starting out.</p>
                <div className="mb-8">
                  <span className="text-4xl font-black text-[#1A1A1A]">Free</span>
                </div>
                <ul className="space-y-3 mb-8 h-40">
                  <li className="flex gap-2 text-sm"><CheckCircle2 className="w-5 h-5 text-[#C9540A] shrink-0"/> Access to basic workshops</li>
                  <li className="flex gap-2 text-sm"><CheckCircle2 className="w-5 h-5 text-[#C9540A] shrink-0"/> Community forum access</li>
                  <li className="flex gap-2 text-sm"><CheckCircle2 className="w-5 h-5 text-[#C9540A] shrink-0"/> Monthly newsletter</li>
                </ul>
                <button className="w-full py-3 rounded-xl border-2 border-[#1A1A1A] font-bold hover:bg-[#1A1A1A] hover:text-white transition-colors">Join Free</button>
              </div>
              
              <div className="bg-[#1A1A1A] text-white rounded-2xl p-6 border border-slate-800 relative transform md:-translate-y-4 shadow-2xl">
                <div className="absolute top-0 right-0 bg-[#C9540A] text-xs font-bold px-3 py-1 rounded-bl-xl rounded-tr-xl">POPULAR</div>
                <h3 className="text-xl font-bold mb-2">Pro</h3>
                <p className="text-gray-400 mb-6 text-sm h-10">For growing entrepreneurs needing expert guidance.</p>
                <div className="mb-8">
                  <span className="text-4xl font-black">₹999</span>
                  <span className="text-gray-400 text-sm">/year</span>
                </div>
                <ul className="space-y-3 mb-8 h-40">
                  <li className="flex gap-2 text-sm"><CheckCircle2 className="w-5 h-5 text-[#C9540A] shrink-0"/> All Basic features</li>
                  <li className="flex gap-2 text-sm"><CheckCircle2 className="w-5 h-5 text-[#C9540A] shrink-0"/> Advanced marketing tools</li>
                  <li className="flex gap-2 text-sm"><CheckCircle2 className="w-5 h-5 text-[#C9540A] shrink-0"/> 1-on-1 mentorship sessions</li>
                  <li className="flex gap-2 text-sm"><CheckCircle2 className="w-5 h-5 text-[#C9540A] shrink-0"/> Digital catalog setup</li>
                </ul>
                <button className="w-full py-3 rounded-xl bg-[#C9540A] font-bold hover:bg-white hover:text-[#C9540A] transition-colors">Get Started</button>
              </div>
              
              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 hover:shadow-md transition-shadow">
                <h3 className="text-xl font-bold text-[#1A1A1A] mb-2">Elite</h3>
                <p className="text-slate-500 mb-6 text-sm h-10">For established businesses ready to scale.</p>
                <div className="mb-8">
                  <span className="text-4xl font-black text-[#1A1A1A]">₹2,499</span>
                  <span className="text-slate-500 text-sm">/year</span>
                </div>
                <ul className="space-y-3 mb-8 h-40">
                  <li className="flex gap-2 text-sm"><CheckCircle2 className="w-5 h-5 text-[#C9540A] shrink-0"/> All Pro features</li>
                  <li className="flex gap-2 text-sm"><CheckCircle2 className="w-5 h-5 text-[#C9540A] shrink-0"/> Brand promotion campaigns</li>
                  <li className="flex gap-2 text-sm"><CheckCircle2 className="w-5 h-5 text-[#C9540A] shrink-0"/> Priority 24/7 support</li>
                  <li className="flex gap-2 text-sm"><CheckCircle2 className="w-5 h-5 text-[#C9540A] shrink-0"/> Exclusive networking events</li>
                </ul>
                <button className="w-full py-3 rounded-xl border-2 border-[#1A1A1A] font-bold hover:bg-[#1A1A1A] hover:text-white transition-colors">Contact Us</button>
              </div>
            </div>
          </div>
        </section>

        {/* WHY JOIN US / FEATURES */}
        <section className="bg-[#1A1A1A] py-24 px-6 text-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-black mb-6">More Than Just a <span className="italic font-serif text-[#C9540A]">Membership</span></h2>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                When you join Buddingpreneurs, you aren't just paying for courses—you're investing in a thriving ecosystem designed to guarantee your success.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-[#2A2A2A] p-8 rounded-2xl border border-gray-800">
                <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center mb-6">
                  <span className="text-2xl">👩‍🏫</span>
                </div>
                <h3 className="text-xl font-bold mb-3">Expert Mentorship</h3>
                <p className="text-gray-400">Get direct feedback, personalized advice, and strategic guidance from successful women entrepreneurs.</p>
              </div>
              <div className="bg-[#2A2A2A] p-8 rounded-2xl border border-gray-800">
                <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center mb-6">
                  <span className="text-2xl">🤝</span>
                </div>
                <h3 className="text-xl font-bold mb-3">Vibrant Sisterhood</h3>
                <p className="text-gray-400">Never feel alone in your journey. Connect, collaborate, and grow alongside hundreds of like-minded women.</p>
              </div>
              <div className="bg-[#2A2A2A] p-8 rounded-2xl border border-gray-800">
                <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center mb-6">
                  <span className="text-2xl">📈</span>
                </div>
                <h3 className="text-xl font-bold mb-3">Actionable Growth</h3>
                <p className="text-gray-400">Our programs focus on practical, actionable steps that directly translate to brand visibility and income.</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA SECTION */}
        <section className="py-24 px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-black text-[#1A1A1A] mb-6">Ready to turn your skills into a business?</h2>
          <p className="text-slate-600 mb-8 max-w-xl mx-auto">
            Take the first step towards financial independence today. Join the community and start your entrepreneurial journey.
          </p>
          <a href="/contact" className="inline-flex items-center justify-center px-8 py-4 rounded-full text-sm font-bold transition-all gap-2 bg-[#C9540A] text-white hover:bg-[#1A1A1A] shadow-lg hover:shadow-xl">
            <span>Get in Touch</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </section>
      </main>

      {/* FULL FOOTER */}
      <footer id="contact" className="py-16 px-6 bg-[#1C1C1C] relative z-10 w-full">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 items-start">
          <div className="col-span-1 md:col-span-2">
            <a href="/" className="flex items-center gap-2 mb-6">
              <span className="text-2xl font-black tracking-tight text-white font-sans lowercase">buddingpreneurs</span>
            </a>
            <p className="text-[#888888] text-sm leading-relaxed max-w-sm font-sans mb-8">
              Indian women entrepreneurs rise here. Join the sisterhood, build your personal brand, set up digital catalogs, and achieve economic self-reliance.
            </p>
            <div className="flex gap-4">
               <a href="#" className="w-10 h-10 rounded-full border border-[#333333] flex items-center justify-center text-white hover:border-[#C9540A] hover:text-[#C9540A] transition-colors">IG</a>
               <a href="#" className="w-10 h-10 rounded-full border border-[#333333] flex items-center justify-center text-white hover:border-[#C9540A] hover:text-[#C9540A] transition-colors">FB</a>
               <a href="#" className="w-10 h-10 rounded-full border border-[#333333] flex items-center justify-center text-white hover:border-[#C9540A] hover:text-[#C9540A] transition-colors">LI</a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Quick Links</h4>
            <ul className="flex flex-col gap-4 text-sm text-[#888888]">
              <li><a href="/" className="hover:text-white transition-colors">Home</a></li>
              <li><a href="/about" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="/programs" className="hover:text-white transition-colors">Programs</a></li>
              <li><a href="/community" className="hover:text-white transition-colors">Community</a></li>
              <li><a href="/contact" className="hover:text-white transition-colors">Contact Us</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Get In Touch</h4>
            <div className="flex flex-col gap-4 text-sm text-[#888888]">
              <div className="flex items-center gap-3">
                <span className="w-4 h-4 text-[#C9540A]">✉</span>
                <span>{siteMetadata.contactEmail}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-4 h-4 text-[#C9540A]">📍</span>
                <span>{siteMetadata.location}</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto px-6 mt-16 pt-8 border-t border-[#333333] flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-[#666666]">
          <span>&copy; {new Date().getFullYear()} Buddingpreneurs. All rights reserved.</span>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
