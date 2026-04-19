'use client';

import Header from "@/components/landing/header";
import HeroV2 from "@/components/landing/heroV2";
import Partners from "@/components/landing/partners";
import PlatformShowcaseV2 from "@/components/landing/platform-showcaseV2";
import DevelopShowcaseV2 from "@/components/landing/developShowcaseV2";
import TestimonialsV2 from "@/components/landing/testimonialsV2";
import Stack from "@/components/landing/stack";
import QuickSetupV2 from "@/components/landing/quick-setupV2";
import Features from "@/components/landing/features";
import Repos from "@/components/landing/repos";
import Contact from "@/components/landing/contact";
import Footer from "@/components/landing/footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroV2 />
        <Partners />
        <PlatformShowcaseV2 />
        <DevelopShowcaseV2 />
        <TestimonialsV2 />
        <Stack />
        {/* <section id="solution">
          <Solution />
        </section> */}
        <QuickSetupV2 />
        <section id="features">
          <Features />
        </section>
        {/* <section id="how-it-works">
          <Process />
        </section> */}
        {/* <section id="showcase">
          <Showcase />
        </section> */}
        {/* <Benefits /> */}
        <section id="repos">
          <Repos />
        </section>
        <section id="contact">
          <Contact />
        </section>
      </main>
      <Footer />
    </div>
  );
}

