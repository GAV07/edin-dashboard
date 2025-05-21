"use client";

import React, { useState, useEffect } from 'react';
import { 
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, 
  Legend, ResponsiveContainer, ComposedChart, Area
} from 'recharts';

interface InputValues {
  investmentAmount: number;
  valCap: number;
  yearsToTrigger: number;
  revenueThreshold: number;
  profitMargin: number;
  growthRate: number;
  initialRevenue: number;
  initialProfit: number;
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
  distributionToProfit: number;
  timeToRecoup: number | string;
  triggerYear: number | string;
  finalReturnMultiple: number;
  equityFinalValue: number;
  totalReturnValue: number;
  totalReturnMultiple: number;
}

interface CalculationResults {
  yearlyData: YearlyData[];
  summaryMetrics: SummaryMetrics;
}

const VentureBondCalculator: React.FC = () => {
  // Default values
  const defaultValues: InputValues = {
    investmentAmount: 2000000,
    valCap: 10000000,
    yearsToTrigger: 4,
    revenueThreshold: 2000000,
    profitMargin: 35,
    growthRate: 30,
    initialRevenue: 1000000,
    initialProfit: 200000,
    simulationYears: 10,
    equityPercentage: 20
  };

  // State
  const [inputs, setInputs] = useState<InputValues>(defaultValues);
  const [results, setResults] = useState<CalculationResults | null>(null);
  const [chartData, setChartData] = useState<YearlyData[]>([]);

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: parseFloat(value)
    });
  };

  // Reset to defaults
  const handleReset = () => {
    setInputs(defaultValues);
  };

  // Calculate results
  useEffect(() => {
    if (!inputs.investmentAmount) return;

    const calculateResults = (): CalculationResults => {
      const {
        investmentAmount,
        valCap,
        yearsToTrigger,
        revenueThreshold,
        profitMargin,
        growthRate,
        initialRevenue,
        initialProfit,
        simulationYears,
        equityPercentage
      } = inputs;

      // Initialize arrays to store yearly data
      const yearlyData: YearlyData[] = [];
      let totalDistributions = 0;
      let totalProfits = 0;
      let currentProfitSharePercentage = 0;
      let hasTriggerOccurred = false;
      let triggerYear = -1;
      let timeToRecoup = -1;
      let currentRevenue = initialRevenue;
      let currentProfit = initialProfit;
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
      const summaryMetrics: SummaryMetrics = {
        totalDistributions,
        totalProfits,
        distributionToProfit: totalDistributions / totalProfits,
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
  const formatCurrency = (value: number | undefined | null): string => {
    if (value === undefined || value === null) return '-';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  // Percentage formatter
  const formatPercent = (value: number | undefined | null): string => {
    if (value === undefined || value === null) return '-';
    return `${value}%`;
  };

  // Format any number with commas
  const formatNumber = (value: number | undefined | null): string => {
    if (value === undefined || value === null) return '-';
    return new Intl.NumberFormat('en-US').format(value);
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-50 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Edin Capital Venture Bond Calculator</h1>
      
      <div className="mb-8">
        <p className="mb-4 text-gray-600">
          The Venture Bond combines convertible equity with profit sharing, creating a 
          powerful investment instrument that provides better alignment between founders and investors.
        </p>
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-4">
          <p className="text-blue-700">
            <strong>How it works:</strong> After the investment, once trigger conditions are met (time, revenue, 
            and profit margin thresholds), the company begins sharing a percentage of profits. The sharing rate 
            decreases as investment multiples are achieved: 20% until 2x return, 10% until 4x return, 
            and 5% until reaching the 6x cap. Meanwhile, the equity component maintains upside potential.
          </p>
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
                  type="number"
                  name="investmentAmount"
                  value={inputs.investmentAmount}
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
                  type="number"
                  name="valCap"
                  value={inputs.valCap}
                  onChange={handleInputChange}
                  className="pl-8 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Equity % (at Valuation Cap)
              </label>
              <div className="relative">
                <input
                  type="number"
                  name="equityPercentage"
                  value={inputs.equityPercentage}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <span className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500">%</span>
              </div>
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
                  type="number"
                  name="revenueThreshold"
                  value={inputs.revenueThreshold}
                  onChange={handleInputChange}
                  className="pl-8 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Profit Margin Threshold
              </label>
              <div className="relative">
                <input
                  type="number"
                  name="profitMargin"
                  value={inputs.profitMargin}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <span className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500">%</span>
              </div>
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
                  type="number"
                  name="initialRevenue"
                  value={inputs.initialRevenue}
                  onChange={handleInputChange}
                  className="pl-8 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Initial Annual Profit
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">$</span>
                <input
                  type="number"
                  name="initialProfit"
                  value={inputs.initialProfit}
                  onChange={handleInputChange}
                  className="pl-8 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Annual Revenue Growth Rate
              </label>
              <div className="relative">
                <input
                  type="number"
                  name="growthRate"
                  value={inputs.growthRate}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <span className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500">%</span>
              </div>
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
                max="15"
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
                  <div className="text-sm text-gray-600">Total Return:</div>
                  <div className="text-sm font-semibold text-gray-800">
                    {formatCurrency(results.summaryMetrics.totalReturnValue)}
                  </div>
                  
                  <div className="text-sm text-gray-600">Return Multiple:</div>
                  <div className="text-sm font-semibold text-gray-800">
                    {results.summaryMetrics.totalReturnMultiple.toFixed(2)}x
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
                      {formatPercent((1 - results.summaryMetrics.distributionToProfit) * 100)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Main Chart Section */}
      {results && (
        <div className="bg-white p-6 rounded-lg shadow mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Company Profit vs Distributions</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart
                data={chartData}
                margin={{ top: 20, right: 30, left: 30, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" label={{ value: 'Year', position: 'insideBottomRight', offset: -5 }} />
                <YAxis 
                  label={{ value: 'Amount ($)', angle: -90, position: 'insideLeft' }}
                  tickFormatter={(value) => value >= 1000000 ? `$${(value / 1000000).toFixed(1)}M` : `$${(value / 1000).toFixed(0)}K`}
                />
                <Tooltip 
                  formatter={(value, name) => {
                    if (name === "Company Profit") return [formatCurrency(value as number), name];
                    if (name === "Distribution to Investor") return [formatCurrency(value as number), name];
                    if (name === "Cumulative Distribution") return [formatCurrency(value as number), name];
                    return [value, name];
                  }}
                  labelFormatter={(label) => `Year ${label}`}
                />
                <Legend />
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

      {/* Year-by-Year Projections Table */}
      {results && (
        <div className="bg-white p-6 rounded-lg shadow">
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