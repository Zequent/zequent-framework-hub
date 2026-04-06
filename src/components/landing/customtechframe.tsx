'use client';

import { forwardRef } from 'react';

// Asymmetric HUD frame
const TechFrame = forwardRef<HTMLDivElement, { className?: string }>(
  ({ className = '' }, ref) => {
    return (
      <div
        ref={ref}
        className={`absolute inset-0 pointer-events-none ${className}`}
        style={{ color: 'hsl(var(--foreground))' }}
        aria-hidden="true"
      >
        <svg
          className="absolute top-0 left-0 overflow-visible"
          width="80" height="80"
          viewBox="0 0 80 80"
          fill="none"
        >
          <path
            className="frame-line"
            d="M 2 80 L 2 20 L 20 2 L 80 2"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="square"
          />
          <path
            className="frame-line-inner"
            d="M 8 54 L 8 24 L 24 8 L 54 8"
            stroke="currentColor"
            strokeWidth="1"
            opacity="0.55"
          />
          <path
            className="frame-line-inner"
            d="M 13 34 L 13 27 L 27 13 L 34 13"
            stroke="currentColor"
            strokeWidth="0.75"
            opacity="0.35"
          />
          <path
            d="M 8 20 L 20 8 L 27 15 L 15 27 Z"
            fill="currentColor"
            opacity="0.1"
          />
          <rect x="15" y="15" width="7" height="7" fill="currentColor" opacity="0.18" />
          <rect x="15" y="25" width="4" height="4" fill="currentColor" opacity="0.1" />
          <rect x="25" y="15" width="4" height="4" fill="currentColor" opacity="0.1" />
          <line x1="18.5" y1="12" x2="18.5" y2="28"  stroke="currentColor" strokeWidth="0.5"  opacity="0.12" />
          <line x1="12"   y1="18.5" x2="28"  y2="18.5" stroke="currentColor" strokeWidth="0.5" opacity="0.12" />
          <line x1="32" y1="0" x2="32" y2="8"  stroke="currentColor" strokeWidth="1.2" opacity="0.5" />
          <line x1="44" y1="0" x2="44" y2="6"  stroke="currentColor" strokeWidth="1"   opacity="0.35" />
          <line x1="56" y1="0" x2="56" y2="5"  stroke="currentColor" strokeWidth="0.75" opacity="0.25" />
          <line x1="66" y1="0" x2="66" y2="4"  stroke="currentColor" strokeWidth="0.75" opacity="0.15" />
          <line x1="0" y1="32" x2="8" y2="32"  stroke="currentColor" strokeWidth="1.2" opacity="0.5" />
          <line x1="0" y1="44" x2="6" y2="44"  stroke="currentColor" strokeWidth="1"   opacity="0.35" />
          <line x1="0" y1="56" x2="5" y2="56"  stroke="currentColor" strokeWidth="0.75" opacity="0.25" />
          <line x1="0" y1="66" x2="4" y2="66"  stroke="currentColor" strokeWidth="0.75" opacity="0.15" />
        </svg>

        <div
          className="frame-edge-h absolute top-[1px] left-[80px] h-[2px] origin-left"
          style={{
            width: 'calc(60% - 80px)',
            background: 'linear-gradient(to right, currentColor 30%, transparent)',
            opacity: 0.4,
          }}
        />

        <div
          className="frame-edge-v absolute top-[80px] left-[1px] w-[2px] origin-top"
          style={{
            height: 'calc(50% - 80px)',
            background: 'linear-gradient(to bottom, currentColor 30%, transparent)',
            opacity: 0.4,
          }}
        />

        <svg
          className="absolute top-[55%] left-0 overflow-visible"
          width="14" height="16"
          viewBox="0 0 14 16"
          fill="none"
        >
          <line x1="0" y1="0" x2="14" y2="0"  stroke="currentColor" strokeWidth="1.5" opacity="0.3" />
          <line x1="0" y1="6" x2="9"  y2="6"  stroke="currentColor" strokeWidth="1"   opacity="0.2" />
          <line x1="0" y1="11" x2="6" y2="11" stroke="currentColor" strokeWidth="0.75" opacity="0.14" />
        </svg>

        <svg
          className="absolute top-0 right-0 overflow-visible"
          width="36" height="36"
          viewBox="0 0 36 36"
          fill="none"
        >
          <path
            className="frame-line-accent"
            d="M 10 2 L 34 2 L 34 26"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="square"
            opacity="0.4"
          />
          <path
            className="frame-line-accent"
            d="M 20 7 L 29 7 L 29 16"
            stroke="currentColor"
            strokeWidth="0.75"
            opacity="0.25"
          />
          <rect x="30" y="0" width="6" height="6" fill="currentColor" opacity="0.12" />
          <rect x="30" y="8" width="3" height="3" fill="currentColor" opacity="0.08" />
          <line x1="34" y1="18" x2="29" y2="18" stroke="currentColor" strokeWidth="0.75" opacity="0.2" />
        </svg>

        <div
          className="frame-edge-v absolute top-[36px] right-[1px] w-[1.5px] origin-top"
          style={{
            height: 'calc(15%)',
            background: 'linear-gradient(to bottom, currentColor, transparent)',
            opacity: 0.25,
          }}
        />

        <svg
          className="absolute bottom-0 right-0 overflow-visible"
          width="60" height="60"
          viewBox="0 0 60 60"
          fill="none"
        >
          <path
            className="frame-line"
            d="M 60 0 L 60 42 L 42 60 L 0 60"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="square"
          />
          <path
            className="frame-line-inner"
            d="M 53 20 L 53 44 L 44 53 L 20 53"
            stroke="currentColor"
            strokeWidth="0.75"
            opacity="0.4"
          />
          <path
            d="M 53 42 L 42 53 L 47 58 L 58 47 Z"
            fill="currentColor"
            opacity="0.08"
          />
          <rect x="43" y="43" width="6" height="6" fill="currentColor" opacity="0.15" />
          <rect x="43" y="36" width="3" height="3" fill="currentColor" opacity="0.08" />
          <rect x="36" y="43" width="3" height="3" fill="currentColor" opacity="0.08" />
          <line x1="60" y1="14" x2="53" y2="14" stroke="currentColor" strokeWidth="1" opacity="0.35" />
          <line x1="60" y1="8"  x2="55" y2="8"  stroke="currentColor" strokeWidth="0.75" opacity="0.2" />
          <line x1="14" y1="60" x2="14" y2="53" stroke="currentColor" strokeWidth="1" opacity="0.35" />
          <line x1="8"  y1="60" x2="8"  y2="55" stroke="currentColor" strokeWidth="0.75" opacity="0.2" />
        </svg>

        <div
          className="frame-edge-h absolute bottom-[1px] right-[60px] h-[1.5px] origin-right"
          style={{
            width: 'calc(40% - 60px)',
            background: 'linear-gradient(to left, currentColor 20%, transparent)',
            opacity: 0.3,
          }}
        />

        <div
          className="frame-edge-v absolute bottom-[60px] right-[1px] w-[1.5px] origin-bottom"
          style={{
            height: 'calc(25% - 60px)',
            background: 'linear-gradient(to top, currentColor 20%, transparent)',
            opacity: 0.3,
          }}
        />

        <svg
          className="absolute bottom-0 left-0 overflow-visible"
          width="24" height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            className="frame-line-accent"
            d="M 2 10 L 2 22 L 14 22"
            stroke="currentColor"
            strokeWidth="1"
            strokeLinecap="square"
            opacity="0.25"
          />
          <rect x="0" y="20" width="4" height="4" fill="currentColor" opacity="0.08" />
        </svg>

        <div
          className="absolute bottom-[1px] left-[28px] w-[10px] h-[1.5px]"
          style={{ backgroundColor: 'currentColor', opacity: 0.18 }}
        />
        <div
          className="absolute bottom-[1px] left-[42px] w-[6px] h-[1px]"
          style={{ backgroundColor: 'currentColor', opacity: 0.12 }}
        />
      </div>
    );
  }
);

TechFrame.displayName = 'TechFrame';
export default TechFrame;
