"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Phone, Lock, ArrowRight, AlertCircle, CheckCircle2, ArrowLeft } from "lucide-react";
import { getSupabaseBrowserClient } from "@/lib/supabase-client";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleVerifyIdentity = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/reset-password/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, phone })
      });
      const data = await res.json();
      
      if (data.success) {
        setStep(2);
      } else {
        setError(data.error || "No matching account found. Please check your details.");
      }
    } catch (err: any) {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    
    if (newPassword.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/reset-password/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, phone, newPassword })
      });
      const data = await res.json();
      
      if (data.success) {
        // Automatically log them in with the new password
        const supabase = getSupabaseBrowserClient();
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password: newPassword
        });

        if (signInError) {
          // If login fails for some reason, just send them to login page
          setStep(3);
        } else {
          // Success! Redirect to dashboard
          router.push("/dashboard");
          router.refresh();
        }
      } else {
        setError(data.error || "Failed to update password.");
      }
    } catch (err: any) {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] flex font-sans">
      {/* Left Panel — Brand */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#1A1A1A] relative overflow-hidden flex-col justify-between p-12">
        <div className="relative z-10">
          <a href="/" className="inline-flex items-center gap-2 mb-16">
            <span className="text-2xl font-black tracking-tight text-white">Buddingpreneurs</span>
          </a>
          <h1 className="text-5xl font-black text-white leading-tight mb-6">
            Recover Your<br />
            <span className="text-[#C9540A] italic" style={{ fontFamily: "Georgia, serif" }}>account.</span>
          </h1>
          <p className="text-[#9A9A9A] text-lg leading-relaxed max-w-sm">
            Verify your identity with your registered email and phone number to instantly set a new password.
          </p>
        </div>

        {/* Decorative circles */}
        <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-[#C9540A]/10 translate-x-1/3 translate-y-1/3" />
        <div className="absolute top-1/3 right-1/4 w-48 h-48 rounded-full bg-[#C9540A]/5" />

        {/* Spacing footer */}
        <div className="relative z-10">
          <p className="text-[#6B6B6B] text-xs font-medium">
            © {new Date().getFullYear()} Buddingpreneurs. Fostering Indian Women-Led Startups.
          </p>
        </div>
      </div>

      {/* Right Panel — Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 md:p-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-md"
        >
          {/* Mobile logo */}
          <div className="lg:hidden mb-8">
            <a href="/" className="text-xl font-black tracking-tight text-[#1A1A1A]">
              Buddingpreneurs
            </a>
          </div>

          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step-1"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.2 }}
              >
                <div className="mb-8">
                  <a href="/login" className="inline-flex items-center gap-2 text-xs font-bold text-[#6B6B6B] hover:text-[#C9540A] transition-colors mb-4 group">
                    <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
                    Back to Sign In
                  </a>
                  <h2 className="text-3xl font-black text-[#1A1A1A] mb-2">Reset Password</h2>
                  <p className="text-[#6B6B6B]">
                    Please enter your registered email and phone number to verify your identity.
                  </p>
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

                <form onSubmit={handleVerifyIdentity} className="flex flex-col gap-5">
                  <div>
                    <label className="block text-sm font-bold text-[#1A1A1A] mb-2">Registered Email Address</label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9A9A9A]" />
                      <input
                        required
                        type="email"
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-[#F4F1ED] border-2 border-transparent rounded-xl pl-11 pr-4 py-3.5 text-sm font-medium text-[#1A1A1A] placeholder:text-[#9A9A9A] focus:outline-none focus:border-[#C9540A] transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-[#1A1A1A] mb-2">Registered Phone Number</label>
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9A9A9A]" />
                      <input
                        required
                        type="tel"
                        placeholder="e.g. 9876543210"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full bg-[#F4F1ED] border-2 border-transparent rounded-xl pl-11 pr-4 py-3.5 text-sm font-medium text-[#1A1A1A] placeholder:text-[#9A9A9A] focus:outline-none focus:border-[#C9540A] transition-colors"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 bg-[#C9540A] hover:bg-[#A8420A] disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold rounded-xl transition-all shadow-md flex items-center justify-center gap-2 text-sm mt-2"
                  >
                    {loading ? (
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>Verify Identity <ArrowRight className="w-4 h-4" /></>
                    )}
                  </button>
                </form>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step-2"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.2 }}
              >
                <div className="mb-8">
                  <button onClick={() => setStep(1)} className="inline-flex items-center gap-2 text-xs font-bold text-[#6B6B6B] hover:text-[#C9540A] transition-colors mb-4 group">
                    <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
                    Back
                  </button>
                  <h2 className="text-3xl font-black text-[#1A1A1A] mb-2">Create New Password</h2>
                  <p className="text-[#6B6B6B]">
                    Your identity has been verified! Please choose a new secure password.
                  </p>
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

                <form onSubmit={handleResetPassword} className="flex flex-col gap-5">
                  <div>
                    <label className="block text-sm font-bold text-[#1A1A1A] mb-2">New Password</label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9A9A9A]" />
                      <input
                        required
                        type="password"
                        placeholder="Min. 6 characters"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="w-full bg-[#F4F1ED] border-2 border-transparent rounded-xl pl-11 pr-4 py-3.5 text-sm font-medium text-[#1A1A1A] placeholder:text-[#9A9A9A] focus:outline-none focus:border-[#C9540A] transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-[#1A1A1A] mb-2">Confirm New Password</label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9A9A9A]" />
                      <input
                        required
                        type="password"
                        placeholder="Re-enter password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full bg-[#F4F1ED] border-2 border-transparent rounded-xl pl-11 pr-4 py-3.5 text-sm font-medium text-[#1A1A1A] placeholder:text-[#9A9A9A] focus:outline-none focus:border-[#C9540A] transition-colors"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 bg-[#C9540A] hover:bg-[#A8420A] disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold rounded-xl transition-all shadow-md flex items-center justify-center gap-2 text-sm mt-2"
                  >
                    {loading ? (
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>Update & Login <ArrowRight className="w-4 h-4" /></>
                    )}
                  </button>
                </form>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step-3"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", stiffness: 100 }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-50 border-2 border-green-200 text-green-600 mb-6">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h2 className="text-3xl font-black text-[#1A1A1A] mb-3">Password Updated!</h2>
                <p className="text-[#6B6B6B] leading-relaxed mb-8 max-w-sm mx-auto">
                  Your password has been successfully reset. You can now login with your new credentials.
                </p>
                <a
                  href="/login"
                  className="inline-flex items-center justify-center w-full py-4 bg-[#C9540A] hover:bg-[#A8420A] text-white font-bold rounded-xl transition-all shadow-md gap-2 text-sm"
                >
                  Go to Login <ArrowRight className="w-4 h-4" />
                </a>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}
