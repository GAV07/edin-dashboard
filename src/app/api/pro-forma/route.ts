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

  const [assumptionsResponse, yearlyDataResponse] = await Promise.all([
    // Get all assumptions in one call
    sheets.spreadsheets.values.get({
      spreadsheetId: sheetId,
      range: `'${sheetName}'!B2:B7`  // Assumptions from B2 to B7
    }),
    // Get all yearly data in one call - updated to start from line 17 (data starts after headers on line 16)
    sheets.spreadsheets.values.get({
      spreadsheetId: sheetId,
      range: `'${sheetName}'!A15:Z41`  // Updated range to start from line 17 and include all columns through Z
    })
  ]);

  const assumptionsValues = assumptionsResponse.data.values || [];
  const yearlyValues = yearlyDataResponse.data.values || [];

  // Log raw responses for debugging
  console.log('Yearly data sample:', yearlyValues.slice(0, 3));
  console.log('IRR column (Z) values:', yearlyValues.map(row => row[25])); // Column Z is index 25

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

      // New column mappings based on the updated order:
      // A: Year, B: Investments made, C: Active portcos, D: Avg revenue per company, 
      // E: Avg annual growth rate, F-I: Investment Cohorts, J: Portfolio total revenue,
      // K: Portfolio avg margins, L: Portfolio net income, M: Avg profit sharing %,
      // N: Annual profit sharing distributions, O: Cumulative profit sharing distributions,
      // P: Gross profit sharing return multiple, Q: Net profit sharing return multiple,
      // R: % of capital returned, S: Portfolio residual value (revenue multiple),
      // T: Portfolio residual value (net income multiple), U: Total residual value,
      // V: Total value, W: Gross TVPI, X: Net TVPI, Y: RVPI, Z: IRR

      return {
        year: `Year ${index + 1}`,
        activePortcos: Number(row[2] || 0),                    // Column C - Active portcos
        companiesProfitSharing: Number(row[5] || 0),           // Column F - Investment Cohort 1 (using as proxy for companies profit sharing)
        portfolioRevenue: parseCurrencyValue(row[9]),          // Column J - Portfolio total revenue
        portfolioProfit: parseCurrencyValue(row[11]),          // Column L - Portfolio net income
        avgMargins: parsePercentageValue(row[10]),             // Column K - Portfolio avg margins
        avgRevenuePerCompany: parseCurrencyValue(row[3]),      // Column D - Avg revenue per company
        avgAnnualGrowthRate: parsePercentageValue(row[4]),     // Column E - Avg annual growth rate
        investmentsMade: Number(row[1] || 0),                  // Column B - Investments made
        annualProfitSharing: parseCurrencyValue(row[13]),      // Column N - Annual profit sharing distributions
        cumulativeProfitSharingDistributions: parseCurrencyValue(row[14]), // Column O - Cumulative profit sharing distributions
        cumulativeResidualValue: parseCurrencyValue(row[20]),  // Column U - Total residual value
        residualValueEstimateRevenue: parseCurrencyValue(row[18]), // Column S - Portfolio residual value (revenue multiple)
        residualValueEstimateProfit: parseCurrencyValue(row[19]),  // Column T - Portfolio residual value (net income multiple)
        totalValue: parseCurrencyValue(row[21]),               // Column V - Total value
        grossTVPI: Number(row[22] || 0),                       // Column W - Gross TVPI
        netTVPI: Number(row[23] || 0),                         // Column X - Net TVPI
        percentageCapitalReturned: parseCurrencyValue(row[17]), // Column R - % of capital returned
        grossProfitSharingReturnMultiple: Number(row[15] || 0), // Column P - Gross profit sharing return multiple
        netProfitSharingReturnMultiple: Number(row[16] || 0),   // Column Q - Net profit sharing return multiple
        irr: parseIRRValue(row[25]), // Column Z - IRR
      };
    })
  };

  // Log the processed data
  console.log('Processed IRR values:', data.yearlyData.map(d => ({ year: d.year, irr: d.irr })));
  console.log('Sample IRR values:', data.yearlyData.slice(0, 5).map(d => ({ year: d.year, rawIRR: d.irr, type: typeof d.irr })));

  return data;
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const scenario = searchParams.get('scenario') || 'base';
    
    const getCachedData = unstable_cache(
      async () => fetchProFormaData(scenario),
      ['pro-forma-data', scenario],
      { revalidate: 300 } // Cache for 5 minutes
    );
    
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