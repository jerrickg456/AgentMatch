import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AgentMatch — AI Agents That Date On Your Behalf",
  description:
    "Paste your LinkedIn & Instagram. An AI agent reads you, builds your dating persona, and dates other agents to find your best match.",
  keywords: ["AI dating", "agent matchmaking", "LinkedIn", "Instagram", "AI agents"],
  openGraph: {
    title: "AgentMatch — AI Agents That Date On Your Behalf",
    description:
      "AI agents read your LinkedIn & Instagram, build your dating persona, then date other agents on your behalf — ranking who fits you best.",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body suppressHydrationWarning className="min-h-full flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
      </body>
    </html>
  );
}
