"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Laptop,
  BookOpen,
  Award,
  MessageSquare,
  MapPin,
  Mail,
  ArrowRight,
  Check,
  Star,
  Users,
  TrendingUp,
  Heart,
  ChevronRight,
  Shield,
  Briefcase,
  PlayCircle,
  ChevronLeft,
  Menu,
  X
} from "lucide-react";
import { tabsData, siteMetadata, TabData } from "../data/siteData";

export default function Home() {
  const [activeTab, setActiveTab] = useState<string>("platform");
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const testimonials = [
    {
      quote: "Buddingpreneurs changed my life. I went from having a simple idea to running a fully operational home business. The technical skills and brand promotion strategies I learned here were invaluable.",
      name: "Priya Sharma",
      role: "Startup Founder, India",
      image: "/images/home/photo-1562088287-bde35a1ea917"
    },
    {
      quote: "The community support is unmatched. Being able to connect with other women who are on the exact same journey gave me the confidence to finally launch my brand.",
      name: "Ananya Desai",
      role: "Boutique Owner, Mumbai",
      image: "/images/home/photo-1590650423710-ffa6e7f63440"
    },
    {
      quote: "The workshops on digital marketing completely transformed how I approach my customers online. Within a month, my sales tripled thanks to the practical strategies taught by the mentors.",
      name: "Ritu Verma",
      role: "Freelance Designer, Delhi",
      image: "/images/home/whatsapp-image-2025-05-16-at-12.12.19-pm-3-AQExRqeN1vFRVM34.jpeg"
    },
    {
      quote: "I always wanted to start my own bakery, but the technicalities scared me. Buddingpreneurs held my hand through the entire setup process. I'm now economically independent.",
      name: "Meera Patel",
      role: "Home Baker, Ahmedabad",
      image: "/images/home/whatsapp-image-2025-05-16-at-12.12.19-pm-1-m5KM3EkNp0TbbGoG.jpeg"
    }
  ];

  const [activeTestimonial, setActiveTestimonial] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 6000); // 6 seconds
    return () => clearInterval(interval);
  }, [testimonials.length]);

  // Track mouse coordinates for dynamic 3D Parallax effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      const x = (clientX / innerWidth) - 0.5;
      const y = (clientY / innerHeight) - 0.5;
      setMousePosition({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Track page scroll for sleek navbar state transitions
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const currentTab = tabsData.find((tab) => tab.id === activeTab) || tabsData[0];

  const getSkillIcon = (index: number) => {
    switch (index) {
      case 0:
        return <Heart className="w-5 h-5 text-rose-400" />;
      case 1:
        return <Laptop className="w-5 h-5 text-purple-400" />;
      case 2:
        return <Sparkles className="w-5 h-5 text-amber-400" />;
      case 3:
        return <TrendingUp className="w-5 h-5 text-emerald-400" />;
      default:
        return <Sparkles className="w-5 h-5 text-purple-400" />;
    }
  };

  return (
    <div ref={containerRef} className="min-h-screen bg-[#fafafc] text-slate-800 flex flex-col relative overflow-hidden select-none">
      
      {/* 🚀 GLOWING HEADER / NAVIGATION BAR (Exactly like image.png) */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-white/80 backdrop-blur-md border-b border-slate-100 py-3 shadow-sm" : "bg-transparent py-5"}`}>
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          
          {/* Buddingpreneurs Brand Logo */}
          <a href="#" className="flex items-center gap-2 group">
            <span className="text-xl font-black tracking-tight text-[#0f172a] font-sans">
              Buddingpreneurs
            </span>
          </a>

          {/* Center Navigation links */}
          <nav className="hidden lg:flex flex-wrap items-center justify-center gap-4 xl:gap-6">
            <a href="#" className="text-[11px] xl:text-xs font-semibold text-[#0f172a] hover:text-slate-500 transition-colors">Home</a>
            <a href="/workshops" className="text-[11px] xl:text-xs font-semibold text-[#0f172a] hover:text-slate-500 transition-colors">Workshops</a>
            <a href="#" className="text-[11px] xl:text-xs font-semibold text-[#0f172a] hover:text-slate-500 transition-colors">Community</a>
            <a href="#" className="text-[11px] xl:text-xs font-semibold text-[#0f172a] hover:text-slate-500 transition-colors">Blog</a>
            <a href="/programs" className="text-[11px] xl:text-xs font-semibold text-[#0f172a] hover:text-slate-500 transition-colors">Our Programs</a>
            <a href="#" className="text-[11px] xl:text-xs font-semibold text-[#0f172a] hover:text-slate-500 transition-colors">Business Plan</a>
            <a href="#" className="text-[11px] xl:text-xs font-semibold text-[#0f172a] hover:text-slate-500 transition-colors">Disclaimer</a>
            <a href="#" className="text-[11px] xl:text-xs font-semibold text-[#0f172a] hover:text-slate-500 transition-colors">About us</a>
            <a href="#" className="text-[11px] xl:text-xs font-semibold text-[#0f172a] hover:text-slate-500 transition-colors">Contact</a>
          </nav>

          {/* Call to action button */}
          <div className="flex items-center gap-2 sm:gap-4">
            <a
              href="#"
              className="px-4 py-2 sm:px-5 sm:py-2.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 bg-[#0f172a] hover:bg-slate-800 text-white shadow-sm"
            >
              <span>Join for Free</span>
              <ArrowRight className="w-3 h-3" />
            </a>
            
            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-1.5 sm:p-2 text-[#0f172a] hover:bg-slate-100 rounded-full transition-colors z-50 relative"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
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
                  href={item === 'Our Programs' ? '/programs' : (item === 'Workshops' ? '/workshops' : '#')}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-lg font-semibold text-[#0f172a] hover:text-[#C9540A] transition-colors"
                >
                  {item}
                </a>
              ))}
              
              <div className="w-12 h-px bg-slate-200 my-4" />
              
              <a
                href="#"
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-8 py-3.5 rounded-full text-sm font-bold transition-all flex items-center justify-center gap-2 bg-[#0f172a] text-white w-full max-w-xs shadow-sm hover:bg-slate-800"
              >
                <span>Join for Free</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ☀️ BRIGHT AIRY HERO SECTION (Exactly like image.png, now full screen with stretched image overlay) */}
      <section className="relative bg-white min-h-screen px-6 flex flex-col items-center justify-start overflow-hidden">
        {/* Full-screen background image stretched to cover */}
        <div className="absolute inset-0 z-0 translate-y-24 sm:translate-y-32 md:translate-y-40 lg:translate-y-48">
          <Image
            src="/images/home/image-copy.png"
            alt="Buddingpreneurs Women Founders Selfie Background"
            fill
            className="object-cover object-center"
            priority
            sizes="100vw"
          />
        </div>

        {/* Text and buttons wrapper overlaid on top */}
        <div className="max-w-4xl mx-auto text-center z-10 relative flex flex-col items-center pt-24 sm:pt-32 pb-16">
          
          {/* Centered Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl sm:text-5xl md:text-[56px] font-black text-[#0f172a] tracking-tight leading-[1.12] mb-6 max-w-3xl font-sans"
          >
            Find Your Tribe,<br />
            Build Your Network.
          </motion.h1>

          {/* Centered Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-[#334155] text-sm sm:text-base md:text-[18px] max-w-xl mx-auto leading-relaxed mb-8 font-semibold font-sans"
          >
            Connect with like-minded creators and founders for growth,<br className="hidden sm:inline" />
            sisterhood, and business opportunities.
          </motion.p>

          {/* Centered Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex items-center justify-center gap-3.5"
          >
            <a
              href="#"
              className="inline-flex items-center gap-1.5 px-6 py-3.5 rounded-full bg-[#0f172a] hover:bg-slate-800 text-white text-xs font-bold transition-all shadow-sm"
            >
              <span>Join for Free</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
            
            <a
              href="#"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white hover:bg-slate-50 border border-slate-200 text-slate-800 text-xs font-bold transition-all shadow-sm"
            >
              <div className="w-5 h-5 rounded-full overflow-hidden border border-slate-200 relative flex-shrink-0">
                <img 
                  src="/images/home/founder.png" 
                  alt="Founder" 
                  className="object-cover w-full h-full"
                />
              </div>
              <span>Explore Communities</span>
            </a>
          </motion.div>
        </div>
      </section>

      {/* 🏆 TRUST & RECOGNITION MARQUEE (Moved outside hero section to sit completely below the image) */}
      <div className="w-full z-20 relative bg-[#f8fafc] pt-6 pb-2 border-b border-slate-200/50">
        <div className="text-center mb-5">
          <span className="text-[10px] font-bold tracking-widest text-slate-400 uppercase flex items-center justify-center gap-2">
            🏆 ACCREDITATIONS & RECOGNITIONS
          </span>
        </div>

        <div className="relative w-full overflow-hidden py-4 bg-white border-y border-slate-200/50 flex items-center select-none shadow-sm">
          <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

          <div className="flex w-max gap-16 animate-marquee-horizontal flex-nowrap">
            {[...Array(3)].map((_, groupIdx) => (
              <div key={groupIdx} className="flex items-center gap-16 flex-shrink-0">
                <span className="text-xs md:text-sm font-semibold font-heading text-slate-500 tracking-wide flex items-center gap-2">
                  🏆 Women Business Council Excellence
                </span>
                <span className="text-xs md:text-sm font-semibold font-heading text-slate-500 tracking-wide flex items-center gap-2">
                  🏅 Startup India Acknowledgment
                </span>
                <span className="text-xs md:text-sm font-semibold font-heading text-slate-500 tracking-wide flex items-center gap-2">
                  ✨ 5/5 Student Rating
                </span>
                <span className="text-xs md:text-sm font-semibold font-heading text-slate-500 tracking-wide flex items-center gap-2">
                  🏢 MSME Certified Platform
                </span>
                <span className="text-xs md:text-sm font-semibold font-heading text-slate-500 tracking-wide flex items-center gap-2">
                  🎓 Uttarakhand Digital Skill Atelier
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>


      {/* 5.3 Who We Are — Intro Strip */}
      <section className="bg-[#FAF8F5] py-20 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-8 items-center">
          <div className="w-full md:w-5/12 relative rounded-2xl overflow-hidden shadow-md">
            <Image 
              src="/images/home/founder.png" 
              width={800}
              height={1000}
              className="w-full h-auto object-cover object-top" 
              alt="Buddingpreneurs Founder" 
            />
          </div>
          <div className="w-full md:w-1/12 flex justify-start md:justify-center">
            <span className="text-[#6B6B6B] text-sm font-semibold tracking-widest uppercase md:-rotate-90 md:block inline-block transform origin-center whitespace-nowrap">
              Who we are
            </span>
          </div>
          <div className="w-full md:w-6/12">
            <h2 className="text-[#1A1A1A] text-2xl sm:text-3xl md:text-4xl leading-relaxed font-sans font-medium">
              Buddingpreneurs is a vibrant community dedicated to <span className="italic text-[#C9540A] font-serif font-bold">empowering Indian women</span> through skill development, collaboration, and support, fostering independence and economic growth in their entrepreneurial journeys. We believe in the power of community to help women <span className="italic text-[#C9540A] font-serif font-bold">turn ideas into income</span>.
            </h2>
          </div>
        </div>
      </section>

      {/* 5.4 Our Programs Section */}
      <section className="bg-white py-24 px-6 border-b border-[#E8E4DF]">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-end mb-12">
            <h2 className="text-4xl text-[#1A1A1A] font-sans font-bold">
              Our <span className="italic text-[#C9540A] font-serif">Programs</span>
            </h2>
            <div className="flex gap-4 mt-6 sm:mt-0">
              <button className="w-10 h-10 rounded-full border border-[#E8E4DF] flex items-center justify-center hover:border-[#C9540A] hover:text-[#C9540A] transition-colors"><ChevronLeft className="w-5 h-5" /></button>
              <button className="w-10 h-10 rounded-full border border-[#E8E4DF] flex items-center justify-center hover:border-[#C9540A] hover:text-[#C9540A] transition-colors"><ChevronRight className="w-5 h-5" /></button>
            </div>
          </div>
          
          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Card 1 */}
            <div className="bg-[#F4F1ED] rounded-xl p-8 transition-transform hover:-translate-y-2 hover:shadow-lg duration-300">
              <Sparkles className="w-8 h-8 text-[#C9540A] mb-6" strokeWidth={1.5} />
              <h3 className="text-lg font-bold text-[#1A1A1A] mb-3">Brand Promotion</h3>
              <p className="text-[#6B6B6B] text-sm leading-relaxed mb-6">Participate in workshops focused on brand promotion and technical skills for aspiring women entrepreneurs.</p>
              <a href="#" className="text-xs font-semibold text-[#1A1A1A] uppercase tracking-wider border-b border-[#1A1A1A] pb-1 hover:text-[#C9540A] hover:border-[#C9540A] transition-colors">Read More</a>
            </div>

            {/* Card 2 */}
            <div className="bg-[#F4F1ED] rounded-xl p-8 transition-transform hover:-translate-y-2 hover:shadow-lg duration-300">
              <TrendingUp className="w-8 h-8 text-[#C9540A] mb-6" strokeWidth={1.5} />
              <h3 className="text-lg font-bold text-[#1A1A1A] mb-3">Marketing Strategies</h3>
              <p className="text-[#6B6B6B] text-sm leading-relaxed mb-6">Leverage our community resources for effective marketing strategies and organic reach to your target audience.</p>
              <a href="#" className="text-xs font-semibold text-[#1A1A1A] uppercase tracking-wider border-b border-[#1A1A1A] pb-1 hover:text-[#C9540A] hover:border-[#C9540A] transition-colors">Read More</a>
            </div>

            {/* Card 3 */}
            <div className="bg-[#F4F1ED] rounded-xl p-8 transition-transform hover:-translate-y-2 hover:shadow-lg duration-300">
              <Heart className="w-8 h-8 text-[#C9540A] mb-6" strokeWidth={1.5} />
              <h3 className="text-lg font-bold text-[#1A1A1A] mb-3">Holistic Wellness</h3>
              <p className="text-[#6B6B6B] text-sm leading-relaxed mb-6">Promoting inner strength and balance through guided yoga, meditation, and holistic wellness practices tailored for women.</p>
              <a href="#" className="text-xs font-semibold text-[#1A1A1A] uppercase tracking-wider border-b border-[#1A1A1A] pb-1 hover:text-[#C9540A] hover:border-[#C9540A] transition-colors">Read More</a>
            </div>

            {/* Card 4 */}
            <div className="bg-[#F4F1ED] rounded-xl p-8 transition-transform hover:-translate-y-2 hover:shadow-lg duration-300">
              <Laptop className="w-8 h-8 text-[#C9540A] mb-6" strokeWidth={1.5} />
              <h3 className="text-lg font-bold text-[#1A1A1A] mb-3">Start-up Program</h3>
              <p className="text-[#6B6B6B] text-sm leading-relaxed mb-6">With the right skills, guidance, and community, women can turn simple ideas into powerful ventures and achieve independence.</p>
              <a href="#" className="text-xs font-semibold text-[#1A1A1A] uppercase tracking-wider border-b border-[#1A1A1A] pb-1 hover:text-[#C9540A] hover:border-[#C9540A] transition-colors">Read More</a>
            </div>
          </div>
        </div>
      </section>

      {/* 5.5 Quote + About Us Block */}
      <section className="bg-[#FAF8F5] py-24 px-6">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 items-center">
          {/* Left Quote */}
          <div className="w-full lg:w-5/12 bg-[#1A1A1A] rounded-2xl p-12 relative overflow-hidden">
            <div className="absolute top-8 left-8 text-[#C9540A] text-6xl font-serif leading-none opacity-50">"</div>
            <h3 className="text-white text-3xl font-sans font-medium leading-tight relative z-10 mt-8">
              Every big journey begins with a small step — and at Buddingpreneur, we help women take that first leap.
            </h3>
            <div className="absolute -bottom-10 -right-10 opacity-10">
              <Sparkles className="w-64 h-64 text-white" />
            </div>
          </div>
          
          {/* Right About Us */}
          <div className="w-full lg:w-7/12">
            <span className="text-[#C9540A] text-sm font-semibold italic mb-4 block">About Us</span>
            <h2 className="text-4xl text-[#1A1A1A] font-bold font-sans mb-6">
              Celebrating <span className="italic text-[#C9540A] font-serif">Women-Led</span> Businesses
            </h2>
            <p className="text-[#6B6B6B] text-base leading-relaxed mb-10 max-w-2xl">
              Turning Skills into Startups for Indian Women. Connect, Collaborate, Grow. Whether it’s starting a home business, learning new skills, or building a personal brand — we grow stronger, together.
            </p>
            
            {/* Stats Row */}
            <div className="grid grid-cols-3 gap-8 pt-8 border-t border-[#E8E4DF]">
              <div>
                <div className="text-3xl font-black text-[#C9540A] mb-1">500+</div>
                <div className="text-xs text-[#6B6B6B] uppercase tracking-wider font-semibold">Women Empowered</div>
              </div>
              <div>
                <div className="text-3xl font-black text-[#C9540A] mb-1">50+</div>
                <div className="text-xs text-[#6B6B6B] uppercase tracking-wider font-semibold">Workshops Hosted</div>
              </div>
              <div>
                <div className="text-3xl font-black text-[#C9540A] mb-1">10+</div>
                <div className="text-xs text-[#6B6B6B] uppercase tracking-wider font-semibold">Industry Awards</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5.7 Testimonials Section */}
      <section className="bg-[#2C1F14] py-24 px-6 relative overflow-hidden flex items-center">
        {/* Background Image right half */}
        <div className="absolute right-0 top-0 bottom-0 w-full lg:w-1/2 opacity-20 pointer-events-none">
          <Image src="/images/home/photo-1590650423710-ffa6e7f63440" fill className="object-cover" alt="Background" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#2C1F14] to-transparent"></div>
        </div>
        
        <div className="max-w-7xl mx-auto w-full relative z-10">
          <span className="text-[#C9540A] text-xs font-bold tracking-widest uppercase mb-4 block">Testimonials</span>
          <h2 className="text-4xl text-white font-sans font-bold mb-16">
            Voices of <span className="italic text-white font-serif">Appreciation</span>
          </h2>
          
          <div className="max-w-2xl min-h-[300px]">
            <div className="flex gap-1 mb-6">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 text-amber-400 fill-amber-400" />)}
            </div>
            
            <div className="relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTestimonial}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.5 }}
                >
                  <p className="text-2xl text-white/90 leading-relaxed font-sans mb-10 min-h-[160px]">
                    "{testimonials[activeTestimonial].quote}"
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-[#C9540A]">
                      <img src={testimonials[activeTestimonial].image} className="w-full h-full object-cover" alt={testimonials[activeTestimonial].name} />
                    </div>
                    <div>
                      <h4 className="text-white font-bold">{testimonials[activeTestimonial].name}</h4>
                      <p className="text-[#C9540A] text-sm">{testimonials[activeTestimonial].role}</p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
            
            {/* Progress indicators */}
            <div className="flex gap-2 mt-8">
              {testimonials.map((_, idx) => (
                <button 
                  key={idx}
                  onClick={() => setActiveTestimonial(idx)}
                  className={`h-1 rounded-full transition-all duration-300 ${activeTestimonial === idx ? 'w-8 bg-[#C9540A]' : 'w-4 bg-white/20 hover:bg-white/40'}`}
                  aria-label={`Go to testimonial ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5.10 CTA Banner Section */}
      <section className="relative py-32 px-6 overflow-hidden flex items-center justify-center text-center">
        {/* Background Image with dark overlay */}
        <div className="absolute inset-0 z-0">
          <Image src="/images/home/421683904-h-768x525-Awv43nB0LnhNaob8.jpg" fill className="object-cover object-center" alt="Lifestyle" />
          <div className="absolute inset-0 bg-[#1A1A1A]/70"></div>
        </div>
        
        <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center">
          <h2 className="text-4xl md:text-5xl text-white font-sans font-bold mb-6">
            Start <span className="italic text-[#C9540A] font-serif">Building</span> Your Future Today
          </h2>
          <p className="text-white/80 text-lg mb-10 max-w-xl">
            Join our community of women entrepreneurs. Reach out for support, collaboration, and skill development.
          </p>
          <a href="#" className="bg-white text-[#1A1A1A] hover:bg-[#FAF8F5] transition-colors px-8 py-4 rounded-full font-bold flex items-center gap-2">
            Join the Community <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </section>

      {/* 5.11 Footer */}
      <footer id="contact" className="py-16 px-6 bg-[#1C1C1C] relative z-10 w-full">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 items-start">
          
          <div className="col-span-1 md:col-span-2">
            <a href="#" className="flex items-center gap-2 mb-6">
              <svg className="w-8 h-8 text-white" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 12C14 12 16 8 18 14C20 20 22 24 28 24" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" />
                <path d="M6 18C10 18 12 15 14 19C16 23 18 25 22 25" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" />
              </svg>
              <span className="text-2xl font-black tracking-tight text-white font-sans lowercase">buddingpreneurs</span>
            </a>
            <p className="text-[#888888] text-sm leading-relaxed max-w-sm font-sans mb-8">
              Indian women entrepreneurs rise here. Join the sisterhood, build your personal brand, set up digital catalogs, and achieve economic self-reliance.
            </p>
            <div className="flex gap-4">
               <a href="#" className="w-10 h-10 rounded-full border border-[#333333] flex items-center justify-center text-white hover:border-[#C9540A] hover:text-[#C9540A] transition-colors">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
               </a>
               <a href="#" className="w-10 h-10 rounded-full border border-[#333333] flex items-center justify-center text-white hover:border-[#C9540A] hover:text-[#C9540A] transition-colors">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                  </svg>
               </a>
               <a href="#" className="w-10 h-10 rounded-full border border-[#333333] flex items-center justify-center text-white hover:border-[#C9540A] hover:text-[#C9540A] transition-colors">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
                  </svg>
               </a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Quick Links</h4>
            <ul className="flex flex-col gap-4 text-sm text-[#888888]">
              <li><a href="#" className="hover:text-white transition-colors">Home</a></li>
              <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Programs</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Community</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Get In Touch</h4>
            <div className="flex flex-col gap-4 text-sm text-[#888888]">
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#C9540A]" />
                <span>{siteMetadata.contactEmail}</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-[#C9540A]" />
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

      {/* ADDITIONAL BRAND STYLING: Marquee continuous animation styles */}
      <style jsx global>{`
        @keyframes marquee-horizontal {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee-horizontal {
          animation: marquee-horizontal 25s linear infinite;
        }
        .animate-marquee-horizontal:hover {
          animation-play-state: paused;
        }
        .animate-spin-slow {
          animation: spin 12s linear infinite;
        }
      `}</style>
    </div>
  );
}
