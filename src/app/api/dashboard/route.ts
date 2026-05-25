import { NextResponse } from 'next/server';
import { getCachedData } from '@/lib/database';

const FALLBACK_DATA = {
  fundOverview: {
    committedCapital: '$86M',
    investableCapital: '$70,000,000',
    managementFee: '2.5%',
    fundLife: '15 years',
    deploymentPeriod: '5 years',
    carry: '20%',
  },
  portfolioAllocation: {
    numberOfInvestments: '35',
    averageCheckSize: '$2M',
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