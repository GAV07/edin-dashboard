import { getSheetRange } from './googleSheets';

export interface ProFormaAssumptions {
  avgCheckSize: number;
  targetPortfolio: number;
  failureRate: number;
  profitSharingStartYear: number;
  netIncomeMultiple: number;
  revenueMultiple: number;
}

export interface ProFormaYearlyDataEntry {
  year: number;
  "Annual Profit Sharing": number;
  "Cumulative Distributions": number;
  "Gross TVPI": number;
  "Net TVPI": number;
  "Annual Returns": number;
}

export interface BottomUpMetrics {
  avgCheckSize: string;
  targetPortfolio: string;
  failureRate: string;
  profitSharingStartYear: string;
  netIncomeMultiple: string;
  revenueMultiple: string;
  yearlyData: Array<{
    year: string;
    annualProfitSharing: number;
    cumulativeDistributions: number;
    grossTVPI: number;
    netTVPI: number;
  }>;
}

// Helper function to safely get string value
async function getStringValue(sheetId: string, range: string): Promise<string> {
  const value = await getSheetRange(sheetId, range);
  return Array.isArray(value) ? value[0]?.value || '' : String(value);
}

// Helper function to safely get number value
async function getNumberValue(sheetId: string, range: string): Promise<number> {
  const value = await getSheetRange(sheetId, range);
  const numValue = Array.isArray(value) ? value[0]?.value : value;
  return Number(numValue) || 0;
}

export async function fetchProFormaDataFromBottomUpSheet(): Promise<{ assumptions: ProFormaAssumptions; yearlyData: ProFormaYearlyDataEntry[] }> {
  const sheetId = process.env.GOOGLE_SHEET_ID;
  if (!sheetId) {
    throw new Error('GOOGLE_SHEET_ID is not defined');
  }

  // Fetch assumptions
  const assumptions: ProFormaAssumptions = {
    avgCheckSize: await getNumberValue(sheetId, "'Base_API'!B2"),
    targetPortfolio: await getNumberValue(sheetId, "'Base_API'!B3"),
    failureRate: await getNumberValue(sheetId, "'Base_API'!B4"),
    profitSharingStartYear: await getNumberValue(sheetId, "'Base_API'!B5"),
    netIncomeMultiple: await getNumberValue(sheetId, "'Base_API'!B6"),
    revenueMultiple: await getNumberValue(sheetId, "'Base_API'!B7")
  };

  // Fetch yearly data (up to 25 years)
  const yearlyData: ProFormaYearlyDataEntry[] = [];
  for (let i = 0; i < 25; i++) {
    const rowIndex = i + 11; // Data starts from row 11
    const entry: ProFormaYearlyDataEntry = {
      year: i + 1,
      "Annual Profit Sharing": await getNumberValue(sheetId, `'Base_API'!K${rowIndex}`),
      "Cumulative Distributions": await getNumberValue(sheetId, `'Base_API'!L${rowIndex}`),
      "Gross TVPI": await getNumberValue(sheetId, `'Base_API'!S${rowIndex}`),
      "Net TVPI": await getNumberValue(sheetId, `'Base_API'!T${rowIndex}`),
      "Annual Returns": await getNumberValue(sheetId, `'Base_API'!U${rowIndex}`)
    };
    yearlyData.push(entry);
  }

  return { assumptions, yearlyData };
}

export async function fetchBottomUpMetrics(): Promise<BottomUpMetrics> {
  const sheetId = process.env.GOOGLE_SHEET_ID;
  if (!sheetId) {
    throw new Error('GOOGLE_SHEET_ID is not defined');
  }

  // Fetch metrics from the Base_API tab
  const metrics: BottomUpMetrics = {
    avgCheckSize: await getStringValue(sheetId, "'Base_API'!B2"),
    targetPortfolio: await getStringValue(sheetId, "'Base_API'!B3"),
    failureRate: await getStringValue(sheetId, "'Base_API'!B4"),
    profitSharingStartYear: await getStringValue(sheetId, "'Base_API'!B5"),
    netIncomeMultiple: await getStringValue(sheetId, "'Base_API'!B6"),
    revenueMultiple: await getStringValue(sheetId, "'Base_API'!B7"),
    yearlyData: []
  };

  // Fetch yearly data (up to 25 years)
  for (let i = 0; i < 25; i++) {
    const rowIndex = i + 11; // Data starts from row 11
    const yearData = {
      year: `Year ${i + 1}`,
      annualProfitSharing: await getNumberValue(sheetId, `'Base_API'!K${rowIndex}`),
      cumulativeDistributions: await getNumberValue(sheetId, `'Base_API'!L${rowIndex}`),
      grossTVPI: await getNumberValue(sheetId, `'Base_API'!S${rowIndex}`),
      netTVPI: await getNumberValue(sheetId, `'Base_API'!T${rowIndex}`)
    };
    metrics.yearlyData.push(yearData);
  }

  return metrics;
} 