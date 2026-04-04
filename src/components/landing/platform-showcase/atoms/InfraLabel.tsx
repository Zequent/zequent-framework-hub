// Infrastructure label
export default function InfraLabel({
  label,
  color = '#555',
  dotColor,
  className = '',
  style,
}: {
  label: string;
  color?: string;
  dotColor?: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <span className={`inline-flex items-center gap-1 ${className}`} style={style}>
      {dotColor && <span className="w-1 h-1 shrink-0" style={{ backgroundColor: dotColor }} />}
      <span className="font-mono text-[7px] sm:text-[9px] tracking-widest uppercase" style={{ color }}>
        {label}
      </span>
    </span>
  );
}
