'use client';

import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const ScheduleDemoV2 = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [demoHover, setDemoHover] = useState(false);
  const [freeHover, setFreeHover] = useState(false);

  useEffect(() => {
    if (!contentRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from(contentRef.current!.children, {
        opacity: 0,
        y: 28,
        duration: 0.7,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: contentRef.current,
          start: 'top 82%',
          toggleActions: 'play none none none',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-zequent-black overflow-hidden"
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(255,255,255,0.07) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.07) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }}
      />

      <div className="relative flex items-center justify-center px-6 py-32 lg:py-40">
        <div
          className="w-full max-w-2xl rounded-sm px-12 py-16 text-center"
          style={{
            background: '#050505',
            border: '1px solid rgba(255,255,255,0.06)',
            boxShadow: '0 0 40px 12px rgba(210,210,230,0.04), 0 0 100px 30px rgba(200,200,220,0.03), 0 0 180px 60px rgba(180,180,210,0.02)',
          }}
        >
          <div ref={contentRef}>
            <h2 className="font-soehne text-3xl sm:text-4xl lg:text-5xl font-light text-white leading-[1.1] tracking-tight mb-4">
              Start building with Zequent
            </h2>
            <p className="font-soehne text-base sm:text-lg text-white/40 mb-10">
              Build, deploy and run tactical edge systems
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="/contact"
                className="relative inline-flex items-center gap-2 px-7 py-3 font-soehne text-sm font-medium uppercase tracking-widest overflow-hidden"
                style={{
                  background: '#ffffff',
                  color: demoHover ? '#ffffff' : '#8B3A2A',
                  transition: 'color 0.15s ease 0.18s',
                }}
                onMouseEnter={() => setDemoHover(true)}
                onMouseLeave={() => setDemoHover(false)}
              >
                <span
                  className="absolute inset-0"
                  style={{
                    background: '#8B3A2A',
                    transform: demoHover ? 'scaleX(1)' : 'scaleX(0)',
                    transformOrigin: demoHover ? 'left' : 'right',
                    transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  }}
                />
                <span className="relative z-10 flex items-center gap-2">
                  Schedule a Demo
                  <ArrowRight className="w-4 h-4" />
                </span>
              </a>
              <a
                href="#"
                className="relative inline-flex items-center px-7 py-3 font-soehne text-sm font-medium uppercase tracking-widest overflow-hidden"
                style={{
                  color: freeHover ? '#ffffff' : 'rgba(255,255,255,0.55)',
                  transition: 'color 0.3s ease',
                }}
                onMouseEnter={() => setFreeHover(true)}
                onMouseLeave={() => setFreeHover(false)}
              >
                Start for Free
                <span
                  className="absolute bottom-0 left-0 h-px w-full"
                  style={{
                    background: '#ffffff',
                    transform: freeHover ? 'scaleX(1)' : 'scaleX(0)',
                    transformOrigin: 'left',
                    transition: 'transform 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
                  }}
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ScheduleDemoV2;
