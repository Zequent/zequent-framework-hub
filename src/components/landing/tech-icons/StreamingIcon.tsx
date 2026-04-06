'use client';

import { useRef, useEffect, forwardRef } from 'react';
import { gsap } from 'gsap';

interface TechIconProps {
  className?: string;
}

const StreamingIcon = forwardRef<SVGSVGElement, TechIconProps>(
  ({ className = '' }, ref) => {
    const localRef = useRef<SVGSVGElement>(null);
    const svgRef = (ref as React.RefObject<SVGSVGElement>) || localRef;

    useEffect(() => {
      const svg = svgRef.current;
      if (!svg) return;

      const scanline = svg.querySelector('.ds-scan');
      const recDot = svg.querySelector('.ds-rec');
      const bitFlow = svg.querySelectorAll('.ds-bit');
      const bars = svg.querySelectorAll('.ds-bar');
      const feeds = svg.querySelectorAll('.ds-feed');

      if (scanline) {
        gsap.to(scanline, {
          y: 20,
          duration: 2,
          repeat: -1,
          ease: 'none',
        });
      }

      if (recDot) {
        gsap.to(recDot, {
          opacity: 0.1,
          duration: 0.8,
          repeat: -1,
          yoyo: true,
          ease: 'power1.inOut',
        });
      }

      bitFlow.forEach((bit, i) => {
        gsap.fromTo(bit, {
          y: 0,
          opacity: 0,
        }, {
          y: 30,
          opacity: 0.5,
          duration: 1.5 + i * 0.2,
          repeat: -1,
          delay: i * 0.3,
          ease: 'none',
        });
      });

      bars.forEach((bar) => {
        gsap.to(bar, {
          scaleY: 0.3 + Math.random() * 0.7,
          transformOrigin: '50% 100%',
          duration: 0.3 + Math.random() * 0.4,
          repeat: -1,
          yoyo: true,
          ease: 'steps(1)',
        });
      });

      feeds.forEach((feed, i) => {
        gsap.fromTo(feed, { opacity: 0.15 }, {
          opacity: 0.4,
          duration: 0.6,
          delay: i * 0.2,
          repeat: -1,
          yoyo: true,
          ease: 'power1.inOut',
        });
      });

      return () => { gsap.killTweensOf([scanline, recDot, ...Array.from(bitFlow), ...Array.from(bars), ...Array.from(feeds)]); };
    }, []);

    return (
      <svg ref={svgRef} className={className} viewBox="0 0 48 48" fill="none">
        <rect x="3" y="5" width="26" height="20" stroke="currentColor" strokeWidth="0.8" opacity="0.3" rx="0.5" />
        <rect className="ds-scan" x="4" y="6" width="24" height="1" fill="hsl(var(--primary))" opacity="0.08" />
        <line x1="3" y1="9" x2="29" y2="9" stroke="currentColor" strokeWidth="0.3" opacity="0.12" />
        <circle className="ds-rec" cx="6" cy="7.5" r="1" fill="hsl(var(--primary))" opacity="0.7" />
        <text x="8.5" y="8.5" fill="hsl(var(--primary))" fontSize="2.5" opacity="0.3" fontFamily="monospace">LIVE</text>
        <text x="20" y="8.5" fill="currentColor" fontSize="2" opacity="0.15" fontFamily="monospace">1080p</text>
        <rect className="ds-feed" x="5" y="11" width="10" height="7" fill="currentColor" opacity="0.06" rx="0.3" />
        <path d="M 8 13 L 11 14.5 L 8 16 Z" fill="hsl(var(--primary))" opacity="0.25" />
        <rect className="ds-feed" x="17" y="11" width="10" height="7" fill="currentColor" opacity="0.06" rx="0.3" />
        <path d="M 20 13 L 23 14.5 L 20 16 Z" fill="hsl(var(--primary))" opacity="0.2" />
        <text x="6" y="22" fill="currentColor" fontSize="2" opacity="0.12" fontFamily="monospace">CAM-01</text>
        <text x="18" y="22" fill="currentColor" fontSize="2" opacity="0.12" fontFamily="monospace">CAM-02</text>
        <rect x="3" y="28" width="26" height="5" stroke="currentColor" strokeWidth="0.5" opacity="0.15" rx="0.3" />
        <rect className="ds-bar" x="5" y="29.5" width="1.5" height="3" fill="hsl(var(--primary))" opacity="0.4" />
        <rect className="ds-bar" x="8" y="29.5" width="1.5" height="3" fill="hsl(var(--primary))" opacity="0.3" />
        <rect className="ds-bar" x="11" y="29.5" width="1.5" height="3" fill="hsl(var(--primary))" opacity="0.5" />
        <rect className="ds-bar" x="14" y="29.5" width="1.5" height="3" fill="hsl(var(--primary))" opacity="0.35" />
        <rect className="ds-bar" x="17" y="29.5" width="1.5" height="3" fill="hsl(var(--primary))" opacity="0.4" />
        <rect className="ds-bar" x="20" y="29.5" width="1.5" height="3" fill="hsl(var(--primary))" opacity="0.3" />
        <rect className="ds-bar" x="23" y="29.5" width="1.5" height="3" fill="hsl(var(--primary))" opacity="0.45" />
        <rect className="ds-bar" x="26" y="29.5" width="1.5" height="3" fill="hsl(var(--primary))" opacity="0.35" />
        <line x1="33" y1="10" x2="33" y2="32" stroke="currentColor" strokeWidth="0.3" opacity="0.08" strokeDasharray="1 2" />
        <text x="35" y="9" fill="currentColor" fontSize="2" opacity="0.12" fontFamily="monospace">kbps</text>
        <text className="ds-bit" x="35" y="14" fill="hsl(var(--primary))" fontSize="2.5" opacity="0" fontFamily="monospace">01</text>
        <text className="ds-bit" x="37" y="12" fill="hsl(var(--primary))" fontSize="2.5" opacity="0" fontFamily="monospace">10</text>
        <text className="ds-bit" x="36" y="16" fill="hsl(var(--primary))" fontSize="2.5" opacity="0" fontFamily="monospace">11</text>
        <path d="M 35 35 L 37 35 L 37 37 L 39 37 L 39 35 L 41 35 L 41 38 L 43 38 L 43 36 L 45 36" stroke="hsl(var(--primary))" strokeWidth="0.75" fill="none" opacity="0.2" />
        <text x="35" y="42" fill="currentColor" fontSize="2" opacity="0.12" fontFamily="monospace">24.6</text>
        <text x="42" y="42" fill="currentColor" fontSize="2" opacity="0.1" fontFamily="monospace">MB/s</text>
      </svg>
    );
  }
);
StreamingIcon.displayName = 'StreamingIcon';

export default StreamingIcon;
