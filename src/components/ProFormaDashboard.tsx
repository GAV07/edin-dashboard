'use client';

import React, { useState, useEffect, useCallback } from 'react';
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  Legend, ResponsiveContainer, PieChart, Pie, Cell, AreaChart, Area,
  ComposedChart, Scatter, ReferenceLine
} from 'recharts';
import { useSessionAwareFetch } from '@/hooks/useSessionAwareFetch';
import { useRouter } from 'next/navigation';

// Design system color palette
const colors = {
  primary: '#2C4A1E',
  secondary: '#46602D',
  accent: '#1C6273',
  success: '#768D64',
  warning: '#B49150',
  danger: '#bc6c25',
  dark: '#1F1E19',
  light: '#F9FAFB',
  background: '#F3F4F6',
  backgroundDark: '#636e72',
  chartColors: ['#2C4A1E', '#46602D', '#1C6273', '#768D64', '#74b9ff', '#55a3ff', '#B49150', '#bc6c25']
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
    startingAverageMargin: string;
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

const serifStyle = { fontFamily: 'var(--font-serif)' };

const ProFormaDashboard = () => {
  const [data, setData] = useState<ProFormaData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [selectedScenario, setSelectedScenario] = useState('base');
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();

  const { safeFetch, createInterval, isSessionValid, saveToCache, getFromCache } = useSessionAwareFetch({
    onSessionExpired: () => {
      console.log('Session expired, but keeping cached data visible...');
    },
    cacheKey: `proforma_${selectedScenario}`
  });

  useEffect(() => {
    setIsClient(true);

    const cachedData = getFromCache();
    if (cachedData && !isSessionValid) {
      console.log('Loading cached data on mount...');
      setData(cachedData);
      setError('Session expired. Showing cached data. Please sign in to refresh.');
      setLoading(false);
    }
  }, [getFromCache, isSessionValid]);

  const loadData = useCallback(async (isRefresh: boolean = false) => {
    if (!isSessionValid) {
      const cachedData = getFromCache();
      if (cachedData) {
        setData(cachedData);
        setError('Session expired. Showing cached data. Please sign in to refresh.');
        setLoading(false);
        setIsRefreshing(false);
        return;
      } else {
        setError('Session expired and no cached data available. Please sign in again.');
        setLoading(false);
        setIsRefreshing(false);
        return;
      }
    }

    if (isRefresh) {
      setIsRefreshing(true);
    } else {
      setLoading(true);
    }
    setError(null);

    try {
      const response = await safeFetch(`/api/pro-forma?scenario=${selectedScenario}`);
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to fetch data');
      }

      setData(result);
      setLastUpdated(new Date());
      saveToCache(result);
    } catch (err: any) {
      console.error('Error fetching data:', err);

      if (err.message.includes('Session expired')) {
        const cachedData = getFromCache();
        if (cachedData) {
          setData(cachedData);
          setError('Session expired. Showing cached data. Please sign in to refresh.');
        } else {
          setError('Your session has expired and no cached data is available. Please sign in again.');
        }
        return;
      }

      setError(err.message || 'An error occurred while fetching data');
    } finally {
      if (isRefresh) {
        setIsRefreshing(false);
      } else {
        setLoading(false);
      }
    }
  }, [isSessionValid, selectedScenario, getFromCache, safeFetch, saveToCache]);

  const refreshData = useCallback(() => {
    loadData(true);
  }, [loadData]);

  useEffect(() => {
    if (isSessionValid) {
      loadData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedScenario, isSessionValid]);

  if (!isClient) {
    return null;
  }

  if (loading && !isRefreshing) {
    return (
      <div className="flex items-center justify-center h-screen" style={{ background: 'transparent' }}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 mx-auto" style={{ borderColor: colors.primary }}></div>
          <p className="mt-4" style={{ color: colors.dark }}>Loading financial data...</p>
        </div>
      </div>
    );
  }

  if (error && !data) {
    const isSessionError = error.includes('Session expired') || error.includes('sign in');

    return (
      <div className="flex items-center justify-center h-screen" style={{ background: 'transparent' }}>
        <div className="panel panel-pad text-center">
          <div className="text-5xl mb-4">
            {isSessionError ? '\uD83D\uDD12' : '\u26A0\uFE0F'}
          </div>
          <h2 className="text-xl font-semibold mb-2" style={{ ...serifStyle, color: colors.dark }}>
            {isSessionError ? 'Session Expired' : 'Error'}
          </h2>
          <p className="mb-4" style={{ color: colors.dark }}>{error}</p>
          <div className="space-x-2">
            {isSessionError ? (
              <button
                onClick={() => router.push('/auth/signin')}
                className="px-4 py-2 rounded-md hover:opacity-90 transition-colors"
                style={{ background: colors.primary, color: '#fff' }}
              >
                Sign In Again
              </button>
            ) : (
              <button
                onClick={refreshData}
                className="px-4 py-2 rounded-md hover:opacity-90 transition-colors"
                style={{ background: colors.primary, color: '#fff' }}
              >
                Try Again
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (!data) {
    return null;
  }

  const showSessionWarning = error && error.includes('Session expired') && data;

  const scenarioLabel = selectedScenario === 'base' ? 'Base Case' : selectedScenario === 'conservative' ? 'Pessimistic' : 'Optimistic';

  return (
    <div style={{ background: 'transparent' }} className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="space-y-6 mb-8">
          <div className="space-y-4">
            <h1 className="text-3xl font-bold" style={{ ...serifStyle, color: colors.dark }}>Edin Capital Financial Model</h1>
            <p className="text-lg" style={{ color: 'var(--text-secondary)' }}>Venture Bond Pro Forma Dashboard</p>

            <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>
              Projected returns for illustrative purposes only. Based on modeled assumptions and hypothetical scenarios.
            </p>
            {lastUpdated && (
              <p className="text-sm" style={{ color: 'var(--text-tertiary)' }}>
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
            <div className="flex items-center gap-2 text-sm mt-4 p-3 rounded-lg md:hidden" style={{ color: colors.warning, background: `${colors.warning}0d`, border: `1px solid ${colors.warning}33` }}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <span>Best viewed on a larger screen for optimal experience</span>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="panel panel-pad">
              <label htmlFor="scenario-select" className="text-sm font-medium mb-3 block" style={{ color: 'var(--text-secondary)' }}>
                Scenario
              </label>
              <div className="seg">
                {(['base', 'conservative', 'optimistic'] as const).map((s) => (
                  <button
                    key={s}
                    className={s === selectedScenario ? 'is-active' : ''}
                    onClick={() => setSelectedScenario(s)}
                  >
                    {s === 'base' ? 'Base Case' : s === 'conservative' ? 'Pessimistic' : 'Optimistic'}
                  </button>
                ))}
              </div>
            </div>
            <div className="panel panel-pad">
              <h3 className="text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>Target Fund Size</h3>
              <p className="text-3xl font-bold" style={{ ...serifStyle, color: colors.dark }}>
                $86M
              </p>
            </div>
          </div>
        </div>

        {/* Session Warning Banner */}
        {showSessionWarning && (
          <div className="panel panel-pad mb-6" style={{ borderTop: `3px solid ${colors.warning}` }}>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5" style={{ color: colors.warning }} viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium" style={{ color: colors.dark }}>
                    Session Expired - Viewing Cached Data
                  </h3>
                  <div className="mt-1 text-sm" style={{ color: 'var(--text-secondary)' }}>
                    Your session has expired, but you can continue viewing the last cached data. Sign in again to refresh the data.
                  </div>
                </div>
              </div>
              <div className="flex-shrink-0">
                <button
                  type="button"
                  onClick={() => router.push('/auth/signin')}
                  className="rounded-md px-3 py-2 text-sm font-medium transition-colors"
                  style={{ color: colors.dark, border: `1px solid ${colors.warning}` }}
                >
                  Sign In
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Tabs */}
        <div className="ed-tabs" style={{ marginBottom: 'var(--space-4)' }}>
          <button
            className={`ed-tab${activeTab === 'overview' ? ' is-active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            Overview
          </button>
          <button
            className={`ed-tab${activeTab === 'projections' ? ' is-active' : ''}`}
            onClick={() => setActiveTab('projections')}
          >
            Financial Projections
          </button>
          <button
            className={`ed-tab${activeTab === 'profitSharing' ? ' is-active' : ''}`}
            onClick={() => setActiveTab('profitSharing')}
          >
            Profit Sharing
          </button>
          <button
            className={`ed-tab${activeTab === 'companyLevel' ? ' is-active' : ''}`}
            onClick={() => setActiveTab('companyLevel')}
          >
            Company Level
          </button>
        </div>

        {/* Content */}
        <div className="space-y-6">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Portfolio Value Composition */}
              <div className="panel panel-pad">
                <h2 className="text-base font-semibold mb-4" style={{ ...serifStyle, color: colors.dark }}>Total Portfolio Value Composition</h2>
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
                <div className="panel panel-pad">
                  <h2 className="text-base font-semibold mb-4" style={{ ...serifStyle, color: colors.dark }}>Cumulative Profit Share Distributions</h2>
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
                <div className="panel panel-pad">
                  <h2 className="text-base font-semibold mb-4" style={{ ...serifStyle, color: colors.dark }}>Cumulative Residual Value</h2>
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
                <div className="panel panel-pad">
                  <h2 className="text-base font-semibold mb-4" style={{ ...serifStyle, color: colors.dark }}>Total Value to Paid-In Capital (TVPI)</h2>
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
                <div className="panel panel-pad">
                  <h2 className="text-base font-semibold mb-4" style={{ ...serifStyle, color: colors.dark }}>Internal Rate of Return (IRR)</h2>
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
              {/* Revenue & Profit Projection */}
              <div className="panel panel-pad">
                <h2 className="text-base font-semibold mb-4" style={{ ...serifStyle, color: colors.dark }}>Portfolio Revenue & Profit Projection</h2>
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
                <div className="panel panel-pad">
                  <h2 className="text-base font-semibold mb-4" style={{ ...serifStyle, color: colors.dark }}>Average Revenue Per Company</h2>
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
                <div className="panel panel-pad">
                  <h2 className="text-base font-semibold mb-4" style={{ ...serifStyle, color: colors.dark }}>Average Margins</h2>
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
              {/* <div className="panel panel-pad">
                <h2 className="text-lg font-semibold mb-4" style={{ ...serifStyle, color: colors.dark }}>Investment Deployment & Active Portfolio</h2>
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
              <div className="panel panel-pad">
                <h2 className="text-lg font-semibold mb-4" style={{ ...serifStyle, color: colors.dark }}>Profit Sharing Distributions</h2>
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
                <div className="panel panel-pad">
                  <h2 className="text-lg font-semibold mb-4" style={{ ...serifStyle, color: colors.dark }}>Profit Sharing Return Multiple</h2>
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
                <div className="panel panel-pad">
                  <h2 className="text-lg font-semibold mb-4" style={{ ...serifStyle, color: colors.dark }}>Cumulative Profit Sharing Distributions</h2>
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
              {/* <div className="panel panel-pad">
                <h2 className="text-lg font-semibold mb-4" style={{ ...serifStyle, color: colors.dark }}>Profit Sharing Companies Growth</h2>
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
          {activeTab === 'companyLevel' && (
            <div className="space-y-6">
              {/* Company Level Metrics Overview */}
              <div className="panel panel-pad">
                <h2 className="text-base font-semibold mb-4" style={{ ...serifStyle, color: colors.dark }}>Portfolio Company Performance Overview</h2>
                <p className="text-sm mb-6" style={{ color: 'var(--text-secondary)' }}>Aggregate view of portfolio companies showing average performance metrics and total portfolio impact.</p>

                {/* Key Metrics Grid */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                  <div className="metric">
                    <h3 className="metric-l">Starting Average Revenue</h3>
                    <p className="metric-v" style={{ color: colors.primary }}>
                      {data.yearlyData.length > 0 ? formatCurrency(data.yearlyData[0].avgRevenuePerCompany) : '-'}
                    </p>
                    <p className="metric-sub">Per Company (Year 1)</p>
                  </div>
                  <div className="metric">
                    <h3 className="metric-l">Starting Growth Rate</h3>
                    <p className="metric-v" style={{ color: colors.success }}>
                      {data.yearlyData.length > 0 ? formatPercent(data.yearlyData[0].avgAnnualGrowthRate * 100) : '-'}
                    </p>
                    <p className="metric-sub">Annual (Year 1)</p>
                  </div>
                  <div className="metric">
                    <h3 className="metric-l">Starting Average Margin</h3>
                    <p className="metric-v" style={{ color: colors.accent }}>
                      {(() => {
                        console.log('Starting margin value:', data.assumptions.startingAverageMargin);
                        if (!data.assumptions.startingAverageMargin) return '-';

                        const value = data.assumptions.startingAverageMargin;
                        console.log('Raw value type:', typeof value, 'Raw value:', value);

                        if (typeof value === 'string') {
                          const cleanValue = value.replace('%', '').trim();
                          const numValue = Number(cleanValue);
                          console.log('Cleaned value:', cleanValue, 'Parsed number:', numValue);
                          return numValue > 1 ? `${numValue}%` : `${(numValue * 100).toFixed(1)}%`;
                        }
                        return formatPercent(value * 100);
                      })()}
                    </p>
                    <p className="metric-sub">From B10</p>
                  </div>
                  <div className="metric">
                    <h3 className="metric-l">Total Portfolio Revenue</h3>
                    <p className="metric-v" style={{ color: colors.secondary }}>
                      {data.yearlyData.length > 0 ? formatCurrency(data.yearlyData[data.yearlyData.length - 1].portfolioRevenue) : '-'}
                    </p>
                    <p className="metric-sub">Cumulative</p>
                  </div>
                </div>
              </div>

              {/* Company Level Charts */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="panel panel-pad">
                  <h2 className="text-base font-semibold mb-4" style={{ ...serifStyle, color: colors.dark }}>Average Revenue Per Company</h2>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={data.yearlyData}
                        margin={{ top: 25, right: 30, left: 20, bottom: 5 }}
                      >
                        <XAxis dataKey="year" fontSize={12} className="text-[10px] md:text-xs" />
                        <YAxis tickFormatter={formatYAxisCurrency} fontSize={12} className="text-[10px] md:text-xs" />
                        <Tooltip
                          formatter={(value: number) => [formatCurrency(value), "Average Revenue"]}
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
                          strokeWidth={3}
                          dot={{ r: 6, fill: colors.primary }}
                          name="Average Revenue per Company"
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="panel panel-pad">
                  <h2 className="text-base font-semibold mb-4" style={{ ...serifStyle, color: colors.dark }}>Average Annual Growth Rate</h2>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={data.yearlyData}
                        margin={{ top: 25, right: 30, left: 20, bottom: 5 }}
                      >
                        <XAxis dataKey="year" fontSize={12} className="text-[10px] md:text-xs" />
                        <YAxis tickFormatter={formatYAxisPercent} fontSize={12} className="text-[10px] md:text-xs" />
                        <Tooltip
                          formatter={(value: number) => [formatPercent(value * 100), "Average Growth Rate"]}
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
                          dataKey="avgAnnualGrowthRate"
                          stroke={colors.success}
                          strokeWidth={3}
                          dot={{ r: 6, fill: colors.success }}
                          name="Average Growth Rate"
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="panel panel-pad">
                  <h2 className="text-base font-semibold mb-4" style={{ ...serifStyle, color: colors.dark }}>Total Portfolio Revenue</h2>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={data.yearlyData}
                        margin={{ top: 25, right: 30, left: 20, bottom: 5 }}
                      >
                        <XAxis dataKey="year" fontSize={12} className="text-[10px] md:text-xs" />
                        <YAxis tickFormatter={formatYAxisCurrency} fontSize={12} className="text-[10px] md:text-xs" />
                        <Tooltip
                          formatter={(value: number) => [formatCurrency(value), "Total Portfolio Revenue"]}
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
                          dataKey="portfolioRevenue"
                          stroke={colors.secondary}
                          strokeWidth={3}
                          dot={{ r: 6, fill: colors.secondary }}
                          name="Total Portfolio Revenue"
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="panel panel-pad">
                  <h2 className="text-base font-semibold mb-4" style={{ ...serifStyle, color: colors.dark }}>Portfolio Net Income</h2>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={data.yearlyData}
                        margin={{ top: 25, right: 30, left: 20, bottom: 5 }}
                      >
                        <XAxis dataKey="year" fontSize={12} className="text-[10px] md:text-xs" />
                        <YAxis tickFormatter={formatYAxisCurrency} fontSize={12} className="text-[10px] md:text-xs" />
                        <Tooltip
                          formatter={(value: number) => [formatCurrency(value), "Portfolio Net Income"]}
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
                          dataKey="portfolioProfit"
                          stroke={colors.warning}
                          strokeWidth={3}
                          dot={{ r: 6, fill: colors.warning }}
                          name="Portfolio Net Income"
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>

              {/* Combined Company Performance Chart */}
              <div className="panel panel-pad">
                <h2 className="text-base font-semibold mb-4" style={{ ...serifStyle, color: colors.dark }}>Company Performance Trends</h2>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={data.yearlyData}
                      margin={{ top: 25, right: 30, left: 20, bottom: 5 }}
                    >
                      <XAxis dataKey="year" fontSize={12} className="text-[10px] md:text-xs" />
                      <YAxis tickFormatter={formatYAxisCurrency} fontSize={12} className="text-[10px] md:text-xs" />
                      <Tooltip
                        formatter={(value: number, name: string) => {
                          if (name === "Average Growth Rate") return [formatPercent(value * 100), name];
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
            </div>
          )}
          {activeTab === 'assumptions' && (
            <div className="space-y-6">
              {/* Key Assumptions */}
              <div className="panel panel-pad">
                <h2 className="text-lg font-semibold mb-4" style={{ ...serifStyle, color: colors.dark }}>Key Model Assumptions</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <table className="w-full text-left">
                      <tbody>
                        <tr className="border-b">
                          <td className="py-3" style={{ color: 'var(--text-secondary)' }}>Average Check Size</td>
                          <td className="py-3 font-medium" style={{ color: colors.dark }}>{data.assumptions.avgCheckSize}</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-3" style={{ color: 'var(--text-secondary)' }}>Target Portfolio Size</td>
                          <td className="py-3 font-medium" style={{ color: colors.dark }}>{data.assumptions.targetPortfolio} Companies</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-3" style={{ color: 'var(--text-secondary)' }}>Failure Rate Assumption</td>
                          <td className="py-3 font-medium" style={{ color: colors.dark }}>{data.assumptions.failureRate}</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-3" style={{ color: 'var(--text-secondary)' }}>Target Fund Size</td>
                          <td className="py-3 font-medium" style={{ color: colors.dark }}>
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
                          <td className="py-3" style={{ color: 'var(--text-secondary)' }}>Profit Sharing Start Year</td>
                          <td className="py-3 font-medium" style={{ color: colors.dark }}>Year {data.assumptions.profitSharingStartYear}</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-3" style={{ color: 'var(--text-secondary)' }}>Revenue Multiple</td>
                          <td className="py-3 font-medium" style={{ color: colors.dark }}>{data.assumptions.revenueMultiple}x</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-3" style={{ color: 'var(--text-secondary)' }}>Net Income Multiple</td>
                          <td className="py-3 font-medium" style={{ color: colors.dark }}>{data.assumptions.netIncomeMultiple}x</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-3" style={{ color: 'var(--text-secondary)' }}>Deployment Timeline</td>
                          <td className="py-3 font-medium" style={{ color: colors.dark }}>{data.yearlyData.length} Years</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {/* Venture Bond Mechanics */}
              <div className="panel panel-pad">
                <h2 className="text-lg font-semibold mb-4" style={{ ...serifStyle, color: colors.dark }}>Venture Bond Mechanics</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-md font-semibold mb-3" style={{ color: colors.dark }}>Profit-Sharing Mechanics</h3>
                    <div className="space-y-4">
                      <div className="metric" style={{ padding: 'var(--space-4)' }}>
                        <h4 className="font-medium mb-1" style={{ color: colors.dark }}>Profit Sharing Triggers</h4>
                        <ul className="list-disc pl-5" style={{ color: 'var(--text-secondary)' }}>
                          <li>Time: {data.assumptions.profitSharingStartYear} years post investment</li>
                          <li>Revenue: Customized per company</li>
                          <li>Margins: Customized per company</li>
                        </ul>
                      </div>
                      <div className="metric" style={{ padding: 'var(--space-4)' }}>
                        <h4 className="font-medium mb-1" style={{ color: colors.dark }}>Distribution Structure</h4>
                        <ul className="list-disc pl-5" style={{ color: 'var(--text-secondary)' }}>
                          <li>20% of profits until 2x initial investment</li>
                          <li>10% of profits until 4x initial investment</li>
                          <li>5% of profits until 6x initial investment</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-md font-semibold mb-3" style={{ color: colors.dark }}>Key Benefits</h3>
                    <div className="space-y-4">
                      <div className="metric" style={{ padding: 'var(--space-4)' }}>
                        <h4 className="font-medium mb-1" style={{ color: colors.dark }}>For Investors</h4>
                        <ul className="list-disc pl-5" style={{ color: 'var(--text-secondary)' }}>
                          <li>Less risk through profit sharing</li>
                          <li>Increased liquidity through regular distributions</li>
                          <li>Competitive returns without requiring billion-dollar exits</li>
                          <li>Equity upside remains intact</li>
                        </ul>
                      </div>
                      <div className="metric" style={{ padding: 'var(--space-4)' }}>
                        <h4 className="font-medium mb-1" style={{ color: colors.dark }}>For Entrepreneurs</h4>
                        <ul className="list-disc pl-5" style={{ color: 'var(--text-secondary)' }}>
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
              {/* <div className="panel panel-pad">
                <h2 className="text-lg font-semibold mb-4" style={{ ...serifStyle, color: colors.dark }}>Investment Valuation Metrics</h2>
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

        {/* Bottom Disclosures */}
        <div className="panel" style={{ marginTop: 'var(--space-6)', padding: 'var(--space-4)', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
          <p className="font-semibold" style={{ color: colors.dark, marginBottom: 'var(--space-2)' }}>Important Disclosures</p>
          <p style={{ marginBottom: 'var(--space-2)' }}>
            The financial model and projections presented are hypothetical and based on modeled assumptions including portfolio
            construction, growth rates, profit margins, and exit scenarios. They do not constitute investment advice, an offer to
            sell, or a solicitation of an offer to buy any securities.
          </p>
          <p>
            Past performance is not indicative of future results. All investments involve substantial risk, including the potential
            loss of principal. The Venture Bond is an illiquid instrument and may not be suitable for all investors. Investors
            should consult their own financial, legal, and tax advisors before making any investment decisions.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProFormaDashboard;
