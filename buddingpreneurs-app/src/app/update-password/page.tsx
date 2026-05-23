"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, Eye, EyeOff, ArrowRight, AlertCircle, CheckCircle2, ArrowLeft } from "lucide-react";
import { getSupabaseBrowserClient } from "@/lib/supabase-client";
import { useRouter } from "next/navigation";

export default function UpdatePasswordPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [checkingSession, setCheckingSession] = useState(true);
  const [hasSession, setHasSession] = useState(false);

  useEffect(() => {
    async function checkSession() {
      try {
        const supabase = getSupabaseBrowserClient();
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          setHasSession(true);
        } else {
          setHasSession(false);
        }
      } catch (err) {
        setHasSession(false);
      } finally {
        setCheckingSession(false);
      }
    }
    checkSession();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const supabase = getSupabaseBrowserClient();
      const { error: updateError } = await supabase.auth.updateUser({
        password: password,
      });

      if (updateError) {
        setError(updateError.message || "Failed to update password. Please try again.");
      } else {
        setSuccess(true);
        // Automatically sign out to force user to log in with new password or redirect to login
        await supabase.auth.signOut();
        setTimeout(() => {
          router.push("/login");
        }, 3000);
      }
    } catch (err: any) {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (checkingSession) {
    return (
      <div className="min-h-screen bg-[#FAF8F5] flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-[#C9540A] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF8F5] flex font-sans">
      {/* Left Panel — Brand */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#1A1A1A] relative overflow-hidden flex-col justify-between p-12">
        <div className="relative z-10">
          <a href="/" className="inline-flex items-center gap-2 mb-16">
            <span className="text-2xl font-black tracking-tight text-white">Buddingpreneurs</span>
          </a>
          <h1 className="text-5xl font-black text-white leading-tight mb-6">
            Set Your New<br />
            <span className="text-[#C9540A] italic" style={{ fontFamily: "Georgia, serif" }}>password.</span>
          </h1>
          <p className="text-[#9A9A9A] text-lg leading-relaxed max-w-sm">
            Create a secure, strong password to safeguard your vendor account and catalog services.
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
            {!hasSession ? (
              <motion.div
                key="invalid-session"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-50 border-2 border-red-200 text-red-600 mb-6">
                  <AlertCircle className="w-8 h-8" />
                </div>
                <h2 className="text-3xl font-black text-[#1A1A1A] mb-3">Invalid Link</h2>
                <p className="text-[#6B6B6B] leading-relaxed mb-8 max-w-sm mx-auto">
                  Your password recovery session has expired, is invalid, or was accessed incorrectly. Please request a new recovery link.
                </p>
                <a
                  href="/forgot-password"
                  className="inline-flex items-center gap-2 py-3.5 px-6 bg-[#C9540A] hover:bg-[#A8420A] text-sm font-bold text-white rounded-xl transition-all shadow-md"
                >
                  Request Reset Link
                </a>
              </motion.div>
            ) : !success ? (
              <motion.div
                key="form-container"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.2 }}
              >
                <div className="mb-8">
                  <h2 className="text-3xl font-black text-[#1A1A1A] mb-2">Create New Password</h2>
                  <p className="text-[#6B6B6B]">
                    Please enter and confirm your secure new password below.
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
                    <label className="block text-sm font-bold text-[#1A1A1A] mb-2">New Password</label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9A9A9A]" />
                      <input
                        required
                        type={showPassword ? "text" : "password"}
                        placeholder="Min. 6 characters"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full bg-[#F4F1ED] border-2 border-transparent rounded-xl pl-11 pr-12 py-3.5 text-sm font-medium text-[#1A1A1A] placeholder:text-[#9A9A9A] focus:outline-none focus:border-[#C9540A] transition-colors"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-[#9A9A9A] hover:text-[#1A1A1A] transition-colors"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-[#1A1A1A] mb-2">Confirm New Password</label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9A9A9A]" />
                      <input
                        required
                        type={showPassword ? "text" : "password"}
                        placeholder="Re-enter password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full bg-[#F4F1ED] border-2 border-transparent rounded-xl pl-11 pr-12 py-3.5 text-sm font-medium text-[#1A1A1A] placeholder:text-[#9A9A9A] focus:outline-none focus:border-[#C9540A] transition-colors"
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
                      <>Update Password <ArrowRight className="w-4 h-4" /></>
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
                <h2 className="text-3xl font-black text-[#1A1A1A] mb-3">Password Updated</h2>
                <p className="text-[#6B6B6B] leading-relaxed mb-8 max-w-sm mx-auto">
                  Your password has been successfully reset! You will be redirected to the sign in page momentarily.
                </p>
                <div className="w-10 h-10 border-4 border-[#C9540A] border-t-transparent rounded-full animate-spin mx-auto" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}
