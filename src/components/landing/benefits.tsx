'use client';

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const reasons = [
  {
    title: "No glue code",
    description: "The framework defines clean interfaces between your application and the hardware layer. Add a dependency, call typed methods -- no custom protocols or serialization layers in between.",
  },
  {
    title: "Hardware-agnostic",
    description: "Switching vendors means writing a new adapter, not rewriting your application. The framework abstracts hardware operations so your application logic stays the same regardless of the hardware underneath.",
  },
  {
    title: "Deploy anywhere",
    description: "EU cloud or fully air-gapped on-premise. Same containers, same configuration, same SDKs. Your application code does not change between deployment targets. GDPR compliance is built into the architecture.",
  },
  {
    title: "Production-grade scale",
    description: "Services scale independently. Sustained telemetry from hundreds of assets, concurrent mission operations with conflict detection. This is framework infrastructure for real deployments, not a prototype toolkit.",
  },
  {
    title: "Open, not opaque",
    description: "You see the interfaces. You see the data models. You control the adapter code. No proprietary black boxes between your application and your hardware. The framework provides structure. The logic is yours.",
  },
  {
    title: "Modern stack",
    description: "Built on a modern, battle-tested runtime optimized for fast startup, low memory footprint, and native compilation. The same stack that runs cloud microservices at scale, applied to robotics.",
  },
];

const WhyZequent = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

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

      // Card reveal anim
      if (gridRef.current) {
        const cards = gridRef.current.children;
        gsap.set(cards, { opacity: 0, y: 40, scale: 0.96 });
        gsap.to(cards, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          stagger: {
            each: 0.08,
            grid: [2, 3],
            from: 'start',
          },
          ease: 'power3.out',
          scrollTrigger: { trigger: gridRef.current, start: 'top 82%', once: true },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 lg:py-32 bg-primary text-white">
      <div className="container mx-auto px-6">
        <div ref={headerRef} className="max-w-3xl mx-auto text-center mb-16">
          <span className="inline-block text-sm font-medium text-white/70 uppercase tracking-wider mb-4">
            Why Zequent
          </span>
          <h2 className="text-3xl sm:text-4xl font-heading font-bold mb-6">
            What you actually get
          </h2>
          <p className="text-lg text-white/80 leading-relaxed">
            Technical decisions that make a difference when you are shipping autonomous systems to production environments.
          </p>
        </div>

        <div ref={gridRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {reasons.map((reason) => (
            <div
              key={reason.title}
              className="p-6 bg-white/5 border border-white/10"
            >
              <h3 className="text-lg font-heading font-semibold mb-3">
                {reason.title}
              </h3>
              <p className="text-sm text-white/70 leading-relaxed">
                {reason.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyZequent;
