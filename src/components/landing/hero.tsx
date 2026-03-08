'use client';

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

// Drone fleet anim
type PatrolType = 'sweep' | 'orbit' | 'figure8';
const drones: { top: string; left: string; size: number; opacity: number; delay: number; entryFrom: { x: number; y: number }; patrol: PatrolType; speed: number }[] = [
  { top: '5%',  left: '78%', size: 30, opacity: 0.3, delay: 0.0, entryFrom: { x: 200,  y: -100 }, patrol: 'sweep',   speed: 5 },
  { top: '14%', left: '92%', size: 34, opacity: 0.45, delay: 0.15, entryFrom: { x: 250,  y: -60 }, patrol: 'sweep',   speed: 4.5 },
  { top: '26%', left: '66%', size: 40, opacity: 0.15, delay: 0.3, entryFrom: { x: -120, y: 80 },  patrol: 'orbit',   speed: 7 },
  { top: '30%', left: '86%', size: 44, opacity: 0.5,  delay: 0.1, entryFrom: { x: 180,  y: -40 }, patrol: 'orbit',   speed: 6 },
  { top: '44%', left: '74%', size: 52, opacity: 0.35, delay: 0.2, entryFrom: { x: 160,  y: 60 },  patrol: 'figure8', speed: 8 },
  { top: '48%', left: '92%', size: 48, opacity: 0.55, delay: 0.05, entryFrom: { x: 220,  y: 20 },  patrol: 'figure8', speed: 7.5 },
  { top: '62%', left: '68%', size: 36, opacity: 0.12, delay: 0.45, entryFrom: { x: -100, y: 120 }, patrol: 'sweep',   speed: 6.5 },
  { top: '66%', left: '88%', size: 42, opacity: 0.4,  delay: 0.1, entryFrom: { x: 200,  y: 80 },  patrol: 'orbit',   speed: 5.5 },
  { top: '80%', left: '78%', size: 38, opacity: 0.25, delay: 0.35, entryFrom: { x: 140,  y: 140 }, patrol: 'orbit',   speed: 9 },
  { top: '82%', left: '94%', size: 46, opacity: 0.5,  delay: 0.0, entryFrom: { x: 260,  y: 100 }, patrol: 'figure8', speed: 8 },
];

// Patrol behavior anims with gasp
const patrolPaths = {
  sweep: (speed: number) => ({
    keyframes: [
      { x: 3,  y: -1,  rotate: -0.5, duration: speed * 0.3 },
      { x: -2, y: 2,   rotate: 0.8,  duration: speed * 0.4 },
      { x: 1,  y: -2,  rotate: -0.3, duration: speed * 0.3 },
      { x: 0,  y: 0,   rotate: 0,    duration: speed * 0.3 },
    ],
    repeat: -1,
    ease: 'power2.inOut',
  }),
  orbit: (speed: number) => ({
    keyframes: [
      { x: 8,   y: 0,   rotate: -1.5, duration: speed * 0.35 },
      { x: 8,   y: 0,   rotate: -1.5, duration: speed * 0.15 },
      { x: -4,  y: 3,   rotate: 1,    duration: speed * 0.35 },
      { x: -4,  y: 3,   rotate: 1,    duration: speed * 0.1 },
      { x: 0,   y: 0,   rotate: 0,    duration: speed * 0.25 },
    ],
    repeat: -1,
    ease: 'power3.inOut',
  }),
  figure8: (speed: number) => ({
    keyframes: [
      { x: 12,  y: -6,  rotate: -2,   duration: speed * 0.08 },
      { x: 12,  y: -6,  rotate: -1.5, duration: speed * 0.35 }, 
      { x: 12,  y: -6,  rotate: -1.8, duration: speed * 0.05 },
      { x: -5,  y: 4,   rotate: 1,    duration: speed * 0.08 },
      { x: -5,  y: 4,   rotate: 0.5,  duration: speed * 0.3 },
      { x: 0,   y: 0,   rotate: 0,    duration: speed * 0.08 },
      { x: 0,   y: 0,   rotate: 0,    duration: speed * 0.2 },
    ],
    repeat: -1,
    ease: 'power4.out',
  }),
};

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
        const config = drones[i];
        const droneImg = el.querySelector('.drone-icon') as HTMLElement;

        gsap.set(el, {
          opacity: 0,
          x: config.entryFrom.x,
          y: config.entryFrom.y,
          scale: 0.3,
        });

        // Staggered deploy
        tl.to(el, {
          opacity: config.opacity,
          x: 0,
          y: 0,
          scale: 1,
          duration: 1.6,
          ease: 'power2.out',
        }, 0.4 + config.delay * 2);

        tl.fromTo(el, {
          filter: 'brightness(2)',
        }, {
          filter: 'brightness(1)',
          duration: 0.8,
          ease: 'power2.in',
        }, 0.6 + config.delay * 2);

        const pathConfig = patrolPaths[config.patrol](config.speed);
        gsap.to(el, {
          ...pathConfig,
          delay: 2.5 + config.delay,
        });

        if (droneImg) {
          gsap.to(droneImg, {
            y: -0.3,
            duration: 0.04,
            repeat: -1,
            yoyo: true,
            ease: 'none',
            delay: 2 + config.delay,
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
          delay: 2,
        });
        gsap.to(radarLine, {
          left: '110%',
          duration: 6,
          repeat: -1,
          ease: 'none',
          delay: 2,
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
          }}
        />

        <div
          className="radar-sweep absolute top-0 bottom-0 w-px pointer-events-none"
          style={{
            background: 'linear-gradient(to bottom, transparent, hsl(var(--primary) / 0.4) 30%, hsl(var(--primary) / 0.6) 50%, hsl(var(--primary) / 0.4) 70%, transparent)',
            boxShadow: '0 0 20px 4px hsl(var(--primary) / 0.15), 0 0 60px 8px hsl(var(--primary) / 0.05)',
          }}
        />

        {drones.map((drone, i) => (
          <div
            key={i}
            ref={el => { dronesRef.current[i] = el; }}
            className="absolute pointer-events-none select-none"
            style={{
              top: drone.top,
              left: drone.left,
              width: drone.size,
              height: drone.size,
            }}
          >
            <img
              src="/images/drone_white.svg"
              alt=""
              aria-hidden="true"
              className="drone-icon w-full h-full"
            />
          </div>
        ))}
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
            <span>Open Source</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
