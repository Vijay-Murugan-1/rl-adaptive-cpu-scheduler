import { LayoutDashboard, BarChart2, GitBranch, Shield, FileText, Cpu } from "lucide-react";

const pages = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "benchmark", label: "Classical Benchmark", icon: BarChart2 },
  { id: "generalization", label: "PPO Generalization", icon: GitBranch },
  { id: "stability", label: "Stability & Fairness", icon: Shield },
  { id: "conclusions", label: "Conclusions", icon: FileText },
];

interface SidebarProps {
  activePage: string;
  onNavigate: (id: string) => void;
}

export function Sidebar({ activePage, onNavigate }: SidebarProps) {
  return (
    <aside
      style={{ background: "var(--sidebar)", borderRight: "1px solid var(--sidebar-border)" }}
      className="fixed left-0 top-0 h-full w-60 flex flex-col z-20"
    >
      {/* Logo */}
      <div className="px-5 py-6 border-b" style={{ borderColor: "var(--sidebar-border)" }}>
        <div className="flex items-center gap-2.5">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, #00d4ff22, #7c3aed33)", border: "1px solid #00d4ff44" }}
          >
            <Cpu size={16} style={{ color: "var(--neon-blue)" }} />
          </div>
          <div>
            <div
              className="text-xs font-semibold tracking-wider uppercase"
              style={{ color: "var(--neon-blue)", fontFamily: "'Space Grotesk', sans-serif" }}
            >
              RL Scheduler
            </div>
            <div className="text-xs" style={{ color: "var(--sidebar-foreground)" }}>
              Research Dashboard
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 px-3 space-y-0.5">
        {pages.map(({ id, label, icon: Icon }) => {
          const active = activePage === id;
          return (
            <button
              key={id}
              onClick={() => onNavigate(id)}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-200 text-left"
              style={{
                background: active ? "linear-gradient(90deg, #00d4ff18, #7c3aed10)" : "transparent",
                color: active ? "#e2e8f0" : "var(--sidebar-foreground)",
                borderLeft: active ? "2px solid var(--neon-blue)" : "2px solid transparent",
              }}
            >
              <Icon
                size={15}
                style={{ color: active ? "var(--neon-blue)" : "var(--sidebar-foreground)" }}
              />
              <span style={{ fontFamily: "'Inter', sans-serif" }}>{label}</span>
            </button>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="px-5 py-4 border-t" style={{ borderColor: "var(--sidebar-border)" }}>
        <div className="text-xs" style={{ color: "var(--muted-foreground)", fontFamily: "'JetBrains Mono', monospace" }}>
          PPO · Stable-Baselines3
        </div>
        <div className="text-xs mt-0.5" style={{ color: "var(--muted-foreground)" }}>
          Reinforcement Learning Research Dashboard
        </div>
      </div>
    </aside>
  );
}
