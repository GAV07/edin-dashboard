import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Portfolio Support | Investor Dashboard",
  description:
    "The Edin Experience: how we support portfolio companies beyond capital.",
};

const onboardingTimeline = [
  {
    timing: "Days 0\u20132",
    action: "Welcome pack, communication charter, and data-use summary",
  },
  {
    timing: "Days 3\u201314",
    action: "Intro call, KPI alignment, and 90-day success map",
  },
  {
    timing: "Days 15\u201321",
    action: "\u201c3-Gives\u201d delivery — three tangible value items (introductions, resources, or support)",
  },
  {
    timing: "Day 30",
    action: "First check-in and progress review",
  },
  {
    timing: "Month 2",
    action: "Community integration, peer match, and first KPI snapshot",
  },
  {
    timing: "Month 3",
    action: "90-day review — refresh priorities and support plan",
  },
];

const valueProps = [
  {
    title: "Strategic Clarity",
    description:
      "Diligence insights are converted into a practical post-investment playbook — strengths, risks, growth priorities, and where Edin can credibly help.",
  },
  {
    title: "Financial Discipline",
    description:
      "Stronger reporting, cash flow visibility, and operating cadence that builds the foundation for sustainable profit-sharing.",
  },
  {
    title: "Targeted Access",
    description:
      "Relevant introductions to customers, advisors, operators, and talent — not generic networks, but connections matched to each company\u2019s needs.",
  },
  {
    title: "Early Wins",
    description:
      "The \u201c3-Gives\u201d package delivers tangible value within the first 21 days — setting the tone that Edin shows up consistently after close.",
  },
  {
    title: "Operational Support",
    description:
      "Right-sized KPIs, reporting cadence, and ongoing check-ins that keep companies accountable without being overbearing.",
  },
  {
    title: "Founder Community",
    description:
      "Peer matching and community events connecting portfolio founders who share the Venture Bond model and a commitment to durable growth.",
  },
];

const fulfillmentLayers = [
  {
    name: "Edin Partners",
    focus: "Founder relationships, strategic judgment, governance, major introductions, high-stakes support",
  },
  {
    name: "Edin Team",
    focus: "Onboarding coordination, KPI collection, reporting workflows, event coordination, founder follow-up",
  },
  {
    name: "Venture Partners",
    focus: "Functional expertise, industry insight, GTM reviews, product strategy, pricing, talent planning",
  },
  {
    name: "Service Providers",
    focus: "Finance cleanup, legal, HR infrastructure, recruiting, marketing execution, fractional CFO/COO",
  },
  {
    name: "Platforms & Tools",
    focus: "Reporting dashboards, founder portal, startup perks, CRM, knowledge hub, community platform",
  },
];

export default function PortfolioSupportPage() {
  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-5xl mx-auto px-6 py-12 lg:py-16">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-2xl font-semibold tracking-tight text-gray-900 sm:text-3xl">
            The Edin Experience
          </h1>
          <p className="mt-4 text-lg text-gray-600 leading-relaxed max-w-3xl">
            How we support portfolio companies beyond capital — through
            structured onboarding, ongoing engagement, and a layered support
            model designed to increase the odds of execution.
          </p>
          <p className="mt-3 text-sm text-gray-500 max-w-3xl">
            Edin is not trying to become the management team. We provide
            structure, insight, access, accountability, and curated support that
            helps founders focus on what matters most.
          </p>
        </div>

        <div className="space-y-14">
          {/* First 90 Days */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              The First 90 Days
            </h2>
            <p className="text-sm text-gray-500 mb-6">
              Every portfolio company goes through a structured onboarding that
              delivers value before making heavy asks
            </p>
            <div className="overflow-hidden rounded-lg border border-gray-200">
              {onboardingTimeline.map((item, i) => (
                <div
                  key={item.timing}
                  className={`flex items-start gap-4 p-4 ${
                    i !== onboardingTimeline.length - 1
                      ? "border-b border-gray-200"
                      : ""
                  } ${i % 2 === 0 ? "bg-gray-50" : "bg-white"}`}
                >
                  <span className="flex-shrink-0 text-xs font-semibold text-primary w-24 pt-0.5">
                    {item.timing}
                  </span>
                  <p className="text-sm text-gray-700">{item.action}</p>
                </div>
              ))}
            </div>
          </section>

          {/* What Portfolio Companies Receive */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              What Portfolio Companies Receive
            </h2>
            <p className="text-sm text-gray-500 mb-6">
              Concrete support anchored to real needs — not vague
              &ldquo;value-add&rdquo; promises
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {valueProps.map((vp) => (
                <div
                  key={vp.title}
                  className="rounded-lg border border-gray-200 bg-gray-50 p-5"
                >
                  <h3 className="font-semibold text-gray-900 text-sm mb-2">
                    {vp.title}
                  </h3>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    {vp.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* How We Deliver */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              How We Deliver
            </h2>
            <p className="text-sm text-gray-500 mb-6">
              Five fulfillment layers — starting with what we deliver directly
              through our team, expanding through partners and platforms as the
              portfolio matures
            </p>
            <div className="overflow-hidden rounded-lg border border-gray-200">
              {fulfillmentLayers.map((layer, i) => (
                <div
                  key={layer.name}
                  className={`flex items-start gap-4 p-4 ${
                    i !== fulfillmentLayers.length - 1
                      ? "border-b border-gray-200"
                      : ""
                  } ${i % 2 === 0 ? "bg-gray-50" : "bg-white"}`}
                >
                  <span className="flex-shrink-0 text-xs font-semibold text-gray-900 uppercase tracking-wide w-36 pt-0.5">
                    {layer.name}
                  </span>
                  <p className="text-sm text-gray-600">{layer.focus}</p>
                </div>
              ))}
            </div>
          </section>

          {/* North Star */}
          <section>
            <div className="rounded-lg border border-green-200 bg-green-50/50 p-6">
              <p className="text-gray-700 leading-relaxed italic text-sm">
                &ldquo;They were thoughtful before they invested, clear during
                the process, and actually helpful after the check. They
                understood the business, helped us focus, opened relevant doors,
                and gave us structure without trying to run the
                company.&rdquo;
              </p>
              <p className="text-xs text-gray-500 mt-3">
                The portfolio experience we&apos;re building toward
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
