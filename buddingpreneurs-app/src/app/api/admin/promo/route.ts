import { NextResponse } from "next/server";
import { getSupabaseServerClient, getSupabaseAdminClient } from "@/lib/supabase";

// Helper to get the promo code from the settings table or fallback to the admin's tagline
async function getActivePromoCode(supabaseAdmin: any): Promise<string> {
  try {
    // 1. Try querying the settings table first
    const { data: settingData, error: settingError } = await supabaseAdmin
      .from("settings")
      .select("value")
      .eq("key", "promo_code")
      .maybeSingle();

    if (!settingError && settingData) {
      return settingData.value || "BPFREE";
    }
  } catch (e) {
    // Settings table might not exist, proceed to fallback
  }

  // 2. Fallback: Query the admin member's tagline field
  try {
    const { data: adminMember, error: adminError } = await supabaseAdmin
      .from("members")
      .select("tagline")
      .eq("role", "admin")
      .limit(1)
      .maybeSingle();

    if (!adminError && adminMember && adminMember.tagline) {
      return adminMember.tagline;
    }
  } catch (e) {
    // Ignore fallback errors
  }

  return "BPFREE"; // Default global fallback promo code
}

// GET /api/admin/promo - Retrieve the active promo code
export async function GET() {
  try {
    const supabaseAdmin = getSupabaseAdminClient();
    const code = await getActivePromoCode(supabaseAdmin);
    return NextResponse.json({ success: true, promoCode: code });
  } catch (error) {
    console.error("Failed to get promo code:", error);
    return NextResponse.json({ success: false, error: "Failed to load promo code" }, { status: 500 });
  }
}

// POST /api/admin/promo - Update the promo code (Admins only)
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { promoCode } = body;

    if (!promoCode || typeof promoCode !== "string") {
      return NextResponse.json({ success: false, error: "Promo code is required" }, { status: 400 });
    }

    const supabase = await getSupabaseServerClient();
    const supabaseAdmin = getSupabaseAdminClient();

    // 1. Authenticate user session
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    // 2. Gatekeeper: Must be an Admin
    const { data: activeMember, error: activeError } = await supabaseAdmin
      .from("members")
      .select("role")
      .eq("auth_user_id", user.id)
      .maybeSingle();

    if (activeError || !activeMember || activeMember.role !== "admin") {
      return NextResponse.json({ success: false, error: "Forbidden: Admins only" }, { status: 403 });
    }

    const cleanedCode = promoCode.trim().toUpperCase();

    // 3. Try to update settings table
    let updatedInSettings = false;
    try {
      // Upsert into settings key = 'promo_code'
      const { error: upsertError } = await supabaseAdmin
        .from("settings")
        .upsert({ key: "promo_code", value: cleanedCode }, { onConflict: "key" });

      if (!upsertError) {
        updatedInSettings = true;
      }
    } catch (e) {
      // settings table might not exist
    }

    // 4. Fallback: Update admin members' tagline
    if (!updatedInSettings) {
      const { error: updateError } = await supabaseAdmin
        .from("members")
        .update({ tagline: cleanedCode })
        .eq("role", "admin");

      if (updateError) {
        console.error("Failed to update admin tagline fallback:", updateError);
        return NextResponse.json({ success: false, error: "Failed to update promo code in database" }, { status: 500 });
      }
    }

    return NextResponse.json({ success: true, promoCode: cleanedCode });
  } catch (error) {
    console.error("Failed to update promo code:", error);
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
  }
}
