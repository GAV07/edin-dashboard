import { useSession } from 'next-auth/react'
import { useCallback, useEffect, useRef } from 'react'

interface UseSessionAwareFetchOptions {
  onSessionExpired?: () => void
  enabled?: boolean
  cacheKey?: string // For persisting data across session expires
}

export const useSessionAwareFetch = (options: UseSessionAwareFetchOptions = {}) => {
  const { data: session, status } = useSession()
  const { onSessionExpired, enabled = true, cacheKey } = options
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  // Utility functions for data persistence
  const saveToCache = useCallback((data: any) => {
    if (cacheKey && typeof window !== 'undefined') {
      try {
        localStorage.setItem(`session_cache_${cacheKey}`, JSON.stringify({
          data,
          timestamp: Date.now(),
          sessionId: session?.user?.id
        }))
      } catch (error) {
        console.warn('Failed to save data to cache:', error)
      }
    }
  }, [cacheKey, session?.user?.id])

  const getFromCache = useCallback(() => {
    if (cacheKey && typeof window !== 'undefined') {
      try {
        const cached = localStorage.getItem(`session_cache_${cacheKey}`)
        if (cached) {
          const parsed = JSON.parse(cached)
          // Return cached data if it's less than 1 hour old
          if (Date.now() - parsed.timestamp < 60 * 60 * 1000) {
            return parsed.data
          }
        }
      } catch (error) {
        console.warn('Failed to retrieve data from cache:', error)
      }
    }
    return null
  }, [cacheKey])

  const clearCache = useCallback(() => {
    if (cacheKey && typeof window !== 'undefined') {
      try {
        localStorage.removeItem(`session_cache_${cacheKey}`)
      } catch (error) {
        console.warn('Failed to clear cache:', error)
      }
    }
  }, [cacheKey])

  // Clear any existing intervals when session becomes invalid
  useEffect(() => {
    if (status === 'unauthenticated' || !session) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
      onSessionExpired?.()
    }
  }, [status, session, onSessionExpired])

  // Cleanup intervals on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [])

  const safeFetch = useCallback(async (url: string, options?: RequestInit) => {
    // Don't make requests if not enabled
    if (!enabled) {
      throw new Error('Fetch is disabled.')
    }

    // Don't make requests while session is loading
    if (status === 'loading') {
      throw new Error('Session loading...')
    }

    // Don't make requests if session is invalid
    if (status === 'unauthenticated' || !session) {
      throw new Error('Session expired. Please sign in again.')
    }

    try {
      const response = await fetch(url, options)
      
      // Handle authentication errors
      if (response.status === 401) {
        onSessionExpired?.()
        throw new Error('Session expired. Please sign in again.')
      }
      
      return response
    } catch (error) {
      // Network errors or other issues - just rethrow them
      // Authentication errors are handled by the 401 response check above
      throw error
    }
  }, [session, status, enabled, onSessionExpired])

  const createInterval = useCallback((callback: () => void, intervalMs: number) => {
    // Check if we should create an interval at all
    const isSessionValid = status === 'authenticated' && !!session
    
    if (!enabled || !isSessionValid) {
      return null
    }

    // Clear existing interval
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }

    // Create new interval with session validation
    intervalRef.current = setInterval(() => {
      // Re-fetch current session status for validation
      // We can't rely on captured values as they may be stale
      callback()
    }, intervalMs)

    return intervalRef.current
  }, [session, status, enabled])

  const clearCurrentInterval = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }, [])

  return {
    safeFetch,
    createInterval,
    clearCurrentInterval,
    isSessionValid: status === 'authenticated' && !!session,
    sessionStatus: status,
    session,
    saveToCache,
    getFromCache,
    clearCache
  }
} 