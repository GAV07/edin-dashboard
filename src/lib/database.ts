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

// --- Data Cache ---

export async function ensureCacheTable() {
  const db = getDb()
  await db`
    CREATE TABLE IF NOT EXISTS data_cache (
      cache_key VARCHAR(255) PRIMARY KEY,
      data JSONB NOT NULL,
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    )
  `
}

let cacheTableReady = false

async function ensureCacheTableOnce() {
  if (!cacheTableReady) {
    await ensureCacheTable()
    cacheTableReady = true
  }
}

export async function getCachedData<T>(key: string, maxAgeSeconds: number): Promise<T | null> {
  try {
    await ensureCacheTableOnce()
    const db = getDb()
    const rows = await db`
      SELECT data FROM data_cache
      WHERE cache_key = ${key}
        AND updated_at > NOW() - INTERVAL '1 second' * ${maxAgeSeconds}
    `
    if (rows.length > 0) {
      return rows[0].data as T
    }
    return null
  } catch (error) {
    console.error('Cache read error:', error)
    return null
  }
}

export async function setCachedData(key: string, data: unknown): Promise<void> {
  try {
    await ensureCacheTableOnce()
    const db = getDb()
    await db`
      INSERT INTO data_cache (cache_key, data, updated_at)
      VALUES (${key}, ${JSON.stringify(data)}::jsonb, NOW())
      ON CONFLICT (cache_key)
      DO UPDATE SET data = ${JSON.stringify(data)}::jsonb, updated_at = NOW()
    `
  } catch (error) {
    console.error('Cache write error:', error)
  }
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
