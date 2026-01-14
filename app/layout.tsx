import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { siteContent } from "@/src/content/site";
import DotFieldBackground from "@/components/DotFieldBackground";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: `${siteContent.name} | ${siteContent.headline}`,
  description: `${siteContent.headline}. ${siteContent.summary.join(" ")}`,
  keywords: ["portfolio", "developer", "engineer", "designer", siteContent.name],
  authors: [{ name: siteContent.name }],
  openGraph: {
    title: `${siteContent.name} | ${siteContent.headline}`,
    description: `${siteContent.headline}. ${siteContent.summary.join(" ")}`,
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteContent.name} | ${siteContent.headline}`,
    description: `${siteContent.headline}. ${siteContent.summary.join(" ")}`,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} antialiased bg-[#0a0a0a] text-[#f5f5f5]`} style={{ backgroundColor: '#0a0a0a', color: '#f5f5f5' }}>
        <DotFieldBackground 
          density={0.3}
          speed={0.3}
          dotSize={1.5}
          opacity={0.5}
          mouseStrength={0.5}
        />
        <div style={{ position: 'relative', zIndex: 10 }}>
          {children}
        </div>
      </body>
    </html>
  );
}
