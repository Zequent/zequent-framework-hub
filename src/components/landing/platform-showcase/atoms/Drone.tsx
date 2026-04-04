// Drone
export default function Drone({ className = '', id = 'drone' }: { className?: string; id?: string }) {
  return (
    <svg viewBox="0 0 120 120" fill="none" className={className} aria-label="Quadcopter drone">
      <defs>
        <linearGradient id={`${id}-body`} x1="50%" y1="0%" x2="50%" y2="100%">
          <stop offset="0%" stopColor="#2A2A2A" />
          <stop offset="100%" stopColor="#1A1A1A" />
        </linearGradient>
        <radialGradient id={`${id}-lens`} cx="50%" cy="40%" r="50%">
          <stop offset="0%" stopColor="#334" />
          <stop offset="100%" stopColor="#0A0A14" />
        </radialGradient>
        <radialGradient id={`${id}-rotor`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(255,255,255,0)" />
          <stop offset="50%" stopColor="rgba(255,255,255,0.02)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </radialGradient>
      </defs>

      <line x1="53" y1="48" x2="24" y2="19" stroke="#2D2D2D" strokeWidth="3.5" strokeLinecap="round" />
      <line x1="67" y1="48" x2="96" y2="19" stroke="#2D2D2D" strokeWidth="3.5" strokeLinecap="round" />
      <line x1="53" y1="72" x2="24" y2="101" stroke="#2D2D2D" strokeWidth="3.5" strokeLinecap="round" />
      <line x1="67" y1="72" x2="96" y2="101" stroke="#2D2D2D" strokeWidth="3.5" strokeLinecap="round" />

      <line x1="46" y1="43" x2="32" y2="27" stroke="#333" strokeWidth="0.4" />
      <line x1="74" y1="43" x2="88" y2="27" stroke="#333" strokeWidth="0.4" />
      <line x1="46" y1="77" x2="32" y2="93" stroke="#333" strokeWidth="0.4" />
      <line x1="74" y1="77" x2="88" y2="93" stroke="#333" strokeWidth="0.4" />

      <circle cx="24" cy="19" r="7.5" fill="#1E1E1E" stroke="#3A3A3A" strokeWidth="0.8" />
      <circle cx="96" cy="19" r="7.5" fill="#1E1E1E" stroke="#3A3A3A" strokeWidth="0.8" />
      <circle cx="24" cy="101" r="7.5" fill="#1E1E1E" stroke="#3A3A3A" strokeWidth="0.8" />
      <circle cx="96" cy="101" r="7.5" fill="#1E1E1E" stroke="#3A3A3A" strokeWidth="0.8" />

      <circle cx="24" cy="19" r="5" fill="none" stroke="#444" strokeWidth="0.3" />
      <circle cx="96" cy="19" r="5" fill="none" stroke="#444" strokeWidth="0.3" />
      <circle cx="24" cy="101" r="5" fill="none" stroke="#444" strokeWidth="0.3" />
      <circle cx="96" cy="101" r="5" fill="none" stroke="#444" strokeWidth="0.3" />

      <circle cx="24" cy="19" r="2" fill="#151515" stroke="#4A4A4A" strokeWidth="0.4" />
      <circle cx="96" cy="19" r="2" fill="#151515" stroke="#4A4A4A" strokeWidth="0.4" />
      <circle cx="24" cy="101" r="2" fill="#151515" stroke="#4A4A4A" strokeWidth="0.4" />
      <circle cx="96" cy="101" r="2" fill="#151515" stroke="#4A4A4A" strokeWidth="0.4" />

      {[
        { cx: 24, cy: 19 },
        { cx: 96, cy: 19 },
        { cx: 24, cy: 101 },
        { cx: 96, cy: 101 },
      ].map((pos, i) => (
        <g key={i}>
          <circle cx={pos.cx} cy={pos.cy} r="17" fill={`url(#${id}-rotor)`} />
          <circle cx={pos.cx} cy={pos.cy} r="17" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" />
          <circle cx={pos.cx} cy={pos.cy} r="13" fill="none" stroke="rgba(255,255,255,0.025)" strokeWidth="0.4" />
          <circle cx={pos.cx} cy={pos.cy} r="15" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="3">
            <animate
              attributeName="opacity"
              values="1;0.3;0.8;0.4;1"
              dur={`${0.12 + i * 0.02}s`}
              repeatCount="indefinite"
            />
          </circle>
        </g>
      ))}

      <path
        d="M60 36 L73 47 L73 73 L60 84 L47 73 L47 47 Z"
        fill={`url(#${id}-body)`}
        stroke="#444"
        strokeWidth="0.7"
      />

      <line x1="53" y1="41" x2="53" y2="79" stroke="#333" strokeWidth="0.25" />
      <line x1="67" y1="41" x2="67" y2="79" stroke="#333" strokeWidth="0.25" />
      <line x1="49" y1="54" x2="71" y2="54" stroke="#333" strokeWidth="0.25" />
      <line x1="49" y1="66" x2="71" y2="66" stroke="#333" strokeWidth="0.25" />

      <rect x="52" y="68" width="16" height="6" rx="1" fill="none" stroke="#333" strokeWidth="0.3" />
      <line x1="56" y1="69" x2="56" y2="73" stroke="#2A2A2A" strokeWidth="0.3" />
      <line x1="60" y1="69" x2="60" y2="73" stroke="#2A2A2A" strokeWidth="0.3" />
      <line x1="64" y1="69" x2="64" y2="73" stroke="#2A2A2A" strokeWidth="0.3" />

      <rect x="54" y="54" width="12" height="14" rx="2" fill="#161616" stroke="#3C3C3C" strokeWidth="0.5" />

      <line x1="55" y1="56" x2="65" y2="56" stroke="#444" strokeWidth="0.3" />
      <line x1="55" y1="66" x2="65" y2="66" stroke="#444" strokeWidth="0.3" />

      <circle cx="60" cy="61" r="5" fill="#111" stroke="#555" strokeWidth="0.4" />
      <circle cx="60" cy="61" r="3.5" fill={`url(#${id}-lens)`} stroke="#666" strokeWidth="0.3" />
      <circle cx="60" cy="61" r="2" fill="#080814" />
      <circle cx="60" cy="61" r="1" fill="#050510" stroke="rgba(100,130,220,0.15)" strokeWidth="0.3" />
      <circle cx="58.5" cy="59.5" r="0.8" fill="rgba(120,160,255,0.25)" />

      <rect x="55" y="34" width="10" height="6" rx="1.5" fill="#222" stroke="#3C3C3C" strokeWidth="0.4" />
      <line x1="60" y1="35" x2="60" y2="39" stroke="#444" strokeWidth="0.3" />
      <line x1="57" y1="37" x2="63" y2="37" stroke="#444" strokeWidth="0.3" />

      <line x1="47" y1="55" x2="40" y2="55" stroke="#2A2A2A" strokeWidth="1.8" strokeLinecap="round" />
      <line x1="73" y1="55" x2="80" y2="55" stroke="#2A2A2A" strokeWidth="1.8" strokeLinecap="round" />
      <line x1="47" y1="65" x2="40" y2="65" stroke="#2A2A2A" strokeWidth="1.8" strokeLinecap="round" />
      <line x1="73" y1="65" x2="80" y2="65" stroke="#2A2A2A" strokeWidth="1.8" strokeLinecap="round" />
      <line x1="39" y1="53" x2="39" y2="57" stroke="#333" strokeWidth="1" strokeLinecap="round" />
      <line x1="81" y1="53" x2="81" y2="57" stroke="#333" strokeWidth="1" strokeLinecap="round" />
      <line x1="39" y1="63" x2="39" y2="67" stroke="#333" strokeWidth="1" strokeLinecap="round" />
      <line x1="81" y1="63" x2="81" y2="67" stroke="#333" strokeWidth="1" strokeLinecap="round" />

      <circle cx="22" cy="15" r="1.3" fill="#22C55E" opacity="0.9">
        <animate attributeName="opacity" values="0.9;0.3;0.9" dur="1.5s" repeatCount="indefinite" />
      </circle>
      <circle cx="98" cy="15" r="1.3" fill="#22C55E" opacity="0.9">
        <animate attributeName="opacity" values="0.9;0.3;0.9" dur="1.5s" repeatCount="indefinite" />
      </circle>

      <circle cx="22" cy="105" r="1.3" fill="#EF4444" opacity="0.85">
        <animate attributeName="opacity" values="0.85;0.25;0.85" dur="1.5s" repeatCount="indefinite" begin="0.2s" />
      </circle>
      <circle cx="98" cy="105" r="1.3" fill="#EF4444" opacity="0.85">
        <animate attributeName="opacity" values="0.85;0.25;0.85" dur="1.5s" repeatCount="indefinite" begin="0.2s" />
      </circle>

      <line x1="60" y1="32" x2="60" y2="28" stroke="#555" strokeWidth="0.6" strokeLinecap="round" />
      <circle cx="60" cy="27.5" r="0.8" fill="#444" />
    </svg>
  );
}
