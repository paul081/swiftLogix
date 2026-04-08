import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SwiftLogix | Premium Logistics & Shipping Solutions",
  description: "Manage your shipments, track in real-time, and get the best rates—all from one platform.",
  icons: {
    icon: "/favicon.svg",
  },
};

import Chatbot from "../components/Chatbot";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
      </head>
      <body className={`${inter.variable} ${outfit.variable} antialiased`}>
        {children}
        <Chatbot />
      </body>
    </html>
  );
}
