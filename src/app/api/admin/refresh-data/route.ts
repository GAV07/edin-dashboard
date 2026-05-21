import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { getGoogleSheet } from '@/lib/googleSheets';
import { setCachedData, getCachedData } from '@/lib/database';

// --- Dashboard data fetching (moved from /api/dashboard) ---

async function fetchDashboardData() {
  const sheetId = process.env.GOOGLE_SHEET_ID;
  if (!sheetId) throw new Error('GOOGLE_SHEET_ID is not defined');

  const { sheets } = await getGoogleSheet(sheetId);

  const [year10DataResponse, assumptionsResponse, annualReturnsResponse, cumulativeReturnsResponse, irrResponse, dpiResponse, lpDistributionsResponse] = await Promise.all([
    sheets.spreadsheets.values.get({ spreadsheetId: sheetId, range: "'Base_API'!A25:Z25" }),
    sheets.spreadsheets.values.get({ spreadsheetId: sheetId, range: "'Base_API'!B2:B7" }),
    sheets.spreadsheets.values.get({ spreadsheetId: sheetId, range: "'Base_API'!N16:N40" }),
    sheets.spreadsheets.values.get({ spreadsheetId: sheetId, range: "'Base_API'!O16:O40" }),
    sheets.spreadsheets.values.get({ spreadsheetId: sheetId, range: "'Base_API'!AA25" }),
    sheets.spreadsheets.values.get({ spreadsheetId: sheetId, range: "'Base_API'!Z25" }),
    sheets.spreadsheets.values.get({ spreadsheetId: sheetId, range: "'Base_API'!O25" }),
  ]);

  const year10Data = year10DataResponse.data.values?.[0] || [];
  const assumptions = assumptionsResponse.data.values || [];
  const annualReturnsValues = annualReturnsResponse.data.values || [];
  const cumulativeReturnsValues = cumulativeReturnsResponse.data.values || [];
  const irrValue = irrResponse.data.values?.[0]?.[0] || 0;
  const dpiValue = dpiResponse.data.values?.[0]?.[0] || 0;
  const lpDistributionsValue = lpDistributionsResponse.data.values?.[0]?.[0] || 0;

  const parseCurrencyValue = (value: any) => {
    if (!value) return 0;
    const cleanValue = value.toString().replace(/[$,\s]/g, '').replace(/[^0-9.-]+/g, '');
    return Number(cleanValue) || 0;
  };

  const parseIRRValue = (value: any) => {
    if (!value) return 0;
    return Number(value.toString().replace('%', '').trim()) || 0;
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency', currency: 'USD',
      minimumFractionDigits: 0, maximumFractionDigits: 0
    }).format(value);
  };

  const formatAsMillions = (value: number) => `$${Math.round(value / 1000000)}M`;

  const cumulativeProfitSharingDistributions = parseCurrencyValue(lpDistributionsValue);

  const year10Metrics = {
    activePortcos: Number(year10Data[2] || 0),
    portfolioRevenue: parseCurrencyValue(year10Data[3]),
    portfolioProfit: parseCurrencyValue(year10Data[10]),
    annualProfitSharing: parseCurrencyValue(year10Data[12]),
    cumulativeProfitSharingDistributions,
    cumulativeResidualValue: parseCurrencyValue(year10Data[19]),
    totalValue: parseCurrencyValue(year10Data[20]),
    grossTVPI: Number(year10Data[23] || 0),
    netTVPI: Number(year10Data[22] || 0),
    dpi: Number(dpiValue || 0),
    irr: parseIRRValue(irrValue),
  };

  const totalDistributions = year10Metrics.cumulativeProfitSharingDistributions + year10Metrics.cumulativeResidualValue;

  return {
    fundOverview: {
      committedCapital: '$86M',
      investableCapital: formatCurrency(parseCurrencyValue(assumptions[1]?.[0]) || 70000000),
      managementFee: assumptions[1]?.[0] || '2.5%',
      fundLife: '15 years',
      deploymentPeriod: '5 years',
      carry: '20%',
    },
    portfolioAllocation: {
      numberOfInvestments: assumptions[3]?.[0] || '35',
      averageCheckSize: '$2M',
      successRate: assumptions[2]?.[0] || '75%',
    },
    returnMetrics: {
      lpDistributions: formatAsMillions(cumulativeProfitSharingDistributions),
      gpCarry: formatCurrency(totalDistributions * 0.2),
      moic: `${year10Metrics.netTVPI.toFixed(2)}x`,
      grossTvpi: `${year10Metrics.grossTVPI.toFixed(2)}x`,
      dpi: year10Metrics.dpi > 0 ? `${year10Metrics.dpi.toFixed(2)}x` : '2.15x',
      irr: `${year10Metrics.irr.toFixed(1)}%`,
    },
    distributionSourcesData: [
      { name: 'Profit Sharing', value: totalDistributions > 0 ? year10Metrics.cumulativeProfitSharingDistributions / totalDistributions : 0 },
      { name: 'Exit Liquidity', value: totalDistributions > 0 ? year10Metrics.cumulativeResidualValue / totalDistributions : 0 },
    ],
    annualReturnsData: annualReturnsValues.map((row, index) => ({
      year: `Year ${index + 1}`,
      returns: Number(row[0]?.replace(/[^0-9.-]+/g, '') || 0),
      cumulative: Number(cumulativeReturnsValues[index]?.[0]?.replace(/[^0-9.-]+/g, '') || 0),
    })),
  };
}

// --- Pro-forma data fetching (moved from /api/pro-forma) ---

async function getAvailableSheetNames(sheets: any, sheetId: string): Promise<string[]> {
  const spreadsheet = await sheets.spreadsheets.get({
    spreadsheetId: sheetId,
    fields: 'sheets.properties.title',
  });
  return spreadsheet.data.sheets?.map((s: any) => s.properties.title) || [];
}

async function fetchProFormaData(scenario: string) {
  const sheetId = process.env.GOOGLE_SHEET_ID;
  if (!sheetId) throw new Error('GOOGLE_SHEET_ID is not defined');

  const { sheets } = await getGoogleSheet(sheetId);

  const sheetName = scenario === 'base' ? 'Base_API' :
    scenario === 'conservative' ? 'Conservative_API' : 'Optimistic_API';

  // Verify the sheet tab exists before fetching
  const availableSheets = await getAvailableSheetNames(sheets, sheetId);
  if (!availableSheets.includes(sheetName)) {
    throw new Error(`Sheet "${sheetName}" not found. Available sheets: ${availableSheets.join(', ')}`);
  }

  const [assumptionsResponse, yearlyDataResponse] = await Promise.all([
    sheets.spreadsheets.values.get({ spreadsheetId: sheetId, range: `'${sheetName}'!B2:B7` }),
    sheets.spreadsheets.values.get({ spreadsheetId: sheetId, range: `'${sheetName}'!A15:Z41` }),
  ]);

  // B10 (starting average margin) may not exist in all scenario sheets
  let startingMarginValues: any[][] = [];
  try {
    const startingMarginResponse = await sheets.spreadsheets.values.get({
      spreadsheetId: sheetId, range: `'${sheetName}'!B10`
    });
    startingMarginValues = startingMarginResponse.data.values || [];
  } catch {
    // Cell doesn't exist in this sheet — use empty
  }

  const assumptionsValues = assumptionsResponse.data.values || [];
  const yearlyValues = yearlyDataResponse.data.values || [];

  const parseCurrencyValue = (value: any) => value ? Number(value.toString().replace(/[^0-9.-]+/g, '')) : 0;
  const parsePercentageValue = (value: any) => {
    if (!value) return 0;
    const numValue = Number(value.toString().replace('%', '').trim());
    return Math.abs(numValue) > 1 ? numValue / 100 : numValue;
  };
  const parseIRRValue = (value: any) => {
    if (!value) return 0;
    return Number(value.toString().replace('%', '').trim()) || 0;
  };

  return {
    assumptions: {
      avgCheckSize: assumptionsValues[1]?.[0] || '',
      targetPortfolio: assumptionsValues[1]?.[0] || '',
      failureRate: assumptionsValues[2]?.[0] || '',
      profitSharingStartYear: assumptionsValues[3]?.[0] || '',
      netIncomeMultiple: assumptionsValues[4]?.[0] || '',
      revenueMultiple: assumptionsValues[5]?.[0] || '',
      startingAverageMargin: startingMarginValues[0]?.[0] || '',
    },
    yearlyData: yearlyValues.slice(1).map((row, index) => ({
      year: `Year ${index + 1}`,
      activePortcos: Number(row[2] || 0),
      companiesProfitSharing: Number(row[5] || 0),
      portfolioRevenue: parseCurrencyValue(row[9]),
      portfolioProfit: parseCurrencyValue(row[11]),
      avgMargins: parsePercentageValue(row[10]),
      avgRevenuePerCompany: parseCurrencyValue(row[3]),
      avgAnnualGrowthRate: parsePercentageValue(row[4]),
      investmentsMade: Number(row[1] || 0),
      annualProfitSharing: parseCurrencyValue(row[13]),
      cumulativeProfitSharingDistributions: parseCurrencyValue(row[14]),
      cumulativeResidualValue: parseCurrencyValue(row[20]),
      residualValueEstimateRevenue: parseCurrencyValue(row[18]),
      residualValueEstimateProfit: parseCurrencyValue(row[19]),
      totalValue: parseCurrencyValue(row[21]),
      grossTVPI: Number(row[22] || 0),
      netTVPI: Number(row[23] || 0),
      percentageCapitalReturned: parseCurrencyValue(row[17]),
      grossProfitSharingReturnMultiple: Number(row[15] || 0),
      netProfitSharingReturnMultiple: Number(row[16] || 0),
      irr: parseIRRValue(row[25]),
    })),
  };
}

// --- API handler ---

const SCENARIOS = ['base', 'conservative', 'optimistic'] as const;

export async function POST() {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== 'admin') {
    return NextResponse.json({ error: 'Unauthorized - Admin access required' }, { status: 401 });
  }

  const results: Record<string, { success: boolean; skipped?: boolean; error?: string }> = {};

  // Fetch and store dashboard data
  try {
    const dashboardData = await fetchDashboardData();
    await setCachedData('dashboard-data', dashboardData);
    results['dashboard'] = { success: true };
  } catch (error: any) {
    console.error('Failed to refresh dashboard data:', error);
    results['dashboard'] = { success: false, error: error.message };
  }

  // Fetch and store pro-forma scenarios (skip sheets that don't exist)
  for (const scenario of SCENARIOS) {
    try {
      const proFormaData = await fetchProFormaData(scenario);
      await setCachedData(`pro-forma-${scenario}`, proFormaData);
      results[`pro-forma-${scenario}`] = { success: true };
    } catch (error: any) {
      const isSheetMissing = error.message?.includes('not found');
      console.error(`Failed to refresh pro-forma ${scenario}:`, error);
      results[`pro-forma-${scenario}`] = {
        success: false,
        skipped: isSheetMissing,
        error: error.message,
      };
    }
  }

  const allSuccess = Object.values(results).every(r => r.success || r.skipped);

  return NextResponse.json({
    success: allSuccess,
    results,
    refreshedAt: new Date().toISOString(),
  }, { status: allSuccess ? 200 : 207 });
}

// GET returns the last refresh timestamp
export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== 'admin') {
    return NextResponse.json({ error: 'Unauthorized - Admin access required' }, { status: 401 });
  }

  // Check when each key was last updated
  const MAX_AGE = 60 * 60 * 24 * 365;
  const keys = ['dashboard-data', ...SCENARIOS.map(s => `pro-forma-${s}`)];
  const status: Record<string, { hasData: boolean }> = {};

  for (const key of keys) {
    const data = await getCachedData(key, MAX_AGE);
    status[key] = { hasData: data !== null };
  }

  return NextResponse.json({ status });
}
