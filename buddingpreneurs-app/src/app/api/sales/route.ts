import { NextResponse } from "next/server";
import { getSupabaseServerClient } from "@/lib/supabase";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { 
      member_id, 
      lead_id, 
      product_service, 
      amount, 
      lead_source, 
      sale_date, 
      order_id 
    } = body;

    if (!member_id || !product_service || amount === undefined) {
      return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 });
    }

    const supabase = await getSupabaseServerClient();

    // Verify session
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    // Insert sale report
    const { data, error } = await supabase
      .from("sales_reports")
      .insert([
        {
          member_id,
          lead_id: lead_id || null, // null if no lead selected
          product_service,
          amount,
          lead_source,
          sale_date,
          order_id: order_id || null,
          status: "Completed"
        }
      ])
      .select()
      .single();

    if (error) {
      console.error("Supabase Error (Insert Sale):", error);
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    // If there's a lead_id associated, let's update the lead status to "Converted" automatically
    if (lead_id) {
      await supabase
        .from("leads")
        .update({ status: "Converted" })
        .eq("id", lead_id);
      
      // We don't block the response on this, if it fails it's minor, but we could log it.
    }

    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    console.error("Sales API Error:", error);
    return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
  }
}
