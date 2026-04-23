'use client';

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';

gsap.registerPlugin(ScrollTrigger);

const pillars = [
  {
    title: 'Sensor-to-Effector Orchestration',
    description:
      'Deterministic sensing-to-actuation pipelines across distributed edge systems.',
  },
  {
    title: 'Resilient Edge Mesh',
    description:
      'Distributed compute mesh for edge systems in degraded networks. (DIL-tolerant).',
  },
  {
    title: 'Multi-Domain Coordination',
    description:
      'Fault-tolerant system for cross-domain control, tasking and execution.',
  },
];

const PlatformShowcaseV2 = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const splitRef = useRef<HTMLDivElement>(null);
  const solutionsRef = useRef<HTMLDivElement>(null);
  const pillarsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Heading reveal
      if (headingRef.current) {
        gsap.from(headingRef.current, {
          opacity: 0,
          y: 40,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: headingRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        });
      }

      // Split section reveal
      if (splitRef.current) {
        const children = splitRef.current.children;
        gsap.from(children, {
          opacity: 0,
          y: 30,
          duration: 0.7,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: splitRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        });
      }

      // Solutions bar reveal
      if (solutionsRef.current) {
        gsap.from(solutionsRef.current, {
          opacity: 0,
          y: 20,
          duration: 0.6,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: solutionsRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        });
      }

      // Pillar cards
      if (pillarsRef.current) {
        const cards = pillarsRef.current.children;
        gsap.from(cards, {
          opacity: 0,
          y: 30,
          duration: 0.6,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: pillarsRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="platform"
      className="relative bg-zequent-black py-24 lg:py-32 overflow-hidden"
    >
      <div className="container mx-auto px-6">
        <h2
          ref={headingRef}
          className="font-soehne text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-light text-white leading-[1.1] tracking-tight max-w-4xl mb-20"
        >
          Operate degraded edge-to-cloud
          <br />
          environments.{' '}
          <span className="relative inline-block">
            <span
              className="text-transparent bg-clip-text"
              style={{
                backgroundImage: 'linear-gradient(90deg, #FF6044 0%, #FF9A6C 100%)',
              }}
            >
              With confidence.
            </span>
            <span
              aria-hidden="true"
              className="absolute left-1/2 bottom-0 pointer-events-none"
              style={{
                width: '120%',
                height: '60px',
                background: 'radial-gradient(ellipse at center, rgba(255, 96, 68, 0.5) 0%, rgba(255, 60, 0, 0.18) 50%, transparent 80%)',
                filter: 'blur(18px)',
                transform: 'translateX(-50%) translateY(70%)',
              }}
            />
          </span>
        </h2>

        <div
          ref={splitRef}
          className="border border-white/10"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="relative flex flex-col justify-center p-8 lg:p-12 border-b border-white/10 lg:border-b-0 lg:border-r border-white/10 overflow-hidden">
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: 'linear-gradient(to bottom, rgba(0,0,0,0.32) 0%, rgba(0,0,0,0.26) 6%, rgba(0,0,0,0.20) 11%, rgba(0,0,0,0.15) 16%, rgba(0,0,0,0.10) 21%, rgba(0,0,0,0.06) 27%, rgba(0,0,0,0.03) 33%, rgba(0,0,0,0.01) 40%, transparent 50%, rgba(0,0,0,0.01) 60%, rgba(0,0,0,0.03) 67%, rgba(0,0,0,0.06) 73%, rgba(0,0,0,0.10) 79%, rgba(0,0,0,0.15) 84%, rgba(0,0,0,0.20) 89%, rgba(0,0,0,0.26) 94%, rgba(0,0,0,0.32) 100%)',
                }}
              />
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: 'radial-gradient(ellipse 90% 55% at 50% 50%, rgba(210,218,225,0.055) 0%, rgba(210,218,225,0.02) 50%, transparent 75%)',
                }}
              />
              <p className="font-soehne text-3xl sm:text-4xl lg:text-5xl text-white/60 leading-snug relative font-light">
                A distributed platform spanning data, control and execution planes,
                abstracting hardware, networks, and protocols to enable
                software-defined edge systems across tactical environments.
              </p>
            </div>

            <div className="relative overflow-hidden">
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    'linear-gradient(to bottom right, rgba(255, 96, 68, 0.12) 0%, rgba(255, 96, 68, 0.04) 40%, transparent 80%)',
                }}
              />
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  backgroundImage:
                    'linear-gradient(to right, rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.06) 1px, transparent 1px)',
                  backgroundSize: '48px 48px',
                }}
              />
              <div className="relative p-8 lg:p-10">
                <div className="font-soehne text-sm uppercase tracking-widest text-primary mb-5">
                  Product
                </div>
                <h3 className="font-soehne text-3xl sm:text-4xl lg:text-5xl font-light text-white mb-5">
                  Tactical Edge OS
                </h3>
                <p className="font-soehne text-lg sm:text-xl text-white/50 leading-relaxed mb-10">
                  Everything you need to build and deploy tactical edge
                  systems that operate reliably in degraded environments.
                </p>
                <div className="flex flex-wrap gap-6 font-soehne text-base">
                  <Link
                    href="/docs/sdk/setup"
                    className="text-primary hover:text-primary/80 transition-colors inline-flex items-center gap-1"
                  >
                    Get started <span aria-hidden="true">&rarr;</span>
                  </Link>
                  <Link
                    href="/docs"
                    className="text-white/50 hover:text-white/70 transition-colors inline-flex items-center gap-1"
                  >
                    Explore docs <span aria-hidden="true">&rarr;</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-white/10">
            <div ref={solutionsRef} className="px-8 pt-8 lg:px-12 lg:pt-12 pb-8">
              <div className="font-soehne text-xs uppercase tracking-widest text-white/30 mb-4 flex items-center gap-2">
                <span className="text-white/20">|</span>
                <span>Solutions</span>
                <span className="text-white/20">|</span>
              </div>
              <h3 className="font-soehne text-xl sm:text-2xl lg:text-3xl font-light text-white">
                Defense &middot; Public Safety &middot; Critical Infrastructure
              </h3>
            </div>

            <div className="h-px w-full bg-white/20" />

            <div
              ref={pillarsRef}
              className="grid grid-cols-1 md:grid-cols-3 md:divide-x md:divide-white/10"
            >
              <div className="relative p-6 lg:p-8">
                <h4 className="font-soehne text-3xl lg:text-4xl font-semibold text-white mb-3 relative">
                  {pillars[0].title}
                </h4>
                <p className="font-soehne text-base sm:text-lg text-white/40 leading-relaxed relative">
                  {pillars[0].description}
                </p>
              </div>
              <div className="relative p-6 lg:p-8">
                <h4 className="font-soehne text-3xl lg:text-4xl font-semibold text-white mb-3 relative">
                  Resilient<br />Edge Mesh
                </h4>
                <p className="font-soehne text-base sm:text-lg text-white/40 leading-relaxed relative">
                  {pillars[1].description}
                </p>
              </div>
              <div className="relative p-6 lg:p-8">
                <h4 className="font-soehne text-3xl lg:text-4xl font-semibold text-white mb-3 relative">
                  {pillars[2].title}
                </h4>
                <p className="font-soehne text-base sm:text-lg text-white/40 leading-relaxed relative">
                  {pillars[2].description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PlatformShowcaseV2;
