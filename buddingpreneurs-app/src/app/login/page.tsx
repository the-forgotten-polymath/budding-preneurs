"use client";

import React, { useState, Suspense } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff, Mail, Lock, ArrowRight, AlertCircle } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/dashboard";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();

      if (data.success) {
        // Route based on role
        if (data.user.role === "admin") {
          router.push("/admin/analytics");
        } else {
          router.push(redirect.startsWith("/admin") ? "/dashboard" : redirect);
        }
        router.refresh();
      } else {
        setError(data.error || "Login failed. Please try again.");
      }
    } catch {
      setError("Network error. Please check your connection.");
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
            Welcome<br />
            <span className="text-[#C9540A] italic" style={{ fontFamily: "Georgia, serif" }}>back.</span>
          </h1>
          <p className="text-[#9A9A9A] text-lg leading-relaxed max-w-sm">
            Sign in to your member dashboard, manage your leads, and grow your business with the Buddingpreneurs network.
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

          <div className="mb-8">
            <h2 className="text-3xl font-black text-[#1A1A1A] mb-2">Sign In</h2>
            <p className="text-[#6B6B6B]">
              Don&apos;t have an account?{" "}
              <a href="/register" className="text-[#C9540A] font-bold hover:underline">
                Join Free
              </a>
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

            <div>
              <label className="block text-sm font-bold text-[#1A1A1A] mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9A9A9A]" />
                <input
                  required
                  type={showPassword ? "text" : "password"}
                  placeholder="Your password"
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

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-[#C9540A] hover:bg-[#A8420A] disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold rounded-xl transition-all shadow-md flex items-center justify-center gap-2 text-sm mt-2"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>Sign In <ArrowRight className="w-4 h-4" /></>
              )}
            </button>
          </form>

          <p className="mt-8 text-center text-xs text-[#9A9A9A]">
            By signing in, you agree to our{" "}
            <a href="/disclaimer" className="underline hover:text-[#C9540A]">Terms & Disclaimer</a>
          </p>
        </motion.div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#FAF8F5] flex items-center justify-center"><div className="w-10 h-10 border-4 border-[#C9540A] border-t-transparent rounded-full animate-spin" /></div>}>
      <LoginForm />
    </Suspense>
  );
}
