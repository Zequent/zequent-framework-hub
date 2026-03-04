'use client';

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);


export function useStaggerReveal(
  containerRef: React.RefObject<HTMLElement | null>,
  selector: string,
  options?: {
    y?: number;
    duration?: number;
    stagger?: number;
    start?: string;
  }
) {
  useEffect(() => {
    if (!containerRef.current) return;

    const els = containerRef.current.querySelectorAll(selector);
    if (!els.length) return;

    gsap.set(els, { opacity: 0, y: options?.y ?? 40 });

    const ctx = gsap.context(() => {
      gsap.to(els, {
        opacity: 1,
        y: 0,
        duration: options?.duration ?? 0.8,
        stagger: options?.stagger ?? 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: options?.start ?? 'top 80%',
          once: true,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, [containerRef, selector, options?.y, options?.duration, options?.stagger, options?.start]);
}


export function useParallax(
  ref: React.RefObject<HTMLElement | null>,
  speed: number = 0.3
) {
  useEffect(() => {
    if (!ref.current) return;

    const ctx = gsap.context(() => {
      gsap.to(ref.current, {
        yPercent: speed * 100,
        ease: 'none',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });
    }, ref);

    return () => ctx.revert();
  }, [ref, speed]);
}


export function useScrollReveal(
  ref: React.RefObject<HTMLElement | null>,
  options?: {
    y?: number;
    x?: number;
    duration?: number;
    delay?: number;
    start?: string;
  }
) {
  useEffect(() => {
    if (!ref.current) return;

    gsap.set(ref.current, {
      opacity: 0,
      y: options?.y ?? 30,
      x: options?.x ?? 0,
    });

    const ctx = gsap.context(() => {
      gsap.to(ref.current, {
        opacity: 1,
        y: 0,
        x: 0,
        duration: options?.duration ?? 0.8,
        delay: options?.delay ?? 0,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: ref.current,
          start: options?.start ?? 'top 85%',
          once: true,
        },
      });
    }, ref);

    return () => ctx.revert();
  }, [ref, options?.y, options?.x, options?.duration, options?.delay, options?.start]);
}


export function useTextReveal(ref: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;
    const text = el.textContent || '';
    
    // Preserve original HTML for cleanup
    const originalHTML = el.innerHTML;

    // Split into words, then chars (preserving word boundaries)
    const words = text.split(' ');
    el.innerHTML = words
      .map(
        (word) =>
          `<span class="inline-block"><span class="inline-block">${word
            .split('')
            .map((char) => `<span class="inline-block gsap-char">${char}</span>`)
            .join('')}</span></span>`
      )
      .join('<span class="inline-block">&nbsp;</span>');

    const chars = el.querySelectorAll('.gsap-char');

    gsap.set(chars, { opacity: 0, y: 20 });

    const ctx = gsap.context(() => {
      gsap.to(chars, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.02,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          once: true,
        },
      });
    }, el);

    return () => {
      ctx.revert();
      el.innerHTML = originalHTML;
    };
  }, [ref]);
}
