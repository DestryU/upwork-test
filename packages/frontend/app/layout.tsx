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
        <div className="min-h-screen flex flex-col lg:flex-row">
          <Sidebar />
          <main className="flex-1 p-4 sm:p-6 lg:p-8 lg:ml-64">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
