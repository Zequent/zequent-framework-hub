'use client';

import { useRef, useEffect, forwardRef } from 'react';
import { gsap } from 'gsap';

interface TechIconProps {
  className?: string;
}

const DetectionIcon = forwardRef<SVGSVGElement, TechIconProps>(
  ({ className = '' }, ref) => {
    const localRef = useRef<SVGSVGElement>(null);
    const svgRef = (ref as React.RefObject<SVGSVGElement>) || localRef;

    useEffect(() => {
      const svg = svgRef.current;
      if (!svg) return;

      const sweep = svg.querySelector('.dt-sweep');
      const reticle = svg.querySelector('.dt-reticle');
      const brackets = svg.querySelectorAll('.dt-bracket');
      const iris = svg.querySelector('.dt-iris');
      const pulseRing = svg.querySelector('.dt-pulse');

      if (sweep) {
        gsap.to(sweep, {
          rotation: 360,
          transformOrigin: '24px 24px',
          duration: 3,
          repeat: -1,
          ease: 'none',
        });
      }

      if (reticle) {
        gsap.to(reticle, {
          scale: 0.85,
          transformOrigin: '50% 50%',
          duration: 1.5,
          yoyo: true,
          repeat: -1,
          ease: 'sine.inOut',
        });
      }

      brackets.forEach((b, i) => {
        gsap.to(b, {
          opacity: 0.8,
          duration: 0.4,
          yoyo: true,
          repeat: -1,
          delay: i * 0.3,
          ease: 'power1.inOut',
        });
      });

      if (iris) {
        gsap.to(iris, {
          scale: 0.7,
          transformOrigin: '50% 50%',
          duration: 2,
          yoyo: true,
          repeat: -1,
          ease: 'sine.inOut',
        });
      }

      if (pulseRing) {
        gsap.to(pulseRing, {
          scale: 1.8,
          opacity: 0,
          transformOrigin: '50% 50%',
          duration: 1.5,
          repeat: -1,
          ease: 'power1.out',
        });
      }

      return () => { gsap.killTweensOf([sweep, reticle, ...Array.from(brackets), iris, pulseRing]); };
    }, []);

    return (
      <svg ref={svgRef} className={className} viewBox="0 0 48 48" fill="none">
        <circle cx="24" cy="24" r="14" stroke="currentColor" strokeWidth="0.5" opacity="0.12" />
        <circle cx="24" cy="24" r="10" stroke="currentColor" strokeWidth="1" opacity="0.25" />
        <g className="dt-sweep">
          <path d="M 24 24 L 24 10 A 14 14 0 0 1 37 19 Z" fill="hsl(var(--primary))" opacity="0.08" />
          <line x1="24" y1="24" x2="24" y2="10" stroke="hsl(var(--primary))" strokeWidth="0.75" opacity="0.4" />
        </g>
        <g className="dt-reticle">
          <line x1="24" y1="17" x2="24" y2="20" stroke="hsl(var(--primary))" strokeWidth="1" opacity="0.6" />
          <line x1="24" y1="28" x2="24" y2="31" stroke="hsl(var(--primary))" strokeWidth="1" opacity="0.6" />
          <line x1="17" y1="24" x2="20" y2="24" stroke="hsl(var(--primary))" strokeWidth="1" opacity="0.6" />
          <line x1="28" y1="24" x2="31" y2="24" stroke="hsl(var(--primary))" strokeWidth="1" opacity="0.6" />
        </g>
        <g className="dt-iris">
          <circle cx="24" cy="24" r="4" stroke="hsl(var(--primary))" strokeWidth="1.5" fill="none" opacity="0.5" />
          <circle cx="24" cy="24" r="1.5" fill="hsl(var(--primary))" opacity="0.7" />
        </g>
        <circle className="dt-pulse" cx="24" cy="24" r="5" stroke="hsl(var(--primary))" strokeWidth="0.5" fill="none" opacity="0.3" />
        <path className="dt-bracket" d="M 8 14 L 8 8 L 14 8" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.2" />
        <path className="dt-bracket" d="M 40 14 L 40 8 L 34 8" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.2" />
        <path className="dt-bracket" d="M 8 34 L 8 40 L 14 40" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.2" />
        <path className="dt-bracket" d="M 40 34 L 40 40 L 34 40" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.2" />
        <text x="10" y="44" fill="hsl(var(--primary))" fontSize="3" opacity="0.25" fontFamily="monospace">SCAN</text>
        <text x="32" y="44" fill="currentColor" fontSize="3" opacity="0.15" fontFamily="monospace">96%</text>
      </svg>
    );
  }
);
DetectionIcon.displayName = 'DetectionIcon';

export default DetectionIcon;
