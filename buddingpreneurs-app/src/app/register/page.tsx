"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff, Mail, Lock, User, Phone, MapPin, Briefcase, ArrowRight, CheckCircle2, AlertCircle } from "lucide-react";
import { useRouter } from "next/navigation";

const CATEGORIES = [
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
  "Podcasters",
  "Other"
];

const PLANS = [
  { value: "Basic", label: "Basic — Free", desc: "Public profile, 10 leads/month" },
  { value: "Premium", label: "Premium — ₹499/mo", desc: "Priority listing, unlimited leads, analytics" },
  { value: "Featured", label: "Featured — ₹999/mo", desc: "Top placement, verified badge, V-Card & QR" },
];

export default function RegisterPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "", username: "", email: "", phone: "",
    password: "", confirmPassword: "", category: "Handicrafts & Art",
    city: "", tagline: "", bio: "", promoCode: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [step, setStep] = useState(1); // 1=account, 2=business

  const set = (key: string, value: string) => {
    setForm((f) => ({ ...f, [key]: value }));
    // Auto-generate username from name
    if (key === "name" && !form.username) {
      setForm((f) => ({
        ...f,
        name: value,
        username: value.toLowerCase().trim().replace(/[^a-z0-9]/g, "-").replace(/-+/g, "-").substring(0, 30),
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!form.promoCode.trim()) {
      setError("Please enter a valid registration promo code.");
      return;
    }
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (form.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          username: form.username.toLowerCase().replace(/[^a-z0-9-]/g, "-"),
          email: form.email,
          phone: form.phone,
          password: form.password,
          category: form.category,
          city: form.city,
          tagline: form.tagline,
          bio: form.bio,
          promoCode: form.promoCode.trim(),
        }),
      });
      const data = await res.json();

      if (data.success) {
        router.push("/dashboard");
        router.refresh();
      } else {
        setError(data.error || "Registration failed.");
      }
    } catch {
      setError("Network error. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] flex font-sans">
      {/* Left Panel */}
      <div className="hidden lg:flex lg:w-2/5 bg-[#1A1A1A] relative overflow-hidden flex-col justify-between p-12">
        <div className="relative z-10">
          <a href="/" className="inline-flex items-center gap-2 mb-16">
            <span className="text-2xl font-black tracking-tight text-white">Buddingpreneurs</span>
          </a>
          <h1 className="text-4xl font-black text-white leading-tight mb-6">
            Start your<br />
            <span className="text-[#C9540A] italic" style={{ fontFamily: "Georgia, serif" }}>journey.</span>
          </h1>
          <p className="text-[#9A9A9A] text-base leading-relaxed max-w-sm">
            Join 500+ female founders building thriving businesses through community, visibility, and mentorship.
          </p>
        </div>

        {/* Benefits */}
        <div className="relative z-10 space-y-3">
          {[
            "Public business profile & shareable QR V-Card",
            "CRM inbox — receive and track client leads",
            "Directory listing visible to thousands of visitors",
            "Access to workshops, programs & community events",
          ].map((benefit) => (
            <div key={benefit} className="flex items-start gap-3">
              <CheckCircle2 className="w-4 h-4 text-[#C9540A] shrink-0 mt-0.5" />
              <p className="text-[#9A9A9A] text-sm">{benefit}</p>
            </div>
          ))}
        </div>

        <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-[#C9540A]/10 translate-x-1/3 translate-y-1/3" />
      </div>

      {/* Right Panel — Form */}
      <div className="w-full lg:w-3/5 overflow-y-auto">
        <div className="flex items-start justify-center min-h-full p-6 md:p-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="w-full max-w-lg py-4"
          >
            {/* Mobile logo */}
            <div className="lg:hidden mb-8">
              <a href="/" className="text-xl font-black tracking-tight text-[#1A1A1A]">Buddingpreneurs</a>
            </div>

            <div className="mb-8">
              <h2 className="text-3xl font-black text-[#1A1A1A] mb-2">Create Account</h2>
              <p className="text-[#6B6B6B]">
                Already a member?{" "}
                <a href="/login" className="text-[#C9540A] font-bold hover:underline">Sign In</a>
              </p>
            </div>

            {/* Step indicator */}
            <div className="flex items-center gap-3 mb-8">
              {[1, 2].map((s) => (
                <div key={s} className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => s < step && setStep(s)}
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                      step === s ? "bg-[#C9540A] text-white scale-110" :
                      step > s ? "bg-[#1A1A1A] text-white cursor-pointer" : "bg-[#E8E4DF] text-[#9A9A9A]"
                    }`}
                  >
                    {step > s ? <CheckCircle2 className="w-4 h-4" /> : s}
                  </button>
                  <span className={`text-xs font-semibold ${step === s ? "text-[#1A1A1A]" : "text-[#9A9A9A]"}`}>
                    {s === 1 ? "Account" : "Business"}
                  </span>
                  {s < 2 && <div className={`w-8 h-0.5 ${step > s ? "bg-[#C9540A]" : "bg-[#E8E4DF]"}`} />}
                </div>
              ))}
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl flex items-start gap-3"
              >
                <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                <p className="text-sm font-medium">{error}</p>
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              {/* Step 1: Account Info */}
              {step === 1 && (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="flex flex-col gap-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="sm:col-span-2">
                      <label className="block text-sm font-bold text-[#1A1A1A] mb-2">Full Business Name *</label>
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9A9A9A]" />
                        <input required type="text" placeholder="e.g. Priya Fashion & Couture"
                          value={form.name} onChange={(e) => set("name", e.target.value)}
                          className="w-full bg-[#F4F1ED] border-2 border-transparent rounded-xl pl-11 pr-4 py-3.5 text-sm font-medium text-[#1A1A1A] placeholder:text-[#9A9A9A] focus:outline-none focus:border-[#C9540A] transition-colors" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-[#1A1A1A] mb-2">Username *</label>
                      <input required type="text" placeholder="priya-fashion"
                        value={form.username} onChange={(e) => set("username", e.target.value)}
                        className="w-full bg-[#F4F1ED] border-2 border-transparent rounded-xl px-4 py-3.5 text-sm font-mono text-[#1A1A1A] placeholder:text-[#9A9A9A] focus:outline-none focus:border-[#C9540A] transition-colors" />
                      <p className="text-[11px] text-[#9A9A9A] mt-1">buddingpreneurs.com/member/{form.username || "your-slug"}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-[#1A1A1A] mb-2">Phone / WhatsApp *</label>
                      <div className="relative">
                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9A9A9A]" />
                        <input required type="tel" placeholder="9876543210"
                          value={form.phone} onChange={(e) => set("phone", e.target.value)}
                          className="w-full bg-[#F4F1ED] border-2 border-transparent rounded-xl pl-11 pr-4 py-3.5 text-sm font-medium text-[#1A1A1A] placeholder:text-[#9A9A9A] focus:outline-none focus:border-[#C9540A] transition-colors" />
                      </div>
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-sm font-bold text-[#1A1A1A] mb-2">Email Address *</label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9A9A9A]" />
                        <input required type="email" placeholder="you@example.com"
                          value={form.email} onChange={(e) => set("email", e.target.value)}
                          className="w-full bg-[#F4F1ED] border-2 border-transparent rounded-xl pl-11 pr-4 py-3.5 text-sm font-medium text-[#1A1A1A] placeholder:text-[#9A9A9A] focus:outline-none focus:border-[#C9540A] transition-colors" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-[#1A1A1A] mb-2">Password *</label>
                      <div className="relative">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9A9A9A]" />
                        <input required type={showPassword ? "text" : "password"} placeholder="Min. 6 characters"
                          value={form.password} onChange={(e) => set("password", e.target.value)}
                          className="w-full bg-[#F4F1ED] border-2 border-transparent rounded-xl pl-11 pr-12 py-3.5 text-sm font-medium text-[#1A1A1A] placeholder:text-[#9A9A9A] focus:outline-none focus:border-[#C9540A] transition-colors" />
                        <button type="button" onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-[#9A9A9A] hover:text-[#1A1A1A]">
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-[#1A1A1A] mb-2">Confirm Password *</label>
                      <div className="relative">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9A9A9A]" />
                        <input required type={showPassword ? "text" : "password"} placeholder="Repeat password"
                          value={form.confirmPassword} onChange={(e) => set("confirmPassword", e.target.value)}
                          className="w-full bg-[#F4F1ED] border-2 border-transparent rounded-xl pl-11 pr-4 py-3.5 text-sm font-medium text-[#1A1A1A] placeholder:text-[#9A9A9A] focus:outline-none focus:border-[#C9540A] transition-colors" />
                      </div>
                    </div>
                  </div>

                  <button type="button" onClick={() => {
                    if (!form.name || !form.username || !form.email || !form.phone || !form.password || !form.confirmPassword) {
                      setError("Please fill all required fields."); return;
                    }
                    if (form.password !== form.confirmPassword) { setError("Passwords do not match."); return; }
                    if (form.password.length < 6) { setError("Password must be at least 6 characters."); return; }
                    setError(""); setStep(2);
                  }}
                    className="w-full py-4 bg-[#C9540A] hover:bg-[#A8420A] text-white font-bold rounded-xl transition-all shadow-md flex items-center justify-center gap-2 text-sm mt-2">
                    Continue <ArrowRight className="w-4 h-4" />
                  </button>
                </motion.div>
              )}

              {/* Step 2: Business Info */}
              {step === 2 && (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="flex flex-col gap-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-bold text-[#1A1A1A] mb-2">Category *</label>
                      <div className="relative">
                        <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9A9A9A]" />
                        <select 
                          value={CATEGORIES.includes(form.category) ? form.category : "Other"} 
                          onChange={(e) => {
                            if (e.target.value === "Other") {
                              set("category", "");
                            } else {
                              set("category", e.target.value);
                            }
                          }}
                          className="w-full bg-[#F4F1ED] border-2 border-transparent rounded-xl pl-11 pr-4 py-3.5 text-sm font-medium text-[#1A1A1A] focus:outline-none focus:border-[#C9540A] transition-colors appearance-none"
                        >
                          <optgroup label="Products">
                            <option value="Handicrafts & Art">Handicrafts & Art</option>
                            <option value="Jewellery & Apparel">Jewellery & Apparel</option>
                            <option value="Clothing & Fashion">Clothing & Fashion</option>
                            <option value="Beauty & Personal Care">Beauty & Personal Care</option>
                            <option value="Home Decor">Home Decor</option>
                            <option value="Gifts & Customization">Gifts & Customization</option>
                            <option value="Food & Baking">Food & Baking</option>
                            <option value="Organic & Wellness Products">Organic & Wellness Products</option>
                          </optgroup>
                          <optgroup label="Services">
                            <option value="Coaching & Consulting">Coaching & Consulting</option>
                            <option value="Digital Marketing">Digital Marketing</option>
                            <option value="Graphic Design">Graphic Design</option>
                            <option value="Website Development">Website Development</option>
                            <option value="Content Writer">Content Writer</option>
                            <option value="Financial Services">Financial Services</option>
                          </optgroup>
                          <optgroup label="Professionals">
                            <option value="Trainers & Mentors">Trainers & Mentors</option>
                            <option value="Educators">Educators</option>
                            <option value="Doctors & Healthcare Professionals">Doctors & Healthcare Professionals</option>
                            <option value="Influencers">Influencers</option>
                            <option value="Podcasters">Podcasters</option>
                          </optgroup>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                      
                      {(!CATEGORIES.includes(form.category) || form.category === "") && (
                        <div className="mt-2.5">
                          <input 
                            required 
                            type="text" 
                            placeholder="Enter your custom business category..." 
                            value={form.category} 
                            onChange={(e) => set("category", e.target.value)}
                            className="w-full bg-[#F4F1ED] border-2 border-transparent rounded-xl px-4 py-2.5 text-xs font-semibold text-[#1A1A1A] placeholder:text-[#9A9A9A] focus:outline-none focus:border-[#C9540A] transition-colors" 
                          />
                        </div>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-[#1A1A1A] mb-2">City *</label>
                      <div className="relative">
                        <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9A9A9A]" />
                        <input required type="text" placeholder="e.g. Delhi, Mumbai, Pune"
                          value={form.city} onChange={(e) => set("city", e.target.value)}
                          className="w-full bg-[#F4F1ED] border-2 border-transparent rounded-xl pl-11 pr-4 py-3.5 text-sm font-medium text-[#1A1A1A] placeholder:text-[#9A9A9A] focus:outline-none focus:border-[#C9540A] transition-colors" />
                      </div>
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-sm font-bold text-[#1A1A1A] mb-2">One-liner Tagline</label>
                      <input type="text" placeholder="e.g. Handcrafted jewellery for the modern Indian woman"
                        value={form.tagline} onChange={(e) => set("tagline", e.target.value)}
                        className="w-full bg-[#F4F1ED] border-2 border-transparent rounded-xl px-4 py-3.5 text-sm font-medium text-[#1A1A1A] placeholder:text-[#9A9A9A] focus:outline-none focus:border-[#C9540A] transition-colors" />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-sm font-bold text-[#1A1A1A] mb-2">Business Bio</label>
                      <textarea rows={3} placeholder="Tell clients about your story and offerings..."
                        value={form.bio} onChange={(e) => set("bio", e.target.value)}
                        className="w-full bg-[#F4F1ED] border-2 border-transparent rounded-xl px-4 py-3.5 text-sm font-medium text-[#1A1A1A] placeholder:text-[#9A9A9A] focus:outline-none focus:border-[#C9540A] transition-colors resize-none" />
                    </div>
                  </div>

                  {/* Registration Promo Code Input */}
                  <div>
                    <label className="block text-sm font-bold text-[#1A1A1A] mb-2">Registration Promo Code *</label>
                    <input 
                      required 
                      type="text" 
                      placeholder="Enter promo code (e.g. BPFREE)"
                      value={form.promoCode} 
                      onChange={(e) => set("promoCode", e.target.value)}
                      className="w-full bg-[#F4F1ED] border-2 border-transparent rounded-xl px-4 py-3.5 text-sm font-bold uppercase tracking-wider text-[#1A1A1A] placeholder:normal-case placeholder:font-medium placeholder:text-[#9A9A9A] focus:outline-none focus:border-[#C9540A] transition-colors" 
                    />
                    <p className="text-[11px] text-[#9A9A9A] mt-1.5 leading-relaxed">
                      Please enter the registration promo code provided to you by the Buddingpreneurs admin team.
                    </p>
                  </div>

                  <div className="flex gap-3 mt-2">
                    <button type="button" onClick={() => setStep(1)}
                      className="flex-1 py-4 bg-[#F4F1ED] hover:bg-[#E8E4DF] text-[#1A1A1A] font-bold rounded-xl transition-all text-sm">
                      ← Back
                    </button>
                    <button type="submit" disabled={loading}
                      className="flex-[2] py-4 bg-[#C9540A] hover:bg-[#A8420A] disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold rounded-xl transition-all shadow-md flex items-center justify-center gap-2 text-sm">
                      {loading ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <>Create Account <ArrowRight className="w-4 h-4" /></>}
                    </button>
                  </div>
                </motion.div>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
