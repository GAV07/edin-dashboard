# Notion Portfolio Integration Setup

This document explains how to set up the Notion integration for the portfolio companies viewer.

## Required Environment Variables

Add these to your `.env.local` file:

```bash
# Notion API Configuration
NOTION_TOKEN=your-notion-integration-token
NOTION_DATABASE_ID=your-notion-database-id
```

## Getting Your Notion Credentials

### 1. Integration Token
1. Go to [Notion Integrations](https://www.notion.so/my-integrations)
2. Create a new integration
3. Give it a name like "Edin Investor Dashboard"
4. Select the workspace that contains your portfolio database
5. Set capabilities to "Read content"
6. Copy the "Internal Integration Token" - this is your `NOTION_TOKEN`

### 2. Database ID
1. Open your Notion database in a browser
2. Look at the URL: `https://www.notion.so/your-workspace/DATABASE_ID?v=...`
3. Copy the `DATABASE_ID` part (32 character string)

### 3. Share Database with Integration
1. Open your portfolio database in Notion
2. Click "Share" in the top right
3. Click "Invite" and search for your integration name
4. Give it access to the database

## Notion Database Structure Requirements

Your Notion database should have these exact property names:

| UI Display | Notion Property Name | Property Type | Required | Description |
|------------|---------------------|---------------|----------|-------------|
| Company Name | `Company Name` | Title | ✅ | The name of the portfolio company |
| Description | `Description` | Rich text | ❌ | Company description/summary |
| Sector | `Sector` | Select or Multi-select | ❌ | Industry sector (used for filtering) |
| Location | `Location` | Rich text | ❌ | Company headquarters location |
| Next Steps | `Next Steps` | Rich text | ❌ | Next steps or notes |
| Highlights | `Highlights` | Rich text | ❌ | Key highlights or achievements |
| Portal Display | `Investor Portal Display` | Checkbox | ✅ | Shows company in portal when checked |

## Important Notes

1. **Investor Portal Display**: Only companies with this checkbox checked will appear in the portfolio viewer
2. **Property Names**: Property names are case-sensitive and must match exactly
3. **Property Types**: The integration handles multiple property types (Title, Rich text, Select, Multi-select, Checkbox, URL, Email, etc.)

## Testing the Integration

1. **Add Environment Variables**: 
   ```bash
   # In your .env.local file
   NOTION_TOKEN=secret_1234567890abcdef
   NOTION_DATABASE_ID=12345678901234567890123456789012
   ```

2. **Restart Development Server**:
   ```bash
   npm run dev
   ```

3. **Navigate to Portfolio**: Go to `http://localhost:3000/portfolio`

4. **Check Console**: Open browser dev tools to see any error messages

## Features

### Portfolio Cards
- Company name with initials avatar
- Sector badge
- Description preview
- Location and highlights info
- Hover animations

### Detailed Modal
- Full company information
- Professional layout
- Easy navigation

### Search & Filter
- Search by company name, description, sector, or location
- Filter by sector
- Real-time filtering

### Statistics Dashboard
- Company count by sector
- Visual pie chart representation
- Real-time data updates

## Troubleshooting

### Common Issues

**"NOTION_TOKEN is not configured"**
- Check that your `.env.local` file exists and contains the token
- Restart your development server after adding environment variables

**"NOTION_DATABASE_ID is not configured"**
- Verify your database ID is correct (32 character string)
- Make sure it's properly set in your environment variables

**"Failed to fetch portfolio companies"**
- Check that the integration has access to your database
- Verify the database ID is correct
- Ensure property names match exactly (case-sensitive)

**"No companies found"**
- Check that some records have "Investor Portal Display" checked
- Verify property names match exactly

### Debug Mode

To enable detailed error logging, check the browser console and the terminal where you're running `npm run dev` for detailed error messages.

## Data Structure Example

Here's an example of how your Notion database records should be structured:

| Company Name | Description | Sector | Location | Investor Portal Display |
|-------------|-------------|---------|----------|------------------------|
| Armur AI | AI powered cybersecurity tool-suite for Web3 | Security | Bangalore, India | ✓ |
| TechCorp | Innovative technology solutions | Technology | San Francisco, CA | ✓ |

## Migration from Airtable

If you're migrating from Airtable:

1. Export your Airtable data
2. Create a new Notion database with the property names listed above
3. Import your data into Notion
4. Update your environment variables
5. Test the integration

## API Endpoints

The integration provides two endpoints:

- `GET /api/portfolio` - Returns companies where "Investor Portal Display" is checked
- `GET /api/portfolio-stats` - Returns all companies for statistics generation

Both endpoints return the same format:
```json
{
  "companies": [
    {
      "id": "notion-page-id",
      "fields": {
        "Company Name": "...",
        "Description": "...",
        // etc
      }
    }
  ],
  "total": 5
}
```

This setup will display a beautiful, interactive portfolio viewer for your investors powered by Notion! 🚀 