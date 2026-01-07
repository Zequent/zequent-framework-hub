import { Navigation } from "@/components/layout/navigation";
import { Footer } from "@/components/layout/footer";
import { Hero } from "@/components/landing/hero";
import { Services } from "@/components/landing/services";

export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-[#0a2540]">
      <Navigation />
      <main>
        <Hero />
        <Services />
      </main>
      <Footer />
    </div>
  );
}
