'use client';

import { Container } from "@/components/Container";
import Dashboard from "@/components/Dashboard";
import { useEffect, useState } from "react";

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
  annualReturnsData: Array<{ year: string; returns: number }>;
}

export default function DashboardClient() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/dashboard');
        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.error || 'Failed to fetch data');
        }

        setData(result);
      } catch (err: any) {
        console.error('Error fetching dashboard data:', err);
        setError(err.message || 'An error occurred while fetching data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    // Refresh data every 5 minutes
    const intervalId = setInterval(fetchData, 5 * 60 * 1000);
    return () => clearInterval(intervalId);
  }, []);

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
    return (
      <Container>
        <div className="text-red-500">Error: {error}</div>
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