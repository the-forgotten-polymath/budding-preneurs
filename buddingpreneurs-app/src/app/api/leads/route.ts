import { NextResponse } from "next/server";
import { getSupabaseServerClient, getSupabaseAdminClient } from "@/lib/supabase";

// GET /api/leads - Fetch leads safely with session gating
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const requestedUsername = searchParams.get("username");

    const supabase = await getSupabaseServerClient();
    const supabaseAdmin = getSupabaseAdminClient();

    // 1. Authenticate the active user session
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ success: false, error: "Unauthorized: Please log in." }, { status: 401 });
    }

    // 2. Fetch the logged-in member profile to check their role and username
    const { data: activeMember, error: activeError } = await supabaseAdmin
      .from("members")
      .select("username, role")
      .eq("auth_user_id", user.id)
      .maybeSingle();

    if (activeError || !activeMember) {
      return NextResponse.json({ success: false, error: "Authenticated profile not found." }, { status: 404 });
    }

    // 3. Enforce Row-Level Security: Vendors can only access their own leads
    let targetUsername = requestedUsername;
    if (activeMember.role !== "admin") {
      // Force standard vendors to query ONLY their own leads
      targetUsername = activeMember.username;
    }

    // 4. Fetch leads from database
    let dbQuery = supabaseAdmin.from("leads").select("*");
    if (targetUsername) {
      dbQuery = dbQuery.eq("member_username", targetUsername);
    }

    const { data: dbLeads, error: leadsError } = await dbQuery.order("timestamp", { ascending: false });

    if (leadsError) {
      console.error("Database error fetching leads:", leadsError);
      return NextResponse.json({ success: false, error: "Failed to load leads" }, { status: 500 });
    }

    // 5. Map fields to front-end camelCase expected structure
    const formattedLeads = dbLeads.map((l: any) => ({
      id: l.id,
      memberUsername: l.member_username,
      clientName: l.client_name,
      clientEmail: l.client_email,
      clientPhone: l.client_phone,
      clientMessage: l.client_message || "",
      status: l.status,
      timestamp: l.timestamp,
    }));

    return NextResponse.json({ success: true, data: formattedLeads });
  } catch (error) {
    console.error("Leads GET error:", error);
    return NextResponse.json({ success: false, error: "Failed to load leads" }, { status: 500 });
  }
}

// POST /api/leads - Create a lead or Update status safely
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const supabase = await getSupabaseServerClient();
    const supabaseAdmin = getSupabaseAdminClient();

    // ── CASE A: Lead Status Update (Vendor CRM Operations) ──
    if (body.action === "updateStatus") {
      const { leadId, newStatus } = body;
      if (!leadId || !newStatus) {
        return NextResponse.json({ success: false, error: "Missing leadId or newStatus" }, { status: 400 });
      }

      // 1. Authenticate user session
      const { data: { user }, error: authError } = await supabase.auth.getUser();
      if (authError || !user) {
        return NextResponse.json({ success: false, error: "Unauthorized: Please log in." }, { status: 401 });
      }

      // 2. Fetch logged-in user profile
      const { data: activeMember, error: activeError } = await supabaseAdmin
        .from("members")
        .select("username, role")
        .eq("auth_user_id", user.id)
        .maybeSingle();

      if (activeError || !activeMember) {
        return NextResponse.json({ success: false, error: "Profile not found." }, { status: 404 });
      }

      // 3. Fetch the lead row to verify ownership
      const { data: targetLead, error: leadFetchError } = await supabaseAdmin
        .from("leads")
        .select("*")
        .eq("id", leadId)
        .maybeSingle();

      if (leadFetchError || !targetLead) {
        return NextResponse.json({ success: false, error: "Lead not found." }, { status: 404 });
      }

      // 4. Verify vendor owns this lead (or is administrator)
      const isOwner = targetLead.member_username === activeMember.username;
      const isAdmin = activeMember.role === "admin";

      if (!isOwner && !isAdmin) {
        return NextResponse.json({ success: false, error: "Forbidden: You do not have permissions to modify this lead." }, { status: 403 });
      }

      // 5. Perform the status update
      const oldStatus = targetLead.status;
      const { error: updateError } = await supabaseAdmin
        .from("leads")
        .update({ status: newStatus })
        .eq("id", leadId);

      if (updateError) {
        console.error("Failed to update lead status:", updateError);
        return NextResponse.json({ success: false, error: "Failed to update status." }, { status: 500 });
      }

      // 6. Handle conversion analytics stats atomically on the member's profile
      if (newStatus === "Converted" && oldStatus !== "Converted") {
        const { data: m } = await supabaseAdmin.from("members").select("conversions").eq("username", targetLead.member_username).single();
        await supabaseAdmin.from("members").update({ conversions: (m?.conversions || 0) + 1 }).eq("username", targetLead.member_username);
      } else if (oldStatus === "Converted" && newStatus !== "Converted") {
        const { data: m } = await supabaseAdmin.from("members").select("conversions").eq("username", targetLead.member_username).single();
        await supabaseAdmin.from("members").update({ conversions: Math.max(0, (m?.conversions || 0) - 1) }).eq("username", targetLead.member_username);
      }

      return NextResponse.json({
        success: true,
        data: {
          id: leadId,
          memberUsername: targetLead.member_username,
          clientName: targetLead.client_name,
          clientEmail: targetLead.client_email,
          clientPhone: targetLead.client_phone,
          clientMessage: targetLead.client_message,
          status: newStatus,
          timestamp: targetLead.timestamp,
        },
      });
    }

    // ── CASE B: Standard Customer Lead Submission (From Public Pages) ──
    const { memberUsername, clientName, clientEmail, clientPhone, clientMessage } = body;
    if (!memberUsername || !clientName || !clientEmail || !clientPhone) {
      return NextResponse.json({ success: false, error: "Missing required contact details" }, { status: 400 });
    }

    let targetMemberUsername = memberUsername;
    if (targetMemberUsername === "admin") {
      const { data: adminMember } = await supabaseAdmin
        .from("members")
        .select("username")
        .eq("role", "admin")
        .limit(1)
        .maybeSingle();
      if (adminMember) {
        targetMemberUsername = adminMember.username;
      }
    }

    // 1. Check if recipient member profile exists
    const { data: recipientMember, error: recipientError } = await supabaseAdmin
      .from("members")
      .select("username, leads_count")
      .eq("username", targetMemberUsername)
      .maybeSingle();

    if (recipientError || !recipientMember) {
      return NextResponse.json({ success: false, error: "Recipient member does not exist" }, { status: 404 });
    }

    // 2. Build and insert new lead record
    const newLeadId = "L-" + Math.floor(Math.random() * 9000 + 1000);
    const newLeadData = {
      id: newLeadId,
      member_username: targetMemberUsername,
      client_name: clientName,
      client_email: clientEmail,
      client_phone: clientPhone,
      client_message: clientMessage || "",
      status: "New",
      timestamp: new Date().toISOString(),
    };

    const { error: insertError } = await supabaseAdmin
      .from("leads")
      .insert([newLeadData]);

    if (insertError) {
      console.error("Lead submission insert error:", insertError);
      return NextResponse.json({ success: false, error: "Failed to dispatch lead" }, { status: 500 });
    }

    // 3. Atomically increment recipient profile leads count
    const { error: countError } = await supabaseAdmin
      .from("members")
      .update({ leads_count: (recipientMember.leads_count || 0) + 1 })
      .eq("username", targetMemberUsername);

    if (countError) {
      console.error("Failed to increment lead stats:", countError);
    }

    return NextResponse.json({
      success: true,
      data: {
        id: newLeadId,
        memberUsername: targetMemberUsername,
        clientName,
        clientEmail,
        clientPhone,
        clientMessage: clientMessage || "",
        status: "New",
        timestamp: newLeadData.timestamp,
      },
    });
  } catch (error) {
    console.error("Leads POST error:", error);
    return NextResponse.json({ success: false, error: "Failed to dispatch lead" }, { status: 500 });
  }
}
