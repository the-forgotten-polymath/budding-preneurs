import { MetadataRoute } from "next";
import { getSupabaseAdminClient } from "@/lib/supabase";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://buddingpreneurs.in";

  // 1. Static Web Pages
  const staticPaths = [
    "",
    "/about",
    "/programs",
    "/workshops",
    "/community",
    "/directory",
    "/blog",
    "/contact",
    "/disclaimer",
    "/login",
    "/register"
  ];

  const staticRoutes = staticPaths.map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1.0 : 0.8,
  }));

  // 2. Dynamic Vendor Showcase Profile Pages
  let dynamicVendorRoutes: Array<{ url: string; lastModified: Date; changeFrequency: "daily" | "weekly"; priority: number }> = [];

  try {
    const supabaseAdmin = getSupabaseAdminClient();
    const { data: members, error } = await supabaseAdmin
      .from("members")
      .select("username, created_at")
      .neq("role", "admin"); // Exclude administrator administrative profiles

    if (!error && members) {
      dynamicVendorRoutes = members.map((member) => ({
        url: `${baseUrl}/member/${member.username}`,
        lastModified: member.created_at ? new Date(member.created_at) : new Date(),
        changeFrequency: "daily" as const,
        priority: 0.6,
      }));
    }
  } catch (err) {
    console.error("Sitemap dynamic routes fetch failed:", err);
  }

  return [...staticRoutes, ...dynamicVendorRoutes];
}
