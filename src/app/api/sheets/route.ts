import { NextResponse } from 'next/server';
import { getSheetRange } from '@/lib/googleSheets';

async function getStringValue(sheetId: string, range: string): Promise<string> {
  try {
    const value = await getSheetRange(sheetId, range);
    return Array.isArray(value) ? value[0]?.value || '' : String(value);
  } catch (error) {
    console.error(`Error getting string value for range ${range}:`, error);
    throw error;
  }
}

async function getNumberValue(sheetId: string, range: string): Promise<number> {
  try {
    const value = await getSheetRange(sheetId, range);
    if (Array.isArray(value)) {
      // If it's a 2D array (typical Google Sheets response)
      if (Array.isArray(value[0])) {
        return Number(value[0][0]) || 0;
      }
      return Number(value[0]) || 0;
    }
    return Number(value) || 0;
  } catch (error) {
    console.error(`Error getting number value for range ${range}:`, error);
    throw error;
  }
}

export async function GET() {
  try {
    const sheetId = process.env.GOOGLE_SHEET_ID;
    if (!sheetId) {
      throw new Error('GOOGLE_SHEET_ID is not defined');
    }

    console.log('Fetching data from sheet:', sheetId);

    // Fetch assumptions
    const assumptions = {
      avgCheckSize: await getNumberValue(sheetId, "'Bottom up'!B2"),
      targetPortfolio: await getNumberValue(sheetId, "'Bottom up'!B3"),
      failureRate: await getNumberValue(sheetId, "'Bottom up'!B4"),
      profitSharingStartYear: await getNumberValue(sheetId, "'Bottom up'!B5"),
      netIncomeMultiple: await getNumberValue(sheetId, "'Bottom up'!B6"),
      revenueMultiple: await getNumberValue(sheetId, "'Bottom up'!B7")
    };

    console.log('Assumptions fetched:', assumptions);

    // Fetch yearly data (up to 25 years)
    const yearlyData = [];
    for (let i = 0; i < 25; i++) {
      const rowIndex = i + 11; // Data starts from row 11
      const entry = {
        year: i + 1,
        "Annual Profit Sharing": await getNumberValue(sheetId, `'Bottom up'!K${rowIndex}`),
        "Cumulative Distributions": await getNumberValue(sheetId, `'Bottom up'!L${rowIndex}`),
        "Gross TVPI": await getNumberValue(sheetId, `'Bottom up'!S${rowIndex}`),
        "Net TVPI": await getNumberValue(sheetId, `'Bottom up'!T${rowIndex}`),
        "Annual Returns": await getNumberValue(sheetId, `'Bottom up'!U${rowIndex}`)
      };
      yearlyData.push(entry);
    }

    console.log('Yearly data fetched:', yearlyData.length, 'entries');

    return NextResponse.json({ assumptions, yearlyData });
  } catch (error: any) {
    console.error('Error in API route:', error);
    return NextResponse.json(
      { 
        error: error.message || 'Failed to fetch data',
        details: error.stack,
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
} 