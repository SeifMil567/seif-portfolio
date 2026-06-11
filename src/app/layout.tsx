import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Provider } from "../utils/provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Seif Mohamed | Software Engineer",
  description:
    "Portfolio of Seif Mohamed — full-stack software engineer showcasing skills, work experience, and projects.",
  openGraph: {
    title: "Seif Mohamed | Software Engineer",
    description:
      "Portfolio of Seif Mohamed — full-stack software engineer showcasing skills, work experience, and projects.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased bg-slate-950 text-slate-100`}
      >
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
