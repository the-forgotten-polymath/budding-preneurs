import { NextResponse } from "next/server";
import { getSupabaseAdminClient } from "@/lib/supabase";

export async function POST(req: Request) {
  try {
    const { email, phone, newPassword } = await req.json();
    if (!email || !phone || !newPassword) {
      return NextResponse.json({ success: false, error: "Missing required fields." }, { status: 400 });
    }

    if (newPassword.length < 6) {
      return NextResponse.json({ success: false, error: "Password must be at least 6 characters." }, { status: 400 });
    }

    const supabaseAdmin = getSupabaseAdminClient();
    
    // Verify again to ensure the request is valid
    const { data, error } = await supabaseAdmin
      .from("members")
      .select("auth_user_id")
      .ilike("email", email.trim())
      .eq("phone", phone.trim())
      .maybeSingle();

    if (error || !data || !data.auth_user_id) {
      return NextResponse.json({ success: false, error: "Invalid credentials." }, { status: 403 });
    }

    // Update the password using Admin API
    const { error: updateError } = await supabaseAdmin.auth.admin.updateUserById(data.auth_user_id, {
      password: newPassword
    });

    if (updateError) {
      console.error("Failed to update password in auth:", updateError);
      return NextResponse.json({ success: false, error: updateError.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Reset password update error:", err);
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
  }
}
