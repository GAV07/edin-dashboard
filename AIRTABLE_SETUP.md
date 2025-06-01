# Airtable Portfolio Integration Setup

This document explains how to set up the Airtable integration for the portfolio companies viewer.

## Required Environment Variables

Add these to your `.env.local` file:

```bash
# Airtable API Configuration
AIRTABLE_API_KEY=your-airtable-api-key
AIRTABLE_BASE_ID=your-airtable-base-id
```

## Getting Your Airtable Credentials

### 1. API Key
1. Go to https://airtable.com/create/tokens
2. Create a new personal access token
3. Give it a name like "Edin Investor Dashboard"
4. Select the following scopes:
   - `data.records:read`
5. Select the "Edin Operations" base
6. Copy the generated token

### 2. Base ID
1. Open your Airtable base in a browser
2. Look at the URL: `https://airtable.com/app[BASE_ID]/tbl[TABLE_ID]`
3. Copy the `app[BASE_ID]` part (including "app")

## Airtable Structure Requirements

The integration expects:
- **Base Name**: "Edin Operations"
- **Table Name**: "Deal Pipeline"
- **View Name**: "Investor Portal View"

## Field Mapping

The component maps these exact field names from your Airtable:

| UI Display | Airtable Field Name | Required | Description |
|------------|-------------------|----------|-------------|
| Company Name | `Company name` or `Company Name` | ✅ | The name of the portfolio company |
| Description | `Description` | ❌ | Company description/summary |
| Sector | `Sector` | ❌ | Industry sector (used for filtering) |
| Website | `Website` | ❌ | Company website URL |
| Pitch Deck | `Deck` | ❌ | Link to company pitch deck |
| Founders | `Founder(s)` or `Founders` | ❌ | Names of company founders |
| Founder LinkedIn | `Founder LinkedIn` | ❌ | LinkedIn profile of founder(s) |
| Memos & Overviews | `Memos & Overviews` | ❌ | Link to investment memos |
| Data Room | `Data room` or `Data Room` | ❌ | Link to company data room |
| Location | `Location` | ❌ | Company headquarters location |
| Portal Display | `Investor Portal Display` | ✅ | Boolean - shows company in portal |

## Important Notes

1. **Investor Portal Display**: Only companies with this field set to `TRUE` will appear in the portfolio viewer
2. **URLs**: All link fields (Website, Deck, etc.) should contain full URLs (with http:// or https://)
3. **Case Sensitivity**: Field names are case-sensitive and must match exactly

## Testing the Integration

1. **Add Environment Variables**: 
   ```bash
   # In your .env.local file
   AIRTABLE_API_KEY=pat1234567890abcdef
   AIRTABLE_BASE_ID=appABCDEF123456789
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
- Location, founders, and website info
- Hover animations

### Detailed Modal
- Full company information
- Clickable links to resources
- Professional layout
- Easy navigation

### Search & Filter
- Search by company name, description, sector, or founders
- Filter by sector
- Real-time filtering

## Troubleshooting

### Common Issues

**"AIRTABLE_API_KEY is not configured"**
- Check that your `.env.local` file exists and contains the API key
- Restart your development server after adding environment variables

**"Failed to fetch portfolio companies"**
- Verify your base ID is correct
- Check that the table name is exactly "Deal Pipeline"
- Ensure the view name is exactly "Investor Portal View"

**"No companies found"**
- Check that some records have "Investor Portal Display" set to `TRUE`
- Verify field names match exactly (case-sensitive)

**Links not working**
- Ensure URLs include `http://` or `https://`
- Test URLs directly in a browser first

### Debug Mode

To enable detailed error logging, check the browser console and the terminal where you're running `npm run dev` for detailed error messages.

## Data Structure Example

Here's an example of how your Airtable records should be structured:

| Company name | Description | Sector | Website | Deck | Founder(s) | Location | Investor Portal Display |
|-------------|-------------|---------|---------|------|------------|----------|------------------------|
| Armur AI | AI powered cybersecurity tool-suite for Web3 | Security | https://armur.ai | https://example.com/deck | Akhil Sharma, Amritansh | Bangalore, India | TRUE |

This setup will display a beautiful, interactive portfolio viewer for your investors! 