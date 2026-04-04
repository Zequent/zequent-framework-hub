// DockStation
export default function DockStation({ className = '', id = 'dock' }: { className?: string; id?: string }) {
  return (
    <svg viewBox="0 0 120 90" fill="none" className={className} aria-label="Drone docking station">
      <defs>
        <linearGradient id={`${id}-body`} x1="50%" y1="0%" x2="50%" y2="100%">
          <stop offset="0%" stopColor="#222" />
          <stop offset="100%" stopColor="#151515" />
        </linearGradient>
        <linearGradient id={`${id}-lid`} x1="50%" y1="0%" x2="50%" y2="100%">
          <stop offset="0%" stopColor="#1E1E1E" />
          <stop offset="100%" stopColor="#141414" />
        </linearGradient>
        <linearGradient id={`${id}-inner`} x1="50%" y1="0%" x2="50%" y2="100%">
          <stop offset="0%" stopColor="#111" />
          <stop offset="100%" stopColor="#0A0A0A" />
        </linearGradient>
      </defs>

      <rect x="8" y="6" width="104" height="78" rx="14" fill="#0A0A0A" stroke="#161616" strokeWidth="0.4" />

      <rect x="12" y="9" width="96" height="72" rx="12" fill={`url(#${id}-body)`} stroke="#3A3A3A" strokeWidth="0.7" />

      <rect x="15" y="12" width="90" height="66" rx="10" fill="none" stroke="#2A2A2A" strokeWidth="0.4" />

      <line x1="60" y1="12" x2="60" y2="78" stroke="#1D1D1D" strokeWidth="0.3" />
      <line x1="15" y1="45" x2="105" y2="45" stroke="#1D1D1D" strokeWidth="0.25" />

      <rect x="20" y="10" width="80" height="14" rx="6" fill={`url(#${id}-lid)`} stroke="#333" strokeWidth="0.5" />
      <line x1="30" y1="14" x2="90" y2="14" stroke="#252525" strokeWidth="0.3" />
      <line x1="30" y1="18" x2="90" y2="18" stroke="#1C1C1C" strokeWidth="0.2" />
      <line x1="22" y1="24" x2="98" y2="24" stroke="#2E2E2E" strokeWidth="0.8" />

      <rect x="20" y="66" width="80" height="14" rx="6" fill={`url(#${id}-lid)`} stroke="#333" strokeWidth="0.5" />
      <line x1="30" y1="72" x2="90" y2="72" stroke="#252525" strokeWidth="0.3" />
      <line x1="30" y1="68" x2="90" y2="68" stroke="#1C1C1C" strokeWidth="0.2" />
      <line x1="22" y1="66" x2="98" y2="66" stroke="#2E2E2E" strokeWidth="0.8" />

      <rect x="22" y="24" width="76" height="42" rx="4" fill={`url(#${id}-inner)`} stroke="#222" strokeWidth="0.5" />

      {Array.from({ length: 8 }, (_, i) => (
        <line key={`bf${i}`} x1={28 + i * 9} y1="26" x2={28 + i * 9} y2="64" stroke="#0E0E0E" strokeWidth="0.2" opacity="0.6" />
      ))}
      {Array.from({ length: 5 }, (_, i) => (
        <line key={`bfh${i}`} x1="24" y1={28 + i * 8} x2="96" y2={28 + i * 8} stroke="#0E0E0E" strokeWidth="0.2" opacity="0.5" />
      ))}

      <circle cx="60" cy="45" r="14" fill="none" stroke="#2A2A2A" strokeWidth="0.7" />
      <circle cx="60" cy="45" r="9" fill="none" stroke="#222" strokeWidth="0.4" strokeDasharray="2.5 1.5" />

      <line x1="60" y1="32" x2="60" y2="39" stroke="#333" strokeWidth="0.5" />
      <line x1="60" y1="51" x2="60" y2="58" stroke="#333" strokeWidth="0.5" />
      <line x1="47" y1="45" x2="54" y2="45" stroke="#333" strokeWidth="0.5" />
      <line x1="66" y1="45" x2="73" y2="45" stroke="#333" strokeWidth="0.5" />

      <circle cx="60" cy="45" r="1.5" fill="#1A1A1A" stroke="#444" strokeWidth="0.3" />

      <rect x="55" y="40" width="3" height="2.5" rx="0.5" fill="#7A6528" stroke="#AA9044" strokeWidth="0.3" />
      <rect x="62" y="40" width="3" height="2.5" rx="0.5" fill="#7A6528" stroke="#AA9044" strokeWidth="0.3" />
      <rect x="55" y="47.5" width="3" height="2.5" rx="0.5" fill="#7A6528" stroke="#AA9044" strokeWidth="0.3" />
      <rect x="62" y="47.5" width="3" height="2.5" rx="0.5" fill="#7A6528" stroke="#AA9044" strokeWidth="0.3" />
      <circle cx="56.5" cy="41.2" r="0.6" fill="#C4A845" />
      <circle cx="63.5" cy="41.2" r="0.6" fill="#C4A845" />
      <circle cx="56.5" cy="48.8" r="0.6" fill="#C4A845" />
      <circle cx="63.5" cy="48.8" r="0.6" fill="#C4A845" />

      <path d="M34 30 L42 36" fill="none" stroke="#333" strokeWidth="1" strokeLinecap="round" />
      <path d="M34 60 L42 54" fill="none" stroke="#333" strokeWidth="1" strokeLinecap="round" />
      <path d="M86 30 L78 36" fill="none" stroke="#333" strokeWidth="1" strokeLinecap="round" />
      <path d="M86 60 L78 54" fill="none" stroke="#333" strokeWidth="1" strokeLinecap="round" />
      <circle cx="34" cy="30" r="1.2" fill="#1A1A1A" stroke="#3A3A3A" strokeWidth="0.3" />
      <circle cx="34" cy="60" r="1.2" fill="#1A1A1A" stroke="#3A3A3A" strokeWidth="0.3" />
      <circle cx="86" cy="30" r="1.2" fill="#1A1A1A" stroke="#3A3A3A" strokeWidth="0.3" />
      <circle cx="86" cy="60" r="1.2" fill="#1A1A1A" stroke="#3A3A3A" strokeWidth="0.3" />

      <line x1="108" y1="35" x2="108" y2="18" stroke="#444" strokeWidth="0.7" strokeLinecap="round" />
      <circle cx="108" cy="17" r="1.8" fill="none" stroke="#555" strokeWidth="0.4" />
      <circle cx="108" cy="17" r="0.6" fill="#333" />
      <line x1="106" y1="15.5" x2="110" y2="18.5" stroke="#444" strokeWidth="0.3" />
      <line x1="106" y1="18.5" x2="110" y2="15.5" stroke="#444" strokeWidth="0.3" />

      {[40, 48, 56, 64, 72, 80].map((x, i) => (
        <circle key={`fa${i}`} cx={x} cy="26" r="0.7" fill="#22C55E" opacity="0.5">
          <animate attributeName="opacity" values="0.5;0.1;0.5" dur="1.4s" repeatCount="indefinite" begin={`${i * 0.12}s`} />
        </circle>
      ))}
      {[40, 48, 56, 64, 72, 80].map((x, i) => (
        <circle key={`ra${i}`} cx={x} cy="64" r="0.7" fill="#22C55E" opacity="0.5">
          <animate attributeName="opacity" values="0.5;0.1;0.5" dur="1.4s" repeatCount="indefinite" begin={`${(5 - i) * 0.12}s`} />
        </circle>
      ))}

      <circle cx="16" cy="35" r="1" fill="#22C55E" opacity="0.65">
        <animate attributeName="opacity" values="0.65;0.12;0.65" dur="2.8s" repeatCount="indefinite" />
      </circle>
      <circle cx="16" cy="55" r="1" fill="#22C55E" opacity="0.65">
        <animate attributeName="opacity" values="0.65;0.12;0.65" dur="2.8s" repeatCount="indefinite" begin="0.7s" />
      </circle>
      <circle cx="104" cy="35" r="1" fill="#22C55E" opacity="0.65">
        <animate attributeName="opacity" values="0.65;0.12;0.65" dur="2.8s" repeatCount="indefinite" begin="1.4s" />
      </circle>
      <circle cx="104" cy="55" r="1" fill="#22C55E" opacity="0.65">
        <animate attributeName="opacity" values="0.65;0.12;0.65" dur="2.8s" repeatCount="indefinite" begin="2.1s" />
      </circle>

      <circle cx="60" cy="45" r="18" fill="none" stroke="#22C55E" strokeWidth="0.5" opacity="0.18">
        <animate attributeName="r" values="18;24;18" dur="3s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.18;0.04;0.18" dur="3s" repeatCount="indefinite" />
      </circle>

      <rect x="52" y="78" width="16" height="5" rx="2" fill="#131313" stroke="#2A2A2A" strokeWidth="0.4" />
      <circle cx="56" cy="80.5" r="0.8" fill="#333" />
      <circle cx="60" cy="80.5" r="0.8" fill="#333" />
      <circle cx="64" cy="80.5" r="0.8" fill="#333" />

      {Array.from({ length: 4 }, (_, i) => (
        <line key={`vl${i}`} x1="14" y1={36 + i * 4} x2="14" y2={38 + i * 4} stroke="#2A2A2A" strokeWidth="1.5" strokeLinecap="round" />
      ))}
      {Array.from({ length: 4 }, (_, i) => (
        <line key={`vr${i}`} x1="106" y1={36 + i * 4} x2="106" y2={38 + i * 4} stroke="#2A2A2A" strokeWidth="1.5" strokeLinecap="round" />
      ))}
    </svg>
  );
}
