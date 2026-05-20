import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Portfolio Support | Investor Dashboard",
  description: "The Edin Experience: how we support portfolio companies beyond capital.",
};

export default function PortfolioSupportPage() {
  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-4xl mx-auto px-6 py-12 lg:py-16">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-2xl font-semibold tracking-tight text-gray-900 sm:text-3xl">
            The Edin Experience
          </h1>
          <p className="mt-4 text-lg text-gray-600 leading-relaxed max-w-3xl">
            How we support our portfolio companies beyond capital — through direct engagement,
            network access, and operational guidance.
          </p>
        </div>

        <div className="space-y-10">

          {/* Core Support */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">What We Provide</h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              Every Edin portfolio company receives hands-on support designed to accelerate
              sustainable growth. Our approach is layered — starting with what we can deliver
              directly through our team and network, then expanding as the portfolio matures.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="rounded-lg border border-gray-200 bg-gray-50 p-5">
                <h3 className="font-semibold text-gray-900 text-sm mb-2">Strategic Guidance</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Regular check-ins with the Edin team on growth strategy, operational
                  challenges, and market positioning. Direct access to partners who have
                  built and scaled businesses.
                </p>
              </div>
              <div className="rounded-lg border border-gray-200 bg-gray-50 p-5">
                <h3 className="font-semibold text-gray-900 text-sm mb-2">Network Access</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Introductions to potential customers, partners, and talent through our
                  extensive South Florida and national network — cultivated over 10+ years
                  of ecosystem building.
                </p>
              </div>
              <div className="rounded-lg border border-gray-200 bg-gray-50 p-5">
                <h3 className="font-semibold text-gray-900 text-sm mb-2">Operational Support</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Guidance on financial operations, technology adoption, and scaling
                  infrastructure — informed by our own experience building internal
                  systems and tools.
                </p>
              </div>
              <div className="rounded-lg border border-gray-200 bg-gray-50 p-5">
                <h3 className="font-semibold text-gray-900 text-sm mb-2">Community</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Connection to the broader Edin portfolio — peer founders who understand
                  the Venture Bond model and are building sustainable, profitable businesses.
                </p>
              </div>
            </div>
          </section>

          {/* Philosophy */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Our Approach</h2>
            <div className="rounded-lg border border-green-200 bg-green-50/50 p-6">
              <p className="text-gray-700 leading-relaxed">
                We believe portfolio support should start with what we can deliver independently
                and through our network — at no additional cost to the founder. As the fund
                grows, we will layer in specialized resources and partnerships based on what
                our portfolio companies actually need, not what looks good on a slide deck.
              </p>
              <p className="text-gray-700 leading-relaxed mt-4">
                This page will evolve as we formalize our support framework. We are actively
                developing the structure and partnerships that will define the full Edin Experience.
              </p>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}
