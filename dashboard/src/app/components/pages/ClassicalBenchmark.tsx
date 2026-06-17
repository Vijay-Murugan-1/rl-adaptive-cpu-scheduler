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

const ALGORITHMS = [
  { name: "FCFS", avgWT: 14.8, avgTAT: 19.0, throughput: 0.23, ctxSwitches: 9 },
  { name: "SJF", avgWT: 8.3, avgTAT: 12.5, throughput: 0.23, ctxSwitches: 9 },
  { name: "Round Robin", avgWT: 13.3, avgTAT: 17.5, throughput: 0.23, ctxSwitches: 22 },
  { name: "Priority", avgWT: 12.7, avgTAT: 16.9, throughput: 0.23, ctxSwitches: 9 },
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

function ChartCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div
      className="rounded-xl p-5"
      style={{ background: "var(--card)", border: "1px solid var(--border)" }}
    >
      <h4 className="mb-4" style={{ color: "#94a3b8", fontFamily: "'Inter', sans-serif" }}>
        {title}
      </h4>
      {children}
    </div>
  );
}

export function ClassicalBenchmark() {
  return (
    <div>
      <SectionHeader
        tag="Benchmark"
        title="Classical Scheduling Algorithms Benchmark"
        description="Performance comparison of traditional CPU scheduling algorithms across key operating system metrics."
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <ChartCard title="Average Waiting Time (ms)">
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={ALGORITHMS} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff08" vertical={false} />
              <XAxis dataKey="name" tick={axisStyle} axisLine={false} tickLine={false} />
              <YAxis tick={axisStyle} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={tooltipStyle} cursor={{ fill: "#ffffff06" }} />
              <Bar dataKey="avgWT" name="Avg Waiting Time" fill="#00d4ff" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Average Turnaround Time (ms)">
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={ALGORITHMS} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff08" vertical={false} />
              <XAxis dataKey="name" tick={axisStyle} axisLine={false} tickLine={false} />
              <YAxis tick={axisStyle} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={tooltipStyle} cursor={{ fill: "#ffffff06" }} />
              <Bar dataKey="avgTAT" name="Avg Turnaround Time" fill="#7c3aed" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Context Switches">
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={ALGORITHMS} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff08" vertical={false} />
              <XAxis dataKey="name" tick={axisStyle} axisLine={false} tickLine={false} />
              <YAxis tick={axisStyle} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={tooltipStyle} cursor={{ fill: "#ffffff06" }} />
              <Bar dataKey="ctxSwitches" name="Context Switches" fill="#06b6d4" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Comparison Chart */}
        <ChartCard title="All Metrics Comparison">
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={ALGORITHMS} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
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
      </div>

      {/* Results Table */}
      <div
        className="rounded-xl overflow-hidden mb-6"
        style={{ border: "1px solid var(--border)" }}
      >
        <div
          className="px-5 py-4"
          style={{ background: "var(--secondary)", borderBottom: "1px solid var(--border)" }}
        >
          <h4 style={{ color: "#94a3b8", fontFamily: "'Inter', sans-serif" }}>Benchmark Metrics Table</h4>
        </div>
        <table className="w-full" style={{ background: "var(--card)" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid var(--border)" }}>
              {["Algorithm", "Avg Waiting Time", "Avg Turnaround Time", "Throughput", "Context Switches"].map((h) => (
                <th
                  key={h}
                  className="text-left px-5 py-3 text-xs tracking-wider"
                  style={{ color: "var(--muted-foreground)", fontFamily: "'Inter', sans-serif" }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {ALGORITHMS.map((row, i) => (
              <tr
                key={row.name}
                style={{
                  borderBottom: i < ALGORITHMS.length - 1 ? "1px solid var(--border)" : "none",
                  background: row.name === "SJF" ? "#00d4ff08" : "transparent",
                }}
              >
                <td className="px-5 py-3">
                  <span
                    className="text-sm font-medium"
                    style={{
                      color: row.name === "SJF" ? "#00d4ff" : "#e2e8f0",
                      fontFamily: "'Inter', sans-serif",
                    }}
                  >
                    {row.name}
                    {row.name === "SJF" && (
                      <span className="ml-2 text-xs px-1.5 py-0.5 rounded" style={{ background: "#00d4ff18", color: "#00d4ff" }}>
                        Best WT
                      </span>
                    )}
                  </span>
                </td>
                <td
                  className="px-5 py-3 text-sm"
                  style={{ color: "#94a3b8", fontFamily: "'JetBrains Mono', monospace" }}
                >
                  {row.avgWT.toFixed(2)}
                </td>
                <td
                  className="px-5 py-3 text-sm"
                  style={{ color: "#94a3b8", fontFamily: "'JetBrains Mono', monospace" }}
                >
                  {row.avgTAT.toFixed(2)}
                </td>
                <td
                  className="px-5 py-3 text-sm"
                  style={{ color: "#94a3b8", fontFamily: "'JetBrains Mono', monospace" }}
                >
                  {row.throughput.toFixed(2)}
                </td>
                <td
                  className="px-5 py-3 text-sm"
                  style={{
                    color: row.ctxSwitches === 22 ? "#f59e0b" : "#94a3b8",
                    fontFamily: "'JetBrains Mono', monospace",
                  }}
                >
                  {row.ctxSwitches}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <InsightCard
        text="Shortest Job First achieved the lowest waiting time and turnaround time because it assumes prior burst-time knowledge, making it a strong theoretical scheduling baseline. Its performance sets the upper bound for schedulers with oracle information access."
      />
    </div>
  );
}
