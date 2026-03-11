'use client';

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

// Drone fleet anim
const CELL = 80;
type DroneColor = 'coral' | 'amber' | 'muted';

const droneColors: Record<DroneColor, { border: string; fill: string; bg: string }> = {
  coral: { border: 'rgba(255, 96, 68, 0.7)',  fill: '#FF6044', bg: 'rgba(255, 96, 68, 0.08)' },
  amber: { border: 'rgba(230, 195, 50, 0.7)', fill: '#E6C332', bg: 'rgba(230, 195, 50, 0.08)' },
  muted: { border: 'rgba(180, 180, 180, 0.35)', fill: '#B4B4B4', bg: 'rgba(180, 180, 180, 0.04)' },
};

interface GridDrone {
  col: number;
  row: number;
  color: DroneColor;
  moves?: [number, number][];
  holdTime?: number;
}

const gridDrones: GridDrone[] = [
  // Forward
  { col: 3, row: 0,  color: 'coral' },
  // Left
  { col: 6, row: 2,  color: 'amber', moves: [[5, 1], [6, 2]], holdTime: 5 },
  // Center recon
  { col: 3, row: 3,  color: 'amber', moves: [[2, 2], [3, 3]], holdTime: 4 },
  // Right assault
  { col: 0, row: 2,  color: 'coral', moves: [[1, 3], [0, 4], [0, 2]], holdTime: 3.5 },
  { col: 5, row: 5,  color: 'muted' },
  // Center
  { col: 2, row: 5,  color: 'muted', moves: [[1, 4], [2, 5]], holdTime: 6 },
  { col: 0, row: 6,  color: 'amber', moves: [[1, 7], [0, 6]], holdTime: 4.5 },
  { col: 4, row: 7,  color: 'muted' },
  { col: 2, row: 9,  color: 'coral', moves: [[3, 8], [2, 9]], holdTime: 5 },
  { col: 1, row: 10, color: 'coral' },
];

const Hero = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const badgesRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const dronesRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      if (headingRef.current) {
        const words = headingRef.current.querySelectorAll('.hero-word');
        gsap.set(words, { opacity: 0, y: 40, rotateX: -20 });
        tl.to(words, {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 0.8,
          stagger: 0.06,
        }, 0.2);
      }

      if (subtitleRef.current) {
        gsap.set(subtitleRef.current, { opacity: 0, y: 30 });
        tl.to(subtitleRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.7,
        }, 0.6);
      }

      if (ctaRef.current) {
        gsap.set(ctaRef.current, { opacity: 0, y: 20, scale: 0.95 });
        tl.to(ctaRef.current, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
        }, 0.9);
      }

      if (badgesRef.current) {
        gsap.set(badgesRef.current, { opacity: 0 });
        tl.to(badgesRef.current, {
          opacity: 1,
          duration: 0.6,
        }, 1.1);
      }

      // Grid revealing
      if (gridRef.current) {
        gsap.set(gridRef.current, { opacity: 0 });
        tl.to(gridRef.current, {
          opacity: 1,
          duration: 1.2,
        }, 0.3);
      }

      // Drone fleeting animations
      dronesRef.current.forEach((el, i) => {
        if (!el) return;
        const config = gridDrones[i];
        gsap.set(el, { opacity: 0 });
        tl.to(el, {
          opacity: 1,
          duration: 0.12,
          ease: 'power2.in',
        }, 0.4 + i * 0.08);

        if (config.moves && config.moves.length > 0) {
          const hold = config.holdTime || 4;
          const moveTl = gsap.timeline({ repeat: -1, delay: 1.5 + i * 0.2 });

          config.moves.forEach(([targetCol, targetRow]) => {
            moveTl.to({}, { duration: hold });
            moveTl.to(el, {
              x: (config.col - targetCol) * CELL,
              y: (targetRow - config.row) * CELL,
              duration: 0.3,
              ease: 'power3.inOut',
            });
          });
        }
      });

      // Radar sweep line across the grid continuously
      const radarLine = sectionRef.current?.querySelector('.radar-sweep');
      if (radarLine) {
        gsap.set(radarLine, { opacity: 0, left: '50%' });
        gsap.to(radarLine, {
          opacity: 0.15,
          duration: 0.5,
          delay: 0.8,
        });
        gsap.to(radarLine, {
          left: '110%',
          duration: 6,
          repeat: -1,
          ease: 'none',
          delay: 0.8,
          onRepeat: function() {
            gsap.set(radarLine, { left: '50%' });
          },
        });
      }

      const heroContent = sectionRef.current?.querySelector('.hero-content');
      if (heroContent) {
        gsap.to(heroContent, {
          opacity: 0.3,
          y: -40,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: '60% top',
            end: 'bottom top',
            scrub: true,
          },
        });
      }

      if (gridRef.current) {
        gsap.to(gridRef.current, {
          yPercent: 8,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const headingWords = (text: string) =>
    text.split(' ').map((word, i) => (
      <span key={i} className="hero-word inline-block" style={{ perspective: '600px' }}>
        {word}&nbsp;
      </span>
    ));

  return (
    <section ref={sectionRef} className="relative min-h-screen flex items-center bg-background overflow-hidden">
      <div
        ref={gridRef}
        className="absolute inset-0 pointer-events-none"
        style={{
          maskImage: 'linear-gradient(to right, transparent 20%, rgba(0,0,0,0.2) 40%, rgba(0,0,0,0.6) 65%, rgba(0,0,0,1) 100%)',
          WebkitMaskImage: 'linear-gradient(to right, transparent 20%, rgba(0,0,0,0.2) 40%, rgba(0,0,0,0.6) 65%, rgba(0,0,0,1) 100%)',
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(to right, hsl(var(--border) / 0.5) 1px, transparent 1px),
              linear-gradient(to bottom, hsl(var(--border) / 0.5) 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px',
            backgroundPosition: 'right top',
          }}
        />

        <div
          className="radar-sweep absolute top-0 bottom-0 w-px pointer-events-none"
          style={{
            background: 'linear-gradient(to bottom, transparent, hsl(var(--primary) / 0.4) 30%, hsl(var(--primary) / 0.6) 50%, hsl(var(--primary) / 0.4) 70%, transparent)',
            boxShadow: '0 0 20px 4px hsl(var(--primary) / 0.15), 0 0 60px 8px hsl(var(--primary) / 0.05)',
          }}
        />

        {gridDrones.map((drone, i) => {
          const colors = droneColors[drone.color];
          return (
            <div
              key={i}
              ref={el => { dronesRef.current[i] = el; }}
              className="absolute pointer-events-none select-none"
              style={{
                top: drone.row * CELL,
                right: drone.col * CELL,
                width: CELL,
                height: CELL,
                border: `1px solid ${colors.border}`,
                backgroundColor: colors.bg,
              }}
            >
              <div
                className="drone-icon absolute"
                aria-hidden="true"
                style={{
                  width: CELL * 0.4,
                  height: CELL * 0.4,
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  backgroundColor: colors.fill,
                  maskImage: 'url(/images/drone_white.svg)',
                  WebkitMaskImage: 'url(/images/drone_white.svg)',
                  maskSize: 'contain',
                  WebkitMaskSize: 'contain',
                  maskRepeat: 'no-repeat',
                  WebkitMaskRepeat: 'no-repeat',
                  maskPosition: 'center',
                  WebkitMaskPosition: 'center',
                }}
              />
            </div>
          );
        })}
      </div>

      <div className="container mx-auto px-6 relative z-10 pt-32 pb-20 lg:pt-40 lg:pb-28">
        <div className="hero-content max-w-2xl">
          <h1 ref={headingRef} className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-heading text-foreground leading-[1.08] tracking-tight mb-6">
            <span className="font-bold">
              {headingWords("Resilient Infrastructure")}
            </span>
            <br />
            <span className="font-normal">
              {headingWords("for autonomous systems")}
            </span>
          </h1>

          <p ref={subtitleRef} className="text-base sm:text-lg text-muted-foreground max-w-xl mb-10 leading-relaxed">
            Intuitive infrastructure to deploy autonomous systems in mission-critical production. Think Kubernetes for autonomy.
          </p>

          <div ref={ctaRef} className="flex flex-wrap items-center gap-4">
            <Link
              href="/docs/sdk/setup"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-primary text-white text-sm font-semibold hover:bg-primary/90 transition-colors duration-200"
            >
              <span>Start for free</span>
              <img
                src="/images/button_arrow_white.svg"
                alt=""
                className="w-4 h-4"
              />
            </Link>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-muted/50 border border-border text-sm font-semibold text-foreground hover:bg-muted transition-colors duration-200"
            >
              Get in touch
            </a>
          </div>

          <div ref={badgesRef} className="mt-12 flex flex-wrap gap-x-8 gap-y-3 text-sm text-muted-foreground/60">
            <span>EU Cloud &amp; On-Premise</span>
            <span>&bull;</span>
            <span>GDPR Compliant</span>
            <span>&bull;</span>
            <span>Open Platform</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
