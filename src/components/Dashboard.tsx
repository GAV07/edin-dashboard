'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  PieChart, Pie, Cell,
  BarChart, Bar,
  LineChart, Line,
  XAxis, YAxis, CartesianGrid,
  Tooltip, Legend,
  ResponsiveContainer,
  ComposedChart,
  Area,
  ReferenceLine
} from 'recharts';

interface DashboardProps {
  fundOverview: {
    committedCapital: string;
    investableCapital: string;
    managementFee: string;
    fundLife: string;
    deploymentPeriod: string;
    carry: string;
  };
  portfolioAllocation: {
    numberOfInvestments: string;
    averageCheckSize: string;
    successRate: string;
  };
  returnMetrics: {
    lpDistributions: string;
    gpCarry: string;
    moic: string;
    grossTvpi: string;
    dpi: string;
    irr: string;
  };
  distributionSourcesData: Array<{ name: string; value: number }>;
  annualReturnsData: Array<{ year: string; returns: number; cumulative: number }>;
}

const COLORS = ['#2d5016', '#4a7c59', '#6bb6ff', '#00b894', '#74b9ff'];

// Format numbers to millions with 1 decimal place
const formatMillions = (value: number) => {
  return `$${(value / 1000000).toFixed(1)}M`;
};

const formatPercentage = (value: string) => {
  return value.endsWith('%') ? value : `${value}%`;
};

export default function Dashboard({
  fundOverview,
  portfolioAllocation,
  returnMetrics,
  annualReturnsData
}: DashboardProps) {
  // Create key metrics summary stats
  const allStats = [
    { id: 'committed', name: 'Capital Ask', value: fundOverview.committedCapital },
    { id: 'numInv', name: 'Number of Investments', value: portfolioAllocation.numberOfInvestments },
    { id: 'checkSize', name: 'Average Check Size', value: portfolioAllocation.averageCheckSize },
    { id: 'distributions', name: 'Cum. Profit Sharing Dist. (10y)', value: returnMetrics.lpDistributions },
    { id: 'moic', name: 'RVPI (10y)', value: returnMetrics.moic },
    { id: 'tvpi', name: 'TVPI (10y)', value: returnMetrics.grossTvpi },
    { id: 'dpi', name: 'DPI (10y)', value: returnMetrics.dpi },
    { id: 'irr', name: 'IRR (10y)', value: returnMetrics.irr },
  ];

  // Filter out stats with blank or empty values
  const keyMetricsStats = allStats.filter(stat => 
    stat.value && 
    stat.value.toString().trim() !== '' && 
    stat.value.toString().trim() !== '-' &&
    stat.value.toString().trim() !== 'N/A' &&
    stat.value.toString().trim() !== '0'
  );

  // Use cumulative returns data directly from API
  const cumulativeReturnsData = annualReturnsData.map((item) => ({
    year: item.year,
    annual: item.returns,
    cumulative: item.cumulative
  }));

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-6xl mx-auto px-6 py-12 lg:py-16">
        {/* Header */}
        <div className="mb-10">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 mb-8">
            <div className="flex items-center gap-5">
              <Image
                alt="Edin Capital Logo"
                src="/images/logos/edin logo - gray stacked.png"
                width={160}
                height={64}
                className="h-16 w-auto object-contain"
              />
              <div>
                <h1 className="text-2xl font-semibold tracking-tight text-gray-900 sm:text-3xl">
                  Fund I Overview
                </h1>
                <p className="text-gray-500 mt-1">Edin Capital Investor Portal</p>
              </div>
            </div>
            <div className="flex items-center gap-3 self-start">
              <a
                href="https://www.dropbox.com/scl/fi/rofebzx4l0r5r0lcaweih/Deep-Dive-EDIN.pdf?rlkey=x835swqlmkbwwnb8xm007wjy2&st=rmocy3oj&dl=0"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-gray-200 bg-gray-50 text-sm font-medium text-gray-700 hover:bg-gray-100 hover:border-gray-300 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                </svg>
                Download Deck
              </a>
            </div>
          </div>
        </div>

        {/* Key Metrics */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Key Projections</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {keyMetricsStats.map((stat) => (
              <div key={stat.id} className="rounded-lg border border-gray-200 bg-gray-50 p-5 text-center">
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                <div className="text-xs text-gray-500 mt-1.5 uppercase tracking-wide">{stat.name}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Investment Returns Analysis */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Investment Returns Analysis</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Annual Returns Chart */}
            <div className="rounded-lg border border-gray-200 bg-gray-50 p-6">
              <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-4">Annual Returns</h3>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={cumulativeReturnsData}
                    margin={{ top: 10, right: 20, left: 10, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                    <XAxis dataKey="year" fontSize={11} tick={{ fill: '#6b7280' }} />
                    <YAxis
                      tickFormatter={formatMillions}
                      fontSize={11}
                      tick={{ fill: '#6b7280' }}
                    />
                    <Tooltip
                      formatter={(value: number) => formatMillions(value)}
                      labelFormatter={(label) => `${label}`}
                      contentStyle={{ borderRadius: '8px', border: '1px solid #e5e7eb', fontSize: '13px' }}
                    />
                    <Bar
                      dataKey="annual"
                      fill="#2d5016"
                      name="Annual Returns"
                      radius={[4, 4, 0, 0]}
                    />
                    <ReferenceLine
                      x="Year 10"
                      stroke="#9ca3af"
                      strokeDasharray="3 3"
                      label={{
                        value: '10y',
                        position: 'top',
                        fill: '#9ca3af',
                        fontSize: 11
                      }}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Cumulative Returns Chart */}
            <div className="rounded-lg border border-gray-200 bg-gray-50 p-6">
              <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-4">Cumulative Returns</h3>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={cumulativeReturnsData}
                    margin={{ top: 10, right: 20, left: 10, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                    <XAxis dataKey="year" fontSize={11} tick={{ fill: '#6b7280' }} />
                    <YAxis
                      tickFormatter={formatMillions}
                      fontSize={11}
                      tick={{ fill: '#6b7280' }}
                    />
                    <Tooltip
                      formatter={(value: number) => formatMillions(value)}
                      labelFormatter={(label) => `${label}`}
                      contentStyle={{ borderRadius: '8px', border: '1px solid #e5e7eb', fontSize: '13px' }}
                    />
                    <Line
                      type="monotone"
                      dataKey="cumulative"
                      stroke="#4a7c59"
                      strokeWidth={2.5}
                      name="Cumulative Returns"
                      dot={{ fill: '#4a7c59', strokeWidth: 2, r: 3 }}
                    />
                    <ReferenceLine
                      x="Year 10"
                      stroke="#9ca3af"
                      strokeDasharray="3 3"
                      label={{
                        value: '10y',
                        position: 'top',
                        fill: '#9ca3af',
                        fontSize: 11
                      }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </section>

        {/* Explore the Data Room */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Explore the Data Room</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { href: '/thesis', label: 'Investment Thesis', desc: 'Company profile & sectors' },
              { href: '/pro-forma', label: 'Pro Forma', desc: 'Financial projections' },
              { href: '/venture-bond', label: 'Venture Bond', desc: 'Structure & calculator' },
              { href: '/deal-flow', label: 'Deal Flow', desc: 'Pipeline & sourcing' },
              { href: '/portfolio-support', label: 'Portfolio Support', desc: 'The Edin Experience' },
              { href: '/edin-os', label: 'EdinOS', desc: 'Platform roadmap' },
              { href: '/team', label: 'Team', desc: 'Leadership bios' },
              { href: '/legal', label: 'Legal & Compliance', desc: 'Fund documents' },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-lg border border-gray-200 bg-gray-50 p-4 hover:bg-gray-100 hover:border-gray-300 transition-colors group"
              >
                <div className="text-sm font-medium text-gray-900 group-hover:text-green-700">{item.label}</div>
                <div className="text-xs text-gray-500 mt-1">{item.desc}</div>
              </Link>
            ))}
          </div>
        </section>

        <p className="text-center text-gray-400 text-xs">
          Data based on Edin Capital Fund I financial projections.
        </p>
      </div>
    </div>
  );
} 