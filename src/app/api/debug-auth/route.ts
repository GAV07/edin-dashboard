import { NextResponse } from 'next/server'
import { getDb } from '@/lib/database'
import bcrypt from 'bcryptjs'

export async function GET() {
  const checks: Record<string, any> = {}

  // 1. Check if env var exists
  checks.hasDbUrl = !!process.env.DATABASE_PUBLIC_URL
  checks.dbUrlPrefix = process.env.DATABASE_PUBLIC_URL?.substring(0, 20) + '...'

  // 2. Try connecting to DB
  try {
    const sql = getDb()
    const rows = await sql`SELECT id, email, name, role, is_active, LENGTH(password_hash) as hash_length FROM users`
    checks.dbConnected = true
    checks.users = rows
  } catch (error: any) {
    checks.dbConnected = false
    checks.dbError = error.message
  }

  // 3. Test password hash verification
  try {
    const sql = getDb()
    const rows = await sql`SELECT password_hash FROM users WHERE email = 'erick@edin.capital' LIMIT 1`
    if (rows[0]) {
      const hash = rows[0].password_hash as string
      checks.hashFromDb = hash.substring(0, 20) + '...'
      checks.hashLength = hash.length
      checks.passwordMatch = await bcrypt.compare('investor1234', hash)
    } else {
      checks.userFound = false
    }
  } catch (error: any) {
    checks.passwordTestError = error.message
  }

  return NextResponse.json(checks)
}
