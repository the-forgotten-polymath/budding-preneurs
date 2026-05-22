import { NextResponse } from "next/server";
import { getSupabaseServerClient, getSupabaseAdminClient } from "@/lib/supabase";

export async function GET() {
  try {
    const supabase = await getSupabaseServerClient();
    
    // 1. Retrieve the authenticated user from Supabase Auth using edge-verified tokens
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      return NextResponse.json({ success: false, user: null });
    }
    
    // 2. Fetch the corresponding profile from public.members using the admin client
    const supabaseAdmin = getSupabaseAdminClient();
    const { data: member, error: dbError } = await supabaseAdmin
      .from("members")
      .select("username, name, role, email")
      .eq("auth_user_id", user.id)
      .maybeSingle();

    if (dbError) {
      console.error("Database query error in /api/auth/me route:", dbError);
    }

    // Fallback if the user is authenticated but does not yet have a record in members
    if (!member) {
      return NextResponse.json({
        success: true,
        user: {
          username: user.id,
          name: user.user_metadata?.name || "Member",
          role: "vendor",
          email: user.email,
        },
      });
    }

    return NextResponse.json({
      success: true,
      user: {
        username: member.username,
        name: member.name,
        role: member.role || "vendor",
        email: member.email || user.email,
      },
    });
  } catch (error) {
    console.error("Auth session query error:", error);
    return NextResponse.json({ success: false, user: null });
  }
}
