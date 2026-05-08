import { NextResponse } from 'next/server'
import { Client } from '@notionhq/client'
import { getDb } from '@/lib/database'

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
})

// GET endpoint to test the connection
export async function GET() {
  try {
    // Test Notion connection
    const me = await notion.users.me({})

    // Test database connection
    const sql = getDb()
    const rows = await sql`SELECT COUNT(*) as count FROM users`

    return NextResponse.json({
      success: true,
      notion: {
        connected: true,
        user: me.type === 'person' ? me.person?.email || 'Connected' : 'Bot connected'
      },
      database: {
        connected: true,
        usersCount: parseInt(rows[0].count as string, 10)
      }
    })
  } catch (error) {
    console.error('Connection test error:', error)
    return NextResponse.json(
      { error: 'Failed to test connections' },
      { status: 500 }
    )
  }
}
