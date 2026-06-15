import { Metadata } from "next";
import { PageHead, Badge } from "@/components/portal/ui";

export const metadata: Metadata = {
  title: "EdinOS Platform Roadmap | Investor Dashboard",
  description: "EdinOS: the operating system behind the Venture Bond.",
};

const phases = [
  {
    num: "1",
    title: "Core Operations",
    sub: "Fund-launch essentials — required to execute the Venture Bond strategy.",
    status: "In development" as const,
    items: [
      { title: "Real-time profit calculations", desc: "Automated quarterly profit-sharing calculations with intelligent trigger monitoring across the portfolio." },
      { title: "Smart distribution engine", desc: "Seamless LP distributions with tiered percentage structures and automated reconciliation." },
      { title: "Secure payment rails", desc: "Bank-grade security for fund operations with automated reconciliation and audit trails." },
      { title: "Health scoring", desc: "Portfolio-company health from profit, revenue, margin, and growth data to surface risk early." },
    ],
  },
  {
    num: "2",
    title: "Intelligence Layer",
    sub: "Data infrastructure that makes core operations smarter over time.",
    status: "In development" as const,
    items: [
      { title: "Data capture", desc: "Comprehensive collection from portfolio interactions, financials, and operations — the foundation for all intelligence." },
      { title: "AI processing", desc: "Pattern recognition across portfolio data to identify trends, flag anomalies, and surface insights at scale." },
      { title: "Automated actions", desc: "Workflows that move data between systems, trigger notifications, and reduce manual operational load." },
    ],
  },
  {
    num: "3",
    title: "Where This Goes",
    sub: "Capabilities that become possible as portfolio data matures.",
    status: "Future" as const,
    items: [
      { title: "Predictive analytics", desc: "AI forecasting for revenue trajectories, portfolio outcomes, and market trends — requires sufficient data cycles." },
      { title: "Prescriptive insights", desc: "Actionable, data-driven recommendations for portfolio companies and fund operations from historical patterns." },
    ],
  },
];

export default function EdinOSPage() {
  return (
    <>
      <PageHead
        num="07"
        eyebrow="EdinOS · Platform roadmap"
        title={<>The operating system behind <em>the bond.</em></>}
        lede="EdinOS is Edin's internal platform — it powers the core financial mechanics of the Venture Bond, from profit-sharing calculations to distribution execution, and grows alongside the fund."
      />

      <div style={{ position: "relative" }}>
        {phases.map((ph, pi) => (
          <section key={ph.num} style={{ marginBottom: pi < phases.length - 1 ? "var(--space-7)" : 0 }}>
            <div style={{ display: "flex", alignItems: "center", gap: "var(--space-3)", marginBottom: "var(--space-4)" }}>
              <span
                style={{
                  width: 36, height: 36, borderRadius: "50%", flex: "none",
                  display: "grid", placeItems: "center",
                  background: ph.status === "Future" ? "var(--surface-sunken)" : "var(--green-700)",
                  color: ph.status === "Future" ? "var(--text-muted)" : "var(--paper-100)",
                  fontFamily: "var(--font-serif)", fontSize: "var(--text-md)",
                }}
              >
                {ph.num}
              </span>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: "var(--space-3)" }}>
                  <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "var(--text-xl)", fontWeight: 400, color: "var(--text-strong)", margin: 0 }}>
                    {ph.title}
                  </h2>
                  <Badge tone={ph.status === "Future" ? "neutral" : "info"} dot={ph.status !== "Future"}>
                    {ph.status}
                  </Badge>
                </div>
                <p style={{ fontSize: "var(--text-sm)", color: "var(--text-muted)", marginTop: 2 }}>{ph.sub}</p>
              </div>
            </div>

            <div
              className="ed-grid"
              style={{
                marginLeft: 48,
                gridTemplateColumns: ph.items.length === 4 ? "repeat(2,1fr)" : ph.items.length === 2 ? "repeat(2,1fr)" : "repeat(3,1fr)",
              }}
            >
              {ph.items.map((it) => (
                <div
                  className="panel panel-pad"
                  key={it.title}
                  style={ph.status === "Future" ? { borderStyle: "dashed", background: "var(--surface-app)" } : {}}
                >
                  <div style={{
                    fontFamily: "var(--font-serif)", fontSize: "var(--text-md)",
                    color: ph.status === "Future" ? "var(--text-secondary)" : "var(--text-strong)",
                    marginBottom: "var(--space-2)",
                  }}>
                    {it.title}
                  </div>
                  <p style={{ fontSize: "var(--text-sm)", color: "var(--text-muted)", lineHeight: 1.55 }}>{it.desc}</p>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>

      <p className="section-note" style={{ marginTop: "var(--space-6)" }}>
        Predictive capabilities require multiple investment cycles to build sufficient data. These features develop as the fund matures.
      </p>
    </>
  );
}
