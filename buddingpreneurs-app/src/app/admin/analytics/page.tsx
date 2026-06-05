"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users,
  Eye,
  MessageSquare,
  Search,
  CheckCircle2,
  Download,
  BarChart3,
  Activity,
  Star,
  Settings,
  MoreVertical,
  LogOut,
  Loader2,
  Trash2,
  ShieldCheck,
  ShieldAlert,
  Globe,
  Phone,
  Mail,
  UserCheck
} from "lucide-react";

export default function AdminAnalyticsPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("overview");
  const [searchMember, setSearchMember] = useState("");
  const [adminName, setAdminName] = useState("Admin");

  // Live Data States
  const [members, setMembers] = useState<any[]>([]);
  const [registrations, setRegistrations] = useState<any[]>([]);
  const [searchRegistrant, setSearchRegistrant] = useState("");
  const [stats, setStats] = useState<any>({
    totalMembers: 0,
    activeMembers: 0,
    totalViews: 0,
    viewsGrowth: "+0%",
    totalLeads: 0,
    leadsGrowth: "+0%",
    totalConversions: 0,
    avgConversionRate: "0%"
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Modal / Interaction States
  const [editingMember, setEditingMember] = useState<any | null>(null);
  const [memberToDelete, setMemberToDelete] = useState<any | null>(null);
  const [dropdownOpenMember, setDropdownOpenMember] = useState<string | null>(null);

  // Promo Code States
  const [promoCode, setPromoCode] = useState("BPFREE");
  const [savingPromo, setSavingPromo] = useState(false);
  const [promoSuccess, setPromoSuccess] = useState(false);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const [membersRes, statsRes, meRes, regRes, promoRes] = await Promise.all([
        fetch("/api/members"),
        fetch("/api/admin/stats"),
        fetch("/api/auth/me"),
        fetch("/api/workshops/register"),
        fetch("/api/admin/promo")
      ]);
      
      const [membersJson, statsJson, meJson, regJson, promoJson] = await Promise.all([
        membersRes.json(),
        statsRes.json(),
        meRes.json(),
        regRes.json(),
        promoRes.json()
      ]);

      if (membersJson.success) {
        setMembers(membersJson.data);
      }
      if (statsJson.success) {
        setStats(statsJson.data);
      }
      if (meJson.success && meJson.user) {
        setAdminName(meJson.user.name);
      }
      if (regJson.success) {
        setRegistrations(regJson.data);
      }
      if (promoJson.success) {
        setPromoCode(promoJson.promoCode);
      }
    } catch (err) {
      console.error("Error fetching admin dashboard data:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdatePromoCode = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoCode.trim()) return;
    try {
      setSavingPromo(true);
      setPromoSuccess(false);
      const res = await fetch("/api/admin/promo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ promoCode: promoCode.trim() })
      });
      const data = await res.json();
      if (data.success) {
        setPromoCode(data.promoCode);
        setPromoSuccess(true);
        setTimeout(() => setPromoSuccess(false), 3000);
      } else {
        alert("Failed to update promo code: " + (data.error || "Unknown error"));
      }
    } catch (err) {
      console.error("Error updating promo code:", err);
      alert("Error updating promo code. Please try again.");
    } finally {
      setSavingPromo(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const handleSignOut = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/");
    router.refresh();
  };

  const handleSaveMember = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingMember) return;
    try {
      setSaving(true);
      const res = await fetch("/api/members", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: editingMember.username,
          name: editingMember.name,
          category: editingMember.category,
          city: editingMember.city,
          tagline: editingMember.tagline,
          bio: editingMember.bio,
          plan: editingMember.plan,
          verified: editingMember.verified,
          contact: editingMember.contact || {},
          social: editingMember.social || {}
        })
      });
      const data = await res.json();
      if (data.success) {
        setMembers(prev => prev.map(m => m.username === editingMember.username ? data.data : m));
        setEditingMember(null);
        // Refresh stats dynamically
        const sRes = await fetch("/api/admin/stats");
        const sJson = await sRes.json();
        if (sJson.success) setStats(sJson.data);
      } else {
        alert("Failed to save changes: " + (data.error || "Unknown error"));
      }
    } catch (err) {
      console.error("Error saving member details:", err);
      alert("Error saving member details. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const handleToggleVerification = async (member: any) => {
    try {
      const updatedVerified = !member.verified;
      const res = await fetch("/api/members", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: member.username,
          verified: updatedVerified
        })
      });
      const data = await res.json();
      if (data.success) {
        setMembers(prev => prev.map(m => m.username === member.username ? data.data : m));
        setDropdownOpenMember(null);
      } else {
        alert("Failed to toggle verification: " + (data.error || "Unknown error"));
      }
    } catch (err) {
      console.error("Error toggling verification:", err);
    }
  };

  const handleQuickChangePlan = async (member: any, newPlan: string) => {
    try {
      const res = await fetch("/api/members", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: member.username,
          plan: newPlan
        })
      });
      const data = await res.json();
      if (data.success) {
        setMembers(prev => prev.map(m => m.username === member.username ? data.data : m));
        setDropdownOpenMember(null);
      } else {
        alert("Failed to change plan: " + (data.error || "Unknown error"));
      }
    } catch (err) {
      console.error("Error changing plan:", err);
    }
  };

  const handleDeleteMember = async () => {
    if (!memberToDelete) return;
    try {
      setSaving(true);
      const res = await fetch(`/api/members?username=${memberToDelete.username}`, {
        method: "DELETE"
      });
      const data = await res.json();
      if (data.success) {
        setMembers(prev => prev.filter(m => m.username !== memberToDelete.username));
        setMemberToDelete(null);
        // Refresh stats dynamically
        const sRes = await fetch("/api/admin/stats");
        const sJson = await sRes.json();
        if (sJson.success) setStats(sJson.data);
      } else {
        alert("Failed to delete member: " + (data.error || "Unknown error"));
      }
    } catch (err) {
      console.error("Error deleting member:", err);
      alert("Error deleting member. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const filteredMembers = members.filter(m => 
    (m.name || "").toLowerCase().includes(searchMember.toLowerCase()) || 
    (m.category || "").toLowerCase().includes(searchMember.toLowerCase()) ||
    (m.username || "").toLowerCase().includes(searchMember.toLowerCase()) ||
    (m.city || "").toLowerCase().includes(searchMember.toLowerCase())
  );

  const filteredRegistrations = registrations.filter(reg =>
    (reg.name || "").toLowerCase().includes(searchRegistrant.toLowerCase()) ||
    (reg.email || "").toLowerCase().includes(searchRegistrant.toLowerCase()) ||
    (reg.workshop || "").toLowerCase().includes(searchRegistrant.toLowerCase()) ||
    (reg.phone || "").toLowerCase().includes(searchRegistrant.toLowerCase()) ||
    (reg.phase || "").toLowerCase().includes(searchRegistrant.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1A1A1A] font-sans flex flex-col">
      
      {/* DROPDOWN CLICK HANDLER BACKDROP */}
      {dropdownOpenMember && (
        <div 
          className="fixed inset-0 z-20 cursor-default" 
          onClick={() => setDropdownOpenMember(null)}
        />
      )}

      {/* ADMIN HEADER */}
      <header className="bg-[#1A1A1A] text-white py-4 px-6 md:px-10 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-8">
          <a href="/" className="flex items-center gap-2">
            <span className="text-xl font-black tracking-tight font-display uppercase text-[#FAF8F5]">Buddingpreneurs <span className="text-[#C9540A]">Admin</span></span>
          </a>
          
          <nav className="hidden md:flex gap-6">
            <button 
              onClick={() => setActiveTab("overview")}
              className={`text-sm font-semibold transition-colors ${activeTab === "overview" ? "text-[#C9540A]" : "text-gray-300 hover:text-white"}`}
            >
              Analytics Overview
            </button>
            <button 
              onClick={() => setActiveTab("members")}
              className={`text-sm font-semibold transition-colors ${activeTab === "members" ? "text-[#C9540A]" : "text-gray-300 hover:text-white"}`}
            >
              Member Management
            </button>
            <button 
              onClick={() => setActiveTab("workshops")}
              className={`text-sm font-semibold transition-colors ${activeTab === "workshops" ? "text-[#C9540A]" : "text-gray-300 hover:text-white"}`}
            >
              Workshop Registrations
            </button>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-300 font-medium hidden md:block">{adminName}</span>
          <div className="w-8 h-8 rounded-full bg-[#C9540A] flex items-center justify-center font-bold text-sm text-white">
            {adminName.charAt(0)}
          </div>
          <button
            onClick={handleSignOut}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-white/10 hover:bg-red-600 text-white rounded-lg font-semibold text-xs transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" /> Sign Out
          </button>
        </div>
      </header>

      {/* MOBILE NAV */}
      <div className="md:hidden flex overflow-x-auto bg-white border-b border-[#E8E4DF] px-4 hide-scrollbar">
        <button 
          onClick={() => setActiveTab("overview")}
          className={`px-4 py-3 text-sm font-semibold whitespace-nowrap border-b-2 transition-colors ${activeTab === "overview" ? "border-[#C9540A] text-[#C9540A]" : "border-transparent text-[#6B6B6B]"}`}
        >
          Analytics Overview
        </button>
        <button 
          onClick={() => setActiveTab("members")}
          className={`px-4 py-3 text-sm font-semibold whitespace-nowrap border-b-2 transition-colors ${activeTab === "members" ? "border-[#C9540A] text-[#C9540A]" : "border-transparent text-[#6B6B6B]"}`}
        >
          Member Management
        </button>
        <button 
          onClick={() => setActiveTab("workshops")}
          className={`px-4 py-3 text-sm font-semibold whitespace-nowrap border-b-2 transition-colors ${activeTab === "workshops" ? "border-[#C9540A] text-[#C9540A]" : "border-transparent text-[#6B6B6B]"}`}
        >
          Workshop Registrations
        </button>
      </div>

      <main className="flex-1 p-6 md:p-10 max-w-7xl mx-auto w-full">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-24">
            <Loader2 className="w-10 h-10 text-[#C9540A] animate-spin mb-4" />
            <p className="text-sm font-semibold text-gray-500">Loading system data...</p>
          </div>
        ) : (
          <>
            {/* OVERVIEW TAB */}
            {activeTab === "overview" && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
                
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                  <div>
                    <h1 className="text-3xl font-black text-[#1A1A1A] font-display uppercase tracking-tight mb-2">Platform <span className="text-[#C9540A] italic font-heading capitalize">Health</span></h1>
                    <p className="text-[#6B6B6B]">Comprehensive overview of marketplace activity.</p>
                  </div>
                  <button className="flex items-center gap-2 px-4 py-2 bg-white border border-[#E8E4DF] hover:border-[#1A1A1A] text-[#1A1A1A] font-semibold rounded-lg shadow-sm transition-colors text-sm">
                    <Download className="w-4 h-4" /> Export Report (PDF)
                  </button>
                </div>

                {/* KPI Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
                  <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#E8E4DF]">
                    <h4 className="text-sm font-semibold text-[#6B6B6B] mb-2 flex items-center gap-2"><Users className="w-4 h-4" /> Total Members</h4>
                    <div className="flex items-end gap-3">
                      <p className="text-3xl font-black text-[#1A1A1A]">{stats.totalMembers}</p>
                      <span className="text-sm text-emerald-600 font-semibold mb-1">{stats.activeMembers} Active</span>
                    </div>
                  </div>
                  <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#E8E4DF]">
                    <h4 className="text-sm font-semibold text-[#6B6B6B] mb-2 flex items-center gap-2"><Eye className="w-4 h-4" /> Total Profile Views</h4>
                    <div className="flex items-end gap-3">
                      <p className="text-3xl font-black text-[#1A1A1A]">
                        {stats.totalViews >= 1000 ? (stats.totalViews / 1000).toFixed(1) + "k" : stats.totalViews}
                      </p>
                      <span className="text-sm text-emerald-600 font-semibold mb-1">{stats.viewsGrowth}</span>
                    </div>
                  </div>
                  <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#E8E4DF]">
                    <h4 className="text-sm font-semibold text-[#6B6B6B] mb-2 flex items-center gap-2"><MessageSquare className="w-4 h-4" /> Total Leads Generated</h4>
                    <div className="flex items-end gap-3">
                      <p className="text-3xl font-black text-[#1A1A1A]">{stats.totalLeads}</p>
                      <span className="text-sm text-emerald-600 font-semibold mb-1">{stats.leadsGrowth}</span>
                    </div>
                  </div>
                  <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#E8E4DF]">
                    <h4 className="text-sm font-semibold text-[#6B6B6B] mb-2 flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#C9540A]" /> Platform Conversions</h4>
                    <div className="flex items-end gap-3">
                      <p className="text-3xl font-black text-[#C9540A]">{stats.totalConversions}</p>
                      <span className="text-sm text-[#6B6B6B] font-semibold mb-1">{stats.avgConversionRate} Avg Rate</span>
                    </div>
                  </div>
                </div>

                {/* Registration Promo Code Management */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#E8E4DF] mb-8">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div>
                      <h3 className="font-bold text-lg text-[#1A1A1A] mb-1">Registration Gatekeeper Code</h3>
                      <p className="text-xs text-[#6B6B6B]">New vendors must type this code when registering to sign up successfully.</p>
                    </div>
                    
                    <form onSubmit={handleUpdatePromoCode} className="flex items-center gap-3">
                      <div className="relative">
                        <input 
                          type="text" 
                          placeholder="PROMO CODE" 
                          value={promoCode}
                          onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                          className="w-48 bg-[#F4F1ED] border-2 border-transparent font-bold tracking-wider uppercase text-center rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#C9540A] text-[#1A1A1A] transition-colors"
                        />
                      </div>
                      <button 
                        type="submit" 
                        disabled={savingPromo}
                        className="px-5 py-2.5 bg-[#C9540A] hover:bg-[#AC4708] text-white text-sm font-semibold rounded-xl transition-all disabled:opacity-50 shadow-md"
                      >
                        {savingPromo ? "Updating..." : "Update Code"}
                      </button>
                    </form>
                  </div>
                  {promoSuccess && (
                    <motion.p 
                      initial={{ opacity: 0, y: -5 }} 
                      animate={{ opacity: 1, y: 0 }} 
                      className="text-xs font-bold text-emerald-600 mt-3"
                    >
                      ✓ Promo code successfully updated in your Supabase configuration!
                    </motion.p>
                  )}
                </div>

                {/* Charts Area Placeholder */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                  <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#E8E4DF] h-80 flex flex-col">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="font-bold text-lg text-[#1A1A1A]">Platform Activity (30 Days)</h3>
                      <select className="bg-[#F4F1ED] border-none rounded-lg px-2 py-1 text-xs font-semibold text-[#1A1A1A] outline-none">
                        <option>Views</option>
                        <option>Leads</option>
                      </select>
                    </div>
                    <div className="flex-1 bg-[#F4F1ED] rounded-xl flex items-center justify-center border border-dashed border-[#E8E4DF]">
                      <div className="text-center text-[#6B6B6B] p-4">
                        <Activity className="w-8 h-8 mx-auto mb-2 opacity-50 text-[#C9540A]" />
                        <p className="text-sm font-semibold">Active Monitoring Panel</p>
                        <p className="text-xs mt-1 text-[#6B6B6B]">Monitoring views dynamically scaled to platform health statistics.</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#E8E4DF] h-80 flex flex-col">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="font-bold text-lg text-[#1A1A1A]">Leads by Category</h3>
                    </div>
                    <div className="flex-1 bg-[#F4F1ED] rounded-xl flex items-center justify-center border border-dashed border-[#E8E4DF]">
                      <div className="text-center text-[#6B6B6B] p-4">
                        <BarChart3 className="w-8 h-8 mx-auto mb-2 opacity-50 text-[#C9540A]" />
                        <p className="text-sm font-semibold">Vendor Conversion Visualizer</p>
                        <p className="text-xs mt-1 text-[#6B6B6B]">Representing conversions dynamically generated across categories.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* MEMBERS TAB */}
            {activeTab === "members" && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
                
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                  <div>
                    <h1 className="text-3xl font-black text-[#1A1A1A] font-display uppercase tracking-tight mb-2">Member <span className="text-[#C9540A] italic font-heading capitalize">Management</span></h1>
                    <p className="text-[#6B6B6B]">View, edit, and manage all live platform vendors.</p>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B6B6B]" />
                      <input 
                        type="text" 
                        placeholder="Search members by name, city, tag..." 
                        value={searchMember}
                        onChange={(e) => setSearchMember(e.target.value)}
                        className="w-full sm:w-64 bg-white border border-[#E8E4DF] rounded-xl pl-10 pr-4 py-2.5 text-sm focus:ring-2 focus:ring-[#C9540A] outline-none shadow-sm"
                      />
                    </div>
                    <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-[#E8E4DF] hover:border-[#1A1A1A] text-[#1A1A1A] font-semibold rounded-xl shadow-sm transition-colors text-sm">
                      <Download className="w-4 h-4" /> CSV
                    </button>
                  </div>
                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-[#E8E4DF] overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[1000px]">
                      <thead>
                        <tr className="bg-[#F4F1ED] border-b border-[#E8E4DF]">
                          <th className="p-4 font-bold text-xs text-[#1A1A1A] uppercase tracking-wider">Member Details</th>
                          <th className="p-4 font-bold text-xs text-[#1A1A1A] uppercase tracking-wider">Plan</th>
                          <th className="p-4 font-bold text-xs text-[#1A1A1A] uppercase tracking-wider text-right">Views</th>
                          <th className="p-4 font-bold text-xs text-[#1A1A1A] uppercase tracking-wider text-right">Leads</th>
                          <th className="p-4 font-bold text-xs text-[#1A1A1A] uppercase tracking-wider text-right">Conv.</th>
                          <th className="p-4 font-bold text-xs text-[#1A1A1A] uppercase tracking-wider">Status</th>
                          <th className="p-4 font-bold text-xs text-[#1A1A1A] uppercase tracking-wider text-center">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#E8E4DF]">
                        {filteredMembers.length === 0 ? (
                          <tr>
                            <td colSpan={7} className="p-8 text-center text-gray-500 font-semibold">
                              No members found matching your search criteria.
                            </td>
                          </tr>
                        ) : (
                          filteredMembers.map((member) => (
                            <tr key={member.username} className="hover:bg-[#FAF8F5] transition-colors">
                              <td className="p-4">
                                <div className="font-bold text-[#1A1A1A] text-sm flex items-center gap-1.5">
                                  {member.name}
                                  {member.verified && (
                                    <span className="text-[#C9540A]" title="Verified Profile">
                                      <ShieldCheck className="w-4 h-4 fill-amber-100" />
                                    </span>
                                  )}
                                </div>
                                <div className="text-xs text-[#6B6B6B] mt-0.5">{member.category} • {member.city}</div>
                                <div className="text-[10px] text-[#6B6B6B] mt-1">Username: @{member.username} • Joined: {member.joinDate}</div>
                              </td>
                              <td className="p-4">
                                <span className={`inline-flex text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-md ${
                                  member.plan === 'Featured' ? 'bg-amber-100 text-amber-700' :
                                  member.plan === 'Premium' ? 'bg-purple-100 text-purple-700' :
                                  'bg-gray-100 text-gray-700'
                                }`}>
                                  {member.plan === 'Featured' && <Star className="w-3 h-3 mr-1 fill-amber-700" />}
                                  {member.plan}
                                </span>
                              </td>
                              <td className="p-4 text-sm font-semibold text-[#1A1A1A] text-right">{member.views}</td>
                              <td className="p-4 text-sm font-semibold text-[#1A1A1A] text-right">{member.leadsCount ?? member.leads ?? 0}</td>
                              <td className="p-4 text-sm font-semibold text-[#C9540A] text-right">{member.conversions}</td>
                              <td className="p-4">
                                <span className={`inline-flex items-center gap-1.5 text-xs font-semibold ${
                                  member.verified ? 'text-emerald-600' : 'text-amber-600'
                                }`}>
                                  <span className={`w-2 h-2 rounded-full ${member.verified ? 'bg-emerald-500' : 'bg-amber-500'}`}></span>
                                  {member.verified ? 'Active' : 'Pending Verification'}
                                </span>
                              </td>
                              <td className="p-4">
                                <div className={`flex items-center justify-center gap-2 relative ${dropdownOpenMember === member.username ? "z-30" : ""}`}>
                                  <button 
                                    onClick={() => router.push(`/member/${member.username}`)}
                                    className="p-1.5 text-[#6B6B6B] hover:text-[#1A1A1A] hover:bg-[#E8E4DF] rounded-md transition-colors" 
                                    title="View Profile"
                                  >
                                    <Eye className="w-4 h-4" />
                                  </button>
                                  <button 
                                    onClick={() => setEditingMember({ ...member })}
                                    className="p-1.5 text-[#6B6B6B] hover:text-[#1A1A1A] hover:bg-[#E8E4DF] rounded-md transition-colors" 
                                    title="Settings / Edit Profile"
                                  >
                                    <Settings className="w-4 h-4" />
                                  </button>
                                  <button 
                                    onClick={() => setDropdownOpenMember(dropdownOpenMember === member.username ? null : member.username)}
                                    className="p-1.5 text-[#6B6B6B] hover:text-[#1A1A1A] hover:bg-[#E8E4DF] rounded-md transition-colors" 
                                    title="Quick Actions"
                                  >
                                    <MoreVertical className="w-4 h-4" />
                                  </button>

                                  {/* DROPDOWN MENU */}
                                  {dropdownOpenMember === member.username && (
                                    <div className="absolute right-0 top-10 w-48 bg-white border border-[#E8E4DF] rounded-xl shadow-xl z-30 py-2 text-left">
                                      <button
                                        onClick={() => handleToggleVerification(member)}
                                        className="w-full px-4 py-2 text-xs font-semibold text-gray-700 hover:bg-[#FAF8F5] flex items-center gap-2"
                                      >
                                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                                        {member.verified ? "Mark Unverified" : "Mark Verified"}
                                      </button>
                                      
                                      <div className="border-t border-[#E8E4DF] my-1"></div>
                                      <div className="px-4 py-1 text-[10px] font-bold text-gray-400 uppercase">Change Plan</div>
                                      
                                      <button
                                        onClick={() => handleQuickChangePlan(member, "Basic")}
                                        className="w-full px-4 py-1.5 text-xs text-gray-700 hover:bg-[#FAF8F5] flex items-center justify-between"
                                      >
                                        <span>Basic Plan</span>
                                        {member.plan === "Basic" && <span className="w-1.5 h-1.5 rounded-full bg-[#C9540A]" />}
                                      </button>
                                      <button
                                        onClick={() => handleQuickChangePlan(member, "Premium")}
                                        className="w-full px-4 py-1.5 text-xs text-gray-700 hover:bg-[#FAF8F5] flex items-center justify-between"
                                      >
                                        <span>Premium Plan</span>
                                        {member.plan === "Premium" && <span className="w-1.5 h-1.5 rounded-full bg-[#C9540A]" />}
                                      </button>
                                      <button
                                        onClick={() => handleQuickChangePlan(member, "Featured")}
                                        className="w-full px-4 py-1.5 text-xs text-gray-700 hover:bg-[#FAF8F5] flex items-center justify-between"
                                      >
                                        <span>Featured Plan</span>
                                        {member.plan === "Featured" && <span className="w-1.5 h-1.5 rounded-full bg-[#C9540A]" />}
                                      </button>
                                      
                                      <div className="border-t border-[#E8E4DF] my-1"></div>
                                      <button
                                        onClick={() => {
                                          setMemberToDelete(member);
                                          setDropdownOpenMember(null);
                                        }}
                                        className="w-full px-4 py-2 text-xs font-semibold text-red-600 hover:bg-red-50 flex items-center gap-2"
                                      >
                                        <Trash2 className="w-3.5 h-3.5" />
                                        Delete Profile
                                      </button>
                                    </div>
                                  )}
                                </div>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>

              </motion.div>
            )}

            {/* WORKSHOPS TAB */}
            {activeTab === "workshops" && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                  <div>
                    <h1 className="text-3xl font-black text-[#1A1A1A] font-display uppercase tracking-tight mb-2">Workshop <span className="text-[#C9540A] italic font-heading capitalize">Registrations</span></h1>
                    <p className="text-[#6B6B6B]">View attendee registrations and workshop session details.</p>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B6B6B]" />
                      <input 
                        type="text" 
                        placeholder="Search registrations..." 
                        value={searchRegistrant}
                        onChange={(e) => setSearchRegistrant(e.target.value)}
                        className="w-full sm:w-64 bg-white border border-[#E8E4DF] rounded-xl pl-10 pr-4 py-2.5 text-sm focus:ring-2 focus:ring-[#C9540A] outline-none shadow-sm"
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-[#E8E4DF] overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[1000px]">
                      <thead>
                        <tr className="bg-[#F4F1ED] border-b border-[#E8E4DF]">
                          <th className="p-4 font-bold text-xs text-[#1A1A1A] uppercase tracking-wider">Attendee Info</th>
                          <th className="p-4 font-bold text-xs text-[#1A1A1A] uppercase tracking-wider">Workshop Session</th>
                          <th className="p-4 font-bold text-xs text-[#1A1A1A] uppercase tracking-wider">Contact</th>
                          <th className="p-4 font-bold text-xs text-[#1A1A1A] uppercase tracking-wider">Vesting Stage</th>
                          <th className="p-4 font-bold text-xs text-[#1A1A1A] uppercase tracking-wider">Registered At</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#E8E4DF]">
                        {filteredRegistrations.length === 0 ? (
                          <tr>
                            <td colSpan={5} className="p-8 text-center text-gray-500 font-semibold">
                              No registrations found matching your search.
                            </td>
                          </tr>
                        ) : (
                          filteredRegistrations.map((reg) => (
                            <tr key={reg.id || reg._id} className="hover:bg-[#FAF8F5] transition-colors">
                              <td className="p-4">
                                <div className="font-bold text-[#1A1A1A] text-sm">{reg.name}</div>
                                <div className="text-[10px] text-[#6B6B6B] mt-0.5">Email: {reg.email}</div>
                              </td>
                              <td className="p-4">
                                <span className="inline-flex text-[11px] font-bold text-[#C9540A] bg-[#C9540A]/5 border border-[#C9540A]/10 px-2 py-1 rounded-md">
                                  {reg.workshop || reg.workshop_name}
                                </span>
                              </td>
                              <td className="p-4 text-xs font-semibold text-[#1A1A1A]">
                                <div>Phone: {reg.phone}</div>
                                {reg.city && <div className="text-[#6B6B6B] mt-0.5">City: {reg.city}</div>}
                              </td>
                              <td className="p-4">
                                <span className="inline-flex text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                                  {reg.phase || "N/A"}
                                </span>
                              </td>
                              <td className="p-4 text-xs text-[#6B6B6B]">
                                {new Date(reg.created_at || Date.now()).toLocaleDateString("en-US", { 
                                  month: "short", 
                                  day: "numeric", 
                                  year: "numeric" 
                                })}
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </motion.div>
            )}
          </>
        )}
      </main>

      {/* EDIT MEMBER DIALOG / SLIDE-OVER (Terracotta Styled) */}
      <AnimatePresence>
        {editingMember && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black"
              onClick={() => setEditingMember(null)}
            />
            
            {/* Modal Body */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-3xl shadow-2xl z-10 max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col border border-[#E8E4DF]"
            >
              <div className="p-6 bg-[#1A1A1A] text-white flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-black uppercase tracking-tight font-display">Edit Vendor Profile</h2>
                  <p className="text-xs text-gray-300 mt-0.5">Modify profile, status, and subscription parameters for @{editingMember.username}</p>
                </div>
                <button 
                  onClick={() => setEditingMember(null)}
                  className="px-3 py-1.5 bg-white/10 hover:bg-white/20 rounded-lg text-xs font-semibold transition-colors"
                >
                  Close
                </button>
              </div>

              <form onSubmit={handleSaveMember} className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  {/* General Profile fields */}
                  <div className="space-y-4">
                    <h3 className="text-xs font-black uppercase text-[#C9540A] tracking-wider border-b border-[#E8E4DF] pb-2 flex items-center gap-1.5">
                      <UserCheck className="w-4 h-4" /> Core Profile
                    </h3>
                    
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">Company / Brand Name</label>
                      <input 
                        type="text"
                        required
                        value={editingMember.name || ""}
                        onChange={(e) => setEditingMember({ ...editingMember, name: e.target.value })}
                        className="w-full bg-[#FAF8F5] border border-[#E8E4DF] rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#C9540A] focus:ring-1 focus:ring-[#C9540A]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">One-Line Tagline</label>
                      <input 
                        type="text"
                        value={editingMember.tagline || ""}
                        onChange={(e) => setEditingMember({ ...editingMember, tagline: e.target.value })}
                        className="w-full bg-[#FAF8F5] border border-[#E8E4DF] rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#C9540A] focus:ring-1 focus:ring-[#C9540A]"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1">Category</label>
                        <input 
                          type="text"
                          required
                          value={editingMember.category || ""}
                          onChange={(e) => setEditingMember({ ...editingMember, category: e.target.value })}
                          className="w-full bg-[#FAF8F5] border border-[#E8E4DF] rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#C9540A] focus:ring-1 focus:ring-[#C9540A]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1">City</label>
                        <input 
                          type="text"
                          required
                          value={editingMember.city || ""}
                          onChange={(e) => setEditingMember({ ...editingMember, city: e.target.value })}
                          className="w-full bg-[#FAF8F5] border border-[#E8E4DF] rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#C9540A] focus:ring-1 focus:ring-[#C9540A]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">Professional Bio</label>
                      <textarea 
                        rows={3}
                        value={editingMember.bio || ""}
                        onChange={(e) => setEditingMember({ ...editingMember, bio: e.target.value })}
                        className="w-full bg-[#FAF8F5] border border-[#E8E4DF] rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#C9540A] focus:ring-1 focus:ring-[#C9540A] resize-none"
                      />
                    </div>
                  </div>

                  {/* System & Contact fields */}
                  <div className="space-y-4">
                    <h3 className="text-xs font-black uppercase text-[#C9540A] tracking-wider border-b border-[#E8E4DF] pb-2 flex items-center gap-1.5">
                      <Settings className="w-4 h-4" /> System & Permissions
                    </h3>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1">Subscription Plan</label>
                        <select
                          value={editingMember.plan || "Basic"}
                          onChange={(e) => setEditingMember({ ...editingMember, plan: e.target.value })}
                          className="w-full bg-[#FAF8F5] border border-[#E8E4DF] rounded-xl px-3 py-2.5 text-sm outline-none focus:border-[#C9540A] focus:ring-1 focus:ring-[#C9540A]"
                        >
                          <option value="Basic">Basic Plan</option>
                          <option value="Premium">Premium Plan</option>
                          <option value="Featured">Featured Plan</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1">Verification Status</label>
                        <select
                          value={editingMember.verified ? "true" : "false"}
                          onChange={(e) => setEditingMember({ ...editingMember, verified: e.target.value === "true" })}
                          className="w-full bg-[#FAF8F5] border border-[#E8E4DF] rounded-xl px-3 py-2.5 text-sm outline-none focus:border-[#C9540A] focus:ring-1 focus:ring-[#C9540A]"
                        >
                          <option value="false">Pending Verification</option>
                          <option value="true">Verified / Active</option>
                        </select>
                      </div>
                    </div>

                    <h3 className="text-xs font-black uppercase text-[#C9540A] tracking-wider border-b border-[#E8E4DF] pt-2 pb-2 flex items-center gap-1.5">
                      <Globe className="w-4 h-4" /> Contact & Social Links
                    </h3>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1 flex items-center gap-1"><Mail className="w-3.5 h-3.5" /> Email</label>
                        <input 
                          type="email"
                          value={editingMember.contact?.email || ""}
                          onChange={(e) => setEditingMember({
                            ...editingMember,
                            contact: { ...editingMember.contact, email: e.target.value }
                          })}
                          className="w-full bg-[#FAF8F5] border border-[#E8E4DF] rounded-xl px-3 py-2 text-xs outline-none focus:border-[#C9540A]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1 flex items-center gap-1"><Phone className="w-3.5 h-3.5" /> Phone</label>
                        <input 
                          type="text"
                          value={editingMember.contact?.phone || ""}
                          onChange={(e) => setEditingMember({
                            ...editingMember,
                            contact: { ...editingMember.contact, phone: e.target.value }
                          })}
                          className="w-full bg-[#FAF8F5] border border-[#E8E4DF] rounded-xl px-3 py-2 text-xs outline-none focus:border-[#C9540A]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1 flex items-center gap-1"><Globe className="w-3.5 h-3.5" /> Website</label>
                        <input 
                          type="text"
                          value={editingMember.contact?.website || ""}
                          onChange={(e) => setEditingMember({
                            ...editingMember,
                            contact: { ...editingMember.contact, website: e.target.value }
                          })}
                          className="w-full bg-[#FAF8F5] border border-[#E8E4DF] rounded-xl px-3 py-2 text-xs outline-none focus:border-[#C9540A]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1 flex items-center gap-1"><MessageSquare className="w-3.5 h-3.5 text-emerald-500" /> WhatsApp</label>
                        <input 
                          type="text"
                          value={editingMember.contact?.whatsapp || ""}
                          onChange={(e) => setEditingMember({
                            ...editingMember,
                            contact: { ...editingMember.contact, whatsapp: e.target.value }
                          })}
                          className="w-full bg-[#FAF8F5] border border-[#E8E4DF] rounded-xl px-3 py-2 text-xs outline-none focus:border-[#C9540A]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-2 pt-1">
                      <div>
                        <label className="block text-[10px] font-bold text-gray-600 mb-0.5 flex items-center gap-0.5">📸 Instagram</label>
                        <input 
                          type="text"
                          placeholder="username"
                          value={editingMember.social?.instagram || ""}
                          onChange={(e) => setEditingMember({
                            ...editingMember,
                            social: { ...editingMember.social, instagram: e.target.value }
                          })}
                          className="w-full bg-[#FAF8F5] border border-[#E8E4DF] rounded-lg px-2 py-1 text-xs outline-none focus:border-[#C9540A]"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-gray-600 mb-0.5 flex items-center gap-0.5">👥 Facebook</label>
                        <input 
                          type="text"
                          placeholder="username"
                          value={editingMember.social?.facebook || ""}
                          onChange={(e) => setEditingMember({
                            ...editingMember,
                            social: { ...editingMember.social, facebook: e.target.value }
                          })}
                          className="w-full bg-[#FAF8F5] border border-[#E8E4DF] rounded-lg px-2 py-1 text-xs outline-none focus:border-[#C9540A]"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-gray-600 mb-0.5 flex items-center gap-0.5">💼 LinkedIn</label>
                        <input 
                          type="text"
                          placeholder="username"
                          value={editingMember.social?.linkedin || ""}
                          onChange={(e) => setEditingMember({
                            ...editingMember,
                            social: { ...editingMember.social, linkedin: e.target.value }
                          })}
                          className="w-full bg-[#FAF8F5] border border-[#E8E4DF] rounded-lg px-2 py-1 text-xs outline-none focus:border-[#C9540A]"
                        />
                      </div>
                    </div>
                  </div>

                </div>

                <div className="flex items-center justify-end gap-3 border-t border-[#E8E4DF] pt-6">
                  <button 
                    type="button"
                    onClick={() => setEditingMember(null)}
                    className="px-5 py-2.5 border border-[#E8E4DF] hover:border-[#1A1A1A] hover:bg-[#FAF8F5] text-sm font-semibold rounded-xl transition-all"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    disabled={saving}
                    className="px-6 py-2.5 bg-[#C9540A] hover:bg-[#AC4708] text-white text-sm font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center gap-2 disabled:opacity-50"
                  >
                    {saving && <Loader2 className="w-4 h-4 animate-spin" />}
                    Save Changes
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* DELETE CONFIRMATION DIALOG */}
      <AnimatePresence>
        {memberToDelete && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black"
              onClick={() => setMemberToDelete(null)}
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl shadow-2xl z-10 max-w-md w-full p-6 md:p-8 border border-[#E8E4DF]"
            >
              <div className="flex items-center gap-3 text-red-600 mb-4">
                <ShieldAlert className="w-8 h-8 flex-shrink-0" />
                <h3 className="text-lg font-black uppercase tracking-tight font-display">Delete Member Account?</h3>
              </div>
              
              <p className="text-sm text-[#6B6B6B] mb-6 leading-relaxed">
                Are you absolutely sure you want to delete <strong className="text-[#1A1A1A]">{memberToDelete.name}</strong> (@{memberToDelete.username})? 
                This will permanently delete their profile, service offerings, accumulated leads, and terminate their login account. 
                <span className="block mt-2 font-bold text-red-600">This action is irreversible.</span>
              </p>

              <div className="flex items-center justify-end gap-3">
                <button 
                  onClick={() => setMemberToDelete(null)}
                  disabled={saving}
                  className="px-4 py-2 border border-[#E8E4DF] hover:border-[#1A1A1A] hover:bg-[#FAF8F5] text-sm font-semibold rounded-xl transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleDeleteMember}
                  disabled={saving}
                  className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-semibold rounded-xl shadow-md hover:shadow-lg transition-colors flex items-center gap-2 disabled:opacity-50"
                >
                  {saving && <Loader2 className="w-4 h-4 animate-spin" />}
                  Delete Account
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
