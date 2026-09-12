import { NextResponse } from "next/server";
import { getSupabaseAdminClient } from "@/lib/supabase";

export async function POST(req: Request) {
  try {
    const { email, phone } = await req.json();
    if (!email || !phone) {
      return NextResponse.json({ success: false, error: "Email and phone are required." }, { status: 400 });
    }

    const supabaseAdmin = getSupabaseAdminClient();
    
    // Check if a member exists with this exact email and phone
    const { data, error } = await supabaseAdmin
      .from("members")
      .select("auth_user_id")
      .ilike("email", email.trim())
      .eq("phone", phone.trim())
      .maybeSingle();

    if (error || !data || !data.auth_user_id) {
      return NextResponse.json({ success: false, error: "No matching account found for this email and phone combination." }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Reset password verify error:", err);
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
  }
}
