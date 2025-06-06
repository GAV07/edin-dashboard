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

  // Fetch 10-year data from Base_API tab (Year 10 is at row 25, since data starts at row 16)
  const [year10DataResponse, assumptionsResponse, returnsResponse, irrResponse, lpDistributionsResponse] = await Promise.all([
    // Get Year 10 data from Base_API (row 25)
    sheets.spreadsheets.values.get({
      spreadsheetId: sheetId,
      range: "'Base_API'!A25:V25"  // Year 10 data across all columns
    }),
    // Get assumptions from Base_API
    sheets.spreadsheets.values.get({
      spreadsheetId: sheetId,
      range: "'Base_API'!B2:B7"  // Assumptions
    }),
    // Get annual returns data
    sheets.spreadsheets.values.get({
      spreadsheetId: sheetId,
      range: "'Base_API'!K16:K40"
    }),
    // Get specific IRR value from V25
    sheets.spreadsheets.values.get({
      spreadsheetId: sheetId,
      range: "'Base_API'!V25"  // Year 10 IRR
    }),
    // Get cumulative profit sharing distributions from L25
    sheets.spreadsheets.values.get({
      spreadsheetId: sheetId,
      range: "'Base_API'!L25"  // Year 10 Cumulative Profit Sharing Distributions
    })
  ]);

  const year10Data = year10DataResponse.data.values?.[0] || [];
  const assumptions = assumptionsResponse.data.values || [];
  const returnsValues = returnsResponse.data.values || [];
  const irrValue = irrResponse.data.values?.[0]?.[0] || 0;
  const lpDistributionsValue = lpDistributionsResponse.data.values?.[0]?.[0] || 0;

  // Debug logging for LP distributions
  console.log('Raw LP Distributions Value from L25:', lpDistributionsValue);
  console.log('LP Distributions Response:', JSON.stringify(lpDistributionsResponse.data, null, 2));

  // Helper function to parse currency values
  const parseCurrencyValue = (value: any) => {
    if (!value) return 0;
    // Convert to string and remove currency symbols, commas, spaces
    const cleanValue = value.toString().replace(/[$,\s]/g, '').replace(/[^0-9.-]+/g, '');
    const numValue = Number(cleanValue);
    console.log(`Parsing currency: "${value}" -> "${cleanValue}" -> ${numValue}`);
    return numValue || 0;
  };
  
  // Helper function to parse IRR percentage values
  const parseIRRValue = (value: any) => {
    if (!value) return 0;
    // Remove % symbol and convert to string
    const cleanValue = value.toString().replace('%', '').trim();
    // Convert to number
    const numValue = Number(cleanValue);
    // Return the value as is (assuming it's already in percentage form)
    return numValue;
  };
  
  // Helper function to format currency
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  // Helper function to format as millions (whole number only)
  const formatAsMillions = (value: number) => {
    return `$${Math.round(value / 1000000)}M`;
  };

  // Parse the LP distributions value with debugging
  const cumulativeProfitSharingDistributions = parseCurrencyValue(lpDistributionsValue);
  console.log('Parsed LP Distributions Value:', cumulativeProfitSharingDistributions);

  // Extract Year 10 metrics from the row data
  const year10Metrics = {
    activePortcos: Number(year10Data[2] || 0),  // Column C
    portfolioRevenue: parseCurrencyValue(year10Data[6]),  // Column G
    portfolioProfit: parseCurrencyValue(year10Data[8]),   // Column I
    annualProfitSharing: parseCurrencyValue(year10Data[10]), // Column K
    cumulativeProfitSharingDistributions: cumulativeProfitSharingDistributions, // From L25
    cumulativeResidualValue: parseCurrencyValue(year10Data[17]), // Column R
    totalValue: parseCurrencyValue(year10Data[18]), // Column S
    grossTVPI: Number(year10Data[19] || 0), // Column T
    netTVPI: Number(year10Data[20] || 0),   // Column U
    irr: parseIRRValue(irrValue),
  };

  // Calculate total distributions and LP distribution percentage
  const totalDistributions = year10Metrics.cumulativeProfitSharingDistributions + year10Metrics.cumulativeResidualValue;

  const data: DashboardData = {
    fundOverview: {
      committedCapital: '$86M',
      investableCapital: formatCurrency(parseCurrencyValue(assumptions[1]?.[0]) || 70000000),
      managementFee: assumptions[1]?.[0] || '2.5%',
      fundLife: '15 years',
      deploymentPeriod: '5 years',
      carry: '20%',
    },
    portfolioAllocation: {
      numberOfInvestments: assumptions[1]?.[2] || '35',
      averageCheckSize: '$2M',
      successRate: assumptions[2]?.[0] || '75%',
    },
    returnMetrics: {
      lpDistributions: formatAsMillions(cumulativeProfitSharingDistributions),
      gpCarry: formatCurrency(totalDistributions * 0.2), // 20% carry
      moic: `${year10Metrics.netTVPI.toFixed(2)}x`,
      grossTvpi: `${year10Metrics.grossTVPI.toFixed(2)}x`,
      dpi: `${((year10Metrics.cumulativeProfitSharingDistributions) / 85000000).toFixed(2)}x`,
      irr: `${year10Metrics.irr.toFixed(1)}%`,
    },
    distributionSourcesData: [
      {
        name: 'Profit Sharing',
        value: totalDistributions > 0 ? year10Metrics.cumulativeProfitSharingDistributions / totalDistributions : 0
      },
      {
        name: 'Exit Liquidity',
        value: totalDistributions > 0 ? year10Metrics.cumulativeResidualValue / totalDistributions : 0
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