import { useState } from "react";
import { Sidebar } from "./components/Sidebar";
import { Overview } from "./components/pages/Overview";
import { ClassicalBenchmark } from "./components/pages/ClassicalBenchmark";
import { PPOGeneralization } from "./components/pages/PPOGeneralization";
import { StabilityFairness } from "./components/pages/StabilityFairness";
import { Conclusions } from "./components/pages/Conclusions";

type PageId = "overview" | "benchmark" | "generalization" | "stability" | "conclusions";

const PAGES: Record<PageId, React.ComponentType> = {
  overview: Overview,
  benchmark: ClassicalBenchmark,
  generalization: PPOGeneralization,
  stability: StabilityFairness,
  conclusions: Conclusions,
};

export default function App() {
  const [activePage, setActivePage] = useState<PageId>("overview");
  const PageComponent = PAGES[activePage];

  return (
    <div className="min-h-screen" style={{ background: "var(--background)", fontFamily: "'Inter', sans-serif" }}>
      <Sidebar activePage={activePage} onNavigate={(id) => setActivePage(id as PageId)} />
      <main
        className="ml-60 min-h-screen"
        style={{ background: "var(--background)" }}
      >
        {/* Top bar */}
        <div
          className="sticky top-0 z-10 px-8 py-4 flex items-center justify-between"
          style={{
            background: "rgba(3, 7, 18, 0.85)",
            backdropFilter: "blur(12px)",
            borderBottom: "1px solid var(--border)",
          }}
        >
          <div className="flex items-center gap-2 text-sm" style={{ color: "var(--muted-foreground)", fontFamily: "'JetBrains Mono', monospace" }}>
            <span style={{ color: "#00d4ff" }}>rl-scheduler</span>
            <span>/</span>
            <span>{activePage}</span>
          </div>
          <div
            className="flex items-center gap-2 text-xs px-3 py-1.5 rounded-full"
            style={{
              background: "#00d4ff10",
              border: "1px solid #00d4ff20",
              color: "#00d4ff",
              fontFamily: "'JetBrains Mono', monospace",
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: "#22c55e", boxShadow: "0 0 6px #22c55e" }} />
            PPO · 200K steps
          </div>
        </div>

        {/* Page content */}
        <div className="px-8 py-8 max-w-6xl">
          <PageComponent />
        </div>
      </main>
    </div>
  );
}
