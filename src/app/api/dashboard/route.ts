import { NextResponse } from 'next/server';
import { getCachedData } from '@/lib/database';
import { FUND } from '@/constants/fund';

// Structural/fee values come from FUND constants; return metrics are zeroed
// until the Google Sheet cache is populated via admin sync.
// NOTE: The live Google Sheet also needs updating (Erick/Andrew data task)
// to reflect 2.0% fee, $85M target, perpetual term, ~30 portfolio count.
const FALLBACK_DATA = {
  fundOverview: {
    committedCapital: FUND.targetSize,
    investableCapital: '$70,000,000',
    managementFee: FUND.managementFee,
    fundLife: FUND.term,
    deploymentPeriod: FUND.deploymentPeriod,
    carry: FUND.carry,
  },
  portfolioAllocation: {
    numberOfInvestments: FUND.targetPortfolio,
    averageCheckSize: FUND.avgCheck,
    successRate: '75%',
  },
  returnMetrics: {
    lpDistributions: '$0M',
    gpCarry: '$0',
    moic: '0.00x',
    grossTvpi: '0.00x',
    dpi: '0.00x',
    irr: '0.0%',
  },
  distributionSourcesData: [
    { name: 'Profit Sharing', value: 0 },
    { name: 'Exit Liquidity', value: 0 },
  ],
  annualReturnsData: [],
};

// No TTL — data only updates when admin manually refreshes via Sync Data
const MAX_AGE = 60 * 60 * 24 * 365; // effectively infinite

export async function GET() {
  try {
    const cacheKey = 'dashboard-data';

    const cached = await getCachedData(cacheKey, MAX_AGE);
    if (cached) {
      return NextResponse.json(cached);
    }

    // No cached data — return fallback until admin syncs
    return NextResponse.json(FALLBACK_DATA);
  } catch (error: any) {
    console.error('Error in dashboard API route:', error);
    return NextResponse.json(FALLBACK_DATA);
  }
} 