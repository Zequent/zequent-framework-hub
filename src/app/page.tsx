import { Navigation } from "@/components/layout/navigation";
import { Footer } from "@/components/layout/footer";
import { Hero } from "@/components/landing/hero";
import { Services } from "@/components/landing/services";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#f6f9fc] dark:bg-[#0f1c2e]">
      <Navigation />
      <main>
        <Hero />
        <Services />
      </main>
      <Footer />
    </div>
  );
}
