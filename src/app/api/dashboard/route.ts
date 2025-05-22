import { NextResponse } from 'next/server';
import { getGoogleSheet } from '@/lib/googleSheets';
import { unstable_cache } from 'next/cache';

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

async function fetchDashboardData(): Promise<DashboardData> {
  const sheetId = process.env.GOOGLE_SHEET_ID;
  if (!sheetId) {
    throw new Error('GOOGLE_SHEET_ID is not defined');
  }

  const { sheets } = await getGoogleSheet(sheetId);

  // Fetch all data in a single batch request
  const [overviewResponse, returnsResponse] = await Promise.all([
    // Get all overview metrics in one call
    sheets.spreadsheets.values.get({
      spreadsheetId: sheetId,
      range: "'Top down'!B4:B54"  // All metrics from B4 to B54
    }),
    // Get annual returns data in one call
    sheets.spreadsheets.values.get({
      spreadsheetId: sheetId,
      range: "'Bottom up'!K11:K36"
    })
  ]);

  const overviewValues = overviewResponse.data.values || [];
  const returnsValues = returnsResponse.data.values || [];

  // Calculate total distributions for percentage calculation
  const totalDistributions = Number(overviewValues[44]?.[0]?.replace(/[^0-9.-]+/g, '') || 0);
  const profitSharing = Number(overviewValues[27]?.[0]?.replace(/[^0-9.-]+/g, '') || 0);
  const exitLiquidity = Number(overviewValues[37]?.[0]?.replace(/[^0-9.-]+/g, '') || 0);

  const data: DashboardData = {
    fundOverview: {
      committedCapital: overviewValues[0]?.[0] || '',
      investableCapital: overviewValues[5]?.[0] || '',
      managementFee: overviewValues[1]?.[0] || '',
      fundLife: overviewValues[6]?.[0] || '',
      deploymentPeriod: overviewValues[7]?.[0] || '',
      carry: overviewValues[8]?.[0] || '',
    },
    portfolioAllocation: {
      numberOfInvestments: overviewValues[11]?.[0] || '',
      averageCheckSize: overviewValues[12]?.[0] || '',
      successRate: overviewValues[17]?.[0] || '',
    },
    returnMetrics: {
      lpDistributions: overviewValues[45]?.[0] || '',
      gpCarry: overviewValues[46]?.[0] || '',
      moic: overviewValues[48]?.[0] || '',
      grossTvpi: overviewValues[49]?.[0] || '',
      dpi: overviewValues[50]?.[0] || '',
      irr: overviewValues[51]?.[0] || '',
    },
    distributionSourcesData: [
      {
        name: 'Profit Sharing',
        value: totalDistributions > 0 ? profitSharing / totalDistributions : 0
      },
      {
        name: 'Exit Liquidity',
        value: totalDistributions > 0 ? exitLiquidity / totalDistributions : 0
      }
    ],
    annualReturnsData: returnsValues.map((row, index) => ({
      year: `Year ${index + 1}`,
      returns: Number(row[0]?.replace(/[^0-9.-]+/g, '') || 0)
    }))
  };

  return data;
}

const getCachedData = unstable_cache(
  fetchDashboardData,
  ['dashboard-data'],
  { revalidate: 300 } // Cache for 5 minutes
);

export async function GET() {
  try {
    const data = await getCachedData();
    return NextResponse.json(data);
  } catch (error: any) {
    console.error('Error in dashboard API route:', error);
    return NextResponse.json(
      {
        error: error.message || 'Failed to fetch dashboard data',
        details: error.stack,
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
} 