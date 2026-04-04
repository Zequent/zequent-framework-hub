// HudFrame
export default function HudFrame() {
  return (
    <div className="absolute inset-0 pointer-events-none">
      <svg className="hud-corner absolute top-0 left-0 w-12 h-12 sm:w-16 sm:h-16" viewBox="0 0 60 60" fill="none">
        <path d="M2 22 L2 2 L22 2" stroke="#444" strokeWidth="1.5" />
        <line x1="2" y1="10" x2="8" y2="10" stroke="#333" strokeWidth="0.5" />
        <line x1="10" y1="2" x2="10" y2="8" stroke="#333" strokeWidth="0.5" />
        <rect x="4" y="4" width="3" height="3" fill="none" stroke="#333" strokeWidth="0.3" />
      </svg>

      <svg className="hud-corner absolute top-0 right-0 w-12 h-12 sm:w-16 sm:h-16" viewBox="0 0 60 60" fill="none">
        <path d="M58 22 L58 2 L38 2" stroke="#444" strokeWidth="1.5" />
        <line x1="52" y1="10" x2="58" y2="10" stroke="#333" strokeWidth="0.5" />
        <line x1="50" y1="2" x2="50" y2="8" stroke="#333" strokeWidth="0.5" />
        <rect x="53" y="4" width="3" height="3" fill="none" stroke="#333" strokeWidth="0.3" />
      </svg>

      <svg className="hud-corner absolute bottom-7 left-0 w-12 h-12 sm:w-16 sm:h-16" viewBox="0 0 60 60" fill="none">
        <path d="M2 38 L2 58 L22 58" stroke="#444" strokeWidth="1.5" />
        <line x1="2" y1="50" x2="8" y2="50" stroke="#333" strokeWidth="0.5" />
        <line x1="10" y1="52" x2="10" y2="58" stroke="#333" strokeWidth="0.5" />
      </svg>

      <svg className="hud-corner absolute bottom-7 right-0 w-12 h-12 sm:w-16 sm:h-16" viewBox="0 0 60 60" fill="none">
        <path d="M58 38 L58 58 L38 58" stroke="#444" strokeWidth="1.5" />
        <line x1="52" y1="50" x2="58" y2="50" stroke="#333" strokeWidth="0.5" />
        <line x1="50" y1="52" x2="50" y2="58" stroke="#333" strokeWidth="0.5" />
      </svg>

      <div className="absolute top-1 left-1/2 -translate-x-1/2 flex items-end gap-[3px]">
        {Array.from({ length: 11 }, (_, i) => (
          <div key={i} className={`w-px ${i === 5 ? 'h-3 bg-[#555]' : i % 2 === 0 ? 'h-2 bg-[#333]' : 'h-1.5 bg-[#222]'}`} />
        ))}
      </div>

      <div className="absolute top-2.5 right-[4.5rem] sm:right-[5.5rem] flex items-center gap-1">
        <span className="font-mono text-[6px] sm:text-[7px] text-[#333] tracking-wider">REC</span>
        <span className="block w-1.5 h-1.5 bg-[#EF4444] opacity-70">
          <style>{`@keyframes hud-rec-blink { 0%,100% { opacity: 0.7; } 50% { opacity: 0.2; } }`}</style>
          <span className="block w-full h-full" style={{ animation: 'hud-rec-blink 2s infinite' }} />
        </span>
      </div>

      <div className="absolute bottom-9 left-3 sm:left-4 flex flex-col gap-0.5">
        <span className="font-mono text-[6px] text-[#2A2A2A] tracking-wider">ALT: 120M</span>
        <span className="font-mono text-[6px] text-[#2A2A2A] tracking-wider">HDG: 274°</span>
      </div>

      <div className="absolute bottom-9 right-3 sm:right-4 flex flex-col gap-0.5 text-right">
        <span className="font-mono text-[6px] text-[#2A2A2A] tracking-wider">48.8566°N</span>
        <span className="font-mono text-[6px] text-[#2A2A2A] tracking-wider">2.3522°E</span>
      </div>
    </div>
  );
}
