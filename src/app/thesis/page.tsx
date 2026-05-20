import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Investment Thesis | Investor Dashboard",
  description: "Edin Capital's investment thesis: human flourishing through sustainable venture capital and economic development.",
};

export default function ThesisPage() {
  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-4xl mx-auto px-6 py-12 lg:py-16">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-2xl font-semibold tracking-tight text-gray-900 sm:text-3xl">
            Investment Thesis
          </h1>
          <p className="mt-4 text-lg text-gray-600 leading-relaxed max-w-3xl">
            Capital deployed with intention — building durable companies that create lasting
            economic value for founders, communities, and investors alike.
          </p>
        </div>

        <div className="space-y-12">

          {/* The Opportunity */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">The Opportunity</h2>
            <div className="prose prose-gray max-w-none text-gray-700 leading-relaxed space-y-4">
              <p>
                Traditional venture capital serves less than 0.04% of small businesses. It focuses
                exclusively on hypergrowth companies pursuing billion-dollar outcomes — leaving a massive
                gap for strong, viable businesses that don&apos;t fit the unicorn-or-bust model but still
                need growth capital.
              </p>
              <p>
                These are companies with real revenue, healthy margins, and domain-expert founders building
                in sectors that matter: health, education, workforce development, housing, food systems,
                and community infrastructure. They represent the backbone of local economies, yet institutional
                capital largely ignores them.
              </p>
              <p>
                Edin Capital exists to close that gap — with a financial instrument designed specifically
                for this market.
              </p>
            </div>
          </section>

          {/* Human Flourishing */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Human Flourishing</h2>
            <div className="prose prose-gray max-w-none text-gray-700 leading-relaxed space-y-4">
              <p>
                We invest in industries and sectors that directly contribute to human flourishing —
                areas where the products and services being built improve people&apos;s daily lives, health,
                economic mobility, and long-term wellbeing.
              </p>
              <p>
                This is not impact investing as a concession. These are commercially strong businesses
                operating in large, growing markets. The thesis is that companies building things people
                genuinely need — in health, education, housing, food, and financial access — are
                more durable, retain customers longer, and generate more predictable revenue.
              </p>
              <p>
                When a company helps someone get healthier, better educated, better housed, or more
                financially stable, that company earns loyalty that is difficult to replicate. This
                durability is what makes the Venture Bond model work: steady profits from companies
                that serve real needs.
              </p>
            </div>
          </section>

          {/* The Venture Bond Advantage */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">The Venture Bond Advantage</h2>
            <div className="prose prose-gray max-w-none text-gray-700 leading-relaxed space-y-4">
              <p>
                The Venture Bond combines convertible equity with structured profit-sharing. This means
                investors begin receiving distributions as portfolio companies become profitable —
                not in 7-12 years when an exit might occur, but continuously as companies grow.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 not-prose my-6">
                <div className="rounded-lg border border-gray-200 bg-gray-50 p-5">
                  <h3 className="font-semibold text-gray-900 text-sm mb-2">For Investors</h3>
                  <ul className="text-sm text-gray-600 space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 mt-0.5 flex-shrink-0">&#10003;</span>
                      Regular distributions from profit-sharing
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 mt-0.5 flex-shrink-0">&#10003;</span>
                      Reduced risk through higher portfolio success rates
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 mt-0.5 flex-shrink-0">&#10003;</span>
                      Retained equity upside for exit events
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 mt-0.5 flex-shrink-0">&#10003;</span>
                      Liquidity without relying on rare unicorn outcomes
                    </li>
                  </ul>
                </div>
                <div className="rounded-lg border border-gray-200 bg-gray-50 p-5">
                  <h3 className="font-semibold text-gray-900 text-sm mb-2">For Founders</h3>
                  <ul className="text-sm text-gray-600 space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 mt-0.5 flex-shrink-0">&#10003;</span>
                      Aligned incentives on sustainable growth
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 mt-0.5 flex-shrink-0">&#10003;</span>
                      No pressure to pursue hypergrowth at all costs
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 mt-0.5 flex-shrink-0">&#10003;</span>
                      More comfortable terms than traditional VC
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 mt-0.5 flex-shrink-0">&#10003;</span>
                      Path to profitability without sacrificing control
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Economic Development Flywheel */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">The Economic Development Flywheel</h2>
            <div className="prose prose-gray max-w-none text-gray-700 leading-relaxed space-y-4">
              <p>
                Because the Venture Bond targets a higher success rate across the portfolio — investing
                in companies with proven revenue and sustainable margins — the downstream effects are
                fundamentally different from traditional VC.
              </p>
              <p>
                More companies succeed. More companies hire. More jobs are created at better wages.
                More wealth is generated locally. And as these companies grow, they reinvest in their
                communities — creating a regenerative cycle of economic development.
              </p>
              <div className="not-prose my-6">
                <div className="rounded-lg border border-green-200 bg-green-50/50 p-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-green-800">75%</div>
                      <div className="text-xs text-green-700 mt-1">Target portfolio success rate</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-green-800">35</div>
                      <div className="text-xs text-green-700 mt-1">Portfolio companies</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-green-800">More Jobs</div>
                      <div className="text-xs text-green-700 mt-1">Higher wages, local reinvestment</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-green-800">Durable</div>
                      <div className="text-xs text-green-700 mt-1">Wealth creation, not extraction</div>
                    </div>
                  </div>
                </div>
              </div>
              <p>
                This model is particularly compelling for foundations, family offices, government
                agencies, and economic development organizations seeking both financial returns and
                measurable community outcomes. It is capital deployed in service of both — not one
                at the expense of the other.
              </p>
            </div>
          </section>

          {/* Why Now */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Why Now</h2>
            <div className="prose prose-gray max-w-none text-gray-700 leading-relaxed space-y-4">
              <p>
                The venture landscape is shifting. Founders are increasingly skeptical of the traditional
                VC model — its misaligned incentives, pressure to grow at all costs, and dependence on
                outcomes that statistically rarely occur. Meanwhile, LPs are asking harder questions about
                liquidity, risk concentration, and the timeline to returns.
              </p>
              <p>
                The market is ready for a new approach. One that generates competitive returns through
                discipline rather than luck, that creates liquidity through profit-sharing rather than
                exit dependency, and that builds companies designed to last.
              </p>
              <p>
                Edin Capital is that approach.
              </p>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}
