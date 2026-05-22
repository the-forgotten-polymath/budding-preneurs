import { NextResponse } from "next/server";
import { getSupabaseServerClient } from "@/lib/supabase";

export async function POST() {
  try {
    const supabase = await getSupabaseServerClient();
    
    // Call Supabase signOut to sign out the user and automatically clear auth session cookies
    await supabase.auth.signOut();
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Logout error:", error);
    return NextResponse.json(
      { success: false, error: "Logout failed. Please try again." },
      { status: 500 }
    );
  }
}
