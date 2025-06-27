import { NextResponse } from 'next/server'
import { Client } from '@notionhq/client'
import { supabase } from '@/lib/database'

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
})

// GET endpoint to test the connection
export async function GET() {
  try {
    // Test Notion connection
    const me = await notion.users.me({})
    
    // Test Supabase connection
    const { data: users, error } = await supabase
      .from('users')
      .select('*', { count: 'exact' })

    if (error) {
      throw error
    }

    return NextResponse.json({
      success: true,
      notion: {
        connected: true,
        user: me.type === 'person' ? me.person?.email || 'Connected' : 'Bot connected'
      },
      supabase: {
        connected: true,
        usersCount: users?.length || 0
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