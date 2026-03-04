'use client';

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const painPoints = [
  {
    label: "Integration hell",
    description: "Every hardware vendor ships its own SDK with its own protocol and data format. You write adapter code instead of application logic.",
  },
  {
    label: "No standard for operations",
    description: "No unified way to plan a mission, stream telemetry, or send a command across different hardware. New device, new pipeline, from scratch.",
  },
  {
    label: "Fragile at scale",
    description: "What works for 3 drones in a lab breaks at 30 in the field. Telemetry pipelines, mission planners, and deployments don't scale without a rewrite.",
  },
  {
    label: "Deployment constraints",
    description: "Defense and public safety need on-premise, sometimes fully air-gapped. You need EU cloud and isolated on-prem from one codebase, with compliance built in.",
  },
];

const Problem = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // reveal
      if (headingRef.current) {
        const els = headingRef.current.children;
        gsap.set(els, { opacity: 0, y: 30 });
        gsap.to(els, {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: headingRef.current,
            start: 'top 80%',
            once: true,
          },
        });
      }

      // Reveal from left
      if (cardsRef.current) {
        const cards = cardsRef.current.children;
        gsap.set(cards, { opacity: 0, x: -30, y: 20 });
        gsap.to(cards, {
          opacity: 1,
          x: 0,
          y: 0,
          duration: 0.6,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: cardsRef.current,
            start: 'top 80%',
            once: true,
          },
        });
      }

      if (imageRef.current) {
        gsap.set(imageRef.current, { opacity: 0, scale: 0.95 });
        gsap.to(imageRef.current, {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: imageRef.current,
            start: 'top 85%',
            once: true,
          },
        });

        gsap.to(imageRef.current, {
          yPercent: -5,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 lg:py-32 bg-muted/30 relative overflow-hidden">
      <div className="container mx-auto px-6 relative">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <div ref={headingRef} className="mb-10">
              <span className="inline-block text-sm font-medium text-primary uppercase tracking-wider mb-4">
                The Problem
              </span>
              <h2 className="text-3xl sm:text-4xl font-heading font-bold text-foreground mb-6">
                Autonomous systems break in production
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Teams building autonomous systems spend more time on infrastructure plumbing than on the product itself. The tooling landscape is fragmented, vendor-specific, and not designed for production.
              </p>
            </div>

            <div ref={cardsRef} className="space-y-4">
              {painPoints.map((point) => (
                <div
                  key={point.label}
                  className="p-5 bg-card border border-border"
                >
                  <h3 className="text-base font-heading font-semibold text-foreground mb-2">
                    {point.label}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {point.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div ref={imageRef} className="hidden lg:block">
            <div className="relative overflow-hidden border border-border aspect-[4/5]">
              <Image
                src="/images/mission-autonomy.png"
                alt="Mission autonomy workflow complexity"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Problem;
