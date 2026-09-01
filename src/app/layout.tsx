import type { Metadata } from "next";
import { Inter, Libre_Baskerville } from "next/font/google";
import "./globals.css";
import AnimatedBackground from "@/components/AnimatedBackground";
import Navbar from "@/components/Navbar";
import Providers from "@/components/Providers";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const libreBaskerville = Libre_Baskerville({
  variable: "--font-libre-baskerville",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const siteDescription =
  "Product leader and AI builder. 6+ years driving product at startups—now building production-grade AI agents for investment firms at Lomita AI.";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.henryhirshland.com"),
  title: {
    default: "Henry Hirshland — Product Leader & AI Builder",
    template: "%s | Henry Hirshland",
  },
  description: siteDescription,
  openGraph: {
    title: "Henry Hirshland — Product Leader & AI Builder",
    description: siteDescription,
    url: "https://www.henryhirshland.com",
    siteName: "Henry Hirshland",
    type: "website",
    images: [{ url: "/background.png" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Henry Hirshland — Product Leader & AI Builder",
    description: siteDescription,
    creator: "@henryhirshland",
    images: ["/background.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${libreBaskerville.variable} antialiased relative`}>
        <Providers>
          <AnimatedBackground />
          <Navbar />
          <main className="relative pt-24 flex flex-col main-content">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
