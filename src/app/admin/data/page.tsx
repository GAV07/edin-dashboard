'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { RefreshCw, Database, CheckCircle, XCircle, Clock } from 'lucide-react'

interface RefreshResult {
  success: boolean
  results: Record<string, { success: boolean; error?: string }>
  refreshedAt: string
}

interface DataStatus {
  status: Record<string, { hasData: boolean }>
}

export default function DataManagement() {
  const { data: session, status: authStatus } = useSession()
  const router = useRouter()
  const [refreshing, setRefreshing] = useState(false)
  const [lastResult, setLastResult] = useState<RefreshResult | null>(null)
  const [dataStatus, setDataStatus] = useState<DataStatus | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    if (authStatus === 'loading') return
    if (!session || session.user.role !== 'admin') {
      router.push('/')
      return
    }
    fetchStatus()
  }, [session, authStatus, router])

  const fetchStatus = async () => {
    try {
      const res = await fetch('/api/admin/refresh-data')
      if (res.ok) {
        const data = await res.json()
        setDataStatus(data)
      }
    } catch (err) {
      console.error('Failed to fetch data status:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleRefresh = async () => {
    setRefreshing(true)
    setError('')
    setLastResult(null)

    try {
      const res = await fetch('/api/admin/refresh-data', { method: 'POST' })
      const data = await res.json()

      if (!res.ok && res.status !== 207) {
        throw new Error(data.error || 'Refresh failed')
      }

      setLastResult(data)
      fetchStatus()
    } catch (err: any) {
      setError(err.message)
    } finally {
      setRefreshing(false)
    }
  }

  if (authStatus === 'loading' || loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Loading...</div>
      </div>
    )
  }

  if (!session || session.user.role !== 'admin') {
    return null
  }

  const dataKeys = [
    { key: 'dashboard-data', label: 'Dashboard Overview' },
    { key: 'pro-forma-base', label: 'Pro Forma - Base Case' },
    { key: 'pro-forma-conservative', label: 'Pro Forma - Conservative' },
    { key: 'pro-forma-optimistic', label: 'Pro Forma - Optimistic' },
  ]

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 rounded-xl p-6 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Database className="w-8 h-8 text-white" />
            <div>
              <h1 className="text-2xl font-semibold text-white">Data Management</h1>
              <p className="text-emerald-100">Sync data from Google Sheets to the database</p>
            </div>
          </div>
          <button
            onClick={handleRefresh}
            disabled={refreshing}
            className="bg-white text-emerald-600 px-4 py-2 rounded-lg font-medium hover:bg-emerald-50 transition-colors flex items-center gap-2 disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
            {refreshing ? 'Syncing...' : 'Sync All Data'}
          </button>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-6">
          {error}
        </div>
      )}

      {/* Info Banner */}
      <div className="bg-blue-50 border border-blue-200 text-blue-700 px-4 py-3 rounded-lg mb-6 text-sm">
        Data is pulled from Google Sheets and stored in the database. The dashboard reads from the database only.
        Click <strong>Sync All Data</strong> to pull the latest values from the spreadsheet.
      </div>

      {/* Data Status */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden mb-6">
        <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
          <h2 className="text-lg font-semibold">Data Status</h2>
        </div>
        <div className="divide-y divide-gray-200">
          {dataKeys.map(({ key, label }) => {
            const hasData = dataStatus?.status?.[key]?.hasData ?? false
            const result = lastResult?.results?.[key.replace('pro-forma-', 'pro-forma-').replace('dashboard-data', 'dashboard')]

            return (
              <div key={key} className="px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Database className="w-5 h-5 text-gray-400" />
                  <span className="font-medium text-gray-900">{label}</span>
                </div>
                <div className="flex items-center gap-3">
                  {hasData ? (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      <CheckCircle className="w-3 h-3" />
                      Data Available
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                      <Clock className="w-3 h-3" />
                      No Data - Sync Required
                    </span>
                  )}
                  {result && (
                    result.success ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        <CheckCircle className="w-3 h-3" />
                        Synced
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800" title={result.error}>
                        <XCircle className="w-3 h-3" />
                        Failed
                      </span>
                    )
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Last Sync Result */}
      {lastResult && (
        <div className={`rounded-lg border p-4 ${lastResult.success ? 'bg-green-50 border-green-200' : 'bg-yellow-50 border-yellow-200'}`}>
          <div className="flex items-center gap-2 mb-2">
            {lastResult.success ? (
              <CheckCircle className="w-5 h-5 text-green-600" />
            ) : (
              <XCircle className="w-5 h-5 text-yellow-600" />
            )}
            <span className="font-medium">
              {lastResult.success ? 'All data synced successfully' : 'Some data failed to sync'}
            </span>
          </div>
          <p className="text-sm text-gray-600">
            Last synced: {new Date(lastResult.refreshedAt).toLocaleString()}
          </p>
          {!lastResult.success && (
            <div className="mt-2 text-sm">
              {Object.entries(lastResult.results)
                .filter(([, r]) => !r.success)
                .map(([key, r]) => (
                  <p key={key} className="text-red-600">{key}: {r.error}</p>
                ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
