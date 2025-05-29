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

  // Handle input changes with number formatting
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let numericValue = parseFloat(value.replace(/,/g, ''));
    
    setInputs({
      ...inputs,
      [name]: isNaN(numericValue) ? 0 : numericValue
    });
  };

  // Format number inputs with commas
  const formatInputValue = (value: number) => {
    if (value === 0 || value === null || value === undefined) return '';
    return new Intl.NumberFormat('en-US').format(value);
  };

  // Reset to defaults
  const handleReset = () => {
    setInputs(defaultValues);
  };

  // Apply scenario preset
  const applyScenario = (scenarioType: keyof Scenarios) => {
    setInputs(scenarios[scenarioType]);
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

  return (
    <div className="w-full p-6 bg-gray-50 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Edin Capital Venture Bond Calculator</h1>
      
      <div className="mb-8">
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-4">
          <h3 className="text-lg font-semibold text-blue-800 mb-3">Edin Capital&apos;s Venture Bond Structure</h3>
          <p className="text-blue-700 mb-4">
            A new financial instrument combining equity with profit sharing designed to increase returns & liquidity, 
            decrease risk, better align founders and investors, and enhance economic development.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <h4 className="font-medium text-blue-800 mb-2">Investment Components</h4>
              <ul className="space-y-1 text-sm text-blue-700">
                <li>• Convertible Equity with valuation cap</li>
                <li>• Profit-Sharing with specific triggers</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium text-blue-800 mb-2">Trigger Requirements</h4>
              <ul className="space-y-1 text-sm text-blue-700">
                <li>• Time: (Avg) 4 years post-investment, or</li>
                <li>• Revenue: $1M LTM minimum and</li>
                <li>• Margins: 30% profit threshold</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium text-blue-800 mb-2">Profit-Sharing Tiers</h4>
              <ul className="space-y-1 text-sm text-blue-700">
                <li>• 20% until 2x return</li>
                <li>• 10% until 4x return</li>
                <li>• 5% until 6x return</li>
                <li>• 1% until liquidity event</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Scenario Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-6">
          <button
            onClick={() => applyScenario('conservative')}
            className="bg-orange-500 hover:bg-orange-600 text-white py-1.5 px-3 rounded-lg transition duration-200 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-1 border border-orange-600 active:transform active:translate-y-0 active:shadow-md"
          >
            Conservative Scenario
          </button>
          <button
            onClick={() => applyScenario('normal')}
            className="bg-blue-500 hover:bg-blue-600 text-white py-1.5 px-3 rounded-lg transition duration-200 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-1 border border-blue-600 active:transform active:translate-y-0 active:shadow-md"
          >
            Normal Scenario
          </button>
          <button
            onClick={() => applyScenario('optimistic')}
            className="bg-green-500 hover:bg-green-600 text-white py-1.5 px-3 rounded-lg transition duration-200 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-1 border border-green-600 active:transform active:translate-y-0 active:shadow-md"
          >
            Optimistic Scenario
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        <div className="col-span-1 bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Investment Parameters</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Investment Amount
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">$</span>
                <input
                  type="text"
                  name="investmentAmount"
                  value={formatInputValue(inputs.investmentAmount)}
                  onChange={handleInputChange}
                  className="pl-8 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Valuation Cap
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">$</span>
                <input
                  type="text"
                  name="valCap"
                  value={formatInputValue(inputs.valCap)}
                  onChange={handleInputChange}
                  className="pl-8 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Equity % (at Valuation Cap)
              </label>
              <input
                type="number"
                name="equityPercentage"
                value={inputs.equityPercentage}
                onChange={handleInputChange}
                className="w-full px-3 py-2 pr-8 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          
          <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-4">Profit-Sharing Triggers</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Years Post-Investment
              </label>
              <input
                type="number"
                name="yearsToTrigger"
                value={inputs.yearsToTrigger}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Revenue Threshold
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">$</span>
                <input
                  type="text"
                  name="revenueThreshold"
                  value={formatInputValue(inputs.revenueThreshold)}
                  onChange={handleInputChange}
                  className="pl-8 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Profit Margin Threshold (%)
              </label>
              <input
                type="number"
                name="profitMargin"
                value={inputs.profitMargin}
                onChange={handleInputChange}
                className="w-full px-3 py-2 pr-8 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>
        
        <div className="col-span-1 bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Company Projections</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Initial Annual Revenue
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">$</span>
                <input
                  type="text"
                  name="initialRevenue"
                  value={formatInputValue(inputs.initialRevenue)}
                  onChange={handleInputChange}
                  className="pl-8 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Initial Profit Margin (%)
              </label>
              <input
                type="number"
                name="initialProfitMargin"
                value={inputs.initialProfitMargin}
                onChange={handleInputChange}
                className="w-full px-3 py-2 pr-8 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Annual Revenue Growth Rate (%)
              </label>
              <input
                type="number"
                name="growthRate"
                value={inputs.growthRate}
                onChange={handleInputChange}
                className="w-full px-3 py-2 pr-8 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Simulation Years
              </label>
              <input
                type="number"
                name="simulationYears"
                value={inputs.simulationYears}
                onChange={handleInputChange}
                min="5"
                max="25"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          
          <div className="mt-8">
            <button
              onClick={handleReset}
              className="w-full bg-gray-200 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-300 transition duration-200"
            >
              Reset to Defaults
            </button>
          </div>
        </div>
        
        <div className="col-span-1 bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Key Results</h2>
          
          {results && (
            <div className="space-y-6">
              <div className="bg-green-50 p-4 rounded-md border border-green-200">
                <h3 className="font-medium text-green-800 mb-2">Return Summary</h3>
                <div className="grid grid-cols-2 gap-2">
                  <div className="text-sm text-gray-600">Total Company Revenue:</div>
                  <div className="text-sm font-semibold text-gray-800 text-right">
                    {formatCurrency(results.summaryMetrics.totalRevenue)}
                  </div>
                  
                  <div className="text-sm text-gray-600">Return Multiple:</div>
                  <div className="text-sm font-semibold text-gray-800 text-right">
                    {results.summaryMetrics.totalReturnMultiple.toFixed(2)}x
                  </div>
                  
                  <div className="text-sm text-gray-600">Fund Distribution:</div>
                  <div className="text-sm font-semibold text-gray-800 text-right">
                    {formatPercent((results.summaryMetrics.distributionToProfit * 100).toFixed(2))}
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="font-medium text-gray-800 mb-2">Profit Sharing Details</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <div className="text-sm text-gray-600">Trigger Occurs in Year:</div>
                    <div className="text-sm font-semibold text-gray-800">
                      {results.summaryMetrics.triggerYear}
                    </div>
                  </div>
                  
                  <div className="flex justify-between">
                    <div className="text-sm text-gray-600">Time to Recoup Investment:</div>
                    <div className="text-sm font-semibold text-gray-800">
                      {typeof results.summaryMetrics.timeToRecoup === 'number' 
                        ? `${results.summaryMetrics.timeToRecoup} years` 
                        : results.summaryMetrics.timeToRecoup}
                    </div>
                  </div>
                  
                  <div className="flex justify-between">
                    <div className="text-sm text-gray-600">Total Distributions:</div>
                    <div className="text-sm font-semibold text-gray-800">
                      {formatCurrency(results.summaryMetrics.totalDistributions)}
                    </div>
                  </div>
                  
                  <div className="flex justify-between">
                    <div className="text-sm text-gray-600">Distribution Multiple:</div>
                    <div className="text-sm font-semibold text-gray-800">
                      {results.summaryMetrics.finalReturnMultiple.toFixed(2)}x
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="font-medium text-gray-800 mb-2">Equity Component</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <div className="text-sm text-gray-600">Equity Ownership:</div>
                    <div className="text-sm font-semibold text-gray-800">
                      {formatPercent(inputs.equityPercentage)}
                    </div>
                  </div>
                  
                  <div className="flex justify-between">
                    <div className="text-sm text-gray-600">Final Equity Value:</div>
                    <div className="text-sm font-semibold text-gray-800">
                      {formatCurrency(results.summaryMetrics.equityFinalValue)}
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="font-medium text-gray-800 mb-2">Founder Alignment</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <div className="text-sm text-gray-600">Company Total Profit:</div>
                    <div className="text-sm font-semibold text-gray-800">
                      {formatCurrency(results.summaryMetrics.totalProfits)}
                    </div>
                  </div>
                  
                  <div className="flex justify-between">
                    <div className="text-sm text-gray-600">Profit Share to Company:</div>
                    <div className="text-sm font-semibold text-gray-800">
                      {formatPercent((results.summaryMetrics.profitRetainedByCompany * 100).toFixed(2))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Year-by-Year Projections Table */}
      {results && (
        <div className="bg-white p-6 rounded-lg shadow mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Year-by-Year Projections</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Year</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Revenue</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Profit</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Distribution</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Profit Share %</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Return Multiple</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Equity Value</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Value</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {results.yearlyData.map((yearData: YearlyData, index: number) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{yearData.year}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{formatCurrency(yearData.revenue)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{formatCurrency(yearData.profit)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{formatCurrency(yearData.distribution)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{formatPercent(yearData.profitSharePercentage)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{yearData.returnMultiple}x</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{formatCurrency(yearData.equityValue)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{formatCurrency(yearData.totalValue)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Main Chart Section */}
      {results && (
        <div className="bg-white p-6 rounded-lg shadow mb-8">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Company Profit vs Distributions</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart
                data={chartData}
                margin={{ top: 20, right: 30, left: 30, bottom: 5 }}
              >
                <XAxis 
                  dataKey="year" 
                  label={{ value: 'Year', position: 'insideBottomRight', offset: -5, fontSize: 12 }}
                  tick={{ fontSize: 11 }}
                />
                <YAxis 
                  label={{ value: 'Amount ($)', angle: -90, position: 'insideLeft', fontSize: 12 }}
                  tickFormatter={(value) => value >= 1000000 ? `$${(value / 1000000).toFixed(1)}M` : `$${(value / 1000).toFixed(0)}K`}
                  tick={{ fontSize: 11 }}
                />
                <Tooltip 
                  formatter={(value: any, name: string) => {
                    if (name === "Company Profit") return [formatCurrency(Number(value)), name];
                    if (name === "Distribution to Investor") return [formatCurrency(Number(value)), name];
                    if (name === "Cumulative Distribution") return [formatCurrency(Number(value)), name];
                    return [value, name];
                  }}
                  labelFormatter={(label: any) => `Year ${label}`}
                  contentStyle={{ fontSize: '12px' }}
                />
                <Legend wrapperStyle={{ fontSize: '12px' }} />
                <Bar dataKey="profit" name="Company Profit" fill="#4F46E5" />
                <Bar dataKey="distribution" name="Distribution to Investor" fill="#10B981" />
                <Line 
                  type="monotone" 
                  dataKey="cumulativeDistribution" 
                  name="Cumulative Distribution" 
                  stroke="#F59E0B" 
                  strokeWidth={2} 
                  dot={{ r: 5 }} 
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      <div className="mt-8 text-sm text-gray-500">
        <p>
          This calculator provides estimates based on the inputs provided and simplified growth assumptions. 
          Actual results may vary based on company performance, market conditions, and other factors. 
          The Venture Bond is designed with a 6x profit-sharing cap (20% until 2x, 10% until 4x, 5% until 6x), 
          with potential additional upside through the equity component.
        </p>
      </div>
    </div>
  );
};

export default VentureBondCalculator;