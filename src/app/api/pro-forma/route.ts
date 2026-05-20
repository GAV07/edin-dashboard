import { NextResponse } from 'next/server';
import { getCachedData } from '@/lib/database';

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

// No TTL — data only updates when admin manually refreshes
const MAX_AGE = 60 * 60 * 24 * 365; // effectively infinite

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const scenario = searchParams.get('scenario') || 'base';
    const cacheKey = `pro-forma-${scenario}`;

    const cached = await getCachedData<ProFormaData>(cacheKey, MAX_AGE);
    if (cached) {
      return NextResponse.json(cached);
    }

    // No data in DB yet — return error so admin knows to sync
    console.warn(`No pro-forma data for scenario "${scenario}" in database. Use admin panel to sync from Google Sheets.`);
    return NextResponse.json(
      {
        error: `No data available for ${scenario} scenario. An admin needs to sync data from Google Sheets.`,
        timestamp: new Date().toISOString()
      },
      { status: 404 }
    );
  } catch (error: any) {
    console.error('Error in pro-forma API route:', error);
    return NextResponse.json(
      {
        error: error.message || 'Failed to fetch pro-forma data',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
} 