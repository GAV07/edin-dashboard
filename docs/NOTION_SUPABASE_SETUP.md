# Notion to Supabase Integration Setup Guide

This guide will help you set up a button-triggered connection between your Notion database and Supabase to sync user data on-demand.

## Overview

The integration provides a webhook endpoint that processes individual user records when triggered by a button click in Notion, rather than automatically syncing on page creation/update.

## Prerequisites

1. A Notion workspace with a database containing user information
2. A Supabase project with the users table already set up
3. Environment variables configured
4. A way to trigger the webhook (e.g., Notion automation, Zapier, or custom button implementation)

## Step 1: Set Up Notion Integration

### 1.1 Create a Notion Integration

1. Go to [Notion Integrations](https://www.notion.so/my-integrations)
2. Click "New integration"
3. Fill in the integration details:
   - Name: `Supabase Sync`
   - Associated workspace: Select your workspace
   - Capabilities: Select "Read content"
4. Click "Submit"
5. Copy the "Internal Integration Token" - this is your `NOTION_TOKEN`

### 1.2 Share Your Database with the Integration

1. Open your Notion database
2. Click "Share" in the top right
3. Click "Invite" and search for your integration name
4. Give it access to the database

## Step 2: Configure Environment Variables

Add these environment variables to your `.env.local` file:

```env
# Notion Configuration
NOTION_TOKEN=your_notion_integration_token_here

# Optional: For webhook signature verification (recommended for production)
NOTION_WEBHOOK_SECRET=your_webhook_secret_here

# Supabase Configuration (if not already set)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
```

## Step 3: Configure Your Notion Database

Your Notion database should have columns that contain:

### Required Fields:
- **Email**: Can be:
  - An "Email" property type
  - A "Text" property with "email" in the name containing valid email addresses
  - A "Title" property containing email addresses

### Optional Fields:
- **Name/Title**: Can be:
  - A "Title" property 
  - A "Text" property with "name" in the name
  - If not found, users will be created with "Unknown User" as the name

### Example Database Structure:
| Title (Title) | Email (Email) | Status (Select) | Sync to Supabase (Button) |
|--------------|---------------|-----------------|---------------------------|
| John Doe     | john@example.com | Active | "Sync User" |
| Jane Smith   | jane@example.com | Pending | "Sync User" |

## Step 4: Test the Integration

### 4.1 Test Connection

Make a GET request to test your connections:

```bash
curl http://localhost:3000/api/notion-sync
```

You should get a response showing both Notion and Supabase are connected.

### 4.2 Test Button Trigger

To test the button-triggered sync for a specific page:

```bash
curl -X POST http://localhost:3000/api/notion-webhook \
  -H "Content-Type: application/json" \
  -d '{"pageId":"YOUR_PAGE_ID"}'
```

This will:
- Fetch the specific page from your Notion database
- Extract email and name from the page
- Create a new user in Supabase or update existing ones
- Generate a temporary password for the user

## Step 5: Set Up Button Triggers

### 5.1 Using Notion Automations (Recommended)

1. In your Notion database, create an automation
2. Set the trigger to "When button is clicked"
3. Set the action to "Make HTTP request" with:
   - URL: `https://your-domain.com/api/notion-webhook`
   - Method: POST
   - Headers: `Content-Type: application/json`
   - Body: `{"pageId": "{{page.id}}"}`

### 5.2 Using Zapier

1. Create a new Zap
2. Trigger: "New or Updated Database Item in Notion" (filtered by button clicks)
3. Action: "Webhook POST" with:
   - URL: `https://your-domain.com/api/notion-webhook`
   - Payload: `{"pageId": "{{page_id}}"}`

### 5.3 Using Make.com (formerly Integromat)

1. Create a new scenario
2. Add Notion "Watch Database Items" module
3. Add HTTP "Make a Request" module with:
   - URL: `https://your-domain.com/api/notion-webhook`
   - Method: POST
   - Body: `{"pageId": "{{page.id}}"}`

## Step 6: Security Considerations

### 6.1 Webhook Signature Verification

For production, uncomment the signature verification in the webhook endpoint:

```typescript
const signature = request.headers.get('notion-webhook-signature')
if (!verifyWebhookSignature(signature, body)) {
  return NextResponse.json({ error: 'Invalid signature' }, { status: 401 })
}
```

### 6.2 Remove Temporary Password from Response

In production, remove this line from the webhook endpoint:

```typescript
tempPassword: tempPassword // Remove this in production for security
```

### 6.3 Environment Variables

Make sure all sensitive environment variables are:
- Not committed to version control
- Properly set in your production environment
- Using Supabase Service Role Key (not the anon key) for server-side operations

## Step 7: Usage Examples

### Sync Individual User (Button Trigger)
```bash
curl -X POST https://your-domain.com/api/notion-webhook \
  -H "Content-Type: application/json" \
  -d '{"pageId":"NOTION_PAGE_ID"}'
```

### Test Connection
```bash
curl https://your-domain.com/api/notion-sync
```

## Troubleshooting

### Common Issues:

1. **"Notion connection failed"**
   - Check your `NOTION_TOKEN` is correct
   - Ensure the integration has access to your database

2. **"No email found in page properties"**
   - Verify your database has email fields
   - Check the property names contain "email"
   - Ensure email values are valid email addresses

3. **"No pageId provided in request"**
   - Ensure your automation/trigger is sending the page ID correctly
   - Check the request body format

4. **"Failed to create user"**
   - Check your Supabase connection
   - Verify the users table exists
   - Check for duplicate emails

5. **"Invalid page data received"**
   - Verify the page ID is correct (32 characters)
   - Ensure the page exists and is accessible

### Debug Mode

Add these logs to see what data is being extracted:

```typescript
console.log('Page properties:', JSON.stringify(page.properties, null, 2))
console.log('Extracted email:', email)
console.log('Extracted name:', name)
```

## Expected Workflow

1. User clicks a "Sync User" button in a Notion database row
2. Notion automation or third-party service triggers the webhook
3. Webhook receives the page ID and fetches the full page data
4. Email and name are extracted from the page properties
5. User is created or updated in Supabase with a temporary password
6. Response confirms the action taken

## API Endpoints Summary

- `GET /api/notion-sync` - Test connections
- `POST /api/notion-webhook` - Button-triggered sync with `{"pageId": "PAGE_ID"}`

Your button-triggered Notion-Supabase integration is now ready to use! 