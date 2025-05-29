'use client';

import React from 'react';
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
import Stats from './Stats';
import KeyDocs from './KeyDocs';

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
  annualReturnsData: Array<{ year: string; returns: number }>;
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

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
  const keyMetricsStats = [
    { id: 'committed', name: 'Capital Ask', value: fundOverview.committedCapital },
    { id: 'numInv', name: 'Number of Investments (10y)', value: portfolioAllocation.numberOfInvestments },
    { id: 'checkSize', name: 'Average Check Size', value: portfolioAllocation.averageCheckSize },
    { id: 'distributions', name: 'Cum. Profit Sharing Dist. (10y)', value: returnMetrics.lpDistributions },
    { id: 'moic', name: 'MOIC (10y)', value: returnMetrics.moic },
    { id: 'tvpi', name: 'Gross TVPI (10y)', value: returnMetrics.grossTvpi },
    { id: 'dpi', name: 'DPI (10y)', value: returnMetrics.dpi },
    { id: 'irr', name: 'IRR (10y)', value: returnMetrics.irr },
  ];

  // Calculate cumulative returns
  const cumulativeReturnsData = annualReturnsData.map((item, index) => {
    const previousCumulative = index > 0 
      ? annualReturnsData.slice(0, index).reduce((sum, curr) => sum + curr.returns, 0) 
      : 0;
    return {
      year: item.year,
      annual: item.returns,
      cumulative: previousCumulative + item.returns
    };
  });

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <Stats
        title="Edin Capital Fund I"
        description={
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Our Mission</h3>
              <p className="text-gray-600">
                We provide growth capital to ambitious entrepreneurs building sustainable, profitable businesses through our innovative Venture Bond—combining equity investment with profit-sharing to create better alignment, reduced risk, and increased liquidity for both founders and investors.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Our Vision</h3>
              <p className="text-gray-600">
                To transform venture capital by serving the 99.96% of small businesses left behind by traditional VC, creating a new paradigm that enables more companies to succeed, generates stronger risk-adjusted returns, and drives regenerative economic development across communities.
              </p>
            </div>
            <p className="text-gray-600">
              Edin Capital introduces the Venture Bond, a revolutionary financial instrument combining equity and profit sharing that delivers superior risk-adjusted returns with increased liquidity for investors and better alignment for founders.
            </p>
          </div>
        }
        stats={keyMetricsStats}
        className="bg-white shadow-sm mb-4"
      />
      <div className="gap-6 mb-6">
        
        
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Annual vs. Cumulative Returns</h2>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart
                data={cumulativeReturnsData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                {/* <CartesianGrid strokeDasharray="3 3" /> */}
                <XAxis dataKey="year" />
                <YAxis 
                  yAxisId="left" 
                  orientation="left"
                  tickFormatter={formatMillions}
                />
                <YAxis 
                  yAxisId="right" 
                  orientation="right"
                  tickFormatter={formatMillions}
                />
                <Tooltip 
                  formatter={(value: number) => formatMillions(value)}
                  labelFormatter={(label) => `${label}`}
                />
                <Legend />
                <Bar 
                  yAxisId="left" 
                  dataKey="annual" 
                  fill="#8884d8" 
                  name="Annual Returns" 
                />
                <Line 
                  yAxisId="right" 
                  type="monotone" 
                  dataKey="cumulative" 
                  stroke="#ff7300" 
                  name="Cumulative Returns"
                />
                <ReferenceLine 
                  x="Year 10" 
                  yAxisId="right"
                  stroke="#666" 
                  strokeDasharray="3 3" 
                  label={{ 
                    value: '10y Benchmark', 
                    position: 'top',
                    fill: '#666',
                    fontSize: 12
                  }} 
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      
      <div className="mt-8 text-center text-gray-500 text-xs">
        <p>Data based on Edin Capital Fund I financial projections. $86M model.</p>
      </div>
    </div>
  );
} 