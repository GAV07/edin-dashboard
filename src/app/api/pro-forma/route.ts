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

async function fetchProFormaData(scenario: string = 'base'): Promise<ProFormaData> {
  const sheetId = process.env.GOOGLE_SHEET_ID;
  if (!sheetId) {
    throw new Error('GOOGLE_SHEET_ID is not defined');
  }

  const { sheets } = await getGoogleSheet(sheetId);

  // Determine the sheet name based on scenario
  const sheetName = scenario === 'base' ? 'Base_API' : 
                   scenario === 'conservative' ? 'Conservative_API' : 
                   'Optimistic_API';

  const [assumptionsResponse, yearlyDataResponse, columnLResponse] = await Promise.all([
    // Get all assumptions in one call
    sheets.spreadsheets.values.get({
      spreadsheetId: sheetId,
      range: `'${sheetName}'!B2:B7`  // Assumptions from B2 to B7
    }),
    // Get all yearly data in one call
    sheets.spreadsheets.values.get({
      spreadsheetId: sheetId,
      range: `'${sheetName}'!A16:V40`  // Updated range to include column V for IRR
    }),
    // Get column L specifically
    sheets.spreadsheets.values.get({
      spreadsheetId: sheetId,
      range: `'${sheetName}'!L16:L40`  // Column L data
    })
  ]);

  const assumptionsValues = assumptionsResponse.data.values || [];
  const yearlyValues = yearlyDataResponse.data.values || [];
  const columnLValues = columnLResponse.data.values || [];

  // Log raw responses for debugging
  console.log('Column L raw response:', JSON.stringify(columnLResponse.data, null, 2));
  console.log('Column L values:', columnLValues);
  console.log('Yearly data sample:', yearlyValues.slice(0, 3));
  console.log('IRR column (V) values:', yearlyValues.map(row => row[21]));

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
        return Math.abs(numValue) > 1 ? numValue / 100 : numValue;
      };

      // Helper function specifically for IRR values
      const parseIRRValue = (value: any) => {
        if (!value) return 0;
        console.log('Parsing IRR value:', value);
        // Remove % symbol and convert to string
        const cleanValue = value.toString().replace('%', '').trim();
        // Convert to number
        const numValue = Number(cleanValue);
        console.log('Cleaned IRR value:', cleanValue, 'Parsed number:', numValue);
        // Return the value as percentage (e.g., -50 for -50%, 25 for 25%)
        return numValue;
      };

      // Remove any currency formatting and convert to number
      const cumulativeDistributions = parseCurrencyValue(row[11]);

      // Calculate average revenue per company
      const portfolioRevenue = parseCurrencyValue(row[6]);  // Column G
      const activePortcos = Number(row[2] || 1);  // Column C, default to 1 to avoid division by zero

      return {
        year: `Year ${index + 1}`,
        activePortcos: Number(row[2] || 0),         // Column C
        companiesProfitSharing: Number(row[5] || 0), // Column D
        portfolioRevenue: portfolioRevenue,       // Column G
        portfolioProfit: parseCurrencyValue(row[8]),        // Column I
        avgMargins: parsePercentageValue(row[7]),           // Column H - Percentage value
        avgRevenuePerCompany: parseCurrencyValue(row[3]), //Column D
        avgAnnualGrowthRate: parsePercentageValue(row[4]),  // Column E - Percentage value
        investmentsMade: Number(row[9] || 0),        // Column J
        annualProfitSharing: parseCurrencyValue(row[10]),   // Column K
        cumulativeProfitSharingDistributions: cumulativeDistributions, // Column L
        cumulativeResidualValue: parseCurrencyValue(row[17]),         // Column R
        residualValueEstimateRevenue: parseCurrencyValue(row[15]), // Column P
        residualValueEstimateProfit: parseCurrencyValue(row[16]),  // Column Q
        totalValue: parseCurrencyValue(row[18]),            // Column S
        grossTVPI: Number(row[19] || 0),             // Column T - Gross TVPI
        netTVPI: Number(row[20] || 0),               // Column U - Net TVPI
        percentageCapitalReturned: parseCurrencyValue(row[14]), // Column O
        grossProfitSharingReturnMultiple: Number(row[12] || 0), // Column M
        netProfitSharingReturnMultiple: Number(row[13] || 0),   // Column N
        irr: parseIRRValue(row[21]), // Column V - IRR
      };
    })
  };

  // Log the processed data
  console.log('Processed IRR values:', data.yearlyData.map(d => ({ year: d.year, irr: d.irr })));
  console.log('Sample IRR values:', data.yearlyData.slice(0, 5).map(d => ({ year: d.year, rawIRR: d.irr, type: typeof d.irr })));

  return data;
}

const getCachedData = unstable_cache(
  async (scenario: string) => fetchProFormaData(scenario),
  ['pro-forma-data'],
  { revalidate: 300 } // Cache for 5 minutes
);

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const scenario = searchParams.get('scenario') || 'base';
    
    const data = await getCachedData(scenario);
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