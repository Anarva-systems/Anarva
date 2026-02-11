import Hero from "./components/home/Hero";
import WorkGrid from "./components/home/WorkGrid";
import ServicesList from "./components/home/ServicesList";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-black text-white selection:bg-white selection:text-black">
      <Hero />
      <WorkGrid />
      <ServicesList />
    </main>
  );
}