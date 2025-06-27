import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

// Create a single supabase client for interacting with your database
export const supabase = createClient(supabaseUrl!, supabaseKey!)

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