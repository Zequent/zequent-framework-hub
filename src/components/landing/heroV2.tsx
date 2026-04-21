'use client';

import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import Link from 'next/link';

const ROTATING_WORDS = ['COMPUTING', 'CONNECTIVITY', 'CONTROL'];

const HeroV2 = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const videoARef = useRef<HTMLVideoElement>(null);
  const videoBRef = useRef<HTMLVideoElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const [demoHover, setDemoHover] = useState(false);
  const badgesRef = useRef<HTMLDivElement>(null);
  const typingRef = useRef<HTMLSpanElement>(null);
  const cursorRef = useRef<HTMLSpanElement>(null);

  // Background vid loop logic
  useEffect(() => {
    const videoA = videoARef.current;
    const videoB = videoBRef.current;
    if (!videoA || !videoB) return;

    // dual video approach for getting perfect loop animation without any flashes or stutters during the loop point
    const CROSSFADE = 0.8;
    let active: HTMLVideoElement = videoA;
    let standby: HTMLVideoElement = videoB;

    standby.pause();
    standby.currentTime = 0;
    standby.style.opacity = '0';
    active.style.opacity = '1';

    let rafId: number;
    let swapping = false;

    const tick = () => {
      if (active.duration && !swapping) {
        const remaining = active.duration - active.currentTime;
        if (remaining <= CROSSFADE) {
          swapping = true;
          standby.currentTime = 0;
          standby.play();

          gsap.to(standby, { opacity: 1, duration: CROSSFADE * 0.8, ease: 'none' });
          gsap.to(active, {
            opacity: 0,
            duration: CROSSFADE * 0.8,
            ease: 'none',
            onComplete: () => {
              const prev = active;
              active = standby;
              standby = prev;
              standby.pause();
              standby.currentTime = 0;
              swapping = false;
            },
          });
        }
      }
      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
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
        ref={videoARef}
        autoPlay
        muted
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover"
        src="/images/HeroVideo_Zequent_Landingpage.mp4"
      />
      <video
        ref={videoBRef}
        muted
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ opacity: 0 }}
        src="/images/HeroVideo_Zequent_Landingpage.mp4"
      />

      <div className="absolute inset-0 bg-black/60" />

      <div className="container mx-auto px-6 relative z-10 pt-32 pb-20 lg:pt-40 lg:pb-28">
        <div className="hero-content max-w-4xl">
          <h1
            ref={headingRef}
            className="font-soehne font-bold text-white uppercase leading-[1.05] tracking-tight mb-6"
          >
            <span className="block font-medium text-5xl sm:text-6xl lg:text-7xl xl:text-8xl">
              TACTICAL
            </span>
            <span className="block font-medium text-5xl sm:text-6xl lg:text-7xl xl:text-8xl whitespace-nowrap">
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
              href="/contact"
              className="relative font-soehne inline-flex items-center gap-2 px-8 py-3.5 text-sm font-semibold uppercase tracking-wider overflow-hidden"
              style={{
                background: '#8B3A2A',
                color: demoHover ? '#8B3A2A' : '#ffffff',
                transition: 'color 0.15s ease 0.18s',
              }}
              onMouseEnter={() => setDemoHover(true)}
              onMouseLeave={() => setDemoHover(false)}
            >
              <span
                className="absolute inset-0"
                style={{
                  background: '#ffffff',
                  transform: demoHover ? 'scaleX(1)' : 'scaleX(0)',
                  transformOrigin: demoHover ? 'left' : 'right',
                  transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                }}
              />
              <span className="relative z-10 flex items-center gap-2">
                Schedule a demo
                <img
                  src="/images/button_arrow_white.svg"
                  alt=""
                  className="w-4 h-4"
                  style={{ filter: demoHover ? 'brightness(0) saturate(100%) invert(24%) sepia(54%) saturate(600%) hue-rotate(330deg)' : 'brightness(0) invert(1)' }}
                />
              </span>
            </a>
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
