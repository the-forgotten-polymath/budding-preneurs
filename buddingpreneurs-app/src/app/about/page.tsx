"use client";

import NavAuth from "@/components/NavAuth";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Menu, X, Users, Star, Target } from "lucide-react";
import Footer from "@/components/Footer";

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
          <nav className="hidden lg:flex flex-nowrap items-center justify-center gap-3 xl:gap-5 whitespace-nowrap">
            <a href="/" className="text-[11px] xl:text-xs font-semibold text-[#1A1A1A] hover:text-[#C9540A] transition-colors">Home</a>
            <a href="/directory" className="text-[11px] xl:text-xs font-semibold text-[#1A1A1A] hover:text-[#C9540A] transition-colors">Business Showcase</a>
            <a href="/community" className="text-[11px] xl:text-xs font-semibold text-[#1A1A1A] hover:text-[#C9540A] transition-colors">Community</a>
            <a href="/programs" className="text-[11px] xl:text-xs font-semibold text-[#1A1A1A] hover:text-[#C9540A] transition-colors">Programs</a>
            <a href="/workshops" className="text-[11px] xl:text-xs font-semibold text-[#1A1A1A] hover:text-[#C9540A] transition-colors">Workshops</a>
            <a href="/about" className="text-[11px] xl:text-xs font-semibold text-[#1A1A1A] hover:text-[#C9540A] transition-colors">About</a>
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
                <a key={link.name} href={link.path} onClick={() => setIsMobileMenuOpen(false)} className={`text-lg font-semibold transition-colors ${link.name === 'About us' ? 'text-[#C9540A]' : 'text-[#1A1A1A] hover:text-[#C9540A]'}`}>
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
              <h3 className="text-2xl font-black text-[#1A1A1A] mb-2">Meet Sasmita Behera</h3>
              <p className="text-[#C9540A] font-bold text-sm mb-4">Founder & Admin, Buddingpreneurs | Founder, Art of Filigree</p>
              <div className="text-slate-600 leading-relaxed space-y-4">
                <p>Sasmita Behera is an entrepreneur, community builder and advocate for women’s growth and independence.</p>
                <p>Her entrepreneurial journey began with Art of Filigree, inspired by the exquisite traditional silver filigree craft of Odisha.</p>
                <p>With a Master of Computer Applications (MCA) from Sambalpur University, a Bachelor of Education (B.Ed) from MDU, Rohtak, and a Digital Marketing qualification from DSOM, Dehradun, Sasmita brings together her academic background, entrepreneurial experience and passion for learning to everything she undertakes.</p>
                <p>Her journey has been shaped not only by business, but also by her commitment to education and empowerment. She has personally navigated the responsibilities of raising and educating her child through Standard 8, while continuing to develop her own skills and entrepreneurial pursuits.</p>
                <p>Her passion for connecting with women entrepreneurs eventually led her to create Buddingpreneurs — a community built on the simple belief that women should not have to build their businesses alone.</p>
                <p>Through Buddingpreneurs, Sasmita strives to create opportunities for women to connect, learn, collaborate, showcase their businesses and grow together.</p>
                <p>Her experiences have shown her that women often don't lack talent. What they sometimes lack is visibility, confidence, access to the right network, or simply someone who believes in them.</p>
                <p>This understanding became the heart of Buddingpreneurs.<br/>With her background in technology, education, digital marketing and entrepreneurship, Sasmita is working to build a supportive ecosystem where women-led businesses are seen, heard, celebrated and empowered to grow.</p>
                <p>Her vision is simple yet powerful:<br/>“Her vision is to make sure that no woman with the passion to build is held back simply because she doesn't know where to start, how to start, whom to connect with, or how to be seen. 💜”</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
