import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { UserManagement } from '@/lib/userManagement'

// PUT - Update user (admin only)
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json(
        { error: 'Unauthorized - Admin access required' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { name, role, is_active } = body
    const resolvedParams = await params
    const userId = resolvedParams.id

    // Validate role if provided
    if (role && !['admin', 'investor'].includes(role)) {
      return NextResponse.json(
        { error: 'Invalid role. Must be "admin" or "investor"' },
        { status: 400 }
      )
    }

    const updates: any = {}
    if (name !== undefined) updates.name = name
    if (role !== undefined) updates.role = role
    if (is_active !== undefined) updates.is_active = is_active

    const updatedUser = await UserManagement.updateUser(userId, updates)

    // Return user without password hash
    const safeUser = {
      id: updatedUser.id,
      email: updatedUser.email,
      name: updatedUser.name,
      role: updatedUser.role,
      created_at: updatedUser.created_at,
      updated_at: updatedUser.updated_at,
      is_active: updatedUser.is_active
    }

    return NextResponse.json({
      message: 'User updated successfully',
      user: safeUser
    })
  } catch (error: any) {
    console.error('Error updating user:', error)
    return NextResponse.json(
      { error: 'Failed to update user' },
      { status: 500 }
    )
  }
}

// DELETE - Deactivate user (admin only)
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json(
        { error: 'Unauthorized - Admin access required' },
        { status: 401 }
      )
    }

    const resolvedParams = await params
    const userId = resolvedParams.id

    // Prevent admin from deactivating themselves
    if (userId === session.user.id) {
      return NextResponse.json(
        { error: 'Cannot deactivate your own account' },
        { status: 400 }
      )
    }

    await UserManagement.deactivateUser(userId)

    return NextResponse.json({
      message: 'User deactivated successfully'
    })
  } catch (error: any) {
    console.error('Error deactivating user:', error)
    return NextResponse.json(
      { error: 'Failed to deactivate user' },
      { status: 500 }
    )
  }
} 