'use client';

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Joystick, Activity, MapPin, Link2, Eye, Video } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const capabilities = [
  {
    icon: Joystick,
    title: "Remote Control",
    description: "Direct command execution for flight control, gimbal positioning, and manual input. Low-latency command-response architecture ensures responsive operation regardless of distance.",
  },
  {
    icon: Activity,
    title: "Live Telemetry",
    description: "Persistent data streams for position, battery, signal, and custom sensor data. Push from the edge, subscribe from the application -- real-time visibility across your entire fleet.",
  },
  {
    icon: MapPin,
    title: "Mission Planning",
    description: "Define missions with tasks, waypoints, and scheduling. The platform handles execution order, state transitions, and progress tracking across concurrent operations.",
  },
  {
    icon: Video,
    title: "Data Streaming",
    description: "Live video feeds from cameras and sensors on the edge. Multi-stream support, recording, and relay -- all routed through the platform with no direct device access required.",
  },
  {
    icon: Link2,
    title: "Asset Management",
    description: "Registry for all connected hardware -- drones, docks, vehicles, sensors. Manage organizations, capabilities, and metadata. The single source of truth for your deployment.",
  },
  {
    icon: Eye,
    title: "Detection and AI",
    description: "Computer vision and inference pipelines at the edge or in the cloud. Object detection, tracking, and classification with pluggable model backends integrated into the data flow.",
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

      // reveal w scaling
      if (gridRef.current) {
        const cards = gridRef.current.children;
        gsap.set(cards, { opacity: 0, y: 50, scale: 0.95 });
        gsap.to(cards, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          stagger: {
            each: 0.1,
            grid: [2, 3],
            from: 'start',
          },
          ease: 'power3.out',
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 82%',
            once: true,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 lg:py-32 bg-muted/30">
      <div className="container mx-auto px-6">
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

        <div ref={gridRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {capabilities.map((cap) => (
            <div
              key={cap.title}
              className="p-6 bg-card rounded-xl border border-border hover:border-primary/30 transition-colors group"
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/15 transition-colors">
                <cap.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-heading font-semibold text-foreground mb-3">
                {cap.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {cap.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
