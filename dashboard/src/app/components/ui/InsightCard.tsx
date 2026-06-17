import { Lightbulb } from "lucide-react";

interface InsightCardProps {
  text: string;
  variant?: "blue" | "purple";
}

export function InsightCard({ text, variant = "blue" }: InsightCardProps) {
  const color = variant === "blue" ? "#00d4ff" : "#a78bfa";
  return (
    <div
      className="rounded-xl p-5 flex gap-4 items-start"
      style={{
        background: `linear-gradient(135deg, ${color}0a, ${color}04)`,
        border: `1px solid ${color}25`,
      }}
    >
      <div
        className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
        style={{ background: `${color}18`, border: `1px solid ${color}30` }}
      >
        <Lightbulb size={15} style={{ color }} />
      </div>
      <p style={{ color: "#cbd5e1", fontFamily: "'Inter', sans-serif", lineHeight: "1.7", fontSize: "0.9rem" }}>
        {text}
      </p>
    </div>
  );
}
