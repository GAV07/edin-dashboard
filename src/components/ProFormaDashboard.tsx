'use client';

import React, { useState, useEffect } from 'react';
import { 
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, 
  Legend, ResponsiveContainer, PieChart, Pie, Cell, AreaChart, Area,
  ComposedChart, Scatter
} from 'recharts';

// Color palette
const colors = {
  primary: '#6366F1',
  secondary: '#8B5CF6',
  accent: '#EC4899',
  success: '#10B981',
  warning: '#F59E0B',
  danger: '#EF4444',
  dark: '#111827',
  light: '#F9FAFB',
  background: '#F3F4F6',
  backgroundDark: '#1F2937',
  chartColors: ['#6366F1', '#EC4899', '#10B981', '#F59E0B', '#8B5CF6', '#EF4444', '#14B8A6', '#3B82F6']
};

// Formatters
const formatCurrency = (value: number) => {
  if (value === undefined || value === null) return '-';
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(value);
};

const formatPercent = (value: number) => {
  if (value === undefined || value === null) return '-';
  return `${value.toFixed(1)}%`;
};

const formatNumber = (value: number) => {
  if (value === undefined || value === null) return '-';
  return new Intl.NumberFormat('en-US').format(value);
};

// YAxis formatters
const formatYAxisCurrency = (value: number, index: number): string => {
  if (value === 0) return '0';
  return `$${(value / 1000000).toFixed(0)}M`;
};

const formatYAxisPercent = (value: number, index: number): string => `${value}%`;

interface ProFormaData {
  assumptions: {
    avgCheckSize: string;
    targetPortfolio: string;
    failureRate: string;
    profitSharingStartYear: string;
    netIncomeMultiple: string;
    revenueMultiple: string;
  };
  yearlyData: Array<{
    year: string;
    activePortcos: number;
    companiesProfitSharing: number;
    portfolioRevenue: number;
    portfolioProfit: number;
    avgMargins: number;
    avgRevenuePerCompany: number;
    avgAnnualGrowthRate: number;
    investmentsMade: number;
    annualProfitSharing: number;
    cumulativeProfitSharingDistributions: number;
    residualValue: number;
    residualValueEstimateRevenue: number;
    residualValueEstimateProfit: number;
    totalValue: number;
    grossTVPI: number;
    netTVPI: number;
    percentageCapitalReturned: number;
    grossProfitSharingReturnMultiple: number;
    netProfitSharingReturnMultiple: number;
  }>;
}

const ProFormaDashboard = () => {
  const [data, setData] = useState<ProFormaData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const loadData = async (isRefresh: boolean = false) => {
    if (isRefresh) {
      setIsRefreshing(true);
    } else {
      setLoading(true);
    }
    setError(null);

    try {
      const response = await fetch('/api/pro-forma');
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to fetch data');
      }

      setData(result);
      setLastUpdated(new Date());
    } catch (err: any) {
      console.error('Error fetching data:', err);
      setError(err.message || 'An error occurred while fetching data');
    } finally {
      if (isRefresh) {
        setIsRefreshing(false);
      } else {
        setLoading(false);
      }
    }
  };

  const refreshData = () => {
    loadData(true);
  };

  useEffect(() => {
    loadData();
    const intervalId = setInterval(() => {
      loadData(true);
    }, 5 * 60 * 1000); // Refresh every 5 minutes
    return () => clearInterval(intervalId);
  }, []);

  if (loading && !isRefreshing) {
    return (
      <div className="flex items-center justify-center h-screen bg-background">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-dark">Loading financial data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen bg-background">
        <div className="text-center p-6 bg-white rounded-lg shadow-lg">
          <div className="text-danger text-5xl mb-4">⚠️</div>
          <h2 className="text-xl font-semibold text-dark mb-2">Error</h2>
          <p className="text-dark">{error}</p>
          <button 
            onClick={refreshData}
            className="mt-4 px-4 py-2 bg-primary text-white rounded-md hover:bg-opacity-90 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!data) {
    return null;
  }

  return (
    <div className="bg-background min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-dark">Edin Capital Financial Model</h1>
            <p className="text-gray-500">Venture Bond Pro Forma Dashboard</p>
            {lastUpdated && (
              <p className="text-xs text-gray-400 mt-1">
                Last updated: {lastUpdated.toLocaleString()}
              </p>
            )}
          </div>
          <div className="bg-white rounded-lg shadow-sm p-4">
            <h3 className="text-sm font-medium text-gray-500 mb-1">Target Fund Size</h3>
            <p className="text-2xl font-bold text-dark">
              $86M
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-sm mb-6">
          <div className="flex border-b">
            <button 
              className={`px-4 py-3 font-medium text-sm ${activeTab === 'overview' ? 'text-primary border-b-2 border-primary' : 'text-gray-500'}`}
              onClick={() => setActiveTab('overview')}
            >
              Overview
            </button>
            <button 
              className={`px-4 py-3 font-medium text-sm ${activeTab === 'projections' ? 'text-primary border-b-2 border-primary' : 'text-gray-500'}`}
              onClick={() => setActiveTab('projections')}
            >
              Financial Projections
            </button>
            <button 
              className={`px-4 py-3 font-medium text-sm ${activeTab === 'profitSharing' ? 'text-primary border-b-2 border-primary' : 'text-gray-500'}`}
              onClick={() => setActiveTab('profitSharing')}
            >
              Profit Sharing
            </button>
            <button 
              className={`px-4 py-3 font-medium text-sm ${activeTab === 'assumptions' ? 'text-primary border-b-2 border-primary' : 'text-gray-500'}`}
              onClick={() => setActiveTab('assumptions')}
            >
              Assumptions
            </button>
          </div>
        </div>

        {/* Content will be added in subsequent edits */}
        <div className="space-y-6">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Summary Cards */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Average Check Size</h3>
                  <p className="text-2xl font-bold text-dark">{data.assumptions.avgCheckSize}</p>
                </div>
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h3 className="text-sm font-medium text-gray-500 mb-1">10 Year Gross TVPI</h3>
                  <p className="text-2xl font-bold text-dark">
                    {(data.yearlyData[9]?.grossTVPI || 0).toFixed(2)}x
                  </p>
                </div>
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Profit Sharing Start</h3>
                  <p className="text-2xl font-bold text-dark">Year 4</p>
                </div>
              </div>

              {/* TVPI Chart */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-semibold text-dark mb-4">Total Value to Paid-In Capital (TVPI)</h2>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={data.yearlyData}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="year" />
                      <YAxis />
                      <Tooltip 
                        formatter={(value: number) => [`${value.toFixed(2)}x`, ""]}
                        labelFormatter={(label) => `Year ${label}`}
                      />
                      <Legend />
                      <Line 
                        type="monotone" 
                        dataKey="grossTVPI" 
                        stroke={colors.primary} 
                        activeDot={{ r: 8 }} 
                        name="Gross TVPI" 
                      />
                      <Line 
                        type="monotone" 
                        dataKey="netTVPI" 
                        stroke={colors.accent} 
                        name="Net TVPI" 
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Portfolio Growth & Distributions */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h2 className="text-lg font-semibold text-dark mb-4">Active Investing Period</h2>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart
                        data={data.yearlyData.slice(0, 10)}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                        <XAxis dataKey="year" />
                        <YAxis 
                          yAxisId="left" 
                          tickFormatter={formatYAxisCurrency} 
                        />
                        <Tooltip 
                          formatter={(value: number) => [formatNumber(value), "Companies"]}
                          labelFormatter={(label) => `Year ${label}`}
                        />
                        <Legend />
                        <Area 
                          type="monotone" 
                          yAxisId="left"
                          dataKey="activePortcos" 
                          fill={colors.primary} 
                          stroke={colors.primary} 
                          name="Active Companies" 
                        />
                        
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h2 className="text-lg font-semibold text-dark mb-4">Cumulative Profit Share Distributions</h2>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart
                        data={data.yearlyData}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                        <XAxis dataKey="year" />
                        <YAxis 
                          yAxisId="left" 
                          tickFormatter={formatYAxisCurrency} 
                        />
                        <Tooltip 
                          formatter={(value: number) => [formatCurrency(value), "Cumulative Distributions"]}
                          labelFormatter={(label) => `Year ${label}`}
                        />
                        <Area 
                          type="monotone" 
                          yAxisId="left"
                          dataKey="cumulativeProfitSharingDistributions" 
                          fill={colors.success} 
                          stroke={colors.success} 
                          name="Cumulative Distributions" 
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>

              {/* Portfolio Value Composition */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-semibold text-dark mb-4">Total Portfolio Value Composition</h2>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart
                      data={data.yearlyData}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="year" />
                      <YAxis 
                        yAxisId="left" 
                        tickFormatter={formatYAxisCurrency} 
                      />
                      <Tooltip 
                        formatter={(value: number) => [formatCurrency(value), ""]}
                        labelFormatter={(label) => `Year ${label}`}
                      />
                      <Legend />
                      <Bar 
                        dataKey="residualValueEstimateRevenue" 
                        yAxisId="left"
                        stackId="a" 
                        fill={colors.primary} 
                        name="Residual Portfolio Value (Revenue)" 
                      />
                      <Bar 
                        dataKey="residualValueEstimateProfit" 
                        yAxisId="left"
                        stackId="a" 
                        fill={colors.success} 
                        name="Residual Portfolio Value (Profit Multiple)" 
                      />
                      <Line 
                        type="monotone" 
                        yAxisId="left"
                        dataKey="totalValue" 
                        stroke={colors.dark} 
                        strokeWidth={2} 
                        dot={{ r: 4 }} 
                        name="Total Value" 
                      />
                    </ComposedChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          )}
          {activeTab === 'projections' && (
            <div className="space-y-6">
              {/* Revenue & Profit Projection */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-semibold text-dark mb-4">Portfolio Revenue & Profit Projection</h2>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart
                      data={data.yearlyData}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="year" />
                      <YAxis 
                        yAxisId="left" 
                        tickFormatter={formatYAxisCurrency} 
                      />
                      <YAxis 
                        yAxisId="right" 
                        orientation="right" 
                        tickFormatter={formatYAxisPercent} 
                      />
                      <Tooltip 
                        formatter={(value: number, name: string) => {
                          if (name === "Average Margins") return [`${value.toFixed(1)}%`, name];
                          return [formatCurrency(value), name];
                        }}
                        labelFormatter={(label) => `Year ${label}`}
                      />
                      <Legend />
                      <Bar 
                        yAxisId="left" 
                        dataKey="portfolioRevenue" 
                        fill={colors.primary} 
                        name="Portfolio Revenue" 
                      />
                      <Bar 
                        yAxisId="left" 
                        dataKey="portfolioProfit" 
                        fill={colors.success} 
                        name="Portfolio Profit" 
                      />
                      <Line 
                        yAxisId="right" 
                        type="monotone" 
                        dataKey="avgMargins" 
                        stroke={colors.warning} 
                        name="Average Margins" 
                      />
                    </ComposedChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Company Growth Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h2 className="text-lg font-semibold text-dark mb-4">Average Revenue Per Company</h2>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={data.yearlyData}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                        <XAxis dataKey="year" />
                        <YAxis 
                          yAxisId="left"
                          tickFormatter={formatYAxisCurrency} 
                        />
                        <Tooltip 
                          formatter={(value: number) => [formatCurrency(value), "Avg Revenue/Company"]}
                          labelFormatter={(label) => `Year ${label}`}
                        />
                        <Line 
                          type="monotone" 
                          yAxisId="left"
                          dataKey="avgRevenuePerCompany" 
                          stroke={colors.primary} 
                          strokeWidth={2}
                          dot={{ r: 4 }}
                          name="Average Revenue per Company" 
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                {/* <div className="bg-white rounded-lg shadow-sm p-6">
                  <h2 className="text-lg font-semibold text-dark mb-4">Revenue Growth Rate</h2>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={data.yearlyData}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                        <XAxis dataKey="year" />
                        <YAxis tickFormatter={formatYAxisPercent} />
                        <Tooltip 
                          formatter={(value: number) => [`${value.toFixed(1)}%`, "Growth Rate"]}
                          labelFormatter={(label) => `Year ${label}`}
                        />
                        <Line 
                          type="monotone" 
                          dataKey="avgAnnualGrowthRate" 
                          stroke={colors.accent} 
                          strokeWidth={2}
                          dot={{ r: 4 }}
                          name="Average Annual Growth Rate" 
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div> */}
              </div>

              {/* Investment Deployment & Returns */}
              {/* <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-semibold text-dark mb-4">Investment Deployment & Active Portfolio</h2>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart
                      data={data.yearlyData}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="year" />
                      <YAxis yAxisId="left" />
                      <YAxis yAxisId="right" />
                      <Tooltip 
                        formatter={(value: number) => [formatNumber(value), ""]}
                        labelFormatter={(label) => `Year ${label}`}
                      />
                      <Legend />
                      <Bar 
                        yAxisId="left" 
                        dataKey="investmentsMade" 
                        fill={colors.primary} 
                        name="New Investments" 
                      />
                      <Line 
                        yAxisId="right" 
                        type="monotone" 
                        dataKey="activePortcos" 
                        stroke={colors.accent} 
                        strokeWidth={2}
                        dot={{ r: 4 }}
                        name="Active Portfolio Companies" 
                      />
                    </ComposedChart>
                  </ResponsiveContainer>
                </div>
              </div> */}
            </div>
          )}
          {activeTab === 'profitSharing' && (
            <div className="space-y-6">
              {/* Profit Sharing Analysis */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-semibold text-dark mb-4">Profit Sharing Distributions</h2>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart
                      data={data.yearlyData}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="year" />
                      <YAxis 
                        yAxisId="left" 
                        tickFormatter={formatYAxisCurrency} 
                      />
                      <YAxis 
                        yAxisId="right" 
                        orientation="right" 
                        tickFormatter={formatYAxisPercent} 
                      />
                      <Tooltip 
                        formatter={(value: number, name: string) => {
                          if (name === "Companies in Profit Sharing") return [formatNumber(value), name];
                          return [formatCurrency(value), name];
                        }}
                        labelFormatter={(label) => `Year ${label}`}
                      />
                      <Legend />
                      <Bar 
                        yAxisId="left" 
                        dataKey="annualProfitSharing" 
                        fill={colors.success} 
                        name="Annual Distributions" 
                      />
                      {/* <Line 
                        yAxisId="right" 
                        type="monotone" 
                        dataKey="companiesProfitSharing" 
                        stroke={colors.accent} 
                        strokeWidth={2}
                        dot={{ r: 4 }}
                        name="Companies in Profit Sharing" 
                      /> */}
                    </ComposedChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Return Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h2 className="text-lg font-semibold text-dark mb-4">Profit Sharing Return Multiple</h2>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={data.yearlyData}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                        <XAxis dataKey="year" />
                        <YAxis />
                        <Tooltip 
                          formatter={(value: number) => [`${value.toFixed(2)}x`, "Return Multiple"]}
                          labelFormatter={(label) => `Year ${label}`}
                        />
                        <Legend />
                        <Line 
                          type="monotone" 
                          dataKey="grossProfitSharingReturnMultiple" 
                          stroke={colors.primary} 
                          strokeWidth={2}
                          dot={{ r: 4 }}
                          name="Gross Profit Sharing Multiple" 
                        />
                        <Line 
                          type="monotone" 
                          dataKey="netProfitSharingReturnMultiple" 
                          stroke={colors.accent} 
                          strokeWidth={2}
                          dot={{ r: 4 }}
                          name="Net Profit Sharing Multiple" 
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h2 className="text-lg font-semibold text-dark mb-4">Capital Returned Percentage</h2>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart
                        data={data.yearlyData}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                        <XAxis dataKey="year" />
                        <YAxis tickFormatter={formatYAxisPercent} />
                        <Tooltip 
                          formatter={(value: number) => [`${value.toFixed(1)}%`, "Capital Returned"]}
                          labelFormatter={(label) => `Year ${label}`}
                        />
                        <Area 
                          type="monotone" 
                          dataKey="percentageCapitalReturned" 
                          fill={colors.primary} 
                          stroke={colors.primary} 
                          name="Percentage of Capital Returned" 
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>

              {/* Profit Sharing Companies Analysis */}
              {/* <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-semibold text-dark mb-4">Profit Sharing Companies Growth</h2>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart
                      data={data.yearlyData}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="year" />
                      <YAxis />
                      <Tooltip 
                        formatter={(value: number) => [formatNumber(value), ""]}
                        labelFormatter={(label) => `Year ${label}`}
                      />
                      <Legend />
                      <Bar 
                        dataKey="companiesProfitSharing" 
                        fill={colors.success} 
                        name="Profit Sharing Companies" 
                      />
                      <Line 
                        type="monotone" 
                        dataKey="activePortcos" 
                        stroke={colors.dark} 
                        strokeWidth={2}
                        dot={{ r: 4 }}
                        name="Total Active Companies" 
                      />
                    </ComposedChart>
                  </ResponsiveContainer>
                </div>
              </div> */}
            </div>
          )}
          {activeTab === 'assumptions' && (
            <div className="space-y-6">
              {/* Key Assumptions */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-semibold text-dark mb-4">Key Model Assumptions</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <table className="w-full text-left">
                      <tbody>
                        <tr className="border-b">
                          <td className="py-3 text-gray-500">Average Check Size</td>
                          <td className="py-3 font-medium text-dark">{data.assumptions.avgCheckSize}</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-3 text-gray-500">Target Portfolio Size</td>
                          <td className="py-3 font-medium text-dark">{data.assumptions.targetPortfolio} Companies</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-3 text-gray-500">Failure Rate Assumption</td>
                          <td className="py-3 font-medium text-dark">{data.assumptions.failureRate}</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-3 text-gray-500">Target Fund Size</td>
                          <td className="py-3 font-medium text-dark">
                            {formatCurrency(
                              Number(data.assumptions.targetPortfolio) * 
                              Number(data.assumptions.avgCheckSize.replace(/[^0-9.-]+/g, ''))
                            )}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div>
                    <table className="w-full text-left">
                      <tbody>
                        <tr className="border-b">
                          <td className="py-3 text-gray-500">Profit Sharing Start Year</td>
                          <td className="py-3 font-medium text-dark">Year {data.assumptions.profitSharingStartYear}</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-3 text-gray-500">Revenue Multiple</td>
                          <td className="py-3 font-medium text-dark">{data.assumptions.revenueMultiple}x</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-3 text-gray-500">Net Income Multiple</td>
                          <td className="py-3 font-medium text-dark">{data.assumptions.netIncomeMultiple}x</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-3 text-gray-500">Deployment Timeline</td>
                          <td className="py-3 font-medium text-dark">{data.yearlyData.length} Years</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {/* Venture Bond Mechanics */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-semibold text-dark mb-4">Venture Bond Mechanics</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-md font-semibold text-dark mb-3">Profit-Sharing Mechanics</h3>
                    <div className="space-y-4">
                      <div className="p-4 rounded bg-background">
                        <h4 className="font-medium text-dark mb-1">Profit Sharing Triggers</h4>
                        <ul className="list-disc pl-5 text-gray-600">
                          <li>Time: {data.assumptions.profitSharingStartYear} years post investment</li>
                          <li>Revenue: Customized per company</li>
                          <li>Margins: Customized per company</li>
                        </ul>
                      </div>
                      <div className="p-4 rounded bg-background">
                        <h4 className="font-medium text-dark mb-1">Distribution Structure</h4>
                        <ul className="list-disc pl-5 text-gray-600">
                          <li>20% of profits until 2x initial investment</li>
                          <li>10% of profits until 4x initial investment</li>
                          <li>5% of profits until 6x initial investment</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-md font-semibold text-dark mb-3">Key Benefits</h3>
                    <div className="space-y-4">
                      <div className="p-4 rounded bg-background">
                        <h4 className="font-medium text-dark mb-1">For Investors</h4>
                        <ul className="list-disc pl-5 text-gray-600">
                          <li>Less risk through profit sharing</li>
                          <li>Increased liquidity through regular distributions</li>
                          <li>Competitive returns without requiring billion-dollar exits</li>
                          <li>Equity upside remains intact</li>
                        </ul>
                      </div>
                      <div className="p-4 rounded bg-background">
                        <h4 className="font-medium text-dark mb-1">For Entrepreneurs</h4>
                        <ul className="list-disc pl-5 text-gray-600">
                          <li>Access to more capital</li>
                          <li>Full alignment with investors on sustainable growth</li>
                          <li>More comfortable terms than traditional VC</li>
                          <li>De-risks the path to profitability</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Advanced Metrics */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-semibold text-dark mb-4">Investment Valuation Metrics</h2>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={data.yearlyData}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="year" />
                      <YAxis tickFormatter={formatYAxisCurrency} />
                      <Tooltip 
                        formatter={(value: number) => [formatCurrency(value), ""]}
                        labelFormatter={(label) => `Year ${label}`}
                      />
                      <Legend />
                      <Line 
                        type="monotone" 
                        dataKey="residualValueEstimateRevenue" 
                        stroke={colors.primary} 
                        name="Revenue Multiple Valuation" 
                      />
                      <Line 
                        type="monotone" 
                        dataKey="residualValueEstimateProfit" 
                        stroke={colors.accent} 
                        name="Profit Multiple Valuation" 
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          )}
          {/* Other tab content will be added in subsequent edits */}
        </div>
      </div>
    </div>
  );
};

export default ProFormaDashboard; 