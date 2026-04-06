'use client';

import { useRef, useEffect, forwardRef } from 'react';
import { gsap } from 'gsap';

interface TechIconProps {
  className?: string;
}

const MissionIcon = forwardRef<SVGSVGElement, TechIconProps>(
  ({ className = '' }, ref) => {
    const localRef = useRef<SVGSVGElement>(null);
    const svgRef = (ref as React.RefObject<SVGSVGElement>) || localRef;

    useEffect(() => {
      const svg = svgRef.current;
      if (!svg) return;

      const route = svg.querySelector('.ms-route') as SVGPathElement;
      const craft = svg.querySelector('.ms-craft');
      const waypoints = svg.querySelectorAll('.ms-wp');
      const scanRing = svg.querySelector('.ms-scan');

      if (route) {
        const len = route.getTotalLength();
        gsap.set(route, { strokeDasharray: `${len * 0.15} ${len * 0.85}` });
        gsap.to(route, {
          strokeDashoffset: -len,
          duration: 4,
          repeat: -1,
          ease: 'none',
        });
      }

      if (craft) {
        gsap.to(craft, {
          motionPath: {
            path: '.ms-route',
            align: '.ms-route',
            alignOrigin: [0.5, 0.5],
            autoRotate: true,
          },
          duration: 4,
          repeat: -1,
          ease: 'none',
        });
      }

      waypoints.forEach((wp, i) => {
        gsap.to(wp, {
          scale: 1.4,
          opacity: 1,
          transformOrigin: '50% 50%',
          duration: 0.6,
          yoyo: true,
          repeat: -1,
          delay: i * 0.8,
          ease: 'power1.inOut',
        });
      });

      if (scanRing) {
        gsap.to(scanRing, {
          scale: 2.5,
          opacity: 0,
          transformOrigin: '50% 50%',
          duration: 2,
          repeat: -1,
          ease: 'power1.out',
        });
      }

      return () => { gsap.killTweensOf([route, craft, ...Array.from(waypoints), scanRing]); };
    }, []);

    return (
      <svg ref={svgRef} className={className} viewBox="0 0 48 48" fill="none">
        <rect x="2" y="2" width="44" height="44" stroke="currentColor" strokeWidth="0.5" opacity="0.1" />
        <line x1="16" y1="2" x2="16" y2="46" stroke="currentColor" strokeWidth="0.3" opacity="0.08" />
        <line x1="32" y1="2" x2="32" y2="46" stroke="currentColor" strokeWidth="0.3" opacity="0.08" />
        <line x1="2" y1="16" x2="46" y2="16" stroke="currentColor" strokeWidth="0.3" opacity="0.08" />
        <line x1="2" y1="32" x2="46" y2="32" stroke="currentColor" strokeWidth="0.3" opacity="0.08" />
        <path
          className="ms-route"
          d="M 8 40 L 8 28 L 20 16 L 36 16 L 36 8 L 42 8"
          stroke="hsl(var(--primary))"
          strokeWidth="1.2"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.6"
        />
        <path
          d="M 8 40 L 8 28 L 20 16 L 36 16 L 36 8 L 42 8"
          stroke="currentColor"
          strokeWidth="0.5"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.2"
          strokeDasharray="2 3"
        />
        <circle className="ms-wp" cx="8" cy="40" r="2.5" stroke="hsl(var(--primary))" strokeWidth="1" fill="none" opacity="0.6" />
        <circle className="ms-wp" cx="20" cy="16" r="2" stroke="hsl(var(--primary))" strokeWidth="1" fill="none" opacity="0.5" />
        <circle className="ms-wp" cx="36" cy="8" r="2" stroke="hsl(var(--primary))" strokeWidth="1" fill="none" opacity="0.5" />
        <circle className="ms-wp" cx="42" cy="8" r="2.5" stroke="hsl(var(--primary))" strokeWidth="1" fill="hsl(var(--primary))" fillOpacity="0.15" opacity="0.6" />
        <circle className="ms-scan" cx="42" cy="8" r="3" stroke="hsl(var(--primary))" strokeWidth="0.5" fill="none" opacity="0.4" />
        <polygon className="ms-craft" points="-2,0 2,0 0,-4" fill="hsl(var(--primary))" opacity="0.9" />
        <text x="10" y="43" fill="currentColor" fontSize="3" opacity="0.2" fontFamily="monospace">START</text>
        <text x="38" y="14" fill="currentColor" fontSize="3" opacity="0.2" fontFamily="monospace">END</text>
      </svg>
    );
  }
);
MissionIcon.displayName = 'MissionIcon';

export default MissionIcon;
