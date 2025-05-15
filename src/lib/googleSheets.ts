import { google } from 'googleapis';

// Initialize the Google Sheets client
export async function getGoogleSheet(sheetId: string) {
  if (!sheetId) {
    throw new Error('Sheet ID is required');
  }

  try {
    console.log('Initializing Google Sheets client...');
    console.log('Using Sheet ID:', sheetId);
    console.log('Service Account Email:', process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL);
    console.log('Private Key exists:', !!process.env.GOOGLE_PRIVATE_KEY);

    if (!process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL) {
      throw new Error('GOOGLE_SERVICE_ACCOUNT_EMAIL is not defined');
    }

    if (!process.env.GOOGLE_PRIVATE_KEY) {
      throw new Error('GOOGLE_PRIVATE_KEY is not defined');
    }

    // Format the private key properly
    const privateKey = process.env.GOOGLE_PRIVATE_KEY
      .replace(/\\n/g, '\n')
      .replace(/"/g, '');

    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        private_key: privateKey,
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
    });

    const sheets = google.sheets({ version: 'v4', auth });
    console.log('Google Sheets client initialized successfully');
    return { sheets, sheetId };
  } catch (error: any) {
    console.error('Error initializing Google Sheets client:', error);
    throw new Error(`Failed to initialize Google Sheets client: ${error.message}`);
  }
}

// Function to get all rows from a specific sheet
export async function getSheetData(sheetId: string, sheetIndex: number = 0) {
  const { sheets, sheetId: id } = await getGoogleSheet(sheetId);
  
  const response = await sheets.spreadsheets.get({
    spreadsheetId: id,
    ranges: [`Sheet${sheetIndex + 1}!A1:Z`],
    includeGridData: true,
  });

  const sheet = response.data.sheets?.[0];
  if (!sheet?.data?.[0]?.rowData) {
    return [];
  }

  const headers = sheet.data[0].rowData[0].values?.map(cell => cell.formattedValue || '') || [];
  return sheet.data[0].rowData.slice(1).map(row => {
    const values = row.values?.map(cell => cell.formattedValue || '') || [];
    return headers.reduce((obj, header, index) => {
      if (header) {
        obj[header] = values[index] || '';
      }
      return obj;
    }, {} as Record<string, string>);
  });
}

// Function to get a specific range of data
export async function getSheetRange(sheetId: string, range: string) {
  try {
    console.log(`Fetching range: ${range}`);
    const { sheets, sheetId: id } = await getGoogleSheet(sheetId);
    
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: id,
      range: range,
    });

    const values = response.data.values;
    if (!values || values.length === 0) {
      console.log(`No values found for range: ${range}`);
      return '';
    }

    console.log(`Values fetched for range ${range}:`, values);

    // For single cell ranges, return the cell value directly
    if (values.length === 1 && values[0].length === 1) {
      return values[0][0];
    }

    return values;
  } catch (error: any) {
    console.error(`Error fetching range ${range}:`, error);
    throw new Error(`Failed to fetch range ${range}: ${error.message}`);
  }
}

// Helper function to safely get string value
export async function getStringValue(sheetId: string, range: string): Promise<string> {
  const value = await getSheetRange(sheetId, range);
  return Array.isArray(value) ? value[0]?.value || '' : String(value);
}

// Helper function to safely get number value
export async function getNumberValue(sheetId: string, range: string): Promise<number> {
  const value = await getSheetRange(sheetId, range);
  if (Array.isArray(value)) {
    // If it's a 2D array (typical Google Sheets response)
    if (Array.isArray(value[0])) {
      return Number(value[0][0]) || 0;
    }
    return Number(value[0]) || 0;
  }
  return Number(value) || 0;
} 