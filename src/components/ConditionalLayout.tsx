'use client'

import { useSession } from 'next-auth/react'
import { Sidebar } from './Sidebar'
import { Footer } from './Footer'
import { usePathname } from 'next/navigation'

export function ConditionalLayout({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession()
  const pathname = usePathname()
  
  // Don't show sidebar for auth pages
  const isAuthPage = pathname?.startsWith('/auth/')
  
  // Show loading state
  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  // If user is authenticated and not on auth page, show full layout with sidebar
  if (session && !isAuthPage) {
    return (
      <>
        <Sidebar />
        <div className="lg:pl-2 lg:pt-2 bg-gray-100 flex-1 overflow-y-auto">
          <div className="flex-1 bg-white min-h-screen lg:rounded-tl-xl border border-transparent lg:border-neutral-200 overflow-y-auto">
            {children}
            <Footer />
          </div>
        </div>
      </>
    )
  }

  // For unauthenticated users or auth pages, show full-screen layout
  return (
    <div className="fixed inset-0 overflow-y-auto">
      {children}
    </div>
  )
} 