import type { Metadata } from "next";
import { ServiceGrid } from "./services/ServiceGrid";
import { WhyChooseUs } from "./services/WhyChooseUs";
import { Testimonials } from "./services/Testimonials";
import { ServiceCTA } from "./services/ServiceCTA";

export const metadata: Metadata = {
  title: "Our Services - Full-Stack, AI & Blockchain Development | Anarva",
  description: "Product Design, AI Solutions, Full-Stack Development, Web3 & Blockchain, Growth Engineering, and Enterprise Security services tailored for modern businesses.",
  keywords: ["product design", "AI development", "full-stack development", "blockchain development", "Web3", "growth engineering", "enterprise security", "UI/UX design", "RAG pipelines", "smart contracts"],
  openGraph: {
    title: "Our Services - Digital Excellence Across Every Domain",
    description: "From AI to blockchain, we deliver comprehensive digital solutions for ambitious businesses",
    url: "https://anarva.tech/services",
    siteName: "Anarva Systems",
    images: [{
      url: "/og-image-services.jpg",
      width: 1200,
      height: 630,
      alt: "Anarva Services - Full-Stack Development & More",
    }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Anarva Services - AI, Web3 & Full-Stack Development",
    description: "Comprehensive digital services for modern businesses",
    images: ["/og-image-services.jpg"],
  },
};

export default function ServicesPage() {
  return (
    <main className="bg-black pt-15">
      <div className="">
        <ServiceGrid />
      </div>
      <WhyChooseUs />
      <Testimonials />
      <ServiceCTA />
    </main>
  );
}