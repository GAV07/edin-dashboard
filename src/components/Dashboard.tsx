'use client';

import React from 'react';
import Image from 'next/image';
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
    <div className="bg-gray-50 min-h-screen">
      <div className="p-6">
        {/* Combined CTA and Stats Block */}
        <div className="bg-white rounded-lg shadow-sm mb-4 overflow-hidden">
          {/* CTA Content */}
          <div className="px-6 py-12 sm:px-8">
            <div className="mx-auto max-w-4xl">
              {/* Logo Above Title */}
              <div className="flex flex-col items-center gap-6 mb-8 text-center">
                <Image
                  alt="Edin Capital Logo"
                  src="/images/logos/edin logo - gray stacked.png"
                  width={200}
                  height={80}
                  className="h-20 w-auto object-contain"
                />
                <h2 className="text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl">
                  Redefining Venture Capital
                </h2>
              </div>
              
              {/* Mission and Vision Stacked Below */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Our Mission</h3>
                  <p className="text-base/7 text-gray-600">
                    We partner with exceptional founders to build profitable, sustainable businesses through our breakthrough Venture Bond instrument — providing patient capital, operational excellence, and aligned incentives that enable companies to thrive without the constraints of traditional venture capital&apos;s boom-or-bust model.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Our Vision</h3>
                  <p className="text-base/7 text-gray-600">
                    To establish Integrated Capital as the defining investment category of the next generation — where financial innovation, technological excellence, and socioeconomic impact converge to create regenerative ecosystems that transcend traditional venture capital limitations and redefine what&apos;s possible in early-stage investing.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Separator */}
          <div className="border-t border-gray-200"></div>

          {/* Stats Content */}
          <div className="px-6 py-8 sm:px-8">
            <div className="max-w-7xl">
              <dl className="grid grid-cols-1 gap-0.5 overflow-hidden rounded-2xl text-center sm:grid-cols-2 lg:grid-cols-4">
                {keyMetricsStats.map((stat) => (
                  <div key={stat.id} className="flex flex-col bg-gray-400/5 p-8">
                    <dt className="text-sm/6 font-semibold text-gray-600">{stat.name}</dt>
                    <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900">{stat.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>

        <div className="gap-6 mb-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-4">Investment Returns Analysis</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Annual Returns Chart */}
              <div>
                <h3 className="text-base font-medium mb-3 text-gray-700">Annual Returns</h3>
                <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={cumulativeReturnsData}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <XAxis dataKey="year" fontSize={12} />
                      <YAxis 
                        tickFormatter={formatMillions}
                        fontSize={12}
                      />
                      <Tooltip 
                        formatter={(value: number) => formatMillions(value)}
                        labelFormatter={(label) => `${label}`}
                      />
                      <Bar 
                        dataKey="annual" 
                                                fill="#2d5016" 
                        name="Annual Returns" 
                      />
                      <ReferenceLine 
                        x="Year 10" 
                        stroke="#666" 
                        strokeDasharray="3 3" 
                        label={{ 
                          value: '10y Benchmark', 
                          position: 'top',
                          fill: '#666',
                          fontSize: 12
                        }} 
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Cumulative Returns Chart */}
              <div>
                <h3 className="text-base font-medium mb-3 text-gray-700">Cumulative Returns</h3>
                <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={cumulativeReturnsData}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <XAxis dataKey="year" fontSize={12} />
                      <YAxis 
                        tickFormatter={formatMillions}
                        fontSize={12}
                      />
                      <Tooltip 
                        formatter={(value: number) => formatMillions(value)}
                        labelFormatter={(label) => `${label}`}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="cumulative" 
                        stroke="#6bb6ff" 
                        strokeWidth={3}
                        name="Cumulative Returns"
                        dot={{ fill: '#6bb6ff', strokeWidth: 2, r: 4 }}
                      />
                      <ReferenceLine 
                        x="Year 10" 
                        stroke="#666" 
                        strokeDasharray="3 3" 
                        label={{ 
                          value: '10y Benchmark', 
                          position: 'top',
                          fill: '#666',
                          fontSize: 12
                        }} 
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-8 text-center text-gray-500 text-xs">
          <p>Data based on Edin Capital Fund I financial projections. $86M model.</p>
        </div>
      </div>
    </div>
  );
} 