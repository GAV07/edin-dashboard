'use client';

import React from 'react';

const coreCapabilities = [
  {
    title: 'Real-time Profit Calculations',
    description: 'Automated quarterly profit-sharing calculations with intelligent trigger monitoring across the portfolio.',
    status: 'building' as const,
  },
  {
    title: 'Smart Distribution Engine',
    description: 'Seamless execution of LP distributions with tiered percentage structures and automated reconciliation.',
    status: 'building' as const,
  },
  {
    title: 'Secure Payment Rails',
    description: 'Bank-grade security for fund operations with automated reconciliation and audit trails.',
    status: 'building' as const,
  },
  {
    title: 'Health Scoring',
    description: 'Portfolio company health metrics derived from profit, revenue, margins, and growth data to surface risk early.',
    status: 'building' as const,
  },
];

const intelligenceCapabilities = [
  {
    title: 'Data Capture',
    description: 'Comprehensive data collection from portfolio interactions, financials, and operations — the foundation for all intelligence.',
    status: 'building' as const,
  },
  {
    title: 'AI Processing',
    description: 'Pattern recognition across portfolio data to identify trends, flag anomalies, and surface insights at scale.',
    status: 'building' as const,
  },
  {
    title: 'Automated Actions',
    description: 'Streamlined workflows that move data between systems, trigger notifications, and reduce manual operational load.',
    status: 'building' as const,
  },
];

const futureCapabilities = [
  {
    title: 'Predictive Analytics',
    description: 'AI-powered forecasting for revenue trajectories, portfolio outcomes, and market trends — requires sufficient data cycles to be meaningful.',
  },
  {
    title: 'Prescriptive Insights',
    description: 'Actionable, data-driven recommendations for portfolio companies and fund operations based on historical patterns.',
  },
];

function StatusBadge({ status }: { status: 'building' | 'live' }) {
  if (status === 'live') {
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700">
        <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
        Live
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
      <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
      In Development
    </span>
  );
}

const EdinOSComponent: React.FC = () => {
  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-5xl mx-auto px-6 py-12 lg:py-16">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-2xl font-semibold tracking-tight text-gray-900 sm:text-3xl">
            EdinOS Platform
          </h1>
          <p className="mt-4 text-gray-600 max-w-3xl leading-relaxed">
            EdinOS is our internal operational platform designed to reduce the team&apos;s operational load
            and better serve both founders and LPs. It powers the core financial mechanics of the Venture
            Bond — from profit-sharing calculations to distribution execution — and will grow alongside
            the fund.
          </p>
        </div>

        {/* Timeline / Roadmap */}
        <div className="space-y-16">

          {/* Phase 1: Core Operations */}
          <section>
            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-green-100 text-green-700 font-bold text-sm">
                1
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Core Operations</h2>
                <p className="text-sm text-gray-500">Fund launch essentials — required to execute the Venture Bond strategy</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ml-[52px]">
              {coreCapabilities.map((item) => (
                <div
                  key={item.title}
                  className="rounded-lg border border-gray-200 bg-gray-50 p-5 hover:border-green-200 hover:bg-green-50/30 transition-colors"
                >
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-gray-900 text-sm">{item.title}</h3>
                    <StatusBadge status={item.status} />
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Connector */}
          <div className="ml-[19px] h-8 w-px bg-gray-300" />

          {/* Phase 2: Intelligence Layer */}
          <section>
            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 text-blue-700 font-bold text-sm">
                2
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Intelligence Layer</h2>
                <p className="text-sm text-gray-500">Data infrastructure that makes the core operations smarter over time</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 ml-[52px]">
              {intelligenceCapabilities.map((item) => (
                <div
                  key={item.title}
                  className="rounded-lg border border-gray-200 bg-gray-50 p-5 hover:border-blue-200 hover:bg-blue-50/30 transition-colors"
                >
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-gray-900 text-sm">{item.title}</h3>
                    <StatusBadge status={item.status} />
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Connector */}
          <div className="ml-[19px] h-8 w-px bg-gray-300" />

          {/* Phase 3: Future Direction */}
          <section>
            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-200 text-gray-500 font-bold text-sm">
                3
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Where This Goes</h2>
                <p className="text-sm text-gray-500">Capabilities that become possible as portfolio data matures</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ml-[52px]">
              {futureCapabilities.map((item) => (
                <div
                  key={item.title}
                  className="rounded-lg border border-dashed border-gray-300 bg-white p-5"
                >
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-gray-700 text-sm">{item.title}</h3>
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-500">
                      Future
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
            <p className="ml-[52px] mt-4 text-xs text-gray-400">
              Predictive capabilities require multiple investment cycles to build sufficient data.
              These features will be developed as the fund matures and data depth allows for meaningful analysis.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default EdinOSComponent;
