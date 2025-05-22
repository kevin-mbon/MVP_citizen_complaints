import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Screen from "@/components/ui/Screen";
import React from "react";
import { Toaster } from 'react-hot-toast';
import {AuthProvider} from "@/contexts/AuthContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Citizen Engagement Platform",
    description: "A simple digital tool for citizens to submit complaints, track their status, and connect with the right government departments. Designed to improve public service response and transparency.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-slate-50`}
      >
      <AuthProvider>
          {children}
          <Toaster position="top-center" />
      </AuthProvider>
      </body>
    </html>
  );
}
