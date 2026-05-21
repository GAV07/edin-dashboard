import { NextResponse } from 'next/server';
import { getCachedData } from '@/lib/database';

interface DashboardData {
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
    irr: string;
  };
  distributionSourcesData: Array<{ name: string; value: number }>;
  annualReturnsData: Array<{ year: string; returns: number }>;
}

const FALLBACK_DATA: DashboardData = {
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

// No TTL — data only updates when admin manually refreshes
const MAX_AGE = 60 * 60 * 24 * 365; // effectively infinite

export async function GET() {
  try {
    const cacheKey = 'dashboard-data';

    const cached = await getCachedData<DashboardData>(cacheKey, MAX_AGE);
    console.log('Dashboard cache lookup result:', cached ? 'found' : 'miss', cached ? `keys: ${Object.keys(cached).join(',')}` : '');
    if (cached) {
      // Validate the cached data has required fields
      if (cached.fundOverview && cached.returnMetrics && cached.portfolioAllocation) {
        return NextResponse.json(cached);
      }
      console.warn('Cached dashboard data is malformed, returning fallback. Type:', typeof cached);
    }

    // No data in DB yet — return fallback
    console.warn('No dashboard data in database. Use admin panel to sync from Google Sheets.');
    return NextResponse.json(FALLBACK_DATA);
  } catch (error: any) {
    console.error('Error in dashboard API route:', error);
    return NextResponse.json(FALLBACK_DATA);
  }
} 