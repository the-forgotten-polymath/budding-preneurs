"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, ArrowRight, AlertCircle, CheckCircle2, ArrowLeft } from "lucide-react";
import { getSupabaseBrowserClient } from "@/lib/supabase-client";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const supabase = getSupabaseBrowserClient();
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/update-password`,
      });

      if (resetError) {
        setError(resetError.message || "Failed to send reset link. Please check your email.");
      } else {
        setSuccess(true);
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
            Enter your email and we'll send you a secure link to reset your password and restore access to your workspace.
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
            {!success ? (
              <motion.div
                key="form-container"
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
                    Enter the email address associated with your account, and we'll email you a password reset link.
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

                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  <div>
                    <label className="block text-sm font-bold text-[#1A1A1A] mb-2">Email Address</label>
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

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 bg-[#C9540A] hover:bg-[#A8420A] disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold rounded-xl transition-all shadow-md flex items-center justify-center gap-2 text-sm mt-2"
                  >
                    {loading ? (
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>Send Reset Link <ArrowRight className="w-4 h-4" /></>
                    )}
                  </button>
                </form>
              </motion.div>
            ) : (
              <motion.div
                key="success-container"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", stiffness: 100 }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-50 border-2 border-green-200 text-green-600 mb-6">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h2 className="text-3xl font-black text-[#1A1A1A] mb-3">Check Your Email</h2>
                <p className="text-[#6B6B6B] leading-relaxed mb-8 max-w-sm mx-auto">
                  We have sent a secure recovery link to <span className="font-bold text-[#1A1A1A]">{email}</span>. Click the link inside the email to choose a new password.
                </p>
                <a
                  href="/login"
                  className="inline-flex items-center gap-2 py-3.5 px-6 border-2 border-gray-200 hover:border-[#1A1A1A] text-sm font-bold text-[#1A1A1A] rounded-xl transition-all"
                >
                  <ArrowLeft className="w-4 h-4" /> Return to Login
                </a>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}
