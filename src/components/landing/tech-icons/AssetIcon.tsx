'use client';

import { useRef, useEffect, forwardRef } from 'react';
import { gsap } from 'gsap';

interface TechIconProps {
  className?: string;
}

const AssetIcon = forwardRef<SVGSVGElement, TechIconProps>(
  ({ className = '' }, ref) => {
    const localRef = useRef<SVGSVGElement>(null);
    const svgRef = (ref as React.RefObject<SVGSVGElement>) || localRef;

    useEffect(() => {
      const svg = svgRef.current;
      if (!svg) return;

      const actions = svg.querySelectorAll('.as-action');
      const gear = svg.querySelector('.as-gear');
      const highlight = svg.querySelector('.as-highlight');

      actions.forEach((a, i) => {
        gsap.fromTo(a, { scale: 0, transformOrigin: '50% 50%' }, {
          scale: 1,
          duration: 0.4,
          delay: 0.3 + i * 0.12,
          ease: 'back.out(2)',
        });
      });

      if (gear) {
        gsap.to(gear, {
          rotation: 360,
          transformOrigin: '50% 50%',
          duration: 12,
          repeat: -1,
          ease: 'none',
        });
      }

      if (highlight) {
        gsap.to(highlight, {
          attr: { y1: 42, y2: 42 },
          duration: 2.5,
          repeat: -1,
          ease: 'none',
        });
      }

      return () => { gsap.killTweensOf([...Array.from(actions), gear, highlight]); };
    }, []);

    return (
      <svg ref={svgRef} className={className} viewBox="0 0 48 48" fill="none">
        <rect x="14" y="12" width="20" height="24" stroke="currentColor" strokeWidth="1.2" opacity="0.4" rx="2" />
        <rect x="17" y="15" width="14" height="5" stroke="currentColor" strokeWidth="0.5" opacity="0.15" rx="0.5" />
        <circle cx="20" cy="17.5" r="1.2" stroke="currentColor" strokeWidth="0.5" fill="none" opacity="0.2" />
        <line x1="23" y1="16.5" x2="29" y2="16.5" stroke="currentColor" strokeWidth="0.4" opacity="0.15" />
        <line x1="23" y1="18.5" x2="27" y2="18.5" stroke="currentColor" strokeWidth="0.4" opacity="0.1" />
        <line x1="18" y1="12" x2="18" y2="9" stroke="currentColor" strokeWidth="0.8" opacity="0.2" />
        <line x1="24" y1="12" x2="24" y2="9" stroke="currentColor" strokeWidth="0.8" opacity="0.2" />
        <line x1="30" y1="12" x2="30" y2="9" stroke="currentColor" strokeWidth="0.8" opacity="0.2" />
        <line x1="18" y1="36" x2="18" y2="39" stroke="currentColor" strokeWidth="0.8" opacity="0.2" />
        <line x1="24" y1="36" x2="24" y2="39" stroke="currentColor" strokeWidth="0.8" opacity="0.2" />
        <line x1="30" y1="36" x2="30" y2="39" stroke="currentColor" strokeWidth="0.8" opacity="0.2" />
        <line className="as-highlight" x1="15" y1="12" x2="33" y2="12" stroke="hsl(var(--primary))" strokeWidth="0.5" opacity="0.1" />
        <g className="as-gear">
          <path d="M 36.5 26 L 38 25 L 38 23 L 36.5 22 L 36.5 20 L 38 19 L 37 17.5 L 35 18 L 33.5 17 L 33.5 15 L 32 14.5 L 31 16 L 29.5 16 L 28.5 14.5 L 27 15 L 27 17 L 25.5 18 L 24 17.5 L 23 19 L 24.5 20 L 24.5 22 L 23 23 L 23 25 L 24.5 26 L 24 27.5 L 25.5 28.5 L 27 27.5 L 28.5 28.5 L 28.5 30 L 30 30.5 L 31 29 L 32.5 29 L 33.5 30.5 L 35 30 L 35 28 L 36.5 27.5 Z" stroke="hsl(var(--primary))" strokeWidth="0.8" fill="none" opacity="0.35" />
          <circle cx="30.5" cy="22.5" r="3" stroke="hsl(var(--primary))" strokeWidth="0.6" fill="none" opacity="0.25" />
        </g>
        <g className="as-action">
          <circle cx="6" cy="14" r="4" stroke="hsl(var(--primary))" strokeWidth="0.8" fill="none" opacity="0.35" />
          <line x1="6" y1="11.5" x2="6" y2="16.5" stroke="hsl(var(--primary))" strokeWidth="1" opacity="0.6" />
          <line x1="3.5" y1="14" x2="8.5" y2="14" stroke="hsl(var(--primary))" strokeWidth="1" opacity="0.6" />
        </g>
        <g className="as-action">
          <circle cx="42" cy="14" r="4" stroke="currentColor" strokeWidth="0.8" fill="none" opacity="0.25" />
          <path d="M 40 16 L 44 12 L 43 11 L 39 15 Z" stroke="hsl(var(--primary))" strokeWidth="0.8" fill="none" opacity="0.5" />
          <line x1="39" y1="16.5" x2="41" y2="16.5" stroke="hsl(var(--primary))" strokeWidth="0.6" opacity="0.4" />
        </g>
        <g className="as-action">
          <circle cx="6" cy="36" r="4" stroke="currentColor" strokeWidth="0.8" fill="none" opacity="0.25" />
          <path d="M 3.8 36 L 5.3 38 L 8.2 34" stroke="hsl(var(--primary))" strokeWidth="1.2" fill="none" opacity="0.6" strokeLinecap="round" strokeLinejoin="round" />
        </g>
        <g className="as-action">
          <circle cx="42" cy="36" r="4" stroke="currentColor" strokeWidth="0.8" fill="none" opacity="0.25" />
          <line x1="39.5" y1="33.5" x2="44.5" y2="38.5" stroke="hsl(var(--primary))" strokeWidth="1" opacity="0.5" />
          <line x1="44.5" y1="33.5" x2="39.5" y2="38.5" stroke="hsl(var(--primary))" strokeWidth="1" opacity="0.5" />
        </g>
      </svg>
    );
  }
);
AssetIcon.displayName = 'AssetIcon';

export default AssetIcon;
