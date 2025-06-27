import { NextRequest, NextResponse } from 'next/server'
import { Client } from '@notionhq/client'
import { supabase } from '@/lib/database'
import crypto from 'crypto'
import bcrypt from 'bcryptjs'

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
})

// Function to get the fixed temporary password
function getTempPassword(): string {
  return 'investor1234'
}

// Function to extract email from Notion webhook payload or page properties
function extractEmailFromPayload(data: any): string | null {
  // Check for direct email field in webhook payload
  if (data.email) {
    return data.email.trim()
  }
  
  // Check for Email field in Notion webhook content
  if (data.Email) {
    return data.Email.trim()
  }
  
  // Check if data has properties (from page fetch)
  if (data.properties) {
    return extractEmailFromProperties(data.properties)
  }
  
  return null
}

// Function to extract name from Notion webhook payload or page properties
function extractNameFromPayload(data: any): string {
  // Check for direct name field
  if (data.name) {
    return data.name.trim()
  }
  
  // Check for "Investor name" field from Notion
  if (data['Investor name']) {
    return data['Investor name'].trim()
  }
  
  // Check for various name field variations
  if (data['Name']) {
    return data['Name'].trim()
  }
  
  // Check if data has properties (from page fetch)
  if (data.properties) {
    return extractNameFromProperties(data.properties)
  }
  
  return 'Unknown Investor'
}

// Function to extract additional investor data
function extractInvestorData(data: any) {
  return {
    capitalCommitted: data['Capital committed'] || data['capital_committed'] || null,
    category: data['Category'] || data['category'] || null,
    company: data['Company'] || data['company'] || null,
    description: data['Description'] || data['description'] || null
  }
}

// Function to extract email from Notion page properties
function extractEmailFromProperties(properties: any): string | null {
  // Look for email in various property types
  for (const [key, value] of Object.entries(properties)) {
    if (key.toLowerCase().includes('email') && value && typeof value === 'object') {
      const prop = value as any
      if (prop.type === 'email' && prop.email) {
        return prop.email
      }
      if (prop.type === 'rich_text' && prop.rich_text && prop.rich_text.length > 0) {
        const text = prop.rich_text[0]?.plain_text || ''
        // Simple email regex validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (emailRegex.test(text)) {
          return text
        }
      }
      if (prop.type === 'title' && prop.title && prop.title.length > 0) {
        const text = prop.title[0]?.plain_text || ''
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (emailRegex.test(text)) {
          return text
        }
      }
    }
  }
  return null
}

// Function to extract name from Notion page properties
function extractNameFromProperties(properties: any): string {
  // Look for name/title in various property types
  for (const [key, value] of Object.entries(properties)) {
    if ((key.toLowerCase().includes('name') || key.toLowerCase().includes('title') || key.toLowerCase().includes('investor')) && value && typeof value === 'object') {
      const prop = value as any
      if (prop.type === 'title' && prop.title && prop.title.length > 0) {
        return prop.title[0]?.plain_text || 'Unknown User'
      }
      if (prop.type === 'rich_text' && prop.rich_text && prop.rich_text.length > 0) {
        return prop.rich_text[0]?.plain_text || 'Unknown User'
      }
    }
  }
  return 'Unknown User'
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Log the webhook event for debugging
    console.log('Investor webhook received:', JSON.stringify(body, null, 2))

    // Verify the webhook signature (if you set up webhook secrets)
    // const signature = request.headers.get('notion-webhook-signature')
    // if (!verifyWebhookSignature(signature, body)) {
    //   return NextResponse.json({ error: 'Invalid signature' }, { status: 401 })
    // }

    // Extract email and name from various possible payload formats
    const email = extractEmailFromPayload(body)
    const name = extractNameFromPayload(body)
    
    // Extract additional investor data
    const investorData = extractInvestorData(body)
    
    console.log(`Processing investor: ${name} (${email})`)
    console.log('Additional data:', investorData)

    if (!email) {
      console.log('No email found in webhook payload')
      return NextResponse.json({ 
        error: 'No email found in webhook payload. Please ensure the Email field is included.' 
      }, { status: 400 })
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ 
        error: 'Invalid email format' 
      }, { status: 400 })
    }
    
    const tempPassword = getTempPassword()
    const passwordHash = await bcrypt.hash(tempPassword, 12)
    
    // Check if user already exists
    const { data: existingUser } = await supabase
      .from('users')
      .select('id, email')
      .eq('email', email)
      .single()
    
    if (existingUser) {
      // Update existing user with new temporary password
      const { error: updateError } = await supabase
        .from('users')
        .update({
          password_hash: passwordHash,
          name: name,
          updated_at: new Date().toISOString()
        })
        .eq('email', email)
      
      if (updateError) {
        console.error('Error updating user:', updateError)
        return NextResponse.json({ error: 'Failed to update user', details: updateError.message }, { status: 500 })
      }
      
      console.log(`Updated user ${email} with fixed temporary password`)
      
      return NextResponse.json({ 
        success: true, 
        message: `User ${email} updated successfully`,
        action: 'updated',
        email: email,
        name: name,
        investorData: investorData,
        tempPassword: tempPassword // Remove this in production for security
      })
    } else {
      // Create new user
      const { error: insertError } = await supabase
        .from('users')
        .insert({
          email: email,
          password_hash: passwordHash,
          name: name,
          role: 'investor' // Default role
        })
      
      if (insertError) {
        console.error('Error creating user:', insertError)
        return NextResponse.json({ error: 'Failed to create user', details: insertError.message }, { status: 500 })
      }
      
      console.log(`Created new user ${email} with fixed temporary password`)
      
      return NextResponse.json({ 
        success: true, 
        message: `User ${email} created successfully`,
        action: 'created',
        email: email,
        name: name,
        investorData: investorData,
        tempPassword: tempPassword // Remove this in production for security
      })
    }
  } catch (error) {
    console.error('Investor webhook error:', error)
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' }, 
      { status: 500 }
    )
  }
}

// Handle GET requests for testing
export async function GET(request: NextRequest) {
  return NextResponse.json({ 
    message: 'Notion webhook endpoint is active',
    timestamp: new Date().toISOString(),
    endpoint: '/api/notion-webhook'
  })
}

// Verification function (optional, but recommended for production)
function verifyWebhookSignature(signature: string | null, body: any): boolean {
  if (!signature || !process.env.NOTION_WEBHOOK_SECRET) {
    return true // Skip verification if not configured
  }
  
  const expectedSignature = crypto
    .createHmac('sha256', process.env.NOTION_WEBHOOK_SECRET)
    .update(JSON.stringify(body))
    .digest('hex')
  
  return signature === expectedSignature
} 