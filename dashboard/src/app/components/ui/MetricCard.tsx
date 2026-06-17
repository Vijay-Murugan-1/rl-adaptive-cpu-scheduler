interface MetricCardProps {
  label: string;
  value: string | number;
  sub?: string;
  accent?: string;
  glow?: boolean;
}

export function MetricCard({ label, value, sub, accent = "#00d4ff", glow = false }: MetricCardProps) {
  return (
    <div
      className="rounded-xl p-5 flex flex-col gap-2 relative overflow-hidden"
      style={{
        background: "var(--card)",
        border: "1px solid var(--border)",
        boxShadow: glow ? `0 0 24px ${accent}18, 0 1px 3px rgba(0,0,0,0.4)` : "0 1px 3px rgba(0,0,0,0.3)",
      }}
    >
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: `linear-gradient(90deg, transparent, ${accent}55, transparent)` }}
      />
      <div className="text-xs tracking-widest uppercase" style={{ color: "var(--muted-foreground)", fontFamily: "'Inter', sans-serif" }}>
        {label}
      </div>
      <div
        className="text-3xl font-semibold"
        style={{ color: accent, fontFamily: "'Space Grotesk', sans-serif", textShadow: `0 0 20px ${accent}55` }}
      >
        {value}
      </div>
      {sub && (
        <div className="text-xs" style={{ color: "var(--muted-foreground)" }}>
          {sub}
        </div>
      )}
    </div>
  );
}
