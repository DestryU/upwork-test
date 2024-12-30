import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Sidebar from '@/components/Layout/Sidebar';
import ToastNotification from "@/components/Layout/ToastNotification";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Upwork Test",
  description: "Upwork Test - MoreThanGates",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ToastNotification />
        <div className="min-h-screen">
          <Sidebar />
          <main className="ml-64 min-h-screen p-8">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
