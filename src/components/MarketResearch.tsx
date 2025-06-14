"use client";

import React, { useState } from 'react';
import { 
  TrendingUp, 
  AlertTriangle, 
  Target, 
  Zap, 
  ArrowRight,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Building2,
  Users,
  DollarSign,
  BarChart3,
  ArrowUpRight
} from 'lucide-react';

interface KeyStat {
  icon: React.ReactNode;
  title: string;
  value: string;
  subtitle: string;
  change: string;
  color: string;
}

interface MarketSegment {
  title: string;
  description: string;
  growth: string;
  examples: string;
}

interface Sources {
  [key: string]: string;
}

const MarketAnalysisDashboard: React.FC = () => {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const toggleSection = (section: string): void => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const sources: Sources = {
    sifted2024: "https://sifted.eu/articles/founder-vc-relationships-2024",
    pilotReport: "https://pilot.com/blog/founder-salary-report-2025",
    cartaReport: "https://carta.com/data/vc-fund-performance-q4-2024-full-report/",
    pitchbookQ3: "https://pitchbook.com/news/reports/q3-2024-global-fund-performance-report",
    chamberCommerce: "https://www.uschamber.com/technology/empowering-small-business-2024",
    naicsData: "https://www.naics.com/business-lists/counts-by-company-size/",
    harvardLaw: "https://corpgov.law.harvard.edu/2023/venture-capital-failure-rates/",
    imdBusiness: "https://www.imd.org/research-knowledge/strategy/",
    stanfordGSB: "https://www.gsb.stanford.edu/faculty-research/publications/search-funds-2024",
    nyuStern: "https://pages.stern.nyu.edu/~adamodar/New_Home_Page/datafile/margin.html",
    sbaReport: "https://www.sba.gov/document/report-small-business-capital-access-study",
    cornellArxiv: "https://arxiv.org/search/?query=transforming+business&searchtype=all",
    blackrock: "https://www.blackrock.com/institutions/insights/private-markets",
    mckinsey: "https://www.mckinsey.com/industries/private-equity-and-principal-investors/our-insights"
  };

  const keyStats: KeyStat[] = [
    {
      icon: <Building2 className="w-6 h-6" />,
      title: "Target Market Size",
      value: "200k+",
      subtitle: "Companies vs 15k VC-backed",
      change: "10x larger opportunity",
      color: "text-blue-600"
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: "AI Adoption",
      value: "40%",
      subtitle: "Small businesses using AI",
      change: "↑ 74% from 2023",
      color: "text-green-600"
    },
    {
      icon: <AlertTriangle className="w-6 h-6" />,
      title: "VC Fund Performance",
      value: "14.3%",
      subtitle: "Achieve DPI of 1x after 7 years",
      change: "85.7% underperform",
      color: "text-red-600"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Founder Relations",
      value: "71%",
      subtitle: "Report worsening investor relations",
      change: "Systemic breakdown",
      color: "text-orange-600"
    }
  ];

  const marketSegments: MarketSegment[] = [
    {
      title: "Tech-Enabled Services",
      description: "Software/AI-enhanced service businesses with 35%+ margins",
      growth: "6-10% CAGR",
      examples: "HR, IT services, logistics"
    },
    {
      title: "Acquired SMBs",
      description: "Recently acquired businesses being modernized with technology",
      growth: "25-35% IRR potential",
      examples: "12-15k acquisitions annually"
    },
    {
      title: "Commercial R&D",
      description: "Applied sciences & deep-tech with lean go-to-market strategies",
      growth: "$3.3B SBIR funding",
      examples: "University spinouts, corporate labs"
    }
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <BarChart3 className="w-8 h-8 text-white" />
          <h1 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">Market Analysis: An Emerging Market Beyond Venture Capital</h1>
        </div>
        <p className="text-blue-100 mt-1">
          The US economy stands at an inflection point. Our comprehensive analysis reveals a massive untapped market 
          opportunity created by the convergence of VC's structural failures, AI-enabled transformation, and 
          deteriorating founder-investor relations.
        </p>
      </div>

      {/* Key Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {keyStats.map((stat, index) => (
          <div key={index} className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
            <div className="flex items-start">
              <div className={`${stat.color} mr-3`}>
                {stat.icon}
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                <h3 className="text-xl font-bold text-gray-900 mt-1">{stat.value}</h3>
                <p className="text-xs text-gray-500 mt-1">{stat.subtitle}</p>
                <p className={`text-xs font-medium ${stat.color} mt-1`}>{stat.change}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Analysis Sections */}
      <div className="space-y-6">
        {/* VC Crisis Section */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <button 
            onClick={() => toggleSection('vc-crisis')}
            className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center gap-4">
              <AlertTriangle className="w-5 h-5 text-blue-500" />
              <div>
                <h2 className="text-xl font-bold text-gray-800 mb-1">The Traditional VC Model Crisis</h2>
                <p className="text-sm text-gray-600">Systematic breakdown in performance, relationships, and market structure</p>
              </div>
            </div>
            {expandedSection === 'vc-crisis' ? <ChevronUp /> : <ChevronDown />}
          </button>
          
          {expandedSection === 'vc-crisis' && (
            <div className="px-6 pb-6 border-t border-gray-100">
              <div className="grid md:grid-cols-2 gap-6 mt-6">
                <div className="space-y-4">
                  <h3 className="text-md font-semibold text-gray-800 mb-2">Performance Breakdown</h3>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>• 2017 vintage IRR dropped from 16.8% to 12.0% (vs S&P 500's 12.83%)</li>
                    <li>• Only 14.3% of 2017 funds achieved DPI {'>'} 1x after 7 years</li>
                    <li>• Bridge rounds hit 40% of seed-stage financing</li>
                    <li>• Down rounds increased 5x (6.7% to 20% of rounds)</li>
                  </ul>
                </div>
                <div className="space-y-4">
                  <h3 className="text-md font-semibold text-gray-800 mb-2">Relationship Crisis</h3>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>• 71% of founders report worsening investor relationships</li>
                    <li>• 77% of founders now choose to bootstrap over VC</li>
                    <li>• 75% of venture-backed startups fail</li>
                    <li>• Extended hold periods (7-12 years) with frozen exits</li>
                  </ul>
                </div>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                <a href={sources.sifted2024} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700">
                  Sifted 2024 Survey <ExternalLink className="w-3 h-3" />
                </a>
                <a href={sources.cartaReport} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700">
                  Carta Performance Report <ExternalLink className="w-3 h-3" />
                </a>
                <a href={sources.pilotReport} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700">
                  Pilot Founder Report <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          )}
        </div>

        {/* Market Opportunity Section */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <button 
            onClick={() => toggleSection('market-opportunity')}
            className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center gap-4">
              <Target className="w-5 h-5 text-blue-500" />
              <div>
                <h2 className="text-xl font-bold text-gray-800 mb-1">Massive Untapped Market</h2>
                <p className="text-sm text-gray-600">200k+ profitable companies vs 15k VC-backed startups</p>
              </div>
            </div>
            {expandedSection === 'market-opportunity' ? <ChevronUp /> : <ChevronDown />}
          </button>
          
          {expandedSection === 'market-opportunity' && (
            <div className="px-6 pb-6 border-t border-gray-100">
              <div className="mt-6 space-y-6">
                <div>
                  <h3 className="text-md font-semibold text-gray-800 mb-3">Target Market Breakdown</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <div className="text-2xl font-bold text-blue-900">1.9M</div>
                      <div className="text-sm text-blue-700">Companies with {'>'} $500k revenue</div>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg">
                      <div className="text-2xl font-bold text-green-900">200k+</div>
                      <div className="text-sm text-green-700">Target companies (30%+ margins)</div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-md font-semibold text-gray-800 mb-3">Revenue Distribution</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>$500K-$1M:</span>
                      <span className="font-medium">792,624 companies</span>
                    </div>
                    <div className="flex justify-between">
                      <span>$1M-$2.5M:</span>
                      <span className="font-medium">546,969 companies</span>
                    </div>
                    <div className="flex justify-between">
                      <span>$2.5M-$5M:</span>
                      <span className="font-medium">222,344 companies</span>
                    </div>
                    <div className="flex justify-between">
                      <span>$5M-$10M:</span>
                      <span className="font-medium">144,641 companies</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                <a href={sources.naicsData} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700">
                  NAICS Business Data <ExternalLink className="w-3 h-3" />
                </a>
                <a href={sources.sbaReport} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700">
                  SBA Capital Report <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          )}
        </div>

        {/* AI Transformation Section */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <button 
            onClick={() => toggleSection('ai-transformation')}
            className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center gap-4">
              <Zap className="w-5 h-5 text-blue-500" />
              <div>
                <h2 className="text-xl font-bold text-gray-800 mb-1">AI-Enabled Transformation</h2>
                <p className="text-sm text-gray-600">Technology acceleration creating venture-scale opportunities</p>
              </div>
            </div>
            {expandedSection === 'ai-transformation' ? <ChevronUp /> : <ChevronDown />}
          </button>
          
          {expandedSection === 'ai-transformation' && (
            <div className="px-6 pb-6 border-t border-gray-100">
              <div className="mt-6 space-y-6">
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-900">99%</div>
                    <div className="text-sm text-blue-700">Use technology platforms</div>
                  </div>
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-900">40%</div>
                    <div className="text-sm text-blue-700">Adopted AI tools</div>
                  </div>
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-900">89%</div>
                    <div className="text-sm text-blue-700">High-tech adopters see growth</div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-md font-semibold text-gray-800 mb-3">Performance Impact</h3>
                  <div className="space-y-2 text-sm">
                    <div>High-tech adopters (6+ platforms) vs Low adopters:</div>
                    <div className="pl-4 space-y-1">
                      <div>• Sales growth: 89% vs 63%</div>
                      <div>• Profit growth: 88% vs 45%</div>
                      <div>• Employment growth: 80% vs 33%</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                <a href={sources.chamberCommerce} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700">
                  Chamber Technology Report <ExternalLink className="w-3 h-3" />
                </a>
                <a href={sources.cornellArxiv} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700">
                  Cornell AI Research <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Market Segments */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
          <Target className="h-5 w-5 mr-2 text-blue-500" />
          Target Market Segments
        </h2>
        <div className="grid md:grid-cols-3 gap-4">
          {marketSegments.map((segment, index) => (
            <div key={index} className="bg-white p-4 rounded-lg border border-gray-200">
              <h3 className="font-bold text-gray-900">{segment.title}</h3>
              <p className="text-sm text-gray-600 mb-2">{segment.description}</p>
              <div className="space-y-1">
                <div className="text-sm font-medium text-blue-600">{segment.growth}</div>
                <div className="text-xs text-gray-500">{segment.examples}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Sources */}
      <div className="bg-gray-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Sources & Research</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3 text-sm">
          <a href={sources.harvardLaw} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-blue-600 hover:text-blue-700">
            <ExternalLink className="w-3 h-3" />
            Harvard Law School 2023
          </a>
          <a href={sources.imdBusiness} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-blue-600 hover:text-blue-700">
            <ExternalLink className="w-3 h-3" />
            IMD Business School
          </a>
          <a href={sources.stanfordGSB} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-blue-600 hover:text-blue-700">
            <ExternalLink className="w-3 h-3" />
            Stanford GSB 2024
          </a>
          <a href={sources.nyuStern} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-blue-600 hover:text-blue-700">
            <ExternalLink className="w-3 h-3" />
            NYU Stern Margins Data
          </a>
          <a href={sources.mckinsey} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-blue-600 hover:text-blue-700">
            <ExternalLink className="w-3 h-3" />
            McKinsey Global Report
          </a>
          <a href={sources.blackrock} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-blue-600 hover:text-blue-700">
            <ExternalLink className="w-3 h-3" />
            BlackRock Private Markets
          </a>
        </div>
      </div>

      {/* Footer */}
      <div className="p-6 bg-gray-100 border-t border-gray-200">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-600">This market analysis is based on information available as of May 13, 2025.</p>
          <a 
            href="https://www.dropbox.com/scl/fi/4ib9m7ko49bg5sri0wy9i/Market-Analysis_-An-Emerging-Market-Beyond-Venture-Capital.pdf?rlkey=p2s1i9s8z67zbmjhz59ojo3hd&st=8elz7o13&dl=0" 
            target="_blank" 
            rel="noopener noreferrer"
            className="mt-3 md:mt-0 flex items-center text-blue-600 hover:text-blue-800 transition"
          >
            <span className="font-medium">View Full Market Analysis</span>
            <ArrowUpRight className="ml-1 h-4 w-4" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default MarketAnalysisDashboard;