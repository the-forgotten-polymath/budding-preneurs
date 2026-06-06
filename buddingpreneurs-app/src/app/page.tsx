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
  const [selectedProgram, setSelectedProgram] = useState<any | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Programs Carousel Ref and Scroll Handlers
  const programsScrollRef = useRef<HTMLDivElement>(null);
  const [isProgramsHovered, setIsProgramsHovered] = useState(false);

  const scrollPrograms = (direction: "left" | "right") => {
    if (!programsScrollRef.current) return;
    const container = programsScrollRef.current;
    const scrollAmount = container.clientWidth * 0.8;
    container.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth"
    });
  };

  // Smooth Auto-scroll program slider loop
  useEffect(() => {
    const container = programsScrollRef.current;
    if (!container) return;

    let intervalId: NodeJS.Timeout;

    if (!isProgramsHovered) {
      intervalId = setInterval(() => {
        const { scrollLeft, scrollWidth, clientWidth } = container;
        // If we are at the end, wrap back to the beginning
        if (scrollLeft + clientWidth >= scrollWidth - 10) {
          container.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          container.scrollBy({ left: clientWidth * 0.8, behavior: "smooth" });
        }
      }, 4000);
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [isProgramsHovered]);

  const allTestimonials = [
    {
      text: "Nothing less than 5 stars... it was here that I got my first pan-India order (out of Maharashtra). The Admin and team @Buddingpreneurs have been very supportive and helpful.",
      name: "Tasnim Soni",
      role: "Founder & Soni Brand, Pune",
      image: "https://images.unsplash.com/photo-1502764613149-7f1d229e230f?w=80&h=80&fit=crop&crop=face"
    },
    {
      text: "No doubts, it's a lovely group and all the sellers are verified and trustworthy. I get most of my orders from this group. Thank you so much!",
      name: "Yuvansh Arora",
      role: "Verified Seller & Merchant, Delhi",
      image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=80&h=80&fit=crop&crop=face"
    },
    {
      text: "A community where we find growth, visibility, skills & the best supporting environment. Thank you Buddingpreneurs!",
      name: "Disha Jotwani",
      role: "Creative Entrepreneur, Maharashtra",
      image: "https://images.unsplash.com/photo-1614204424926-197290e96b97?w=80&h=80&fit=crop&crop=face"
    },
    {
      text: "Before Buddingpreneurs, I had no idea how to scale or pitch my brand. It has something unique—it's thoughtful, inclusive, and high quality. I trust this platform to help me grow—not just my business, but myself.",
      name: "Mili Sirohi",
      role: "Professional Artist, Founder of the brand Platefuls_of_Art",
      image: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=80&h=80&fit=crop&crop=face"
    },
    {
      text: "Hi, I’m a seller on this platform. I do live sessions for imported luxury perfumes and international cosmetics. The team here is very supportive, especially the admin Sasmita Behera 🤝. Though it was my very first live, I still got a few orders, which gave me so much confidence and motivation ❤️",
      name: "Meenal Maheshware",
      role: "Importer & Cosmetic Seller, Indore",
      image: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=80&h=80&fit=crop&crop=face"
    },
    {
      text: "Appreciation for Buddingpreneurs ✨. After joining this wonderful community, my page has gained so much visibility and growth. The support, guidance, and encouragement here are truly amazing. A heartfelt thank you to the Buddingpreneurs community for creating such a positive and empowering space. Grateful to be a part of this journey 🤍✨",
      name: "Shraddha creation",
      role: "Handmade Crafts Founder, Pune",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&h=80&fit=crop&crop=face"
    },
    {
      text: "Buddingpreneurs is truly an amazing platform for women working from home. A heartfelt thank you to Sasmita Mam for her constant guidance and support. Because of this group, I have received genuine orders and started earning confidently. It’s a wonderful space for women who want to grow and build something of their own.",
      name: "Chandni Amish Ladani",
      role: "Home Entrepreneur, Gujarat",
      image: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=80&h=80&fit=crop&crop=face"
    },
    {
      text: "When I joined this group, I thought it was like any other group. But after some time, I found Buddingpreneurs is a different group. It is very much helpful for entrepreneurs like me. Specifically their Canva session—it was an eye opener. I learned so many things about a very difficult topic. Here I met many talented people. Thanks Buddingpreneurs, amazing group.",
      name: "Rekha Agarwal",
      role: "Art & Graphic Designer, Dehradun",
      image: "https://images.unsplash.com/photo-1521252659862-eec69941b071?w=80&h=80&fit=crop&crop=face"
    },
    {
      text: "Buddingpreneurs has been an invaluable resource for learning, networking, and refining entrepreneurial skills. We trust Buddingpreneurs. Must try… see the difference.",
      name: "Nirmala Chib",
      role: "Entrepreneur, Brand TVAREETAZ, MD",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face"
    },
    {
      text: "Buddingpreneurs has helped me transition from running a localized home setup to receiving inquiries and client bookings from all parts of India. Truly amazing platform!",
      name: "Shikha Gupta",
      role: "Baking Entrepreneur, Pune",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=80&h=80&fit=crop&crop=face"
    },
    {
      text: "As a woman running a boutique, finding a trustworthy audience is tough. This platform verified my seller status, immediately establishing trust and driving regular client leads.",
      name: "Punam Das",
      role: "Fashion Designer, Dehradun",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=80&h=80&fit=crop&crop=face"
    },
    {
      text: "Calling all women entrepreneurs! If you're looking for a space that's safe, supportive, and rich with resources, Buddingpreneurs is exactly where you need to be. This platform has helped me grow—not just my business, but also my confidence, mindset, and network.",
      name: "Nivedita Shahi",
      role: "A passionate Home Baker, Owner of Sweet Smile Bake",
      image: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=80&h=80&fit=crop&crop=face"
    },
    {
      text: "The organic networking opportunities here are genuine. Buddingpreneurs isn't just a list directory; it's an active community that helps you grow and shine.",
      name: "Lekhakraj K R",
      role: "Creative Designer, Bangalore",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&h=80&fit=crop&crop=face"
    },
    {
      text: "Buddingpreneurs can be considered as a perfect example of a harmonious blend of mentorship and networking. It nurtures aspiring entrepreneurs and turns their ideas into successful ventures.",
      name: "Anamika Sarkar",
      role: "Professional Artist/Crafter, Founder of ana_creationz",
      image: "https://images.unsplash.com/photo-1543132220-3ec99c5994fc?w=80&h=80&fit=crop&crop=face"
    },
    {
      text: "Hello everyone, I am Megha, founder of M3 Foods. When M3 Foods was starting its business on social media, the first networking site which I met was Buddingpreneurs. This platform helped me scale my business; it's safe, supportive & resourceful for all women entrepreneurs. I trust this platform for my business growth.",
      name: "Megha Berry Arora",
      role: "Owner at M3 Foods (Homemade Masalas & Calorie-free Snacks)",
      image: "https://images.unsplash.com/photo-1534751516642-a131fed10495?w=80&h=80&fit=crop&crop=face"
    },
    {
      text: "Buddingpreneurs platform is very encouraging & helpful for all women entrepreneurs. This group helps me to rise further not only in business, but also encourages me in my personality development.",
      name: "Tanu Winkle Kohli",
      role: "Brand Owner at TK Closet (Clothing and Handbags)",
      image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=80&h=80&fit=crop&crop=face"
    },
    {
      text: "Buddingpreneur platform is safe, supportive, and deeply resourceful for all women entrepreneurs. I trust this platform to reach out to people who are interested in working on their health at all levels—spiritually, mentally, and physically.",
      name: "Dr. Aradhana Singh",
      role: "Yoga and Fitness Expert",
      image: "https://images.unsplash.com/photo-1548142813-c348350df52b?w=80&h=80&fit=crop&crop=face"
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
          <a href="/" className={`flex items-center gap-2.5 group transition-all duration-300 ${isScrolled ? "opacity-100 translate-y-0" : "lg:opacity-0 lg:-translate-y-4 lg:pointer-events-none"}`}>
            <div className="w-9 h-9 rounded-full overflow-hidden border border-slate-200 bg-white relative flex-shrink-0">
              <img 
                src="/brand_logo.png" 
                alt="Buddingpreneurs Brand Logo" 
                className="object-cover w-full h-full"
              />
            </div>
            <div className="flex flex-col items-start leading-tight">
              <span className="text-sm font-black tracking-tight text-[#0f172a] font-sans relative pr-3">
                Buddingpreneurs
                <span className="absolute top-0 right-0 inline-flex items-center justify-center border border-[#0f172a] rounded-full w-2 h-2 text-[5px] font-bold leading-none select-none">R</span>
              </span>
              <span className="text-[7.5px] font-bold text-[#C9540A] tracking-tight font-sans">
                A Collaborative Ecosystem for Women Entrepreneurs
              </span>
            </div>
          </a>

          {/* Center Navigation links */}
          <nav className="hidden lg:flex flex-nowrap items-center justify-center gap-3 xl:gap-5 whitespace-nowrap">
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
        <div className="absolute inset-0 z-0 translate-y-36 sm:translate-y-44 md:translate-y-56 lg:translate-y-64">
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
        <div className="max-w-4xl mx-auto text-center z-10 relative flex flex-col items-center pt-20 sm:pt-24 pb-16">
          
          {/* Brand Logo, Name & Tagline horizontal layout (No container) */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-row items-center justify-center gap-5 sm:gap-6 mb-8 select-none pointer-events-none max-w-full"
          >
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden border-2 border-slate-200 bg-white relative shadow-md flex-shrink-0">
              <img 
                src="/brand_logo.png" 
                alt="Buddingpreneurs Brand Logo" 
                className="object-cover w-full h-full"
              />
            </div>
            <div className="flex flex-col justify-center items-start text-left">
              <span className="text-3xl sm:text-5xl font-black tracking-tight text-[#0f172a] font-sans relative pr-5 leading-none">
                Buddingpreneurs
                <span className="absolute top-0 right-0 inline-flex items-center justify-center border border-[#0f172a] rounded-full w-2.5 h-2.5 text-[5px] font-bold leading-none select-none">R</span>
              </span>
              <span className="text-xs sm:text-base font-bold text-[#C9540A] tracking-tight font-sans mt-2 leading-none">
                A Collaborative Ecosystem for Women Entrepreneurs
              </span>
            </div>
          </motion.div>

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
            Join India's Women Entrepreneurs Community for Growth,<br className="hidden sm:inline" />
            Visibility & Business Opportunities
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
                  💬 WhatsApp Community has 500+ Members
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
              <button 
                onClick={() => scrollPrograms("left")}
                className="w-10 h-10 rounded-full border border-[#E8E4DF] flex items-center justify-center hover:border-[#C9540A] hover:text-[#C9540A] transition-colors"
                title="Scroll Left"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button 
                onClick={() => scrollPrograms("right")}
                className="w-10 h-10 rounded-full border border-[#E8E4DF] flex items-center justify-center hover:border-[#C9540A] hover:text-[#C9540A] transition-colors"
                title="Scroll Right"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
          
          {/* Scrollable Container of Programs */}
          <div 
            ref={programsScrollRef}
            onMouseEnter={() => setIsProgramsHovered(true)}
            onMouseLeave={() => setIsProgramsHovered(false)}
            className="flex gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-6 hide-scrollbar"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {[
              { 
                title: "BP Podcast Series", 
                tagline: "Amplifying Entrepreneurial Voices, One Story at a Time",
                image: "/images/programs/podcast-series.jpeg", 
                desc: "Join the Buddingpreneurs® Podcast Series, where we feature inspiring stories from women founders across India. Get key business insights, learn expert strategies, discover marketing tips, and learn how to build your own personal brand. Broadcasted live on active social platforms weekly.",
                bullets: [
                  "Inspiring Founder Stories from real women building home businesses",
                  "Business Growth Insights & expert tips on scaling your brand",
                  "Marketing & Visibility tips tailored for digital platforms",
                  "Personal Branding strategies to stand out in your industry"
                ]
              },
              { 
                title: "Virtual Networking Meet", 
                tagline: "Connect, Collaborate, & Grow Together",
                image: "/images/programs/virtual-networking.jpeg", 
                desc: "Virtual Meets designed specifically for networking and collaborative partnerships. Connect with a powerful community of women entrepreneurs, exchange high-value referrals, and establish partnerships to grow your business.",
                bullets: [
                  "Ice Breaker & introductory round tables to showcase your business",
                  "Structured Networking sessions designed to build real relationships",
                  "Collaboration & Partnership Opportunities for business growth",
                  "Referral Exchanges & direct customer leads within the community"
                ]
              },
              { 
                title: "Women of Impact Awards 2026", 
                tagline: "Celebrating Vision, Fostering Impact, Inspiring Generations",
                image: "/images/programs/women-of-impact.jpeg", 
                desc: "The flagship annual awards recognition program celebrating outstanding achievements by women entrepreneurs, social impact pioneers, and grassroots leaders. Be nominated, recognized, and celebrate alongside the top minds in the industry.",
                bullets: [
                  "Recognizing excellence in women-led startups across India",
                  "Honoring social impact pioneers making a tangible difference",
                  "Inspiring generations of aspiring young women entrepreneurs",
                  "Annual gala and community showcase celebration event"
                ]
              },
              { 
                title: "Live Showcase", 
                tagline: "Your Stage, Your Story, Your Impact",
                image: "/images/programs/live-showcase.jpeg", 
                desc: "Take the stage to highlight your business offerings directly. Host a dedicated interactive session via Zoom, stream live to our Facebook community, engage with a highly supportive group, and answer live Q&A to drive leads and build authority.",
                bullets: [
                  "Zoom Live Showcase session to present your deliverables",
                  "Cross-posted Facebook Live reaching thousands of active viewers",
                  "Real-time customer Q&A to build trust and authority",
                  "Direct lead collection and customer inquiry routing"
                ]
              },
              { 
                title: "Associate Partner Program", 
                tagline: "Empowering Women, Building Stronger Futures",
                image: "/images/programs/associate-partner.jpeg", 
                desc: "A collaborative partnership framework for active networkers, community builders, and local organizers. Gain co-branding rights, speaker visibility, referral commissions, co-host opportunities, and VIP WhatsApp access with our administrative support.",
                bullets: [
                  "Official co-branding rights & Associate Partner digital badge",
                  "Co-hosting privileges for local meets & workshops",
                  "High-tier affiliate commission rates on new memberships",
                  "Direct support line with Buddingpreneurs administrator team"
                ]
              },
              { 
                title: "Digital Skills & Growth", 
                tagline: "Learn, Upskill, Grow, & Succeed",
                image: "/images/programs/digital-skills.jpeg", 
                desc: "A comprehensive digital skill training roadmap covering Business Strategy, Social Media Marketing, E-commerce Operations, Sales & Client Acquisition, Canva Design, Canva Pro tricks, Personal Branding, and Growth Mentorship to help scale your daily output.",
                bullets: [
                  "Step-by-step Social Media Marketing & content creation guides",
                  "Digital tools & automation checklists (using AI tools)",
                  "Branding, design templates & Canva skill-building courses",
                  "E-commerce setup guidance from domain industry experts"
                ]
              },
              { 
                title: "Membership Benefits", 
                tagline: "Empowering Women Startups Since January 2017",
                image: "/images/programs/membership-benefits.jpeg", 
                desc: "Become a member of the Buddingpreneurs network to gain business visibility, direct networking access, speaking opportunities, lead generation pipelines, digital training workshops, resource access, and exclusive WhatsApp group access.",
                bullets: [
                  "Full WhatsApp Inner Circle posting access & VIP support",
                  "Premium member profile in the verified business directory",
                  "Priority leads distribution & customer matchmaking",
                  "Free entry to all live monthly workshops & meets"
                ]
              },
              { 
                title: "Mentorship & Leadership", 
                tagline: "Lead. Inspire. Empower. Grow Together.",
                image: "/images/programs/mentorship-leadership.jpeg", 
                desc: "A curated coaching accelerator program connecting emerging founders with established mentors. Features 1-on-1 strategy sessions, peer-to-peer accountability circles, leadership development, business audit checklists, and scaling advice.",
                bullets: [
                  "1-on-1 mentorship strategy sessions with industry leaders",
                  "Leadership training, public speaking & brand strategy coaching",
                  "Peer mastermind circles to discuss business challenges",
                  "Business audit checklists and goal-tracking milestones"
                ]
              }
            ].map((program, index) => (
              <div 
                key={index} 
                onClick={() => setSelectedProgram(program)}
                className="w-[280px] sm:w-[320px] shrink-0 snap-start bg-white rounded-xl overflow-hidden transition-transform hover:-translate-y-2 hover:shadow-xl duration-300 border border-[#E8E4DF] flex flex-col cursor-pointer group"
              >
                <div className="relative w-full aspect-[4/5] bg-[#FAF8F5]">
                  <Image 
                    src={program.image}
                    alt={program.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 25vw, 20vw"
                    className="object-contain p-2 group-hover:scale-[1.02] transition-transform duration-300"
                  />
                </div>
                <div className="p-5 flex-grow flex flex-col justify-between border-t border-[#E8E4DF]">
                  <h3 className="text-md font-bold text-[#1A1A1A] mb-3 leading-tight line-clamp-2">{program.title}</h3>
                  <button 
                    type="button"
                    className="text-[10px] font-bold text-[#C9540A] uppercase tracking-wider group-hover:text-[#1A1A1A] transition-colors self-start mt-2"
                  >
                    View Details &rarr;
                  </button>
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
                <p className="text-3xl font-black text-[#C9540A] mb-4">500+ Members</p>
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
              testimonials={allTestimonials.slice(0, 6)}
              duration={18}
            />
            <TestimonialsColumn
              testimonials={allTestimonials.slice(6, 12)}
              className="hidden md:block"
              duration={22}
            />
            <TestimonialsColumn
              testimonials={allTestimonials.slice(12, 17)}
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

      {/* Program Details Modal Overlay */}
      <AnimatePresence>
        {selectedProgram && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6">
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/75 backdrop-blur-sm"
              onClick={() => setSelectedProgram(null)}
            />
            
            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="bg-white rounded-3xl overflow-hidden shadow-2xl relative z-10 w-full max-w-4xl max-h-[90vh] md:max-h-[85vh] flex flex-col md:flex-row border border-[#E8E4DF]"
            >
              {/* Close Button */}
              <button 
                onClick={() => setSelectedProgram(null)}
                className="absolute top-4 right-4 z-20 p-2.5 bg-black/60 hover:bg-black/80 md:bg-white/80 md:hover:bg-white text-white md:text-[#1A1A1A] rounded-full transition-colors shadow-md"
                title="Close"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Left Column: Poster Image Preview */}
              <div className="w-full md:w-1/2 bg-[#FAF8F5] relative flex items-center justify-center p-6 border-b md:border-b-0 md:border-r border-[#E8E4DF] h-[260px] md:h-auto shrink-0 md:shrink">
                <div className="relative w-full h-full max-h-[350px] md:max-h-full">
                  <Image 
                    src={selectedProgram.image} 
                    alt={selectedProgram.title} 
                    fill 
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-contain"
                  />
                </div>
              </div>

              {/* Right Column: Scrollable Textual Description */}
              <div className="w-full md:w-1/2 p-6 md:p-8 overflow-y-auto flex flex-col justify-between">
                <div>
                  {/* Category label */}
                  <span className="text-[10px] font-black uppercase tracking-wider text-[#C9540A] bg-[#C9540A]/10 px-2.5 py-1 rounded-md inline-block mb-3">
                    Buddingpreneurs Program
                  </span>
                  
                  {/* Title & Tagline */}
                  <h2 className="text-2xl md:text-3xl font-black text-[#1A1A1A] font-display uppercase tracking-tight mb-2 leading-tight">
                    {selectedProgram.title}
                  </h2>
                  <p className="text-sm font-semibold italic text-[#C9540A] font-serif mb-5 leading-relaxed">
                    {selectedProgram.tagline}
                  </p>
                  
                  {/* Main Description */}
                  <p className="text-[#6B6B6B] text-sm leading-relaxed mb-6 font-medium">
                    {selectedProgram.desc}
                  </p>
                  
                  {/* Bullet points */}
                  <div className="mb-8">
                    <h4 className="text-xs font-black uppercase tracking-wider text-[#1A1A1A] mb-3">Program Highlights:</h4>
                    <ul className="space-y-2.5">
                      {selectedProgram.bullets.map((bullet: string, idx: number) => (
                        <li key={idx} className="flex items-start gap-2.5 text-xs text-[#6B6B6B] font-medium leading-relaxed">
                          <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* CTAs */}
                <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-[#E8E4DF] mt-auto">
                  <a 
                    href="/contact" 
                    onClick={() => setSelectedProgram(null)}
                    className="flex-1 py-3 px-6 bg-[#C9540A] hover:bg-[#A8420A] text-white rounded-xl text-center text-xs font-bold transition-all shadow-md flex items-center justify-center gap-1.5"
                  >
                    Join Program Now <ArrowRight className="w-4 h-4" />
                  </a>
                  <button 
                    type="button"
                    onClick={() => setSelectedProgram(null)}
                    className="py-3 px-6 bg-[#FAF8F5] hover:bg-[#F4F1ED] text-[#1A1A1A] border border-[#E8E4DF] rounded-xl text-center text-xs font-bold transition-all"
                  >
                    Back to Programs
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

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
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}
