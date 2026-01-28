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

export const metadata: Metadata = {
  title: "Henry Hirshland",
  description: "Personal portfolio website",
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
          <main 
            className="relative pt-24 flex flex-col"
            style={{ minHeight: 'calc(100vw * 2.49)' }}
          >
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
