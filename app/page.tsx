"use client";
import Hero from "./components/Hero";
import WhyChooseUs from "./components/sections/WhyChooseUs";
import ProcessPreview from "./components/sections/ProcessPreview";
import FeaturedProjects from "./components/sections/FeaturedProjects";
export default function Home() {
  return (
    <main className="relative bg-white min-h-screen">
      <Hero />
      <WhyChooseUs />
      <FeaturedProjects />
      <ProcessPreview />
    </main>
  );
}