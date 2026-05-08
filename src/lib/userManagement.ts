import bcrypt from 'bcryptjs'
import { getDb, User, CreateUserData, UpdateUserData } from './database'

export class UserManagement {

  // Get all users
  static async getAllUsers(): Promise<User[]> {
    const sql = getDb()
    const rows = await sql`SELECT * FROM users ORDER BY created_at DESC`
    return rows as unknown as User[]
  }

  // Get user by email
  static async getUserByEmail(email: string): Promise<User | null> {
    const sql = getDb()
    const rows = await sql`SELECT * FROM users WHERE email = ${email} AND is_active = true LIMIT 1`
    return (rows[0] as unknown as User) || null
  }

  // Create new user
  static async createUser(userData: CreateUserData): Promise<User> {
    const existingUser = await this.getUserByEmail(userData.email)
    if (existingUser) {
      throw new Error('User with this email already exists')
    }

    const hashedPassword = await bcrypt.hash(userData.password, 12)

    const sql = getDb()
    const rows = await sql`
      INSERT INTO users (email, password_hash, name, role, is_active)
      VALUES (${userData.email}, ${hashedPassword}, ${userData.name}, ${userData.role}, true)
      RETURNING *
    `
    return rows[0] as unknown as User
  }

  // Update user
  static async updateUser(userId: string, updates: UpdateUserData): Promise<User> {
    const sql = getDb()
    const rows = await sql`
      UPDATE users
      SET name = COALESCE(${updates.name ?? null}, name),
          role = COALESCE(${updates.role ?? null}, role),
          is_active = COALESCE(${updates.is_active ?? null}, is_active),
          updated_at = now()
      WHERE id = ${userId}
      RETURNING *
    `

    if (!rows[0]) {
      throw new Error('Failed to update user: not found')
    }

    return rows[0] as unknown as User
  }

  // Delete user (soft delete by setting is_active to false)
  static async deactivateUser(userId: string): Promise<void> {
    const sql = getDb()
    await sql`UPDATE users SET is_active = false, updated_at = now() WHERE id = ${userId}`
  }

  // Activate user
  static async activateUser(userId: string): Promise<void> {
    const sql = getDb()
    await sql`UPDATE users SET is_active = true, updated_at = now() WHERE id = ${userId}`
  }

  // Change user password
  static async changePassword(userId: string, newPassword: string): Promise<void> {
    const hashedPassword = await bcrypt.hash(newPassword, 12)
    const sql = getDb()
    await sql`UPDATE users SET password_hash = ${hashedPassword}, updated_at = now() WHERE id = ${userId}`
  }

  // Verify password
  static async verifyPassword(user: User, password: string): Promise<boolean> {
    return await bcrypt.compare(password, user.password_hash)
  }
}
