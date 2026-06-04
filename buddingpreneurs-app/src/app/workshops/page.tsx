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
  Calendar,
  Sparkles,
  BookOpen,
  ChevronDown,
  CheckCircle2,
  Phone,
  ArrowUpRight,
  TrendingUp,
  Megaphone,
  ShoppingBag,
  Briefcase,
  Cpu,
  Users,
  Mic,
  Star
} from "lucide-react";
import { siteMetadata } from "../../data/siteData";
import Footer from "@/components/Footer";

export default function WorkshopsPage() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Category Filter State
  const [activeCategory, setActiveCategory] = useState<"all" | "marketing" | "management" | "community">("all");
  
  // Registration Modal States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedWorkshop, setSelectedWorkshop] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", phase: "Just an Idea" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  // FAQ Accordion State (stores index of open item, null if closed)
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const openRegisterModal = (workshopName: string) => {
    setSelectedWorkshop(workshopName);
    setFormData({ name: "", email: "", phone: "", phase: "Just an Idea" });
    setIsModalOpen(true);
    setFormSubmitted(false);
    setSubmitError("");
    setIsSubmitting(false);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError("");
    
    try {
      const response = await fetch("/api/workshops/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          phase: formData.phase,
          workshop: selectedWorkshop
        })
      });

      const resData = await response.json();
      if (resData.success) {
        setFormSubmitted(true);
      } else {
        setSubmitError(resData.error || "Something went wrong. Please try again.");
      }
    } catch (err) {
      console.error("Workshop registration error:", err);
      setSubmitError("Failed to register. Please check your network and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const faqs = [
    {
      q: "Are these workshops beginner-friendly?",
      a: "Absolutely! Our workshops are designed to meet you where you are—whether you only have a vague business concept or a fully running local brand. We cover foundational skills step-by-step with practical hands-on examples."
    },
    {
      q: "Do I get access to the recorded sessions?",
      a: "Yes! All registered members receive lifetime access to high-definition recordings of the workshops, along with downloadable worksheets, checklists, and reference guides."
    },
    {
      q: "Is there any fee to join these programs?",
      a: "We offer both free introductory community workshops and premium intensive skill-development masterclasses. You can explore all options in our business plan page or register for our free workshops."
    },
    {
      q: "How does the post-workshop community support work?",
      a: "After completing any workshop, you get invited to our exclusive members-only WhatsApp circle and regional Slack groups where you can ask questions, collaborate with peers, and get direct mentorship."
    }
  ];

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-slate-800 flex flex-col relative overflow-hidden select-none">
      
      {/* 🚀 GLOWING HEADER / NAVIGATION BAR */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-[#FAF8F5]/90 backdrop-blur-md border-b border-slate-200/80 py-3 shadow-sm" : "bg-transparent py-5"}`}>
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          
          <a href="/" className="flex items-center gap-2 group">
            <span className="text-xl font-black tracking-tight text-[#0f172a] font-sans">
              Buddingpreneurs
            </span>
          </a>

          <nav className="hidden lg:flex flex-wrap items-center justify-center gap-4 xl:gap-6">
            <a href="/" className="text-[11px] xl:text-xs font-semibold text-[#1A1A1A] hover:text-[#C9540A] transition-colors">Home</a>
            <a href="/workshops" className="text-[11px] xl:text-xs font-bold text-[#C9540A] transition-colors border-b-2 border-[#C9540A] pb-1">Workshops</a>
            <a href="/community" className="text-[11px] xl:text-xs font-semibold text-[#1A1A1A] hover:text-[#C9540A] transition-colors">Community</a>
            <a href="/directory" className="text-[11px] xl:text-xs font-semibold text-[#1A1A1A] hover:text-[#C9540A] transition-colors">Directory</a>
            <a href="/blog" className="text-[11px] xl:text-xs font-semibold text-[#1A1A1A] hover:text-[#C9540A] transition-colors">Blog</a>
            <a href="/programs" className="text-[11px] xl:text-xs font-semibold text-[#1A1A1A] hover:text-[#C9540A] transition-colors">Our Programs</a>
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
                  className={`text-lg font-semibold transition-colors ${item === 'Workshops' ? 'text-[#C9540A]' : 'text-[#1A1A1A] hover:text-[#C9540A]'}`}
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

      <main className="flex-grow pt-32 pb-0">
        
        {/* HERO SECTION */}
        <section className="px-6 pb-16 text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-100 text-[#C9540A] text-xs font-bold tracking-widest uppercase mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Cohorts</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-[#1A1A1A] leading-[1.15] mb-6 font-sans">
            Buddingpreneurs® <br />
            <span className="italic font-serif text-[#C9540A]">Workshops</span> & Learning Sessions
          </h1>
          <p className="text-[#334155] text-base md:text-lg leading-relaxed mb-10 max-w-2xl mx-auto font-sans">
            Buddingpreneurs regularly conducts practical, growth-focused workshops to help women entrepreneurs build skills, confidence, and business success.
          </p>

          {/* Dynamic Filter Tabs - Glassmorphism & Fluid Sliding Bubble */}
          <div className="flex items-center justify-start md:justify-between gap-3 sm:gap-4 mt-8 bg-white/40 backdrop-blur-md p-2.5 rounded-full max-w-5xl w-full mx-auto border border-white/60 shadow-[0_12px_40px_rgba(0,0,0,0.06)] overflow-x-auto no-scrollbar flex-nowrap whitespace-nowrap px-4 sm:px-6 relative">
            {(["all", "marketing", "management", "community"] as const).map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat as any)}
                  className={`px-6 py-3.5 sm:px-8 sm:py-4 rounded-full text-[11px] sm:text-xs font-black uppercase tracking-wider transition-colors duration-300 shrink-0 md:flex-1 text-center relative z-10 ${
                    isActive ? "text-white" : "text-slate-600 hover:text-[#C9540A]"
                  }`}
                >
                  <span className="relative z-20">
                    {cat === "all" ? "All Sessions" : cat === "marketing" ? "Growth & Marketing" : cat === "management" ? "Management & Tech" : "Community & Leadership"}
                  </span>
                  
                  {isActive && (
                    <motion.div
                      layoutId="activeCategoryPill"
                      className="absolute inset-0 bg-[#C9540A] rounded-full shadow-[0_6px_20px_rgba(201,84,10,0.3)]"
                      style={{ originY: "0px" }}
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </section>

        {/* SECONDARY HERO / IDEAS TO IMPACT */}
        <AnimatePresence mode="wait">
          {activeCategory === "all" && (
            <motion.section
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.5 }}
              className="py-16 px-6 border-y border-[#E8E4DF] bg-white"
            >
              <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12 lg:gap-20">
                <div className="w-full md:w-1/2">
                  <h2 className="text-4xl md:text-5xl font-black text-[#1A1A1A] mb-6">
                    Grow Her Ideas <span className="italic font-serif text-[#C9540A]">into Impact</span>
                  </h2>
                  <p className="text-[#334155] text-lg leading-relaxed mb-8">
                    Join our workshops to enhance skills and promote businesses. We provide hands-on training, industry insights, and a supportive community.
                  </p>
                  <button 
                    onClick={() => openRegisterModal("All workshops program")}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#C9540A] hover:bg-[#A8420A] text-white font-bold text-xs uppercase tracking-wider transition-all"
                  >
                    Explore all events
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
                <div className="w-full md:w-1/2">
                  <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[4/3] w-full group">
                    <Image
                      src="/images/workshops/workshops_magazine_1779275458338.png"
                      alt="Secret Women's Business Magazine"
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                </div>
              </div>
            </motion.section>
          )}
        </AnimatePresence>

        {/* WORKSHOP GRID SECTION */}
        <section className="py-16 px-6 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* 1. Business Growth & Sales */}
            {(activeCategory === "all" || activeCategory === "marketing") && (
              <div className="bg-[#F4F1ED] rounded-xl p-8 border border-[#E8E4DF] transition-all hover:-translate-y-1 hover:shadow-lg duration-300 flex flex-col justify-between">
                <div>
                  <TrendingUp className="w-8 h-8 text-[#C9540A] mb-4" strokeWidth={1.5} />
                  <h3 className="text-xl font-bold text-[#1A1A1A] mb-4">
                    Business Growth <span className="italic text-[#C9540A] font-serif">& Sales</span>
                  </h3>
                  <ul className="space-y-2.5 mb-8">
                    {["Sales Mastery", "Lead Generation Strategies", "Client Acquisition Techniques", "Business Scaling Frameworks", "B2B Business Development"].map((item) => (
                      <li key={item} className="flex items-start gap-2 text-[14px] text-[#6B6B6B] leading-relaxed">
                        <span className="text-[#C9540A] mt-1 text-xs">◆</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <button 
                  onClick={() => openRegisterModal("Business Growth & Sales Workshop")}
                  className="w-full py-3 rounded-full text-xs font-bold transition-all uppercase tracking-wider bg-[#C9540A] text-white hover:bg-[#A8420A] shadow-sm"
                >
                  Register Interest →
                </button>
              </div>
            )}

            {/* 2. Marketing & Branding */}
            {(activeCategory === "all" || activeCategory === "marketing") && (
              <div className="bg-[#F4F1ED] rounded-xl p-8 border border-[#E8E4DF] transition-all hover:-translate-y-1 hover:shadow-lg duration-300 flex flex-col justify-between">
                <div>
                  <Megaphone className="w-8 h-8 text-[#C9540A] mb-4" strokeWidth={1.5} />
                  <h3 className="text-xl font-bold text-[#1A1A1A] mb-4">
                    Marketing <span className="italic text-[#C9540A] font-serif">& Branding</span>
                  </h3>
                  <ul className="space-y-2.5 mb-8">
                    {["Digital Marketing Basics", "Social Media Marketing", "Content Creation & Strategy", "Personal Branding", "Brand Positioning", "Instagram & LinkedIn Growth"].map((item) => (
                      <li key={item} className="flex items-start gap-2 text-[14px] text-[#6B6B6B] leading-relaxed">
                        <span className="text-[#C9540A] mt-1 text-xs">◆</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <button 
                  onClick={() => openRegisterModal("Marketing & Branding Workshop")}
                  className="w-full py-3 rounded-full text-xs font-bold transition-all uppercase tracking-wider bg-[#C9540A] text-white hover:bg-[#A8420A] shadow-sm"
                >
                  Register Interest →
                </button>
              </div>
            )}

            {/* 3. E-Commerce & D2C */}
            {(activeCategory === "all" || activeCategory === "marketing") && (
              <div className="bg-[#F4F1ED] rounded-xl p-8 border border-[#E8E4DF] transition-all hover:-translate-y-1 hover:shadow-lg duration-300 flex flex-col justify-between">
                <div>
                  <ShoppingBag className="w-8 h-8 text-[#C9540A] mb-4" strokeWidth={1.5} />
                  <h3 className="text-xl font-bold text-[#1A1A1A] mb-4">
                    E-Commerce <span className="italic text-[#C9540A] font-serif">& D2C</span>
                  </h3>
                  <ul className="space-y-2.5 mb-8">
                    {["Online Selling Strategies", "Marketplace Selling", "Website & Store Setup", "Customer Retention Techniques", "D2C Brand Growth"].map((item) => (
                      <li key={item} className="flex items-start gap-2 text-[14px] text-[#6B6B6B] leading-relaxed">
                        <span className="text-[#C9540A] mt-1 text-xs">◆</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <button 
                  onClick={() => openRegisterModal("E-Commerce & D2C Workshop")}
                  className="w-full py-3 rounded-full text-xs font-bold transition-all uppercase tracking-wider bg-[#C9540A] text-white hover:bg-[#A8420A] shadow-sm"
                >
                  Register Interest →
                </button>
              </div>
            )}

            {/* 4. Business Management */}
            {(activeCategory === "all" || activeCategory === "management") && (
              <div className="bg-[#F4F1ED] rounded-xl p-8 border border-[#E8E4DF] transition-all hover:-translate-y-1 hover:shadow-lg duration-300 flex flex-col justify-between">
                <div>
                  <Briefcase className="w-8 h-8 text-[#C9540A] mb-4" strokeWidth={1.5} />
                  <h3 className="text-xl font-bold text-[#1A1A1A] mb-4">
                    Business <span className="italic text-[#C9540A] font-serif font-bold">Management</span>
                  </h3>
                  <ul className="space-y-2.5 mb-8">
                    {["Business Planning", "Pricing Strategies", "GST & Business Compliance", "Financial Literacy for Entrepreneurs", "Proposal & Pitch Deck Creation"].map((item) => (
                      <li key={item} className="flex items-start gap-2 text-[14px] text-[#6B6B6B] leading-relaxed">
                        <span className="text-[#C9540A] mt-1 text-xs">◆</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <button 
                  onClick={() => openRegisterModal("Business Management Workshop")}
                  className="w-full py-3 rounded-full text-xs font-bold transition-all uppercase tracking-wider bg-[#C9540A] text-white hover:bg-[#A8420A] shadow-sm"
                >
                  Register Interest →
                </button>
              </div>
            )}

            {/* 5. AI & Technology */}
            {(activeCategory === "all" || activeCategory === "management") && (
              <div className="bg-[#F4F1ED] rounded-xl p-8 border border-[#E8E4DF] transition-all hover:-translate-y-1 hover:shadow-lg duration-300 flex flex-col justify-between">
                <div>
                  <Cpu className="w-8 h-8 text-[#C9540A] mb-4" strokeWidth={1.5} />
                  <h3 className="text-xl font-bold text-[#1A1A1A] mb-4">
                    AI <span className="italic text-[#C9540A] font-serif">& Technology</span>
                  </h3>
                  <ul className="space-y-2.5 mb-8">
                    {["Introduction to AI Tools", "ChatGPT for Business", "AI for Content Creation", "Productivity & Automation Tools", "AI-Powered Marketing"].map((item) => (
                      <li key={item} className="flex items-start gap-2 text-[14px] text-[#6B6B6B] leading-relaxed">
                        <span className="text-[#C9540A] mt-1 text-xs">◆</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <button 
                  onClick={() => openRegisterModal("AI & Technology Workshop")}
                  className="w-full py-3 rounded-full text-xs font-bold transition-all uppercase tracking-wider bg-[#C9540A] text-white hover:bg-[#A8420A] shadow-sm"
                >
                  Register Interest →
                </button>
              </div>
            )}

            {/* 6. Networking & Collaboration */}
            {(activeCategory === "all" || activeCategory === "community") && (
              <div className="bg-[#F4F1ED] rounded-xl p-8 border border-[#E8E4DF] transition-all hover:-translate-y-1 hover:shadow-lg duration-300 flex flex-col justify-between">
                <div>
                  <Users className="w-8 h-8 text-[#C9540A] mb-4" strokeWidth={1.5} />
                  <h3 className="text-xl font-bold text-[#1A1A1A] mb-4">
                    Networking <span className="italic text-[#C9540A] font-serif">& Collaboration</span>
                  </h3>
                  <ul className="space-y-2.5 mb-8">
                    {["Networking Masterclasses", "Referral Marketing", "Collaboration Strategies", "Partnership Building", "Community Growth"].map((item) => (
                      <li key={item} className="flex items-start gap-2 text-[14px] text-[#6B6B6B] leading-relaxed">
                        <span className="text-[#C9540A] mt-1 text-xs">◆</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <button 
                  onClick={() => openRegisterModal("Networking & Collaboration Workshop")}
                  className="w-full py-3 rounded-full text-xs font-bold transition-all uppercase tracking-wider bg-[#C9540A] text-white hover:bg-[#A8420A] shadow-sm"
                >
                  Register Interest →
                </button>
              </div>
            )}

            {/* 7. Leadership & Personal Development */}
            {(activeCategory === "all" || activeCategory === "community") && (
              <div className="bg-[#F4F1ED] rounded-xl p-8 border border-[#E8E4DF] transition-all hover:-translate-y-1 hover:shadow-lg duration-300 flex flex-col justify-between">
                <div>
                  <Mic className="w-8 h-8 text-[#C9540A] mb-4" strokeWidth={1.5} />
                  <h3 className="text-xl font-bold text-[#1A1A1A] mb-4">
                    Leadership <span className="italic text-[#C9540A] font-serif">& Development</span>
                  </h3>
                  <ul className="space-y-2.5 mb-8">
                    {["Public Speaking", "Confidence Building", "Leadership Skills", "Women in Business Leadership", "Time Management & Productivity"].map((item) => (
                      <li key={item} className="flex items-start gap-2 text-[14px] text-[#6B6B6B] leading-relaxed">
                        <span className="text-[#C9540A] mt-1 text-xs">◆</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <button 
                  onClick={() => openRegisterModal("Leadership & Personal Development Workshop")}
                  className="w-full py-3 rounded-full text-xs font-bold transition-all uppercase tracking-wider bg-[#C9540A] text-white hover:bg-[#A8420A] shadow-sm"
                >
                  Register Interest →
                </button>
              </div>
            )}

            {/* 8. Special Sessions */}
            {(activeCategory === "all" || activeCategory === "community") && (
              <div className="bg-[#F4F1ED] rounded-xl p-8 border border-[#E8E4DF] transition-all hover:-translate-y-1 hover:shadow-lg duration-300 flex flex-col justify-between">
                <div>
                  <Star className="w-8 h-8 text-[#C9540A] mb-4" strokeWidth={1.5} />
                  <h3 className="text-xl font-bold text-[#1A1A1A] mb-4">
                    Special <span className="italic text-[#C9540A] font-serif">Sessions</span>
                  </h3>
                  <ul className="space-y-2.5 mb-8">
                    {["Founder Stories & Success Talks", "Expert Panel Discussions", "Industry Insights Sessions", "Business Clinics & Q&A", "Community Orientation Sessions"].map((item) => (
                      <li key={item} className="flex items-start gap-2 text-[14px] text-[#6B6B6B] leading-relaxed">
                        <span className="text-[#C9540A] mt-1 text-xs">◆</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <button 
                  onClick={() => openRegisterModal("Special Workshop Sessions")}
                  className="w-full py-3 rounded-full text-xs font-bold transition-all uppercase tracking-wider bg-[#C9540A] text-white hover:bg-[#A8420A] shadow-sm"
                >
                  Register Interest →
                </button>
              </div>
            )}

          </div>
        </section>

        {/* DETAILED WORKSHOPS */}
        <section className="bg-[#1A1A1A] py-24 px-6 text-white relative overflow-hidden border-b border-[#333333]">
          {/* Background Decorative Rings */}
          <div className="absolute top-0 right-0 -mr-40 -mt-40 w-96 h-96 rounded-full border-[20px] border-[#2A2A2A] opacity-50 blur-xl"></div>
          <div className="absolute bottom-0 left-0 -ml-40 -mb-40 w-96 h-96 rounded-full border-[20px] border-[#C9540A] opacity-20 blur-xl"></div>
          
          <div className="max-w-7xl mx-auto flex flex-col gap-24 relative z-10">
            
            {/* FEATURED WORKSHOP 1: Skill Development */}
            <AnimatePresence mode="popLayout">
              {(activeCategory === "all" || activeCategory === "marketing") && (
                <motion.div 
                  layout
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -40 }}
                  transition={{ duration: 0.5 }}
                  className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16"
                >
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
                  <div className="w-full lg:w-1/2 flex flex-col justify-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-800 text-amber-400 text-xs font-bold tracking-widest uppercase mb-6 self-start">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>Featured Workshop</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-black mb-6 leading-tight">
                      Skill Development <span className="italic font-serif text-[#C9540A]">Workshop</span>
                    </h2>
                    <p className="text-gray-300 text-lg leading-relaxed mb-8">
                      Join our empowering Skill Development Workshop designed for Indian women entrepreneurs. Learn essential skills in brand promotion on Facebook, Instagram, and WhatsApp. Collaborate with fellow women to enhance your business acumen and achieve economic independence through shared resources and support.
                    </p>
                    <button 
                      onClick={() => openRegisterModal("Featured Skill Development Masterclass")}
                      className="inline-flex items-center justify-center px-8 py-4 rounded-full text-sm font-bold transition-all gap-2 bg-[#C9540A] text-white hover:bg-white hover:text-[#C9540A] self-start"
                    >
                      <span>Register Now</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* FEATURED WORKSHOP 2: Kids Online */}
            <AnimatePresence mode="popLayout">
              {(activeCategory === "all" || activeCategory === "community") && (
                <motion.div 
                  layout
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -40 }}
                  transition={{ duration: 0.5 }}
                  className="flex flex-col-reverse lg:flex-row items-center gap-12 lg:gap-16"
                >
                  <div className="w-full lg:w-1/2 flex flex-col justify-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-800 text-amber-400 text-xs font-bold tracking-widest uppercase mb-6 self-start">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>Next Generation</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-black mb-6 leading-tight">
                      Kids Online <span className="italic font-serif text-[#C9540A]">Workshop</span>
                    </h2>
                    <p className="text-gray-300 text-lg leading-relaxed mb-8">
                      Enroll your kids in our engaging Online Workshop tailored for young minds. This interactive session focuses on skill development and creativity, fostering a supportive environment for children to learn and grow. Empower the next generation of innovators and entrepreneurs today!
                    </p>
                    <button 
                      onClick={() => openRegisterModal("Kids Online Creativity Workshop")}
                      className="inline-flex items-center justify-center px-8 py-4 rounded-full text-sm font-bold transition-all gap-2 bg-white text-[#1A1A1A] hover:bg-[#C9540A] hover:text-white self-start"
                    >
                      <span>Join Today</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
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
                </motion.div>
              )}
            </AnimatePresence>

          </div>
        </section>

        {/* FAQ ACCORDION SECTION */}
        <section className="py-24 px-6 bg-[#FAF8F5] border-b border-[#E8E4DF]">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <span className="text-[#C9540A] text-xs font-bold tracking-widest uppercase mb-4 block">Got Questions?</span>
              <h2 className="text-4xl font-black text-[#1A1A1A]">
                Frequently Asked <span className="italic font-serif text-[#C9540A]">Questions</span>
              </h2>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, index) => {
                const isOpen = openFaqIndex === index;
                return (
                  <div 
                    key={index} 
                    className="bg-white rounded-2xl border border-[#E8E4DF] overflow-hidden transition-all duration-300 shadow-sm hover:shadow-md"
                  >
                    <button
                      onClick={() => toggleFaq(index)}
                      className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
                    >
                      <span className="font-bold text-[#1A1A1A] text-base sm:text-lg pr-4">
                        {faq.q}
                      </span>
                      <motion.div
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                        className="flex-shrink-0 w-8 h-8 rounded-full bg-slate-50 border border-[#E8E4DF] flex items-center justify-center text-[#C9540A]"
                      >
                        <ChevronDown className="w-4 h-4" />
                      </motion.div>
                    </button>
                    
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: isOpen ? "auto" : 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 text-[#475569] text-sm sm:text-base leading-relaxed border-t border-slate-50 pt-4">
                        {faq.a}
                      </div>
                    </motion.div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

      </main>

      {/* FOOTER - Merrily aligned with no empty padding above */}
      <Footer />

      {/* DYNAMIC REGISTRATION MODAL */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Glass Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"
            />
            
            {/* Modal Body */}
            <motion.div 
              initial={{ scale: 0.95, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 20, opacity: 0 }}
              className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full relative z-10 border border-[#E8E4DF] overflow-hidden"
            >
              <button 
                onClick={() => setIsModalOpen(false)}
                className="absolute top-5 right-5 p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <AnimatePresence mode="wait">
                {!formSubmitted ? (
                  <motion.div
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <div className="mb-6">
                      <span className="text-[#C9540A] text-xs font-bold tracking-wider uppercase">Register Free</span>
                      <h3 className="text-2xl font-black text-[#1A1A1A] mt-1">{selectedWorkshop}</h3>
                      <p className="text-slate-500 text-xs mt-1">Book your spot in under a minute</p>
                    </div>

                    <form onSubmit={handleFormSubmit} className="space-y-4">
                      {submitError && (
                        <div className="p-3.5 mb-2 rounded-xl bg-red-50 border border-red-200 text-red-600 text-xs font-bold leading-relaxed">
                          ⚠️ {submitError}
                        </div>
                      )}
                      
                      <div>
                        <label className="block text-xs font-bold uppercase text-slate-500 tracking-wider mb-1.5">Your Full Name</label>
                        <input 
                          type="text" 
                          required 
                          disabled={isSubmitting}
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="e.g. Aditi Sharma" 
                          className="w-full px-4 py-3 rounded-xl border border-[#E8E4DF] focus:outline-none focus:border-[#C9540A] text-sm text-slate-800 transition-colors bg-slate-50 disabled:opacity-60"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-xs font-bold uppercase text-slate-500 tracking-wider mb-1.5">Email Address</label>
                        <input 
                          type="email" 
                          required 
                          disabled={isSubmitting}
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="aditi@example.com" 
                          className="w-full px-4 py-3 rounded-xl border border-[#E8E4DF] focus:outline-none focus:border-[#C9540A] text-sm text-slate-800 transition-colors bg-slate-50 disabled:opacity-60"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase text-slate-500 tracking-wider mb-1.5">WhatsApp Number</label>
                        <div className="relative">
                          <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                          <input 
                            type="tel" 
                            required 
                            disabled={isSubmitting}
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            placeholder="10-digit number" 
                            className="w-full pl-11 pr-4 py-3 rounded-xl border border-[#E8E4DF] focus:outline-none focus:border-[#C9540A] text-sm text-slate-800 transition-colors bg-slate-50 disabled:opacity-60"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase text-slate-500 tracking-wider mb-1.5">Current Business Phase</label>
                        <select 
                          value={formData.phase}
                          disabled={isSubmitting}
                          onChange={(e) => setFormData({ ...formData, phase: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-[#E8E4DF] focus:outline-none focus:border-[#C9540A] text-sm text-slate-800 transition-colors bg-slate-50 disabled:opacity-60"
                        >
                          <option>Just an Idea</option>
                          <option>Partially Launched</option>
                          <option>Fully Growing</option>
                        </select>
                      </div>

                      <button 
                        type="submit" 
                        disabled={isSubmitting}
                        className={`w-full py-4 rounded-xl text-white font-bold text-sm uppercase tracking-wider transition-all shadow-sm flex items-center justify-center gap-2 mt-6 ${
                          isSubmitting ? "bg-slate-400 cursor-wait" : "bg-[#C9540A] hover:bg-[#A8420A]"
                        }`}
                      >
                        <span>{isSubmitting ? "Registering..." : "Confirm Free Spot"}</span>
                        {!isSubmitting && <ArrowUpRight className="w-4 h-4" />}
                      </button>
                    </form>
                  </motion.div>
                ) : (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-8"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 200, damping: 15 }}
                      className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 mx-auto mb-6"
                    >
                      <CheckCircle2 className="w-10 h-10" />
                    </motion.div>

                    <h3 className="text-2xl font-black text-slate-900 mb-2">You're Registered!</h3>
                    <p className="text-slate-600 text-sm leading-relaxed mb-6 max-w-xs mx-auto">
                      Thank you, <strong className="text-slate-900">{formData.name}</strong>. We've sent the calendar invite and workshop links to <strong className="text-slate-900">{formData.email}</strong>.
                    </p>

                    <div className="bg-[#FAF8F5] p-4 rounded-2xl border border-[#E8E4DF] mb-8 text-left text-xs text-slate-500 space-y-2">
                      <div className="flex justify-between">
                        <span>Event:</span>
                        <span className="font-bold text-slate-800">{selectedWorkshop}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Status:</span>
                        <span className="font-bold text-emerald-600">Free Spot Confirmed</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Calendar:</span>
                        <span className="font-bold text-slate-800">Added to Google Cal</span>
                      </div>
                    </div>

                    <button 
                      onClick={() => setIsModalOpen(false)}
                      className="px-6 py-2.5 rounded-full border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50 text-xs font-bold transition-all"
                    >
                      Close Window
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}

