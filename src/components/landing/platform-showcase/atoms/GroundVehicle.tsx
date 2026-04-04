// GroundVehicle
export default function GroundVehicle({ className = '', id = 'ugv' }: { className?: string; id?: string }) {
  return (
    <svg viewBox="0 0 140 56" fill="none" className={className} aria-label="Ground vehicle">
      <defs>
        <linearGradient id={`${id}-hull`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#2A2A2A" />
          <stop offset="50%" stopColor="#303030" />
          <stop offset="100%" stopColor="#262626" />
        </linearGradient>
        <linearGradient id={`${id}-trk`} x1="50%" y1="0%" x2="50%" y2="100%">
          <stop offset="0%" stopColor="#161616" />
          <stop offset="50%" stopColor="#1A1A1A" />
          <stop offset="100%" stopColor="#141414" />
        </linearGradient>
      </defs>

      <rect x="6" y="0" width="128" height="11" rx="5.5" fill={`url(#${id}-trk)`} stroke="#2A2A2A" strokeWidth="0.5" />
      <line x1="12" y1="3" x2="128" y2="3" stroke="#1E1E1E" strokeWidth="0.5" />
      <line x1="12" y1="5.5" x2="128" y2="5.5" stroke="#1E1E1E" strokeWidth="0.4" />
      <line x1="12" y1="8" x2="128" y2="8" stroke="#1E1E1E" strokeWidth="0.5" />
      <circle cx="10" cy="5.5" r="4.5" fill="#131313" stroke="#222" strokeWidth="0.4" />
      <circle cx="130" cy="5.5" r="4.5" fill="#131313" stroke="#222" strokeWidth="0.4" />

      <rect x="6" y="45" width="128" height="11" rx="5.5" fill={`url(#${id}-trk)`} stroke="#2A2A2A" strokeWidth="0.5" />
      <line x1="12" y1="48" x2="128" y2="48" stroke="#1E1E1E" strokeWidth="0.5" />
      <line x1="12" y1="50.5" x2="128" y2="50.5" stroke="#1E1E1E" strokeWidth="0.4" />
      <line x1="12" y1="53" x2="128" y2="53" stroke="#1E1E1E" strokeWidth="0.5" />
      <circle cx="10" cy="50.5" r="4.5" fill="#131313" stroke="#222" strokeWidth="0.4" />
      <circle cx="130" cy="50.5" r="4.5" fill="#131313" stroke="#222" strokeWidth="0.4" />

      <rect x="10" y="11" width="120" height="34" fill={`url(#${id}-hull)`} stroke="#444" strokeWidth="0.5" />

      <line x1="42" y1="11" x2="42" y2="45" stroke="#272727" strokeWidth="0.4" />
      <line x1="98" y1="11" x2="98" y2="45" stroke="#272727" strokeWidth="0.4" />

      <rect x="10" y="10.5" width="120" height="1.5" fill="#242424" />
      <rect x="10" y="44" width="120" height="1.5" fill="#242424" />

      <path d="M10 11 L4 16 L4 40 L10 45" fill="#272727" stroke="#3A3A3A" strokeWidth="0.4" />
      <rect x="2" y="24" width="3" height="8" rx="1" fill="#1A1A1A" stroke="#444" strokeWidth="0.3" />
      <circle cx="3.5" cy="28" r="1.5" fill="#0A0A12" stroke="#555" strokeWidth="0.25" />
      <circle cx="3.5" cy="28" r="0.6" fill="#050508" />
      <circle cx="3" cy="20" r="0.8" fill="#22C55E" opacity="0.7">
        <animate attributeName="opacity" values="0.7;0.12;0.7" dur="2s" repeatCount="indefinite" />
      </circle>
      <circle cx="3" cy="36" r="0.8" fill="#22C55E" opacity="0.7">
        <animate attributeName="opacity" values="0.7;0.12;0.7" dur="2s" repeatCount="indefinite" begin="0.3s" />
      </circle>

      <rect x="48" y="16" width="44" height="24" rx="1.5" fill="#262626" stroke="#4A4A4A" strokeWidth="0.45" />
      <rect x="52" y="19" width="24" height="18" rx="1" fill="#222" stroke="#3E3E3E" strokeWidth="0.3" />
      <rect x="55" y="22" width="7" height="5" rx="0.8" fill="#0A0A14" stroke="#555" strokeWidth="0.2" />
      <circle cx="68" cy="25" r="2" fill="#0A0A10" stroke="#555" strokeWidth="0.2" />
      <circle cx="68" cy="25" r="0.8" fill="#050508" />
      <circle cx="82" cy="28" r="2.5" fill="#1C1C1C" stroke="#3A3A3A" strokeWidth="0.3" />
      <circle cx="82" cy="28" r="1" fill="#151515" />
      <line x1="86" y1="20" x2="86" y2="14" stroke="#555" strokeWidth="0.5" strokeLinecap="round" />

      <rect x="100" y="14" width="26" height="28" fill="#232323" stroke="#353535" strokeWidth="0.3" />
      {[18, 23, 28, 33, 38].map(y => (
        <line key={`sl${y}`} x1="103" y1={y} x2="123" y2={y} stroke="#1A1A1A" strokeWidth="1.8" />
      ))}
      <circle cx="122" cy="18" r="1.5" fill="#141414" stroke="#2E2E2E" strokeWidth="0.3" />
      <circle cx="122" cy="38" r="1.5" fill="#141414" stroke="#2E2E2E" strokeWidth="0.3" />

      <rect x="130" y="18" width="3" height="20" rx="1" fill="#1E1E1E" stroke="#333" strokeWidth="0.25" />
      <circle cx="131.5" cy="22" r="1" fill="#EF4444" opacity="0.5">
        <animate attributeName="opacity" values="0.5;0.1;0.5" dur="2s" repeatCount="indefinite" />
      </circle>
      <circle cx="131.5" cy="34" r="1" fill="#EF4444" opacity="0.5">
        <animate attributeName="opacity" values="0.5;0.1;0.5" dur="2s" repeatCount="indefinite" begin="0.5s" />
      </circle>
      <path d="M134 28 L138 28" fill="none" stroke="#3A3A3A" strokeWidth="0.8" strokeLinecap="round" />
    </svg>
  );
}
