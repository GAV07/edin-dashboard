import { NextRequest, NextResponse } from 'next/server'
import { UserManagement } from '@/lib/userManagement'

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json()

    if (!email) {
      return NextResponse.json({ exists: false, requiresPassword: false })
    }

    const user = await UserManagement.getUserByEmail(email)

    if (!user) {
      return NextResponse.json({ exists: false, requiresPassword: false })
    }

    const requiresPassword = user.role === 'admin' || user.role === 'partner'
    return NextResponse.json({ exists: true, requiresPassword })
  } catch {
    return NextResponse.json({ exists: false, requiresPassword: false })
  }
}
