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
  distributionSourcesData,
  annualReturnsData
}: DashboardProps) {
  // Create key metrics summary stats
  const keyMetricsStats = [
    { id: 'committed', name: 'Capital Ask', value: fundOverview.committedCapital },
    { id: 'numInv', name: 'Number of Investments', value: portfolioAllocation.numberOfInvestments },
    { id: 'checkSize', name: 'Average Check Size', value: portfolioAllocation.averageCheckSize },
    { id: 'distributions', name: 'LP Distributions', value: returnMetrics.lpDistributions },
    { id: 'moic', name: 'MOIC', value: returnMetrics.moic },
    { id: 'tvpi', name: 'Gross TVPI', value: returnMetrics.grossTvpi },
    { id: 'dpi', name: 'DPI', value: returnMetrics.dpi },
    { id: 'success', name: 'Expected Success Rate', value: portfolioAllocation.successRate },
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
        title="Edin Capital Fund 1"
        description="Edin Capital introduces the Venture Bond, a revolutionary financial instrument combining equity and profit sharing that delivers superior risk-adjusted returns with increased liquidity for investors and better alignment for founders. Our model targets the vast, underserved segment of growth-oriented businesses that fall outside traditional venture capital's unicorn-hunting scope, generating market-leading returns without requiring billion-dollar exits while creating broader economic impact."
        stats={keyMetricsStats}
        className="bg-white shadow-sm mb-4"
      />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow p-6">
          <KeyDocs />
        </div>
        
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
                    value: 'Active Fund Duration', 
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
      
      <div className="mt-8 text-center text-gray-500 text-sm">
        <p>Data based on Edin Capital Fund 1 financial projections. $86M model.</p>
      </div>
    </div>
  );
} 