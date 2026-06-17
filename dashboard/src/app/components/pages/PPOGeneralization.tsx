import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  Cell,
} from "recharts";
import { SectionHeader } from "../ui/SectionHeader";
import { InsightCard } from "../ui/InsightCard";

const WORKLOADS = [
  { name: "Normal", avgWT: 10.9, avgTAT: 15.1 },
  { name: "CPU Bound", avgWT: 18.3, avgTAT: 24.8 },
  { name: "IO Bound", avgWT: 0.6, avgTAT: 2.0 },
  { name: "Starvation", avgWT: 10.7, avgTAT: 18.9 },
  { name: "Mixed", avgWT: 2.4, avgTAT: 5.5 },
];

const HEATMAP_METRICS = ["Avg Waiting Time", "Avg Turnaround Time"];

const BAR_COLORS = ["#00d4ff", "#ef4444", "#22c55e", "#f59e0b", "#a78bfa"];

const tooltipStyle = {
  backgroundColor: "#0d1117",
  border: "1px solid rgba(255,255,255,0.08)",
  borderRadius: "8px",
  color: "#e2e8f0",
  fontFamily: "'Inter', sans-serif",
  fontSize: "12px",
};
const axisStyle = { fill: "#64748b", fontSize: 11, fontFamily: "'JetBrains Mono', monospace" };

function ChartCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl p-5" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
      <h4 className="mb-4" style={{ color: "#94a3b8", fontFamily: "'Inter', sans-serif" }}>{title}</h4>
      {children}
    </div>
  );
}

function HeatCell({ value, max }: { value: number; max: number }) {
  const intensity = value / max;
  const r = Math.round(0 + intensity * 120);
  const g = Math.round(212 - intensity * 150);
  const b = Math.round(255 - intensity * 100);
  return (
    <td className="px-4 py-3 text-center">
      <div
        className="inline-flex items-center justify-center w-16 h-8 rounded text-xs font-semibold"
        style={{
          background: `rgba(${r},${g},${b},0.2)`,
          color: `rgb(${r},${g},${b})`,
          border: `1px solid rgba(${r},${g},${b},0.3)`,
          fontFamily: "'JetBrains Mono', monospace",
        }}
      >
        {value}
      </div>
    </td>
  );
}

export function PPOGeneralization() {
  const maxWT = Math.max(...WORKLOADS.map((w) => w.avgWT));
  const maxTAT = Math.max(...WORKLOADS.map((w) => w.avgTAT));

  return (
    <div>
      <SectionHeader
        tag="PPO Analysis"
        title="Cross-Workload Generalization"
        description="Evaluation of a single PPO policy across multiple workload distributions without retraining. Demonstrates the adaptive capability of learned scheduling heuristics."
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <ChartCard title="Waiting Time by Workload">
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={WORKLOADS} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff08" vertical={false} />
              <XAxis dataKey="name" tick={axisStyle} axisLine={false} tickLine={false} />
              <YAxis tick={axisStyle} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={tooltipStyle} cursor={{ fill: "#ffffff06" }} />
              <Bar dataKey="avgWT" name="Avg Waiting Time" radius={[4, 4, 0, 0]}>
                {WORKLOADS.map((_, i) => (
                  <Cell key={i} fill={BAR_COLORS[i]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Turnaround Time by Workload">
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={WORKLOADS} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff08" vertical={false} />
              <XAxis dataKey="name" tick={axisStyle} axisLine={false} tickLine={false} />
              <YAxis tick={axisStyle} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={tooltipStyle} cursor={{ fill: "#ffffff06" }} />
              <Bar dataKey="avgTAT" name="Avg Turnaround Time" radius={[4, 4, 0, 0]}>
                {WORKLOADS.map((_, i) => (
                  <Cell key={i} fill={BAR_COLORS[i]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Cross-Workload Performance Summary">
          <p className="text-xs mb-3" style={{ color: "var(--muted-foreground)", fontFamily: "'Inter', sans-serif" }}>
            Actual PPO performance obtained from evaluation across five workload distributions.
          </p>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={WORKLOADS} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff08" vertical={false} />
              <XAxis dataKey="name" tick={axisStyle} axisLine={false} tickLine={false} />
              <YAxis tick={axisStyle} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={tooltipStyle} cursor={{ fill: "#ffffff06" }} />
              <Legend wrapperStyle={{ fontSize: 11, color: "#64748b", fontFamily: "'Inter', sans-serif" }} />
              <Bar dataKey="avgWT" name="Avg WT" fill="#00d4ff" radius={[3, 3, 0, 0]} />
              <Bar dataKey="avgTAT" name="Avg TAT" fill="#7c3aed" radius={[3, 3, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Heatmap Table */}
        <ChartCard title="Performance Heatmap">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr style={{ borderBottom: "1px solid var(--border)" }}>
                  <th className="text-left px-4 py-2 text-xs" style={{ color: "#64748b", fontFamily: "'Inter', sans-serif" }}>
                    Workload
                  </th>
                  {HEATMAP_METRICS.map((m) => (
                    <th key={m} className="text-center px-4 py-2 text-xs" style={{ color: "#64748b", fontFamily: "'Inter', sans-serif" }}>
                      {m}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {WORKLOADS.map((w) => (
                  <tr key={w.name} style={{ borderBottom: "1px solid var(--border)" }}>
                    <td className="px-4 py-3 text-sm" style={{ color: "#94a3b8", fontFamily: "'Inter', sans-serif" }}>
                      {w.name}
                    </td>
                    <HeatCell value={w.avgWT} max={maxWT} />
                    <HeatCell value={w.avgTAT} max={maxTAT} />
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </ChartCard>
      </div>

      {/* Observations */}
      <div
        className="rounded-xl p-6 mb-6"
        style={{ background: "var(--card)", border: "1px solid var(--border)" }}
      >
        <h3 className="mb-4" style={{ color: "#f1f5f9", fontFamily: "'Space Grotesk', sans-serif" }}>
          Research Observations
        </h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
          {[
            "PPO successfully generalized across all workload categories using a single trained policy.",
            "Strongest performance occurred on Mixed and IO-Bound workloads.",
            "CPU-Bound workloads remained the most challenging scheduling scenario.",
            "The learned policy adapted to varying workload distributions without workload-specific retraining.",
            "Results demonstrate that reinforcement learning can learn reusable scheduling heuristics rather than memorizing workload patterns.",
          ].map((obs, i) => (
            <div
              key={i}
              className="flex items-start gap-3 p-3 rounded-lg"
              style={{ background: "var(--secondary)", border: "1px solid var(--border)" }}
            >
              <span className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0" style={{ background: "#00d4ff" }} />
              <span className="text-sm" style={{ color: "#94a3b8", fontFamily: "'Inter', sans-serif", lineHeight: "1.6" }}>
                {obs}
              </span>
            </div>
          ))}
        </div>
      </div>

      <InsightCard
        text="Generalization achieved using a single trained PPO policy without workload-specific retraining. This demonstrates that RL-based schedulers can adapt their behavior implicitly based on observed state features."
        variant="purple"
      />
    </div>
  );
}
