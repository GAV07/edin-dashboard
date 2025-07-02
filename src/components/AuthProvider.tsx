'use client'

import { SessionProvider } from 'next-auth/react'
import { useEffect } from 'react'
import { signIn, useSession } from 'next-auth/react'

// Development auto-login component
function DevAutoLogin() {
  const { data: session, status } = useSession()
  
  useEffect(() => {
    // Only run in development and if explicitly enabled
    if (process.env.NODE_ENV !== 'development' || 
        process.env.NEXT_PUBLIC_DEV_AUTO_LOGIN !== 'true') {
      return
    }
    
    // Only auto-login if not already authenticated and not currently loading
    if (status === 'unauthenticated') {
      console.log('🔧 Development mode: Auto-logging in as demo admin user')
      signIn('credentials', {
        email: 'demo-admin@example.com',
        password: 'password123',
        redirect: false,
      }).catch(console.error)
    }
  }, [status])

  return null
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const shouldShowAutoLogin = process.env.NODE_ENV === 'development' && 
                              process.env.NEXT_PUBLIC_DEV_AUTO_LOGIN === 'true'
  
  return (
    <SessionProvider>
      {shouldShowAutoLogin && <DevAutoLogin />}
      {children}
    </SessionProvider>
  )
} 