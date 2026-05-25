import { NextResponse } from 'next/server';
import { getCachedData } from '@/lib/database';

// No TTL — data only updates when admin manually refreshes via Sync Data
const MAX_AGE = 60 * 60 * 24 * 365; // effectively infinite

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const scenario = searchParams.get('scenario') || 'base';
    const cacheKey = `pro-forma-${scenario}`;

    const cached = await getCachedData(cacheKey, MAX_AGE);
    if (cached) {
      return NextResponse.json(cached);
    }

    // No cached data — admin needs to sync from Google Sheets first
    return NextResponse.json(
      {
        error: `No data available for ${scenario} scenario. Please use Admin > Sync Data to load data from Google Sheets.`,
        timestamp: new Date().toISOString()
      },
      { status: 404 }
    );
  } catch (error: any) {
    console.error('Error in pro-forma API route:', error);
    return NextResponse.json(
      {
        error: error.message || 'Failed to fetch pro-forma data',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
} 