'use client';

import { useRef, useEffect, forwardRef } from 'react';
import { gsap } from 'gsap';

interface TechIconProps {
  className?: string;
}

const RemoteControlIcon = forwardRef<SVGSVGElement, TechIconProps>(
  ({ className = '' }, ref) => {
    const localRef = useRef<SVGSVGElement>(null);
    const svgRef = (ref as React.RefObject<SVGSVGElement>) || localRef;

    useEffect(() => {
      const svg = svgRef.current;
      if (!svg) return;

      const signals = svg.querySelectorAll('.rc-signal');
      const stick = svg.querySelector('.rc-stick');
      const pulse = svg.querySelector('.rc-pulse');

      const tl = gsap.timeline({ repeat: -1, repeatDelay: 1.5 });

      tl.fromTo(signals, {
        opacity: 0,
        scale: 0.6,
        transformOrigin: '50% 100%',
      }, {
        opacity: 1,
        scale: 1,
        duration: 0.5,
        stagger: 0.15,
        ease: 'power2.out',
      });

      tl.to(signals, {
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power1.in',
      }, '+=0.8');

      gsap.to(stick, {
        rotation: 8,
        transformOrigin: '50% 100%',
        duration: 1.2,
        yoyo: true,
        repeat: -1,
        ease: 'sine.inOut',
      });

      if (pulse) {
        gsap.to(pulse, {
          opacity: 0.8,
          scale: 1.3,
          transformOrigin: '50% 50%',
          duration: 0.8,
          yoyo: true,
          repeat: -1,
          ease: 'sine.inOut',
        });
      }

      return () => { gsap.killTweensOf([signals, stick, pulse]); };
    }, []);

    return (
      <svg ref={svgRef} className={className} viewBox="0 0 48 48" fill="none">
        <rect x="14" y="30" width="20" height="10" rx="1" stroke="currentColor" strokeWidth="1.5" opacity="0.5" />
        <rect x="18" y="33" width="12" height="4" fill="currentColor" opacity="0.08" />
        <g className="rc-stick">
          <line x1="24" y1="30" x2="24" y2="16" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="24" cy="14" r="3" stroke="currentColor" strokeWidth="1.5" fill="none" />
          <circle className="rc-pulse" cx="24" cy="14" r="1.2" fill="hsl(var(--primary))" opacity="0.5" />
        </g>
        <path className="rc-signal" d="M 16 12 A 10 10 0 0 1 24 8" stroke="hsl(var(--primary))" strokeWidth="1" fill="none" opacity="0" strokeLinecap="round" />
        <path className="rc-signal" d="M 13 14 A 14 14 0 0 1 24 5" stroke="hsl(var(--primary))" strokeWidth="0.75" fill="none" opacity="0" strokeLinecap="round" />
        <path className="rc-signal" d="M 32 12 A 10 10 0 0 0 24 8" stroke="hsl(var(--primary))" strokeWidth="1" fill="none" opacity="0" strokeLinecap="round" />
        <path className="rc-signal" d="M 35 14 A 14 14 0 0 0 24 5" stroke="hsl(var(--primary))" strokeWidth="0.75" fill="none" opacity="0" strokeLinecap="round" />
        <line x1="17" y1="36" x2="19" y2="36" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
        <line x1="29" y1="36" x2="31" y2="36" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
      </svg>
    );
  }
);
RemoteControlIcon.displayName = 'RemoteControlIcon';

export default RemoteControlIcon;
