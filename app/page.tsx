"use client";
import Hero from "./components/Hero";
import WhyChooseUs from "./components/sections/WhyChooseUs";
import ProcessPreview from "./components/sections/ProcessPreview";
import FeaturedProjects from "./components/sections/FeaturedProjects";
import ChaosHero from "./components/Chaos-Hero";
import Warehouse from "./components/Warehouse-Hero";
export default function Home() {
  return (
    <main className="relative bg-white min-h-screen">
      <Hero />
      {/* <ChaosHero /> */}
      {/* <Warehouse /> */}
      <WhyChooseUs />
      <FeaturedProjects />
      <ProcessPreview />
    </main>
  );
}