import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  ScatterChart,
  Scatter,
  ZAxis,
} from "recharts";
import { SectionHeader } from "../ui/SectionHeader";
import { InsightCard } from "../ui/InsightCard";

const MULTI_SEED = [
  { workload: "Normal",     sjfMeanWT: 12.54, sjfStdWT: 3.39,  ppoMeanWT: 16.88, ppoStdWT: 4.11,  sjfMeanTAT: 17.66, ppoMeanTAT: 22.00 },
  { workload: "CPU Bound",  sjfMeanWT: 21.44, sjfStdWT: 4.80,  ppoMeanWT: 24.72, ppoStdWT: 5.94,  sjfMeanTAT: 28.74, ppoMeanTAT: 32.02 },
  { workload: "IO Bound",   sjfMeanWT: 0.86,  sjfStdWT: 0.45,  ppoMeanWT: 1.10,  ppoStdWT: 0.62,  sjfMeanTAT: 2.34,  ppoMeanTAT: 2.58  },
  { workload: "Starvation", sjfMeanWT: 15.24, sjfStdWT: 5.54,  ppoMeanWT: 17.90, ppoStdWT: 7.75,  sjfMeanTAT: 23.44, ppoMeanTAT: 26.10 },
  { workload: "Mixed",      sjfMeanWT: 8.28,  sjfStdWT: 4.07,  ppoMeanWT: 11.68, ppoStdWT: 7.07,  sjfMeanTAT: 12.92, ppoMeanTAT: 16.32 },
];

const FAIRNESS = [
  { name: "FCFS",       avgWT: 20.8, maxWT: 61, fairness: 0.565, starved: 4 },
  { name: "SJF",        avgWT: 10.7, maxWT: 33, fairness: 0.520, starved: 1 },
  { name: "Round Robin",avgWT: 11.4, maxWT: 38, fairness: 0.366, starved: 3 },
  { name: "Priority",   avgWT: 19.9, maxWT: 50, fairness: 0.508, starved: 4 },
  { name: "PPO",        avgWT: 10.7, maxWT: 50, fairness: 0.383, starved: 1 },
];

const scatterData = MULTI_SEED.map((d) => [
  { workload: d.workload, mean: d.sjfMeanWT, std: d.sjfStdWT, algo: "SJF" },
  { workload: d.workload, mean: d.ppoMeanWT, std: d.ppoStdWT, algo: "PPO" },
]).flat();

const tooltipStyle = {
  backgroundColor: "#0d1117",
  border: "1px solid rgba(255,255,255,0.08)",
  borderRadius: "8px",
  color: "#e2e8f0",
  fontFamily: "'Inter', sans-serif",
  fontSize: "12px",
};
const axisStyle = { fill: "#64748b", fontSize: 10, fontFamily: "'JetBrains Mono', monospace" };

function ChartCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl p-5" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
      <h4 className="mb-4" style={{ color: "#94a3b8", fontFamily: "'Inter', sans-serif" }}>{title}</h4>
      {children}
    </div>
  );
}

export function StabilityFairness() {
  return (
    <div>
      <SectionHeader
        tag="Stability & Fairness"
        title="Robustness and Fairness Evaluation"
        description="Multi-seed stability analysis comparing PPO against SJF across workload types, and fairness evaluation across all scheduling algorithms."
      />

      {/* Section A */}
      <div className="mb-2">
        <div
          className="inline-flex items-center gap-2 text-xs tracking-widest uppercase px-3 py-1 rounded mb-4"
          style={{ background: "#00d4ff10", color: "#00d4ff", fontFamily: "'JetBrains Mono', monospace", border: "1px solid #00d4ff20" }}
        >
          Section A — Multi-Seed Evaluation
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <ChartCard title="Mean Waiting Time — SJF vs PPO">
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={MULTI_SEED} margin={{ top: 5, right: 10, left: -15, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff08" vertical={false} />
              <XAxis dataKey="workload" tick={axisStyle} axisLine={false} tickLine={false} />
              <YAxis tick={axisStyle} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={tooltipStyle} cursor={{ fill: "#ffffff06" }} />
              <Legend wrapperStyle={{ fontSize: 11, color: "#64748b", fontFamily: "'Inter', sans-serif" }} />
              <Bar dataKey="sjfMeanWT" name="SJF Mean WT" fill="#00d4ff" radius={[3, 3, 0, 0]} />
              <Bar dataKey="ppoMeanWT" name="PPO Mean WT" fill="#7c3aed" radius={[3, 3, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Stability — Standard Deviation of Waiting Time">
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={MULTI_SEED} margin={{ top: 5, right: 10, left: -15, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff08" vertical={false} />
              <XAxis dataKey="workload" tick={axisStyle} axisLine={false} tickLine={false} />
              <YAxis tick={axisStyle} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={tooltipStyle} cursor={{ fill: "#ffffff06" }} />
              <Legend wrapperStyle={{ fontSize: 11, color: "#64748b", fontFamily: "'Inter', sans-serif" }} />
              <Bar dataKey="sjfStdWT" name="SJF Std WT" fill="#06b6d4" radius={[3, 3, 0, 0]} />
              <Bar dataKey="ppoStdWT" name="PPO Std WT" fill="#a78bfa" radius={[3, 3, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Multi-seed Table */}
      <div className="rounded-xl overflow-hidden mb-8" style={{ border: "1px solid var(--border)" }}>
        <div className="px-5 py-3" style={{ background: "var(--secondary)", borderBottom: "1px solid var(--border)" }}>
          <h4 style={{ color: "#94a3b8", fontFamily: "'Inter', sans-serif" }}>Multi-Seed Results Detail</h4>
        </div>
        <div className="overflow-x-auto" style={{ background: "var(--card)" }}>
          <table className="w-full">
            <thead>
              <tr style={{ borderBottom: "1px solid var(--border)" }}>
                {["Workload", "SJF Mean WT", "SJF Std WT", "SJF Mean TAT", "PPO Mean WT", "PPO Std WT", "PPO Mean TAT"].map((h) => (
                  <th key={h} className="text-left px-4 py-3 text-xs tracking-wide" style={{ color: "#64748b", fontFamily: "'Inter', sans-serif" }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {MULTI_SEED.map((row, i) => (
                <tr key={row.workload} style={{ borderBottom: i < MULTI_SEED.length - 1 ? "1px solid var(--border)" : "none" }}>
                  <td className="px-4 py-3 text-sm font-medium" style={{ color: "#e2e8f0", fontFamily: "'Inter', sans-serif" }}>
                    {row.workload}
                  </td>
                  {[row.sjfMeanWT, row.sjfStdWT, row.sjfMeanTAT, row.ppoMeanWT, row.ppoStdWT, row.ppoMeanTAT].map((v, j) => (
                    <td key={j} className="px-4 py-3 text-sm" style={{ color: "#94a3b8", fontFamily: "'JetBrains Mono', monospace" }}>
                      {v.toFixed(2)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Section B */}
      <div className="mb-2">
        <div
          className="inline-flex items-center gap-2 text-xs tracking-widest uppercase px-3 py-1 rounded mb-4"
          style={{ background: "#7c3aed10", color: "#a78bfa", fontFamily: "'JetBrains Mono', monospace", border: "1px solid #7c3aed20" }}
        >
          Section B — Fairness Analysis
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <ChartCard title="Fairness Score by Algorithm (lower = more fair)">
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={FAIRNESS} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff08" vertical={false} />
              <XAxis dataKey="name" tick={axisStyle} axisLine={false} tickLine={false} />
              <YAxis tick={axisStyle} axisLine={false} tickLine={false} domain={[0, 0.7]} />
              <Tooltip contentStyle={tooltipStyle} cursor={{ fill: "#ffffff06" }} formatter={(v: number) => v.toFixed(3)} />
              <Bar dataKey="fairness" name="Fairness Score" fill="#a78bfa" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
          <p className="mt-2 text-xs" style={{ color: "var(--muted-foreground)", fontFamily: "'Inter', sans-serif" }}>
            Lower fairness scores indicate more equitable waiting-time distribution among processes.
          </p>
        </ChartCard>

        <ChartCard title="Starved Processes by Algorithm">
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={FAIRNESS} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff08" vertical={false} />
              <XAxis dataKey="name" tick={axisStyle} axisLine={false} tickLine={false} />
              <YAxis tick={axisStyle} axisLine={false} tickLine={false} allowDecimals={false} />
              <Tooltip contentStyle={tooltipStyle} cursor={{ fill: "#ffffff06" }} />
              <Bar dataKey="starved" name="Starved Processes" fill="#ef4444" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Fairness Table */}
      <div className="rounded-xl overflow-hidden mb-6" style={{ border: "1px solid var(--border)" }}>
        <div className="px-5 py-3" style={{ background: "var(--secondary)", borderBottom: "1px solid var(--border)" }}>
          <h4 style={{ color: "#94a3b8", fontFamily: "'Inter', sans-serif" }}>Fairness Metrics Table</h4>
        </div>
        <table className="w-full" style={{ background: "var(--card)" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid var(--border)" }}>
              {["Algorithm", "Avg Waiting Time", "Max Waiting Time", "Fairness Score", "Starved Processes"].map((h) => (
                <th key={h} className="text-left px-5 py-3 text-xs tracking-wide" style={{ color: "#64748b", fontFamily: "'Inter', sans-serif" }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {FAIRNESS.map((row, i) => (
              <tr
                key={row.name}
                style={{
                  borderBottom: i < FAIRNESS.length - 1 ? "1px solid var(--border)" : "none",
                  background: row.name === "PPO" ? "#7c3aed08" : "transparent",
                }}
              >
                <td className="px-5 py-3">
                  <span className="text-sm font-medium" style={{ color: row.name === "PPO" ? "#a78bfa" : "#e2e8f0", fontFamily: "'Inter', sans-serif" }}>
                    {row.name}
                    {row.name === "PPO" && (
                      <span className="ml-2 text-xs px-1.5 py-0.5 rounded" style={{ background: "#7c3aed20", color: "#a78bfa" }}>RL</span>
                    )}
                  </span>
                </td>
                <td className="px-5 py-3 text-sm" style={{ color: "#94a3b8", fontFamily: "'JetBrains Mono', monospace" }}>{row.avgWT}</td>
                <td className="px-5 py-3 text-sm" style={{ color: "#94a3b8", fontFamily: "'JetBrains Mono', monospace" }}>{row.maxWT}</td>
                <td className="px-5 py-3 text-sm" style={{ color: "#94a3b8", fontFamily: "'JetBrains Mono', monospace" }}>{row.fairness.toFixed(3)}</td>
                <td className="px-5 py-3 text-sm" style={{ color: row.starved > 2 ? "#ef4444" : "#94a3b8", fontFamily: "'JetBrains Mono', monospace" }}>
                  {row.starved}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <InsightCard
        text="PPO matched SJF in starvation prevention while achieving substantially better fairness characteristics (0.383 vs 0.520), approaching Round Robin fairness without requiring handcrafted scheduling rules. These results indicate that reinforcement learning can internalize fairness-aware scheduling behavior through reward optimization."
        variant="purple"
      />
    </div>
  );
}
