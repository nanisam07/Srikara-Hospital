

import type { Metadata } from "next";
import { Playfair_Display, DM_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/layout/WhatsAppButton";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Srikara Hospitals | Excellence in Robotic & Cardiac Healthcare",
  description:
    "South India's premier hospital network. No.1 Robotic Knee Replacement Center with 9 hospitals and 300+ world-class specialists available 24/7.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      
      {/* ✅ MOBILE VIEWPORT FIX */}
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>

      <body
        className={`${playfair.variable} ${dmSans.variable} font-sans bg-white text-srikara-navy antialiased`}
      >
        {/* NAVBAR */}
        <Navbar />

        {/* ✅ MAIN WRAPPER */}
        <div className="flex flex-col min-h-screen">

          {/* ✅ IMPORTANT: FIX NAVBAR OVERLAP (RESPONSIVE) */}
          <main className="flex-grow pt-[60px] md:pt-[72px]">
            {children}
          </main>

        </div>

        {/* FOOTER */}
        <Footer />

        {/* FLOATING BUTTON */}
        <WhatsAppButton />
      </body>
    </html>
  );
}