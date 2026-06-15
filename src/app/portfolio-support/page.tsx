import { Metadata } from "next";
import { PageHead, SectionLabel } from "@/components/portal/ui";

export const metadata: Metadata = {
  title: "Portfolio Support | Investor Dashboard",
  description: "The Edin Experience: how we support portfolio companies beyond capital.",
};

const timeline = [
  { timing: "Days 0–2", action: "Welcome pack, communication charter, and data-use summary." },
  { timing: "Days 3–14", action: "Intro call, KPI alignment, and a 90-day success map." },
  { timing: "Days 15–21", action: '\u201c3-Gives\u201d delivery \u2014 three tangible value items (intros, resources, support).' },
  { timing: "Day 30", action: "First check-in and progress review." },
  { timing: "Month 2", action: "Community integration, peer match, and first KPI snapshot." },
  { timing: "Month 3", action: "90-day review — refresh priorities and the support plan." },
];

const value = [
  { title: "Strategic clarity", desc: "Diligence insights become a practical post-investment playbook — strengths, risks, priorities, and where Edin can credibly help." },
  { title: "Financial discipline", desc: "Stronger reporting, cash-flow visibility, and operating cadence that build the foundation for sustainable profit-sharing." },
  { title: "Targeted access", desc: "Relevant introductions to customers, advisors, operators, and talent — connections matched to each company's needs." },
  { title: "Early wins", desc: 'The \u201c3-Gives\u201d package delivers tangible value within the first 21 days \u2014 Edin shows up consistently after close.' },
  { title: "Operational support", desc: "Right-sized KPIs, reporting cadence, and ongoing check-ins that keep companies accountable without being overbearing." },
  { title: "Founder community", desc: "Peer matching and events connecting portfolio founders who share the Venture Bond model and a commitment to durable growth." },
];

const layers = [
  { name: "Edin Partners", focus: "Founder relationships, strategic judgment, governance, major introductions, high-stakes support." },
  { name: "Edin Team", focus: "Onboarding coordination, KPI collection, reporting workflows, event coordination, follow-up." },
  { name: "Venture Partners", focus: "Functional expertise, industry insight, GTM reviews, product strategy, pricing, talent planning." },
  { name: "Service Providers", focus: "Finance cleanup, legal, HR infrastructure, recruiting, marketing execution, fractional CFO/COO." },
  { name: "Platforms & Tools", focus: "Reporting dashboards, founder portal, startup perks, CRM, knowledge hub, community platform." },
];

export default function PortfolioSupportPage() {
  return (
    <>
      <PageHead
        num="06"
        eyebrow="Portfolio support"
        title={<>The Edin <em>Experience.</em></>}
        lede="Support beyond capital — structured onboarding, ongoing engagement, and a layered delivery model designed to increase the odds of execution. Edin provides structure, insight, access, and accountability without trying to run the company."
      />

      <SectionLabel num="i" note="Every portfolio company goes through a structured onboarding that delivers value before making heavy asks.">
        The first 90 days
      </SectionLabel>
      <div className="tl">
        {timeline.map((t) => (
          <div className="tl-row" key={t.timing}>
            <span className="tl-when">{t.timing}</span>
            <span className="tl-what">{t.action}</span>
          </div>
        ))}
      </div>

      <SectionLabel num="ii">What portfolio companies receive</SectionLabel>
      <div className="ed-grid ed-g3">
        {value.map((v) => (
          <div className="panel panel-pad" key={v.title}>
            <div style={{ fontFamily: "var(--font-serif)", fontSize: "var(--text-md)", color: "var(--text-strong)", marginBottom: "var(--space-2)" }}>{v.title}</div>
            <p style={{ fontSize: "var(--text-sm)", color: "var(--text-muted)", lineHeight: 1.55 }}>{v.desc}</p>
          </div>
        ))}
      </div>

      <SectionLabel num="iii" note="Five fulfillment layers — starting with what Edin delivers directly, expanding through partners and platforms as the portfolio matures.">
        How we deliver
      </SectionLabel>
      <div className="tl">
        {layers.map((l) => (
          <div className="tl-row" key={l.name} style={{ gridTemplateColumns: "180px 1fr" }}>
            <span className="tl-when" style={{ textTransform: "uppercase", letterSpacing: "0.08em", fontSize: "var(--text-2xs)" }}>{l.name}</span>
            <span className="tl-what">{l.focus}</span>
          </div>
        ))}
      </div>

      <div className="panel panel--cream panel-pad panel--accent" style={{ marginTop: "var(--space-7)" }}>
        <p style={{ fontFamily: "var(--font-serif)", fontSize: "var(--text-lg)", fontStyle: "italic", lineHeight: 1.5, color: "var(--text-strong)", maxWidth: 820 }}>
          &ldquo;They were thoughtful before they invested, clear during the process, and actually helpful after the check. They understood the business, helped us focus, opened relevant doors, and gave us structure without trying to run the company.&rdquo;
        </p>
        <p style={{ fontSize: "var(--text-xs)", color: "var(--text-muted)", marginTop: "var(--space-3)" }}>
          The portfolio experience we&apos;re building toward.
        </p>
      </div>
    </>
  );
}
