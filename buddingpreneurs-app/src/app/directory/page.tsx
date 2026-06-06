"use client";

import NavAuth from "@/components/NavAuth";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Menu,
  X,
  Search,
  Filter,
  MapPin,
  CheckCircle2,
  MessageCircle,
  ChevronDown
} from "lucide-react";
import Footer from "@/components/Footer";

interface Member {
  username: string;
  name: string;
  tagline: string;
  category: string;
  city: string;
  bio: string;
  views: number;
  leadsCount: number;
  conversions: number;
  rating: number;
  reviewsCount: number;
  verified: boolean;
  joinDate: string;
  plan: "Basic" | "Premium" | "Featured";
  logo: string;
  coverImage: string;
  contact: {
    email: string;
    phone: string;
    website: string;
    whatsapp: string;
  };
}

const CATEGORIES = [
  "All",
  "Handicrafts & Art",
  "Jewellery & Apparel",
  "Clothing & Fashion",
  "Beauty & Personal Care",
  "Home Decor",
  "Gifts & Customization",
  "Food & Baking",
  "Organic & Wellness Products",
  "Coaching & Consulting",
  "Digital Marketing",
  "Graphic Design",
  "Website Development",
  "Content Writer",
  "Financial Services",
  "Trainers & Mentors",
  "Educators",
  "Doctors & Healthcare Professionals",
  "Influencers",
  "Podcasters"
];
const BUDGETS = ["All", "<5k", "5k-20k", "20k-50k", "50k+"];

export default function DirectoryPage() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Real-time Database Members State
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchCity, setSearchCity] = useState("");
  const [activeBudget, setActiveBudget] = useState("All");
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  
  // Sort
  const [sortBy, setSortBy] = useState("featured"); // featured, viewed, active
  const [isSortOpen, setIsSortOpen] = useState(false);

  // Fetch live members from API
  const fetchMembers = async () => {
    try {
      const res = await fetch("/api/members");
      const data = await res.json();
      if (data.success) {
        setMembers(data.data);
      }
    } catch (error) {
      console.error("Failed to fetch live members:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMembers();

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Filter and sort logic
  const filteredMembers = members.filter(member => {
    const matchCategory = activeCategory === "All" || member.category === activeCategory;
    const matchCity = searchCity === "" || member.city.toLowerCase().includes(searchCity.toLowerCase());
    
    // Budget range mock filter mapping for illustration
    let matchBudget = true;
    if (activeBudget !== "All") {
      if (activeBudget === "<5k") matchBudget = member.plan === "Basic";
      if (activeBudget === "5k-20k") matchBudget = member.plan === "Basic" || member.plan === "Premium";
      if (activeBudget === "20k-50k") matchBudget = member.plan === "Premium";
      if (activeBudget === "50k+") matchBudget = member.plan === "Featured";
    }

    const matchVerified = !verifiedOnly || member.verified;
    
    return matchCategory && matchCity && matchBudget && matchVerified;
  }).sort((a, b) => {
    if (sortBy === "featured") {
      if (a.plan === "Featured" && b.plan !== "Featured") return -1;
      if (a.plan !== "Featured" && b.plan === "Featured") return 1;
      return b.views - a.views;
    }
    if (sortBy === "viewed") return b.views - a.views;
    if (sortBy === "active") return b.leadsCount - a.leadsCount;
    return 0;
  });

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1A1A1A] flex flex-col relative overflow-hidden font-sans">
      
      {/* GLOWING HEADER / NAVIGATION BAR */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-white/80 backdrop-blur-md border-b border-[#E8E4DF] py-3 shadow-sm" : "bg-transparent py-5"}`}>
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          
          <a href="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-full overflow-hidden border border-slate-200 bg-white relative flex-shrink-0">
              <img 
                src="/brand_logo.png" 
                alt="Buddingpreneurs Brand Logo" 
                className="object-cover w-full h-full"
              />
            </div>
            <span className="text-xl font-black tracking-tight text-[#1A1A1A]">
              Buddingpreneurs
            </span>
          </a>

          <nav className="hidden lg:flex flex-nowrap items-center justify-center gap-3 xl:gap-5 whitespace-nowrap">
            <a href="/" className="text-[11px] xl:text-xs font-semibold text-[#1A1A1A] hover:text-[#C9540A] transition-colors">Home</a>
            <a href="/workshops" className="text-[11px] xl:text-xs font-semibold text-[#1A1A1A] hover:text-[#C9540A] transition-colors">Workshops</a>
            <a href="/community" className="text-[11px] xl:text-xs font-semibold text-[#1A1A1A] hover:text-[#C9540A] transition-colors">Community</a>
            <a href="/directory" className="text-[11px] xl:text-xs font-bold text-[#C9540A] transition-colors border-b-2 border-[#C9540A] pb-1">Directory</a>
            <a href="/blog" className="text-[11px] xl:text-xs font-semibold text-[#1A1A1A] hover:text-[#C9540A] transition-colors">Blog</a>
            <a href="/programs" className="text-[11px] xl:text-xs font-semibold text-[#1A1A1A] hover:text-[#C9540A] transition-colors">Our Programs</a>
            <a href="/business-plan" className="text-[11px] xl:text-xs font-semibold text-[#1A1A1A] hover:text-[#C9540A] transition-colors">Business Plan</a>
            <a href="/disclaimer" className="text-[11px] xl:text-xs font-semibold text-[#1A1A1A] hover:text-[#C9540A] transition-colors">Disclaimer</a>
            <a href="/about" className="text-[11px] xl:text-xs font-semibold text-[#1A1A1A] hover:text-[#C9540A] transition-colors">About us</a>
            <a href="/contact" className="text-[11px] xl:text-xs font-semibold text-[#1A1A1A] hover:text-[#C9540A] transition-colors">Contact</a>
          </nav>

          <div className="flex items-center gap-2 sm:gap-4">
            <NavAuth />
            
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="lg:hidden p-1.5 sm:p-2 text-[#1A1A1A] hover:bg-[#F4F1ED] rounded-lg transition-colors z-50 relative">
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
                  className={`text-lg font-semibold transition-colors ${item === 'Directory' ? 'text-[#C9540A]' : 'text-[#1A1A1A] hover:text-[#C9540A]'}`}
                >
                  {item}
                </a>
              ))}
              <div className="w-12 h-px bg-[#E8E4DF] my-4" />
              <a href="/business-plan" onClick={() => setIsMobileMenuOpen(false)} className="px-8 py-3.5 rounded-lg text-sm font-bold transition-all flex items-center justify-center gap-2 bg-[#1A1A1A] text-white w-full max-w-xs shadow-sm hover:bg-[#1C1C1C]">
                Join for Free <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="flex-1 pt-32 pb-24">
        {/* HERO SECTION */}
        <section className="px-6 max-w-7xl mx-auto mb-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto"
          >
            <h1 className="text-5xl md:text-6xl font-black mb-6 text-[#1A1A1A] tracking-tight uppercase font-display">
              Vendor <span className="text-[#C9540A] italic font-heading capitalize">Directory</span>
            </h1>
            <p className="text-lg md:text-xl text-[#6B6B6B] leading-relaxed">
              Discover and connect with top verified professionals, businesses, and freelancers in your area.
            </p>
          </motion.div>
        </section>

        {/* DIRECTORY CONTENT */}
        <section className="px-6 max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-8">
            
            {/* SIDEBAR FILTERS */}
            <aside className="w-full lg:w-1/4 flex flex-col gap-8">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#E8E4DF]">
                <div className="flex items-center gap-2 mb-6 text-[#1A1A1A]">
                  <Filter className="w-5 h-5" />
                  <h3 className="text-lg font-bold">Filters</h3>
                </div>

                {/* City Search */}
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-[#1A1A1A] mb-2">Location</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B6B6B]" />
                    <input 
                      type="text" 
                      placeholder="Enter city..." 
                      value={searchCity}
                      onChange={(e) => setSearchCity(e.target.value)}
                      className="w-full bg-[#F4F1ED] border-none rounded-lg pl-10 pr-4 py-2.5 text-sm focus:ring-2 focus:ring-[#C9540A] outline-none transition-shadow"
                    />
                  </div>
                </div>

                {/* Verified Toggle */}
                <div className="mb-6 pb-6 border-b border-[#E8E4DF]">
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <div className={`w-12 h-6 rounded-full transition-colors relative ${verifiedOnly ? 'bg-[#C9540A]' : 'bg-[#E8E4DF]'}`}>
                      <div className={`absolute top-1 left-1 bg-white w-4 h-4 rounded-full transition-transform ${verifiedOnly ? 'translate-x-6' : 'translate-x-0'}`} />
                    </div>
                    <input 
                      type="checkbox" 
                      className="sr-only" 
                      checked={verifiedOnly}
                      onChange={() => setVerifiedOnly(!verifiedOnly)}
                    />
                    <span className="text-sm font-semibold text-[#1A1A1A] flex items-center gap-1.5">
                      Verified Only <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    </span>
                  </label>
                </div>

                {/* Categories */}
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-[#1A1A1A] mb-3">Category</label>
                  <div className="flex flex-col gap-2">
                    {CATEGORIES.map(cat => (
                      <button 
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        className={`text-left px-3 py-2 rounded-lg text-sm transition-colors ${activeCategory === cat ? 'bg-[#C9540A] text-white font-medium' : 'text-[#6B6B6B] hover:bg-[#F4F1ED]'}`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Budget Range */}
                <div>
                  <label className="block text-sm font-semibold text-[#1A1A1A] mb-3">Subscription Tier</label>
                  <div className="flex flex-wrap gap-2">
                    {BUDGETS.map(budget => (
                      <button 
                        key={budget}
                        onClick={() => setActiveBudget(budget)}
                        className={`px-3 py-1.5 rounded-full text-xs transition-colors border ${activeBudget === budget ? 'bg-[#1A1A1A] border-[#1A1A1A] text-white' : 'border-[#E8E4DF] text-[#6B6B6B] hover:border-[#C9540A] hover:text-[#C9540A]'}`}
                      >
                        {budget}
                      </button>
                    ))}
                  </div>
                </div>

              </div>
            </aside>

            {/* MAIN CONTENT AREA */}
            <div className="w-full lg:w-3/4 flex flex-col gap-6">
              
              {/* Top Bar */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl shadow-sm border border-[#E8E4DF]">
                <p className="text-sm text-[#6B6B6B] font-medium">
                  Showing <span className="text-[#1A1A1A] font-bold">{filteredMembers.length}</span> results
                </p>
                
                <div className="relative">
                  <button 
                    onClick={() => setIsSortOpen(!isSortOpen)}
                    className="flex items-center gap-2 text-sm font-medium text-[#1A1A1A] bg-[#F4F1ED] px-4 py-2 rounded-lg hover:bg-[#E8E4DF] transition-colors"
                  >
                    Sort by: <span className="text-[#C9540A] capitalize">{sortBy}</span>
                    <ChevronDown className={`w-4 h-4 transition-transform ${isSortOpen ? 'rotate-180' : ''}`} />
                  </button>
                  
                  {isSortOpen && (
                    <div className="absolute top-full right-0 mt-2 w-48 bg-white border border-[#E8E4DF] rounded-xl shadow-lg overflow-hidden z-10">
                      {[
                        { id: 'featured', label: '⭐ Featured' },
                        { id: 'viewed', label: '👁️ Most Viewed' },
                        { id: 'active', label: '📩 Most Active' }
                      ].map(option => (
                        <button
                          key={option.id}
                          onClick={() => { setSortBy(option.id); setIsSortOpen(false); }}
                          className={`w-full text-left px-4 py-3 text-sm hover:bg-[#F4F1ED] transition-colors ${sortBy === option.id ? 'font-bold text-[#C9540A]' : 'text-[#1A1A1A]'}`}
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Grid of Members */}
              {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {[1, 2, 3].map((n) => (
                    <div key={n} className="bg-white rounded-2xl border border-[#E8E4DF] h-[400px] animate-pulse" />
                  ))}
                </div>
              ) : filteredMembers.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredMembers.map(member => (
                    <motion.div 
                      key={member.username}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3 }}
                      className="bg-white rounded-2xl border border-[#E8E4DF] overflow-hidden hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)] transition-all duration-300 group flex flex-col h-full"
                    >
                      {/* Card Image */}
                      <div className="relative h-48 w-full overflow-hidden bg-[#F4F1ED]">
                        {member.coverImage && (member.coverImage.startsWith("data:image/") || member.coverImage.startsWith("http")) ? (
                          <img 
                            src={member.coverImage} 
                            alt={member.name} 
                            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                          />
                        ) : (
                          <Image 
                            src={member.coverImage || "/images/programs/programs_women_meeting_1779275083144.png"} 
                            alt={member.name} 
                            fill 
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        )}
                        {/* Badges */}
                        <div className="absolute top-3 left-3 flex flex-col gap-2">
                          {member.plan === "Featured" && (
                            <span className="bg-[#1A1A1A]/90 backdrop-blur-sm text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md flex items-center gap-1">
                              <span>⭐</span> Featured
                            </span>
                          )}
                        </div>
                      </div>
                      
                      {/* Card Body */}
                      <div className="p-5 flex flex-col flex-1">
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <h3 className="font-bold text-lg text-[#1A1A1A] line-clamp-1">{member.name}</h3>
                          {member.verified && (
                            <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                          )}
                        </div>
                        
                        <div className="flex items-center gap-1.5 text-xs font-medium text-[#C9540A] mb-3">
                          <span className="bg-[#F4F1ED] px-2 py-0.5 rounded-md">{member.category}</span>
                          <span className="text-[#E8E4DF]">•</span>
                          <span className="flex items-center gap-1"><MapPin className="w-3 h-3"/> {member.city}</span>
                        </div>
                        
                        <p className="text-sm text-[#6B6B6B] line-clamp-2 mb-4 flex-1">
                          {member.tagline || member.bio}
                        </p>
                        
                        {/* Rating & Stats */}
                        <div className="flex items-center justify-between py-3 border-t border-[#E8E4DF] mt-auto">
                          <div className="flex items-center gap-1">
                            <span className="text-amber-400 text-sm">★</span>
                            <span className="text-sm font-bold text-[#1A1A1A]">{member.rating.toFixed(1)}</span>
                          </div>
                          <div className="text-[11px] text-[#6B6B6B] flex gap-3">
                            <span title="Profile Views">👁️ {member.views}</span>
                            <span title="Leads Generated">📩 {member.leadsCount}</span>
                          </div>
                        </div>

                        {/* CTAs */}
                        <div className="grid grid-cols-2 gap-2 mt-4">
                          <a 
                            href={`https://wa.me/${member.contact.whatsapp}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-1.5 py-2 px-3 bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366] hover:text-white rounded-lg text-xs font-bold transition-colors"
                          >
                            <MessageCircle className="w-3.5 h-3.5" /> WhatsApp
                          </a>
                          <a href={`/member/${member.username}`} className="flex items-center justify-center gap-1.5 py-2 px-3 bg-[#F4F1ED] text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white rounded-lg text-xs font-bold transition-colors">
                            View Profile
                          </a>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="bg-white border border-[#E8E4DF] rounded-2xl p-12 text-center flex flex-col items-center justify-center">
                  <Search className="w-12 h-12 text-[#E8E4DF] mb-4" />
                  <h3 className="text-xl font-bold text-[#1A1A1A] mb-2">No members found</h3>
                  <p className="text-[#6B6B6B] max-w-md">Try adjusting your filters, searching for a different city, or broadening your category filter to see more results.</p>
                  <button 
                    onClick={() => {
                      setActiveCategory("All");
                      setSearchCity("");
                      setActiveBudget("All");
                      setVerifiedOnly(false);
                    }}
                    className="mt-6 px-6 py-2 bg-[#F4F1ED] hover:bg-[#E8E4DF] text-[#1A1A1A] font-semibold rounded-lg transition-colors text-sm"
                  >
                    Clear All Filters
                  </button>
                </div>
              )}
              
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
