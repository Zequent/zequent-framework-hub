'use client';

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const TestimonialsV2 = () => {
  const frameRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!frameRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from(frameRef.current, {
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: frameRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className="relative bg-zequent-black py-24 lg:py-32 overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)',
          backgroundSize: '120px 120px',
          maskImage: 'linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)',
        }}
      />
      <div className="container mx-auto px-6 relative">
        <div ref={frameRef} className="bg-zequent-black border border-white/10 p-12 lg:p-16">
          <div className="mb-4 opacity-70 overflow-hidden relative" style={{ height: '72px', width: '320px' }}>
            <img
              src="/images/Logo_M4Com.svg"
              alt="M4Com"
              style={{
                position: 'absolute',
                width: '700px',
                height: 'auto',
                top: '50%',
                left: '-60px',
                transform: 'translateY(-50%)',
              }}
            />
          </div>
          <blockquote className="font-soehne text-base sm:text-lg lg:text-xl font-medium text-white leading-relaxed mb-10">
            &ldquo;Zequent has enabled us to deliver capabilities much faster with a very lean engineering team. Its flexibility and reliability have scaled to meet our rapidly evolving needs. After using their technology over the last year, I&rsquo;m convinced Zequent is the future of tactical edge computing.&rdquo;
          </blockquote>
          <p className="font-soehne text-base text-white/40">
            Tim Müller, Business Development at M4Com
          </p>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsV2;
