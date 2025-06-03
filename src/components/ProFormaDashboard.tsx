'use client';

import React, { useState, useEffect } from 'react';
import { 
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, 
  Legend, ResponsiveContainer, PieChart, Pie, Cell, AreaChart, Area,
  ComposedChart, Scatter, ReferenceLine
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

const formatYAxisPercent = (value: number, index: number): string => `${(value * 100).toFixed(0)}%`;

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
    cumulativeResidualValue: number;
    residualValueEstimateRevenue: number;
    residualValueEstimateProfit: number;
    totalValue: number;
    grossTVPI: number;
    netTVPI: number;
    percentageCapitalReturned: number;
    grossProfitSharingReturnMultiple: number;
    netProfitSharingReturnMultiple: number;
    irr: number;
  }>;
}

const ProFormaDashboard = () => {
  const [data, setData] = useState<ProFormaData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [selectedScenario, setSelectedScenario] = useState('base');
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const loadData = async (isRefresh: boolean = false) => {
    if (isRefresh) {
      setIsRefreshing(true);
    } else {
      setLoading(true);
    }
    setError(null);

    try {
      const response = await fetch(`/api/pro-forma?scenario=${selectedScenario}`);
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
  }, [selectedScenario]);

  if (!isClient) {
    return null; // or a loading state that matches server-side
  }

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

  console.log('Yearly Data:', data.yearlyData);

  // Debug log for rendered data
  console.log('Rendering with IRR data:', data.yearlyData.map(d => ({ year: d.year, irr: d.irr })));

  return (
    <div className="bg-background min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="space-y-6 mb-8">
          <div className="space-y-4">
            <h1 className="text-3xl font-bold text-dark">Edin Capital Financial Model</h1>
            <p className="text-lg text-gray-500">Venture Bond Pro Forma Dashboard</p>
            {lastUpdated && (
              <p className="text-sm text-gray-400">
                Last updated: {lastUpdated.toLocaleString('en-US', {
                  year: 'numeric',
                  month: 'numeric',
                  day: 'numeric',
                  hour: 'numeric',
                  minute: 'numeric',
                  hour12: true
                })}
              </p>
            )}
            <div className="flex items-center gap-2 text-sm text-warning mt-4 p-3 bg-warning/5 border border-warning/20 rounded-lg md:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <span>Best viewed on a larger screen for optimal experience</span>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <label htmlFor="scenario-select" className="text-sm font-medium text-gray-500 mb-2 block">
                Scenario
              </label>
              <select
                id="scenario-select"
                value={selectedScenario}
                onChange={(e) => setSelectedScenario(e.target.value)}
                className="block w-full px-4 py-3 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary text-base"
              >
                <option value="base">Base Case</option>
                <option value="conservative">Conservative</option>
                <option value="optimistic">Optimistic</option>
              </select>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-sm font-medium text-gray-500 mb-2">Target Fund Size</h3>
              <p className="text-3xl font-bold text-dark">
                $86M
              </p>
            </div>
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
            {/* <button 
              className={`px-4 py-3 font-medium text-sm ${activeTab === 'assumptions' ? 'text-primary border-b-2 border-primary' : 'text-gray-500'}`}
              onClick={() => setActiveTab('assumptions')}
            >
              Assumptions
            </button> */}
          </div>
        </div>

        {/* Content will be added in subsequent edits */}
        <div className="space-y-6">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Portfolio Value Composition */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-base font-semibold text-dark mb-4">Total Portfolio Value Composition</h2>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart
                      data={data.yearlyData}
                      margin={{ top: 25, right: 30, left: 20, bottom: 5 }}
                    >
                      <XAxis dataKey="year" fontSize={12} className="text-[10px] md:text-xs" />
                      <YAxis tickFormatter={formatYAxisCurrency} fontSize={12} className="text-[10px] md:text-xs" />
                      <Tooltip 
                        formatter={(value: number) => [formatCurrency(value), ""]}
                        labelFormatter={(label) => `${label}`}
                      />
                      <Legend 
                        wrapperStyle={{
                          fontSize: '10px',
                          paddingTop: '10px'
                        }}
                        layout="horizontal"
                        verticalAlign="bottom"
                        align="center"
                        iconSize={8}
                        iconType="circle"
                      />
                      <ReferenceLine 
                        x="Year 10"
                        stroke="#666" 
                        strokeDasharray="3 3"
                        label={{ 
                          value: '10y Benchmark', 
                          position: 'top',
                          fill: '#666',
                          fontSize: 12,
                          fontWeight: 'bold',
                          offset: 10
                        }}
                      />
                      <Bar 
                        dataKey="cumulativeProfitSharingDistributions" 
                        stackId="a" 
                        fill={colors.success} 
                        name="Cumulative Profit Sharing Distributions" 
                      />
                      <Bar 
                        dataKey="cumulativeResidualValue" 
                        stackId="a" 
                        fill={colors.secondary} 
                        name="Cumulative Residual Value" 
                      />
                      <Scatter 
                        dataKey="totalValue" 
                        fill={colors.dark}
                        name="Total Value" 
                      />
                    </ComposedChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Portfolio Growth & Distributions */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h2 className="text-base font-semibold text-dark mb-4">Cumulative Profit Share Distributions</h2>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart
                        data={data.yearlyData}
                        margin={{ top: 25, right: 30, left: 20, bottom: 5 }}
                      >
                        <XAxis dataKey="year" fontSize={12} className="text-[10px] md:text-xs" />
                        <YAxis tickFormatter={formatYAxisCurrency} fontSize={12} className="text-[10px] md:text-xs" />
                        <Tooltip 
                          formatter={(value: number) => [formatCurrency(value), "Cumulative Distributions"]}
                          labelFormatter={(label) => `${label}`}
                        />
                        <ReferenceLine 
                          x="Year 10"
                          stroke="#666" 
                          strokeDasharray="3 3"
                          label={{ 
                            value: '10y Benchmark', 
                            position: 'top',
                            fill: '#666',
                            fontSize: 12,
                            fontWeight: 'bold',
                            offset: 10
                          }}
                        />
                        <Area 
                          type="monotone" 
                          dataKey="cumulativeProfitSharingDistributions" 
                          fill={colors.success} 
                          stroke={colors.success} 
                          name="Cumulative Distributions" 
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h2 className="text-base font-semibold text-dark mb-4">Cumulative Residual Value</h2>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart
                        data={data.yearlyData}
                        margin={{ top: 25, right: 30, left: 20, bottom: 5 }}
                      >
                        <XAxis dataKey="year" fontSize={12} className="text-[10px] md:text-xs" />
                        <YAxis tickFormatter={formatYAxisCurrency} fontSize={12} className="text-[10px] md:text-xs" />
                        <Tooltip 
                          formatter={(value: number) => [formatCurrency(value), "Cumulative Residual Value"]}
                          labelFormatter={(label) => `${label}`}
                        />
                        <ReferenceLine 
                          x="Year 10"
                          stroke="#666" 
                          strokeDasharray="3 3"
                          label={{ 
                            value: '10y Benchmark', 
                            position: 'top',
                            fill: '#666',
                            fontSize: 12,
                            fontWeight: 'bold',
                            offset: 10
                          }}
                        />
                        <Area 
                          type="monotone" 
                          dataKey="cumulativeResidualValue" 
                          fill={colors.secondary} 
                          stroke={colors.secondary} 
                          name="Cumulative Residual Value" 
                        />
                        
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>
               
              </div>

              {/* TVPI Chart */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h2 className="text-base font-semibold text-dark mb-4">Total Value to Paid-In Capital (TVPI)</h2>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={data.yearlyData}
                        margin={{ top: 25, right: 30, left: 20, bottom: 5 }}
                      >
                        <XAxis dataKey="year" fontSize={12} className="text-[10px] md:text-xs" />
                        <YAxis tickFormatter={(value) => `${value.toFixed(1)}x`} fontSize={12} className="text-[10px] md:text-xs" />
                        <Tooltip 
                          formatter={(value: number) => [`${value.toFixed(2)}x`, ""]}
                          labelFormatter={(label) => `${label}`}
                        />
                        <Legend 
                          wrapperStyle={{
                            fontSize: '10px',
                            paddingTop: '10px'
                          }}
                          layout="horizontal"
                          verticalAlign="bottom"
                          align="center"
                          iconSize={8}
                          iconType="circle"
                        />
                        <ReferenceLine 
                          x="Year 10"
                          stroke="#666" 
                          strokeDasharray="3 3"
                          label={{ 
                            value: '10y Benchmark', 
                            position: 'top',
                            fill: '#666',
                            fontSize: 12,
                            fontWeight: 'bold',
                            offset: 10
                          }}
                        />
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
                          stroke={colors.secondary} 
                          name="Net TVPI" 
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* IRR Chart */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h2 className="text-base font-semibold text-dark mb-4">Internal Rate of Return (IRR)</h2>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={data.yearlyData}
                        margin={{ top: 25, right: 30, left: 20, bottom: 5 }}
                      >
                        <XAxis dataKey="year" fontSize={12} className="text-[10px] md:text-xs" />
                        <YAxis 
                          tickFormatter={(value) => `${value.toFixed(0)}%`}
                          domain={['dataMin - 10', 'dataMax + 10']}
                          fontSize={12}
                          className="text-[10px] md:text-xs"
                        />
                        <Tooltip 
                          formatter={(value: number) => [`${value.toFixed(1)}%`, "IRR"]}
                          labelFormatter={(label) => `${label}`}
                        />
                        <ReferenceLine 
                          y={0}
                          stroke="#666"
                          strokeDasharray="2 2"
                        />
                        <ReferenceLine 
                          x="Year 10"
                          stroke="#666" 
                          strokeDasharray="3 3"
                          label={{ 
                            value: '10y Benchmark', 
                            position: 'top',
                            fill: '#666',
                            fontSize: 12,
                            fontWeight: 'bold',
                            offset: 10
                          }}
                        />
                        <Line 
                          type="monotone" 
                          dataKey="irr" 
                          stroke={colors.warning} 
                          strokeWidth={2}
                          dot={{ r: 4 }}
                          name="IRR" 
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </div>
          )}
          {activeTab === 'projections' && (
            <div className="space-y-6">
              {/* Company Growth Metrics */}
              {/* Revenue & Profit Projection */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-base font-semibold text-dark mb-4">Portfolio Revenue & Profit Projection</h2>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart
                      data={data.yearlyData}
                      margin={{ top: 25, right: 30, left: 20, bottom: 5 }}
                    >
                      <XAxis dataKey="year" fontSize={12} className="text-[10px] md:text-xs" />
                      <YAxis tickFormatter={formatYAxisCurrency} fontSize={12} className="text-[10px] md:text-xs" />
                      <Tooltip 
                        formatter={(value: number, name: string) => {
                          return [formatCurrency(value), name];
                        }}
                        labelFormatter={(label) => `${label}`}
                      />
                      <Legend 
                        wrapperStyle={{
                          fontSize: '10px',
                          paddingTop: '10px'
                        }}
                        layout="horizontal"
                        verticalAlign="bottom"
                        align="center"
                        iconSize={8}
                        iconType="circle"
                      />
                      <ReferenceLine 
                        x="Year 10"
                        stroke="#666" 
                        strokeDasharray="3 3"
                        label={{ 
                          value: '10y Benchmark', 
                          position: 'top',
                          fill: '#666',
                          fontSize: 12,
                          fontWeight: 'bold',
                          offset: 10
                        }}
                      />
                      <Bar 
                        dataKey="portfolioRevenue" 
                        fill={colors.primary} 
                        name="Portfolio Revenue" 
                      />
                      <Bar 
                        dataKey="portfolioProfit" 
                        fill={colors.success} 
                        name="Portfolio Profit" 
                      />
                    </ComposedChart>
                  </ResponsiveContainer>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h2 className="text-base font-semibold text-dark mb-4">Average Revenue Per Company</h2>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={data.yearlyData}
                        margin={{ top: 25, right: 30, left: 20, bottom: 5 }}
                      >
                        <XAxis dataKey="year" fontSize={12} className="text-[10px] md:text-xs" />
                        <YAxis tickFormatter={formatYAxisCurrency} fontSize={12} className="text-[10px] md:text-xs" />
                        <Tooltip 
                          formatter={(value: number) => [formatCurrency(value), "Avg Revenue/Company"]}
                          labelFormatter={(label) => `${label}`}
                        />
                        <ReferenceLine 
                          x="Year 10"
                          stroke="#666" 
                          strokeDasharray="3 3"
                          label={{ 
                            value: '10y Benchmark', 
                            position: 'top',
                            fill: '#666',
                            fontSize: 12,
                            fontWeight: 'bold',
                            offset: 10
                          }}
                        />
                        <Line 
                          type="monotone" 
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
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h2 className="text-base font-semibold text-dark mb-4">Average Margins</h2>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={data.yearlyData}
                        margin={{ top: 25, right: 30, left: 20, bottom: 5 }}
                      >
                        <XAxis dataKey="year" fontSize={12} className="text-[10px] md:text-xs" />
                        <YAxis tickFormatter={formatYAxisPercent} fontSize={12} className="text-[10px] md:text-xs" />
                        <Tooltip 
                          formatter={(value: number) => [`${value.toFixed(1)}%`, "Average Margins"]}
                          labelFormatter={(label) => `${label}`}
                        />
                        <ReferenceLine 
                          x="Year 10"
                          stroke="#666" 
                          strokeDasharray="3 3"
                          label={{ 
                            value: '10y Benchmark', 
                            position: 'top',
                            fill: '#666',
                            fontSize: 12,
                            fontWeight: 'bold',
                            offset: 10
                          }}
                        />
                        <Line 
                          type="monotone" 
                          dataKey="avgMargins" 
                          stroke={colors.warning} 
                          strokeWidth={2}
                          dot={{ r: 4 }}
                          name="Average Margins" 
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
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
                      margin={{ top: 25, right: 30, left: 20, bottom: 5 }}
                    >
                      <XAxis dataKey="year" fontSize={12} className="text-[10px] md:text-xs" />
                      <YAxis tickFormatter={formatYAxisCurrency} fontSize={12} className="text-[10px] md:text-xs" />
                      <Tooltip 
                        formatter={(value: number, name: string) => {
                          if (name === "Companies in Profit Sharing") return [formatNumber(value), name];
                          return [formatCurrency(value), name];
                        }}
                        labelFormatter={(label) => `${label}`}
                      />
                      
                      <ReferenceLine 
                        x="Year 10"
                        stroke="#666" 
                        strokeDasharray="3 3"
                        label={{ 
                          value: '10y Benchmark', 
                          position: 'top',
                          fill: '#666',
                          fontSize: 12,
                          fontWeight: 'bold',
                          offset: 10
                        }}
                      />
                      <Bar 
                        dataKey="annualProfitSharing" 
                        fill={colors.success} 
                        name="Annual Distributions" 
                      />
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
                        margin={{ top: 25, right: 30, left: 20, bottom: 5 }}
                      >
                        <XAxis dataKey="year" fontSize={12} className="text-[10px] md:text-xs" />
                        <YAxis tickFormatter={(value) => `${value.toFixed(1)}x`} fontSize={12} className="text-[10px] md:text-xs" />
                        <Tooltip 
                          formatter={(value: number) => [`${value.toFixed(2)}x`, "Return Multiple"]}
                          labelFormatter={(label) => `${label}`}
                        />
                        <Legend 
                          wrapperStyle={{
                            fontSize: '10px',
                            paddingTop: '10px'
                          }}
                          layout="horizontal"
                          verticalAlign="bottom"
                          align="center"
                          iconSize={8}
                          iconType="circle"
                        />
                        <ReferenceLine 
                          x="Year 10"
                          stroke="#666" 
                          strokeDasharray="3 3"
                          label={{ 
                            value: '10y Benchmark', 
                            position: 'top',
                            fill: '#666',
                            fontSize: 12,
                            fontWeight: 'bold',
                            offset: 10
                          }}
                        />
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
                          stroke={colors.secondary} 
                          strokeWidth={2}
                          dot={{ r: 4 }}
                          name="Net Profit Sharing Multiple" 
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h2 className="text-lg font-semibold text-dark mb-4">Cumulative Profit Sharing Distributions</h2>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart
                        data={data.yearlyData}
                        margin={{ top: 25, right: 30, left: 20, bottom: 5 }}
                      >
                        <XAxis dataKey="year" fontSize={12} className="text-[10px] md:text-xs" />
                        <YAxis tickFormatter={formatYAxisCurrency} fontSize={12} className="text-[10px] md:text-xs" />
                        <Tooltip 
                          formatter={(value: number) => [formatCurrency(value), "Cumulative Distributions"]}
                          labelFormatter={(label) => `${label}`}
                        />
                        <ReferenceLine 
                          x="Year 10"
                          stroke="#666" 
                          strokeDasharray="3 3"
                          label={{ 
                            value: '10y Benchmark', 
                            position: 'top',
                            fill: '#666',
                            fontSize: 12,
                            fontWeight: 'bold',
                            offset: 10
                          }}
                        />
                        <Area 
                          type="monotone" 
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
              {/* <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-semibold text-dark mb-4">Investment Valuation Metrics</h2>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={data.yearlyData}
                      margin={{ top: 25, right: 30, left: 20, bottom: 5 }}
                    >
                      <XAxis dataKey="year" />
                      <YAxis tickFormatter={formatYAxisCurrency} />
                      <Tooltip 
                        formatter={(value: number) => [formatCurrency(value), ""]}
                        labelFormatter={(label) => `${label}`}
                      />
                      <Legend />
                      <ReferenceLine 
                        x="Year 10"
                        stroke="#666" 
                        strokeDasharray="3 3"
                        label={{ 
                          value: 'Active Fund Duration', 
                          position: 'top',
                          fill: '#666',
                          fontSize: 12,
                          fontWeight: 'bold',
                          offset: 10
                        }}
                      />
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
              </div> */}
            </div>
          )}
          {/* Other tab content will be added in subsequent edits */}
        </div>
      </div>
    </div>
  );
};

export default ProFormaDashboard; 