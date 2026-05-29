import { Metadata } from "next";

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

export default function ThesisPage() {
  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-6xl mx-auto px-6 py-6 lg:py-8">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-semibold tracking-tight text-gray-900 sm:text-3xl mb-2">
            Investment Thesis
          </h1>
          <p className="text-gray-600 leading-relaxed max-w-3xl text-sm">
            Edin Capital targets a structural gap in venture: profitable, seed-stage companies
            with strong unit economics that are underserved by traditional VC. These founders
            prioritize sustainable growth over hypergrowth and our Venture Bond instrument
            is designed specifically for them.
          </p>
        </div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* LEFT: Company Profile */}
          <div>
            <h2 className="text-base font-semibold text-gray-900 mb-3">Company Profile</h2>
            <div className="space-y-3">
              {companyProfile.map((section) => (
                <div
                  key={section.title}
                  className="rounded-lg border border-gray-200 bg-gray-50 p-4"
                >
                  <h3 className="text-xs font-semibold text-gray-900 uppercase tracking-wide mb-2">
                    {section.title}
                  </h3>
                  <ul className="space-y-1">
                    {section.items.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-gray-600">
                        <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-green-600 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: Sectors & Framework */}
          <div>
            <h2 className="text-base font-semibold text-gray-900 mb-3">Sectors & Framework</h2>
            <p className="text-sm text-gray-600 mb-3 leading-relaxed">
              We invest in companies that build novel, scalable solutions
              contributing to the full spectrum of human flourishing, organized
              across three layers.
            </p>
            <div className="space-y-3">
              {layers.map((layer) => (
                <div
                  key={layer.name}
                  className="rounded-lg border border-gray-200 bg-gray-50 p-4"
                >
                  <h3 className="text-sm font-semibold text-gray-900 mb-1">
                    {layer.name}
                  </h3>
                  <p className="text-xs text-gray-500 mb-2 leading-relaxed">
                    {layer.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {layer.sectors.map((sector) => (
                      <span
                        key={sector}
                        className="inline-block text-xs font-medium text-green-800 bg-green-50 border border-green-200 rounded-md px-2 py-0.5"
                      >
                        {sector}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Synthesis */}
        <section className="rounded-lg border border-gray-200 bg-gray-50 p-5">
          <h2 className="text-base font-semibold text-gray-900 mb-3">Why This Combination</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div>
              <h3 className="text-xs font-semibold text-gray-900 uppercase tracking-wide mb-1.5">
                Structural Resilience
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Companies with real revenue, strong margins, and capital-efficient models
                are built to weather market cycles. Not dependent on follow-on funding
                or exit timing.
              </p>
            </div>
            <div>
              <h3 className="text-xs font-semibold text-gray-900 uppercase tracking-wide mb-1.5">
                Socioeconomic Growth
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                From health and education to infrastructure and workforce, these sectors
                are the engines of regional economies. Backing them creates durable,
                compounding value.
              </p>
            </div>
            <div>
              <h3 className="text-xs font-semibold text-gray-900 uppercase tracking-wide mb-1.5">
                Human Flourishing
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                This portfolio construction systematically promotes human flourishing:
                profitable companies in essential sectors, led by domain experts,
                building for communities that need it most.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
