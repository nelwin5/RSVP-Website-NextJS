import type { Metadata } from "next";
import { Geist, Geist_Mono, Montserrat } from "next/font/google";
import SessionProvider from "@/components/SessionProvider"; // ✅ Import provider
import "./globals.css";

// Load fonts
const montserrat = Montserrat({ subsets: ["latin"], weight: ["400", "700"], variable: "--font-montserrat" });
const geistSans = Geist({ subsets: ["latin"], variable: "--font-geist-sans" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" });

export const metadata: Metadata = {
  title: "RSVP",
  description: "Preserve Your Unforgettable Memories",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${montserrat.variable} ${geistSans.variable} ${geistMono.variable}`}>
      <body className="font-montserrat antialiased">
        <SessionProvider> {/* ✅ Wrap app with SessionProvider */}
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
