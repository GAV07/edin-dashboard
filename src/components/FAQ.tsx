import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react'
import { MinusIcon, PlusIcon } from '@heroicons/react/24/outline'

const faqs = [
    {
      "question": "What is Edin Capital?",
      "answer": "Edin Capital is an investment firm introducing a new financial instrument called the 'Venture Bond' that reimagines traditional venture capital to increase returns and liquidity, decrease risk, better align founders and investors, and drive economic development."
    },
    {
      "question": "What is a Venture Bond?",
      "answer": "A Venture Bond is a novel financial instrument that combines convertible equity with profit-sharing. This approach provides investors with less risk and more liquidity, while giving entrepreneurs access to capital with more comfortable terms than traditional VC. It enables market-leading, de-risked returns without requiring billion-dollar outcomes."
    },
    {
      "question": "How does the profit-sharing mechanism work?",
      "answer": "Our profit-sharing mechanism is triggered after specific conditions are met: typically 3 years post-investment, when a company reaches certain revenue targets (e.g., $2M LTM) and maintains healthy margins (e.g., 35%). The structure follows a tiered approach: 20% of profits until 2x the initial investment is returned, 10% until 4x, and 5% until 6x, with a total cap of 6x the initial investment."
    },
    {
      "question": "How does Edin Capital differ from traditional venture capital?",
      "answer": "Unlike traditional VC that relies on a power law distribution where most investments fail and returns depend on rare unicorns, Edin Capital focuses on sustainable growth companies with an enhanced log-normal distribution where a majority succeed. We prioritize companies showing a path to $15M revenue rather than the $100M+ hypergrowth targets of traditional VC, and provide continuous distributions rather than exit-dependent liquidity with 7-12+ year horizons."
    },
    {
      "question": "What types of companies does Edin Capital invest in?",
      "answer": "We invest in early growth-stage companies that have reached or have a clear path to 7-figure annual revenue. We seek strong operators looking to take their business to the next level and need capital to expand or evolve. Our approach is industry-agnostic, focusing on growth-minded businesses that may be adverse to traditional VC pressure, including tech-enabled services with scalable yet stable qualities."
    },
    {
      "question": "What is the size of your fund and typical investment?",
      "answer": "Edin Capital Fund I has a target size of $76M, with plans to invest in approximately 25 companies. Our average check size is $2M, with a target TVPI (Total Value to Paid-In Capital) of 3-4x."
    },
    {
      "question": "Who is behind Edin Capital?",
      "answer": "Edin Capital was founded by a diverse team with complementary expertise: Aurelia Edwards (General Partner, 3x founder and global investor), Erick Gavin (General Partner, former Executive Director at Venture Miami), and Andrew Davis (Managing Partner, award-winning founder trusted by Fortune 100 enterprises). Our team brings experience in entrepreneurship, investing, ecosystem development, and community building across South Florida's tri-county area."
    },
    {
      "question": "What advantages does the Venture Bond offer to investors?",
      "answer": "For investors, the Venture Bond offers less risk through reliable profit-sharing, increased liquidity through regular distributions rather than waiting for exits, competitive returns without requiring billion-dollar unicorn outcomes, and retained equity upside potential that preserves participation in any major exit event."
    },
    {
      "question": "What advantages does the Venture Bond offer to entrepreneurs?",
      "answer": "For entrepreneurs, the Venture Bond provides access to more capital, full alignment with investors on sustainable growth rather than the pressure to pursue hypergrowth at all costs, more comfortable terms than traditional VC, and a de-risked path to profitability that doesn't require sacrificing control or pushing for premature exits."
    },
    {
      "question": "Why is there a need for an alternative to traditional venture capital?",
      "answer": "Traditional VC serves less than 0.04% of small businesses, focusing exclusively on hypergrowth companies pursuing billion-dollar outcomes. This leaves a massive funding gap for strong, viable businesses that don't fit the unicorn-hunting, boom-or-bust model. Our approach addresses this market gap by providing institutional capital to promising companies that fall outside traditional VC scope but still need growth capital."
    },
    {
      "question": "What is your geographic focus?",
      "answer": "While we invest across the United States with a particular focus on the Southeast, our team has deep roots in South Florida's tri-county area. With team members based in Miami-Dade, Broward, and Palm Beach counties, we leverage our extensive regional network to identify opportunities in one of the fastest-growing, most diverse, and wealthiest regions in the world."
    },
    {
      "question": "How does the cash flow work with your profit-sharing model?",
      "answer": "Once trigger criteria are verified, companies submit quarterly financial data that determines the profit-sharing amount. Payments are typically distributed monthly over the subsequent quarter. Our system tracks cumulative returns and automatically adjusts the sharing percentage as companies reach different return tiers. The fund then aggregates profit shares from all portfolio companies for quarterly distributions to investors."
    },
    {
      "question": "How does this model impact economic development?",
      "answer": "By investing in a wider range of companies with higher success rates, we create more jobs, higher wages, and more entrepreneurial growth opportunities. This leads to a regenerative cycle where more companies are built and more capital is deployed, creating sustainable socioeconomic growth. This makes our model particularly attractive to government agencies, economic development organizations, non-profits, and foundations seeking both financial and community returns."
    }
]

export default function FAQ() {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8 lg:py-40">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
            Frequently asked questions
          </h2>
          <dl className="mt-16 divide-y divide-gray-900/10">
            {faqs.map((faq) => (
              <Disclosure key={faq.question} as="div" className="py-6 first:pt-0 last:pb-0">
                <dt>
                  <DisclosureButton className="group flex w-full items-start justify-between text-left text-gray-900">
                    <span className="text-base/7 font-semibold">{faq.question}</span>
                    <span className="ml-6 flex h-7 items-center">
                      <PlusIcon aria-hidden="true" className="size-6 group-data-[open]:hidden" />
                      <MinusIcon aria-hidden="true" className="size-6 group-[&:not([data-open])]:hidden" />
                    </span>
                  </DisclosureButton>
                </dt>
                <DisclosurePanel as="dd" className="mt-2 pr-12">
                  <p className="text-base/7 text-gray-600">{faq.answer}</p>
                </DisclosurePanel>
              </Disclosure>
            ))}
          </dl>
        </div>
      </div>
    </div>
  )
}
