import { NextResponse } from "next/server";
import { getSupabaseServerClient, getSupabaseAdminClient } from "@/lib/supabase";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: "Email and password are required." },
        { status: 400 }
      );
    }

    const supabase = await getSupabaseServerClient();
    const supabaseAdmin = getSupabaseAdminClient();

    // 1. Authenticate user with Supabase Auth
    // This will automatically set the Supabase authentication cookies under the hood via @supabase/ssr
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError) {
      console.error("Auth login error:", authError);
      return NextResponse.json(
        { success: false, error: authError.message || "Invalid email or password." },
        { status: 401 }
      );
    }

    const authUser = authData.user;
    if (!authUser) {
      return NextResponse.json(
        { success: false, error: "Authentication failed." },
        { status: 401 }
      );
    }

    // 2. Fetch the member profile by auth_user_id
    let { data: member, error: dbError } = await supabaseAdmin
      .from("members")
      .select("username, name, role")
      .eq("auth_user_id", authUser.id)
      .maybeSingle();

    if (dbError) {
      console.error("Database query error:", dbError);
    }

    // 3. Fallback/Auto-linking for legacy/pre-seeded profiles
    if (!member) {
      // Find by email if auth_user_id has not been linked yet
      const { data: matchedEmailProfile } = await supabaseAdmin
        .from("members")
        .select("username, name, role")
        .eq("email", email.toLowerCase())
        .maybeSingle();

      if (matchedEmailProfile) {
        // Link the auth user ID to the existing profile
        const { error: updateError } = await supabaseAdmin
          .from("members")
          .update({ auth_user_id: authUser.id })
          .eq("username", matchedEmailProfile.username);

        if (updateError) {
          console.error("Failed to link legacy profile auth_user_id:", updateError);
        } else {
          console.log(`Successfully linked auth_user_id to legacy profile: ${matchedEmailProfile.username}`);
          member = matchedEmailProfile;
        }
      }
    }

    return NextResponse.json({
      success: true,
      user: {
        username: member?.username || authUser.id,
        name: member?.name || authUser.user_metadata?.name || "Member",
        role: member?.role || "vendor",
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { success: false, error: "Login failed. Please try again." },
      { status: 500 }
    );
  }
}
