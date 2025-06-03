'use client';

import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Globe, MapPin, Mail, Users, DollarSign, TrendingUp, ExternalLink, FileText, FolderOpen } from 'lucide-react';
import { PortfolioApiResponse, AirtableRecord, PortfolioCompanyUI } from '@/types/portfolio';

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

  // Format sectors with commas and spaces
  const formatSectors = (sectors?: string | string[] | null) => {
    if (!sectors) return '';
    
    // If it's already an array, join it
    if (Array.isArray(sectors)) {
      return sectors
        .map(sector => String(sector).trim())
        .filter(sector => sector.length > 0)
        .join(', ');
    }
    
    // If it's a string, split and format it
    if (typeof sectors === 'string') {
      return sectors
        .split(/[,;|]/)
        .map(sector => sector.trim())
        .filter(sector => sector.length > 0)
        .join(', ');
    }
    
    // Fallback for other types - convert to string
    return String(sectors).trim();
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

  // Parse founders string into array
  const parseFounders = (foundersString?: string) => {
    if (!foundersString) return [];
    return foundersString.split(',').map(founder => ({
      name: founder.trim(),
      role: 'Founder',
      image: '👤'
    }));
  };

  const founders = parseFounders(currentCompany.founders);

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

        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-3xl shadow-2xl p-8 md:p-12 border border-gray-200 dark:border-gray-700">
          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8 gap-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-br from-gray-800 to-gray-600 dark:from-gray-200 dark:to-gray-400 rounded-2xl flex items-center justify-center text-white dark:text-gray-900 text-2xl font-bold">
                {getInitials(currentCompany.companyName)}
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{currentCompany.companyName}</h1>
                <p className="text-gray-600 dark:text-gray-300 italic">{formatSectors(currentCompany.sector)}</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              {currentCompany.website && (
                <a href={currentCompany.website.startsWith('http') ? currentCompany.website : `https://${currentCompany.website}`} 
                   target="_blank" rel="noopener noreferrer" 
                   className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg text-gray-900 dark:text-white transition-all">
                  <Globe className="w-4 h-4" />
                  Website
                </a>
              )}
              {currentCompany.deck && (
                <a href={currentCompany.deck} target="_blank" rel="noopener noreferrer"
                   className="flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white hover:bg-gray-700 dark:hover:bg-gray-100 rounded-lg text-white dark:text-gray-900 transition-all">
                  <ExternalLink className="w-4 h-4" />
                  View Deck
                </a>
              )}
            </div>
          </div>

          {/* Company Info Grid */}
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            {/* Left Column - Description & Resources */}
            <div className="space-y-6">
              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-6 border border-gray-200 dark:border-gray-600">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">About</h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{currentCompany.description || 'No description available'}</p>
              </div>

              {/* Resources */}
              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-6 border border-gray-200 dark:border-gray-600">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Resources</h3>
                <div className="space-y-2">
                  {currentCompany.memosOverviews && (
                    <a href={currentCompany.memosOverviews} target="_blank" rel="noopener noreferrer"
                       className="flex items-center gap-3 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">
                      <FileText className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                      Memos & Overviews
                    </a>
                  )}
                  {currentCompany.dataRoom && (
                    <a href={currentCompany.dataRoom} target="_blank" rel="noopener noreferrer"
                       className="flex items-center gap-3 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">
                      <FolderOpen className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                      Data Room
                    </a>
                  )}
                  {currentCompany.founderLinkedIn && (
                    <a href={currentCompany.founderLinkedIn} target="_blank" rel="noopener noreferrer"
                       className="flex items-center gap-3 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">
                      <Users className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                      Founder LinkedIn
                    </a>
                  )}
                </div>
              </div>
            </div>

            {/* Right Column - Founders & Location */}
            <div className="space-y-6">
              {founders.length > 0 && (
                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-6 border border-gray-200 dark:border-gray-600">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Founders</h3>
                  <div className="space-y-3">
                    {founders.map((founder, index) => (
                      <div key={index} className="flex items-center gap-4 p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-600">
                        <div className="w-12 h-12 bg-gradient-to-br from-gray-800 to-gray-600 dark:from-gray-200 dark:to-gray-400 rounded-full flex items-center justify-center text-white dark:text-gray-900 text-lg font-bold">
                          {founder.name.charAt(0)}
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900 dark:text-white">{founder.name}</div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">{founder.role}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Location */}
              {currentCompany.location && (
                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-6 border border-gray-200 dark:border-gray-600">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Location</h3>
                  <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                    <MapPin className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                    <span className="font-medium">{currentCompany.location}</span>
                  </div>
                </div>
              )}
            </div>
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