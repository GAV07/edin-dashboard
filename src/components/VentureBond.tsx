"use client";

import React, { useState, useEffect, ChangeEvent } from 'react';
import { 
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, 
  Legend, ResponsiveContainer, ComposedChart, Area
} from 'recharts';

// TypeScript interfaces
interface InputValues {
  investmentAmount: number;
  valCap: number;
  yearsToTrigger: number;
  revenueThreshold: number;
  profitMargin: number;
  growthRate: number;
  initialRevenue: number;
  initialProfitMargin: number;
  simulationYears: number;
  equityPercentage: number;
}

interface YearlyData {
  year: number;
  revenue: number;
  profit: number;
  distribution: number;
  cumulativeDistribution: number;
  returnMultiple: string;
  profitSharePercentage: number;
  equityValue: number;
  totalValue: number;
}

interface SummaryMetrics {
  totalDistributions: number;
  totalProfits: number;
  totalRevenue: number;
  distributionToProfit: number;
  profitRetainedByCompany: number;
  capitalEfficiency: number;
  timeToRecoup: number | string;
  triggerYear: number | string;
  finalReturnMultiple: number;
  equityFinalValue: number;
  totalReturnValue: number;
  totalReturnMultiple: number;
}

interface Results {
  yearlyData: YearlyData[];
  summaryMetrics: SummaryMetrics;
}

interface Scenarios {
  conservative: InputValues;
  normal: InputValues;
  optimistic: InputValues;
}

const VentureBondCalculator = () => {
  // Default values
  const defaultValues: InputValues = {
    investmentAmount: 2000000,
    valCap: 12500000,
    yearsToTrigger: 4,
    revenueThreshold: 2000000,
    profitMargin: 35,
    growthRate: 30,
    initialRevenue: 1000000,
    initialProfitMargin: 20,
    simulationYears: 10,
    equityPercentage: 20
  };

  // Scenario presets
  const scenarios: Scenarios = {
    conservative: {
      investmentAmount: 2000000,
      valCap: 12500000,
      yearsToTrigger: 4,
      revenueThreshold: 2500000,
      profitMargin: 30,
      growthRate: 15,
      initialRevenue: 800000,
      initialProfitMargin: 15,
      simulationYears: 10,
      equityPercentage: 20
    },
    normal: {
      investmentAmount: 2000000,
      valCap: 12500000,
      yearsToTrigger: 4,
      revenueThreshold: 2000000,
      profitMargin: 35,
      growthRate: 30,
      initialRevenue: 1000000,
      initialProfitMargin: 20,
      simulationYears: 10,
      equityPercentage: 20
    },
    optimistic: {
      investmentAmount: 2000000,
      valCap: 12500000,
      yearsToTrigger: 4,
      revenueThreshold: 1500000,
      profitMargin: 40,
      growthRate: 50,
      initialRevenue: 1200000,
      initialProfitMargin: 25,
      simulationYears: 10,
      equityPercentage: 20
    }
  };

  // State
  const [inputs, setInputs] = useState<InputValues>(defaultValues);
  const [results, setResults] = useState<Results | null>(null);
  const [chartData, setChartData] = useState<YearlyData[]>([]);
  const [activeScenario, setActiveScenario] = useState<keyof Scenarios | 'custom'>('normal');

  // Handle input changes with number formatting
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let numericValue = parseFloat(value.replace(/,/g, ''));
    
    setInputs({
      ...inputs,
      [name]: isNaN(numericValue) ? 0 : numericValue
    });
    
    // Mark as custom when user manually changes inputs
    setActiveScenario('custom');
  };

  // Format number inputs with commas
  const formatInputValue = (value: number) => {
    if (value === 0 || value === null || value === undefined) return '';
    return new Intl.NumberFormat('en-US').format(value);
  };

  // Reset to defaults
  const handleReset = () => {
    setInputs(defaultValues);
    setActiveScenario('normal');
  };

  // Apply scenario preset
  const applyScenario = (scenarioType: keyof Scenarios) => {
    setInputs(scenarios[scenarioType]);
    setActiveScenario(scenarioType);
  };

  // Calculate results
  useEffect(() => {
    if (!inputs.investmentAmount) return;

    const calculateResults = () => {
      const {
        investmentAmount,
        valCap,
        yearsToTrigger,
        revenueThreshold,
        profitMargin,
        growthRate,
        initialRevenue,
        initialProfitMargin,
        simulationYears,
        equityPercentage
      } = inputs;

      // Initialize arrays to store yearly data
      const yearlyData: YearlyData[] = [];
      let totalDistributions = 0;
      let totalProfits = 0;
      let totalRevenueSum = 0;
      let currentProfitSharePercentage = 0;
      let hasTriggerOccurred = false;
      let triggerYear = -1;
      let timeToRecoup = -1;
      let currentRevenue = initialRevenue;
      let currentProfit = initialRevenue * (initialProfitMargin / 100);
      let currentDistributionMultiple = 0;

      // Simulate each year
      for (let year = 1; year <= simulationYears; year++) {
        // Apply growth rate to revenue and calculate profit
        if (year > 1) {
          currentRevenue = currentRevenue * (1 + growthRate / 100);
          currentProfit = currentRevenue * (profitMargin / 100);
        }

        // Check if trigger conditions are met
        const triggerConditionsMet = 
          year >= yearsToTrigger && 
          currentRevenue >= revenueThreshold && 
          (currentProfit / currentRevenue) * 100 >= profitMargin;

        // Determine if this is the first year of trigger
        if (triggerConditionsMet && !hasTriggerOccurred) {
          hasTriggerOccurred = true;
          triggerYear = year;
          currentProfitSharePercentage = 20; // Start with 20%
        }

        // Calculate distribution for this year
        let yearlyDistribution = 0;
        if (hasTriggerOccurred) {
          yearlyDistribution = currentProfit * (currentProfitSharePercentage / 100);
          totalDistributions += yearlyDistribution;
          currentDistributionMultiple = totalDistributions / investmentAmount;

          // Adjust profit share percentage based on return multiple tiers
          if (currentDistributionMultiple >= 2 && currentDistributionMultiple < 4) {
            currentProfitSharePercentage = 10;
          } else if (currentDistributionMultiple >= 4 && currentDistributionMultiple < 6) {
            currentProfitSharePercentage = 5;
          } else if (currentDistributionMultiple >= 6) {
            currentProfitSharePercentage = 0; // Cap reached
            yearlyDistribution = 0;
          }
        }

        // Check if investment has been recouped
        if (totalDistributions >= investmentAmount && timeToRecoup === -1) {
          timeToRecoup = year;
        }

        totalProfits += currentProfit;
        totalRevenueSum += currentRevenue;

        // Calculate equity value
        const equityValue = (currentRevenue * 5) * (equityPercentage / 100); // Using 5x revenue multiple for equity valuation

        // Store data for this year
        yearlyData.push({
          year,
          revenue: Math.round(currentRevenue),
          profit: Math.round(currentProfit),
          distribution: Math.round(yearlyDistribution),
          cumulativeDistribution: Math.round(totalDistributions),
          returnMultiple: (totalDistributions / investmentAmount).toFixed(2),
          profitSharePercentage: currentProfitSharePercentage,
          equityValue: Math.round(equityValue),
          totalValue: Math.round(totalDistributions) + Math.round(equityValue)
        });
      }

      // Calculate summary metrics
      const profitGivenToFund = totalDistributions / totalProfits;
      const capitalEfficiency = totalDistributions / investmentAmount; // How much they get back per dollar invested
      
      const summaryMetrics: SummaryMetrics = {
        totalDistributions,
        totalProfits,
        totalRevenue: totalRevenueSum,
        distributionToProfit: profitGivenToFund,
        profitRetainedByCompany: 1 - profitGivenToFund,
        capitalEfficiency,
        timeToRecoup: timeToRecoup !== -1 ? timeToRecoup : "Not within simulation period",
        triggerYear: triggerYear !== -1 ? triggerYear : "Not within simulation period",
        finalReturnMultiple: totalDistributions / investmentAmount,
        equityFinalValue: yearlyData[yearlyData.length - 1].equityValue,
        totalReturnValue: totalDistributions + yearlyData[yearlyData.length - 1].equityValue,
        totalReturnMultiple: (totalDistributions + yearlyData[yearlyData.length - 1].equityValue) / investmentAmount
      };

      return { yearlyData, summaryMetrics };
    };

    const results = calculateResults();
    setResults(results);
    setChartData(results.yearlyData);
  }, [inputs]);

  // Currency formatter
  const formatCurrency = (value: number | undefined | null) => {
    if (value === undefined || value === null) return '-';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  // Percentage formatter
  const formatPercent = (value: number | string | undefined | null) => {
    if (value === undefined || value === null) return '-';
    return `${value}%`;
  };

  // Format any number with commas
  const formatNumber = (value: number | undefined | null) => {
    if (value === undefined || value === null) return '-';
    return new Intl.NumberFormat('en-US').format(value);
  };

  // Get button styling based on active scenario
  const getButtonStyle = (scenarioType: keyof Scenarios) => {
    const isActive = activeScenario === scenarioType;
    return isActive 
      ? "bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg transition duration-200 font-medium shadow-sm border-2 border-blue-500 hover:border-blue-600"
      : "bg-white border-2 border-blue-200 text-gray-700 hover:border-blue-300 hover:bg-blue-50 py-2 px-4 rounded-lg transition duration-200 font-medium shadow-sm";
  };

  const [activeResultTab, setActiveResultTab] = useState<'table' | 'chart'>('chart');

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-6xl mx-auto px-6 py-12 lg:py-16">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-semibold tracking-tight text-gray-900 sm:text-3xl">
            Venture Bond
          </h1>
          <p className="mt-3 text-gray-600 max-w-3xl leading-relaxed">
            A hybrid instrument combining convertible equity with structured profit-sharing,
            delivering returns as companies grow — not just when they exit.
          </p>
        </div>

        <p className="text-xs text-gray-400 mt-2">
          For simulation purposes only. All projections are hypothetical and do not represent guaranteed returns.
        </p>

        {/* Founder Journey — Compact */}
        <section className="mb-10">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">How It Works</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {[
              { label: 'Investment', detail: 'Convertible equity + profit sharing', color: 'border-green-200 bg-green-50' },
              { label: 'Growth', detail: 'Revenue, margins, efficiency', color: 'border-green-200 bg-green-50' },
              { label: 'Triggers Met', detail: 'Time + Revenue + Margin thresholds', color: 'border-green-200 bg-green-50' },
              { label: 'Profit Sharing', detail: '20% \u2192 10% \u2192 5% \u2192 1% tranches', color: 'border-green-200 bg-green-50' },
              { label: 'Exit Paths', detail: 'Continue, equity round, or exit event', color: 'border-gray-200 bg-gray-50' },
            ].map((step, i) => (
              <div key={i} className={`rounded-lg border p-4 ${step.color}`}>
                <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Step {i + 1}</div>
                <h3 className="font-semibold text-gray-900 text-sm mb-1">{step.label}</h3>
                <p className="text-xs text-gray-600 leading-relaxed">{step.detail}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Scenario Selector */}
        <section className="mb-6">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-sm font-medium text-gray-700">Scenario:</span>
            {(['conservative', 'normal', 'optimistic'] as const).map((s) => (
              <button
                key={s}
                onClick={() => applyScenario(s)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeScenario === s
                    ? 'bg-green-700 text-white'
                    : 'border border-gray-200 bg-gray-50 text-gray-700 hover:bg-gray-100'
                }`}
              >
                {s.charAt(0).toUpperCase() + s.slice(1)}
              </button>
            ))}
            <button
              onClick={handleReset}
              className="px-4 py-2 rounded-lg text-sm font-medium border border-gray-200 bg-white text-gray-500 hover:bg-gray-50 transition-colors ml-auto"
            >
              Reset
            </button>
          </div>
        </section>

        {/* Calculator: Inputs (left) + Results (right) */}
        <section className="mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Inputs — 2 columns on left */}
            <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Investment Parameters */}
              <div className="rounded-lg border border-gray-200 bg-gray-50 p-5">
                <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-4">Investment Parameters</h3>
                <div className="space-y-3">
                  {[
                    { label: 'Investment Amount', name: 'investmentAmount', prefix: '$', type: 'text' },
                    { label: 'Valuation Cap', name: 'valCap', prefix: '$', type: 'text' },
                    { label: 'Equity % (at Val Cap)', name: 'equityPercentage', type: 'number' },
                  ].map((field) => (
                    <div key={field.name}>
                      <label className="block text-xs font-medium text-gray-600 mb-1">{field.label}</label>
                      <div className="relative">
                        {field.prefix && <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400 text-sm">$</span>}
                        <input
                          type={field.type}
                          name={field.name}
                          value={field.type === 'text' ? formatInputValue((inputs as any)[field.name]) : (inputs as any)[field.name]}
                          onChange={handleInputChange}
                          className={`${field.prefix ? 'pl-7' : ''} w-full px-3 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500`}
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <h4 className="text-xs font-semibold text-gray-900 uppercase tracking-wide mt-5 mb-3">Profit-Sharing Triggers</h4>
                <div className="space-y-3">
                  {[
                    { label: 'Years Post-Investment', name: 'yearsToTrigger', type: 'number' },
                    { label: 'Revenue Threshold', name: 'revenueThreshold', prefix: '$', type: 'text' },
                    { label: 'Profit Margin Threshold (%)', name: 'profitMargin', type: 'number' },
                  ].map((field) => (
                    <div key={field.name}>
                      <label className="block text-xs font-medium text-gray-600 mb-1">{field.label}</label>
                      <div className="relative">
                        {field.prefix && <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400 text-sm">$</span>}
                        <input
                          type={field.type}
                          name={field.name}
                          value={field.type === 'text' ? formatInputValue((inputs as any)[field.name]) : (inputs as any)[field.name]}
                          onChange={handleInputChange}
                          className={`${field.prefix ? 'pl-7' : ''} w-full px-3 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500`}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Company Projections */}
              <div className="rounded-lg border border-gray-200 bg-gray-50 p-5">
                <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-4">Company Projections</h3>
                <div className="space-y-3">
                  {[
                    { label: 'Initial Annual Revenue', name: 'initialRevenue', prefix: '$', type: 'text' },
                    { label: 'Initial Profit Margin (%)', name: 'initialProfitMargin', type: 'number' },
                    { label: 'Annual Revenue Growth (%)', name: 'growthRate', type: 'number' },
                    { label: 'Simulation Years', name: 'simulationYears', type: 'number' },
                  ].map((field) => (
                    <div key={field.name}>
                      <label className="block text-xs font-medium text-gray-600 mb-1">{field.label}</label>
                      <div className="relative">
                        {field.prefix && <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400 text-sm">$</span>}
                        <input
                          type={field.type}
                          name={field.name}
                          value={field.type === 'text' ? formatInputValue((inputs as any)[field.name]) : (inputs as any)[field.name]}
                          onChange={handleInputChange}
                          min={field.name === 'simulationYears' ? 5 : undefined}
                          max={field.name === 'simulationYears' ? 25 : undefined}
                          className={`${field.prefix ? 'pl-7' : ''} w-full px-3 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500`}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Key Results — right column */}
            <div className="rounded-lg border border-gray-200 bg-gray-50 p-5">
              <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-4">Key Results</h3>
              {results && (
                <div className="space-y-5">
                  <div className="rounded-lg border border-green-200 bg-green-50 p-4">
                    <div className="text-center mb-3">
                      <div className="text-3xl font-bold text-green-800">{results.summaryMetrics.totalReturnMultiple.toFixed(2)}x</div>
                      <div className="text-xs text-green-700 mt-0.5">Total Return Multiple</div>
                    </div>
                    <div className="grid grid-cols-2 gap-x-3 gap-y-2 text-sm">
                      <div className="text-gray-600">Revenue:</div>
                      <div className="font-medium text-gray-900 text-right">{formatCurrency(results.summaryMetrics.totalRevenue)}</div>
                      <div className="text-gray-600">Distributions:</div>
                      <div className="font-medium text-gray-900 text-right">{formatCurrency(results.summaryMetrics.totalDistributions)}</div>
                      <div className="text-gray-600">Dist. Multiple:</div>
                      <div className="font-medium text-gray-900 text-right">{results.summaryMetrics.finalReturnMultiple.toFixed(2)}x</div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-xs font-semibold text-gray-700 uppercase">Profit Sharing</h4>
                    {[
                      { label: 'Trigger Year', value: results.summaryMetrics.triggerYear },
                      { label: 'Time to Recoup', value: typeof results.summaryMetrics.timeToRecoup === 'number' ? `${results.summaryMetrics.timeToRecoup}y` : results.summaryMetrics.timeToRecoup },
                    ].map((item) => (
                      <div key={item.label} className="flex justify-between text-sm">
                        <span className="text-gray-600">{item.label}</span>
                        <span className="font-medium text-gray-900">{item.value}</span>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-xs font-semibold text-gray-700 uppercase">Equity</h4>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Ownership</span>
                      <span className="font-medium text-gray-900">{formatPercent(inputs.equityPercentage)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Final Value</span>
                      <span className="font-medium text-gray-900">{formatCurrency(results.summaryMetrics.equityFinalValue)}</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-xs font-semibold text-gray-700 uppercase">Founder Alignment</h4>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Profit Retained</span>
                      <span className="font-medium text-gray-900">{formatPercent((results.summaryMetrics.profitRetainedByCompany * 100))}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Tabbed Results: Table / Chart */}
        {results && (
          <section className="mb-10">
            <div className="flex items-center gap-1 mb-4 border-b border-gray-200">
              {(['chart', 'table'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveResultTab(tab)}
                  className={`px-4 py-2.5 text-sm font-medium border-b-2 transition-colors -mb-px ${
                    activeResultTab === tab
                      ? 'border-green-700 text-green-800'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {tab === 'chart' ? 'Chart' : 'Year-by-Year Table'}
                </button>
              ))}
            </div>

            {activeResultTab === 'chart' && (
              <div className="rounded-lg border border-gray-200 bg-gray-50 p-6">
                <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-4">Company Profit vs Distributions</h3>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart
                      data={chartData}
                      margin={{ top: 10, right: 20, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                      <XAxis dataKey="year" tick={{ fontSize: 11, fill: '#6b7280' }} />
                      <YAxis
                        tickFormatter={(value) => value >= 1000000 ? `$${(value / 1000000).toFixed(1)}M` : `$${(value / 1000).toFixed(0)}K`}
                        tick={{ fontSize: 11, fill: '#6b7280' }}
                      />
                      <Tooltip
                        formatter={(value: any, name: string) => [formatCurrency(Number(value)), name]}
                        labelFormatter={(label: any) => `Year ${label}`}
                        contentStyle={{ borderRadius: '8px', border: '1px solid #e5e7eb', fontSize: '13px' }}
                      />
                      <Legend wrapperStyle={{ fontSize: '12px' }} />
                      <Bar dataKey="profit" name="Company Profit" fill="#4a7c59" radius={[3, 3, 0, 0]} />
                      <Bar dataKey="distribution" name="Distribution to Investor" fill="#6bb6ff" radius={[3, 3, 0, 0]} />
                      <Line
                        type="monotone"
                        dataKey="cumulativeDistribution"
                        name="Cumulative Distribution"
                        stroke="#dda15e"
                        strokeWidth={2}
                        dot={{ r: 3 }}
                      />
                    </ComposedChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}

            {activeResultTab === 'table' && (
              <div className="rounded-lg border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        {['Year', 'Revenue', 'Profit', 'Distribution', 'Share %', 'Return', 'Equity', 'Total'].map((h) => (
                          <th key={h} className="px-4 py-2.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {results.yearlyData.map((yearData: YearlyData, index: number) => (
                        <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}>
                          <td className="px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-900">{yearData.year}</td>
                          <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-700">{formatCurrency(yearData.revenue)}</td>
                          <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-700">{formatCurrency(yearData.profit)}</td>
                          <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-700">{formatCurrency(yearData.distribution)}</td>
                          <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-700">{formatPercent(yearData.profitSharePercentage)}</td>
                          <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-700">{yearData.returnMultiple}x</td>
                          <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-700">{formatCurrency(yearData.equityValue)}</td>
                          <td className="px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-900">{formatCurrency(yearData.totalValue)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </section>
        )}

      </div>
    </div>
  );
};

export default VentureBondCalculator;