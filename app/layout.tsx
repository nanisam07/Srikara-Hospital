import type { Metadata } from "next";
import { Playfair_Display, DM_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import EmergencyBanner from "@/components/layout/EmergencyBanner";
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
    // Added scroll-smooth for premium navigation feel
    <html lang="en" className="scroll-smooth">
      <body
        className={`${playfair.variable} ${dmSans.variable} font-sans bg-white text-srikara-navy antialiased selection:bg-srikara-plum/10 selection:text-srikara-plum`}
      >
        {/* The Emergency Banner should stay at the very top */}
        
        
        {/* The Navbar handles its own "fixed" positioning */}
        <Navbar />
        
        {/* Added flex-col and min-h-screen. 
            The Navbar is 'fixed', so the first section of your 
            pages should have pt-24 or pt-32 to avoid overlap.
        */}
        <div className="flex flex-col min-h-screen">
          <main className="flex-grow">
            {children}
          </main>
        </div>

        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}