import bcrypt from 'bcryptjs'
import { supabase, User, CreateUserData, UpdateUserData } from './database'

export class UserManagement {
  
  // Get all users
  static async getAllUsers(): Promise<User[]> {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      throw new Error(`Failed to fetch users: ${error.message}`)
    }

    return data || []
  }

  // Get user by email
  static async getUserByEmail(email: string): Promise<User | null> {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .eq('is_active', true)
      .single()

    if (error) {
      if (error.code === 'PGRST116') {
        return null // User not found
      }
      throw new Error(`Failed to fetch user: ${error.message}`)
    }

    return data
  }

  // Create new user
  static async createUser(userData: CreateUserData): Promise<User> {
    // Check if user already exists
    const existingUser = await this.getUserByEmail(userData.email)
    if (existingUser) {
      throw new Error('User with this email already exists')
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(userData.password, 12)

    // Create user in database
    const { data, error } = await supabase
      .from('users')
      .insert([
        {
          email: userData.email,
          password_hash: hashedPassword,
          name: userData.name,
          role: userData.role,
          is_active: true,
        }
      ])
      .select()
      .single()

    if (error) {
      throw new Error(`Failed to create user: ${error.message}`)
    }

    return data
  }

  // Update user
  static async updateUser(userId: string, updates: UpdateUserData): Promise<User> {
    const { data, error } = await supabase
      .from('users')
      .update({
        ...updates,
        updated_at: new Date().toISOString(),
      })
      .eq('id', userId)
      .select()
      .single()

    if (error) {
      throw new Error(`Failed to update user: ${error.message}`)
    }

    return data
  }

  // Delete user (soft delete by setting is_active to false)
  static async deactivateUser(userId: string): Promise<void> {
    const { error } = await supabase
      .from('users')
      .update({ 
        is_active: false,
        updated_at: new Date().toISOString(),
      })
      .eq('id', userId)

    if (error) {
      throw new Error(`Failed to deactivate user: ${error.message}`)
    }
  }

  // Activate user
  static async activateUser(userId: string): Promise<void> {
    const { error } = await supabase
      .from('users')
      .update({ 
        is_active: true,
        updated_at: new Date().toISOString(),
      })
      .eq('id', userId)

    if (error) {
      throw new Error(`Failed to activate user: ${error.message}`)
    }
  }

  // Change user password
  static async changePassword(userId: string, newPassword: string): Promise<void> {
    const hashedPassword = await bcrypt.hash(newPassword, 12)

    const { error } = await supabase
      .from('users')
      .update({ 
        password_hash: hashedPassword,
        updated_at: new Date().toISOString(),
      })
      .eq('id', userId)

    if (error) {
      throw new Error(`Failed to update password: ${error.message}`)
    }
  }

  // Verify password
  static async verifyPassword(user: User, password: string): Promise<boolean> {
    return await bcrypt.compare(password, user.password_hash)
  }
} 