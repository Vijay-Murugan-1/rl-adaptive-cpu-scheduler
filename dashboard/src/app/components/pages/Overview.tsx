import { MetricCard } from "../ui/MetricCard";
import { InsightCard } from "../ui/InsightCard";
import { SectionHeader } from "../ui/SectionHeader";
import { ArrowDown } from "lucide-react";

const STATS = [
  { label: "Classical Algorithms", value: "4", accent: "#00d4ff" },
  { label: "RL Models", value: "2", accent: "#7c3aed" },
  { label: "Workload Types", value: "5", accent: "#06b6d4" },
  { label: "Training Timesteps", value: "200K", accent: "#a78bfa" },
  { label: "Multi-Seed Evaluations", value: "8", accent: "#38bdf8" },
];

const PIPELINE = [
  "Workload Generator",
  "CPU Scheduling Environment",
  "State Representation",
  "PPO Agent",
  "Training",
  "Evaluation",
];

const FINDINGS = [
  {
    n: "01",
    text: "PPO achieved competitive scheduling performance without requiring burst-time oracle information.",
    color: "#00d4ff",
  },
  {
    n: "02",
    text: "A single PPO policy generalized successfully across multiple workload distributions.",
    color: "#7c3aed",
  },
  {
    n: "03",
    text: "Hyperparameter optimization produced stronger gains than expanding the state representation.",
    color: "#06b6d4",
  },
];

const TAGS = ["Reinforcement Learning", "PPO", "Gymnasium", "Stable-Baselines3", "Python", "CPU Scheduling"];

export function Overview() {
  return (
    <div>
      <SectionHeader
        tag="Research Project"
        title="RL-Based Adaptive CPU Scheduler"
        description="A Reinforcement Learning approach to CPU process scheduling using Proximal Policy Optimization (PPO). The project evaluates learned scheduling policies against classical operating-system scheduling algorithms across multiple workload distributions."
      />

      {/* Tech Tags */}
      <div className="flex flex-wrap gap-2 mb-10">
        {TAGS.map((tag) => (
          <span
            key={tag}
            className="text-xs px-3 py-1.5 rounded-full"
            style={{
              background: "var(--secondary)",
              border: "1px solid var(--border)",
              color: "var(--muted-foreground)",
              fontFamily: "'JetBrains Mono', monospace",
            }}
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-10">
        {STATS.map((s) => (
          <MetricCard key={s.label} label={s.label} value={s.value} accent={s.accent} glow />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Pipeline */}
        <div
          className="rounded-xl p-6"
          style={{ background: "var(--card)", border: "1px solid var(--border)" }}
        >
          <h3 className="mb-5" style={{ color: "#f1f5f9", fontFamily: "'Space Grotesk', sans-serif" }}>
            System Pipeline
          </h3>
          <div className="flex flex-col items-start gap-0">
            {PIPELINE.map((step, i) => (
              <div key={step} className="flex flex-col items-start">
                <div
                  className="flex items-center gap-3 px-4 py-2.5 rounded-lg w-full"
                  style={{
                    background: i === 3 ? "linear-gradient(90deg, #00d4ff18, #7c3aed12)" : "var(--secondary)",
                    border: i === 3 ? "1px solid #00d4ff30" : "1px solid var(--border)",
                  }}
                >
                  <span
                    className="w-5 h-5 rounded flex items-center justify-center text-xs font-semibold shrink-0"
                    style={{
                      background: i === 3 ? "var(--neon-blue)" : "#1e293b",
                      color: i === 3 ? "#030712" : "#64748b",
                      fontFamily: "'JetBrains Mono', monospace",
                    }}
                  >
                    {i + 1}
                  </span>
                  <span
                    className="text-sm"
                    style={{
                      color: i === 3 ? "#e2e8f0" : "#94a3b8",
                      fontFamily: "'Inter', sans-serif",
                    }}
                  >
                    {step}
                  </span>
                </div>
                {i < PIPELINE.length - 1 && (
                  <div className="flex items-center ml-5 my-1">
                    <ArrowDown size={14} style={{ color: "#334155" }} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Key Findings */}
        <div
          className="rounded-xl p-6"
          style={{ background: "var(--card)", border: "1px solid var(--border)" }}
        >
          <h3 className="mb-5" style={{ color: "#f1f5f9", fontFamily: "'Space Grotesk', sans-serif" }}>
            Key Findings
          </h3>
          <div className="flex flex-col gap-4">
            {FINDINGS.map((f) => (
              <div
                key={f.n}
                className="flex gap-4 items-start p-4 rounded-lg"
                style={{ background: "var(--secondary)", border: "1px solid var(--border)" }}
              >
                <span
                  className="text-xs font-semibold shrink-0 mt-0.5"
                  style={{ color: f.color, fontFamily: "'JetBrains Mono', monospace" }}
                >
                  {f.n}
                </span>
                <p className="text-sm" style={{ color: "#94a3b8", fontFamily: "'Inter', sans-serif", lineHeight: "1.6" }}>
                  {f.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <InsightCard
        text="This research demonstrates that Reinforcement Learning can learn effective CPU scheduling policies directly from interaction with a simulated operating-system environment, generalizing across diverse workload distributions without handcrafted rules."
      />
    </div>
  );
}
