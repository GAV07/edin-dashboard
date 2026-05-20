"use client";

import React, { useState } from 'react';
import { ExternalLink, ChevronDown, ChevronUp } from 'lucide-react';

interface ResearchTopic {
  id: string;
  title: string;
  summary: string;
  keyInsight: string;
  sources: {
    name: string;
    institution: string;
    url: string;
    highlight: string;
  }[];
}

const researchTopics: ResearchTopic[] = [
  {
    id: 'vc-performance',
    title: 'VC Fund Performance & Liquidity',
    summary: 'Traditional venture capital is underdelivering on returns and liquidity for LPs.',
    keyInsight: 'Only 14.3% of 2017-vintage VC funds achieved a DPI greater than 1x after 7 years — meaning most LPs haven\'t gotten their money back.',
    sources: [
      {
        name: 'VC Fund Performance Q4 2024 Report',
        institution: 'Carta',
        url: 'https://carta.com/data/vc-fund-performance-q4-2024-full-report/#vc-fund-performance-2024',
        highlight: '2017 vintage IRR dropped from 16.8% to 12.0%, underperforming S&P 500 at 12.83%',
      },
      {
        name: 'Global Fund Performance Report Q3 2024',
        institution: 'PitchBook',
        url: 'https://pitchbook.com/news/reports/q3-2024-global-fund-performance-report-with-preliminary-q4-2024-data',
        highlight: 'Extended hold periods and frozen exit markets across the venture landscape',
      },
      {
        name: 'US PE/VC Benchmark Commentary 2023',
        institution: 'Cambridge Associates',
        url: 'https://www.cambridgeassociates.com/insight/us-pe-vc-benchmark-commentary-calendar-year-2023/',
        highlight: 'Benchmarking data on VC fund returns relative to public market equivalents',
      },
      {
        name: 'Global Private Markets Report',
        institution: 'McKinsey & Company',
        url: 'https://www.mckinsey.com/industries/private-capital/our-insights/global-private-markets-report',
        highlight: 'Comprehensive analysis of private market fundraising, deployment, and performance trends',
      },
    ],
  },
  {
    id: 'founder-sentiment',
    title: 'Founder Sentiment & VC Relationships',
    summary: 'Founders are increasingly choosing to bootstrap over taking VC, signaling a structural shift in the market.',
    keyInsight: '77% of founders now choose to bootstrap over taking venture capital, and 71% report worsening investor relationships.',
    sources: [
      {
        name: 'Founder-VC Relationships 2024 Survey',
        institution: 'Sifted',
        url: 'https://sifted.eu/articles/founder-vc-relationships-2024',
        highlight: '71% of founders report worsening relationships with their investors',
      },
      {
        name: 'Founder Salary Report 2025',
        institution: 'Pilot',
        url: 'https://pilot.com/founder-salary-report-2025',
        highlight: 'Data on founder compensation, burn rates, and capital allocation preferences',
      },
      {
        name: 'Startup Failure Analysis',
        institution: 'Harvard Law School',
        url: 'https://corpgov.law.harvard.edu/2023/09/29/startup-failure/',
        highlight: '75% of venture-backed startups fail — the power law model depends on rare outliers',
      },
    ],
  },
  {
    id: 'market-opportunity',
    title: 'The Underserved Middle Market',
    summary: 'There are over 200,000 profitable companies in the US that are too big for angel investors and too small (or wrong shape) for traditional VC.',
    keyInsight: 'Traditional VC serves less than 0.04% of small businesses. 1.9M companies have >$500K revenue, and 200K+ maintain 30%+ margins.',
    sources: [
      {
        name: 'Business Counts by Company Size',
        institution: 'NAICS Association',
        url: 'https://www.naics.com/business-lists/counts-by-company-size/',
        highlight: '792K companies at $500K-$1M revenue; 547K at $1M-$2.5M; 222K at $2.5M-$5M',
      },
      {
        name: '2024 Capital Impact Report',
        institution: 'US Small Business Administration',
        url: 'https://www.sba.gov/document/report-sba-2024-capital-impact-report',
        highlight: 'Comprehensive analysis of small business capital access and funding gaps',
      },
      {
        name: 'Solving the Private Markets Allocation Gap',
        institution: 'Partners Group',
        url: 'https://www.partnersgroup.com/~/media/Files/P/Partnersgroup/Universal/news-and-views/solving-the-private-markets-allocation-gap-from-products-to-portfolio-construction.pdf',
        highlight: 'The allocation gap between institutional targets and actual private market deployment',
      },
    ],
  },
  {
    id: 'alternative-models',
    title: 'Alternative Investment Models & Diversification',
    summary: 'Research supports diversified, profit-oriented approaches to venture investing as generating more consistent returns.',
    keyInsight: 'Search fund and diversified venture models consistently outperform concentrated, exit-dependent strategies on a risk-adjusted basis.',
    sources: [
      {
        name: 'Search Funds Research',
        institution: 'Stanford GSB',
        url: 'https://www.gsb.stanford.edu/experience/about/centers-institutes/ces/research/search-funds',
        highlight: 'Search fund model demonstrates strong returns through acquisition of profitable businesses',
      },
      {
        name: 'Diversification in VC Funds',
        institution: 'IMD Business School',
        url: 'https://www.imd.org/ibyimd/finance/why-diversification-could-be-a-winning-formula-for-vc-funds/',
        highlight: 'Data showing diversified portfolios outperform concentrated bets in venture',
      },
      {
        name: 'SME Growth & Profitability',
        institution: 'Springer Academic Research',
        url: 'https://link.springer.com/article/10.1007/s11187-022-00684-9',
        highlight: 'Academic analysis of small and medium enterprise growth trajectories and sustainability',
      },
      {
        name: 'Industry Margin Data',
        institution: 'NYU Stern',
        url: 'https://pages.stern.nyu.edu/~adamodar/New_Home_Page/datafile/margin.html',
        highlight: 'Comprehensive margin benchmarks across industries — useful for portfolio company evaluation',
      },
    ],
  },
  {
    id: 'technology-adoption',
    title: 'Technology & AI Adoption in SMBs',
    summary: 'Small businesses adopting AI and technology platforms are growing significantly faster — expanding the investable universe.',
    keyInsight: '40% of small businesses have adopted AI tools (up 74% from 2023), and high-tech adopters see 89% sales growth vs 63% for low adopters.',
    sources: [
      {
        name: 'Impact of Technology on Small Business 2024',
        institution: 'US Chamber of Commerce',
        url: 'https://www.uschamber.com/assets/documents/Impact-of-Technology-on-Small-Business-Report-2024.pdf',
        highlight: '99% use technology platforms; high-tech adopters: 89% sales growth, 88% profit growth, 80% employment growth',
      },
      {
        name: 'AI Impact on Small Business Performance',
        institution: 'Cornell University (arXiv)',
        url: 'https://arxiv.org/abs/2411.14437',
        highlight: 'Research on how AI adoption is transforming small business operations and scalability',
      },
    ],
  },
];

export default function MarketResearch() {
  const [expandedTopic, setExpandedTopic] = useState<string | null>(null);

  const toggleTopic = (id: string) => {
    setExpandedTopic(expandedTopic === id ? null : id);
  };

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-5xl mx-auto px-6 py-12 lg:py-16">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-2xl font-semibold tracking-tight text-gray-900 sm:text-3xl">
            Market Research
          </h1>
          <p className="mt-4 text-gray-600 max-w-3xl leading-relaxed">
            A curated collection of research, data, and analysis from authoritative sources
            that inform our investment thesis. We believe the evidence points to a significant
            market opportunity for an alternative approach to venture capital.
          </p>
        </div>

        {/* Research Topics */}
        <div className="space-y-4">
          {researchTopics.map((topic) => (
            <div key={topic.id} className="rounded-lg border border-gray-200 overflow-hidden">
              {/* Topic Header */}
              <button
                onClick={() => toggleTopic(topic.id)}
                className="w-full p-5 text-left flex items-start justify-between hover:bg-gray-50 transition-colors"
              >
                <div className="flex-1 pr-4">
                  <h2 className="text-lg font-semibold text-gray-900">{topic.title}</h2>
                  <p className="text-sm text-gray-600 mt-1">{topic.summary}</p>
                  <div className="mt-2 inline-block rounded-md bg-blue-50 px-3 py-1.5 text-xs font-medium text-blue-800">
                    {topic.keyInsight}
                  </div>
                </div>
                <div className="flex-shrink-0 mt-1 text-gray-400">
                  {expandedTopic === topic.id ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </div>
              </button>

              {/* Expanded Sources */}
              {expandedTopic === topic.id && (
                <div className="border-t border-gray-100 bg-gray-50 p-5">
                  <h3 className="text-sm font-semibold text-gray-700 mb-3">Sources</h3>
                  <div className="space-y-3">
                    {topic.sources.map((source, idx) => (
                      <a
                        key={idx}
                        href={source.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block rounded-lg border border-gray-200 bg-white p-4 hover:border-blue-300 hover:shadow-sm transition-all"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <div className="font-medium text-gray-900 text-sm">{source.name}</div>
                            <div className="text-xs text-blue-600 font-medium mt-0.5">{source.institution}</div>
                            <p className="text-xs text-gray-500 mt-2 leading-relaxed">{source.highlight}</p>
                          </div>
                          <ExternalLink className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" />
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Footer Note */}
        <div className="mt-8 text-xs text-gray-400">
          <p>
            This research is provided for informational purposes to support investor due diligence.
            Sources are from third-party institutions and do not constitute endorsements of Edin Capital
            or the Venture Bond instrument.
          </p>
        </div>
      </div>
    </div>
  );
}
