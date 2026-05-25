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
            <Link
              href="/executive-summary"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-gray-200 bg-gray-50 text-sm font-medium text-gray-700 hover:bg-gray-100 hover:border-gray-300 transition-colors self-start"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
              </svg>
              View Executive Summary
            </Link>
          </div>

          {/* Mission & Vision */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            <div className="rounded-lg border border-gray-200 bg-gray-50 p-6">
              <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-3">Our Mission</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                We partner with exceptional founders to build profitable, sustainable businesses through our Venture Bond instrument — providing patient capital and aligned incentives that enable companies to thrive without the constraints of traditional venture capital&apos;s boom-or-bust model.
              </p>
            </div>
            <div className="rounded-lg border border-gray-200 bg-gray-50 p-6">
              <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-3">Our Vision</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                To establish Integrated Capital as the defining investment category of the next generation — where financial innovation and socioeconomic impact converge to create regenerative ecosystems that redefine what&apos;s possible in early-stage investing.
              </p>
            </div>
          </div>
        </div>

        {/* Key Metrics */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Key Metrics</h2>
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

        <p className="text-center text-gray-400 text-xs">
          Data based on Edin Capital Fund I financial projections.
        </p>
      </div>
    </div>
  );
} 