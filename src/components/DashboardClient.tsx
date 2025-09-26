'use client';

import { Container } from "@/components/Container";
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
    const fetchData = async () => {
      // Don't attempt to fetch data if session is invalid
      if (!isSessionValid) {
        setError('Session expired. Please sign in again.');
        setLoading(false);
        return;
      }

      try {
        const response = await safeFetch('/api/dashboard');
        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.error || 'Failed to fetch data');
        }

        setData(result);
        setError(null); // Clear any previous errors
      } catch (err: any) {
        console.error('Error fetching dashboard data:', err);
        
        // Handle session expiration gracefully
        if (err.message.includes('Session expired')) {
          setError('Your session has expired. Please sign in again to continue.');
          return;
        }
        
        setError(err.message || 'An error occurred while fetching data');
      } finally {
        setLoading(false);
      }
    };

    if (isSessionValid) {
      fetchData();

      // Create session-aware interval that will auto-cleanup on session expiry
      createInterval(fetchData, 5 * 60 * 1000); // Refresh every 5 minutes
    }
  }, [isSessionValid, createInterval, safeFetch]);

  if (loading) {
    return (
      <Container>
        <div className="flex items-center justify-center h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      </Container>
    );
  }

  if (error) {
    const isSessionError = error.includes('Session expired') || error.includes('sign in');
    
    return (
      <Container>
        <div className="flex items-center justify-center h-screen">
          <div className="text-center p-6 bg-white rounded-lg shadow-lg">
            <div className="text-red-500 text-5xl mb-4">
              {isSessionError ? '🔒' : '⚠️'}
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              {isSessionError ? 'Session Expired' : 'Error Loading Dashboard'}
            </h2>
            <p className="text-gray-600 mb-4">{error}</p>
            <div className="space-x-2">
              {isSessionError ? (
                <button 
                  onClick={() => router.push('/auth/signin')}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  Sign In Again
                </button>
              ) : (
                <button 
                  onClick={() => window.location.reload()}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  Try Again
                </button>
              )}
            </div>
          </div>
        </div>
      </Container>
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