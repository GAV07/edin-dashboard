'use client';

import Dashboard from "@/components/Dashboard";
import { useEffect, useState } from "react";
import { useSessionAwareFetch } from '@/hooks/useSessionAwareFetch';
import { useRouter } from 'next/navigation';

interface DashboardData {
  fundOverview: {
    committedCapital: string;
    investableCapital: string;
    managementFee: string;
    fundLife: string;
    deploymentPeriod: string;
    carry: string;
  };
  portfolioAllocation: {
    numberOfInvestments: string;
    averageCheckSize: string;
    successRate: string;
  };
  returnMetrics: {
    lpDistributions: string;
    gpCarry: string;
    moic: string;
    grossTvpi: string;
    dpi: string;
    irr: string;
  };
  distributionSourcesData: Array<{ name: string; value: number }>;
  annualReturnsData: Array<{ year: string; returns: number; cumulative: number }>;
}

export default function DashboardClient() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const { safeFetch, createInterval, isSessionValid } = useSessionAwareFetch({
    onSessionExpired: () => {
      console.log('Session expired, redirecting to login...');
      router.push('/auth/signin');
    }
  });

  useEffect(() => {
    if (!isSessionValid) return;

    let cancelled = false;

    const fetchData = async () => {
      try {
        const response = await safeFetch('/api/dashboard');
        const result = await response.json();

        if (cancelled) return;

        if (!response.ok) {
          throw new Error(result.error || 'Failed to fetch data');
        }

        if (!result.fundOverview || !result.returnMetrics || !result.portfolioAllocation) {
          throw new Error('Invalid dashboard data received');
        }

        setData(result);
        setError(null);
      } catch (err: any) {
        if (cancelled) return;
        console.error('Error fetching dashboard data:', err);

        if (err.message.includes('Session expired')) {
          setError('Your session has expired. Please sign in again to continue.');
          return;
        }

        setError(err.message || 'An error occurred while fetching data');
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchData();

    // Refresh every 5 minutes — use raw setInterval to avoid dependency churn
    const intervalId = setInterval(fetchData, 5 * 60 * 1000);

    return () => {
      cancelled = true;
      clearInterval(intervalId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSessionValid]);

  if (loading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 400 }}>
        <div className="animate-spin rounded-full h-12 w-12 border-b-2" style={{ borderColor: 'var(--green-700)' }} />
      </div>
    );
  }

  if (error) {
    const isSessionError = error.includes('Session expired') || error.includes('sign in');

    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 400 }}>
        <div style={{ textAlign: 'center', padding: 'var(--space-7)', background: 'var(--surface-card)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)', maxWidth: 420 }}>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'var(--text-xl)', color: 'var(--text-strong)', marginBottom: 'var(--space-3)' }}>
            {isSessionError ? 'Session Expired' : 'Error Loading Dashboard'}
          </h2>
          <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-muted)', marginBottom: 'var(--space-5)' }}>{error}</p>
          {isSessionError ? (
            <button
              onClick={() => router.push('/auth/signin')}
              style={{ padding: '8px 20px', background: 'var(--green-700)', color: 'var(--paper-100)', border: 'none', borderRadius: 'var(--radius-sm)', fontSize: 'var(--text-sm)', fontWeight: 600, cursor: 'pointer' }}
            >
              Sign In Again
            </button>
          ) : (
            <button
              onClick={() => window.location.reload()}
              style={{ padding: '8px 20px', background: 'var(--green-700)', color: 'var(--paper-100)', border: 'none', borderRadius: 'var(--radius-sm)', fontSize: 'var(--text-sm)', fontWeight: 600, cursor: 'pointer' }}
            >
              Try Again
            </button>
          )}
        </div>
      </div>
    );
  }

  if (!data) {
    return null;
  }

  return (
    <Dashboard
      fundOverview={data.fundOverview}
      portfolioAllocation={data.portfolioAllocation}
      returnMetrics={data.returnMetrics}
      distributionSourcesData={data.distributionSourcesData}
      annualReturnsData={data.annualReturnsData}
    />
  );
} 