'use client';

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import Link from 'next/link';

const ROTATING_WORDS = ['COMPUTING', 'CONNECTIVITY', 'CONTROL'];

const HeroV2 = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const badgesRef = useRef<HTMLDivElement>(null);
  const typingRef = useRef<HTMLSpanElement>(null);
  const cursorRef = useRef<HTMLSpanElement>(null);

  // Background vid loop logic
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      if (video.duration && video.currentTime >= video.duration - 0.3) {
        video.currentTime = 0;
        video.play();
      }
    };

    video.addEventListener('timeupdate', handleTimeUpdate);
    return () => video.removeEventListener('timeupdate', handleTimeUpdate);
  }, []);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Intro animation timeline
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      if (headingRef.current) {
        gsap.set(headingRef.current, { opacity: 0, y: 30 });
        tl.to(headingRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.8,
        }, 0.3);
      }

      if (subtitleRef.current) {
        gsap.set(subtitleRef.current, { opacity: 0, y: 20 });
        tl.to(subtitleRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.7,
        }, 0.7);
      }

      if (ctaRef.current) {
        gsap.set(ctaRef.current, { opacity: 0, y: 20 });
        tl.to(ctaRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.6,
        }, 1.0);
      }

      if (badgesRef.current) {
        gsap.set(badgesRef.current, { opacity: 0 });
        tl.to(badgesRef.current, {
          opacity: 1,
          duration: 0.6,
        }, 1.2);
      }

      if (cursorRef.current) {
        gsap.to(cursorRef.current, {
          opacity: 0,
          duration: 0.5,
          repeat: -1,
          yoyo: true,
          ease: 'steps(1)',
        });
      }

      if (typingRef.current) {
        const el = typingRef.current;
        const typeTl = gsap.timeline({ repeat: -1, paused: true });

        ROTATING_WORDS.forEach((word) => {
          for (let i = 1; i <= word.length; i++) {
            const slice = word.slice(0, i);
            typeTl.call(() => { el.textContent = slice; });
            typeTl.to({}, { duration: 0.07 });
          }

          typeTl.to({}, { duration: 2.5 });

          // Delete letter 
          for (let i = word.length - 1; i >= 0; i--) {
            const slice = word.slice(0, i);
            typeTl.call(() => { el.textContent = slice; });
            typeTl.to({}, { duration: 0.035 });
          }

          // Mini pause before next word
          typeTl.to({}, { duration: 0.4 });
        });

        tl.call(() => {
          typeTl.play();
        }, [], 1.4);
      }

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover"
        src="/images/HeroVideo_Zequent_Landingpage.mp4"
      />

      <div className="absolute inset-0 bg-black/60" />

      <div className="container mx-auto px-6 relative z-10 pt-32 pb-20 lg:pt-40 lg:pb-28">
        <div className="hero-content max-w-4xl">
          <h1
            ref={headingRef}
            className="font-soehne font-bold text-white uppercase leading-[1.05] tracking-tight mb-6"
          >
            <span className="block text-5xl sm:text-6xl lg:text-7xl xl:text-8xl">
              TACTICAL
            </span>
            <span className="block text-5xl sm:text-6xl lg:text-7xl xl:text-8xl whitespace-nowrap">
              EDGE{' '}
              <span
                ref={typingRef}
                className="text-primary inline"
              />
              <span
                ref={cursorRef}
                className="inline-block w-[3px] h-[0.85em] bg-primary align-middle ml-0.5 translate-y-[-2px]"
              />
            </span>
          </h1>

          <p
            ref={subtitleRef}
            className="font-soehne text-base sm:text-lg text-white/70 max-w-xl mb-10 leading-relaxed font-light"
          >
            Build and deploy resilient edge systems that operate reliably in
            degraded edge-to-cloud environments.
          </p>

          <div ref={ctaRef} className="flex flex-wrap items-center gap-4">
            <a
              href="#contact"
              className="font-soehne inline-flex items-center gap-2 px-8 py-3.5 bg-primary text-white text-sm font-semibold uppercase tracking-wider hover:bg-primary/90 transition-colors duration-200"
            >
              <span>Schedule a demo</span>
              <img
                src="/images/button_arrow_white.svg"
                alt=""
                className="w-4 h-4"
              />
            </a>
            <Link
              href="/docs/sdk/setup"
              className="font-soehne inline-flex items-center gap-2 px-8 py-3.5 border border-white/30 text-sm font-semibold uppercase tracking-wider text-white hover:bg-white/10 transition-colors duration-200"
            >
              Start for free
            </Link>
          </div>

          <div
            ref={badgesRef}
            className="font-soehne mt-12 flex flex-wrap gap-x-8 gap-y-3 text-sm text-white/40 uppercase tracking-wider"
          >
            <span>Developer-First</span>
            <span>&bull;</span>
            <span>Production-Ready</span>
            <span>&bull;</span>
            <span>Field-Tested</span>
            <span>&bull;</span>
            <span>Engineered in Switzerland</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroV2;
