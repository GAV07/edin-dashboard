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
    title: "Scale",
    items: [
      "Companies at or approaching seven-figure revenue with a credible path to $30M+",
    ],
  },
  {
    title: "Economics",
    items: [
      "Profitable or near-profitable, with a deliberate focus on efficient growth over capital-intensive hypergrowth",
    ],
  },
  {
    title: "Edge",
    items: [
      "Domain experts with structural, network, or knowledge-based defensibility",
    ],
  },
  {
    title: "Resilience",
    items: [
      "Insulated from AI displacement yet positioned to deploy it as an operational accelerant",
    ],
  },
  {
    title: "Readiness",
    items: [
      "Demonstrated, early product-market fit with strong signs of sustainable repeatability",
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
        title={<>Enduring businesses. <em>Built to last. Ready to grow.</em></>}
        lede="We back real businesses that don't compromise on ambition or stability. Our thesis targets durable, growth-oriented companies that existing capital was never designed to serve."
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
