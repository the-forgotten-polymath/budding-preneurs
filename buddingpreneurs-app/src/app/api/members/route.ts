import { NextResponse } from "next/server";
import { getSupabaseServerClient, getSupabaseAdminClient } from "@/lib/supabase";

export const dynamic = "force-dynamic";

// Helper to map Supabase flat database structure into the camelCase interface expected by the React frontend
function mapDbMemberToFrontend(dbMember: any) {
  return {
    username: dbMember.username,
    name: dbMember.name,
    tagline: dbMember.tagline || "",
    category: dbMember.category || "Consultant",
    city: dbMember.city || "Delhi",
    bio: dbMember.bio || "",
    views: dbMember.views || 0,
    leadsCount: dbMember.leads_count || 0,
    conversions: dbMember.conversions || 0,
    rating: Number(dbMember.rating) || 5.0,
    reviewsCount: dbMember.reviews_count || 0,
    verified: dbMember.verified || false,
    status: dbMember.status || "pending",
    featured: dbMember.featured || false,
    joinDate: dbMember.join_date || "",
    plan: dbMember.plan || "Basic",
    logo: dbMember.logo || "",
    coverImage: dbMember.cover_image || "",
    founderName: dbMember.founder_name || "",
    businessType: dbMember.business_type || [],
    openForCollaboration: dbMember.open_for_collaboration || false,
    aboutText: dbMember.about_text || "",
    priceRange: dbMember.price_range || "",
    shippingAreas: dbMember.shipping_areas || "",
    whatsappCatalogUrl: dbMember.whatsapp_catalog_url || "",
    socialLinks: dbMember.social_links || "",
    contact: {
      email: dbMember.email || "",
      phone: dbMember.phone || "",
      website: dbMember.website || "",
      whatsapp: dbMember.whatsapp || "",
    },
    social: {
      instagram: dbMember.instagram || "",
      facebook: dbMember.facebook || "",
      linkedin: dbMember.linkedin || "",
    },
    services: dbMember.services ? dbMember.services.map((s: any) => ({
      name: s.name,
      price: s.price,
      description: s.description,
      imageUrl: s.image_url || "",
    })) : [],
    vcardTheme: dbMember.vcard_theme || "terracotta",
    qrcodeUrl: dbMember.qrcode_url || "",
  };
}

// GET /api/members - Fetch public members
export async function GET() {
  try {
    const supabaseAdmin = getSupabaseAdminClient();

    // Fetch members and auto-join nested services table
    const { data: dbMembers, error: membersError } = await supabaseAdmin
      .from("members")
      .select(`
        *,
        services (
          name,
          price,
          description,
          image_url
        )
      `)
      .eq("status", "approved")
      .neq("role", "admin"); // Admin profiles should not show in public directory

    if (membersError) {
      console.error("Failed to load members from database:", membersError);
      return NextResponse.json({ success: false, error: "Failed to load members" }, { status: 500 });
    }

    const formattedMembers = dbMembers.map((m) => mapDbMemberToFrontend(m));

    return NextResponse.json({ success: true, data: formattedMembers });
  } catch (error) {
    console.error("Members GET error:", error);
    return NextResponse.json({ success: false, error: "Failed to load members" }, { status: 500 });
  }
}

// POST /api/members - Add or Update a Member
export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (!body.username) {
      return NextResponse.json({ success: false, error: "username is required" }, { status: 400 });
    }

    const supabase = await getSupabaseServerClient();
    const supabaseAdmin = getSupabaseAdminClient();

    // 1. Authenticate user session
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ success: false, error: "Unauthorized: Please log in." }, { status: 401 });
    }

    // 2. Fetch the logged-in user profile to verify permissions
    const { data: activeMember, error: activeError } = await supabaseAdmin
      .from("members")
      .select("username, role")
      .eq("auth_user_id", user.id)
      .maybeSingle();

    if (activeError || !activeMember) {
      return NextResponse.json({ success: false, error: "Profile not found for authenticated user." }, { status: 404 });
    }

    const isOwnProfile = activeMember.username === body.username;
    const isAdmin = activeMember.role === "admin";

    // 3. Prevent cross-account profile tampering
    if (!isOwnProfile && !isAdmin) {
      return NextResponse.json(
        { success: false, error: "Forbidden: You cannot modify another user's profile." },
        { status: 403 }
      );
    }

    // 4. Build database update payload
    const updatePayload: any = {};
    if (body.name !== undefined) updatePayload.name = body.name;
    if (body.tagline !== undefined) updatePayload.tagline = body.tagline;
    if (body.category !== undefined) updatePayload.category = body.category;
    if (body.city !== undefined) updatePayload.city = body.city;
    if (body.bio !== undefined) updatePayload.bio = body.bio;
    if (body.vcardTheme !== undefined) updatePayload.vcard_theme = body.vcardTheme;
    if (body.qrcodeUrl !== undefined) updatePayload.qrcode_url = body.qrcodeUrl;
    if (body.logo !== undefined) updatePayload.logo = body.logo;
    if (body.coverImage !== undefined) updatePayload.cover_image = body.coverImage;
    if (body.founderName !== undefined) updatePayload.founder_name = body.founderName;
    if (body.businessType !== undefined) updatePayload.business_type = body.businessType;
    if (body.openForCollaboration !== undefined) updatePayload.open_for_collaboration = body.openForCollaboration;
    if (body.aboutText !== undefined) updatePayload.about_text = body.aboutText;
    if (body.priceRange !== undefined) updatePayload.price_range = body.priceRange;
    if (body.shippingAreas !== undefined) updatePayload.shipping_areas = body.shippingAreas;
    if (body.whatsappCatalogUrl !== undefined) updatePayload.whatsapp_catalog_url = body.whatsappCatalogUrl;
    if (body.socialLinks !== undefined) updatePayload.social_links = body.socialLinks;
    
    // Plan, verification, and profile status states are protected and only settable by Admins
    if (body.plan !== undefined && isAdmin) updatePayload.plan = body.plan;
    if (body.verified !== undefined && isAdmin) updatePayload.verified = body.verified;
    if (body.status !== undefined && isAdmin) updatePayload.status = body.status;

    // Map nested contact info
    if (body.contact) {
      if (body.contact.email !== undefined) updatePayload.email = body.contact.email;
      if (body.contact.phone !== undefined) updatePayload.phone = body.contact.phone;
      if (body.contact.website !== undefined) updatePayload.website = body.contact.website;
      if (body.contact.whatsapp !== undefined) updatePayload.whatsapp = body.contact.whatsapp;
    }

    // Map nested social links
    if (body.social) {
      if (body.social.instagram !== undefined) updatePayload.instagram = body.social.instagram;
      if (body.social.facebook !== undefined) updatePayload.facebook = body.social.facebook;
      if (body.social.linkedin !== undefined) updatePayload.linkedin = body.social.linkedin;
    }

    // 5. Update public.members database record
    const { error: updateError } = await supabaseAdmin
      .from("members")
      .update(updatePayload)
      .eq("username", body.username);

    if (updateError) {
      console.error("Database update error:", updateError);
      return NextResponse.json({ success: false, error: "Failed to update member details" }, { status: 500 });
    }

    // 6. Update phone number in Supabase Auth if provided
    if (updatePayload.phone) {
      const { data: targetMember } = await supabaseAdmin
        .from("members")
        .select("auth_user_id")
        .eq("username", body.username)
        .maybeSingle();

      if (targetMember?.auth_user_id) {
        const { error: authUpdateError } = await supabaseAdmin.auth.admin.updateUserById(targetMember.auth_user_id, {
          phone: updatePayload.phone
        });
        if (authUpdateError) {
          console.error("Failed to update phone in Supabase Auth:", authUpdateError);
          // Don't fail the whole request, but log it.
        }
      }
    }

    // 6. Sync dynamic array of services if provided
    if (body.services && Array.isArray(body.services)) {
      // Clear existing services
      const { error: deleteError } = await supabaseAdmin
        .from("services")
        .delete()
        .eq("member_username", body.username);

      if (deleteError) {
        console.error("Failed to delete existing services:", deleteError);
      }

      // Bulk-insert new services
      if (body.services.length > 0) {
        const servicesToInsert = body.services.map((s: any) => ({
          member_username: body.username,
          name: s.name,
          price: s.price || "",
          description: s.description || "",
          image_url: s.imageUrl || "",
        }));

        const { error: servicesInsertError } = await supabaseAdmin
          .from("services")
          .insert(servicesToInsert);

        if (servicesInsertError) {
          console.error("Failed to insert services:", servicesInsertError);
        }
      }
    }

    // 7. Retrieve the updated member profile with services to return to front-end
    const { data: updatedDbMember, error: fetchError } = await supabaseAdmin
      .from("members")
      .select(`
        *,
        services (
          name,
          price,
          description,
          image_url
        )
      `)
      .eq("username", body.username)
      .single();

    if (fetchError || !updatedDbMember) {
      return NextResponse.json({ success: false, error: "Failed to reload updated profile" }, { status: 500 });
    }

    return NextResponse.json({ success: true, data: mapDbMemberToFrontend(updatedDbMember) });
  } catch (error) {
    console.error("Members POST error:", error);
    return NextResponse.json({ success: false, error: "Failed to update member details" }, { status: 500 });
  }
}

// DELETE /api/members - Delete a member (Admins only)
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const username = searchParams.get("username");

    if (!username) {
      return NextResponse.json({ success: false, error: "Username is required" }, { status: 400 });
    }

    const supabase = await getSupabaseServerClient();
    const supabaseAdmin = getSupabaseAdminClient();

    // 1. Authenticate user session
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ success: false, error: "Unauthorized: Please log in." }, { status: 401 });
    }

    // 2. Gating: Verify active user profile is strictly "admin"
    const { data: activeMember, error: activeError } = await supabaseAdmin
      .from("members")
      .select("role")
      .eq("auth_user_id", user.id)
      .maybeSingle();

    if (activeError || !activeMember || activeMember.role !== "admin") {
      return NextResponse.json(
        { success: false, error: "Forbidden: Administrative access required." },
        { status: 403 }
      );
    }

    // 3. Fetch the member to get their auth_user_id (to delete their Auth user too)
    const { data: memberToDelete, error: getMemberError } = await supabaseAdmin
      .from("members")
      .select("auth_user_id")
      .eq("username", username)
      .maybeSingle();

    if (getMemberError || !memberToDelete) {
      return NextResponse.json({ success: false, error: "Member profile not found." }, { status: 404 });
    }

    // 4. Delete services associated with the member
    await supabaseAdmin
      .from("services")
      .delete()
      .eq("member_username", username);

    // 5. Delete leads associated with the member
    await supabaseAdmin
      .from("leads")
      .delete()
      .eq("vendor_username", username);

    // 6. Delete member profile from members table
    const { error: deleteMemberError } = await supabaseAdmin
      .from("members")
      .delete()
      .eq("username", username);

    if (deleteMemberError) {
      console.error("Database member delete error:", deleteMemberError);
      return NextResponse.json({ success: false, error: "Failed to delete member profile." }, { status: 500 });
    }

    // 7. If the member has a linked Supabase Auth user, delete the Auth user
    if (memberToDelete.auth_user_id) {
      const { error: deleteAuthError } = await supabaseAdmin.auth.admin.deleteUser(
        memberToDelete.auth_user_id
      );
      if (deleteAuthError) {
        console.error("Failed to delete member auth user:", deleteAuthError);
        // Continue anyway as the database profile was successfully deleted
      }
    }

    return NextResponse.json({ success: true, message: "Member profile successfully deleted." });
  } catch (error) {
    console.error("Members DELETE error:", error);
    return NextResponse.json({ success: false, error: "Failed to delete member profile." }, { status: 500 });
  }
}

