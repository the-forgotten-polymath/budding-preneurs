import { NextResponse } from "next/server";
import { getSupabaseServerClient, getSupabaseAdminClient } from "@/lib/supabase";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, username, category, city, email, phone, password, tagline, bio, plan } = body;

    // Validate required fields
    if (!name || !username || !email || !phone || !password) {
      return NextResponse.json(
        { success: false, error: "Name, username, email, phone, and password are required." },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { success: false, error: "Password must be at least 6 characters." },
        { status: 400 }
      );
    }

    const supabase = await getSupabaseServerClient();
    const supabaseAdmin = getSupabaseAdminClient();

    // 1. Check if username is already taken in the public members table
    const { data: existingMember, error: checkError } = await supabaseAdmin
      .from("members")
      .select("username, auth_user_id, email, role")
      .eq("username", username)
      .maybeSingle();

    if (checkError) {
      console.error("Database check error:", checkError);
      return NextResponse.json(
        { success: false, error: "Failed to verify username availability." },
        { status: 500 }
      );
    }

    let isLegacyClaim = false;
    let userRole = "vendor";

    if (existingMember) {
      // Allow legacy claim if the profile has no auth_user_id yet and the email matches (case-insensitive)
      if (!existingMember.auth_user_id && existingMember.email?.toLowerCase() === email.toLowerCase()) {
        isLegacyClaim = true;
        userRole = existingMember.role || "vendor";
      } else {
        return NextResponse.json(
          { success: false, error: "This username is already taken. Please choose another." },
          { status: 409 }
        );
      }
    }

    // 2. Sign up the user in Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
          username,
          role: userRole
        }
      }
    });

    if (authError) {
      console.error("Supabase Auth Error:", authError);
      return NextResponse.json(
        { success: false, error: authError.message },
        { status: 400 }
      );
    }

    const authUser = authData.user;
    if (!authUser) {
      return NextResponse.json(
        { success: false, error: "User registration failed on authenticating authority." },
        { status: 500 }
      );
    }

    // 3. Create or update the public profile in the members table using the Admin client
    if (isLegacyClaim) {
      // Link the auth user ID to the existing profile row
      const { error: updateError } = await supabaseAdmin
        .from("members")
        .update({ auth_user_id: authUser.id })
        .eq("username", username);

      if (updateError) {
        console.error("Profile linking error:", updateError);
        // Clean up Supabase Auth user if db update fails to prevent orphaned accounts
        await supabaseAdmin.auth.admin.deleteUser(authUser.id);
        return NextResponse.json(
          { success: false, error: "Failed to link legacy public member profile." },
          { status: 500 }
        );
      }
    } else {
      // Create a brand new public profile row
      const newMemberProfile = {
        username,
        name,
        tagline: tagline || `Pioneering ${category || "Business"} in ${city || "India"}`,
        category: category || "Consultant",
        city: city || "Delhi",
        bio: bio || `Passionate founder of ${name}. Building connections and growing through the Buddingpreneurs network.`,
        views: 0,
        leads_count: 0,
        conversions: 0,
        rating: 5.0,
        reviews_count: 0,
        verified: false,
        join_date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
        plan: plan || "Basic",
        logo: name.split(" ").map((n: string) => n[0]).join("").substring(0, 2).toUpperCase(),
        cover_image: "/images/programs/programs_women_meeting_1779275083144.png",
        email,
        phone,
        whatsapp: phone,
        website: "",
        instagram: "",
        facebook: "",
        linkedin: "",
        vcard_theme: "terracotta",
        auth_user_id: authUser.id,
        role: "vendor"
      };

      const { error: insertError } = await supabaseAdmin
        .from("members")
        .insert([newMemberProfile]);

      if (insertError) {
        console.error("Profile creation error:", insertError);
        // Clean up Supabase Auth user if db insert fails to prevent orphaned accounts
        await supabaseAdmin.auth.admin.deleteUser(authUser.id);
        return NextResponse.json(
          { success: false, error: "Failed to create public member profile." },
          { status: 500 }
        );
      }
    }

    return NextResponse.json({
      success: true,
      user: { username, name, role: userRole }
    });
  } catch (error) {
    console.error("Register error:", error);
    return NextResponse.json(
      { success: false, error: "Registration failed. Please try again." },
      { status: 500 }
    );
  }
}
