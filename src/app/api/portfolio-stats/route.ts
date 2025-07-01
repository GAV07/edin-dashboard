import { NextResponse } from 'next/server';
import { Client } from '@notionhq/client';

export async function GET() {
  try {
    // Check for required environment variables
    if (!process.env.NOTION_TOKEN) {
      return NextResponse.json(
        { error: 'NOTION_TOKEN is not configured' },
        { status: 500 }
      );
    }

    if (!process.env.NOTION_DATABASE_ID) {
      return NextResponse.json(
        { error: 'NOTION_DATABASE_ID is not configured' },
        { status: 500 }
      );
    }

    // Initialize Notion client
    const notion = new Client({
      auth: process.env.NOTION_TOKEN,
    });
    
    // Fetch all records from Notion database (no filtering for stats)
    const response = await notion.databases.query({
      database_id: process.env.NOTION_DATABASE_ID,
    });

    // Transform Notion records to expected format
    const companies = response.results.map((page: any) => {
      const fields: any = {};
      
      // Extract properties and convert to expected format
      Object.entries(page.properties).forEach(([key, value]: [string, any]) => {
        switch (value.type) {
          case 'title':
            fields[key] = value.title?.[0]?.plain_text || '';
            break;
          case 'rich_text':
            fields[key] = value.rich_text?.[0]?.plain_text || '';
            break;
          case 'select':
            fields[key] = value.select?.name || '';
            break;
          case 'multi_select':
            fields[key] = value.multi_select?.map((item: any) => item.name).join(', ') || '';
            break;
          case 'checkbox':
            fields[key] = value.checkbox;
            break;
          case 'url':
            fields[key] = value.url || '';
            break;
          case 'email':
            fields[key] = value.email || '';
            break;
          case 'phone_number':
            fields[key] = value.phone_number || '';
            break;
          case 'number':
            fields[key] = value.number || 0;
            break;
          default:
            // For other types, try to extract plain text
            if (value.plain_text !== undefined) {
              fields[key] = value.plain_text;
            } else if (value.name !== undefined) {
              fields[key] = value.name;
            } else {
              fields[key] = '';
            }
        }
      });

      return {
        id: page.id,
        fields: fields,
      };
    });

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