import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { SectionHeader } from "../ui/SectionHeader";
import { InsightCard } from "../ui/InsightCard";
import { MetricCard } from "../ui/MetricCard";
import { ArrowDown, CheckCircle2, AlertTriangle, Microscope, ArrowRight } from "lucide-react";

const FINDINGS = [
  {
    n: "01",
    title: "Competitive Without Oracle",
    text: "PPO achieved competitive scheduling performance without relying on burst-time oracle information.",
    color: "#00d4ff",
  },
  {
    n: "02",
    title: "Cross-Workload Generalization",
    text: "A single PPO policy generalized across Normal, CPU-Bound, IO-Bound, Starvation, and Mixed workloads.",
    color: "#7c3aed",
  },
  {
    n: "03",
    title: "Hyperparameter Dominance",
    text: "Hyperparameter tuning improved scheduling performance more effectively than expanding the state representation.",
    color: "#06b6d4",
  },
  {
    n: "04",
    title: "Seed Robustness",
    text: "PPO maintained stable behavior across multiple random seeds and workload distributions.",
    color: "#a78bfa",
  },
  {
    n: "05",
    title: "Learned Heuristics",
    text: "Reinforcement Learning successfully learned scheduling heuristics directly through environment interaction.",
    color: "#38bdf8",
  },
];

const PREEMPTIVE = [
  { name: "SRTF", avgWT: 5.8, maxWT: 33, avgTAT: 14.0, ctxSwitches: 81 },
  { name: "Preemptive PPO", avgWT: 9.5, maxWT: 60, avgTAT: 17.7, ctxSwitches: 81 },
];

const PIPELINE = [
  "Workload Generator",
  "CPU Scheduling Environment",
  "State Representation",
  "PPO Agent",
  "Training Loop",
  "Evaluation Framework",
];

const LIMITATIONS = [
  "Synthetic workload generation",
  "Reward engineering sensitivity",
  "Offline training requirements",
  "Oracle schedulers remain stronger when burst-time information is available",
];

const FUTURE = [
  "Multi-Core CPU Scheduling",
  "Real Workload Trace Evaluation",
  "PPO vs DQN vs A2C Comparison",
  "Fairness-Aware Reinforcement Learning",
  "Transformer-Based Scheduling Policies",
];

const tooltipStyle = {
  backgroundColor: "#0d1117",
  border: "1px solid rgba(255,255,255,0.08)",
  borderRadius: "8px",
  color: "#e2e8f0",
  fontFamily: "'Inter', sans-serif",
  fontSize: "12px",
};
const axisStyle = { fill: "#64748b", fontSize: 11, fontFamily: "'JetBrains Mono', monospace" };

export function Conclusions() {
  return (
    <div>
      <SectionHeader
        tag="Research Conclusions"
        title="Research Findings and Conclusions"
        description="Synthesized outcomes from benchmarking, generalization analysis, and stability evaluation of RL-based CPU scheduling using PPO."
      />

      {/* Key Findings */}
      <div
        className="rounded-xl p-6 mb-8"
        style={{ background: "var(--card)", border: "1px solid var(--border)" }}
      >
        <h3 className="mb-5" style={{ color: "#f1f5f9", fontFamily: "'Space Grotesk', sans-serif" }}>
          Key Findings
        </h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {FINDINGS.map((f) => (
            <div
              key={f.n}
              className="flex gap-4 p-4 rounded-lg"
              style={{
                background: "var(--secondary)",
                border: `1px solid ${f.color}18`,
              }}
            >
              <span
                className="text-xs font-bold shrink-0 mt-0.5"
                style={{ color: f.color, fontFamily: "'JetBrains Mono', monospace" }}
              >
                {f.n}
              </span>
              <div>
                <div className="text-sm font-medium mb-1" style={{ color: "#e2e8f0", fontFamily: "'Inter', sans-serif" }}>
                  {f.title}
                </div>
                <div className="text-sm" style={{ color: "#94a3b8", fontFamily: "'Inter', sans-serif", lineHeight: "1.6" }}>
                  {f.text}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Preemptive Study */}
      <div className="mb-2">
        <div
          className="inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full mb-3"
          style={{ background: "#f59e0b12", color: "#f59e0b", fontFamily: "'JetBrains Mono', monospace", border: "1px solid #f59e0b25" }}
        >
          Supplementary Experiment
        </div>
        <div
          className="inline-flex items-center gap-2 text-xs tracking-widest uppercase px-3 py-1 rounded mb-2 ml-2"
          style={{ background: "#06b6d410", color: "#06b6d4", fontFamily: "'JetBrains Mono', monospace", border: "1px solid #06b6d420" }}
        >
          <Microscope size={11} />
          Appendix A — Preemptive Scheduling Experiment
        </div>
        <p className="text-sm mb-4" style={{ color: "var(--muted-foreground)", fontFamily: "'Inter', sans-serif" }}>
          Exploratory evaluation of PPO within a preemptive scheduling environment compared against the theoretical SRTF baseline.
        </p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <MetricCard label="SRTF Avg WT" value="5.8" sub="Waiting Time (ms)" accent="#00d4ff" />
        <MetricCard label="PPO Avg WT" value="9.5" sub="Waiting Time (ms)" accent="#7c3aed" />
        <MetricCard label="SRTF Avg TAT" value="14.0" sub="Turnaround Time (ms)" accent="#06b6d4" />
        <MetricCard label="PPO Avg TAT" value="17.7" sub="Turnaround Time (ms)" accent="#a78bfa" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="rounded-xl p-5" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
          <h4 className="mb-4" style={{ color: "#94a3b8", fontFamily: "'Inter', sans-serif" }}>SRTF vs Preemptive PPO</h4>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={PREEMPTIVE} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff08" vertical={false} />
              <XAxis dataKey="name" tick={axisStyle} axisLine={false} tickLine={false} />
              <YAxis tick={axisStyle} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={tooltipStyle} cursor={{ fill: "#ffffff06" }} />
              <Legend wrapperStyle={{ fontSize: 11, color: "#64748b", fontFamily: "'Inter', sans-serif" }} />
              <Bar dataKey="avgWT" name="Avg WT" fill="#00d4ff" radius={[3, 3, 0, 0]} />
              <Bar dataKey="avgTAT" name="Avg TAT" fill="#7c3aed" radius={[3, 3, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="rounded-xl p-5" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
          <h4 className="mb-4" style={{ color: "#94a3b8", fontFamily: "'Inter', sans-serif" }}>Preemptive Scheduling Result Summary</h4>
          <table className="w-full mb-4">
            <thead>
              <tr style={{ borderBottom: "1px solid var(--border)" }}>
                {["Metric", "SRTF", "PPO"].map((h) => (
                  <th key={h} className="text-left px-4 py-2 text-xs tracking-wide" style={{ color: "#64748b", fontFamily: "'Inter', sans-serif" }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                { metric: "Avg WT", srtf: "5.8", ppo: "9.5" },
                { metric: "Avg TAT", srtf: "14.0", ppo: "17.7" },
              ].map((row) => (
                <tr key={row.metric} style={{ borderBottom: "1px solid var(--border)" }}>
                  <td className="px-4 py-3 text-sm" style={{ color: "#e2e8f0", fontFamily: "'Inter', sans-serif" }}>{row.metric}</td>
                  <td className="px-4 py-3 text-sm" style={{ color: "#00d4ff", fontFamily: "'JetBrains Mono', monospace" }}>{row.srtf}</td>
                  <td className="px-4 py-3 text-sm" style={{ color: "#a78bfa", fontFamily: "'JetBrains Mono', monospace" }}>{row.ppo}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="text-xs" style={{ color: "var(--muted-foreground)", fontFamily: "'Inter', sans-serif", lineHeight: "1.6" }}>
            SRTF remained superior in latency metrics because it has direct access to perfect remaining-burst information. PPO demonstrated the ability to learn effective scheduling behavior without privileged system knowledge.
          </p>
        </div>
      </div>

      <InsightCard
        text="Preemptive PPO demonstrated competitive scheduling behavior; however, SRTF remained superior in latency metrics due to access to perfect remaining-burst information. This highlights the challenge of learning optimal preemptive scheduling policies without privileged system knowledge."
        variant="blue"
      />

      {/* Limitations & Future Work */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 my-8">
        <div className="rounded-xl p-6" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle size={15} style={{ color: "#f59e0b" }} />
            <h3 style={{ color: "#f1f5f9", fontFamily: "'Space Grotesk', sans-serif" }}>Limitations</h3>
          </div>
          <div className="space-y-3">
            {LIMITATIONS.map((l) => (
              <div key={l} className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0" style={{ background: "#f59e0b" }} />
                <span className="text-sm" style={{ color: "#94a3b8", fontFamily: "'Inter', sans-serif", lineHeight: "1.6" }}>{l}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl p-6" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
          <div className="flex items-center gap-2 mb-4">
            <ArrowRight size={15} style={{ color: "#00d4ff" }} />
            <h3 style={{ color: "#f1f5f9", fontFamily: "'Space Grotesk', sans-serif" }}>Future Work</h3>
          </div>
          <div className="space-y-3">
            {FUTURE.map((f) => (
              <div key={f} className="flex items-start gap-2.5">
                <CheckCircle2 size={14} className="shrink-0 mt-0.5" style={{ color: "#00d4ff" }} />
                <span className="text-sm" style={{ color: "#94a3b8", fontFamily: "'Inter', sans-serif", lineHeight: "1.6" }}>{f}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Final Conclusion */}
      <div
        className="rounded-xl p-8 relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #030712, #0d1117)",
          border: "1px solid #00d4ff20",
          boxShadow: "0 0 60px #00d4ff08",
        }}
      >
        <div
          className="absolute inset-0 opacity-30"
          style={{
            background: "radial-gradient(ellipse at top left, #00d4ff08, transparent 60%), radial-gradient(ellipse at bottom right, #7c3aed08, transparent 60%)",
          }}
        />
        <div className="relative">
          <div
            className="text-xs tracking-widest uppercase mb-3"
            style={{ color: "#00d4ff", fontFamily: "'JetBrains Mono', monospace" }}
          >
            Final Conclusion
          </div>
          <p
            className="max-w-3xl"
            style={{ color: "#cbd5e1", fontFamily: "'Inter', sans-serif", lineHeight: "1.8", fontSize: "0.95rem" }}
          >
            This research demonstrates that Reinforcement Learning can learn effective CPU scheduling policies directly from interaction with a simulated operating-system environment. The PPO scheduler generalized across diverse workload distributions, achieved competitive waiting-time performance, matched SJF in starvation prevention, and demonstrated strong fairness characteristics without relying on handcrafted scheduling rules or burst-time oracle information. These findings highlight the potential of adaptive learning-based schedulers for future intelligent operating systems.
          </p>
        </div>
      </div>

      {/* Footer */}
      <div
        className="mt-8 pt-6 flex items-center justify-between border-t"
        style={{ borderColor: "var(--border)" }}
      >
        <div>
          <div className="text-sm font-medium" style={{ color: "#e2e8f0", fontFamily: "'Space Grotesk', sans-serif" }}>
            RL-Based Adaptive CPU Scheduler
          </div>
          <div className="text-xs mt-0.5" style={{ color: "var(--muted-foreground)" }}>Reinforcement Learning Research Dashboard</div>
        </div>
        <div className="flex gap-2">
          {["PPO", "Gymnasium", "Stable-Baselines3"].map((tag) => (
            <span
              key={tag}
              className="text-xs px-2.5 py-1 rounded"
              style={{
                background: "var(--secondary)",
                color: "var(--muted-foreground)",
                border: "1px solid var(--border)",
                fontFamily: "'JetBrains Mono', monospace",
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
