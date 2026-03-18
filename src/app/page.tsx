import Navbar from "@/views/Navbar";
import Hero from "@/views/Hero";
import Features from "@/views/Features";
import Stats from "@/views/Stats";
import Roles from "@/views/Roles";
import CTA from "@/views/CTA";
import Footer from "@/views/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Features />
      <Stats />
      <Roles />
      <CTA />
      <Footer />
    </main>
  );
}
