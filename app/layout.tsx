import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Girls Who Innovate",
  description:
    "Empowering high school and college girls with the skills to become innovators through bootcamps, competitions, and networking.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen bg-white text-[#1E293B]">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
