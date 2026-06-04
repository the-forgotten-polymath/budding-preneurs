"use client";

import NavAuth from "@/components/NavAuth";
import React, { useState, useEffect, use } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Menu,
  X,
  MapPin,
  CheckCircle2,
  Phone,
  MessageCircle,
  Mail,
  Globe,
  Share2,
  Download,
  Star
} from "lucide-react";
import Footer from "@/components/Footer";

interface ServiceCatalogItem {
  name: string;
  price: string;
  description: string;
  imageUrl?: string;
}

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
  social: {
    instagram: string;
    facebook: string;
    linkedin: string;
  };
  services: ServiceCatalogItem[];
}

// Inquiry Modal Component with Real-time POST integration
function InquiryModal({ 
  isOpen, 
  onClose, 
  memberUsername, 
  memberName 
}: { 
  isOpen: boolean, 
  onClose: () => void, 
  memberUsername: string, 
  memberName: string 
}) {
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [clientMessage, setClientMessage] = useState("");

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          memberUsername,
          clientName,
          clientEmail,
          clientPhone,
          clientMessage
        })
      });

      const data = await res.json();
      if (data.success) {
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
          onClose();
          // Reset form state
          setClientName("");
          setClientEmail("");
          setClientPhone("");
          setClientMessage("");
        }, 2000);
      } else {
        alert(data.error || "Failed to submit inquiry. Please try again.");
      }
    } catch (err) {
      console.error("Error submitting lead:", err);
      alert("Something went wrong. Please check your network connection.");
    } finally {
      setSubmitting(false);
    }
  };
  
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-[#1A1A1A]/60 backdrop-blur-sm" onClick={onClose} />
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="bg-white rounded-2xl shadow-xl w-full max-w-md relative z-10 overflow-hidden"
      >
        <div className="p-6 border-b border-[#E8E4DF] flex justify-between items-center bg-[#FAF8F5]">
          <h3 className="text-xl font-bold text-[#1A1A1A]">Inquire with {memberName}</h3>
          <button onClick={onClose} className="p-2 text-[#6B6B6B] hover:bg-[#E8E4DF] rounded-full transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        {success ? (
          <div className="p-8 text-center flex flex-col items-center justify-center">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-4">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="text-lg font-bold text-[#1A1A1A] mb-2">Inquiry Dispatched!</h4>
            <p className="text-sm text-[#6B6B6B]">Your requirement was sent directly to {memberName} in real-time.</p>
          </div>
        ) : (
          <form className="p-6 flex flex-col gap-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-semibold text-[#1A1A1A] mb-1.5">Your Name *</label>
              <input 
                required 
                type="text" 
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                className="w-full bg-[#F4F1ED] border-none rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-[#C9540A] outline-none" 
                placeholder="John Doe" 
              />
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-[#1A1A1A] mb-1.5">Phone Number *</label>
              <input 
                required 
                type="tel" 
                value={clientPhone}
                onChange={(e) => setClientPhone(e.target.value)}
                className="w-full bg-[#F4F1ED] border-none rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-[#C9540A] outline-none" 
                placeholder="10-digit number" 
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#1A1A1A] mb-1.5">Email *</label>
              <input 
                required 
                type="email" 
                value={clientEmail}
                onChange={(e) => setClientEmail(e.target.value)}
                className="w-full bg-[#F4F1ED] border-none rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-[#C9540A] outline-none" 
                placeholder="john@example.com" 
              />
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-[#1A1A1A] mb-1.5">Requirement Details *</label>
              <textarea 
                required 
                rows={3} 
                maxLength={200}
                value={clientMessage}
                onChange={(e) => setClientMessage(e.target.value)}
                className="w-full bg-[#F4F1ED] border-none rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-[#C9540A] outline-none resize-none" 
                placeholder="Tell them what you are looking for..."
              ></textarea>
            </div>
            
            <button 
              type="submit" 
              disabled={submitting}
              className="w-full py-3.5 bg-[#C9540A] hover:bg-[#A8420A] disabled:bg-gray-400 text-white font-bold rounded-lg transition-colors mt-2 shadow-md flex items-center justify-center gap-2"
            >
              {submitting ? "Sending Inquiry..." : "Send Inquiry"}
            </button>
          </form>
        )}
      </motion.div>
    </div>
  );
}

export default function MemberProfilePage({ params }: { params: Promise<{ username: string }> }) {
  const resolvedParams = use(params);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isInquiryModalOpen, setIsInquiryModalOpen] = useState(false);
  
  // Real-time dynamic states
  const [member, setMember] = useState<Member | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchMember = async () => {
    try {
      const res = await fetch("/api/members");
      const data = await res.json();
      if (data.success) {
        const found = data.data.find((m: Member) => m.username === resolvedParams.username);
        // Fallback to the first available member if not found to keep layout stable
        setMember(found || data.data[0]);
      }
    } catch (err) {
      console.error("Failed to load member profile:", err);
    } finally {
      setLoading(false);
    }
  };

  const recordProfileView = async () => {
    try {
      await fetch("/api/members/view", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: resolvedParams.username })
      });
    } catch (err) {
      console.error("Failed to register profile view:", err);
    }
  };

  useEffect(() => {
    fetchMember();
    recordProfileView();

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [resolvedParams.username]);

  const handleWhatsApp = () => {
    if (!member) return;
    window.open(`https://wa.me/${member.contact.whatsapp}?text=Hi+I+found+you+on+Buddingpreneurs+(Ref:+BP-${member.username}).+Could+we+connect?`, "_blank");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FAF8F5] flex items-center justify-center">
        <div className="w-12 h-12 rounded-full border-4 border-[#C9540A] border-t-transparent animate-spin"></div>
      </div>
    );
  }

  if (!member) {
    return (
      <div className="min-h-screen bg-[#FAF8F5] flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold mb-2">Member Profile Not Found</h2>
        <a href="/directory" className="text-[#C9540A] font-bold hover:underline">Back to Directory</a>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1A1A1A] flex flex-col relative font-sans">
      
      {/* HEADER */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-white/80 backdrop-blur-md border-b border-[#E8E4DF] py-3 shadow-sm" : "bg-white py-4 border-b border-[#E8E4DF]"}`}>
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2 group">
            <span className="text-xl font-black tracking-tight text-[#1A1A1A]">Buddingpreneurs</span>
          </a>

          <nav className="hidden lg:flex flex-wrap items-center justify-center gap-4 xl:gap-6">
            <a href="/" className="text-xs font-semibold text-[#1A1A1A] hover:text-[#C9540A]">Home</a>
            <a href="/directory" className="text-xs font-semibold text-[#1A1A1A] hover:text-[#C9540A]">Directory</a>
            <a href="/programs" className="text-xs font-semibold text-[#1A1A1A] hover:text-[#C9540A]">Our Programs</a>
          </nav>

          <div className="flex items-center gap-4">
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="lg:hidden p-2 text-[#1A1A1A] hover:bg-[#F4F1ED] rounded-lg">
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 pt-[72px]">
        {/* HERO BANNER */}
        <div className="w-full h-48 md:h-80 relative bg-[#1A1A1A]">
          {member.coverImage && (member.coverImage.startsWith("data:image/") || member.coverImage.startsWith("http")) ? (
            <img src={member.coverImage} alt="Cover" className="w-full h-full object-cover opacity-80" />
          ) : (
            <Image src={member.coverImage || "/images/programs/programs_women_meeting_1779275083144.png"} alt="Cover" fill className="object-cover opacity-80" />
          )}
        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-12 relative">
          
          <div className="flex flex-col lg:flex-row gap-8 pb-24">
            
            {/* MAIN CONTENT (Left) */}
            <div className="w-full lg:w-2/3 -mt-16 relative z-10">
              
              {/* Identity Block */}
              <div className="bg-white rounded-2xl shadow-sm border border-[#E8E4DF] p-6 md:p-8 mb-8">
                <div className="flex flex-col sm:flex-row gap-6 items-start">
                  
                  {/* Profile Photo */}
                  <div className="relative w-32 h-32 rounded-full border-4 border-white shadow-md overflow-hidden bg-[#F4F1ED] shrink-0 flex items-center justify-center font-bold text-3xl text-white bg-[#C9540A]">
                    {member.logo ? (
                      <img src={member.logo} alt={member.name} className="w-full h-full object-cover" />
                    ) : (
                      member.name.substring(0,2).toUpperCase()
                    )}
                  </div>
                  
                  {/* Title and Badges */}
                  <div className="flex-1 pt-2">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <h1 className="text-2xl md:text-3xl font-black text-[#1A1A1A] font-display uppercase tracking-tight">{member.name}</h1>
                      {member.verified && <CheckCircle2 className="w-6 h-6 text-emerald-500" />}
                    </div>
                    
                    <div className="flex flex-wrap items-center gap-3 text-sm font-medium mb-4">
                      <span className="bg-[#C9540A]/10 text-[#C9540A] px-2.5 py-1 rounded-md">{member.category}</span>
                      <span className="flex items-center gap-1 text-[#6B6B6B]"><MapPin className="w-4 h-4"/> {member.city}</span>
                      <span className="text-[#6B6B6B]">Member since {member.joinDate}</span>
                    </div>

                    <div className="flex items-center gap-1">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`w-4 h-4 ${i < Math.floor(member.rating) ? 'text-amber-400 fill-amber-400' : 'text-gray-300'}`} />
                        ))}
                      </div>
                      <span className="font-bold text-[#1A1A1A] ml-1">{member.rating.toFixed(1)}</span>
                      <span className="text-sm text-[#6B6B6B]">({member.reviewsCount} reviews)</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* About / USP */}
              <div className="bg-white rounded-2xl shadow-sm border border-[#E8E4DF] p-6 md:p-8 mb-8">
                <h2 className="text-xl font-bold mb-4 font-display uppercase tracking-wide">About <span className="text-[#C9540A] italic font-heading capitalize">Us</span></h2>
                <p className="text-[#6B6B6B] leading-relaxed whitespace-pre-line">
                  {member.bio || member.tagline}
                </p>
              </div>

              {/* Services / Products */}
              {member.services && member.services.length > 0 && (
                <div className="mb-8">
                  <h2 className="text-xl font-bold mb-6 font-display uppercase tracking-wide">Products & <span className="text-[#C9540A] italic font-heading capitalize">Services</span></h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {member.services.map((service, index) => (
                      <div key={index} className="bg-white rounded-xl border border-[#E8E4DF] overflow-hidden hover:shadow-md transition-shadow group flex flex-col h-full">
                        {service.imageUrl && (
                          <div className="relative h-48 w-full overflow-hidden bg-[#F4F1ED]">
                            <img 
                              src={service.imageUrl} 
                              alt={service.name} 
                              className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500" 
                            />
                          </div>
                        )}
                        <div className="p-5 flex-1 flex flex-col justify-between">
                          <div>
                            <h3 className="font-bold text-[#1A1A1A] mb-2 text-lg">{service.name}</h3>
                            <p className="text-sm text-[#6B6B6B] mb-4 line-clamp-3">{service.description}</p>
                          </div>
                          <div>
                            <div className="text-sm font-bold text-[#C9540A] bg-[#F4F1ED] inline-block px-3 py-1.5 rounded-lg mt-2">
                              {service.price}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* ACTION LAYER */}
            <div className="w-full lg:w-1/3 lg:-mt-16 relative z-20">
              
              <div className="bg-white rounded-2xl shadow-lg border border-[#E8E4DF] p-6 sticky top-24">
                
                <h3 className="font-bold text-lg mb-6 border-b border-[#E8E4DF] pb-4">Connect with {member.name}</h3>
                
                <div className="flex flex-col gap-3">
                  {/* WhatsApp CTA */}
                  <button onClick={handleWhatsApp} className="w-full flex items-center justify-center gap-2 py-3.5 bg-[#25D366] hover:bg-[#1DA851] text-white font-bold rounded-xl transition-all shadow-sm">
                    <MessageCircle className="w-5 h-5" /> Chat on WhatsApp
                  </button>
                  
                  {/* Inquiry CTA */}
                  <button onClick={() => setIsInquiryModalOpen(true)} className="w-full flex items-center justify-center gap-2 py-3.5 bg-[#C9540A] hover:bg-[#A8420A] text-white font-bold rounded-xl transition-all shadow-sm">
                    <Mail className="w-5 h-5" /> Send Inquiry
                  </button>

                  <div className="grid grid-cols-2 gap-3 mt-2">
                    <a href={`tel:${member.contact.phone}`} className="flex items-center justify-center gap-2 py-3 bg-[#F4F1ED] hover:bg-[#E8E4DF] text-[#1A1A1A] font-semibold rounded-xl transition-colors text-sm">
                      <Phone className="w-4 h-4" /> Call Now
                    </a>
                    <button className="flex items-center justify-center gap-2 py-3 bg-[#F4F1ED] hover:bg-[#E8E4DF] text-[#1A1A1A] font-semibold rounded-xl transition-colors text-sm">
                      <Download className="w-4 h-4" /> Save Contact
                    </button>
                  </div>
                </div>

                {/* Social & Web Links */}
                <div className="mt-8 pt-6 border-t border-[#E8E4DF]">
                  <h4 className="text-sm font-bold text-[#6B6B6B] mb-4 uppercase tracking-wider">Social Links</h4>
                  <div className="flex flex-col gap-2">
                    {member.contact.website && (
                      <a href={member.contact.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 py-2 px-3 bg-[#F4F1ED] text-sm text-[#1A1A1A] hover:bg-[#C9540A] hover:text-white rounded-lg transition-colors font-bold">
                        <Globe className="w-4 h-4" /> Website
                      </a>
                    )}
                    {member.social.instagram && (
                      <a href={member.social.instagram} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 py-2 px-3 bg-[#F4F1ED] text-sm text-[#1A1A1A] hover:bg-[#C9540A] hover:text-white rounded-lg transition-colors font-bold">
                        Instagram
                      </a>
                    )}
                    {member.social.facebook && (
                      <a href={member.social.facebook} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 py-2 px-3 bg-[#F4F1ED] text-sm text-[#1A1A1A] hover:bg-[#C9540A] hover:text-white rounded-lg transition-colors font-bold">
                        Facebook
                      </a>
                    )}
                  </div>
                </div>

              </div>
              
            </div>

          </div>
        </div>
      </main>

      <Footer />
      
      {/* Mobile Sticky Action Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-[#E8E4DF] p-4 shadow-[0_-10px_40px_rgba(0,0,0,0.05)] z-40 flex gap-3">
        <button onClick={handleWhatsApp} className="flex-1 flex items-center justify-center gap-2 py-3 bg-[#25D366] text-white font-bold rounded-xl shadow-sm text-sm">
          <MessageCircle className="w-4 h-4" /> WhatsApp
        </button>
        <button onClick={() => setIsInquiryModalOpen(true)} className="flex-1 flex items-center justify-center gap-2 py-3 bg-[#C9540A] text-white font-bold rounded-xl shadow-sm text-sm">
          <Mail className="w-4 h-4" /> Inquire
        </button>
      </div>

      <AnimatePresence>
        {isInquiryModalOpen && (
          <InquiryModal 
            isOpen={isInquiryModalOpen} 
            onClose={() => setIsInquiryModalOpen(false)} 
            memberUsername={member.username}
            memberName={member.name} 
          />
        )}
      </AnimatePresence>
    </div>
  );
}
