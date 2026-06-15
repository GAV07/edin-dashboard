import { Metadata } from "next";
import { PageHead, SectionLabel } from "@/components/portal/ui";

export const metadata: Metadata = {
  title: "Investment Thesis | Investor Dashboard",
  description:
    "Edin Capital's investment thesis: human flourishing through integrated capital.",
};

const layers = [
  {
    name: "Elevators",
    description: "The multipliers that elevate human potential and enrich life",
    sectors: ["Frontier Tech", "Media & Entertainment", "Consumer Products"],
  },
  {
    name: "Equippers",
    description:
      "The stabilizing forces that expand capacity and increase resilience",
    sectors: [
      "Education & Workforce",
      "Hospitality & Community",
      "Manufacturing & Supply Chain",
    ],
  },
  {
    name: "Essentials",
    description: "The fundamentals that sustain people and communities",
    sectors: [
      "Health & Wellbeing",
      "Shelter & Safety",
      "Energy & Infrastructure",
    ],
  },
];

const companyProfile = [
  {
    title: "Financial Profile",
    items: [
      "$1M+ annual revenue with path to $15M+",
      "30%+ margins or clear path within 12 to 18 months",
      "Capital-efficient growth model",
      "Venture Bond-compatible profit-sharing potential",
    ],
  },
  {
    title: "Founder & Company",
    items: [
      "2 to 5+ years of operating history",
      "Domain-expert founders with deep industry knowledge",
      "Growth-minded but not VC-pressure dependent",
      "Clean cap table, limited or no debt",
    ],
  },
  {
    title: "Stage & Geography",
    items: [
      "Seed-stage companies prioritizing profitability over hypergrowth",
      "Southeast US emphasis with deep network in Florida tri-county",
      "National investment capability",
      "Regional economic development alignment preferred",
    ],
  },
];

const thesisWhy = [
  {
    title: "Structural Resilience",
    body: "Companies with real revenue, strong margins, and capital-efficient models are built to weather market cycles. Not dependent on follow-on funding or exit timing.",
  },
  {
    title: "Socioeconomic Growth",
    body: "From health and education to infrastructure and workforce, these sectors are the engines of regional economies. Backing them creates durable, compounding value.",
  },
  {
    title: "Human Flourishing",
    body: "This portfolio construction systematically promotes human flourishing: profitable companies in essential sectors, led by domain experts, building for communities that need it most.",
  },
];

export default function ThesisPage() {
  return (
    <>
      <PageHead
        num="02"
        eyebrow="Investment thesis"
        title={<>Profitable companies building <em>durable</em> value</>}
        lede="Edin Capital targets a structural gap in venture: profitable, seed-stage companies with strong unit economics that are underserved by traditional VC. These founders prioritize sustainable growth over hypergrowth and our Venture Bond instrument is designed specifically for them."
      />

      <div className="ed-grid ed-g2">
        {/* LEFT: Company Profile */}
        <div>
          <SectionLabel num="i">Company profile</SectionLabel>
          <div className="ed-grid">
            {companyProfile.map((section) => (
              <div key={section.title} className="panel panel-pad">
                <h3 className="panel-title" style={{ marginBottom: 'var(--space-3)' }}>
                  {section.title}
                </h3>
                <ul className="dash-list">
                  {section.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT: Sectors & Framework */}
        <div>
          <SectionLabel
            num="ii"
            note="We invest in companies that build novel, scalable solutions contributing to the full spectrum of human flourishing, organized across three layers."
          >
            Sectors &amp; framework
          </SectionLabel>
          <div className="ed-grid">
            {layers.map((layer) => (
              <div key={layer.name} className="panel panel--accent panel-pad">
                <h3 className="panel-title" style={{ marginBottom: 'var(--space-1)' }}>
                  {layer.name}
                </h3>
                <p className="section-note" style={{ margin: '0 0 var(--space-3)' }}>
                  {layer.description}
                </p>
                <div className="chip-row">
                  {layer.sectors.map((sector) => (
                    <span key={sector} className="chip">{sector}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <SectionLabel num="iii">Why this combination</SectionLabel>
      <div className="ed-grid ed-g3">
        {thesisWhy.map((item) => (
          <div key={item.title} className="panel panel--cream panel-pad">
            <h3 className="panel-title" style={{ marginBottom: 'var(--space-2)' }}>
              {item.title}
            </h3>
            <p className="section-note" style={{ margin: 0 }}>
              {item.body}
            </p>
          </div>
        ))}
      </div>
    </>
  );
}
