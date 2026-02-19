import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Syne } from "next/font/google";
import "./globals.css";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import GlobalIntro from "./components/ui/GlobalIntro";
import Chatbot from "./components/Chatbot"
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  display: "swap",
});

// Code / Tech Font
const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://anarva.tech"),
  title: {
    default: "ANARVA - Enter Orbit",
    template: "%s | ANARVA",
  },
  description: "Elite architects of web, apps, AI, product design, and Web3. The gateway to digital transcendence.",
  keywords: [
    "digital architecture",
    "web development",
    "AI solutions",
    "Web3",
    "product design",
    "Next.js",
    "premium agency"
  ],
  authors: [{ name: "ANARVA" }],
  creator: "ANARVA",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://anarva.tech",
    siteName: "ANARVA",
    title: "ANARVA - Enter Orbit",
    description: "Digital Architecture Firm. Web - Apps - AI - Product - Web3.",
    images: [{
      url: "/og-image-home.jpg",
      width: 1200,
      height: 630,
      alt: "ANARVA - Enter Orbit",
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "ANARVA - Enter Orbit",
    description: "Digital Architecture Firm. Web - Apps - AI - Product - Web3.",
    images: ["/og-image-home.jpg"],
  },
  icons: {
    icon: "/icon.png",
    apple: "/icon.png",
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
        className={`
          ${inter.variable} 
          ${jetbrainsMono.variable} 
          ${syne.variable}
          antialiased 
          bg-[#0a0a0f] 
          text-slate-50 
          min-h-screen 
          flex 
          flex-col 
          selection:bg-[#00e6ff] 
          selection:text-black
        `}
      >
        {/* Global Splash Screen */}
        <GlobalIntro />

        {/* Navigation */}
        <Navbar />

        {/* Main content */}
        <div className="flex-1 relative">
          {children}
          <Footer />
          <Chatbot />
        </div>
      </body>
    </html>
  );
}
