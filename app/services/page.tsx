import type { Metadata } from "next";
import { ServiceGrid } from "./services/ServiceGrid";

export const metadata: Metadata = {
  title: "Services - UI/UX, AI & Full-Stack Development | Anarva Systems",
  description: "Anarva provides precision-engineered digital solutions including Next.js web development, mobile apps, AI infrastructure, and Web3 decentralized systems.",
  keywords: ["Web Agency Services", "UI/UX Design Services", "Next.js Development Agency", "AI Infrastructure Setup", "Web3 Development Agency", "Full-Stack Architecture", "Mobile App Development"],
};

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-[#030303]">
      <div className="pt-24">
        <ServiceGrid />
      </div>
      {/* 
        Temporarily hiding older components or keeping them if they fit. 
        Given the strict redesign request, I'll comment them out to ensure the "Precision" look isn't broken by legacy styles.
        Or I can leave them if I assume they will be updated later. 
        But "redesign the services page" usually implies a clean slate or full update.
        I'll keep them but acknowledge they might be visually distinct.
        Actually, for a "Redesign", less is more. I'll comment them out to show the pure new style.
      */}
      {/* <WhyChooseUs /> */}
      {/* <Testimonials /> */}
      {/* <ServiceCTA /> */}
    </main>
  );
}