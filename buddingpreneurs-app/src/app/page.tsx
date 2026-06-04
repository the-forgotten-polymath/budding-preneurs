"use client";

import React, { useState, useEffect, useRef } from "react";
import NavAuth from "@/components/NavAuth";
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
import Footer from "@/components/Footer";
import { TestimonialsColumn } from "@/components/ui/testimonials-columns";

export default function Home() {
  const [activeTab, setActiveTab] = useState<string>("platform");
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const allTestimonials = [
    {
      text: "Buddingpreneurs completely changed my life. I went from a simple idea scribbled in a notebook to running a fully operational home business. The digital marketing skills and brand promotion strategies I learned here were absolutely invaluable.",
      name: "Priya Sharma",
      role: "Startup Founder, Pune",
      image: "https://images.unsplash.com/photo-1502764613149-7f1d229e230f?w=80&h=80&fit=crop&crop=face"
    },
    {
      text: "The community support at Buddingpreneurs is truly unmatched. Connecting with 7,000+ women on the same journey gave me the courage and confidence I needed to finally launch my boutique.",
      name: "Ananya Desai",
      role: "Boutique Owner, Mumbai",
      image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=80&h=80&fit=crop&crop=face"
    },
    {
      text: "Within just one month of attending the digital marketing workshop, my online sales literally tripled. The practical strategies here are real, actionable, and tailored for women entrepreneurs like me.",
      name: "Ritu Verma",
      role: "Freelance Designer, Delhi",
      image: "https://images.unsplash.com/photo-1614204424926-197290e96b97?w=80&h=80&fit=crop&crop=face"
    },
    {
      text: "I always dreamed of my own bakery but the business setup process scared me. Buddingpreneurs guided me step by step, from GST registration to Instagram branding. Today I'm economically independent!",
      name: "Meera Patel",
      role: "Home Baker & Founder, Ahmedabad",
      image: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=80&h=80&fit=crop&crop=face"
    },
    {
      text: "The B2B networking sessions connected me to clients I never would have found on my own. Within two months of joining, I signed three corporate deals for my consultancy firm.",
      name: "Sunita Agarwal",
      role: "Business Consultant, Bangalore",
      image: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=80&h=80&fit=crop&crop=face"
    },
    {
      text: "As a single mother starting from scratch, I was terrified. Buddingpreneurs not only gave me skills but a sisterhood. My handmade jewellery brand now ships Pan-India and I have 40+ wholesale clients.",
      name: "Kavitha Nair",
      role: "Jewellery Entrepreneur, Kochi",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&h=80&fit=crop&crop=face"
    },
    {
      text: "The visibility I gained through Buddingpreneurs' directory and features was phenomenal. My coaching practice went from 3 clients to a full waitlist in under 6 months!",
      name: "Deepika Malhotra",
      role: "Life Coach & Speaker, Gurugram",
      image: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=80&h=80&fit=crop&crop=face"
    },
    {
      text: "Buddingpreneurs' workshops on AI tools for business were a game-changer. I automated my entire content calendar and saved 15 hours a week, which I now invest in growing my brand.",
      name: "Nisha Gupta",
      role: "Content Creator & D2C Founder, Jaipur",
      image: "https://images.unsplash.com/photo-1521252659862-eec69941b071?w=80&h=80&fit=crop&crop=face"
    },
    {
      text: "I came from a small town with big dreams and zero network. Buddingpreneurs connected me to mentors, collaborators, and customers across India. My saree brand is now a thriving D2C success story.",
      name: "Rekha Yadav",
      role: "Ethnic Wear Founder, Lucknow",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face"
    },
    {
      text: "The pricing and financial literacy sessions completely changed how I valued my work. I stopped under-pricing my services and doubled my revenue in just 3 months after the workshop.",
      name: "Pooja Iyer",
      role: "Graphic Designer, Chennai",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=80&h=80&fit=crop&crop=face"
    },
    {
      text: "Joining Buddingpreneurs was the best business decision I ever made. The strategic partnerships I formed here helped me land my first B2B client worth ₹5 lakhs within 60 days.",
      name: "Shruti Kapoor",
      role: "HR Consultant, Hyderabad",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=80&h=80&fit=crop&crop=face"
    },
    {
      text: "The mentorship and the real-world case studies at Buddingpreneurs workshops gave me practical knowledge no MBA program could. My food startup is now profitable and expanding to 3 new cities!",
      name: "Lalita Sharma",
      role: "Food Startup Founder, Bhopal",
      image: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=80&h=80&fit=crop&crop=face"
    }
  ];

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
          <a href="/" className="flex items-center gap-2 group">
            <span className="text-xl font-black tracking-tight text-[#0f172a] font-sans">
              Buddingpreneurs
            </span>
          </a>

          {/* Center Navigation links */}
          <nav className="hidden lg:flex flex-wrap items-center justify-center gap-4 xl:gap-6">
            <a href="/" className="text-[11px] xl:text-xs font-semibold text-[#1A1A1A] hover:text-[#C9540A] transition-colors">Home</a>
            <a href="/workshops" className="text-[11px] xl:text-xs font-semibold text-[#1A1A1A] hover:text-[#C9540A] transition-colors">Workshops</a>
            <a href="/community" className="text-[11px] xl:text-xs font-semibold text-[#1A1A1A] hover:text-[#C9540A] transition-colors">Community</a>
            <a href="/directory" className="text-[11px] xl:text-xs font-semibold text-[#1A1A1A] hover:text-[#C9540A] transition-colors">Directory</a>
            <a href="/blog" className="text-[11px] xl:text-xs font-semibold text-[#1A1A1A] hover:text-[#C9540A] transition-colors">Blog</a>
            <a href="/programs" className="text-[11px] xl:text-xs font-semibold text-[#1A1A1A] hover:text-[#C9540A] transition-colors">Our Programs</a>
            <a href="/business-plan" className="text-[11px] xl:text-xs font-semibold text-[#1A1A1A] hover:text-[#C9540A] transition-colors">Business Plan</a>
            <a href="/disclaimer" className="text-[11px] xl:text-xs font-semibold text-[#1A1A1A] hover:text-[#C9540A] transition-colors">Disclaimer</a>
            <a href="/about" className="text-[11px] xl:text-xs font-semibold text-[#1A1A1A] hover:text-[#C9540A] transition-colors">About us</a>
            <a href="/contact" className="text-[11px] xl:text-xs font-semibold text-[#1A1A1A] hover:text-[#C9540A] transition-colors">Contact</a>
          </nav>

          {/* Call to action button */}
          <div className="flex items-center gap-2 sm:gap-4">
            <NavAuth />
            
            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-1.5 sm:p-2 text-[#1A1A1A] hover:bg-gray-200 rounded-full transition-colors z-50 relative"
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
              {['Home', 'Workshops', 'Community', 'Directory', 'Blog', 'Our Programs', 'Business Plan', 'Disclaimer', 'About us', 'Contact'].map((item) => (
                <a
                  key={item}
                  href={item === 'Home' ? '/' : item === 'Our Programs' ? '/programs' : item === 'About us' ? '/about' : `/${item.toLowerCase().replace(' ', '-')}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-lg font-semibold text-[#1A1A1A] hover:text-[#C9540A] transition-colors"
                >
                  {item}
                </a>
              ))}
              
              <div className="w-12 h-px bg-slate-200 my-4" />
              
              <a
                href="/business-plan"
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
              href="/business-plan"
              className="inline-flex items-center gap-1.5 px-6 py-3.5 rounded-full bg-[#C9540A] hover:bg-[#A8420A] text-white text-xs font-bold transition-all shadow-sm"
            >
              <span>Join for Free</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
            
            <a
              href="/community"
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
      <div className="w-full z-20 relative bg-[#f8fafc] border-b border-slate-200/50">
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
                  💬 WhatsApp Community has 300+ Members
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
              src="/images/home/founder-new.png" 
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
          
          {/* Grid of Programs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "BP Podcast Series", image: "/images/programs/podcast-series.jpeg", link: "#podcast" },
              { title: "Virtual Networking Meet", image: "/images/programs/virtual-networking.jpeg", link: "#networking" },
              { title: "Women of Impact Awards 2026", image: "/images/programs/women-of-impact.jpeg", link: "#awards" },
              { title: "Live Showcase", image: "/images/programs/live-showcase.jpeg", link: "#showcase" },
              { title: "Associate Partner Program", image: "/images/programs/associate-partner.jpeg", link: "#partner" },
              { title: "Digital Skills & Growth", image: "/images/programs/digital-skills.jpeg", link: "#skills" },
              { title: "Membership Benefits", image: "/images/programs/membership-benefits.jpeg", link: "#membership" },
              { title: "Mentorship & Leadership", image: "/images/programs/mentorship-leadership.jpeg", link: "#mentorship" }
            ].map((program, index) => (
              <div key={index} className="bg-white rounded-xl overflow-hidden transition-transform hover:-translate-y-2 hover:shadow-xl duration-300 border border-[#E8E4DF] flex flex-col">
                <div className="relative w-full aspect-[4/5] bg-[#FAF8F5]">
                  <Image 
                    src={program.image}
                    alt={program.title}
                    fill
                    className="object-contain p-2"
                  />
                </div>
                <div className="p-5 flex-grow flex flex-col justify-between border-t border-[#E8E4DF]">
                  <h3 className="text-md font-bold text-[#1A1A1A] mb-3 leading-tight line-clamp-2">{program.title}</h3>
                  <a href={program.link} className="text-[10px] font-bold text-[#C9540A] uppercase tracking-wider hover:text-[#1A1A1A] transition-colors self-start mt-2">View Details &rarr;</a>
                </div>
              </div>
            ))}
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
            <span className="text-[#C9540A] text-sm font-semibold italic mb-4 block">About Buddingpreneurs®</span>
            <h2 className="text-4xl text-[#1A1A1A] font-bold font-sans mb-6">
              Celebrating <span className="italic text-[#C9540A] font-serif">Women-Led</span> Businesses
            </h2>
            
            {/* Metadata strip */}
            <div className="flex flex-wrap gap-2.5 mb-8 bg-[#F4F1ED] p-4 rounded-xl border border-[#E8E4DF]">
              {[
                "Est. 9th January 2017",
                "7,000+ Women Founders",
                "D2C to B2B",
                "Pan-India",
                "Online"
              ].map((item, idx) => (
                <span key={idx} className="text-xs font-bold text-[#1A1A1A] bg-white px-3 py-1.5 rounded-lg border border-[#E8E4DF] flex items-center">
                  {item}
                </span>
              ))}
            </div>

            <div className="text-[#6B6B6B] text-[15px] leading-relaxed mb-6 max-w-2xl space-y-4">
              <p>
                For over 9 years, <strong>Buddingpreneurs®</strong> has been empowering women entrepreneurs through networking, learning, visibility, collaborations, and business growth opportunities.
              </p>
              <p>
                From D2C brands and service providers to coaches, consultants, freelancers, creators, professionals, and B2B founders, <strong>Buddingpreneurs®</strong> serves as a growth-focused ecosystem where women connect, learn, collaborate, and thrive.
              </p>
              <p>
                Whether you're launching your first product, acquiring your first client, scaling your business, or building strategic partnerships, <strong>Buddingpreneurs®</strong> provides the support, network, and opportunities to help you move forward.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 📊 REAL INSIGHTS: COMMUNITY REACH & FACEBOOK GROUP INSIGHTS */}
      <section className="bg-white py-24 px-6 border-y border-[#E8E4DF] relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-[#C9540A] text-xs font-bold tracking-widest uppercase mb-3 block">
              Network Reach
            </span>
            <h2 className="text-4xl text-[#1A1A1A] font-bold font-sans">
              Our Growing <span className="italic text-[#C9540A] font-serif">Community Reach</span>
            </h2>
            <p className="text-[#6B6B6B] text-base leading-relaxed mt-4 max-w-xl mx-auto">
              Connecting women entrepreneurs across major cities in India, fostering economic independence and strategic sisterhood.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Left Card: WhatsApp Community */}
            <div className="lg:col-span-4 bg-[#FAF8F5] border border-[#E8E4DF] rounded-2xl p-8 md:p-10 flex flex-col justify-between hover:shadow-md transition-shadow duration-300">
              <div>
                <div className="w-14 h-14 rounded-xl bg-[#25D366]/10 text-[#25D366] flex items-center justify-center mb-8">
                  <MessageSquare className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-[#1A1A1A] mb-4">WhatsApp Community</h3>
                <p className="text-3xl font-black text-[#C9540A] mb-4">300+ Members</p>
                <p className="text-sm text-[#6B6B6B] leading-relaxed">
                  Our exclusive WhatsApp group serves as an active, daily sisterhood hub where aspiring and established women entrepreneurs share business leads, support, and collaborate in real-time.
                </p>
              </div>
              <div className="mt-8">
                <a 
                  href="/community" 
                  className="inline-flex items-center gap-2 py-3 px-6 bg-[#25D366] hover:bg-[#1DA851] text-white font-bold rounded-xl text-xs transition-colors shadow-sm"
                >
                  Join Community Group
                </a>
              </div>
            </div>

            {/* Right Card: Facebook Group Insights */}
            <div className="lg:col-span-8 bg-[#1A1A1A] rounded-2xl p-8 md:p-10 flex flex-col justify-between hover:shadow-lg transition-shadow duration-300 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-[#C9540A]/5 translate-x-1/3 -translate-y-1/3 pointer-events-none" />
              
              <div className="relative z-10 w-full">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2">Facebook Group Insights</h3>
                    <p className="text-xs text-[#C9540A] font-semibold tracking-wider uppercase font-mono">Top Cities of Influence</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm px-3.5 py-1.5 rounded-lg border border-white/10 self-start sm:self-center">
                    <span className="text-xs font-bold text-white/90">🇮🇳 PAN-India Network</span>
                  </div>
                </div>

                <p className="text-sm text-white/70 leading-relaxed mb-8 max-w-xl">
                  Analytics directly from our verified women entrepreneur community groups, illustrating our active hubs and high-density engagement centers across major Indian metropolises.
                </p>

                {/* Cities Progress Bars Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
                  {[
                    { city: "Pune, Maharashtra", count: 802 },
                    { city: "Delhi, National Capital", count: 754 },
                    { city: "Mumbai, Maharashtra", count: 371 },
                    { city: "Bangalore, Karnataka", count: 302 },
                    { city: "Kolkata, West Bengal", count: 208 },
                    { city: "Gurugram, Haryana", count: 200 },
                    { city: "Thane, Maharashtra", count: 169 },
                    { city: "Lucknow, Uttar Pradesh", count: 140 },
                    { city: "Jaipur, Rajasthan", count: 121 },
                    { city: "Jabalpur, Madhya Pradesh", count: 106 }
                  ].map((item, index) => {
                    const percentage = (item.count / 802) * 100;
                    return (
                      <div key={index} className="flex flex-col gap-1.5">
                        <div className="flex justify-between text-xs font-bold">
                          <span className="text-white/90 font-medium">{item.city}</span>
                          <span className="text-[#C9540A]">{item.count}</span>
                        </div>
                        <div className="w-full bg-white/10 rounded-full h-1.5 overflow-hidden">
                          <div 
                            className="bg-[#C9540A] h-full rounded-full transition-all duration-500" 
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5.7 Testimonials Section — Scrolling Columns */}
      <section className="bg-[#FAF8F5] py-24 px-6 relative overflow-hidden border-y border-[#E8E4DF]">
        {/* Soft background accent */}
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 60% 50%, rgba(201,84,10,0.04) 0%, transparent 70%)" }} />

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
            className="flex flex-col items-center justify-center text-center max-w-xl mx-auto mb-14"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#E8E4DF] bg-white text-[#C9540A] text-xs font-bold tracking-widest uppercase mb-5 shadow-sm">
              <Star className="w-3.5 h-3.5 fill-[#C9540A] text-[#C9540A]" />
              Community Voices
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-[#1A1A1A] leading-[1.15] mb-4">
              What Our <span className="italic font-serif text-[#C9540A]">Women Founders</span> Say
            </h2>
            <p className="text-[#6B6B6B] text-base leading-relaxed">
              Real stories from 7,000+ women entrepreneurs across India who transformed their lives through Buddingpreneurs.
            </p>
          </motion.div>

          {/* Scrolling Columns Container */}
          <div className="flex justify-center gap-5 mt-4 [mask-image:linear-gradient(to_bottom,transparent,black_18%,black_82%,transparent)] max-h-[720px] overflow-hidden">
            <TestimonialsColumn
              testimonials={allTestimonials.slice(0, 4)}
              duration={18}
            />
            <TestimonialsColumn
              testimonials={allTestimonials.slice(4, 8)}
              className="hidden md:block"
              duration={22}
            />
            <TestimonialsColumn
              testimonials={allTestimonials.slice(8, 12)}
              className="hidden lg:block"
              duration={20}
            />
          </div>
        </div>
      </section>

      {/* 🏆 AWARDS & RECOGNITION — Image Auto-Scroll */}
      <section className="bg-white py-16 px-6 border-y border-[#E8E4DF] relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
            className="flex flex-col items-center text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#E8E4DF] bg-[#FAF8F5] text-[#C9540A] text-xs font-bold tracking-widest uppercase mb-4 shadow-sm">
              <Award className="w-3.5 h-3.5" />
              Awards & Recognition
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-[#1A1A1A] leading-tight">
              Trusted & <span className="italic font-serif text-[#C9540A]">Recognised</span> Nationally
            </h2>
            <p className="text-[#6B6B6B] text-sm mt-3 max-w-md">
              Proud recipients of national acknowledgements celebrating women entrepreneurship in India.
            </p>
          </motion.div>

          {/* Auto-scrolling Image Strip */}
          <div className="relative w-full overflow-hidden">
            {/* Gradient masks */}
            <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

            <div className="flex w-max gap-10 animate-marquee-horizontal flex-nowrap items-center">
              {[...Array(4)].map((_, groupIdx) => (
                <div key={groupIdx} className="flex items-center gap-10 flex-shrink-0">
                  {[
                    { src: "/images/home/Trophy.png", alt: "Women Business Council Excellence Trophy" },
                    { src: "/images/home/Certificate1.png", alt: "MSME Certification" },
                    { src: "/images/home/Certificate2.png", alt: "Startup India Acknowledgment" },
                    { src: "/images/home/Certificate3.png", alt: "Uttarakhand Digital Skill Atelier Certificate" },
                  ].map((img, i) => (
                    <div
                      key={i}
                      className="w-56 h-40 flex-shrink-0 rounded-2xl overflow-hidden border border-[#E8E4DF] bg-[#FAF8F5] shadow-sm hover:shadow-md transition-shadow duration-300 flex items-center justify-center p-3"
                    >
                      <Image
                        src={img.src}
                        alt={img.alt}
                        width={200}
                        height={140}
                        className="w-full h-full object-contain"
                      />
                    </div>
                  ))}
                </div>
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
          <a href="/contact" className="bg-white text-[#1A1A1A] hover:bg-[#FAF8F5] transition-colors px-8 py-4 rounded-full font-bold flex items-center gap-2">
            Join the Community <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </section>

      <Footer />

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
