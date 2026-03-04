'use client';

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Layers, Radio, Cpu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

const pillars = [
  {
    icon: Layers,
    title: "SDKs",
    description: "Build applications that command and monitor autonomous systems. Typed interfaces for remote control, telemetry, missions, and more. Add a dependency, configure, and start calling services.",
    link: "/docs/sdk/client/quickstart",
    linkLabel: "Client SDK Docs",
  },
  {
    icon: Radio,
    title: "Edge Adapters",
    description: "Connect any hardware to the platform. Implement a single interface for your specific device -- drones, docks, vehicles, sensors. The framework handles registration, streaming, and routing.",
    link: "/docs/sdk/edge/overview",
    linkLabel: "Edge SDK Docs",
  },
  {
    icon: Cpu,
    title: "Platform Services",
    description: "Remote control, live telemetry, mission autonomy, asset management, and AI detection -- all exposed as platform services. Your SDKs connect to them automatically.",
    link: "/docs",
    linkLabel: "Full Documentation",
  },
];

const Solution = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const pillarsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // text reveal
      if (textRef.current) {
        const els = textRef.current.children;
        gsap.set(els, { opacity: 0, y: 30 });
        gsap.to(els, {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: textRef.current,
            start: 'top 80%',
            once: true,
          },
        });
      }

      // Image scale
      if (imageRef.current) {
        gsap.set(imageRef.current, { opacity: 0, scale: 0.93, x: 40 });
        gsap.to(imageRef.current, {
          opacity: 1,
          scale: 1,
          x: 0,
          duration: 0.9,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: imageRef.current,
            start: 'top 80%',
            once: true,
          },
        });
      }

      // stagger
      if (pillarsRef.current) {
        const cards = pillarsRef.current.children;
        gsap.set(cards, { opacity: 0, y: 40 });
        gsap.to(cards, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: pillarsRef.current,
            start: 'top 82%',
            once: true,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 lg:py-32 bg-background">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center max-w-6xl mx-auto mb-20">
          <div ref={textRef}>
            <span className="inline-block text-sm font-medium text-primary uppercase tracking-wider mb-4">
              The Solution
            </span>
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-foreground mb-6">
              One platform, edge to cloud
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              Zequent replaces the patchwork of vendor SDKs, custom adapters, and glue code with a single layered architecture. Hardware adapters and application logic connect through well-defined service boundaries. You write the parts that matter -- the framework handles the rest.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Deploy on EU-hosted cloud infrastructure or fully air-gapped on-premise installations. Same platform, same SDKs, same configuration. Your application code does not change between deployment targets.
            </p>
          </div>

          <div ref={imageRef}>
            <div className="relative rounded-2xl overflow-hidden border border-border aspect-[4/3]">
              <Image
                src="/images/platform-architecture.png"
                alt="Zequent platform architecture — edge to cloud"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/30 via-transparent to-transparent" />
            </div>
          </div>
        </div>

        <div ref={pillarsRef} className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {pillars.map((pillar) => (
            <div
              key={pillar.title}
              className="p-6 bg-card rounded-xl border border-border hover:border-primary/30 transition-colors"
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-5">
                <pillar.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-heading font-semibold text-foreground mb-3">
                {pillar.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                {pillar.description}
              </p>
              <Link href={pillar.link} className="inline-flex items-center text-sm font-medium text-primary hover:underline">
                {pillar.linkLabel}
                <ArrowRight className="ml-1.5 w-3.5 h-3.5" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Solution;
