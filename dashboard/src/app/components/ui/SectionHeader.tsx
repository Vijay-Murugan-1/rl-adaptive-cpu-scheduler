interface SectionHeaderProps {
  title: string;
  description?: string;
  tag?: string;
}

export function SectionHeader({ title, description, tag }: SectionHeaderProps) {
  return (
    <div className="mb-8">
      {tag && (
        <div
          className="inline-flex items-center gap-1.5 text-xs font-medium tracking-widest uppercase px-3 py-1 rounded-full mb-3"
          style={{
            background: "linear-gradient(90deg, #00d4ff15, #7c3aed15)",
            border: "1px solid #00d4ff25",
            color: "var(--neon-blue)",
            fontFamily: "'JetBrains Mono', monospace",
          }}
        >
          <span className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--neon-blue)" }} />
          {tag}
        </div>
      )}
      <h1 style={{ color: "#f1f5f9", fontFamily: "'Space Grotesk', sans-serif" }}>{title}</h1>
      {description && (
        <p className="mt-2 max-w-2xl" style={{ color: "var(--muted-foreground)", fontFamily: "'Inter', sans-serif", lineHeight: "1.7" }}>
          {description}
        </p>
      )}
    </div>
  );
}
