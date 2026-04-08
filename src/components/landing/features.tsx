'use client';

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import TechFrame from './customtechframe';
import AssetIcon from './tech-icons/AssetIcon';
import StreamingIcon from './tech-icons/StreamingIcon';
import DetectionIcon from './tech-icons/DetectionIcon';
import MissionIcon from './tech-icons/MissionIcon';

gsap.registerPlugin(ScrollTrigger);

const capabilities = [
  {
    icon: AssetIcon,
    title: "Asset Integration",
    description: "Onboard drones, docks, vehicles, and sensors into a unified registry. Manage capabilities, metadata, and connectivity from a single control plane.",
  },
  {
    icon: StreamingIcon,
    title: "Data Streaming & Tasking",
    description: "Push telemetry from the edge, stream live video, and dispatch tasks in real time. Bi-directional channels keep every asset responsive and observable.",
  },
  {
    icon: DetectionIcon,
    title: "AI Inference & Learning",
    description: "Run detection, classification, and tracking models at the edge or in the cloud. Pluggable pipelines feed results back into the platform's data flow.",
  },
  {
    icon: MissionIcon,
    title: "Interoperability",
    description: "Connect across protocols, vendors, and deployment environments. Typed SDK interfaces and open APIs ensure every component speaks the same language.",
  },
];

const Features = () => {
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
          scrollTrigger: {
            trigger: headerRef.current,
            start: 'top 80%',
            once: true,
          },
        });
      }

      // Card frame appear anim
      if (gridRef.current) {
        const cards = gridRef.current.querySelectorAll('.feature-card');

        const frameStrokes = gridRef.current.querySelectorAll(
          '.frame-line, .frame-line-inner, .frame-line-accent'
        );
        frameStrokes.forEach((el) => {
          const path = el as SVGPathElement;
          const len = path.getTotalLength();
          gsap.set(path, { attr: { 'stroke-dasharray': len, 'stroke-dashoffset': len } });
        });

        const edgesH = gridRef.current.querySelectorAll('.frame-edge-h');
        const edgesV = gridRef.current.querySelectorAll('.frame-edge-v');

        gsap.set(cards, { opacity: 0, y: 50 });
        gsap.set(edgesH, { scaleX: 0 });
        gsap.set(edgesV, { scaleY: 0 });

        const frameTl = gsap.timeline({
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 82%',
            once: true,
          },
        });

        frameTl.to(cards, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: { each: 0.1, grid: [1, 4], from: 'start' },
          ease: 'power3.out',
        });

        frameTl.to(frameStrokes, {
          attr: { 'stroke-dashoffset': 0 },
          duration: 0.6,
          stagger: 0.03,
          ease: 'power2.inOut',
        }, '-=0.3');

        frameTl.to(edgesH, {
          scaleX: 1,
          duration: 0.45,
          stagger: 0.04,
          ease: 'power2.out',
        }, '-=0.3');

        frameTl.to(edgesV, {
          scaleY: 1,
          duration: 0.45,
          stagger: 0.04,
          ease: 'power2.out',
        }, '-=0.4');
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 lg:py-32 bg-muted/30 relative overflow-hidden">
      <div
        className="absolute inset-0 bg-grid-landing pointer-events-none"
        aria-hidden="true"
        style={{
          maskImage: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(0,0,0,0.5) 0%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(0,0,0,0.5) 0%, transparent 100%)',
        }}
      />
      <div className="container mx-auto px-6 relative z-10">
        <div ref={headerRef} className="max-w-3xl mx-auto text-center mb-16">
          <span className="inline-block text-sm font-medium text-primary uppercase tracking-wider mb-4">
            Capabilities
          </span>
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-foreground mb-6">
            Everything autonomous systems need
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            From direct hardware control to fleet-wide intelligence. Each capability is a service in the platform, accessible through the SDK with typed interfaces and structured responses.
          </p>
        </div>

        <div ref={gridRef} className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {capabilities.map((cap) => (
            <div
              key={cap.title}
              className="feature-card relative p-6 bg-card group"
              style={{
                clipPath: 'polygon(20px 0, 100% 0, 100% calc(100% - 18px), calc(100% - 18px) 100%, 0 100%, 0 20px)',
              }}
            >
              <TechFrame className="opacity-60 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative">
                <div className="w-14 h-14 mb-5 relative">
                  <cap.icon className="w-full h-full text-foreground" />
                </div>
                <h3 className="text-lg font-heading font-semibold text-foreground mb-3">
                  {cap.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {cap.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
