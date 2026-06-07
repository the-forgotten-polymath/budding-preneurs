import type { Metadata } from "next";
import { Outfit, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { siteMetadata } from "../data/siteData";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-heading",
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"),
  title: siteMetadata.title,
  description: siteMetadata.description,
  keywords: ["buddingpreneurs", "buddingpreneur", "buddingpreneurs india", "buddingpreneurs pune", "buddingpreneurs dehradun", "women entrepreneurs", "startup training", "empowerment", "Indian startups", "digital marketing", "self-reliance", "networking", "mastermind", "Dehradun"],
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || "",
  },
  openGraph: {
    title: siteMetadata.title,
    description: siteMetadata.description,
    url: "https://buddingpreneurs.in",
    siteName: "Buddingpreneurs",
    images: [
      {
        url: "/images/home/photo-1590650423710-ffa6e7f63440", // A beautiful cover image for links shared on social networks
        width: 1200,
        height: 630,
        alt: "Celebrating Women-Led Businesses | Buddingpreneurs",
      },
    ],
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: siteMetadata.title,
    description: siteMetadata.description,
    images: ["/images/home/photo-1590650423710-ffa6e7f63440"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${outfit.variable} ${plusJakartaSans.variable}`}>
      <body suppressHydrationWarning className="antialiased bg-bg-dark text-gray-100 min-h-screen">
        {children}
        <FloatingWhatsApp />
      </body>
    </html>
  );
}
