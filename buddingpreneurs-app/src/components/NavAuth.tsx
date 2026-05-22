"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { LayoutDashboard, LogOut, ShieldCheck } from "lucide-react";

interface SessionUser {
  username: string;
  name: string;
  role: "vendor" | "admin";
}

export default function NavAuth() {
  const [user, setUser] = useState<SessionUser | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetch("/api/auth/me")
      .then((r) => r.json())
      .then((data) => { if (data.success) setUser(data.user); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    setUser(null);
    router.push("/");
    router.refresh();
  };

  if (loading) {
    return <div className="w-32 h-8 bg-[#F4F1ED] rounded-full animate-pulse" />;
  }

  if (user) {
    return (
      <div className="flex items-center gap-2">
        <a
          href={user.role === "admin" ? "/admin/analytics" : "/dashboard"}
          className="flex items-center gap-1.5 px-3 py-2 bg-[#F4F1ED] hover:bg-[#E8E4DF] text-[#1A1A1A] rounded-full font-bold text-[11px] xl:text-xs transition-colors"
        >
          {user.role === "admin"
            ? <ShieldCheck className="w-3.5 h-3.5 text-[#C9540A]" />
            : <LayoutDashboard className="w-3.5 h-3.5 text-[#C9540A]" />}
          {user.role === "admin" ? "Admin" : "Dashboard"}
        </a>
        <button
          onClick={handleLogout}
          className="flex items-center gap-1.5 px-3 py-2 bg-[#1A1A1A] hover:bg-[#C9540A] text-white rounded-full font-bold text-[11px] xl:text-xs transition-colors"
        >
          <LogOut className="w-3.5 h-3.5" />
          Sign Out
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <a
        href="/login"
        className="px-3 py-2 text-[#1A1A1A] hover:text-[#C9540A] font-semibold text-[11px] xl:text-xs transition-colors"
      >
        Log In
      </a>
      <a
        href="/register"
        className="px-4 py-2 bg-[#C9540A] hover:bg-[#A8420A] text-white rounded-full font-bold text-[11px] xl:text-xs transition-colors shadow-sm"
      >
        Join Free
      </a>
    </div>
  );
}
