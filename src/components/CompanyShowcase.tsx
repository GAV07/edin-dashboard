'use client';

import React from 'react';

const sourcingChannels = [
  { scope: 'National', count: '5+', description: 'National databases, platforms, and partner networks with broad deal coverage across the US' },
  { scope: 'Regional', count: '30+', description: 'Southeast-focused accelerators, incubators, angel groups, venture studios, and university programs' },
  { scope: 'Local', count: '50+', description: 'Direct relationships with founders, service providers, community organizations, and ecosystem partners across South Florida' },
];

const pipelineByIndustry = [
  { sector: 'Tech-Enabled Services', percentage: 32 },
  { sector: 'Health & Wellness', percentage: 18 },
  { sector: 'Finance & Fintech', percentage: 14 },
  { sector: 'Industrial & Blue Tech', percentage: 12 },
  { sector: 'AI / ML / Robotics', percentage: 10 },
  { sector: 'Media & Entertainment', percentage: 8 },
  { sector: 'Other', percentage: 6 },
];

const pipelineByStage = [
  { stage: 'Revenue ($500K-$1M)', percentage: 28 },
  { stage: 'Early Growth ($1M-$3M)', percentage: 42 },
  { stage: 'Growth ($3M-$5M)', percentage: 20 },
  { stage: 'Scale ($5M+)', percentage: 10 },
];

const pipelineByRegion = [
  { region: 'Southeast / Florida', percentage: 55 },
  { region: 'Northeast', percentage: 18 },
  { region: 'West Coast', percentage: 12 },
  { region: 'Midwest', percentage: 8 },
  { region: 'Other', percentage: 7 },
];

function BarChart({ data, colorClass }: { data: { label: string; percentage: number }[]; colorClass: string }) {
  return (
    <div className="space-y-2.5">
      {data.map((item) => (
        <div key={item.label}>
          <div className="flex justify-between text-sm mb-1">
            <span className="text-gray-700">{item.label}</span>
            <span className="text-gray-500 font-medium">{item.percentage}%</span>
          </div>
          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full ${colorClass}`}
              style={{ width: `${item.percentage}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export default function CompanyShowcase() {
  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-5xl mx-auto px-6 py-12 lg:py-16">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-2xl font-semibold tracking-tight text-gray-900 sm:text-3xl">
            Deal Flow & Pipeline
          </h1>
          <p className="mt-4 text-gray-600 max-w-3xl leading-relaxed">
            Our deal flow is built on deep relationships across multiple channels — from
            national platforms to hyperlocal ecosystem connections cultivated over a decade
            in South Florida.
          </p>
        </div>

        {/* Pipeline Summary Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <div className="rounded-lg border border-gray-200 bg-gray-50 p-5 text-center">
            <div className="text-2xl font-bold text-gray-900">85+</div>
            <div className="text-xs text-gray-500 mt-1 uppercase tracking-wide">Sourcing channels</div>
          </div>
          <div className="rounded-lg border border-gray-200 bg-gray-50 p-5 text-center">
            <div className="text-2xl font-bold text-gray-900">35</div>
            <div className="text-xs text-gray-500 mt-1 uppercase tracking-wide">Target investments</div>
          </div>
          <div className="rounded-lg border border-gray-200 bg-gray-50 p-5 text-center">
            <div className="text-2xl font-bold text-gray-900">$2M</div>
            <div className="text-xs text-gray-500 mt-1 uppercase tracking-wide">Avg check size</div>
          </div>
          <div className="rounded-lg border border-gray-200 bg-gray-50 p-5 text-center">
            <div className="text-2xl font-bold text-gray-900">4 Weeks</div>
            <div className="text-xs text-gray-500 mt-1 uppercase tracking-wide">Diligence timeline</div>
          </div>
        </div>

        {/* Sourcing Channels */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Sourcing Channels</h2>
          <p className="text-sm text-gray-500 mb-6">
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

        {/* Pipeline Distribution */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Pipeline Distribution</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* By Industry */}
            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-4 uppercase tracking-wide">By Industry</h3>
              <BarChart
                data={pipelineByIndustry.map(d => ({ label: d.sector, percentage: d.percentage }))}
                colorClass="bg-blue-500"
              />
            </div>
            {/* By Stage */}
            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-4 uppercase tracking-wide">By Revenue Stage</h3>
              <BarChart
                data={pipelineByStage.map(d => ({ label: d.stage, percentage: d.percentage }))}
                colorClass="bg-green-500"
              />
            </div>
            {/* By Region */}
            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-4 uppercase tracking-wide">By Region</h3>
              <BarChart
                data={pipelineByRegion.map(d => ({ label: d.region, percentage: d.percentage }))}
                colorClass="bg-amber-500"
              />
            </div>
          </div>
        </section>

        {/* Target Company Profile */}
        <section className="mb-12">
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

        {/* Diligence Process */}
        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Investment Process</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[
              { step: '1', title: 'Sourcing', desc: 'Identified through network, inbound, or data-driven discovery', time: 'Ongoing' },
              { step: '2', title: 'Screening', desc: 'Initial fit assessment on revenue, margins, team, and sector alignment', time: 'Week 1' },
              { step: '3', title: 'Diligence', desc: 'Deep dive on financials, team, product-market fit, and Venture Bond suitability', time: 'Weeks 2-3' },
              { step: '4', title: 'Decision', desc: 'Investment committee review, term sheet, and closing', time: 'Week 4' },
            ].map((item) => (
              <div key={item.step} className="rounded-lg border border-gray-200 bg-gray-50 p-5">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-7 h-7 rounded-full bg-blue-100 text-blue-700 font-bold text-xs flex items-center justify-center">
                    {item.step}
                  </div>
                  <h3 className="font-semibold text-gray-900 text-sm">{item.title}</h3>
                </div>
                <p className="text-xs text-gray-500 leading-relaxed mb-2">{item.desc}</p>
                <span className="text-xs font-medium text-blue-600">{item.time}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
