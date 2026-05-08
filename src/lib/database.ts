import postgres from 'postgres'

let sql: ReturnType<typeof postgres>

export function getDb() {
  if (!sql) {
    sql = postgres(process.env.DATABASE_PUBLIC_URL!, { ssl: 'require' })
  }
  return sql
}

export interface User {
  id: string
  email: string
  password_hash: string
  name: string
  role: 'admin' | 'investor'
  created_at: string
  updated_at: string
  is_active: boolean
}

export interface CreateUserData {
  email: string
  password: string
  name: string
  role: 'admin' | 'investor'
}

export interface UpdateUserData {
  name?: string
  role?: 'admin' | 'investor'
  is_active?: boolean
}
