'use client';

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import StackIcon from 'tech-stack-icons';

gsap.registerPlugin(ScrollTrigger);

const allIcons = [
  { name: 'python',      label: 'Python',       variant: 'grayscale' },
  { name: 'go',         label: 'Go',           variant: 'grayscale' },
  { name: 'docker',     label: 'Docker',       variant: 'grayscale' },
  { name: 'java',       label: 'Java',         variant: 'grayscale' },
  { name: 'kubernetes', label: 'Kubernetes',   variant: 'grayscale' },
  { name: 'aws',        label: 'AWS',          variant: 'grayscale' },
  { name: 'azure',      label: 'Azure',        variant: 'grayscale' },
  { name: 'redis',      label: 'Redis',        variant: 'grayscale' },
  { name: 'github',     label: 'GitHub',       variant: 'dark' },
  { name: 'gitlab',     label: 'GitLab',       variant: 'grayscale' },
  { name: 'linux',      label: 'Linux',        variant: 'grayscale' },
  { name: 'raspberrypi',label: 'Raspberry Pi', variant: 'grayscale' },
  { name: 'windows11',  label: 'Windows 11',   variant: 'grayscale' },
  { name: 'gcloud',     label: 'Google Cloud', variant: 'grayscale' },
  { name: 'grafana',    label: 'Grafana',      variant: 'grayscale' },
] as const;

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
      const singleSetPx = track.scrollWidth / 2;
      marqueeTween.current = gsap.fromTo(track,
        { x: 0 },
        {
          x: -singleSetPx,
          duration: 22,
          ease: 'none',
          repeat: -1,
        }
      );
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

  const IconCell = ({ item, i }: { item: typeof allIcons[number]; i: number }) => (
    <div
      key={i}
      className="flex items-center justify-center w-24 h-24 mx-3 shrink-0"
      style={{ background: 'rgba(200, 50, 20, 0.28)' }}
    >
      <StackIcon
        name={item.name}
        variant={item.variant}
        className="w-12 h-12"
        style={{ filter: 'brightness(1.45) contrast(1.08)' }}
      />
    </div>
  );

  return (
    <section
      ref={sectionRef}
      className="py-24 lg:py-32 relative overflow-hidden"
      style={{ background: 'linear-gradient(105deg, #0A0A0A 0%, #0A0A0A 20%, #1b100f 34%, #3b1c18 50%, #663027 64%, #8a3b2d 76%, #b84b37 88%, #cf543d 100%)' }}
    >

      <div className="flex items-center">

        <div
          ref={textRef}
          className="relative shrink-0 flex items-center pl-6 lg:pl-16 pr-20 lg:pr-28 z-10"
        >
          <h2 className="font-soehne text-3xl sm:text-4xl lg:text-5xl font-light text-white leading-tight whitespace-nowrap">
            Speak your stack.<br /> We handle the rest.
          </h2>
        </div>

        <div
          ref={tickerRef}
          className="flex-1 overflow-hidden relative"
          style={{
            maskImage: 'linear-gradient(to right, transparent 0%, black 25%)',
            WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 25%)',
          }}
        >
          <div ref={trackRef} className="flex">
            {[...allIcons, ...allIcons].map((item, i) => (
              <IconCell key={i} item={item} i={i} />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default Stack;
