import { NextResponse } from "next/server";
import { getSupabaseServerClient, getSupabaseAdminClient } from "@/lib/supabase-server";

export async function POST(request: Request) {
  try {
    const { phone } = await request.json();
    if (!phone) {
      return NextResponse.json({ success: false, error: "Phone number is required" }, { status: 400 });
    }

    const supabase = await getSupabaseServerClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const supabaseAdmin = getSupabaseAdminClient();

    // 1. Update Supabase Auth user phone
    const { error: updateAuthError } = await supabaseAdmin.auth.admin.updateUserById(user.id, {
      phone: phone.trim()
    });

    if (updateAuthError) {
      console.error("Failed to update auth phone:", updateAuthError);
      return NextResponse.json({ success: false, error: updateAuthError.message }, { status: 500 });
    }

    // 2. Also try to update the public.members profile if it exists
    const { error: updateMemberError } = await supabaseAdmin
      .from("members")
      .update({ phone: phone.trim() })
      .eq("auth_user_id", user.id);

    // We don't fail the request if updating the member table fails, 
    // because admins might not have a public profile yet.
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Update phone error:", error);
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
  }
}
