import { NextResponse } from "next/server";
import { getSupabaseAdminClient } from "@/lib/supabase";

export async function POST(request: Request) {
  try {
    const { username } = await request.json();
    if (!username) {
      return NextResponse.json({ success: false, error: "username is required" }, { status: 400 });
    }

    const supabaseAdmin = getSupabaseAdminClient();

    // 1. Fetch current views count
    const { data: member, error: fetchError } = await supabaseAdmin
      .from("members")
      .select("views")
      .eq("username", username)
      .maybeSingle();

    if (fetchError) {
      console.error("Database fetch error for views:", fetchError);
      return NextResponse.json({ success: false, error: "Failed to record view" }, { status: 500 });
    }

    if (!member) {
      return NextResponse.json({ success: false, error: "Member not found" }, { status: 404 });
    }

    // 2. Atomically increment the count
    const updatedViews = (member.views || 0) + 1;
    const { error: updateError } = await supabaseAdmin
      .from("members")
      .update({ views: updatedViews })
      .eq("username", username);

    if (updateError) {
      console.error("Database update error for views:", updateError);
      return NextResponse.json({ success: false, error: "Failed to update view count" }, { status: 500 });
    }

    return NextResponse.json({ success: true, views: updatedViews });
  } catch (error) {
    console.error("Failed to record view:", error);
    return NextResponse.json({ success: false, error: "Failed to record view" }, { status: 500 });
  }
}
