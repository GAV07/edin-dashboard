'use client';

import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react'
import { PageHead } from '@/components/portal/ui';
import { FUND } from '@/constants/fund';

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
      "answer": `Our profit-sharing mechanism activates at the later of a time trigger and a revenue/margin condition being met. The structure follows a tiered approach: ${FUND.tranches} of net income, stepping down as cumulative distributions reach 2×, 4×, and 6× respectively, then 1% in perpetuity. Combined with equity participation, this structure delivers strong returns with uncapped upside.`
    },
    {
      "question": "How does Edin Capital differ from traditional venture capital?",
      "answer": "Unlike traditional VC that relies on a power law distribution where most investments fail and returns depend on 1-2 outliers, Edin Capital focuses on durable, growth-oriented companies where every Venture Bond investment contributes substantial returns. We prioritize companies showing a path to $30M+ revenue rather than the $100M+ hypergrowth targets of traditional VC, and provide recurring distributions through profit-sharing rather than exit-dependent liquidity."
    },
    {
      "question": "What types of companies does Edin Capital invest in?",
      "answer": "We invest in early growth-stage companies that have reached or have a clear path to 7-figure annual revenue. We seek strong operators looking to take their business to the next level and need capital to expand or evolve. Our approach is industry-agnostic, focusing on growth-minded businesses that may be adverse to traditional VC pressure, including tech-enabled services with scalable yet stable qualities."
    },
    {
      "question": "What is the size of your fund and typical investment?",
      "answer": `${FUND.legalName} has a target size of ${FUND.targetSize} (hard cap ${FUND.hardCap}), with plans to invest in ${FUND.targetPortfolio} companies. Our average check size is ${FUND.avgCheck}. The fund is structured as a perpetual vehicle domiciled in ${FUND.domicile} with a ${FUND.managementFee} / ${FUND.carry} fee and carry structure, ${FUND.minCommitment} LP minimum, and priority co-invest allocation to anchor LPs.`
    },
    {
      "question": "Who is behind Edin Capital?",
      "answer": "Edin Capital brings together expertise across venture investing, company building, institutional operations, and regional economic development. Andrew Davis (Managing Partner) has founded three companies and invested in 30+ early-stage startups globally. Aurelia Edwards (General Partner) is a 4x founder whose companies have served celebrities, athletes, and HNWIs. Erick Gavin (General Partner) is the former Executive Director of Venture Miami, leveraging a decade of experience in law, accelerator design, and ecosystem building."
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
    <>
      <PageHead
        num="10"
        eyebrow="FAQ"
        title={<>Frequently asked <em>questions.</em></>}
        lede="Common questions about Edin Capital, the Venture Bond, and our investment approach."
      />

      <dl style={{ display: 'flex', flexDirection: 'column' }}>
        {faqs.map((faq) => (
          <Disclosure key={faq.question} as="div" className="panel" style={{ padding: 0 }}>
            <dt>
              <DisclosureButton
                className="group"
                style={{
                  display: 'flex',
                  width: '100%',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  textAlign: 'left',
                  padding: 'var(--space-5) var(--space-6)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: 'var(--text-strong)',
                  fontSize: 'var(--text-base)',
                  fontWeight: 600,
                  lineHeight: 'var(--leading-relaxed)',
                }}
              >
                <span>{faq.question}</span>
                <span style={{ marginLeft: 'var(--space-4)', flexShrink: 0, fontSize: 'var(--text-xl)', color: 'var(--text-muted)' }}>
                  <span className="group-data-[open]:hidden">+</span>
                  <span className="group-[&:not([data-open])]:hidden">&minus;</span>
                </span>
              </DisclosureButton>
            </dt>
            <DisclosurePanel as="dd" style={{ padding: '0 var(--space-6) var(--space-6)', margin: 0 }}>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', lineHeight: 'var(--leading-relaxed)' }}>
                {faq.answer}
              </p>
            </DisclosurePanel>
          </Disclosure>
        ))}
      </dl>
    </>
  )
}
