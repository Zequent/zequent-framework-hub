'use client';

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Cpu,
  Activity,
  ListChecks,
  Calendar,
  Sparkles,
  RefreshCw,
  Wifi,
  Layers,
  ShieldCheck,
  FileText,
  Lock,
  UserCheck,
  RotateCcw,
  BarChart2,
  LayoutGrid,
  KeyRound,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const capabilities = [
  {
    icon: Cpu,
    title: 'Device Integration',
    description: 'Connect and control any sensor, system, or platform—without custom glue code.',
  },
  {
    icon: Activity,
    title: 'Real-Time Data Streaming',
    description: 'Continuously ingest and distribute data across the system—without bottlenecks.',
  },
  {
    icon: ListChecks,
    title: 'Tasking & Coordination',
    description: 'Assign, manage, and synchronize tasks across distributed assets.',
  },
  {
    icon: Calendar,
    title: 'Mission Planning & Scheduling',
    description: 'Plan, adapt, and execute operations in real time with optional time scheduling.',
  },
  {
    icon: Sparkles,
    title: 'AI Inference',
    description: 'Run models directly at the edge—where decisions need to happen.',
  },
  {
    icon: RefreshCw,
    title: 'Continuous Learning',
    description: 'Capture outcomes and improve system behavior over time.',
  },
  {
    icon: Wifi,
    title: 'Mesh Connectivity',
    description: 'Maintain communication across devices—even in degraded or offline environments.',
  },
  {
    icon: Layers,
    title: 'Interoperability',
    description: 'Work seamlessly across vendors, systems, and domains.',
  },
];

const security = [
  {
    icon: ShieldCheck,
    title: 'Standards Compliance',
    description: 'Built to meet NATO STANAG and industry requirements—out of the box.',
  },
  {
    icon: FileText,
    title: 'Audit & Traceability',
    description: 'Every action is logged, traceable, and reviewable—end to end.',
  },
  {
    icon: Lock,
    title: 'Data Encryption',
    description: 'Data is encrypted at rest and in transit—by default.',
  },
  {
    icon: UserCheck,
    title: 'Zero-Trust Security',
    description: 'No implicit trust. Every user, device, and action is continuously verified.',
  },
  {
    icon: RotateCcw,
    title: 'Resilient Failover',
    description: 'Systems continue operating through failures—without interruption.',
  },
  {
    icon: BarChart2,
    title: 'Full Observability',
    description: 'Monitor system state, performance, and behavior in real time.',
  },
  {
    icon: LayoutGrid,
    title: 'System Standardization',
    description: 'Enforce consistent structures, interfaces, and workflows across deployments.',
  },
  {
    icon: KeyRound,
    title: 'Granular Access Control',
    description: 'Define exactly who can access what—down to the smallest level.',
  },
];

function FeatureGrid({ items, animRef }: { items: typeof capabilities; animRef: React.RefObject<HTMLDivElement | null> }) {
  return (
    <div
      ref={animRef}
      className="grid grid-cols-2 md:grid-cols-4"
    >
      {items.map((item) => {
        const Icon = item.icon;
        return (
          <div
            key={item.title}
            className="p-8 lg:p-10"
          >
            <Icon className="w-6 h-6 mb-5 stroke-[1.25]" style={{ color: '#58edac' }} />
            <h3 className="font-soehne text-lg font-medium text-white mb-2 leading-snug">
              {item.title}
            </h3>
            <p className="font-soehne text-base text-white/40 leading-relaxed">
              {item.description}
            </p>
          </div>
        );
      })}
    </div>
  );
}

const FeaturesV2 = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const heading1Ref = useRef<HTMLDivElement>(null);
  const grid1Ref = useRef<HTMLDivElement>(null);
  const heading2Ref = useRef<HTMLDivElement>(null);
  const grid2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const animateHeading = (el: HTMLDivElement | null) => {
        if (!el) return;
        gsap.from(el.children, {
          opacity: 0,
          y: 30,
          duration: 0.7,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        });
      };

      const animateGrid = (el: HTMLDivElement | null) => {
        if (!el) return;
        gsap.from(el.children, {
          opacity: 0,
          y: 24,
          duration: 0.55,
          stagger: 0.07,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        });
      };

      animateHeading(heading1Ref.current);
      animateGrid(grid1Ref.current);
      animateHeading(heading2Ref.current);
      animateGrid(grid2Ref.current);
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="features"
      className="relative overflow-hidden"
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 148% 122% at 0% 0%, #0A0A0A 0%, #0A0A0A 45%, rgba(10,10,10,0.92) 65%, rgba(10,10,10,0.56) 80%, transparent 95%), #FF4A28',
        }}
      />

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(10,10,10,0.35) 1px, transparent 1px), linear-gradient(to bottom, rgba(10,10,10,0.35) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }}
      />

      <div className="relative container mx-auto px-6 py-24 lg:py-32">
        <div ref={heading1Ref} className="mb-14 pl-8 lg:pl-10">
          <h2 className="font-soehne text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-light text-white leading-[1.1] tracking-tight max-w-3xl mb-4">
            Intuitive by design,
            <br />
            engineered for reliability.
          </h2>
          <p className="font-soehne text-lg sm:text-xl text-white/40 max-w-xl">
            Build tactical edge systems with integrated primitives that just work.
          </p>
        </div>

        <FeatureGrid items={capabilities} animRef={grid1Ref} />
      </div>

      <div className="relative container mx-auto px-6 py-24 lg:py-32">
        <div ref={heading2Ref} className="mb-14 pl-8 lg:pl-10">
          <h2 className="font-soehne text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-light text-white leading-[1.1] tracking-tight max-w-3xl mb-4">
            Stay secure and
            <br />
            compliant by default.
          </h2>
          <p className="font-soehne text-lg sm:text-xl text-white/40 max-w-xl">
            Build capabilities, not compliance.
          </p>
        </div>

        <FeatureGrid items={security} animRef={grid2Ref} />
      </div>
    </section>
  );
};

export default FeaturesV2;
