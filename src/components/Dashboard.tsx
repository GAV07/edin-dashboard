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
  Area
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
  };
  distributionSourcesData: Array<{ name: string; value: number }>;
  annualReturnsData: Array<{ year: string; returns: number }>;
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

// Format numbers to millions with 1 decimal place
const formatMillions = (value: number) => {
  return `$${(value / 1000000).toFixed(1)}M`;
};

export default function Dashboard({
  fundOverview,
  portfolioAllocation,
  returnMetrics,
  distributionSourcesData,
  annualReturnsData
}: DashboardProps) {
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
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Edin Capital Fund 1</h1>
        <p className="text-gray-600">$86M Financial Projection Dashboard</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Fund Overview</h2>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Committed Capital</span>
              <span className="font-semibold">{fundOverview.committedCapital}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Investable Capital</span>
              <span className="font-semibold">{fundOverview.investableCapital}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Management Fee</span>
              <span className="font-semibold">{fundOverview.managementFee}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Fund Life</span>
              <span className="font-semibold">{fundOverview.fundLife}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Deployment Period</span>
              <span className="font-semibold">{fundOverview.deploymentPeriod}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Carry</span>
              <span className="font-semibold">{fundOverview.carry}</span>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Portfolio Allocation</h2>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Number of Investments</span>
              <span className="font-semibold">{portfolioAllocation.numberOfInvestments}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Average Check Size</span>
              <span className="font-semibold">{portfolioAllocation.averageCheckSize}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Success Rate</span>
              <span className="font-semibold">{portfolioAllocation.successRate}</span>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Return Metrics</h2>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">LP Distributions</span>
              <span className="font-semibold">{returnMetrics.lpDistributions}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">GP Carry</span>
              <span className="font-semibold">{returnMetrics.gpCarry}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">MOIC</span>
              <span className="font-semibold">{returnMetrics.moic}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Gross TVPI</span>
              <span className="font-semibold">{returnMetrics.grossTvpi}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">DPI</span>
              <span className="font-semibold">{returnMetrics.dpi}</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Distribution Sources</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={distributionSourcesData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {distributionSourcesData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Annual vs. Cumulative Returns</h2>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart
                data={cumulativeReturnsData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
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
                  labelFormatter={(label) => `Year ${label}`}
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