'use client';

import React, { useState } from 'react';

// ─── Real data from Edin Radar pipeline (634 companies, 2,226 founders) ───

const pipelineStats = {
  companiesEvaluated: 634,
  foundersScreened: 2226,
  sourcingChannels: 85,
  targetInvestments: 35,
  avgCheckSize: '$2M',
  fastTrackCompanies: 21,
  thesisStrongCompanies: 138,
};

const sourcingChannels = [
  { scope: 'National', count: '5+', description: 'National databases, accelerator networks, and platform partnerships with broad deal coverage across the US' },
  { scope: 'Regional', count: '30+', description: 'Southeast-focused accelerators, incubators, angel groups, venture studios, and university programs' },
  { scope: 'Local', count: '50+', description: 'Direct relationships with founders, service providers, community organizations, and ecosystem partners across South Florida' },
];

// Company pipeline: industry distribution (from 2,612 industry tags across 634 companies)
const pipelineByIndustry = [
  { sector: 'AI & Data Analytics', percentage: 11.0 },
  { sector: 'Health & Digital Health', percentage: 7.0 },
  { sector: 'Software & Apps', percentage: 7.4 },
  { sector: 'Manufacturing & Engineering', percentage: 5.8 },
  { sector: 'Sustainability & Energy', percentage: 5.4 },
  { sector: 'Agriculture & Food', percentage: 5.8 },
  { sector: 'Biotechnology', percentage: 2.5 },
  { sector: 'Social Impact', percentage: 2.7 },
  { sector: 'Education', percentage: 2.4 },
  { sector: 'FinTech', percentage: 2.3 },
];

// Company pipeline: revenue stage (from company evaluations)
const pipelineByStage = [
  { stage: 'Pre-revenue', percentage: 85 },
  { stage: 'Growth ($1M–$3M)', percentage: 8 },
  { stage: 'Early ($500K–$1M)', percentage: 4 },
  { stage: 'Scale ($3M+)', percentage: 3 },
];

// Company pipeline: funding stage
const pipelineByFunding = [
  { stage: 'Bootstrapped', percentage: 39 },
  { stage: 'Seed', percentage: 28 },
  { stage: 'Pre-seed', percentage: 26 },
  { stage: 'Series A+', percentage: 7 },
];

// Founder network: geographic distribution (2,199 founders with location data)
const foundersByRegion = [
  { region: 'South Florida', percentage: 32 },
  { region: 'New York Metro', percentage: 7 },
  { region: 'SF Bay Area', percentage: 4 },
  { region: 'Los Angeles', percentage: 3 },
  { region: 'Atlanta', percentage: 3 },
  { region: 'Washington DC', percentage: 2 },
  { region: 'Other US', percentage: 49 },
];

// Company pipeline: geographic distribution
const companiesByRegion = [
  { region: 'Midwest', percentage: 38 },
  { region: 'South', percentage: 19 },
  { region: 'Other', percentage: 27 },
  { region: 'West', percentage: 8 },
  { region: 'Northeast', percentage: 6 },
  { region: 'Florida', percentage: 2 },
];

// Evaluation quality tiers
const evaluationTiers = [
  { tier: 'Fast Track', count: 21, color: 'bg-green-500' },
  { tier: 'Thesis Strong', count: 138, color: 'bg-blue-500' },
  { tier: 'Standard', count: 476, color: 'bg-gray-400' },
];

function HorizontalBar({ data, colorClass }: { data: { label: string; percentage: number }[]; colorClass: string }) {
  return (
    <div className="space-y-2">
      {data.map((item) => (
        <div key={item.label}>
          <div className="flex justify-between text-sm mb-1">
            <span className="text-gray-700">{item.label}</span>
            <span className="text-gray-500 font-medium">{item.percentage}%</span>
          </div>
          <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full ${colorClass}`}
              style={{ width: `${Math.min(item.percentage, 100)}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export default function CompanyShowcase() {
  const [activeView, setActiveView] = useState<'companies' | 'founders'>('companies');

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-6xl mx-auto px-6 py-12 lg:py-16">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-2xl font-semibold tracking-tight text-gray-900 sm:text-3xl">
            Deal Flow & Pipeline
          </h1>
          <p className="mt-4 text-gray-600 max-w-3xl leading-relaxed">
            Our pipeline is built on deep relationships across multiple channels — from
            national platforms to hyperlocal ecosystem connections cultivated over a decade
            in South Florida. Data shown reflects our active evaluation pipeline.
          </p>
        </div>

        {/* Pipeline Summary Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          <div className="rounded-lg border border-gray-200 bg-gray-50 p-5 text-center">
            <div className="text-2xl font-bold text-gray-900">{pipelineStats.companiesEvaluated.toLocaleString()}</div>
            <div className="text-xs text-gray-500 mt-1 uppercase tracking-wide">Companies evaluated</div>
          </div>
          <div className="rounded-lg border border-gray-200 bg-gray-50 p-5 text-center">
            <div className="text-2xl font-bold text-gray-900">{pipelineStats.foundersScreened.toLocaleString()}</div>
            <div className="text-xs text-gray-500 mt-1 uppercase tracking-wide">Founders screened</div>
          </div>
          <div className="rounded-lg border border-gray-200 bg-gray-50 p-5 text-center">
            <div className="text-2xl font-bold text-gray-900">{pipelineStats.sourcingChannels}+</div>
            <div className="text-xs text-gray-500 mt-1 uppercase tracking-wide">Sourcing channels</div>
          </div>
          <div className="rounded-lg border border-gray-200 bg-gray-50 p-5 text-center">
            <div className="text-2xl font-bold text-gray-900">{pipelineStats.targetInvestments}</div>
            <div className="text-xs text-gray-500 mt-1 uppercase tracking-wide">Target investments</div>
          </div>
        </div>

        {/* Evaluation Quality */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Evaluation Pipeline</h2>
          <p className="text-sm text-gray-500 mb-4">
            Every company in our pipeline is scored against our investment thesis across five dimensions:
            thesis alignment, market potential, execution capability, capital efficiency, and regional impact.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {evaluationTiers.map((tier) => (
              <div key={tier.tier} className="rounded-lg border border-gray-200 bg-gray-50 p-5">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${tier.color}`} />
                  <div>
                    <div className="text-2xl font-bold text-gray-900">{tier.count}</div>
                    <div className="text-xs text-gray-500 uppercase tracking-wide">{tier.tier}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Sourcing Channels */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Sourcing Channels</h2>
          <p className="text-sm text-gray-500 mb-4">
            We maintain relationships across national, regional, and local networks. Channel details
            are shared with committed LPs during due diligence.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {sourcingChannels.map((channel) => (
              <div key={channel.scope} className="rounded-lg border border-gray-200 bg-gray-50 p-5">
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-2xl font-bold text-gray-900">{channel.count}</span>
                  <span className="text-sm font-medium text-gray-600">{channel.scope}</span>
                </div>
                <p className="text-sm text-gray-500 leading-relaxed">{channel.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Pipeline Distribution — Tabbed */}
        <section className="mb-10">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Pipeline Distribution</h2>
            <div className="flex gap-1 rounded-lg border border-gray-200 p-0.5">
              {(['companies', 'founders'] as const).map((view) => (
                <button
                  key={view}
                  onClick={() => setActiveView(view)}
                  className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                    activeView === view
                      ? 'bg-green-700 text-white'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {view === 'companies' ? `Companies (${pipelineStats.companiesEvaluated})` : `Founders (${pipelineStats.foundersScreened.toLocaleString()})`}
                </button>
              ))}
            </div>
          </div>

          {activeView === 'companies' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-4 uppercase tracking-wide">By Industry</h3>
                <HorizontalBar
                  data={pipelineByIndustry.map(d => ({ label: d.sector, percentage: d.percentage }))}
                  colorClass="bg-green-500"
                />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-4 uppercase tracking-wide">By Funding Stage</h3>
                <HorizontalBar
                  data={pipelineByFunding.map(d => ({ label: d.stage, percentage: d.percentage }))}
                  colorClass="bg-blue-500"
                />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-4 uppercase tracking-wide">By Region</h3>
                <HorizontalBar
                  data={companiesByRegion.map(d => ({ label: d.region, percentage: d.percentage }))}
                  colorClass="bg-amber-500"
                />
              </div>
            </div>
          )}

          {activeView === 'founders' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-4 uppercase tracking-wide">Network by Region</h3>
                <HorizontalBar
                  data={foundersByRegion.map(d => ({ label: d.region, percentage: d.percentage }))}
                  colorClass="bg-green-500"
                />
                <p className="text-xs text-gray-400 mt-3">
                  Based on {pipelineStats.foundersScreened.toLocaleString()} founders screened from partner LinkedIn networks
                </p>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-4 uppercase tracking-wide">Company Revenue Stage</h3>
                <HorizontalBar
                  data={pipelineByStage.map(d => ({ label: d.stage, percentage: d.percentage }))}
                  colorClass="bg-blue-500"
                />
                <p className="text-xs text-gray-400 mt-3">
                  Revenue stage distribution across the evaluated company pipeline
                </p>
              </div>
            </div>
          )}
        </section>

        {/* Target Company Profile */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Target Company Profile</h2>
          <p className="text-sm text-gray-500 mb-6">
            We invest in &ldquo;Goldilocks&rdquo; companies — profitable businesses with real revenue,
            led by domain experts positioned between early-stage uncertainty and late-stage maturity.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-lg border border-gray-200 p-5">
              <h3 className="font-semibold text-gray-900 text-sm mb-3">Financial Profile</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="text-gray-400 mt-0.5 flex-shrink-0">&bull;</span>
                  $1M+ annual revenue with path to $15M+
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gray-400 mt-0.5 flex-shrink-0">&bull;</span>
                  30%+ margins or clear path within 12-18 months
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gray-400 mt-0.5 flex-shrink-0">&bull;</span>
                  Capital efficient growth model
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gray-400 mt-0.5 flex-shrink-0">&bull;</span>
                  Venture Bond-compatible profit-sharing potential
                </li>
              </ul>
            </div>
            <div className="rounded-lg border border-gray-200 p-5">
              <h3 className="font-semibold text-gray-900 text-sm mb-3">Founder & Company</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="text-gray-400 mt-0.5 flex-shrink-0">&bull;</span>
                  2-5+ years of operating history
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gray-400 mt-0.5 flex-shrink-0">&bull;</span>
                  Domain-expert founders with deep industry knowledge
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gray-400 mt-0.5 flex-shrink-0">&bull;</span>
                  Growth-minded but not VC-pressure dependent
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gray-400 mt-0.5 flex-shrink-0">&bull;</span>
                  Clean cap table, limited or no debt
                </li>
              </ul>
            </div>
            <div className="rounded-lg border border-gray-200 p-5">
              <h3 className="font-semibold text-gray-900 text-sm mb-3">Sector Focus</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="text-gray-400 mt-0.5 flex-shrink-0">&bull;</span>
                  Health, wellness, and life sciences
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gray-400 mt-0.5 flex-shrink-0">&bull;</span>
                  Education and workforce development
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gray-400 mt-0.5 flex-shrink-0">&bull;</span>
                  Tech-enabled services and AI/ML applications
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gray-400 mt-0.5 flex-shrink-0">&bull;</span>
                  Finance, housing, food systems, community infrastructure
                </li>
              </ul>
            </div>
            <div className="rounded-lg border border-gray-200 p-5">
              <h3 className="font-semibold text-gray-900 text-sm mb-3">Geographic Preference</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="text-gray-400 mt-0.5 flex-shrink-0">&bull;</span>
                  Southeast US emphasis — deep network in Florida tri-county
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gray-400 mt-0.5 flex-shrink-0">&bull;</span>
                  National investment capability
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gray-400 mt-0.5 flex-shrink-0">&bull;</span>
                  Regional economic development alignment preferred
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Investment Process */}
        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Investment Process</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[
              { step: '1', title: 'Sourcing', desc: 'Identified through network, inbound, or data-driven discovery', time: 'Ongoing' },
              { step: '2', title: 'Screening', desc: 'AI-assisted scoring on thesis match, market potential, and execution capability', time: 'Week 1' },
              { step: '3', title: 'Diligence', desc: 'Deep dive on financials, team, product-market fit, and Venture Bond suitability', time: 'Weeks 2-3' },
              { step: '4', title: 'Decision', desc: 'Investment committee review, term sheet, and closing', time: 'Week 4' },
            ].map((item) => (
              <div key={item.step} className="rounded-lg border border-gray-200 bg-gray-50 p-5">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-7 h-7 rounded-full bg-green-100 text-green-700 font-bold text-xs flex items-center justify-center">
                    {item.step}
                  </div>
                  <h3 className="font-semibold text-gray-900 text-sm">{item.title}</h3>
                </div>
                <p className="text-xs text-gray-500 leading-relaxed mb-2">{item.desc}</p>
                <span className="text-xs font-medium text-green-700">{item.time}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
