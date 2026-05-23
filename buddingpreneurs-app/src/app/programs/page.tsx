"use client";

import NavAuth from "@/components/NavAuth";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Menu,
  X,
  CheckCircle2,
  Users,
  Target,
  Briefcase,
  PlayCircle,
  Award,
  Video,
  FileText,
  MessageCircle,
  Star,
  MonitorPlay,
  Mail,
  MapPin
} from "lucide-react";
import Footer from "@/components/Footer";

import { siteMetadata } from "../../data/siteData";

export default function ProgramsPage() {
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
            <a href="/" className="text-[11px] xl:text-xs font-semibold text-[#1A1A1A] hover:text-[#C9540A] transition-colors">Home</a>
            <a href="/workshops" className="text-[11px] xl:text-xs font-semibold text-[#1A1A1A] hover:text-[#C9540A] transition-colors">Workshops</a>
            <a href="/community" className="text-[11px] xl:text-xs font-semibold text-[#1A1A1A] hover:text-[#C9540A] transition-colors">Community</a>
            <a href="/directory" className="text-[11px] xl:text-xs font-semibold text-[#1A1A1A] hover:text-[#C9540A] transition-colors">Directory</a>
            <a href="/blog" className="text-[11px] xl:text-xs font-semibold text-[#1A1A1A] hover:text-[#C9540A] transition-colors">Blog</a>
            <a href="/programs" className="text-[11px] xl:text-xs font-bold text-[#C9540A] transition-colors border-b-2 border-[#C9540A] pb-1">Our Programs</a>
            <a href="/business-plan" className="text-[11px] xl:text-xs font-semibold text-[#1A1A1A] hover:text-[#C9540A] transition-colors">Business Plan</a>
            <a href="/disclaimer" className="text-[11px] xl:text-xs font-semibold text-[#1A1A1A] hover:text-[#C9540A] transition-colors">Disclaimer</a>
            <a href="/about" className="text-[11px] xl:text-xs font-semibold text-[#1A1A1A] hover:text-[#C9540A] transition-colors">About us</a>
            <a href="/contact" className="text-[11px] xl:text-xs font-semibold text-[#1A1A1A] hover:text-[#C9540A] transition-colors">Contact</a>
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
              {['Home', 'Workshops', 'Community', 'Directory', 'Blog', 'Our Programs', 'Business Plan', 'Disclaimer', 'About us', 'Contact'].map((item) => (
                <a
                  key={item}
                  href={item === 'Home' ? '/' : item === 'Our Programs' ? '/programs' : item === 'About us' ? '/about' : `/${item.toLowerCase().replace(' ', '-')}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`text-lg font-semibold transition-colors ${item === 'Our Programs' ? 'text-[#C9540A]' : 'text-[#1A1A1A] hover:text-[#C9540A]'}`}
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
        <section className="px-6 pb-20">
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            <div className="w-full lg:w-1/2 flex flex-col items-start text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-100 text-[#C9540A] text-xs font-bold tracking-widest uppercase mb-6">
                <Star className="w-3.5 h-3.5" />
                <span>The Startup for Women</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-[#1A1A1A] leading-[1.15] mb-6">
                Powering Women to <br />
                <span className="italic font-serif text-[#C9540A]">Rise and Thrive</span>
              </h1>
              <p className="text-[#334155] text-base md:text-lg leading-relaxed mb-8 max-w-xl">
                Our skill training programs are designed to equip women with practical, income-generating skills tailored for today's digital and creative industries. From crafting and content creation to social media marketing and home-based business management, we ensure each session empowers participants with hands-on knowledge. Whether you're starting from scratch or looking to grow your talents, our workshops help you build the confidence and capability to turn skills into sustainable ventures.
              </p>
              
              <div className="flex flex-col gap-3.5 mb-8 bg-orange-50/50 border border-orange-100/50 p-6 rounded-2xl w-full max-w-xl">
                <h4 className="font-bold text-xs text-[#C9540A] uppercase tracking-wider mb-1 font-mono">🚀 What We Offer</h4>
                {[
                  "Membership options for women entrepreneurs",
                  "Networking opportunities & business collaborations",
                  "Professional development & skill-building programs",
                  "Online events, webinars & learning sessions",
                  "Business promotion & community support"
                ].map((offer, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-[#334155] text-sm">
                    <span className="text-[#C9540A] shrink-0 mt-0.5">✨</span>
                    <span className="font-semibold">{offer}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="w-full lg:w-1/2 relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-square w-full group">
                <Image
                  src="/images/programs/programs_women_meeting_1779275083144.png"
                  alt="Two professional women collaborating and discussing ideas over coffee"
                  fill
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              {/* Decorative elements */}
              <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-[#C9540A] rounded-full mix-blend-multiply opacity-20 blur-xl"></div>
              <div className="absolute -top-6 -right-6 w-32 h-32 bg-amber-400 rounded-full mix-blend-multiply opacity-20 blur-xl"></div>
            </div>
          </div>
        </section>

        {/* ECOSYSTEM SECTION */}
        <section className="bg-white py-24 px-6 border-y border-[#E8E4DF]">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-black text-[#1A1A1A] mb-6">
                A Thoughtfully <span className="italic font-serif text-[#C9540A]">Curated</span> Program
              </h2>
              <p className="text-[#334155] text-lg leading-relaxed">
                At Buddingpreneurs, we offer an ecosystem designed to empower, elevate, and enrich the journey of women entrepreneurs and aspiring business leaders. Here's what you'll find:
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { title: "Quality Platform with a Cream Audience", desc: "Connect with a like-minded, value-driven community of entrepreneurs, mentors, and collaborators from across India." },
                { title: "Collaboration Opportunities", desc: "Network and grow through partnerships, brand collaborations, and community-led initiatives." },
                { title: "Skill Development Workshops", desc: "Upskill with expert-led sessions on business, marketing, finance, and personal growth." },
                { title: "Personal Branding & Mindset Program", desc: "Build a powerful personal brand, cultivate a resilient growth mindset, and unlock your true potential as a female founder." },
                { title: "Earn Through Paid Campaigns", desc: "Promote brands, offer services, and participate in influencer or ambassador programs to earn while you grow." },
                { title: "Referral Rewards Program", desc: "Invite others to join and get rewarded for growing our community together." },
                { title: "Health & Wellness Workshops", desc: "Because a healthy mind and body are essential—join our yoga, mental wellness, and nutrition sessions." },
                { title: "Kids' Enrichment Workshops", desc: "Keep your little ones engaged with fun and educational sessions including Vedic Math, Abacus, Calligraphy, Art & Crafts." }
              ].map((item, i) => (
                <div key={i} className="bg-[#FAF8F5] p-8 rounded-2xl border border-[#E8E4DF] hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mb-6 shadow-sm border border-slate-100">
                    <CheckCircle2 className="w-6 h-6 text-[#C9540A]" />
                  </div>
                  <h3 className="text-xl font-bold text-[#1A1A1A] mb-3">{item.title}</h3>
                  <p className="text-[#6B6B6B] leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* IMAGE BREAK SECTION */}
        <section className="py-24 px-6 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-auto md:h-[400px]">
            <div className="col-span-1 md:col-span-2 relative rounded-3xl overflow-hidden shadow-lg min-h-[300px] bg-gray-100 group">
              <Image 
                src="/images/programs/programs_women_team_1779275100861.png" 
                alt="Four diverse women holding each others waist outdoors" 
                fill 
                className="object-cover group-hover:scale-105 transition-transform duration-700" 
              />
            </div>
            <div className="col-span-1 flex flex-col gap-6">
              <div className="relative flex-1 rounded-3xl overflow-hidden shadow-lg min-h-[150px] bg-gray-100 group">
                <Image 
                  src="/images/our-programs/programs_woman_laptop.png" 
                  alt="Close-up of a professional woman typing and working on her laptop" 
                  fill 
                  className="object-cover group-hover:scale-105 transition-transform duration-700" 
                />
              </div>
              <div className="relative flex-1 rounded-3xl overflow-hidden shadow-lg min-h-[150px] bg-gray-100 group">
                <Image 
                  src="/images/our-programs/programs_woman_desk.png" 
                  alt="Creative woman entrepreneur analyzing notes at her desk and smiling while using her smartphone" 
                  fill 
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700" 
                />
              </div>
            </div>
          </div>
        </section>

        {/* SKILL DEVELOPMENT SECTION */}
        <section className="bg-[#1A1A1A] py-24 px-6 text-white">
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16">
            <div className="w-full lg:w-1/2">
              <h2 className="text-4xl md:text-5xl font-black mb-6">
                Skill Development
              </h2>
              <p className="text-gray-300 text-lg leading-relaxed mb-10">
                At Buddingpreneur, we believe skill is power — especially when it's nurtured in the right environment. Our Skill Development Program is at the heart of empowering Indian women to take their first step toward financial independence and personal growth.
              </p>
              
              <div className="bg-[#2A2A2A] rounded-2xl p-8 mb-8 border border-gray-800">
                <h3 className="text-2xl font-bold mb-6 text-[#C9540A] italic font-serif">What Skills Do We Teach?</h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <Target className="w-5 h-5 text-amber-400 mt-1 shrink-0" />
                    <div><strong className="text-white block">Craft & Creative Skills:</strong> <span className="text-gray-400">Handmade decor, jewellery making, mehndi, gift wrapping, and more.</span></div>
                  </li>
                  <li className="flex items-start gap-3">
                    <MonitorPlay className="w-5 h-5 text-amber-400 mt-1 shrink-0" />
                    <div><strong className="text-white block">Digital Skills:</strong> <span className="text-gray-400">Content creation, Canva design, photo/video editing, eCommerce basics.</span></div>
                  </li>
                  <li className="flex items-start gap-3">
                    <Users className="w-5 h-5 text-amber-400 mt-1 shrink-0" />
                    <div><strong className="text-white block">Marketing Skills:</strong> <span className="text-gray-400">Facebook & Instagram promotion, WhatsApp catalog setup, personal branding.</span></div>
                  </li>
                  <li className="flex items-start gap-3">
                    <Briefcase className="w-5 h-5 text-amber-400 mt-1 shrink-0" />
                    <div><strong className="text-white block">Soft Business Skills:</strong> <span className="text-gray-400">Customer handling, pricing your product, time management.</span></div>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="w-full lg:w-1/2 flex flex-col gap-8">
              <div className="bg-white text-slate-800 rounded-2xl p-8 shadow-xl">
                <h3 className="text-2xl font-bold mb-6">Workshop Formats</h3>
                <p className="text-slate-500 mb-6">We understand every woman has a different schedule and learning preference. That's why we offer:</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 p-4 bg-[#FAF8F5] rounded-xl border border-slate-100">
                    <Video className="w-5 h-5 text-[#C9540A]" />
                    <span className="font-semibold text-sm">Live Online Workshops (Zoom/Meet)</span>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-[#FAF8F5] rounded-xl border border-slate-100">
                    <PlayCircle className="w-5 h-5 text-[#C9540A]" />
                    <span className="font-semibold text-sm">Recorded Sessions</span>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-[#FAF8F5] rounded-xl border border-slate-100">
                    <FileText className="w-5 h-5 text-[#C9540A]" />
                    <span className="font-semibold text-sm">Downloadable Material</span>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-[#FAF8F5] rounded-xl border border-slate-100">
                    <MessageCircle className="w-5 h-5 text-[#C9540A]" />
                    <span className="font-semibold text-sm">Practice Groups</span>
                  </div>
                </div>
              </div>
              
              <div className="border border-gray-700 rounded-2xl p-8">
                <h3 className="text-2xl font-bold mb-6">How to Register</h3>
                <ul className="space-y-4 text-gray-300">
                  <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-emerald-500" /> Follow us on Facebook or Instagram for upcoming sessions</li>
                  <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-emerald-500" /> Join our private Facebook group for exclusive member-only training</li>
                  <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-emerald-500" /> Use our Registration Form to sign up for any upcoming skill workshop</li>
                  <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-emerald-500" /> Pay nominal fees (if applicable) for special training sessions</li>
                </ul>
                <div className="mt-8 p-4 bg-[#C9540A]/20 border border-[#C9540A]/30 rounded-xl flex gap-3 text-white font-medium">
                  <span className="text-xl">💡</span>
                  <p>We believe in learning by doing — all workshops are hands-on, practical, and community-driven.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* BRAND PROMOTION TRAINING */}
        <section className="py-24 px-6 max-w-7xl mx-auto">
          <div className="flex flex-col-reverse lg:flex-row items-center gap-16">
            <div className="w-full lg:w-1/2 relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-square w-full max-w-lg mx-auto group">
                <Image
                  src="/images/programs/programs_women_computer_1779275119203.png"
                  alt="Two women sitting at a table looking at a computer screen"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>
            
            <div className="w-full lg:w-1/2">
              <h2 className="text-4xl md:text-5xl font-black text-[#1A1A1A] mb-6">
                Brand <span className="italic font-serif text-[#C9540A]">Promotion</span> Training
              </h2>
              <p className="text-[#334155] text-lg leading-relaxed mb-10">
                A great product or skill deserves to be seen — and that's exactly what our Brand Promotion Training is designed for. We help women-led businesses grow visibility, trust, and sales using smart, simple social media strategies.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-bold text-[#1A1A1A] mb-4 flex items-center gap-2">
                    <Star className="w-5 h-5 text-amber-500" /> What We Teach
                  </h3>
                  <ul className="space-y-3 text-slate-600 mb-6">
                    <li>• Facebook Page for business</li>
                    <li>• WhatsApp Business & catalogs</li>
                    <li>• Engaging Instagram Reels</li>
                    <li>• Facebook & Insta Stories</li>
                    <li>• Hashtags, captions, and audience trust</li>
                  </ul>
                  <p className="text-sm font-semibold text-[#C9540A] bg-orange-50 p-3 rounded-lg border border-orange-100">
                    We tailor strategies for homemakers, beginners, and small sellers starting without any followers or digital background.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl font-bold text-[#1A1A1A] mb-4 flex items-center gap-2">
                    <Award className="w-5 h-5 text-amber-500" /> Hands-On Tools
                  </h3>
                  <ul className="space-y-3 text-slate-600">
                    <li>• Facebook Page Setup & Calendar</li>
                    <li>• WhatsApp Business Profile setup</li>
                    <li>• Instagram Reels: shoot, edit, post</li>
                    <li>• Canva for logos, posters & stories</li>
                    <li>• Organic reach growth tips</li>
                  </ul>
                </div>
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
