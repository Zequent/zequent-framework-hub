'use client';

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const DevelopShowcaseV2 = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
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

      if (frameRef.current) {
        const panels = frameRef.current.querySelectorAll('[data-panel]');
        gsap.from(panels, {
          opacity: 0,
          y: 30,
          duration: 0.7,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: frameRef.current,
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
      className="relative bg-zequent-black pb-24 lg:pb-32 overflow-hidden"
    >
      <div className="container mx-auto px-6">
        <h2
          ref={headingRef}
          className="font-soehne text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-light text-white leading-[1.1] tracking-tight max-w-4xl mb-20"
        >
          Rapidly develop and deploy
          <br />
          tactical edge systems
        </h2>

        <div ref={frameRef} className="border border-white/10">
          <div
            data-panel="top"
            className="relative overflow-hidden border-b border-white/10"
          >
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: 'linear-gradient(to bottom right, transparent 0%, rgba(255, 96, 68, 0.04) 50%, rgba(255, 96, 68, 0.14) 100%)',
              }}
            />
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                backgroundImage:
                  'linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)',
                backgroundSize: '48px 48px',
              }}
            />
            <div className="relative p-12 lg:p-16">
              <h3 className="font-soehne text-4xl sm:text-5xl lg:text-6xl font-light text-white mb-5">
                Develop faster
              </h3>
              <p className="font-soehne text-lg sm:text-xl text-white/50 leading-relaxed max-w-sm mb-8 line-clamp-3">
                Development per unit time is what matters. Years of development become weeks. Months of development become days.
              </p>
              <a
                href="/docs"
                className="font-soehne text-base text-primary hover:text-primary/80 transition-colors inline-flex items-center gap-1"
              >
                Explore Docs <span aria-hidden="true">&rarr;</span>
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 border-b border-white/10">
            <div
              data-panel="row2-left"
              className="p-12 lg:p-16 border-b border-white/10 lg:border-b-0 lg:border-r border-white/10"
            >
              <h3 className="font-soehne text-3xl sm:text-4xl lg:text-5xl font-light text-white mb-5">
                Deploy in minutes
              </h3>
              <p className="font-soehne text-lg sm:text-xl text-white/50 leading-relaxed max-w-sm mb-8 line-clamp-3">
                Integrate new edge adapters or onboard existing edge devices rapidly. Live devices are discovered, configured, and mission-ready within seconds.
              </p>
              <a
                href="#"
                className="font-soehne text-base text-primary hover:text-primary/80 transition-colors inline-flex items-center gap-1"
              >
                Explore Edge Adapters <span aria-hidden="true">&rarr;</span>
              </a>
            </div>
            <div
              data-panel="row2-right"
              className="p-12 lg:p-16"
            >
              <h3 className="font-soehne text-3xl sm:text-4xl lg:text-5xl font-light text-white mb-5">
                Operate undeterred
              </h3>
              <p className="font-soehne text-lg sm:text-xl text-white/50 leading-relaxed max-w-sm mb-8 line-clamp-3">
                Stop fighting edge infrastructure. No constant firefighting when conditions change. Your stack keeps running — so your team can focus on building, not fixing.
              </p>
              <a
                href="#"
                className="font-soehne text-base text-primary hover:text-primary/80 transition-colors inline-flex items-center gap-1"
              >
                Explore Architecture <span aria-hidden="true">&rarr;</span>
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div
              data-panel="row3-left"
              className="p-12 lg:p-16 border-b border-white/10 lg:border-b-0 lg:border-r border-white/10"
            >
              <h3 className="font-soehne text-3xl sm:text-4xl lg:text-5xl font-light text-white mb-5">
                Lean teams, massive impact
              </h3>
              <p className="font-soehne text-lg sm:text-xl text-white/50 leading-relaxed max-w-sm mb-8 line-clamp-3">
                Hyper-enable your dev teams. Transform your software engineers into tactical edge geniuses and lead your team in fast moving industries.
              </p>
              <a
                href="#"
                className="font-soehne text-base text-primary hover:text-primary/80 transition-colors inline-flex items-center gap-1"
              >
                Explore Engineering Tools <span aria-hidden="true">&rarr;</span>
              </a>
            </div>
            <div
              data-panel="row3-right"
              className="p-12 lg:p-16"
            >
              <h3 className="font-soehne text-3xl sm:text-4xl lg:text-5xl font-light text-white mb-5">
                Own what you build
              </h3>
              <p className="font-soehne text-lg sm:text-xl text-white/50 leading-relaxed max-w-sm mb-8 line-clamp-3">
                Design intuitively in a modular, extensible, and scalable platform to deploy tactical edge systems across domains. You build it, you own it. Enable sovereign development to tactical edge computing and retain full rights to your intellectual property.
              </p>
              <a
                href="#"
                className="font-soehne text-base text-primary hover:text-primary/80 transition-colors inline-flex items-center gap-1"
              >
                Explore Licensing <span aria-hidden="true">&rarr;</span>
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default DevelopShowcaseV2;
