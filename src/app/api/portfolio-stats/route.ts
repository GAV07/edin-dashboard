import { NextResponse } from 'next/server';
import Airtable from 'airtable';

export async function GET() {
  try {
    // Check for required environment variables
    if (!process.env.AIRTABLE_API_KEY) {
      return NextResponse.json(
        { error: 'AIRTABLE_API_KEY is not configured' },
        { status: 500 }
      );
    }

    if (!process.env.AIRTABLE_BASE_ID) {
      return NextResponse.json(
        { error: 'AIRTABLE_BASE_ID is not configured' },
        { status: 500 }
      );
    }

    // Initialize Airtable
    const base = new Airtable({ 
      apiKey: process.env.AIRTABLE_API_KEY 
    }).base(process.env.AIRTABLE_BASE_ID);
    
    // Fetch all records from Grid View (no filtering)
    const records = await base('Deal Pipeline')
      .select({
        view: 'Grid view'
      })
      .all();

    // Transform the data to a more usable format
    const companies = records.map(record => ({
      id: record.id,
      fields: record.fields,
    }));

    return NextResponse.json({ companies, total: companies.length });
  } catch (error) {
    console.error('Error fetching portfolio stats:', error);
    return NextResponse.json(
      { 
        error: 'Failed to fetch portfolio stats',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
} 