import type { Metadata } from "next";
import { Outfit, Inter, Space_Grotesk, Syne } from "next/font/google"; // Google Fonts
import "./globals.css";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import CustomCursor from "./Cursor";
import EasterEggManager from "./components/layout/EasterEggManager";

// Heading Font - Modern, Geometric, Premium
const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

// Body Font - Clean, Readable
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

// Tech / Branding Font
const space = Space_Grotesk({
  variable: "--font-space",
  subsets: ["latin"],
  display: "swap",
});

// Elegant / Artistic Font
const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Anarva",
  description: "We turn your ideas into high-performance websites.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${outfit.variable} ${inter.variable} ${space.variable} ${syne.variable} antialiased bg-white text-slate-900 selection:bg-indigo-100 selection:text-indigo-900 font-sans h-screen w-full flex flex-col overflow-hidden`}
      >
        {/* <Intro /> */}
        <Navbar />
        <CustomCursor />
        <EasterEggManager />

        {/* Scrollable Main Content Area */}
        <main className="flex-1 w-full overflow-y-auto overflow-x-hidden relative scroll-smooth">
          {children}
          <Footer />
        </main>

      </body>
    </html>
  );
}
