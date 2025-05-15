import { NextResponse } from 'next/server';
import { getGoogleSheet } from '@/lib/googleSheets';
import { unstable_cache } from 'next/cache';

interface ProFormaData {
  assumptions: {
    avgCheckSize: string;
    targetPortfolio: string;
    failureRate: string;
    profitSharingStartYear: string;
    netIncomeMultiple: string;
    revenueMultiple: string;
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
    residualValue: number;
    residualValueEstimateRevenue: number;
    residualValueEstimateProfit: number;
    totalValue: number;
    grossTVPI: number;
    netTVPI: number;
    percentageCapitalReturned: number;
    grossProfitSharingReturnMultiple: number;
    netProfitSharingReturnMultiple: number;
  }>;
}

async function fetchProFormaData(): Promise<ProFormaData> {
  const sheetId = process.env.GOOGLE_SHEET_ID;
  if (!sheetId) {
    throw new Error('GOOGLE_SHEET_ID is not defined');
  }

  const { sheets } = await getGoogleSheet(sheetId);

  const [assumptionsResponse, yearlyDataResponse, columnLResponse] = await Promise.all([
    // Get all assumptions in one call
    sheets.spreadsheets.values.get({
      spreadsheetId: sheetId,
      range: "'Bottom up'!B2:B7"  // Assumptions from B2 to B7
    }),
    // Get all yearly data in one call
    sheets.spreadsheets.values.get({
      spreadsheetId: sheetId,
      range: "'Bottom up'!A10:U34"  // Updated range to include headers
    }),
    // Get column L specifically
    sheets.spreadsheets.values.get({
      spreadsheetId: sheetId,
      range: "'Bottom up'!L10:L34"  // Column L data
    })
  ]);

  const assumptionsValues = assumptionsResponse.data.values || [];
  const yearlyValues = yearlyDataResponse.data.values || [];
  const columnLValues = columnLResponse.data.values || [];

  // Log raw responses for debugging
  console.log('Column L raw response:', JSON.stringify(columnLResponse.data, null, 2));
  console.log('Column L values:', columnLValues);

  const data: ProFormaData = {
    assumptions: {
      avgCheckSize: assumptionsValues[1]?.[0] || '',
      targetPortfolio: assumptionsValues[1]?.[0] || '',
      failureRate: assumptionsValues[2]?.[0] || '',
      profitSharingStartYear: assumptionsValues[3]?.[0] || '',
      netIncomeMultiple: assumptionsValues[4]?.[0] || '',
      revenueMultiple: assumptionsValues[5]?.[0] || '',
    },
    yearlyData: yearlyValues.slice(1).map((row, index) => {
      // Helper function to parse currency values
      const parseCurrencyValue = (value: any) => value ? Number(value.toString().replace(/[^0-9.-]+/g, '')) : 0;

      // Helper function to parse percentage values
      const parsePercentageValue = (value: any) => {
        if (!value) return 0;
        // Remove % symbol and convert to string
        const cleanValue = value.toString().replace('%', '').trim();
        // Convert to number
        const numValue = Number(cleanValue);
        // If the value is already in decimal form (e.g., 0.45), return it
        // Otherwise convert from percentage to decimal (e.g., 45 -> 0.45)
        return numValue > 1 ? numValue / 100 : numValue;
      };

      // Remove any currency formatting and convert to number
      const cumulativeDistributions = parseCurrencyValue(row[11]);

      // Calculate average revenue per company
      const portfolioRevenue = parseCurrencyValue(row[6]);  // Column G
      const activePortcos = Number(row[2] || 1);  // Column C, default to 1 to avoid division by zero

      return {
        year: `Year ${index + 1}`,
        activePortcos: Number(row[2] || 0),         // Column C
        companiesProfitSharing: Number(row[3] || 0), // Column D
        portfolioRevenue: portfolioRevenue,       // Column G
        portfolioProfit: parseCurrencyValue(row[8]),        // Column I
        avgMargins: parsePercentageValue(row[7]),           // Column H - Percentage value
        avgRevenuePerCompany: activePortcos > 0 ? portfolioRevenue / activePortcos : 0,   // Calculate from portfolio revenue and active companies
        avgAnnualGrowthRate: parsePercentageValue(row[4]),  // Column E - Percentage value
        investmentsMade: Number(row[9] || 0),        // Column J
        annualProfitSharing: parseCurrencyValue(row[10]),   // Column K
        cumulativeProfitSharingDistributions: cumulativeDistributions, // Column L
        residualValue: Number(row[12] || 0),         // Column M
        residualValueEstimateRevenue: parseCurrencyValue(row[15]), // Column P
        residualValueEstimateProfit: parseCurrencyValue(row[16]),  // Column Q
        totalValue: parseCurrencyValue(row[18]),            // Column S
        grossTVPI: Number(row[19] || 0),             // Column T - Gross TVPI
        netTVPI: Number(row[20] || 0),               // Column U - Net TVPI
        percentageCapitalReturned: parseCurrencyValue(row[14]), // Column O
        grossProfitSharingReturnMultiple: Number(row[12] || 0), // Column M
        netProfitSharingReturnMultiple: Number(row[13] || 0),   // Column N
      };
    })
  };

  return data;
}

const getCachedData = unstable_cache(
  fetchProFormaData,
  ['pro-forma-data'],
  { revalidate: 300 } // Cache for 5 minutes
);

export async function GET() {
  try {
    const data = await getCachedData();
    return NextResponse.json(data);
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