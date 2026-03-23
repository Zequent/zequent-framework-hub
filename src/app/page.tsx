'use client';

import Header from "@/components/landing/header";
import Hero from "@/components/landing/hero";
import Partners from "@/components/landing/partners";
import Problem from "@/components/landing/problem";
import Solution from "@/components/landing/solution";
import Features from "@/components/landing/features";
import Process from "@/components/landing/process";
import Showcase from "@/components/landing/showcase";
import Benefits from "@/components/landing/benefits";
import Repos from "@/components/landing/repos";
import Contact from "@/components/landing/contact";
import Footer from "@/components/landing/footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <Partners />
        <Problem />
        <section id="solution">
          <Solution />
        </section>
        <section id="features">
          <Features />
        </section>
        <section id="how-it-works">
          <Process />
        </section>
        <section id="showcase">
          <Showcase />
        </section>
        <Benefits />
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

