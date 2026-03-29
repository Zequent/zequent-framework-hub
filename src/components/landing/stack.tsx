'use client';

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Cloud, Server } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

gsap.registerPlugin(ScrollTrigger);

type SvgIconProps = { className?: string; style?: React.CSSProperties };

type ImgIcon = { src: string; alt: string };
type LucideIcon = { Icon: (props: SvgIconProps) => React.ReactNode; color: string };
type TechItem = ({ kind: 'img' } & ImgIcon) | ({ kind: 'lucide' } & LucideIcon);

const allIcons: TechItem[] = [
  { kind: 'img', src: '/images/Python.svg',     alt: 'Python' },
  { kind: 'img', src: '/images/Go.svg',          alt: 'Go' },
  { kind: 'img', src: '/images/Docker.svg',      alt: 'Docker' },
  { kind: 'img', src: '/images/Java.svg',        alt: 'Java' },
  { kind: 'img', src: '/images/Kubernetes.svg',  alt: 'Kubernetes' },
  { kind: 'img', src: '/images/AWS.svg',         alt: 'AWS' },
  { kind: 'img', src: '/images/Azure.svg',       alt: 'Azure' },
  { kind: 'img', src: '/images/Redis.svg',       alt: 'Redis' },
  { kind: 'lucide', Icon: (p) => <Cloud {...p} />,  color: '#FF6044' },
  { kind: 'lucide', Icon: (p) => <Server {...p} />, color: '#9CA3AF' },
];

type TechIcon = TechItem;

const Stack = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef    = useRef<HTMLDivElement>(null);
  const tickerRef  = useRef<HTMLDivElement>(null);
  const trackRef   = useRef<HTMLDivElement>(null);
  const marqueeTween = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      if (textRef.current) {
        const els = Array.from(textRef.current.children);
        gsap.set(els, { opacity: 0, y: 30 });
        gsap.to(els, {
          opacity: 1, y: 0, duration: 0.7, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: textRef.current, start: 'top 80%', once: true },
        });
      }

      if (tickerRef.current) {
        const rows = tickerRef.current.querySelectorAll('[data-ticker-row]');
        gsap.set(rows, { opacity: 0, y: 24 });
        gsap.to(rows, {
          opacity: 1, y: 0, duration: 0.8, stagger: 0.18, ease: 'power3.out',
          scrollTrigger: { trigger: tickerRef.current, start: 'top 85%', once: true },
        });
      }
    }, sectionRef);

    // render 4 copiy of icons
    const startMarquee = () => {
      const track = trackRef.current;
      if (!track) return;
      const singleSetPx = track.scrollWidth / 4;
      marqueeTween.current = gsap.to(track, {
        x: -singleSetPx,
        duration: 22,
        ease: 'none',
        repeat: -1,
        modifiers: {
          x: (x) => `${parseFloat(x) % singleSetPx}px`,
        },
      });
    };

    // Wait two frames so browser has computed layout
    const raf1 = requestAnimationFrame(() => {
      requestAnimationFrame(startMarquee);
    });

    return () => {
      cancelAnimationFrame(raf1);
      marqueeTween.current?.kill();
      ctx.revert();
    };
  }, []);

  const IconCell = ({ item, i }: { item: TechIcon; i: number }) => (
    <div
      key={i}
      className="flex items-center justify-center w-20 h-20 border border-border/50 bg-background/70 backdrop-blur-sm mx-4 shrink-0"
    >
      {item.kind === 'img' ? (
        <Image src={item.src} alt={item.alt} width={40} height={40} className="w-10 h-10 object-contain" />
      ) : (
        <item.Icon className="w-10 h-10" style={{ color: item.color }} />
      )}
    </div>
  );

  return (
    <section ref={sectionRef} className="py-24 lg:py-32 bg-muted/20 relative overflow-hidden">
      <div
        className="absolute inset-0 bg-grid-coral pointer-events-none"
        aria-hidden="true"
        style={{ maskImage: 'radial-gradient(ellipse 85% 65% at 50% 50%, black 20%, transparent 100%)' }}
      />

      <div className="container mx-auto px-6 relative">
        <div ref={textRef} className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-16">
          <div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-foreground leading-tight">
              Speak your stack.<br className="hidden sm:block" /> We handle the rest.
            </h2>
          </div>
          <Link
            href="/docs"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-medium text-sm uppercase tracking-wider hover:bg-primary/90 transition-colors shrink-0"
          >
            View Docs
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      <div ref={tickerRef}>
        <div data-ticker-row className="relative overflow-hidden">
          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-muted/20 to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-muted/20 to-transparent z-10 pointer-events-none" />
          {/* 4 copies — GSAP moves by exactly 1 set width (scrollWidth/4), repeat: -1 */}
          <div ref={trackRef} className="flex w-max">
            {[...allIcons, ...allIcons, ...allIcons, ...allIcons].map((item, i) => <IconCell key={i} item={item} i={i} />)}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Stack;
