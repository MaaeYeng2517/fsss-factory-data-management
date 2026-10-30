import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Shell from "@/components/shell";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ระบบจัดกะทำงาน",
  description: "ระบบวางแผนและบริหารเวลาทำงานของพนักงาน",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="th" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-gradient-to-br from-slate-50 via-blue-50/40 to-indigo-50/40 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
        <Shell>{children}</Shell>
      </body>
    </html>
  );
}
