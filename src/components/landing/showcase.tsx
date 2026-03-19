'use client';

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const images = [
  {
    src: "/images/industrial-inspection.jpg",
    alt: "Autonomous industrial inspection",
    label: "Public Safety",
    span: "",
    aspect: "aspect-[16/10]",
  },
  {
    src: "/images/eu-autonomous-brain.jpg",
    alt: "Autonomous systems intelligence",
    label: "Defense",
    span: "",
    aspect: "aspect-[16/10]",
  },
];

const Showcase = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const closingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      if (headerRef.current) {
        const els = headerRef.current.children;
        gsap.set(els, { opacity: 0, y: 30 });
        gsap.to(els, {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: { trigger: headerRef.current, start: 'top 80%', once: true },
        });
      }

      if (gridRef.current) {
        const cards = gridRef.current.children;
        gsap.set(cards, { opacity: 0, scale: 0.92, y: 40 });
        gsap.to(cards, {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: { trigger: gridRef.current, start: 'top 82%', once: true },
        });
      }

      // Closing statement
      if (closingRef.current) {
        gsap.set(closingRef.current, { opacity: 0, y: 30 });
        gsap.to(closingRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: { trigger: closingRef.current, start: 'top 85%', once: true },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 lg:py-32 bg-muted/30 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div ref={headerRef} className="max-w-3xl mx-auto text-center mb-16">
          <span className="inline-block text-sm font-medium text-primary uppercase tracking-wider mb-4">
            In the Field
          </span>
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-foreground mb-6">
            Built for real-world operations
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Defense, public safety, agriculture, industrial inspection -- the leading companies rely on Zequent for running autonomous systems in mission-critical production.
          </p>
        </div>

        <div ref={gridRef} className="grid lg:grid-cols-2 gap-4 max-w-6xl mx-auto mb-16">
          {images.map((img) => (
            <div key={img.label} className={img.span}>
              <div className={`relative overflow-hidden border border-border ${img.aspect}`}>
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <span className="inline-block text-xs font-semibold uppercase tracking-wider text-white bg-black/60 backdrop-blur-sm px-3 py-1.5">
                    {img.label}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div ref={closingRef} className="max-w-4xl mx-auto text-center">
          <p className="text-2xl sm:text-3xl font-heading font-bold text-foreground leading-tight">
            From prototype to production. Same platform, any scale.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Showcase;
