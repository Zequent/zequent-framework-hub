'use client';

import { useRef, useEffect, forwardRef } from 'react';
import { gsap } from 'gsap';

interface TechIconProps {
  className?: string;
}

const TelemetryIcon = forwardRef<SVGSVGElement, TechIconProps>(
  ({ className = '' }, ref) => {
    const localRef = useRef<SVGSVGElement>(null);
    const svgRef = (ref as React.RefObject<SVGSVGElement>) || localRef;

    useEffect(() => {
      const svg = svgRef.current;
      if (!svg) return;

      const wave = svg.querySelector('.tl-wave') as SVGPathElement;
      const dot = svg.querySelector('.tl-dot');
      const bars = svg.querySelectorAll('.tl-bar');

      if (wave) {
        const len = wave.getTotalLength();
        gsap.set(wave, { strokeDasharray: len, strokeDashoffset: len });
        gsap.to(wave, {
          strokeDashoffset: 0,
          duration: 1.8,
          repeat: -1,
          ease: 'none',
          repeatDelay: 0.6,
        });
      }

      if (dot) {
        gsap.to(dot, {
          motionPath: {
            path: '.tl-wave',
            align: '.tl-wave',
            alignOrigin: [0.5, 0.5],
          },
          duration: 1.8,
          repeat: -1,
          ease: 'none',
          repeatDelay: 0.6,
        });
        gsap.to(dot, {
          opacity: 0.4,
          duration: 0.3,
          yoyo: true,
          repeat: -1,
        });
      }

      bars.forEach((bar, i) => {
        gsap.to(bar, {
          scaleY: 0.3 + Math.random() * 0.7,
          transformOrigin: '50% 100%',
          duration: 0.3 + Math.random() * 0.4,
          yoyo: true,
          repeat: -1,
          delay: i * 0.1,
          ease: 'power1.inOut',
        });
      });

      return () => { gsap.killTweensOf([wave, dot, ...Array.from(bars)]); };
    }, []);

    return (
      <svg ref={svgRef} className={className} viewBox="0 0 48 48" fill="none">
        <path
          className="tl-wave"
          d="M 4 28 L 12 28 L 15 20 L 18 34 L 22 12 L 26 32 L 29 22 L 32 28 L 44 28"
          stroke="hsl(var(--primary))"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle className="tl-dot" cx="4" cy="28" r="2" fill="hsl(var(--primary))" opacity="0.8" />
        <rect className="tl-bar" x="8" y="38" width="2" height="6" fill="currentColor" opacity="0.2" rx="0.5" />
        <rect className="tl-bar" x="13" y="38" width="2" height="8" fill="currentColor" opacity="0.2" rx="0.5" />
        <rect className="tl-bar" x="18" y="38" width="2" height="5" fill="currentColor" opacity="0.2" rx="0.5" />
        <rect className="tl-bar" x="23" y="38" width="2" height="7" fill="currentColor" opacity="0.2" rx="0.5" />
        <rect className="tl-bar" x="28" y="38" width="2" height="4" fill="currentColor" opacity="0.2" rx="0.5" />
        <rect className="tl-bar" x="33" y="38" width="2" height="6" fill="currentColor" opacity="0.2" rx="0.5" />
        <rect className="tl-bar" x="38" y="38" width="2" height="5" fill="currentColor" opacity="0.2" rx="0.5" />
        <line x1="4" y1="28" x2="4" y2="46" stroke="currentColor" strokeWidth="0.5" opacity="0.15" />
        <line x1="4" y1="46" x2="44" y2="46" stroke="currentColor" strokeWidth="0.5" opacity="0.15" />
      </svg>
    );
  }
);
TelemetryIcon.displayName = 'TelemetryIcon';

export default TelemetryIcon;
