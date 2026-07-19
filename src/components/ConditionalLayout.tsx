'use client'

import { useSession } from 'next-auth/react'
import { Sidebar } from './Sidebar'
import { usePathname } from 'next/navigation'
import Image from 'next/image'

const ROUTE_TITLE: Record<string, string> = {
  '/': 'Overview',
  '/thesis': 'Thesis',
  '/pro-forma': 'Pro Forma',
  '/venture-bond': 'Venture Bond',
  '/deal-flow': 'Deal Flow',
  '/portfolio-support': 'Portfolio Support',
  '/edin-os': 'EdinOS',
  '/team': 'Team & Track Record',
  '/legal': 'Legal & Compliance',
  '/admin/users': 'Manage Users',
  '/admin/data': 'Sync Data',
}

function Topbar() {
  const pathname = usePathname()
  const title = ROUTE_TITLE[pathname || '/'] || 'Overview'

  return (
    <div className="topbar">
      <div className="crumbs">
        <span>edin capital</span>
        <span className="crumb-sep">/</span>
        <span>fund i</span>
        <span className="crumb-sep">/</span>
        <span className="crumb-current">{title.toLowerCase()}</span>
      </div>
      <div className="top-meta">
        <span className="top-pill">
          <span className="dot" />
          Data as of Q{Math.ceil((new Date().getMonth() + 1) / 3)} {new Date().getFullYear()}
        </span>
      </div>
    </div>
  )
}

function BrandFoot() {
  return (
    <div className="brandfoot">
      <Image className="mk" src="/images/logos/edincapital_logo.jpeg" alt="" width={16} height={16} />
      <span className="tag">Integrated Capital.</span>
      <span className="disc">Edin Capital &mdash; Proprietary &amp; Confidential</span>
    </div>
  )
}

export function ConditionalLayout({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession()
  const pathname = usePathname()

  const isAuthPage = pathname?.startsWith('/auth/')

  if (status === 'loading') {
    return (
      <div className="fixed inset-0 flex items-center justify-center z-50"
        style={{ background: 'var(--surface-app)' }}>
        <div className="flex flex-col items-center justify-center text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 mb-4"
            style={{ borderColor: 'var(--green-700)' }} />
          <p style={{ color: 'var(--text-muted)' }}>Loading...</p>
        </div>
      </div>
    )
  }

  if (session && !isAuthPage) {
    return (
      <div className="portal-shell" style={{ background: 'var(--surface-app)' }}>
        <Sidebar />
        <div className="portal-main">
          <Topbar />
          <main className="canvas" key={pathname}>
            <div className="screen">
              {children}
            </div>
          </main>
          <BrandFoot />
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 overflow-y-auto">
      {children}
    </div>
  )
}
