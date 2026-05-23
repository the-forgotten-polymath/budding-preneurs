"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users,
  Eye,
  MessageSquare,
  TrendingUp,
  Search,
  Filter,
  CheckCircle2,
  XCircle,
  Clock,
  ChevronRight,
  LogOut,
  Settings,
  LayoutDashboard,
  User,
  Menu,
  X,
  Phone,
  Mail,
  Edit,
  ScanLine,
  QrCode,
  Share2,
  Download
} from "lucide-react";
import Image from "next/image";

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

interface Lead {
  id: string;
  memberUsername: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  clientMessage: string;
  status: "New" | "Contacted" | "Converted" | "Lost";
  timestamp: string;
}

export default function DashboardPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("overview");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchLead, setSearchLead] = useState("");
  const [copySuccess, setCopySuccess] = useState(false);

  // Auth & CRM State
  const [sessionUser, setSessionUser] = useState<{ username: string; name: string; role: string } | null>(null);
  const [member, setMember] = useState<Member | null>(null);
  const [currentUsername, setCurrentUsername] = useState<string>("");
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [savingProfile, setSavingProfile] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Profile cover image upload state
  const [coverImageState, setCoverImageState] = useState("");

  useEffect(() => {
    if (member) {
      setCoverImageState(member.coverImage || "");
    }
  }, [member]);

  const handleBannerUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      alert("Image is too large. Please select a file under 10MB.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new window.Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const MAX_WIDTH = 1200;
        let width = img.width;
        let height = img.height;

        if (width > MAX_WIDTH) {
          height = Math.round((height * MAX_WIDTH) / width);
          width = MAX_WIDTH;
        }

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          const dataUrl = canvas.toDataURL("image/jpeg", 0.7);
          setCoverImageState(dataUrl);
        }
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  // Products and services manager state
  const [services, setServices] = useState<ServiceCatalogItem[]>([]);
  const [newServiceName, setNewServiceName] = useState("");
  const [newServicePrice, setNewServicePrice] = useState("");
  const [newServiceDesc, setNewServiceDesc] = useState("");
  const [newServiceImageUrl, setNewServiceImageUrl] = useState("");

  const fetchDashboardData = async (username: string) => {
    setCurrentUsername(username);
    try {
      const memberRes = await fetch("/api/members");
      const memberData = await memberRes.json();
      if (memberData.success) {
        const found = memberData.data.find((m: Member) => m.username === username);
        if (found) {
          setMember(found);
          setServices(found.services || []);
        }
      }
      const leadsRes = await fetch(`/api/leads?username=${username}`);
      const leadsData = await leadsRes.json();
      if (leadsData.success) setLeads(leadsData.data);
    } catch (err) {
      console.error("Failed to load dashboard data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Check real session
    fetch("/api/auth/me")
      .then((r) => r.json())
      .then((data) => {
        if (data.success && data.user) {
          setSessionUser(data.user);
          fetchDashboardData(data.user.username);
        } else {
          // Not authenticated — middleware should have caught this, but double-guard
          router.push("/login?redirect=/dashboard");
        }
      })
      .catch(() => router.push("/login?redirect=/dashboard"));
  }, []);

  const handleSignOut = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/");
    router.refresh();
  };

  const handleStatusChange = async (leadId: string, newStatus: string) => {
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "updateStatus",
          leadId,
          newStatus
        })
      });
      const data = await res.json();
      if (data.success) {
        // Refresh dynamic metrics and table in real-time
        await fetchDashboardData(currentUsername);
      }
    } catch (err) {
      console.error("Failed to update status in real-time:", err);
    }
  };

  const handleProfileSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!member) return;
    setSavingProfile(true);
    setSaveSuccess(false);

    const formData = new FormData(e.currentTarget);
    const updatedMember = {
      username: member.username,
      name: formData.get("name") as string,
      category: formData.get("category") as string,
      city: formData.get("city") as string,
      bio: formData.get("bio") as string,
      coverImage: formData.get("coverImage") as string,
      contact: {
        ...member.contact,
        phone: formData.get("phone") as string,
        whatsapp: formData.get("whatsapp") as string,
        website: formData.get("website") as string,
      },
      services // Sync up-to-date custom catalog
    };

    try {
      const res = await fetch("/api/members", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedMember)
      });
      const data = await res.json();
      if (data.success) {
        setMember(data.data);
        setSaveSuccess(true);
        // Refresh in real-time to sync all state
        await fetchDashboardData(member.username);
        setTimeout(() => setSaveSuccess(false), 3000);
      }
    } catch (err) {
      console.error("Failed to save profile:", err);
      alert("Error saving profile details.");
    } finally {
      setSavingProfile(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case "New": return "bg-blue-100 text-blue-700 border border-blue-200";
      case "Contacted": return "bg-amber-100 text-amber-700 border border-amber-200";
      case "Converted": return "bg-emerald-100 text-emerald-700 border border-emerald-200";
      case "Lost": return "bg-red-100 text-red-700 border border-red-200";
      default: return "bg-gray-100 text-gray-700 border border-gray-200";
    }
  };

  const getStatusIcon = (status: string) => {
    switch(status) {
      case "New": return <div className="w-2 h-2 rounded-full bg-blue-500 mr-2" />;
      case "Contacted": return <Clock className="w-3 h-3 mr-1" />;
      case "Converted": return <CheckCircle2 className="w-3 h-3 mr-1" />;
      case "Lost": return <XCircle className="w-3 h-3 mr-1" />;
      default: return null;
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  const downloadVCard = () => {
    if (!member) return;
    const vcardContent = `BEGIN:VCARD
VERSION:3.0
N:${member.name};;;
FN:${member.name}
ORG:${member.name}
TITLE:${member.category} member at Buddingpreneurs
TEL;TYPE=CELL:${member.contact.phone}
EMAIL;TYPE=PREF,INTERNET:${member.contact.email}
URL:${member.contact.website || 'https://buddingpreneurs.com'}
ADR;TYPE=WORK:;;${member.city};;;India
NOTE:Found via Buddingpreneurs Network
END:VCARD`;

    const blob = new Blob([vcardContent], { type: "text/vcard;charset=utf-8" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `${member.username}.vcf`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
      <div className="min-h-screen bg-[#FAF8F5] flex items-center justify-center p-6 text-center">
        <div>
          <h2 className="text-2xl font-bold mb-2">Member Dashboard Loading Error</h2>
          <p className="text-[#6B6B6B]">Please register or sign in to continue.</p>
        </div>
      </div>
    );
  }

  // Calculate live values
  const conversionRate = member.leadsCount > 0 
    ? ((member.conversions / member.leadsCount) * 100).toFixed(1) + "%"
    : "0.0%";

  const newLeadsCount = leads.filter(l => l.status === "New").length;

  const filteredLeads = leads.filter(lead => 
    lead.clientName.toLowerCase().includes(searchLead.toLowerCase()) || 
    lead.clientMessage.toLowerCase().includes(searchLead.toLowerCase())
  );

  const publicProfileLink = typeof window !== "undefined" 
    ? `${window.location.origin}/member/${member.username}` 
    : `https://buddingpreneurs.com/member/${member.username}`;

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1A1A1A] flex font-sans">
      
      {/* MOBILE HEADER */}
      <div className="lg:hidden fixed top-0 left-0 right-0 bg-white border-b border-[#E8E4DF] px-6 py-4 flex items-center justify-between z-50">
        <span className="text-lg font-black tracking-tight text-[#1A1A1A]">Buddingpreneurs</span>
        <button onClick={() => setIsSidebarOpen(true)} className="p-2 bg-[#F4F1ED] rounded-lg">
          <Menu className="w-5 h-5" />
        </button>
      </div>

      {/* SIDEBAR */}
      <AnimatePresence>
        {(isSidebarOpen || (typeof window !== 'undefined' && window.innerWidth >= 1024)) && (
          <motion.aside 
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            transition={{ type: "spring", bounce: 0, duration: 0.4 }}
            className={`fixed lg:sticky top-0 left-0 z-[60] lg:z-auto h-screen w-72 bg-white border-r border-[#E8E4DF] flex flex-col ${isSidebarOpen ? 'block' : 'hidden lg:flex'}`}
          >
            <div className="p-6 flex items-center justify-between border-b border-[#E8E4DF]">
              <span className="text-xl font-black tracking-tight text-[#1A1A1A]">Buddingpreneurs</span>
              <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden p-2 hover:bg-[#F4F1ED] rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 pb-2 border-b border-[#E8E4DF]">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-[#C9540A] text-white flex items-center justify-center font-bold text-lg shadow-sm border border-white shrink-0">
                  {member.logo ? member.logo : member.name.substring(0, 2).toUpperCase()}
                </div>
                <div>
                  <h3 className="font-bold text-[#1A1A1A] leading-tight truncate max-w-[160px]">{member.name}</h3>
                  <p className="text-xs text-[#6B6B6B]">Member ID: BP-{member.username}</p>
                </div>
              </div>

              <div className="mb-4">
                <div className="flex justify-between text-xs font-semibold mb-2">
                  <span className="text-[#1A1A1A]">Profile Level</span>
                  <span className="text-[#C9540A] font-bold">{member.plan}</span>
                </div>
                <div className="w-full bg-[#F4F1ED] rounded-full h-2 overflow-hidden mb-4">
                  <div className="bg-[#C9540A] h-full rounded-full w-full" />
                </div>

                {/* Signed-in member info */}
                <div className="bg-[#FAF8F5] p-3 rounded-xl border border-[#E8E4DF]">
                  <p className="text-[10px] font-bold text-[#6B6B6B] uppercase tracking-wider mb-1">Signed in as</p>
                  <p className="text-xs font-bold text-[#1A1A1A] truncate">{sessionUser?.name || member?.name}</p>
                  <p className="text-[11px] text-[#C9540A] font-mono">@{currentUsername}</p>
                </div>
              </div>
            </div>

            <nav className="flex-1 p-4 flex flex-col gap-2">
              <button 
                onClick={() => { setActiveTab("overview"); setIsSidebarOpen(false); }}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-colors ${activeTab === "overview" ? "bg-[#1A1A1A] text-white" : "text-[#6B6B6B] hover:bg-[#F4F1ED] hover:text-[#1A1A1A]"}`}
              >
                <LayoutDashboard className="w-5 h-5" /> Overview
              </button>
              <button 
                onClick={() => { setActiveTab("leads"); setIsSidebarOpen(false); }}
                className={`flex items-center justify-between px-4 py-3 rounded-xl font-semibold transition-colors ${activeTab === "leads" ? "bg-[#1A1A1A] text-white" : "text-[#6B6B6B] hover:bg-[#F4F1ED] hover:text-[#1A1A1A]"}`}
              >
                <div className="flex items-center gap-3">
                  <Users className="w-5 h-5" /> Leads Inbox
                </div>
                {newLeadsCount > 0 && (
                  <span className="text-xs px-2 py-0.5 rounded-full bg-[#C9540A] text-white font-bold">
                    {newLeadsCount} New
                  </span>
                )}
              </button>
              <button 
                onClick={() => { setActiveTab("profile"); setIsSidebarOpen(false); }}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-colors ${activeTab === "profile" ? "bg-[#1A1A1A] text-white" : "text-[#6B6B6B] hover:bg-[#F4F1ED] hover:text-[#1A1A1A]"}`}
              >
                <User className="w-5 h-5" /> Edit Profile
              </button>
              <button 
                onClick={() => { setActiveTab("vcard"); setIsSidebarOpen(false); }}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-colors ${activeTab === "vcard" ? "bg-[#1A1A1A] text-white" : "text-[#6B6B6B] hover:bg-[#F4F1ED] hover:text-[#1A1A1A]"}`}
              >
                <ScanLine className="w-5 h-5" /> V-Card & QR
              </button>
            </nav>

            <div className="p-4 border-t border-[#E8E4DF]">
              <button
                onClick={handleSignOut}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-semibold text-red-600 hover:bg-red-50 transition-colors"
              >
                <LogOut className="w-5 h-5" /> Sign Out
              </button>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* OVERLAY FOR MOBILE SIDEBAR */}
      {isSidebarOpen && (
        <div className="fixed inset-0 bg-[#1A1A1A]/40 backdrop-blur-sm z-[50] lg:hidden" onClick={() => setIsSidebarOpen(false)} />
      )}

      {/* MAIN CONTENT */}
      <main className="flex-1 w-full lg:w-[calc(100%-18rem)] pt-20 lg:pt-0">
        
        <div className="p-6 md:p-10 max-w-6xl mx-auto">
          
          {/* TAB: OVERVIEW */}
          {activeTab === "overview" && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
              
              <div className="mb-8">
                <h1 className="text-3xl font-black text-[#1A1A1A] font-display uppercase tracking-tight mb-2">Dashboard <span className="text-[#C9540A] italic font-heading capitalize">Overview</span></h1>
                <p className="text-[#6B6B6B]">Welcome back! Here's how your business profile is performing.</p>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-10">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#E8E4DF] flex flex-col">
                  <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center mb-4">
                    <Eye className="w-5 h-5" />
                  </div>
                  <h4 className="text-sm font-semibold text-[#6B6B6B] mb-1">Profile Views</h4>
                  <p className="text-3xl font-black text-[#1A1A1A]">{member.views}</p>
                  <div className="mt-2 text-xs font-semibold text-emerald-600 flex items-center gap-1"><TrendingUp className="w-3 h-3"/> Direct scans active</div>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#E8E4DF] flex flex-col">
                  <div className="w-10 h-10 rounded-lg bg-amber-100 text-amber-600 flex items-center justify-center mb-4">
                    <Users className="w-5 h-5" />
                  </div>
                  <h4 className="text-sm font-semibold text-[#6B6B6B] mb-1">Total Inquiries</h4>
                  <p className="text-3xl font-black text-[#1A1A1A]">{member.leadsCount}</p>
                  <div className="mt-2 text-xs font-semibold text-[#6B6B6B]">Dispatched in CRM</div>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#E8E4DF] flex flex-col">
                  <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center mb-4">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <h4 className="text-sm font-semibold text-[#6B6B6B] mb-1">Conversion Rate</h4>
                  <p className="text-3xl font-black text-[#1A1A1A]">{conversionRate}</p>
                  <div className="mt-2 text-xs font-semibold text-emerald-600 flex items-center gap-1"><TrendingUp className="w-3 h-3"/> {member.conversions} closed deals</div>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#E8E4DF] flex flex-col">
                  <div className="w-10 h-10 rounded-lg bg-[#C9540A]/10 text-[#C9540A] flex items-center justify-center mb-4">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <h4 className="text-sm font-semibold text-[#6B6B6B] mb-1">Feedback Rating</h4>
                  <p className="text-3xl font-black text-[#1A1A1A]">{member.rating.toFixed(1)}</p>
                  <div className="mt-2 text-xs font-semibold text-[#6B6B6B]">From {member.reviewsCount} reviews</div>
                </div>
              </div>

              {/* Recent Leads Preview */}
              <div className="bg-white rounded-2xl shadow-sm border border-[#E8E4DF] overflow-hidden">
                <div className="p-6 border-b border-[#E8E4DF] flex items-center justify-between">
                  <h3 className="font-bold text-lg text-[#1A1A1A]">Recent Leads</h3>
                  <button onClick={() => setActiveTab("leads")} className="text-sm font-semibold text-[#C9540A] hover:text-[#A8420A] flex items-center gap-1">
                    View All <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
                <div className="divide-y divide-[#E8E4DF]">
                  {leads.slice(0, 3).map(lead => (
                    <div key={lead.id} className="p-6 hover:bg-[#F4F1ED] transition-colors flex flex-col md:flex-row md:items-center gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-1">
                          <h4 className="font-bold text-[#1A1A1A]">{lead.clientName}</h4>
                          <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md flex items-center ${getStatusColor(lead.status)}`}>
                            {getStatusIcon(lead.status)}
                            {lead.status}
                          </span>
                        </div>
                        <p className="text-sm text-[#6B6B6B] line-clamp-1">{lead.clientMessage}</p>
                      </div>
                      <div className="flex items-center gap-4 text-sm font-medium">
                        <span className="text-[#6B6B6B] hidden sm:block">
                          {new Date(lead.timestamp).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                        </span>
                        <button onClick={() => setActiveTab("leads")} className="px-4 py-2 bg-white border border-[#E8E4DF] hover:border-[#1A1A1A] text-[#1A1A1A] rounded-lg transition-colors font-bold text-xs">
                          CRM Inbox
                        </button>
                      </div>
                    </div>
                  ))}
                  {leads.length === 0 && (
                    <div className="p-8 text-center text-[#6B6B6B]">
                      No leads received yet. Share your profile QR code to attract inquiries!
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB: LEADS INBOX */}
          {activeTab === "leads" && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                <div>
                  <h1 className="text-3xl font-black text-[#1A1A1A] font-display uppercase tracking-tight mb-2">Leads <span className="text-[#C9540A] italic font-heading capitalize">Inbox</span></h1>
                  <p className="text-[#6B6B6B]">Manage your inquiries and track conversions.</p>
                </div>
                
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B6B6B]" />
                  <input 
                    type="text" 
                    placeholder="Search leads..." 
                    value={searchLead}
                    onChange={(e) => setSearchLead(e.target.value)}
                    className="w-full sm:w-64 bg-white border border-[#E8E4DF] rounded-xl pl-10 pr-4 py-2.5 text-sm focus:ring-2 focus:ring-[#C9540A] outline-none"
                  />
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-sm border border-[#E8E4DF] overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse min-w-[800px]">
                    <thead>
                      <tr className="bg-[#F4F1ED] border-b border-[#E8E4DF]">
                        <th className="p-4 font-bold text-xs text-[#1A1A1A] uppercase tracking-wider">Date</th>
                        <th className="p-4 font-bold text-xs text-[#1A1A1A] uppercase tracking-wider">Client Details</th>
                        <th className="p-4 font-bold text-xs text-[#1A1A1A] uppercase tracking-wider">Requirement</th>
                        <th className="p-4 font-bold text-xs text-[#1A1A1A] uppercase tracking-wider">Status</th>
                        <th className="p-4 font-bold text-xs text-[#1A1A1A] uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E8E4DF]">
                      {filteredLeads.map((lead) => (
                        <tr key={lead.id} className="hover:bg-[#FAF8F5] transition-colors">
                          <td className="p-4 text-sm text-[#6B6B6B] whitespace-nowrap">
                            {new Date(lead.timestamp).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                          </td>
                          <td className="p-4">
                            <div className="font-bold text-[#1A1A1A]">{lead.clientName}</div>
                            <div className="text-xs text-[#6B6B6B] flex items-center gap-1 mt-1"><Phone className="w-3 h-3"/> {lead.clientPhone}</div>
                            <div className="text-xs text-[#6B6B6B] flex items-center gap-1 mt-0.5"><Mail className="w-3 h-3"/> {lead.clientEmail}</div>
                          </td>
                          <td className="p-4 text-sm text-[#6B6B6B] max-w-xs">
                            <p className="line-clamp-3" title={lead.clientMessage}>{lead.clientMessage}</p>
                          </td>
                          <td className="p-4 font-semibold">
                            <span className={`inline-flex text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md items-center ${getStatusColor(lead.status)}`}>
                              {getStatusIcon(lead.status)}
                              {lead.status}
                            </span>
                          </td>
                          <td className="p-4">
                            <div className="flex items-center gap-2">
                              <select 
                                value={lead.status}
                                onChange={(e) => handleStatusChange(lead.id, e.target.value)}
                                className="bg-white border border-[#E8E4DF] rounded-lg px-2 py-1.5 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-[#C9540A]"
                              >
                                <option value="New">New</option>
                                <option value="Contacted">Contacted</option>
                                <option value="Converted">Converted</option>
                                <option value="Lost">Lost</option>
                              </select>
                              <a 
                                href={`https://wa.me/${lead.clientPhone}?text=Hi+${encodeURIComponent(lead.clientName)},+I+received+your+inquiry+via+Buddingpreneurs+regarding:+${encodeURIComponent(lead.clientMessage)}`}
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="p-1.5 bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366] hover:text-white rounded-lg transition-colors" 
                                title="WhatsApp Client"
                              >
                                <MessageSquare className="w-4 h-4" />
                              </a>
                            </div>
                          </td>
                        </tr>
                      ))}
                      {filteredLeads.length === 0 && (
                        <tr>
                          <td colSpan={5} className="p-8 text-center text-[#6B6B6B]">
                            No leads found matching your search.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

            </motion.div>
          )}

          {/* TAB: PROFILE EDITOR */}
          {activeTab === "profile" && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
              
              <div className="mb-8 flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-black text-[#1A1A1A] font-display uppercase tracking-tight mb-2">Edit <span className="text-[#C9540A] italic font-heading capitalize">Profile</span></h1>
                  <p className="text-[#6B6B6B]">Update your business details and portfolio.</p>
                </div>
                <a href={`/member/${member.username}`} target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-[#F4F1ED] hover:bg-[#E8E4DF] text-[#1A1A1A] rounded-xl font-bold text-sm transition-colors flex items-center gap-2">
                  <Eye className="w-4 h-4" /> View Public Profile
                </a>
              </div>

              {saveSuccess && (
                <div className="mb-6 p-4 bg-emerald-100 text-emerald-800 rounded-xl font-bold flex items-center gap-2 shadow-sm">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  Your profile was updated in real-time on the database.
                </div>
              )}

              <div className="bg-white rounded-2xl shadow-sm border border-[#E8E4DF] overflow-hidden p-6 md:p-8">
                <form onSubmit={handleProfileSubmit}>
                  <div className="max-w-3xl flex flex-col gap-8">
                    {/* Basic Info */}
                    <div className="flex flex-col gap-6">
                      <h3 className="font-bold text-xl text-[#1A1A1A] border-b border-[#E8E4DF] pb-2">Basic Information</h3>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-semibold text-[#1A1A1A] mb-1.5">Business Name *</label>
                          <input required type="text" name="name" defaultValue={member.name} className="w-full bg-[#F4F1ED] border-none rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-[#C9540A] outline-none" />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-[#1A1A1A] mb-1.5">Category *</label>
                          <select name="category" defaultValue={member.category} className="w-full bg-[#F4F1ED] border-none rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-[#C9540A] outline-none text-[#1A1A1A]">
                            <option value="Interior Design">Interior Design</option>
                            <option value="Apparel & Fashion">Apparel & Fashion</option>
                            <option value="Digital Marketing">Digital Marketing</option>
                            <option value="Crafts & Gifting">Crafts & Gifting</option>
                            <option value="Baking & Confectionery">Baking & Confectionery</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-[#1A1A1A] mb-1.5">City *</label>
                          <input required type="text" name="city" defaultValue={member.city} className="w-full bg-[#F4F1ED] border-none rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-[#C9540A] outline-none" />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-[#1A1A1A] mb-1.5">Username (Read-only)</label>
                          <input disabled type="text" value={member.username} className="w-full bg-[#FAF8F5] border border-[#E8E4DF] text-gray-400 rounded-lg px-4 py-2.5 text-sm outline-none cursor-not-allowed" />
                        </div>
                        <div className="sm:col-span-2">
                          <label className="block text-sm font-bold text-[#1A1A1A] mb-2">Profile Cover Banner</label>
                          
                          {/* Live Thumbnail Preview */}
                          {coverImageState ? (
                            <div className="relative w-full h-48 rounded-xl overflow-hidden border border-[#E8E4DF] mb-3 bg-[#F4F1ED] group">
                              <img src={coverImageState} alt="Cover Preview" className="w-full h-full object-cover" />
                              <button 
                                type="button" 
                                onClick={() => setCoverImageState("")}
                                className="absolute top-3 right-3 bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded-lg text-xs font-bold transition-all shadow-md flex items-center gap-1"
                              >
                                Remove Banner
                              </button>
                            </div>
                          ) : (
                            <div className="w-full h-48 rounded-xl border-2 border-dashed border-[#E8E4DF] bg-[#FAF8F5] flex flex-col items-center justify-center p-6 text-center mb-3">
                              <div className="w-12 h-12 rounded-full bg-[#F4F1ED] flex items-center justify-center text-lg mb-2">
                                🖼️
                              </div>
                              <p className="text-xs font-bold text-[#1A1A1A] mb-1">No custom banner uploaded yet</p>
                              <p className="text-[11px] text-[#6B6B6B] max-w-xs mb-3">This banner represents your card image in the public directory list and profile headers.</p>
                            </div>
                          )}

                          {/* File input */}
                          <div className="flex items-center gap-3">
                            <input 
                              type="file" 
                              accept="image/*" 
                              id="banner-upload-file" 
                              onChange={handleBannerUpload} 
                              className="hidden" 
                            />
                            <label 
                              htmlFor="banner-upload-file"
                              className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#1A1A1A] hover:bg-[#2C2C2C] text-white font-bold rounded-xl text-xs cursor-pointer transition-colors shadow-sm"
                            >
                              Choose Image File
                            </label>
                            <span className="text-[10px] text-[#6B6B6B]">JPG/PNG supported. Resized automatically.</span>
                          </div>

                          <input type="hidden" name="coverImage" value={coverImageState} />
                        </div>
                      </div>
                    </div>

                    {/* Contact Info */}
                    <div className="flex flex-col gap-6">
                      <h3 className="font-bold text-xl text-[#1A1A1A] border-b border-[#E8E4DF] pb-2">Contact Details</h3>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-semibold text-[#1A1A1A] mb-1.5">Phone Number *</label>
                          <input required type="tel" name="phone" defaultValue={member.contact.phone} className="w-full bg-[#F4F1ED] border-none rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-[#C9540A] outline-none" />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-[#1A1A1A] mb-1.5">WhatsApp Number *</label>
                          <input required type="tel" name="whatsapp" defaultValue={member.contact.whatsapp} className="w-full bg-[#F4F1ED] border-none rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-[#C9540A] outline-none" />
                        </div>
                        <div className="sm:col-span-2">
                          <label className="block text-sm font-semibold text-[#1A1A1A] mb-1.5">Website</label>
                          <input type="url" name="website" defaultValue={member.contact.website} className="w-full bg-[#F4F1ED] border-none rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-[#C9540A] outline-none" />
                        </div>
                      </div>
                    </div>

                    {/* About */}
                    <div className="flex flex-col gap-6">
                      <h3 className="font-bold text-xl text-[#1A1A1A] border-b border-[#E8E4DF] pb-2">About Your Business</h3>
                      
                      <div>
                        <label className="block text-sm font-semibold text-[#1A1A1A] mb-1.5">About / Bio *</label>
                        <textarea required name="bio" rows={5} defaultValue={member.bio || member.tagline} className="w-full bg-[#F4F1ED] border-none rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-[#C9540A] outline-none resize-none"></textarea>
                      </div>
                    </div>

                    {/* Products and Services Catalog Manager */}
                    <div className="flex flex-col gap-6 border-t border-[#E8E4DF] pt-8">
                      <h3 className="font-bold text-xl text-[#1A1A1A] border-b border-[#E8E4DF] pb-2">Products & Services Catalog</h3>
                      
                      {/* Interactive List */}
                      <div className="flex flex-col gap-3">
                        {services.map((service, index) => (
                          <div key={index} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-[#FAF8F5] rounded-xl border border-[#E8E4DF] gap-3">
                            {service.imageUrl && (
                              <div className="w-16 h-16 rounded-lg overflow-hidden shrink-0 bg-[#F4F1ED] relative border border-[#E8E4DF]">
                                <img src={service.imageUrl} alt={service.name} className="object-cover w-full h-full" />
                              </div>
                            )}
                            <div className="flex-1">
                              <div className="flex items-baseline gap-2 mb-1">
                                <span className="font-bold text-[#1A1A1A]">{service.name}</span>
                                <span className="text-xs font-bold text-[#C9540A]">{service.price}</span>
                              </div>
                              <p className="text-xs text-[#6B6B6B]">{service.description}</p>
                            </div>
                            <button 
                              type="button"
                              onClick={() => {
                                setServices(services.filter((_, idx) => idx !== index));
                              }}
                              className="px-3 py-1.5 text-xs font-bold text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors border border-red-200 sm:self-center"
                            >
                              Remove
                            </button>
                          </div>
                        ))}
                        {services.length === 0 && (
                          <p className="text-xs text-[#6B6B6B] italic bg-[#F4F1ED] p-4 rounded-xl border border-dashed border-[#E8E4DF]">
                            No services listed. Add some below to display them dynamically on your public showcase profile!
                          </p>
                        )}
                      </div>

                      {/* Add Service Block */}
                      <div className="p-4 bg-[#F4F1ED] border border-[#E8E4DF] rounded-xl flex flex-col gap-3">
                        <h4 className="font-bold text-xs text-[#1A1A1A] uppercase tracking-wider">Add New Product / Service</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <input 
                              type="text" 
                              placeholder="Service/Product Name (e.g. Premium Bridal Styling)"
                              value={newServiceName}
                              onChange={(e) => setNewServiceName(e.target.value)}
                              className="w-full bg-white border border-[#E8E4DF] rounded-lg px-3 py-2 text-xs focus:ring-1 focus:ring-[#C9540A] outline-none"
                            />
                          </div>
                          <div>
                            <input 
                              type="text" 
                              placeholder="Price (e.g. ₹5,000 or ₹1,500/hr)"
                              value={newServicePrice}
                              onChange={(e) => setNewServicePrice(e.target.value)}
                              className="w-full bg-white border border-[#E8E4DF] rounded-lg px-3 py-2 text-xs focus:ring-1 focus:ring-[#C9540A] outline-none"
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <input 
                              type="text" 
                              placeholder="Brief description of catalog item deliverables"
                              value={newServiceDesc}
                              onChange={(e) => setNewServiceDesc(e.target.value)}
                              className="w-full bg-white border border-[#E8E4DF] rounded-lg px-3 py-2 text-xs focus:ring-1 focus:ring-[#C9540A] outline-none"
                            />
                          </div>
                          <div>
                            <input 
                              type="url" 
                              placeholder="Product/Service Image URL (e.g. https://...)"
                              value={newServiceImageUrl}
                              onChange={(e) => setNewServiceImageUrl(e.target.value)}
                              className="w-full bg-white border border-[#E8E4DF] rounded-lg px-3 py-2 text-xs focus:ring-1 focus:ring-[#C9540A] outline-none"
                            />
                          </div>
                        </div>
                        <button 
                          type="button"
                          onClick={() => {
                            if (!newServiceName.trim()) {
                              alert("Please enter a service name.");
                              return;
                            }
                            const newItem = {
                              name: newServiceName.trim(),
                              price: newServicePrice.trim() || "Contact for pricing",
                              description: newServiceDesc.trim() || "Professional female founder consulting service.",
                              imageUrl: newServiceImageUrl.trim()
                            };
                            setServices([...services, newItem]);
                            setNewServiceName("");
                            setNewServicePrice("");
                            setNewServiceDesc("");
                            setNewServiceImageUrl("");
                          }}
                          className="py-2 px-4 bg-[#C9540A] hover:bg-[#A8420A] text-white rounded-lg text-xs font-bold transition-all self-end"
                        >
                          + Add Catalog Item
                        </button>
                      </div>
                    </div>

                    <div className="pt-6 border-t border-[#E8E4DF]">
                      <button 
                        type="submit" 
                        disabled={savingProfile}
                        className="px-8 py-3.5 bg-[#C9540A] hover:bg-[#A8420A] disabled:bg-gray-400 text-white font-bold rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
                      >
                        {savingProfile ? "Saving Profile..." : "Save Changes"}
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </motion.div>
          )}

          {/* TAB: V-CARD & QR */}
          {activeTab === "vcard" && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
              
              <div className="mb-8 flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-black text-[#1A1A1A] font-display uppercase tracking-tight mb-2">Digital <span className="text-[#C9540A] italic font-heading capitalize">V-Card</span></h1>
                  <p className="text-[#6B6B6B]">Share your profile seamlessly with prospects.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                
                {/* QR Code Card */}
                <div className="bg-white rounded-2xl shadow-sm border border-[#E8E4DF] overflow-hidden p-8 flex flex-col items-center text-center">
                  <div className="w-full flex justify-end mb-4">
                    <a 
                      href={`https://api.qrserver.com/v1/create-qr-code/?size=500x500&data=${encodeURIComponent(publicProfileLink)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#C9540A] hover:text-[#A8420A] text-sm font-bold flex items-center gap-1"
                    >
                      <Download className="w-4 h-4" /> Download QR
                    </a>
                  </div>
                  
                  <div className="w-64 h-64 bg-white border border-[#E8E4DF] rounded-2xl p-4 flex items-center justify-center mb-6 relative group overflow-hidden">
                    <img 
                      src={`https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(publicProfileLink)}`} 
                      alt="Profile QR Code" 
                      className="w-full h-full object-contain"
                    />
                    <div className="absolute inset-0 bg-white/80 backdrop-blur-[1px] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-xl">
                      <span className="font-bold text-[#1A1A1A] bg-white px-4 py-2 rounded-lg shadow-sm border border-[#E8E4DF]">Scan to View Profile</span>
                    </div>
                  </div>
                  
                  <h3 className="font-bold text-xl text-[#1A1A1A] mb-2">{member.name}</h3>
                  <p className="text-[#6B6B6B] text-sm mb-6 max-w-xs">Scan this QR code to instantly view my verified profile on Buddingpreneurs.</p>
                  
                  <div className="w-full">
                    <label className="block text-sm font-semibold text-[#1A1A1A] mb-1.5 text-left">Your Shareable Link</label>
                    <div className="flex items-center gap-2">
                      <input type="text" readOnly value={publicProfileLink} className="flex-1 bg-[#F4F1ED] border-none rounded-lg px-4 py-3 text-sm text-[#6B6B6B] outline-none font-mono" />
                      <button 
                        onClick={() => copyToClipboard(publicProfileLink)}
                        className="px-4 py-3 bg-[#1A1A1A] hover:bg-[#1C1C1C] text-white rounded-lg transition-colors font-bold text-sm shadow-sm"
                      >
                        {copySuccess ? "Copied!" : "Copy"}
                      </button>
                    </div>
                  </div>
                </div>

                {/* VCF Export and Share */}
                <div className="flex flex-col gap-6">
                  
                  <div className="bg-white rounded-2xl shadow-sm border border-[#E8E4DF] overflow-hidden p-6">
                    <h3 className="font-bold text-lg text-[#1A1A1A] border-b border-[#E8E4DF] pb-4 mb-4 flex items-center gap-2">
                      <User className="w-5 h-5 text-[#C9540A]" /> Download Virtual Contact
                    </h3>
                    <p className="text-[#6B6B6B] text-sm mb-6">
                      Export your details as a standard .vcf file. Anyone who downloads this can save your business directly to their phone's contacts.
                    </p>
                    <button 
                      onClick={downloadVCard}
                      className="w-full px-6 py-3.5 bg-[#F4F1ED] hover:bg-[#E8E4DF] text-[#1A1A1A] rounded-xl font-bold transition-colors flex items-center justify-center gap-2"
                    >
                      <Download className="w-5 h-5" /> Download .vcf File
                    </button>
                  </div>

                  <div className="bg-white rounded-2xl shadow-sm border border-[#E8E4DF] overflow-hidden p-6">
                    <h3 className="font-bold text-lg text-[#1A1A1A] border-b border-[#E8E4DF] pb-4 mb-4 flex items-center gap-2">
                      <Share2 className="w-5 h-5 text-[#C9540A]" /> Quick Share
                    </h3>
                    <p className="text-[#6B6B6B] text-sm mb-6">
                      Share your profile directly to popular platforms.
                    </p>
                    <div className="grid grid-cols-2 gap-3">
                      <a 
                        href={`https://wa.me/?text=Check+out+my+professional+portfolio+on+Buddingpreneurs:+${encodeURIComponent(publicProfileLink)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="py-3 px-4 bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366] hover:text-white rounded-xl font-bold transition-colors flex items-center justify-center gap-2 text-sm text-center"
                      >
                        <MessageSquare className="w-4 h-4" /> WhatsApp
                      </a>
                      <a 
                        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(publicProfileLink)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="py-3 px-4 bg-[#0A66C2]/10 text-[#0A66C2] hover:bg-[#0A66C2] hover:text-white rounded-xl font-bold transition-colors flex items-center justify-center gap-2 text-sm text-center"
                      >
                        <Users className="w-4 h-4" /> LinkedIn
                      </a>
                    </div>
                  </div>
                  
                  {/* Tracking Note */}
                  <div className="bg-[#FAF8F5] border border-[#E8E4DF] p-4 rounded-xl flex items-start gap-3">
                    <Eye className="w-5 h-5 text-[#C9540A] shrink-0 mt-0.5" />
                    <p className="text-xs text-[#6B6B6B] leading-relaxed">
                      <strong>Tracking Active:</strong> Every time someone scans your QR code or clicks your link, it counts towards your Profile Views on the Overview tab.
                    </p>
                  </div>

                </div>

              </div>
            </motion.div>
          )}

        </div>
      </main>

      {/* Simulated Register Modal */}
      <RegisterModal 
        isOpen={isRegisterOpen} 
        onClose={() => setIsRegisterOpen(false)} 
        onSuccess={async (newUsername) => {
          setCurrentUsername(newUsername);
          if (typeof window !== "undefined") {
            localStorage.setItem("bp_active_username", newUsername);
          }
          await fetchDashboardData(newUsername);
        }} 
      />

    </div>
  );
}

function RegisterModal({ 
  isOpen, 
  onClose, 
  onSuccess 
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  onSuccess: (username: string) => void; 
}) {
  const [submitting, setSubmitting] = useState(false);
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [category, setCategory] = useState("Interior Design");
  const [city, setCity] = useState("Delhi");
  const [tagline, setTagline] = useState("");
  const [bio, setBio] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [plan, setPlan] = useState<"Basic" | "Premium" | "Featured">("Featured");

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !username || !phone || !email) {
      alert("Please fill in all required fields.");
      return;
    }
    setSubmitting(true);

    const slugifiedUsername = username.toLowerCase().trim().replace(/[^a-z0-9-_]/g, "-");

    try {
      const res = await fetch("/api/members", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: slugifiedUsername,
          name,
          category,
          city,
          tagline: tagline || `Pioneering ${category} in ${city}`,
          bio: bio || `Passionate builder of ${name}. Connecting with potential clients in the community.`,
          plan,
          contact: {
            phone,
            whatsapp: phone,
            email,
            website: ""
          },
          services: [],
          social: {
            instagram: "",
            facebook: "",
            linkedin: ""
          }
        })
      });

      const data = await res.json();
      if (data.success) {
        onSuccess(slugifiedUsername);
        onClose();
        // Clear inputs
        setName("");
        setUsername("");
        setTagline("");
        setBio("");
        setPhone("");
        setEmail("");
      } else {
        alert(data.error || "Failed to register profile.");
      }
    } catch (err) {
      console.error("Error registering:", err);
      alert("Failed to register business profile.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-[#1A1A1A]/70 backdrop-blur-sm z-[999] flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white rounded-3xl border border-[#E8E4DF] w-full max-w-xl max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col p-6 md:p-8"
      >
        <div className="flex items-center justify-between border-b border-[#E8E4DF] pb-4 mb-6">
          <h2 className="text-2xl font-black text-[#1A1A1A] font-display uppercase tracking-tight">
            Register <span className="text-[#C9540A] italic font-heading capitalize">Business</span>
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-[#F4F1ED] rounded-xl text-[#6B6B6B]">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase text-[#1A1A1A] mb-1">Business/Founder Name *</label>
              <input 
                required 
                type="text" 
                placeholder="e.g. Meera Crafts"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (!username) {
                    setUsername(e.target.value.toLowerCase().trim().replace(/[^a-z0-9-_]/g, "-"));
                  }
                }}
                className="w-full bg-[#F4F1ED] border-none rounded-lg px-3 py-2.5 text-xs focus:ring-2 focus:ring-[#C9540A] outline-none" 
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase text-[#1A1A1A] mb-1">Username slug *</label>
              <input 
                required 
                type="text" 
                placeholder="e.g. meera-crafts"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-[#F4F1ED] border-none rounded-lg px-3 py-2.5 text-xs focus:ring-2 focus:ring-[#C9540A] outline-none font-mono" 
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase text-[#1A1A1A] mb-1">Category *</label>
              <select 
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-[#F4F1ED] border-none rounded-lg px-3 py-2.5 text-xs focus:ring-2 focus:ring-[#C9540A] outline-none text-[#1A1A1A]"
              >
                <option value="Interior Design">Interior Design</option>
                <option value="Apparel & Fashion">Apparel & Fashion</option>
                <option value="Digital Marketing">Digital Marketing</option>
                <option value="Crafts & Gifting">Crafts & Gifting</option>
                <option value="Baking & Confectionery">Baking & Confectionery</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold uppercase text-[#1A1A1A] mb-1">City *</label>
              <input 
                required 
                type="text" 
                placeholder="e.g. Dehradun"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full bg-[#F4F1ED] border-none rounded-lg px-3 py-2.5 text-xs focus:ring-2 focus:ring-[#C9540A] outline-none" 
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase text-[#1A1A1A] mb-1">Phone / WhatsApp *</label>
              <input 
                required 
                type="tel" 
                placeholder="e.g. 9876543210"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-[#F4F1ED] border-none rounded-lg px-3 py-2.5 text-xs focus:ring-2 focus:ring-[#C9540A] outline-none" 
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase text-[#1A1A1A] mb-1">Email Address *</label>
              <input 
                required 
                type="email" 
                placeholder="e.g. meera@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#F4F1ED] border-none rounded-lg px-3 py-2.5 text-xs focus:ring-2 focus:ring-[#C9540A] outline-none" 
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold uppercase text-[#1A1A1A] mb-1">Membership Plan</label>
              <select 
                value={plan}
                onChange={(e) => setPlan(e.target.value as any)}
                className="w-full bg-[#F4F1ED] border-none rounded-lg px-3 py-2.5 text-xs focus:ring-2 focus:ring-[#C9540A] outline-none text-[#1A1A1A]"
              >
                <option value="Basic">Basic Profile</option>
                <option value="Premium">Premium Profile</option>
                <option value="Featured">Featured Showcase Profile</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-[#1A1A1A] mb-1">One-liner Tagline</label>
            <input 
              type="text" 
              placeholder="e.g. Unique handcrafted candles and gifts for all occasions"
              value={tagline}
              onChange={(e) => setTagline(e.target.value)}
              className="w-full bg-[#F4F1ED] border-none rounded-lg px-3 py-2.5 text-xs focus:ring-2 focus:ring-[#C9540A] outline-none" 
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-[#1A1A1A] mb-1">Business Bio / Description</label>
            <textarea 
              rows={3}
              placeholder="Provide a warm, inspiring description of your business history, values, and offerings..."
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="w-full bg-[#F4F1ED] border-none rounded-lg px-3 py-2.5 text-xs focus:ring-2 focus:ring-[#C9540A] outline-none resize-none" 
            />
          </div>

          <div className="border-t border-[#E8E4DF] pt-4 mt-2 flex items-center justify-end gap-3">
            <button 
              type="button" 
              onClick={onClose} 
              className="px-5 py-2.5 bg-[#FAF8F5] hover:bg-[#F4F1ED] border border-[#E8E4DF] text-[#6B6B6B] font-bold rounded-xl text-xs transition-colors"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              disabled={submitting}
              className="px-6 py-2.5 bg-[#C9540A] hover:bg-[#A8420A] disabled:bg-gray-400 text-white font-bold rounded-xl text-xs transition-all shadow-md"
            >
              {submitting ? "Registering..." : "Simulate Registration"}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
