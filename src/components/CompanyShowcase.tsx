'use client';

import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, MapPin, Building2, CheckCircle, TrendingUp, Users } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { PortfolioApiResponse, AirtableRecord, PortfolioCompanyUI } from '@/types/portfolio';

// Stats Component that fetches from Grid View
const StatsComponent = () => {
  const [statsData, setStatsData] = useState<PortfolioCompanyUI[]>([]);
  const [statsLoading, setStatsLoading] = useState(true);
  const [statsError, setStatsError] = useState<string | null>(null);

  // Transform Airtable record to UI format for stats
  const transformStatsCompany = (record: AirtableRecord): PortfolioCompanyUI => {
    const fields = record.fields;
    return {
      id: record.id,
      companyName: fields['Company name'] || fields['Company Name'] || '',
      description: fields['Description'] || '',
      sector: fields['Sector'] || '',
      website: fields['Website'] || '',
      deck: fields['Deck'] || '',
      founders: fields['Founder(s)'] || fields['Founders'] || '',
      founderLinkedIn: fields['Founder LinkedIn'] || '',
      memosOverviews: fields['Memos & Overviews'] || '',
      dataRoom: fields['Data room'] || fields['Data Room'] || '',
      location: fields['Location'] || '',
      highlights: fields['Highlights'] || '',
      nextSteps: fields['Next steps'] || fields['Next Steps'] || '',
      investorPortalDisplay: fields['Investor Portal Display'] || false,
    };
  };

  // Fetch all companies from Grid View for stats
  useEffect(() => {
    const fetchStatsData = async () => {
      try {
        setStatsLoading(true);
        setStatsError(null);
        
        const response = await fetch('/api/portfolio-stats');
        
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to fetch portfolio stats');
        }
        
        const data: PortfolioApiResponse = await response.json();
        const transformedCompanies = data.companies.map(transformStatsCompany);
        setStatsData(transformedCompanies);
      } catch (err) {
        console.error('Error fetching stats:', err);
        setStatsError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setStatsLoading(false);
      }
    };

    fetchStatsData();
  }, []);

  if (statsLoading) {
    return (
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-gray-200 dark:border-gray-700 mb-8">
                 <div className="animate-pulse">
           <div className="h-8 bg-gray-200 dark:bg-gray-600 rounded-lg mb-6 w-48"></div>
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
             <div className="min-h-80 flex flex-col justify-between">
               <div className="grid grid-cols-2 gap-4 flex-1">
                 {[...Array(2)].map((_, i) => (
                   <div key={i} className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-6 border border-gray-200 dark:border-gray-600 flex flex-col justify-center items-center text-center">
                     <div className="h-12 w-16 bg-gray-200 dark:bg-gray-600 rounded mb-3"></div>
                     <div className="h-6 w-24 bg-gray-200 dark:bg-gray-600 rounded"></div>
                   </div>
                 ))}
               </div>
               <div className="grid grid-cols-2 gap-4 flex-1 mt-4">
                 {[...Array(2)].map((_, i) => (
                   <div key={i + 2} className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-6 border border-gray-200 dark:border-gray-600 flex flex-col justify-center items-center text-center">
                     <div className="h-12 w-16 bg-gray-200 dark:bg-gray-600 rounded mb-3"></div>
                     <div className="h-6 w-24 bg-gray-200 dark:bg-gray-600 rounded"></div>
                   </div>
                 ))}
               </div>
             </div>
             <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-6 border border-gray-200 dark:border-gray-600 min-h-80">
               <div className="h-6 bg-gray-200 dark:bg-gray-600 rounded mb-4"></div>
               <div className="h-64 bg-gray-200 dark:bg-gray-600 rounded"></div>
             </div>
           </div>
         </div>
      </div>
    );
  }

  if (statsError) {
    return (
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-gray-200 dark:border-gray-700 mb-8">
        <div className="text-center text-red-500">
          <p>Error loading portfolio stats: {statsError}</p>
        </div>
      </div>
    );
  }

  const totalCompanies = statsData.length;
  const investorPortalCompanies = statsData.filter(company => company.investorPortalDisplay).length;
  
  // Process sector data to find most common sector
  const sectorCounts = statsData.reduce((acc, company) => {
    if (company.sector) {
      let sectors: string[] = [];
      
      // Handle different sector formats
      if (Array.isArray(company.sector)) {
        sectors = company.sector.map(s => String(s).trim()).filter(s => s.length > 0);
      } else if (typeof company.sector === 'string') {
        sectors = company.sector.split(/[,;|]/).map(s => s.trim()).filter(s => s.length > 0);
      }
      
      // Count each sector
      sectors.forEach(sector => {
        acc[sector] = (acc[sector] || 0) + 1;
      });
    }
    return acc;
  }, {} as Record<string, number>);

  // Find the most common sector
  const mostCommonSector = Object.entries(sectorCounts)
    .sort(([,a], [,b]) => b - a)[0]?.[0] || 'N/A';

  // Count companies in diligence
  const companiesInDiligence = statsData.filter(company => {
    if (!company.nextSteps) return false;
    
    let nextStepsText = '';
    
    // Handle different data types for nextSteps
    if (Array.isArray(company.nextSteps)) {
      nextStepsText = company.nextSteps.map(step => String(step)).join(' ').toLowerCase();
    } else if (typeof company.nextSteps === 'string') {
      nextStepsText = company.nextSteps.toLowerCase();
    } else {
      nextStepsText = String(company.nextSteps).toLowerCase();
    }
    
    return nextStepsText.includes('team calls') || 
           nextStepsText.includes('meetings') || 
           nextStepsText.includes('reviews') || 
           nextStepsText.includes('diligence');
  }).length;
  
  // Process location data for donut chart
  const locationCounts = statsData.reduce((acc, company) => {
    if (company.location) {
      const location = company.location.trim();
      acc[location] = (acc[location] || 0) + 1;
    }
    return acc;
  }, {} as Record<string, number>);

  const locationData = Object.entries(locationCounts)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value);

  // Green-inspired colors for the pie chart
  const COLORS = ['#065F46', '#047857', '#059669', '#10B981', '#34D399', '#6EE7B7'];

  // Custom tooltip for the pie chart
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0];
      return (
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg p-3 shadow-lg">
          <p className="text-gray-900 dark:text-white font-medium">{data.name}</p>
          <p className="text-gray-600 dark:text-gray-300">
            Companies: <span className="font-semibold">{data.value}</span>
          </p>
          <p className="text-gray-600 dark:text-gray-300">
            Percentage: <span className="font-semibold">{((data.value / totalCompanies) * 100).toFixed(1)}%</span>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-gray-200 dark:border-gray-700 mb-8">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Portfolio Overview</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Stats Blocks in 2x2 Grid - Matching Chart Height */}
        <div className="min-h-80 flex flex-col justify-between">
          <div className="grid grid-cols-2 gap-4 flex-1">
            {/* Total Companies */}
            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-6 border border-gray-200 dark:border-gray-600 flex flex-col justify-center items-center text-center">
              <div className="text-4xl font-bold text-gray-900 dark:text-white mb-3">{totalCompanies}</div>
              <div className="flex items-center gap-2">
                <Building2 className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                <span className="text-sm font-medium text-gray-600 dark:text-gray-300">Total Companies</span>
              </div>
            </div>

            {/* Term Negotiations */}
            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-6 border border-gray-200 dark:border-gray-600 flex flex-col justify-center items-center text-center">
              <div className="text-4xl font-bold text-gray-900 dark:text-white mb-3">{investorPortalCompanies}</div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
                <span className="text-sm font-medium text-gray-600 dark:text-gray-300">Term Negotiations</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 flex-1 mt-4">
            {/* Most Common Sector */}
            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-6 border border-gray-200 dark:border-gray-600 flex flex-col justify-center items-center text-center">
              <div className="text-4xl font-bold text-gray-900 dark:text-white mb-3 leading-tight px-2">{mostCommonSector}</div>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                <span className="text-sm font-medium text-gray-600 dark:text-gray-300">Top Sector</span>
              </div>
            </div>

            {/* Companies in Diligence */}
            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-6 border border-gray-200 dark:border-gray-600 flex flex-col justify-center items-center text-center">
              <div className="text-4xl font-bold text-gray-900 dark:text-white mb-3">{companiesInDiligence}</div>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                <span className="text-sm font-medium text-gray-600 dark:text-gray-300">In Diligence</span>
              </div>
            </div>
          </div>
        </div>

        {/* Location Donut Chart with Recharts - Now Larger */}
        <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-6 border border-gray-200 dark:border-gray-600">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Companies by Location</h3>
          
          {locationData.length > 0 ? (
            <div className="min-h-80">
              <ResponsiveContainer width="100%" height="75%">
                <PieChart>
                  <Pie
                    data={locationData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {locationData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
              
              {/* Top 3 Locations Legend */}
              <div className="mt-4">
                <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Top 3 Locations</h4>
                <div className="space-y-2">
                  {locationData.slice(0, 3).map((item, index) => (
                    <div key={item.name} className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <div 
                          className="w-3 h-3 rounded-full" 
                          style={{ backgroundColor: COLORS[index % COLORS.length] }}
                        ></div>
                        <span className="text-gray-700 dark:text-gray-300 truncate">{item.name}</span>
                      </div>
                      <span className="text-gray-600 dark:text-gray-400 font-medium">
                        {((item.value / totalCompanies) * 100).toFixed(1)}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center text-gray-500 dark:text-gray-400 py-8">
              <MapPin className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p className="text-sm">No location data available</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default function CompanyShowcase() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [companies, setCompanies] = useState<PortfolioCompanyUI[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Transform Airtable record to UI format
  const transformCompany = (record: AirtableRecord): PortfolioCompanyUI => {
    const fields = record.fields;
    return {
      id: record.id,
      companyName: fields['Company name'] || fields['Company Name'] || '',
      description: fields['Description'] || '',
      sector: fields['Sector'] || '',
      website: fields['Website'] || '',
      deck: fields['Deck'] || '',
      founders: fields['Founder(s)'] || fields['Founders'] || '',
      founderLinkedIn: fields['Founder LinkedIn'] || '',
      memosOverviews: fields['Memos & Overviews'] || '',
      dataRoom: fields['Data room'] || fields['Data Room'] || '',
      location: fields['Location'] || '',
      highlights: fields['Highlights'] || '',
      investorPortalDisplay: fields['Investor Portal Display'] || false,
    };
  };

  // Generate initials for company logo
  const getInitials = (name?: string) => {
    if (!name) return '?';
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  // Format sectors to show only first sector with "Company"
  const formatSectorCompany = (sectors?: string | string[] | null) => {
    if (!sectors) return 'Company';
    
    let firstSector = '';
    
    // If it's already an array, take the first element
    if (Array.isArray(sectors)) {
      firstSector = sectors[0] ? String(sectors[0]).trim() : '';
    } 
    // If it's a string, split and take the first part
    else if (typeof sectors === 'string') {
      const sectorArray = sectors.split(/[,;|]/);
      firstSector = sectorArray[0] ? sectorArray[0].trim() : '';
    }
    // Fallback for other types
    else {
      firstSector = String(sectors).trim();
    }
    
    return firstSector ? `${firstSector} Company` : 'Company';
  };

  // Fetch companies from Airtable
  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch('/api/portfolio');
        
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to fetch portfolio companies');
        }
        
        const data: PortfolioApiResponse = await response.json();
        const transformedCompanies = data.companies.map(transformCompany);
        setCompanies(transformedCompanies);
      } catch (err) {
        console.error('Error fetching companies:', err);
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchCompanies();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-gray-900 dark:border-white mx-auto mb-4"></div>
          <p className="text-gray-900 dark:text-white text-lg">Loading portfolio companies...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 mb-4 text-xl font-semibold">Error loading companies</div>
          <p className="text-gray-600 dark:text-gray-300 mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-gray-700 dark:hover:bg-gray-100 rounded-lg font-medium transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (companies.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🏢</div>
          <h3 className="text-2xl font-semibold mb-2 text-gray-900 dark:text-white">No Companies Available</h3>
          <p className="text-gray-600 dark:text-gray-300">No companies are currently displayed in the investor portal.</p>
        </div>
      </div>
    );
  }

  const currentCompany = companies[currentIndex];

  const nextCompany = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % companies.length);
  };

  const prevCompany = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + companies.length) % companies.length);
  };

  const goToCompany = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <div className="max-w-6xl w-full">
        {/* Title and Description */}
        <div className="text-left mb-8 pt-8">
          <h1 className="text-2xl font-semibold tracking-tight text-gray-900 dark:text-white mb-4 sm:text-3xl">
            Portfolio Companies
          </h1>
          <p className="text-md text-gray-600 dark:text-gray-300 max-w-4xl">
            Explore our portfolio of innovative companies that represent some of the deal flow for Edin Capital. Navigate through each company to learn about their mission, founders, and access important resources.
          </p>
        </div>

                 <StatsComponent />

        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-3xl shadow-2xl p-8 md:p-12 border border-gray-200 dark:border-gray-700">
          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-8 gap-4">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 bg-gradient-to-br from-gray-800 to-gray-600 dark:from-gray-200 dark:to-gray-400 rounded-2xl flex items-center justify-center text-white dark:text-gray-900 text-2xl font-bold">
                {getInitials(formatSectorCompany(currentCompany.companyName))}
              </div>
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{formatSectorCompany(currentCompany.sector)}</h1>
                {currentCompany.description && (
                  <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">{currentCompany.description}</p>
                )}
              </div>
            </div>
          </div>

          {/* Company Info */}
          <div className="space-y-6 mb-8">
            {/* Highlights */}
            {currentCompany.highlights && (
              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-6 border border-gray-200 dark:border-gray-600">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Highlights</h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{currentCompany.highlights}</p>
              </div>
            )}

            {/* Location */}
            {currentCompany.location && (
              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-6 border border-gray-200 dark:border-gray-600">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Location</h3>
                <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                  <MapPin className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                  {currentCompany.location}
                </div>
              </div>
            )}
          </div>

          {/* Navigation */}
          {companies.length > 1 && (
            <div className="flex items-center justify-between">
              <button
                onClick={prevCompany}
                className="p-3 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full text-gray-900 dark:text-white transition-all"
                aria-label="Previous company"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <div className="flex gap-2">
                {companies.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToCompany(index)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === currentIndex 
                        ? 'bg-gray-900 dark:bg-white w-8' 
                        : 'bg-gray-400 dark:bg-gray-600 hover:bg-gray-600 dark:hover:bg-gray-400'
                    }`}
                    aria-label={`Go to company ${index + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={nextCompany}
                className="p-3 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full text-gray-900 dark:text-white transition-all"
                aria-label="Next company"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          )}

          {/* Company Counter */}
          <div className="text-center mt-4">
            <span className="text-gray-500 dark:text-gray-400 text-sm">
              Company {currentIndex + 1} of {companies.length}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
} 