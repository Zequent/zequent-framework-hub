// SensorNode
export default function SensorNode({ className = '', id = 'sensor' }: { className?: string; id?: string }) {
  return (
    <svg viewBox="0 0 80 80" fill="none" className={className} aria-label="Sensor station">
      <defs>
        <linearGradient id={`${id}-housing`} x1="50%" y1="0%" x2="50%" y2="100%">
          <stop offset="0%" stopColor="#2A2A2A" />
          <stop offset="100%" stopColor="#1C1C1C" />
        </linearGradient>
        <radialGradient id={`${id}-dish`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#222" />
          <stop offset="100%" stopColor="#181818" />
        </radialGradient>
      </defs>

      <style>{`
        @keyframes scan-${id} {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        .scan-arm-${id} {
          animation: scan-${id} 4s linear infinite;
          transform-origin: 40px 40px;
        }
      `}</style>

      <circle cx="40" cy="40" r="38" fill="none" stroke="rgba(255,96,68,0.04)" strokeWidth="0.4" strokeDasharray="2 3" />
      <circle cx="40" cy="40" r="34" fill="none" stroke="rgba(255,96,68,0.06)" strokeWidth="0.4" strokeDasharray="2 3" />

      <circle cx="40" cy="40" r="28" fill="#141414" stroke="#333" strokeWidth="0.6" />

      <circle cx="40" cy="40" r="25" fill="none" stroke="#1C1C1C" strokeWidth="0.3" />
      <circle cx="40" cy="40" r="22" fill="none" stroke="#1C1C1C" strokeWidth="0.3" />

      {Array.from({ length: 8 }, (_, i) => {
        const angle = (i * 45) * Math.PI / 180;
        const cx = 40 + 26 * Math.cos(angle);
        const cy = 40 + 26 * Math.sin(angle);
        return <circle key={i} cx={cx} cy={cy} r="1" fill="#1E1E1E" stroke="#3A3A3A" strokeWidth="0.3" />;
      })}

      <circle cx="40" cy="40" r="19" fill={`url(#${id}-housing)`} stroke="#4A4A4A" strokeWidth="0.5" />
      <circle cx="40" cy="40" r="19" fill="none" stroke="#444" strokeWidth="0.25" strokeDasharray="2 1.8" />

      <circle cx="40" cy="40" r="14" fill={`url(#${id}-dish)`} stroke="#3E3E3E" strokeWidth="0.4" />

      {Array.from({ length: 6 }, (_, i) => {
        const angle = (i * 60) * Math.PI / 180;
        const x2 = 40 + 13 * Math.cos(angle);
        const y2 = 40 + 13 * Math.sin(angle);
        return <line key={i} x1="40" y1="40" x2={x2} y2={y2} stroke="#2A2A2A" strokeWidth="0.25" />;
      })}

      {Array.from({ length: 6 }, (_, i) => {
        const angle = (i * 60 - 90) * Math.PI / 180;
        const cx = 40 + 9 * Math.cos(angle);
        const cy = 40 + 9 * Math.sin(angle);
        return (
          <g key={`se-${i}`}>
            <circle cx={cx} cy={cy} r="2" fill="#1A1A1A" stroke="#555" strokeWidth="0.3" />
            <circle cx={cx} cy={cy} r="0.8" fill="#111" />
          </g>
        );
      })}

      <circle cx="40" cy="40" r="5" fill="#141414" stroke="#555" strokeWidth="0.4" />
      <circle cx="40" cy="40" r="3.5" fill="#0D0D18" stroke="#666" strokeWidth="0.3" />
      <circle cx="40" cy="40" r="2" fill="#080814" />
      <circle cx="39" cy="39" r="0.6" fill="rgba(100,180,255,0.25)" />

      <g className={`scan-arm-${id}`}>
        <line x1="40" y1="40" x2="40" y2="13" stroke="rgba(255,96,68,0.35)" strokeWidth="0.8" strokeLinecap="round" />
        <path d="M40 40 L34 14 L46 14 Z" fill="rgba(255,96,68,0.04)" />
        <circle cx="40" cy="14" r="1.2" fill="#FF6044" opacity="0.5" />
      </g>

      <circle cx="40" cy="62" r="1.5" fill="#22C55E" opacity="0.8">
        <animate attributeName="opacity" values="0.8;0.15;0.8" dur="2.2s" repeatCount="indefinite" />
      </circle>

      <line x1="40" y1="68" x2="40" y2="78" stroke="#2A2A2A" strokeWidth="2.2" strokeLinecap="round" />
      <circle cx="40" cy="78" r="2.2" fill="#1C1C1C" stroke="#333" strokeWidth="0.4" />
      <rect x="38" y="71" width="4" height="2" rx="0.5" fill="#252525" stroke="#3A3A3A" strokeWidth="0.2" />
    </svg>
  );
}
