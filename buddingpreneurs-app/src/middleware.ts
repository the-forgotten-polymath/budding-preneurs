import { createServerClient } from "@supabase/ssr";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getSupabaseAdminClient } from "@/lib/supabase";

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request,
  });

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://your-project-id.supabase.co";
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder";

  const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
        response = NextResponse.next({
          request,
        });
        cookiesToSet.forEach(({ name, value, options }) =>
          response.cookies.set(name, value, options)
        );
      },
    },
  });

  // IMPORTANT: Avoid writing any logic between createServerClient and supabase.auth.getUser()
  const { data: { user } } = await supabase.auth.getUser();

  const { pathname } = request.nextUrl;

  // Retrieve user role from database if user is logged in
  let role: string | null = null;
  if (user) {
    try {
      const supabaseAdmin = getSupabaseAdminClient();
      const { data: member } = await supabaseAdmin
        .from("members")
        .select("role")
        .eq("auth_user_id", user.id)
        .maybeSingle();

      role = member?.role || "vendor"; // Default fallback to vendor
    } catch (err) {
      console.error("Middleware DB check error:", err);
      role = "vendor";
    }
  }

  // ── Vendor Dashboard protection ──
  if (pathname.startsWith("/dashboard")) {
    if (!user) {
      return NextResponse.redirect(
        new URL(`/login?redirect=${encodeURIComponent(pathname)}`, request.url)
      );
    }
    if (role === "admin") {
      return NextResponse.redirect(new URL("/admin/analytics", request.url));
    }
  }

  // ── Admin Panel protection ──
  if (pathname.startsWith("/admin")) {
    if (!user) {
      return NextResponse.redirect(
        new URL("/login?redirect=/admin/analytics", request.url)
      );
    }
    if (role !== "admin") {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  }

  // ── Redirect already-logged-in users away from login/register ──
  if (pathname === "/login" || pathname === "/register") {
    if (user) {
      return NextResponse.redirect(
        new URL(role === "admin" ? "/admin/analytics" : "/dashboard", request.url)
      );
    }
  }

  return response;
}

export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*", "/login", "/register"],
};
