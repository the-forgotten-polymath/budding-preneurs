import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://buddingpreneurs.in";

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin/", "/dashboard/"] // Gate out private user portals and panels from SEO crawling
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
