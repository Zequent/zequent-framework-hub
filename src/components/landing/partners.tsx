'use client';

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

const logos = [
  { src: '/images/logo-polizei-stuttgart.svg', alt: 'Polizei Stuttgart' },
  { src: '/images/logo-polizei-munchen.svg', alt: 'Polizei München' },
  { src: '/images/logo-nci.svg', alt: 'NCI Agency' },
  { src: '/images/logo-bundeswehr.svg', alt: 'Bundeswehr' },
];

const Partners = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !trackRef.current || !labelRef.current) return;

    const items = trackRef.current.querySelectorAll('[data-logo]');
    const dividers = trackRef.current.querySelectorAll('[data-divider]');

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 85%',
          once: true,
        },
      });

      // label type in
      gsap.set(labelRef.current, { opacity: 0 });
      tl.to(labelRef.current, {
        opacity: 1,
        duration: 0.4,
        ease: 'power1.out',
      });

      // logo scaling and fade in
      gsap.set(items, { opacity: 0, scale: 0.6 });
      tl.to(items, {
        opacity: 1,
        scale: 1,
        duration: 0.7,
        stagger: 0.08,
        ease: 'power4.out',
      }, '-=0.1');

      gsap.set(dividers, { scaleY: 0 });
      tl.to(dividers, {
        scaleY: 1,
        duration: 0.4,
        stagger: 0.06,
        ease: 'power2.out',
      }, '-=0.3');
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-16 lg:py-24 border-b border-border/50">
      <div className="container mx-auto px-6">
        <div className="flex flex-col items-center gap-12">
          <p
            ref={labelRef}
            className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground/50"
          >
            Trusted by major public safety and defense institutions
          </p>

          <div
            ref={trackRef}
            className="grid grid-cols-2 md:grid-cols-4 w-full"
          >
            {logos.map((logo, i) => (
              <div key={logo.alt} className="flex items-center">
                <div
                  data-logo
                  className="flex items-center justify-center w-full py-6 px-4"
                >
                  <Image
                    src={logo.src}
                    alt={logo.alt}
                    width={500}
                    height={500}
                    className="w-full max-w-[220px] sm:max-w-[260px] lg:max-w-[300px] h-auto object-contain"
                  />
                </div>
                {i < logos.length - 1 && (
                  <div
                    data-divider
                    className="hidden md:block w-px h-24 bg-border/50 origin-center shrink-0"
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Partners;
