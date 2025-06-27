'use client'

import { useSession } from 'next-auth/react'
import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

declare global {
  interface Window {
    gtag: (command: string, ...args: any[]) => void;
  }
}

export function AnalyticsWrapper({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession()
  const pathname = usePathname()

  useEffect(() => {
    if (typeof window === 'undefined' || !window.gtag) return

    // Configure analytics with user data when session is available
    if (status === 'authenticated' && session?.user) {
      window.gtag('config', 'G-60LQ571T8N', {
        user_id: session.user.id,
        custom_map: {
          user_role: session.user.role,
          user_email: session.user.email,
        }
      })

      // Track user login session
      window.gtag('event', 'user_engagement', {
        engagement_time_msec: 1000,
        user_id: session.user.id,
        event_category: 'User Session',
        event_label: session.user.role,
      })
    }
  }, [session, status])

  useEffect(() => {
    if (typeof window === 'undefined' || !window.gtag) return

    // Track page views with user context
    const pageTitle = document.title
    const trackingData: any = {
      page_title: pageTitle,
      page_location: window.location.href,
      page_path: pathname,
    }

    // Add user context if authenticated
    if (status === 'authenticated' && session?.user) {
      trackingData.user_id = session.user.id
      trackingData.custom_map = {
        user_role: session.user.role,
        user_email: session.user.email,
      }
    }

    window.gtag('config', 'G-60LQ571T8N', trackingData)

    // Send page view event
    window.gtag('event', 'page_view', {
      page_title: pageTitle,
      page_location: window.location.href,
      page_path: pathname,
      user_id: session?.user?.id || 'anonymous',
      event_category: 'Navigation',
      event_label: session?.user?.role || 'unauthenticated',
    })
  }, [pathname, session, status])

  return <>{children}</>
} 