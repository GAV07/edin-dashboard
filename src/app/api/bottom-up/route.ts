import { NextResponse } from 'next/server';
import { getGoogleSheet } from '@/lib/googleSheets';
import { unstable_cache } from 'next/cache';

interface YearlyData {
  year: string;
  annualProfitSharing: number;
  cumulativeDistributions: number;
  grossTVPI: number;
  netTVPI: number;
}

interface ProFormaMetrics {
  avgCheckSize: string;
  targetPortfolio: string;
  failureRate: string;
  profitSharingStartYear: string;
  netIncomeMultiple: string;
  revenueMultiple: string;
  yearlyData: YearlyData[];
}

async function fetchSheetData(): Promise<ProFormaMetrics> {
  const sheetId = process.env.GOOGLE_SHEET_ID;
  if (!sheetId) {
    throw new Error('GOOGLE_SHEET_ID is not defined');
  }

  console.log('Fetching pro-forma data from sheet:', sheetId);

  const { sheets } = await getGoogleSheet(sheetId);

  // Fetch all data in just two API calls
  const [metricsResponse, yearlyDataResponse] = await Promise.all([
    // Get all basic metrics in one call (B2:B7)
    sheets.spreadsheets.values.get({
      spreadsheetId: sheetId,
      range: "'Bottom up'!B2:B7"
    }),
    // Get all yearly data in one call (K11:T35)
    sheets.spreadsheets.values.get({
      spreadsheetId: sheetId,
      range: "'Bottom up'!K11:T35"
    })
  ]);

  const metricsValues = metricsResponse.data.values || [];
  const yearlyValues = yearlyDataResponse.data.values || [];

  // Process basic metrics
  const metrics: ProFormaMetrics = {
    avgCheckSize: metricsValues[0]?.[0] || '',
    targetPortfolio: metricsValues[1]?.[0] || '',
    failureRate: metricsValues[2]?.[0] || '',
    profitSharingStartYear: metricsValues[3]?.[0] || '',
    netIncomeMultiple: metricsValues[4]?.[0] || '',
    revenueMultiple: metricsValues[5]?.[0] || '',
    yearlyData: []
  };

  // Process yearly data
  yearlyValues.forEach((row, index) => {
    if (row && row.length >= 4) { // Ensure we have all required columns
      const yearData: YearlyData = {
        year: `Year ${index + 1}`,
        annualProfitSharing: Number(row[0] || 0),      // Column K
        cumulativeDistributions: Number(row[1] || 0),  // Column L
        grossTVPI: Number(row[8] || 0),                // Column S
        netTVPI: Number(row[9] || 0)                   // Column T
      };
      metrics.yearlyData.push(yearData);
    }
  });

  return metrics;
}

const getCachedData = unstable_cache(
  fetchSheetData,
  ['pro-forma-data'],
  { revalidate: 300 } // Cache for 5 minutes
);

export async function GET() {
  try {
    const metrics = await getCachedData();
    console.log('Pro-forma data fetched successfully');
    return NextResponse.json(metrics);
  } catch (error: any) {
    console.error('Error in pro-forma API route:', error);
    return NextResponse.json(
      {
        error: error.message || 'Failed to fetch pro-forma data',
        details: error.stack,
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
} 