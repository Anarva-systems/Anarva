import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Syne } from "next/font/google";
import "./globals.css";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import GlobalIntro from "./components/ui/GlobalIntro";
import Chatbot from "./components/Chatbot";

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
  metadataBase: new URL("https://www.anarva.online"),
  alternates: {
    canonical: '/',
  },
  title: {
    default: "ANARVA | Premium Web Agency & App Development Studio",
    template: "%s | ANARVA",
  },
  description: "ANARVA is a premium Web Agency and App Development Studio providing UI/UX design, AI infrastructure, RAG pipelines, full-stack development, and Web3 engineering.",
  keywords: [
    "Web Agency",
    "App Development Agency",
    "UI/UX Design Agency",
    "Product Architecture",
    "AI Development Company",
    "RAG Pipeline Development",
    "LLM Integration",
    "Next.js Development Agency",
    "React Development Company",
    "Node.js Experts",
    "Web3 Development",
    "Smart Contract Development",
    "DApp Development",
    "Technical SEO Agency",
    "Security Audit Company",
    "Penetration Testing Services",
    "Growth Optimization Agency"
  ],
  authors: [{ name: "ANARVA Digital Architecture Studio" }],
  creator: "ANARVA Digital Architecture Studio",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.anarva.online",
    siteName: "ANARVA | Web Agency & App Development Studio",
    title: "ANARVA | Premium Web Agency & App Development Studio",
    description: "High-end UI/UX, AI systems, Full-Stack Engineering & Web3 Development.",
    images: [{
      url: "/og-image-home.png",
      width: 1200,
      height: 630,
      alt: "ANARVA Digital Architecture Studio",
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "ANARVA | Premium Web Agency & App Development Studio",
    description: "High-end UI/UX, AI systems, Full-Stack Engineering & Web3 Development.",
    images: ["/og-image-home.png"],
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": ["Organization", "ProfessionalService"],
              "name": "ANARVA Digital Architecture Studio",
              "alternateName": "Anarva",
              "url": "https://www.anarva.online",
              "logo": "https://www.anarva.online/Logo-dark1.png",
              "image": "https://www.anarva.online/og-image-home.png",
              "description": "UI/UX, AI Infrastructure, Full Stack Development & Web3 Agency",
              "sameAs": [
                "https://linkedin.com/in/anarva-systems-1865163b1",
                "https://x.com/AnarvaS55263"
              ]
            })
          }}
        />



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
